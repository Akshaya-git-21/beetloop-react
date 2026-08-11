import React from 'react';
import Icon from '../../components/Icon.jsx';
import { cssTextToObject } from '../../utils/cssText.js';

export default function AnalyticsSection({ vm }) {
  const { analyticsCards, showAnalytics, dbHasBoards, dbTabs, dbTitle, dbSub,
    dbIsExec, dbExecKpis, dbExecOkrs, dbExecCampaigns,
    dbIsCapacity, dbCapKpis, dbCapRows,
    dbIsDept, dbDeptKpis, dbDeptRows,
    dbIsTeam, dbTeamFilters, dbTeamFrom, dbTeamSetFrom, dbTeamTo, dbTeamSetTo, dbTeamReset, dbTeamRangeNote,
    dbTeamKpis, dbTeamRows, dbTeamEmpty } = vm;
  return (
    <React.Fragment>
{Boolean(showAnalytics) && (
<React.Fragment>

{Boolean(dbHasBoards) && (
<React.Fragment>

<div style={{"display":"inline-flex","background":"var(--surface-50)","border":"1px solid var(--line-300)","borderRadius":"12px","padding":"3px","marginBottom":"14px","flexWrap":"wrap"}}>
{(dbTabs || []).map((t, $index) => (
<button key={$index} onClick={t.go} style={cssTextToObject(t.style)}>
<Icon name={t.icon} style={{"width":"15px","height":"15px"}} />
{t.label}
</button>
))}
</div>

<div style={{"marginBottom":"16px"}}>
<div style={{"fontFamily":"'Sora'","fontWeight":"700","fontSize":"17px","color":"var(--ink-900)"}}>{dbTitle}</div>
<div style={{"fontSize":"12.5px","color":"var(--ink-500)","marginTop":"2px"}}>{dbSub}</div>
</div>

{Boolean(dbIsExec) && (
<React.Fragment>
<div style={{"display":"grid","gridTemplateColumns":"repeat(auto-fit,minmax(160px,1fr))","gap":"12px","marginBottom":"16px"}}>
{(dbExecKpis || []).map((k, $index) => (
<div key={$index} style={{"background":"var(--paper)","border":"1px solid var(--line-300)","borderRadius":"14px","padding":"14px 16px","boxShadow":"var(--shadow-sm)"}}>
<div style={{"fontSize":"11px","fontWeight":"700","letterSpacing":".05em","textTransform":"uppercase","color":"var(--ink-400)"}}>{k.label}</div>
<div style={cssTextToObject(`font-family:'Sora';font-weight:800;font-size:23px;color:${k.color};margin-top:4px`)}>{k.value}</div>
<div style={{"fontSize":"10.5px","color":"var(--ink-400)","marginTop":"2px"}}>{k.sub}</div>
</div>
))}
</div>
<div style={{"display":"grid","gridTemplateColumns":"1fr 1fr","gap":"16px"}}>
<div style={{"background":"var(--paper)","border":"1px solid var(--line-300)","borderRadius":"18px","boxShadow":"var(--shadow-sm)","padding":"18px 20px"}}>
<div style={{"fontSize":"11.5px","fontWeight":"800","letterSpacing":".06em","textTransform":"uppercase","color":"var(--ink-400)","marginBottom":"12px"}}>Company OKRs</div>
<div style={{"display":"flex","flexDirection":"column","gap":"12px"}}>
{(dbExecOkrs || []).map((o, $index) => (
<div key={$index} onClick={o.open} style={{"cursor":"pointer"}}>
<div style={{"display":"flex","alignItems":"center","gap":"9px","marginBottom":"4px"}}>
<span style={{"fontSize":"12.5px","fontWeight":"700","color":"var(--ink-900)","flex":"1","minWidth":"0"}}>{o.label}</span>
<span style={cssTextToObject(`font-size:10px;font-weight:700;padding:2px 8px;border-radius:999px;background:${o.healthBg};color:${o.healthColor}`)}>{o.health}</span>
<span style={{"fontSize":"11.5px","fontWeight":"800","color":"var(--ink-900)"}}>{o.pct}</span>
</div>
<div style={{"height":"6px","borderRadius":"99px","background":"var(--line-200)","overflow":"hidden"}}>
<div style={cssTextToObject(`height:100%;border-radius:99px;width:${o.w};background:${o.color}`)} />
</div>
<div style={{"fontSize":"10.5px","color":"var(--ink-400)","marginTop":"3px"}}>{o.sub}</div>
</div>
))}
</div>
</div>
<div style={{"background":"var(--paper)","border":"1px solid var(--line-300)","borderRadius":"18px","boxShadow":"var(--shadow-sm)","padding":"18px 20px"}}>
<div style={{"fontSize":"11.5px","fontWeight":"800","letterSpacing":".06em","textTransform":"uppercase","color":"var(--ink-400)","marginBottom":"12px"}}>Campaign performance & spend</div>
<div style={{"display":"flex","flexDirection":"column","gap":"12px"}}>
{(dbExecCampaigns || []).map((c, $index) => (
<div key={$index} onClick={c.open} style={{"cursor":"pointer"}}>
<div style={{"display":"flex","alignItems":"center","gap":"9px","marginBottom":"4px"}}>
<span style={{"fontSize":"12.5px","fontWeight":"700","color":"var(--ink-900)","flex":"1","minWidth":"0"}}>{c.label}</span>
<span style={{"fontSize":"11.5px","fontWeight":"800","color":"var(--ink-900)"}}>{c.pct}</span>
</div>
<div style={{"height":"6px","borderRadius":"99px","background":"var(--line-200)","overflow":"hidden"}}>
<div style={cssTextToObject(`height:100%;border-radius:99px;width:${c.w};background:${c.color}`)} />
</div>
<div style={{"display":"flex","alignItems":"center","gap":"8px","marginTop":"4px"}}>
<span style={{"fontSize":"10.5px","color":"var(--ink-400)","flex":"1","minWidth":"0"}}>{c.sub}</span>
<span style={{"fontSize":"10.5px","fontWeight":"700","color":"var(--info-600)"}}>{c.spend}</span>
</div>
</div>
))}
</div>
</div>
</div>
</React.Fragment>
)}

{Boolean(dbIsCapacity) && (
<React.Fragment>
<div style={{"display":"grid","gridTemplateColumns":"repeat(auto-fit,minmax(160px,1fr))","gap":"12px","marginBottom":"16px"}}>
{(dbCapKpis || []).map((k, $index) => (
<div key={$index} style={{"background":"var(--paper)","border":"1px solid var(--line-300)","borderRadius":"14px","padding":"14px 16px","boxShadow":"var(--shadow-sm)"}}>
<div style={{"fontSize":"11px","fontWeight":"700","letterSpacing":".05em","textTransform":"uppercase","color":"var(--ink-400)"}}>{k.label}</div>
<div style={cssTextToObject(`font-family:'Sora';font-weight:800;font-size:23px;color:${k.color};margin-top:4px`)}>{k.value}</div>
<div style={{"fontSize":"10.5px","color":"var(--ink-400)","marginTop":"2px"}}>{k.sub}</div>
</div>
))}
</div>
<div style={{"background":"var(--paper)","border":"1px solid var(--line-300)","borderRadius":"18px","boxShadow":"var(--shadow-sm)","padding":"18px 20px"}}>
<div style={{"fontSize":"11.5px","fontWeight":"800","letterSpacing":".06em","textTransform":"uppercase","color":"var(--ink-400)","marginBottom":"14px"}}>Utilisation — assigned hours vs shift capacity (from User Management)</div>
<div style={{"display":"flex","flexDirection":"column","gap":"14px"}}>
{(dbCapRows || []).map((r, $index) => (
<div key={$index}>
<div style={{"display":"flex","alignItems":"center","gap":"10px","marginBottom":"5px","flexWrap":"wrap"}}>
<span style={{"fontSize":"13px","fontWeight":"700","color":"var(--ink-900)","flex":"1","minWidth":"110px"}}>{r.label}</span>
<span style={{"fontSize":"11px","color":"var(--ink-500)"}}>{r.tasks}</span>
<span style={{"fontSize":"11px","color":"var(--ink-500)"}}>{r.est}</span>
<span style={cssTextToObject(`font-size:11px;font-weight:700;color:${r.freeColor}`)}>{r.freeLabel}</span>
<span style={{"fontSize":"11px","color":"var(--ink-400)"}}>{r.act}</span>
<span style={cssTextToObject(`font-size:10.5px;font-weight:700;padding:3px 10px;border-radius:999px;background:${r.stateBg};color:${r.stateColor}`)}>{r.state}</span>
<span style={{"fontSize":"12px","fontWeight":"800","color":"var(--ink-900)","width":"48px","textAlign":"right"}}>{r.util}</span>
</div>
<div style={{"height":"8px","borderRadius":"99px","background":"var(--line-200)","overflow":"hidden"}}>
<div style={cssTextToObject(`height:100%;border-radius:99px;width:${r.w};background:${r.color}`)} />
</div>
<div style={{"fontSize":"10.5px","color":"var(--ink-400)","marginTop":"3px"}}>{r.shift} · {r.capLabel}</div>
</div>
))}
</div>
</div>
</React.Fragment>
)}

{Boolean(dbIsDept) && (
<React.Fragment>
<div style={{"display":"grid","gridTemplateColumns":"repeat(auto-fit,minmax(160px,1fr))","gap":"12px","marginBottom":"16px"}}>
{(dbDeptKpis || []).map((k, $index) => (
<div key={$index} style={{"background":"var(--paper)","border":"1px solid var(--line-300)","borderRadius":"14px","padding":"14px 16px","boxShadow":"var(--shadow-sm)"}}>
<div style={{"fontSize":"11px","fontWeight":"700","letterSpacing":".05em","textTransform":"uppercase","color":"var(--ink-400)"}}>{k.label}</div>
<div style={cssTextToObject(`font-family:'Sora';font-weight:800;font-size:23px;color:${k.color};margin-top:4px`)}>{k.value}</div>
<div style={{"fontSize":"10.5px","color":"var(--ink-400)","marginTop":"2px"}}>{k.sub}</div>
</div>
))}
</div>
<div style={{"background":"var(--paper)","border":"1px solid var(--line-300)","borderRadius":"18px","boxShadow":"var(--shadow-sm)","padding":"18px 20px"}}>
<div style={{"fontSize":"11.5px","fontWeight":"800","letterSpacing":".06em","textTransform":"uppercase","color":"var(--ink-400)","marginBottom":"14px"}}>Department delivery & objective progress</div>
<div style={{"display":"flex","flexDirection":"column","gap":"14px"}}>
{(dbDeptRows || []).map((d, $index) => (
<div key={$index}>
<div style={{"display":"flex","alignItems":"center","gap":"10px","marginBottom":"5px"}}>
<span style={{"fontSize":"13px","fontWeight":"700","color":"var(--ink-900)","flex":"1","minWidth":"0"}}>{d.label}</span>
<span style={{"fontSize":"11px","color":"var(--ink-500)"}}>{d.tasks}</span>
<span style={{"fontSize":"11px","color":"var(--verify-600)","fontWeight":"700"}}>{d.done}</span>
<span style={{"fontSize":"11px","color":"var(--ink-500)"}}>{d.okrs}</span>
<span style={{"fontSize":"12px","fontWeight":"800","color":"var(--ink-900)","width":"48px","textAlign":"right"}}>{d.pct}</span>
</div>
<div style={{"height":"8px","borderRadius":"99px","background":"var(--line-200)","overflow":"hidden"}}>
<div style={cssTextToObject(`height:100%;border-radius:99px;width:${d.w};background:${d.color}`)} />
</div>
<div style={{"fontSize":"10.5px","color":"var(--ink-400)","marginTop":"3px"}}>{d.completion}</div>
</div>
))}
</div>
</div>
</React.Fragment>
)}

{Boolean(dbIsTeam) && (
<React.Fragment>
<div style={{"display":"flex","alignItems":"center","gap":"10px","marginBottom":"14px","flexWrap":"wrap"}}>
{(dbTeamFilters || []).map((f, $index) => (
<div key={$index} style={{"display":"flex","alignItems":"center","gap":"7px","background":"var(--paper)","border":"1px solid var(--line-300)","borderRadius":"11px","padding":"6px 10px"}}>
<span style={{"fontSize":"11.5px","fontWeight":"700","color":"var(--ink-500)"}}>{f.label}</span>
<select value={f.value} onChange={f.onChange} style={{"border":"none","background":"none","fontSize":"13px","fontWeight":"600","color":"var(--ink-900)","outline":"none","cursor":"pointer"}}>
{(f.options || []).map((o, $i2) => (
<option key={$i2} value={o}>{o}</option>
))}
</select>
</div>
))}
<div style={{"display":"flex","alignItems":"center","gap":"7px","background":"var(--paper)","border":"1px solid var(--line-300)","borderRadius":"11px","padding":"6px 10px"}}>
<span style={{"fontSize":"11.5px","fontWeight":"700","color":"var(--ink-500)"}}>From</span>
<input type="date" value={dbTeamFrom} onInput={dbTeamSetFrom} style={{"border":"none","background":"none","fontSize":"12.5px","fontWeight":"600","color":"var(--ink-900)","outline":"none"}} />
</div>
<div style={{"display":"flex","alignItems":"center","gap":"7px","background":"var(--paper)","border":"1px solid var(--line-300)","borderRadius":"11px","padding":"6px 10px"}}>
<span style={{"fontSize":"11.5px","fontWeight":"700","color":"var(--ink-500)"}}>To</span>
<input type="date" value={dbTeamTo} onInput={dbTeamSetTo} style={{"border":"none","background":"none","fontSize":"12.5px","fontWeight":"600","color":"var(--ink-900)","outline":"none"}} />
</div>
<button onClick={dbTeamReset} style={{"display":"flex","alignItems":"center","gap":"6px","padding":"7px 12px","border":"1px solid var(--line-300)","background":"var(--paper)","borderRadius":"11px","fontSize":"12px","fontWeight":"700","color":"var(--ink-500)","cursor":"pointer"}}>
<Icon name={"rotate-ccw"} style={{"width":"12px","height":"12px"}} />
Reset
</button>
<span style={{"fontSize":"11.5px","fontWeight":"600","color":"var(--ink-500)"}}>{dbTeamRangeNote}</span>
</div>

<div style={{"display":"grid","gridTemplateColumns":"repeat(auto-fit,minmax(160px,1fr))","gap":"12px","marginBottom":"16px"}}>
{(dbTeamKpis || []).map((k, $index) => (
<div key={$index} style={{"background":"var(--paper)","border":"1px solid var(--line-300)","borderRadius":"14px","padding":"14px 16px","boxShadow":"var(--shadow-sm)"}}>
<div style={{"fontSize":"11px","fontWeight":"700","letterSpacing":".05em","textTransform":"uppercase","color":"var(--ink-400)"}}>{k.label}</div>
<div style={cssTextToObject(`font-family:'Sora';font-weight:800;font-size:23px;color:${k.color};margin-top:4px`)}>{k.value}</div>
<div style={{"fontSize":"10.5px","color":"var(--ink-400)","marginTop":"2px"}}>{k.sub}</div>
</div>
))}
</div>

<div style={{"display":"flex","flexDirection":"column","gap":"12px"}}>
{(dbTeamRows || []).map((m, $index) => (
<div key={$index} style={{"background":"var(--paper)","border":"1px solid var(--line-300)","borderRadius":"16px","boxShadow":"var(--shadow-sm)","overflow":"hidden"}}>
<div style={{"padding":"14px 18px","display":"flex","alignItems":"center","gap":"12px","flexWrap":"wrap"}}>
<span style={{"width":"32px","height":"32px","borderRadius":"99px","background":"var(--beet-700)","color":"#fff","display":"flex","alignItems":"center","justifyContent":"center","fontSize":"12px","fontWeight":"800","flexShrink":"0"}}>{m.initials}</span>
<div style={{"flex":"1","minWidth":"150px"}}>
<div style={{"fontSize":"13.5px","fontWeight":"700","color":"var(--ink-900)"}}>{m.label}</div>
<div style={{"fontSize":"10.5px","color":"var(--ink-400)","marginTop":"1px"}}>{m.hours} · {m.effCreatedLabel}</div>
</div>
<div style={{"textAlign":"center","minWidth":"60px"}}>
<div style={{"fontSize":"10px","fontWeight":"700","textTransform":"uppercase","letterSpacing":".05em","color":"var(--ink-400)"}}>Tasks</div>
<div style={{"fontFamily":"'Sora'","fontWeight":"800","fontSize":"16px","color":"var(--ink-900)"}}>{m.tasks}</div>
</div>
<div style={{"textAlign":"center","minWidth":"70px"}}>
<div style={{"fontSize":"10px","fontWeight":"700","textTransform":"uppercase","letterSpacing":".05em","color":"var(--ink-400)"}}>Approved</div>
<div style={{"fontFamily":"'Sora'","fontWeight":"800","fontSize":"16px","color":"var(--verify-600)"}}>{m.done}</div>
</div>
<div style={{"textAlign":"center","minWidth":"60px"}}>
<div style={{"fontSize":"10px","fontWeight":"700","textTransform":"uppercase","letterSpacing":".05em","color":"var(--ink-400)"}}>Rework</div>
<div style={{"fontFamily":"'Sora'","fontWeight":"800","fontSize":"16px","color":"var(--warn-600)"}}>{m.rework}</div>
</div>
<div style={{"minWidth":"130px"}}>
<div style={{"display":"flex","alignItems":"center","gap":"8px"}}>
<div style={{"flex":"1","height":"6px","borderRadius":"99px","background":"var(--line-200)","overflow":"hidden"}}>
<div style={cssTextToObject(`height:100%;border-radius:99px;width:${m.w};background:${m.color}`)} />
</div>
<span style={{"fontSize":"12px","fontWeight":"800","color":"var(--ink-900)"}}>{m.pct}</span>
</div>
</div>
<span style={cssTextToObject(`font-size:10.5px;font-weight:700;padding:3px 10px;border-radius:999px;background:${m.flagBg};color:${m.flagColor};flex-shrink:0`)}>{m.flag}</span>
<button onClick={m.toggle} style={{"display":"flex","alignItems":"center","gap":"5px","padding":"7px 12px","border":"1px solid var(--line-300)","background":"var(--paper)","color":"var(--ink-700)","borderRadius":"9px","fontSize":"11.5px","fontWeight":"700","cursor":"pointer","flexShrink":"0"}}>
<Icon name={"chevrons-up-down"} style={{"width":"12px","height":"12px"}} />
{m.toggleLabel}
</button>
</div>
{Boolean(m.expanded) && (
<div style={{"borderTop":"1px solid var(--line-200)","background":"var(--surface-50)","padding":"14px 18px","display":"flex","flexDirection":"column","gap":"14px"}}>
<div>
<div style={{"fontSize":"10.5px","fontWeight":"800","letterSpacing":".06em","textTransform":"uppercase","color":"var(--ink-400)","marginBottom":"7px"}}>Effort assigned — {m.effAssignedLabel}</div>
{Boolean(m.hasEffPlans) && (
<div style={{"display":"flex","flexWrap":"wrap","gap":"7px"}}>
{(m.effPlans || []).map((e, $i2) => (
<button key={$i2} onClick={e.open} style={{"display":"inline-flex","alignItems":"center","gap":"6px","padding":"6px 11px","border":"1px solid var(--line-300)","background":"var(--paper)","borderRadius":"9px","fontSize":"11.5px","fontWeight":"700","color":"var(--ink-700)","cursor":"pointer"}}>
<Icon name={"gauge"} style={{"width":"11px","height":"11px","color":"var(--orchid-600)"}} />
{e.name} · {e.qty}
<span style={{"fontWeight":"500","color":"var(--ink-400)"}}>{e.plan}</span>
</button>
))}
</div>
)}
</div>
{Boolean(m.hasKpis) && (
<div>
<div style={{"fontSize":"10.5px","fontWeight":"800","letterSpacing":".06em","textTransform":"uppercase","color":"var(--ink-400)","marginBottom":"7px"}}>KPI target vs achieved</div>
<div style={{"display":"flex","flexDirection":"column","gap":"9px"}}>
{(m.kpiRows || []).map((k, $i2) => (
<div key={$i2}>
<div style={{"display":"flex","alignItems":"center","gap":"10px","marginBottom":"3px"}}>
<span style={{"fontSize":"12px","fontWeight":"700","color":"var(--ink-900)","flex":"1","minWidth":"0"}}>{k.kpi}</span>
<span style={{"fontSize":"11px","color":"var(--ink-500)"}}>target {k.target}</span>
<span style={{"fontSize":"11px","fontWeight":"700","color":"var(--verify-600)"}}>achieved {k.ach}</span>
<span style={{"fontSize":"12px","fontWeight":"800","color":"var(--ink-900)","width":"44px","textAlign":"right"}}>{k.pct}</span>
</div>
<div style={{"height":"6px","borderRadius":"99px","background":"var(--line-200)","overflow":"hidden"}}>
<div style={cssTextToObject(`height:100%;border-radius:99px;width:${k.w};background:${k.color}`)} />
</div>
</div>
))}
</div>
</div>
)}
<div>
<div style={{"display":"flex","alignItems":"center","gap":"9px","marginBottom":"7px","flexWrap":"wrap"}}>
<span style={{"fontSize":"10.5px","fontWeight":"800","letterSpacing":".06em","textTransform":"uppercase","color":"var(--ink-400)"}}>Tasks — all types</span>
{(m.typeRows || []).map((ty, $i2) => (
<span key={$i2} style={cssTextToObject(`font-size:10.5px;font-weight:700;padding:2px 9px;border-radius:999px;background:${ty.bg};color:${ty.color}`)}>{ty.label} · {ty.n}</span>
))}
</div>
<div style={{"background":"var(--paper)","border":"1px solid var(--line-200)","borderRadius":"11px","overflow":"hidden"}}>
{(m.taskRows || []).map((t, $i2) => (
<div key={$i2} onClick={t.open} style={{"padding":"8px 12px","borderBottom":"1px solid var(--line-200)","display":"flex","alignItems":"center","gap":"9px","cursor":"pointer"}}>
<span style={{"fontFamily":"'Space Mono'","fontSize":"10px","fontWeight":"700","color":"var(--ink-900)","flexShrink":"0"}}>{t.id}</span>
<span style={{"fontSize":"12px","fontWeight":"600","color":"var(--ink-900)","flex":"1","minWidth":"0"}}>{t.name}</span>
<span style={{"fontSize":"10.5px","color":"var(--ink-500)","flexShrink":"0"}}>{t.type}</span>
<span style={{"fontSize":"10.5px","color":"var(--ink-500)","flexShrink":"0"}}>{t.dates}</span>
<span style={cssTextToObject(`font-size:10px;font-weight:700;padding:2px 8px;border-radius:999px;background:${t.bg};color:${t.color};flex-shrink:0`)}>{t.status}</span>
</div>
))}
<div style={{"padding":"7px 12px","fontSize":"10.5px","color":"var(--ink-400)"}}>{m.taskMore}</div>
</div>
</div>
</div>
)}
</div>
))}
{Boolean(dbTeamEmpty) && (
<div style={{"background":"var(--paper)","border":"1px solid var(--line-300)","borderRadius":"16px","padding":"40px","textAlign":"center","color":"var(--ink-500)"}}>
<Icon name={"users"} style={{"width":"24px","height":"24px","color":"var(--ink-400)"}} />
<div style={{"fontSize":"13.5px","fontWeight":"600","marginTop":"9px"}}>No team activity in this range.</div>
</div>
)}
</div>
</React.Fragment>
)}

<div style={{"fontSize":"11.5px","fontWeight":"800","letterSpacing":".06em","textTransform":"uppercase","color":"var(--ink-400)","margin":"22px 0 12px"}}>All dashboards & your access</div>
</React.Fragment>
)}

<div style={{"display":"grid","gridTemplateColumns":"repeat(3,1fr)","gap":"16px"}}>
{(analyticsCards || []).map((a, $index) => (
<div key={$index} onClick={a.open} style={cssTextToObject(`background:var(--paper);border:1px solid var(--line-300);border-radius:20px;box-shadow:var(--shadow-sm);padding:20px;opacity:${a.opacity};cursor:${a.cursor}`)}>
<div style={{"display":"flex","alignItems":"center","justifyContent":"space-between","marginBottom":"14px"}}>
<span style={cssTextToObject(`width:36px;height:36px;border-radius:11px;display:flex;align-items:center;justify-content:center;background:${a.iconBg}`)}>
<Icon name={a.icon} style={cssTextToObject(`width:18px;height:18px;color:${a.iconColor}`)} />
</span>
{Boolean(a.locked) && (
<Icon name={"lock"} style={{"width":"15px","height":"15px","color":"var(--ink-400)"}} />
)}
</div>
<div style={{"fontSize":"15px","fontWeight":"700","color":"var(--ink-900)"}}>{a.title}</div>
<div style={{"fontSize":"13px","color":"var(--ink-500)","marginTop":"4px","lineHeight":"1.5"}}>{a.desc}</div>
<div style={cssTextToObject(`margin-top:14px;font-size:12px;font-weight:700;color:${a.tagColor}`)}>{a.tag}</div>
</div>
))}
</div>

</React.Fragment>
)}
    </React.Fragment>
  );
}
