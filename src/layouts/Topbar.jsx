import React from 'react';
import Icon from '../components/Icon.jsx';
import { cssTextToObject } from '../utils/cssText.js';

export default function Topbar({ vm }) {
  const { role, notifications, unreadCount, showNotifications, toggleNotifications, markAllNotificationsRead, openProfile } = vm;
  return (
    <React.Fragment>
<header style={{"height":"64px","flexShrink":"0","background":"var(--navbar-bg, rgba(252,250,251,.85))","backdropFilter":"blur(12px)","borderBottom":"1px solid var(--line-300)","display":"flex","alignItems":"center","gap":"16px","padding":"0 24px","position":"sticky","top":"0","zIndex":"30"}}>

      
<div style={{"position":"relative","flex":"1","maxWidth":"380px"}}>

        
<Icon name={"search"} style={{"width":"16px","height":"16px","color":"var(--ink-400)","position":"absolute","left":"12px","top":"10px"}} />

        
<input placeholder="Search projects, tasks, keywords…" style={{"width":"100%","padding":"9px 12px 9px 36px","border":"1px solid var(--line-300)","borderRadius":"12px","fontSize":"13.5px","background":"var(--paper)","outline":"none"}} />

      
</div>

      
<div style={{"flex":"1"}} />

<div style={{"position":"relative"}}>
<button onClick={toggleNotifications} style={{"position":"relative","width":"38px","height":"38px","borderRadius":"11px","border":"1px solid var(--line-300)","background":"var(--paper)","cursor":"pointer","display":"flex","alignItems":"center","justifyContent":"center"}}>
<Icon name={"bell"} style={{"width":"17px","height":"17px","color":"var(--ink-700)"}} />
{unreadCount>0 && (
<span style={{"position":"absolute","top":"8px","right":"9px","width":"7px","height":"7px","borderRadius":"50%","background":"var(--danger-500)"}} />
)}
</button>
{showNotifications && (
<div style={{"position":"absolute","top":"46px","right":"0","width":"360px","maxHeight":"420px","overflowY":"auto","background":"var(--paper)","border":"1px solid var(--line-300)","borderRadius":"14px","boxShadow":"var(--shadow-lg)","zIndex":"50"}}>
<div style={{"position":"sticky","top":"0","background":"var(--paper)","padding":"14px 16px","borderBottom":"1px solid var(--line-300)","display":"flex","alignItems":"center","justifyContent":"space-between"}}>
<span style={{"fontWeight":"700","fontSize":"13.5px","color":"var(--ink-900)"}}>Notifications</span>
{unreadCount>0 && (
<button onClick={markAllNotificationsRead} style={{"border":"none","background":"none","cursor":"pointer","fontSize":"12px","fontWeight":"700","color":"var(--ink-900)"}}>Mark all as read</button>
)}
</div>
{(notifications||[]).length===0 ? (
<div style={{"padding":"24px 16px","fontSize":"12.5px","color":"var(--ink-400)","textAlign":"center"}}>No activity yet.</div>
) : (notifications||[]).map(n=>(
<button key={n.id} onClick={n.go} style={{"display":"flex","alignItems":"flex-start","gap":"10px","width":"100%","textAlign":"left","padding":"11px 16px","borderBottom":"1px solid var(--line-100)","fontSize":"12.5px","color":"var(--ink-700)","background":n.read?"none":"var(--orchid-50, #FBF3F8)","border":"none","borderBottomWidth":"1px","borderBottomStyle":"solid","borderBottomColor":"var(--line-100)","cursor":"pointer"}}>
{n.avatarInitials ? (
<span style={cssTextToObject(`width:30px;height:30px;border-radius:50%;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:800;color:#fff;background:${n.avatarColor}`)}>{n.avatarInitials}</span>
) : (
<span style={{"width":"30px","height":"30px","borderRadius":"50%","flexShrink":"0","display":"flex","alignItems":"center","justifyContent":"center","background":"var(--surface-100, #F3EEF1)"}}>
<Icon name={"bell"} style={{"width":"13px","height":"13px","color":"var(--ink-500)"}} />
</span>
)}
<span style={{"flex":"1","minWidth":"0"}}>
<div style={{"lineHeight":"1.4"}}>{n.text}</div>
<div style={{"fontSize":"11px","color":"var(--ink-400)","marginTop":"3px"}}>{n.timeAgo}</div>
</span>
<span style={cssTextToObject(`width:9px;height:9px;border-radius:50%;flex-shrink:0;margin-top:4px;border:1.5px solid ${n.read?'var(--line-300)':'var(--beet-700)'};background:${n.read?'transparent':'var(--beet-700)'}`)} />
</button>
))}
</div>
)}
</div>


{role.avatarUrl ? (
<button onClick={openProfile} title="My Profile" style={{"width":"38px","height":"38px","borderRadius":"50%","border":"none","cursor":"pointer","padding":"0","overflow":"hidden","flexShrink":"0"}}>
<img src={role.avatarUrl} alt={role.person} style={{"width":"100%","height":"100%","objectFit":"cover","display":"block"}} />
</button>
) : (
<button onClick={openProfile} title="My Profile" style={cssTextToObject(`width:38px;height:38px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:800;color:#fff;background:${role.color};border:none;cursor:pointer`)}>
{role.short}
</button>
)}

    
</header>
    </React.Fragment>
  );
}
