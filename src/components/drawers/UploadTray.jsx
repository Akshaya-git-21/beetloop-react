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
<Icon name={r.error?"alert-triangle":(r.done?"check-circle-2":"upload-cloud")} style={{"width":"14px","height":"14px","color":r.error?"var(--danger-600)":"var(--orchid-600)","flexShrink":"0"}} />
<span style={{"fontSize":"12px","fontWeight":"700","color":"var(--ink-900)","flex":"1","minWidth":"0","overflow":"hidden","textOverflow":"ellipsis","whiteSpace":"nowrap"}}>{r.name}</span>
</div>
<div style={{"height":"5px","borderRadius":"99px","background":"var(--line-200)","overflow":"hidden","marginBottom":"5px"}}>
<div style={{"height":"100%","borderRadius":"99px","width":r.barPct+"%","background":r.barColor,"transition":"width .2s linear"}} />
</div>
<div style={{"fontSize":"10.5px","color":"var(--ink-500)"}}>{r.label}</div>
</div>
))}
</div>
)}
    </React.Fragment>
  );
}
