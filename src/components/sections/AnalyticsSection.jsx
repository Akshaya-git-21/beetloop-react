import React from 'react';
import Icon from '../../components/Icon.jsx';
import { cssTextToObject } from '../../utils/cssText.js';

export default function AnalyticsSection({ vm }) {
  const { analyticsCards, showAnalytics } = vm;
  return (
    <React.Fragment>
{Boolean(showAnalytics) && (
<React.Fragment>

          
<div style={{"display":"grid","gridTemplateColumns":"repeat(3,1fr)","gap":"16px"}}>

            
{(analyticsCards || []).map((a, $index) => (
<React.Fragment key={$index}>

              
<div style={cssTextToObject(`background:#fff;border:1px solid var(--line-300);border-radius:20px;box-shadow:var(--shadow-sm);padding:20px;opacity:${a.opacity}`)}>

                
<div style={{"display":"flex","alignItems":"center","justifyContent":"space-between","marginBottom":"14px"}}>
<span style={cssTextToObject(`width:36px;height:36px;border-radius:11px;display:flex;align-items:center;justify-content:center;background:${a.iconBg}`)}>
<Icon name={a.icon} style={cssTextToObject(`width:18px;height:18px;color:${a.iconColor}`)} />
</span>
{Boolean(a.locked) && (
<React.Fragment>
<Icon name={"lock"} style={{"width":"15px","height":"15px","color":"var(--ink-400)"}} />
</React.Fragment>
)}
</div>

                
<div style={{"fontSize":"15px","fontWeight":"700","color":"var(--ink-900)"}}>
{a.title}
</div>

                
<div style={{"fontSize":"13px","color":"var(--ink-500)","marginTop":"4px","lineHeight":"1.5"}}>
{a.desc}
</div>

                
<div style={cssTextToObject(`margin-top:14px;font-size:12px;font-weight:700;color:${a.tagColor}`)}>
{a.tag}
</div>

              
</div>

            
</React.Fragment>
))}

          
</div>

        
</React.Fragment>
)}
    </React.Fragment>
  );
}
