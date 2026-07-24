import React from 'react';
import Icon from '../../components/Icon.jsx';
import { cssTextToObject } from '../../utils/cssText.js';

export default function DocumentRepositorySection({ vm }) {
  const { flEmpty, flFilterDefs, flOnQuery, flOwnNote, flPg, flQuery, flReset, flRows, flStats, showFiles } = vm;
  return (
    <React.Fragment>
{Boolean(showFiles) && (
<React.Fragment>

          
<div style={{"display":"grid","gridTemplateColumns":"repeat(5,1fr)","gap":"12px","marginBottom":"18px"}}>

            
{(flStats || []).map((s, $index) => (
<React.Fragment key={$index}>

              
<div style={{"background":"#fff","border":"1px solid var(--line-300)","borderRadius":"14px","padding":"14px 16px","boxShadow":"var(--shadow-sm)"}}>

                
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

          
{Boolean(flOwnNote) && (
<React.Fragment>

            
<div style={{"display":"flex","alignItems":"center","gap":"10px","background":"var(--info-100)","border":"1px solid #CBE3EC","color":"var(--info-600)","padding":"11px 15px","borderRadius":"14px","fontSize":"13px","fontWeight":"600","marginBottom":"14px"}}>
<Icon name={"lock"} style={{"width":"16px","height":"16px","flexShrink":"0"}} />
<span>
Showing files from your assigned tasks only.
</span>
</div>

          
</React.Fragment>
)}

          
<div style={{"display":"flex","alignItems":"center","gap":"10px","marginBottom":"14px","flexWrap":"wrap"}}>

            
<div style={{"position":"relative","flex":"1","minWidth":"220px","maxWidth":"320px"}}>
<Icon name={"search"} style={{"width":"15px","height":"15px","color":"var(--ink-400)","position":"absolute","left":"11px","top":"9px"}} />
<input value={flQuery} onInput={flOnQuery} placeholder="Search file, task or uploader…" style={{"width":"100%","padding":"8px 12px 8px 34px","border":"1px solid var(--line-300)","borderRadius":"10px","fontSize":"13px","outline":"none","background":"#fff"}} />
</div>

            
{(flFilterDefs || []).map((f, $index) => (
<React.Fragment key={$index}>

              
<div style={{"display":"flex","alignItems":"center","gap":"7px","background":"#fff","border":"1px solid var(--line-300)","borderRadius":"11px","padding":"6px 10px"}}>
<span style={{"fontSize":"11.5px","fontWeight":"700","color":"var(--ink-500)"}}>
{f.label}
</span>
<select value={f.value} onChange={f.onChange} style={{"border":"none","background":"none","fontSize":"13px","fontWeight":"600","color":"var(--beet-700)","outline":"none","cursor":"pointer"}}>
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

            
<button onClick={flReset} style={{"display":"flex","alignItems":"center","gap":"6px","padding":"7px 12px","border":"1px solid var(--line-300)","background":"#fff","borderRadius":"11px","fontSize":"12px","fontWeight":"700","color":"var(--ink-500)","cursor":"pointer"}}>
<Icon name={"rotate-ccw"} style={{"width":"12px","height":"12px"}} />
Reset
</button>

          
</div>

          
<div style={{"background":"#fff","border":"1px solid var(--line-300)","borderRadius":"18px","boxShadow":"var(--shadow-sm)","overflow":"hidden"}}>

            
<div style={{"overflowX":"auto"}}>
<table style={{"width":"100%","borderCollapse":"collapse","minWidth":"1080px"}}>

              
<thead>
<tr style={{"background":"var(--surface-50)"}}>

                
<th style={{"textAlign":"left","padding":"11px 16px","fontSize":"11px","fontWeight":"800","letterSpacing":".06em","textTransform":"uppercase","color":"var(--ink-400)"}}>
Document
</th>

                
<th style={{"textAlign":"left","padding":"11px 16px","fontSize":"11px","fontWeight":"800","letterSpacing":".06em","textTransform":"uppercase","color":"var(--ink-400)"}}>
Type
</th>

                
<th style={{"textAlign":"left","padding":"11px 16px","fontSize":"11px","fontWeight":"800","letterSpacing":".06em","textTransform":"uppercase","color":"var(--ink-400)"}}>
Source
</th>

                
<th style={{"textAlign":"left","padding":"11px 16px","fontSize":"11px","fontWeight":"800","letterSpacing":".06em","textTransform":"uppercase","color":"var(--ink-400)"}}>
Uploaded by
</th>

                
<th style={{"textAlign":"left","padding":"11px 16px","fontSize":"11px","fontWeight":"800","letterSpacing":".06em","textTransform":"uppercase","color":"var(--ink-400)"}}>
Linked task
</th>

                
<th style={{"textAlign":"left","padding":"11px 16px","fontSize":"11px","fontWeight":"800","letterSpacing":".06em","textTransform":"uppercase","color":"var(--ink-400)"}}>
Task / QC status
</th>

                
<th style={{"textAlign":"left","padding":"11px 16px","fontSize":"11px","fontWeight":"800","letterSpacing":".06em","textTransform":"uppercase","color":"var(--ink-400)"}}>
Deadline
</th>

              
</tr>
</thead>

              
<tbody>

                
{(flRows || []).map((f, $index) => (
<React.Fragment key={$index}>

                  
<tr onClick={f.open} style={{"cursor":"pointer"}} style-hover="background:var(--surface-50)">

                    
<td style={{"padding":"12px 16px","borderBottom":"1px solid var(--line-200)"}}>

                      
<div style={{"display":"flex","alignItems":"center","gap":"9px"}}>
<span style={cssTextToObject(`width:30px;height:30px;border-radius:9px;background:${f.ftBg};display:flex;align-items:center;justify-content:center;flex-shrink:0`)}>
<Icon name={f.ftIcon} style={cssTextToObject(`width:15px;height:15px;color:${f.ftColor}`)} />
</span>
<span style={{"fontFamily":"'Space Mono'","fontSize":"12px","fontWeight":"700","color":"var(--ink-900)"}}>
{f.name}
</span>
</div>

                    
</td>

                    
<td style={{"padding":"12px 16px","borderBottom":"1px solid var(--line-200)"}}>
<span style={cssTextToObject(`font-size:11px;font-weight:700;padding:3px 9px;border-radius:999px;background:${f.ftBg};color:${f.ftColor}`)}>
{f.type}
</span>
</td>

                    
<td style={{"padding":"12px 16px","borderBottom":"1px solid var(--line-200)","fontSize":"12px","color":"var(--ink-700)"}}>
{f.source}
</td>

                    
<td style={{"padding":"12px 16px","borderBottom":"1px solid var(--line-200)","fontSize":"12.5px","color":"var(--ink-700)"}}>
{f.by}
</td>

                    
<td style={{"padding":"12px 16px","borderBottom":"1px solid var(--line-200)"}}>
<div style={{"display":"flex","alignItems":"center","gap":"7px"}}>
<span style={{"fontFamily":"'Space Mono'","fontSize":"10.5px","fontWeight":"700","color":"var(--beet-700)"}}>
{f.taskId}
</span>
<span style={{"fontSize":"12.5px","fontWeight":"600","color":"var(--ink-900)","whiteSpace":"nowrap","overflow":"hidden","textOverflow":"ellipsis","maxWidth":"220px","display":"inline-block"}}>
{f.taskName}
</span>
</div>
</td>

                    
<td style={{"padding":"12px 16px","borderBottom":"1px solid var(--line-200)"}}>
<span style={cssTextToObject(`font-size:11px;font-weight:700;padding:3px 10px;border-radius:999px;background:${f.statusBg};color:${f.statusColor}`)}>
{f.status}
</span>
</td>

                    
<td style={{"padding":"12px 16px","borderBottom":"1px solid var(--line-200)"}}>
<div style={{"fontSize":"12px","color":"var(--ink-700)"}}>
{f.dates}
</div>
<div style={cssTextToObject(`font-size:10.5px;font-weight:700;color:${f.dueColor};margin-top:2px`)}>
{f.dueLabel}
</div>
</td>

                  
</tr>

                
</React.Fragment>
))}

              
</tbody>

            
</table>
</div>

            
{Boolean(flEmpty) && (
<React.Fragment>

              
<div style={{"padding":"44px","textAlign":"center","color":"var(--ink-500)"}}>
<Icon name={"folder-open"} style={{"width":"26px","height":"26px","color":"var(--ink-400)"}} />
<div style={{"fontSize":"14px","fontWeight":"600","marginTop":"10px"}}>
No files match these filters.
</div>
</div>

            
</React.Fragment>
)}

            
{Boolean(flPg.show) && (
<React.Fragment>

              
<div style={{"display":"flex","alignItems":"center","gap":"10px","padding":"12px 20px","background":"var(--surface-50)","borderTop":"1px solid var(--line-200)"}}>
<span style={{"flex":"1","fontSize":"12px","fontWeight":"600","color":"var(--ink-500)"}}>
{flPg.label}
</span>
<button onClick={flPg.prev} style={cssTextToObject(flPg.prevStyle)}>
<Icon name={"chevron-left"} style={{"width":"14px","height":"14px"}} />
Prev
</button>
<button onClick={flPg.next} style={cssTextToObject(flPg.nextStyle)}>
Next
<Icon name={"chevron-right"} style={{"width":"14px","height":"14px"}} />
</button>
</div>

            
</React.Fragment>
)}

          
</div>

          
<div style={{"display":"flex","alignItems":"center","gap":"9px","background":"var(--surface-50)","border":"1px solid var(--line-200)","borderRadius":"12px","padding":"11px 14px","fontSize":"12.5px","color":"var(--ink-500)","marginTop":"14px"}}>
<Icon name={"info"} style={{"width":"15px","height":"15px","flexShrink":"0","color":"var(--orchid-600)"}} />
<span>
Auto-collected from task evidence, QC references and comment attachments — no separate upload needed. Click a row to open the linked task.
</span>
</div>

        
</React.Fragment>
)}
    </React.Fragment>
  );
}
