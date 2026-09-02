import React from 'react';
import Icon from '../../components/Icon.jsx';
import { cssTextToObject } from '../../utils/cssText.js';

export default function OkrCreatePanel({ vm }) {
  const { closeOkr, kpiOptions, okrAddKR, okrAuditUser, okrDraftKRs, okrNewCode, okrOwnerOptions, okrSteps, okrTplOptions, okrTplPick, okrTplVal, okrWeightBg, okrWeightColor, okrWeightTotal, saveOkr, saveOkrDraft, showOkrPanel, okrForm, okrSetTitle, okrSetDesc, okrSetOwner, okrSetDept, okrDeptOptions, okrSetBrand, okrBrandOptions, okrSetBusinessUnit, okrBusinessUnitOptions, okrSetWebsiteDomain, okrWebsiteDomainOptions, okrIsEdit, okrPanelTitle, okrPanelCode, okrPanelVerBadge, okrSaveLabel, okrCanDelete, okrDelete,
    okrSetCategory, okrSetPriority, okrSetCycle, okrSetReviewFreq, okrSetStart, okrSetEnd, okrSetParent, okrSetDependsOn, okrSetEffortTargets, okrSetProgressCalc, okrSetDataSource, okrSetReviewer, okrSetStatus, okrSetRisks, okrReviewerOptions,
    okrCampaignVal, campaignOptionsNone, okrSetCampaign, okrParentOptions, okrParentVal,
    okrUnitOptions, okrTsrcOptions, okrToolGroups, okrMethodOptions, okrMfreqOptions, okrTaskLinkOptions, okrEffortLinkOptions,
    okrContributorChips, okrAddContributorVal, okrAddContributor, okrContributorOptions } = vm;
  return (
    <React.Fragment>
{Boolean(showOkrPanel) && (
<React.Fragment>

  
<div style={{"position":"fixed","inset":"0","zIndex":"160","background":"var(--surface-100)","display":"flex","flexDirection":"column","animation":"blrise .28s var(--ease-out)"}}>

    
{/* top bar */}

    
<header style={{"flex":"none","background":"var(--paper)","borderBottom":"1px solid var(--line-200)","padding":"16px 28px","display":"flex","alignItems":"center","gap":"16px"}}>

      
<div style={{"flex":"1","minWidth":"0"}}>

        
<div style={{"fontSize":"11px","fontWeight":"700","letterSpacing":".1em","textTransform":"uppercase","color":"var(--orchid-500)"}}>
OKR Configuration
</div>

        
<div style={{"display":"flex","alignItems":"center","gap":"10px","marginTop":"3px"}}>
<h3 style={{"fontFamily":"'Sora'","fontWeight":"700","fontSize":"22px","color":"var(--ink-900)","margin":"0"}}>
{okrPanelTitle || 'Create new OKR'}
</h3>
<span style={{"fontFamily":"'Space Mono'","fontSize":"12px","color":"var(--ink-400)"}}>
{okrPanelCode || okrNewCode}
</span>
<span style={{"fontSize":"10.5px","fontWeight":"700","padding":"2px 9px","borderRadius":"999px","background":"var(--surface-50)","border":"1px solid var(--line-300)","color":"var(--ink-500)"}}>
{okrPanelVerBadge || 'Draft · v1.0'}
</span>
</div>

      
</div>


{Boolean(okrCanDelete) && (
<button onClick={okrDelete} style={{"flex":"none","display":"flex","alignItems":"center","gap":"7px","background":"var(--paper)","border":"1px solid var(--danger-300, #e5a3a3)","color":"var(--danger-600)","borderRadius":"11px","padding":"9px 15px","fontSize":"13.5px","fontWeight":"700","cursor":"pointer"}}>
<Icon name={"trash-2"} style={{"width":"16px","height":"16px"}} />
Delete
</button>
)}


<button onClick={closeOkr} style={{"flex":"none","display":"flex","alignItems":"center","gap":"7px","background":"var(--paper)","border":"1px solid var(--line-300)","color":"var(--ink-700)","borderRadius":"11px","padding":"9px 15px","fontSize":"13.5px","fontWeight":"700","cursor":"pointer"}}>
<Icon name={"x"} style={{"width":"16px","height":"16px"}} />
Close
</button>

    
</header>


    
{/* body: left nav + scrolling form */}

    
<div style={{"flex":"1","minHeight":"0","display":"flex"}}>

      
<nav style={{"flex":"none","width":"236px","borderRight":"1px solid var(--line-200)","background":"var(--paper)","padding":"20px 14px","overflowY":"auto"}}>

        
<div style={{"fontSize":"10px","fontWeight":"700","letterSpacing":".12em","textTransform":"uppercase","color":"var(--ink-400)","padding":"0 10px 10px"}}>
Sections
</div>

        
{(okrSteps || []).map((s, $index) => (
<React.Fragment key={$index}>
<a href="#" onClick={s.go} style={cssTextToObject(s.navStyle)}>
<span style={cssTextToObject(`width:20px;height:20px;border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:800;flex-shrink:0;background:${s.badgeBg};color:${s.badgeColor}`)}>
{s.letter}
</span>
{s.name}
</a>
</React.Fragment>
))}

      
</nav>

      
<div className="blscroll" style={{"flex":"1","minWidth":"0","overflowY":"auto"}}>

        
<div style={{"maxWidth":"880px","margin":"0 auto","padding":"28px 34px 40px","display":"flex","flexDirection":"column","gap":"20px"}}>


        
{/* A · Objective details */}

        
<div id="okrA" style={{"background":"var(--paper)","border":"1px solid var(--line-300)","borderRadius":"18px","boxShadow":"var(--shadow-sm)","padding":"22px 24px"}}>

          
<div style={{"display":"flex","alignItems":"center","gap":"8px","marginBottom":"14px"}}>
<span style={{"width":"22px","height":"22px","borderRadius":"7px","background":"var(--beet-700)","color":"#fff","display":"flex","alignItems":"center","justifyContent":"center","fontSize":"11px","fontWeight":"800"}}>
A
</span>
<span style={{"fontFamily":"'Sora'","fontWeight":"700","fontSize":"15px","color":"var(--ink-900)"}}>
Objective details
</span>
</div>

          
<div style={{"display":"flex","flexDirection":"column","gap":"12px"}}>

            
<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Objective title *
</label>
<input value={okrForm.title} onChange={okrSetTitle} placeholder="e.g., Increase organic traffic by 50%" style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","outline":"none"}} />
</div>

            
<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Description
</label>
<textarea rows="2" value={okrForm.desc} onChange={okrSetDesc} placeholder="Why this objective matters…" style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","outline":"none","resize":"vertical"}} />
</div>

            
<div style={{"display":"grid","gridTemplateColumns":"1fr 1fr","gap":"12px"}}>

              
<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Owner *
</label>
<select value={okrForm.owner} onChange={okrSetOwner} style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","background":"var(--paper)"}}>
{(okrOwnerOptions || []).map((o, $index) => (
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
Contributors
</label>
<div style={{"display":"flex","flexWrap":"wrap","gap":"6px","marginBottom":(okrContributorChips&&okrContributorChips.length)?"8px":"0"}}>
{(okrContributorChips || []).map((c, $index) => (
<React.Fragment key={$index}>
<span style={{"display":"inline-flex","alignItems":"center","gap":"6px","padding":"5px 10px","borderRadius":"999px","background":"var(--orchid-100)","color":"var(--orchid-700)","fontSize":"12px","fontWeight":"700"}}>
{c.name}
<button onClick={c.remove} style={{"border":"none","background":"none","cursor":"pointer","display":"flex","padding":"0","color":"var(--orchid-700)"}}>
<Icon name={"x"} style={{"width":"11px","height":"11px"}} />
</button>
</span>
</React.Fragment>
))}
</div>
<select value={okrAddContributorVal} onChange={okrAddContributor} style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","background":"var(--paper)","color":"var(--ink-500)"}}>
{(okrContributorOptions || []).map((o, $index) => (
<React.Fragment key={$index}>
<option value={o.v}>
{o.label}
</option>
</React.Fragment>
))}
</select>
</div>

            
</div>

          
</div>

        
</div>


        
{/* B · Scope & classification */}

        
<div id="okrB" style={{"background":"var(--paper)","border":"1px solid var(--line-300)","borderRadius":"18px","boxShadow":"var(--shadow-sm)","padding":"22px 24px"}}>

          
<div style={{"display":"flex","alignItems":"center","gap":"8px","marginBottom":"14px"}}>
<span style={{"width":"22px","height":"22px","borderRadius":"7px","background":"var(--beet-700)","color":"#fff","display":"flex","alignItems":"center","justifyContent":"center","fontSize":"11px","fontWeight":"800"}}>
B
</span>
<span style={{"fontFamily":"'Sora'","fontWeight":"700","fontSize":"15px","color":"var(--ink-900)"}}>
Scope & classification
</span>
</div>

          
<div style={{"fontSize":"11px","fontWeight":"700","letterSpacing":".06em","textTransform":"uppercase","color":"var(--ink-400)","marginBottom":"8px"}}>
Hierarchy · Company → Brand → Website → Department → Project/Campaign
</div>

          
<div style={{"display":"grid","gridTemplateColumns":"1fr 1fr","gap":"12px","marginBottom":"12px"}}>

            
<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Company / Brand
</label>
<select value={okrForm.brand} onChange={okrSetBrand} style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","background":"var(--paper)"}}>
{(okrBrandOptions || []).map((o, $index) => (
<option key={$index} value={o}>{o}</option>
))}
</select>
</div>


<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Business unit
</label>
<select value={okrForm.businessUnit} onChange={okrSetBusinessUnit} style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","background":"var(--paper)"}}>
{(okrBusinessUnitOptions || []).map((o, $index) => (
<option key={$index} value={o}>{o}</option>
))}
</select>
</div>


<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Website / Domain
</label>
<select value={okrForm.websiteDomain} onChange={okrSetWebsiteDomain} style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","background":"var(--paper)"}}>
{(okrWebsiteDomainOptions || []).map((o, $index) => (
<option key={$index} value={o}>{o}</option>
))}
</select>
</div>


<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Department *
</label>
<select value={okrForm.dept} onChange={okrSetDept} style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","background":"var(--paper)"}}>
{(okrDeptOptions || []).map((o, $index) => (
<option key={$index} value={o}>{o}</option>
))}
</select>
</div>

<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Campaign (optional)
</label>
<select value={okrCampaignVal} onChange={okrSetCampaign} style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","background":"var(--paper)"}}>
{(campaignOptionsNone || []).map((o, $index) => (
<option key={$index} value={o}>{o}</option>
))}
</select>
</div>

</div>


<div style={{"display":"grid","gridTemplateColumns":"1fr 1fr","gap":"12px"}}>


<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Objective category
</label>
<select value={okrForm.category} onChange={okrSetCategory} style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","background":"var(--paper)"}}>
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
Social Media
</option>
<option>
Brand Awareness
</option>
<option>
Conversion
</option>
<option>
Technical
</option>
<option>
Revenue
</option>
</select>
</div>


<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Strategic priority
</label>
<select value={okrForm.priority} onChange={okrSetPriority} style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","background":"var(--paper)"}}>
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


</div>



{/* C · Timeline */}


<div id="okrC" style={{"background":"var(--paper)","border":"1px solid var(--line-300)","borderRadius":"18px","boxShadow":"var(--shadow-sm)","padding":"22px 24px"}}>


<div style={{"display":"flex","alignItems":"center","gap":"8px","marginBottom":"14px"}}>
<span style={{"width":"22px","height":"22px","borderRadius":"7px","background":"var(--beet-700)","color":"#fff","display":"flex","alignItems":"center","justifyContent":"center","fontSize":"11px","fontWeight":"800"}}>
C
</span>
<span style={{"fontFamily":"'Sora'","fontWeight":"700","fontSize":"15px","color":"var(--ink-900)"}}>
Timeline
</span>
</div>


<div style={{"display":"grid","gridTemplateColumns":"1fr 1fr","gap":"12px"}}>


<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Cycle *
</label>
<select value={okrForm.cycle} onChange={okrSetCycle} style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","background":"var(--paper)"}}>
<option>
Q1 2026
</option>
<option>
Q2 2026
</option>
<option>
Q3 2026
</option>
<option>
Q4 2026
</option>
<option>
Annual 2026
</option>
</select>
</div>


<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Review frequency
</label>
<select value={okrForm.reviewFreq} onChange={okrSetReviewFreq} style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","background":"var(--paper)"}}>
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
Start date
</label>
<input type="date" value={okrForm.start||''} onChange={okrSetStart} style={{"width":"100%","padding":"9px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","outline":"none","color":"var(--ink-700)"}} />
</div>


<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
End date *
</label>
<input type="date" value={okrForm.end||''} onChange={okrSetEnd} required style={{"width":"100%","padding":"9px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","outline":"none","color":"var(--ink-700)"}} />
</div>


</div>


</div>


        
{/* D · Key results (KPI linkage) */}

        
<div id="okrD" style={{"background":"var(--paper)","border":"1px solid var(--line-300)","borderRadius":"18px","boxShadow":"var(--shadow-sm)","padding":"22px 24px"}}>

          
<div style={{"display":"flex","alignItems":"center","justifyContent":"space-between","marginBottom":"14px"}}>

            
<div style={{"display":"flex","alignItems":"center","gap":"8px"}}>
<span style={{"width":"22px","height":"22px","borderRadius":"7px","background":"var(--beet-700)","color":"#fff","display":"flex","alignItems":"center","justifyContent":"center","fontSize":"11px","fontWeight":"800"}}>
D
</span>
<span style={{"fontFamily":"'Sora'","fontWeight":"700","fontSize":"15px","color":"var(--ink-900)"}}>
Key results — KPI linked
</span>
</div>


<div style={{"display":"flex","alignItems":"center","gap":"8px"}}>
<span style={{"fontSize":"11px","fontWeight":"700","padding":"3px 9px","borderRadius":"999px","background":"var(--surface-50)","border":"1px solid var(--line-300)","color":"var(--ink-600)"}}>
{(okrDraftKRs || []).length} key result{(okrDraftKRs || []).length===1?'':'s'}
</span>
<span style={cssTextToObject(`font-size:11px;font-weight:700;padding:3px 9px;border-radius:999px;background:${okrWeightBg};color:${okrWeightColor}`)}>
Weights: {okrWeightTotal}%
</span>
</div>


</div>

          
<div style={{"display":"flex","alignItems":"center","gap":"9px","background":"var(--orchid-100)","border":"1px solid var(--orchid-200)","borderRadius":"12px","padding":"10px 13px","marginBottom":"14px"}}>

            
<Icon name={"layout-template"} style={{"width":"15px","height":"15px","color":"var(--orchid-700)","flexShrink":"0"}} />

            
<select value={okrTplVal} onChange={okrTplPick} style={{"flex":"1","border":"none","background":"none","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-900)","outline":"none","cursor":"pointer"}}>
{(okrTplOptions || []).map((o, $index) => (
<React.Fragment key={$index}>
<option value={o.id}>
{o.label}
</option>
</React.Fragment>
))}
</select>

          
</div>

          
<div style={{"display":"flex","flexDirection":"column","gap":"12px"}}>

            
{(okrDraftKRs || []).map((k, $index) => (
<React.Fragment key={$index}>


<div id={"okrKrRow-"+k.n} style={{"background":"var(--surface-50)","border":"1px solid var(--line-200)","borderRadius":"14px","padding":"14px"}}>


<div style={{"display":"flex","alignItems":"center","justifyContent":"space-between","marginBottom":"10px"}}>
<span style={{"fontSize":"11.5px","fontWeight":"800","color":"var(--orchid-600)"}}>
KR {k.n}
</span>
<button onClick={k.remove} style={{"background":"none","border":"none","color":"var(--ink-400)","cursor":"pointer","display":"flex","alignItems":"center"}}>
<Icon name={"trash-2"} style={{"width":"15px","height":"15px"}} />
</button>
</div>

                
<div style={{"display":"flex","flexDirection":"column","gap":"10px"}}>

                  
<div>
<label style={{"display":"block","fontSize":"11px","fontWeight":"700","color":"var(--ink-500)","marginBottom":"4px"}}>
Key result (from Templates, or custom)
</label>
<input value={k.kr} onInput={k.setKr} list="okr-kr-list" placeholder="e.g. Increase organic visitors to 100K/month" style={{"width":"100%","padding":"9px 11px","border":"1px solid var(--line-300)","borderRadius":"10px","fontSize":"12.5px","outline":"none","background":"var(--paper)"}} />
<datalist id="okr-kr-list">
{(k.krPickOptions || []).filter(o=>o.value).map((o, $index) => (
<React.Fragment key={$index}>
<option value={o.value} />
</React.Fragment>
))}
</datalist>
<select value="" onChange={k.setKrPick} style={{"width":"100%","marginTop":"6px","padding":"8px 11px","border":"1px solid var(--line-300)","borderRadius":"10px","fontSize":"12px","background":"var(--paper)","color":"var(--ink-500)"}}>
{(k.krPickOptions || []).map((o, $index) => (
<React.Fragment key={$index}>
<option value={o.value}>{o.label}</option>
</React.Fragment>
))}
</select>
</div>


<div style={{"display":"grid","gridTemplateColumns":"1.4fr 1fr","gap":"10px"}}>


<div>
<label style={{"display":"block","fontSize":"11px","fontWeight":"700","color":"var(--ink-500)","marginBottom":"4px"}}>
KPI (from KPI Master, or custom)
</label>
<input value={k.kpiSel} onInput={k.setKpiSel} list="okr-kpi-list" placeholder="Type a custom KPI name…" style={{"width":"100%","padding":"9px 11px","border":"1px solid var(--line-300)","borderRadius":"10px","fontSize":"12.5px","outline":"none","background":"var(--paper)"}} />
<datalist id="okr-kpi-list">
{(kpiOptions || []).map((o, $index) => (
<React.Fragment key={$index}>
<option value={o.label} />
</React.Fragment>
))}
</datalist>
<select value="" onChange={k.setKpiPick} style={{"width":"100%","marginTop":"6px","padding":"8px 11px","border":"1px solid var(--line-300)","borderRadius":"10px","fontSize":"12px","background":"var(--paper)","color":"var(--ink-500)"}}>
{(k.kpiPickOptions || []).map((o, $index) => (
<React.Fragment key={$index}>
<option value={o.value}>{o.label}</option>
</React.Fragment>
))}
</select>
</div>


<div>
<label style={{"display":"block","fontSize":"11px","fontWeight":"700","color":"var(--ink-500)","marginBottom":"4px"}}>
Unit
</label>
<select value={k.unit} onChange={k.setUnit} style={{"width":"100%","padding":"9px 11px","border":"1px solid var(--line-300)","borderRadius":"10px","fontSize":"12.5px","background":"var(--paper)"}}>
<option value="">Select unit…</option>
{(okrUnitOptions || []).map((u, $index) => (
<option key={$index} value={u}>{u}</option>
))}
</select>
</div>


</div>

<div style={{"background":"var(--paper)","border":"1px solid var(--line-200)","borderRadius":"11px","padding":"11px 12px"}}>
<div style={{"display":"grid","gridTemplateColumns":".9fr 1.6fr","gap":"10px"}}>
<div>
<label style={{"display":"block","fontSize":"11px","fontWeight":"700","color":"var(--ink-500)","marginBottom":"4px"}}>Target source</label>
<select value={k.tsrc} onChange={k.setTsrc} style={{"width":"100%","padding":"9px 11px","border":"1px solid var(--line-300)","borderRadius":"10px","fontSize":"12.5px","background":"var(--paper)"}}>
{(okrTsrcOptions || []).map((s, $i) => (<option key={$i} value={s}>{s}</option>))}
</select>
</div>
{Boolean(k.isEffSrc) && (
<div>
<label style={{"display":"block","fontSize":"11px","fontWeight":"700","color":"var(--ink-500)","marginBottom":"4px"}}>Effort plan line</label>
<select value={k.tref} onChange={k.setTref} style={{"width":"100%","padding":"9px 11px","border":"1px solid var(--line-300)","borderRadius":"10px","fontSize":"12.5px","background":"var(--paper)"}}>
<option value="">Select effort line…</option>
{(k.effOptions || []).map((o, $i) => (<option key={$i} value={o.key}>{o.label}</option>))}
</select>
</div>
)}
{Boolean(k.isGoldSrc) && (
<div>
<label style={{"display":"block","fontSize":"11px","fontWeight":"700","color":"var(--ink-500)","marginBottom":"4px"}}>Gold standard</label>
<select value={k.tref} onChange={k.setTref} style={{"width":"100%","padding":"9px 11px","border":"1px solid var(--line-300)","borderRadius":"10px","fontSize":"12.5px","background":"var(--paper)"}}>
<option value="">Select standard…</option>
{(k.goldOptions || []).map((o, $i) => (<option key={$i} value={o.id}>{o.label}</option>))}
</select>
</div>
)}
{Boolean(k.isTplSrc) && (
<div>
<label style={{"display":"block","fontSize":"11px","fontWeight":"700","color":"var(--ink-500)","marginBottom":"4px"}}>KPI template</label>
<select value={k.tref} onChange={k.setTref} style={{"width":"100%","padding":"9px 11px","border":"1px solid var(--line-300)","borderRadius":"10px","fontSize":"12.5px","background":"var(--paper)"}}>
<option value="">Select template…</option>
{(k.tplOptions || []).map((o, $i) => (<option key={$i} value={o.label}>{o.label}</option>))}
</select>
</div>
)}
{Boolean(k.isDeptSrc) && (
<div>
<label style={{"display":"block","fontSize":"11px","fontWeight":"700","color":"var(--ink-500)","marginBottom":"4px"}}>Department target</label>
<select value={k.tref} onChange={k.setTref} style={{"width":"100%","padding":"9px 11px","border":"1px solid var(--line-300)","borderRadius":"10px","fontSize":"12.5px","background":"var(--paper)"}}>
<option value="">Select department target…</option>
{(k.deptOptions || []).map((o, $i) => (<option key={$i} value={o}>{o}</option>))}
</select>
</div>
)}
{Boolean(k.isManualSrc) && (
<div style={{"display":"flex","alignItems":"flex-end","fontSize":"11px","color":"var(--ink-500)","paddingBottom":"9px"}}>Enter the target by hand below.</div>
)}
</div>
<div style={{"display":"flex","alignItems":"center","gap":"6px","marginTop":"7px","fontSize":"10.5px","color":"var(--ink-400)"}}>
<Icon name={"info"} style={{"width":"11px","height":"11px","flexShrink":"0"}} />
{k.targetHint}
</div>
</div>


<div style={{"display":"grid","gridTemplateColumns":"1fr 1fr 1fr 1fr","gap":"10px"}}>


<div>
<label style={{"display":"block","fontSize":"11px","fontWeight":"700","color":"var(--ink-500)","marginBottom":"4px"}}>
Baseline
</label>
<input value={k.baseline} onInput={k.setBaseline} placeholder="0" style={{"width":"100%","padding":"8px 10px","border":"1px solid var(--line-300)","borderRadius":"9px","fontSize":"12.5px","outline":"none"}} />
</div>


<div>
<div style={{"display":"flex","alignItems":"center","justifyContent":"space-between","marginBottom":"4px"}}>
<label style={{"fontSize":"11px","fontWeight":"700","color":"var(--ink-500)"}}>Target</label>
{Boolean(k.targetLocked) && (
<button onClick={k.unlockTarget} style={{"display":"inline-flex","alignItems":"center","gap":"3px","padding":"0","border":"none","background":"none","fontSize":"10px","fontWeight":"700","color":"var(--orchid-600)","cursor":"pointer"}}>
<Icon name={"lock"} style={{"width":"9px","height":"9px"}} />
override
</button>
)}
</div>
<input value={k.target} onInput={k.setTarget} placeholder="100000" style={{"width":"100%","padding":"8px 10px","border":"1px solid var(--line-300)","borderRadius":"9px","fontSize":"12.5px","outline":"none"}} />
</div>


<div>
<label style={{"display":"block","fontSize":"11px","fontWeight":"700","color":"var(--ink-500)","marginBottom":"4px"}}>
Current
</label>
<input value={k.current} onInput={k.setCurrent} placeholder="68000" style={{"width":"100%","padding":"8px 10px","border":"1px solid var(--line-300)","borderRadius":"9px","fontSize":"12.5px","outline":"none"}} />
</div>


<div>
<label style={{"display":"block","fontSize":"11px","fontWeight":"700","color":"var(--ink-500)","marginBottom":"4px"}}>
Weight %
</label>
<input value={k.weight} onInput={k.setWeight} style={{"width":"100%","padding":"8px 10px","border":"1px solid var(--line-300)","borderRadius":"9px","fontSize":"12.5px","outline":"none"}} />
</div>


</div>


<div style={{"display":"grid","gridTemplateColumns":"1fr 1fr 1fr","gap":"10px"}}>


<div>
<label style={{"display":"block","fontSize":"11px","fontWeight":"700","color":"var(--ink-500)","marginBottom":"4px"}}>
KR owner
</label>
<select value={k.who} onChange={k.setWho} style={{"width":"100%","padding":"9px 11px","border":"1px solid var(--line-300)","borderRadius":"10px","fontSize":"12.5px","background":"var(--paper)"}}>
{(okrOwnerOptions || []).map((o, $index) => (
<React.Fragment key={$index}>
<option value={o}>
{o}
</option>
</React.Fragment>
))}
</select>
</div>


<div>
<label style={{"display":"block","fontSize":"11px","fontWeight":"700","color":"var(--ink-500)","marginBottom":"4px"}}>
Check-in frequency
</label>
<select value={k.freq} onChange={k.setFreq} style={{"width":"100%","padding":"9px 11px","border":"1px solid var(--line-300)","borderRadius":"10px","fontSize":"12.5px","background":"var(--paper)"}}>
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
<label style={{"display":"block","fontSize":"11px","fontWeight":"700","color":"var(--ink-500)","marginBottom":"4px"}}>
Due date
</label>
<input type="date" value={k.due} onInput={k.setDue} style={{"width":"100%","padding":"8px 10px","border":"1px solid var(--line-300)","borderRadius":"9px","fontSize":"12.5px","outline":"none","background":"var(--paper)"}} />
</div>


</div>

<div style={{"borderTop":"1px dashed var(--line-300)","paddingTop":"10px"}}>
<label style={{"display":"flex","alignItems":"center","gap":"5px","fontSize":"11px","fontWeight":"700","color":"var(--verify-600)","marginBottom":"6px"}}>
<Icon name={"ruler"} style={{"width":"12px","height":"12px"}} />
How is this measured?
</label>
<div style={{"display":"grid","gridTemplateColumns":"1fr 1fr","gap":"10px"}}>
<div>
<label style={{"display":"block","fontSize":"10.5px","fontWeight":"700","color":"var(--ink-500)","marginBottom":"4px"}}>Measurement tool</label>
<select value={k.tool} onChange={k.setTool} style={{"width":"100%","padding":"9px 11px","border":"1px solid var(--line-300)","borderRadius":"10px","fontSize":"12.5px","background":"var(--paper)"}}>
<option value="">Select tool…</option>
{(okrToolGroups || []).map((g, $i) => (
<optgroup key={$i} label={g.g}>
{(g.tools || []).map((t, $i2) => (<option key={$i2} value={t}>{t}</option>))}
</optgroup>
))}
</select>
</div>
<div>
<label style={{"display":"block","fontSize":"10.5px","fontWeight":"700","color":"var(--ink-500)","marginBottom":"4px"}}>Measurement method</label>
<select value={k.method} onChange={k.setMethod} style={{"width":"100%","padding":"9px 11px","border":"1px solid var(--line-300)","borderRadius":"10px","fontSize":"12.5px","background":"var(--paper)"}}>
<option value="">Select method…</option>
{(okrMethodOptions || []).map((m, $i) => (<option key={$i} value={m}>{m}</option>))}
</select>
<div style={{"fontSize":"10px","fontWeight":"600","color":"var(--verify-600)","marginTop":"3px"}}>{k.methodAuto}</div>
</div>
<div>
<label style={{"display":"block","fontSize":"10.5px","fontWeight":"700","color":"var(--ink-500)","marginBottom":"4px"}}>Measurement frequency</label>
<select value={k.mfreq} onChange={k.setMfreq} style={{"width":"100%","padding":"9px 11px","border":"1px solid var(--line-300)","borderRadius":"10px","fontSize":"12.5px","background":"var(--paper)"}}>
<option value="">Select frequency…</option>
{(okrMfreqOptions || []).map((m, $i) => (<option key={$i} value={m}>{m}</option>))}
</select>
</div>
<div>
<label style={{"display":"block","fontSize":"10.5px","fontWeight":"700","color":"var(--ink-500)","marginBottom":"4px"}}>Evidence required</label>
<input value={k.evidence} onInput={k.setEvidence} placeholder="e.g. Grammarly report screenshot, GA4 export" style={{"width":"100%","padding":"9px 11px","border":"1px solid var(--line-300)","borderRadius":"10px","fontSize":"12.5px","outline":"none","background":"var(--paper)"}} />
</div>
</div>
<div style={{"display":"flex","alignItems":"center","gap":"6px","marginTop":"7px","fontSize":"10.5px","fontWeight":"700","color":"var(--ink-500)"}}>
<Icon name={"ruler"} style={{"width":"11px","height":"11px"}} />
{k.measureSummary}
</div>
</div>

<div style={{"borderTop":"1px dashed var(--line-300)","paddingTop":"10px"}}>
<div style={{"display":"grid","gridTemplateColumns":"1fr 1fr","gap":"14px"}}>
<div style={{"minWidth":"0"}}>
<div style={{"display":"flex","alignItems":"center","justifyContent":"space-between","marginBottom":"5px"}}>
<label style={{"display":"flex","alignItems":"center","gap":"5px","fontSize":"11px","fontWeight":"700","color":"var(--info-600)"}}>
<Icon name={"list-checks"} style={{"width":"12px","height":"12px"}} />
Linked tasks — many per KR
</label>
<button onClick={k.addTaskLink} style={{"display":"flex","alignItems":"center","gap":"4px","padding":"4px 9px","border":"1px solid var(--line-300)","background":"var(--paper)","color":"var(--ink-700)","borderRadius":"8px","fontSize":"10.5px","fontWeight":"700","cursor":"pointer"}}>
<Icon name={"plus"} style={{"width":"10px","height":"10px"}} />
Add task
</button>
</div>
<div style={{"display":"flex","flexDirection":"column","gap":"6px"}}>
{(k.taskLinks || []).map((tl, $ti) => (
<div key={$ti} style={{"display":"flex","gap":"6px","alignItems":"center","minWidth":"0"}}>
<select value={tl.key} onChange={tl.set} style={{"flex":"1","minWidth":"0","padding":"8px 10px","border":"1px solid var(--line-300)","borderRadius":"10px","fontSize":"12px","background":"var(--paper)"}}>
{(okrTaskLinkOptions || []).map((o, $i) => (<option key={$i} value={o.key}>{o.label}</option>))}
</select>
{Boolean(tl.canRemove) && (
<button onClick={tl.remove} style={{"width":"26px","height":"26px","borderRadius":"8px","border":"1px solid var(--line-300)","background":"var(--paper)","cursor":"pointer","display":"flex","alignItems":"center","justifyContent":"center","flexShrink":"0"}}>
<Icon name={"x"} style={{"width":"11px","height":"11px","color":"var(--ink-500)"}} />
</button>
)}
</div>
))}
</div>
</div>
<div style={{"minWidth":"0"}}>
<div style={{"display":"flex","alignItems":"center","justifyContent":"space-between","marginBottom":"5px"}}>
<label style={{"display":"flex","alignItems":"center","gap":"5px","fontSize":"11px","fontWeight":"700","color":"var(--orchid-600)"}}>
<Icon name={"gauge"} style={{"width":"12px","height":"12px"}} />
Linked effort — any division
</label>
<button onClick={k.addEffortLink} style={{"display":"flex","alignItems":"center","gap":"4px","padding":"4px 9px","border":"1px solid var(--line-300)","background":"var(--paper)","color":"var(--ink-700)","borderRadius":"8px","fontSize":"10.5px","fontWeight":"700","cursor":"pointer"}}>
<Icon name={"plus"} style={{"width":"10px","height":"10px"}} />
Add effort
</button>
</div>
<div style={{"display":"flex","flexDirection":"column","gap":"6px"}}>
{(k.effortLinks || []).map((el, $ei) => (
<div key={$ei} style={{"display":"flex","gap":"6px","alignItems":"center","minWidth":"0"}}>
<select value={el.key} onChange={el.set} style={{"flex":"1","minWidth":"0","padding":"8px 10px","border":"1px solid var(--line-300)","borderRadius":"10px","fontSize":"12px","background":"var(--paper)"}}>
{(okrEffortLinkOptions || []).map((o, $i) => (<option key={$i} value={o.key}>{o.label}</option>))}
</select>
{Boolean(el.canRemove) && (
<button onClick={el.remove} style={{"width":"26px","height":"26px","borderRadius":"8px","border":"1px solid var(--line-300)","background":"var(--paper)","cursor":"pointer","display":"flex","alignItems":"center","justifyContent":"center","flexShrink":"0"}}>
<Icon name={"x"} style={{"width":"11px","height":"11px","color":"var(--ink-500)"}} />
</button>
)}
</div>
))}
</div>
</div>
</div>
<div style={{"display":"flex","alignItems":"center","gap":"6px","marginTop":"9px","fontSize":"11px","fontWeight":"700","color":"var(--ink-500)"}}>
<Icon name={"git-branch"} style={{"width":"11px","height":"11px"}} />
{k.linkSummary}
</div>
</div>


</div>

              
</div>

            
</React.Fragment>
))}

          
</div>

          
<button onClick={okrAddKR} style={{"marginTop":"12px","display":"flex","alignItems":"center","gap":"6px","padding":"9px 13px","border":"1px dashed var(--line-300)","background":"var(--paper)","borderRadius":"10px","fontSize":"12.5px","fontWeight":"700","color":"var(--orchid-600)","cursor":"pointer"}}>
<Icon name={"plus"} style={{"width":"14px","height":"14px"}} />
Add key result
</button>

          
<div style={{"marginTop":"14px","background":"var(--info-100)","border":"1px solid #CBE3EC","borderRadius":"11px","padding":"11px 14px","fontSize":"12px","color":"var(--info-600)","display":"flex","gap":"9px","alignItems":"flex-start"}}>
<Icon name={"info"} style={{"width":"15px","height":"15px","flexShrink":"0","marginTop":"1px"}} />
<span>
Each key result links a KPI (reused from the KPI Master or custom-defined), the tasks contributing to it, and the effort plan behind it — the same linkage shown in the OKR detailed view (KR → KPI → tasks → effort).
</span>
</div>

        
</div>


        
{/* E · Alignment (project/campaign) */}

        
<div id="okrE" style={{"background":"var(--paper)","border":"1px solid var(--line-300)","borderRadius":"18px","boxShadow":"var(--shadow-sm)","padding":"22px 24px"}}>

          
<div style={{"display":"flex","alignItems":"center","gap":"8px","marginBottom":"14px"}}>
<span style={{"width":"22px","height":"22px","borderRadius":"7px","background":"var(--beet-700)","color":"#fff","display":"flex","alignItems":"center","justifyContent":"center","fontSize":"11px","fontWeight":"800"}}>
E
</span>
<span style={{"fontFamily":"'Sora'","fontWeight":"700","fontSize":"15px","color":"var(--ink-900)"}}>
Alignment & dependencies
</span>
</div>

          
<div style={{"display":"flex","flexDirection":"column","gap":"12px"}}>

            
<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Parent objective
</label>
<select value={okrParentVal} onChange={okrSetParent} style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","background":"var(--paper)"}}>
<option>
None (top level)
</option>
{(okrParentOptions || []).map((o, $index) => (
<option key={$index} value={o}>{o}</option>
))}
</select>
</div>


<div style={{"display":"grid","gridTemplateColumns":"1fr 1fr","gap":"12px"}}>


<div style={{"display":"none"}}>
<input placeholder="" style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","outline":"none"}} />
</div>


<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Linked campaigns
</label>
<select value={okrCampaignVal} onChange={okrSetCampaign} style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","background":"var(--paper)"}}>
{(campaignOptionsNone || []).map((o, $index) => (
<option key={$index} value={o}>{o}</option>
))}
</select>
</div>

            
</div>

            
<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Depends on
</label>
<input value={okrForm.dependsOn||''} onInput={okrSetDependsOn} placeholder="e.g., Website Migration, Technical SEO Audit" style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","outline":"none"}} />
</div>


<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Linked effort targets
</label>
<input value={okrForm.effortTargets||''} onInput={okrSetEffortTargets} placeholder="e.g., 12 blogs/month, 200 backlinks/month" style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","outline":"none"}} />
</div>

          
</div>

        
</div>


        
{/* F · Progress & data source */}

        
<div id="okrF" style={{"background":"var(--paper)","border":"1px solid var(--line-300)","borderRadius":"18px","boxShadow":"var(--shadow-sm)","padding":"22px 24px"}}>

          
<div style={{"display":"flex","alignItems":"center","gap":"8px","marginBottom":"14px"}}>
<span style={{"width":"22px","height":"22px","borderRadius":"7px","background":"var(--beet-700)","color":"#fff","display":"flex","alignItems":"center","justifyContent":"center","fontSize":"11px","fontWeight":"800"}}>
F
</span>
<span style={{"fontFamily":"'Sora'","fontWeight":"700","fontSize":"15px","color":"var(--ink-900)"}}>
Progress & data source
</span>
</div>

          
<div style={{"display":"grid","gridTemplateColumns":"1fr 1fr","gap":"12px"}}>

            
<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Progress calculation
</label>
<select value={okrForm.progressCalc} onChange={okrSetProgressCalc} style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","background":"var(--paper)"}}>
<option>
Automatic (from KPI logs)
</option>
<option>
Manual
</option>
</select>
</div>


<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Data source
</label>
<select value={okrForm.dataSource} onChange={okrSetDataSource} style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","background":"var(--paper)"}}>
<option>
GA4
</option>
<option>
Google Search Console
</option>
<option>
Semrush
</option>
<option>
Ahrefs
</option>
<option>
KPI Log
</option>
<option>
Manual Entry
</option>
</select>
</div>

          
</div>

        
</div>


        
{/* G · Review & governance */}

        
<div id="okrG" style={{"background":"var(--paper)","border":"1px solid var(--line-300)","borderRadius":"18px","boxShadow":"var(--shadow-sm)","padding":"22px 24px"}}>

          
<div style={{"display":"flex","alignItems":"center","gap":"8px","marginBottom":"14px"}}>
<span style={{"width":"22px","height":"22px","borderRadius":"7px","background":"var(--beet-700)","color":"#fff","display":"flex","alignItems":"center","justifyContent":"center","fontSize":"11px","fontWeight":"800"}}>
G
</span>
<span style={{"fontFamily":"'Sora'","fontWeight":"700","fontSize":"15px","color":"var(--ink-900)"}}>
Review & governance
</span>
</div>

          
<div style={{"display":"grid","gridTemplateColumns":"1fr 1fr","gap":"12px"}}>

            
<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Reviewer / approver
</label>
<select value={okrForm.reviewer} onChange={okrSetReviewer} style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","background":"var(--paper)"}}>
{(okrReviewerOptions || []).map((o, $index) => (
<option key={$index} value={o}>{o}</option>
))}
</select>
</div>


<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Status
</label>
<select value={okrForm.status} onChange={okrSetStatus} style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","background":"var(--paper)"}}>
<option>
Draft
</option>
<option>
Active
</option>
<option>
On Hold
</option>
<option>
At Risk
</option>
<option>
Completed
</option>
<option>
Archived
</option>
</select>
</div>

          
</div>

          
<label style={{"display":"flex","alignItems":"center","gap":"9px","marginTop":"12px","fontSize":"12.5px","color":"var(--ink-700)"}}>
<input type="checkbox" defaultChecked style={{"accentColor":"#7A1C46","width":"15px","height":"15px"}} />
Notify owner, contributors & reviewer on status changes and check-ins
</label>

        
</div>


        
{/* H · Risk & assumptions */}

        
<div id="okrH" style={{"background":"var(--paper)","border":"1px solid var(--line-300)","borderRadius":"18px","boxShadow":"var(--shadow-sm)","padding":"22px 24px"}}>

          
<div style={{"display":"flex","alignItems":"center","gap":"8px","marginBottom":"14px"}}>
<span style={{"width":"22px","height":"22px","borderRadius":"7px","background":"var(--beet-700)","color":"#fff","display":"flex","alignItems":"center","justifyContent":"center","fontSize":"11px","fontWeight":"800"}}>
H
</span>
<span style={{"fontFamily":"'Sora'","fontWeight":"700","fontSize":"15px","color":"var(--ink-900)"}}>
Risk & assumptions
</span>
</div>

          
<textarea rows="2" value={okrForm.risks||''} onInput={okrSetRisks} placeholder="Key risks, assumptions or blockers that could affect this objective…" style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","outline":"none","resize":"vertical"}} />

        
</div>


        
{/* I · Audit information */}

        
<div id="okrI" style={{"background":"var(--paper)","border":"1px solid var(--line-300)","borderRadius":"18px","boxShadow":"var(--shadow-sm)","padding":"22px 24px"}}>

          
<div style={{"display":"flex","alignItems":"center","gap":"8px","marginBottom":"14px"}}>
<span style={{"width":"22px","height":"22px","borderRadius":"7px","background":"var(--ink-400)","color":"#fff","display":"flex","alignItems":"center","justifyContent":"center","fontSize":"11px","fontWeight":"800"}}>
I
</span>
<span style={{"fontFamily":"'Sora'","fontWeight":"700","fontSize":"15px","color":"var(--ink-900)"}}>
Audit information
</span>
<span style={{"fontSize":"10.5px","fontWeight":"700","padding":"2px 8px","borderRadius":"999px","background":"var(--surface-50)","border":"1px solid var(--line-300)","color":"var(--ink-400)"}}>
Read-only
</span>
</div>

          
<div style={{"background":"var(--surface-50)","border":"1px solid var(--line-200)","borderRadius":"12px","padding":"14px","display":"grid","gridTemplateColumns":"1fr 1fr","gap":"12px 18px"}}>

            
<div>
<div style={{"fontSize":"11px","fontWeight":"700","textTransform":"uppercase","letterSpacing":".04em","color":"var(--ink-400)","marginBottom":"3px"}}>
Created by
</div>
<div style={{"fontSize":"13px","color":"var(--ink-900)"}}>
{okrAuditUser}
</div>
</div>

            
<div>
<div style={{"fontSize":"11px","fontWeight":"700","textTransform":"uppercase","letterSpacing":".04em","color":"var(--ink-400)","marginBottom":"3px"}}>
Created date
</div>
<div style={{"fontSize":"13px","color":"var(--ink-900)"}}>
On save
</div>
</div>

            
<div>
<div style={{"fontSize":"11px","fontWeight":"700","textTransform":"uppercase","letterSpacing":".04em","color":"var(--ink-400)","marginBottom":"3px"}}>
Last updated by
</div>
<div style={{"fontSize":"13px","color":"var(--ink-400)"}}>
—
</div>
</div>

            
<div>
<div style={{"fontSize":"11px","fontWeight":"700","textTransform":"uppercase","letterSpacing":".04em","color":"var(--ink-400)","marginBottom":"3px"}}>
Version
</div>
<div style={{"fontFamily":"'Space Mono'","fontSize":"13px","color":"var(--ink-900)"}}>
v1.0
</div>
</div>

          
</div>

        
</div>


        
</div>

      
</div>

    
</div>

    
{/* footer */}

    
<footer style={{"flex":"none","background":"var(--paper)","borderTop":"1px solid var(--line-200)","padding":"16px 28px","display":"flex","alignItems":"center","gap":"10px"}}>

      
<div style={{"flex":"1","display":"flex","alignItems":"center","gap":"8px","fontSize":"12.5px","color":"var(--ink-500)"}}>
<Icon name={"info"} style={{"width":"15px","height":"15px","color":"var(--ink-400)"}} />
Key-result weights must total 100% before activating.
</div>

      
<button onClick={closeOkr} style={{"padding":"11px 18px","border":"1px solid var(--line-300)","background":"var(--paper)","borderRadius":"11px","fontSize":"13.5px","fontWeight":"700","color":"var(--ink-700)","cursor":"pointer"}}>
Cancel
</button>

      
<button onClick={saveOkrDraft} style={{"padding":"11px 18px","border":"1px solid var(--line-300)","background":"var(--paper)","borderRadius":"11px","fontSize":"13.5px","fontWeight":"700","color":"var(--ink-700)","cursor":"pointer"}}>
Save draft
</button>

      
<button onClick={saveOkr} style={{"padding":"11px 28px","border":"none","background":"#7A1C46","color":"#fff","borderRadius":"11px","fontSize":"13.5px","fontWeight":"700","cursor":"pointer","boxShadow":"0 8px 18px -8px rgba(122,28,70,.55)"}}>
{okrSaveLabel || 'Save & activate'}
</button>

    
</footer>

  
</div>


</React.Fragment>
)}
    </React.Fragment>
  );
}
