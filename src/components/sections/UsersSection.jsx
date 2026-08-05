import React from 'react';
import Icon from '../../components/Icon.jsx';
import { cssTextToObject } from '../../utils/cssText.js';

export default function UsersSection({ vm }) {
  const { showUsersTable, umIsList, umStats, umRows,
    umTabList, umTabPerms, umSegListStyle, umSegPermStyle, umGoList, umGoPerm,
    permCanManage, permRoleOptions, permRoleVal, permSetRole, permRows, permReset } = vm;
  return (
    <React.Fragment>
{Boolean(showUsersTable) && (
<React.Fragment>

<div style={{"display":"inline-flex","background":"var(--surface-50)","border":"1px solid var(--line-300)","borderRadius":"12px","padding":"3px","marginBottom":"16px"}}>
<button onClick={umGoList} style={cssTextToObject(umSegListStyle)}><Icon name={"users"} style={{"width":"15px","height":"15px"}} />User list</button>
<button onClick={umGoPerm} style={cssTextToObject(umSegPermStyle)}><Icon name={"shield-check"} style={{"width":"15px","height":"15px"}} />Permissions</button>
</div>

{Boolean(umTabPerms) && (
<div style={{"background":"#fff","border":"1px solid var(--line-300)","borderRadius":"20px","boxShadow":"var(--shadow-sm)","overflow":"hidden"}}>
<div style={{"padding":"16px 20px","borderBottom":"1px solid var(--line-200)","display":"flex","alignItems":"center","gap":"12px","flexWrap":"wrap"}}>
<div style={{"flex":"1","minWidth":"200px"}}>
<div style={{"fontFamily":"'Sora'","fontWeight":"700","fontSize":"15px","color":"var(--beet-700)"}}>Module permissions</div>
<div style={{"fontSize":"12px","color":"var(--ink-500)","marginTop":"2px"}}>{permCanManage ? 'Click a dot to grant or revoke that action for the selected role.' : 'View only — only Admin can change permissions.'}</div>
</div>
<select value={permRoleVal||''} onChange={permSetRole} style={{"padding":"9px 12px","border":"1px solid var(--line-300)","borderRadius":"10px","fontSize":"13px","background":"#fff","fontWeight":"700","color":"var(--beet-700)"}}>
{(permRoleOptions || []).map((o, $i) => (<option key={$i} value={o.key}>{o.label}</option>))}
</select>
{Boolean(permCanManage) && (
<button onClick={permReset} style={{"display":"flex","alignItems":"center","gap":"6px","padding":"9px 14px","border":"1px solid var(--line-300)","background":"#fff","borderRadius":"10px","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","cursor":"pointer"}}>
<Icon name={"rotate-ccw"} style={{"width":"13px","height":"13px"}} />
Reset to defaults
</button>
)}
</div>
<div className="blscroll" style={{"overflowX":"auto"}}>
<table style={{"width":"100%","borderCollapse":"collapse","minWidth":"860px"}}>
<thead><tr style={{"background":"var(--surface-50)"}}>
<th style={{"textAlign":"left","padding":"11px 18px","fontSize":"10.5px","fontWeight":"800","letterSpacing":".06em","textTransform":"uppercase","color":"var(--ink-400)"}}>Module</th>
<th style={{"textAlign":"center","padding":"11px 14px","fontSize":"10.5px","fontWeight":"800","letterSpacing":".06em","textTransform":"uppercase","color":"var(--ink-400)"}}>View</th>
<th style={{"textAlign":"center","padding":"11px 14px","fontSize":"10.5px","fontWeight":"800","letterSpacing":".06em","textTransform":"uppercase","color":"var(--ink-400)"}}>Create</th>
<th style={{"textAlign":"center","padding":"11px 14px","fontSize":"10.5px","fontWeight":"800","letterSpacing":".06em","textTransform":"uppercase","color":"var(--ink-400)"}}>Edit</th>
<th style={{"textAlign":"center","padding":"11px 14px","fontSize":"10.5px","fontWeight":"800","letterSpacing":".06em","textTransform":"uppercase","color":"var(--ink-400)"}}>Delete</th>
<th style={{"textAlign":"center","padding":"11px 14px","fontSize":"10.5px","fontWeight":"800","letterSpacing":".06em","textTransform":"uppercase","color":"var(--ink-400)"}}>Approve</th>
<th style={{"textAlign":"center","padding":"11px 18px","fontSize":"10.5px","fontWeight":"800","letterSpacing":".06em","textTransform":"uppercase","color":"var(--ink-400)"}}>Export</th>
<th style={{"textAlign":"center","padding":"11px 18px","fontSize":"10.5px","fontWeight":"800","letterSpacing":".06em","textTransform":"uppercase","color":"var(--ink-400)"}}>Audit all</th>
</tr></thead>
<tbody>
{(permRows || []).map((r, $index) => (
<tr key={$index} style={{"borderBottom":"1px solid var(--line-200)"}}>
<td style={{"padding":"11px 18px","fontSize":"13px","fontWeight":"700","color":"var(--ink-900)"}}>{r.label}</td>
<td style={{"padding":"11px 14px","textAlign":"center"}}><button onClick={r.toggleView} disabled={!permCanManage} style={cssTextToObject(r.viewStyle)}><Icon name={"check"} style={{"width":"13px","height":"13px","opacity":r.view?1:0}} /></button></td>
<td style={{"padding":"11px 14px","textAlign":"center"}}><button onClick={r.toggleCreate} disabled={!permCanManage} style={cssTextToObject(r.createStyle)}><Icon name={"check"} style={{"width":"13px","height":"13px","opacity":r.create?1:0}} /></button></td>
<td style={{"padding":"11px 14px","textAlign":"center"}}><button onClick={r.toggleEdit} disabled={!permCanManage} style={cssTextToObject(r.editStyle)}><Icon name={"check"} style={{"width":"13px","height":"13px","opacity":r.edit?1:0}} /></button></td>
<td style={{"padding":"11px 14px","textAlign":"center"}}><button onClick={r.toggleDelete} disabled={!permCanManage} style={cssTextToObject(r.deleteStyle)}><Icon name={"check"} style={{"width":"13px","height":"13px","opacity":r.delete?1:0}} /></button></td>
<td style={{"padding":"11px 14px","textAlign":"center"}}><button onClick={r.toggleApprove} disabled={!permCanManage} style={cssTextToObject(r.approveStyle)}><Icon name={"check"} style={{"width":"13px","height":"13px","opacity":r.approve?1:0}} /></button></td>
<td style={{"padding":"11px 18px","textAlign":"center"}}><button onClick={r.toggleExport} disabled={!permCanManage} style={cssTextToObject(r.exportStyle)}><Icon name={"check"} style={{"width":"13px","height":"13px","opacity":r.export?1:0}} /></button></td>
<td style={{"padding":"11px 18px","textAlign":"center"}}>
{Boolean(r.isMessages) ? (
<button onClick={r.toggleAuditAll} disabled={!permCanManage} title="See every conversation, including private DMs and channels you're not a member of" style={cssTextToObject(r.auditAllStyle)}><Icon name={"check"} style={{"width":"13px","height":"13px","opacity":r.auditAll?1:0}} /></button>
) : (
<span style={{"color":"var(--ink-300)","fontSize":"12px"}}>—</span>
)}
</td>
</tr>
))}
</tbody>
</table>
</div>
</div>
)}

{Boolean(umTabList) && (
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
<table style={{"width":"100%","borderCollapse":"collapse","minWidth":"1340px"}}>
<thead>
<tr style={{"background":"var(--surface-50)"}}>
<th style={{"textAlign":"left","padding":"11px 18px","fontSize":"10.5px","fontWeight":"800","letterSpacing":".06em","textTransform":"uppercase","color":"var(--ink-400)"}}>Emp ID</th>
<th style={{"textAlign":"left","padding":"11px 14px","fontSize":"10.5px","fontWeight":"800","letterSpacing":".06em","textTransform":"uppercase","color":"var(--ink-400)"}}>Name</th>
<th style={{"textAlign":"left","padding":"11px 14px","fontSize":"10.5px","fontWeight":"800","letterSpacing":".06em","textTransform":"uppercase","color":"var(--ink-400)"}}>Dept</th>
<th style={{"textAlign":"left","padding":"11px 14px","fontSize":"10.5px","fontWeight":"800","letterSpacing":".06em","textTransform":"uppercase","color":"var(--ink-400)"}}>Role</th>
<th style={{"textAlign":"left","padding":"11px 14px","fontSize":"10.5px","fontWeight":"800","letterSpacing":".06em","textTransform":"uppercase","color":"var(--ink-400)"}}>Brands</th>
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
{u.hasAvatar ? (
<img src={u.avatarUrl} alt={u.name} style={{"width":"28px","height":"28px","borderRadius":"99px","objectFit":"cover","flexShrink":"0"}} />
) : (
<span style={{"width":"28px","height":"28px","borderRadius":"99px","background":"var(--beet-700)","color":"#fff","display":"flex","alignItems":"center","justifyContent":"center","fontSize":"10.5px","fontWeight":"800","flexShrink":"0"}}>{u.initials}</span>
)}
<span style={{"minWidth":"0"}}>
<span style={{"display":"block","fontSize":"13px","fontWeight":"700","color":"var(--ink-900)"}}>{u.name}</span>
<span style={{"display":"block","fontSize":"10.5px","color":"var(--ink-400)"}}>{u.sub}</span>
</span>
</div>
</td>
<td style={{"padding":"12px 14px","borderBottom":"1px solid var(--line-200)","fontSize":"12px","color":"var(--ink-700)"}}>{u.dept}</td>
<td style={{"padding":"12px 14px","borderBottom":"1px solid var(--line-200)","fontSize":"12px","color":"var(--ink-700)"}}>{u.role}</td>
<td style={{"padding":"12px 14px","borderBottom":"1px solid var(--line-200)","fontSize":"12px","color":u.hasBrands?"var(--ink-700)":"var(--ink-400)"}}>{u.brandsLabel}</td>
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
)}
    </React.Fragment>
  );
}
