import React from 'react';
import Icon from '../components/Icon.jsx';
import { cssTextToObject } from '../utils/cssText.js';

export default function Topbar({ vm }) {
  const { onRoleChange, role, roleKey, roleOptions } = vm;
  return (
    <React.Fragment>
<header style={{"height":"64px","flexShrink":"0","background":"rgba(252,250,251,.85)","backdropFilter":"blur(12px)","borderBottom":"1px solid var(--line-300)","display":"flex","alignItems":"center","gap":"16px","padding":"0 24px","position":"sticky","top":"0","zIndex":"30"}}>

      
<div style={{"position":"relative","flex":"1","maxWidth":"380px"}}>

        
<Icon name={"search"} style={{"width":"16px","height":"16px","color":"var(--ink-400)","position":"absolute","left":"12px","top":"10px"}} />

        
<input placeholder="Search projects, tasks, keywords…" style={{"width":"100%","padding":"9px 12px 9px 36px","border":"1px solid var(--line-300)","borderRadius":"12px","fontSize":"13.5px","background":"#fff","outline":"none"}} />

      
</div>

      
<div style={{"flex":"1"}} />

      
<div style={{"display":"flex","alignItems":"center","gap":"8px","background":"#fff","border":"1px solid var(--line-300)","borderRadius":"12px","padding":"5px 8px 5px 12px"}}>

        
<Icon name={"repeat"} style={{"width":"14px","height":"14px","color":"var(--orchid-500)"}} />

        
<span style={{"fontSize":"11.5px","fontWeight":"700","color":"var(--ink-500)"}}>
Preview as
</span>

        
<select key={roleKey} sc-camel-default-value={roleKey} onChange={onRoleChange} style={{"border":"none","background":"none","fontSize":"13px","fontWeight":"700","color":"var(--beet-700)","outline":"none","cursor":"pointer"}}>

          
{(roleOptions || []).map((r, $index) => (
<React.Fragment key={$index}>
<option value={r.key}>
{r.label}
</option>
</React.Fragment>
))}

        
</select>

      
</div>

      
<button style={{"position":"relative","width":"38px","height":"38px","borderRadius":"11px","border":"1px solid var(--line-300)","background":"#fff","cursor":"pointer","display":"flex","alignItems":"center","justifyContent":"center"}}>
<Icon name={"bell"} style={{"width":"17px","height":"17px","color":"var(--ink-700)"}} />
<span style={{"position":"absolute","top":"8px","right":"9px","width":"7px","height":"7px","borderRadius":"50%","background":"var(--danger-500)"}} />
</button>

      
<span style={cssTextToObject(`width:38px;height:38px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:800;color:#fff;background:${role.color}`)}>
{role.short}
</span>

    
</header>
    </React.Fragment>
  );
}
