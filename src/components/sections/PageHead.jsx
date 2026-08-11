import React from 'react';
import Icon from '../../components/Icon.jsx';
import { cssTextToObject } from '../../utils/cssText.js';

export default function PageHead({ vm }) {
  const { accessBg, accessBorder, accessColor, accessIcon, accessLabel, page, primaryAction, showPageHead } = vm;
  return (
    <React.Fragment>
{Boolean(showPageHead) && (
<React.Fragment>

        
<div style={{"display":"flex","alignItems":"flex-start","justifyContent":"space-between","gap":"16px","marginBottom":"22px","flexWrap":"wrap"}}>

          
<div>

            
<div style={{"display":"flex","alignItems":"center","gap":"9px","marginBottom":"5px"}}>
<Icon name={page.icon} style={{"width":"15px","height":"15px","color":"var(--orchid-500)"}} />
<span style={{"fontSize":"11.5px","fontWeight":"700","letterSpacing":".12em","textTransform":"uppercase","color":"var(--orchid-500)"}}>
{page.eyebrow}
</span>
</div>

            
<h1 style={{"fontFamily":"'Sora'","fontWeight":"700","fontSize":"29px","letterSpacing":"-.02em","color":"var(--ink-900)","margin":"0"}}>
{page.title}
</h1>

            
<p style={{"margin":"6px 0 0","color":"var(--ink-500)","fontSize":"14.5px"}}>
{page.sub}
</p>

          
</div>

          
<div style={{"display":"flex","alignItems":"center","gap":"10px"}}>

            
<div style={cssTextToObject(`display:flex;align-items:center;gap:7px;background:${accessBg};border:1px solid ${accessBorder};color:${accessColor};padding:7px 13px;border-radius:999px;font-size:12.5px;font-weight:700`)}>
<Icon name={accessIcon} style={{"width":"14px","height":"14px"}} />
{accessLabel}
</div>

            
{Boolean(page.canEdit) && (
<React.Fragment>

              
<button onClick={primaryAction} style={{"display":"flex","alignItems":"center","gap":"7px","background":"#7A1C46","color":"#fff","border":"none","padding":"10px 16px","borderRadius":"12px","fontSize":"13.5px","fontWeight":"700","cursor":"pointer","boxShadow":"0 8px 18px -8px rgba(122,28,70,.55)"}}>
<Icon name={page.actionIcon} style={{"width":"15px","height":"15px"}} />
{page.actionLabel}
</button>

            
</React.Fragment>
)}

          
</div>

        
</div>

        
</React.Fragment>
)}
    </React.Fragment>
  );
}
