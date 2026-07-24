import React from 'react';
import Icon from '../../components/Icon.jsx';
import { cssTextToObject } from '../../utils/cssText.js';

export default function TableSection({ vm }) {
  const { readOnly, readOnlyMsg, showTable, tableCols, tableRows, tblOnQuery, tblPg, tblQuery } = vm;
  return (
    <React.Fragment>
{Boolean(showTable) && (
<React.Fragment>

          
{Boolean(readOnly) && (
<React.Fragment>

            
<div style={{"display":"flex","gap":"10px","alignItems":"center","background":"var(--info-100)","border":"1px solid #CBE3EC","color":"var(--info-600)","padding":"11px 15px","borderRadius":"14px","fontSize":"13px","fontWeight":"600","marginBottom":"16px"}}>
<Icon name={"eye"} style={{"width":"16px","height":"16px","flexShrink":"0"}} />
<span>
{readOnlyMsg}
</span>
</div>

          
</React.Fragment>
)}

          
<div style={{"background":"#fff","border":"1px solid var(--line-300)","borderRadius":"20px","boxShadow":"var(--shadow-sm)","overflow":"hidden"}}>

            
<div style={{"display":"flex","alignItems":"center","gap":"10px","padding":"14px 18px","borderBottom":"1px solid var(--line-200)"}}>

              
<div style={{"position":"relative","flex":"1","maxWidth":"280px"}}>
<Icon name={"search"} style={{"width":"15px","height":"15px","color":"var(--ink-400)","position":"absolute","left":"11px","top":"9px"}} />
<input value={tblQuery} onInput={tblOnQuery} placeholder="Filter…" style={{"width":"100%","padding":"8px 12px 8px 34px","border":"1px solid var(--line-300)","borderRadius":"10px","fontSize":"13px","outline":"none"}} />
</div>

              
<button style={{"display":"flex","alignItems":"center","gap":"6px","padding":"8px 12px","border":"1px solid var(--line-300)","background":"#fff","borderRadius":"10px","fontSize":"12.5px","fontWeight":"600","color":"var(--ink-700)","cursor":"pointer"}}>
<Icon name={"sliders-horizontal"} style={{"width":"14px","height":"14px"}} />
Filters
</button>

            
</div>

            
<div style={{"overflowX":"auto"}}>

              
<table style={{"width":"100%","borderCollapse":"collapse","minWidth":"640px"}}>

                
<thead>
<tr>

                  
{(tableCols || []).map((c, $index) => (
<React.Fragment key={$index}>
<th style={{"textAlign":"left","padding":"12px 18px","fontSize":"11px","fontWeight":"700","letterSpacing":".06em","textTransform":"uppercase","color":"var(--ink-500)","background":"var(--surface-50)","borderBottom":"1px solid var(--line-200)"}}>
{c}
</th>
</React.Fragment>
))}

                
</tr>
</thead>

                
<tbody>

                  
{(tableRows || []).map((row, $index) => (
<React.Fragment key={$index}>

                    
<tr>

                      
<td style={{"padding":"14px 18px","borderBottom":"1px solid var(--line-200)"}}>

                        
<div style={{"fontSize":"14px","fontWeight":"700","color":"var(--ink-900)"}}>
{row.c0}
</div>

                        
{Boolean(row.c0sub) && (
<React.Fragment>
<div style={{"fontSize":"12px","color":"var(--ink-500)","marginTop":"2px"}}>
{row.c0sub}
</div>
</React.Fragment>
)}

                      
</td>

                      
<td style={{"padding":"14px 18px","borderBottom":"1px solid var(--line-200)","fontSize":"13.5px","color":"var(--ink-700)"}}>
{row.c1}
</td>

                      
<td style={{"padding":"14px 18px","borderBottom":"1px solid var(--line-200)"}}>
<span style={cssTextToObject(`font-size:11.5px;font-weight:700;padding:4px 10px;border-radius:999px;background:${row.tagBg};color:${row.tagColor}`)}>
{row.tag}
</span>
</td>

                      
<td style={{"padding":"14px 18px","borderBottom":"1px solid var(--line-200)","fontSize":"13.5px","color":"var(--ink-700)"}}>
{row.c3}
</td>

                      
<td style={{"padding":"14px 18px","borderBottom":"1px solid var(--line-200)","textAlign":"right"}}>

                        
<button onClick={row.action} style={cssTextToObject(row.actionStyle)}>
{row.actionLabel}
</button>

                      
</td>

                    
</tr>

                  
</React.Fragment>
))}

                
</tbody>

              
</table>

            
</div>

            
{Boolean(tblPg.show) && (
<React.Fragment>

              
<div style={{"display":"flex","alignItems":"center","gap":"10px","padding":"12px 20px","background":"var(--surface-50)","borderTop":"1px solid var(--line-200)"}}>
<span style={{"flex":"1","fontSize":"12px","fontWeight":"600","color":"var(--ink-500)"}}>
{tblPg.label}
</span>
<button onClick={tblPg.prev} style={cssTextToObject(tblPg.prevStyle)}>
<Icon name={"chevron-left"} style={{"width":"14px","height":"14px"}} />
Prev
</button>
<button onClick={tblPg.next} style={cssTextToObject(tblPg.nextStyle)}>
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
