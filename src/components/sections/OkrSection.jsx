import React from 'react';
import Icon from '../../components/Icon.jsx';
import { cssTextToObject } from '../../utils/cssText.js';

export default function OkrSection({ vm }) {
  const { kpiFreqChips, okrBulkArchive, okrBulkExport, okrBulkOwner, okrBulkReviewer, okrClearSel, okrEmpty, okrFilters, okrHasSel, okrPg, okrResetFilters, okrRows, okrSelCount, okrStats, showOKR, stop } = vm;
  return (
    <React.Fragment>
{Boolean(showOKR) && (
<React.Fragment>

          
<div style={{"display":"grid","gridTemplateColumns":"repeat(6,1fr)","gap":"12px","marginBottom":"18px"}}>

            
{(okrStats || []).map((s, $index) => (
<React.Fragment key={$index}>

              
<div style={{"background":"var(--paper)","border":"1px solid var(--line-300)","borderRadius":"16px","boxShadow":"var(--shadow-sm)","padding":"14px 16px"}}>

                
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


          
{/* KPI frequency chips */}

          
<div style={{"display":"flex","alignItems":"center","gap":"8px","marginBottom":"12px","flexWrap":"wrap"}}>

            
{(kpiFreqChips || []).map((c, $index) => (
<React.Fragment key={$index}>

              
<button onClick={c.set} style={cssTextToObject(c.style)}>
{c.label}
<span style={cssTextToObject(c.countStyle)}>
{c.count}
</span>
</button>

            
</React.Fragment>
))}

          
</div>

          
{/* filter bar */}

          
<div style={{"display":"flex","alignItems":"center","gap":"10px","marginBottom":"16px","flexWrap":"wrap"}}>

            
{(okrFilters || []).map((f, $index) => (
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

            
<button onClick={okrResetFilters} style={{"display":"flex","alignItems":"center","gap":"6px","background":"none","border":"none","color":"var(--ink-500)","fontSize":"12.5px","fontWeight":"700","cursor":"pointer"}}>
<Icon name={"rotate-ccw"} style={{"width":"13px","height":"13px"}} />
Reset
</button>

          
</div>


          
{/* bulk action bar */}

          
{Boolean(okrHasSel) && (
<React.Fragment>

            
<div style={{"display":"flex","alignItems":"center","gap":"12px","background":"var(--beet-700)","color":"#fff","borderRadius":"14px","padding":"11px 18px","marginBottom":"14px"}}>

              
<span style={{"fontSize":"13px","fontWeight":"700"}}>
{okrSelCount} selected
</span>

              
<div style={{"flex":"1"}} />

              
<button onClick={okrBulkReviewer} style={{"display":"flex","alignItems":"center","gap":"6px","background":"rgba(255,255,255,.14)","border":"none","color":"#fff","borderRadius":"9px","padding":"7px 12px","fontSize":"12.5px","fontWeight":"700","cursor":"pointer"}}>
<Icon name={"user-check"} style={{"width":"14px","height":"14px"}} />
Assign reviewer
</button>

              
<button onClick={okrBulkOwner} style={{"display":"flex","alignItems":"center","gap":"6px","background":"rgba(255,255,255,.14)","border":"none","color":"#fff","borderRadius":"9px","padding":"7px 12px","fontSize":"12.5px","fontWeight":"700","cursor":"pointer"}}>
<Icon name={"repeat"} style={{"width":"14px","height":"14px"}} />
Change owner
</button>

              
<button onClick={okrBulkArchive} style={{"display":"flex","alignItems":"center","gap":"6px","background":"rgba(255,255,255,.14)","border":"none","color":"#fff","borderRadius":"9px","padding":"7px 12px","fontSize":"12.5px","fontWeight":"700","cursor":"pointer"}}>
<Icon name={"archive"} style={{"width":"14px","height":"14px"}} />
Archive
</button>

              
<button onClick={okrBulkExport} style={{"display":"flex","alignItems":"center","gap":"6px","background":"rgba(255,255,255,.14)","border":"none","color":"#fff","borderRadius":"9px","padding":"7px 12px","fontSize":"12.5px","fontWeight":"700","cursor":"pointer"}}>
<Icon name={"download"} style={{"width":"14px","height":"14px"}} />
Export
</button>

              
<button onClick={okrClearSel} style={{"background":"none","border":"none","color":"rgba(255,255,255,.7)","cursor":"pointer","display":"flex","alignItems":"center"}}>
<Icon name={"x"} style={{"width":"16px","height":"16px"}} />
</button>

            
</div>

          
</React.Fragment>
)}


          
<div style={{"background":"var(--paper)","border":"1px solid var(--line-300)","borderRadius":"20px","boxShadow":"var(--shadow-sm)","overflow":"visible"}}>

            
<div style={{"overflowX":"auto","borderRadius":"20px"}}>

              
<table style={{"width":"100%","borderCollapse":"collapse","minWidth":"1080px"}}>

                
<thead>
<tr>

                  
<th style={{"width":"38px","background":"var(--surface-50)","borderBottom":"1px solid var(--line-200)"}} />

                  
<th style={{"width":"34px","background":"var(--surface-50)","borderBottom":"1px solid var(--line-200)"}} />

                  
<th style={{"textAlign":"left","padding":"12px 16px","fontSize":"11px","fontWeight":"700","letterSpacing":".05em","textTransform":"uppercase","color":"var(--ink-500)","background":"var(--surface-50)","borderBottom":"1px solid var(--line-200)"}}>
Objective & hierarchy
</th>

                  
<th style={{"textAlign":"left","padding":"12px 14px","fontSize":"11px","fontWeight":"700","letterSpacing":".05em","textTransform":"uppercase","color":"var(--ink-500)","background":"var(--surface-50)","borderBottom":"1px solid var(--line-200)"}}>
Type
</th>

                  
<th style={{"textAlign":"left","padding":"12px 14px","fontSize":"11px","fontWeight":"700","letterSpacing":".05em","textTransform":"uppercase","color":"var(--ink-500)","background":"var(--surface-50)","borderBottom":"1px solid var(--line-200)"}}>
Priority
</th>

                  
<th style={{"textAlign":"left","padding":"12px 14px","fontSize":"11px","fontWeight":"700","letterSpacing":".05em","textTransform":"uppercase","color":"var(--ink-500)","background":"var(--surface-50)","borderBottom":"1px solid var(--line-200)"}}>
Owner / reviewer
</th>

                  
<th style={{"textAlign":"left","padding":"12px 14px","fontSize":"11px","fontWeight":"700","letterSpacing":".05em","textTransform":"uppercase","color":"var(--ink-500)","background":"var(--surface-50)","borderBottom":"1px solid var(--line-200)"}}>
Due
</th>

                  
<th style={{"textAlign":"left","padding":"12px 14px","fontSize":"11px","fontWeight":"700","letterSpacing":".05em","textTransform":"uppercase","color":"var(--ink-500)","background":"var(--surface-50)","borderBottom":"1px solid var(--line-200)","minWidth":"150px"}}>
Progress
</th>

                  
<th style={{"textAlign":"left","padding":"12px 14px","fontSize":"11px","fontWeight":"700","letterSpacing":".05em","textTransform":"uppercase","color":"var(--ink-500)","background":"var(--surface-50)","borderBottom":"1px solid var(--line-200)"}}>
Health
</th>

                  
<th style={{"width":"44px","background":"var(--surface-50)","borderBottom":"1px solid var(--line-200)"}} />

                
</tr>
</thead>

                
<tbody>

                  
{(okrRows || []).map((o, $index) => (
<React.Fragment key={$index}>

                    
<tr onClick={o.openDetail} style={{"cursor":"pointer"}} style-hover="background:var(--surface-50)">

                      
<td onClick={o.toggle} style={{"padding":"14px 0 14px 16px","borderBottom":"1px solid var(--line-200)","cursor":"pointer"}}>
<Icon name={o.chevron} style={{"width":"17px","height":"17px","color":"var(--ink-500)"}} />
</td>

                      
<td style={{"padding":"14px 0","borderBottom":"1px solid var(--line-200)"}}>
<span onClick={o.toggleSel} style={cssTextToObject(`display:flex;width:18px;height:18px;border-radius:5px;border:1.5px solid ${o.checkBorder};background:${o.checkBg};align-items:center;justify-content:center;cursor:pointer`)}>
<Icon name={"check"} style={cssTextToObject(`width:12px;height:12px;color:#fff;opacity:${o.checkIconOpacity}`)} />
</span>
</td>

                      
<td style={{"padding":"12px 16px","borderBottom":"1px solid var(--line-200)"}}>

                        
<div style={{"fontSize":"14px","fontWeight":"700","color":"var(--ink-900)"}}>
{o.title}
</div>

                        
<div style={{"display":"flex","alignItems":"center","gap":"6px","marginTop":"4px","flexWrap":"wrap"}}>

                          
<span style={{"fontSize":"11px","fontWeight":"600","color":"var(--orchid-600)"}}>
{o.brand}
</span>

                          
<Icon name={"chevron-right"} style={{"width":"11px","height":"11px","color":"var(--ink-400)"}} />

                          
<span style={{"fontSize":"11px","color":"var(--ink-500)"}}>
{o.dept}
</span>

                          
<Icon name={"chevron-right"} style={{"width":"11px","height":"11px","color":"var(--ink-400)"}} />

                          
<span style={{"fontSize":"11px","color":"var(--ink-500)"}}>
{o.campaign}
</span>

                        
</div>

                        
<div style={{"display":"flex","alignItems":"center","gap":"7px","marginTop":"4px"}}>
<span style={cssTextToObject(`font-size:9.5px;font-weight:800;letter-spacing:.05em;text-transform:uppercase;padding:2px 7px;border-radius:6px;background:${o.scopeBg};color:${o.scopeColor}`)}>
{o.scope}
</span>
<span style={{"fontFamily":"'Space Mono'","fontSize":"10.5px","color":"var(--ink-400)"}}>
{o.code}
</span>
<span style={{"fontSize":"10.5px","color":"var(--ink-400)"}}>
{o.ver} · {o.krCount}
</span>
</div>

                      
</td>

                      
<td style={{"padding":"12px 14px","borderBottom":"1px solid var(--line-200)"}}>
<span style={cssTextToObject(`font-size:11px;font-weight:700;padding:4px 10px;border-radius:999px;background:${o.catBg};color:${o.catColor}`)}>
{o.category}
</span>
</td>

                      
<td style={{"padding":"12px 14px","borderBottom":"1px solid var(--line-200)"}}>
<span style={cssTextToObject(`display:inline-flex;align-items:center;gap:6px;font-size:12.5px;font-weight:700;color:${o.priColor}`)}>
<span style={cssTextToObject(`width:8px;height:8px;border-radius:99px;background:${o.priDot}`)} />
{o.priority}
</span>
</td>

                      
<td style={{"padding":"12px 14px","borderBottom":"1px solid var(--line-200)"}}>
<div style={{"fontSize":"13px","fontWeight":"600","color":"var(--ink-900)"}}>
{o.owner}
</div>
<div style={{"fontSize":"11.5px","color":"var(--ink-500)","marginTop":"2px"}}>
Rev: {o.reviewer}
</div>
</td>

                      
<td style={{"padding":"12px 14px","borderBottom":"1px solid var(--line-200)"}}>
<div style={{"fontSize":"12.5px","color":"var(--ink-700)"}}>
{o.due}
</div>
<div style={cssTextToObject(`font-size:11.5px;font-weight:700;color:${o.dueColor};margin-top:2px`)}>
{o.dueLabel}
</div>
</td>

                      
<td style={{"padding":"12px 14px","borderBottom":"1px solid var(--line-200)","minWidth":"150px"}}>
<div style={{"display":"flex","alignItems":"center","gap":"9px"}}>
<div style={{"flex":"1","height":"7px","borderRadius":"99px","background":"var(--line-200)","overflow":"hidden"}}>
<div style={cssTextToObject(`height:100%;border-radius:99px;width:${o.progressW};background:${o.progressColor}`)} />
</div>
<span style={{"fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)"}}>
{o.progress}%
</span>
</div>
<div style={{"fontSize":"11px","color":"var(--ink-400)","marginTop":"3px"}}>
achievement
</div>
</td>

                      
<td style={{"padding":"12px 14px","borderBottom":"1px solid var(--line-200)"}}>
<span style={cssTextToObject(`display:inline-flex;align-items:center;gap:6px;font-size:11.5px;font-weight:700;padding:4px 10px;border-radius:999px;background:${o.healthBg};color:${o.healthColor}`)}>
<span style={cssTextToObject(`width:7px;height:7px;border-radius:99px;background:${o.healthDot}`)} />
{o.healthLabel}
</span>
</td>

                      
<td style={{"padding":"12px 8px 12px 0","borderBottom":"1px solid var(--line-200)","position":"relative","textAlign":"right"}}>

                        
<button onClick={o.toggleMenu} style={{"width":"30px","height":"30px","borderRadius":"8px","border":"1px solid transparent","background":"none","cursor":"pointer","display":"inline-flex","alignItems":"center","justifyContent":"center"}} style-hover="border-color:var(--line-300);background:var(--paper)">
<Icon name={"more-vertical"} style={{"width":"16px","height":"16px","color":"var(--ink-500)"}} />
</button>

                        
{Boolean(o.menuOpen) && (
<React.Fragment>

                          
<div onClick={stop} style={{"position":"absolute","right":"12px","top":"44px","zIndex":"20","background":"var(--paper)","border":"1px solid var(--line-300)","borderRadius":"12px","boxShadow":"var(--shadow-lg)","padding":"6px","width":"158px","textAlign":"left"}}>

                            
<button onClick={o.viewAct} style={{"display":"flex","alignItems":"center","gap":"9px","width":"100%","padding":"8px 10px","border":"none","background":"none","borderRadius":"8px","fontSize":"13px","color":"var(--ink-700)","cursor":"pointer"}} style-hover="background:var(--surface-50)">
<Icon name={"eye"} style={{"width":"15px","height":"15px"}} />
View
</button>

                            
<button onClick={o.editAct} style={{"display":"flex","alignItems":"center","gap":"9px","width":"100%","padding":"8px 10px","border":"none","background":"none","borderRadius":"8px","fontSize":"13px","color":"var(--ink-700)","cursor":"pointer"}} style-hover="background:var(--surface-50)">
<Icon name={"pencil"} style={{"width":"15px","height":"15px"}} />
Edit
</button>

                            
<button onClick={o.cloneAct} style={{"display":"flex","alignItems":"center","gap":"9px","width":"100%","padding":"8px 10px","border":"none","background":"none","borderRadius":"8px","fontSize":"13px","color":"var(--ink-700)","cursor":"pointer"}} style-hover="background:var(--surface-50)">
<Icon name={"copy"} style={{"width":"15px","height":"15px"}} />
Clone
</button>

                            
<button onClick={o.histAct} style={{"display":"flex","alignItems":"center","gap":"9px","width":"100%","padding":"8px 10px","border":"none","background":"none","borderRadius":"8px","fontSize":"13px","color":"var(--ink-700)","cursor":"pointer"}} style-hover="background:var(--surface-50)">
<Icon name={"history"} style={{"width":"15px","height":"15px"}} />
Check-in history
</button>

                            
{Boolean(o.isManagerReviewer) && (
<React.Fragment>
<button onClick={o.reviewAct} style={{"display":"flex","alignItems":"center","gap":"9px","width":"100%","padding":"8px 10px","border":"none","background":"none","borderRadius":"8px","fontSize":"13px","color":"var(--orchid-700)","fontWeight":"700","cursor":"pointer"}} style-hover="background:var(--orchid-100)">
<Icon name={"clipboard-check"} style={{"width":"15px","height":"15px"}} />
Monthly review
</button>
</React.Fragment>
)}

                            
{Boolean(o.isExecReviewer) && (
<React.Fragment>
<button onClick={o.commentAct} style={{"display":"flex","alignItems":"center","gap":"9px","width":"100%","padding":"8px 10px","border":"none","background":"none","borderRadius":"8px","fontSize":"13px","color":"var(--orchid-700)","fontWeight":"700","cursor":"pointer"}} style-hover="background:var(--orchid-100)">
<Icon name={"message-square"} style={{"width":"15px","height":"15px"}} />
Executive comment
</button>
</React.Fragment>
)}

                            
<div style={{"height":"1px","background":"var(--line-200)","margin":"4px 6px"}} />

                            
<button onClick={o.archiveAct} style={{"display":"flex","alignItems":"center","gap":"9px","width":"100%","padding":"8px 10px","border":"none","background":"none","borderRadius":"8px","fontSize":"13px","color":"var(--danger-600)","cursor":"pointer"}} style-hover="background:var(--danger-100)">
<Icon name={"archive"} style={{"width":"15px","height":"15px"}} />
Archive
</button>

                          
</div>

                        
</React.Fragment>
)}

                      
</td>

                    
</tr>

                    
{Boolean(o.expanded) && (
<React.Fragment>

                      
<tr>
<td colSpan="10" style={{"padding":"0","borderBottom":"1px solid var(--line-200)","background":"var(--surface-50)"}}>

                        
<div style={{"padding":"16px 18px 18px 54px"}}>

                          
<div style={{"fontSize":"11.5px","fontWeight":"700","letterSpacing":".08em","textTransform":"uppercase","color":"var(--orchid-600)","marginBottom":"10px"}}>
Key results — KPI linked
</div>

                          
<div style={{"background":"var(--paper)","border":"1px solid var(--line-200)","borderRadius":"12px","overflow":"hidden","overflowX":"auto"}}>

                            
<table style={{"width":"100%","borderCollapse":"collapse","minWidth":"900px"}}>

                              
<thead>
<tr>

                                
<th style={{"textAlign":"left","padding":"9px 12px","fontSize":"10.5px","fontWeight":"700","textTransform":"uppercase","letterSpacing":".04em","color":"var(--ink-400)"}}>
#
</th>

                                
<th style={{"textAlign":"left","padding":"9px 12px","fontSize":"10.5px","fontWeight":"700","textTransform":"uppercase","letterSpacing":".04em","color":"var(--ink-400)"}}>
Key result
</th>

                                
<th style={{"textAlign":"left","padding":"9px 12px","fontSize":"10.5px","fontWeight":"700","textTransform":"uppercase","letterSpacing":".04em","color":"var(--ink-400)"}}>
KPI
</th>

                                
<th style={{"textAlign":"left","padding":"9px 12px","fontSize":"10.5px","fontWeight":"700","textTransform":"uppercase","letterSpacing":".04em","color":"var(--ink-400)"}}>
Baseline
</th>

                                
<th style={{"textAlign":"left","padding":"9px 12px","fontSize":"10.5px","fontWeight":"700","textTransform":"uppercase","letterSpacing":".04em","color":"var(--ink-400)"}}>
Current
</th>

                                
<th style={{"textAlign":"left","padding":"9px 12px","fontSize":"10.5px","fontWeight":"700","textTransform":"uppercase","letterSpacing":".04em","color":"var(--ink-400)"}}>
Target
</th>

                                
<th style={{"textAlign":"left","padding":"9px 12px","fontSize":"10.5px","fontWeight":"700","textTransform":"uppercase","letterSpacing":".04em","color":"var(--ink-400)"}}>
Achievement
</th>

                                
<th style={{"textAlign":"left","padding":"9px 12px","fontSize":"10.5px","fontWeight":"700","textTransform":"uppercase","letterSpacing":".04em","color":"var(--ink-400)"}}>
Weight
</th>

                                
<th style={{"textAlign":"left","padding":"9px 12px","fontSize":"10.5px","fontWeight":"700","textTransform":"uppercase","letterSpacing":".04em","color":"var(--ink-400)"}}>
Owner
</th>

                                
<th style={{"textAlign":"left","padding":"9px 12px","fontSize":"10.5px","fontWeight":"700","textTransform":"uppercase","letterSpacing":".04em","color":"var(--ink-400)"}}>
Due
</th>

                                
<th style={{"textAlign":"left","padding":"9px 12px","fontSize":"10.5px","fontWeight":"700","textTransform":"uppercase","letterSpacing":".04em","color":"var(--ink-400)"}}>
Status
</th>

                              
</tr>
</thead>

                              
<tbody>

                                
{(o.krs || []).map((k, $index) => (
<React.Fragment key={$index}>

                                  
<tr>

                                    
<td style={{"padding":"9px 12px","borderTop":"1px solid var(--line-200)","fontSize":"12.5px","color":"var(--ink-500)"}}>
{k.n}
</td>

                                    
<td style={{"padding":"9px 12px","borderTop":"1px solid var(--line-200)","fontSize":"12.5px","color":"var(--ink-900)","fontWeight":"600"}}>
{k.t}
</td>

                                    
<td style={{"padding":"9px 12px","borderTop":"1px solid var(--line-200)"}}>
<span style={{"fontSize":"11px","fontWeight":"700","padding":"3px 8px","borderRadius":"999px","background":"var(--orchid-100)","color":"var(--orchid-700)"}}>
{k.kpi}
</span>
</td>

                                    
<td style={{"padding":"9px 12px","borderTop":"1px solid var(--line-200)","fontSize":"12.5px","color":"var(--ink-500)"}}>
{k.baseline}
</td>

                                    
<td style={{"padding":"9px 12px","borderTop":"1px solid var(--line-200)","fontSize":"12.5px","color":"var(--ink-900)","fontWeight":"600"}}>
{k.current}
</td>

                                    
<td style={{"padding":"9px 12px","borderTop":"1px solid var(--line-200)","fontSize":"12.5px","color":"var(--ink-700)"}}>
{k.target}
</td>

                                    
<td style={cssTextToObject(`padding:9px 12px;border-top:1px solid var(--line-200);font-size:12.5px;font-weight:700;color:${k.achColor}`)}>
{k.ach}
</td>

                                    
<td style={{"padding":"9px 12px","borderTop":"1px solid var(--line-200)","fontSize":"12.5px","color":"var(--ink-700)"}}>
{k.weight}
</td>

                                    
<td style={{"padding":"9px 12px","borderTop":"1px solid var(--line-200)","fontSize":"12.5px","color":"var(--ink-700)"}}>
{k.who}
</td>

                                    
<td style={{"padding":"9px 12px","borderTop":"1px solid var(--line-200)","fontSize":"12.5px","color":"var(--ink-700)"}}>
{k.due}
</td>

                                    
<td style={{"padding":"9px 12px","borderTop":"1px solid var(--line-200)"}}>
<span style={cssTextToObject(`font-size:11px;font-weight:700;padding:3px 8px;border-radius:999px;background:${k.statusBg};color:${k.statusColor}`)}>
{k.status}
</span>
</td>

                                  
</tr>

                                
</React.Fragment>
))}

                              
</tbody>

                            
</table>

                          
</div>

                        
</div>

                      
</td>
</tr>

                    
</React.Fragment>
)}

                  
</React.Fragment>
))}

                
</tbody>

              
</table>

            
</div>

            
{Boolean(okrEmpty) && (
<React.Fragment>

              
<div style={{"padding":"44px","textAlign":"center","color":"var(--ink-500)"}}>
<Icon name={"search-x"} style={{"width":"26px","height":"26px","color":"var(--ink-400)"}} />
<div style={{"fontSize":"14px","fontWeight":"600","marginTop":"10px"}}>
No OKRs match these filters.
</div>
<div style={{"fontSize":"13px","color":"var(--ink-400)","marginTop":"3px"}}>
Try resetting the filters above.
</div>
</div>

            
</React.Fragment>
)}

            
{Boolean(okrPg.show) && (
<React.Fragment>

              
<div style={{"display":"flex","alignItems":"center","gap":"10px","padding":"12px 20px","background":"var(--surface-50)","borderTop":"1px solid var(--line-200)"}}>
<span style={{"flex":"1","fontSize":"12px","fontWeight":"600","color":"var(--ink-500)"}}>
{okrPg.label}
</span>
<button onClick={okrPg.prev} style={cssTextToObject(okrPg.prevStyle)}>
<Icon name={"chevron-left"} style={{"width":"14px","height":"14px"}} />
Prev
</button>
<button onClick={okrPg.next} style={cssTextToObject(okrPg.nextStyle)}>
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
