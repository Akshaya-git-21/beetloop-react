import React from 'react';
import Icon from '../../components/Icon.jsx';

export default function AddMasterRowModal({ vm }) {
  const { activeMaster, closeMasterModal, masterField1, masterField2, mf, mfA, mfB, showMasterModal, stop, submitMaster } = vm;
  return (
    <React.Fragment>
{Boolean(showMasterModal) && (
<React.Fragment>

  
<div onClick={closeMasterModal} style={{"position":"fixed","inset":"0","background":"rgba(31,8,20,.5)","backdropFilter":"blur(3px)","zIndex":"150","display":"flex","alignItems":"center","justifyContent":"center","padding":"28px"}}>

    
<div onClick={stop} style={{"width":"100%","maxWidth":"480px","background":"#fff","borderRadius":"22px","boxShadow":"var(--shadow-xl)","animation":"blrise .3s var(--ease-out)"}}>

      
<div style={{"padding":"22px 26px","borderBottom":"1px solid var(--line-200)"}}>
<div style={{"fontSize":"11.5px","fontWeight":"700","letterSpacing":".1em","textTransform":"uppercase","color":"var(--orchid-500)"}}>
{activeMaster}
</div>
<h3 style={{"fontFamily":"'Sora'","fontWeight":"700","fontSize":"20px","color":"var(--beet-700)","margin":"4px 0 0"}}>
Add entry
</h3>
</div>

      
<div style={{"padding":"22px 26px","display":"flex","flexDirection":"column","gap":"14px"}}>

        
<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
{masterField1}
</label>
<input value={mf.a} onInput={mfA} style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","outline":"none"}} />
</div>

        
<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
{masterField2}
</label>
<input value={mf.b} onInput={mfB} style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","outline":"none"}} />
</div>

      
</div>

      
<div style={{"padding":"16px 26px","borderTop":"1px solid var(--line-200)","display":"flex","justifyContent":"flex-end","gap":"10px"}}>

        
<button onClick={closeMasterModal} style={{"padding":"10px 18px","border":"1px solid var(--line-300)","background":"#fff","borderRadius":"11px","fontSize":"13.5px","fontWeight":"700","color":"var(--ink-700)","cursor":"pointer"}}>
Cancel
</button>

        
<button onClick={submitMaster} style={{"padding":"10px 20px","border":"none","background":"#7A1C46","color":"#fff","borderRadius":"11px","fontSize":"13.5px","fontWeight":"700","cursor":"pointer"}}>
Save entry
</button>

      
</div>

    
</div>

  
</div>


</React.Fragment>
)}
    </React.Fragment>
  );
}
