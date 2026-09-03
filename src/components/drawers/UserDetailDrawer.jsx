import React from 'react';
import Icon from '../../components/Icon.jsx';
import { cssTextToObject } from '../../utils/cssText.js';

export default function UserDetailDrawer({ vm }) {
  const { umDrawerOpen, umU, umClose, umStop, umLoad, umEditing, umD, umSetStart, umSetEnd, umSetBreak, umSetDays, umDayOptions,
    umSetRole, umRoleOptions, umSetDept, umDeptOptions, umSetStatus, umStatusOptions, umCancelEdit, umSave,
    umMeta, umHasTasks, umTasks, umTaskMore, umCanEdit, umStartEdit, umSuspend, umSuspendLabel, umShowResend, umResend, umResendLabel,
    umBrandRows, umSetMobile, umSetDesignation, umSetTeam, umSetReportingManager, umSetTeamLead, umSetOfficeLocation,
    umAvatarUrl, umHasAvatar, umAvatarBusy, umUploadAvatar, umRemoveAvatar, umResetPassword, umWidgetRows, umLeadColumnRows } = vm;
  const u = umU || {};
  return (
    <React.Fragment>
{Boolean(umDrawerOpen) && (
<div onClick={umClose} style={{"position":"fixed","inset":"0","zIndex":"160","background":"rgba(31,8,20,.5)","display":"flex","justifyContent":"flex-end"}}>
<div onClick={umStop} className="blscroll" style={{"width":"100%","maxWidth":"620px","height":"100%","background":"var(--paper)","boxShadow":"var(--shadow-xl)","overflowY":"auto","animation":"blrise .3s var(--ease-out)"}}>
<div style={{"position":"sticky","top":"0","background":"var(--paper)","borderBottom":"1px solid var(--line-200)","padding":"18px 24px","zIndex":"3","display":"flex","alignItems":"flex-start","gap":"12px"}}>
{u.hasAvatar ? (
<img src={u.avatarUrl} alt={u.name} style={{"width":"40px","height":"40px","borderRadius":"99px","objectFit":"cover","flexShrink":"0"}} />
) : (
<span style={{"width":"40px","height":"40px","borderRadius":"99px","background":"var(--beet-700)","color":"#fff","display":"flex","alignItems":"center","justifyContent":"center","fontSize":"14px","fontWeight":"800","flexShrink":"0"}}>{u.initials}</span>
)}
<div style={{"flex":"1","minWidth":"0"}}>
{Boolean(umCanEdit) && (
<div style={{"display":"flex","alignItems":"center","gap":"8px","marginBottom":"4px"}}>
<label style={{"display":"inline-flex","alignItems":"center","gap":"5px","padding":"4px 9px","border":"1px solid var(--line-300)","background":"var(--paper)","color":"var(--ink-700)","borderRadius":"8px","fontSize":"10.5px","fontWeight":"700","cursor":"pointer"}}>
{umAvatarBusy ? 'Uploading…' : (umHasAvatar ? 'Change photo' : 'Upload photo')}
<input type="file" accept="image/*" onChange={umUploadAvatar} disabled={umAvatarBusy} style={{"display":"none"}} />
</label>
{Boolean(umHasAvatar) && (
<button onClick={umRemoveAvatar} disabled={umAvatarBusy} style={{"padding":"4px 9px","border":"1px solid var(--line-300)","background":"var(--paper)","color":"var(--danger-600)","borderRadius":"8px","fontSize":"10.5px","fontWeight":"700","cursor":"pointer"}}>
Remove
</button>
)}
</div>
)}
<h3 style={{"fontFamily":"'Sora'","fontWeight":"700","fontSize":"19px","color":"var(--ink-900)","margin":"0"}}>{u.name}</h3>
<div style={{"display":"flex","alignItems":"center","gap":"8px","marginTop":"3px","flexWrap":"wrap"}}>
<span style={{"fontSize":"12.5px","color":"var(--ink-500)"}}>{u.sub}</span>
<span style={cssTextToObject(`font-size:10.5px;font-weight:700;padding:2px 9px;border-radius:999px;background:${u.statusBg};color:${u.statusColor}`)}>{u.status}</span>
</div>
</div>
<button onClick={umClose} style={{"width":"34px","height":"34px","borderRadius":"10px","border":"1px solid var(--line-300)","background":"var(--paper)","cursor":"pointer","display":"flex","alignItems":"center","justifyContent":"center","flexShrink":"0"}}>
<Icon name={"x"} style={{"width":"17px","height":"17px","color":"var(--ink-700)"}} />
</button>
</div>
<div style={{"padding":"18px 24px 34px","display":"flex","flexDirection":"column","gap":"16px"}}>

<div style={{"background":"var(--surface-50)","border":"1px solid var(--line-200)","borderRadius":"14px","padding":"15px 17px"}}>
<div style={{"display":"flex","alignItems":"center","gap":"10px","marginBottom":"9px","flexWrap":"wrap"}}>
<Icon name={"gauge"} style={{"width":"15px","height":"15px","color":"var(--orchid-600)","flexShrink":"0"}} />
<span style={{"fontSize":"12px","fontWeight":"800","color":"var(--ink-900)","flex":"1","minWidth":"120px"}}>Workload & capacity</span>
<span style={{"fontSize":"11px","color":"var(--ink-500)"}}>{umLoad && umLoad.cap}</span>
<span style={{"fontSize":"11px","color":"var(--ink-500)"}}>{umLoad && umLoad.assigned}</span>
<span style={cssTextToObject(`font-size:11.5px;font-weight:800;color:${umLoad && umLoad.freeColor}`)}>{umLoad && umLoad.free}</span>
<span style={cssTextToObject(`font-size:10.5px;font-weight:700;padding:3px 10px;border-radius:999px;background:${umLoad && umLoad.stateBg};color:${umLoad && umLoad.stateColor}`)}>{umLoad && umLoad.state}</span>
</div>
<div style={{"height":"9px","borderRadius":"99px","background":"var(--line-200)","overflow":"hidden"}}>
<div style={cssTextToObject(`height:100%;border-radius:99px;width:${umLoad && umLoad.w};background:${umLoad && umLoad.color}`)} />
</div>
<div style={{"display":"flex","gap":"12px","marginTop":"6px"}}>
<span style={{"fontSize":"10.5px","color":"var(--ink-400)","flex":"1"}}>{umLoad && umLoad.openTasks}</span>
<span style={{"fontSize":"11px","fontWeight":"800","color":"var(--ink-900)"}}>{umLoad && umLoad.pct}</span>
</div>
</div>

{Boolean(umEditing) && (
<div style={{"border":"1px solid var(--line-300)","borderRadius":"14px","padding":"16px 18px"}}>
<div style={{"fontSize":"11px","fontWeight":"800","letterSpacing":".06em","textTransform":"uppercase","color":"var(--ink-400)","marginBottom":"12px"}}>Edit user</div>
<div style={{"display":"grid","gridTemplateColumns":"1fr 1fr","gap":"12px"}}>
<div><label style={{"display":"block","fontSize":"12px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"5px"}}>Shift start</label>
<input type="time" value={umD.shiftStart} onInput={umSetStart} style={{"width":"100%","padding":"9px 11px","border":"1px solid var(--line-300)","borderRadius":"10px","fontSize":"13px","outline":"none","color":"var(--ink-700)"}} /></div>
<div><label style={{"display":"block","fontSize":"12px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"5px"}}>Shift end</label>
<input type="time" value={umD.shiftEnd} onInput={umSetEnd} style={{"width":"100%","padding":"9px 11px","border":"1px solid var(--line-300)","borderRadius":"10px","fontSize":"13px","outline":"none","color":"var(--ink-700)"}} /></div>
<div><label style={{"display":"block","fontSize":"12px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"5px"}}>Break (minutes)</label>
<input value={umD.breakMin} onInput={umSetBreak} style={{"width":"100%","padding":"9px 11px","border":"1px solid var(--line-300)","borderRadius":"10px","fontSize":"13px","outline":"none"}} /></div>
<div><label style={{"display":"block","fontSize":"12px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"5px"}}>Working days / week</label>
<select value={umD.days} onChange={umSetDays} style={{"width":"100%","padding":"9px 11px","border":"1px solid var(--line-300)","borderRadius":"10px","fontSize":"13px","background":"var(--paper)"}}>
{(umDayOptions || []).map((o, $i) => (<option key={$i} value={o}>{o}</option>))}
</select></div>
<div><label style={{"display":"block","fontSize":"12px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"5px"}}>Role</label>
<select value={umD.role} onChange={umSetRole} style={{"width":"100%","padding":"9px 11px","border":"1px solid var(--line-300)","borderRadius":"10px","fontSize":"13px","background":"var(--paper)"}}>
{(umRoleOptions || []).map((o, $i) => (<option key={$i} value={o}>{o}</option>))}
</select></div>
<div><label style={{"display":"block","fontSize":"12px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"5px"}}>Department</label>
<select value={umD.dept} onChange={umSetDept} style={{"width":"100%","padding":"9px 11px","border":"1px solid var(--line-300)","borderRadius":"10px","fontSize":"13px","background":"var(--paper)"}}>
{(umDeptOptions || []).map((o, $i) => (<option key={$i} value={o}>{o}</option>))}
</select></div>
<div style={{"gridColumn":"1 / -1"}}><label style={{"display":"block","fontSize":"12px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"5px"}}>Account status</label>
<select value={umD.status} onChange={umSetStatus} style={{"width":"100%","padding":"9px 11px","border":"1px solid var(--line-300)","borderRadius":"10px","fontSize":"13px","background":"var(--paper)"}}>
{(umStatusOptions || []).map((o, $i) => (<option key={$i} value={o}>{o}</option>))}
</select></div>
<div><label style={{"display":"block","fontSize":"12px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"5px"}}>Mobile</label>
<input value={umD.mobile} onInput={umSetMobile} style={{"width":"100%","padding":"9px 11px","border":"1px solid var(--line-300)","borderRadius":"10px","fontSize":"13px","outline":"none"}} /></div>
<div><label style={{"display":"block","fontSize":"12px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"5px"}}>Designation</label>
<input value={umD.designation} onInput={umSetDesignation} style={{"width":"100%","padding":"9px 11px","border":"1px solid var(--line-300)","borderRadius":"10px","fontSize":"13px","outline":"none"}} /></div>
<div><label style={{"display":"block","fontSize":"12px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"5px"}}>Team</label>
<input value={umD.team} onInput={umSetTeam} style={{"width":"100%","padding":"9px 11px","border":"1px solid var(--line-300)","borderRadius":"10px","fontSize":"13px","outline":"none"}} /></div>
<div><label style={{"display":"block","fontSize":"12px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"5px"}}>Office location</label>
<input value={umD.officeLocation} onInput={umSetOfficeLocation} style={{"width":"100%","padding":"9px 11px","border":"1px solid var(--line-300)","borderRadius":"10px","fontSize":"13px","outline":"none"}} /></div>
<div><label style={{"display":"block","fontSize":"12px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"5px"}}>Reporting manager</label>
<input value={umD.reportingManager} onInput={umSetReportingManager} style={{"width":"100%","padding":"9px 11px","border":"1px solid var(--line-300)","borderRadius":"10px","fontSize":"13px","outline":"none"}} /></div>
<div><label style={{"display":"block","fontSize":"12px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"5px"}}>Team lead</label>
<input value={umD.teamLead} onInput={umSetTeamLead} style={{"width":"100%","padding":"9px 11px","border":"1px solid var(--line-300)","borderRadius":"10px","fontSize":"13px","outline":"none"}} /></div>
</div>
<div style={{"marginTop":"14px"}}>
<label style={{"display":"block","fontSize":"12px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"7px"}}>Assigned brand(s) — Brand Playbook restricted to these (Sales also restricted for leads). Admin/CEO default to full access when left empty.</label>
<div style={{"display":"flex","gap":"7px","flexWrap":"wrap"}}>
{(umBrandRows || []).map((b, $i) => (
<button key={$i} onClick={b.toggle} style={cssTextToObject(b.style)}>
{b.on && <Icon name={"check"} style={{"width":"11px","height":"11px"}} />}
{b.label}
</button>
))}
</div>
</div>
<div style={{"marginTop":"14px"}}>
<label style={{"display":"block","fontSize":"12px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"7px"}}>Dashboard widgets — untick to hide a block for this person</label>
<div style={{"display":"flex","gap":"7px","flexWrap":"wrap"}}>
{(umWidgetRows || []).map((w, $i) => (
<button key={$i} onClick={w.toggle} style={cssTextToObject(w.style)}>
{w.on && <Icon name={"check"} style={{"width":"11px","height":"11px"}} />}
{w.label}
</button>
))}
</div>
</div>
<div style={{"marginTop":"14px"}}>
<label style={{"display":"block","fontSize":"12px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"7px"}}>Leads columns — untick to hide a column for this person</label>
<div style={{"display":"flex","gap":"7px","flexWrap":"wrap"}}>
{(umLeadColumnRows || []).map((w, $i) => (
<button key={$i} onClick={w.toggle} style={cssTextToObject(w.style)}>
{w.on && <Icon name={"check"} style={{"width":"11px","height":"11px"}} />}
{w.label}
</button>
))}
</div>
</div>
<div style={{"display":"flex","justifyContent":"flex-end","gap":"9px","marginTop":"14px"}}>
<button onClick={umCancelEdit} style={{"padding":"9px 15px","border":"1px solid var(--line-300)","background":"var(--paper)","borderRadius":"10px","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","cursor":"pointer"}}>Cancel</button>
<button onClick={umSave} style={{"display":"flex","alignItems":"center","gap":"6px","padding":"9px 17px","border":"none","background":"#7A1C46","color":"#fff","borderRadius":"10px","fontSize":"12.5px","fontWeight":"700","cursor":"pointer"}}>
<Icon name={"check"} style={{"width":"13px","height":"13px"}} />Save changes</button>
</div>
</div>
)}

<div style={{"border":"1px solid var(--line-200)","borderRadius":"14px","overflow":"hidden"}}>
{(umMeta || []).map((m, $i) => (
<div key={$i} style={{"padding":"10px 15px","borderBottom":"1px solid var(--line-200)","display":"flex","gap":"12px"}}>
<span style={{"fontSize":"11.5px","fontWeight":"700","color":"var(--ink-500)","width":"150px","flexShrink":"0"}}>{m.k}</span>
<span style={{"fontSize":"12.5px","color":"var(--ink-900)","fontWeight":"600"}}>{m.v}</span>
</div>
))}
</div>

{Boolean(umHasTasks) && (
<div>
<div style={{"fontSize":"11px","fontWeight":"800","letterSpacing":".06em","textTransform":"uppercase","color":"var(--ink-400)","marginBottom":"8px"}}>Assigned tasks & hours</div>
<div style={{"border":"1px solid var(--line-200)","borderRadius":"12px","overflow":"hidden"}}>
{(umTasks || []).map((t, $i) => (
<div key={$i} onClick={t.open} style={{"padding":"9px 13px","borderBottom":"1px solid var(--line-200)","display":"flex","alignItems":"center","gap":"9px","cursor":"pointer"}}>
<span style={{"fontFamily":"'Space Mono'","fontSize":"10px","fontWeight":"700","color":"var(--ink-900)","flexShrink":"0"}}>{t.id}</span>
<span style={{"fontSize":"12px","fontWeight":"600","color":"var(--ink-900)","flex":"1","minWidth":"0"}}>{t.name}</span>
<span style={{"fontSize":"11px","fontWeight":"700","color":"var(--orchid-700)","flexShrink":"0"}}>{t.hours}</span>
<span style={{"fontSize":"10.5px","color":"var(--ink-500)","flexShrink":"0"}}>{t.dates}</span>
<span style={cssTextToObject(`font-size:10px;font-weight:700;padding:2px 8px;border-radius:999px;background:${t.bg};color:${t.color};flex-shrink:0`)}>{t.status}</span>
</div>
))}
<div style={{"padding":"7px 13px","fontSize":"10.5px","color":"var(--ink-400)"}}>{umTaskMore}</div>
</div>
</div>
)}

{Boolean(umCanEdit) && (
<div style={{"display":"flex","gap":"9px","flexWrap":"wrap","paddingTop":"4px"}}>
<button onClick={umStartEdit} style={{"display":"flex","alignItems":"center","gap":"6px","padding":"10px 16px","border":"none","background":"#7A1C46","color":"#fff","borderRadius":"11px","fontSize":"12.5px","fontWeight":"700","cursor":"pointer"}}>
<Icon name={"pencil"} style={{"width":"13px","height":"13px"}} />Edit user & shift</button>
<button onClick={umSuspend} style={{"display":"flex","alignItems":"center","gap":"6px","padding":"10px 16px","border":"1px solid var(--line-300)","background":"var(--paper)","color":"var(--ink-700)","borderRadius":"11px","fontSize":"12.5px","fontWeight":"700","cursor":"pointer"}}>
<Icon name={"user-x"} style={{"width":"13px","height":"13px"}} />{umSuspendLabel}</button>
<button onClick={umResetPassword} style={{"display":"flex","alignItems":"center","gap":"6px","padding":"10px 16px","border":"1px solid var(--line-300)","background":"var(--paper)","color":"var(--ink-700)","borderRadius":"11px","fontSize":"12.5px","fontWeight":"700","cursor":"pointer"}}>
<Icon name={"key-round"} style={{"width":"13px","height":"13px"}} />Reset password</button>
{Boolean(umShowResend) && (
<button onClick={umResend} style={{"display":"flex","alignItems":"center","gap":"6px","padding":"10px 16px","border":"1px solid var(--line-300)","background":"var(--paper)","color":"var(--ink-700)","borderRadius":"11px","fontSize":"12.5px","fontWeight":"700","cursor":"pointer"}}>
<Icon name={"mail"} style={{"width":"13px","height":"13px"}} />{umResendLabel}</button>
)}
</div>
)}

</div>
</div>
</div>
)}
    </React.Fragment>
  );
}
