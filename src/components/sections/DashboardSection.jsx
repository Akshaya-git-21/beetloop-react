import React from 'react';
import Icon from '../../components/Icon.jsx';
import { cssTextToObject } from '../../utils/cssText.js';

export default function DashboardSection({ vm }) {
  const { accessSummary, dashExtras, dashExtrasLabel, dashAccessLine, dashPanelTitle, dashRows, kpis, noop, scopeBox, showDash,
    dashHasLeads, dashLeadOpen, dashLeadStages, dashLeadToday, dashLeadW, dashLeadBar, dashLeadTargetNote,
    dashLeadOpenDaily, dashLeadTopSvc,
    dashShowKpis, dashShowNeedsAttention, dashShowActivity, dashShowScope, dashShowAccessSummary } = vm;
  return (
    <React.Fragment>
{Boolean(showDash) && (
<React.Fragment>


{Boolean(dashShowKpis) && (
<div style={{"display":"grid","gridTemplateColumns":"repeat(4,1fr)","gap":"16px","marginBottom":"20px"}}>


{(kpis || []).map((k, $index) => (
<React.Fragment key={$index}>

              
<div style={{"background":"var(--paper)","border":"1px solid var(--line-300)","borderRadius":"20px","boxShadow":"var(--shadow-sm)","padding":"18px 20px"}}>

                
<div style={{"display":"flex","alignItems":"center","justifyContent":"space-between","marginBottom":"12px"}}>
<span style={{"fontSize":"13px","fontWeight":"600","color":"var(--ink-500)"}}>
{k.label}
</span>
<span style={cssTextToObject(`width:32px;height:32px;border-radius:10px;display:flex;align-items:center;justify-content:center;background:${k.iconBg}`)}>
<Icon name={k.icon} style={cssTextToObject(`width:16px;height:16px;color:${k.iconColor}`)} />
</span>
</div>

                
<div style={{"fontFamily":"'Sora'","fontWeight":"800","fontSize":"30px","letterSpacing":"-.02em","color":"var(--ink-900)"}}>
{k.value}
</div>

                
<div style={cssTextToObject(`display:flex;align-items:center;gap:5px;margin-top:6px;font-size:12.5px;font-weight:700;color:${k.deltaColor}`)}>
<Icon name={k.deltaIcon} style={{"width":"13px","height":"13px"}} />
{k.delta}
</div>

              
</div>

            
</React.Fragment>
))}


</div>
)}

{Boolean(dashShowNeedsAttention) && (
<div style={{"background":"var(--paper)","border":"1px solid var(--line-300)","borderRadius":"18px","boxShadow":"var(--shadow-sm)","padding":"14px 18px","marginBottom":"20px"}}>
<div style={{"display":"flex","alignItems":"center","gap":"7px","marginBottom":"11px","flexWrap":"wrap"}}>
<Icon name="bell-ring" style={{"width":"13px","height":"13px","color":"var(--orchid-600)"}} />
<span style={{"fontSize":"10.5px","fontWeight":"800","letterSpacing":".06em","textTransform":"uppercase","color":"var(--ink-400)","flex":"1"}}>{dashExtrasLabel}</span>
<span style={{"display":"inline-flex","alignItems":"center","gap":"5px","fontSize":"10px","fontWeight":"700","padding":"2px 9px","borderRadius":"999px","background":"var(--surface-50)","border":"1px solid var(--line-300)","color":"var(--ink-500)"}}>
<Icon name="shield" style={{"width":"10px","height":"10px"}} />{dashAccessLine}
</span>
</div>
<div style={{"display":"grid","gridTemplateColumns":"repeat(auto-fit,minmax(128px,1fr))","gap":"14px"}}>
{(dashExtras || []).map((x, $index) => (
<React.Fragment key={$index}>
<div style={{"minWidth":"0"}}>
<div style={{"fontSize":"11px","fontWeight":"700","color":"var(--ink-500)"}}>{x.label}</div>
<div style={cssTextToObject(`font-family:'Sora';font-weight:800;font-size:21px;color:${x.color};margin-top:2px`)}>{x.value}</div>
<div style={{"fontSize":"10.5px","color":"var(--ink-400)","marginTop":"1px","lineHeight":"1.4"}}>{x.sub}</div>
</div>
</React.Fragment>
))}
</div>
</div>
)}

{Boolean(dashHasLeads) && (
<div style={{"display":"grid","gridTemplateColumns":"repeat(auto-fit,minmax(420px,1fr))","gap":"16px","marginBottom":"16px"}}>
<div style={{"background":"var(--paper)","border":"1px solid var(--line-300)","borderRadius":"20px","boxShadow":"var(--shadow-sm)","padding":"22px"}}>
<div style={{"display":"flex","alignItems":"center","justifyContent":"space-between","marginBottom":"16px","gap":"12px","flexWrap":"wrap"}}>
<h3 style={{"fontFamily":"'Sora'","fontWeight":"700","fontSize":"17px","color":"var(--ink-900)","margin":"0"}}>Lead pipeline</h3>
<button onClick={dashLeadOpen} style={{"display":"inline-flex","alignItems":"center","gap":"5px","padding":"6px 12px","border":"1px solid var(--line-300)","background":"var(--paper)","color":"var(--ink-700)","borderRadius":"9px","fontSize":"11.5px","fontWeight":"700","cursor":"pointer"}}>
<Icon name={"filter"} style={{"width":"12px","height":"12px"}} />
Open pipeline
</button>
</div>
<div style={{"display":"flex","flexDirection":"column","gap":"11px"}}>
{(dashLeadStages || []).map((s, $index) => (
<div key={$index} style={{"display":"flex","alignItems":"center","gap":"12px","flexWrap":"wrap"}}>
<span style={{"minWidth":"88px","flexShrink":"0"}}>
<span style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-900)"}}>{s.label}</span>
<span style={{"display":"block","fontSize":"10.5px","color":"var(--ink-500)"}}>{s.rate}</span>
</span>
<div style={{"flex":"1","minWidth":"120px","height":"20px","borderRadius":"7px","background":"var(--line-200)","overflow":"hidden"}}>
<div style={cssTextToObject(`height:100%;border-radius:7px;width:${s.w};background:${s.color}`)} />
</div>
<span style={{"fontFamily":"'Sora'","fontWeight":"800","fontSize":"16px","color":"var(--ink-900)","minWidth":"36px","textAlign":"right","flexShrink":"0"}}>{s.value}</span>
</div>
))}
</div>
</div>
<div style={{"display":"flex","flexDirection":"column","gap":"16px"}}>
<div style={{"background":"var(--beet-700)","borderRadius":"20px","padding":"20px 22px","color":"#fff"}}>
<div style={{"display":"flex","alignItems":"center","gap":"8px","marginBottom":"9px"}}>
<Icon name={"user-plus"} style={{"width":"15px","height":"15px","color":"var(--orchid-300)"}} />
<span style={{"fontSize":"12px","fontWeight":"700","flex":"1"}}>Leads today</span>
<span style={{"fontFamily":"'Sora'","fontWeight":"800","fontSize":"22px"}}>{dashLeadToday}</span>
</div>
<div style={{"height":"7px","borderRadius":"99px","background":"rgba(255,255,255,.14)","overflow":"hidden"}}>
<div style={cssTextToObject(`height:100%;border-radius:99px;width:${dashLeadW};background:${dashLeadBar}`)} />
</div>
<div style={{"fontSize":"11px","color":"rgba(255,255,255,.75)","marginTop":"7px"}}>{dashLeadTargetNote}</div>
<button onClick={dashLeadOpenDaily} style={{"display":"inline-flex","alignItems":"center","gap":"5px","marginTop":"12px","padding":"6px 12px","border":"1px solid rgba(255,255,255,.28)","background":"transparent","color":"#fff","borderRadius":"9px","fontSize":"11.5px","fontWeight":"700","cursor":"pointer"}}>
<Icon name={"arrow-right"} style={{"width":"12px","height":"12px"}} />
Daily leads
</button>
</div>
<div style={{"background":"var(--paper)","border":"1px solid var(--line-300)","borderRadius":"20px","boxShadow":"var(--shadow-sm)","padding":"18px 20px"}}>
<div style={{"fontSize":"11px","fontWeight":"800","letterSpacing":".06em","textTransform":"uppercase","color":"var(--ink-400)","marginBottom":"11px"}}>Leads by service</div>
<div style={{"display":"flex","flexDirection":"column","gap":"7px"}}>
{(dashLeadTopSvc || []).map((t, $index) => (
<div key={$index} style={{"display":"flex","alignItems":"center","gap":"9px"}}>
<span style={{"fontSize":"12px","fontWeight":"600","color":"var(--ink-900)","flex":"1","minWidth":"0"}}>{t.label}</span>
<span style={{"fontSize":"11px","fontWeight":"700","color":"var(--ink-500)"}}>{t.n}</span>
</div>
))}
</div>
</div>
</div>
</div>
)}

<div style={{"display":"grid","gridTemplateColumns":"1.6fr 1fr","gap":"16px"}}>


{Boolean(dashShowActivity) && (
<div style={{"background":"var(--paper)","border":"1px solid var(--line-300)","borderRadius":"20px","boxShadow":"var(--shadow-sm)","padding":"22px"}}>


<div style={{"display":"flex","alignItems":"center","justifyContent":"space-between","marginBottom":"18px"}}>
<h3 style={{"fontFamily":"'Sora'","fontWeight":"700","fontSize":"17px","color":"var(--ink-900)","margin":"0"}}>
{dashPanelTitle}
</h3>
<a href="#" onClick={noop} style={{"fontSize":"12.5px","fontWeight":"700"}}>
View all
</a>
</div>

              
<div style={{"display":"flex","flexDirection":"column","gap":"2px"}}>

                
{(dashRows || []).map((r, $index) => (
<React.Fragment key={$index}>

                  
<div style={{"display":"flex","alignItems":"center","gap":"14px","padding":"12px 8px","borderBottom":"1px solid var(--line-200)"}}>

                    
<span style={cssTextToObject(`width:36px;height:36px;border-radius:10px;flex-shrink:0;display:flex;align-items:center;justify-content:center;background:${r.iconBg}`)}>
<Icon name={r.icon} style={cssTextToObject(`width:17px;height:17px;color:${r.iconColor}`)} />
</span>

                    
<div style={{"flex":"1","minWidth":"0"}}>
<div style={{"fontSize":"14px","fontWeight":"700","color":"var(--ink-900)"}}>
{r.title}
</div>
<div style={{"fontSize":"12.5px","color":"var(--ink-500)"}}>
{r.sub}
</div>
</div>

                    
<span style={cssTextToObject(`font-size:11.5px;font-weight:700;padding:4px 10px;border-radius:999px;background:${r.tagBg};color:${r.tagColor}`)}>
{r.tag}
</span>

                  
</div>

                
</React.Fragment>
))}


</div>
</div>
)}

<div style={{"display":"flex","flexDirection":"column","gap":"16px"}}>

{Boolean(dashShowScope) && (
<div style={{"background":"linear-gradient(155deg,#3d1024,#7A1C46)","color":"#fff","borderRadius":"20px","padding":"22px"}}>


<div style={{"fontSize":"11.5px","fontWeight":"700","letterSpacing":".1em","textTransform":"uppercase","color":"var(--orchid-300)"}}>
{scopeBox.eyebrow}
</div>


<div style={{"fontFamily":"'Sora'","fontWeight":"800","fontSize":"34px","margin":"8px 0 2px"}}>
{scopeBox.big}
</div>


<div style={{"fontSize":"13px","color":"rgba(255,255,255,.72)"}}>
{scopeBox.sub}
</div>


<div style={{"height":"1px","background":"rgba(255,255,255,.14)","margin":"16px 0"}} />


<div style={{"fontSize":"13px","lineHeight":"1.6","color":"rgba(255,255,255,.82)"}}>
{scopeBox.note}
</div>


</div>
)}

{Boolean(dashShowAccessSummary) && (
<div style={{"background":"var(--paper)","border":"1px solid var(--line-300)","borderRadius":"20px","boxShadow":"var(--shadow-sm)","padding":"20px"}}>


<h3 style={{"fontFamily":"'Sora'","fontWeight":"700","fontSize":"15px","color":"var(--ink-900)","margin":"0 0 14px"}}>
Your access at a glance
</h3>


<div style={{"display":"flex","flexDirection":"column","gap":"9px"}}>


{(accessSummary || []).map((a, $index) => (
<React.Fragment key={$index}>


<div style={{"display":"flex","alignItems":"center","justifyContent":"space-between","gap":"10px"}}>
<span style={{"fontSize":"13px","color":"var(--ink-700)"}}>
{a.mod}
</span>
<span style={cssTextToObject(`font-size:11.5px;font-weight:700;padding:3px 9px;border-radius:999px;background:${a.bg};color:${a.color}`)}>
{a.level}
</span>
</div>


</React.Fragment>
))}


</div>


</div>
)}

</div>

          
</div>

        
</React.Fragment>
)}
    </React.Fragment>
  );
}
