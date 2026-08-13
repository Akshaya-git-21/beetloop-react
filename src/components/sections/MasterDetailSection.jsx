import React from 'react';
import Icon from '../../components/Icon.jsx';
import { cssTextToObject } from '../../utils/cssText.js';

export default function MasterDetailSection({ vm }) {
  const { bd_activity, bd_addBrand, bd_addService, bd_back, bd_brands, bd_canDelete, bd_dates, bd_delete, bd_features, bd_hasTags, bd_ident, bd_linkStats, bd_name, bd_newBrand, bd_newService, bd_notes, bd_setNewBrand, bd_setNewService, bd_setNotes, bd_qmeta, bd_quality, bd_save, bd_services, bd_status, bd_statusBg, bd_statusColor, bd_sub, bd_tab0, bd_tab1, bd_tab2, bd_tab3, bd_tab4, bd_tab5, bd_tabs, bd_tags, blActivity, blDaDist, blExport, blFPlatform, blFStatus, blImport, blIsBacklink, blKpis, blOnFPlatform, blOnFStatus, blOnQuery, blPlatformOptions, blPlatforms, blQuery, blRepoCount, blRepoEmpty, blRepoRows, blSegs, blShowDash, blShowDetail, blShowRepo, blVerify, mdAdd, mdBack, mdCols, mdCount, mdDesc, mdIcon, mdLabel, mdOnQuery, mdPg, mdQuery, mdRows, mdShowTable, showMasterDetail,
    qcmRows, qcmEmpty, qcmQuery, qcmOnQuery, qcmTypeFilter, qcmOnTypeFilter, qcmTypeFilterOptions, qcmOpen, qcmIsEdit, qcmForm, qcmFormCode, qcmSetName, qcmSetType, qcmSetStatus, qcmTypeOptions, qcmClose, qcmSave, qcmAddItem, qcmItemRows, qcmItemCount, qcmTotalItems, qcmRequiredItems, qcmCanCreate } = vm;
  const fieldInputStyle = { width: '100%', padding: '6px 9px', border: '1px solid var(--line-300)', borderRadius: 8, fontSize: 13.5, outline: 'none', color: 'var(--ink-900)' };
  return (
    <React.Fragment>
{Boolean(showMasterDetail) && (
<React.Fragment>

          
<div style={{"display":"flex","alignItems":"center","gap":"10px","marginBottom":"8px","fontSize":"13px","color":"var(--ink-500)"}}>

            
<button onClick={mdBack} style={{"display":"flex","alignItems":"center","gap":"6px","background":"none","border":"none","color":"var(--orchid-600)","fontWeight":"700","cursor":"pointer","fontSize":"13px","padding":"0"}}>
<Icon name={"arrow-left"} style={{"width":"15px","height":"15px"}} />
Master Data
</button>

            
<span style={{"color":"var(--ink-400)"}}>
/
</span>
<span style={{"fontWeight":"700","color":"var(--ink-700)"}}>
{mdLabel}
</span>

          
</div>

          
<div style={{"display":"flex","alignItems":"flex-start","justifyContent":"space-between","gap":"16px","marginBottom":"20px","flexWrap":"wrap"}}>

            
<div>

              
<div style={{"display":"flex","alignItems":"center","gap":"11px"}}>

                
<span style={{"width":"42px","height":"42px","borderRadius":"12px","background":"var(--orchid-100)","display":"flex","alignItems":"center","justifyContent":"center"}}>
<Icon name={mdIcon} style={{"width":"21px","height":"21px","color":"var(--orchid-600)"}} />
</span>

                
<div>
<h1 style={{"fontFamily":"'Sora'","fontWeight":"700","fontSize":"26px","letterSpacing":"-.02em","color":"var(--ink-900)","margin":"0"}}>
{mdLabel}
</h1>
<p style={{"margin":"3px 0 0","color":"var(--ink-500)","fontSize":"14px"}}>
{mdDesc}
</p>
</div>

              
</div>

            
</div>


{!qcmRows && (
<button onClick={mdAdd} style={{"display":"flex","alignItems":"center","gap":"7px","background":"#7A1C46","color":"#fff","border":"none","padding":"10px 16px","borderRadius":"12px","fontSize":"13.5px","fontWeight":"700","cursor":"pointer","boxShadow":"0 8px 18px -8px rgba(122,28,70,.55)"}}>
<Icon name={"plus"} style={{"width":"15px","height":"15px"}} />
Add entry
</button>
)}

          
</div>


          
{Boolean(blIsBacklink) && (
<React.Fragment>

            
<div style={{"display":"inline-flex","background":"var(--surface-50)","border":"1px solid var(--line-300)","borderRadius":"12px","padding":"3px","marginBottom":"18px"}}>

              
{(blSegs || []).map((s, $index) => (
<React.Fragment key={$index}>
<button onClick={s.go} style={cssTextToObject(s.style)}>
<Icon name={s.icon} style={{"width":"15px","height":"15px"}} />
{s.label}
</button>
</React.Fragment>
))}

            
</div>

          
</React.Fragment>
)}


          
{Boolean(blShowDash) && (
<React.Fragment>

            
<div style={{"display":"grid","gridTemplateColumns":"repeat(6,1fr)","gap":"12px","marginBottom":"18px"}}>

              
{(blKpis || []).map((k, $index) => (
<React.Fragment key={$index}>

                
<div style={{"background":"var(--paper)","border":"1px solid var(--line-300)","borderRadius":"16px","boxShadow":"var(--shadow-sm)","padding":"14px 16px"}}>

                  
<div style={{"display":"flex","alignItems":"center","gap":"7px","marginBottom":"8px"}}>
<Icon name={k.icon} style={cssTextToObject(`width:14px;height:14px;color:${k.color}`)} />
<span style={{"fontSize":"11px","fontWeight":"600","color":"var(--ink-500)"}}>
{k.label}
</span>
</div>

                  
<div style={cssTextToObject(`font-family:'Sora';font-weight:800;font-size:23px;color:${k.color}`)}>
{k.value}
</div>

                  
<div style={{"fontSize":"10.5px","color":"var(--ink-400)","marginTop":"3px"}}>
{k.sub}
</div>

                
</div>

              
</React.Fragment>
))}

            
</div>

            
<div style={{"display":"grid","gridTemplateColumns":"1.3fr 1fr","gap":"16px","marginBottom":"16px"}}>

              
<div style={{"background":"var(--paper)","border":"1px solid var(--line-300)","borderRadius":"18px","boxShadow":"var(--shadow-sm)","padding":"20px 22px"}}>

                
<h3 style={{"fontFamily":"'Sora'","fontWeight":"700","fontSize":"15px","color":"var(--ink-900)","margin":"0 0 16px"}}>
DA distribution
</h3>

                
<div style={{"display":"flex","flexDirection":"column","gap":"11px"}}>

                  
{(blDaDist || []).map((d, $index) => (
<React.Fragment key={$index}>

                    
<div style={{"display":"flex","alignItems":"center","gap":"12px"}}>
<span style={{"flex":"none","width":"76px","fontSize":"12px","fontWeight":"700","color":"var(--ink-700)"}}>
{d.bucket}
</span>
<div style={{"flex":"1","height":"9px","borderRadius":"99px","background":"var(--line-200)","overflow":"hidden"}}>
<div style={cssTextToObject(`height:100%;border-radius:99px;width:${d.w};background:${d.color}`)} />
</div>
<span style={{"flex":"none","width":"24px","textAlign":"right","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)"}}>
{d.count}
</span>
</div>

                  
</React.Fragment>
))}

                
</div>

              
</div>

              
<div style={{"background":"var(--paper)","border":"1px solid var(--line-300)","borderRadius":"18px","boxShadow":"var(--shadow-sm)","padding":"20px 22px"}}>

                
<h3 style={{"fontFamily":"'Sora'","fontWeight":"700","fontSize":"15px","color":"var(--ink-900)","margin":"0 0 16px"}}>
Platform types
</h3>

                
<div style={{"display":"grid","gridTemplateColumns":"1fr 1fr","gap":"9px"}}>

                  
{(blPlatforms || []).map((p, $index) => (
<React.Fragment key={$index}>

                    
<div style={{"display":"flex","alignItems":"center","gap":"9px","background":"var(--surface-50)","border":"1px solid var(--line-200)","borderRadius":"11px","padding":"9px 12px"}}>
<Icon name={p.icon} style={{"width":"15px","height":"15px","color":"var(--orchid-600)"}} />
<span style={{"flex":"1","fontSize":"12.5px","fontWeight":"600","color":"var(--ink-800)"}}>
{p.name}
</span>
<span style={{"fontSize":"12.5px","fontWeight":"800","color":"var(--ink-900)"}}>
{p.count}
</span>
</div>

                  
</React.Fragment>
))}

                
</div>

              
</div>

            
</div>

            
<div style={{"background":"var(--paper)","border":"1px solid var(--line-300)","borderRadius":"18px","boxShadow":"var(--shadow-sm)","padding":"20px 22px"}}>

              
<div style={{"display":"flex","alignItems":"center","justifyContent":"space-between","marginBottom":"14px"}}>
<h3 style={{"fontFamily":"'Sora'","fontWeight":"700","fontSize":"15px","color":"var(--ink-900)","margin":"0"}}>
Recent activities
</h3>
<button onClick={blVerify} style={{"display":"flex","alignItems":"center","gap":"7px","background":"var(--orchid-100)","color":"var(--orchid-700)","border":"1px solid var(--orchid-200)","borderRadius":"10px","padding":"7px 13px","fontSize":"12.5px","fontWeight":"700","cursor":"pointer"}}>
<Icon name={"shield-check"} style={{"width":"14px","height":"14px"}} />
Run verification
</button>
</div>

              
<div style={{"display":"flex","flexDirection":"column"}}>

                
{(blActivity || []).map((a, $index) => (
<React.Fragment key={$index}>

                  
<div style={{"display":"flex","gap":"14px"}}>
<div style={{"display":"flex","flexDirection":"column","alignItems":"center","flexShrink":"0"}}>
<span style={{"width":"10px","height":"10px","borderRadius":"99px","background":"var(--orchid-500)","marginTop":"5px"}} />
<span style={{"flex":"1","width":"2px","background":"var(--line-200)"}} />
</div>
<div style={{"flex":"1","paddingBottom":"16px"}}>
<div style={{"fontSize":"13px","fontWeight":"600","color":"var(--ink-900)"}}>
{a.action}
</div>
<div style={{"fontSize":"11.5px","color":"var(--ink-500)","marginTop":"2px"}}>
{a.who} · {a.when}
</div>
</div>
</div>

                
</React.Fragment>
))}

              
</div>

            
</div>

          
</React.Fragment>
)}


          
{/* Screen 2: Domain Repository */}

          
{Boolean(blShowRepo) && (
<React.Fragment>

            
<div style={{"display":"flex","alignItems":"center","gap":"10px","marginBottom":"14px","flexWrap":"wrap"}}>

              
<div style={{"position":"relative","flex":"1","minWidth":"220px","maxWidth":"340px"}}>
<Icon name={"search"} style={{"width":"15px","height":"15px","color":"var(--ink-400)","position":"absolute","left":"11px","top":"10px"}} />
<input value={blQuery} onInput={blOnQuery} placeholder="Search by domain, platform, category…" style={{"width":"100%","padding":"9px 12px 9px 34px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13px","outline":"none","background":"var(--paper)"}} />
</div>

              
<div style={{"display":"flex","alignItems":"center","gap":"7px","background":"var(--paper)","border":"1px solid var(--line-300)","borderRadius":"11px","padding":"6px 10px"}}>
<span style={{"fontSize":"11.5px","fontWeight":"700","color":"var(--ink-500)"}}>
Status
</span>
<select value={blFStatus} onChange={blOnFStatus} style={{"border":"none","background":"none","fontSize":"13px","fontWeight":"600","color":"var(--ink-900)","outline":"none","cursor":"pointer"}}>
<option>
All
</option>
<option>
Approved
</option>
<option>
Under Review
</option>
<option>
Rejected
</option>
<option>
Blacklisted
</option>
</select>
</div>

              
<div style={{"display":"flex","alignItems":"center","gap":"7px","background":"var(--paper)","border":"1px solid var(--line-300)","borderRadius":"11px","padding":"6px 10px"}}>
<span style={{"fontSize":"11.5px","fontWeight":"700","color":"var(--ink-500)"}}>
Platform
</span>
<select value={blFPlatform} onChange={blOnFPlatform} style={{"border":"none","background":"none","fontSize":"13px","fontWeight":"600","color":"var(--ink-900)","outline":"none","cursor":"pointer"}}>
{(blPlatformOptions || []).map((p, $index) => (
<React.Fragment key={$index}>
<option value={p}>
{p}
</option>
</React.Fragment>
))}
</select>
</div>

              
<div style={{"flex":"1"}} />

              
<button onClick={blImport} style={{"display":"flex","alignItems":"center","gap":"6px","background":"var(--paper)","border":"1px solid var(--line-300)","color":"var(--ink-700)","borderRadius":"11px","padding":"9px 13px","fontSize":"12.5px","fontWeight":"700","cursor":"pointer"}}>
<Icon name={"upload"} style={{"width":"14px","height":"14px"}} />
Import
</button>

              
<button onClick={blExport} style={{"display":"flex","alignItems":"center","gap":"6px","background":"var(--paper)","border":"1px solid var(--line-300)","color":"var(--ink-700)","borderRadius":"11px","padding":"9px 13px","fontSize":"12.5px","fontWeight":"700","cursor":"pointer"}}>
<Icon name={"download"} style={{"width":"14px","height":"14px"}} />
Export
</button>

              
<span style={{"fontSize":"12.5px","fontWeight":"700","color":"var(--ink-400)"}}>
{blRepoCount}
</span>

            
</div>

            
<div style={{"background":"var(--paper)","border":"1px solid var(--line-300)","borderRadius":"20px","boxShadow":"var(--shadow-sm)","overflow":"hidden"}}>

              
<div style={{"overflowX":"auto"}}>

                
<table style={{"width":"100%","borderCollapse":"collapse","minWidth":"1100px"}}>

                  
<thead>
<tr>

                    
<th style={{"textAlign":"left","padding":"12px 16px","fontSize":"10.5px","fontWeight":"700","letterSpacing":".05em","textTransform":"uppercase","color":"var(--ink-500)","background":"var(--surface-50)","borderBottom":"1px solid var(--line-200)"}}>
Domain name
</th>

                    
<th style={{"textAlign":"left","padding":"12px 12px","fontSize":"10.5px","fontWeight":"700","letterSpacing":".05em","textTransform":"uppercase","color":"var(--ink-500)","background":"var(--surface-50)","borderBottom":"1px solid var(--line-200)"}}>
Platform type
</th>

                    
<th style={{"textAlign":"left","padding":"12px 12px","fontSize":"10.5px","fontWeight":"700","letterSpacing":".05em","textTransform":"uppercase","color":"var(--ink-500)","background":"var(--surface-50)","borderBottom":"1px solid var(--line-200)"}}>
Category
</th>

                    
<th style={{"textAlign":"left","padding":"12px 12px","fontSize":"10.5px","fontWeight":"700","letterSpacing":".05em","textTransform":"uppercase","color":"var(--ink-500)","background":"var(--surface-50)","borderBottom":"1px solid var(--line-200)"}}>
Industry
</th>

                    
<th style={{"textAlign":"left","padding":"12px 12px","fontSize":"10.5px","fontWeight":"700","letterSpacing":".05em","textTransform":"uppercase","color":"var(--ink-500)","background":"var(--surface-50)","borderBottom":"1px solid var(--line-200)"}}>
DA
</th>

                    
<th style={{"textAlign":"left","padding":"12px 12px","fontSize":"10.5px","fontWeight":"700","letterSpacing":".05em","textTransform":"uppercase","color":"var(--ink-500)","background":"var(--surface-50)","borderBottom":"1px solid var(--line-200)"}}>
Spam
</th>

                    
<th style={{"textAlign":"left","padding":"12px 12px","fontSize":"10.5px","fontWeight":"700","letterSpacing":".05em","textTransform":"uppercase","color":"var(--ink-500)","background":"var(--surface-50)","borderBottom":"1px solid var(--line-200)"}}>
Status
</th>

                    
<th style={{"textAlign":"left","padding":"12px 12px","fontSize":"10.5px","fontWeight":"700","letterSpacing":".05em","textTransform":"uppercase","color":"var(--ink-500)","background":"var(--surface-50)","borderBottom":"1px solid var(--line-200)"}}>
Active
</th>

                    
<th style={{"textAlign":"left","padding":"12px 12px","fontSize":"10.5px","fontWeight":"700","letterSpacing":".05em","textTransform":"uppercase","color":"var(--ink-500)","background":"var(--surface-50)","borderBottom":"1px solid var(--line-200)"}}>
Accounts
</th>

                    
<th style={{"textAlign":"left","padding":"12px 12px","fontSize":"10.5px","fontWeight":"700","letterSpacing":".05em","textTransform":"uppercase","color":"var(--ink-500)","background":"var(--surface-50)","borderBottom":"1px solid var(--line-200)"}}>
Live links
</th>

                    
<th style={{"textAlign":"left","padding":"12px 12px","fontSize":"10.5px","fontWeight":"700","letterSpacing":".05em","textTransform":"uppercase","color":"var(--ink-500)","background":"var(--surface-50)","borderBottom":"1px solid var(--line-200)"}}>
Last verified
</th>

                    
<th style={{"background":"var(--surface-50)","borderBottom":"1px solid var(--line-200)"}} />

                  
</tr>
</thead>

                  
<tbody>

                    
{(blRepoRows || []).map((r, $index) => (
<React.Fragment key={$index}>

                      
<tr onClick={r.open} style={{"cursor":"pointer"}} style-hover="background:var(--surface-50)">

                        
<td style={{"padding":"12px 16px","borderBottom":"1px solid var(--line-200)"}}>
<div style={{"fontSize":"13.5px","fontWeight":"700","color":"var(--ink-900)"}}>
{r.name}
</div>
<div style={{"fontFamily":"'Space Mono'","fontSize":"10.5px","color":"var(--ink-400)"}}>
{r.url}
</div>
</td>

                        
<td style={{"padding":"12px","borderBottom":"1px solid var(--line-200)"}}>
<span style={{"fontSize":"11px","fontWeight":"700","padding":"3px 9px","borderRadius":"999px","background":"var(--orchid-100)","color":"var(--orchid-700)"}}>
{r.platform}
</span>
</td>

                        
<td style={{"padding":"12px","borderBottom":"1px solid var(--line-200)","fontSize":"12.5px","color":"var(--ink-700)"}}>
{r.category}
</td>

                        
<td style={{"padding":"12px","borderBottom":"1px solid var(--line-200)","fontSize":"12.5px","color":"var(--ink-700)"}}>
{r.industry}
</td>

                        
<td style={{"padding":"12px","borderBottom":"1px solid var(--line-200)"}}>
<span style={cssTextToObject(`display:inline-flex;align-items:center;justify-content:center;min-width:34px;height:26px;border-radius:999px;border:1.5px solid ${r.daColor};color:${r.daColor};font-size:12px;font-weight:800;padding:0 6px`)}>
{r.da}
</span>
</td>

                        
<td style={{"padding":"12px","borderBottom":"1px solid var(--line-200)"}}>
<span style={cssTextToObject(`font-size:12px;font-weight:800;color:${r.spamColor}`)}>
{r.spam}
</span>
</td>

                        
<td style={{"padding":"12px","borderBottom":"1px solid var(--line-200)"}}>
<span style={cssTextToObject(`font-size:11px;font-weight:700;padding:4px 10px;border-radius:999px;background:${r.statusBg};color:${r.statusColor}`)}>
{r.status}
</span>
</td>

                        
<td style={{"padding":"12px","borderBottom":"1px solid var(--line-200)"}}>
<span style={{"display":"inline-flex","alignItems":"center","gap":"6px","fontSize":"12px","fontWeight":"600","color":"var(--ink-700)"}}>
<span style={cssTextToObject(`width:7px;height:7px;border-radius:99px;background:${r.activeDot}`)} />
{r.activeLabel}
</span>
</td>

                        
<td style={{"padding":"12px","borderBottom":"1px solid var(--line-200)","fontSize":"12.5px","color":"var(--ink-700)"}}>
{r.accounts}
</td>

                        
<td style={{"padding":"12px","borderBottom":"1px solid var(--line-200)","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-900)"}}>
{r.live}
</td>

                        
<td style={{"padding":"12px","borderBottom":"1px solid var(--line-200)","fontSize":"12px","color":"var(--ink-500)"}}>
{r.lastVerified}
</td>

                        
<td style={{"padding":"12px 14px 12px 0","borderBottom":"1px solid var(--line-200)","textAlign":"right"}}>
<button onClick={r.open} style={{"width":"30px","height":"30px","borderRadius":"8px","border":"1px solid var(--line-300)","background":"var(--paper)","cursor":"pointer","display":"inline-flex","alignItems":"center","justifyContent":"center"}}>
<Icon name={"eye"} style={{"width":"15px","height":"15px","color":"var(--ink-500)"}} />
</button>
</td>

                      
</tr>

                    
</React.Fragment>
))}

                  
</tbody>

                
</table>

              
</div>

              
{Boolean(blRepoEmpty) && (
<React.Fragment>
<div style={{"padding":"36px","textAlign":"center","color":"var(--ink-500)","fontSize":"13.5px","fontWeight":"600"}}>
No domains match these filters.
</div>
</React.Fragment>
)}

            
</div>

          
</React.Fragment>
)}


          
{/* Screen 3: Domain Detail / Create */}

          
{Boolean(blShowDetail) && (
<React.Fragment>

            
<div style={{"display":"flex","alignItems":"flex-start","justifyContent":"space-between","gap":"14px","marginBottom":"16px","flexWrap":"wrap"}}>

              
<div>

                
<div style={{"display":"flex","alignItems":"center","gap":"10px"}}>
<h2 style={{"fontFamily":"'Sora'","fontWeight":"700","fontSize":"23px","color":"var(--ink-900)","margin":"0"}}>
{bd_name}
</h2>
<span style={cssTextToObject(`font-size:11px;font-weight:700;padding:4px 11px;border-radius:999px;background:${bd_statusBg};color:${bd_statusColor}`)}>
{bd_status}
</span>
</div>

                
<div style={{"fontSize":"13px","color":"var(--ink-500)","marginTop":"4px"}}>
{bd_sub}
</div>

              
</div>

              
<div style={{"display":"flex","gap":"9px"}}>


<button onClick={bd_back} style={{"display":"flex","alignItems":"center","gap":"7px","background":"var(--paper)","border":"1px solid var(--line-300)","color":"var(--ink-700)","borderRadius":"11px","padding":"10px 15px","fontSize":"13px","fontWeight":"700","cursor":"pointer"}}>
<Icon name={"arrow-left"} style={{"width":"14px","height":"14px"}} />
Back to list
</button>


{Boolean(bd_canDelete) && (
<button onClick={bd_delete} style={{"display":"flex","alignItems":"center","gap":"7px","background":"var(--paper)","border":"1px solid var(--danger-300, #e5a3a3)","color":"var(--danger-600)","borderRadius":"11px","padding":"10px 15px","fontSize":"13px","fontWeight":"700","cursor":"pointer"}}>
<Icon name={"trash-2"} style={{"width":"14px","height":"14px"}} />
Delete
</button>
)}


<button onClick={bd_save} style={{"display":"flex","alignItems":"center","gap":"7px","background":"#7A1C46","color":"#fff","border":"none","borderRadius":"11px","padding":"10px 17px","fontSize":"13px","fontWeight":"700","cursor":"pointer","boxShadow":"0 8px 18px -8px rgba(122,28,70,.55)"}}>
<Icon name={"check"} style={{"width":"14px","height":"14px"}} />
Save
</button>

              
</div>

            
</div>

            
<div className="blscroll" style={{"display":"flex","gap":"2px","borderBottom":"1px solid var(--line-200)","marginBottom":"20px","overflowX":"auto"}}>

              
{(bd_tabs || []).map((t, $index) => (
<React.Fragment key={$index}>
<button onClick={t.go} style={cssTextToObject(t.style)}>
{t.label}
</button>
</React.Fragment>
))}

            
</div>


            
{Boolean(bd_tab0) && (
<React.Fragment>

              
<div style={{"display":"grid","gridTemplateColumns":"1.4fr 1fr","gap":"16px","alignItems":"start"}}>

                
<div style={{"background":"var(--paper)","border":"1px solid var(--line-300)","borderRadius":"18px","boxShadow":"var(--shadow-sm)","padding":"20px 22px"}}>

                  
<h3 style={{"fontFamily":"'Sora'","fontWeight":"700","fontSize":"15px","color":"var(--ink-900)","margin":"0 0 16px"}}>
Domain identification
</h3>

                  
<div style={{"display":"grid","gridTemplateColumns":"1fr 1fr","gap":"14px 18px"}}>

                    
{(bd_ident || []).map((f, $index) => (
<React.Fragment key={$index}>
<div>
<div style={{"fontSize":"11px","fontWeight":"700","textTransform":"uppercase","letterSpacing":".04em","color":"var(--ink-400)","marginBottom":"4px"}}>
{f.k}
</div>
{f.onChange ? (
<input value={f.v} onChange={f.onChange} style={fieldInputStyle} />
) : (
<div style={{"fontSize":"13.5px","color":"var(--ink-900)"}}>
{f.v||'—'}
</div>
)}
</div>
</React.Fragment>
))}

                  
</div>

                
</div>

                
<div style={{"background":"var(--paper)","border":"1px solid var(--line-300)","borderRadius":"18px","boxShadow":"var(--shadow-sm)","padding":"20px 22px"}}>

                  
<h3 style={{"fontFamily":"'Sora'","fontWeight":"700","fontSize":"15px","color":"var(--ink-900)","margin":"0 0 16px"}}>
Status & dates
</h3>

                  
<div style={{"display":"grid","gridTemplateColumns":"1fr 1fr","gap":"14px 18px"}}>

                    
{(bd_dates || []).map((f, $index) => (
<React.Fragment key={$index}>
<div>
<div style={{"fontSize":"11px","fontWeight":"700","textTransform":"uppercase","letterSpacing":".04em","color":"var(--ink-400)","marginBottom":"4px"}}>
{f.k}
</div>
{f.onChange ? (
<input value={f.v} onChange={f.onChange} style={fieldInputStyle} />
) : (
<div style={{"fontSize":"13.5px","color":"var(--ink-900)"}}>
{f.v||'—'}
</div>
)}
</div>
</React.Fragment>
))}

                  
</div>

                  
{Boolean(bd_hasTags) && (
<React.Fragment>
<div style={{"marginTop":"16px"}}>
<div style={{"fontSize":"11px","fontWeight":"700","textTransform":"uppercase","letterSpacing":".04em","color":"var(--ink-400)","marginBottom":"7px"}}>
Tags
</div>
<div style={{"display":"flex","flexWrap":"wrap","gap":"6px"}}>
{(bd_tags || []).map((tg, $index) => (
<React.Fragment key={$index}>
<span style={{"fontSize":"11px","fontWeight":"700","padding":"4px 11px","borderRadius":"999px","background":"var(--orchid-100)","color":"var(--orchid-700)"}}>
{tg}
</span>
</React.Fragment>
))}
</div>
</div>
</React.Fragment>
)}

                
</div>

              
</div>

            
</React.Fragment>
)}


            
{Boolean(bd_tab1) && (
<React.Fragment>

              
<div style={{"display":"grid","gridTemplateColumns":"repeat(5,1fr)","gap":"12px","marginBottom":"16px"}}>

                
{(bd_quality || []).map((qm, $index) => (
<React.Fragment key={$index}>
<div style={{"background":"var(--paper)","border":"1px solid var(--line-300)","borderRadius":"16px","boxShadow":"var(--shadow-sm)","padding":"15px 16px"}}>
<div style={{"fontSize":"11.5px","fontWeight":"600","color":"var(--ink-500)"}}>
{qm.k}
</div>
{qm.onChange ? (
<input value={qm.v} onChange={qm.onChange} style={{...fieldInputStyle, marginTop: 6, fontWeight: 800, fontSize: 16}} />
) : (
<div style={cssTextToObject(`font-family:'Sora';font-weight:800;font-size:22px;color:${qm.color};margin-top:6px`)}>
{qm.v}
</div>
)}
</div>
</React.Fragment>
))}

              
</div>

              
<div style={{"background":"var(--paper)","border":"1px solid var(--line-300)","borderRadius":"18px","boxShadow":"var(--shadow-sm)","padding":"20px 22px"}}>

                
<div style={{"display":"grid","gridTemplateColumns":"repeat(5,1fr)","gap":"14px"}}>

                  
{(bd_qmeta || []).map((f, $index) => (
<React.Fragment key={$index}>
<div>
<div style={{"fontSize":"11px","fontWeight":"700","textTransform":"uppercase","letterSpacing":".04em","color":"var(--ink-400)","marginBottom":"4px"}}>
{f.k}
</div>
{f.onChange ? (
<input value={f.v} onChange={f.onChange} style={fieldInputStyle} />
) : (
<div style={{"fontSize":"13.5px","color":"var(--ink-900)"}}>
{f.v||'—'}
</div>
)}
</div>
</React.Fragment>
))}

                
</div>

              
</div>

            
</React.Fragment>
)}


            
{Boolean(bd_tab2) && (
<React.Fragment>

              
<div style={{"background":"var(--paper)","border":"1px solid var(--line-300)","borderRadius":"18px","boxShadow":"var(--shadow-sm)","padding":"20px 22px","marginBottom":"16px"}}>

                
<h3 style={{"fontFamily":"'Sora'","fontWeight":"700","fontSize":"15px","color":"var(--ink-900)","margin":"0 0 14px"}}>
Platform features
</h3>

                
<div style={{"display":"grid","gridTemplateColumns":"repeat(3,1fr)","gap":"9px"}}>

                  
{(bd_features || []).map((ft, $index) => (
<React.Fragment key={$index}>
<button onClick={ft.toggle} style={{"display":"flex","alignItems":"center","gap":"9px","border":"1px solid var(--line-200)","borderRadius":"11px","padding":"10px 13px","background":"var(--paper)","cursor":"pointer","textAlign":"left","width":"100%"}}>
<Icon name={ft.icon} style={cssTextToObject(`width:16px;height:16px;color:${ft.color}`)} />
<span style={{"fontSize":"12.5px","fontWeight":"600","color":"var(--ink-800)"}}>
{ft.label}
</span>
</button>
</React.Fragment>
))}

                
</div>

              
</div>

              
<div style={{"background":"var(--paper)","border":"1px solid var(--line-300)","borderRadius":"18px","boxShadow":"var(--shadow-sm)","padding":"20px 22px"}}>

                
<h3 style={{"fontFamily":"'Sora'","fontWeight":"700","fontSize":"15px","color":"var(--ink-900)","margin":"0 0 10px"}}>
Important notes
</h3>

                
<div style={{"fontSize":"13.5px","color":"var(--ink-700)","lineHeight":"1.6"}}>
{bd_notes}
</div>

              
</div>

            
</React.Fragment>
)}


            
{Boolean(bd_tab3) && (
<React.Fragment>

              
<div style={{"background":"var(--paper)","border":"1px solid var(--line-300)","borderRadius":"18px","boxShadow":"var(--shadow-sm)","padding":"20px 22px","marginBottom":"16px"}}>

                
<h3 style={{"fontFamily":"'Sora'","fontWeight":"700","fontSize":"15px","color":"var(--ink-900)","margin":"0 0 14px"}}>
Linked information
</h3>

                
<div style={{"fontSize":"11px","fontWeight":"700","textTransform":"uppercase","letterSpacing":".04em","color":"var(--ink-400)","marginBottom":"7px"}}>
Applicable brands / websites
</div>

                
<div style={{"display":"flex","flexWrap":"wrap","gap":"6px","marginBottom":"10px"}}>
{(bd_brands || []).map((b, $index) => (
<React.Fragment key={$index}>
<span onClick={b.remove} title="Click to remove" style={{"display":"flex","alignItems":"center","gap":"6px","fontSize":"11.5px","fontWeight":"700","padding":"5px 12px","borderRadius":"999px","background":"var(--info-100)","color":"var(--info-600)","cursor":"pointer"}}>
{b.label}
<Icon name={"x"} style={{"width":"11px","height":"11px"}} />
</span>
</React.Fragment>
))}
</div>


<div style={{"display":"flex","gap":"8px","marginBottom":"16px"}}>
<input value={bd_newBrand} onChange={bd_setNewBrand} placeholder="Add a brand / website…" style={{"flex":"1","padding":"7px 11px","border":"1px solid var(--line-300)","borderRadius":"9px","fontSize":"12.5px","outline":"none"}} />
<button onClick={bd_addBrand} style={{"padding":"7px 14px","border":"none","background":"var(--info-100)","color":"var(--info-600)","borderRadius":"9px","fontSize":"12.5px","fontWeight":"700","cursor":"pointer"}}>
Add
</button>
</div>


<div style={{"fontSize":"11px","fontWeight":"700","textTransform":"uppercase","letterSpacing":".04em","color":"var(--ink-400)","marginBottom":"7px"}}>
Applicable services
</div>


<div style={{"display":"flex","flexWrap":"wrap","gap":"6px","marginBottom":"10px"}}>
{(bd_services || []).map((s, $index) => (
<React.Fragment key={$index}>
<span onClick={s.remove} title="Click to remove" style={{"display":"flex","alignItems":"center","gap":"6px","fontSize":"11.5px","fontWeight":"700","padding":"5px 12px","borderRadius":"999px","background":"var(--orchid-100)","color":"var(--orchid-700)","cursor":"pointer"}}>
{s.label}
<Icon name={"x"} style={{"width":"11px","height":"11px"}} />
</span>
</React.Fragment>
))}
</div>


<div style={{"display":"flex","gap":"8px"}}>
<input value={bd_newService} onChange={bd_setNewService} placeholder="Add a service…" style={{"flex":"1","padding":"7px 11px","border":"1px solid var(--line-300)","borderRadius":"9px","fontSize":"12.5px","outline":"none"}} />
<button onClick={bd_addService} style={{"padding":"7px 14px","border":"none","background":"var(--orchid-100)","color":"var(--orchid-700)","borderRadius":"9px","fontSize":"12.5px","fontWeight":"700","cursor":"pointer"}}>
Add
</button>
</div>

              
</div>

              
<div style={{"display":"grid","gridTemplateColumns":"repeat(4,1fr)","gap":"12px"}}>

                
{(bd_linkStats || []).map((ls, $index) => (
<React.Fragment key={$index}>
<div style={{"background":"var(--paper)","border":"1px solid var(--line-300)","borderRadius":"16px","boxShadow":"var(--shadow-sm)","padding":"15px 16px"}}>
<div style={{"fontSize":"11.5px","fontWeight":"600","color":"var(--ink-500)"}}>
{ls.k}
</div>
<div style={{"fontFamily":"'Sora'","fontWeight":"800","fontSize":"20px","color":"var(--ink-900)","marginTop":"6px"}}>
{ls.v}
</div>
</div>
</React.Fragment>
))}

              
</div>

            
</React.Fragment>
)}


            
{Boolean(bd_tab4) && (
<React.Fragment>

              
<div style={{"background":"var(--paper)","border":"1px solid var(--line-300)","borderRadius":"18px","boxShadow":"var(--shadow-sm)","padding":"20px 22px"}}>

                
<h3 style={{"fontFamily":"'Sora'","fontWeight":"700","fontSize":"15px","color":"var(--ink-900)","margin":"0 0 10px"}}>
Notes
</h3>


<textarea value={bd_notes} onChange={bd_setNotes} rows="5" placeholder="Add a note for this domain…" style={{"width":"100%","padding":"11px 13px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","outline":"none","resize":"vertical"}} />


<div style={{"fontSize":"11.5px","color":"var(--ink-400)","marginTop":"8px"}}>
Saved when you click Save above.
</div>


</div>


</React.Fragment>
)}



{Boolean(bd_tab5) && (
<React.Fragment>

              
<div style={{"background":"var(--paper)","border":"1px solid var(--line-300)","borderRadius":"18px","boxShadow":"var(--shadow-sm)","padding":"20px 22px"}}>

                
<h3 style={{"fontFamily":"'Sora'","fontWeight":"700","fontSize":"15px","color":"var(--ink-900)","margin":"0 0 16px"}}>
Activity log
</h3>

                
<div style={{"display":"flex","flexDirection":"column"}}>

                  
{(bd_activity || []).map((a, $index) => (
<React.Fragment key={$index}>

                    
<div style={{"display":"flex","gap":"14px"}}>
<div style={{"display":"flex","flexDirection":"column","alignItems":"center","flexShrink":"0"}}>
<span style={{"width":"10px","height":"10px","borderRadius":"99px","background":"var(--orchid-500)","marginTop":"5px"}} />
<span style={{"flex":"1","width":"2px","background":"var(--line-200)"}} />
</div>
<div style={{"flex":"1","paddingBottom":"16px"}}>
<div style={{"fontSize":"13px","fontWeight":"700","color":"var(--ink-900)"}}>
{a.action}
</div>
<div style={{"fontSize":"11.5px","color":"var(--ink-500)","marginTop":"2px"}}>
{a.who} · {a.when}
</div>
</div>
</div>

                  
</React.Fragment>
))}

                
</div>

              
</div>

            
</React.Fragment>
)}

          
</React.Fragment>
)}


          
{Boolean(qcmRows) && (
<React.Fragment>
<div style={{ background:'var(--paper)', border:'1px solid var(--line-300)', borderRadius:20, boxShadow:'var(--shadow-sm)', overflow:'hidden', marginBottom: qcmOpen ? 18 : 0 }}>
  <div style={{ display:'flex', alignItems:'center', gap:10, padding:'14px 18px', borderBottom:'1px solid var(--line-200)', flexWrap:'wrap' }}>
    <div style={{ position:'relative', flex:1, maxWidth:320 }}>
      <Icon name="search" style={{ width:15, height:15, color:'var(--ink-400)', position:'absolute', left:11, top:9 }} />
      <input value={qcmQuery} onInput={qcmOnQuery} placeholder="Search checklist…" style={{ width:'100%', padding:'8px 12px 8px 34px', border:'1px solid var(--line-300)', borderRadius:10, fontSize:13, outline:'none' }} />
    </div>
    <select value={qcmTypeFilter} onChange={qcmOnTypeFilter} style={{ padding:'8px 12px', border:'1px solid var(--line-300)', borderRadius:10, fontSize:13, background:'var(--paper)' }}>
      {(qcmTypeFilterOptions || []).map((t,i)=>(<option key={i} value={t}>{t==='All'?'All Campaign Types':t}</option>))}
    </select>
    <span style={{ fontSize:12.5, fontWeight:700, color:'var(--ink-400)' }}>{(qcmRows||[]).length} record{(qcmRows||[]).length===1?'':'s'}</span>
    {Boolean(qcmCanCreate) && (
      <button onClick={mdAdd} style={{ marginLeft:'auto', display:'flex', alignItems:'center', gap:7, padding:'9px 16px', border:'none', background:'#7A1C46', color:'#fff', borderRadius:11, fontSize:13, fontWeight:700, cursor:'pointer' }}>
        <Icon name="plus" style={{ width:14, height:14 }} />New QC Checklist
      </button>
    )}
  </div>
  <div style={{ overflowX:'auto' }}>
    <table style={{ width:'100%', borderCollapse:'collapse', minWidth:760 }}>
      <thead>
        <tr>
          {['Code','Checklist Name','No. of Checklist Items','Campaign Type','Status','Actions'].map((h,i)=>(
            <th key={i} style={{ textAlign:'left', padding:'10px 16px', fontSize:10.5, fontWeight:700, letterSpacing:'.05em', textTransform:'uppercase', color:'var(--ink-500)', background:'var(--surface-50)', borderBottom:'1px solid var(--line-200)' }}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Boolean(qcmEmpty) && (
          <tr><td colSpan={6} style={{ padding:'30px 16px', textAlign:'center', color:'var(--ink-500)', fontSize:13 }}>No QC checklists match these filters.</td></tr>
        )}
        {(qcmRows || []).map((r,i)=>(
          <tr key={i}>
            <td style={{ padding:'11px 16px', borderBottom:'1px solid var(--line-200)', fontFamily:"'Space Mono', monospace", fontSize:12.5, color:'var(--ink-700)' }}>{r.code}</td>
            <td style={{ padding:'11px 16px', borderBottom:'1px solid var(--line-200)', fontSize:13, fontWeight:700, color:'var(--ink-900)' }}>{r.name}</td>
            <td style={{ padding:'11px 16px', borderBottom:'1px solid var(--line-200)', fontSize:13, color:'var(--ink-700)' }}>{r.itemCount} Items</td>
            <td style={{ padding:'11px 16px', borderBottom:'1px solid var(--line-200)' }}>
              <span style={{ fontSize:11, fontWeight:700, padding:'3px 10px', borderRadius:999, background:r.typeBg, color:r.typeColor }}>{r.type}</span>
            </td>
            <td style={{ padding:'11px 16px', borderBottom:'1px solid var(--line-200)' }}>
              <span style={{ fontSize:11, fontWeight:700, padding:'3px 10px', borderRadius:999, background:r.statusBg, color:r.statusColor }}>{r.status}</span>
            </td>
            <td style={{ padding:'11px 16px', borderBottom:'1px solid var(--line-200)' }}>
              <div style={{ display:'flex', gap:6 }}>
                {Boolean(r.canEdit) && (
                  <button onClick={r.edit} title="Edit" style={{ width:30, height:30, border:'1px solid var(--line-300)', background:'var(--paper)', borderRadius:9, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>
                    <Icon name="pencil" style={{ width:14, height:14, color:'var(--ink-600)' }} />
                  </button>
                )}
                {Boolean(r.canDelete) && (
                  <button onClick={r.delete} title="Delete" style={{ width:30, height:30, border:'1px solid var(--line-300)', background:'var(--paper)', borderRadius:9, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>
                    <Icon name="trash-2" style={{ width:14, height:14, color:'var(--danger-600)' }} />
                  </button>
                )}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

{Boolean(qcmOpen) && (
<div style={{ background:'var(--paper)', border:'1px solid var(--line-300)', borderRadius:20, boxShadow:'var(--shadow-sm)', padding:22 }}>
  <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:18 }}>
    <button onClick={qcmClose} style={{ width:34, height:34, border:'1px solid var(--line-300)', background:'var(--paper)', borderRadius:10, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>
      <Icon name="arrow-left" style={{ width:16, height:16 }} />
    </button>
    <h3 style={{ fontFamily:"'Sora'", fontWeight:700, fontSize:18, color:'var(--ink-900)', margin:0 }}>QC Checklist Details</h3>
  </div>
  <div style={{ display:'grid', gridTemplateColumns:'2.4fr 3fr', gap:20 }}>
    <div>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14, marginBottom:20 }}>
        <div>
          <label style={{ display:'block', fontSize:11.5, fontWeight:700, color:'var(--ink-700)', marginBottom:5 }}>Checklist Code *</label>
          <input value={qcmFormCode} readOnly style={{ width:'100%', padding:'9px 11px', border:'1px solid var(--line-300)', borderRadius:10, fontSize:13, background:'var(--surface-50)', color:'var(--ink-500)' }} />
        </div>
        <div>
          <label style={{ display:'block', fontSize:11.5, fontWeight:700, color:'var(--ink-700)', marginBottom:5 }}>Checklist Name *</label>
          <input value={(qcmForm||{}).Checklist||''} onChange={qcmSetName} style={{ width:'100%', padding:'9px 11px', border:'1px solid var(--line-300)', borderRadius:10, fontSize:13 }} />
        </div>
        <div>
          <label style={{ display:'block', fontSize:11.5, fontWeight:700, color:'var(--ink-700)', marginBottom:5 }}>Campaign Type *</label>
          <select value={(qcmForm||{}).Campaign_Type||''} onChange={qcmSetType} style={{ width:'100%', padding:'9px 11px', border:'1px solid var(--line-300)', borderRadius:10, fontSize:13, background:'var(--paper)' }}>
            <option value="">Select…</option>
            {(qcmTypeOptions || []).map((t,i)=>(<option key={i} value={t}>{t}</option>))}
          </select>
        </div>
        <div>
          <label style={{ display:'block', fontSize:11.5, fontWeight:700, color:'var(--ink-700)', marginBottom:5 }}>Status</label>
          <select value={(qcmForm||{}).Status||'Active'} onChange={qcmSetStatus} style={{ width:'100%', padding:'9px 11px', border:'1px solid var(--line-300)', borderRadius:10, fontSize:13, background:'var(--paper)' }}>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>

      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:4 }}>
        <h4 style={{ fontFamily:"'Sora'", fontWeight:700, fontSize:14.5, color:'var(--ink-900)', margin:0 }}>Checklist Items ({qcmItemCount||0})</h4>
        <button onClick={qcmAddItem} style={{ display:'flex', alignItems:'center', gap:6, padding:'7px 13px', border:'none', background:'#1F8A4C', color:'#fff', borderRadius:9, fontSize:12.5, fontWeight:700, cursor:'pointer' }}>
          <Icon name="plus" style={{ width:13, height:13 }} />Add Checklist Item
        </button>
      </div>
      <div style={{ fontSize:11.5, color:'var(--ink-500)', marginBottom:10 }}>Add and manage checklist items for this campaign type</div>

      <div style={{ border:'1px solid var(--line-200)', borderRadius:12, overflow:'hidden' }}>
        <div style={{ display:'grid', gridTemplateColumns:'46px 1fr 130px 100px 46px', gap:8, padding:'8px 12px', background:'var(--surface-50)', fontSize:10, fontWeight:700, letterSpacing:'.04em', textTransform:'uppercase', color:'var(--ink-400)' }}>
          <span>Sl No.</span><span>Checklist Item</span><span>Item Type</span><span>Required</span><span />
        </div>
        {(qcmItemRows||[]).length===0 && (
          <div style={{ padding:'18px 12px', textAlign:'center', color:'var(--ink-500)', fontSize:12.5 }}>No items yet — click "Add Checklist Item" to start.</div>
        )}
        {(qcmItemRows||[]).map((it,i)=>(
          <div key={i} style={{ display:'grid', gridTemplateColumns:'46px 1fr 130px 100px 46px', gap:8, padding:'8px 12px', borderTop:'1px solid var(--line-200)', alignItems:'center' }}>
            <span style={{ fontSize:12.5, color:'var(--ink-500)' }}>{it.n}</span>
            <input value={it.text} onChange={it.setText} placeholder="Checklist item text…" style={{ padding:'7px 9px', border:'1px solid var(--line-300)', borderRadius:8, fontSize:12.5, outline:'none' }} />
            <select value={it.type} onChange={it.setType} style={{ padding:'7px 9px', border:'1px solid var(--line-300)', borderRadius:8, fontSize:12, background:'var(--paper)' }}>
              <option value="Text">Text</option>
              <option value="Checkbox">Checkbox</option>
            </select>
            <select value={it.required} onChange={it.setRequired} style={{ padding:'7px 9px', border:'1px solid var(--line-300)', borderRadius:8, fontSize:12, background:'var(--paper)' }}>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
            <button onClick={it.remove} title="Remove" style={{ width:28, height:28, border:'1px solid var(--line-300)', background:'var(--paper)', borderRadius:8, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>
              <Icon name="trash-2" style={{ width:13, height:13, color:'var(--danger-600)' }} />
            </button>
          </div>
        ))}
      </div>

      <div style={{ display:'flex', justifyContent:'flex-end', gap:10, marginTop:20 }}>
        <button onClick={qcmClose} style={{ padding:'10px 18px', border:'1px solid var(--line-300)', background:'var(--paper)', borderRadius:11, fontSize:13, fontWeight:700, color:'var(--ink-700)', cursor:'pointer' }}>Cancel</button>
        <button onClick={qcmSave} style={{ padding:'10px 22px', border:'none', background:'#7A1C46', color:'#fff', borderRadius:11, fontSize:13, fontWeight:700, cursor:'pointer' }}>Save</button>
      </div>
    </div>

    <div style={{ background:'var(--verify-100, #E7F5EC)', border:'1px solid #BFE3D0', borderRadius:14, padding:18, height:'fit-content' }}>
      <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:10 }}>
        <Icon name="info" style={{ width:15, height:15, color:'var(--verify-600)' }} />
        <span style={{ fontSize:13.5, fontWeight:700, color:'var(--ink-900)' }}>About Campaign Types</span>
      </div>
      <p style={{ fontSize:12.5, color:'var(--ink-700)', lineHeight:1.6, margin:'0 0 14px' }}>
        QC Checklists are mapped to Campaign Types. When creating tasks for a campaign, only relevant checklists will be shown based on the campaign type.
      </p>
      <div style={{ borderTop:'1px solid #BFE3D0', paddingTop:12, display:'flex', flexDirection:'column', gap:6 }}>
        <div style={{ display:'flex', justifyContent:'space-between', fontSize:12.5 }}>
          <span style={{ color:'var(--ink-600)' }}>Total Items:</span>
          <span style={{ fontWeight:700, color:'var(--ink-900)' }}>{qcmTotalItems||0}</span>
        </div>
        <div style={{ display:'flex', justifyContent:'space-between', fontSize:12.5 }}>
          <span style={{ color:'var(--ink-600)' }}>Required Items:</span>
          <span style={{ fontWeight:700, color:'var(--ink-900)' }}>{qcmRequiredItems||0}</span>
        </div>
      </div>
    </div>
  </div>
</div>
)}
</React.Fragment>
)}

{Boolean(mdShowTable) && (
<React.Fragment>

          
<div style={{"background":"var(--paper)","border":"1px solid var(--line-300)","borderRadius":"20px","boxShadow":"var(--shadow-sm)","overflow":"hidden"}}>

            
<div style={{"display":"flex","alignItems":"center","gap":"10px","padding":"14px 18px","borderBottom":"1px solid var(--line-200)"}}>

              
<div style={{"position":"relative","flex":"1","maxWidth":"320px"}}>
<Icon name={"search"} style={{"width":"15px","height":"15px","color":"var(--ink-400)","position":"absolute","left":"11px","top":"9px"}} />
<input value={mdQuery} onInput={mdOnQuery} placeholder="Search records…" style={{"width":"100%","padding":"8px 12px 8px 34px","border":"1px solid var(--line-300)","borderRadius":"10px","fontSize":"13px","outline":"none"}} />
</div>

              
<span style={{"fontSize":"12.5px","fontWeight":"700","color":"var(--ink-400)"}}>
{mdCount}
</span>

            
</div>

            
<div style={{"overflowX":"auto"}}>

              
<table style={{"width":"100%","borderCollapse":"collapse","minWidth":"720px"}}>

                
<thead>
<tr>

                  
{(mdCols || []).map((c, $index) => (
<React.Fragment key={$index}>
<th style={{"textAlign":"left","padding":"12px 18px","fontSize":"11px","fontWeight":"700","letterSpacing":".06em","textTransform":"uppercase","color":"var(--ink-500)","background":"var(--surface-50)","borderBottom":"1px solid var(--line-200)"}}>
{c}
</th>
</React.Fragment>
))}

                  
<th style={{"background":"var(--surface-50)","borderBottom":"1px solid var(--line-200)"}} />

                
</tr>
</thead>

                
<tbody>

                  
{(mdRows || []).map((row, $index) => (
<React.Fragment key={$index}>

                    
<tr onClick={row.open} style={{"cursor":"pointer"}} style-hover="background:var(--surface-50)">

                      
{(row.cells || []).map((cell, $index) => (
<React.Fragment key={$index}>

                        
<td style={{"padding":"13px 18px","borderBottom":"1px solid var(--line-200)","fontSize":"13.5px","color":"var(--ink-700)","whiteSpace":"nowrap"}}>

                          
{Boolean(cell.tag) && (
<React.Fragment>
<span style={cssTextToObject(`font-size:11.5px;font-weight:700;padding:4px 10px;border-radius:999px;background:${cell.tagBg};color:${cell.tagColor}`)}>
{cell.val}
</span>
</React.Fragment>
)}

                          
{Boolean(cell.plain) && (
<React.Fragment>
<span style={cssTextToObject(`font-family:${cell.font}`)}>
{cell.val}
</span>
</React.Fragment>
)}

                        
</td>

                      
</React.Fragment>
))}

                      
<td style={{"padding":"13px 18px","borderBottom":"1px solid var(--line-200)","textAlign":"right"}}>
<Icon name={"chevron-right"} style={{"width":"16px","height":"16px","color":"var(--ink-400)"}} />
</td>

                    
</tr>

                  
</React.Fragment>
))}

                
</tbody>

              
</table>

            
</div>

            
{Boolean(mdPg.show) && (
<React.Fragment>

              
<div style={{"display":"flex","alignItems":"center","gap":"10px","padding":"12px 20px","background":"var(--surface-50)","borderTop":"1px solid var(--line-200)"}}>
<span style={{"flex":"1","fontSize":"12px","fontWeight":"600","color":"var(--ink-500)"}}>
{mdPg.label}
</span>
<button onClick={mdPg.prev} style={cssTextToObject(mdPg.prevStyle)}>
<Icon name={"chevron-left"} style={{"width":"14px","height":"14px"}} />
Prev
</button>
<button onClick={mdPg.next} style={cssTextToObject(mdPg.nextStyle)}>
Next
<Icon name={"chevron-right"} style={{"width":"14px","height":"14px"}} />
</button>
</div>

            
</React.Fragment>
)}

          
</div>

          
</React.Fragment>
)}

        
</React.Fragment>
)}
    </React.Fragment>
  );
}
