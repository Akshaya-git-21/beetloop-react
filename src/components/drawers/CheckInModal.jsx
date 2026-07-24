import React from 'react';
import Icon from '../../components/Icon.jsx';
import { cssTextToObject } from '../../utils/cssText.js';

export default function CheckInModal({ vm }) {
  const { cf, ciAddFile, ciDate, ciFiles, ciFlagOn, ciFlagStyle, ciHasFiles, ciKpis, ciNeedsActuals, ciOpen, ciProgress, ciSetAcc, ciSetChal, ciSetComment, ciSetConf, ciSetDate, ciSetDecision, ciSetDep, ciSetHealth, ciSetNext, ciSetRisk, ciSetSupport, ciSubtitle, ciTitle, ciToggleFlag, closeCi, isCiExec, isCiKpi, isCiLead, isCiManager, isCiSenior, stop, submitCi, submitCiEscalate } = vm;
  return (
    <React.Fragment>
{Boolean(ciOpen) && (
<React.Fragment>

  
<div onClick={closeCi} style={{"position":"fixed","inset":"0","background":"rgba(31,8,20,.5)","backdropFilter":"blur(3px)","zIndex":"170","display":"flex","alignItems":"center","justifyContent":"center","padding":"24px"}}>

    
<div onClick={stop} className="blscroll" style={{"width":"100%","maxWidth":"520px","maxHeight":"90vh","overflowY":"auto","background":"#fff","borderRadius":"22px","boxShadow":"var(--shadow-xl)","animation":"blrise .3s var(--ease-out)"}}>

      
<div style={{"position":"sticky","top":"0","background":"#fff","padding":"20px 24px","borderBottom":"1px solid var(--line-200)","display":"flex","alignItems":"flex-start","justifyContent":"space-between","zIndex":"2"}}>

        
<div>
<div style={{"fontSize":"11px","fontWeight":"700","letterSpacing":".1em","textTransform":"uppercase","color":"var(--orchid-500)"}}>
{ciTitle}
</div>
<h3 style={{"fontFamily":"'Sora'","fontWeight":"700","fontSize":"18px","color":"var(--beet-700)","margin":"4px 0 0"}}>
{ciSubtitle}
</h3>
<div style={{"display":"flex","alignItems":"center","gap":"6px","fontSize":"12px","color":"var(--verify-600)","fontWeight":"600","marginTop":"5px"}}>
<Icon name={"zap"} style={{"width":"13px","height":"13px"}} />
{ciProgress}
</div>
</div>

        
<button onClick={closeCi} style={{"width":"32px","height":"32px","borderRadius":"9px","border":"1px solid var(--line-300)","background":"#fff","cursor":"pointer","display":"flex","alignItems":"center","justifyContent":"center"}}>
<Icon name={"x"} style={{"width":"16px","height":"16px","color":"var(--ink-700)"}} />
</button>

      
</div>

      
<div style={{"padding":"22px 24px","display":"flex","flexDirection":"column","gap":"14px"}}>


        
{Boolean(ciNeedsActuals) && (
<React.Fragment>

          
<div style={{"display":"flex","alignItems":"flex-end","gap":"12px"}}>

            
<div style={{"flex":"1"}}>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Reporting date
</label>
<input value={ciDate} onInput={ciSetDate} style={{"width":"100%","padding":"11px 13px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"14px","outline":"none"}} />
</div>

          
</div>

          
<div>

            
<div style={{"fontSize":"11.5px","fontWeight":"700","letterSpacing":".06em","textTransform":"uppercase","color":"var(--ink-400)","marginBottom":"8px"}}>
Report actuals — assigned KPIs
</div>

            
<div style={{"border":"1px solid var(--line-200)","borderRadius":"12px","overflow":"hidden"}}>

              
<div style={{"display":"grid","gridTemplateColumns":"1.5fr .9fr .9fr 1fr .6fr","gap":"10px","padding":"9px 14px","background":"var(--surface-50)","fontSize":"10.5px","fontWeight":"700","textTransform":"uppercase","letterSpacing":".04em","color":"var(--ink-400)"}}>
<span>
KPI
</span>
<span>
Target
</span>
<span>
Last
</span>
<span>
Actual now
</span>
<span>
Ach.
</span>
</div>

              
{(ciKpis || []).map((k, $index) => (
<React.Fragment key={$index}>

                
<div style={{"display":"grid","gridTemplateColumns":"1.5fr .9fr .9fr 1fr .6fr","gap":"10px","padding":"10px 14px","borderTop":"1px solid var(--line-200)","alignItems":"center"}}>

                  
<div style={{"fontSize":"12.5px","fontWeight":"600","color":"var(--ink-900)"}}>
{k.kpi}
</div>

                  
<div style={{"fontSize":"12px","color":"var(--ink-500)"}}>
{k.target}
</div>

                  
<div style={{"fontSize":"12px","color":"var(--ink-500)"}}>
{k.prev}
</div>

                  
<input value={k.actVal} onInput={k.onAct} placeholder="value" style={{"width":"100%","padding":"7px 9px","border":"1px solid var(--line-300)","borderRadius":"8px","fontSize":"12.5px","outline":"none"}} />

                  
<div style={cssTextToObject(`font-size:12.5px;font-weight:800;color:${k.achColor}`)}>
{k.ach}
</div>

                
</div>

              
</React.Fragment>
))}

            
</div>

            
<div style={{"fontSize":"11.5px","color":"var(--ink-400)","marginTop":"7px"}}>
KPI names & targets are locked — you report the measured actual; achievement recalculates automatically.
</div>

          
</div>

          
<div style={{"height":"1px","background":"var(--line-200)","margin":"2px 0"}} />

        
</React.Fragment>
)}


        
{Boolean(isCiKpi) && (
<React.Fragment>

          
<div style={{"fontSize":"11.5px","fontWeight":"700","letterSpacing":".06em","textTransform":"uppercase","color":"var(--ink-400)"}}>
Blockers, support & next week
</div>

          
<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Current blockers
</label>
<textarea value={cf.challenges} onInput={ciSetChal} rows="2" placeholder="e.g. API delays from engineering — blocking Integration API Configuration task" style={{"width":"100%","padding":"11px 13px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"14px","outline":"none","resize":"vertical"}} />
</div>

          
<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Support needed from Manager
</label>
<textarea value={cf.support} onInput={ciSetSupport} rows="2" placeholder="e.g. Need engineering to prioritize API fix by May 20" style={{"width":"100%","padding":"11px 13px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"14px","outline":"none","resize":"vertical"}} />
</div>

          
<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Next week commitment
</label>
<textarea value={cf.next} onInput={ciSetNext} rows="2" placeholder="e.g. Complete 5 pending training sessions + resolve API blocker with Ankit" style={{"width":"100%","padding":"11px 13px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"14px","outline":"none","resize":"vertical"}} />
</div>

          
<div>

            
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Evidence / attachments
</label>

            
<button onClick={ciAddFile} style={{"width":"100%","border":"1px dashed var(--line-300)","borderRadius":"12px","background":"var(--surface-50)","padding":"20px","display":"flex","flexDirection":"column","alignItems":"center","gap":"6px","color":"var(--ink-400)","cursor":"pointer"}}>

              
<Icon name={"paperclip"} style={{"width":"20px","height":"20px"}} />

              
<span style={{"fontSize":"13px","fontWeight":"700","color":"var(--ink-700)"}}>
Drag & drop or browse files
</span>

              
<span style={{"fontSize":"11.5px"}}>
Screenshots, reports, survey exports
</span>

            
</button>

            
{Boolean(ciHasFiles) && (
<React.Fragment>

              
<div style={{"display":"flex","flexWrap":"wrap","gap":"7px","marginTop":"9px"}}>

                
{(ciFiles || []).map((f, $index) => (
<React.Fragment key={$index}>

                  
<span style={{"display":"inline-flex","alignItems":"center","gap":"7px","fontSize":"12px","fontWeight":"600","padding":"5px 8px 5px 11px","borderRadius":"999px","background":"var(--orchid-100)","border":"1px solid var(--orchid-200)","color":"var(--orchid-700)"}}>
<Icon name={"file"} style={{"width":"12px","height":"12px"}} />
{f.name}
<button onClick={f.remove} style={{"background":"none","border":"none","cursor":"pointer","color":"var(--orchid-700)","display":"flex","padding":"0"}}>
<Icon name={"x"} style={{"width":"13px","height":"13px"}} />
</button>
</span>

                
</React.Fragment>
))}

              
</div>

            
</React.Fragment>
)}

          
</div>

          
<button onClick={ciToggleFlag} style={cssTextToObject(ciFlagStyle)}>
<Icon name={"flag"} style={{"width":"16px","height":"16px"}} />
<span style={{"flex":"1","textAlign":"left"}}>
Flag for Manager review
</span>
{Boolean(ciFlagOn) && (
<React.Fragment>
<Icon name={"check"} style={{"width":"16px","height":"16px"}} />
</React.Fragment>
)}
</button>

        
</React.Fragment>
)}


        
{Boolean(isCiSenior) && (
<React.Fragment>

          
<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Accomplishments this week
</label>
<textarea value={cf.accomplishments} onInput={ciSetAcc} rows="2" placeholder="e.g. Cleared audit backlog; shipped 4 on-page fixes" style={{"width":"100%","padding":"11px 13px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"14px","outline":"none","resize":"vertical"}} />
</div>

          
<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Challenges / blockers
</label>
<textarea value={cf.challenges} onInput={ciSetChal} rows="2" placeholder="What's slowing you down?" style={{"width":"100%","padding":"11px 13px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"14px","outline":"none","resize":"vertical"}} />
</div>

          
<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Risks & dependencies
</label>
<textarea value={cf.dependencies} onInput={ciSetDep} rows="2" placeholder="e.g. Awaiting content approval for 2 pages" style={{"width":"100%","padding":"11px 13px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"14px","outline":"none","resize":"vertical"}} />
</div>

          
<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Confidence to hit target
</label>
<select value={cf.confidence} onChange={ciSetConf} style={{"width":"100%","padding":"11px 13px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"14px","background":"#fff"}}>
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

        
</React.Fragment>
)}


        
{Boolean(isCiLead) && (
<React.Fragment>

          
<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Weekly accomplishments
</label>
<textarea value={cf.accomplishments} onInput={ciSetAcc} rows="2" placeholder="What the team delivered this week" style={{"width":"100%","padding":"11px 13px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"14px","outline":"none","resize":"vertical"}} />
</div>

          
<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Challenges
</label>
<textarea value={cf.challenges} onInput={ciSetChal} rows="2" placeholder="Team blockers" style={{"width":"100%","padding":"11px 13px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"14px","outline":"none","resize":"vertical"}} />
</div>

          
<div style={{"display":"grid","gridTemplateColumns":"1fr 1fr","gap":"12px"}}>

            
<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Risks
</label>
<textarea value={cf.risks} onInput={ciSetRisk} rows="2" placeholder="Key risks" style={{"width":"100%","padding":"11px 13px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"14px","outline":"none","resize":"vertical"}} />
</div>

            
<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Dependency issues
</label>
<textarea value={cf.dependencies} onInput={ciSetDep} rows="2" placeholder="Cross-team dependencies" style={{"width":"100%","padding":"11px 13px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"14px","outline":"none","resize":"vertical"}} />
</div>

          
</div>

          
<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Support required
</label>
<input value={cf.support} onInput={ciSetSupport} placeholder="What you need from Manager / other teams" style={{"width":"100%","padding":"11px 13px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"14px","outline":"none"}} />
</div>

          
<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Next week's priorities
</label>
<textarea value={cf.next} onInput={ciSetNext} rows="2" placeholder="Top focus items for next week" style={{"width":"100%","padding":"11px 13px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"14px","outline":"none","resize":"vertical"}} />
</div>

        
</React.Fragment>
)}


        
{Boolean(isCiManager) && (
<React.Fragment>

          
<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Manager comments
</label>
<textarea value={cf.comment} onInput={ciSetComment} rows="3" placeholder="Assessment of progress, team performance and KPI trends…" style={{"width":"100%","padding":"11px 13px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"14px","outline":"none","resize":"vertical"}} />
</div>

          
<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Overall health *
</label>
<select value={cf.health} onChange={ciSetHealth} style={{"width":"100%","padding":"11px 13px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"14px","background":"#fff"}}>
<option value>
Select…
</option>
<option>
Healthy
</option>
<option>
At Risk
</option>
<option>
Critical
</option>
</select>
</div>

          
<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Decision
</label>
<select value={cf.decision} onChange={ciSetDecision} style={{"width":"100%","padding":"11px 13px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"14px","background":"#fff"}}>
<option>
Continue
</option>
<option>
Needs Attention
</option>
<option>
Escalate
</option>
</select>
</div>

        
</React.Fragment>
)}


        
{Boolean(isCiExec) && (
<React.Fragment>

          
<div style={{"background":"var(--surface-50)","border":"1px solid var(--line-200)","borderRadius":"12px","padding":"12px 14px","fontSize":"12.5px","color":"var(--ink-500)","display":"flex","gap":"9px","alignItems":"flex-start"}}>
<Icon name={"info"} style={{"width":"15px","height":"15px","flexShrink":"0","marginTop":"1px"}} />
<span>
Executives consume summarized check-ins. You can add a strategic comment — you don't edit progress, targets or ownership.
</span>
</div>

          
<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Executive comment
</label>
<textarea value={cf.comment} onInput={ciSetComment} rows="3" placeholder="Strategic note or direction…" style={{"width":"100%","padding":"11px 13px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"14px","outline":"none","resize":"vertical"}} />
</div>

        
</React.Fragment>
)}


      
</div>

      
<div style={{"position":"sticky","bottom":"0","background":"#fff","padding":"16px 24px","borderTop":"1px solid var(--line-200)","display":"flex","justifyContent":"flex-end","gap":"10px"}}>

        
<button onClick={closeCi} style={{"padding":"10px 18px","border":"1px solid var(--line-300)","background":"#fff","borderRadius":"11px","fontSize":"13.5px","fontWeight":"700","color":"var(--ink-700)","cursor":"pointer"}}>
Cancel
</button>

        
{Boolean(isCiLead) && (
<React.Fragment>
<button onClick={submitCiEscalate} style={{"padding":"10px 16px","border":"1px solid var(--warn-500)","background":"#fff","color":"var(--warn-600)","borderRadius":"11px","fontSize":"13.5px","fontWeight":"700","cursor":"pointer","display":"flex","alignItems":"center","gap":"7px"}}>
<Icon name={"triangle-alert"} style={{"width":"15px","height":"15px"}} />
Escalate
</button>
</React.Fragment>
)}

        
{Boolean(isCiKpi) && (
<React.Fragment>
<button onClick={submitCiEscalate} style={{"padding":"10px 16px","border":"1px solid var(--warn-500)","background":"#fff","color":"var(--warn-600)","borderRadius":"11px","fontSize":"13.5px","fontWeight":"700","cursor":"pointer","display":"flex","alignItems":"center","gap":"7px"}}>
<Icon name={"arrow-up"} style={{"width":"15px","height":"15px"}} />
Request escalation
</button>
</React.Fragment>
)}

        
<button onClick={submitCi} style={{"padding":"10px 20px","border":"none","background":"#7A1C46","color":"#fff","borderRadius":"11px","fontSize":"13.5px","fontWeight":"700","cursor":"pointer","display":"flex","alignItems":"center","gap":"7px"}}>
<Icon name={"check"} style={{"width":"15px","height":"15px"}} />
{Boolean(isCiSenior) && (
<React.Fragment>
Submit weekly update
</React.Fragment>
)}
{Boolean(isCiLead) && (
<React.Fragment>
Save check-in
</React.Fragment>
)}
{Boolean(isCiKpi) && (
<React.Fragment>
Submit check-in
</React.Fragment>
)}
{Boolean(isCiManager) && (
<React.Fragment>
Approve & save
</React.Fragment>
)}
{Boolean(isCiExec) && (
<React.Fragment>
Add comment
</React.Fragment>
)}
</button>

      
</div>

    
</div>

  
</div>


</React.Fragment>
)}
    </React.Fragment>
  );
}
