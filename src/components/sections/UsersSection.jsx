import React from 'react';
import Icon from '../../components/Icon.jsx';
import { cssTextToObject } from '../../utils/cssText.js';

export default function UsersSection({ vm }) {
  const { showUsersTable, umIsList, umStats, umRows } = vm;
  return (
    <React.Fragment>
{Boolean(showUsersTable && umIsList) && (
<React.Fragment>

<div style={{"display":"grid","gridTemplateColumns":"repeat(auto-fit,minmax(150px,1fr))","gap":"12px","marginBottom":"16px"}}>
{(umStats || []).map((s, $index) => (
<div key={$index} style={{"background":"#fff","border":"1px solid var(--line-300)","borderRadius":"14px","padding":"14px 16px","boxShadow":"var(--shadow-sm)"}}>
<div style={{"fontSize":"11px","fontWeight":"700","letterSpacing":".05em","textTransform":"uppercase","color":"var(--ink-400)"}}>{s.label}</div>
<div style={cssTextToObject(`font-family:'Sora';font-weight:800;font-size:22px;color:${s.color};margin-top:4px`)}>{s.value}</div>
<div style={{"fontSize":"10.5px","color":"var(--ink-400)","marginTop":"2px"}}>{s.sub}</div>
</div>
))}
</div>

<div style={{"background":"#fff","border":"1px solid var(--line-300)","borderRadius":"20px","boxShadow":"var(--shadow-sm)","overflow":"hidden"}}>
<div className="blscroll" style={{"overflowX":"auto"}}>
<table style={{"width":"100%","borderCollapse":"collapse","minWidth":"1240px"}}>
<thead>
<tr style={{"background":"var(--surface-50)"}}>
<th style={{"textAlign":"left","padding":"11px 18px","fontSize":"10.5px","fontWeight":"800","letterSpacing":".06em","textTransform":"uppercase","color":"var(--ink-400)"}}>Emp ID</th>
<th style={{"textAlign":"left","padding":"11px 14px","fontSize":"10.5px","fontWeight":"800","letterSpacing":".06em","textTransform":"uppercase","color":"var(--ink-400)"}}>Name</th>
<th style={{"textAlign":"left","padding":"11px 14px","fontSize":"10.5px","fontWeight":"800","letterSpacing":".06em","textTransform":"uppercase","color":"var(--ink-400)"}}>Dept</th>
<th style={{"textAlign":"left","padding":"11px 14px","fontSize":"10.5px","fontWeight":"800","letterSpacing":".06em","textTransform":"uppercase","color":"var(--ink-400)"}}>Role</th>
<th style={{"textAlign":"left","padding":"11px 14px","fontSize":"10.5px","fontWeight":"800","letterSpacing":".06em","textTransform":"uppercase","color":"var(--ink-400)"}}>Shift</th>
<th style={{"textAlign":"left","padding":"11px 14px","fontSize":"10.5px","fontWeight":"800","letterSpacing":".06em","textTransform":"uppercase","color":"var(--ink-400)"}}>Capacity</th>
<th style={{"textAlign":"left","padding":"11px 14px","fontSize":"10.5px","fontWeight":"800","letterSpacing":".06em","textTransform":"uppercase","color":"var(--ink-400)"}}>Workload</th>
<th style={{"textAlign":"left","padding":"11px 14px","fontSize":"10.5px","fontWeight":"800","letterSpacing":".06em","textTransform":"uppercase","color":"var(--ink-400)"}}>Status</th>
<th style={{"textAlign":"left","padding":"11px 18px","fontSize":"10.5px","fontWeight":"800","letterSpacing":".06em","textTransform":"uppercase","color":"var(--ink-400)"}}>Actions</th>
</tr>
</thead>
<tbody>
{(umRows || []).map((u, $index) => (
<tr key={$index} style={{"borderBottom":"1px solid var(--line-200)"}}>
<td style={{"padding":"12px 18px","borderBottom":"1px solid var(--line-200)","fontFamily":"'Space Mono'","fontSize":"11px","fontWeight":"700","color":"var(--beet-700)"}}>{u.emp}</td>
<td onClick={u.open} style={{"padding":"12px 14px","borderBottom":"1px solid var(--line-200)","cursor":"pointer"}}>
<div style={{"display":"flex","alignItems":"center","gap":"9px"}}>
<span style={{"width":"28px","height":"28px","borderRadius":"99px","background":"var(--beet-700)","color":"#fff","display":"flex","alignItems":"center","justifyContent":"center","fontSize":"10.5px","fontWeight":"800","flexShrink":"0"}}>{u.initials}</span>
<span style={{"minWidth":"0"}}>
<span style={{"display":"block","fontSize":"13px","fontWeight":"700","color":"var(--ink-900)"}}>{u.name}</span>
<span style={{"display":"block","fontSize":"10.5px","color":"var(--ink-400)"}}>{u.sub}</span>
</span>
</div>
</td>
<td style={{"padding":"12px 14px","borderBottom":"1px solid var(--line-200)","fontSize":"12px","color":"var(--ink-700)"}}>{u.dept}</td>
<td style={{"padding":"12px 14px","borderBottom":"1px solid var(--line-200)","fontSize":"12px","color":"var(--ink-700)"}}>{u.role}</td>
<td style={{"padding":"12px 14px","borderBottom":"1px solid var(--line-200)"}}>
<div style={{"fontFamily":"'Space Mono'","fontSize":"11.5px","fontWeight":"700","color":"var(--ink-900)"}}>{u.shift}</div>
<div style={{"fontSize":"10px","color":"var(--ink-400)"}}>{u.shiftSub}</div>
</td>
<td style={{"padding":"12px 14px","borderBottom":"1px solid var(--line-200)"}}>
<div style={{"fontSize":"12.5px","fontWeight":"700","color":"var(--ink-900)"}}>{u.weekly}</div>
<div style={{"fontSize":"10px","color":"var(--ink-400)"}}>{u.daily}</div>
</td>
<td style={{"padding":"12px 14px","borderBottom":"1px solid var(--line-200)","minWidth":"190px"}}>
<div style={{"display":"flex","alignItems":"center","gap":"8px"}}>
<div style={{"flex":"1","height":"6px","borderRadius":"99px","background":"var(--line-200)","overflow":"hidden"}}>
<div style={cssTextToObject(`height:100%;border-radius:99px;width:${u.w};background:${u.barColor}`)} />
</div>
<span style={{"fontSize":"11.5px","fontWeight":"800","color":"var(--ink-900)"}}>{u.util}</span>
</div>
<div style={{"display":"flex","alignItems":"center","gap":"7px","marginTop":"3px","flexWrap":"wrap"}}>
<span style={cssTextToObject(`font-size:10px;font-weight:700;padding:2px 8px;border-radius:999px;background:${u.loadBg};color:${u.loadColor}`)}>{u.load}</span>
<span style={{"fontSize":"10px","color":"var(--ink-400)"}}>{u.loadLabel}</span>
<span style={cssTextToObject(`font-size:10px;font-weight:700;color:${u.freeColor}`)}>{u.freeLabel}</span>
</div>
</td>
<td style={{"padding":"12px 14px","borderBottom":"1px solid var(--line-200)"}}>
<span style={cssTextToObject(`font-size:10.5px;font-weight:700;padding:3px 10px;border-radius:999px;background:${u.statusBg};color:${u.statusColor}`)}>{u.status}</span>
</td>
<td style={{"padding":"12px 18px","borderBottom":"1px solid var(--line-200)"}}>
<div style={{"display":"flex","gap":"7px","flexWrap":"wrap"}}>
<button onClick={u.open} style={cssTextToObject(u.actionStyle)}>
<Icon name={"settings-2"} style={{"width":"12px","height":"12px"}} />
{u.actionLabel}
</button>
{Boolean(u.canSuspend) && (
<button onClick={u.suspend} style={{"display":"inline-flex","alignItems":"center","gap":"5px","padding":"6px 11px","border":"1px solid var(--line-300)","background":"#fff","color":"var(--ink-700)","borderRadius":"9px","fontSize":"11.5px","fontWeight":"700","cursor":"pointer"}}>
<Icon name={"user-x"} style={{"width":"12px","height":"12px"}} />
{u.suspendLabel}
</button>
)}
</div>
</td>
</tr>
))}
</tbody>
</table>
</div>
</div>

</React.Fragment>
)}
    </React.Fragment>
  );
}
