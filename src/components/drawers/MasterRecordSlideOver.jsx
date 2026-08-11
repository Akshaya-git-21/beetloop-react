import React from 'react';
import Icon from '../../components/Icon.jsx';
import { cssTextToObject } from '../../utils/cssText.js';

export default function MasterRecordSlideOver({ vm }) {
  const { mdHasRecord, mdHasTabs, mdRecClose, mdRecEdit, mdRecFields, mdRecSub, mdRecTitle, mdShowComp, mdShowFields, mdShowLinked, mdShowUrls, mdShowUsage, mdSubComp, mdSubLinked, mdSubUrls, mdSubUsage, mdTabs, stop } = vm;
  return (
    <React.Fragment>
{Boolean(mdHasRecord) && (
<React.Fragment>

  
<div onClick={mdRecClose} style={{"position":"fixed","inset":"0","background":"rgba(31,8,20,.5)","backdropFilter":"blur(3px)","zIndex":"160","display":"flex","justifyContent":"flex-end"}}>

    
<div onClick={stop} className="blscroll" style={{"width":"100%","maxWidth":"560px","height":"100%","background":"var(--paper)","boxShadow":"var(--shadow-xl)","overflowY":"auto","animation":"blrise .3s var(--ease-out)"}}>

      
<div style={{"position":"sticky","top":"0","background":"var(--paper)","borderBottom":"1px solid var(--line-200)","padding":"20px 24px","display":"flex","alignItems":"flex-start","justifyContent":"space-between","zIndex":"2"}}>

        
<div>
<div style={{"fontFamily":"'Space Mono'","fontSize":"12px","color":"var(--ink-400)"}}>
{mdRecSub}
</div>
<h3 style={{"fontFamily":"'Sora'","fontWeight":"700","fontSize":"20px","color":"var(--ink-900)","margin":"4px 0 0"}}>
{mdRecTitle}
</h3>
</div>


<div style={{"display":"flex","gap":"8px"}}>
<button onClick={mdRecEdit} style={{"padding":"0 14px","height":"34px","borderRadius":"10px","border":"1px solid var(--line-300)","background":"var(--paper)","cursor":"pointer","display":"flex","alignItems":"center","gap":"6px","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-900)"}}>
<Icon name={"pencil"} style={{"width":"14px","height":"14px"}} />
Edit
</button>
<button onClick={mdRecClose} style={{"width":"34px","height":"34px","borderRadius":"10px","border":"1px solid var(--line-300)","background":"var(--paper)","cursor":"pointer","display":"flex","alignItems":"center","justifyContent":"center"}}>
<Icon name={"x"} style={{"width":"17px","height":"17px","color":"var(--ink-700)"}} />
</button>
</div>


</div>


{Boolean(mdHasTabs) && (
<React.Fragment>

        
<div style={{"display":"flex","gap":"4px","padding":"14px 24px 0","borderBottom":"1px solid var(--line-200)"}}>

          
{(mdTabs || []).map((t, $index) => (
<React.Fragment key={$index}>

            
<button onClick={t.go} style={cssTextToObject(t.style)}>
{t.label}
</button>

          
</React.Fragment>
))}

        
</div>

      
</React.Fragment>
)}

      
<div style={{"padding":"22px 24px"}}>

        
{Boolean(mdShowFields) && (
<React.Fragment>

          
<div style={{"display":"grid","gridTemplateColumns":"1fr 1fr","gap":"14px 18px"}}>

            
{(mdRecFields || []).map((f, $index) => (
<React.Fragment key={$index}>

              
<div>
<div style={{"fontSize":"11px","fontWeight":"700","letterSpacing":".04em","textTransform":"uppercase","color":"var(--ink-400)","marginBottom":"4px"}}>
{f.label}
</div>
<div style={{"fontSize":"13.5px","color":"var(--ink-900)","wordBreak":"break-word"}}>
{f.value}
</div>
</div>

            
</React.Fragment>
))}

          
</div>

        
</React.Fragment>
)}

        
{Boolean(mdShowUrls) && (
<React.Fragment>

          
<div style={{"border":"1px solid var(--line-200)","borderRadius":"12px","overflow":"hidden"}}>
<table style={{"width":"100%","borderCollapse":"collapse"}}>
<thead>
<tr>
<th style={{"textAlign":"left","padding":"9px 12px","fontSize":"10.5px","fontWeight":"700","textTransform":"uppercase","color":"var(--ink-400)","background":"var(--surface-50)"}}>
Type
</th>
<th style={{"textAlign":"left","padding":"9px 12px","fontSize":"10.5px","fontWeight":"700","textTransform":"uppercase","color":"var(--ink-400)","background":"var(--surface-50)"}}>
URL
</th>
<th style={{"textAlign":"left","padding":"9px 12px","fontSize":"10.5px","fontWeight":"700","textTransform":"uppercase","color":"var(--ink-400)","background":"var(--surface-50)"}}>
Locale
</th>
<th style={{"textAlign":"left","padding":"9px 12px","fontSize":"10.5px","fontWeight":"700","textTransform":"uppercase","color":"var(--ink-400)","background":"var(--surface-50)"}}>
Canonical
</th>
</tr>
</thead>
<tbody>

            
{(mdSubUrls || []).map((u, $index) => (
<React.Fragment key={$index}>
<tr>
<td style={{"padding":"9px 12px","borderTop":"1px solid var(--line-200)"}}>
<span style={{"fontSize":"11px","fontWeight":"700","padding":"3px 8px","borderRadius":"999px","background":"var(--surface-50)","border":"1px solid var(--line-300)","color":"var(--ink-500)"}}>
{u.URL_Type}
</span>
</td>
<td style={{"padding":"9px 12px","borderTop":"1px solid var(--line-200)","fontSize":"12px","color":"var(--ink-700)"}}>
{u.URL}
</td>
<td style={{"padding":"9px 12px","borderTop":"1px solid var(--line-200)","fontSize":"12px","color":"var(--ink-500)"}}>
{u.Locale}
</td>
<td style={{"padding":"9px 12px","borderTop":"1px solid var(--line-200)","fontSize":"12px","color":"var(--ink-500)"}}>
{u.Is_Canonical}
</td>
</tr>
</React.Fragment>
))}

          
</tbody>
</table>
</div>

        
</React.Fragment>
)}

        
{Boolean(mdShowLinked) && (
<React.Fragment>

          
<div style={{"border":"1px solid var(--line-200)","borderRadius":"12px","overflow":"hidden"}}>
<table style={{"width":"100%","borderCollapse":"collapse"}}>
<thead>
<tr>
<th style={{"textAlign":"left","padding":"9px 12px","fontSize":"10.5px","fontWeight":"700","textTransform":"uppercase","color":"var(--ink-400)","background":"var(--surface-50)"}}>
Keyword
</th>
<th style={{"textAlign":"left","padding":"9px 12px","fontSize":"10.5px","fontWeight":"700","textTransform":"uppercase","color":"var(--ink-400)","background":"var(--surface-50)"}}>
Intent
</th>
<th style={{"textAlign":"left","padding":"9px 12px","fontSize":"10.5px","fontWeight":"700","textTransform":"uppercase","color":"var(--ink-400)","background":"var(--surface-50)"}}>
Volume
</th>
<th style={{"textAlign":"left","padding":"9px 12px","fontSize":"10.5px","fontWeight":"700","textTransform":"uppercase","color":"var(--ink-400)","background":"var(--surface-50)"}}>
KD
</th>
<th style={{"textAlign":"left","padding":"9px 12px","fontSize":"10.5px","fontWeight":"700","textTransform":"uppercase","color":"var(--ink-400)","background":"var(--surface-50)"}}>
Priority
</th>
</tr>
</thead>
<tbody>

            
{(mdSubLinked || []).map((k, $index) => (
<React.Fragment key={$index}>
<tr>
<td style={{"padding":"9px 12px","borderTop":"1px solid var(--line-200)","fontSize":"12px","color":"var(--ink-900)","fontWeight":"600"}}>
{k.Keyword}
</td>
<td style={{"padding":"9px 12px","borderTop":"1px solid var(--line-200)","fontSize":"12px","color":"var(--ink-500)"}}>
{k.Intent}
</td>
<td style={{"padding":"9px 12px","borderTop":"1px solid var(--line-200)","fontSize":"12px","color":"var(--ink-700)"}}>
{k.Search_Volume}
</td>
<td style={{"padding":"9px 12px","borderTop":"1px solid var(--line-200)","fontSize":"12px","color":"var(--ink-700)"}}>
{k.Keyword_Difficulty}
</td>
<td style={{"padding":"9px 12px","borderTop":"1px solid var(--line-200)","fontSize":"12px","color":"var(--ink-700)"}}>
{k.Priority}
</td>
</tr>
</React.Fragment>
))}

          
</tbody>
</table>
</div>

        
</React.Fragment>
)}

        
{Boolean(mdShowUsage) && (
<React.Fragment>

          
<div style={{"border":"1px solid var(--line-200)","borderRadius":"12px","overflow":"hidden"}}>
<table style={{"width":"100%","borderCollapse":"collapse"}}>
<thead>
<tr>
<th style={{"textAlign":"left","padding":"9px 12px","fontSize":"10.5px","fontWeight":"700","textTransform":"uppercase","color":"var(--ink-400)","background":"var(--surface-50)"}}>
Type
</th>
<th style={{"textAlign":"left","padding":"9px 12px","fontSize":"10.5px","fontWeight":"700","textTransform":"uppercase","color":"var(--ink-400)","background":"var(--surface-50)"}}>
Linked to
</th>
<th style={{"textAlign":"left","padding":"9px 12px","fontSize":"10.5px","fontWeight":"700","textTransform":"uppercase","color":"var(--ink-400)","background":"var(--surface-50)"}}>
By
</th>
<th style={{"textAlign":"left","padding":"9px 12px","fontSize":"10.5px","fontWeight":"700","textTransform":"uppercase","color":"var(--ink-400)","background":"var(--surface-50)"}}>
Date
</th>
<th style={{"textAlign":"left","padding":"9px 12px","fontSize":"10.5px","fontWeight":"700","textTransform":"uppercase","color":"var(--ink-400)","background":"var(--surface-50)"}}>
Count
</th>
</tr>
</thead>
<tbody>

            
{(mdSubUsage || []).map((u, $index) => (
<React.Fragment key={$index}>
<tr>
<td style={{"padding":"9px 12px","borderTop":"1px solid var(--line-200)"}}>
<span style={{"fontSize":"11px","fontWeight":"700","padding":"3px 8px","borderRadius":"999px","background":"var(--surface-50)","border":"1px solid var(--line-300)","color":"var(--ink-500)"}}>
{u.Usage_Type}
</span>
</td>
<td style={{"padding":"9px 12px","borderTop":"1px solid var(--line-200)","fontSize":"12px","color":"var(--ink-700)"}}>
{u.Linked_Name}
</td>
<td style={{"padding":"9px 12px","borderTop":"1px solid var(--line-200)","fontSize":"12px","color":"var(--ink-500)"}}>
{u.Used_By_User_Name}
</td>
<td style={{"padding":"9px 12px","borderTop":"1px solid var(--line-200)","fontSize":"12px","color":"var(--ink-500)"}}>
{u.Usage_Date}
</td>
<td style={{"padding":"9px 12px","borderTop":"1px solid var(--line-200)","fontSize":"12px","color":"var(--ink-700)"}}>
{u.Count}x
</td>
</tr>
</React.Fragment>
))}

          
</tbody>
</table>
</div>

        
</React.Fragment>
)}

        
{Boolean(mdShowComp) && (
<React.Fragment>

          
<div style={{"border":"1px solid var(--line-200)","borderRadius":"12px","overflow":"hidden"}}>
<table style={{"width":"100%","borderCollapse":"collapse"}}>
<thead>
<tr>
<th style={{"textAlign":"left","padding":"9px 12px","fontSize":"10.5px","fontWeight":"700","textTransform":"uppercase","color":"var(--ink-400)","background":"var(--surface-50)"}}>
Competitor
</th>
<th style={{"textAlign":"left","padding":"9px 12px","fontSize":"10.5px","fontWeight":"700","textTransform":"uppercase","color":"var(--ink-400)","background":"var(--surface-50)"}}>
URL
</th>
<th style={{"textAlign":"left","padding":"9px 12px","fontSize":"10.5px","fontWeight":"700","textTransform":"uppercase","color":"var(--ink-400)","background":"var(--surface-50)"}}>
Rank
</th>
<th style={{"textAlign":"left","padding":"9px 12px","fontSize":"10.5px","fontWeight":"700","textTransform":"uppercase","color":"var(--ink-400)","background":"var(--surface-50)"}}>
Volume
</th>
</tr>
</thead>
<tbody>

            
{(mdSubComp || []).map((c, $index) => (
<React.Fragment key={$index}>
<tr>
<td style={{"padding":"9px 12px","borderTop":"1px solid var(--line-200)","fontSize":"12px","color":"var(--ink-900)","fontWeight":"600"}}>
{c.Competitor_Name}
</td>
<td style={{"padding":"9px 12px","borderTop":"1px solid var(--line-200)","fontSize":"12px","color":"var(--info-600)"}}>
{c.Competitor_URL}
</td>
<td style={{"padding":"9px 12px","borderTop":"1px solid var(--line-200)","fontSize":"12px","color":"var(--ink-700)"}}>
#{c.Rank_Position}
</td>
<td style={{"padding":"9px 12px","borderTop":"1px solid var(--line-200)","fontSize":"12px","color":"var(--ink-700)"}}>
{c.Search_Volume}
</td>
</tr>
</React.Fragment>
))}

          
</tbody>
</table>
</div>

        
</React.Fragment>
)}

      
</div>

    
</div>

  
</div>


</React.Fragment>
)}
    </React.Fragment>
  );
}
