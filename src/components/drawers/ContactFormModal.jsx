import React from 'react';
import Icon from '../../components/Icon.jsx';

export default function ContactFormModal({ vm }) {
  const { cnFormOpen, cnClose, cnStop, cnFromDaily, cnFromDailyNote, cnf, cnSetName, cnSetCompany, cnSetPhone, cnSetEmail,
    cnSetCountry, cnCountryOptions, cnSetService, cnServiceOptions, cnSetSource, cnSourceOptions, cnSetStage, cnStageOptions,
    cnSetValue, cnSetDate, cnSetDesc, cnSetBrand, cnBrandOptions, cnBrandVal, cnBrandLocked, cnBrandNote, cnSave } = vm;
  const f = cnf || {};
  return (
    <React.Fragment>
{Boolean(cnFormOpen) && (
<div onClick={cnClose} style={{"position":"fixed","inset":"0","zIndex":"170","background":"rgba(31,8,20,.5)","display":"flex","alignItems":"center","justifyContent":"center","padding":"28px"}}>
<div onClick={cnStop} className="blscroll" style={{"width":"100%","maxWidth":"640px","maxHeight":"100%","background":"#fff","borderRadius":"20px","boxShadow":"var(--shadow-xl)","overflowY":"auto","animation":"blrise .28s var(--ease-out)"}}>
<div style={{"position":"sticky","top":"0","background":"#fff","borderBottom":"1px solid var(--line-200)","padding":"18px 22px","display":"flex","alignItems":"flex-start","justifyContent":"space-between","gap":"12px","zIndex":"2"}}>
<div>
<div style={{"fontSize":"11px","fontWeight":"700","letterSpacing":".1em","textTransform":"uppercase","color":"var(--orchid-500)"}}>Lead pipeline</div>
<h3 style={{"fontFamily":"'Sora'","fontWeight":"700","fontSize":"19px","color":"var(--beet-700)","margin":"4px 0 0"}}>Add lead</h3>
</div>
<button onClick={cnClose} style={{"width":"32px","height":"32px","borderRadius":"10px","border":"1px solid var(--line-300)","background":"#fff","cursor":"pointer","display":"flex","alignItems":"center","justifyContent":"center","flexShrink":"0"}}>
<Icon name={"x"} style={{"width":"16px","height":"16px","color":"var(--ink-700)"}} />
</button>
</div>
<div style={{"padding":"18px 22px","display":"flex","flexDirection":"column","gap":"12px"}}>
{Boolean(cnFromDaily) && (
<div style={{"display":"flex","alignItems":"center","gap":"9px","background":"var(--info-100)","border":"1px solid #CBE3EC","color":"var(--info-600)","padding":"10px 13px","borderRadius":"12px","fontSize":"12px","fontWeight":"600"}}>
<Icon name={"link-2"} style={{"width":"14px","height":"14px","flexShrink":"0"}} />
<span>{cnFromDailyNote}</span>
</div>
)}
<div style={{"display":"grid","gridTemplateColumns":"1fr 1fr","gap":"12px"}}>
<div><label style={{"display":"block","fontSize":"12px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"5px"}}>Name <span style={{"color":"var(--danger-600)"}}>*</span></label>
<input value={f.name||''} onInput={cnSetName} placeholder="Dr. Ananya Krishnan" style={{"width":"100%","minWidth":"0","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13px","outline":"none"}} /></div>
<div><label style={{"display":"block","fontSize":"12px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"5px"}}>Company</label>
<input value={f.company||''} onInput={cnSetCompany} placeholder="VitalFoods Pvt Ltd" style={{"width":"100%","minWidth":"0","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13px","outline":"none"}} /></div>
<div><label style={{"display":"block","fontSize":"12px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"5px"}}>Phone</label>
<input value={f.phone||''} onInput={cnSetPhone} placeholder="+91 98400 22114" style={{"width":"100%","minWidth":"0","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13px","outline":"none"}} /></div>
<div><label style={{"display":"block","fontSize":"12px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"5px"}}>Email</label>
<input value={f.email||''} onInput={cnSetEmail} placeholder="name@company.com" style={{"width":"100%","minWidth":"0","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13px","outline":"none"}} /></div>
<div><label style={{"display":"block","fontSize":"12px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"5px"}}>Country</label>
<select value={f.country||''} onChange={cnSetCountry} style={{"width":"100%","minWidth":"0","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13px","background":"#fff"}}>
{(cnCountryOptions||[]).map((o,$i)=>(<option key={$i} value={o}>{o}</option>))}
</select></div>
<div><label style={{"display":"block","fontSize":"12px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"5px"}}>Brand</label>
{cnBrandLocked ? (
<div style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13px","background":"var(--surface-50)","color":"var(--ink-700)","fontWeight":"600"}}>{cnBrandVal}</div>
) : (
<select value={cnBrandVal||''} onChange={cnSetBrand} style={{"width":"100%","minWidth":"0","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13px","background":"#fff"}}>
{(cnBrandOptions||[]).map((o,$i)=>(<option key={$i} value={o}>{o}</option>))}
</select>
)}
{Boolean(cnBrandNote) && (<div style={{"fontSize":"10.5px","color":"var(--ink-500)","marginTop":"4px"}}>{cnBrandNote}</div>)}
</div>
<div><label style={{"display":"block","fontSize":"12px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"5px"}}>Service requested</label>
<select value={f.service||''} onChange={cnSetService} style={{"width":"100%","minWidth":"0","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13px","background":"#fff"}}>
{(cnServiceOptions||[]).map((o,$i)=>(<option key={$i} value={o}>{o}</option>))}
</select></div>
<div><label style={{"display":"block","fontSize":"12px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"5px"}}>Source</label>
<select value={f.source||''} onChange={cnSetSource} style={{"width":"100%","minWidth":"0","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13px","background":"#fff"}}>
{(cnSourceOptions||[]).map((o,$i)=>(<option key={$i} value={o}>{o}</option>))}
</select></div>
<div><label style={{"display":"block","fontSize":"12px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"5px"}}>Stage</label>
<select value={f.stage||''} onChange={cnSetStage} style={{"width":"100%","minWidth":"0","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13px","background":"#fff"}}>
{(cnStageOptions||[]).map((o,$i)=>(<option key={$i} value={o}>{o}</option>))}
</select></div>
<div><label style={{"display":"block","fontSize":"12px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"5px"}}>Est. value</label>
<input value={f.value||''} onInput={cnSetValue} placeholder="₹1,20,000" style={{"width":"100%","minWidth":"0","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13px","outline":"none"}} /></div>
<div><label style={{"display":"block","fontSize":"12px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"5px"}}>Enquiry date</label>
<input type="date" value={f.date||''} onInput={cnSetDate} style={{"width":"100%","minWidth":"0","padding":"9px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13px","outline":"none","color":"var(--ink-700)"}} /></div>
</div>
<div><label style={{"display":"block","fontSize":"12px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"5px"}}>Description / requirement</label>
<textarea value={f.desc||''} onInput={cnSetDesc} rows="3" placeholder="What the prospect asked for, timelines, budget signals…" style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13px","outline":"none","resize":"vertical"}} /></div>
</div>
<div style={{"position":"sticky","bottom":"0","background":"#fff","padding":"14px 22px","borderTop":"1px solid var(--line-200)","display":"flex","justifyContent":"flex-end","gap":"10px"}}>
<button onClick={cnClose} style={{"padding":"10px 17px","border":"1px solid var(--line-300)","background":"#fff","borderRadius":"11px","fontSize":"13px","fontWeight":"700","color":"var(--ink-700)","cursor":"pointer"}}>Cancel</button>
<button onClick={cnSave} style={{"display":"flex","alignItems":"center","gap":"7px","padding":"10px 20px","border":"none","background":"#7A1C46","color":"#fff","borderRadius":"11px","fontSize":"13px","fontWeight":"700","cursor":"pointer"}}>
<Icon name={"check"} style={{"width":"14px","height":"14px"}} />
Save lead
</button>
</div>
</div>
</div>
)}
    </React.Fragment>
  );
}
