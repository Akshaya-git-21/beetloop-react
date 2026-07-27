import React from 'react';
import Icon from '../components/Icon.jsx';
import { cssTextToObject } from '../utils/cssText.js';

export default function Topbar({ vm }) {
  const { role, notifications, unreadCount, showNotifications, toggleNotifications, openProfile } = vm;
  return (
    <React.Fragment>
<header style={{"height":"64px","flexShrink":"0","background":"rgba(252,250,251,.85)","backdropFilter":"blur(12px)","borderBottom":"1px solid var(--line-300)","display":"flex","alignItems":"center","gap":"16px","padding":"0 24px","position":"sticky","top":"0","zIndex":"30"}}>

      
<div style={{"position":"relative","flex":"1","maxWidth":"380px"}}>

        
<Icon name={"search"} style={{"width":"16px","height":"16px","color":"var(--ink-400)","position":"absolute","left":"12px","top":"10px"}} />

        
<input placeholder="Search projects, tasks, keywords…" style={{"width":"100%","padding":"9px 12px 9px 36px","border":"1px solid var(--line-300)","borderRadius":"12px","fontSize":"13.5px","background":"#fff","outline":"none"}} />

      
</div>

      
<div style={{"flex":"1"}} />

<div style={{"position":"relative"}}>
<button onClick={toggleNotifications} style={{"position":"relative","width":"38px","height":"38px","borderRadius":"11px","border":"1px solid var(--line-300)","background":"#fff","cursor":"pointer","display":"flex","alignItems":"center","justifyContent":"center"}}>
<Icon name={"bell"} style={{"width":"17px","height":"17px","color":"var(--ink-700)"}} />
{unreadCount>0 && (
<span style={{"position":"absolute","top":"8px","right":"9px","width":"7px","height":"7px","borderRadius":"50%","background":"var(--danger-500)"}} />
)}
</button>
{showNotifications && (
<div style={{"position":"absolute","top":"46px","right":"0","width":"320px","maxHeight":"380px","overflowY":"auto","background":"#fff","border":"1px solid var(--line-300)","borderRadius":"14px","boxShadow":"var(--shadow-lg)","zIndex":"50"}}>
<div style={{"padding":"14px 16px","borderBottom":"1px solid var(--line-300)","fontWeight":"700","fontSize":"13.5px"}}>Notifications</div>
{(notifications||[]).length===0 ? (
<div style={{"padding":"24px 16px","fontSize":"12.5px","color":"var(--ink-400)","textAlign":"center"}}>No activity yet.</div>
) : (notifications||[]).map(n=>(
<div key={n.id} style={{"padding":"11px 16px","borderBottom":"1px solid var(--line-100)","fontSize":"12.5px","color":"var(--ink-700)"}}>
<div>{n.text}</div>
<div style={{"fontSize":"11px","color":"var(--ink-400)","marginTop":"2px"}}>{n.time}</div>
</div>
))}
</div>
)}
</div>


<button onClick={openProfile} title="My Profile" style={cssTextToObject(`width:38px;height:38px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:800;color:#fff;background:${role.color};border:none;cursor:pointer`)}>
{role.short}
</button>

    
</header>
    </React.Fragment>
  );
}
