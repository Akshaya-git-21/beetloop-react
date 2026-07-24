import React from 'react';
import Icon from '../../components/Icon.jsx';

export default function OkrTemplateFormDrawer({ vm }) {
  const { otAddKr, otClose, otFormTitle, otKpiNames, otKrs, otNew, otSave, otSetCategory, otSetDesc, otSetDivision, otSetName, otSetObjective, otSetScope, otSetStatus, otf, ttStop } = vm;
  return (
    <React.Fragment>
{Boolean(otNew) && (
<React.Fragment>

  
<div onClick={otClose} style={{"position":"fixed","inset":"0","zIndex":"60","background":"rgba(31,8,20,.5)","display":"flex","justifyContent":"flex-end"}}>

    
<div onClick={ttStop} className="blscroll" style={{"width":"100%","maxWidth":"680px","height":"100%","background":"#fff","boxShadow":"var(--shadow-xl)","overflowY":"auto","animation":"blrise .3s var(--ease-out)"}}>

      
<div style={{"position":"sticky","top":"0","background":"#fff","borderBottom":"1px solid var(--line-200)","padding":"18px 24px","display":"flex","alignItems":"flex-start","justifyContent":"space-between","zIndex":"3"}}>

        
<div>
<div style={{"fontSize":"11px","fontWeight":"700","letterSpacing":".1em","textTransform":"uppercase","color":"var(--orchid-500)"}}>
OKR Master
</div>
<h3 style={{"fontFamily":"'Sora'","fontWeight":"700","fontSize":"20px","color":"var(--beet-700)","margin":"4px 0 0"}}>
{otFormTitle}
</h3>
</div>

        
<button onClick={otClose} style={{"width":"34px","height":"34px","borderRadius":"10px","border":"1px solid var(--line-300)","background":"#fff","cursor":"pointer","display":"flex","alignItems":"center","justifyContent":"center"}}>
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
<input value={otf.name} onInput={otSetName} placeholder="e.g. Organic Growth OKR" style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","outline":"none"}} />
</div>

        
<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Objective statement
</label>
<input value={otf.objective} onInput={otSetObjective} placeholder="e.g. Increase organic traffic by X% this quarter" style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","outline":"none"}} />
</div>

        
<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Description
</label>
<textarea value={otf.desc} onInput={otSetDesc} rows="2" placeholder="When to use this template" style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","outline":"none","resize":"vertical"}} />
</div>

        
<div style={{"display":"grid","gridTemplateColumns":"1fr 1fr","gap":"14px"}}>

          
<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Category
</label>
<select value={otf.category} onChange={otSetCategory} style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","background":"#fff"}}>
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
Traffic
</option>
<option>
Brand Awareness
</option>
<option>
Revenue
</option>
</select>
</div>

          
<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Scope
</label>
<select value={otf.scope} onChange={otSetScope} style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","background":"#fff"}}>
<option>
Organization
</option>
<option>
Department
</option>
<option>
Individual
</option>
</select>
</div>

          
<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Division
</label>
<select value={otf.division} onChange={otSetDivision} style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","background":"#fff"}}>
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
Status
</label>
<select value={otf.status} onChange={otSetStatus} style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","background":"#fff"}}>
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

        
<div>

          
<div style={{"display":"flex","alignItems":"center","justifyContent":"space-between","marginBottom":"8px"}}>
<span style={{"fontSize":"11.5px","fontWeight":"700","letterSpacing":".08em","textTransform":"uppercase","color":"var(--ink-400)"}}>
Key results (KPI-linked)
</span>
<button onClick={otAddKr} style={{"display":"flex","alignItems":"center","gap":"5px","padding":"6px 11px","border":"1px solid var(--line-300)","background":"#fff","color":"var(--ink-700)","borderRadius":"9px","fontSize":"12px","fontWeight":"700","cursor":"pointer"}}>
<Icon name={"plus"} style={{"width":"12px","height":"12px"}} />
Add KR
</button>
</div>

          
<div style={{"display":"flex","flexDirection":"column","gap":"10px"}}>

            
{(otKrs || []).map((k, $index) => (
<React.Fragment key={$index}>

              
<div style={{"background":"var(--surface-50)","border":"1px solid var(--line-200)","borderRadius":"12px","padding":"12px"}}>

                
<div style={{"display":"flex","gap":"8px","alignItems":"center","marginBottom":"8px"}}>

                  
<input value={k.t} onInput={k.setT} placeholder="Key result statement…" style={{"flex":"1","padding":"9px 11px","border":"1px solid var(--line-300)","borderRadius":"10px","fontSize":"12.5px","outline":"none","background":"#fff"}} />

                  
{Boolean(k.canRemove) && (
<React.Fragment>
<button onClick={k.remove} style={{"width":"30px","height":"30px","borderRadius":"9px","border":"1px solid var(--line-300)","background":"#fff","cursor":"pointer","display":"flex","alignItems":"center","justifyContent":"center","flexShrink":"0"}}>
<Icon name={"trash-2"} style={{"width":"13px","height":"13px","color":"var(--ink-500)"}} />
</button>
</React.Fragment>
)}

                
</div>

                
<div style={{"display":"grid","gridTemplateColumns":"1.4fr .7fr .6fr","gap":"8px"}}>

                  
<input value={k.kpi} onInput={k.setKpi} list="ot-kpi-list" placeholder="Linked KPI (from KPI templates)" style={{"padding":"8px 10px","border":"1px solid var(--line-300)","borderRadius":"9px","fontSize":"12px","outline":"none","background":"#fff"}} />

                  
<input value={k.target} onInput={k.setTarget} placeholder="Default target" style={{"padding":"8px 10px","border":"1px solid var(--line-300)","borderRadius":"9px","fontSize":"12px","outline":"none","background":"#fff"}} />

                  
<input value={k.weight} onInput={k.setWeight} placeholder="Weight %" style={{"padding":"8px 10px","border":"1px solid var(--line-300)","borderRadius":"9px","fontSize":"12px","outline":"none","background":"#fff"}} />

                
</div>

              
</div>

            
</React.Fragment>
))}

            
<datalist id="ot-kpi-list">
{(otKpiNames || []).map((n, $index) => (
<React.Fragment key={$index}>
<option value={n} />
</React.Fragment>
))}
</datalist>

          
</div>

        
</div>

        
<div style={{"display":"flex","alignItems":"center","gap":"9px","background":"var(--surface-50)","border":"1px solid var(--line-200)","borderRadius":"12px","padding":"11px 14px","fontSize":"12.5px","color":"var(--ink-500)"}}>
<Icon name={"workflow"} style={{"width":"15px","height":"15px","flexShrink":"0","color":"var(--orchid-600)"}} />
<span>
Active OKR templates appear in Create New OKR ("Start from an OKR template") and pre-fill the objective's key results, KPIs, targets and weights.
</span>
</div>

      
</div>

      
<div style={{"position":"sticky","bottom":"0","background":"#fff","padding":"16px 24px","borderTop":"1px solid var(--line-200)","display":"flex","justifyContent":"flex-end","gap":"10px"}}>

        
<button onClick={otClose} style={{"padding":"10px 18px","border":"1px solid var(--line-300)","background":"#fff","borderRadius":"11px","fontSize":"13.5px","fontWeight":"700","color":"var(--ink-700)","cursor":"pointer"}}>
Cancel
</button>

        
<button onClick={otSave} style={{"display":"flex","alignItems":"center","gap":"7px","padding":"10px 20px","border":"none","background":"#7A1C46","color":"#fff","borderRadius":"11px","fontSize":"13.5px","fontWeight":"700","cursor":"pointer"}}>
<Icon name={"check"} style={{"width":"15px","height":"15px"}} />
Save OKR template
</button>

      
</div>

    
</div>

  
</div>


</React.Fragment>
)}
    </React.Fragment>
  );
}
