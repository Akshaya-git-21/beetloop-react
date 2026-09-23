import React from 'react';
import Icon from '../../components/Icon.jsx';

export default function UploadTray({ vm }) {
  const { utRows, utHasRows } = vm;
  return (
    <React.Fragment>
{Boolean(utHasRows) && (
<div style={{"position":"fixed","bottom":"24px","right":"24px","width":"300px","display":"flex","flexDirection":"column","gap":"8px","zIndex":"195"}}>
{(utRows || []).map((r, $i) => (
<div key={$i} style={{"background":"var(--paper)","border":"1px solid var(--line-300)","borderRadius":"14px","boxShadow":"var(--shadow-lg)","padding":"11px 14px","animation":"blrise .25s var(--ease-out)"}}>
<div style={{"display":"flex","alignItems":"center","gap":"8px","marginBottom":"6px"}}>
<Icon name={r.error?"alert-triangle":(r.done?"circle-check":"upload-cloud")} style={{"width":"14px","height":"14px","color":r.error?"var(--danger-600)":"var(--orchid-600)","flexShrink":"0"}} />
<span style={{"fontSize":"12px","fontWeight":"700","color":"var(--ink-900)","flex":"1","minWidth":"0","overflow":"hidden","textOverflow":"ellipsis","whiteSpace":"nowrap"}}>{r.name}</span>
</div>
<div style={{"height":"5px","borderRadius":"99px","background":"var(--line-200)","overflow":"hidden","marginBottom":"5px"}}>
<div style={{"height":"100%","borderRadius":"99px","width":r.barPct+"%","background":r.barColor,"transition":"width .2s linear"}} />
</div>
<div style={{"fontSize":"10.5px","color":"var(--ink-500)"}}>{r.label}</div>
{Boolean(r.error) && (
<div style={{"display":"flex","gap":"7px","marginTop":"8px"}}>
<button onClick={r.retry} style={{"flex":"1","padding":"6px 10px","border":"none","background":"var(--danger-500)","color":"#fff","borderRadius":"8px","fontSize":"11px","fontWeight":"700","cursor":"pointer"}}>Retry</button>
<button onClick={r.dismiss} style={{"padding":"6px 10px","border":"1px solid var(--line-300)","background":"var(--paper)","color":"var(--ink-600)","borderRadius":"8px","fontSize":"11px","fontWeight":"700","cursor":"pointer"}}>Dismiss</button>
</div>
)}
</div>
))}
</div>
)}
    </React.Fragment>
  );
}
