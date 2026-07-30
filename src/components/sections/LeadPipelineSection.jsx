import React from 'react';
import Icon from '../../components/Icon.jsx';
import { cssTextToObject } from '../../utils/cssText.js';

export default function LeadPipelineSection({ vm }) {
  const { okrTabsVisible, okrGoOkrs, okrSegOkrsStyle, okrGoLeads, okrSegLeadsStyle, okrGoPipe, okrSegPipeStyle,
    okrModPipe, pipeStats, pipeFunnel, pipeFilterDefs, pipeReset, pipeCanWrite, pipeNew, pipeReadOnly, pipeMaskNote,
    pipeRows, pipeStageOptions, pipeEmpty, pipePg,
    okrModLeads, ldStats, ldTodayPct, ldTodayW, ldTodayColor, ldTodayNote, ldReadOnly, ldCanEnter, ldPendingToday,
    ldf, ldSetDate, ldSetService, ldServiceOptions, ldServicePageNote, ldSetSource, ldSourceOptions,
    ldSetVisitors, ldSetCount, ldSetQualified, ldSetValue, ldSetCampaign, ldCampaignOptions, ldCampaignNote,
    ldSetNotes, ldSave, ldFilterDefs, ldReset, ldReportTitle, ldPeriodBtns, ldReportSummary, ldTrendLabel, ldTrendColor,
    ldReportRows, ldSplit, ldSplitNote, ldSvcRows, ldRows, ldEmpty, ldPg } = vm;
  return (
    <React.Fragment>
{Boolean(okrTabsVisible) && (
<div style={{"display":"inline-flex","background":"var(--surface-50)","border":"1px solid var(--line-300)","borderRadius":"12px","padding":"3px","marginBottom":"16px"}}>
<button onClick={okrGoOkrs} style={cssTextToObject(okrSegOkrsStyle)}>
<Icon name={"target"} style={{"width":"15px","height":"15px"}} />
OKRs & KPIs
</button>
<button onClick={okrGoLeads} style={cssTextToObject(okrSegLeadsStyle)}>
<Icon name={"user-plus"} style={{"width":"15px","height":"15px"}} />
Daily leads
</button>
<button onClick={okrGoPipe} style={cssTextToObject(okrSegPipeStyle)}>
<Icon name={"filter"} style={{"width":"15px","height":"15px"}} />
Lead pipeline
</button>
</div>
)}

{Boolean(okrModPipe) && (
<React.Fragment>
<div style={{"display":"grid","gridTemplateColumns":"repeat(auto-fit,minmax(150px,1fr))","gap":"12px","marginBottom":"16px"}}>
{(pipeStats || []).map((s, $index) => (
<div key={$index} style={{"background":"#fff","border":"1px solid var(--line-300)","borderRadius":"14px","padding":"14px 16px","boxShadow":"var(--shadow-sm)"}}>
<div style={{"fontSize":"11px","fontWeight":"700","letterSpacing":".05em","textTransform":"uppercase","color":"var(--ink-400)"}}>{s.label}</div>
<div style={cssTextToObject(`font-family:'Sora';font-weight:800;font-size:22px;color:${s.color};margin-top:4px`)}>{s.value}</div>
<div style={{"fontSize":"10.5px","color":"var(--ink-400)","marginTop":"2px"}}>{s.sub}</div>
</div>
))}
</div>
<div style={{"background":"#fff","border":"1px solid var(--line-300)","borderRadius":"18px","boxShadow":"var(--shadow-sm)","padding":"18px 20px","marginBottom":"16px"}}>
<div style={{"fontSize":"11.5px","fontWeight":"800","letterSpacing":".06em","textTransform":"uppercase","color":"var(--ink-400)","marginBottom":"14px"}}>Conversion funnel — enquiry → UQL → MQL → SQL → opportunity → won</div>
<div style={{"display":"flex","flexDirection":"column","gap":"11px"}}>
{(pipeFunnel || []).map((f, $index) => (
<div key={$index} style={{"display":"flex","alignItems":"center","gap":"12px"}}>
<span style={{"fontSize":"12.5px","fontWeight":"700","color":"var(--ink-900)","width":"210px","flexShrink":"0"}}>{f.label}</span>
<div style={{"flex":"1","height":"22px","borderRadius":"8px","background":"var(--line-200)","overflow":"hidden"}}>
<div style={cssTextToObject(`height:100%;border-radius:8px;width:${f.w};background:${f.color}`)} />
</div>
<span style={{"fontFamily":"'Sora'","fontWeight":"800","fontSize":"17px","color":"var(--ink-900)","width":"44px","textAlign":"right"}}>{f.value}</span>
<span style={{"fontSize":"11px","color":"var(--ink-500)","width":"150px"}}>{f.sub}</span>
</div>
))}
</div>
</div>
<div style={{"display":"flex","alignItems":"center","gap":"10px","marginBottom":"14px","flexWrap":"wrap"}}>
{(pipeFilterDefs || []).map((f, $index) => (
<div key={$index} style={{"display":"flex","alignItems":"center","gap":"7px","background":"#fff","border":"1px solid var(--line-300)","borderRadius":"11px","padding":"6px 10px"}}>
<span style={{"fontSize":"11.5px","fontWeight":"700","color":"var(--ink-500)"}}>{f.label}</span>
<select value={f.value} onChange={f.onChange} style={{"border":"none","background":"none","fontSize":"13px","fontWeight":"600","color":"var(--beet-700)","outline":"none","cursor":"pointer","maxWidth":"200px"}}>
{(f.options || []).map((o, $i) => (<option key={$i} value={o}>{o}</option>))}
</select>
</div>
))}
<button onClick={pipeReset} style={{"display":"flex","alignItems":"center","gap":"6px","padding":"7px 12px","border":"1px solid var(--line-300)","background":"#fff","borderRadius":"11px","fontSize":"12px","fontWeight":"700","color":"var(--ink-500)","cursor":"pointer"}}>
<Icon name={"rotate-ccw"} style={{"width":"12px","height":"12px"}} />
Reset
</button>
{Boolean(pipeCanWrite) && (
<button onClick={pipeNew} style={{"display":"flex","alignItems":"center","gap":"6px","padding":"8px 15px","border":"none","background":"#7A1C46","color":"#fff","borderRadius":"11px","fontSize":"12.5px","fontWeight":"700","cursor":"pointer","marginLeft":"auto"}}>
<Icon name={"user-plus"} style={{"width":"13px","height":"13px"}} />
Add lead
</button>
)}
{Boolean(pipeReadOnly) && (
<span style={{"marginLeft":"auto","display":"inline-flex","alignItems":"center","gap":"7px","fontSize":"11.5px","fontWeight":"700","color":"var(--ink-500)","background":"var(--surface-50)","border":"1px solid var(--line-200)","padding":"7px 12px","borderRadius":"999px"}}>
<Icon name={"lock"} style={{"width":"12px","height":"12px"}} />
{pipeMaskNote}
</span>
)}
</div>
<div style={{"background":"#fff","border":"1px solid var(--line-300)","borderRadius":"18px","boxShadow":"var(--shadow-sm)","overflow":"hidden"}}>
<div style={{"overflowX":"auto"}}>
<table style={{"width":"100%","borderCollapse":"collapse","minWidth":"1060px"}}>
<thead><tr style={{"background":"var(--surface-50)"}}>
<th style={{"textAlign":"left","padding":"11px 18px","fontSize":"11px","fontWeight":"800","letterSpacing":".06em","textTransform":"uppercase","color":"var(--ink-400)"}}>Lead</th>
<th style={{"textAlign":"left","padding":"11px 16px","fontSize":"11px","fontWeight":"800","letterSpacing":".06em","textTransform":"uppercase","color":"var(--ink-400)"}}>Contact</th>
<th style={{"textAlign":"left","padding":"11px 16px","fontSize":"11px","fontWeight":"800","letterSpacing":".06em","textTransform":"uppercase","color":"var(--ink-400)"}}>Country</th>
<th style={{"textAlign":"left","padding":"11px 16px","fontSize":"11px","fontWeight":"800","letterSpacing":".06em","textTransform":"uppercase","color":"var(--ink-400)"}}>Service requested</th>
<th style={{"textAlign":"left","padding":"11px 16px","fontSize":"11px","fontWeight":"800","letterSpacing":".06em","textTransform":"uppercase","color":"var(--ink-400)"}}>Value</th>
<th style={{"textAlign":"left","padding":"11px 16px","fontSize":"11px","fontWeight":"800","letterSpacing":".06em","textTransform":"uppercase","color":"var(--ink-400)"}}>Owner</th>
<th style={{"textAlign":"left","padding":"11px 18px","fontSize":"11px","fontWeight":"800","letterSpacing":".06em","textTransform":"uppercase","color":"var(--ink-400)"}}>Stage</th>
</tr></thead>
<tbody>
{(pipeRows || []).map((c, $index) => (
<tr key={$index}>
<td onClick={c.open} style={{"padding":"12px 18px","borderBottom":"1px solid var(--line-200)","cursor":"pointer"}}>
<div style={{"fontSize":"13px","fontWeight":"700","color":"var(--ink-900)"}}>{c.name}</div>
<div style={{"fontSize":"10.5px","color":"var(--ink-400)","marginTop":"1px"}}>{c.company} · {c.id}</div>
</td>
<td style={{"padding":"12px 16px","borderBottom":"1px solid var(--line-200)"}}>
<div style={{"fontSize":"11.5px","color":"var(--ink-700)"}}>{c.phoneShown}</div>
<div style={{"fontSize":"11px","color":"var(--ink-500)"}}>{c.emailShown}</div>
</td>
<td style={{"padding":"12px 16px","borderBottom":"1px solid var(--line-200)","fontSize":"12px","color":"var(--ink-700)"}}>{c.country}</td>
<td style={{"padding":"12px 16px","borderBottom":"1px solid var(--line-200)","fontSize":"12px","color":"var(--ink-700)"}}>{c.service}</td>
<td style={{"padding":"12px 16px","borderBottom":"1px solid var(--line-200)","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-900)"}}>{c.value}</td>
<td style={{"padding":"12px 16px","borderBottom":"1px solid var(--line-200)","fontSize":"12px","color":"var(--ink-500)"}}>{c.owner}</td>
<td style={{"padding":"12px 18px","borderBottom":"1px solid var(--line-200)"}}>
<select value={c.stage} onChange={c.setStage} style={cssTextToObject(`padding:5px 9px;border-radius:999px;border:none;font-size:11px;font-weight:700;cursor:pointer;background:${c.stageBg};color:${c.stageColor}`)}>
{(pipeStageOptions || []).map((o, $i) => (<option key={$i} value={o}>{o}</option>))}
</select>
</td>
</tr>
))}
</tbody>
</table>
</div>
{Boolean(pipeEmpty) && (
<div style={{"padding":"40px","textAlign":"center","color":"var(--ink-500)"}}>
<Icon name={"filter-x"} style={{"width":"24px","height":"24px","color":"var(--ink-400)"}} />
<div style={{"fontSize":"13.5px","fontWeight":"600","marginTop":"9px"}}>No leads match these filters.</div>
</div>
)}
{Boolean(pipePg && pipePg.show) && (
<div style={{"display":"flex","alignItems":"center","gap":"10px","padding":"12px 20px","background":"var(--surface-50)","borderTop":"1px solid var(--line-200)"}}>
<span style={{"flex":"1","fontSize":"12px","fontWeight":"600","color":"var(--ink-500)"}}>{pipePg.label}</span>
<button onClick={pipePg.prev} style={cssTextToObject(pipePg.prevStyle)}><Icon name={"chevron-left"} style={{"width":"14px","height":"14px"}} />Prev</button>
<button onClick={pipePg.next} style={cssTextToObject(pipePg.nextStyle)}>Next<Icon name={"chevron-right"} style={{"width":"14px","height":"14px"}} /></button>
</div>
)}
</div>
</React.Fragment>
)}

{Boolean(okrModLeads) && (
<React.Fragment>
<div style={{"display":"grid","gridTemplateColumns":"repeat(auto-fit,minmax(160px,1fr))","gap":"12px","marginBottom":"16px"}}>
{(ldStats || []).map((s, $index) => (
<div key={$index} style={{"background":"#fff","border":"1px solid var(--line-300)","borderRadius":"14px","padding":"14px 16px","boxShadow":"var(--shadow-sm)"}}>
<div style={{"fontSize":"11px","fontWeight":"700","letterSpacing":".05em","textTransform":"uppercase","color":"var(--ink-400)"}}>{s.label}</div>
<div style={cssTextToObject(`font-family:'Sora';font-weight:800;font-size:23px;color:${s.color};margin-top:4px`)}>{s.value}</div>
<div style={{"fontSize":"10.5px","color":"var(--ink-400)","marginTop":"2px"}}>{s.sub}</div>
</div>
))}
</div>
<div style={{"background":"var(--beet-700)","borderRadius":"16px","padding":"16px 20px","color":"#fff","marginBottom":"16px"}}>
<div style={{"display":"flex","alignItems":"center","gap":"12px","marginBottom":"9px"}}>
<Icon name={"target"} style={{"width":"16px","height":"16px","color":"var(--orchid-300)"}} />
<span style={{"fontSize":"13px","fontWeight":"700","flex":"1"}}>Daily lead KPI — today</span>
<span style={{"fontFamily":"'Sora'","fontWeight":"800","fontSize":"18px"}}>{ldTodayPct}</span>
</div>
<div style={{"height":"8px","borderRadius":"99px","background":"rgba(255,255,255,.14)","overflow":"hidden"}}>
<div style={cssTextToObject(`height:100%;border-radius:99px;width:${ldTodayW};background:${ldTodayColor}`)} />
</div>
<div style={{"fontSize":"11.5px","color":"rgba(255,255,255,.75)","marginTop":"6px"}}>{ldTodayNote}</div>
</div>
{Boolean(ldReadOnly) && (
<div style={{"display":"flex","alignItems":"center","gap":"9px","background":"var(--surface-50)","border":"1px solid var(--line-200)","color":"var(--ink-500)","padding":"11px 14px","borderRadius":"12px","fontSize":"12px","fontWeight":"600","marginBottom":"16px"}}>
<Icon name={"eye"} style={{"width":"14px","height":"14px","flexShrink":"0","color":"var(--orchid-600)"}} />
View only — lead volumes and service performance are visible to you; entry and contact details are restricted to Admin and Manager.
</div>
)}
{Boolean(ldCanEnter) && (
<div style={{"background":"#fff","border":"1px solid var(--line-300)","borderRadius":"18px","boxShadow":"var(--shadow-sm)","padding":"18px 20px","marginBottom":"16px"}}>
<div style={{"display":"flex","alignItems":"center","gap":"8px","marginBottom":"12px"}}>
<Icon name={"plus-circle"} style={{"width":"15px","height":"15px","color":"var(--orchid-600)"}} />
<span style={{"fontSize":"12.5px","fontWeight":"800","color":"var(--beet-700)"}}>Log leads — daily entry against a service</span>
{Boolean(ldPendingToday) && (
<span style={{"fontSize":"10.5px","fontWeight":"700","padding":"3px 10px","borderRadius":"999px","background":"var(--warn-100)","color":"var(--warn-600)"}}>Pending for today</span>
)}
</div>
<div style={{"display":"grid","gridTemplateColumns":"repeat(4,1fr)","gap":"10px","marginBottom":"10px"}}>
<div><label style={{"display":"block","fontSize":"11px","fontWeight":"700","color":"var(--ink-500)","marginBottom":"4px"}}>Date</label>
<input type="date" value={ldf.date||''} onInput={ldSetDate} style={{"width":"100%","minWidth":"0","padding":"9px 11px","border":"1px solid var(--line-300)","borderRadius":"10px","fontSize":"12.5px","outline":"none","color":"var(--ink-700)"}} /></div>
<div style={{"gridColumn":"span 2"}}><label style={{"display":"block","fontSize":"11px","fontWeight":"700","color":"var(--ink-500)","marginBottom":"4px"}}>Service <span style={{"color":"var(--danger-600)"}}>*</span></label>
<select value={ldf.service||''} onChange={ldSetService} style={{"width":"100%","minWidth":"0","padding":"9px 11px","border":"1px solid var(--line-300)","borderRadius":"10px","fontSize":"12.5px","background":"#fff"}}>
<option value="">Select service page…</option>
{(ldServiceOptions || []).map((o, $i) => (<option key={$i} value={o.v}>{o.label}</option>))}
</select>
<div style={{"display":"flex","alignItems":"center","gap":"5px","marginTop":"4px","fontSize":"10.5px","fontWeight":"600","color":"var(--orchid-700)"}}>
<Icon name={"link-2"} style={{"width":"10px","height":"10px","flexShrink":"0"}} />
{ldServicePageNote}
</div>
</div>
<div><label style={{"display":"block","fontSize":"11px","fontWeight":"700","color":"var(--ink-500)","marginBottom":"4px"}}>Source</label>
<select value={ldf.source||''} onChange={ldSetSource} style={{"width":"100%","minWidth":"0","padding":"9px 11px","border":"1px solid var(--line-300)","borderRadius":"10px","fontSize":"12.5px","background":"#fff"}}>
{(ldSourceOptions || []).map((o, $i) => (<option key={$i} value={o}>{o}</option>))}
</select></div>
</div>
<div style={{"display":"grid","gridTemplateColumns":".7fr .6fr .6fr .8fr 1.2fr","gap":"10px","marginBottom":"10px"}}>
<div><label style={{"display":"block","fontSize":"11px","fontWeight":"700","color":"var(--ink-500)","marginBottom":"4px"}}>Visitors</label>
<input value={ldf.visitors||''} onInput={ldSetVisitors} placeholder="0" style={{"width":"100%","minWidth":"0","padding":"9px 11px","border":"1px solid var(--line-300)","borderRadius":"10px","fontSize":"12.5px","outline":"none"}} /></div>
<div><label style={{"display":"block","fontSize":"11px","fontWeight":"700","color":"var(--ink-500)","marginBottom":"4px"}}>Leads <span style={{"color":"var(--danger-600)"}}>*</span></label>
<input value={ldf.count||''} onInput={ldSetCount} placeholder="0" style={{"width":"100%","minWidth":"0","padding":"9px 11px","border":"1px solid var(--line-300)","borderRadius":"10px","fontSize":"12.5px","outline":"none"}} /></div>
<div><label style={{"display":"block","fontSize":"11px","fontWeight":"700","color":"var(--ink-500)","marginBottom":"4px"}}>Qualified</label>
<input value={ldf.qualified||''} onInput={ldSetQualified} placeholder="0" style={{"width":"100%","minWidth":"0","padding":"9px 11px","border":"1px solid var(--line-300)","borderRadius":"10px","fontSize":"12.5px","outline":"none"}} /></div>
<div><label style={{"display":"block","fontSize":"11px","fontWeight":"700","color":"var(--ink-500)","marginBottom":"4px"}}>Est. value</label>
<input value={ldf.value||''} onInput={ldSetValue} placeholder="₹1,20,000" style={{"width":"100%","minWidth":"0","padding":"9px 11px","border":"1px solid var(--line-300)","borderRadius":"10px","fontSize":"12.5px","outline":"none"}} /></div>
<div><label style={{"display":"block","fontSize":"11px","fontWeight":"700","color":"var(--ink-500)","marginBottom":"4px"}}>Campaign</label>
<select value={ldf.campaign||''} onChange={ldSetCampaign} style={{"width":"100%","minWidth":"0","padding":"9px 11px","border":"1px solid var(--line-300)","borderRadius":"10px","fontSize":"12.5px","background":"#fff"}}>
{(ldCampaignOptions || []).map((o, $i) => (<option key={$i} value={o}>{o}</option>))}
</select>
<div style={{"display":"flex","alignItems":"center","gap":"4px","marginTop":"4px","fontSize":"10px","fontWeight":"600","color":"var(--orchid-700)"}}>
<Icon name={"link-2"} style={{"width":"10px","height":"10px","flexShrink":"0"}} />
{ldCampaignNote}
</div>
</div>
</div>
<div style={{"display":"flex","gap":"10px","alignItems":"flex-end"}}>
<div style={{"flex":"1"}}><label style={{"display":"block","fontSize":"11px","fontWeight":"700","color":"var(--ink-500)","marginBottom":"4px"}}>Notes</label>
<input value={ldf.notes||''} onInput={ldSetNotes} placeholder="Where the enquiry came from, what they asked for…" style={{"width":"100%","minWidth":"0","padding":"9px 11px","border":"1px solid var(--line-300)","borderRadius":"10px","fontSize":"12.5px","outline":"none"}} /></div>
<button onClick={ldSave} style={{"display":"flex","alignItems":"center","gap":"7px","padding":"10px 18px","border":"none","background":"#7A1C46","color":"#fff","borderRadius":"11px","fontSize":"13px","fontWeight":"700","cursor":"pointer","flexShrink":"0"}}>
<Icon name={"check"} style={{"width":"14px","height":"14px"}} />
Log leads
</button>
</div>
</div>
)}
<div style={{"display":"flex","alignItems":"center","gap":"10px","marginBottom":"14px","flexWrap":"wrap"}}>
{(ldFilterDefs || []).map((f, $index) => (
<div key={$index} style={{"display":"flex","alignItems":"center","gap":"7px","background":"#fff","border":"1px solid var(--line-300)","borderRadius":"11px","padding":"6px 10px"}}>
<span style={{"fontSize":"11.5px","fontWeight":"700","color":"var(--ink-500)"}}>{f.label}</span>
<select value={f.value} onChange={f.onChange} style={{"border":"none","background":"none","fontSize":"13px","fontWeight":"600","color":"var(--beet-700)","outline":"none","cursor":"pointer","maxWidth":"210px"}}>
{(f.options || []).map((o, $i) => (<option key={$i} value={o}>{o}</option>))}
</select>
</div>
))}
<button onClick={ldReset} style={{"display":"flex","alignItems":"center","gap":"6px","padding":"7px 12px","border":"1px solid var(--line-300)","background":"#fff","borderRadius":"11px","fontSize":"12px","fontWeight":"700","color":"var(--ink-500)","cursor":"pointer"}}>
<Icon name={"rotate-ccw"} style={{"width":"12px","height":"12px"}} />
Reset
</button>
</div>
<div style={{"background":"#fff","border":"1px solid var(--line-300)","borderRadius":"18px","boxShadow":"var(--shadow-sm)","padding":"18px 20px","marginBottom":"16px"}}>
<div style={{"display":"flex","alignItems":"center","gap":"10px","marginBottom":"6px","flexWrap":"wrap"}}>
<span style={{"fontSize":"11.5px","fontWeight":"800","letterSpacing":".06em","textTransform":"uppercase","color":"var(--ink-400)","flex":"1"}}>{ldReportTitle}</span>
{(ldPeriodBtns || []).map((p, $i) => (<button key={$i} onClick={p.set} style={cssTextToObject(p.style)}>{p.label}</button>))}
</div>
<div style={{"display":"flex","alignItems":"center","gap":"12px","marginBottom":"14px","flexWrap":"wrap"}}>
<span style={{"fontSize":"12.5px","color":"var(--ink-700)"}}>{ldReportSummary}</span>
<span style={cssTextToObject(`font-size:12px;font-weight:800;color:${ldTrendColor}`)}>{ldTrendLabel}</span>
</div>
<div style={{"display":"flex","flexDirection":"column","gap":"13px"}}>
{(ldReportRows || []).map((r, $index) => (
<div key={$index}>
<div style={{"display":"flex","alignItems":"center","gap":"10px","marginBottom":"5px","flexWrap":"wrap"}}>
<span style={{"fontSize":"12.5px","fontWeight":"700","color":"var(--ink-900)","minWidth":"96px"}}>{r.label}</span>
<span style={cssTextToObject(`font-size:10.5px;font-weight:700;padding:2px 9px;border-radius:999px;background:${r.badgeBg};color:${r.badgeColor}`)}>{r.badge}</span>
<span style={{"fontSize":"11px","color":"var(--ink-500)","flex":"1","minWidth":"0"}}>{r.entriesLabel} · {r.targetLabel}</span>
<span style={{"fontSize":"11px","color":"var(--verify-600)","fontWeight":"700"}}>{r.qualifiedLabel} qualified · {r.rate}</span>
<span style={{"fontFamily":"'Sora'","fontWeight":"800","fontSize":"16px","color":"var(--ink-900)","width":"44px","textAlign":"right"}}>{r.countLabel}</span>
</div>
<div style={{"height":"8px","borderRadius":"99px","background":"var(--line-200)","overflow":"hidden"}}>
<div style={cssTextToObject(`height:100%;border-radius:99px;width:${r.w};background:${r.color}`)} />
</div>
<div style={{"display":"flex","gap":"14px","fontSize":"10.5px","color":"var(--ink-400)","marginTop":"3px"}}><span>Top service: {r.top}</span><span>Top source: {r.topSrc}</span></div>
</div>
))}
</div>
</div>
<div style={{"display":"grid","gridTemplateColumns":"1fr 1fr","gap":"14px","marginBottom":"16px"}}>
{(ldSplit || []).map((g, $index) => (
<div key={$index} style={{"background":"#fff","border":"1px solid var(--line-300)","borderRadius":"18px","boxShadow":"var(--shadow-sm)","padding":"18px 20px"}}>
<div style={{"fontSize":"12.5px","fontWeight":"800","color":"var(--beet-700)","marginBottom":"10px"}}>{g.label}</div>
<div style={{"display":"flex","alignItems":"baseline","gap":"14px","marginBottom":"8px"}}>
<div><div style={{"fontSize":"10.5px","fontWeight":"700","textTransform":"uppercase","letterSpacing":".05em","color":"var(--ink-400)"}}>Visitors</div><div style={{"fontFamily":"'Sora'","fontWeight":"800","fontSize":"20px","color":"var(--info-600)"}}>{g.visitors}</div></div>
<div><div style={{"fontSize":"10.5px","fontWeight":"700","textTransform":"uppercase","letterSpacing":".05em","color":"var(--ink-400)"}}>Leads</div><div style={{"fontFamily":"'Sora'","fontWeight":"800","fontSize":"20px","color":"var(--ink-900)"}}>{g.leads}</div></div>
<div><div style={{"fontSize":"10.5px","fontWeight":"700","textTransform":"uppercase","letterSpacing":".05em","color":"var(--ink-400)"}}>Qualified</div><div style={{"fontFamily":"'Sora'","fontWeight":"800","fontSize":"20px","color":"var(--verify-600)"}}>{g.qualified}</div></div>
<div><div style={{"fontSize":"10.5px","fontWeight":"700","textTransform":"uppercase","letterSpacing":".05em","color":"var(--ink-400)"}}>CVR</div><div style={{"fontFamily":"'Sora'","fontWeight":"800","fontSize":"20px","color":"var(--orchid-600)"}}>{g.cvr}</div></div>
</div>
<div style={{"height":"7px","borderRadius":"99px","background":"var(--line-200)","overflow":"hidden"}}>
<div style={cssTextToObject(`height:100%;border-radius:99px;width:${g.w};background:${g.color}`)} />
</div>
<div style={{"fontSize":"10.5px","color":"var(--ink-400)","marginTop":"4px"}}>{g.share}</div>
{Boolean(g.hasPages) && (
<div style={{"borderTop":"1px solid var(--line-200)","marginTop":"11px","paddingTop":"10px","display":"flex","flexDirection":"column","gap":"9px"}}>
{(g.pages || []).map((p, $pi) => (
<div key={$pi}>
<div style={{"display":"flex","alignItems":"center","gap":"8px"}}>
<span style={{"fontSize":"12.5px","fontWeight":"700","color":"var(--ink-900)","flex":"1","minWidth":"0"}}>{p.name}</span>
<span style={{"fontSize":"11px","color":"var(--info-600)","fontWeight":"700"}}>{p.visitors} visitors</span>
<span style={{"fontSize":"11px","color":"var(--ink-900)","fontWeight":"800"}}>{p.leadsLabel}</span>
<span style={{"fontSize":"11px","fontWeight":"700","color":"var(--orchid-700)"}}>{p.cvr}</span>
</div>
<div style={{"display":"flex","alignItems":"center","gap":"8px","marginTop":"2px"}}>
<span style={{"fontFamily":"'Space Mono'","fontSize":"10px","color":"var(--ink-400)"}}>{p.url}</span>
<span style={{"fontSize":"10.5px","color":"var(--ink-500)"}}>{p.why}</span>
<span style={{"fontSize":"10.5px","fontWeight":"700","color":"var(--verify-600)"}}>{p.expected}</span>
</div>
</div>
))}
</div>
)}
{Boolean(g.noPages) && (
<div style={{"borderTop":"1px solid var(--line-200)","marginTop":"11px","paddingTop":"12px","fontSize":"11.5px","color":"var(--ink-500)","textAlign":"center"}}>{g.empty}</div>
)}
</div>
))}
</div>
<div style={{"display":"flex","alignItems":"center","gap":"9px","background":"var(--surface-50)","border":"1px solid var(--line-200)","borderRadius":"12px","padding":"11px 14px","fontSize":"12px","color":"var(--ink-500)","marginBottom":"16px"}}>
<Icon name={"info"} style={{"width":"14px","height":"14px","flexShrink":"0","color":"var(--orchid-600)"}} />
<span>{ldSplitNote}</span>
</div>
<div style={{"background":"#fff","border":"1px solid var(--line-300)","borderRadius":"18px","boxShadow":"var(--shadow-sm)","padding":"18px 20px","marginBottom":"16px"}}>
<div style={{"fontSize":"11.5px","fontWeight":"800","letterSpacing":".06em","textTransform":"uppercase","color":"var(--ink-400)","marginBottom":"14px"}}>Leads by service</div>
<div style={{"display":"flex","flexDirection":"column","gap":"13px"}}>
{(ldSvcRows || []).map((s, $index) => (
<div key={$index}>
<div style={{"display":"flex","alignItems":"center","gap":"10px","marginBottom":"5px"}}>
<span style={{"fontSize":"13px","fontWeight":"700","color":"var(--ink-900)","flex":"1","minWidth":"0"}}>{s.label}</span>
<span style={{"fontSize":"11px","color":"var(--ink-500)"}}>{s.entries}</span>
<span style={{"fontSize":"11px","color":"var(--info-600)","fontWeight":"700"}}>{s.visitors}</span>
<span style={{"fontSize":"11px","color":"var(--verify-600)","fontWeight":"700"}}>{s.qualified}</span>
<span style={{"fontSize":"11px","fontWeight":"700","color":"var(--orchid-700)"}}>{s.cvr}</span>
<span style={{"fontFamily":"'Sora'","fontWeight":"800","fontSize":"15px","color":"var(--ink-900)","width":"40px","textAlign":"right"}}>{s.count}</span>
</div>
<div style={{"height":"8px","borderRadius":"99px","background":"var(--line-200)","overflow":"hidden"}}>
<div style={cssTextToObject(`height:100%;border-radius:99px;width:${s.w};background:${s.color}`)} />
</div>
<div style={{"display":"flex","alignItems":"center","gap":"8px","fontSize":"10.5px","color":"var(--ink-400)","marginTop":"3px"}}><span>{s.rate}</span><span style={{"fontFamily":"'Space Mono'"}}>{s.pageUrl}</span></div>
</div>
))}
</div>
</div>
<div style={{"background":"#fff","border":"1px solid var(--line-300)","borderRadius":"18px","boxShadow":"var(--shadow-sm)","overflow":"hidden"}}>
<div style={{"overflowX":"auto"}}>
<table style={{"width":"100%","borderCollapse":"collapse","minWidth":"1120px"}}>
<thead><tr style={{"background":"var(--surface-50)"}}>
<th style={{"textAlign":"left","padding":"11px 18px","fontSize":"11px","fontWeight":"800","letterSpacing":".06em","textTransform":"uppercase","color":"var(--ink-400)"}}>Date</th>
<th style={{"textAlign":"left","padding":"11px 16px","fontSize":"11px","fontWeight":"800","letterSpacing":".06em","textTransform":"uppercase","color":"var(--ink-400)"}}>Service</th>
<th style={{"textAlign":"left","padding":"11px 16px","fontSize":"11px","fontWeight":"800","letterSpacing":".06em","textTransform":"uppercase","color":"var(--ink-400)"}}>Source</th>
<th style={{"textAlign":"left","padding":"11px 16px","fontSize":"11px","fontWeight":"800","letterSpacing":".06em","textTransform":"uppercase","color":"var(--ink-400)"}}>Visitors</th>
<th style={{"textAlign":"left","padding":"11px 16px","fontSize":"11px","fontWeight":"800","letterSpacing":".06em","textTransform":"uppercase","color":"var(--ink-400)"}}>Leads</th>
<th style={{"textAlign":"left","padding":"11px 16px","fontSize":"11px","fontWeight":"800","letterSpacing":".06em","textTransform":"uppercase","color":"var(--ink-400)"}}>Qualified</th>
<th style={{"textAlign":"left","padding":"11px 16px","fontSize":"11px","fontWeight":"800","letterSpacing":".06em","textTransform":"uppercase","color":"var(--ink-400)"}}>Est. value</th>
<th style={{"textAlign":"left","padding":"11px 16px","fontSize":"11px","fontWeight":"800","letterSpacing":".06em","textTransform":"uppercase","color":"var(--ink-400)"}}>Logged by</th>
<th style={{"textAlign":"left","padding":"11px 16px","fontSize":"11px","fontWeight":"800","letterSpacing":".06em","textTransform":"uppercase","color":"var(--ink-400)"}}>Notes</th>
<th style={{"textAlign":"left","padding":"11px 18px","fontSize":"11px","fontWeight":"800","letterSpacing":".06em","textTransform":"uppercase","color":"var(--ink-400)"}}>Lead details</th>
</tr></thead>
<tbody>
{(ldRows || []).map((l, $index) => (
<tr key={$index}>
<td style={{"padding":"12px 18px","borderBottom":"1px solid var(--line-200)"}}><span style={cssTextToObject(`font-size:11px;font-weight:700;padding:3px 10px;border-radius:999px;background:${l.dateBg};color:${l.dateColor}`)}>{l.date}</span></td>
<td style={{"padding":"12px 16px","borderBottom":"1px solid var(--line-200)"}}>
<div style={{"fontSize":"12.5px","fontWeight":"700","color":"var(--ink-900)"}}>{l.service}</div>
{Boolean(l.hasPage) && (
<button onClick={l.openPage} style={{"display":"flex","alignItems":"center","gap":"4px","marginTop":"2px","padding":"0","border":"none","background":"none","fontFamily":"'Space Mono'","fontSize":"10px","fontWeight":"700","color":"var(--orchid-600)","cursor":"pointer"}}>
<Icon name={"link-2"} style={{"width":"10px","height":"10px"}} />
{l.pageUrl}
</button>
)}
</td>
<td style={{"padding":"12px 16px","borderBottom":"1px solid var(--line-200)","fontSize":"12px","color":"var(--ink-500)"}}>{l.source}</td>
<td style={{"padding":"12px 16px","borderBottom":"1px solid var(--line-200)","fontSize":"12.5px","color":"var(--info-600)","fontWeight":"700"}}>{l.visitorsLabel}</td>
<td style={{"padding":"12px 16px","borderBottom":"1px solid var(--line-200)","fontFamily":"'Sora'","fontSize":"14px","fontWeight":"800","color":"var(--ink-900)"}}>{l.countLabel}</td>
<td style={{"padding":"12px 16px","borderBottom":"1px solid var(--line-200)","fontSize":"12.5px","fontWeight":"700","color":"var(--verify-600)"}}>{l.qualifiedLabel}</td>
<td style={{"padding":"12px 16px","borderBottom":"1px solid var(--line-200)","fontSize":"12.5px","color":"var(--ink-700)"}}>{l.value}</td>
<td style={{"padding":"12px 16px","borderBottom":"1px solid var(--line-200)","fontSize":"12px","color":"var(--ink-700)"}}>{l.who}</td>
<td style={{"padding":"12px 16px","borderBottom":"1px solid var(--line-200)","fontSize":"11.5px","color":"var(--ink-500)"}}>{l.notes}</td>
<td style={{"padding":"12px 18px","borderBottom":"1px solid var(--line-200)"}}>
<div style={{"display":"flex","alignItems":"center","gap":"7px","flexWrap":"wrap"}}>
<span style={cssTextToObject(`font-size:10.5px;font-weight:700;padding:3px 9px;border-radius:999px;background:${l.detailBg};color:${l.detailColor}`)}>{l.detailCount}</span>
<button onClick={l.addDetail} style={{"display":"inline-flex","alignItems":"center","gap":"4px","padding":"4px 10px","border":"1px solid var(--line-300)","background":"#fff","color":"var(--ink-700)","borderRadius":"8px","fontSize":"10.5px","fontWeight":"700","cursor":"pointer"}}>
<Icon name={"user-plus"} style={{"width":"10px","height":"10px"}} />
{l.detailLabel}
</button>
</div>
{Boolean(l.hasContacts) && (
<div style={{"display":"flex","flexWrap":"wrap","gap":"5px","marginTop":"5px"}}>
{(l.contactNames || []).map((n, $ni) => (
<button key={$ni} onClick={n.open} style={cssTextToObject(`display:inline-flex;align-items:center;gap:5px;padding:3px 8px;border:none;border-radius:7px;font-size:10.5px;font-weight:700;cursor:pointer;background:${n.bg};color:${n.color}`)}>{n.name} · {n.stage}</button>
))}
</div>
)}
</td>
</tr>
))}
</tbody>
</table>
</div>
{Boolean(ldEmpty) && (
<div style={{"padding":"40px","textAlign":"center","color":"var(--ink-500)"}}>
<Icon name={"user-plus"} style={{"width":"24px","height":"24px","color":"var(--ink-400)"}} />
<div style={{"fontSize":"13.5px","fontWeight":"600","marginTop":"9px"}}>No leads logged for this range.</div>
</div>
)}
{Boolean(ldPg && ldPg.show) && (
<div style={{"display":"flex","alignItems":"center","gap":"10px","padding":"12px 20px","background":"var(--surface-50)","borderTop":"1px solid var(--line-200)"}}>
<span style={{"flex":"1","fontSize":"12px","fontWeight":"600","color":"var(--ink-500)"}}>{ldPg.label}</span>
<button onClick={ldPg.prev} style={cssTextToObject(ldPg.prevStyle)}><Icon name={"chevron-left"} style={{"width":"14px","height":"14px"}} />Prev</button>
<button onClick={ldPg.next} style={cssTextToObject(ldPg.nextStyle)}>Next<Icon name={"chevron-right"} style={{"width":"14px","height":"14px"}} /></button>
</div>
)}
</div>
</React.Fragment>
)}
    </React.Fragment>
  );
}
