import React from 'react';
import Icon from '../../components/Icon.jsx';
import { cssTextToObject } from '../../utils/cssText.js';

export default function TasksSection({ vm }) {
  const { showTasks2, tkFilterActive, tkFilterOptions, tkFilterVal, tkHasPending, tkHasQueue, tkHasToday, tkNext, tkNextStyle, tkNote, tkOnFilter, tkPageLabel, tkPeriodBtns, tkPeriodLabel, tkPrev, tkPrevStyle, tkQueuePending, tkQueueToday, tkRows, tkStats, tkSubFilters, tkWeek } = vm;
  return (
    <React.Fragment>
{Boolean(showTasks2) && (
<React.Fragment>

          
<div style={{"display":"flex","alignItems":"center","gap":"8px","marginBottom":"10px"}}>

            
<span style={{"fontSize":"11.5px","fontWeight":"800","letterSpacing":".06em","textTransform":"uppercase","color":"var(--ink-400)","flex":"1"}}>
{tkPeriodLabel}
</span>

            
{(tkPeriodBtns || []).map((p, $index) => (
<React.Fragment key={$index}>
<button onClick={p.set} style={cssTextToObject(p.style)}>
{p.label}
</button>
</React.Fragment>
))}

          
</div>

          
<div style={{"display":"grid","gridTemplateColumns":"repeat(4,1fr)","gap":"12px","marginBottom":"14px"}}>

            
{(tkWeek || []).map((w, $index) => (
<React.Fragment key={$index}>

              
<div style={{"background":"#fff","border":"1px solid var(--line-300)","borderRadius":"14px","padding":"13px 15px","boxShadow":"var(--shadow-sm)"}}>

                
<div style={{"fontSize":"11px","fontWeight":"700","letterSpacing":".05em","textTransform":"uppercase","color":"var(--ink-400)"}}>
{w.label}
</div>

                
<div style={{"fontFamily":"'Sora'","fontWeight":"800","fontSize":"22px","color":"var(--ink-900)","marginTop":"4px"}}>
{w.value}
</div>

                
<div style={{"height":"5px","borderRadius":"99px","background":"var(--line-200)","overflow":"hidden","marginTop":"7px"}}>
<div style={cssTextToObject(`height:100%;border-radius:99px;width:${w.pctW};background:${w.color}`)} />
</div>

                
<div style={{"fontSize":"10.5px","color":"var(--ink-400)","marginTop":"4px"}}>
{w.pct}
</div>

              
</div>

            
</React.Fragment>
))}

          
</div>

          
<div style={{"display":"grid","gridTemplateColumns":"repeat(5,1fr)","gap":"12px","marginBottom":"18px"}}>

            
{(tkStats || []).map((s, $index) => (
<React.Fragment key={$index}>

              
<div style={{"background":"#fff","border":"1px solid var(--line-300)","borderRadius":"16px","boxShadow":"var(--shadow-sm)","padding":"14px 16px"}}>

                
<div style={{"display":"flex","alignItems":"center","gap":"7px","marginBottom":"8px"}}>
<Icon name={s.icon} style={cssTextToObject(`width:14px;height:14px;color:${s.color}`)} />
<span style={{"fontSize":"11.5px","fontWeight":"600","color":"var(--ink-500)"}}>
{s.label}
</span>
</div>

                
<div style={cssTextToObject(`font-family:'Sora';font-weight:800;font-size:24px;color:${s.color}`)}>
{s.value}
</div>

              
</div>

            
</React.Fragment>
))}

          
</div>

          
<div style={{"display":"flex","alignItems":"center","gap":"10px","background":"var(--info-100)","border":"1px solid #CBE3EC","color":"var(--info-600)","padding":"11px 15px","borderRadius":"14px","fontSize":"13px","fontWeight":"600","marginBottom":"16px"}}>
<Icon name={"link"} style={{"width":"16px","height":"16px","flexShrink":"0"}} />
<span>
{tkNote}
</span>
</div>

          
<div style={{"display":"flex","alignItems":"center","gap":"10px","marginBottom":"14px"}}>

            
<div style={{"display":"flex","alignItems":"center","gap":"7px","background":"#fff","border":"1px solid var(--line-300)","borderRadius":"11px","padding":"6px 10px"}}>
<Icon name={"gauge"} style={{"width":"13px","height":"13px","color":"var(--orchid-500)"}} />
<span style={{"fontSize":"11.5px","fontWeight":"700","color":"var(--ink-500)"}}>
Effort plan
</span>
<select value={tkFilterVal} onChange={tkOnFilter} style={{"border":"none","background":"none","fontSize":"13px","fontWeight":"600","color":"var(--beet-700)","outline":"none","cursor":"pointer","maxWidth":"280px"}}>
{(tkFilterOptions || []).map((o, $index) => (
<React.Fragment key={$index}>
<option value={o}>
{o}
</option>
</React.Fragment>
))}
</select>
</div>

            
{(tkSubFilters || []).map((f, $index) => (
<React.Fragment key={$index}>

              
<div style={{"display":"flex","alignItems":"center","gap":"7px","background":"#fff","border":"1px solid var(--line-300)","borderRadius":"11px","padding":"6px 10px"}}>
<span style={{"fontSize":"11.5px","fontWeight":"700","color":"var(--ink-500)"}}>
{f.label}
</span>
<select value={f.value} onChange={f.onChange} style={{"border":"none","background":"none","fontSize":"13px","fontWeight":"600","color":"var(--beet-700)","outline":"none","cursor":"pointer"}}>
{(f.options || []).map((o, $index) => (
<React.Fragment key={$index}>
<option value={o}>
{o}
</option>
</React.Fragment>
))}
</select>
</div>

            
</React.Fragment>
))}

            
{Boolean(tkFilterActive) && (
<React.Fragment>
<span style={{"fontSize":"12px","fontWeight":"600","color":"var(--ink-500)"}}>
Showing tasks from this effort plan.
</span>
</React.Fragment>
)}

          
</div>

          
{Boolean(tkHasQueue) && (
<React.Fragment>

            
<div style={{"background":"#fff","border":"1px solid var(--line-300)","borderRadius":"18px","boxShadow":"var(--shadow-sm)","padding":"16px 20px","marginBottom":"16px"}}>

              
<div style={{"display":"flex","alignItems":"center","gap":"8px","marginBottom":"11px"}}>
<Icon name={"sun"} style={{"width":"15px","height":"15px","color":"var(--warn-600)"}} />
<span style={{"fontFamily":"'Sora'","fontWeight":"700","fontSize":"14px","color":"var(--beet-700)"}}>
My day
</span>
<span style={{"fontSize":"11.5px","color":"var(--ink-500)"}}>
— clear pending tasks before starting today's
</span>
</div>

              
{Boolean(tkHasPending) && (
<React.Fragment>

                
<div style={{"fontSize":"10.5px","fontWeight":"700","letterSpacing":".06em","textTransform":"uppercase","color":"var(--danger-600)","marginBottom":"6px"}}>
Pending — complete first
</div>

                
<div style={{"display":"flex","flexWrap":"wrap","gap":"7px","marginBottom":"11px"}}>

                  
{(tkQueuePending || []).map((q, $index) => (
<React.Fragment key={$index}>
<button onClick={q.open} style={{"display":"inline-flex","alignItems":"center","gap":"6px","fontSize":"12px","fontWeight":"700","padding":"7px 12px","borderRadius":"999px","background":"var(--danger-100)","border":"1px solid #F1C9CF","color":"var(--danger-600)","cursor":"pointer"}}>
<Icon name={"alert-circle"} style={{"width":"12px","height":"12px"}} />
{q.name}
</button>
</React.Fragment>
))}

                
</div>

              
</React.Fragment>
)}

              
{Boolean(tkHasToday) && (
<React.Fragment>

                
<div style={{"fontSize":"10.5px","fontWeight":"700","letterSpacing":".06em","textTransform":"uppercase","color":"var(--ink-400)","marginBottom":"6px"}}>
Today
</div>

                
<div style={{"display":"flex","flexWrap":"wrap","gap":"7px"}}>

                  
{(tkQueueToday || []).map((q, $index) => (
<React.Fragment key={$index}>
<button onClick={q.open} style={{"display":"inline-flex","alignItems":"center","gap":"6px","fontSize":"12px","fontWeight":"700","padding":"7px 12px","borderRadius":"999px","background":"var(--verify-100)","border":"1px solid #BFE3D0","color":"var(--verify-600)","cursor":"pointer"}}>
{Boolean(q.locked) && (
<React.Fragment>
<Icon name={"lock"} style={{"width":"12px","height":"12px"}} />
</React.Fragment>
)}
{q.name}
</button>
</React.Fragment>
))}

                
</div>

              
</React.Fragment>
)}

            
</div>

          
</React.Fragment>
)}

          
<div style={{"background":"#fff","border":"1px solid var(--line-300)","borderRadius":"20px","boxShadow":"var(--shadow-sm)","overflow":"hidden"}}>

            
<div style={{"display":"grid","gridTemplateColumns":".62fr 1.7fr .58fr .78fr .78fr .9fr .7fr 1fr .5fr","gap":"10px","padding":"12px 20px","background":"var(--surface-50)","borderBottom":"1px solid var(--line-200)","fontSize":"11px","fontWeight":"700","letterSpacing":".05em","textTransform":"uppercase","color":"var(--ink-500)"}}>

              
<span>
Task ID
</span>
<span>
Task
</span>
<span>
Day
</span>
<span>
Assignee
</span>
<span>
QC reviewer
</span>
<span>
Dates
</span>
<span>
Status
</span>
<span>
QC feedback
</span>
<span>
Action
</span>

            
</div>

            
{(tkRows || []).map((t, $index) => (
<React.Fragment key={$index}>

              
<div onClick={t.open} style={{"display":"grid","gridTemplateColumns":".62fr 1.7fr .58fr .78fr .78fr .9fr .7fr 1fr .5fr","gap":"10px","padding":"13px 20px","borderBottom":"1px solid var(--line-200)","alignItems":"center","cursor":"pointer"}} style-hover="background:var(--surface-50)">

                
<span style={{"fontFamily":"'Space Mono'","fontSize":"11px","fontWeight":"700","color":"var(--beet-700)"}}>
{t.id}
</span>

                
<div style={{"minWidth":"0"}}>

                  
<div style={{"display":"flex","alignItems":"center","gap":"7px"}}>
<span style={cssTextToObject(`width:7px;height:7px;border-radius:99px;background:${t.priDot};flex-shrink:0`)} />
<span style={{"fontSize":"13.5px","fontWeight":"700","color":"var(--ink-900)","whiteSpace":"nowrap","overflow":"hidden","textOverflow":"ellipsis"}}>
{t.name}
</span>
{Boolean(t.locked) && (
<React.Fragment>
<span style={{"display":"inline-flex","alignItems":"center","gap":"4px","fontSize":"9.5px","fontWeight":"800","padding":"2px 7px","borderRadius":"999px","background":"var(--surface-50)","border":"1px solid var(--line-300)","color":"var(--ink-400)","flexShrink":"0"}}>
<Icon name={"lock"} style={{"width":"10px","height":"10px"}} />
LOCKED
</span>
</React.Fragment>
)}
{Boolean(t.waiting) && (
<React.Fragment>
<span style={{"display":"inline-flex","alignItems":"center","gap":"4px","fontSize":"9.5px","fontWeight":"800","padding":"2px 7px","borderRadius":"999px","background":"var(--warn-100)","border":"1px solid #F0DDBB","color":"var(--warn-600)","flexShrink":"0"}}>
<Icon name={"hourglass"} style={{"width":"10px","height":"10px"}} />
{t.waiting}
</span>
</React.Fragment>
)}
</div>

                  
<div style={{"display":"flex","alignItems":"center","gap":"7px","marginTop":"4px","flexWrap":"wrap"}}>
<span style={cssTextToObject(`font-size:10.5px;font-weight:700;padding:2px 8px;border-radius:999px;background:${t.divBg};color:${t.divColor}`)}>
{t.division}
</span>
<span style={{"display":"inline-flex","alignItems":"center","gap":"5px","fontSize":"10.5px","fontWeight":"700","padding":"2px 8px","borderRadius":"999px","background":"var(--orchid-100)","color":"var(--orchid-700)"}}>
<Icon name={"target"} style={{"width":"11px","height":"11px"}} />
{t.kpi}
</span>
<span style={{"fontSize":"11px","fontWeight":"700","color":"var(--verify-600)"}}>
{t.contribution}
</span>
{Boolean(t.hasEffort) && (
<React.Fragment>
<span style={{"display":"inline-flex","alignItems":"center","gap":"5px","fontSize":"10.5px","fontWeight":"700","padding":"2px 8px","borderRadius":"999px","background":"var(--surface-50)","border":"1px solid var(--line-200)","color":"var(--ink-500)"}}>
<Icon name={"gauge"} style={{"width":"11px","height":"11px"}} />
{t.effortPlan}
</span>
</React.Fragment>
)}
</div>

                
</div>

                
<span style={cssTextToObject(`font-size:10.5px;font-weight:700;padding:4px 9px;border-radius:999px;background:${t.day.bg};color:${t.day.color};justify-self:start`)}>
{t.day.label}
</span>

                
<span style={{"fontSize":"12px","fontWeight":"600","color":"var(--ink-900)"}}>
{t.assignee}
</span>

                
<span style={{"fontSize":"12px","color":"var(--ink-700)"}}>
{t.reviewer}
</span>

                
<span style={{"minWidth":"0"}}>
<span style={{"display":"block","fontSize":"11.5px","color":"var(--ink-500)"}}>
{t.dates}
</span>
{Boolean(t.dueAlert) && (
<React.Fragment>
<span style={cssTextToObject(`display:inline-flex;align-items:center;gap:4px;font-size:10.5px;font-weight:800;color:${t.dueAlert.color};margin-top:2px`)}>
<Icon name={"alarm-clock"} style={{"width":"11px","height":"11px"}} />
{t.dueAlert.label}
</span>
</React.Fragment>
)}
</span>

                
<span style={cssTextToObject(`font-size:10.5px;font-weight:700;padding:4px 9px;border-radius:999px;background:${t.statusBg};color:${t.statusColor};justify-self:start`)}>
{t.status}
</span>

                
<span style={{"minWidth":"0","fontSize":"11.5px","fontWeight":"600","color":"var(--ink-600)","display":"-webkit-box","WebkitLineClamp":"2","WebkitBoxOrient":"vertical","overflow":"hidden"}}>
{t.qcFb}
</span>

                
<button onClick={t.open} style={{"justifySelf":"end","display":"flex","alignItems":"center","gap":"5px","background":"#fff","border":"1px solid var(--line-300)","color":"var(--ink-700)","borderRadius":"9px","padding":"7px 11px","fontSize":"12px","fontWeight":"700","cursor":"pointer"}}>
View
</button>

              
</div>

            
</React.Fragment>
))}

            
<div style={{"display":"flex","alignItems":"center","gap":"10px","padding":"12px 20px","background":"var(--surface-50)"}}>

              
<span style={{"flex":"1","fontSize":"12px","fontWeight":"600","color":"var(--ink-500)"}}>
{tkPageLabel}
</span>

              
<button onClick={tkPrev} style={cssTextToObject(tkPrevStyle)}>
<Icon name={"chevron-left"} style={{"width":"14px","height":"14px"}} />
Prev
</button>

              
<button onClick={tkNext} style={cssTextToObject(tkNextStyle)}>
Next
<Icon name={"chevron-right"} style={{"width":"14px","height":"14px"}} />
</button>

            
</div>

          
</div>

        
</React.Fragment>
)}
    </React.Fragment>
  );
}
