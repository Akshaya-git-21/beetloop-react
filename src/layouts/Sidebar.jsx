import React from 'react';
import Icon from '../components/Icon.jsx';
import { cssTextToObject } from '../utils/cssText.js';

export default function Sidebar({ vm }) {
  const { adminNav, hasAdmin, logout, nav, openProfile, role, platformName, platformSub, platformLogoUrl, sidebarCollapsed, toggleSidebar } = vm;
  return (
    <React.Fragment>
<aside style={{"width":sidebarCollapsed?"72px":"256px","flexShrink":"0","background":"var(--sidebar-bg, linear-gradient(180deg,#1F0814 0%,#3d1024 60%,#4E1631 100%))","color":"#fff","display":"flex","flexDirection":"column","position":"sticky","top":"0","height":"100vh","transition":"width .18s ease"}}>


<div style={{"padding":sidebarCollapsed?"20px 12px 16px":"20px 20px 16px","display":"flex","alignItems":"center","gap":"11px","borderBottom":"1px solid rgba(255,255,255,.08)"}}>


<div style={{"width":"36px","height":"36px","borderRadius":"11px","background":"rgba(255,255,255,.1)","border":"1px solid rgba(255,255,255,.16)","display":"flex","alignItems":"center","justifyContent":"center","overflow":"hidden","flexShrink":"0"}}>
{platformLogoUrl ? (
<img src={platformLogoUrl} alt={platformName} style={{"width":"100%","height":"100%","objectFit":"cover"}} />
) : (
<Icon name={"infinity"} style={{"width":"20px","height":"20px"}} />
)}
</div>

{!sidebarCollapsed && (
<div style={{"minWidth":"0","flex":"1"}}>
<div style={{"fontFamily":"'Sora'","fontWeight":"800","letterSpacing":".13em","fontSize":"14px","whiteSpace":"nowrap","overflow":"hidden","textOverflow":"ellipsis"}}>
{platformName}
</div>
<div style={{"fontSize":"10.5px","color":"rgba(255,255,255,.5)","letterSpacing":".04em"}}>
{platformSub}
</div>
</div>
)}

<button onClick={toggleSidebar} title={sidebarCollapsed?"Expand sidebar":"Full width — collapse sidebar"} style={{"width":"26px","height":"26px","borderRadius":"8px","flexShrink":"0","background":"rgba(255,255,255,.08)","border":"1px solid rgba(255,255,255,.14)","color":"rgba(255,255,255,.75)","display":"flex","alignItems":"center","justifyContent":"center","cursor":"pointer"}}>
<Icon name={sidebarCollapsed?"panel-left-open":"panel-left-close"} style={{"width":"14px","height":"14px"}} />
</button>


</div>

    
<nav className="blscroll" style={{"flex":"1","overflowY":"auto","padding":"14px 12px"}}>


{!sidebarCollapsed && (
<div style={{"fontSize":"10px","fontWeight":"700","letterSpacing":".13em","textTransform":"uppercase","color":"rgba(255,255,255,.38)","padding":"6px 12px 8px"}}>
Workspace
</div>
)}


{(nav || []).map((n, $index) => (
<React.Fragment key={$index}>


<button onClick={n.go} title={sidebarCollapsed?n.label:undefined} style={{...cssTextToObject(n.style), ...(sidebarCollapsed?{justifyContent:'center',padding:'10px 0',gap:'0'}:{})}}>
<Icon name={n.icon} style={{"width":"18px","height":"18px","flexShrink":"0"}} />
{!sidebarCollapsed && (
<React.Fragment>
<span style={{"flex":"1","textAlign":"left"}}>
{n.label}
</span>
{Boolean(n.locked) && (
<Icon name={"eye"} style={{"width":"13px","height":"13px","opacity":".55"}} />
)}
</React.Fragment>
)}
</button>


</React.Fragment>
))}

      
{Boolean(hasAdmin) && (
<React.Fragment>


{!sidebarCollapsed && (
<div style={{"fontSize":"10px","fontWeight":"700","letterSpacing":".13em","textTransform":"uppercase","color":"rgba(255,255,255,.38)","padding":"16px 12px 8px"}}>
Administration
</div>
)}


{(adminNav || []).map((n, $index) => (
<React.Fragment key={$index}>


<button onClick={n.go} title={sidebarCollapsed?n.label:undefined} style={{...cssTextToObject(n.style), ...(sidebarCollapsed?{justifyContent:'center',padding:'10px 0',gap:'0'}:{})}}>
<Icon name={n.icon} style={{"width":"18px","height":"18px","flexShrink":"0"}} />
{!sidebarCollapsed && (
<React.Fragment>
<span style={{"flex":"1","textAlign":"left"}}>
{n.label}
</span>
{Boolean(n.locked) && (
<Icon name={"eye"} style={{"width":"13px","height":"13px","opacity":".55"}} />
)}
</React.Fragment>
)}
</button>


</React.Fragment>
))}

      
</React.Fragment>
)}

    
</nav>

    
<div style={{"padding":"12px","borderTop":"1px solid rgba(255,255,255,.08)"}}>


<div style={{"display":"flex","alignItems":"center","gap":"10px","padding":sidebarCollapsed?"8px":"8px 10px","borderRadius":"12px","background":"rgba(255,255,255,.05)","justifyContent":sidebarCollapsed?"center":"flex-start","flexWrap":sidebarCollapsed?"wrap":"nowrap"}}>


{role.avatarUrl ? (
<button onClick={openProfile} title="My Profile" style={{"width":"32px","height":"32px","borderRadius":"50%","flexShrink":"0","border":"none","cursor":"pointer","padding":"0","overflow":"hidden"}}>
<img src={role.avatarUrl} alt={role.person} style={{"width":"100%","height":"100%","objectFit":"cover","display":"block"}} />
</button>
) : (
<button onClick={openProfile} title="My Profile" style={cssTextToObject(`width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:800;color:#fff;flex-shrink:0;background:${role.color};border:none;cursor:pointer`)}>
{role.short}
</button>
)}


{!sidebarCollapsed && (
<button onClick={openProfile} style={{"flex":"1","minWidth":"0","background":"none","border":"none","cursor":"pointer","textAlign":"left","padding":"0"}}>
<div style={{"fontSize":"13px","fontWeight":"700","whiteSpace":"nowrap","overflow":"hidden","textOverflow":"ellipsis","color":"#fff"}}>
{role.person}
</div>
<div style={{"fontSize":"11px","color":"rgba(255,255,255,.55)"}}>
{role.tag}
</div>
</button>
)}


<button onClick={logout} title="Sign out" style={{"background":"none","border":"none","color":"rgba(255,255,255,.6)","cursor":"pointer","padding":"4px"}}>
<Icon name={"log-out"} style={{"width":"16px","height":"16px"}} />
</button>


</div>


</div>

  
</aside>
    </React.Fragment>
  );
}
