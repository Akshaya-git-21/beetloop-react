import React from 'react';
import Icon from '../../components/Icon.jsx';

export default function MastersHubSection({ vm }) {
  const { masterGroups, showMastersHub } = vm;
  return (
    <React.Fragment>
{Boolean(showMastersHub) && (
<React.Fragment>

          
<div style={{"display":"flex","flexDirection":"column","gap":"22px"}}>

            
{(masterGroups || []).map((g, $index) => (
<React.Fragment key={$index}>

              
<div>

                
<div style={{"display":"flex","alignItems":"center","gap":"8px","marginBottom":"12px"}}>
<Icon name={g.icon} style={{"width":"15px","height":"15px","color":"var(--orchid-500)"}} />
<h3 style={{"fontFamily":"'Sora'","fontWeight":"700","fontSize":"15px","color":"var(--beet-700)","margin":"0"}}>
{g.name}
</h3>
<span style={{"fontSize":"11px","fontWeight":"700","color":"var(--ink-400)","background":"var(--surface-50)","padding":"2px 8px","borderRadius":"999px","border":"1px solid var(--line-200)"}}>
{g.count}
</span>
</div>

                
<div style={{"display":"grid","gridTemplateColumns":"repeat(4,1fr)","gap":"12px"}}>

                  
{(g.items || []).map((m, $index) => (
<React.Fragment key={$index}>

                    
<button onClick={m.open} style={{"textAlign":"left","background":"#fff","border":"1px solid var(--line-300)","borderRadius":"16px","boxShadow":"var(--shadow-xs)","padding":"15px 16px","cursor":"pointer","transition":".15s"}} style-hover="border-color:var(--orchid-300);box-shadow:var(--shadow-md)">

                      
<div style={{"display":"flex","alignItems":"center","justifyContent":"space-between","marginBottom":"10px"}}>
<span style={{"width":"32px","height":"32px","borderRadius":"9px","background":"var(--orchid-100)","display":"flex","alignItems":"center","justifyContent":"center"}}>
<Icon name={m.icon} style={{"width":"16px","height":"16px","color":"var(--orchid-600)"}} />
</span>
<span style={{"fontFamily":"'Space Mono'","fontSize":"12px","fontWeight":"700","color":"var(--ink-400)"}}>
{m.rows}
</span>
</div>

                      
<div style={{"fontSize":"13.5px","fontWeight":"700","color":"var(--ink-900)"}}>
{m.name}
</div>

                      
<div style={{"fontSize":"11.5px","color":"var(--ink-500)","marginTop":"2px"}}>
{m.desc}
</div>

                    
</button>

                  
</React.Fragment>
))}

                
</div>

              
</div>

            
</React.Fragment>
))}

          
</div>

        
</React.Fragment>
)}
    </React.Fragment>
  );
}
