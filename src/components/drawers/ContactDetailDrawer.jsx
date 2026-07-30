import React from 'react';
import Icon from '../../components/Icon.jsx';
import { cssTextToObject } from '../../utils/cssText.js';

export default function ContactDetailDrawer({ vm }) {
  const { cnDrawerOpen, cnD, cnDClose, cnDStop, cnDSetStage, cnStageOptions2, cnMeta, cnLog } = vm;
  const d = cnD || {};
  return (
    <React.Fragment>
{Boolean(cnDrawerOpen) && (
<div onClick={cnDClose} style={{"position":"fixed","inset":"0","zIndex":"60","background":"rgba(31,8,20,.5)","display":"flex","justifyContent":"flex-end"}}>
<div onClick={cnDStop} className="blscroll" style={{"width":"100%","maxWidth":"620px","height":"100%","background":"#fff","boxShadow":"var(--shadow-xl)","overflowY":"auto","animation":"blrise .3s var(--ease-out)"}}>
<div style={{"position":"sticky","top":"0","background":"#fff","borderBottom":"1px solid var(--line-200)","padding":"18px 24px","zIndex":"3"}}>
<div style={{"display":"flex","alignItems":"flex-start","justifyContent":"space-between","gap":"12px"}}>
<div style={{"minWidth":"0"}}>
<div style={{"fontFamily":"'Space Mono'","fontSize":"11px","color":"var(--ink-400)"}}>{d.id}</div>
<h3 style={{"fontFamily":"'Sora'","fontWeight":"700","fontSize":"20px","color":"var(--beet-700)","margin":"4px 0 0"}}>{d.name}</h3>
<div style={{"fontSize":"12.5px","color":"var(--ink-500)","marginTop":"2px"}}>{d.company} · {d.country}</div>
</div>
<button onClick={cnDClose} style={{"width":"34px","height":"34px","borderRadius":"10px","border":"1px solid var(--line-300)","background":"#fff","cursor":"pointer","display":"flex","alignItems":"center","justifyContent":"center","flexShrink":"0"}}>
<Icon name={"x"} style={{"width":"17px","height":"17px","color":"var(--ink-700)"}} />
</button>
</div>
<div style={{"display":"flex","alignItems":"center","gap":"9px","marginTop":"12px"}}>
<span style={{"fontSize":"11.5px","fontWeight":"700","color":"var(--ink-500)"}}>Conversion stage</span>
<select value={d.stage||''} onChange={cnDSetStage} style={cssTextToObject(`padding:7px 13px;border-radius:999px;border:none;font-size:12px;font-weight:700;cursor:pointer;background:${d.stageBg};color:${d.stageColor}`)}>
{(cnStageOptions2||[]).map((o,$i)=>(<option key={$i} value={o}>{o}</option>))}
</select>
</div>
</div>
<div style={{"padding":"18px 24px 30px","display":"flex","flexDirection":"column","gap":"16px"}}>
<div style={{"border":"1px solid var(--line-200)","borderRadius":"14px","overflow":"hidden"}}>
{(cnMeta||[]).map((m,$i)=>(
<div key={$i} style={{"padding":"10px 15px","borderBottom":"1px solid var(--line-200)","display":"flex","gap":"12px"}}>
<span style={{"fontSize":"11.5px","fontWeight":"700","color":"var(--ink-500)","width":"140px","flexShrink":"0"}}>{m.k}</span>
<span style={{"fontSize":"12.5px","color":"var(--ink-900)","fontWeight":"600"}}>{m.v}</span>
</div>
))}
</div>
<div>
<div style={{"fontSize":"11px","fontWeight":"800","letterSpacing":".06em","textTransform":"uppercase","color":"var(--ink-400)","marginBottom":"7px"}}>Requirement</div>
<div style={{"background":"var(--surface-50)","border":"1px solid var(--line-200)","borderRadius":"12px","padding":"13px 15px","fontSize":"13px","color":"var(--ink-700)","lineHeight":"1.55"}}>{d.desc}</div>
</div>
<div>
<div style={{"fontSize":"11px","fontWeight":"800","letterSpacing":".06em","textTransform":"uppercase","color":"var(--ink-400)","marginBottom":"8px"}}>Conversion history</div>
<div style={{"display":"flex","flexDirection":"column","gap":"8px"}}>
{(cnLog||[]).map((l,$i)=>(
<div key={$i} style={{"display":"flex","alignItems":"center","gap":"10px","padding":"9px 13px","background":"var(--surface-50)","border":"1px solid var(--line-200)","borderRadius":"11px"}}>
<Icon name={"activity"} style={{"width":"13px","height":"13px","color":"var(--orchid-600)","flexShrink":"0"}} />
<span style={{"fontSize":"12.5px","fontWeight":"600","color":"var(--ink-900)","flex":"1","minWidth":"0"}}>{l.what}</span>
<span style={{"fontSize":"11px","color":"var(--ink-500)"}}>{l.who}</span>
<span style={{"fontSize":"10.5px","color":"var(--ink-400)"}}>{l.when}</span>
</div>
))}
</div>
</div>
</div>
</div>
</div>
)}
    </React.Fragment>
  );
}
