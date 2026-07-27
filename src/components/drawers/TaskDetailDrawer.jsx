import React from 'react';
import Icon from '../../components/Icon.jsx';
import { cssTextToObject } from '../../utils/cssText.js';

export default function TaskDetailDrawer({ vm }) {
  const { stop, tkActions, tkActivity, tkAddCommentFile, tkAttach, tkCanAttach, tkCanComment, tkChecklist, tkClose, tkCommentFiles, tkCommentVal, tkComments, tkD, tkDrawerOpen, tkEvidence, tkFb, tkFbBg, tkFbBorder, tkFbColor, tkHasActions, tkHasChain, tkHasCommentFiles, tkHasComments, tkHasEvidence, tkHasFb, tkKpiNote, tkMeta, tkOnComment, tkPostComment, tkQcAddFile, tkQcApprove, tkQcFbVal, tkQcFiles, tkQcHasFiles, tkQcOnFb, tkQcOnUrl, tkQcPanel, tkQcRework, tkQcUrl, tkStages } = vm;
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
{f.name}
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
<span style={{"display":"inline-flex","alignItems":"center","gap":"6px","fontSize":"12px","fontWeight":"600","padding":"6px 11px","borderRadius":"999px","background":"var(--surface-50)","border":"1px solid var(--line-300)","color":"var(--ink-700)"}}>
<Icon name={"file"} style={{"width":"12px","height":"12px"}} />
{f.name}
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
<span style={{"display":"inline-flex","alignItems":"center","gap":"6px","fontSize":"11.5px","fontWeight":"600","padding":"5px 10px","borderRadius":"999px","background":"#fff","border":"1px solid var(--line-300)","color":"var(--ink-700)"}}>
<Icon name={"paperclip"} style={{"width":"11px","height":"11px"}} />
{f.name}
</span>
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
