import React from 'react';
import Icon from '../../components/Icon.jsx';
import { cssTextToObject } from '../../utils/cssText.js';

export default function DashboardSection({ vm }) {
  const { accessSummary, dashExtras, dashExtrasLabel, dashPanelTitle, dashRows, kpis, noop, scopeBox, showDash } = vm;
  return (
    <React.Fragment>
{Boolean(showDash) && (
<React.Fragment>

          
<div style={{"display":"grid","gridTemplateColumns":"repeat(4,1fr)","gap":"16px","marginBottom":"20px"}}>

            
{(kpis || []).map((k, $index) => (
<React.Fragment key={$index}>

              
<div style={{"background":"#fff","border":"1px solid var(--line-300)","borderRadius":"20px","boxShadow":"var(--shadow-sm)","padding":"18px 20px"}}>

                
<div style={{"display":"flex","alignItems":"center","justifyContent":"space-between","marginBottom":"12px"}}>
<span style={{"fontSize":"13px","fontWeight":"600","color":"var(--ink-500)"}}>
{k.label}
</span>
<span style={cssTextToObject(`width:32px;height:32px;border-radius:10px;display:flex;align-items:center;justify-content:center;background:${k.iconBg}`)}>
<Icon name={k.icon} style={cssTextToObject(`width:16px;height:16px;color:${k.iconColor}`)} />
</span>
</div>

                
<div style={{"fontFamily":"'Sora'","fontWeight":"800","fontSize":"30px","letterSpacing":"-.02em","color":"var(--beet-700)"}}>
{k.value}
</div>

                
<div style={cssTextToObject(`display:flex;align-items:center;gap:5px;margin-top:6px;font-size:12.5px;font-weight:700;color:${k.deltaColor}`)}>
<Icon name={k.deltaIcon} style={{"width":"13px","height":"13px"}} />
{k.delta}
</div>

              
</div>

            
</React.Fragment>
))}


</div>

<div style={{"background":"#fff","border":"1px solid var(--line-300)","borderRadius":"18px","boxShadow":"var(--shadow-sm)","padding":"14px 18px","marginBottom":"20px"}}>
<div style={{"display":"flex","alignItems":"center","gap":"7px","marginBottom":"11px"}}>
<Icon name="bell-ring" style={{"width":"13px","height":"13px","color":"var(--orchid-600)"}} />
<span style={{"fontSize":"10.5px","fontWeight":"800","letterSpacing":".06em","textTransform":"uppercase","color":"var(--ink-400)"}}>{dashExtrasLabel}</span>
</div>
<div style={{"display":"grid","gridTemplateColumns":"repeat(auto-fit,minmax(128px,1fr))","gap":"14px"}}>
{(dashExtras || []).map((x, $index) => (
<React.Fragment key={$index}>
<div style={{"minWidth":"0"}}>
<div style={{"fontSize":"11px","fontWeight":"700","color":"var(--ink-500)"}}>{x.label}</div>
<div style={cssTextToObject(`font-family:'Sora';font-weight:800;font-size:21px;color:${x.color};margin-top:2px`)}>{x.value}</div>
<div style={{"fontSize":"10.5px","color":"var(--ink-400)","marginTop":"1px","lineHeight":"1.4"}}>{x.sub}</div>
</div>
</React.Fragment>
))}
</div>
</div>


<div style={{"display":"grid","gridTemplateColumns":"1.6fr 1fr","gap":"16px"}}>

            
<div style={{"background":"#fff","border":"1px solid var(--line-300)","borderRadius":"20px","boxShadow":"var(--shadow-sm)","padding":"22px"}}>

              
<div style={{"display":"flex","alignItems":"center","justifyContent":"space-between","marginBottom":"18px"}}>
<h3 style={{"fontFamily":"'Sora'","fontWeight":"700","fontSize":"17px","color":"var(--beet-700)","margin":"0"}}>
{dashPanelTitle}
</h3>
<a href="#" onClick={noop} style={{"fontSize":"12.5px","fontWeight":"700"}}>
View all
</a>
</div>

              
<div style={{"display":"flex","flexDirection":"column","gap":"2px"}}>

                
{(dashRows || []).map((r, $index) => (
<React.Fragment key={$index}>

                  
<div style={{"display":"flex","alignItems":"center","gap":"14px","padding":"12px 8px","borderBottom":"1px solid var(--line-200)"}}>

                    
<span style={cssTextToObject(`width:36px;height:36px;border-radius:10px;flex-shrink:0;display:flex;align-items:center;justify-content:center;background:${r.iconBg}`)}>
<Icon name={r.icon} style={cssTextToObject(`width:17px;height:17px;color:${r.iconColor}`)} />
</span>

                    
<div style={{"flex":"1","minWidth":"0"}}>
<div style={{"fontSize":"14px","fontWeight":"700","color":"var(--ink-900)"}}>
{r.title}
</div>
<div style={{"fontSize":"12.5px","color":"var(--ink-500)"}}>
{r.sub}
</div>
</div>

                    
<span style={cssTextToObject(`font-size:11.5px;font-weight:700;padding:4px 10px;border-radius:999px;background:${r.tagBg};color:${r.tagColor}`)}>
{r.tag}
</span>

                  
</div>

                
</React.Fragment>
))}

              
</div>

            
</div>

            
<div style={{"display":"flex","flexDirection":"column","gap":"16px"}}>

              
<div style={{"background":"linear-gradient(155deg,#3d1024,#7A1C46)","color":"#fff","borderRadius":"20px","padding":"22px"}}>

                
<div style={{"fontSize":"11.5px","fontWeight":"700","letterSpacing":".1em","textTransform":"uppercase","color":"var(--orchid-300)"}}>
{scopeBox.eyebrow}
</div>

                
<div style={{"fontFamily":"'Sora'","fontWeight":"800","fontSize":"34px","margin":"8px 0 2px"}}>
{scopeBox.big}
</div>

                
<div style={{"fontSize":"13px","color":"rgba(255,255,255,.72)"}}>
{scopeBox.sub}
</div>

                
<div style={{"height":"1px","background":"rgba(255,255,255,.14)","margin":"16px 0"}} />

                
<div style={{"fontSize":"13px","lineHeight":"1.6","color":"rgba(255,255,255,.82)"}}>
{scopeBox.note}
</div>

              
</div>

              
<div style={{"background":"#fff","border":"1px solid var(--line-300)","borderRadius":"20px","boxShadow":"var(--shadow-sm)","padding":"20px"}}>

                
<h3 style={{"fontFamily":"'Sora'","fontWeight":"700","fontSize":"15px","color":"var(--beet-700)","margin":"0 0 14px"}}>
Your access at a glance
</h3>

                
<div style={{"display":"flex","flexDirection":"column","gap":"9px"}}>

                  
{(accessSummary || []).map((a, $index) => (
<React.Fragment key={$index}>

                    
<div style={{"display":"flex","alignItems":"center","justifyContent":"space-between","gap":"10px"}}>
<span style={{"fontSize":"13px","color":"var(--ink-700)"}}>
{a.mod}
</span>
<span style={cssTextToObject(`font-size:11.5px;font-weight:700;padding:3px 9px;border-radius:999px;background:${a.bg};color:${a.color}`)}>
{a.level}
</span>
</div>

                  
</React.Fragment>
))}

                
</div>

              
</div>

            
</div>

          
</div>

        
</React.Fragment>
)}
    </React.Fragment>
  );
}
