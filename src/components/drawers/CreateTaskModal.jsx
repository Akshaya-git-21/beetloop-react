import React from 'react';
import Icon from '../../components/Icon.jsx';

export default function CreateTaskModal({ vm }) {
  const { stop, tkAssigneeOptions, tkCloseNew, tkCode, tkDepOptions, tkDivisionOptions, tkEffortOptions, tkEffortRowOptions, tkEffortRowVal, tkHasPlan, tkKpiOptions, tkNew, tkPlanInfo, tkReviewerOptions, tkSetAssignee, tkSetCampaign, tkSetDep, tkSetDepMode, tkSetDesc, tkSetDivision, tkSetEffort, tkSetEffortRow, tkSetEnd, tkSetEst, tkSetKpi, tkSetName, tkSetPriority, tkSetProject, tkSetRecurrence, tkSetReviewer, tkSetStart, tkSetTemplate, tkSetUnits, tkSubmitNew, tkTplChecklist, tkTplOptions, tkf } = vm;
  return (
    <React.Fragment>
{Boolean(tkNew) && (
<React.Fragment>

  
<div onClick={tkCloseNew} style={{"position":"fixed","inset":"0","background":"rgba(31,8,20,.5)","backdropFilter":"blur(3px)","zIndex":"170","display":"flex","alignItems":"center","justifyContent":"center","padding":"24px"}}>

    
<div onClick={stop} className="blscroll" style={{"width":"100%","maxWidth":"640px","maxHeight":"90vh","overflowY":"auto","background":"#fff","borderRadius":"22px","boxShadow":"var(--shadow-xl)","animation":"blrise .3s var(--ease-out)"}}>

      
<div style={{"position":"sticky","top":"0","background":"#fff","padding":"20px 26px","borderBottom":"1px solid var(--line-200)","display":"flex","alignItems":"flex-start","justifyContent":"space-between","zIndex":"2"}}>

        
<div>
<div style={{"fontSize":"11px","fontWeight":"700","letterSpacing":".1em","textTransform":"uppercase","color":"var(--orchid-500)"}}>
Tasks
</div>
<h3 style={{"fontFamily":"'Sora'","fontWeight":"700","fontSize":"20px","color":"var(--beet-700)","margin":"4px 0 0"}}>
Create task
</h3>
<div style={{"display":"flex","alignItems":"center","gap":"8px","marginTop":"6px"}}>
<span style={{"fontSize":"11px","fontWeight":"700","color":"var(--ink-500)"}}>
Task ID
</span>
<span style={{"fontFamily":"'Space Mono'","fontSize":"12.5px","fontWeight":"700","color":"var(--beet-700)","background":"var(--surface-50)","border":"1px solid var(--line-300)","borderRadius":"7px","padding":"2px 9px"}}>
{tkCode}
</span>
<span style={{"fontSize":"10.5px","color":"var(--ink-400)"}}>
auto-generated
</span>
</div>
</div>

        
<button onClick={tkCloseNew} style={{"width":"34px","height":"34px","borderRadius":"10px","border":"1px solid var(--line-300)","background":"#fff","cursor":"pointer","display":"flex","alignItems":"center","justifyContent":"center"}}>
<Icon name={"x"} style={{"width":"17px","height":"17px","color":"var(--ink-700)"}} />
</button>

      
</div>

      
<div style={{"padding":"22px 26px","display":"flex","flexDirection":"column","gap":"14px"}}>

        
<div style={{"display":"grid","gridTemplateColumns":"1fr 1fr","gap":"14px"}}>

          
<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Task template (Task Master)
</label>
<select value={tkf.template} onChange={tkSetTemplate} style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","background":"#fff"}}>
{(tkTplOptions || []).map((o, $index) => (
<React.Fragment key={$index}>
<option value={o.name}>
{o.name}
</option>
</React.Fragment>
))}
</select>
</div>

          
<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Priority
</label>
<select value={tkf.priority} onChange={tkSetPriority} style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","background":"#fff"}}>
<option>
Critical
</option>
<option>
High
</option>
<option>
Medium
</option>
<option>
Low
</option>
</select>
</div>

        
</div>

        
<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Task name
</label>
<input value={tkf.name} onInput={tkSetName} placeholder="e.g. Fix broken links — PepCreations" style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","outline":"none"}} />
</div>

        
<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Description
</label>
<textarea value={tkf.desc} onInput={tkSetDesc} rows="2" placeholder="What needs to be done and the acceptance criteria" style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","outline":"none","resize":"vertical"}} />
</div>

        
<div style={{"display":"grid","gridTemplateColumns":"1fr 1fr","gap":"14px"}}>

          
<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Project
</label>
<input value={tkf.project} onInput={tkSetProject} placeholder="e.g. Pubrica SEO program" style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","outline":"none"}} />
</div>

          
<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Campaign
</label>
<input value={tkf.campaign} onInput={tkSetCampaign} placeholder="e.g. Q3 SEO push" style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","outline":"none"}} />
</div>

          
<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Start date
</label>
<input type="date" value={tkf.start} onInput={tkSetStart} style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","outline":"none","background":"#fff"}} />
</div>

          
<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
End date
</label>
<input type="date" value={tkf.end} onInput={tkSetEnd} style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","outline":"none","background":"#fff"}} />
</div>

          
<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Assignee
</label>
<select value={tkf.assignee} onChange={tkSetAssignee} style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","background":"#fff"}}>
{(tkAssigneeOptions || []).map((o, $index) => (
<React.Fragment key={$index}>
<option value={o}>
{o}
</option>
</React.Fragment>
))}
</select>
</div>

          
<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Task type / division
</label>
<select value={tkf.division} onChange={tkSetDivision} style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","background":"#fff"}}>
{(tkDivisionOptions || []).map((o, $index) => (
<React.Fragment key={$index}>
<option value={o}>
{o}
</option>
</React.Fragment>
))}
</select>
</div>

          
<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Reviewer / QC
</label>
<select value={tkf.reviewer} onChange={tkSetReviewer} style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","background":"#fff"}}>
{(tkReviewerOptions || []).map((o, $index) => (
<React.Fragment key={$index}>
<option value={o}>
{o}
</option>
</React.Fragment>
))}
</select>
</div>

          
<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Recurrence
</label>
<select value={tkf.recurrence} onChange={tkSetRecurrence} style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","background":"#fff"}}>
<option>
None
</option>
<option>
Daily
</option>
<option>
Weekly
</option>
<option>
Monthly
</option>
</select>
</div>

        
</div>

        
<div style={{"background":"var(--orchid-100)","border":"1px solid var(--orchid-200)","borderRadius":"14px","padding":"14px 16px","display":"flex","flexDirection":"column","gap":"12px"}}>

          
<div style={{"display":"flex","alignItems":"center","gap":"7px"}}>
<Icon name={"gauge"} style={{"width":"14px","height":"14px","color":"var(--orchid-700)"}} />
<span style={{"fontSize":"11.5px","fontWeight":"700","letterSpacing":".08em","textTransform":"uppercase","color":"var(--orchid-700)"}}>
Effort linkage
</span>
</div>

          
<div style={{"display":"grid","gridTemplateColumns":"1fr 1fr","gap":"12px"}}>

            
<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Effort plan
</label>
<select value={tkf.effortPlan} onChange={tkSetEffort} style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13px","background":"#fff"}}>
{(tkEffortOptions || []).map((o, $index) => (
<React.Fragment key={$index}>
<option value={o.v}>
{o.label}
</option>
</React.Fragment>
))}
</select>
</div>

            
{Boolean(tkHasPlan) && (
<React.Fragment>

              
<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Effort (from this plan)
</label>
<select value={tkEffortRowVal} onChange={tkSetEffortRow} style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13px","background":"#fff"}}>
{(tkEffortRowOptions || []).map((o, $index) => (
<React.Fragment key={$index}>
<option value={o.v}>
{o.label}
</option>
</React.Fragment>
))}
</select>
</div>

            
</React.Fragment>
)}

          
</div>

          
{Boolean(tkHasPlan) && (
<React.Fragment>

            
<div style={{"display":"flex","alignItems":"center","gap":"7px","fontSize":"12px","color":"var(--ink-500)"}}>
<Icon name={"info"} style={{"width":"13px","height":"13px","color":"var(--orchid-600)"}} />
<span>
{tkPlanInfo} — selecting an effort auto-fills the KPI, priority & contribution below.
</span>
</div>

          
</React.Fragment>
)}

        
</div>

        
<div style={{"background":"var(--surface-50)","border":"1px solid var(--line-200)","borderRadius":"14px","padding":"14px 16px","display":"flex","flexDirection":"column","gap":"12px"}}>

          
<div style={{"fontSize":"11.5px","fontWeight":"700","letterSpacing":".08em","textTransform":"uppercase","color":"var(--orchid-500)"}}>
KPI linkage
</div>

          
<div style={{"display":"grid","gridTemplateColumns":"2fr 1fr 1fr","gap":"12px"}}>

            
<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Linked KPI
</label>
<select value={tkf.kpiId} onChange={tkSetKpi} style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13px","background":"#fff"}}>
{(tkKpiOptions || []).map((o, $index) => (
<React.Fragment key={$index}>
<option value={o.id}>
{o.label}
</option>
</React.Fragment>
))}
</select>
</div>

            
<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Contribution units
</label>
<input value={tkf.units} onInput={tkSetUnits} placeholder="e.g. 40" style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","outline":"none"}} />
</div>

            
<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Est. hours
</label>
<input value={tkf.estH} onInput={tkSetEst} placeholder="e.g. 8" style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","outline":"none"}} />
</div>

          
</div>

          
<div style={{"fontSize":"11.5px","color":"var(--ink-500)"}}>
Counted toward the KPI only after QC approval.
</div>

        
</div>

        
<div style={{"display":"grid","gridTemplateColumns":"2fr 1fr","gap":"14px"}}>

          
<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Dependency (upstream task)
</label>
<select value={tkf.dep} onChange={tkSetDep} style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13px","background":"#fff"}}>
{(tkDepOptions || []).map((o, $index) => (
<React.Fragment key={$index}>
<option value={o}>
{o}
</option>
</React.Fragment>
))}
</select>
</div>

          
<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Dependency mode
</label>
<select value={tkf.depMode} onChange={tkSetDepMode} style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13px","background":"#fff"}}>
<option>
Parallel
</option>
<option>
Sequential
</option>
</select>
<div style={{"fontSize":"10.5px","color":"var(--ink-400)","marginTop":"4px"}}>
Sequential = starts only after the upstream task is QC-approved
</div>
</div>

        
</div>

        
<div style={{"display":"flex","alignItems":"center","gap":"9px","background":"var(--surface-50)","border":"1px solid var(--line-200)","borderRadius":"12px","padding":"11px 14px","fontSize":"12.5px","color":"var(--ink-500)"}}>
<Icon name={"list-checks"} style={{"width":"15px","height":"15px","flexShrink":"0","color":"var(--orchid-600)"}} />
<span>
Checklist from template: 
<strong style={{"color":"var(--ink-700)"}}>
{tkTplChecklist}
</strong>
</span>
</div>

      
</div>

      
<div style={{"position":"sticky","bottom":"0","background":"#fff","padding":"16px 26px","borderTop":"1px solid var(--line-200)","display":"flex","justifyContent":"flex-end","gap":"10px"}}>

        
<button onClick={tkCloseNew} style={{"padding":"10px 18px","border":"1px solid var(--line-300)","background":"#fff","borderRadius":"11px","fontSize":"13.5px","fontWeight":"700","color":"var(--ink-700)","cursor":"pointer"}}>
Cancel
</button>

        
<button onClick={tkSubmitNew} style={{"padding":"10px 20px","border":"none","background":"#7A1C46","color":"#fff","borderRadius":"11px","fontSize":"13.5px","fontWeight":"700","cursor":"pointer","display":"flex","alignItems":"center","gap":"7px"}}>
<Icon name={"user-check"} style={{"width":"15px","height":"15px"}} />
Create & assign
</button>

      
</div>

    
</div>

  
</div>


</React.Fragment>
)}
    </React.Fragment>
  );
}
