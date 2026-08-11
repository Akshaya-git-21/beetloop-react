import React from 'react';
import Icon from '../../components/Icon.jsx';
import { cssTextToObject } from '../../utils/cssText.js';

export default function MyKpisSection({ vm }) {
  const { goTasks, hasQToday, hasQYesterday, isJuniorCi, myKpiGroups, myKpiStats, qDoneMsg, qToday, qYesterday, queueClear, rep, shareReport, showMyKpi } = vm;
  return (
    <React.Fragment>
{Boolean(showMyKpi) && (
<React.Fragment>

          
<div style={{"display":"grid","gridTemplateColumns":"repeat(4,1fr)","gap":"14px","marginBottom":"18px"}}>

            
{(myKpiStats || []).map((s, $index) => (
<React.Fragment key={$index}>

              
<div style={{"background":"var(--paper)","border":"1px solid var(--line-300)","borderRadius":"16px","boxShadow":"var(--shadow-sm)","padding":"15px 18px"}}>

                
<div style={{"display":"flex","alignItems":"center","gap":"7px","marginBottom":"8px"}}>
<Icon name={s.icon} style={cssTextToObject(`width:14px;height:14px;color:${s.color}`)} />
<span style={{"fontSize":"12px","fontWeight":"600","color":"var(--ink-500)"}}>
{s.label}
</span>
</div>

                
<div style={cssTextToObject(`font-family:'Sora';font-weight:800;font-size:26px;color:${s.color}`)}>
{s.value}
</div>

              
</div>

            
</React.Fragment>
))}

          
</div>


          
<div style={{"display":"flex","alignItems":"center","gap":"14px","background":"linear-gradient(150deg,#3d1024,#7A1C46)","color":"#fff","borderRadius":"16px","padding":"18px 22px","marginBottom":"16px"}}>

            
<span style={{"width":"46px","height":"46px","borderRadius":"12px","background":"rgba(255,255,255,.14)","display":"flex","alignItems":"center","justifyContent":"center","flexShrink":"0"}}>
<Icon name={"clipboard-check"} style={{"width":"22px","height":"22px"}} />
</span>

            
<div style={{"flex":"1"}}>
<div style={{"fontFamily":"'Sora'","fontWeight":"700","fontSize":"17px"}}>
Check in on each KPI separately
</div>
<div style={{"fontSize":"13px","color":"rgba(255,255,255,.78)","marginTop":"3px"}}>
Every KPI has its own check-in at the cadence configured in the OKR (daily / weekly / monthly / quarterly). Report progress, blockers, support needed and next-week commitment — with evidence.
</div>
</div>

            
{Boolean(isJuniorCi) && (
<React.Fragment>
<button onClick={goTasks} style={{"flexShrink":"0","display":"flex","alignItems":"center","gap":"7px","background":"rgba(255,255,255,.14)","border":"none","color":"#fff","borderRadius":"11px","padding":"9px 14px","fontSize":"13px","fontWeight":"700","cursor":"pointer"}}>
My tasks
<Icon name={"arrow-right"} style={{"width":"15px","height":"15px"}} />
</button>
</React.Fragment>
)}

          
</div>



{/* Today's check-in queue */}

          
<div style={{"display":"grid","gridTemplateColumns":"1.4fr 1fr","gap":"16px","marginBottom":"18px"}}>

            
<div style={{"background":"var(--paper)","border":"1px solid var(--line-300)","borderRadius":"18px","boxShadow":"var(--shadow-sm)","padding":"18px 20px"}}>

              
<div style={{"display":"flex","alignItems":"center","gap":"8px","marginBottom":"12px"}}>
<Icon name={"sun"} style={{"width":"16px","height":"16px","color":"var(--warn-600)"}} />
<h3 style={{"fontFamily":"'Sora'","fontWeight":"700","fontSize":"15px","color":"var(--ink-900)","margin":"0"}}>
Today's check-ins
</h3>
</div>

              
{Boolean(hasQYesterday) && (
<React.Fragment>

                
<div style={{"fontSize":"11px","fontWeight":"700","letterSpacing":".06em","textTransform":"uppercase","color":"var(--danger-600)","marginBottom":"8px"}}>
Yesterday — pending (complete first)
</div>

                
<div style={{"display":"flex","flexDirection":"column","gap":"8px","marginBottom":"14px"}}>

                  
{(qYesterday || []).map((q, $index) => (
<React.Fragment key={$index}>

                    
<div style={{"display":"flex","alignItems":"center","gap":"12px","background":"var(--danger-100)","border":"1px solid #F1C9CF","borderRadius":"12px","padding":"11px 14px"}}>

                      
<Icon name={"alert-circle"} style={{"width":"17px","height":"17px","color":"var(--danger-600)","flexShrink":"0"}} />

                      
<div style={{"flex":"1","minWidth":"0"}}>
<div style={{"fontSize":"13.5px","fontWeight":"700","color":"var(--ink-900)"}}>
{q.title}
</div>
<div style={{"fontSize":"11.5px","color":"var(--danger-600)","fontWeight":"600"}}>
{q.sub}
</div>
</div>

                      
<button onClick={q.go} style={{"flexShrink":"0","background":"var(--danger-500)","color":"#fff","border":"none","borderRadius":"9px","padding":"7px 13px","fontSize":"12px","fontWeight":"700","cursor":"pointer"}}>
Check in now
</button>

                    
</div>

                  
</React.Fragment>
))}

                
</div>

              
</React.Fragment>
)}

              
{Boolean(hasQToday) && (
<React.Fragment>

                
<div style={{"fontSize":"11px","fontWeight":"700","letterSpacing":".06em","textTransform":"uppercase","color":"var(--ink-400)","marginBottom":"8px"}}>
Due today
</div>

                
<div style={{"display":"flex","flexDirection":"column","gap":"8px"}}>

                  
{(qToday || []).map((q, $index) => (
<React.Fragment key={$index}>

                    
<div style={{"display":"flex","alignItems":"center","gap":"12px","background":"var(--surface-50)","border":"1px solid var(--line-200)","borderRadius":"12px","padding":"11px 14px"}}>

                      
<Icon name={"clock"} style={{"width":"17px","height":"17px","color":"var(--warn-600)","flexShrink":"0"}} />

                      
<div style={{"flex":"1","minWidth":"0"}}>
<div style={{"fontSize":"13.5px","fontWeight":"700","color":"var(--ink-900)"}}>
{q.title}
</div>
<div style={{"fontSize":"11.5px","color":"var(--ink-500)","fontWeight":"600"}}>
{q.sub}
</div>
</div>

                      
{Boolean(q.locked) && (
<React.Fragment>
<span style={{"display":"inline-flex","alignItems":"center","gap":"5px","fontSize":"11px","fontWeight":"700","color":"var(--ink-400)"}}>
<Icon name={"lock"} style={{"width":"12px","height":"12px"}} />
Locked
</span>
</React.Fragment>
)}

                      
<button onClick={q.go} style={{"flexShrink":"0","background":"#7A1C46","color":"#fff","border":"none","borderRadius":"9px","padding":"7px 13px","fontSize":"12px","fontWeight":"700","cursor":"pointer"}}>
Check in
</button>

                    
</div>

                  
</React.Fragment>
))}

                
</div>

              
</React.Fragment>
)}

              
{Boolean(queueClear) && (
<React.Fragment>

                
<div style={{"display":"flex","alignItems":"center","gap":"10px","background":"var(--verify-100)","border":"1px solid #BFE3D0","borderRadius":"12px","padding":"12px 15px"}}>
<Icon name={"check-circle-2"} style={{"width":"17px","height":"17px","color":"var(--verify-600)"}} />
<span style={{"fontSize":"13px","fontWeight":"700","color":"var(--verify-600)"}}>
{qDoneMsg}
</span>
</div>

              
</React.Fragment>
)}

            
</div>

            
{/* Consolidated report */}

            
<div style={{"background":"linear-gradient(150deg,#3d1024,#7A1C46)","color":"#fff","borderRadius":"18px","padding":"18px 20px","display":"flex","flexDirection":"column"}}>

              
<div style={{"display":"flex","alignItems":"center","justifyContent":"space-between","marginBottom":"12px"}}>
<h3 style={{"fontFamily":"'Sora'","fontWeight":"700","fontSize":"15px","margin":"0"}}>
Consolidated KPI report
</h3>
<button onClick={shareReport} style={{"display":"flex","alignItems":"center","gap":"6px","background":"var(--paper)","color":"var(--ink-900)","border":"none","borderRadius":"9px","padding":"7px 12px","fontSize":"12px","fontWeight":"700","cursor":"pointer"}}>
<Icon name={"share-2"} style={{"width":"13px","height":"13px"}} />
Share
</button>
</div>

              
<div style={{"display":"grid","gridTemplateColumns":"1fr 1fr 1fr","gap":"8px","marginBottom":"12px"}}>

                
<div style={{"background":"rgba(255,255,255,.1)","borderRadius":"11px","padding":"9px 11px"}}>
<div style={{"fontSize":"10px","fontWeight":"700","textTransform":"uppercase","letterSpacing":".05em","color":"var(--orchid-300)"}}>
Completed
</div>
<div style={{"fontFamily":"'Sora'","fontWeight":"800","fontSize":"19px"}}>
{rep.completed}
</div>
</div>

                
<div style={{"background":"rgba(255,255,255,.1)","borderRadius":"11px","padding":"9px 11px"}}>
<div style={{"fontSize":"10px","fontWeight":"700","textTransform":"uppercase","letterSpacing":".05em","color":"var(--orchid-300)"}}>
Pending
</div>
<div style={{"fontFamily":"'Sora'","fontWeight":"800","fontSize":"19px"}}>
{rep.pending}
</div>
</div>

                
<div style={{"background":"rgba(255,255,255,.1)","borderRadius":"11px","padding":"9px 11px"}}>
<div style={{"fontSize":"10px","fontWeight":"700","textTransform":"uppercase","letterSpacing":".05em","color":"var(--orchid-300)"}}>
Not achieved
</div>
<div style={{"fontFamily":"'Sora'","fontWeight":"800","fontSize":"19px"}}>
{rep.notAch}
</div>
</div>

              
</div>

              
<div style={{"display":"flex","flexDirection":"column","gap":"7px","fontSize":"12.5px"}}>

                
<div style={{"display":"flex","justifyContent":"space-between"}}>
<span style={{"color":"rgba(255,255,255,.72)"}}>
This month — total achievement
</span>
<span style={{"fontWeight":"800"}}>
{rep.monthAch}
</span>
</div>

                
<div style={{"display":"flex","justifyContent":"space-between"}}>
<span style={{"color":"rgba(255,255,255,.72)"}}>
This week — weekly KPIs
</span>
<span style={{"fontWeight":"800"}}>
{rep.weekAch}
</span>
</div>

                
<div style={{"display":"flex","justifyContent":"space-between"}}>
<span style={{"color":"rgba(255,255,255,.72)"}}>
Sum of all KPI outputs
</span>
<span style={{"fontWeight":"800"}}>
{rep.totalUnits} units
</span>
</div>

                
<div style={{"display":"flex","justifyContent":"space-between"}}>
<span style={{"color":"rgba(255,255,255,.72)"}}>
KPIs assigned
</span>
<span style={{"fontWeight":"800"}}>
{rep.kpis}
</span>
</div>

              
</div>

            
</div>

          
</div>


          
{(myKpiGroups || []).map((g, $index) => (
<React.Fragment key={$index}>

          
<div style={{"display":"flex","alignItems":"center","gap":"8px","margin":"18px 0 10px"}}>
<Icon name={g.icon} style={{"width":"14px","height":"14px","color":"var(--orchid-500)"}} />
<span style={{"fontSize":"11.5px","fontWeight":"700","letterSpacing":".08em","textTransform":"uppercase","color":"var(--ink-400)"}}>
{g.name}
</span>
</div>

          
<div style={{"display":"flex","flexDirection":"column","gap":"14px"}}>

            
{(g.rows || []).map((k, $index) => (
<React.Fragment key={$index}>

              
<div style={cssTextToObject(k.cardStyle)}>

                
<div style={{"display":"flex","alignItems":"flex-start","gap":"16px"}}>

                  
<div style={{"flex":"1","minWidth":"0"}}>

                    
<div style={{"display":"flex","alignItems":"center","gap":"9px","flexWrap":"wrap"}}>
<span style={{"fontSize":"15px","fontWeight":"700","color":"var(--ink-900)"}}>
{k.kpi}
</span>
<span style={{"fontSize":"10.5px","fontWeight":"700","padding":"3px 9px","borderRadius":"999px","background":"var(--surface-50)","border":"1px solid var(--line-300)","color":"var(--ink-500)"}}>
{k.source}
</span>
<span style={{"fontSize":"10.5px","fontWeight":"700","padding":"3px 9px","borderRadius":"999px","background":"var(--orchid-100)","border":"1px solid var(--orchid-200)","color":"var(--orchid-700)"}}>
{k.freqChip}
</span>
<span style={cssTextToObject(`font-size:10.5px;font-weight:700;padding:3px 9px;border-radius:999px;background:${k.due.bg};color:${k.due.color}`)}>
{k.due.label}
</span>
</div>

                    
<div style={{"fontSize":"12px","color":"var(--ink-500)","marginTop":"4px"}}>
Linked OKR · {k.okr}
</div>

                  
</div>

                  
<div style={{"display":"flex","gap":"8px","flexShrink":"0"}}>

                    
<button onClick={k.history} style={{"display":"flex","alignItems":"center","gap":"6px","background":"var(--paper)","border":"1px solid var(--line-300)","color":"var(--ink-700)","borderRadius":"10px","padding":"8px 13px","fontSize":"12.5px","fontWeight":"700","cursor":"pointer"}}>
<Icon name={"history"} style={{"width":"14px","height":"14px"}} />
History
</button>

                    
<button onClick={k.checkin} style={cssTextToObject(k.btnStyle)}>
<Icon name={k.btnIcon} style={{"width":"14px","height":"14px"}} />
{k.btnLabel}
</button>

                  
</div>

                
</div>

                
<div style={{"display":"grid","gridTemplateColumns":"repeat(4,1fr)","gap":"14px","marginTop":"16px"}}>

                  
<div>
<div style={{"fontSize":"11px","fontWeight":"700","textTransform":"uppercase","letterSpacing":".04em","color":"var(--ink-400)","marginBottom":"3px"}}>
Baseline
</div>
<div style={{"fontSize":"14px","fontWeight":"600","color":"var(--ink-700)"}}>
{k.baseline}
</div>
</div>

                  
<div>
<div style={{"fontSize":"11px","fontWeight":"700","textTransform":"uppercase","letterSpacing":".04em","color":"var(--ink-400)","marginBottom":"3px"}}>
Current
</div>
<div style={{"fontSize":"14px","fontWeight":"700","color":"var(--ink-900)"}}>
{k.current}
</div>
</div>

                  
<div>
<div style={{"fontSize":"11px","fontWeight":"700","textTransform":"uppercase","letterSpacing":".04em","color":"var(--ink-400)","marginBottom":"3px"}}>
Target
</div>
<div style={{"fontSize":"14px","fontWeight":"600","color":"var(--ink-700)"}}>
{k.target}
</div>
</div>

                  
<div>
<div style={{"fontSize":"11px","fontWeight":"700","textTransform":"uppercase","letterSpacing":".04em","color":"var(--ink-400)","marginBottom":"3px"}}>
Achievement
</div>
<div style={cssTextToObject(`font-size:14px;font-weight:800;color:${k.achColor}`)}>
{k.ach}
</div>
</div>

                
</div>

                
<div style={{"height":"7px","borderRadius":"99px","background":"var(--line-200)","overflow":"hidden","marginTop":"14px"}}>
<div style={cssTextToObject(`height:100%;border-radius:99px;width:${k.achW};background:${k.achColor}`)} />
</div>

                
<div style={{"display":"flex","alignItems":"center","gap":"14px","marginTop":"10px","flexWrap":"wrap"}}>
<span style={{"display":"inline-flex","alignItems":"center","gap":"7px"}}>
<Icon name={"calendar-check"} style={cssTextToObject(`width:13px;height:13px;color:${k.updatedColor}`)} />
<span style={cssTextToObject(`font-size:12px;font-weight:600;color:${k.updatedColor}`)}>
{k.updated}
</span>
</span>
<span style={{"display":"inline-flex","alignItems":"center","gap":"7px"}}>
<Icon name={"clipboard-check"} style={cssTextToObject(`width:13px;height:13px;color:${k.lastCiColor}`)} />
<span style={cssTextToObject(`font-size:12px;font-weight:600;color:${k.lastCiColor}`)}>
{k.lastCi}
</span>
</span>
</div>

                
{Boolean(k.hasLinkedTasks) && (
<React.Fragment>

                  
<div style={{"marginTop":"12px","borderTop":"1px solid var(--line-200)","paddingTop":"11px"}}>

                    
<div style={{"fontSize":"10.5px","fontWeight":"700","letterSpacing":".06em","textTransform":"uppercase","color":"var(--ink-400)","marginBottom":"7px"}}>
Linked tasks — approved tasks advance this KPI
</div>

                    
<div style={{"display":"flex","flexDirection":"column","gap":"5px"}}>

                      
{(k.linkedTasks || []).map((lt, $index) => (
<React.Fragment key={$index}>

                        
<div onClick={lt.open} style={{"display":"flex","alignItems":"center","gap":"9px","padding":"6px 9px","borderRadius":"9px","cursor":"pointer"}} style-hover="background:var(--surface-50)">

                          
<span style={{"fontFamily":"'Space Mono'","fontSize":"10.5px","color":"var(--ink-400)","flexShrink":"0"}}>
{lt.code}
</span>

                          
<span style={{"flex":"1","minWidth":"0","fontSize":"12px","fontWeight":"600","color":"var(--ink-800)","whiteSpace":"nowrap","overflow":"hidden","textOverflow":"ellipsis"}}>
{lt.name}
</span>

                          
<span style={{"fontSize":"11px","fontWeight":"700","color":"var(--verify-600)","flexShrink":"0"}}>
{lt.units}
</span>

                          
<span style={cssTextToObject(`font-size:10px;font-weight:700;padding:2px 8px;border-radius:999px;background:${lt.statusBg};color:${lt.statusColor};flex-shrink:0`)}>
{lt.status}
</span>

                        
</div>

                      
</React.Fragment>
))}

                    
</div>

                  
</div>

                
</React.Fragment>
)}

              
</div>

            
</React.Fragment>
))}

          
</div>

          
</React.Fragment>
))}

        
</React.Fragment>
)}
    </React.Fragment>
  );
}
