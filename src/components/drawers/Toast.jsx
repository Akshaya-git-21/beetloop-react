import React from 'react';
import Icon from '../../components/Icon.jsx';

export default function Toast({ vm }) {
  const { toast } = vm;
  return (
    <React.Fragment>
{Boolean(toast) && (
<React.Fragment>

  
<div style={{"position":"fixed","bottom":"24px","left":"50%","transform":"translateX(-50%)","background":"var(--beet-700)","color":"#fff","padding":"12px 20px","borderRadius":"14px","boxShadow":"var(--shadow-lg)","fontSize":"13.5px","fontWeight":"600","display":"flex","alignItems":"center","gap":"10px","zIndex":"200","animation":"blrise .3s var(--ease-out)"}}>
<Icon name={"check-circle-2"} style={{"width":"17px","height":"17px","color":"var(--orchid-300)"}} />
{toast}
</div>


</React.Fragment>
)}
    </React.Fragment>
  );
}
