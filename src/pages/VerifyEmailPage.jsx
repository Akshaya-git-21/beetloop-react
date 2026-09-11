import React from 'react';
import Icon from '../components/Icon.jsx';

export default function VerifyEmailPage({ vm }) {
  const { verifyEmailStatus, verifyEmailMessage, verifyEmailAddress, backToLogin, loginPlatformName, loginLogoUrl } = vm;
  return (
    <div style={{"minHeight":"100vh","display":"flex","alignItems":"center","justifyContent":"center","padding":"40px 24px","background":"linear-gradient(160deg,var(--surface-100),#F1E9EF)"}}>
      <div style={{"width":"100%","maxWidth":"460px","background":"var(--paper)","border":"1px solid var(--line-300)","borderRadius":"24px","boxShadow":"var(--shadow-lg)","padding":"36px 34px","animation":"blrise .5s var(--ease-out)","textAlign":"center"}}>
        <div style={{"display":"flex","alignItems":"center","justifyContent":"center","gap":"10px","marginBottom":"22px"}}>
          <div style={{"width":"34px","height":"34px","borderRadius":"10px","background":"var(--beet-700,#7A1C46)","display":"flex","alignItems":"center","justifyContent":"center","overflow":"hidden","flexShrink":"0"}}>
            {loginLogoUrl ? (<img src={loginLogoUrl} alt={loginPlatformName} style={{"width":"100%","height":"100%","objectFit":"cover"}} />) : (<Icon name={"infinity"} style={{"width":"19px","height":"19px","color":"#fff"}} />)}
          </div>
          <span style={{"fontFamily":"'Sora'","fontWeight":"800","letterSpacing":".14em","fontSize":"15px","color":"var(--ink-900)"}}>{loginPlatformName}</span>
        </div>

        {verifyEmailStatus==='pending' && (
          <React.Fragment>
            <div style={{"width":"48px","height":"48px","borderRadius":"99px","background":"var(--surface-50)","display":"flex","alignItems":"center","justifyContent":"center","margin":"0 auto 16px"}}>
              <Icon name={"loader-circle"} style={{"width":"22px","height":"22px","color":"var(--orchid-600)"}} />
            </div>
            <h2 style={{"fontFamily":"'Sora'","fontWeight":"700","fontSize":"22px","color":"var(--ink-900)","margin":"0 0 6px"}}>Confirming your new email…</h2>
            <p style={{"margin":"0","color":"var(--ink-500)","fontSize":"14px"}}>This only takes a moment.</p>
          </React.Fragment>
        )}

        {verifyEmailStatus==='success' && (
          <React.Fragment>
            <div style={{"width":"48px","height":"48px","borderRadius":"99px","background":"var(--verify-100)","display":"flex","alignItems":"center","justifyContent":"center","margin":"0 auto 16px"}}>
              <Icon name={"check"} style={{"width":"22px","height":"22px","color":"var(--verify-600)"}} />
            </div>
            <h2 style={{"fontFamily":"'Sora'","fontWeight":"700","fontSize":"22px","color":"var(--ink-900)","margin":"0 0 6px"}}>Email confirmed</h2>
            <p style={{"margin":"0 0 24px","color":"var(--ink-500)","fontSize":"14px"}}>
              Your account's sign-in email is now <strong style={{"color":"var(--ink-700)"}}>{verifyEmailAddress}</strong>. Use it the next time you sign in.
            </p>
          </React.Fragment>
        )}

        {verifyEmailStatus==='error' && (
          <React.Fragment>
            <div style={{"width":"48px","height":"48px","borderRadius":"99px","background":"var(--danger-100, #F7E3E6)","display":"flex","alignItems":"center","justifyContent":"center","margin":"0 auto 16px"}}>
              <Icon name={"x"} style={{"width":"22px","height":"22px","color":"var(--danger-600)"}} />
            </div>
            <h2 style={{"fontFamily":"'Sora'","fontWeight":"700","fontSize":"22px","color":"var(--ink-900)","margin":"0 0 6px"}}>Couldn't confirm this email</h2>
            <p style={{"margin":"0 0 24px","color":"var(--ink-500)","fontSize":"14px"}}>{verifyEmailMessage || 'This link is invalid or has expired.'}</p>
          </React.Fragment>
        )}

        {verifyEmailStatus!=='pending' && (
          <a href="#" onClick={backToLogin} style={{"display":"inline-block","fontWeight":"600","fontSize":"13px","color":"var(--ink-500)"}}>
            ← Back to sign in
          </a>
        )}
      </div>
    </div>
  );
}
