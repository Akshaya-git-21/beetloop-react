import React from 'react';
import Icon from '../../components/Icon.jsx';
import { cssTextToObject } from '../../utils/cssText.js';

export default function EffortPlannerSection({ vm }) {
  const { epAddRow, epAddingDiv, epAlloc, epBack, epBalanceMsg, epCanEdit, epCancelDiv, epCanDeleteDiv, epDeleteDiv, epDivOptions, epDivision, epFilterDefs, epForm, epIsCreate, epIsList, epIsReport, epNew, epNewDiv, epNotCreate, epOnNewDiv, epOwnerOptions, epPlans, epRepFilterDefs, epRepPlans, epRepReset, epRepStats, epResetFilters, epRows2, epSave, epSaveDiv, epSegListStyle, epSegReportStyle, epSetDept, epSetDivision, epSetEnd, epSetName, epSetOkr, epSetOwner, epSetQuarter, epSetStart, epSetType, epShowList, epShowReport, epTotalW, epTotalWColor, showEffort,
    epIsEdit, epEditTitle, epEditSub, epSaveLabel, okrTitleOptions, epOkrVal,
    epCanDelete } = vm;
  return (
    <React.Fragment>
{Boolean(showEffort) && (
<React.Fragment>


          
{Boolean(epNotCreate) && (
<React.Fragment>

            
<div style={{"display":"inline-flex","background":"var(--surface-50)","border":"1px solid var(--line-300)","borderRadius":"12px","padding":"3px","marginBottom":"18px"}}>

              
<button onClick={epShowList} style={cssTextToObject(epSegListStyle)}>
<Icon name={"layout-list"} style={{"width":"15px","height":"15px"}} />
Effort plans
</button>

              
<button onClick={epShowReport} style={cssTextToObject(epSegReportStyle)}>
<Icon name={"bar-chart-3"} style={{"width":"15px","height":"15px"}} />
Effort vs Outcome report
</button>

            
</div>

          
</React.Fragment>
)}


          
{/* EFFORT VS OUTCOME REPORT */}

          
{Boolean(epIsReport) && (
<React.Fragment>

            
<div style={{"display":"flex","alignItems":"center","gap":"10px","marginBottom":"14px","flexWrap":"wrap"}}>

              
{(epRepFilterDefs || []).map((f, $index) => (
<React.Fragment key={$index}>

                
<div style={{"display":"flex","alignItems":"center","gap":"7px","background":"var(--paper)","border":"1px solid var(--line-300)","borderRadius":"11px","padding":"6px 10px"}}>
<span style={{"fontSize":"11.5px","fontWeight":"700","color":"var(--ink-500)"}}>
{f.label}
</span>
<select value={f.value} onChange={f.onChange} style={{"border":"none","background":"none","fontSize":"13px","fontWeight":"600","color":"var(--ink-900)","outline":"none","cursor":"pointer"}}>
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

              
<button onClick={epRepReset} style={{"display":"flex","alignItems":"center","gap":"6px","padding":"7px 12px","border":"1px solid var(--line-300)","background":"var(--paper)","borderRadius":"11px","fontSize":"12px","fontWeight":"700","color":"var(--ink-500)","cursor":"pointer"}}>
<Icon name={"rotate-ccw"} style={{"width":"12px","height":"12px"}} />
Reset
</button>

            
</div>

            
<div style={{"display":"grid","gridTemplateColumns":"repeat(6,1fr)","gap":"12px","marginBottom":"18px"}}>

              
{(epRepStats || []).map((s, $index) => (
<React.Fragment key={$index}>

                
<div style={{"background":"var(--paper)","border":"1px solid var(--line-300)","borderRadius":"16px","boxShadow":"var(--shadow-sm)","padding":"14px 16px"}}>

                  
<div style={{"display":"flex","alignItems":"center","gap":"7px","marginBottom":"8px"}}>
<Icon name={s.icon} style={cssTextToObject(`width:14px;height:14px;color:${s.color}`)} />
<span style={{"fontSize":"11px","fontWeight":"600","color":"var(--ink-500)"}}>
{s.label}
</span>
</div>

                  
<div style={cssTextToObject(`font-family:'Sora';font-weight:800;font-size:23px;color:${s.color}`)}>
{s.value}
</div>

                
</div>

              
</React.Fragment>
))}

            
</div>

            
<div style={{"display":"flex","alignItems":"center","gap":"10px","background":"var(--info-100)","border":"1px solid #CBE3EC","color":"var(--info-600)","padding":"11px 15px","borderRadius":"14px","fontSize":"13px","fontWeight":"600","marginBottom":"16px"}}>
<Icon name={"git-branch"} style={{"width":"16px","height":"16px","flexShrink":"0"}} />
<span>
Effort = tasks approved against the plan target. Outcome = the linked KPI's movement (baseline → current → target). Both update live as tasks close and check-ins land.
</span>
</div>

            
<div style={{"display":"flex","flexDirection":"column","gap":"16px"}}>

              
{(epRepPlans || []).map((p, $index) => (
<React.Fragment key={$index}>

                
<div style={{"background":"var(--paper)","border":"1px solid var(--line-300)","borderRadius":"20px","boxShadow":"var(--shadow-sm)","overflow":"hidden"}}>

                  
<div style={{"display":"flex","alignItems":"center","gap":"11px","padding":"16px 22px","borderBottom":"1px solid var(--line-200)"}}>

                    
<span style={{"width":"34px","height":"34px","borderRadius":"10px","background":"var(--orchid-100)","display":"flex","alignItems":"center","justifyContent":"center","flexShrink":"0"}}>
<Icon name={p.divIcon} style={{"width":"16px","height":"16px","color":"var(--orchid-600)"}} />
</span>

                    
<div style={{"flex":"1","minWidth":"0"}}>
<div style={{"fontFamily":"'Sora'","fontWeight":"700","fontSize":"15px","color":"var(--ink-900)"}}>
{p.name}
</div>
<div style={{"fontSize":"11.5px","color":"var(--ink-500)"}}>
{p.division} · {p.period} · owner {p.owner}
</div>
</div>

                    
<span style={cssTextToObject(`font-size:12px;font-weight:800;color:${p.avgColor}`)}>
{p.avg}
</span>

                  
</div>

                  
<div style={{"overflowX":"auto"}}>

                    
<table style={{"width":"100%","borderCollapse":"collapse","minWidth":"960px"}}>

                      
<thead>
<tr>

                        
<th style={{"textAlign":"left","padding":"10px 14px 10px 22px","fontSize":"10.5px","fontWeight":"700","letterSpacing":".05em","textTransform":"uppercase","color":"var(--ink-500)","background":"var(--surface-50)"}}>
Effort
</th>

                        
<th style={{"textAlign":"left","padding":"10px 14px","fontSize":"10.5px","fontWeight":"700","letterSpacing":".05em","textTransform":"uppercase","color":"var(--ink-500)","background":"var(--surface-50)"}}>
Target
</th>

                        
<th style={{"textAlign":"left","padding":"10px 14px","fontSize":"10.5px","fontWeight":"700","letterSpacing":".05em","textTransform":"uppercase","color":"var(--ink-500)","background":"var(--surface-50)"}}>
Tasks closed
</th>

                        
<th style={{"textAlign":"left","padding":"10px 14px","fontSize":"10.5px","fontWeight":"700","letterSpacing":".05em","textTransform":"uppercase","color":"var(--ink-500)","background":"var(--surface-50)","minWidth":"170px"}}>
Effort delivered
</th>

                        
<th style={{"textAlign":"left","padding":"10px 14px","fontSize":"10.5px","fontWeight":"700","letterSpacing":".05em","textTransform":"uppercase","color":"var(--ink-500)","background":"var(--surface-50)"}}>
Outcome — linked KPI
</th>

                        
<th style={{"textAlign":"left","padding":"10px 22px 10px 14px","fontSize":"10.5px","fontWeight":"700","letterSpacing":".05em","textTransform":"uppercase","color":"var(--ink-500)","background":"var(--surface-50)"}}>
Health
</th>

                      
</tr>
</thead>

                      
<tbody>

                        
{(p.rows || []).map((r, $index) => (
<React.Fragment key={$index}>

                          
<tr>

                            
<td style={{"padding":"11px 14px 11px 22px","borderTop":"1px solid var(--line-200)"}}>
<span style={{"display":"inline-flex","alignItems":"center","gap":"8px"}}>
<Icon name={r.icon} style={{"width":"14px","height":"14px","color":"var(--orchid-600)"}} />
<span style={{"fontSize":"13px","fontWeight":"700","color":"var(--ink-900)"}}>
{r.type}
</span>
</span>
</td>

                            
<td style={{"padding":"11px 14px","borderTop":"1px solid var(--line-200)","fontSize":"12.5px","color":"var(--ink-700)"}}>
{r.target}
</td>

                            
<td style={{"padding":"11px 14px","borderTop":"1px solid var(--line-200)","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)"}}>
{r.tasksLabel}
</td>

                            
<td style={{"padding":"11px 14px","borderTop":"1px solid var(--line-200)"}}>
<div style={{"display":"flex","alignItems":"center","gap":"9px"}}>
<div style={{"flex":"1","height":"7px","borderRadius":"99px","background":"var(--line-200)","overflow":"hidden"}}>
<div style={cssTextToObject(`height:100%;border-radius:99px;width:${r.effortW};background:${r.effortColor}`)} />
</div>
<span style={cssTextToObject(`font-size:12.5px;font-weight:800;color:${r.effortColor}`)}>
{r.effortPct}
</span>
</div>
<div style={{"fontSize":"11px","color":"var(--ink-400)","marginTop":"2px"}}>
{r.delivered}
</div>
</td>

                            
<td style={{"padding":"11px 14px","borderTop":"1px solid var(--line-200)"}}>

                              
{Boolean(r.hasOutcome) && (
<React.Fragment>

                                
<div style={{"fontSize":"12px","fontWeight":"700","color":"var(--orchid-700)"}}>
{r.outcome.kpi}
</div>

                                
<div style={{"fontSize":"11.5px","color":"var(--ink-500)","marginTop":"2px"}}>
{r.outcome.baseline} → 
<strong style={{"color":"var(--ink-900)"}}>
{r.outcome.current}
</strong>
 / {r.outcome.target} · 
<span style={cssTextToObject(`font-weight:800;color:${r.outcome.achColor}`)}>
{r.outcome.ach}
</span>
</div>

                              
</React.Fragment>
)}

                              
{Boolean(r.noOutcome) && (
<React.Fragment>
<span style={{"fontSize":"11.5px","color":"var(--ink-400)"}}>
Effort only — no KPI linked
</span>
</React.Fragment>
)}

                            
</td>

                            
<td style={{"padding":"11px 22px 11px 14px","borderTop":"1px solid var(--line-200)"}}>
<span style={cssTextToObject(`font-size:11px;font-weight:700;padding:4px 10px;border-radius:999px;background:${r.health.bg};color:${r.health.color}`)}>
{r.health.label}
</span>
</td>

                          
</tr>

                        
</React.Fragment>
))}

                      
</tbody>

                    
</table>

                  
</div>

                
</div>

              
</React.Fragment>
))}

            
</div>

          
</React.Fragment>
)}


          
{/* LIST VIEW */}

          
{Boolean(epIsList) && (
<React.Fragment>

            
{Boolean(epCanEdit) && (
<React.Fragment>

              
<div style={{"display":"flex","alignItems":"center","gap":"14px","background":"linear-gradient(150deg,#3d1024,#7A1C46)","color":"#fff","borderRadius":"18px","padding":"18px 22px","marginBottom":"18px"}}>

                
<span style={{"width":"44px","height":"44px","borderRadius":"12px","background":"rgba(255,255,255,.14)","display":"flex","alignItems":"center","justifyContent":"center","flexShrink":"0"}}>
<Icon name={"gauge"} style={{"width":"21px","height":"21px"}} />
</span>

                
<div style={{"flex":"1"}}>
<div style={{"fontFamily":"'Sora'","fontWeight":"700","fontSize":"16px"}}>
Create a division-specific effort plan
</div>
<div style={{"fontSize":"13px","color":"rgba(255,255,255,.78)","marginTop":"3px"}}>
Each division plans its own efforts — pre-seeded effort types per division, plus custom efforts. Every effort links a KPI and generates tasks.
</div>
</div>

                
<select value={epDivision} onChange={epSetDivision} style={{"flexShrink":"0","padding":"10px 12px","border":"none","borderRadius":"11px","fontSize":"13.5px","fontWeight":"700","color":"var(--ink-900)","background":"var(--paper)","cursor":"pointer"}}>
{(epDivOptions || []).map((d, $index) => (
<React.Fragment key={$index}>
<option value={d}>
{d}
</option>
</React.Fragment>
))}
<option value="__add">
+ Add custom role…
</option>
</select>


{Boolean(epCanDeleteDiv) && (
<button onClick={epDeleteDiv} style={{"flexShrink":"0","width":"38px","height":"38px","display":"flex","alignItems":"center","justifyContent":"center","background":"rgba(255,255,255,.14)","color":"#fff","border":"none","borderRadius":"11px","cursor":"pointer"}} title={"Delete custom role"}>
<Icon name={"trash-2"} style={{"width":"15px","height":"15px"}} />
</button>
)}


<button onClick={epNew} style={{"flexShrink":"0","display":"flex","alignItems":"center","gap":"7px","background":"var(--paper)","color":"var(--ink-900)","border":"none","borderRadius":"11px","padding":"10px 16px","fontSize":"13.5px","fontWeight":"700","cursor":"pointer"}}>
<Icon name={"plus"} style={{"width":"15px","height":"15px"}} />
Create effort plan
</button>

              
</div>

              
{Boolean(epAddingDiv) && (
<React.Fragment>

                
<div style={{"display":"flex","alignItems":"center","gap":"10px","background":"var(--paper)","border":"1px solid var(--orchid-300)","borderRadius":"14px","padding":"12px 16px","marginBottom":"18px"}}>

                  
<Icon name={"user-plus"} style={{"width":"16px","height":"16px","color":"var(--orchid-600)","flexShrink":"0"}} />

                  
<span style={{"fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","flexShrink":"0"}}>
New role / division
</span>

                  
<input value={epNewDiv} onInput={epOnNewDiv} placeholder="e.g. Video Editor, PPC Specialist, Email Marketing…" style={{"flex":"1","padding":"9px 12px","border":"1px solid var(--line-300)","borderRadius":"10px","fontSize":"13px","outline":"none"}} />

                  
<button onClick={epSaveDiv} style={{"display":"flex","alignItems":"center","gap":"6px","padding":"9px 14px","border":"none","background":"#7A1C46","color":"#fff","borderRadius":"10px","fontSize":"12.5px","fontWeight":"700","cursor":"pointer"}}>
<Icon name={"check"} style={{"width":"13px","height":"13px"}} />
Add role
</button>

                  
<button onClick={epCancelDiv} style={{"padding":"9px 14px","border":"1px solid var(--line-300)","background":"var(--paper)","color":"var(--ink-700)","borderRadius":"10px","fontSize":"12.5px","fontWeight":"700","cursor":"pointer"}}>
Cancel
</button>

                
</div>

              
</React.Fragment>
)}

            
</React.Fragment>
)}

            
<div style={{"display":"flex","alignItems":"center","gap":"10px","marginBottom":"16px","flexWrap":"wrap"}}>

              
{(epFilterDefs || []).map((f, $index) => (
<React.Fragment key={$index}>

                
<div style={{"display":"flex","alignItems":"center","gap":"7px","background":"var(--paper)","border":"1px solid var(--line-300)","borderRadius":"11px","padding":"6px 10px"}}>
<span style={{"fontSize":"11.5px","fontWeight":"700","color":"var(--ink-500)"}}>
{f.label}
</span>
<select value={f.value} onChange={f.onChange} style={{"border":"none","background":"none","fontSize":"13px","fontWeight":"600","color":"var(--ink-900)","outline":"none","cursor":"pointer"}}>
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

              
<button onClick={epResetFilters} style={{"display":"flex","alignItems":"center","gap":"6px","padding":"7px 12px","border":"1px solid var(--line-300)","background":"var(--paper)","borderRadius":"11px","fontSize":"12px","fontWeight":"700","color":"var(--ink-500)","cursor":"pointer"}}>
<Icon name={"rotate-ccw"} style={{"width":"12px","height":"12px"}} />
Reset
</button>

            
</div>

            
<div style={{"display":"grid","gridTemplateColumns":"repeat(3,1fr)","gap":"14px"}}>

              
{(epPlans || []).map((p, $index) => (
<React.Fragment key={$index}>

                
<div style={{"background":"var(--paper)","border":"1px solid var(--line-300)","borderRadius":"18px","boxShadow":"var(--shadow-sm)","padding":"18px 20px","display":"flex","flexDirection":"column","gap":"10px"}}>

                  
<div style={{"display":"flex","alignItems":"center","gap":"10px"}}>

                    
<span style={{"width":"34px","height":"34px","borderRadius":"10px","background":"var(--orchid-100)","display":"flex","alignItems":"center","justifyContent":"center","flexShrink":"0"}}>
<Icon name={p.divIcon} style={{"width":"16px","height":"16px","color":"var(--orchid-600)"}} />
</span>

                    
<div style={{"flex":"1","minWidth":"0"}}>
<div style={{"fontSize":"14px","fontWeight":"700","color":"var(--ink-900)","whiteSpace":"nowrap","overflow":"hidden","textOverflow":"ellipsis"}}>
{p.name}
</div>
<div style={{"fontSize":"11.5px","color":"var(--ink-500)"}}>
{p.division} · {p.period}
</div>
</div>

                    
<span style={cssTextToObject(`font-size:10.5px;font-weight:700;padding:3px 9px;border-radius:999px;background:${p.statusBg};color:${p.statusColor};flex-shrink:0`)}>
{p.status}
</span>

                  
</div>

                  
<div style={{"display":"flex","flexWrap":"wrap","gap":"6px"}}>

                    
<span style={{"fontSize":"11px","fontWeight":"700","padding":"3px 9px","borderRadius":"999px","background":"var(--surface-50)","border":"1px solid var(--line-200)","color":"var(--ink-700)"}}>
{p.efforts}
</span>

                    
<span style={{"fontSize":"11px","fontWeight":"700","padding":"3px 9px","borderRadius":"999px","background":"var(--surface-50)","border":"1px solid var(--line-200)","color":"var(--ink-700)"}}>
{p.total}
</span>

                    
<span style={{"fontSize":"11px","fontWeight":"700","padding":"3px 9px","borderRadius":"999px","background":"var(--orchid-100)","border":"1px solid var(--orchid-200)","color":"var(--orchid-700)"}}>
{p.linked}
</span>


</div>

<div style={{"display":"flex","flexDirection":"column","gap":"5px","borderTop":"1px solid var(--line-200)","paddingTop":"9px"}}>
<button onClick={p.openCampaign} style={{"display":"flex","alignItems":"center","gap":"6px","padding":"0","border":"none","background":"none","fontSize":"11.5px","fontWeight":"700","color":"var(--orchid-600)","cursor":"pointer","textAlign":"left"}}>
<Icon name={"megaphone"} style={{"width":"12px","height":"12px","flexShrink":"0"}} />
{p.campaignName}
</button>
<button onClick={p.openOkr} style={{"display":"flex","alignItems":"center","gap":"6px","padding":"0","border":"none","background":"none","fontSize":"11.5px","fontWeight":"700","color":"var(--info-600)","cursor":"pointer","textAlign":"left"}}>
<Icon name={"target"} style={{"width":"12px","height":"12px","flexShrink":"0"}} />
{p.okrName}
</button>
</div>


<div style={{"display":"flex","alignItems":"center","gap":"8px","marginTop":"auto"}}>


<span style={{"flex":"1","fontSize":"12px","color":"var(--ink-500)"}}>
Owner · {p.owner}
</span>


<button onClick={p.edit} style={{"display":"flex","alignItems":"center","gap":"6px","background":"var(--paper)","border":"1px solid var(--line-300)","color":"var(--ink-700)","borderRadius":"10px","padding":"7px 13px","fontSize":"12.5px","fontWeight":"700","cursor":"pointer"}}>
<Icon name={"pencil"} style={{"width":"13px","height":"13px"}} />
Open
</button>

{Boolean(epCanDelete) && (
<React.Fragment>
<button onClick={p.delete} style={{"display":"flex","alignItems":"center","gap":"6px","background":"var(--paper)","border":"1px solid var(--danger-300, #e5a3a3)","color":"var(--danger-600)","borderRadius":"10px","padding":"7px 13px","fontSize":"12.5px","fontWeight":"700","cursor":"pointer"}}>
<Icon name={"trash-2"} style={{"width":"13px","height":"13px"}} />
Delete
</button>
</React.Fragment>
)}


</div>

                
</div>

              
</React.Fragment>
))}

            
</div>

          
</React.Fragment>
)}


          
{/* CREATE / EDIT VIEW */}

          
{Boolean(epIsCreate) && (
<React.Fragment>

          
<div style={{"display":"flex","alignItems":"center","gap":"12px","marginBottom":"16px"}}>

            
<button onClick={epBack} style={{"display":"flex","alignItems":"center","gap":"7px","background":"var(--paper)","border":"1px solid var(--line-300)","color":"var(--ink-700)","borderRadius":"11px","padding":"9px 14px","fontSize":"13px","fontWeight":"700","cursor":"pointer"}}>
<Icon name={"arrow-left"} style={{"width":"15px","height":"15px"}} />
All effort plans
</button>

            
<span style={{"display":"inline-flex","alignItems":"center","gap":"7px","fontSize":"12px","fontWeight":"700","padding":"6px 13px","borderRadius":"999px","background":"var(--orchid-100)","border":"1px solid var(--orchid-200)","color":"var(--orchid-700)"}}>
<Icon name={"users"} style={{"width":"13px","height":"13px"}} />
{epDivision} division
</span>

            
<div style={{"flex":"1"}} />

            
<button onClick={epSave} style={{"display":"flex","alignItems":"center","gap":"7px","background":"var(--paper)","border":"1px solid var(--line-300)","color":"var(--ink-700)","borderRadius":"11px","padding":"9px 16px","fontSize":"13px","fontWeight":"700","cursor":"pointer"}}>
<Icon name={"save"} style={{"width":"15px","height":"15px"}} />
{epSaveLabel}
</button>


</div>

<div style={{"display":"flex","alignItems":"center","gap":"11px","background":"var(--paper)","border":"1px solid var(--line-300)","borderRadius":"16px","padding":"14px 18px","marginBottom":"16px","boxShadow":"var(--shadow-sm)"}}>
<span style={{"width":"36px","height":"36px","borderRadius":"11px","background":"var(--orchid-100)","display":"flex","alignItems":"center","justifyContent":"center","flexShrink":"0"}}>
<Icon name={"gauge"} style={{"width":"17px","height":"17px","color":"var(--orchid-600)"}} />
</span>
<div>
<div style={{"fontFamily":"'Sora'","fontWeight":"700","fontSize":"16px","color":"var(--ink-900)"}}>{epEditTitle}</div>
<div style={{"fontSize":"12.5px","color":"var(--ink-500)","marginTop":"2px"}}>{epEditSub}</div>
</div>
</div>


<div style={{"display":"flex","alignItems":"center","gap":"0","marginBottom":"18px"}}>

            
<div style={{"display":"flex","alignItems":"center","gap":"10px","background":"var(--paper)","border":"1px solid var(--line-300)","borderRadius":"14px","padding":"12px 18px","flex":"1"}}>
<span style={{"width":"30px","height":"30px","borderRadius":"9px","background":"var(--orchid-100)","display":"flex","alignItems":"center","justifyContent":"center","color":"var(--orchid-600)","fontWeight":"800","fontSize":"13px"}}>
1
</span>
<div>
<div style={{"fontSize":"13px","fontWeight":"700","color":"var(--ink-900)"}}>
Create Effort
</div>
<div style={{"fontSize":"11px","color":"var(--ink-500)"}}>
e.g. 25,000 words over 25 days → 1,000/day
</div>
</div>
</div>

            
<Icon name={"arrow-right"} style={{"width":"18px","height":"18px","color":"var(--orchid-400)","margin":"0 8px","flexShrink":"0"}} />

            
<div style={{"display":"flex","alignItems":"center","gap":"10px","background":"var(--paper)","border":"1px solid var(--line-300)","borderRadius":"14px","padding":"12px 18px","flex":"1"}}>
<span style={{"width":"30px","height":"30px","borderRadius":"9px","background":"var(--orchid-100)","display":"flex","alignItems":"center","justifyContent":"center","color":"var(--orchid-600)","fontWeight":"800","fontSize":"13px"}}>
2
</span>
<div>
<div style={{"fontSize":"13px","fontWeight":"700","color":"var(--ink-900)"}}>
Link KPI
</div>
<div style={{"fontSize":"11px","color":"var(--ink-500)"}}>
effort drives an outcome KPI (e.g. visitors 2,000 → 3,000)
</div>
</div>
</div>

            
<Icon name={"arrow-right"} style={{"width":"18px","height":"18px","color":"var(--orchid-400)","margin":"0 8px","flexShrink":"0"}} />

            
<div style={{"display":"flex","alignItems":"center","gap":"10px","background":"var(--paper)","border":"1px solid var(--line-300)","borderRadius":"14px","padding":"12px 18px","flex":"1"}}>
<span style={{"width":"30px","height":"30px","borderRadius":"9px","background":"var(--orchid-100)","display":"flex","alignItems":"center","justifyContent":"center","color":"var(--orchid-600)","fontWeight":"800","fontSize":"13px"}}>
3
</span>
<div>
<div style={{"fontSize":"13px","fontWeight":"700","color":"var(--ink-900)"}}>
Generate Tasks
</div>
<div style={{"fontSize":"11px","color":"var(--ink-500)"}}>
each effort becomes a task with dates, assignee & KPI
</div>
</div>
</div>

          
</div>


          
<div style={{"background":"var(--paper)","border":"1px solid var(--line-300)","borderRadius":"20px","boxShadow":"var(--shadow-sm)","padding":"22px 24px","marginBottom":"16px"}}>

            
<h3 style={{"fontFamily":"'Sora'","fontWeight":"700","fontSize":"16px","color":"var(--ink-900)","margin":"0 0 16px"}}>
1. Plan information
</h3>

            
<div style={{"display":"grid","gridTemplateColumns":"repeat(3,1fr)","gap":"14px"}}>

              
<div>
<label style={{"display":"block","fontSize":"12px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Plan name
</label>
<input value={epForm.name} onInput={epSetName} style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","outline":"none"}} />
</div>

              
<div>
<label style={{"display":"block","fontSize":"12px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Period (month)
</label>
<input type="month" value={epForm.quarter} onInput={epSetQuarter} style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","outline":"none","background":"var(--paper)"}} />
</div>


<div>
<label style={{"display":"block","fontSize":"12px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Department
</label>
<input value={epForm.dept} onInput={epSetDept} style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","outline":"none"}} />
</div>

              
<div>
<label style={{"display":"block","fontSize":"12px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Employee / owner
</label>
<select value={epForm.owner} onChange={epSetOwner} style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","background":"var(--paper)"}}>
{(epOwnerOptions || []).map((o, $index) => (
<React.Fragment key={$index}>
<option value={o}>
{o}
</option>
</React.Fragment>
))}
</select>
</div>

              
<div>
<label style={{"display":"block","fontSize":"12px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Linked OKR
</label>
<select value={epOkrVal} onChange={epSetOkr} style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13px","background":"var(--paper)"}}>
{(okrTitleOptions || []).map((o, $index) => (
<React.Fragment key={$index}>
<option value={o}>
{o}
</option>
</React.Fragment>
))}
</select>
</div>

              
<div>
<label style={{"display":"block","fontSize":"12px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Plan start date
</label>
<input type="date" value={epForm.start} onInput={epSetStart} style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","outline":"none","background":"var(--paper)"}} />
</div>

              
<div>
<label style={{"display":"block","fontSize":"12px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Plan end date
</label>
<input type="date" value={epForm.end} onInput={epSetEnd} style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","outline":"none","background":"var(--paper)"}} />
</div>

              
<div>
<label style={{"display":"block","fontSize":"12px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Plan type
</label>
<select value={epForm.type} onChange={epSetType} style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","background":"var(--paper)"}}>
<option>
Monthly
</option>
<option>
Quarterly
</option>
</select>
</div>

            
</div>

          
</div>


          
<div style={{"background":"var(--paper)","border":"1px solid var(--line-300)","borderRadius":"20px","boxShadow":"var(--shadow-sm)","overflow":"hidden","marginBottom":"16px"}}>

            
<div style={{"padding":"20px 24px 14px"}}>
<h3 style={{"fontFamily":"'Sora'","fontWeight":"700","fontSize":"16px","color":"var(--ink-900)","margin":"0"}}>
2. Effort target summary
</h3>
<div style={{"fontSize":"12.5px","color":"var(--ink-500)","marginTop":"3px"}}>
Enter the monthly effort — weekly & daily targets compute automatically; link each effort to the KPI it drives.
</div>
</div>

            
<div style={{"overflowX":"auto"}}>

              
<table style={{"width":"100%","borderCollapse":"collapse","minWidth":"980px"}}>

                
<thead>
<tr>

                  
<th style={{"textAlign":"left","padding":"11px 16px 11px 24px","fontSize":"10.5px","fontWeight":"700","letterSpacing":".05em","textTransform":"uppercase","color":"var(--ink-500)","background":"var(--surface-50)","borderBottom":"1px solid var(--line-200)"}}>
Effort / task type
</th>

                  
<th style={{"textAlign":"left","padding":"11px 14px","fontSize":"10.5px","fontWeight":"700","letterSpacing":".05em","textTransform":"uppercase","color":"var(--ink-500)","background":"var(--surface-50)","borderBottom":"1px solid var(--line-200)"}}>
Monthly target
</th>

                  
<th style={{"textAlign":"left","padding":"11px 14px","fontSize":"10.5px","fontWeight":"700","letterSpacing":".05em","textTransform":"uppercase","color":"var(--ink-500)","background":"var(--surface-50)","borderBottom":"1px solid var(--line-200)"}}>
Weekly (avg)
</th>

                  
<th style={{"textAlign":"left","padding":"11px 14px","fontSize":"10.5px","fontWeight":"700","letterSpacing":".05em","textTransform":"uppercase","color":"var(--ink-500)","background":"var(--surface-50)","borderBottom":"1px solid var(--line-200)"}}>
Daily (avg)
</th>

                  
<th style={{"textAlign":"left","padding":"11px 14px","fontSize":"10.5px","fontWeight":"700","letterSpacing":".05em","textTransform":"uppercase","color":"var(--ink-500)","background":"var(--surface-50)","borderBottom":"1px solid var(--line-200)"}}>
Unit
</th>

                  
<th style={{"textAlign":"left","padding":"11px 14px","fontSize":"10.5px","fontWeight":"700","letterSpacing":".05em","textTransform":"uppercase","color":"var(--ink-500)","background":"var(--surface-50)","borderBottom":"1px solid var(--line-200)"}}>
Priority
</th>


<th style={{"textAlign":"left","padding":"11px 14px","fontSize":"10.5px","fontWeight":"700","letterSpacing":".05em","textTransform":"uppercase","color":"var(--ink-500)","background":"var(--surface-50)","borderBottom":"1px solid var(--line-200)"}}>
Assignee
</th>


<th style={{"textAlign":"left","padding":"11px 14px","fontSize":"10.5px","fontWeight":"700","letterSpacing":".05em","textTransform":"uppercase","color":"var(--ink-500)","background":"var(--surface-50)","borderBottom":"1px solid var(--line-200)"}}>
Linked KPI (outcome)
</th>

                  
<th style={{"textAlign":"left","padding":"11px 24px 11px 14px","fontSize":"10.5px","fontWeight":"700","letterSpacing":".05em","textTransform":"uppercase","color":"var(--ink-500)","background":"var(--surface-50)","borderBottom":"1px solid var(--line-200)"}}>
Weight %
</th>

                
</tr>
</thead>

                
<tbody>

                  
{(epRows2 || []).map((r, $index) => (
<React.Fragment key={$index}>

                    
<tr>

                      
<td style={{"padding":"11px 16px 11px 24px","borderBottom":"1px solid var(--line-200)"}}>
<span style={{"display":"flex","alignItems":"center","gap":"9px"}}>
<span style={{"width":"28px","height":"28px","borderRadius":"8px","background":"var(--orchid-100)","display":"flex","alignItems":"center","justifyContent":"center","flexShrink":"0"}}>
<Icon name={r.icon} style={{"width":"14px","height":"14px","color":"var(--orchid-600)"}} />
</span>
<input value={r.type} onInput={r.setType} style={{"flex":"1","minWidth":"140px","padding":"7px 9px","border":"1px solid transparent","borderRadius":"8px","fontSize":"13px","fontWeight":"700","color":"var(--ink-900)","outline":"none","background":"none"}} style-focus="border-color:var(--orchid-300);background:var(--paper)" />
</span>
</td>

                      
<td style={{"padding":"11px 14px","borderBottom":"1px solid var(--line-200)"}}>
<input value={r.monthly} onInput={r.setMonthly} style={{"width":"90px","padding":"8px 10px","border":"1px solid var(--line-300)","borderRadius":"9px","fontSize":"13px","outline":"none"}} />
</td>

                      
<td style={{"padding":"11px 14px","borderBottom":"1px solid var(--line-200)","fontSize":"13px","color":"var(--ink-700)"}}>
{r.weekly}
</td>

                      
<td style={{"padding":"11px 14px","borderBottom":"1px solid var(--line-200)"}}>
<span style={{"fontSize":"13px","fontWeight":"700","color":"var(--ink-900)"}}>
{r.daily}
</span>
<span style={{"fontSize":"11px","color":"var(--ink-400)"}}>
 /day
</span>
</td>

                      
<td style={{"padding":"11px 14px","borderBottom":"1px solid var(--line-200)"}}>
<input value={r.unit} onInput={r.setUnit} style={{"width":"88px","padding":"7px 9px","border":"1px solid transparent","borderRadius":"8px","fontSize":"12.5px","color":"var(--ink-500)","outline":"none","background":"none"}} style-focus="border-color:var(--orchid-300);background:var(--paper)" />
</td>

                      
<td style={{"padding":"11px 14px","borderBottom":"1px solid var(--line-200)"}}>
<span style={{"display":"inline-flex","alignItems":"center","gap":"6px"}}>
<span style={cssTextToObject(`width:8px;height:8px;border-radius:99px;background:${r.priDot}`)} />
<select value={r.priority} onChange={r.setPriority} style={{"border":"none","background":"none","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","outline":"none","cursor":"pointer"}}>
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
</span>
</td>


<td style={{"padding":"11px 14px","borderBottom":"1px solid var(--line-200)"}}>
<select value={r.assignee} onChange={r.setAssignee} style={{"width":"100%","minWidth":"130px","padding":"7px 9px","border":"1px solid var(--line-300)","borderRadius":"9px","fontSize":"12.5px","background":"var(--paper)","color":"var(--ink-700)","outline":"none","cursor":"pointer"}}>
{(r.assigneeOpts || []).map((o, $index) => (
<React.Fragment key={$index}>
<option value={o.v}>
{o.label}
</option>
</React.Fragment>
))}
</select>
</td>


<td style={{"padding":"11px 14px","borderBottom":"1px solid var(--line-200)"}}>
<div style={{"display":"flex","flexDirection":"column","gap":"5px","maxWidth":"240px"}}>
{(r.kpiChips || []).map((c, $index) => (
<React.Fragment key={$index}>
<span style={{"display":"inline-flex","alignItems":"center","gap":"6px","padding":"4px 8px","borderRadius":"8px","background":"var(--orchid-100)","color":"var(--orchid-700)","fontSize":"11px","fontWeight":"700"}}>
<Icon name={"target"} style={{"width":"11px","height":"11px","flexShrink":"0"}} />
<span style={{"flex":"1","minWidth":"0"}}>{c.label}</span>
<button onClick={c.remove} style={{"border":"none","background":"none","cursor":"pointer","display":"flex","padding":"0","color":"var(--orchid-700)"}}>
<Icon name={"x"} style={{"width":"11px","height":"11px"}} />
</button>
</span>
</React.Fragment>
))}
<select value={r.addKpiVal} onChange={r.addKpi} style={{"maxWidth":"240px","padding":"6px 9px","border":"1px dashed var(--line-300)","borderRadius":"9px","fontSize":"11.5px","background":"var(--paper)","color":"var(--ink-500)"}}>
{(r.kpiAddOptions || []).map((o, $index) => (
<React.Fragment key={$index}>
<option value={o.id}>
{o.label}
</option>
</React.Fragment>
))}
</select>
</div>
</td>


<td style={{"padding":"11px 24px 11px 14px","borderBottom":"1px solid var(--line-200)"}}>
<span style={{"display":"inline-flex","alignItems":"center","gap":"7px"}}>
<input value={r.weightStr} onInput={r.setWeight} style={{"width":"56px","padding":"8px 10px","border":"1px solid var(--line-300)","borderRadius":"9px","fontSize":"13px","outline":"none"}} />
{Boolean(r.canRemove) && (
<React.Fragment>
<button onClick={r.remove} title="Remove effort" style={{"width":"30px","height":"30px","borderRadius":"8px","border":"1px solid var(--line-300)","background":"var(--paper)","cursor":"pointer","display":"inline-flex","alignItems":"center","justifyContent":"center"}}>
<Icon name={"trash-2"} style={{"width":"13px","height":"13px","color":"var(--danger-600)"}} />
</button>
</React.Fragment>
)}
</span>
</td>
</tr>
<tr>
<td colSpan={8} style={{"padding":"0 24px 12px","borderBottom":"1px solid var(--line-200)"}}>
<div style={{"display":"flex","alignItems":"center","gap":"10px","flexWrap":"wrap"}}>
<span style={{"display":"inline-flex","alignItems":"center","gap":"5px","fontSize":"11px","fontWeight":"700","padding":"3px 9px","borderRadius":"999px","background":"var(--orchid-100)","color":"var(--orchid-700)"}}>
<Icon name={"target"} style={{"width":"11px","height":"11px"}} />{r.kpiChain}
</span>
<button onClick={r.toggleTasks} style={{"display":"inline-flex","alignItems":"center","gap":"5px","padding":"4px 10px","border":"1px solid var(--line-300)","background":"var(--paper)","color":"var(--ink-700)","borderRadius":"8px","fontSize":"11px","fontWeight":"700","cursor":"pointer"}}>
<Icon name={"list-checks"} style={{"width":"11px","height":"11px"}} />{r.taskToggle}
</button>
<span style={{"fontSize":"11px","color":"var(--ink-500)"}}>{r.taskDone} of {r.taskCount} approved</span>
</div>
{Boolean(r.tasksExpanded) && (
<div style={{"background":"var(--surface-50)","border":"1px solid var(--line-200)","borderRadius":"11px","overflow":"hidden","marginTop":"9px"}}>
{(r.taskRows || []).map((t, $index) => (
<div key={$index} onClick={t.open} style={{"padding":"8px 12px","borderBottom":"1px solid var(--line-200)","display":"flex","alignItems":"center","gap":"9px","cursor":"pointer"}}>
<span style={{"fontFamily":"'Space Mono'","fontSize":"10px","fontWeight":"700","color":"var(--ink-900)","flexShrink":"0"}}>{t.id}</span>
<span style={{"fontSize":"12px","fontWeight":"600","color":"var(--ink-900)","flex":"1","minWidth":"0"}}>{t.name}</span>
<span style={{"fontSize":"10.5px","color":"var(--ink-500)","flexShrink":"0"}}>{t.dates}</span>
<span style={{"fontSize":"10.5px","color":"var(--ink-500)","flexShrink":"0"}}>{t.who}</span>
<span style={cssTextToObject(`font-size:10px;font-weight:700;padding:2px 8px;border-radius:999px;background:${t.statusBg};color:${t.statusColor};flex-shrink:0`)}>{t.status}</span>
</div>
))}
{Boolean(r.tasksEmpty) && (
<div style={{"padding":"12px","textAlign":"center","fontSize":"11.5px","color":"var(--ink-500)"}}>No tasks generated from this effort yet — use Generate tasks below.</div>
)}
</div>
)}
</td>

                    
</tr>

                  
</React.Fragment>
))}

                
</tbody>

              
</table>

            
</div>

            
<div style={{"padding":"10px 24px 14px"}}>
<button onClick={epAddRow} style={{"display":"flex","alignItems":"center","gap":"7px","justifyContent":"center","width":"100%","padding":"10px","border":"1px dashed var(--orchid-300)","background":"var(--orchid-100)","borderRadius":"11px","fontSize":"12.5px","fontWeight":"700","color":"var(--orchid-700)","cursor":"pointer"}}>
<Icon name={"plus"} style={{"width":"14px","height":"14px"}} />
Add custom effort
</button>
</div>

            
<div style={{"display":"flex","alignItems":"center","gap":"10px","padding":"14px 24px","borderTop":"1px solid var(--line-200)","background":"var(--surface-50)"}}>

              
<Icon name={"scale"} style={cssTextToObject(`width:15px;height:15px;color:${epTotalWColor}`)} />

              
<span style={cssTextToObject(`font-size:13px;font-weight:700;color:${epTotalWColor}`)}>
Total weightage: {epTotalW}
</span>

              
<span style={cssTextToObject(`flex:1;text-align:right;font-size:12.5px;font-weight:600;color:${epTotalWColor}`)}>
{epBalanceMsg}
</span>

            
</div>

          
</div>


          
<div style={{"background":"var(--paper)","border":"1px solid var(--line-300)","borderRadius":"20px","boxShadow":"var(--shadow-sm)","padding":"22px 24px","marginBottom":"16px"}}>

            
<h3 style={{"fontFamily":"'Sora'","fontWeight":"700","fontSize":"16px","color":"var(--ink-900)","margin":"0 0 14px"}}>
3. Target allocation
</h3>

            
<div style={{"display":"grid","gridTemplateColumns":"repeat(3,1fr)","gap":"12px"}}>

              
{(epAlloc || []).map((a, $index) => (
<React.Fragment key={$index}>

                
<div style={{"border":"1px solid var(--line-200)","borderRadius":"14px","padding":"13px 15px"}}>

                  
<div style={{"display":"flex","alignItems":"center","gap":"8px","marginBottom":"8px"}}>
<Icon name={a.icon} style={{"width":"14px","height":"14px","color":"var(--orchid-600)"}} />
<span style={{"fontSize":"12.5px","fontWeight":"700","color":"var(--ink-900)"}}>
{a.type}
</span>
<span style={{"marginLeft":"auto","fontSize":"11.5px","fontWeight":"800","color":"var(--ink-900)"}}>
{a.weight}
</span>
</div>

                  
<div style={{"fontSize":"11.5px","color":"var(--ink-500)","marginBottom":"7px"}}>
{a.label}
</div>

                  
<div style={{"height":"6px","borderRadius":"99px","background":"var(--line-200)","overflow":"hidden"}}>
<div style={cssTextToObject(`height:100%;border-radius:99px;width:${a.w};background:var(--verify-500)`)} />
</div>

                
</div>

              
</React.Fragment>
))}

            
</div>

          
</div>



</React.Fragment>
)}

        
</React.Fragment>
)}
    </React.Fragment>
  );
}
