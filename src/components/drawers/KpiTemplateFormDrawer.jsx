import React from 'react';
import Icon from '../../components/Icon.jsx';

export default function KpiTemplateFormDrawer({ vm }) {
  const { ktClose, ktFormTitle, ktNew, ktSave, ktSetCategory, ktSetDefTarget, ktSetDesc, ktSetDirection, ktSetDivision, ktSetName, ktSetStatus, ktSetUnit, ktf, ttStop,
    ktUnitOptions, ktToolGroups, ktMethodOptions, ktMfreqOptions, ktSetTool, ktSetMethod, ktSetMfreq, ktSetEvidence } = vm;
  return (
    <React.Fragment>
{Boolean(ktNew) && (
<React.Fragment>

  
<div onClick={ktClose} style={{"position":"fixed","inset":"0","zIndex":"60","background":"rgba(31,8,20,.5)","display":"flex","justifyContent":"flex-end"}}>

    
<div onClick={ttStop} className="blscroll" style={{"width":"100%","maxWidth":"620px","height":"100%","background":"#fff","boxShadow":"var(--shadow-xl)","overflowY":"auto","animation":"blrise .3s var(--ease-out)"}}>

      
<div style={{"position":"sticky","top":"0","background":"#fff","borderBottom":"1px solid var(--line-200)","padding":"18px 24px","display":"flex","alignItems":"flex-start","justifyContent":"space-between","zIndex":"3"}}>

        
<div>
<div style={{"fontSize":"11px","fontWeight":"700","letterSpacing":".1em","textTransform":"uppercase","color":"var(--orchid-500)"}}>
KPI Master
</div>
<h3 style={{"fontFamily":"'Sora'","fontWeight":"700","fontSize":"20px","color":"var(--beet-700)","margin":"4px 0 0"}}>
{ktFormTitle}
</h3>
</div>

        
<button onClick={ktClose} style={{"width":"34px","height":"34px","borderRadius":"10px","border":"1px solid var(--line-300)","background":"#fff","cursor":"pointer","display":"flex","alignItems":"center","justifyContent":"center"}}>
<Icon name={"x"} style={{"width":"17px","height":"17px","color":"var(--ink-700)"}} />
</button>

      
</div>

      
<div style={{"padding":"20px 24px","display":"flex","flexDirection":"column","gap":"14px"}}>

        
<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
KPI name 
<span style={{"color":"var(--danger-600)"}}>
*
</span>
</label>
<input value={ktf.name} onInput={ktSetName} placeholder="e.g. Organic Sessions" style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","outline":"none"}} />
</div>

        
<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Definition
</label>
<textarea value={ktf.desc} onInput={ktSetDesc} rows="2" placeholder="What this KPI measures and how it is counted" style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","outline":"none","resize":"vertical"}} />
</div>

        
<div style={{"display":"grid","gridTemplateColumns":"1fr 1fr","gap":"14px"}}>

          
<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Category
</label>
<select value={ktf.category} onChange={ktSetCategory} style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","background":"#fff"}}>
<option>
Traffic
</option>
<option>
SEO
</option>
<option>
Content
</option>
<option>
Social
</option>
<option>
Technical
</option>
<option>
Conversion
</option>
<option>
Design
</option>
<option>
Revenue
</option>
</select>
</div>

          
<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Division
</label>
<select value={ktf.division} onChange={ktSetDivision} style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","background":"#fff"}}>
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
Unit
</label>
<select value={ktf.unit} onChange={ktSetUnit} style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13px","background":"#fff"}}>
<option value="">Select unit…</option>
{(ktUnitOptions || []).map((u, $index) => (
<React.Fragment key={$index}>
<option value={u}>{u}</option>
</React.Fragment>
))}
</select>
</div>


<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Measurement tool
</label>
<select value={ktf.tool} onChange={ktSetTool} style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13px","background":"#fff"}}>
<option value="">Select tool…</option>
{(ktToolGroups || []).map((g, $index) => (
<optgroup key={$index} label={g.g}>
{(g.tools || []).map((t, $i2) => (
<option key={$i2} value={t}>{t}</option>
))}
</optgroup>
))}
</select>
</div>


<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Measurement method
</label>
<select value={ktf.method} onChange={ktSetMethod} style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13px","background":"#fff"}}>
<option value="">Select method…</option>
{(ktMethodOptions || []).map((m, $index) => (
<React.Fragment key={$index}>
<option value={m}>{m}</option>
</React.Fragment>
))}
</select>
</div>


<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Measurement frequency
</label>
<select value={ktf.mfreq} onChange={ktSetMfreq} style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13px","background":"#fff"}}>
<option value="">Select frequency…</option>
{(ktMfreqOptions || []).map((m, $index) => (
<React.Fragment key={$index}>
<option value={m}>{m}</option>
</React.Fragment>
))}
</select>
</div>


<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Evidence required
</label>
<input value={ktf.evidence} onInput={ktSetEvidence} placeholder="e.g. Turnitin similarity report" style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13px","outline":"none"}} />
</div>


<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Direction
</label>
<select value={ktf.direction} onChange={ktSetDirection} style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","background":"#fff"}}>
<option>
Increase
</option>
<option>
Decrease
</option>
</select>
</div>

          
<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Default target
</label>
<input value={ktf.defTarget} onInput={ktSetDefTarget} placeholder="e.g. 100,000" style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","outline":"none"}} />
</div>

<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Status
</label>
<select value={ktf.status} onChange={ktSetStatus} style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","background":"#fff"}}>
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

        
<div style={{"display":"flex","alignItems":"center","gap":"9px","background":"var(--surface-50)","border":"1px solid var(--line-200)","borderRadius":"12px","padding":"11px 14px","fontSize":"12.5px","color":"var(--ink-500)"}}>
<Icon name={"workflow"} style={{"width":"15px","height":"15px","flexShrink":"0","color":"var(--orchid-600)"}} />
<span>
Active KPI templates appear in Create Task, OKR key results and Effort plan dropdowns — everyone pulls the same standardized definition.
</span>
</div>

      
</div>

      
<div style={{"position":"sticky","bottom":"0","background":"#fff","padding":"16px 24px","borderTop":"1px solid var(--line-200)","display":"flex","justifyContent":"flex-end","gap":"10px"}}>

        
<button onClick={ktClose} style={{"padding":"10px 18px","border":"1px solid var(--line-300)","background":"#fff","borderRadius":"11px","fontSize":"13.5px","fontWeight":"700","color":"var(--ink-700)","cursor":"pointer"}}>
Cancel
</button>

        
<button onClick={ktSave} style={{"display":"flex","alignItems":"center","gap":"7px","padding":"10px 20px","border":"none","background":"#7A1C46","color":"#fff","borderRadius":"11px","fontSize":"13.5px","fontWeight":"700","cursor":"pointer"}}>
<Icon name={"check"} style={{"width":"15px","height":"15px"}} />
Save KPI template
</button>

      
</div>

    
</div>

  
</div>


</React.Fragment>
)}
    </React.Fragment>
  );
}
