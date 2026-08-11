import React from 'react';
import Icon from '../../components/Icon.jsx';
import { cssTextToObject } from '../../utils/cssText.js';

export default function OkrDetailDrawer({ vm }) {
  const { okClose, okD, okKrs, okMeta, okStop, okrDrawerOpen } = vm;
  return (
    <React.Fragment>
{Boolean(okrDrawerOpen) && (
<React.Fragment>

  
<div onClick={okClose} style={{"position":"fixed","inset":"0","zIndex":"60","background":"rgba(31,8,20,.5)","display":"flex","justifyContent":"flex-end"}}>

    
<div onClick={okStop} className="blscroll" style={{"width":"100%","maxWidth":"860px","height":"100%","background":"var(--paper)","boxShadow":"var(--shadow-xl)","overflowY":"auto","animation":"blrise .3s var(--ease-out)"}}>

      
<div style={{"position":"sticky","top":"0","background":"var(--paper)","borderBottom":"1px solid var(--line-200)","padding":"18px 24px","zIndex":"3"}}>

        
<div style={{"display":"flex","alignItems":"flex-start","justifyContent":"space-between","gap":"14px"}}>

          
<div style={{"minWidth":"0"}}>

            
<div style={{"display":"flex","alignItems":"center","gap":"8px","flexWrap":"wrap"}}>
<span style={{"fontSize":"9.5px","fontWeight":"800","letterSpacing":".05em","textTransform":"uppercase","padding":"2px 7px","borderRadius":"6px","background":"var(--orchid-100)","color":"var(--orchid-700)"}}>
{okD.scope} OKR
</span>
<span style={{"fontFamily":"'Space Mono'","fontSize":"11.5px","color":"var(--ink-400)"}}>
{okD.code} · {okD.ver}
</span>
<span style={cssTextToObject(`font-size:11px;font-weight:700;padding:3px 10px;border-radius:999px;background:${okD.statusBg};color:${okD.statusColor}`)}>
{okD.status}
</span>
</div>

            
<h3 style={{"fontFamily":"'Sora'","fontWeight":"700","fontSize":"20px","color":"var(--ink-900)","margin":"6px 0 0"}}>
{okD.title}
</h3>

            
<div style={{"fontSize":"13px","color":"var(--ink-500)","marginTop":"4px"}}>
{okD.desc}
</div>

          
</div>

          
<button onClick={okClose} style={{"width":"34px","height":"34px","borderRadius":"10px","border":"1px solid var(--line-300)","background":"var(--paper)","cursor":"pointer","display":"flex","alignItems":"center","justifyContent":"center","flexShrink":"0"}}>
<Icon name={"x"} style={{"width":"17px","height":"17px","color":"var(--ink-700)"}} />
</button>

        
</div>

        
<div style={{"display":"flex","alignItems":"center","gap":"10px","marginTop":"12px"}}>
<div style={{"flex":"1","height":"8px","borderRadius":"99px","background":"var(--line-200)","overflow":"hidden"}}>
<div style={cssTextToObject(`height:100%;border-radius:99px;width:${okD.progressW};background:${okD.progressColor}`)} />
</div>
<span style={{"fontSize":"13px","fontWeight":"800","color":"var(--ink-900)"}}>
{okD.progress}
</span>
</div>

      
</div>

      
<div style={{"padding":"20px 24px","display":"flex","flexDirection":"column","gap":"18px"}}>

        
<div>

          
<div style={{"fontSize":"11.5px","fontWeight":"700","letterSpacing":".08em","textTransform":"uppercase","color":"var(--ink-400)","marginBottom":"10px"}}>
OKR details
</div>

          
<div style={{"display":"grid","gridTemplateColumns":"1fr 1fr","gap":"10px 16px"}}>

            
{(okMeta || []).map((m, $index) => (
<React.Fragment key={$index}>

              
<div style={{"display":"flex","justifyContent":"space-between","gap":"10px","borderBottom":"1px dashed var(--line-200)","paddingBottom":"7px"}}>
<span style={{"fontSize":"12px","color":"var(--ink-500)"}}>
{m.k}
</span>
<span style={{"fontSize":"12.5px","fontWeight":"700","color":"var(--ink-900)","textAlign":"right"}}>
{m.v}
</span>
</div>

            
</React.Fragment>
))}

          
</div>

        
</div>

        
<div>

          
<div style={{"fontSize":"11.5px","fontWeight":"700","letterSpacing":".08em","textTransform":"uppercase","color":"var(--ink-400)","marginBottom":"10px"}}>
Key results — KPI linkage & linked tasks
</div>

          
<div style={{"display":"flex","flexDirection":"column","gap":"12px"}}>

            
{(okKrs || []).map((k, $index) => (
<React.Fragment key={$index}>

              
<div style={{"border":"1px solid var(--line-200)","borderRadius":"14px","overflow":"hidden"}}>

                
<div style={{"padding":"13px 16px","background":"var(--surface-50)"}}>

                  
<div style={{"display":"flex","alignItems":"center","gap":"9px","flexWrap":"wrap"}}>

                    
<span style={{"width":"22px","height":"22px","borderRadius":"99px","background":"var(--beet-700)","color":"#fff","display":"flex","alignItems":"center","justifyContent":"center","fontSize":"11px","fontWeight":"800","flexShrink":"0"}}>
{k.n}
</span>

                    
<span style={{"fontSize":"13.5px","fontWeight":"700","color":"var(--ink-900)","flex":"1","minWidth":"200px"}}>
{k.t}
</span>

                    
<span style={cssTextToObject(`font-size:11px;font-weight:700;padding:3px 9px;border-radius:999px;background:${k.statusBg};color:${k.statusColor}`)}>
{k.status}
</span>

                  
</div>

                  
<div style={{"display":"flex","alignItems":"center","gap":"14px","marginTop":"9px","flexWrap":"wrap"}}>

                    
<span style={{"display":"inline-flex","alignItems":"center","gap":"5px","fontSize":"11px","fontWeight":"700","padding":"3px 9px","borderRadius":"999px","background":"var(--orchid-100)","color":"var(--orchid-700)"}}>
<Icon name={"target"} style={{"width":"11px","height":"11px"}} />
KPI · {k.kpi}
</span>

                    
<span style={{"fontSize":"11.5px","color":"var(--ink-500)"}}>
Baseline 
<b style={{"color":"var(--ink-900)"}}>
{k.baseline}
</b>
</span>

                    
<span style={{"fontSize":"11.5px","color":"var(--ink-500)"}}>
Current 
<b style={{"color":"var(--ink-900)"}}>
{k.current}
</b>
</span>

                    
<span style={{"fontSize":"11.5px","color":"var(--ink-500)"}}>
Target 
<b style={{"color":"var(--ink-900)"}}>
{k.target} {k.unit}
</b>
</span>

                    
<span style={{"fontSize":"11.5px","color":"var(--ink-500)"}}>
Weight 
<b style={{"color":"var(--ink-900)"}}>
{k.weight}
</b>
</span>

                    
<span style={{"fontSize":"11.5px","color":"var(--ink-500)"}}>
Owner 
<b style={{"color":"var(--ink-900)"}}>
{k.who}
</b>
</span>

                    
<span style={{"fontSize":"11.5px","color":"var(--ink-500)"}}>
{k.freq} · due {k.due}
</span>

                  
</div>

                  
<div style={{"display":"flex","alignItems":"center","gap":"9px","marginTop":"9px"}}>
<div style={{"flex":"1","height":"6px","borderRadius":"99px","background":"var(--line-200)","overflow":"hidden"}}>
<div style={cssTextToObject(`height:100%;border-radius:99px;width:${k.achW};background:${k.achColor}`)} />
</div>
<span style={cssTextToObject(`font-size:12px;font-weight:800;color:${k.achColor}`)}>
{k.ach}
</span>
</div>

                
</div>

                
<div style={{"padding":"11px 16px"}}>

                  
<div style={{"display":"flex","alignItems":"center","gap":"6px","marginBottom":"8px"}}>
<Icon name={"list-checks"} style={{"width":"13px","height":"13px","color":"var(--info-600)"}} />
<span style={{"fontSize":"11px","fontWeight":"800","letterSpacing":".06em","textTransform":"uppercase","color":"var(--ink-400)"}}>
{k.linkedCount}
</span>
</div>

                  
{Boolean(k.hasLinked) && (
<React.Fragment>

                    
<div style={{"display":"flex","flexDirection":"column","gap":"6px"}}>

                      
{(k.linked || []).map((lt, $index) => (
<React.Fragment key={$index}>

                        
<div onClick={lt.open} style={{"display":"flex","alignItems":"center","gap":"9px","padding":"8px 11px","border":"1px solid var(--line-200)","borderRadius":"10px","cursor":"pointer","flexWrap":"wrap"}} style-hover="border-color:var(--orchid-300);background:var(--surface-50)">

                          
<span style={{"fontFamily":"'Space Mono'","fontSize":"10.5px","fontWeight":"700","color":"var(--ink-900)"}}>
{lt.id}
</span>

                          
<span style={{"fontSize":"12.5px","fontWeight":"700","color":"var(--ink-900)","flex":"1","minWidth":"160px"}}>
{lt.name}
</span>

                          
<span style={{"fontSize":"11px","color":"var(--ink-500)"}}>
{lt.assignee}
</span>

                          
<span style={{"fontSize":"11px","fontWeight":"700","color":"var(--verify-600)"}}>
{lt.contribution}
</span>

                          
{Boolean(lt.hasEffort) && (
<React.Fragment>
<span style={{"display":"inline-flex","alignItems":"center","gap":"4px","fontSize":"10.5px","fontWeight":"700","padding":"2px 8px","borderRadius":"999px","background":"var(--surface-50)","border":"1px solid var(--line-200)","color":"var(--ink-500)"}}>
<Icon name={"gauge"} style={{"width":"10px","height":"10px"}} />
{lt.effortPlan}
</span>
</React.Fragment>
)}

                          
<span style={cssTextToObject(`font-size:10.5px;font-weight:700;padding:3px 8px;border-radius:999px;background:${lt.statusBg};color:${lt.statusColor}`)}>
{lt.status}
</span>

                        
</div>

                      
</React.Fragment>
))}

                    
</div>


</React.Fragment>
)}


<div style={{"marginTop":"10px","paddingTop":"10px","borderTop":"1px dashed var(--line-200)","display":"flex","flexDirection":"column","gap":"5px"}}>
<div style={{"display":"flex","alignItems":"center","gap":"6px","fontSize":"11px","fontWeight":"600","color":k.hasMeasure?"var(--ink-700)":"var(--ink-400)"}}>
<Icon name={"ruler"} style={{"width":"12px","height":"12px","color":"var(--verify-600)"}} />
{k.measured}
</div>
<div style={{"fontSize":"11px","color":"var(--ink-500)","marginLeft":"18px"}}>
{k.evidenceLabel}
</div>
{Boolean(k.hasSops) && (
<React.Fragment>
<div style={{"fontSize":"10.5px","fontWeight":"700","color":"var(--ink-900)","marginTop":"3px","marginLeft":"18px"}}>
{k.sopLabel}
</div>
<div style={{"display":"flex","flexWrap":"wrap","gap":"6px","marginLeft":"18px","marginTop":"3px"}}>
{(k.sopList || []).map((sp, $si) => (
<button key={$si} onClick={sp.open} style={{"display":"inline-flex","alignItems":"center","gap":"5px","padding":"4px 9px","border":"1px solid var(--line-300)","background":"var(--paper)","borderRadius":"999px","fontSize":"10.5px","fontWeight":"700","color":"var(--ink-700)","cursor":"pointer"}}>
<Icon name={"book-open-check"} style={{"width":"10px","height":"10px","color":"var(--orchid-600)"}} />
{sp.title}
<span style={cssTextToObject(`font-size:9.5px;font-weight:700;padding:1px 6px;border-radius:999px;background:${sp.bg};color:${sp.color}`)}>{sp.status}</span>
</button>
))}
</div>
</React.Fragment>
)}
</div>


</div>


</div>


</React.Fragment>
))}

          
</div>

        
</div>

        
<div style={{"display":"flex","alignItems":"center","gap":"9px","background":"var(--surface-50)","border":"1px solid var(--line-200)","borderRadius":"12px","padding":"11px 14px","fontSize":"12.5px","color":"var(--ink-500)"}}>
<Icon name={"workflow"} style={{"width":"15px","height":"15px","flexShrink":"0","color":"var(--orchid-600)"}} />
<span>
Each key result is linked to a KPI from the KPI Master; tasks contributing to that KPI (with their effort plan) are listed under it. Click a task to open it.
</span>
</div>

      
</div>

    
</div>

  
</div>


</React.Fragment>
)}
    </React.Fragment>
  );
}
