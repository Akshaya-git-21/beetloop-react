import React from 'react';
import Icon from '../../components/Icon.jsx';
import { cssTextToObject } from '../../utils/cssText.js';

export default function ContentIdeaQcDrawer({ vm }) {
  const { idAddCmt, idApprove, idAttachments, idAttachmentsEmpty, idCanAct, idCanConvert, idCanDelete, idClose, idCmtVal, idComments, idConvert, idD, idDelete, idDepAdd, idDepAssignees, idDepForm, idDepSetAssignee, idDepSetNotes, idDepSetType, idDepTypeOptions, idDependencies, idDrawerOpen, idFb, idFbBg, idFbBorder, idFbColor, idFbVal, idHasComments, idHasDependencies, idHasFb, idMainRow, idMeta, idOnCmt, idOnFb, idRework, stop } = vm;
  const mr = idMainRow || {};
  return (
    <React.Fragment>
{Boolean(idDrawerOpen) && (
<React.Fragment>

  
<div onClick={idClose} style={{"position":"fixed","inset":"0","background":"rgba(31,8,20,.5)","backdropFilter":"blur(3px)","zIndex":"168","display":"flex","justifyContent":"flex-end"}}>

    
<div onClick={stop} className="blscroll" style={{"width":"100%","maxWidth":"600px","height":"100%","background":"var(--paper)","boxShadow":"var(--shadow-xl)","overflowY":"auto","animation":"blrise .3s var(--ease-out)"}}>

      
<div style={{"position":"sticky","top":"0","background":"var(--paper)","borderBottom":"1px solid var(--line-200)","padding":"18px 24px","zIndex":"3"}}>

        
<div style={{"display":"flex","alignItems":"flex-start","justifyContent":"space-between","gap":"12px"}}>

          
<div style={{"minWidth":"0"}}>

            
<div style={{"display":"flex","alignItems":"center","gap":"8px"}}>
<span style={{"fontFamily":"'Space Mono'","fontSize":"11.5px","color":"var(--ink-400)"}}>
{idD.id}
</span>
<span style={cssTextToObject(`font-size:11px;font-weight:700;padding:3px 10px;border-radius:999px;background:${idD.statusBg};color:${idD.statusColor}`)}>
{idD.status}
</span>
</div>

            
<h3 style={{"fontFamily":"'Sora'","fontWeight":"700","fontSize":"19px","color":"var(--ink-900)","margin":"6px 0 0"}}>
{idD.title}
</h3>


</div>


<div style={{"display":"flex","alignItems":"center","gap":"8px","flexShrink":"0"}}>

{Boolean(idCanDelete) && (
<button onClick={idDelete} style={{"display":"flex","alignItems":"center","gap":"7px","background":"var(--paper)","border":"1px solid var(--danger-300, #e5a3a3)","color":"var(--danger-600)","borderRadius":"10px","padding":"9px 14px","fontSize":"12.5px","fontWeight":"700","cursor":"pointer"}}>
<Icon name={"trash-2"} style={{"width":"15px","height":"15px"}} />
Delete
</button>
)}

<button onClick={idClose} style={{"width":"34px","height":"34px","borderRadius":"10px","border":"1px solid var(--line-300)","background":"var(--paper)","cursor":"pointer","display":"flex","alignItems":"center","justifyContent":"center","flexShrink":"0"}}>
<Icon name={"x"} style={{"width":"17px","height":"17px","color":"var(--ink-700)"}} />
</button>
</div>

        
</div>

        
{Boolean(idCanAct) && (
<React.Fragment>

          
<div style={{"display":"flex","alignItems":"center","gap":"8px","marginTop":"12px","flexWrap":"wrap"}}>

            
<input value={idFbVal} onInput={idOnFb} placeholder="QC comment / feedback (required for rework)…" style={{"flex":"1","minWidth":"180px","padding":"9px 12px","border":"1px solid var(--line-300)","borderRadius":"10px","fontSize":"12.5px","outline":"none"}} />

            
<button onClick={idRework} style={{"display":"flex","alignItems":"center","gap":"6px","padding":"9px 14px","border":"1px solid #F0DDBB","background":"var(--paper)","color":"var(--warn-600)","borderRadius":"10px","fontSize":"12.5px","fontWeight":"700","cursor":"pointer"}}>
<Icon name={"rotate-ccw"} style={{"width":"14px","height":"14px"}} />
Rework
</button>

            
<button onClick={idApprove} style={{"display":"flex","alignItems":"center","gap":"6px","padding":"9px 15px","border":"none","background":"var(--verify-500)","color":"#fff","borderRadius":"10px","fontSize":"12.5px","fontWeight":"700","cursor":"pointer"}}>
<Icon name={"check"} style={{"width":"14px","height":"14px"}} />
Approve idea
</button>

          
</div>

        
</React.Fragment>
)}

        
{Boolean(idCanConvert) && (
<React.Fragment>

          
<div style={{"marginTop":"12px"}}>
<button onClick={idConvert} style={{"display":"flex","alignItems":"center","gap":"6px","padding":"9px 15px","border":"none","background":"var(--verify-500)","color":"#fff","borderRadius":"10px","fontSize":"12.5px","fontWeight":"700","cursor":"pointer"}}>
<Icon name={"list-checks"} style={{"width":"14px","height":"14px"}} />
Move to Tasks
</button>
</div>

        
</React.Fragment>
)}

      
</div>

      
<div style={{"padding":"20px 24px","display":"flex","flexDirection":"column","gap":"18px"}}>

        
{Boolean(idHasFb) && (
<React.Fragment>

          
<div style={cssTextToObject(`display:flex;gap:10px;align-items:flex-start;background:${idFbBg};border:1px solid ${idFbBorder};border-radius:14px;padding:13px 16px`)}>

            
<Icon name={"message-square-quote"} style={cssTextToObject(`width:16px;height:16px;color:${idFbColor};flex-shrink:0;margin-top:1px`)} />

            
<div>
<div style={cssTextToObject(`font-size:11px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:${idFbColor};margin-bottom:3px`)}>
QC feedback
</div>
<div style={{"fontSize":"13px","fontWeight":"600","color":"var(--ink-900)","lineHeight":"1.5"}}>
{idFb}
</div>
</div>

          
</div>

        
</React.Fragment>
)}

        
<div>
<div style={{"fontSize":"11.5px","fontWeight":"700","letterSpacing":".08em","textTransform":"uppercase","color":"var(--ink-400)","marginBottom":"8px"}}>
Reason / business objective
</div>
<div style={{"fontSize":"13.5px","color":"var(--ink-700)","lineHeight":"1.55"}}>
{idD.objective}
</div>
</div>

        
<div>

          
<div style={{"fontSize":"11.5px","fontWeight":"700","letterSpacing":".08em","textTransform":"uppercase","color":"var(--ink-400)","marginBottom":"10px"}}>
Idea details
</div>

          
<div style={{"display":"grid","gridTemplateColumns":"1fr 1fr","gap":"10px 16px"}}>

            
{(idMeta || []).map((m, $index) => (
<React.Fragment key={$index}>

              
<div style={{"display":"flex","justifyContent":"space-between","gap":"10px","borderBottom":"1px dashed var(--line-200)","paddingBottom":"7px"}}>
<span style={{"fontSize":"12px","color":"var(--ink-500)"}}>
{m.k}
</span>
<span style={{"fontSize":"12.5px","fontWeight":"700","color":"var(--ink-900)","textAlign":"right"}}>
{m.v}
</span>
</div>

            
</React.Fragment>
))}


</div>


</div>

<div>
<div style={{"fontSize":"11.5px","fontWeight":"700","letterSpacing":".08em","textTransform":"uppercase","color":"var(--ink-400)","marginBottom":"10px"}}>
Attachments & images
</div>
{Boolean(idAttachmentsEmpty) && (
<div style={{"fontSize":"12.5px","color":"var(--ink-400)"}}>
No files attached to this idea.
</div>
)}
{Boolean(!idAttachmentsEmpty) && (
<div style={{"display":"flex","flexDirection":"column","gap":"8px"}}>
{(idAttachments || []).map((a, $index) => (
<div key={$index} style={{"background":"var(--surface-50)","border":"1px solid var(--line-200)","borderRadius":"12px","padding":"10px","display":"flex","gap":"8px","alignItems":"center"}}>
<span style={{"width":"28px","height":"28px","borderRadius":"8px","background":"var(--orchid-100)","display":"flex","alignItems":"center","justifyContent":"center","flexShrink":"0"}}>
<Icon name={a.icon} style={{"width":"14px","height":"14px","color":"var(--orchid-600)"}} />
</span>
<button onClick={a.open} title="Preview" style={{"flex":"1","textAlign":"left","background":"none","border":"none","padding":"0","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-800)","cursor":"pointer"}}>
{a.name}
{Boolean(a.desc) && (
<span style={{"fontWeight":"500","color":"var(--ink-500)"}}>
{" — " + a.desc}
</span>
)}
</button>
{Boolean(a.category) && (
<span style={{"fontSize":"10.5px","fontWeight":"700","padding":"3px 8px","borderRadius":"999px","background":"var(--info-100)","color":"var(--info-600)","flexShrink":"0"}}>
{a.category}
</span>
)}
</div>
))}
</div>
)}
</div>


<div>


<div style={{"fontSize":"11.5px","fontWeight":"700","letterSpacing":".08em","textTransform":"uppercase","color":"var(--ink-400)","marginBottom":"10px","display":"flex","alignItems":"center","gap":"6px"}}>
<Icon name={"git-branch"} style={{"width":"13px","height":"13px"}} />
Dependent work (Main Content → SMM / GD / SEO / other)
</div>


{/* Tree: Main Content is the anchor row, each dependency listed as an
    indented child beneath it — mirrors the Content Repository's nested
    page list and gives Assignee its own labelled column on every row so
    it's never ambiguous whose name belongs to which row. */}
<div style={{"display":"flex","flexDirection":"column","border":"1px solid var(--line-200)","borderRadius":"12px","overflow":"hidden","marginBottom":"12px"}}>

<div onClick={mr.open} style={{"display":"flex","alignItems":"center","gap":"10px","padding":"11px 13px","background":"var(--paper)","borderBottom": idHasDependencies ? "1px solid var(--line-200)" : "none", cursor: mr.open ? "pointer" : "default"}}>
<Icon name={"chevron-right"} style={{"width":"14px","height":"14px","color":"var(--ink-400)","flexShrink":"0"}} />
<div style={{"flex":"1","minWidth":"0"}}>
<div style={{"display":"flex","alignItems":"center","gap":"7px","flexWrap":"wrap"}}>
<span style={{"fontSize":"12.5px","fontWeight":"800","color":"var(--ink-900)"}}>
Main Content
</span>
<span style={{"fontSize":"10px","fontWeight":"700","padding":"2px 8px","borderRadius":"999px","background":"var(--info-100)","color":"var(--info-600)"}}>
{mr.typeLabel}
</span>
</div>
<div style={{"fontSize":"11.5px","color":"var(--ink-500)","marginTop":"2px","whiteSpace":"nowrap","overflow":"hidden","textOverflow":"ellipsis"}}>
{mr.title}
</div>
</div>
<div style={{"textAlign":"right","flexShrink":"0"}}>
<div style={{"fontSize":"9.5px","fontWeight":"700","letterSpacing":".05em","textTransform":"uppercase","color":"var(--ink-400)"}}>
Assignee
</div>
<div style={{"fontSize":"12px","fontWeight":"800","color":"var(--ink-900)"}}>
{mr.assignee}
</div>
</div>
<span style={cssTextToObject(`font-size:10.5px;font-weight:700;padding:3px 9px;border-radius:999px;background:${mr.statusBg};color:${mr.statusColor};flex-shrink:0`)}>
{mr.statusLabel}
</span>
{Boolean(mr.hasTask) && (
<React.Fragment>
<span style={{"fontSize":"10.5px","fontWeight":"700","padding":"3px 9px","borderRadius":"999px","background":"var(--info-100)","color":"var(--info-600)","flexShrink":"0"}}>
{mr.taskId}
</span>
</React.Fragment>
)}
</div>

{Boolean(idHasDependencies) && (idDependencies || []).map((d, $index) => (
<React.Fragment key={$index}>
<div onClick={d.open} style={{"display":"flex","alignItems":"center","gap":"8px","padding":"10px 13px","background":"var(--surface-50)","borderTop": $index>0 ? "1px dashed var(--line-200)" : "none", flexWrap:"wrap", cursor: d.open ? "pointer" : "default"}}>
<span style={{"width":"20px","display":"flex","justifyContent":"center","flexShrink":"0","color":"var(--ink-300)"}}>
<Icon name={"corner-down-right"} style={{"width":"14px","height":"14px"}} />
</span>
<div style={{"flex":"1","minWidth":"120px"}}>
<span style={{"fontSize":"12px","fontWeight":"800","color":"var(--orchid-700)"}}>
{d.typeLabel}
</span>
{Boolean(d.notes) && (
<div style={{"fontSize":"11.5px","color":"var(--ink-500)","marginTop":"2px"}}>
{d.notes}
</div>
)}
</div>
<div style={{"textAlign":"right","flexShrink":"0"}} onClick={(e)=>e.stopPropagation()}>
<div style={{"fontSize":"9.5px","fontWeight":"700","letterSpacing":".05em","textTransform":"uppercase","color":"var(--ink-400)"}}>
Assignee
</div>
<div style={{"fontSize":"12px","fontWeight":"800","color":"var(--ink-900)"}}>
{d.assignee}
</div>
</div>

<select value={d.status} onChange={d.setStatus} onClick={(e)=>e.stopPropagation()} style={{"border":"1px solid var(--line-300)","borderRadius":"9px","background":"var(--paper)","fontSize":"11.5px","fontWeight":"700","padding":"5px 8px","outline":"none","cursor":"pointer","flexShrink":"0"}}>
{(d.statusOptions || []).map((o, $index) => (
<React.Fragment key={$index}>
<option value={o}>
{o}
</option>
</React.Fragment>
))}
</select>

<span style={cssTextToObject(`font-size:10.5px;font-weight:700;padding:3px 9px;border-radius:999px;background:${d.qcBg};color:${d.qcColor};flex-shrink:0`)}>
QC: {d.qcStatus}
</span>

{Boolean(d.hasTask) && (
<React.Fragment>
<span style={{"fontSize":"10.5px","fontWeight":"700","padding":"3px 9px","borderRadius":"999px","background":"var(--info-100)","color":"var(--info-600)","flexShrink":"0"}}>
{d.taskId}
</span>
</React.Fragment>
)}

<button onClick={(e)=>{e.stopPropagation(); d.remove();}} style={{"background":"none","border":"none","color":"var(--danger-500)","cursor":"pointer","padding":"4px","flexShrink":"0"}}>
<Icon name={"x"} style={{"width":"13px","height":"13px"}} />
</button>

</div>
</React.Fragment>
))}

</div>


<div style={{"display":"grid","gridTemplateColumns":"1fr 1fr 1.4fr auto","gap":"7px","alignItems":"center"}}>

<select value={idDepForm.type} onChange={idDepSetType} style={{"padding":"9px 10px","border":"1px solid var(--line-300)","borderRadius":"10px","fontSize":"12px","background":"var(--paper)","outline":"none"}}>
{(idDepTypeOptions || []).map((o, $index) => (
<React.Fragment key={$index}>
<option value={o.v}>
{o.label}
</option>
</React.Fragment>
))}
</select>

<select value={idDepForm.assignee} onChange={idDepSetAssignee} style={{"padding":"9px 10px","border":"1px solid var(--line-300)","borderRadius":"10px","fontSize":"12px","background":"var(--paper)","outline":"none"}}>
<option value="">
Assignee…
</option>
{(idDepAssignees || []).map((a, $index) => (
<React.Fragment key={$index}>
<option value={a}>
{a}
</option>
</React.Fragment>
))}
</select>

<input value={idDepForm.notes} onChange={idDepSetNotes} placeholder="What does this dependency cover?" style={{"padding":"9px 12px","border":"1px solid var(--line-300)","borderRadius":"10px","fontSize":"12px","outline":"none"}} />

<button onClick={idDepAdd} style={{"display":"flex","alignItems":"center","gap":"5px","padding":"9px 13px","border":"none","background":"#7A1C46","color":"#fff","borderRadius":"10px","fontSize":"12px","fontWeight":"700","cursor":"pointer","whiteSpace":"nowrap"}}>
<Icon name={"plus"} style={{"width":"13px","height":"13px"}} />
Add
</button>


</div>


</div>


<div>


<div style={{"fontSize":"11.5px","fontWeight":"700","letterSpacing":".08em","textTransform":"uppercase","color":"var(--ink-400)","marginBottom":"10px"}}>
Comments & feedback
</div>

          
{Boolean(idHasComments) && (
<React.Fragment>

            
<div style={{"display":"flex","flexDirection":"column","gap":"10px","marginBottom":"12px"}}>

              
{(idComments || []).map((c, $index) => (
<React.Fragment key={$index}>

                
<div style={{"display":"flex","gap":"10px","alignItems":"flex-start"}}>

                  
<span style={{"width":"30px","height":"30px","borderRadius":"99px","background":"var(--orchid-100)","color":"var(--orchid-700)","display":"flex","alignItems":"center","justifyContent":"center","fontSize":"12px","fontWeight":"800","flexShrink":"0"}}>
{c.initial}
</span>

                  
<div style={{"flex":"1","background":"var(--surface-50)","border":"1px solid var(--line-200)","borderRadius":"12px","padding":"10px 13px"}}>

                    
<div style={{"display":"flex","alignItems":"center","gap":"7px","flexWrap":"wrap"}}>
<span style={{"fontSize":"12px","fontWeight":"800","color":"var(--ink-900)"}}>
{c.who}
</span>
<span style={{"fontSize":"10.5px","fontWeight":"700","color":"var(--orchid-600)"}}>
{c.role}
</span>
<span style={{"fontSize":"10.5px","color":"var(--ink-400)","marginLeft":"auto"}}>
{c.when}
</span>
</div>

                    
<div style={{"fontSize":"12.5px","color":"var(--ink-800)","lineHeight":"1.5","marginTop":"4px"}}>
{c.text}
</div>

                  
</div>

                
</div>

              
</React.Fragment>
))}

            
</div>

          
</React.Fragment>
)}

          
<div style={{"display":"flex","gap":"8px","alignItems":"center"}}>

            
<input value={idCmtVal} onInput={idOnCmt} placeholder="Add a comment — reply to QC feedback, clarify scope, share references…" style={{"flex":"1","padding":"10px 13px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"12.5px","outline":"none"}} />

            
<button onClick={idAddCmt} style={{"display":"flex","alignItems":"center","gap":"6px","padding":"10px 14px","border":"none","background":"#7A1C46","color":"#fff","borderRadius":"11px","fontSize":"12.5px","fontWeight":"700","cursor":"pointer"}}>
<Icon name={"send"} style={{"width":"13px","height":"13px"}} />
Post
</button>

          
</div>

        
</div>

        
<div style={{"display":"flex","alignItems":"center","gap":"9px","background":"var(--surface-50)","border":"1px solid var(--line-200)","borderRadius":"12px","padding":"11px 14px","fontSize":"12.5px","color":"var(--ink-500)"}}>
<Icon name={"workflow"} style={{"width":"15px","height":"15px","flexShrink":"0","color":"var(--orchid-600)"}} />
<span>
Idea Captured → Submitted for QC → Approved → Moved to Tasks. Approved ideas remain stored in the Content repository for reuse.
</span>
</div>

      
</div>

    
</div>

  
</div>


</React.Fragment>
)}
    </React.Fragment>
  );
}
