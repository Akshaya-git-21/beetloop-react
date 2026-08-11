import React, { useRef } from 'react';
import Icon from '../../components/Icon.jsx';
import { cssTextToObject } from '../../utils/cssText.js';

export default function FilePickerModal({ vm }) {
  const { fpOpen, fpTitle, fpClose, fpStop, fpGoBrowse, fpGoUpload, fpBrowseStyle, fpUploadStyle,
    fpIsBrowse, fpIsUpload, fpQuery, fpSetQuery, fpTypeVal, fpSetType, fpTypeOptions, fpRows, fpEmpty, fpEmptyNote,
    fpCount, fpAttach, fpName, fpSetName, fpKindVal, fpSetKind, fpKindOptions, fpExtNote, fpUpload, fpFilesPicked } = vm;
  const fileInputRef = useRef(null);
  return (
    <React.Fragment>
{Boolean(fpOpen) && (
<div onClick={fpClose} style={{"position":"fixed","inset":"0","zIndex":"190","background":"rgba(31,8,20,.5)","display":"flex","alignItems":"center","justifyContent":"center","padding":"28px"}}>
<div onClick={fpStop} className="blscroll" style={{"width":"100%","maxWidth":"660px","maxHeight":"100%","background":"var(--paper)","borderRadius":"20px","boxShadow":"var(--shadow-xl)","overflowY":"auto","animation":"blrise .28s var(--ease-out)"}}>
<div style={{"position":"sticky","top":"0","background":"var(--paper)","padding":"18px 22px","borderBottom":"1px solid var(--line-200)","zIndex":"2"}}>
<div style={{"display":"flex","alignItems":"flex-start","justifyContent":"space-between","gap":"12px"}}>
<div>
<div style={{"fontSize":"11px","fontWeight":"700","letterSpacing":".1em","textTransform":"uppercase","color":"var(--orchid-500)"}}>Document repository</div>
<h3 style={{"fontFamily":"'Sora'","fontWeight":"700","fontSize":"19px","color":"var(--ink-900)","margin":"4px 0 0"}}>{fpTitle}</h3>
</div>
<button onClick={fpClose} style={{"width":"32px","height":"32px","borderRadius":"10px","border":"1px solid var(--line-300)","background":"var(--paper)","cursor":"pointer","display":"flex","alignItems":"center","justifyContent":"center","flexShrink":"0"}}>
<Icon name={"x"} style={{"width":"16px","height":"16px","color":"var(--ink-700)"}} />
</button>
</div>
<div style={{"display":"inline-flex","background":"var(--surface-50)","border":"1px solid var(--line-300)","borderRadius":"11px","padding":"3px","marginTop":"13px"}}>
<button onClick={fpGoBrowse} style={cssTextToObject(fpBrowseStyle)}>
<Icon name={"folder-open"} style={{"width":"14px","height":"14px"}} />
Browse repository
</button>
<button onClick={fpGoUpload} style={cssTextToObject(fpUploadStyle)}>
<Icon name={"upload"} style={{"width":"14px","height":"14px"}} />
Upload new
</button>
</div>
</div>

{Boolean(fpIsBrowse) && (
<React.Fragment>
<div style={{"padding":"16px 22px"}}>
<div style={{"display":"flex","gap":"9px","marginBottom":"13px","flexWrap":"wrap"}}>
<div style={{"position":"relative","flex":"1","minWidth":"180px"}}>
<Icon name={"search"} style={{"width":"14px","height":"14px","color":"var(--ink-400)","position":"absolute","left":"11px","top":"11px"}} />
<input value={fpQuery} onInput={fpSetQuery} placeholder="Search files, task, uploader…" style={{"width":"100%","padding":"9px 11px 9px 33px","border":"1px solid var(--line-300)","borderRadius":"10px","fontSize":"12.5px","outline":"none"}} />
</div>
<select value={fpTypeVal} onChange={fpSetType} style={{"padding":"9px 11px","border":"1px solid var(--line-300)","borderRadius":"10px","fontSize":"12.5px","background":"var(--paper)"}}>
{(fpTypeOptions || []).map((o, $i) => (<option key={$i} value={o}>{o}</option>))}
</select>
</div>
<div style={{"display":"flex","flexDirection":"column","gap":"7px"}}>
{(fpRows || []).map((f, $i) => (
<button key={$i} onClick={f.toggle} style={cssTextToObject(f.rowStyle)}>
<span style={cssTextToObject(`width:30px;height:30px;border-radius:9px;display:flex;align-items:center;justify-content:center;background:${f.iconBg};flex-shrink:0`)}>
<Icon name={f.icon} style={cssTextToObject(`width:14px;height:14px;color:${f.iconColor}`)} />
</span>
<span style={{"flex":"1","minWidth":"0"}}>
<span style={{"display":"block","fontFamily":"'Space Mono'","fontSize":"11.5px","fontWeight":"700","color":"var(--ink-900)"}}>{f.name}</span>
<span style={{"display":"block","fontSize":"10.5px","color":"var(--ink-500)","marginTop":"1px"}}>{f.source} · {f.where} · {f.by}</span>
</span>
<span style={{"fontSize":"10px","fontWeight":"700","color":"var(--ink-400)","flexShrink":"0"}}>{f.kind}</span>
</button>
))}
</div>
{Boolean(fpEmpty) && (
<div style={{"padding":"34px","textAlign":"center","color":"var(--ink-500)"}}>
<Icon name={"folder-search"} style={{"width":"22px","height":"22px","color":"var(--ink-400)"}} />
<div style={{"fontSize":"12.5px","fontWeight":"600","marginTop":"8px"}}>{fpEmptyNote}</div>
</div>
)}
</div>
<div style={{"position":"sticky","bottom":"0","background":"var(--paper)","padding":"14px 22px","borderTop":"1px solid var(--line-200)","display":"flex","alignItems":"center","gap":"10px"}}>
<span style={{"flex":"1","fontSize":"12px","fontWeight":"700","color":"var(--ink-500)"}}>{fpCount}</span>
<button onClick={fpClose} style={{"padding":"10px 16px","border":"1px solid var(--line-300)","background":"var(--paper)","borderRadius":"11px","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","cursor":"pointer"}}>Cancel</button>
<button onClick={fpAttach} style={{"display":"flex","alignItems":"center","gap":"6px","padding":"10px 18px","border":"none","background":"#7A1C46","color":"#fff","borderRadius":"11px","fontSize":"12.5px","fontWeight":"700","cursor":"pointer"}}>
<Icon name={"paperclip"} style={{"width":"13px","height":"13px"}} />
Attach selected
</button>
</div>
</React.Fragment>
)}

{Boolean(fpIsUpload) && (
<React.Fragment>
<div style={{"padding":"16px 22px"}}>
<input ref={fileInputRef} type="file" multiple onChange={fpFilesPicked} style={{"display":"none"}} />
<button onClick={() => fileInputRef.current && fileInputRef.current.click()} style={{"width":"100%","border":"1.5px dashed var(--line-300)","borderRadius":"14px","background":"var(--surface-50)","padding":"24px","textAlign":"center","marginBottom":"14px","cursor":"pointer"}}>
<Icon name={"upload-cloud"} style={{"width":"22px","height":"22px","color":"var(--orchid-600)"}} />
<div style={{"fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginTop":"7px"}}>Choose files from your device</div>
<div style={{"fontSize":"11px","color":"var(--ink-500)","marginTop":"2px"}}>Opens your file explorer — the file attaches immediately once selected.</div>
</button>
<div style={{"fontSize":"11px","color":"var(--ink-500)","marginBottom":"11px"}}>Or name a placeholder file instead:</div>
<div style={{"display":"grid","gridTemplateColumns":"1.6fr 1fr","gap":"11px"}}>
<div>
<label style={{"display":"block","fontSize":"12px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"5px"}}>File name</label>
<input value={fpName} onInput={fpSetName} placeholder="turnitin-similarity-report" style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13px","outline":"none"}} />
</div>
<div>
<label style={{"display":"block","fontSize":"12px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"5px"}}>Type</label>
<select value={fpKindVal} onChange={fpSetKind} style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13px","background":"var(--paper)"}}>
{(fpKindOptions || []).map((o, $i) => (<option key={$i} value={o}>{o}</option>))}
</select>
</div>
</div>
<div style={{"display":"flex","alignItems":"center","gap":"5px","marginTop":"7px","fontFamily":"'Space Mono'","fontSize":"11px","fontWeight":"700","color":"var(--orchid-700)"}}>
<Icon name={"file-check"} style={{"width":"11px","height":"11px"}} />
{fpExtNote}
</div>
</div>
<div style={{"position":"sticky","bottom":"0","background":"var(--paper)","padding":"14px 22px","borderTop":"1px solid var(--line-200)","display":"flex","justifyContent":"flex-end","gap":"10px"}}>
<button onClick={fpClose} style={{"padding":"10px 16px","border":"1px solid var(--line-300)","background":"var(--paper)","borderRadius":"11px","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","cursor":"pointer"}}>Cancel</button>
<button onClick={fpUpload} style={{"display":"flex","alignItems":"center","gap":"6px","padding":"10px 18px","border":"none","background":"#7A1C46","color":"#fff","borderRadius":"11px","fontSize":"12.5px","fontWeight":"700","cursor":"pointer"}}>
<Icon name={"upload"} style={{"width":"13px","height":"13px"}} />
Upload & attach
</button>
</div>
</React.Fragment>
)}

</div>
</div>
)}
    </React.Fragment>
  );
}
