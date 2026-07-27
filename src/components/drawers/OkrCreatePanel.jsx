import React from 'react';
import Icon from '../../components/Icon.jsx';
import { cssTextToObject } from '../../utils/cssText.js';

export default function OkrCreatePanel({ vm }) {
  const { closeOkr, kpiOptions, okrAddKR, okrAuditUser, okrDraftKRs, okrEffortOptions, okrNewCode, okrOwnerOptions, okrSteps, okrTaskOptions, okrTplOptions, okrTplPick, okrTplVal, okrWeightBg, okrWeightColor, okrWeightTotal, saveOkr, saveOkrDraft, showOkrPanel, okrForm, okrSetTitle, okrSetDesc, okrSetOwner, okrSetDept, okrSetBrand } = vm;
  return (
    <React.Fragment>
{Boolean(showOkrPanel) && (
<React.Fragment>

  
<div style={{"position":"fixed","inset":"0","zIndex":"160","background":"var(--surface-100)","display":"flex","flexDirection":"column","animation":"blrise .28s var(--ease-out)"}}>

    
{/* top bar */}

    
<header style={{"flex":"none","background":"#fff","borderBottom":"1px solid var(--line-200)","padding":"16px 28px","display":"flex","alignItems":"center","gap":"16px"}}>

      
<div style={{"flex":"1","minWidth":"0"}}>

        
<div style={{"fontSize":"11px","fontWeight":"700","letterSpacing":".1em","textTransform":"uppercase","color":"var(--orchid-500)"}}>
OKR Configuration
</div>

        
<div style={{"display":"flex","alignItems":"center","gap":"10px","marginTop":"3px"}}>
<h3 style={{"fontFamily":"'Sora'","fontWeight":"700","fontSize":"22px","color":"var(--beet-700)","margin":"0"}}>
Create new OKR
</h3>
<span style={{"fontFamily":"'Space Mono'","fontSize":"12px","color":"var(--ink-400)"}}>
{okrNewCode}
</span>
<span style={{"fontSize":"10.5px","fontWeight":"700","padding":"2px 9px","borderRadius":"999px","background":"var(--surface-50)","border":"1px solid var(--line-300)","color":"var(--ink-500)"}}>
Draft · v1.0
</span>
</div>

      
</div>

      
<button onClick={closeOkr} style={{"flex":"none","display":"flex","alignItems":"center","gap":"7px","background":"#fff","border":"1px solid var(--line-300)","color":"var(--ink-700)","borderRadius":"11px","padding":"9px 15px","fontSize":"13.5px","fontWeight":"700","cursor":"pointer"}}>
<Icon name={"x"} style={{"width":"16px","height":"16px"}} />
Close
</button>

    
</header>


    
{/* body: left nav + scrolling form */}

    
<div style={{"flex":"1","minHeight":"0","display":"flex"}}>

      
<nav style={{"flex":"none","width":"236px","borderRight":"1px solid var(--line-200)","background":"#fff","padding":"20px 14px","overflowY":"auto"}}>

        
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

        
<div id="okrA" style={{"background":"#fff","border":"1px solid var(--line-300)","borderRadius":"18px","boxShadow":"var(--shadow-sm)","padding":"22px 24px"}}>

          
<div style={{"display":"flex","alignItems":"center","gap":"8px","marginBottom":"14px"}}>
<span style={{"width":"22px","height":"22px","borderRadius":"7px","background":"var(--beet-700)","color":"#fff","display":"flex","alignItems":"center","justifyContent":"center","fontSize":"11px","fontWeight":"800"}}>
A
</span>
<span style={{"fontFamily":"'Sora'","fontWeight":"700","fontSize":"15px","color":"var(--beet-700)"}}>
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
<select value={okrForm.owner} onChange={okrSetOwner} style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","background":"#fff"}}>
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
<input placeholder="Add team members…" style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","outline":"none"}} />
</div>

            
</div>

          
</div>

        
</div>


        
{/* B · Scope & classification */}

        
<div id="okrB" style={{"background":"#fff","border":"1px solid var(--line-300)","borderRadius":"18px","boxShadow":"var(--shadow-sm)","padding":"22px 24px"}}>

          
<div style={{"display":"flex","alignItems":"center","gap":"8px","marginBottom":"14px"}}>
<span style={{"width":"22px","height":"22px","borderRadius":"7px","background":"var(--beet-700)","color":"#fff","display":"flex","alignItems":"center","justifyContent":"center","fontSize":"11px","fontWeight":"800"}}>
B
</span>
<span style={{"fontFamily":"'Sora'","fontWeight":"700","fontSize":"15px","color":"var(--beet-700)"}}>
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
<select value={okrForm.brand} onChange={okrSetBrand} style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","background":"#fff"}}>
<option>
Beetloop
</option>
<option>
Tutors India
</option>
<option>
Food Research Lab
</option>
<option>
Pubrica
</option>
</select>
</div>

            
<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Business unit
</label>
<select style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","background":"#fff"}}>
<option>
Digital Marketing
</option>
<option>
Research Services
</option>
</select>
</div>

            
<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Website / Domain
</label>
<select style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","background":"#fff"}}>
<option>
beetloop.com
</option>
<option>
tutorsindia.com
</option>
<option>
foodresearchlab.com
</option>
</select>
</div>

            
<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Department *
</label>
<select value={okrForm.dept} onChange={okrSetDept} style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","background":"#fff"}}>
<option>
SEO
</option>
<option>
Content
</option>
<option>
SMM
</option>
<option>
Web Development
</option>
<option>
Design
</option>
</select>
</div>

            
<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Project (optional)
</label>
<select style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","background":"#fff"}}>
<option>
—
</option>
<option>
Pubrica SEO program
</option>
<option>
Statswork website rebuild
</option>
</select>
</div>

            
<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Campaign (optional)
</label>
<select style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","background":"#fff"}}>
<option>
—
</option>
<option>
Q3 SEO push — Pubrica
</option>
<option>
Whitepaper funnel — FRL
</option>
</select>
</div>

          
</div>

          
<div style={{"display":"grid","gridTemplateColumns":"1fr 1fr","gap":"12px"}}>

            
<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Objective category
</label>
<select style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","background":"#fff"}}>
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
<select style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","background":"#fff"}}>
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

        
<div id="okrC" style={{"background":"#fff","border":"1px solid var(--line-300)","borderRadius":"18px","boxShadow":"var(--shadow-sm)","padding":"22px 24px"}}>

          
<div style={{"display":"flex","alignItems":"center","gap":"8px","marginBottom":"14px"}}>
<span style={{"width":"22px","height":"22px","borderRadius":"7px","background":"var(--beet-700)","color":"#fff","display":"flex","alignItems":"center","justifyContent":"center","fontSize":"11px","fontWeight":"800"}}>
C
</span>
<span style={{"fontFamily":"'Sora'","fontWeight":"700","fontSize":"15px","color":"var(--beet-700)"}}>
Timeline
</span>
</div>

          
<div style={{"display":"grid","gridTemplateColumns":"1fr 1fr","gap":"12px"}}>

            
<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Cycle *
</label>
<select style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","background":"#fff"}}>
<option>
Q1 2025
</option>
<option>
Q2 2025
</option>
<option>
Q3 2025
</option>
<option>
Q4 2025
</option>
<option>
Annual 2025
</option>
</select>
</div>

            
<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Review frequency
</label>
<select style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","background":"#fff"}}>
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
<input type="date" style={{"width":"100%","padding":"9px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","outline":"none","color":"var(--ink-700)"}} />
</div>

            
<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
End date
</label>
<input type="date" style={{"width":"100%","padding":"9px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","outline":"none","color":"var(--ink-700)"}} />
</div>

          
</div>

        
</div>


        
{/* D · Key results (KPI linkage) */}

        
<div id="okrD" style={{"background":"#fff","border":"1px solid var(--line-300)","borderRadius":"18px","boxShadow":"var(--shadow-sm)","padding":"22px 24px"}}>

          
<div style={{"display":"flex","alignItems":"center","justifyContent":"space-between","marginBottom":"14px"}}>

            
<div style={{"display":"flex","alignItems":"center","gap":"8px"}}>
<span style={{"width":"22px","height":"22px","borderRadius":"7px","background":"var(--beet-700)","color":"#fff","display":"flex","alignItems":"center","justifyContent":"center","fontSize":"11px","fontWeight":"800"}}>
D
</span>
<span style={{"fontFamily":"'Sora'","fontWeight":"700","fontSize":"15px","color":"var(--beet-700)"}}>
Key results — KPI linked
</span>
</div>

            
<span style={cssTextToObject(`font-size:11px;font-weight:700;padding:3px 9px;border-radius:999px;background:${okrWeightBg};color:${okrWeightColor}`)}>
Weights: {okrWeightTotal}%
</span>

          
</div>

          
<div style={{"display":"flex","alignItems":"center","gap":"9px","background":"var(--orchid-100)","border":"1px solid var(--orchid-200)","borderRadius":"12px","padding":"10px 13px","marginBottom":"14px"}}>

            
<Icon name={"layout-template"} style={{"width":"15px","height":"15px","color":"var(--orchid-700)","flexShrink":"0"}} />

            
<select value={okrTplVal} onChange={okrTplPick} style={{"flex":"1","border":"none","background":"none","fontSize":"12.5px","fontWeight":"700","color":"var(--beet-700)","outline":"none","cursor":"pointer"}}>
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

              
<div style={{"background":"var(--surface-50)","border":"1px solid var(--line-200)","borderRadius":"14px","padding":"14px"}}>

                
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
Key result (custom)
</label>
<input value={k.kr} onInput={k.setKr} placeholder="e.g. Increase organic visitors to 100K/month" style={{"width":"100%","padding":"9px 11px","border":"1px solid var(--line-300)","borderRadius":"10px","fontSize":"12.5px","outline":"none","background":"#fff"}} />
</div>

                  
<div style={{"display":"grid","gridTemplateColumns":"1.4fr 1fr","gap":"10px"}}>

                    
<div>
<label style={{"display":"block","fontSize":"11px","fontWeight":"700","color":"var(--ink-500)","marginBottom":"4px"}}>
KPI (from KPI Master, or custom)
</label>
<input value={k.kpiSel} onInput={k.setKpiSel} list="okr-kpi-list" placeholder="Pick from KPI Master / templates" style={{"width":"100%","padding":"9px 11px","border":"1px solid var(--line-300)","borderRadius":"10px","fontSize":"12.5px","outline":"none","background":"#fff"}} />
<datalist id="okr-kpi-list">
{(kpiOptions || []).map((o, $index) => (
<React.Fragment key={$index}>
<option value={o.label} />
</React.Fragment>
))}
</datalist>
</div>

                    
<div>
<label style={{"display":"block","fontSize":"11px","fontWeight":"700","color":"var(--ink-500)","marginBottom":"4px"}}>
Unit
</label>
<input value={k.unit} onInput={k.setUnit} placeholder="e.g. sessions" style={{"width":"100%","padding":"9px 11px","border":"1px solid var(--line-300)","borderRadius":"10px","fontSize":"12.5px","outline":"none","background":"#fff"}} />
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
<label style={{"display":"block","fontSize":"11px","fontWeight":"700","color":"var(--ink-500)","marginBottom":"4px"}}>
Target
</label>
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
<select value={k.who} onChange={k.setWho} style={{"width":"100%","padding":"9px 11px","border":"1px solid var(--line-300)","borderRadius":"10px","fontSize":"12.5px","background":"#fff"}}>
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
<select style={{"width":"100%","padding":"9px 11px","border":"1px solid var(--line-300)","borderRadius":"10px","fontSize":"12.5px","background":"#fff"}}>
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
<input type="date" style={{"width":"100%","padding":"8px 10px","border":"1px solid var(--line-300)","borderRadius":"9px","fontSize":"12.5px","outline":"none","background":"#fff"}} />
</div>

                  
</div>

                  
<div style={{"borderTop":"1px dashed var(--line-300)","paddingTop":"10px","display":"grid","gridTemplateColumns":"1fr 1fr","gap":"10px"}}>

                    
<div>
<label style={{"display":"flex","alignItems":"center","gap":"5px","fontSize":"11px","fontWeight":"700","color":"var(--info-600)","marginBottom":"4px"}}>
<Icon name={"list-checks"} style={{"width":"12px","height":"12px"}} />
Link tasks (contribute to this KPI)
</label>
<select style={{"width":"100%","padding":"9px 11px","border":"1px solid var(--line-300)","borderRadius":"10px","fontSize":"12.5px","background":"#fff"}}>
<option>
Auto — all tasks tagged with this KPI
</option>
{(okrTaskOptions || []).map((o, $index) => (
<React.Fragment key={$index}>
<option>
{o}
</option>
</React.Fragment>
))}
</select>
</div>

                    
<div>
<label style={{"display":"flex","alignItems":"center","gap":"5px","fontSize":"11px","fontWeight":"700","color":"var(--orchid-600)","marginBottom":"4px"}}>
<Icon name={"gauge"} style={{"width":"12px","height":"12px"}} />
Link effort plan
</label>
<select style={{"width":"100%","padding":"9px 11px","border":"1px solid var(--line-300)","borderRadius":"10px","fontSize":"12.5px","background":"#fff"}}>
<option>
None — outcome only
</option>
{(okrEffortOptions || []).map((o, $index) => (
<React.Fragment key={$index}>
<option>
{o}
</option>
</React.Fragment>
))}
</select>
</div>

                  
</div>

                
</div>

              
</div>

            
</React.Fragment>
))}

          
</div>

          
<button onClick={okrAddKR} style={{"marginTop":"12px","display":"flex","alignItems":"center","gap":"6px","padding":"9px 13px","border":"1px dashed var(--line-300)","background":"#fff","borderRadius":"10px","fontSize":"12.5px","fontWeight":"700","color":"var(--orchid-600)","cursor":"pointer"}}>
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

        
<div id="okrE" style={{"background":"#fff","border":"1px solid var(--line-300)","borderRadius":"18px","boxShadow":"var(--shadow-sm)","padding":"22px 24px"}}>

          
<div style={{"display":"flex","alignItems":"center","gap":"8px","marginBottom":"14px"}}>
<span style={{"width":"22px","height":"22px","borderRadius":"7px","background":"var(--beet-700)","color":"#fff","display":"flex","alignItems":"center","justifyContent":"center","fontSize":"11px","fontWeight":"800"}}>
E
</span>
<span style={{"fontFamily":"'Sora'","fontWeight":"700","fontSize":"15px","color":"var(--beet-700)"}}>
Alignment & dependencies
</span>
</div>

          
<div style={{"display":"flex","flexDirection":"column","gap":"12px"}}>

            
<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Parent objective
</label>
<select style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","background":"#fff"}}>
<option>
None (top level)
</option>
<option>
Increase Organic Traffic by 50%
</option>
<option>
Launch 30 High-Quality Content Pieces
</option>
</select>
</div>

            
<div style={{"display":"grid","gridTemplateColumns":"1fr 1fr","gap":"12px"}}>

              
<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Linked projects
</label>
<input placeholder="Pubrica SEO program…" style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","outline":"none"}} />
</div>

              
<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Linked campaigns
</label>
<input placeholder="Q3 SEO push…" style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","outline":"none"}} />
</div>

            
</div>

            
<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Depends on
</label>
<input placeholder="e.g., Website Migration, Technical SEO Audit" style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","outline":"none"}} />
</div>

            
<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Linked effort targets
</label>
<input placeholder="e.g., 12 blogs/month, 200 backlinks/month" style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","outline":"none"}} />
</div>

          
</div>

        
</div>


        
{/* F · Progress & data source */}

        
<div id="okrF" style={{"background":"#fff","border":"1px solid var(--line-300)","borderRadius":"18px","boxShadow":"var(--shadow-sm)","padding":"22px 24px"}}>

          
<div style={{"display":"flex","alignItems":"center","gap":"8px","marginBottom":"14px"}}>
<span style={{"width":"22px","height":"22px","borderRadius":"7px","background":"var(--beet-700)","color":"#fff","display":"flex","alignItems":"center","justifyContent":"center","fontSize":"11px","fontWeight":"800"}}>
F
</span>
<span style={{"fontFamily":"'Sora'","fontWeight":"700","fontSize":"15px","color":"var(--beet-700)"}}>
Progress & data source
</span>
</div>

          
<div style={{"display":"grid","gridTemplateColumns":"1fr 1fr","gap":"12px"}}>

            
<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Progress calculation
</label>
<select style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","background":"#fff"}}>
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
<select style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","background":"#fff"}}>
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

        
<div id="okrG" style={{"background":"#fff","border":"1px solid var(--line-300)","borderRadius":"18px","boxShadow":"var(--shadow-sm)","padding":"22px 24px"}}>

          
<div style={{"display":"flex","alignItems":"center","gap":"8px","marginBottom":"14px"}}>
<span style={{"width":"22px","height":"22px","borderRadius":"7px","background":"var(--beet-700)","color":"#fff","display":"flex","alignItems":"center","justifyContent":"center","fontSize":"11px","fontWeight":"800"}}>
G
</span>
<span style={{"fontFamily":"'Sora'","fontWeight":"700","fontSize":"15px","color":"var(--beet-700)"}}>
Review & governance
</span>
</div>

          
<div style={{"display":"grid","gridTemplateColumns":"1fr 1fr","gap":"12px"}}>

            
<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Reviewer / approver
</label>
<select style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","background":"#fff"}}>
<option>
John Smith (Admin)
</option>
<option>
Priya Nair (Manager)
</option>
<option>
Rahul Menon (COO)
</option>
</select>
</div>

            
<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Initial status
</label>
<select style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","background":"#fff"}}>
<option>
Draft
</option>
<option>
Active
</option>
<option>
On Hold
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

        
<div id="okrH" style={{"background":"#fff","border":"1px solid var(--line-300)","borderRadius":"18px","boxShadow":"var(--shadow-sm)","padding":"22px 24px"}}>

          
<div style={{"display":"flex","alignItems":"center","gap":"8px","marginBottom":"14px"}}>
<span style={{"width":"22px","height":"22px","borderRadius":"7px","background":"var(--beet-700)","color":"#fff","display":"flex","alignItems":"center","justifyContent":"center","fontSize":"11px","fontWeight":"800"}}>
H
</span>
<span style={{"fontFamily":"'Sora'","fontWeight":"700","fontSize":"15px","color":"var(--beet-700)"}}>
Risk & assumptions
</span>
</div>

          
<textarea rows="2" placeholder="Key risks, assumptions or blockers that could affect this objective…" style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","outline":"none","resize":"vertical"}} />

        
</div>


        
{/* I · Audit information */}

        
<div id="okrI" style={{"background":"#fff","border":"1px solid var(--line-300)","borderRadius":"18px","boxShadow":"var(--shadow-sm)","padding":"22px 24px"}}>

          
<div style={{"display":"flex","alignItems":"center","gap":"8px","marginBottom":"14px"}}>
<span style={{"width":"22px","height":"22px","borderRadius":"7px","background":"var(--ink-400)","color":"#fff","display":"flex","alignItems":"center","justifyContent":"center","fontSize":"11px","fontWeight":"800"}}>
I
</span>
<span style={{"fontFamily":"'Sora'","fontWeight":"700","fontSize":"15px","color":"var(--beet-700)"}}>
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

    
<footer style={{"flex":"none","background":"#fff","borderTop":"1px solid var(--line-200)","padding":"16px 28px","display":"flex","alignItems":"center","gap":"10px"}}>

      
<div style={{"flex":"1","display":"flex","alignItems":"center","gap":"8px","fontSize":"12.5px","color":"var(--ink-500)"}}>
<Icon name={"info"} style={{"width":"15px","height":"15px","color":"var(--ink-400)"}} />
Key-result weights must total 100% before activating.
</div>

      
<button onClick={closeOkr} style={{"padding":"11px 18px","border":"1px solid var(--line-300)","background":"#fff","borderRadius":"11px","fontSize":"13.5px","fontWeight":"700","color":"var(--ink-700)","cursor":"pointer"}}>
Cancel
</button>

      
<button onClick={saveOkrDraft} style={{"padding":"11px 18px","border":"1px solid var(--line-300)","background":"#fff","borderRadius":"11px","fontSize":"13.5px","fontWeight":"700","color":"var(--ink-700)","cursor":"pointer"}}>
Save draft
</button>

      
<button onClick={saveOkr} style={{"padding":"11px 28px","border":"none","background":"#7A1C46","color":"#fff","borderRadius":"11px","fontSize":"13.5px","fontWeight":"700","cursor":"pointer","boxShadow":"0 8px 18px -8px rgba(122,28,70,.55)"}}>
Save & activate
</button>

    
</footer>

  
</div>


</React.Fragment>
)}
    </React.Fragment>
  );
}
