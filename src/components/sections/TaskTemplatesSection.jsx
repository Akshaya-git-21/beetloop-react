import React from 'react';
import Icon from '../../components/Icon.jsx';
import { cssTextToObject } from '../../utils/cssText.js';

export default function TaskTemplatesSection({ vm }) {
  const { ktPg, ktRows, ktStats, otPg, otRows, otStats, showTemplates, ttCanEdit, ttCanDelete, ttFilterDefs, ttPg, ttRows, ttSegKpiStyle, ttSegOkrStyle, ttSegTaskStyle, ttShowKpi, ttShowOkr, ttShowTask, ttStats, ttTabKpi, ttTabOkr, ttTabTask } = vm;
  return (
    <React.Fragment>
{Boolean(showTemplates) && (
<React.Fragment>

          
<div style={{"display":"inline-flex","background":"var(--surface-50)","border":"1px solid var(--line-300)","borderRadius":"12px","padding":"3px","marginBottom":"18px"}}>

            
<button onClick={ttShowTask} style={cssTextToObject(ttSegTaskStyle)}>
<Icon name={"layout-template"} style={{"width":"15px","height":"15px"}} />
Task templates
</button>

            
<button onClick={ttShowKpi} style={cssTextToObject(ttSegKpiStyle)}>
<Icon name={"target"} style={{"width":"15px","height":"15px"}} />
KPI templates
</button>

            
<button onClick={ttShowOkr} style={cssTextToObject(ttSegOkrStyle)}>
<Icon name={"flag"} style={{"width":"15px","height":"15px"}} />
OKR templates
</button>

          
</div>

          
{Boolean(ttTabOkr) && (
<React.Fragment>

            
<div style={{"display":"grid","gridTemplateColumns":"repeat(4,1fr)","gap":"12px","marginBottom":"18px"}}>

              
{(otStats || []).map((s, $index) => (
<React.Fragment key={$index}>

                
<div style={{"background":"var(--paper)","border":"1px solid var(--line-300)","borderRadius":"14px","padding":"14px 16px","boxShadow":"var(--shadow-sm)"}}>

                  
<div style={{"fontSize":"11px","fontWeight":"700","letterSpacing":".05em","textTransform":"uppercase","color":"var(--ink-400)"}}>
{s.label}
</div>

                  
<div style={cssTextToObject(`font-family:'Sora';font-weight:800;font-size:24px;color:${s.color};margin-top:4px`)}>
{s.value}
</div>

                
</div>

              
</React.Fragment>
))}

            
</div>

            
<div style={{"display":"flex","alignItems":"center","gap":"10px","background":"var(--info-100)","border":"1px solid #CBE3EC","color":"var(--info-600)","padding":"11px 15px","borderRadius":"14px","fontSize":"13px","fontWeight":"600","marginBottom":"14px"}}>
<Icon name={"flag"} style={{"width":"16px","height":"16px","flexShrink":"0"}} />
<span>
OKR Master — reusable objective blueprints with KPI-linked key results, targets and weights. Click "Use template" to open Create New OKR pre-filled, or pull one from the template dropdown inside Create OKR.
</span>
</div>

            
<div style={{"display":"flex","alignItems":"center","gap":"10px","marginBottom":"14px","flexWrap":"wrap"}}>

              
{(ttFilterDefs || []).map((f, $index) => (
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

            
</div>

            
<div style={{"display":"grid","gridTemplateColumns":"repeat(2,1fr)","gap":"14px"}}>

              
{(otRows || []).map((t, $index) => (
<React.Fragment key={$index}>

                
<div style={{"background":"var(--paper)","border":"1px solid var(--line-300)","borderRadius":"18px","boxShadow":"var(--shadow-sm)","padding":"18px 20px","display":"flex","flexDirection":"column","gap":"10px"}}>

                  
<div style={{"display":"flex","alignItems":"flex-start","gap":"10px"}}>

                    
<span style={{"width":"34px","height":"34px","borderRadius":"10px","background":"var(--orchid-100)","display":"flex","alignItems":"center","justifyContent":"center","flexShrink":"0"}}>
<Icon name={"flag"} style={{"width":"16px","height":"16px","color":"var(--orchid-600)"}} />
</span>

                    
<div style={{"flex":"1","minWidth":"0"}}>

                      
<div style={{"fontSize":"14px","fontWeight":"700","color":"var(--ink-900)"}}>
{t.name}
</div>

                      
<div style={{"fontSize":"12px","color":"var(--ink-500)","marginTop":"2px"}}>
{t.objective}
</div>

                    
</div>

                    
<span style={cssTextToObject(`font-size:10.5px;font-weight:700;padding:3px 9px;border-radius:999px;background:${t.statusBg};color:${t.statusColor};flex-shrink:0`)}>
{t.status}
</span>

                  
</div>

                  
<div style={{"display":"flex","flexWrap":"wrap","gap":"6px"}}>

                    
<span style={{"fontSize":"11px","fontWeight":"700","padding":"3px 9px","borderRadius":"999px","background":"var(--orchid-100)","color":"var(--orchid-700)"}}>
{t.category}
</span>

                    
<span style={{"fontSize":"11px","fontWeight":"700","padding":"3px 9px","borderRadius":"999px","background":"var(--surface-50)","border":"1px solid var(--line-200)","color":"var(--ink-700)"}}>
{t.scope} · {t.division}
</span>

                    
<span style={{"fontSize":"11px","fontWeight":"700","padding":"3px 9px","borderRadius":"999px","background":"var(--surface-50)","border":"1px solid var(--line-200)","color":"var(--ink-700)"}}>
{t.krCount}
</span>

                  
</div>

                  
<div style={{"fontSize":"11.5px","color":"var(--ink-500)","lineHeight":"1.5"}}>
{t.krsPreview}
</div>

                  
<div style={{"display":"flex","gap":"6px","marginTop":"2px"}}>

                    
<button onClick={t.use} style={{"display":"flex","alignItems":"center","gap":"6px","padding":"8px 14px","border":"none","background":"#7A1C46","color":"#fff","borderRadius":"10px","fontSize":"12px","fontWeight":"700","cursor":"pointer"}}>
<Icon name={"arrow-right"} style={{"width":"13px","height":"13px"}} />
Use template — create OKR
</button>

                    
{Boolean(ttCanEdit) && (
<React.Fragment>

                      
<button onClick={t.edit} style={{"padding":"8px 12px","border":"1px solid var(--line-300)","background":"var(--paper)","color":"var(--ink-700)","borderRadius":"10px","fontSize":"12px","fontWeight":"700","cursor":"pointer"}}>
Edit
</button>


<button onClick={t.duplicate} style={{"padding":"8px 12px","border":"1px solid var(--line-300)","background":"var(--paper)","color":"var(--ink-700)","borderRadius":"10px","fontSize":"12px","fontWeight":"700","cursor":"pointer"}}>
Duplicate
</button>


<button onClick={t.toggleStatus} style={{"padding":"8px 12px","border":"1px solid var(--line-300)","background":"var(--paper)","color":"var(--ink-500)","borderRadius":"10px","fontSize":"12px","fontWeight":"700","cursor":"pointer"}}>
{t.statusAction}
</button>


</React.Fragment>
)}
{Boolean(ttCanDelete) && (
<button onClick={t.delete} style={{"display":"flex","alignItems":"center","gap":"5px","padding":"8px 12px","border":"1px solid var(--danger-300, #e5a3a3)","background":"var(--paper)","color":"var(--danger-600)","borderRadius":"10px","fontSize":"12px","fontWeight":"700","cursor":"pointer"}}>
<Icon name={"trash-2"} style={{"width":"12px","height":"12px"}} />
Delete
</button>
)}

                  
</div>

                
</div>

              
</React.Fragment>
))}

            
</div>

            
{Boolean(otPg.show) && (
<React.Fragment>

              
<div style={{"display":"flex","alignItems":"center","gap":"10px","padding":"12px 4px"}}>
<span style={{"flex":"1","fontSize":"12px","fontWeight":"600","color":"var(--ink-500)"}}>
{otPg.label}
</span>
<button onClick={otPg.prev} style={cssTextToObject(otPg.prevStyle)}>
<Icon name={"chevron-left"} style={{"width":"14px","height":"14px"}} />
Prev
</button>
<button onClick={otPg.next} style={cssTextToObject(otPg.nextStyle)}>
Next
<Icon name={"chevron-right"} style={{"width":"14px","height":"14px"}} />
</button>
</div>

            
</React.Fragment>
)}

          
</React.Fragment>
)}

          
{Boolean(ttTabKpi) && (
<React.Fragment>

            
<div style={{"display":"grid","gridTemplateColumns":"repeat(4,1fr)","gap":"12px","marginBottom":"18px"}}>

              
{(ktStats || []).map((s, $index) => (
<React.Fragment key={$index}>

                
<div style={{"background":"var(--paper)","border":"1px solid var(--line-300)","borderRadius":"14px","padding":"14px 16px","boxShadow":"var(--shadow-sm)"}}>

                  
<div style={{"fontSize":"11px","fontWeight":"700","letterSpacing":".05em","textTransform":"uppercase","color":"var(--ink-400)"}}>
{s.label}
</div>

                  
<div style={cssTextToObject(`font-family:'Sora';font-weight:800;font-size:24px;color:${s.color};margin-top:4px`)}>
{s.value}
</div>

                
</div>

              
</React.Fragment>
))}

            
</div>

            
<div style={{"display":"flex","alignItems":"center","gap":"10px","background":"var(--info-100)","border":"1px solid #CBE3EC","color":"var(--info-600)","padding":"11px 15px","borderRadius":"14px","fontSize":"13px","fontWeight":"600","marginBottom":"14px"}}>
<Icon name={"target"} style={{"width":"16px","height":"16px","flexShrink":"0"}} />
<span>
KPI Master — standardized KPI definitions (unit, direction, default target, cadence, data source). Create Task, OKR key results and Effort plans all pull from this catalogue, so no duplicate metric definitions.
</span>
</div>

            
<div style={{"display":"flex","alignItems":"center","gap":"10px","marginBottom":"14px","flexWrap":"wrap"}}>

              
{(ttFilterDefs || []).map((f, $index) => (
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

            
</div>

            
<div style={{"background":"var(--paper)","border":"1px solid var(--line-300)","borderRadius":"18px","boxShadow":"var(--shadow-sm)","overflow":"hidden"}}>

              
<div style={{"overflowX":"auto"}}>
<table style={{"width":"100%","borderCollapse":"collapse","minWidth":"1080px"}}>

                
<thead>
<tr style={{"background":"var(--surface-50)"}}>

                  
<th style={{"textAlign":"left","padding":"11px 16px","fontSize":"11px","fontWeight":"800","letterSpacing":".06em","textTransform":"uppercase","color":"var(--ink-400)"}}>
KPI
</th>

                  
<th style={{"textAlign":"left","padding":"11px 16px","fontSize":"11px","fontWeight":"800","letterSpacing":".06em","textTransform":"uppercase","color":"var(--ink-400)"}}>
Category
</th>

                  
<th style={{"textAlign":"left","padding":"11px 16px","fontSize":"11px","fontWeight":"800","letterSpacing":".06em","textTransform":"uppercase","color":"var(--ink-400)"}}>
Division
</th>

                  
<th style={{"textAlign":"left","padding":"11px 16px","fontSize":"11px","fontWeight":"800","letterSpacing":".06em","textTransform":"uppercase","color":"var(--ink-400)"}}>
Unit
</th>

                  
<th style={{"textAlign":"left","padding":"11px 16px","fontSize":"11px","fontWeight":"800","letterSpacing":".06em","textTransform":"uppercase","color":"var(--ink-400)"}}>
Direction
</th>

                  
<th style={{"textAlign":"left","padding":"11px 16px","fontSize":"11px","fontWeight":"800","letterSpacing":".06em","textTransform":"uppercase","color":"var(--ink-400)"}}>
Default target
</th>

                  
<th style={{"textAlign":"left","padding":"11px 16px","fontSize":"11px","fontWeight":"800","letterSpacing":".06em","textTransform":"uppercase","color":"var(--ink-400)"}}>
Cadence
</th>

                  
<th style={{"textAlign":"left","padding":"11px 16px","fontSize":"11px","fontWeight":"800","letterSpacing":".06em","textTransform":"uppercase","color":"var(--ink-400)"}}>
Source
</th>

                  
<th style={{"textAlign":"left","padding":"11px 16px","fontSize":"11px","fontWeight":"800","letterSpacing":".06em","textTransform":"uppercase","color":"var(--ink-400)"}}>
Used
</th>

                  
<th style={{"textAlign":"left","padding":"11px 16px","fontSize":"11px","fontWeight":"800","letterSpacing":".06em","textTransform":"uppercase","color":"var(--ink-400)"}}>
Status
</th>

                  
<th style={{"textAlign":"right","padding":"11px 16px","fontSize":"11px","fontWeight":"800","letterSpacing":".06em","textTransform":"uppercase","color":"var(--ink-400)"}}>
Actions
</th>

                
</tr>
</thead>

                
<tbody>

                  
{(ktRows || []).map((t, $index) => (
<React.Fragment key={$index}>

                    
<tr style-hover="background:var(--surface-50)">

                      
<td style={{"padding":"13px 16px","borderBottom":"1px solid var(--line-200)"}}>
<div style={{"fontSize":"13.5px","fontWeight":"700","color":"var(--ink-900)"}}>
{t.name}
</div>
<div style={{"fontSize":"11.5px","color":"var(--ink-500)","marginTop":"3px","maxWidth":"300px"}}>
{t.desc}
</div>
</td>

                      
<td style={{"padding":"13px 16px","borderBottom":"1px solid var(--line-200)"}}>
<span style={{"fontSize":"11px","fontWeight":"700","padding":"3px 9px","borderRadius":"999px","background":"var(--orchid-100)","color":"var(--orchid-700)"}}>
{t.category}
</span>
</td>

                      
<td style={{"padding":"13px 16px","borderBottom":"1px solid var(--line-200)","fontSize":"12.5px","color":"var(--ink-700)"}}>
{t.division}
</td>

                      
<td style={{"padding":"13px 16px","borderBottom":"1px solid var(--line-200)","fontSize":"12.5px","color":"var(--ink-700)"}}>
{t.unit}
</td>

                      
<td style={{"padding":"13px 16px","borderBottom":"1px solid var(--line-200)"}}>
<span style={cssTextToObject(`display:inline-flex;align-items:center;gap:5px;font-size:12px;font-weight:700;color:${t.dirColor}`)}>
<Icon name={t.dirIcon} style={{"width":"13px","height":"13px"}} />
{t.direction}
</span>
</td>

                      
<td style={{"padding":"13px 16px","borderBottom":"1px solid var(--line-200)","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-900)"}}>
{t.defTarget}
</td>

                      
<td style={{"padding":"13px 16px","borderBottom":"1px solid var(--line-200)","fontSize":"12.5px","color":"var(--ink-700)"}}>
{t.freq}
</td>

                      
<td style={{"padding":"13px 16px","borderBottom":"1px solid var(--line-200)","fontSize":"12.5px","color":"var(--ink-700)"}}>
{t.source}
</td>

                      
<td style={{"padding":"13px 16px","borderBottom":"1px solid var(--line-200)","fontSize":"12.5px","fontWeight":"700","color":"var(--info-600)"}}>
{t.used}
</td>

                      
<td style={{"padding":"13px 16px","borderBottom":"1px solid var(--line-200)"}}>
<span style={cssTextToObject(`font-size:11px;font-weight:700;padding:3px 10px;border-radius:999px;background:${t.statusBg};color:${t.statusColor}`)}>
{t.status}
</span>
</td>

                      
<td style={{"padding":"13px 16px","borderBottom":"1px solid var(--line-200)","textAlign":"right"}}>

                        
<div style={{"display":"inline-flex","gap":"6px"}}>

{Boolean(ttCanEdit) && (
<React.Fragment>


<button onClick={t.edit} style={{"padding":"6px 12px","border":"1px solid var(--line-300)","background":"var(--paper)","color":"var(--ink-700)","borderRadius":"9px","fontSize":"12px","fontWeight":"700","cursor":"pointer"}}>
Edit
</button>


<button onClick={t.duplicate} style={{"padding":"6px 12px","border":"1px solid var(--line-300)","background":"var(--paper)","color":"var(--ink-700)","borderRadius":"9px","fontSize":"12px","fontWeight":"700","cursor":"pointer"}}>
Duplicate
</button>


<button onClick={t.toggleStatus} style={{"padding":"6px 12px","border":"1px solid var(--line-300)","background":"var(--paper)","color":"var(--ink-500)","borderRadius":"9px","fontSize":"12px","fontWeight":"700","cursor":"pointer"}}>
{t.statusAction}
</button>


</React.Fragment>
)}
{Boolean(ttCanDelete) && (
<button onClick={t.delete} style={{"display":"inline-flex","alignItems":"center","gap":"4px","padding":"6px 12px","border":"1px solid var(--danger-300, #e5a3a3)","background":"var(--paper)","color":"var(--danger-600)","borderRadius":"9px","fontSize":"12px","fontWeight":"700","cursor":"pointer"}}>
<Icon name={"trash-2"} style={{"width":"11px","height":"11px"}} />
Delete
</button>
)}


</div>

                      
</td>

                    
</tr>

                  
</React.Fragment>
))}

                
</tbody>

              
</table>
</div>

              
{Boolean(ktPg.show) && (
<React.Fragment>

                
<div style={{"display":"flex","alignItems":"center","gap":"10px","padding":"12px 20px","background":"var(--surface-50)","borderTop":"1px solid var(--line-200)"}}>
<span style={{"flex":"1","fontSize":"12px","fontWeight":"600","color":"var(--ink-500)"}}>
{ktPg.label}
</span>
<button onClick={ktPg.prev} style={cssTextToObject(ktPg.prevStyle)}>
<Icon name={"chevron-left"} style={{"width":"14px","height":"14px"}} />
Prev
</button>
<button onClick={ktPg.next} style={cssTextToObject(ktPg.nextStyle)}>
Next
<Icon name={"chevron-right"} style={{"width":"14px","height":"14px"}} />
</button>
</div>

              
</React.Fragment>
)}

            
</div>

          
</React.Fragment>
)}

          
{Boolean(ttTabTask) && (
<React.Fragment>

          
<div style={{"display":"grid","gridTemplateColumns":"repeat(4,1fr)","gap":"12px","marginBottom":"18px"}}>

            
{(ttStats || []).map((s, $index) => (
<React.Fragment key={$index}>

              
<div style={{"background":"var(--paper)","border":"1px solid var(--line-300)","borderRadius":"14px","padding":"14px 16px","boxShadow":"var(--shadow-sm)"}}>

                
<div style={{"fontSize":"11px","fontWeight":"700","letterSpacing":".05em","textTransform":"uppercase","color":"var(--ink-400)"}}>
{s.label}
</div>

                
<div style={cssTextToObject(`font-family:'Sora';font-weight:800;font-size:24px;color:${s.color};margin-top:4px`)}>
{s.value}
</div>

              
</div>

            
</React.Fragment>
))}

          
</div>

          
<div style={{"display":"flex","alignItems":"center","gap":"10px","background":"var(--info-100)","border":"1px solid #CBE3EC","color":"var(--info-600)","padding":"11px 15px","borderRadius":"14px","fontSize":"13px","fontWeight":"600","marginBottom":"14px"}}>
<Icon name={"layout-template"} style={{"width":"16px","height":"16px","flexShrink":"0"}} />
<span>
Task Master — every template standardizes a repeatable task: default checklist, effort estimate, priority, recurrence and KPI linkage. Creating a task from a template pre-fills all of it.
</span>
</div>

          
<div style={{"display":"flex","alignItems":"center","gap":"10px","marginBottom":"14px","flexWrap":"wrap"}}>

            
{(ttFilterDefs || []).map((f, $index) => (
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

          
</div>

          
<div style={{"background":"var(--paper)","border":"1px solid var(--line-300)","borderRadius":"18px","boxShadow":"var(--shadow-sm)","overflow":"hidden"}}>

            
<div style={{"overflowX":"auto"}}>
<table style={{"width":"100%","borderCollapse":"collapse","minWidth":"1080px"}}>

              
<thead>
<tr style={{"background":"var(--surface-50)"}}>

                
<th style={{"textAlign":"left","padding":"11px 16px","fontSize":"11px","fontWeight":"800","letterSpacing":".06em","textTransform":"uppercase","color":"var(--ink-400)"}}>
ID
</th>

                
<th style={{"textAlign":"left","padding":"11px 16px","fontSize":"11px","fontWeight":"800","letterSpacing":".06em","textTransform":"uppercase","color":"var(--ink-400)"}}>
Template
</th>

                
<th style={{"textAlign":"left","padding":"11px 16px","fontSize":"11px","fontWeight":"800","letterSpacing":".06em","textTransform":"uppercase","color":"var(--ink-400)"}}>
Division
</th>

                
<th style={{"textAlign":"left","padding":"11px 16px","fontSize":"11px","fontWeight":"800","letterSpacing":".06em","textTransform":"uppercase","color":"var(--ink-400)"}}>
Linked KPI
</th>

                
<th style={{"textAlign":"left","padding":"11px 16px","fontSize":"11px","fontWeight":"800","letterSpacing":".06em","textTransform":"uppercase","color":"var(--ink-400)"}}>
Checklist
</th>

                
<th style={{"textAlign":"left","padding":"11px 16px","fontSize":"11px","fontWeight":"800","letterSpacing":".06em","textTransform":"uppercase","color":"var(--ink-400)"}}>
Est.
</th>

                
<th style={{"textAlign":"left","padding":"11px 16px","fontSize":"11px","fontWeight":"800","letterSpacing":".06em","textTransform":"uppercase","color":"var(--ink-400)"}}>
Recurrence
</th>

                
<th style={{"textAlign":"left","padding":"11px 16px","fontSize":"11px","fontWeight":"800","letterSpacing":".06em","textTransform":"uppercase","color":"var(--ink-400)"}}>
Used
</th>

                
<th style={{"textAlign":"left","padding":"11px 16px","fontSize":"11px","fontWeight":"800","letterSpacing":".06em","textTransform":"uppercase","color":"var(--ink-400)"}}>
Status
</th>

                
<th style={{"textAlign":"right","padding":"11px 16px","fontSize":"11px","fontWeight":"800","letterSpacing":".06em","textTransform":"uppercase","color":"var(--ink-400)"}}>
Actions
</th>

              
</tr>
</thead>

              
<tbody>

                
{(ttRows || []).map((t, $index) => (
<React.Fragment key={$index}>

                  
<tr style-hover="background:var(--surface-50)">

                    
<td style={{"padding":"13px 16px","borderBottom":"1px solid var(--line-200)","fontFamily":"'Space Mono'","fontSize":"11px","fontWeight":"700","color":"var(--ink-900)"}}>
{t.id}
</td>

                    
<td style={{"padding":"13px 16px","borderBottom":"1px solid var(--line-200)"}}>

                      
<div style={{"display":"flex","alignItems":"center","gap":"7px"}}>
<span style={cssTextToObject(`width:7px;height:7px;border-radius:99px;background:${t.priDot};flex-shrink:0`)} />
<span style={{"fontSize":"13.5px","fontWeight":"700","color":"var(--ink-900)"}}>
{t.name}
</span>
</div>

                      
<div style={{"fontSize":"11.5px","color":"var(--ink-500)","marginTop":"3px","maxWidth":"340px"}}>
{t.desc}
</div>

                    
</td>

                    
<td style={{"padding":"13px 16px","borderBottom":"1px solid var(--line-200)","fontSize":"12.5px","color":"var(--ink-700)"}}>
{t.division}
</td>

                    
<td style={{"padding":"13px 16px","borderBottom":"1px solid var(--line-200)"}}>

                      
<span style={{"display":"inline-flex","alignItems":"center","gap":"5px","fontSize":"11px","fontWeight":"700","padding":"3px 9px","borderRadius":"999px","background":"var(--orchid-100)","color":"var(--orchid-700)"}}>
<Icon name={"target"} style={{"width":"11px","height":"11px"}} />
{t.kpiLabel}
</span>

                    
</td>

                    
<td style={{"padding":"13px 16px","borderBottom":"1px solid var(--line-200)","fontSize":"12.5px","color":"var(--ink-700)"}}>
{t.steps}
</td>

                    
<td style={{"padding":"13px 16px","borderBottom":"1px solid var(--line-200)","fontSize":"12.5px","color":"var(--ink-700)"}}>
{t.estH}
</td>

                    
<td style={{"padding":"13px 16px","borderBottom":"1px solid var(--line-200)","fontSize":"12.5px","color":"var(--ink-700)"}}>
{t.recurrence}
</td>

                    
<td style={{"padding":"13px 16px","borderBottom":"1px solid var(--line-200)","fontSize":"12.5px","fontWeight":"700","color":"var(--info-600)"}}>
{t.used}
</td>

                    
<td style={{"padding":"13px 16px","borderBottom":"1px solid var(--line-200)"}}>
<span style={cssTextToObject(`font-size:11px;font-weight:700;padding:3px 10px;border-radius:999px;background:${t.statusBg};color:${t.statusColor}`)}>
{t.status}
</span>
</td>

                    
<td style={{"padding":"13px 16px","borderBottom":"1px solid var(--line-200)","textAlign":"right"}}>

                      
{Boolean(ttCanEdit) && (
<React.Fragment>

                        
<div style={{"display":"inline-flex","gap":"6px"}}>

                          
<button onClick={t.edit} style={{"padding":"6px 12px","border":"1px solid var(--line-300)","background":"var(--paper)","color":"var(--ink-700)","borderRadius":"9px","fontSize":"12px","fontWeight":"700","cursor":"pointer"}}>
Edit
</button>

                          
<button onClick={t.duplicate} style={{"padding":"6px 12px","border":"1px solid var(--line-300)","background":"var(--paper)","color":"var(--ink-700)","borderRadius":"9px","fontSize":"12px","fontWeight":"700","cursor":"pointer"}}>
Duplicate
</button>

                          
<button onClick={t.toggleStatus} style={{"padding":"6px 12px","border":"1px solid var(--line-300)","background":"var(--paper)","color":"var(--ink-500)","borderRadius":"9px","fontSize":"12px","fontWeight":"700","cursor":"pointer"}}>
{t.statusAction}
</button>

{Boolean(ttCanDelete) && (
<button onClick={t.delete} style={{"display":"inline-flex","alignItems":"center","gap":"4px","padding":"6px 12px","border":"1px solid var(--danger-300, #e5a3a3)","background":"var(--paper)","color":"var(--danger-600)","borderRadius":"9px","fontSize":"12px","fontWeight":"700","cursor":"pointer"}}>
<Icon name={"trash-2"} style={{"width":"11px","height":"11px"}} />
Delete
</button>
)}

                        
</div>

                      
</React.Fragment>
)}

                    
</td>

                  
</tr>

                
</React.Fragment>
))}

              
</tbody>

            
</table>
</div>

            
{Boolean(ttPg.show) && (
<React.Fragment>

              
<div style={{"display":"flex","alignItems":"center","gap":"10px","padding":"12px 20px","background":"var(--surface-50)","borderTop":"1px solid var(--line-200)"}}>
<span style={{"flex":"1","fontSize":"12px","fontWeight":"600","color":"var(--ink-500)"}}>
{ttPg.label}
</span>
<button onClick={ttPg.prev} style={cssTextToObject(ttPg.prevStyle)}>
<Icon name={"chevron-left"} style={{"width":"14px","height":"14px"}} />
Prev
</button>
<button onClick={ttPg.next} style={cssTextToObject(ttPg.nextStyle)}>
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
)}
    </React.Fragment>
  );
}
