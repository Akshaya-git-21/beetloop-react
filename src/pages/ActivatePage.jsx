import React from 'react';
import Icon from '../components/Icon.jsx';
import { cssTextToObject } from '../utils/cssText.js';

export default function ActivatePage({ vm }) {
  const { activateEmail, activateRoleLabel, activateIsRecovery, authBusy, backToLogin, confirmPass, doActivate, mfaBg, mfaX, newPass, onConfirm, onNewPass, pw1, pw2, pw3, pw4, pwLabel, toggleMfa } = vm;
  return (
    <React.Fragment>


<div style={{"minHeight":"100vh","display":"flex","alignItems":"center","justifyContent":"center","padding":"40px 24px","background":"linear-gradient(160deg,var(--surface-100),#F1E9EF)"}}>

  
<div style={{"width":"100%","maxWidth":"460px","background":"var(--paper)","border":"1px solid var(--line-300)","borderRadius":"24px","boxShadow":"var(--shadow-lg)","padding":"36px 34px","animation":"blrise .5s var(--ease-out)"}}>

    
<div style={{"display":"flex","alignItems":"center","gap":"10px","marginBottom":"22px"}}>

      
<div style={{"width":"34px","height":"34px","borderRadius":"10px","background":"#7A1C46","display":"flex","alignItems":"center","justifyContent":"center"}}>
<Icon name={"infinity"} style={{"width":"19px","height":"19px","color":"#fff"}} />
</div>

      
<span style={{"fontFamily":"'Sora'","fontWeight":"800","letterSpacing":".14em","fontSize":"15px","color":"var(--ink-900)"}}>
BEETLOOP
</span>

    
</div>

    
<div style={{"fontFamily":"'Manrope'","fontWeight":"700","fontSize":"11.5px","letterSpacing":".14em","textTransform":"uppercase","color":"var(--orchid-500)"}}>
{activateIsRecovery ? 'Password reset' : 'Account activation'}
</div>


<h2 style={{"fontFamily":"'Sora'","fontWeight":"700","fontSize":"24px","color":"var(--ink-900)","margin":"8px 0 4px"}}>
{activateIsRecovery ? 'Set a new password' : 'Set up your account'}
</h2>


<p style={{"margin":"0 0 22px","color":"var(--ink-500)","fontSize":"14px"}}>
{activateIsRecovery ? (
  <React.Fragment>
Resetting password for
<strong style={{"color":"var(--ink-700)"}}>{activateEmail || 'your account'}</strong>
  </React.Fragment>
) : (
  <React.Fragment>
Invited as
<strong style={{"color":"var(--ink-700)"}}>{activateRoleLabel || 'team member'}</strong>
{activateEmail ? (' · '+activateEmail) : ''}
  </React.Fragment>
)}
</p>


    
<label style={{"display":"block","fontSize":"13px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"7px"}}>
Create password
</label>

    
<input type="password" value={newPass} onInput={onNewPass} placeholder="Minimum 12 characters" style={{"width":"100%","padding":"12px 14px","border":"1px solid var(--line-300)","borderRadius":"14px","fontSize":"14.5px","marginBottom":"10px","outline":"none"}} />

    
<div style={{"display":"flex","gap":"5px","marginBottom":"6px"}}>

      
<div style={cssTextToObject(`flex:1;height:5px;border-radius:99px;background:${pw1}`)} />

      
<div style={cssTextToObject(`flex:1;height:5px;border-radius:99px;background:${pw2}`)} />

      
<div style={cssTextToObject(`flex:1;height:5px;border-radius:99px;background:${pw3}`)} />

      
<div style={cssTextToObject(`flex:1;height:5px;border-radius:99px;background:${pw4}`)} />

    
</div>

    
<div style={{"fontSize":"12px","color":"var(--ink-500)","marginBottom":"16px"}}>
{pwLabel} · 12+ chars, upper, lower, number & symbol
</div>


    
<label style={{"display":"block","fontSize":"13px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"7px"}}>
Confirm password
</label>

    
<input type="password" value={confirmPass} onInput={onConfirm} placeholder="Re-enter password" style={{"width":"100%","padding":"12px 14px","border":"1px solid var(--line-300)","borderRadius":"14px","fontSize":"14.5px","marginBottom":"18px","outline":"none"}} />


    
<div style={{"display":"flex","alignItems":"center","justifyContent":"space-between","background":"var(--surface-50)","border":"1px solid var(--line-300)","borderRadius":"14px","padding":"12px 14px","marginBottom":"22px"}}>

      
<div style={{"display":"flex","alignItems":"center","gap":"10px"}}>
<Icon name={"shield-check"} style={{"width":"18px","height":"18px","color":"var(--verify-500)"}} />
<div>
<div style={{"fontSize":"13.5px","fontWeight":"700","color":"var(--ink-900)"}}>
Enable two-factor auth
</div>
<div style={{"fontSize":"12px","color":"var(--ink-500)"}}>
Recommended for your account
</div>
</div>
</div>

      
<button onClick={toggleMfa} style={cssTextToObject(`width:44px;height:26px;border-radius:99px;border:none;cursor:pointer;position:relative;transition:.2s;background:${mfaBg}`)}>
<span style={cssTextToObject(`position:absolute;top:3px;width:20px;height:20px;border-radius:50%;background:var(--paper);transition:.2s;left:${mfaX}`)} />
</button>

    
</div>


    
<button onClick={doActivate} disabled={Boolean(authBusy)} style={{"width":"100%","padding":"13px","background":"#7A1C46","color":"#fff","border":"none","borderRadius":"14px","fontSize":"15px","fontWeight":"700","cursor":authBusy?"default":"pointer","opacity":authBusy?"0.7":"1"}}>
{authBusy ? 'Activating…' : (activateIsRecovery ? 'Set new password & sign in' : 'Activate & sign in')}
</button>

    
<p style={{"textAlign":"center","fontSize":"13px","margin":"18px 0 0"}}>
<a href="#" onClick={backToLogin} style={{"fontWeight":"600","color":"var(--ink-500)"}}>
← Back to sign in
</a>
</p>

  
</div>


</div>


    </React.Fragment>
  );
}
