import React from 'react';
import Icon from '../../components/Icon.jsx';
import { cssTextToObject } from '../../utils/cssText.js';

export default function QcSection({ vm }) {
  const { kpis, qcDayChips, qcOnStatusF, qcPeriodBtns, qcPeriodLabel, qcPg, qcRows, qcStatusF, qcStatusOptions, qcWeek, showQC,
    qcCompliance, qcComplianceDiv, qcComplianceHas, qcComplianceEmpty } = vm;
  return (
    <React.Fragment>
{Boolean(showQC) && (
<React.Fragment>

          
<div style={{"display":"grid","gridTemplateColumns":"repeat(4,1fr)","gap":"16px","marginBottom":"20px"}}>

            
{(kpis || []).map((k, $index) => (
<React.Fragment key={$index}>

              
<div style={{"background":"var(--paper)","border":"1px solid var(--line-300)","borderRadius":"20px","boxShadow":"var(--shadow-sm)","padding":"18px 20px"}}>
<div style={{"fontSize":"13px","fontWeight":"600","color":"var(--ink-500)","marginBottom":"8px"}}>
{k.label}
</div>
<div style={cssTextToObject(`font-family:'Sora';font-weight:800;font-size:28px;color:${k.iconColor}`)}>
{k.value}
</div>
</div>

            
</React.Fragment>
))}

          
</div>

          
<div style={{"display":"flex","alignItems":"center","gap":"10px","background":"var(--info-100)","border":"1px solid #CBE3EC","color":"var(--info-600)","padding":"11px 15px","borderRadius":"14px","fontSize":"13px","fontWeight":"600","marginBottom":"16px"}}>
<Icon name={"shield-check"} style={{"width":"16px","height":"16px","flexShrink":"0"}} />
<span>
Mirror of the Tasks screen — submitted tasks land here for review. Approve to count toward the KPI, or add feedback and request rework. Click a row for full task detail.
</span>
</div>

          
<div style={{"display":"flex","alignItems":"center","gap":"8px","marginBottom":"10px"}}>

            
<span style={{"fontSize":"11.5px","fontWeight":"800","letterSpacing":".06em","textTransform":"uppercase","color":"var(--ink-400)","flex":"1"}}>
{qcPeriodLabel}
</span>

            
{(qcPeriodBtns || []).map((p, $index) => (
<React.Fragment key={$index}>
<button onClick={p.set} style={cssTextToObject(p.style)}>
{p.label}
</button>
</React.Fragment>
))}

          
</div>

          
<div style={{"display":"grid","gridTemplateColumns":"repeat(4,1fr)","gap":"12px","marginBottom":"14px"}}>

            
{(qcWeek || []).map((w, $index) => (
<React.Fragment key={$index}>

              
<div style={{"background":"var(--paper)","border":"1px solid var(--line-300)","borderRadius":"14px","padding":"13px 15px","boxShadow":"var(--shadow-sm)"}}>

                
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

<div style={{"background":"var(--paper)","border":"1px solid var(--line-300)","borderRadius":"18px","boxShadow":"var(--shadow-sm)","padding":"16px 18px","marginBottom":"14px"}}>
<div style={{"display":"flex","alignItems":"center","gap":"8px","marginBottom":"12px"}}>
<Icon name={"clipboard-check"} style={{"width":"15px","height":"15px","color":"var(--orchid-600)","flexShrink":"0"}} />
<span style={{"fontSize":"11.5px","fontWeight":"800","letterSpacing":".06em","textTransform":"uppercase","color":"var(--ink-400)"}}>Compliance quality — from checklist data</span>
</div>
{Boolean(qcComplianceHas) && (
<React.Fragment>
<div style={{"display":"grid","gridTemplateColumns":"repeat(auto-fit,minmax(150px,1fr))","gap":"10px"}}>
{(qcCompliance || []).map((c, $index) => (
<React.Fragment key={$index}>
<div style={{"background":"var(--surface-50)","border":"1px solid var(--line-200)","borderRadius":"12px","padding":"12px 14px"}}>
<div style={{"fontSize":"10px","fontWeight":"700","letterSpacing":".05em","textTransform":"uppercase","color":"var(--ink-400)"}}>{c.label}</div>
<div style={cssTextToObject(`font-family:'Sora';font-weight:800;font-size:20px;color:${c.color};margin-top:3px`)}>{c.value}</div>
<div style={{"fontSize":"10px","color":"var(--ink-400)","marginTop":"2px"}}>{c.sub}</div>
</div>
</React.Fragment>
))}
</div>
<div style={{"display":"flex","flexDirection":"column","gap":"10px","marginTop":"14px"}}>
{(qcComplianceDiv || []).map((d, $index) => (
<div key={$index}>
<div style={{"display":"flex","alignItems":"center","gap":"10px","marginBottom":"4px"}}>
<span style={{"fontSize":"12.5px","fontWeight":"700","color":"var(--ink-900)","flex":"1","minWidth":"0"}}>{d.label}</span>
<span style={{"fontSize":"11px","color":"var(--ink-500)"}}>{d.sub}</span>
<span style={{"fontSize":"12px","fontWeight":"800","color":"var(--ink-900)","width":"44px","textAlign":"right"}}>{d.selfPct}</span>
</div>
<div style={{"height":"7px","borderRadius":"99px","background":"var(--line-200)","overflow":"hidden"}}>
<div style={cssTextToObject(`height:100%;border-radius:99px;width:${d.w};background:${d.color}`)} />
</div>
</div>
))}
</div>
</React.Fragment>
)}
{Boolean(qcComplianceEmpty) && (
<div style={{"fontSize":"12px","color":"var(--ink-500)"}}>No checklist entries yet — open a task, fill the compliance checklist and submit it to populate these metrics.</div>
)}
</div>

<div style={{"display":"flex","alignItems":"center","gap":"8px","marginBottom":"14px","flexWrap":"wrap"}}>


{(qcDayChips || []).map((c, $index) => (
<React.Fragment key={$index}>

              
<button onClick={c.set} style={cssTextToObject(c.style)}>
{c.label}
<span style={cssTextToObject(c.countStyle)}>
{c.count}
</span>
</button>

            
</React.Fragment>
))}

            
<div style={{"display":"flex","alignItems":"center","gap":"7px","background":"var(--paper)","border":"1px solid var(--line-300)","borderRadius":"11px","padding":"6px 10px","marginLeft":"auto"}}>
<span style={{"fontSize":"11.5px","fontWeight":"700","color":"var(--ink-500)"}}>
Status
</span>
<select value={qcStatusF} onChange={qcOnStatusF} style={{"border":"none","background":"none","fontSize":"13px","fontWeight":"600","color":"var(--ink-900)","outline":"none","cursor":"pointer"}}>
{(qcStatusOptions || []).map((o, $index) => (
<React.Fragment key={$index}>
<option value={o}>
{o}
</option>
</React.Fragment>
))}
</select>
</div>

          
</div>

          
<div style={{"background":"var(--paper)","border":"1px solid var(--line-300)","borderRadius":"20px","boxShadow":"var(--shadow-sm)","overflow":"hidden"}}>

            
<div style={{"display":"grid","gridTemplateColumns":"2fr .7fr .9fr .9fr .8fr 1.6fr","gap":"12px","padding":"12px 20px","background":"var(--surface-50)","borderBottom":"1px solid var(--line-200)","fontSize":"11px","fontWeight":"700","letterSpacing":".05em","textTransform":"uppercase","color":"var(--ink-500)"}}>

              
<span>
Task
</span>
<span>
Priority
</span>
<span>
Assignee
</span>
<span>
Dates
</span>
<span>
Status
</span>
<span>
QC action & feedback
</span>

            
</div>

            
{(qcRows || []).map((q, $index) => (
<React.Fragment key={$index}>

              
<div onClick={q.open} style={{"display":"grid","gridTemplateColumns":"2fr .7fr .9fr .9fr .8fr 1.6fr","gap":"12px","padding":"13px 20px","borderBottom":"1px solid var(--line-200)","alignItems":"center","cursor":"pointer"}} style-hover="background:var(--surface-50)">

                
<div style={{"minWidth":"0"}}>

                  
<div style={{"display":"flex","alignItems":"center","gap":"8px"}}>
<span style={cssTextToObject(`font-size:9.5px;font-weight:800;letter-spacing:.05em;text-transform:uppercase;padding:2px 7px;border-radius:6px;background:${q.moduleBg};color:${q.moduleColor};flex-shrink:0`)}>
{q.module}
</span>
<span style={{"fontFamily":"'Space Mono'","fontSize":"10.5px","color":"var(--ink-400)"}}>
{q.id}
</span>
<span style={{"fontSize":"13.5px","fontWeight":"700","color":"var(--ink-900)","whiteSpace":"nowrap","overflow":"hidden","textOverflow":"ellipsis"}}>
{q.name}
</span>
</div>


<div style={{"display":"flex","alignItems":"center","gap":"7px","marginTop":"4px","flexWrap":"wrap"}}>
{Boolean(q.hasContentType) && (
<span style={{"fontSize":"10.5px","fontWeight":"700","padding":"2px 8px","borderRadius":"999px","background":"var(--info-100)","color":"var(--info-600)"}}>
Content Type: {q.contentType}
</span>
)}
<span style={{"display":"inline-flex","alignItems":"center","gap":"5px","fontSize":"10.5px","fontWeight":"700","padding":"2px 8px","borderRadius":"999px","background":"var(--orchid-100)","color":"var(--orchid-700)"}}>
<Icon name={"target"} style={{"width":"11px","height":"11px"}} />
{q.kpi}
</span>
<span style={{"fontSize":"11px","fontWeight":"700","color":"var(--verify-600)"}}>
{q.contribution}
</span>
{Boolean(q.hasEffort) && (
<React.Fragment>
<span style={{"display":"inline-flex","alignItems":"center","gap":"5px","fontSize":"10.5px","fontWeight":"700","padding":"2px 8px","borderRadius":"999px","background":"var(--surface-50)","border":"1px solid var(--line-200)","color":"var(--ink-500)"}}>
<Icon name={"gauge"} style={{"width":"11px","height":"11px"}} />
{q.effortPlan}
</span>
</React.Fragment>
)}
</div>

                
</div>


<span style={{"display":"inline-flex","alignItems":"center","gap":"6px","fontSize":"12px","fontWeight":"700","color":"var(--ink-700)"}}>
<span style={cssTextToObject(`width:8px;height:8px;border-radius:99px;background:${q.priDot}`)} />
{q.priority}
</span>

                
<span style={{"fontSize":"12.5px","color":"var(--ink-700)"}}>
{q.assignee}
</span>

                
<span style={{"minWidth":"0"}}>
<span style={{"display":"block","fontSize":"12px","color":"var(--ink-500)"}}>
{q.dates}
</span>
{Boolean(q.dueAlert) && (
<React.Fragment>
<span style={cssTextToObject(`display:inline-flex;align-items:center;gap:4px;font-size:10.5px;font-weight:800;color:${q.dueAlert.color};margin-top:2px`)}>
<Icon name={"alarm-clock"} style={{"width":"11px","height":"11px"}} />
{q.dueAlert.label}
</span>
</React.Fragment>
)}
</span>

                
<span style={cssTextToObject(`font-size:11px;font-weight:700;padding:4px 10px;border-radius:999px;background:${q.statusBg};color:${q.statusColor};justify-self:start`)}>
{q.status}
</span>


<div onClick={q.stopClick} style={{"minWidth":"0"}}>
{Boolean(q.qcHasVerdicts) && (
<div style={{"display":"flex","alignItems":"center","gap":"6px","marginBottom":"5px"}}>
<Icon name={"clipboard-check"} style={{"width":"12px","height":"12px","color":"var(--orchid-600)","flexShrink":"0"}} />
<span style={{"fontSize":"11px","fontWeight":"700","color":"var(--orchid-700)"}}>{q.qcVerdictLine}</span>
</div>
)}
{Boolean(q.qcHasOverall) && (
<div style={{"display":"flex","alignItems":"flex-start","gap":"6px","marginBottom":"5px"}}>
<Icon name={"message-square-quote"} style={cssTextToObject(`width:12px;height:12px;color:${q.feedbackColor};flex-shrink:0;margin-top:2px`)} />
<span style={{"fontSize":"11.5px","fontWeight":"600","color":"var(--ink-700)","lineHeight":"1.45"}}>{q.qcOverall}</span>
</div>
)}
{Boolean(q.qcHasComments) && (
<div style={{"display":"flex","flexDirection":"column","gap":"3px","marginBottom":"6px"}}>
{(q.qcLineComments || []).map((c, $i2) => (
<div key={$i2} style={{"display":"flex","alignItems":"flex-start","gap":"6px"}}>
<span style={cssTextToObject(`font-size:9.5px;font-weight:800;padding:1px 6px;border-radius:5px;background:${c.bg};color:${c.color};flex-shrink:0`)}>{c.verdict}</span>
<span style={{"fontSize":"11px","color":"var(--ink-500)","lineHeight":"1.4"}}><span style={{"fontWeight":"700","color":"var(--ink-700)"}}>{c.kpi}</span> — {c.text}</span>
</div>
))}
<span style={{"fontSize":"10px","color":"var(--ink-400)"}}>{q.qcMoreComments}</span>
</div>
)}
{Boolean(q.qcNoComments) && (
<div style={{"fontSize":"11px","color":"var(--ink-400)","marginBottom":"6px"}}>No comments yet — review inside to record them.</div>
)}
<button onClick={q.open} style={cssTextToObject(q.qcReviewStyle)}>
<Icon name={"shield-check"} style={{"width":"12px","height":"12px"}} />{q.qcReviewLabel}
</button>
</div>

              
</div>

            
</React.Fragment>
))}

            
{Boolean(qcPg.show) && (
<React.Fragment>

              
<div style={{"display":"flex","alignItems":"center","gap":"10px","padding":"12px 20px","background":"var(--surface-50)"}}>
<span style={{"flex":"1","fontSize":"12px","fontWeight":"600","color":"var(--ink-500)"}}>
{qcPg.label}
</span>
<button onClick={qcPg.prev} style={cssTextToObject(qcPg.prevStyle)}>
<Icon name={"chevron-left"} style={{"width":"14px","height":"14px"}} />
Prev
</button>
<button onClick={qcPg.next} style={cssTextToObject(qcPg.nextStyle)}>
Next
<Icon name={"chevron-right"} style={{"width":"14px","height":"14px"}} />
</button>
</div>

            
</React.Fragment>
)}

          
</div>

        
</React.Fragment>
)}
    </React.Fragment>
  );
}
