import React from 'react';
import Icon from '../../components/Icon.jsx';

export default function TaskTemplateFormDrawer({ vm }) {
  const { ttAddStep, ttChecklist, ttClose, ttFormTitle, ttKpiOptions, ttNew, ttSave, ttSetDesc, ttSetDivision, ttSetEstH, ttSetKpi, ttSetName, ttSetPriority, ttSetRecurrence, ttSetStatus, ttSetUnit, ttStop, ttf } = vm;
  return (
    <React.Fragment>
{Boolean(ttNew) && (
<React.Fragment>

  
<div onClick={ttClose} style={{"position":"fixed","inset":"0","zIndex":"60","background":"rgba(31,8,20,.5)","display":"flex","justifyContent":"flex-end"}}>

    
<div onClick={ttStop} className="blscroll" style={{"width":"100%","maxWidth":"620px","height":"100%","background":"#fff","boxShadow":"var(--shadow-xl)","overflowY":"auto","animation":"blrise .3s var(--ease-out)"}}>

      
<div style={{"position":"sticky","top":"0","background":"#fff","borderBottom":"1px solid var(--line-200)","padding":"18px 24px","display":"flex","alignItems":"flex-start","justifyContent":"space-between","zIndex":"3"}}>

        
<div>
<div style={{"fontSize":"11px","fontWeight":"700","letterSpacing":".1em","textTransform":"uppercase","color":"var(--orchid-500)"}}>
Task Master
</div>
<h3 style={{"fontFamily":"'Sora'","fontWeight":"700","fontSize":"20px","color":"var(--beet-700)","margin":"4px 0 0"}}>
{ttFormTitle}
</h3>
</div>

        
<button onClick={ttClose} style={{"width":"34px","height":"34px","borderRadius":"10px","border":"1px solid var(--line-300)","background":"#fff","cursor":"pointer","display":"flex","alignItems":"center","justifyContent":"center"}}>
<Icon name={"x"} style={{"width":"17px","height":"17px","color":"var(--ink-700)"}} />
</button>

      
</div>

      
<div style={{"padding":"20px 24px","display":"flex","flexDirection":"column","gap":"14px"}}>

        
<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Template name 
<span style={{"color":"var(--danger-600)"}}>
*
</span>
</label>
<input value={ttf.name} onInput={ttSetName} placeholder="e.g. Publish Blog Post" style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","outline":"none"}} />
</div>

        
<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Description
</label>
<textarea value={ttf.desc} onInput={ttSetDesc} rows="2" placeholder="What this task covers and its acceptance criteria" style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","outline":"none","resize":"vertical"}} />
</div>

        
<div style={{"display":"grid","gridTemplateColumns":"1fr 1fr","gap":"14px"}}>

          
<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Division
</label>
<select value={ttf.division} onChange={ttSetDivision} style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","background":"#fff"}}>
<option>
SEO
</option>
<option>
Content
</option>
<option>
Graphics
</option>
<option>
Web Developers
</option>
<option>
SMM
</option>
<option>
All
</option>
</select>
</div>

          
<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Default priority
</label>
<select value={ttf.priority} onChange={ttSetPriority} style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","background":"#fff"}}>
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

          
<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Unit of output
</label>
<input value={ttf.unit} onInput={ttSetUnit} placeholder="e.g. pages, links, articles" style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","outline":"none"}} />
</div>

          
<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Estimated hours
</label>
<input value={ttf.estH} onInput={ttSetEstH} placeholder="e.g. 8" style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","outline":"none"}} />
</div>

          
<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Recurrence
</label>
<select value={ttf.recurrence} onChange={ttSetRecurrence} style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","background":"#fff"}}>
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
<option>
Quarterly
</option>
</select>
</div>

          
<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Status
</label>
<select value={ttf.status} onChange={ttSetStatus} style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","background":"#fff"}}>
<option>
Active
</option>
<option>
Draft
</option>
<option>
Archived
</option>
</select>
</div>

        
</div>

        
<div style={{"background":"var(--orchid-100)","border":"1px solid var(--orchid-200)","borderRadius":"14px","padding":"14px 16px"}}>

          
<div style={{"display":"flex","alignItems":"center","gap":"7px","marginBottom":"10px"}}>
<Icon name={"target"} style={{"width":"14px","height":"14px","color":"var(--orchid-700)"}} />
<span style={{"fontSize":"11.5px","fontWeight":"700","letterSpacing":".08em","textTransform":"uppercase","color":"var(--orchid-700)"}}>
Default KPI linkage
</span>
</div>

          
<select value={ttf.kpiId} onChange={ttSetKpi} style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13px","background":"#fff"}}>
{(ttKpiOptions || []).map((o, $index) => (
<React.Fragment key={$index}>
<option value={o.id}>
{o.label}
</option>
</React.Fragment>
))}
</select>

          
<div style={{"fontSize":"11.5px","color":"var(--ink-500)","marginTop":"6px"}}>
Tasks created from this template inherit the KPI — approved output counts toward it automatically.
</div>

        
</div>

        
<div>

          
<div style={{"display":"flex","alignItems":"center","justifyContent":"space-between","marginBottom":"8px"}}>
<span style={{"fontSize":"11.5px","fontWeight":"700","letterSpacing":".08em","textTransform":"uppercase","color":"var(--ink-400)"}}>
Standard checklist
</span>
<button onClick={ttAddStep} style={{"display":"flex","alignItems":"center","gap":"5px","padding":"6px 11px","border":"1px solid var(--line-300)","background":"#fff","color":"var(--ink-700)","borderRadius":"9px","fontSize":"12px","fontWeight":"700","cursor":"pointer"}}>
<Icon name={"plus"} style={{"width":"12px","height":"12px"}} />
Add step
</button>
</div>

          
<div style={{"display":"flex","flexDirection":"column","gap":"8px"}}>

            
{(ttChecklist || []).map((s, $index) => (
<React.Fragment key={$index}>

              
<div style={{"display":"flex","alignItems":"center","gap":"8px"}}>

                
<span style={{"width":"22px","height":"22px","borderRadius":"99px","background":"var(--surface-50)","border":"1px solid var(--line-300)","display":"flex","alignItems":"center","justifyContent":"center","fontSize":"11px","fontWeight":"800","color":"var(--ink-500)","flexShrink":"0"}}>
{$index}
</span>

                
<input value={s.val} onInput={s.set} placeholder="Checklist step…" style={{"flex":"1","padding":"9px 12px","border":"1px solid var(--line-300)","borderRadius":"10px","fontSize":"12.5px","outline":"none"}} />

                
{Boolean(s.canRemove) && (
<React.Fragment>
<button onClick={s.remove} style={{"width":"30px","height":"30px","borderRadius":"9px","border":"1px solid var(--line-300)","background":"#fff","cursor":"pointer","display":"flex","alignItems":"center","justifyContent":"center","flexShrink":"0"}}>
<Icon name={"trash-2"} style={{"width":"13px","height":"13px","color":"var(--ink-500)"}} />
</button>
</React.Fragment>
)}

              
</div>

            
</React.Fragment>
))}

          
</div>

        
</div>

      
</div>

      
<div style={{"position":"sticky","bottom":"0","background":"#fff","padding":"16px 24px","borderTop":"1px solid var(--line-200)","display":"flex","justifyContent":"flex-end","gap":"10px"}}>

        
<button onClick={ttClose} style={{"padding":"10px 18px","border":"1px solid var(--line-300)","background":"#fff","borderRadius":"11px","fontSize":"13.5px","fontWeight":"700","color":"var(--ink-700)","cursor":"pointer"}}>
Cancel
</button>

        
<button onClick={ttSave} style={{"display":"flex","alignItems":"center","gap":"7px","padding":"10px 20px","border":"none","background":"#7A1C46","color":"#fff","borderRadius":"11px","fontSize":"13.5px","fontWeight":"700","cursor":"pointer"}}>
<Icon name={"check"} style={{"width":"15px","height":"15px"}} />
Save template
</button>

      
</div>

    
</div>

  
</div>


</React.Fragment>
)}
    </React.Fragment>
  );
}
