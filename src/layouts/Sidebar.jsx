import React from 'react';
import Icon from '../components/Icon.jsx';
import { cssTextToObject } from '../utils/cssText.js';

export default function Sidebar({ vm }) {
  const { adminNav, hasAdmin, logout, nav, role } = vm;
  return (
    <React.Fragment>
<aside style={{"width":"256px","flexShrink":"0","background":"linear-gradient(180deg,#1F0814 0%,#3d1024 60%,#4E1631 100%)","color":"#fff","display":"flex","flexDirection":"column","position":"sticky","top":"0","height":"100vh"}}>

    
<div style={{"padding":"20px 20px 16px","display":"flex","alignItems":"center","gap":"11px","borderBottom":"1px solid rgba(255,255,255,.08)"}}>

      
<div style={{"width":"36px","height":"36px","borderRadius":"11px","background":"rgba(255,255,255,.1)","border":"1px solid rgba(255,255,255,.16)","display":"flex","alignItems":"center","justifyContent":"center"}}>
<Icon name={"infinity"} style={{"width":"20px","height":"20px"}} />
</div>

      
<div>
<div style={{"fontFamily":"'Sora'","fontWeight":"800","letterSpacing":".13em","fontSize":"14px"}}>
BEETLOOP
</div>
<div style={{"fontSize":"10.5px","color":"rgba(255,255,255,.5)","letterSpacing":".04em"}}>
Marketing Platform
</div>
</div>

    
</div>

    
<nav className="blscroll" style={{"flex":"1","overflowY":"auto","padding":"14px 12px"}}>

      
<div style={{"fontSize":"10px","fontWeight":"700","letterSpacing":".13em","textTransform":"uppercase","color":"rgba(255,255,255,.38)","padding":"6px 12px 8px"}}>
Workspace
</div>

      
{(nav || []).map((n, $index) => (
<React.Fragment key={$index}>

        
<button onClick={n.go} style={cssTextToObject(n.style)}>
<Icon name={n.icon} style={{"width":"18px","height":"18px","flexShrink":"0"}} />
<span style={{"flex":"1","textAlign":"left"}}>
{n.label}
</span>
{Boolean(n.locked) && (
<React.Fragment>
<Icon name={"eye"} style={{"width":"13px","height":"13px","opacity":".55"}} />
</React.Fragment>
)}
</button>

      
</React.Fragment>
))}

      
{Boolean(hasAdmin) && (
<React.Fragment>

        
<div style={{"fontSize":"10px","fontWeight":"700","letterSpacing":".13em","textTransform":"uppercase","color":"rgba(255,255,255,.38)","padding":"16px 12px 8px"}}>
Administration
</div>

        
{(adminNav || []).map((n, $index) => (
<React.Fragment key={$index}>

          
<button onClick={n.go} style={cssTextToObject(n.style)}>
<Icon name={n.icon} style={{"width":"18px","height":"18px","flexShrink":"0"}} />
<span style={{"flex":"1","textAlign":"left"}}>
{n.label}
</span>
{Boolean(n.locked) && (
<React.Fragment>
<Icon name={"eye"} style={{"width":"13px","height":"13px","opacity":".55"}} />
</React.Fragment>
)}
</button>

        
</React.Fragment>
))}

      
</React.Fragment>
)}

    
</nav>

    
<div style={{"padding":"12px","borderTop":"1px solid rgba(255,255,255,.08)"}}>

      
<div style={{"display":"flex","alignItems":"center","gap":"10px","padding":"8px 10px","borderRadius":"12px","background":"rgba(255,255,255,.05)"}}>

        
<span style={cssTextToObject(`width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:800;color:#fff;flex-shrink:0;background:${role.color}`)}>
{role.short}
</span>

        
<div style={{"flex":"1","minWidth":"0"}}>
<div style={{"fontSize":"13px","fontWeight":"700","whiteSpace":"nowrap","overflow":"hidden","textOverflow":"ellipsis"}}>
{role.person}
</div>
<div style={{"fontSize":"11px","color":"rgba(255,255,255,.55)"}}>
{role.tag}
</div>
</div>

        
<button onClick={logout} title="Sign out" style={{"background":"none","border":"none","color":"rgba(255,255,255,.6)","cursor":"pointer","padding":"4px"}}>
<Icon name={"log-out"} style={{"width":"16px","height":"16px"}} />
</button>

      
</div>

    
</div>

  
</aside>
    </React.Fragment>
  );
}
