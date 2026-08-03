import React from 'react';
import Icon from '../../components/Icon.jsx';
import { cssTextToObject } from '../../utils/cssText.js';

export default function TaskDetailDrawer({ vm }) {
  const { stop, tkActions, tkActivity, tkAddCommentFile, tkAttach, tkCanAttach, tkCanComment, tkChecklist, tkClose, tkCommentFiles, tkCommentVal, tkComments, tkD, tkDrawerOpen, tkEvidence, tkFb, tkFbBg, tkFbBorder, tkFbColor, tkHasActions, tkHasChain, tkHasCommentFiles, tkHasComments, tkHasEvidence, tkHasFb, tkKpiNote, tkMeta, tkOnComment, tkPostComment, tkQcAddFile, tkQcApprove, tkQcFbVal, tkQcFiles, tkQcHasFiles, tkQcOnFb, tkQcOnUrl, tkQcPanel, tkQcRework, tkQcUrl, tkStages,
    clHas, clKind, clStatusNote, clProgress, clProgressW, clSubmitted, clQcSummary, clSections, clVerdictOptions,
    clCanSubmit, clSubmit, clCanReopen, clReopen, clQcShowBulk, clQcCoverage, clQcCoverageW, clAcceptAll,
    tkStatusCanSet, tkStatusOptions, tkStatusVal, tkSetStatusSel, tkStatusHint,
    tkQcDigestHas, tkQcVerdictLine, tkQcOverall, tkQcLines, tkQcHasLines, tkQcCoverage, tkQcW,
    tmCanTrack, tmElapsed, tmDotStyle, tmStatus, tmToggle, tmBtnStyle, tmIcon, tmLabel, tmProgressW, tmTotalLabel, tmHasSessions, tmSessions } = vm;
  return (
    <React.Fragment>
{Boolean(tkDrawerOpen) && (
<React.Fragment>

  
<div onClick={tkClose} style={{"position":"fixed","inset":"0","background":"rgba(31,8,20,.5)","backdropFilter":"blur(3px)","zIndex":"160","display":"flex","justifyContent":"flex-end"}}>

    
<div onClick={stop} className="blscroll" style={{"width":"100%","height":"100%","background":"#fff","overflowY":"auto","animation":"blrise .3s var(--ease-out)"}}>

      
<div style={{"position":"sticky","top":"0","background":"#fff","borderBottom":"1px solid var(--line-200)","padding":"18px max(24px,calc((100% - 1040px)/2))","zIndex":"3"}}>

        
<div style={{"display":"flex","alignItems":"flex-start","justifyContent":"space-between","gap":"12px"}}>

          
<div style={{"minWidth":"0"}}>

            
<div style={{"display":"flex","alignItems":"center","gap":"8px"}}>
<span style={{"fontFamily":"'Space Mono'","fontSize":"11.5px","color":"var(--ink-400)"}}>
{tkD.id}
</span>
<span style={cssTextToObject(`font-size:11px;font-weight:700;padding:3px 10px;border-radius:999px;background:${tkD.statusBg};color:${tkD.statusColor}`)}>
{tkD.status}
</span>
</div>

            
<h3 style={{"fontFamily":"'Sora'","fontWeight":"700","fontSize":"19px","color":"var(--beet-700)","margin":"6px 0 0"}}>
{tkD.name}
</h3>

          
</div>

          
<button onClick={tkClose} style={{"width":"34px","height":"34px","borderRadius":"10px","border":"1px solid var(--line-300)","background":"#fff","cursor":"pointer","display":"flex","alignItems":"center","justifyContent":"center","flexShrink":"0"}}>
<Icon name={"x"} style={{"width":"17px","height":"17px","color":"var(--ink-700)"}} />
</button>


</div>


{Boolean(tkStatusCanSet) && (
<React.Fragment>


<div style={{"display":"flex","alignItems":"center","gap":"9px","marginTop":"12px","flexWrap":"wrap"}}>
<span style={{"fontSize":"11.5px","fontWeight":"700","color":"var(--ink-500)"}}>
Status
</span>
<select value={tkStatusVal} onChange={tkSetStatusSel} style={{"padding":"8px 12px","border":"1px solid var(--line-300)","borderRadius":"10px","fontSize":"12.5px","fontWeight":"700","color":"var(--beet-700)","background":"#fff","cursor":"pointer"}}>
{(tkStatusOptions || []).map((o, $index) => (
<option key={$index} value={o}>{o}</option>
))}
</select>
<span style={{"fontSize":"10.5px","color":"var(--ink-400)","flex":"1","minWidth":"140px"}}>
{tkStatusHint}
</span>
</div>


</React.Fragment>
)}


{Boolean(tkHasActions) && (
<React.Fragment>

          
<div style={{"display":"flex","gap":"8px","marginTop":"12px","flexWrap":"wrap"}}>

            
{(tkActions || []).map((a, $index) => (
<React.Fragment key={$index}>
<button onClick={a.go} style={cssTextToObject(a.style)}>
<Icon name={a.icon} style={{"width":"15px","height":"15px"}} />
{a.label}
</button>
</React.Fragment>
))}

          
</div>

        
</React.Fragment>
)}

      
</div>

      
<div style={{"padding":"20px max(24px,calc((100% - 1040px)/2)) 40px","display":"flex","flexDirection":"column","gap":"20px"}}>


{Boolean(tkQcDigestHas) && (
<React.Fragment>


<div style={{"background":"#fff","border":"1px solid var(--line-300)","borderRadius":"16px","boxShadow":"var(--shadow-sm)","padding":"15px 18px"}}>
<div style={{"display":"flex","alignItems":"center","gap":"9px","marginBottom":"10px","flexWrap":"wrap"}}>
<Icon name={"message-square-quote"} style={{"width":"15px","height":"15px","color":"var(--orchid-600)","flexShrink":"0"}} />
<span style={{"fontSize":"12.5px","fontWeight":"800","color":"var(--beet-700)","flex":"1","minWidth":"140px"}}>
QC review outcome
</span>
<span style={{"fontSize":"11px","fontWeight":"700","color":"var(--orchid-700)"}}>
{tkQcVerdictLine}
</span>
</div>
<div style={{"height":"6px","borderRadius":"99px","background":"var(--line-200)","overflow":"hidden","marginBottom":"9px"}}>
<div style={cssTextToObject(`height:100%;border-radius:99px;width:${tkQcW};background:var(--orchid-500)`)} />
</div>
<div style={{"fontSize":"10.5px","color":"var(--ink-400)","marginBottom":"10px"}}>
{tkQcCoverage}
</div>
<div style={{"background":"var(--surface-50)","border":"1px solid var(--line-200)","borderRadius":"11px","padding":"11px 13px","fontSize":"12.5px","color":"var(--ink-700)","lineHeight":"1.5"}}>
{tkQcOverall}
</div>
{Boolean(tkQcHasLines) && (
<React.Fragment>
<div style={{"display":"flex","flexDirection":"column","gap":"7px","marginTop":"10px"}}>
{(tkQcLines || []).map((c, $index) => (
<div key={$index} style={{"display":"flex","alignItems":"flex-start","gap":"8px"}}>
<span style={cssTextToObject(`font-size:9.5px;font-weight:800;padding:2px 8px;border-radius:6px;background:${c.bg};color:${c.color};flex-shrink:0`)}>
{c.verdict}
</span>
<span style={{"fontSize":"12px","color":"var(--ink-700)","lineHeight":"1.45"}}>
<span style={{"fontWeight":"700","color":"var(--ink-900)"}}>{c.kpi}</span> — {c.text}
</span>
</div>
))}
</div>
</React.Fragment>
)}
</div>


</React.Fragment>
)}


{Boolean(tkQcPanel) && (
<React.Fragment>

          
<div style={{"background":"var(--warn-100)","border":"1px solid #F0DDBB","borderRadius":"16px","padding":"16px 18px"}}>

            
<div style={{"display":"flex","alignItems":"center","gap":"8px","marginBottom":"11px"}}>
<Icon name={"shield-check"} style={{"width":"16px","height":"16px","color":"var(--warn-600)"}} />
<span style={{"fontFamily":"'Sora'","fontWeight":"700","fontSize":"14px","color":"var(--beet-700)"}}>
QC review — this task is awaiting your decision
</span>
</div>

            
<textarea value={tkQcFbVal} onInput={tkQcOnFb} rows="2" placeholder="QC comments / feedback — what's good, what must change (required for rework)…" style={{"width":"100%","padding":"11px 13px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","outline":"none","resize":"vertical","background":"#fff"}} />

            
<div style={{"display":"flex","alignItems":"center","gap":"8px","marginTop":"10px","flexWrap":"wrap"}}>

              
<div style={{"position":"relative","flex":"1","minWidth":"200px"}}>
<Icon name={"link"} style={{"width":"14px","height":"14px","color":"var(--ink-400)","position":"absolute","left":"11px","top":"11px"}} />
<input value={tkQcUrl} onInput={tkQcOnUrl} placeholder="Reference URL — e.g. https://healthline.com/… (style / structure to follow)" style={{"width":"100%","padding":"9px 12px 9px 33px","border":"1px solid var(--line-300)","borderRadius":"10px","fontSize":"12.5px","outline":"none","background":"#fff","fontFamily":"'Space Mono'"}} />
</div>

              
<button onClick={tkQcAddFile} style={{"display":"flex","alignItems":"center","gap":"6px","background":"#fff","border":"1px solid var(--line-300)","color":"var(--ink-700)","borderRadius":"10px","padding":"9px 13px","fontSize":"12.5px","fontWeight":"700","cursor":"pointer"}}>
<Icon name={"image-plus"} style={{"width":"14px","height":"14px"}} />
Attach reference image
</button>

            
</div>

            
{Boolean(tkQcHasFiles) && (
<React.Fragment>

              
<div style={{"display":"flex","flexWrap":"wrap","gap":"6px","marginTop":"9px"}}>

                
{(tkQcFiles || []).map((f, $index) => (
<React.Fragment key={$index}>
<span style={{"display":"inline-flex","alignItems":"center","gap":"6px","fontSize":"11.5px","fontWeight":"600","padding":"5px 8px 5px 10px","borderRadius":"999px","background":"#fff","border":"1px solid var(--line-300)","color":"var(--ink-700)"}}>
<Icon name={"image"} style={{"width":"11px","height":"11px"}} />
<button onClick={f.open} style={{"background":"none","border":"none","padding":"0","cursor":"pointer","color":"var(--ink-700)","font":"inherit"}}>{f.name}</button>
<button onClick={f.remove} style={{"background":"none","border":"none","cursor":"pointer","color":"var(--ink-500)","display":"flex","padding":"0"}}>
<Icon name={"x"} style={{"width":"12px","height":"12px"}} />
</button>
</span>
</React.Fragment>
))}

              
</div>

            
</React.Fragment>
)}

            
<div style={{"display":"flex","alignItems":"center","gap":"8px","marginTop":"12px"}}>

              
<span style={{"flex":"1","fontSize":"11.5px","color":"var(--ink-500)"}}>
Comments & references are posted to the task thread so the assignee sees exactly what to refer to.
</span>

              
<button onClick={tkQcRework} style={{"display":"flex","alignItems":"center","gap":"6px","padding":"10px 15px","border":"1px solid var(--warn-500)","background":"#fff","color":"var(--warn-600)","borderRadius":"11px","fontSize":"13px","fontWeight":"700","cursor":"pointer"}}>
<Icon name={"rotate-ccw"} style={{"width":"14px","height":"14px"}} />
Request rework
</button>

              
<button onClick={tkQcApprove} style={{"display":"flex","alignItems":"center","gap":"6px","padding":"10px 16px","border":"none","background":"var(--verify-500)","color":"#fff","borderRadius":"11px","fontSize":"13px","fontWeight":"700","cursor":"pointer"}}>
<Icon name={"check"} style={{"width":"14px","height":"14px"}} />
Approve — count toward KPI
</button>

            
</div>

          
</div>

        
</React.Fragment>
)}

        
<div style={{"display":"flex","alignItems":"center","gap":"12px","background":"var(--orchid-100)","border":"1px solid var(--orchid-200)","borderRadius":"14px","padding":"13px 16px"}}>

          
<Icon name={"target"} style={{"width":"18px","height":"18px","color":"var(--orchid-700)","flexShrink":"0"}} />

          
<div style={{"flex":"1"}}>
<div style={{"fontSize":"13px","fontWeight":"700","color":"var(--orchid-700)"}}>
Linked KPI · {tkD.kpi}
</div>
<div style={{"fontSize":"11.5px","color":"var(--ink-500)","marginTop":"2px"}}>
{tkKpiNote}
</div>
</div>


<span style={{"fontSize":"13px","fontWeight":"800","color":"var(--verify-600)"}}>
{tkD.contribution}
</span>


</div>


{Boolean(tmCanTrack) && (
<React.Fragment>


<div style={{"background":"#fff","border":"1px solid var(--line-300)","borderRadius":"14px","padding":"14px 16px","boxShadow":"var(--shadow-sm)"}}>
<div style={{"display":"flex","alignItems":"center","gap":"12px"}}>
<span style={{"width":"38px","height":"38px","borderRadius":"11px","background":"var(--surface-50)","display":"flex","alignItems":"center","justifyContent":"center","flexShrink":"0"}}>
<Icon name={"timer"} style={{"width":"18px","height":"18px","color":"var(--beet-700)"}} />
</span>
<div style={{"flex":"1","minWidth":"0"}}>
<div style={{"fontFamily":"'Space Mono'","fontWeight":"700","fontSize":"22px","color":"var(--ink-900)","letterSpacing":".02em"}}>
{tmElapsed}
</div>
<div style={{"display":"flex","alignItems":"center","gap":"6px","marginTop":"2px"}}>
<span style={cssTextToObject(tmDotStyle)} />
<span style={{"fontSize":"11.5px","fontWeight":"600","color":"var(--ink-500)"}}>{tmStatus}</span>
</div>
</div>
<button onClick={tmToggle} style={cssTextToObject(tmBtnStyle)}>
<Icon name={tmIcon} style={{"width":"15px","height":"15px"}} />
{tmLabel}
</button>
</div>
<div style={{"height":"5px","borderRadius":"99px","background":"var(--line-200)","overflow":"hidden","marginTop":"11px"}}>
<div style={cssTextToObject(`height:100%;border-radius:99px;width:${tmProgressW};background:var(--verify-500)`)} />
</div>
<div style={{"fontSize":"11px","color":"var(--ink-500)","marginTop":"5px"}}>
{tmTotalLabel}
</div>
{Boolean(tmHasSessions) && (
<React.Fragment>
<div style={{"borderTop":"1px solid var(--line-200)","marginTop":"11px","paddingTop":"9px"}}>
<div style={{"fontSize":"10.5px","fontWeight":"800","letterSpacing":".06em","textTransform":"uppercase","color":"var(--ink-400)","marginBottom":"7px"}}>
Time log
</div>
<div style={{"display":"flex","flexDirection":"column","gap":"5px"}}>
{(tmSessions || []).map((s, $index) => (
<div key={$index} style={{"display":"flex","alignItems":"center","gap":"9px","fontSize":"11.5px"}}>
<Icon name={"clock"} style={{"width":"11px","height":"11px","color":"var(--ink-400)","flexShrink":"0"}} />
<span style={{"fontFamily":"'Space Mono'","fontWeight":"700","color":"var(--ink-900)"}}>{s.dur}</span>
<span style={{"color":"var(--ink-500)"}}>{s.who}</span>
<span style={{"marginLeft":"auto","color":"var(--ink-400)"}}>{s.date} · {s.time}</span>
</div>
))}
</div>
</div>
</React.Fragment>
)}
</div>


</React.Fragment>
)}


{Boolean(tkHasFb) && (
<React.Fragment>

          
<div style={cssTextToObject(`display:flex;gap:10px;align-items:flex-start;background:${tkFbBg};border:1px solid ${tkFbBorder};border-radius:14px;padding:13px 16px`)}>

            
<Icon name={"message-square-quote"} style={cssTextToObject(`width:16px;height:16px;color:${tkFbColor};flex-shrink:0;margin-top:1px`)} />

            
<div>
<div style={cssTextToObject(`font-size:11px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:${tkFbColor};margin-bottom:3px`)}>
QC feedback
</div>
<div style={{"fontSize":"13px","fontWeight":"600","color":"var(--ink-800)","lineHeight":"1.5"}}>
{tkFb}
</div>
</div>

          
</div>

        
</React.Fragment>
)}

        
{Boolean(tkHasChain) && (
<React.Fragment>

          
<div style={{"background":"var(--surface-50)","border":"1px solid var(--line-200)","borderRadius":"16px","padding":"15px 18px"}}>

            
<div style={{"display":"flex","alignItems":"center","gap":"7px","marginBottom":"11px"}}>
<Icon name={"workflow"} style={{"width":"15px","height":"15px","color":"var(--orchid-600)"}} />
<span style={{"fontSize":"11.5px","fontWeight":"700","letterSpacing":".08em","textTransform":"uppercase","color":"var(--ink-400)"}}>
Workflow pipeline — stages unlock on QC approval
</span>
</div>

            
<div style={{"display":"flex","alignItems":"stretch","gap":"8px","flexWrap":"wrap"}}>

              
{(tkStages || []).map((s, $index) => (
<React.Fragment key={$index}>

                
<div onClick={s.open} style={{"flex":"1","minWidth":"170px","background":"#fff","border":"1px solid var(--line-300)","borderRadius":"12px","padding":"10px 13px","cursor":"pointer"}} style-hover="border-color:var(--orchid-300)">

                  
<div style={{"display":"flex","alignItems":"center","gap":"6px"}}>
<span style={{"fontSize":"9.5px","fontWeight":"800","letterSpacing":".06em","textTransform":"uppercase","color":"var(--orchid-600)"}}>
{s.role}
</span>
<span style={{"fontSize":"9.5px","color":"var(--ink-400)"}}>
· {s.division}
</span>
</div>

                  
<div style={{"display":"flex","alignItems":"center","gap":"7px","marginTop":"4px"}}>
<span style={{"fontFamily":"'Space Mono'","fontSize":"10px","color":"var(--ink-400)"}}>
{s.id}
</span>
<span style={cssTextToObject(`font-size:10px;font-weight:700;padding:2px 8px;border-radius:999px;background:${s.statusBg};color:${s.statusColor}`)}>
{s.status}
</span>
</div>

                  
<div style={{"fontSize":"12px","fontWeight":"700","color":"var(--ink-900)","marginTop":"4px","display":"-webkit-box","WebkitLineClamp":"2","WebkitBoxOrient":"vertical","overflow":"hidden"}}>
{s.name}
</div>

                
</div>

              
</React.Fragment>
))}

            
</div>

          
</div>


</React.Fragment>
)}

{Boolean(clHas) && (
<div style={{"background":"#fff","border":"1px solid var(--line-300)","borderRadius":"16px","boxShadow":"var(--shadow-sm)","overflow":"hidden"}}>
<div style={{"padding":"15px 18px","borderBottom":"1px solid var(--line-200)","display":"flex","alignItems":"center","gap":"10px","flexWrap":"wrap"}}>
<Icon name={"clipboard-check"} style={{"width":"16px","height":"16px","color":"var(--orchid-600)","flexShrink":"0"}} />
<div style={{"flex":"1","minWidth":"180px"}}>
<div style={{"fontFamily":"'Sora'","fontWeight":"700","fontSize":"14.5px","color":"var(--beet-700)"}}>Compliance checklist — {clKind}</div>
<div style={{"fontSize":"11.5px","color":"var(--ink-500)","marginTop":"1px"}}>{clStatusNote}</div>
</div>
<span style={{"fontSize":"11px","fontWeight":"700","padding":"3px 10px","borderRadius":"999px","background":"var(--surface-50)","color":"var(--ink-500)"}}>{clProgress}</span>
{Boolean(clSubmitted) && (
<span style={{"fontSize":"11px","fontWeight":"700","padding":"3px 10px","borderRadius":"999px","background":"var(--orchid-100)","color":"var(--orchid-700)"}}>{clQcSummary}</span>
)}
</div>
{(clSections || []).map((s, $si) => (
<div key={$si}>
<div style={{"padding":"9px 18px","background":"var(--surface-50)","borderBottom":"1px solid var(--line-200)","fontSize":"11px","fontWeight":"800","letterSpacing":".06em","textTransform":"uppercase","color":"var(--beet-700)"}}>{s.h}</div>
<div style={{"overflowX":"auto"}}>
<table style={{"width":"100%","borderCollapse":"collapse","minWidth":"1180px"}}>
<thead><tr>
<th style={{"textAlign":"left","padding":"9px 18px","fontSize":"10px","fontWeight":"800","letterSpacing":".05em","textTransform":"uppercase","color":"var(--ink-400)"}}>KPI</th>
<th style={{"textAlign":"left","padding":"9px 12px","fontSize":"10px","fontWeight":"800","letterSpacing":".05em","textTransform":"uppercase","color":"var(--ink-400)"}}>Method / tool</th>
<th style={{"textAlign":"left","padding":"9px 12px","fontSize":"10px","fontWeight":"800","letterSpacing":".05em","textTransform":"uppercase","color":"var(--ink-400)"}}>Unit</th>
<th style={{"textAlign":"left","padding":"9px 12px","fontSize":"10px","fontWeight":"800","letterSpacing":".05em","textTransform":"uppercase","color":"var(--ink-400)"}}>Gold standard</th>
<th style={{"textAlign":"left","padding":"9px 12px","fontSize":"10px","fontWeight":"800","letterSpacing":".05em","textTransform":"uppercase","color":"var(--info-600)"}}>Self score</th>
<th style={{"textAlign":"left","padding":"9px 12px","fontSize":"10px","fontWeight":"800","letterSpacing":".05em","textTransform":"uppercase","color":"var(--info-600)"}}>Evidence</th>
<th style={{"textAlign":"left","padding":"9px 12px","fontSize":"10px","fontWeight":"800","letterSpacing":".05em","textTransform":"uppercase","color":"var(--orchid-600)"}}>QC verified</th>
<th style={{"textAlign":"left","padding":"9px 18px","fontSize":"10px","fontWeight":"800","letterSpacing":".05em","textTransform":"uppercase","color":"var(--orchid-600)"}}>QC verdict</th>
</tr></thead>
<tbody>
{(s.rows || []).map((r, $ri) => (
<tr key={$ri}>
<td style={{"padding":"11px 18px","borderTop":"1px solid var(--line-200)","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-900)","verticalAlign":"top"}}>{r.kpi}</td>
<td style={{"padding":"11px 12px","borderTop":"1px solid var(--line-200)","verticalAlign":"top"}}>
<div style={{"fontSize":"11.5px","color":"var(--ink-700)"}}>{r.method}</div>
<div style={{"fontSize":"10.5px","color":"var(--ink-400)"}}>{r.tool}</div>
</td>
<td style={{"padding":"11px 12px","borderTop":"1px solid var(--line-200)","fontSize":"11.5px","color":"var(--ink-500)","verticalAlign":"top"}}>{r.unit}</td>
<td style={{"padding":"11px 12px","borderTop":"1px solid var(--line-200)","verticalAlign":"top"}}>
<span style={{"fontFamily":"'Space Mono'","fontSize":"11.5px","fontWeight":"700","color":"var(--verify-600)"}}>{r.gold}</span>
</td>
<td style={{"padding":"11px 12px","borderTop":"1px solid var(--line-200)","verticalAlign":"top","minWidth":"150px"}}>
{Boolean(r.writerEditable) && (
<React.Fragment>
<input value={r.self} onInput={r.setSelf} placeholder="value" style={{"width":"100%","minWidth":"0","padding":"7px 9px","border":"1px solid var(--line-300)","borderRadius":"8px","fontSize":"12px","outline":"none"}} />
<input value={r.selfNote} onInput={r.setSelfNote} placeholder="note (optional)" style={{"width":"100%","minWidth":"0","marginTop":"4px","padding":"6px 9px","border":"1px solid var(--line-300)","borderRadius":"8px","fontSize":"11px","outline":"none"}} />
</React.Fragment>
)}
{Boolean(r.selfLocked) && (
<React.Fragment>
<div style={{"fontFamily":"'Space Mono'","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-900)"}}>{r.self}</div>
<div style={{"fontSize":"10.5px","color":"var(--ink-400)"}}>{r.selfNote}</div>
</React.Fragment>
)}
<span style={cssTextToObject(`display:inline-block;margin-top:4px;font-size:10px;font-weight:700;padding:2px 8px;border-radius:999px;background:${r.selfBadgeBg};color:${r.selfBadgeColor}`)}>{r.selfBadge}</span>
</td>
<td style={{"padding":"11px 12px","borderTop":"1px solid var(--line-200)","verticalAlign":"top","minWidth":"150px"}}>
{Boolean(r.hasEv) && (
<div style={{"display":"flex","flexDirection":"column","gap":"4px","marginBottom":"5px"}}>
{(r.evFiles || []).map((ev, $ei) => (
<span key={$ei} style={{"display":"inline-flex","alignItems":"center","gap":"5px","padding":"4px 8px","border":"1px solid var(--line-300)","borderRadius":"8px","fontFamily":"'Space Mono'","fontSize":"10px","fontWeight":"700","color":"var(--ink-700)","background":"#fff"}}>
<Icon name={ev.icon} style={{"width":"10px","height":"10px","color":"var(--orchid-600)","flexShrink":"0"}} />
<span style={{"flex":"1","minWidth":"0"}}>{ev.name}</span>
{Boolean(r.writerEditable) && (
<button onClick={ev.remove} style={{"border":"none","background":"none","padding":"0","cursor":"pointer","display":"flex","color":"var(--ink-400)"}}>
<Icon name={"x"} style={{"width":"10px","height":"10px"}} />
</button>
)}
</span>
))}
</div>
)}
{Boolean(r.writerEditable) && (
<React.Fragment>
<button onClick={r.addEv} style={{"display":"inline-flex","alignItems":"center","gap":"5px","padding":"5px 10px","border":"1px dashed var(--line-300)","background":"#fff","color":"var(--orchid-600)","borderRadius":"8px","fontSize":"10.5px","fontWeight":"700","cursor":"pointer"}}>
<Icon name={"paperclip"} style={{"width":"11px","height":"11px"}} />
Attach
</button>
{Boolean(r.evMissing) && (
<div style={{"fontSize":"10px","fontWeight":"700","color":"var(--danger-600)","marginTop":"3px"}}>Evidence required</div>
)}
</React.Fragment>
)}
{Boolean(r.selfLocked) && Boolean(r.evMissing) && (
<span style={{"fontSize":"10.5px","fontWeight":"700","color":"var(--warn-600)"}}>No evidence attached</span>
)}
</td>
<td style={{"padding":"11px 12px","borderTop":"1px solid var(--line-200)","verticalAlign":"top","minWidth":"120px"}}>
{Boolean(r.qcEditable) && (
<input value={r.qcVal} onInput={r.setQcVal} placeholder="verified" style={{"width":"100%","minWidth":"0","padding":"7px 9px","border":"1px solid var(--line-300)","borderRadius":"8px","fontSize":"12px","outline":"none"}} />
)}
{Boolean(r.writerEditable) && (
<span style={{"fontSize":"11px","color":"var(--ink-400)"}}>—</span>
)}
</td>
<td style={{"padding":"11px 18px","borderTop":"1px solid var(--line-200)","verticalAlign":"top","minWidth":"190px"}}>
{Boolean(r.qcEditable) && (
<React.Fragment>
<select value={r.verdict} onChange={r.setVerdict} style={cssTextToObject(`width:100%;min-width:0;padding:6px 9px;border:none;border-radius:999px;font-size:11px;font-weight:700;cursor:pointer;background:${r.verdictBg};color:${r.verdictColor}`)}>
{(clVerdictOptions || []).map((v, $vi) => (
<option key={$vi} value={v}>{v}</option>
))}
</select>
{Boolean(r.needsComment) && (
<textarea value={r.comment} onInput={r.setComment} rows="2" placeholder="Comment — what must change…" style={{"width":"100%","marginTop":"5px","padding":"7px 9px","border":"1px solid var(--line-300)","borderRadius":"8px","fontSize":"11.5px","outline":"none","resize":"vertical"}} />
)}
</React.Fragment>
)}
{Boolean(r.writerEditable) && (
<span style={{"fontSize":"11px","color":"var(--ink-400)"}}>Pending QC</span>
)}
</td>
</tr>
))}
</tbody>
</table>
</div>
</div>
))}
<div style={{"padding":"13px 18px","borderTop":"1px solid var(--line-200)","display":"flex","alignItems":"center","gap":"10px","flexWrap":"wrap"}}>
<div style={{"flex":"1","minWidth":"140px","height":"7px","borderRadius":"99px","background":"var(--line-200)","overflow":"hidden"}}>
<div style={cssTextToObject(`height:100%;border-radius:99px;width:${clProgressW};background:var(--orchid-500)`)} />
</div>
{Boolean(clCanSubmit) && (
<button onClick={clSubmit} style={{"display":"flex","alignItems":"center","gap":"6px","padding":"9px 16px","border":"none","background":"#7A1C46","color":"#fff","borderRadius":"10px","fontSize":"12.5px","fontWeight":"700","cursor":"pointer"}}>
<Icon name={"send"} style={{"width":"13px","height":"13px"}} />
Submit for QC
</button>
)}
{Boolean(clCanReopen) && (
<button onClick={clReopen} style={{"display":"flex","alignItems":"center","gap":"6px","padding":"9px 15px","border":"1px solid var(--line-300)","background":"#fff","color":"var(--ink-700)","borderRadius":"10px","fontSize":"12.5px","fontWeight":"700","cursor":"pointer"}}>
<Icon name={"rotate-ccw"} style={{"width":"13px","height":"13px"}} />
Return to assignee
</button>
)}
</div>
{Boolean(clQcShowBulk) && (
<div style={{"padding":"12px 18px","borderTop":"1px solid var(--line-200)","background":"var(--orchid-100)","display":"flex","alignItems":"center","gap":"10px","flexWrap":"wrap"}}>
<Icon name={"shield-check"} style={{"width":"15px","height":"15px","color":"var(--orchid-700)","flexShrink":"0"}} />
<div style={{"flex":"1","minWidth":"170px"}}>
<div style={{"fontSize":"12px","fontWeight":"800","color":"var(--beet-700)"}}>Report your compliance verdict against the submitted evidence</div>
<div style={{"fontSize":"10.5px","color":"var(--orchid-700)","marginTop":"1px"}}>{clQcCoverage}</div>
</div>
<div style={{"flex":"1","minWidth":"90px","height":"6px","borderRadius":"99px","background":"rgba(255,255,255,.6)","overflow":"hidden"}}>
<div style={cssTextToObject(`height:100%;border-radius:99px;width:${clQcCoverageW};background:var(--orchid-600)`)} />
</div>
<button onClick={clAcceptAll} style={{"display":"inline-flex","alignItems":"center","gap":"6px","padding":"8px 14px","border":"none","background":"#7A1C46","color":"#fff","borderRadius":"10px","fontSize":"12px","fontWeight":"700","cursor":"pointer"}}>
<Icon name={"check-check"} style={{"width":"13px","height":"13px"}} />
Verify vs gold standard
</button>
</div>
)}
</div>
)}


<div>
<div style={{"fontSize":"11.5px","fontWeight":"700","letterSpacing":".08em","textTransform":"uppercase","color":"var(--ink-400)","marginBottom":"8px"}}>
Description
</div>
<div style={{"fontSize":"13.5px","color":"var(--ink-700)","lineHeight":"1.55"}}>
{tkD.desc}
</div>
</div>

        
<div>

          
<div style={{"fontSize":"11.5px","fontWeight":"700","letterSpacing":".08em","textTransform":"uppercase","color":"var(--ink-400)","marginBottom":"10px"}}>
Details
</div>

          
<div style={{"display":"grid","gridTemplateColumns":"1fr 1fr","gap":"10px 16px"}}>

            
{(tkMeta || []).map((m, $index) => (
<React.Fragment key={$index}>

              
<div style={{"display":"flex","justifyContent":"space-between","alignItems":"center","gap":"10px","borderBottom":"1px dashed var(--line-200)","paddingBottom":"7px"}}>
<span style={{"fontSize":"12px","color":"var(--ink-500)"}}>
{m.k}
</span>
{m.isSelect ? (
<select value={m.v} onChange={m.onChange} style={{"fontSize":"12.5px","fontWeight":"700","color":"var(--ink-900)","textAlign":"right","border":"1px solid var(--line-300)","borderRadius":"8px","padding":"4px 8px","background":"#fff"}}>
{(m.options || []).map((o, $oi) => (
<React.Fragment key={$oi}>
<option value={o}>{o}</option>
</React.Fragment>
))}
</select>
) : (
<span style={{"fontSize":"12.5px","fontWeight":"700","color":"var(--ink-900)","textAlign":"right"}}>
{m.v}
</span>
)}
</div>

            
</React.Fragment>
))}

          
</div>

        
</div>

        
<div>

          
<div style={{"fontSize":"11.5px","fontWeight":"700","letterSpacing":".08em","textTransform":"uppercase","color":"var(--ink-400)","marginBottom":"10px"}}>
Checklist
</div>

          
<div style={{"display":"flex","flexDirection":"column","gap":"8px"}}>

            
{(tkChecklist || []).map((c, $index) => (
<React.Fragment key={$index}>

              
<div onClick={c.toggle} style={{"display":"flex","alignItems":"center","gap":"11px","padding":"10px 13px","border":"1px solid var(--line-200)","borderRadius":"11px","cursor":"pointer","background":"var(--surface-50)"}}>

                
<span style={cssTextToObject(`width:19px;height:19px;border-radius:6px;border:1.5px solid ${c.boxBorder};background:${c.boxBg};display:flex;align-items:center;justify-content:center;flex-shrink:0`)}>
<Icon name={"check"} style={cssTextToObject(`width:12px;height:12px;color:#fff;opacity:${c.op}`)} />
</span>

                
<span style={{"fontSize":"13px","fontWeight":"600","color":"var(--ink-800)"}}>
{c.t}
</span>

              
</div>

            
</React.Fragment>
))}

          
</div>

        
</div>

        
<div>

          
<div style={{"display":"flex","alignItems":"center","justifyContent":"space-between","marginBottom":"10px"}}>
<span style={{"fontSize":"11.5px","fontWeight":"700","letterSpacing":".08em","textTransform":"uppercase","color":"var(--ink-400)"}}>
Evidence / attachments
</span>
{Boolean(tkCanAttach) && (
<React.Fragment>
<button onClick={tkAttach} style={{"display":"flex","alignItems":"center","gap":"6px","background":"var(--orchid-100)","color":"var(--orchid-700)","border":"1px solid var(--orchid-200)","borderRadius":"9px","padding":"6px 11px","fontSize":"12px","fontWeight":"700","cursor":"pointer"}}>
<Icon name={"paperclip"} style={{"width":"13px","height":"13px"}} />
Attach
</button>
</React.Fragment>
)}
</div>

          
{Boolean(tkHasEvidence) && (
<React.Fragment>

            
<div style={{"display":"flex","flexWrap":"wrap","gap":"7px"}}>

              
{(tkEvidence || []).map((f, $index) => (
<React.Fragment key={$index}>
<span style={{"display":"inline-flex","alignItems":"center","gap":"7px","padding":"5px 6px 5px 11px","borderRadius":"999px","background":"var(--surface-50)","border":"1px solid var(--line-300)"}}>
<Icon name={f.icon || "file"} style={{"width":"12px","height":"12px","color":"var(--orchid-600)"}} />
<button onClick={f.open} title="Preview" style={{"border":"none","background":"none","padding":"0","fontFamily":"'Manrope'","fontSize":"12px","fontWeight":"600","color":"var(--ink-700)","cursor":"pointer"}}>
{f.name}
</button>
<button onClick={f.download} title="Download" style={{"width":"22px","height":"22px","borderRadius":"999px","border":"none","background":"#fff","cursor":"pointer","display":"flex","alignItems":"center","justifyContent":"center"}}>
<Icon name={"download"} style={{"width":"11px","height":"11px","color":"var(--ink-500)"}} />
</button>
</span>
</React.Fragment>
))}

            
</div>

          
</React.Fragment>
)}

        
</div>

        
<div>

          
<div style={{"display":"flex","alignItems":"center","gap":"8px","marginBottom":"10px"}}>
<Icon name={"messages-square"} style={{"width":"14px","height":"14px","color":"var(--orchid-600)"}} />
<span style={{"fontSize":"11.5px","fontWeight":"700","letterSpacing":".08em","textTransform":"uppercase","color":"var(--ink-400)"}}>
Comments & feedback — assignee ↔ QC
</span>
</div>

          
{Boolean(tkHasComments) && (
<React.Fragment>

            
<div style={{"display":"flex","flexDirection":"column","gap":"10px","marginBottom":"14px"}}>

              
{(tkComments || []).map((c, $index) => (
<React.Fragment key={$index}>

                
<div style={{"display":"flex","gap":"11px"}}>

                  
<span style={{"width":"32px","height":"32px","borderRadius":"50%","background":"var(--beet-700)","color":"#fff","display":"flex","alignItems":"center","justifyContent":"center","fontSize":"11px","fontWeight":"800","flexShrink":"0"}}>
{c.initials}
</span>

                  
<div style={cssTextToObject(`flex:1;min-width:0;background:${c.bubbleBg};border:1px solid ${c.bubbleBorder};border-radius:0 14px 14px 14px;padding:11px 14px`)}>

                    
<div style={{"display":"flex","alignItems":"center","gap":"8px","flexWrap":"wrap"}}>
<span style={{"fontSize":"12.5px","fontWeight":"700","color":"var(--ink-900)"}}>
{c.who}
</span>
<span style={{"fontSize":"10px","fontWeight":"700","padding":"2px 8px","borderRadius":"999px","background":"#fff","border":"1px solid var(--line-200)","color":"var(--ink-500)"}}>
{c.role}
</span>
<span style={{"fontSize":"11px","color":"var(--ink-400)"}}>
{c.when}
</span>
</div>

                    
<div style={{"fontSize":"13px","color":"var(--ink-800)","lineHeight":"1.55","marginTop":"5px"}}>
{c.text}
</div>

                    
{Boolean(c.hasFiles) && (
<React.Fragment>

                      
<div style={{"display":"flex","flexWrap":"wrap","gap":"6px","marginTop":"8px"}}>
{(c.files || []).map((f, $index) => (
<React.Fragment key={$index}>
<button onClick={f.open} style={{"display":"inline-flex","alignItems":"center","gap":"6px","fontSize":"11.5px","fontWeight":"600","padding":"5px 10px","borderRadius":"999px","background":"#fff","border":"1px solid var(--line-300)","color":"var(--ink-700)","cursor":"pointer"}}>
<Icon name={"paperclip"} style={{"width":"11px","height":"11px"}} />
{f.name}
</button>
</React.Fragment>
))}
</div>

                    
</React.Fragment>
)}

                  
</div>

                
</div>

              
</React.Fragment>
))}

            
</div>

          
</React.Fragment>
)}

          
{Boolean(tkCanComment) && (
<React.Fragment>

            
<div style={{"border":"1px solid var(--line-300)","borderRadius":"14px","padding":"12px 14px","background":"#fff"}}>

              
<textarea value={tkCommentVal} onInput={tkOnComment} rows="2" placeholder="Add a comment or QC feedback — the assignee and reviewer both see this thread…" style={{"width":"100%","border":"none","outline":"none","fontSize":"13.5px","resize":"vertical","background":"none"}} />

              
{Boolean(tkHasCommentFiles) && (
<React.Fragment>

                
<div style={{"display":"flex","flexWrap":"wrap","gap":"6px","margin":"6px 0"}}>
{(tkCommentFiles || []).map((f, $index) => (
<React.Fragment key={$index}>
<span style={{"display":"inline-flex","alignItems":"center","gap":"6px","fontSize":"11.5px","fontWeight":"600","padding":"5px 8px 5px 10px","borderRadius":"999px","background":"var(--orchid-100)","border":"1px solid var(--orchid-200)","color":"var(--orchid-700)"}}>
<Icon name={"paperclip"} style={{"width":"11px","height":"11px"}} />
{f.name}
<button onClick={f.remove} style={{"background":"none","border":"none","cursor":"pointer","color":"var(--orchid-700)","display":"flex","padding":"0"}}>
<Icon name={"x"} style={{"width":"12px","height":"12px"}} />
</button>
</span>
</React.Fragment>
))}
</div>

              
</React.Fragment>
)}

              
<div style={{"display":"flex","alignItems":"center","gap":"8px","marginTop":"6px"}}>

                
<button onClick={tkAddCommentFile} style={{"display":"flex","alignItems":"center","gap":"6px","background":"#fff","border":"1px solid var(--line-300)","color":"var(--ink-700)","borderRadius":"10px","padding":"7px 12px","fontSize":"12px","fontWeight":"700","cursor":"pointer"}}>
<Icon name={"paperclip"} style={{"width":"13px","height":"13px"}} />
Attach document
</button>

                
<div style={{"flex":"1"}} />

                
<button onClick={tkPostComment} style={{"display":"flex","alignItems":"center","gap":"6px","background":"#7A1C46","color":"#fff","border":"none","borderRadius":"10px","padding":"8px 15px","fontSize":"12.5px","fontWeight":"700","cursor":"pointer"}}>
<Icon name={"send"} style={{"width":"13px","height":"13px"}} />
Post comment
</button>

              
</div>

            
</div>

          
</React.Fragment>
)}

        
</div>

        
<div>

          
<div style={{"fontSize":"11.5px","fontWeight":"700","letterSpacing":".08em","textTransform":"uppercase","color":"var(--ink-400)","marginBottom":"10px"}}>
Activity log
</div>

          
<div style={{"display":"flex","flexDirection":"column"}}>

            
{(tkActivity || []).map((a, $index) => (
<React.Fragment key={$index}>

              
<div style={{"display":"flex","gap":"12px"}}>
<div style={{"display":"flex","flexDirection":"column","alignItems":"center","flexShrink":"0"}}>
<span style={{"width":"9px","height":"9px","borderRadius":"99px","background":"var(--orchid-500)","marginTop":"5px"}} />
<span style={{"flex":"1","width":"2px","background":"var(--line-200)"}} />
</div>
<div style={{"flex":"1","paddingBottom":"14px"}}>
<div style={{"fontSize":"13px","fontWeight":"600","color":"var(--ink-900)"}}>
{a.what}
</div>
<div style={{"fontSize":"11.5px","color":"var(--ink-500)","marginTop":"2px"}}>
{a.who} · {a.when}
</div>
</div>
</div>

            
</React.Fragment>
))}

          
</div>

        
</div>

      
</div>

    
</div>

  
</div>


</React.Fragment>
)}
    </React.Fragment>
  );
}
