import React from 'react';
import Icon from '../components/Icon.jsx';

export default function LoginPage({ vm }) {
  const { authBusy, doLogin, email, goActivate, loginError, noop, onEmail, onPassword, password, oauthGoogle, oauthMicrosoft, forgotPassword, loginPlatformName, loginTagline, loginLogoUrl, loginBackgroundUrl } = vm;
  return (
    <React.Fragment>


<div style={{"minHeight":"100vh","display":"grid","gridTemplateColumns":"1.05fr 1fr"}}>

  
<div style={{"position":"relative","background":loginBackgroundUrl?`url(${loginBackgroundUrl}) center/cover no-repeat`:"var(--beet-700,#7A1C46)","color":"#fff","padding":"56px 60px","display":"flex","flexDirection":"column","justifyContent":"space-between","overflow":"hidden"}}>

<div style={{"position":"relative","display":"flex","alignItems":"center","gap":"12px"}}>


<div style={{"width":"40px","height":"40px","borderRadius":"12px","background":"rgba(255,255,255,.12)","display":"flex","alignItems":"center","justifyContent":"center","border":"1px solid rgba(255,255,255,.18)","overflow":"hidden","flexShrink":"0"}}>
{loginLogoUrl ? (<img src={loginLogoUrl} alt={loginPlatformName} style={{"width":"100%","height":"100%","objectFit":"cover"}} />) : (<Icon name={"infinity"} style={{"width":"22px","height":"22px"}} />)}
</div>


<span style={{"fontFamily":"'Sora'","fontWeight":"800","letterSpacing":".16em","fontSize":"19px"}}>
{loginPlatformName}
</span>


</div>

    
<div style={{"position":"relative","maxWidth":"460px"}}>

      
<div style={{"fontFamily":"'Manrope'","fontWeight":"700","fontSize":"12px","letterSpacing":".14em","textTransform":"uppercase","color":"var(--orchid-300)"}}>
{loginTagline}
</div>

      
<h1 style={{"fontFamily":"'Sora'","fontWeight":"800","fontSize":"44px","lineHeight":"1.08","letterSpacing":"-.02em","margin":"16px 0 18px"}}>
One workspace for every marketing role.
</h1>

      
<p style={{"fontSize":"17px","lineHeight":"1.6","color":"rgba(255,255,255,.78)","margin":"0"}}>
Projects, campaigns, QC and analytics — with role-based access from the CEO to junior executives. Verified, compliant, and built for scale.
</p>

      
<div style={{"display":"flex","gap":"10px","flexWrap":"wrap","marginTop":"26px"}}>

        
<div style={{"display":"flex","alignItems":"center","gap":"8px","fontSize":"13px","fontWeight":"600","background":"rgba(255,255,255,.08)","border":"1px solid rgba(255,255,255,.14)","padding":"8px 14px","borderRadius":"999px"}}>
<Icon name={"shield-check"} style={{"width":"15px","height":"15px","color":"var(--orchid-300)"}} />
 Role-based access
</div>

        
<div style={{"display":"flex","alignItems":"center","gap":"8px","fontSize":"13px","fontWeight":"600","background":"rgba(255,255,255,.08)","border":"1px solid rgba(255,255,255,.14)","padding":"8px 14px","borderRadius":"999px"}}>
<Icon name={"lock"} style={{"width":"15px","height":"15px","color":"var(--orchid-300)"}} />
 MFA & SSO
</div>

        
<div style={{"display":"flex","alignItems":"center","gap":"8px","fontSize":"13px","fontWeight":"600","background":"rgba(255,255,255,.08)","border":"1px solid rgba(255,255,255,.14)","padding":"8px 14px","borderRadius":"999px"}}>
<Icon name={"git-branch"} style={{"width":"15px","height":"15px","color":"var(--orchid-300)"}} />
 Full audit trail
</div>

      
</div>

    
</div>

    
<div style={{"position":"relative","fontSize":"12.5px","color":"rgba(255,255,255,.5)"}}>
© {loginPlatformName}. Internal use only — authorized personnel.
</div>

  
</div>


  
<div style={{"display":"flex","alignItems":"center","justifyContent":"center","padding":"40px 32px"}}>

    
<div style={{"width":"100%","maxWidth":"400px","animation":"blrise .5s var(--ease-out)"}}>

      
<h2 style={{"fontFamily":"'Sora'","fontWeight":"700","fontSize":"27px","letterSpacing":"-.01em","color":"var(--ink-900)","margin":"0 0 6px"}}>
Sign in
</h2>

      
<p style={{"margin":"0 0 26px","color":"var(--ink-500)","fontSize":"15px"}}>
Welcome back. Use your {loginPlatformName} work account.
</p>


      
{Boolean(loginError) && (
<React.Fragment>

        
<div style={{"display":"flex","gap":"10px","alignItems":"flex-start","background":"var(--danger-100)","border":"1px solid #F1C9CF","color":"var(--danger-600)","padding":"12px 14px","borderRadius":"14px","fontSize":"13.5px","fontWeight":"600","marginBottom":"16px"}}>
<Icon name={"alert-triangle"} style={{"width":"17px","height":"17px","flexShrink":"0","marginTop":"1px"}} />
<span>
{loginError}
</span>
</div>

      
</React.Fragment>
)}


      
<label style={{"display":"block","fontSize":"13px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"7px"}}>
Work email
</label>

      
<div style={{"position":"relative","marginBottom":"16px"}}>

        
<Icon name={"mail"} style={{"width":"17px","height":"17px","color":"var(--ink-400)","position":"absolute","left":"13px","top":"13px"}} />

        
<input value={email} onInput={onEmail} placeholder="you@company.com" style={{"width":"100%","padding":"12px 14px 12px 40px","border":"1px solid var(--line-300)","borderRadius":"14px","fontSize":"14.5px","background":"var(--paper)","outline":"none"}} />

      
</div>


      
<div style={{"display":"flex","justifyContent":"space-between","alignItems":"center","marginBottom":"7px"}}>

        
<label style={{"fontSize":"13px","fontWeight":"700","color":"var(--ink-700)"}}>
Password
</label>

        
<a href="#" onClick={forgotPassword} style={{"fontSize":"12.5px","fontWeight":"600"}}>
Forgot password?
</a>

      
</div>

      
<div style={{"position":"relative","marginBottom":"18px"}}>

        
<Icon name={"lock"} style={{"width":"17px","height":"17px","color":"var(--ink-400)","position":"absolute","left":"13px","top":"13px"}} />

        
<input type="password" value={password} onInput={onPassword} placeholder="••••••••••••" style={{"width":"100%","padding":"12px 14px 12px 40px","border":"1px solid var(--line-300)","borderRadius":"14px","fontSize":"14.5px","background":"var(--paper)","outline":"none"}} />

      
</div>


      
<button onClick={doLogin} disabled={Boolean(authBusy)} style={{"width":"100%","padding":"13px","background":"var(--orchid-500,#7A1C46)","color":"#fff","border":"none","borderRadius":"14px","fontSize":"15px","fontWeight":"700","cursor":authBusy?"default":"pointer","boxShadow":"0 8px 20px -8px rgba(122,28,70,.6)","opacity":authBusy?"0.7":"1"}}>
{authBusy ? 'Signing in…' : 'Sign in'}
</button>


      
<div style={{"display":"flex","alignItems":"center","gap":"12px","margin":"22px 0","color":"var(--ink-400)","fontSize":"12px","fontWeight":"600"}}>

        
<div style={{"flex":"1","height":"1px","background":"var(--line-300)"}} />
OR
<div style={{"flex":"1","height":"1px","background":"var(--line-300)"}} />

      
</div>

      
<div style={{"display":"flex","gap":"10px"}}>

        
<button onClick={oauthGoogle} style={{"flex":"1","padding":"11px","background":"var(--paper)","border":"1px solid var(--line-300)","borderRadius":"14px","fontSize":"13.5px","fontWeight":"600","color":"var(--ink-700)","cursor":"pointer","display":"flex","alignItems":"center","justifyContent":"center","gap":"8px"}}>
<Icon name={"globe"} style={{"width":"16px","height":"16px"}} />
 Google
</button>

        
<button onClick={oauthMicrosoft} style={{"flex":"1","padding":"11px","background":"var(--paper)","border":"1px solid var(--line-300)","borderRadius":"14px","fontSize":"13.5px","fontWeight":"600","color":"var(--ink-700)","cursor":"pointer","display":"flex","alignItems":"center","justifyContent":"center","gap":"8px"}}>
<Icon name={"grid-3x3"} style={{"width":"16px","height":"16px"}} />
 Microsoft
</button>

      
</div>


      
<p style={{"textAlign":"center","fontSize":"13px","color":"var(--ink-500)","margin":"22px 0 0"}}>
Received an invitation? 
<a href="#" onClick={goActivate} style={{"fontWeight":"700"}}>
Activate your account
</a>
</p>


</div>

  
</div>


</div>


    </React.Fragment>
  );
}
