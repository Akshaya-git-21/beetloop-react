import React from 'react';
import Icon from '../../components/Icon.jsx';
import { cssTextToObject } from '../../utils/cssText.js';

export default function ContentPageDetailDrawer({ vm }) {
  const { cdEditorMode, cdEditorStyle, cdPreview, cdPreviewStyle, cdSetEditor, cdSetPreview, cdAddBlock, cdAddLink, cd_activity, cd_analytics, cd_attachments, cd_attachmentsEmpty, cd_blocks, cd_cls, cd_id, cd_info, cd_internal, cd_isService, cd_media, cd_mediaEmpty, cd_name, cd_pub, cd_rel, cd_seo, cd_seoColor, cd_seoScore, cd_status, cd_statusBg, cd_statusColor, cd_tab0, cd_tab1, cd_tab2, cd_tab3, cd_tab4, cd_tab5, cd_tab6, cd_tab7, cd_tab8, cd_tab9, cd_tabs, cd_url, cd_wf, closeContent, contentOpen, stop, cdCanEdit, cdEdit,
    cwLinkedCount, cwModeBtns, cwCanRun, cwApprove, cwApproveLabel, cwGenerate, cwHasTasks, cwOpenTasks, cwProgressW, cwStages, cwOpenKpi, cwKpiNote,
    cd_liveHas, cd_liveNote, cd_live, cd_liveWarn, cd_liveWarnMsg } = vm;
  return (
    <React.Fragment>
{Boolean(contentOpen) && (
<React.Fragment>

  
<div onClick={closeContent} style={{"position":"fixed","inset":"0","background":"rgba(31,8,20,.5)","backdropFilter":"blur(3px)","zIndex":"165","display":"flex","justifyContent":"flex-end"}}>

    
<div onClick={stop} className="blscroll" style={{"width":"100%","maxWidth":"720px","height":"100%","background":"var(--paper)","boxShadow":"var(--shadow-xl)","overflowY":"auto","animation":"blrise .3s var(--ease-out)"}}>

      
<div style={{"position":"sticky","top":"0","background":"var(--paper)","borderBottom":"1px solid var(--line-200)","padding":"18px 24px","zIndex":"5"}}>

        
<div style={{"display":"flex","alignItems":"flex-start","justifyContent":"space-between","gap":"12px"}}>

          
<div style={{"minWidth":"0"}}>

            
<div style={{"display":"flex","alignItems":"center","gap":"9px"}}>
<span style={{"fontFamily":"'Space Mono'","fontSize":"11.5px","color":"var(--ink-400)"}}>
{cd_id}
</span>
<span style={cssTextToObject(`font-size:11px;font-weight:700;padding:3px 9px;border-radius:999px;background:${cd_statusBg};color:${cd_statusColor}`)}>
{cd_status}
</span>
</div>

            
<h3 style={{"fontFamily":"'Sora'","fontWeight":"700","fontSize":"20px","color":"var(--ink-900)","margin":"5px 0 0"}}>
{cd_name}
</h3>

            
<div style={{"fontFamily":"'Space Mono'","fontSize":"12px","color":"var(--info-600)","marginTop":"3px"}}>
{cd_url}
</div>

          
</div>


<div style={{"flex":"none","display":"flex","alignItems":"center","gap":"8px"}}>
{Boolean(cdCanEdit) && (
<button onClick={cdEdit} style={{"display":"flex","alignItems":"center","gap":"6px","padding":"9px 14px","borderRadius":"10px","border":"1px solid var(--line-300)","background":"var(--paper)","cursor":"pointer","fontSize":"13px","fontWeight":"700","color":"var(--ink-700)"}}>
<Icon name={"pencil"} style={{"width":"15px","height":"15px"}} />
Edit
</button>
)}
<button onClick={closeContent} style={{"width":"34px","height":"34px","borderRadius":"10px","border":"1px solid var(--line-300)","background":"var(--paper)","cursor":"pointer","display":"flex","alignItems":"center","justifyContent":"center"}}>
<Icon name={"x"} style={{"width":"17px","height":"17px","color":"var(--ink-700)"}} />
</button>
</div>

        
</div>

        
<div className="blscroll" style={{"display":"flex","gap":"2px","margin":"14px -24px -18px","padding":"0 24px","borderBottom":"1px solid var(--line-200)","overflowX":"auto"}}>

          
{(cd_tabs || []).map((t, $index) => (
<React.Fragment key={$index}>
<button onClick={t.go} style={cssTextToObject(t.style)}>
{t.label}
</button>
</React.Fragment>
))}

        
</div>

      
</div>

      
<div style={{"padding":"22px 24px"}}>


        
{Boolean(cd_tab0) && (
<React.Fragment>

          
<div style={{"display":"grid","gridTemplateColumns":"1fr 1fr","gap":"14px 18px"}}>

            
{(cd_info || []).map((f, $index) => (
<React.Fragment key={$index}>
<div>
<div style={{"fontSize":"11px","fontWeight":"700","textTransform":"uppercase","letterSpacing":".04em","color":"var(--ink-400)","marginBottom":"4px"}}>
{f.k}
</div>
<div style={{"fontSize":"13.5px","color":"var(--ink-900)"}}>
{f.v}
</div>
</div>
</React.Fragment>
))}

          
</div>

        
</React.Fragment>
)}


        
{Boolean(cd_tab1) && (
<React.Fragment>

          
{Boolean(cd_isService) && (
<React.Fragment>
<div style={{"display":"flex","alignItems":"center","gap":"9px","background":"var(--orchid-100)","border":"1px solid var(--orchid-200)","color":"var(--orchid-700)","padding":"10px 14px","borderRadius":"12px","fontSize":"12.5px","fontWeight":"600","marginBottom":"16px"}}>
<Icon name={"link"} style={{"width":"15px","height":"15px"}} />
Service, sub-service & industry values are reused from the 
<strong>
Service Master
</strong>
 in Admin — no duplication.
</div>
</React.Fragment>
)}

          
<div style={{"display":"grid","gridTemplateColumns":"1fr 1fr","gap":"14px 18px"}}>

            
{(cd_cls || []).map((f, $index) => (
<React.Fragment key={$index}>
<div>
<div style={{"fontSize":"11px","fontWeight":"700","textTransform":"uppercase","letterSpacing":".04em","color":"var(--ink-400)","marginBottom":"4px"}}>
{f.k}
</div>
<div style={{"fontSize":"13.5px","color":"var(--ink-900)"}}>
{f.v}
</div>
</div>
</React.Fragment>
))}

          
</div>

        
</React.Fragment>
)}


        
{Boolean(cd_tab2) && (
<React.Fragment>

          
<div style={{"display":"flex","alignItems":"center","justifyContent":"space-between","background":"var(--surface-50)","border":"1px solid var(--line-200)","borderRadius":"12px","padding":"12px 16px","marginBottom":"16px"}}>
<span style={{"fontSize":"13px","fontWeight":"700","color":"var(--ink-700)"}}>
SEO score
</span>
<span style={cssTextToObject(`font-family:'Sora';font-weight:800;font-size:22px;color:${cd_seoColor}`)}>
{cd_seoScore}
</span>
</div>

          
<div style={{"display":"flex","flexDirection":"column","gap":"12px"}}>

            
{(cd_seo || []).map((f, $index) => (
<React.Fragment key={$index}>
<div style={{"display":"grid","gridTemplateColumns":"180px 1fr","gap":"14px","alignItems":"baseline"}}>
<div style={{"fontSize":"12px","fontWeight":"700","color":"var(--ink-500)"}}>
{f.k}
</div>
<div style={{"fontSize":"13.5px","color":"var(--ink-900)"}}>
{f.v}
</div>
</div>
</React.Fragment>
))}

          
</div>


</React.Fragment>
)}


        
{Boolean(cd_tab3) && (
<React.Fragment>

          
<div style={{"display":"flex","alignItems":"center","justifyContent":"space-between","marginBottom":"14px"}}>

            
<div style={{"display":"flex","background":"var(--surface-50)","border":"1px solid var(--line-300)","borderRadius":"10px","padding":"3px"}}>

              
<button onClick={cdSetEditor} style={cssTextToObject(cdEditorStyle)}>
<Icon name={"layout-list"} style={{"width":"14px","height":"14px"}} />
Editor
</button>

              
<button onClick={cdSetPreview} style={cssTextToObject(cdPreviewStyle)}>
<Icon name={"eye"} style={{"width":"14px","height":"14px"}} />
Preview
</button>


</div>


</div>


          
{/* EDITOR (block structure) */}

          
{Boolean(cdEditorMode) && (
<React.Fragment>

            
<div style={{"display":"flex","flexDirection":"column","gap":"8px"}}>

              
{(cd_blocks || []).map((b, $index) => (
<React.Fragment key={$index}>

                
<div style={{"display":"flex","alignItems":"center","gap":"12px","background":"var(--paper)","border":"1px solid var(--line-300)","borderRadius":"12px","padding":"12px 14px"}}>

                  
<span style={{"display":"flex","alignItems":"center","gap":"5px","fontSize":"10.5px","fontWeight":"800","color":"var(--orchid-600)","background":"var(--orchid-100)","borderRadius":"7px","padding":"4px 8px","flexShrink":"0"}}>
<Icon name={"grip-vertical"} style={{"width":"12px","height":"12px","color":"var(--ink-400)"}} />
{b.type}
{Boolean(b.level) && (
<React.Fragment>
· {b.level}
</React.Fragment>
)}
</span>

                  
<span style={{"flex":"1","fontSize":"13px","color":"var(--ink-700)"}}>
{b.text}
</span>

                  
<Icon name={"pencil"} style={{"width":"14px","height":"14px","color":"var(--ink-400)"}} />

                
</div>

              
</React.Fragment>
))}

              
<button onClick={cdAddBlock} style={{"display":"flex","alignItems":"center","gap":"7px","justifyContent":"center","padding":"10px","border":"1px dashed var(--line-300)","background":"var(--paper)","borderRadius":"11px","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-500)","cursor":"pointer"}}>
<Icon name={"plus"} style={{"width":"14px","height":"14px"}} />
Add block — Heading · Paragraph · Image · CTA · FAQ · Table · Accordion…
</button>

            
</div>

          
</React.Fragment>
)}


          
{/* PREVIEW (rendered page) */}

          
{Boolean(cdPreview) && (
<React.Fragment>

            
<div style={{"border":"1px solid var(--line-300)","borderRadius":"14px","background":"var(--paper)","padding":"26px 28px","display":"flex","flexDirection":"column","gap":"16px"}}>

              
{(cd_blocks || []).map((b, $index) => (
<React.Fragment key={$index}>

                
{Boolean(b.isHeading) && (
<React.Fragment>
<div style={cssTextToObject(`font-family:'Sora';font-weight:${b.hWeight};font-size:${b.hSize};color:var(--ink-900);letter-spacing:-.01em;line-height:1.2`)}>
{b.text}
</div>
</React.Fragment>
)}

                
{Boolean(b.isPara) && (
<React.Fragment>
<div style={{"fontSize":"14.5px","color":"var(--ink-700)","lineHeight":"1.6"}}>
{b.text}
</div>
</React.Fragment>
)}

                
{Boolean(b.isImage) && (
<React.Fragment>
<div style={{"border":"1px dashed var(--line-300)","borderRadius":"12px","background":"var(--surface-50)","padding":"28px","display":"flex","flexDirection":"column","alignItems":"center","gap":"8px","color":"var(--ink-400)"}}>
<Icon name={b.icon} style={{"width":"28px","height":"28px"}} />
<span style={{"fontSize":"12.5px","fontWeight":"600"}}>
{b.text}
</span>
</div>
</React.Fragment>
)}

                
{Boolean(b.isCTA) && (
<React.Fragment>
<div style={{"display":"flex","justifyContent":"center","padding":"6px 0"}}>
<span style={{"background":"#7A1C46","color":"#fff","borderRadius":"12px","padding":"12px 24px","fontSize":"14px","fontWeight":"700"}}>
{b.text}
</span>
</div>
</React.Fragment>
)}

                
{Boolean(b.isQuote) && (
<React.Fragment>
<div style={{"borderLeft":"3px solid var(--orchid-400)","padding":"6px 0 6px 16px","fontFamily":"'Sora'","fontSize":"16px","fontStyle":"italic","color":"var(--ink-700)"}}>
{b.text}
</div>
</React.Fragment>
)}

                
{Boolean(b.isFAQ) && (
<React.Fragment>
<div style={{"border":"1px solid var(--line-200)","borderRadius":"12px","overflow":"hidden"}}>
<div style={{"display":"flex","alignItems":"center","justifyContent":"space-between","padding":"13px 16px","background":"var(--surface-50)","fontSize":"13.5px","fontWeight":"700","color":"var(--ink-900)"}}>
{b.text}
<Icon name={"chevron-down"} style={{"width":"16px","height":"16px","color":"var(--ink-400)"}} />
</div>
</div>
</React.Fragment>
)}

                
{Boolean(b.isTable) && (
<React.Fragment>
<div style={{"border":"1px solid var(--line-200)","borderRadius":"12px","overflow":"hidden"}}>
<div style={{"display":"grid","gridTemplateColumns":"1fr 1fr 1fr","background":"var(--surface-50)"}}>
<span style={{"padding":"9px 12px","fontSize":"11px","fontWeight":"700","textTransform":"uppercase","color":"var(--ink-400)"}}>
Col A
</span>
<span style={{"padding":"9px 12px","fontSize":"11px","fontWeight":"700","textTransform":"uppercase","color":"var(--ink-400)"}}>
Col B
</span>
<span style={{"padding":"9px 12px","fontSize":"11px","fontWeight":"700","textTransform":"uppercase","color":"var(--ink-400)"}}>
Col C
</span>
</div>
<div style={{"padding":"12px","fontSize":"12.5px","color":"var(--ink-500)"}}>
{b.text}
</div>
</div>
</React.Fragment>
)}

                
{Boolean(b.isMisc) && (
<React.Fragment>
<div style={{"display":"flex","alignItems":"center","gap":"10px","border":"1px dashed var(--line-300)","borderRadius":"10px","background":"var(--surface-50)","padding":"14px 16px","color":"var(--ink-500)"}}>
<Icon name={b.icon} style={{"width":"17px","height":"17px"}} />
<span style={{"fontSize":"13px","fontWeight":"600"}}>
{b.type}: {b.text}
</span>
</div>
</React.Fragment>
)}

              
</React.Fragment>
))}


</div>


</React.Fragment>
)}



<div style={{"marginTop":"22px"}}>
<div style={{"fontSize":"11.5px","fontWeight":"700","letterSpacing":".08em","textTransform":"uppercase","color":"var(--ink-400)","marginBottom":"10px"}}>
Attachments
</div>
{Boolean(cd_attachmentsEmpty) && (
<div style={{"fontSize":"12.5px","color":"var(--ink-400)"}}>
No files attached to this page yet.
</div>
)}
{Boolean(!cd_attachmentsEmpty) && (
<div style={{"display":"flex","flexDirection":"column","gap":"8px"}}>
{(cd_attachments || []).map((a, $index) => (
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
<button onClick={a.download} title="Download" style={{"background":"none","border":"none","cursor":"pointer","color":"var(--ink-400)","padding":"4px"}}>
<Icon name={"download"} style={{"width":"14px","height":"14px"}} />
</button>
</div>
))}
</div>
)}
</div>


</React.Fragment>
)}



{Boolean(cd_tab4) && (
<React.Fragment>

          
<div style={{"display":"flex","flexDirection":"column","gap":"16px"}}>

            
{(cd_rel || []).map((g, $index) => (
<React.Fragment key={$index}>

              
<div>
<div style={{"fontSize":"11.5px","fontWeight":"700","color":"var(--ink-500)","marginBottom":"8px"}}>
Related {g.group}
</div>
<div style={{"display":"flex","flexWrap":"wrap","gap":"7px"}}>
{(g.items || []).map((it, $index) => (
<React.Fragment key={$index}>
<span style={{"display":"inline-flex","alignItems":"center","gap":"6px","fontSize":"12.5px","fontWeight":"600","background":"var(--surface-50)","border":"1px solid var(--line-300)","color":"var(--ink-700)","borderRadius":"999px","padding":"6px 12px"}}>
<Icon name={"link-2"} style={{"width":"13px","height":"13px","color":"var(--orchid-500)"}} />
{it}
</span>
</React.Fragment>
))}
<button onClick={cdAddLink} style={{"fontSize":"12.5px","fontWeight":"700","color":"var(--orchid-600)","background":"none","border":"1px dashed var(--orchid-200)","borderRadius":"999px","padding":"6px 12px","cursor":"pointer"}}>
+ Link
</button>
</div>
</div>

            
</React.Fragment>
))}

            
<div style={{"fontSize":"12px","color":"var(--ink-400)"}}>
Relationships link content instead of duplicating it — one source of truth per page.
</div>

          
</div>

        
</React.Fragment>
)}


        
{Boolean(cd_tab5) && (
<React.Fragment>

          
<div style={{"fontSize":"11.5px","fontWeight":"700","color":"var(--ink-500)","marginBottom":"8px"}}>
Existing internal links
</div>

          
<div style={{"border":"1px solid var(--line-200)","borderRadius":"12px","overflow":"hidden"}}>
<div style={{"display":"grid","gridTemplateColumns":"1.4fr 1.4fr .8fr .8fr","gap":"10px","padding":"9px 14px","background":"var(--surface-50)","fontSize":"10.5px","fontWeight":"700","textTransform":"uppercase","color":"var(--ink-400)"}}>
<span>
Anchor
</span>
<span>
Target
</span>
<span>
Type / strength
</span>
<span>
Score
</span>
</div>

            
{(cd_internal || []).map((l, $index) => (
<React.Fragment key={$index}>
<div style={{"display":"grid","gridTemplateColumns":"1.4fr 1.4fr .8fr .8fr","gap":"10px","padding":"10px 14px","borderTop":"1px solid var(--line-200)","alignItems":"center"}}>
<span style={{"fontSize":"12.5px","color":"var(--ink-900)","fontWeight":"600"}}>
{l.anchor}
</span>
<span style={{"fontFamily":"'Space Mono'","fontSize":"11.5px","color":"var(--info-600)"}}>
{l.target}
</span>
<span style={{"fontSize":"12px","color":"var(--ink-700)"}}>
{l.strength}
</span>
<span style={{"fontSize":"12px","fontWeight":"700","color":"var(--verify-600)"}}>
{l.score}
</span>
</div>
</React.Fragment>
))}

          
</div>

        
</React.Fragment>
)}


        
{Boolean(cd_tab6) && (
<React.Fragment>

          
{Boolean(cd_mediaEmpty) && (
<React.Fragment>
<div style={{"textAlign":"center","color":"var(--ink-500)","padding":"36px 0"}}>
<Icon name={"image"} style={{"width":"24px","height":"24px","color":"var(--ink-400)"}} />
<div style={{"fontSize":"13.5px","fontWeight":"600","marginTop":"8px"}}>
No media attached yet.
</div>
</div>
</React.Fragment>
)}

          
<div style={{"display":"grid","gridTemplateColumns":"1fr 1fr","gap":"12px"}}>

            
{(cd_media || []).map((m, $index) => (
<React.Fragment key={$index}>

              
<div style={{"border":"1px solid var(--line-300)","borderRadius":"12px","padding":"14px","display":"flex","gap":"12px","alignItems":"center"}}>
<span style={{"width":"44px","height":"44px","borderRadius":"10px","background":"var(--surface-50)","display":"flex","alignItems":"center","justifyContent":"center","flexShrink":"0"}}>
<Icon name={"file"} style={{"width":"20px","height":"20px","color":"var(--orchid-600)"}} />
</span>
<div style={{"minWidth":"0"}}>
<div style={{"fontSize":"13px","fontWeight":"700","color":"var(--ink-900)","whiteSpace":"nowrap","overflow":"hidden","textOverflow":"ellipsis"}}>
{m.name}
</div>
<div style={{"fontSize":"11.5px","color":"var(--ink-500)"}}>
{m.type} · {m.size} · used {m.usage}×
</div>
<div style={{"fontSize":"11px","color":"var(--ink-400)","marginTop":"2px"}}>
alt: {m.alt}
</div>
</div>
</div>

            
</React.Fragment>
))}

          
</div>

        
</React.Fragment>
)}


        
{Boolean(cd_tab7) && (
<React.Fragment>

<div style={{"background":"var(--paper)","border":"1px solid var(--line-300)","borderRadius":"16px","boxShadow":"var(--shadow-sm)","overflow":"hidden","marginBottom":"20px"}}>
<div style={{"padding":"14px 17px","borderBottom":"1px solid var(--line-200)","display":"flex","alignItems":"center","gap":"10px","flexWrap":"wrap"}}>
<Icon name={"workflow"} style={{"width":"16px","height":"16px","color":"var(--orchid-600)","flexShrink":"0"}} />
<div style={{"flex":"1","minWidth":"170px"}}>
<div style={{"fontFamily":"'Sora'","fontWeight":"700","fontSize":"14.5px","color":"var(--ink-900)"}}>Production chain — page → tasks → QC → KPI</div>
<div style={{"fontSize":"11.5px","color":"var(--ink-500)","marginTop":"1px"}}>{cwLinkedCount}</div>
</div>
{(cwModeBtns || []).map((m, $index) => (
<React.Fragment key={$index}>
<button onClick={m.set} style={cssTextToObject(m.style)}>{m.label}</button>
</React.Fragment>
))}
</div>
<div style={{"padding":"12px 17px","background":"var(--surface-50)","borderBottom":"1px solid var(--line-200)","display":"flex","alignItems":"center","gap":"9px","flexWrap":"wrap"}}>
{Boolean(cwCanRun) && (
<React.Fragment>
<button onClick={cwApprove} style={{"display":"inline-flex","alignItems":"center","gap":"6px","padding":"8px 14px","border":"1px solid var(--line-300)","background":"var(--paper)","color":"var(--ink-700)","borderRadius":"10px","fontSize":"12px","fontWeight":"700","cursor":"pointer"}}>
<Icon name={"shield-check"} style={{"width":"13px","height":"13px"}} />{cwApproveLabel}
</button>
<button onClick={cwGenerate} style={{"display":"inline-flex","alignItems":"center","gap":"6px","padding":"8px 15px","border":"none","background":"#7A1C46","color":"#fff","borderRadius":"10px","fontSize":"12px","fontWeight":"700","cursor":"pointer"}}>
<Icon name={"list-plus"} style={{"width":"13px","height":"13px"}} />Generate production tasks
</button>
</React.Fragment>
)}
{Boolean(cwHasTasks) && (
<button onClick={cwOpenTasks} style={{"display":"inline-flex","alignItems":"center","gap":"6px","padding":"8px 14px","border":"1px solid var(--line-300)","background":"var(--paper)","color":"var(--ink-700)","borderRadius":"10px","fontSize":"12px","fontWeight":"700","cursor":"pointer"}}>
<Icon name={"external-link"} style={{"width":"13px","height":"13px"}} />Open in Tasks
</button>
)}
<div style={{"flex":"1","minWidth":"110px","height":"7px","borderRadius":"99px","background":"var(--line-200)","overflow":"hidden"}}>
<div style={cssTextToObject(`height:100%;border-radius:99px;width:${cwProgressW};background:var(--verify-500)`)} />
</div>
</div>
<div className="blscroll" style={{"overflowX":"auto"}}>
<table style={{"width":"100%","borderCollapse":"collapse","minWidth":"900px"}}>
<thead><tr>
<th style={{"textAlign":"left","padding":"9px 17px","fontSize":"10px","fontWeight":"800","letterSpacing":".05em","textTransform":"uppercase","color":"var(--ink-400)"}}>#</th>
<th style={{"textAlign":"left","padding":"9px 12px","fontSize":"10px","fontWeight":"800","letterSpacing":".05em","textTransform":"uppercase","color":"var(--ink-400)"}}>Stage</th>
<th style={{"textAlign":"left","padding":"9px 12px","fontSize":"10px","fontWeight":"800","letterSpacing":".05em","textTransform":"uppercase","color":"var(--ink-400)"}}>Owner</th>
<th style={{"textAlign":"left","padding":"9px 12px","fontSize":"10px","fontWeight":"800","letterSpacing":".05em","textTransform":"uppercase","color":"var(--info-600)"}}>Effort line</th>
<th style={{"textAlign":"left","padding":"9px 12px","fontSize":"10px","fontWeight":"800","letterSpacing":".05em","textTransform":"uppercase","color":"var(--orchid-600)"}}>KPI</th>
<th style={{"textAlign":"left","padding":"9px 12px","fontSize":"10px","fontWeight":"800","letterSpacing":".05em","textTransform":"uppercase","color":"var(--ink-400)"}}>Task</th>
<th style={{"textAlign":"left","padding":"9px 17px","fontSize":"10px","fontWeight":"800","letterSpacing":".05em","textTransform":"uppercase","color":"var(--ink-400)"}}>Status</th>
</tr></thead>
<tbody>
{(cwStages || []).map((s, $index) => (
<tr key={$index} onClick={s.open} style={{"cursor":"pointer"}}>
<td style={{"padding":"11px 17px","borderTop":"1px solid var(--line-200)","fontFamily":"'Space Mono'","fontSize":"11px","fontWeight":"700","color":"var(--ink-900)"}}>{s.n}</td>
<td style={{"padding":"11px 12px","borderTop":"1px solid var(--line-200)"}}>
<div style={{"fontSize":"12.5px","fontWeight":"700","color":"var(--ink-900)"}}>{s.stage}</div>
<div style={{"fontSize":"10px","color":"var(--ink-400)"}}>{s.division} · {s.dep}</div>
</td>
<td style={{"padding":"11px 12px","borderTop":"1px solid var(--line-200)"}}>
<div style={{"fontSize":"12px","color":"var(--ink-700)"}}>{s.who}</div>
<div style={{"fontSize":"10px","color":"var(--ink-400)"}}>{s.hrs}</div>
</td>
<td style={{"padding":"11px 12px","borderTop":"1px solid var(--line-200)","fontSize":"11.5px","color":"var(--info-600)","fontWeight":"700"}}>{s.effort}</td>
<td style={{"padding":"11px 12px","borderTop":"1px solid var(--line-200)","fontSize":"11.5px","color":"var(--orchid-700)","fontWeight":"700"}}>{s.kpi}</td>
<td style={{"padding":"11px 12px","borderTop":"1px solid var(--line-200)","fontFamily":"'Space Mono'","fontSize":"11px","fontWeight":"700","color":"var(--ink-700)"}}>{s.id}</td>
<td style={{"padding":"11px 17px","borderTop":"1px solid var(--line-200)"}}>
<span style={cssTextToObject(`font-size:10px;font-weight:700;padding:2px 9px;border-radius:999px;background:${s.bg};color:${s.color}`)}>{s.status}</span>
</td>
</tr>
))}
</tbody>
</table>
</div>
<div onClick={cwOpenKpi} style={{"padding":"11px 17px","borderTop":"1px solid var(--line-200)","display":"flex","alignItems":"center","gap":"8px","fontSize":"11.5px","fontWeight":"700","color":"var(--orchid-700)","cursor":"pointer"}}>
<Icon name={"target"} style={{"width":"13px","height":"13px","flexShrink":"0"}} />{cwKpiNote}
</div>
</div>


<div style={{"display":"flex","flexWrap":"wrap","gap":"6px","marginBottom":"20px"}}>

            
{(cd_wf || []).map((w, $index) => (
<React.Fragment key={$index}>
<div style={{"display":"flex","alignItems":"center","gap":"7px","background":"var(--surface-50)","border":"1px solid var(--line-200)","borderRadius":"999px","padding":"6px 12px"}}>
<span style={cssTextToObject(`width:9px;height:9px;border-radius:99px;background:${w.dotBg}`)} />
<span style={cssTextToObject(`font-size:12px;font-weight:700;color:${w.color}`)}>
{w.label}
</span>
</div>
</React.Fragment>
))}

          
</div>

          
<div style={{"display":"grid","gridTemplateColumns":"1fr 1fr","gap":"14px 18px"}}>

            
{(cd_pub || []).map((f, $index) => (
<React.Fragment key={$index}>
<div>
<div style={{"fontSize":"11px","fontWeight":"700","textTransform":"uppercase","letterSpacing":".04em","color":"var(--ink-400)","marginBottom":"4px"}}>
{f.k}
</div>
<div style={{"fontSize":"13.5px","color":"var(--ink-900)"}}>
{f.v}
</div>
</div>
</React.Fragment>
))}

          
</div>

        
</React.Fragment>
)}


        
{Boolean(cd_tab8) && (
<React.Fragment>

{Boolean(cd_liveHas) && (
<div style={{"background":"var(--paper)","border":"1px solid var(--line-300)","borderRadius":"16px","boxShadow":"var(--shadow-sm)","padding":"16px 18px","marginBottom":"14px"}}>
<div style={{"display":"flex","alignItems":"center","gap":"8px","marginBottom":"12px"}}>
<Icon name={"activity"} style={{"width":"15px","height":"15px","color":"var(--verify-600)","flexShrink":"0"}} />
<div>
<div style={{"fontSize":"12.5px","fontWeight":"800","color":"var(--ink-900)"}}>Recorded performance — from platform data</div>
<div style={{"fontSize":"11px","color":"var(--ink-500)","marginTop":"1px"}}>{cd_liveNote}</div>
</div>
</div>
<div style={{"display":"grid","gridTemplateColumns":"repeat(auto-fit,minmax(140px,1fr))","gap":"10px"}}>
{(cd_live || []).map((f, $index) => (
<React.Fragment key={$index}>
<div style={{"background":"var(--surface-50)","border":"1px solid var(--line-200)","borderRadius":"11px","padding":"11px 13px"}}>
<div style={{"fontSize":"10px","fontWeight":"700","letterSpacing":".05em","textTransform":"uppercase","color":"var(--ink-400)"}}>{f.k}</div>
<div style={{"fontFamily":"'Sora'","fontWeight":"800","fontSize":"17px","color":"var(--ink-900)","marginTop":"3px"}}>{f.v}</div>
</div>
</React.Fragment>
))}
</div>
{Boolean(cd_liveWarn) && (
<div style={{"display":"flex","alignItems":"center","gap":"8px","marginTop":"11px","background":"var(--warn-100)","border":"1px solid #EFD9B4","color":"var(--warn-600)","padding":"9px 12px","borderRadius":"11px","fontSize":"11.5px","fontWeight":"700"}}>
<Icon name={"alert-triangle"} style={{"width":"13px","height":"13px","flexShrink":"0"}} />{cd_liveWarnMsg}
</div>
)}
</div>
)}
<div style={{"display":"flex","alignItems":"center","gap":"8px","marginBottom":"9px"}}>
<Icon name={"database"} style={{"width":"13px","height":"13px","color":"var(--ink-400)"}} />
<span style={{"fontSize":"11px","fontWeight":"800","letterSpacing":".06em","textTransform":"uppercase","color":"var(--ink-400)"}}>Last imported analytics snapshot</span>
</div>


<div style={{"display":"grid","gridTemplateColumns":"1fr 1fr","gap":"12px"}}>

            
{(cd_analytics || []).map((f, $index) => (
<React.Fragment key={$index}>
<div style={{"background":"var(--paper)","border":"1px solid var(--line-300)","borderRadius":"12px","padding":"14px 16px"}}>
<div style={{"fontSize":"11.5px","fontWeight":"600","color":"var(--ink-500)"}}>
{f.k}
</div>
<div style={{"fontFamily":"'Sora'","fontWeight":"800","fontSize":"20px","color":"var(--ink-900)","marginTop":"5px"}}>
{f.v}
</div>
</div>
</React.Fragment>
))}

          
</div>

          
<div style={{"display":"flex","alignItems":"center","gap":"9px","background":"var(--surface-50)","border":"1px solid var(--line-200)","color":"var(--ink-500)","padding":"11px 14px","borderRadius":"12px","fontSize":"12.5px","marginTop":"14px"}}>
<Icon name={"line-chart"} style={{"width":"15px","height":"15px"}} />
Ranking-trend chart & top keywords render here from GA4 / GSC.
</div>

        
</React.Fragment>
)}


        
{Boolean(cd_tab9) && (
<React.Fragment>

          
<div style={{"display":"flex","flexDirection":"column","gap":"0"}}>

            
{(cd_activity || []).map((a, $index) => (
<React.Fragment key={$index}>
<div style={{"display":"flex","gap":"14px"}}>
<div style={{"display":"flex","flexDirection":"column","alignItems":"center","flexShrink":"0"}}>
<span style={{"width":"11px","height":"11px","borderRadius":"99px","background":"var(--orchid-500)","marginTop":"4px"}} />
<span style={{"flex":"1","width":"2px","background":"var(--line-200)"}} />
</div>
<div style={{"flex":"1","paddingBottom":"20px"}}>
<div style={{"fontSize":"13px","fontWeight":"700","color":"var(--ink-900)"}}>
{a.action}
</div>
<div style={{"fontSize":"12px","color":"var(--ink-500)","marginTop":"2px"}}>
{a.who} · {a.date}
</div>
</div>
</div>
</React.Fragment>
))}

          
</div>

        
</React.Fragment>
)}


      
</div>

    
</div>

  
</div>


</React.Fragment>
)}
    </React.Fragment>
  );
}
