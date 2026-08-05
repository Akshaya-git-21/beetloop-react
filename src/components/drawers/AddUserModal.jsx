import React from 'react';
import Icon from '../../components/Icon.jsx';
import { cssTextToObject } from '../../utils/cssText.js';

export default function AddUserModal({ vm }) {
  const { closeUserModal, showUserModal, stop, submitUser, uf, ufDept, ufDesignation, ufEmail, ufFirst, ufLast, ufLead, ufManager, ufMobile, ufRole,
    ufShiftStart, ufShiftEnd, ufBreak, ufDays, ufCapNote, ufBrandRows } = vm;
  return (
    <React.Fragment>
{Boolean(showUserModal) && (
<React.Fragment>

  
<div onClick={closeUserModal} style={{"position":"fixed","inset":"0","background":"rgba(31,8,20,.5)","backdropFilter":"blur(3px)","zIndex":"150","display":"flex","alignItems":"center","justifyContent":"center","padding":"28px"}}>

    
<div onClick={stop} className="blscroll" style={{"width":"100%","maxWidth":"640px","maxHeight":"88vh","overflowY":"auto","background":"#fff","borderRadius":"22px","boxShadow":"var(--shadow-xl)","animation":"blrise .3s var(--ease-out)"}}>

      
<div style={{"padding":"22px 26px","borderBottom":"1px solid var(--line-200)","display":"flex","alignItems":"center","justifyContent":"space-between","position":"sticky","top":"0","background":"#fff","borderRadius":"22px 22px 0 0"}}>

        
<div>
<div style={{"fontSize":"11.5px","fontWeight":"700","letterSpacing":".1em","textTransform":"uppercase","color":"var(--orchid-500)"}}>
User Master
</div>
<h3 style={{"fontFamily":"'Sora'","fontWeight":"700","fontSize":"20px","color":"var(--beet-700)","margin":"4px 0 0"}}>
Add new user
</h3>
</div>

        
<button onClick={closeUserModal} style={{"width":"34px","height":"34px","borderRadius":"10px","border":"1px solid var(--line-300)","background":"#fff","cursor":"pointer","display":"flex","alignItems":"center","justifyContent":"center"}}>
<Icon name={"x"} style={{"width":"17px","height":"17px","color":"var(--ink-700)"}} />
</button>

      
</div>

      
<div style={{"padding":"24px 26px"}}>

        
<div style={{"fontSize":"11.5px","fontWeight":"700","letterSpacing":".08em","textTransform":"uppercase","color":"var(--ink-400)","marginBottom":"12px"}}>
Personal information
</div>

        
<div style={{"display":"grid","gridTemplateColumns":"1fr 1fr","gap":"14px","marginBottom":"22px"}}>

          
<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
First name
</label>
<input value={uf.first} onInput={ufFirst} style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","outline":"none"}} />
</div>

          
<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Last name
</label>
<input value={uf.last} onInput={ufLast} style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","outline":"none"}} />
</div>

          
<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Official email
</label>
<input value={uf.email} onInput={ufEmail} placeholder="name@beetloop.com" style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","outline":"none"}} />
</div>

          
<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Mobile number
</label>
<input value={uf.mobile} onInput={ufMobile} style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","outline":"none"}} />
</div>

        
</div>

        
<div style={{"fontSize":"11.5px","fontWeight":"700","letterSpacing":".08em","textTransform":"uppercase","color":"var(--ink-400)","marginBottom":"12px"}}>
Organization & hierarchy
</div>

        
<div style={{"display":"grid","gridTemplateColumns":"1fr 1fr","gap":"14px","marginBottom":"22px"}}>

          
<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Department
</label>
<select value={uf.dept} onChange={ufDept} style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","outline":"none","background":"#fff"}}>
<option>
SEO
</option>
<option>
Content
</option>
<option>
SMM
</option>
<option>
Web Development
</option>
<option>
Design
</option>
<option>
Analytics
</option>
</select>
</div>


<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Shift start
</label>
<input type="time" value={uf.shiftStart} onInput={ufShiftStart} style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","outline":"none","color":"var(--ink-700)"}} />
</div>


<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Shift end
</label>
<input type="time" value={uf.shiftEnd} onInput={ufShiftEnd} style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","outline":"none","color":"var(--ink-700)"}} />
</div>


<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Break (minutes)
</label>
<input value={uf.breakMin} onInput={ufBreak} placeholder="60" style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","outline":"none"}} />
</div>


<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Working days / week
</label>
<select value={uf.days} onChange={ufDays} style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","background":"#fff"}}>
<option value="4">4</option>
<option value="5">5</option>
<option value="5.5">5.5</option>
<option value="6">6</option>
</select>
</div>


<div style={{"gridColumn":"1 / -1","display":"flex","alignItems":"center","gap":"8px","background":"var(--verify-100)","border":"1px solid #BFE3D0","color":"var(--verify-600)","padding":"9px 13px","borderRadius":"11px","fontSize":"11.5px","fontWeight":"700"}}>
<Icon name={"gauge"} style={{"width":"13px","height":"13px","flexShrink":"0"}} />
{ufCapNote}
</div>


<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Designation
</label>
<input value={uf.designation} onInput={ufDesignation} placeholder="e.g. Senior SEO Executive" style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","outline":"none"}} />
</div>

          
<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Reporting manager
</label>
<select value={uf.manager} onChange={ufManager} style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","outline":"none","background":"#fff"}}>
<option>
Priya Nair (Manager)
</option>
<option>
Rahul Menon (COO)
</option>
</select>
</div>

          
<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Team lead
</label>
<select value={uf.lead} onChange={ufLead} style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","outline":"none","background":"#fff"}}>
<option>
Aditi Rao (SEO Lead)
</option>
<option>
Karan Shah (Content Lead)
</option>
</select>
</div>

        
</div>

        
<div style={{"fontSize":"11.5px","fontWeight":"700","letterSpacing":".08em","textTransform":"uppercase","color":"var(--ink-400)","marginBottom":"12px"}}>
Security & role
</div>

        
<div style={{"display":"grid","gridTemplateColumns":"1fr 1fr","gap":"14px","marginBottom":"8px"}}>

          
<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Role
</label>
<select value={uf.role} onChange={ufRole} style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","outline":"none","background":"#fff"}}>
<option>
CEO
</option>
<option>
COO
</option>
<option>
Manager
</option>
<option>
Team Lead
</option>
<option>
Senior Executive
</option>
<option>
Junior Executive
</option>
<option>
QC Reviewer
</option>
<option>
Admin
</option>
<option>
Digital Marketing Executive
</option>
<option>
Sales Executive
</option>
</select>
</div>

          
<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Account status
</label>
<select style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","outline":"none","background":"#fff"}}>
<option>
Pending Invitation
</option>
<option>
Active
</option>
</select>
</div>


</div>


<div style={{"marginBottom":"8px"}}>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Assigned brand(s)
</label>
<div style={{"display":"flex","flexWrap":"wrap","gap":"7px"}}>
{(ufBrandRows || []).map((b, $i) => (
<button key={$i} onClick={b.toggle} style={cssTextToObject(b.style)}>
{b.label}
</button>
))}
</div>
<div style={{"fontSize":"10.5px","color":"var(--ink-500)","marginTop":"6px"}}>
Restricts this user's Brand Playbook to the selected brand(s) only (Sales Executives are also restricted for leads, pipeline and reports). Leave empty for Admin/CEO to see every brand by default — every other role sees none until a brand is assigned.
</div>
</div>


<div style={{"display":"flex","alignItems":"center","gap":"9px","background":"var(--surface-50)","border":"1px solid var(--line-200)","borderRadius":"12px","padding":"11px 14px","marginTop":"14px"}}>
<Icon name={"mail-check"} style={{"width":"16px","height":"16px","color":"var(--verify-500)"}} />
<span style={{"fontSize":"12.5px","color":"var(--ink-700)"}}>
On save, an 
<strong>
activation link
</strong>
 is emailed. Permissions inherit automatically from the selected role.
</span>
</div>

      
</div>

      
<div style={{"padding":"18px 26px","borderTop":"1px solid var(--line-200)","display":"flex","justifyContent":"flex-end","gap":"10px","position":"sticky","bottom":"0","background":"#fff","borderRadius":"0 0 22px 22px"}}>

        
<button onClick={closeUserModal} style={{"padding":"10px 18px","border":"1px solid var(--line-300)","background":"#fff","borderRadius":"11px","fontSize":"13.5px","fontWeight":"700","color":"var(--ink-700)","cursor":"pointer"}}>
Cancel
</button>

        
<button onClick={submitUser} style={{"padding":"10px 20px","border":"none","background":"#7A1C46","color":"#fff","borderRadius":"11px","fontSize":"13.5px","fontWeight":"700","cursor":"pointer","display":"flex","alignItems":"center","gap":"7px"}}>
<Icon name={"send"} style={{"width":"15px","height":"15px"}} />
Create & send invite
</button>

      
</div>

    
</div>

  
</div>


</React.Fragment>
)}
    </React.Fragment>
  );
}
