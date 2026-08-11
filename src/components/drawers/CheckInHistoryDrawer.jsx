import React from 'react';
import Icon from '../../components/Icon.jsx';
import { cssTextToObject } from '../../utils/cssText.js';

export default function CheckInHistoryDrawer({ vm }) {
  const { closeHistory, historyEmpty, historyOpen, historyRows, historyTitle, stop } = vm;
  return (
    <React.Fragment>
{Boolean(historyOpen) && (
<React.Fragment>

  
<div onClick={closeHistory} style={{"position":"fixed","inset":"0","background":"rgba(31,8,20,.5)","backdropFilter":"blur(3px)","zIndex":"165","display":"flex","justifyContent":"flex-end"}}>

    
<div onClick={stop} className="blscroll" style={{"width":"100%","maxWidth":"460px","height":"100%","background":"var(--paper)","boxShadow":"var(--shadow-xl)","overflowY":"auto","animation":"blrise .3s var(--ease-out)"}}>

      
<div style={{"position":"sticky","top":"0","background":"var(--paper)","borderBottom":"1px solid var(--line-200)","padding":"20px 24px","display":"flex","alignItems":"flex-start","justifyContent":"space-between","zIndex":"2"}}>

        
<div>
<div style={{"fontSize":"11px","fontWeight":"700","letterSpacing":".1em","textTransform":"uppercase","color":"var(--orchid-500)"}}>
Check-in history
</div>
<h3 style={{"fontFamily":"'Sora'","fontWeight":"700","fontSize":"18px","color":"var(--ink-900)","margin":"4px 0 0"}}>
{historyTitle}
</h3>
</div>

        
<button onClick={closeHistory} style={{"width":"32px","height":"32px","borderRadius":"9px","border":"1px solid var(--line-300)","background":"var(--paper)","cursor":"pointer","display":"flex","alignItems":"center","justifyContent":"center"}}>
<Icon name={"x"} style={{"width":"16px","height":"16px","color":"var(--ink-700)"}} />
</button>

      
</div>

      
<div style={{"padding":"22px 24px"}}>

        
{Boolean(historyEmpty) && (
<React.Fragment>

          
<div style={{"textAlign":"center","color":"var(--ink-500)","padding":"40px 0"}}>
<Icon name={"history"} style={{"width":"26px","height":"26px","color":"var(--ink-400)"}} />
<div style={{"fontSize":"14px","fontWeight":"600","marginTop":"10px"}}>
No check-ins logged yet.
</div>
</div>

        
</React.Fragment>
)}

        
<div style={{"display":"flex","flexDirection":"column","gap":"0"}}>

          
{(historyRows || []).map((h, $index) => (
<React.Fragment key={$index}>

            
<div style={{"display":"flex","gap":"14px"}}>

              
<div style={{"display":"flex","flexDirection":"column","alignItems":"center","flexShrink":"0"}}>
<span style={cssTextToObject(`width:12px;height:12px;border-radius:99px;background:${h.dot};margin-top:4px`)} />
<span style={{"flex":"1","width":"2px","background":"var(--line-200)"}} />
</div>

              
<div style={{"flex":"1","paddingBottom":"22px"}}>

                
<div style={{"display":"flex","alignItems":"center","gap":"8px","flexWrap":"wrap"}}>
<span style={{"fontSize":"13px","fontWeight":"700","color":"var(--ink-900)"}}>
{h.kind}
</span>
{Boolean(h.progress) && (
<React.Fragment>
<span style={{"fontSize":"11px","fontWeight":"700","color":"var(--info-600)"}}>
{h.progress}
</span>
</React.Fragment>
)}
</div>

                
<div style={{"fontSize":"12px","color":"var(--ink-500)","marginTop":"2px"}}>
{h.date} · {h.who} ({h.role})
</div>

                
<div style={{"display":"flex","gap":"7px","marginTop":"7px","flexWrap":"wrap"}}>

                  
{Boolean(h.hasHealth) && (
<React.Fragment>
<span style={cssTextToObject(`font-size:11px;font-weight:700;padding:3px 9px;border-radius:999px;background:${h.healthBg};color:${h.healthColor}`)}>
{h.health}
</span>
</React.Fragment>
)}

                  
{Boolean(h.hasDecision) && (
<React.Fragment>
<span style={{"fontSize":"11px","fontWeight":"700","padding":"3px 9px","borderRadius":"999px","background":"var(--surface-50)","border":"1px solid var(--line-300)","color":"var(--ink-700)"}}>
{h.decision}
</span>
</React.Fragment>
)}

                
</div>

                
{Boolean(h.text) && (
<React.Fragment>
<div style={{"fontSize":"13px","color":"var(--ink-700)","marginTop":"8px","lineHeight":"1.5","background":"var(--surface-50)","border":"1px solid var(--line-200)","borderRadius":"10px","padding":"10px 12px"}}>
{h.text}
</div>
</React.Fragment>
)}

              
</div>

            
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
