import React from 'react';
import Icon from '../../components/Icon.jsx';
import { cssTextToObject } from '../../utils/cssText.js';

export default function NewPageForm({ vm }) {
  const { closeNewPage, npAddAttachment, npAttachments, npHasAttachments, npAddLink, npAddMedia, npBack, npCode, npDescLen, npDescLenColor, npHasParent, npInsightOptions, npLinks, npMedia, npNext, npNotFirst, npNotLast, npOwnerName, npParentOptions, npParentUrl, npRelInsightUrl, npRelServiceUrl, npRepos, npServiceOptions, npSetCountries, npSetCta, npSetH2, npSetH2Body, npSetH3, npSetH3Body, npSetIndustry, npSetIntent, npSetIntro, npSetKeyword, npSetMenuCat, npSetMenuOrder, npSetMetaDesc, npSetMetaTitle, npSetName, npSetOgDesc, npSetOgImage, npSetOgTitle, npSetOwner, npSetParentId, npSetPrimaryKw, npSetPublishDate, npSetRelInsightId, npSetRelServiceId, npSetRepo, npSetReviewer, npSetRobots, npSetSchema, npSetSecondaryKw, npSetSector, npSetSlug, npSetSubService, npSetType, npSlug, npTab0, npTab1, npTab2, npTab3, npTab4, npTab5, npTab6, npTab7, npTab8, npTab9, npTabs, npTitleLen, npTitleLenColor, npToday, npUrl, npf, showNewPage, stop, submitNewPageCreate, submitNewPageDraft, npIsEdit, npPanelTitle, npCanDelete, npDelete, npBrandOptions, npSetBrand, npIsIndex, npSetIsIndex, npObjectCategoryOptions, npSetObjectCategory, npTypeOptions, npIndustryOptions, npServiceMasterOptions, npLinkServiceVal, npPullFromService, npSubServiceMasterOptions, npLinkSubServiceVal, npPullFromSubService, npContentVersionNote } = vm;
  return (
    <React.Fragment>
{Boolean(showNewPage) && (
<React.Fragment>

  
<div onClick={closeNewPage} style={{"position":"fixed","inset":"0","background":"rgba(31,8,20,.5)","backdropFilter":"blur(3px)","zIndex":"170","display":"flex","justifyContent":"flex-end"}}>

    
<div onClick={stop} className="blscroll" style={{"width":"100%","maxWidth":"720px","height":"100%","background":"var(--paper)","boxShadow":"var(--shadow-xl)","overflowY":"auto","animation":"blrise .3s var(--ease-out)"}}>

      
<div style={{"position":"sticky","top":"0","background":"var(--paper)","borderBottom":"1px solid var(--line-200)","padding":"18px 24px","zIndex":"5"}}>

        
<div style={{"display":"flex","alignItems":"flex-start","justifyContent":"space-between"}}>

          
<div>

            
<div style={{"fontSize":"11px","fontWeight":"700","letterSpacing":".1em","textTransform":"uppercase","color":"var(--orchid-500)"}}>
Content Repository
</div>

            
<h3 style={{"fontFamily":"'Sora'","fontWeight":"700","fontSize":"20px","color":"var(--ink-900)","margin":"3px 0 0"}}>
{npPanelTitle || 'Create new page'}
</h3>


<div style={{"display":"flex","alignItems":"center","gap":"8px","marginTop":"6px"}}>
<span style={{"fontSize":"11px","fontWeight":"700","color":"var(--ink-500)"}}>
Page code
</span>
<span style={{"fontFamily":"'Space Mono'","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-900)","background":"var(--surface-50)","border":"1px solid var(--line-300)","borderRadius":"7px","padding":"2px 9px"}}>
{npCode}
</span>
<span style={{"fontSize":"10.5px","color":"var(--ink-400)"}}>
{npIsEdit ? 'editing' : 'auto-generated'}
</span>
</div>


</div>


<div style={{"display":"flex","alignItems":"center","gap":"8px"}}>

{Boolean(npCanDelete) && (
<button onClick={npDelete} style={{"display":"flex","alignItems":"center","gap":"7px","background":"var(--paper)","border":"1px solid var(--danger-300, #e5a3a3)","color":"var(--danger-600)","borderRadius":"10px","padding":"9px 14px","fontSize":"12.5px","fontWeight":"700","cursor":"pointer"}}>
<Icon name={"trash-2"} style={{"width":"15px","height":"15px"}} />
Delete
</button>
)}

<button onClick={closeNewPage} style={{"width":"34px","height":"34px","borderRadius":"10px","border":"1px solid var(--line-300)","background":"var(--paper)","cursor":"pointer","display":"flex","alignItems":"center","justifyContent":"center"}}>
<Icon name={"x"} style={{"width":"17px","height":"17px","color":"var(--ink-700)"}} />
</button>
</div>

        
</div>

        
<div className="blscroll" style={{"display":"flex","gap":"2px","margin":"14px -24px -18px","padding":"0 24px","borderBottom":"1px solid var(--line-200)","overflowX":"auto"}}>

          
{(npTabs || []).map((t, $index) => (
<React.Fragment key={$index}>
<button onClick={t.go} style={cssTextToObject(t.style)}>
{t.label}
</button>
</React.Fragment>
))}

        
</div>

      
</div>

      
<div style={{"padding":"22px 24px","display":"flex","flexDirection":"column","gap":"22px"}}>


        
{Boolean(npTab0) && (
<React.Fragment>

        
<div>

          
<div style={{"fontSize":"11.5px","fontWeight":"700","letterSpacing":".08em","textTransform":"uppercase","color":"var(--ink-400)","marginBottom":"12px"}}>
Page information
</div>

          
<div style={{"display":"grid","gridTemplateColumns":"1fr 1fr","gap":"14px"}}>

            
<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Repository *
</label>
<select value={npf.repo} onChange={npSetRepo} style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","background":"var(--paper)"}}>
{(npRepos || []).map((r, $index) => (
<React.Fragment key={$index}>
<option value={r.key}>
{r.name}
</option>
</React.Fragment>
))}
</select>
</div>

<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Brand
</label>
<select value={npf.brand||''} onChange={npSetBrand} style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","background":"var(--paper)"}}>
{(npBrandOptions || []).map((b, $index) => (
<React.Fragment key={$index}>
<option value={b}>
{b}
</option>
</React.Fragment>
))}
</select>
</div>

{Boolean(npServiceMasterOptions && npServiceMasterOptions.length) && (
<React.Fragment>
<div style={{"gridColumn":"1 / -1","background":"var(--orchid-100)","border":"1px solid var(--orchid-200)","borderRadius":"11px","padding":"10px 12px"}}>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--orchid-700)","marginBottom":"6px"}}>
Service — pulls SEO details + URL slug from Service Master
</label>
<select value={npLinkServiceVal} onChange={npPullFromService} style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","background":"var(--paper)"}}>
<option value="">— Select a service to auto-fill meta title, description, keywords, industry, countries &amp; URL slug —</option>
{(npServiceMasterOptions || []).map((s, $index) => (
<React.Fragment key={$index}>
<option value={s}>
{s}
</option>
</React.Fragment>
))}
</select>
</div>
</React.Fragment>
)}

{Boolean(npSubServiceMasterOptions && npSubServiceMasterOptions.length) && (
<React.Fragment>
<div style={{"gridColumn":"1 / -1","background":"var(--orchid-100)","border":"1px solid var(--orchid-200)","borderRadius":"11px","padding":"10px 12px"}}>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--orchid-700)","marginBottom":"6px"}}>
Sub-Service — pulls SEO details + URL slug from Service Master
</label>
<select value={npLinkSubServiceVal} onChange={npPullFromSubService} style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","background":"var(--paper)"}}>
<option value="">— Select a sub-service to auto-fill meta title, description &amp; URL slug —</option>
{(npSubServiceMasterOptions || []).map((s, $index) => (
<React.Fragment key={$index}>
<option value={s}>
{s}
</option>
</React.Fragment>
))}
</select>
</div>
</React.Fragment>
)}


<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Page type
</label>
<select value={npf.type} onChange={npSetType} style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","background":"var(--paper)"}}>
{(npTypeOptions || []).map((t, $index) => (
<React.Fragment key={$index}>
<option value={t}>
{t}
</option>
</React.Fragment>
))}
</select>
</div>

            
<div style={{"gridColumn":"1 / -1"}}>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Page name *
</label>
<input value={npf.name} onInput={npSetName} placeholder="e.g. Cloud Migration Services" style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","outline":"none"}} />
</div>

            
<div style={{"gridColumn":"1 / -1"}}>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
URL slug 
<span style={{"color":"var(--ink-400)","fontWeight":"600"}}>
— auto from name, editable
</span>
</label>
<input value={npf.slug} onInput={npSetSlug} disabled={npIsIndex} placeholder={npSlug} style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","outline":"none","fontFamily":"'Space Mono'","opacity":npIsIndex?0.5:1}} />
<label style={{"display":"flex","alignItems":"center","gap":"7px","marginTop":"8px","fontSize":"12.5px","fontWeight":"600","color":"var(--ink-700)","cursor":"pointer"}}>
<input type="checkbox" checked={npIsIndex} onChange={npSetIsIndex} />
This page is the category's index (URL ends at the folder, no extra slug)
</label>
</div>

          
</div>

          
<div style={{"display":"flex","alignItems":"center","gap":"8px","marginTop":"10px","background":"var(--surface-50)","border":"1px solid var(--line-200)","borderRadius":"10px","padding":"9px 12px"}}>
<Icon name={"link"} style={{"width":"14px","height":"14px","color":"var(--info-600)"}} />
<span style={{"fontSize":"12px","color":"var(--ink-500)"}}>
Live URL:
</span>
<span style={{"fontFamily":"'Space Mono'","fontSize":"12px","color":"var(--info-600)"}}>
{npUrl}
</span>
</div>

        
</div>


        
<div>

          
<div style={{"fontSize":"11.5px","fontWeight":"700","letterSpacing":".08em","textTransform":"uppercase","color":"var(--ink-400)","marginBottom":"12px"}}>
Menu & navigation
</div>

          
<div style={{"display":"grid","gridTemplateColumns":"1fr 1fr 1fr","gap":"14px"}}>

            
<div style={{"gridColumn":"1 / -1"}}>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Parent page 
<span style={{"color":"var(--ink-400)","fontWeight":"600"}}>
— nests this page under it (URL inherits)
</span>
</label>
<select value={npf.pid} onChange={npSetParentId} style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","background":"var(--paper)"}}>
{(npParentOptions || []).map((po, $index) => (
<React.Fragment key={$index}>
<option value={po.id}>
{po.label}
</option>
</React.Fragment>
))}
</select>
{Boolean(npHasParent) && (
<React.Fragment>
<div style={{"display":"flex","alignItems":"center","gap":"7px","marginTop":"7px","fontSize":"11.5px","color":"var(--ink-500)"}}>
<Icon name={"corner-down-right"} style={{"width":"13px","height":"13px","color":"var(--orchid-500)"}} />
Parent URL: 
<span style={{"fontFamily":"'Space Mono'","color":"var(--info-600)"}}>
{npParentUrl}
</span>
</div>
</React.Fragment>
)}
</div>

            
<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Menu category
</label>
<input value={npf.menuCat} onInput={npSetMenuCat} placeholder="e.g. Services" style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","outline":"none"}} />
</div>

            
<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Menu order
</label>
<input value={npf.menuOrder} onInput={npSetMenuOrder} placeholder="e.g. 1" style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","outline":"none"}} />
</div>

          
</div>

        
</div>

        
</React.Fragment>
)}


        
{Boolean(npTab1) && (
<React.Fragment>

        
<div>

          
<div style={{"fontSize":"11.5px","fontWeight":"700","letterSpacing":".08em","textTransform":"uppercase","color":"var(--ink-400)","marginBottom":"12px"}}>
Classification
</div>

          
<div style={{"display":"grid","gridTemplateColumns":"1fr 1fr","gap":"14px"}}>

            
<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Primary keyword
</label>
<input value={npf.keyword} onInput={npSetKeyword} placeholder="e.g. enterprise cloud migration" style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","outline":"none"}} />
</div>

            
<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Industry
</label>
<select value={npf.industry||''} onChange={npSetIndustry} style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","background":"var(--paper)"}}>
<option value="">— Select —</option>
{(npIndustryOptions || []).map((o, $index) => (
<React.Fragment key={$index}>
<option value={o}>
{o}
</option>
</React.Fragment>
))}
</select>
</div>

            
<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Sub-service
</label>
<input value={npf.subService} onInput={npSetSubService} placeholder="e.g. AWS Migration" style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","outline":"none"}} />
</div>

            
<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Sector
</label>
<input value={npf.sector} onInput={npSetSector} placeholder="e.g. Enterprise" style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","outline":"none"}} />
</div>


<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Object category
</label>
<select value={npf.objectCategory||''} onChange={npSetObjectCategory} style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","background":"var(--paper)"}}>
<option value="">— Select —</option>
{(npObjectCategoryOptions || []).map((o, $index) => (
<React.Fragment key={$index}>
<option value={o}>
{o}
</option>
</React.Fragment>
))}
</select>
</div>

            
<div style={{"gridColumn":"1 / -1"}}>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Target countries
</label>
<input value={npf.countries} onInput={npSetCountries} placeholder="e.g. USA, UK, Canada" style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","outline":"none"}} />
</div>

          
</div>

          
<div style={{"display":"flex","alignItems":"center","gap":"9px","background":"var(--orchid-100)","border":"1px solid var(--orchid-200)","color":"var(--orchid-700)","padding":"10px 14px","borderRadius":"12px","fontSize":"12.5px","fontWeight":"600","marginTop":"14px"}}>
<Icon name={"link"} style={{"width":"15px","height":"15px"}} />
Service & industry values are validated against the Service Master in Admin.
</div>

        
</div>

        
</React.Fragment>
)}


        
{Boolean(npTab2) && (
<React.Fragment>

        
<div>

          
<div style={{"display":"flex","alignItems":"center","justifyContent":"space-between","marginBottom":"12px"}}>
<span style={{"fontSize":"11.5px","fontWeight":"700","letterSpacing":".08em","textTransform":"uppercase","color":"var(--ink-400)"}}>
SEO metadata
</span>
</div>

          
<div style={{"display":"flex","flexDirection":"column","gap":"14px"}}>

            
<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Meta title
</label>
<input value={npf.metaTitle} onInput={npSetMetaTitle} placeholder="e.g. Nutraceutical Product Development Services | Beetloop" style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","outline":"none"}} />
<div style={cssTextToObject(`font-size:11px;margin-top:4px;text-align:right;color:${npTitleLenColor}`)}>
{npTitleLen}
</div>
</div>

            
<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Meta description
</label>
<textarea value={npf.metaDesc} onInput={npSetMetaDesc} rows="2" placeholder="e.g. We help you design, develop, and commercialize compliant products." style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","outline":"none","resize":"vertical"}} />
<div style={cssTextToObject(`font-size:11px;margin-top:4px;text-align:right;color:${npDescLenColor}`)}>
{npDescLen}
</div>
</div>

            
<div style={{"display":"grid","gridTemplateColumns":"1fr 1fr 1fr","gap":"14px"}}>

              
<div style={{"gridColumn":"1 / -1"}}>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Primary keywords
</label>
<input value={npf.primaryKw} onInput={npSetPrimaryKw} placeholder="e.g. nutraceutical formulation, clinical trials, FDA compliance" style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","outline":"none"}} />
<div style={{"fontSize":"11px","color":"var(--ink-400)","marginTop":"4px"}}>
Comma-separated primary keywords
</div>
</div>

              
<div style={{"gridColumn":"1 / -1"}}>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Secondary keywords
</label>
<input value={npf.secondaryKw} onInput={npSetSecondaryKw} placeholder="e.g. product development, regulatory support" style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","outline":"none"}} />
<div style={{"fontSize":"11px","color":"var(--ink-400)","marginTop":"4px"}}>
Comma-separated secondary keywords
</div>
</div>

              
<div style={{"gridColumn":"span 1"}}>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Keyword intent
</label>
<select value={npf.intent} onChange={npSetIntent} style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","background":"var(--paper)"}}>
<option value>
Select…
</option>
<option>
Informational
</option>
<option>
Commercial
</option>
<option>
Transactional
</option>
<option>
Navigational
</option>
</select>
</div>

              
<div style={{"gridColumn":"span 2"}}>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Schema type
</label>
<select value={npf.schema} onChange={npSetSchema} style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","background":"var(--paper)"}}>
<option value>
Auto (by repository)
</option>
<option>
Service
</option>
<option>
Article
</option>
<option>
Product
</option>
<option>
FAQPage
</option>
<option>
WebPage
</option>
</select>
</div>

            
</div>

            
<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Canonical URL
</label>
<div style={{"display":"flex","alignItems":"center","gap":"8px","padding":"10px 12px","border":"1px solid var(--line-200)","borderRadius":"11px","background":"var(--surface-50)"}}>
<Icon name={"link"} style={{"width":"14px","height":"14px","color":"var(--info-600)"}} />
<span style={{"fontFamily":"'Space Mono'","fontSize":"12.5px","color":"var(--info-600)"}}>
{npUrl}
</span>
<span style={{"fontSize":"11px","color":"var(--ink-400)","marginLeft":"auto"}}>
Auto-generated from slug
</span>
</div>
</div>

            
<div>

              
<div style={{"fontSize":"11.5px","fontWeight":"700","letterSpacing":".08em","textTransform":"uppercase","color":"var(--ink-400)","margin":"6px 0 12px"}}>
Open Graph (social media)
</div>

              
<div style={{"display":"flex","flexDirection":"column","gap":"14px"}}>

                
<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
OG title
</label>
<input value={npf.ogTitle} onInput={npSetOgTitle} placeholder="Title for social media shares — defaults to meta title" style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","outline":"none"}} />
</div>

                
<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
OG description
</label>
<textarea value={npf.ogDesc} onInput={npSetOgDesc} rows="2" placeholder="Description for social media shares — defaults to meta description" style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","outline":"none","resize":"vertical"}} />
</div>

                
<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
OG image URL
</label>
<input value={npf.ogImage} onInput={npSetOgImage} placeholder="https://example.com/image.jpg" style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","outline":"none","fontFamily":"'Space Mono'"}} />
</div>

              
</div>

            
</div>

            
<div>

              
<div style={{"fontSize":"11.5px","fontWeight":"700","letterSpacing":".08em","textTransform":"uppercase","color":"var(--ink-400)","margin":"6px 0 12px"}}>
Technical SEO
</div>

              
<div style={{"display":"grid","gridTemplateColumns":"1fr 1fr","gap":"14px"}}>

                
<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Robots
</label>
<select value={npf.robots} onChange={npSetRobots} style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","background":"var(--paper)"}}>
<option>
Index, Follow
</option>
<option>
Noindex, Follow
</option>
<option>
Index, Nofollow
</option>
<option>
Noindex, Nofollow
</option>
</select>
</div>

                
<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Index status
</label>
<div style={{"display":"flex","alignItems":"center","gap":"8px","padding":"10px 12px","border":"1px solid var(--line-200)","borderRadius":"11px","background":"var(--surface-50)","fontSize":"13px","color":"var(--ink-500)"}}>
Draft — set on publish
</div>
</div>

              
</div>

            
</div>

          
</div>

        
</div>

        
</React.Fragment>
)}


        
{Boolean(npTab3) && (
<React.Fragment>

        
<div>

          
<div style={{"fontSize":"11.5px","fontWeight":"700","letterSpacing":".08em","textTransform":"uppercase","color":"var(--ink-400)","marginBottom":"12px"}}>
Content — starter blocks
</div>

<div style={{"display":"flex","alignItems":"center","gap":"7px","background":"var(--verify-100)","border":"1px solid #BFE3D0","color":"var(--verify-600)","borderRadius":"10px","padding":"8px 12px","fontSize":"11.5px","fontWeight":"700","marginBottom":"12px"}}>
<Icon name={"history"} style={{"width":"13px","height":"13px","flexShrink":"0"}} />
{npContentVersionNote}
</div>

          
<div style={{"display":"flex","flexDirection":"column","gap":"14px"}}>

            
<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
H1 heading 
<span style={{"color":"var(--ink-400)","fontWeight":"600"}}>
— defaults to page name
</span>
</label>
<input value={npf.name} onInput={npSetName} placeholder="Page name becomes the H1" style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","outline":"none"}} />
</div>

            
<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Introduction paragraph
</label>
<textarea value={npf.intro} onInput={npSetIntro} rows="3" placeholder="Opening paragraph under the H1…" style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","outline":"none","resize":"vertical"}} />
</div>

            
<div style={{"display":"grid","gridTemplateColumns":"1fr 1fr","gap":"14px"}}>

              
<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
H2 heading
</label>
<input value={npf.h2} onInput={npSetH2} placeholder="e.g. Overview" style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","outline":"none"}} />
</div>

              
<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
H3 heading
</label>
<input value={npf.h3} onInput={npSetH3} placeholder="e.g. Key benefits" style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","outline":"none"}} />
</div>

              
<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
H2 section body
</label>
<textarea value={npf.h2body} onInput={npSetH2Body} rows="3" placeholder="Content under the H2…" style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","outline":"none","resize":"vertical"}} />
</div>

              
<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
H3 section body
</label>
<textarea value={npf.h3body} onInput={npSetH3Body} rows="3" placeholder="Content under the H3…" style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","outline":"none","resize":"vertical"}} />
</div>

            
</div>

            
<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Call to action
</label>
<input value={npf.cta} onInput={npSetCta} placeholder="e.g. Request a consultation" style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","outline":"none"}} />
</div>

            
<div style={{"display":"flex","alignItems":"center","gap":"8px","background":"var(--surface-50)","border":"1px solid var(--line-200)","borderRadius":"10px","padding":"10px 13px","fontSize":"12px","color":"var(--ink-500)"}}>
<Icon name={"layout-list"} style={{"width":"14px","height":"14px","flexShrink":"0"}} />
These seed the block editor (H1 · Intro · H2 + body · H3 + body · CTA · FAQ). Add more blocks after creation in the Content tab.
</div>


<div>
<div style={{"display":"flex","alignItems":"center","justifyContent":"space-between","marginBottom":"8px"}}>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)"}}>
Attachments
</label>
<button onClick={npAddAttachment} style={{"display":"flex","alignItems":"center","gap":"6px","padding":"7px 12px","border":"1px solid var(--line-300)","borderRadius":"9px","background":"var(--paper)","fontSize":"12px","fontWeight":"700","color":"var(--ink-700)","cursor":"pointer"}}>
<Icon name={"paperclip"} style={{"width":"13px","height":"13px"}} />
Attach file
</button>
</div>
{Boolean(npHasAttachments) && (
<div style={{"display":"flex","flexDirection":"column","gap":"8px","marginBottom":"9px"}}>
{(npAttachments || []).map((a, $index) => (
<div key={$index} style={{"background":"var(--surface-50)","border":"1px solid var(--line-200)","borderRadius":"12px","padding":"10px","display":"flex","gap":"8px","alignItems":"center"}}>
<span style={{"width":"28px","height":"28px","borderRadius":"8px","background":"var(--orchid-100)","display":"flex","alignItems":"center","justifyContent":"center","flexShrink":"0"}}>
<Icon name={a.icon} style={{"width":"14px","height":"14px","color":"var(--orchid-600)"}} />
</span>
<button onClick={a.open} title="Preview" style={{"width":"200px","textAlign":"left","background":"none","border":"none","padding":"0","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-800)","cursor":"pointer","overflow":"hidden","textOverflow":"ellipsis","whiteSpace":"nowrap"}}>
{a.name}
</button>
<input value={a.desc} onInput={a.setDesc} placeholder="Description — what this file contains" style={{"flex":"1","padding":"7px 10px","border":"1px solid var(--line-300)","borderRadius":"8px","fontSize":"12px","outline":"none"}} />
<span title="Document version — bumps automatically when this attachment is replaced" style={{"fontSize":"10.5px","fontWeight":"700","padding":"3px 8px","borderRadius":"999px","background":"var(--verify-100)","color":"var(--verify-600)","flexShrink":"0"}}>
{a.version}
</span>
<button onClick={a.replace} title="Replace with a new version" style={{"background":"none","border":"none","cursor":"pointer","color":"var(--orchid-600)","padding":"4px"}}>
<Icon name={"replace"} style={{"width":"14px","height":"14px"}} />
</button>
<button onClick={a.download} title="Download" style={{"background":"none","border":"none","cursor":"pointer","color":"var(--ink-400)","padding":"4px"}}>
<Icon name={"download"} style={{"width":"14px","height":"14px"}} />
</button>
<button onClick={a.remove} title="Remove" style={{"background":"none","border":"none","cursor":"pointer","color":"var(--danger-500)","padding":"4px"}}>
<Icon name={"trash-2"} style={{"width":"14px","height":"14px"}} />
</button>
</div>
))}
</div>
)}
<div onClick={npAddAttachment} style={{"border":"1.5px dashed var(--line-300)","borderRadius":"12px","padding":"18px","textAlign":"center","cursor":"pointer"}}>
<Icon name={"upload-cloud"} style={{"width":"22px","height":"22px","color":"var(--orchid-600)"}} />
<div style={{"fontSize":"12.5px","fontWeight":"700","color":"var(--orchid-600)","marginTop":"5px"}}>
Drag & drop files here or click to upload
</div>
<div style={{"fontSize":"11px","color":"var(--ink-400)","marginTop":"3px"}}>
Saved with this page and stays linked to it — visible later in Page Details and Document Repository.
</div>
</div>
</div>


</div>

        
</div>

        
</React.Fragment>
)}


        
{Boolean(npTab4) && (
<React.Fragment>

        
<div>

          
<div style={{"fontSize":"11.5px","fontWeight":"700","letterSpacing":".08em","textTransform":"uppercase","color":"var(--ink-400)","marginBottom":"12px"}}>
Relationships
</div>

          
<div style={{"display":"grid","gridTemplateColumns":"1fr 1fr","gap":"14px"}}>

            
<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Related service
</label>
<select value={npf.relServiceId} onChange={npSetRelServiceId} style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","background":"var(--paper)"}}>
{(npServiceOptions || []).map((so, $index) => (
<React.Fragment key={$index}>
<option value={so.id}>
{so.label}
</option>
</React.Fragment>
))}
</select>
{Boolean(npRelServiceUrl) && (
<React.Fragment>
<div style={{"display":"flex","alignItems":"center","gap":"6px","marginTop":"7px","fontSize":"11.5px"}}>
<Icon name={"link"} style={{"width":"12px","height":"12px","color":"var(--orchid-500)"}} />
<span style={{"fontFamily":"'Space Mono'","color":"var(--info-600)"}}>
{npRelServiceUrl}
</span>
</div>
</React.Fragment>
)}
</div>

            
<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Related insight / article
</label>
<select value={npf.relInsightId} onChange={npSetRelInsightId} style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","background":"var(--paper)"}}>
{(npInsightOptions || []).map((io, $index) => (
<React.Fragment key={$index}>
<option value={io.id}>
{io.label}
</option>
</React.Fragment>
))}
</select>
{Boolean(npRelInsightUrl) && (
<React.Fragment>
<div style={{"display":"flex","alignItems":"center","gap":"6px","marginTop":"7px","fontSize":"11.5px"}}>
<Icon name={"link"} style={{"width":"12px","height":"12px","color":"var(--orchid-500)"}} />
<span style={{"fontFamily":"'Space Mono'","color":"var(--info-600)"}}>
{npRelInsightUrl}
</span>
</div>
</React.Fragment>
)}
</div>

          
</div>

          
<div style={{"display":"flex","alignItems":"center","gap":"8px","marginTop":"12px","background":"var(--surface-50)","border":"1px solid var(--line-200)","borderRadius":"10px","padding":"10px 13px","fontSize":"12px","color":"var(--ink-500)"}}>
<Icon name={"link-2"} style={{"width":"14px","height":"14px","flexShrink":"0"}} />
Relationships link pages instead of duplicating content — one source of truth per page.
</div>

        
</div>

        
</React.Fragment>
)}


        
{Boolean(npTab5) && (
<React.Fragment>

        
<div>

          
<div style={{"fontSize":"11.5px","fontWeight":"700","letterSpacing":".08em","textTransform":"uppercase","color":"var(--ink-400)","marginBottom":"12px"}}>
Links
</div>

          
<div style={{"display":"flex","flexDirection":"column","gap":"10px"}}>

            
{(npLinks || []).map((l, $index) => (
<React.Fragment key={$index}>

              
<div style={{"display":"flex","gap":"10px","alignItems":"flex-end"}}>

                
<div style={{"flex":"1"}}>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Anchor text {l.n}
</label>
<input value={l.anchor} onInput={l.setAnchor} placeholder="e.g. cloud migration services" style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","outline":"none"}} />
</div>

                
<div style={{"flex":"1"}}>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Target URL
</label>
<input value={l.target} onInput={l.setTarget} placeholder="/services/… or https://…" style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","outline":"none","fontFamily":"'Space Mono'"}} />
</div>

                
<div style={{"flex":"none","width":"118px"}}>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Link type
</label>
<select value={l.ltype} onChange={l.setLtype} style={{"width":"100%","padding":"10px 10px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13px","background":"var(--paper)"}}>
<option>
Internal
</option>
<option>
External
</option>
</select>
</div>

                
{Boolean(l.canRemove) && (
<React.Fragment>
<button onClick={l.remove} title="Remove link" style={{"flex":"none","width":"40px","height":"40px","borderRadius":"11px","border":"1px solid var(--line-300)","background":"var(--paper)","cursor":"pointer","display":"flex","alignItems":"center","justifyContent":"center"}}>
<Icon name={"trash-2"} style={{"width":"15px","height":"15px","color":"var(--danger-600)"}} />
</button>
</React.Fragment>
)}

              
</div>

            
</React.Fragment>
))}

            
<button onClick={npAddLink} style={{"display":"flex","alignItems":"center","gap":"7px","justifyContent":"center","padding":"10px","border":"1px dashed var(--orchid-300)","background":"var(--orchid-100)","borderRadius":"11px","fontSize":"12.5px","fontWeight":"700","color":"var(--orchid-700)","cursor":"pointer"}}>
<Icon name={"plus"} style={{"width":"14px","height":"14px"}} />
Add another link
</button>

          
</div>

          
<div style={{"display":"flex","alignItems":"center","gap":"9px","background":"linear-gradient(150deg,#3d1024,#7A1C46)","color":"#fff","padding":"12px 16px","borderRadius":"12px","fontSize":"12.5px","fontWeight":"600","marginTop":"14px"}}>
<Icon name={"sparkles"} style={{"width":"15px","height":"15px","color":"var(--orchid-300)"}} />
AI link suggestions run automatically once the page is created.
</div>

        
</div>

        
</React.Fragment>
)}


        
{Boolean(npTab6) && (
<React.Fragment>

        
<div>

          
<div style={{"fontSize":"11.5px","fontWeight":"700","letterSpacing":".08em","textTransform":"uppercase","color":"var(--ink-400)","marginBottom":"12px"}}>
Media
</div>

          
<div style={{"display":"flex","flexDirection":"column","gap":"10px"}}>

            
{(npMedia || []).map((m, $index) => (
<React.Fragment key={$index}>

              
<div style={{"display":"flex","gap":"10px","alignItems":"flex-end"}}>

                
<div style={{"flex":"none","width":"110px"}}>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Type {m.n}
</label>
<select value={m.type} onChange={m.setType} style={{"width":"100%","padding":"10px 10px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13px","background":"var(--paper)"}}>
<option>
Image
</option>
<option>
Gallery
</option>
<option>
Video
</option>
<option>
PDF
</option>
<option>
Infographic
</option>
</select>
</div>

                
<div style={{"flex":"1"}}>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
File name
</label>
<input value={m.name} onInput={m.setName} placeholder="hero-image.jpg" style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","outline":"none","fontFamily":"'Space Mono'"}} />
</div>

                
<div style={{"flex":"1"}}>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Alt text
</label>
<input value={m.alt} onInput={m.setAlt} placeholder="Describe for accessibility & SEO" style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","outline":"none"}} />
</div>

                
{Boolean(m.canRemove) && (
<React.Fragment>
<button onClick={m.remove} title="Remove media" style={{"flex":"none","width":"40px","height":"40px","borderRadius":"11px","border":"1px solid var(--line-300)","background":"var(--paper)","cursor":"pointer","display":"flex","alignItems":"center","justifyContent":"center"}}>
<Icon name={"trash-2"} style={{"width":"15px","height":"15px","color":"var(--danger-600)"}} />
</button>
</React.Fragment>
)}

              
</div>

            
</React.Fragment>
))}

            
<button onClick={npAddMedia} style={{"display":"flex","alignItems":"center","gap":"7px","justifyContent":"center","padding":"10px","border":"1px dashed var(--orchid-300)","background":"var(--orchid-100)","borderRadius":"11px","fontSize":"12.5px","fontWeight":"700","color":"var(--orchid-700)","cursor":"pointer"}}>
<Icon name={"plus"} style={{"width":"14px","height":"14px"}} />
Add media
</button>

          
</div>

          
<div style={{"border":"1px dashed var(--line-300)","borderRadius":"12px","background":"var(--surface-50)","padding":"26px","display":"flex","flexDirection":"column","alignItems":"center","gap":"8px","color":"var(--ink-400)","marginTop":"14px"}}>
<Icon name={"upload"} style={{"width":"24px","height":"24px"}} />
<span style={{"fontSize":"12.5px","fontWeight":"600"}}>
Drop files here after creation — images, PDFs, videos land in this page's media library.
</span>
</div>

        
</div>

        
</React.Fragment>
)}


        
{Boolean(npTab7) && (
<React.Fragment>

        
<div>

          
<div style={{"fontSize":"11.5px","fontWeight":"700","letterSpacing":".08em","textTransform":"uppercase","color":"var(--ink-400)","marginBottom":"12px"}}>
Publishing & ownership
</div>

          
<div style={{"display":"grid","gridTemplateColumns":"1fr 1fr","gap":"14px"}}>

            
<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Owner
</label>
<input value={npf.owner} onInput={npSetOwner} placeholder="Content author" style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","outline":"none"}} />
</div>

            
<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Reviewer
</label>
<input value={npf.reviewer} onInput={npSetReviewer} placeholder="SEO / QC reviewer" style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","outline":"none"}} />
</div>

            
<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Planned publish date
</label>
<input type="date" value={npf.publishDate} onInput={npSetPublishDate} style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","outline":"none","background":"var(--paper)"}} />
</div>

            
<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Initial status
</label>
<div style={{"display":"flex","alignItems":"center","gap":"8px","padding":"10px 12px","border":"1px solid var(--line-200)","borderRadius":"11px","background":"var(--surface-50)","fontSize":"13px","color":"var(--ink-500)"}}>
Draft — or use “Create & submit” below
</div>
</div>

          
</div>

          
<div style={{"display":"flex","alignItems":"center","gap":"8px","marginTop":"12px","background":"var(--surface-50)","border":"1px solid var(--line-200)","borderRadius":"10px","padding":"10px 13px","fontSize":"12px","color":"var(--ink-500)"}}>
<Icon name={"workflow"} style={{"width":"14px","height":"14px","flexShrink":"0"}} />
Workflow: Draft → Under Review → SEO Review → QC Approved → Scheduled → Published.
</div>

        
</div>

        
</React.Fragment>
)}


        
{Boolean(npTab8) && (
<React.Fragment>

        
<div style={{"textAlign":"center","padding":"28px 0","color":"var(--ink-500)"}}>

          
<Icon name={"bar-chart-3"} style={{"width":"26px","height":"26px","color":"var(--ink-400)"}} />

          
<div style={{"fontSize":"14px","fontWeight":"700","color":"var(--ink-700)","marginTop":"10px"}}>
Analytics start after publish
</div>

          
<div style={{"fontSize":"12.5px","marginTop":"4px","maxWidth":"380px","marginLeft":"auto","marginRight":"auto"}}>
Organic traffic, CTR, average position, conversions and page speed sync automatically from GA4 / GSC once the page is live. Nothing to enter here.
</div>

        
</div>

        
</React.Fragment>
)}


        
{Boolean(npTab9) && (
<React.Fragment>

        
<div style={{"textAlign":"center","padding":"28px 0","color":"var(--ink-500)"}}>

          
<Icon name={"history"} style={{"width":"26px","height":"26px","color":"var(--ink-400)"}} />

          
<div style={{"fontSize":"14px","fontWeight":"700","color":"var(--ink-700)","marginTop":"10px"}}>
Activity is logged automatically
</div>

          
<div style={{"fontSize":"12.5px","marginTop":"4px","maxWidth":"380px","marginLeft":"auto","marginRight":"auto"}}>
Creation, edits, reviews, approvals and publishing are recorded with user and date — starting with “{npOwnerName} · Created draft · {npToday}”.
</div>

        
</div>

        
</React.Fragment>
)}


      
</div>

      
<div style={{"position":"sticky","bottom":"0","background":"var(--paper)","borderTop":"1px solid var(--line-200)","padding":"16px 24px","display":"flex","alignItems":"center","gap":"10px"}}>

        
{Boolean(npNotFirst) && (
<React.Fragment>
<button onClick={npBack} style={{"display":"flex","alignItems":"center","gap":"6px","padding":"11px 16px","border":"1px solid var(--line-300)","background":"var(--paper)","borderRadius":"11px","fontSize":"13.5px","fontWeight":"700","color":"var(--ink-700)","cursor":"pointer"}}>
<Icon name={"arrow-left"} style={{"width":"14px","height":"14px"}} />
Back
</button>
</React.Fragment>
)}

        
<div style={{"flex":"1"}} />

        
<button onClick={closeNewPage} style={{"padding":"11px 18px","border":"1px solid var(--line-300)","background":"var(--paper)","borderRadius":"11px","fontSize":"13.5px","fontWeight":"700","color":"var(--ink-700)","cursor":"pointer"}}>
Cancel
</button>

        
<button onClick={submitNewPageDraft} style={{"padding":"11px 18px","border":"1px solid var(--line-300)","background":"var(--paper)","borderRadius":"11px","fontSize":"13.5px","fontWeight":"700","color":"var(--ink-700)","cursor":"pointer"}}>
Save as draft
</button>

        
{Boolean(npNotLast) && (
<React.Fragment>
<button onClick={npNext} style={{"display":"flex","alignItems":"center","gap":"6px","padding":"11px 20px","border":"1px solid var(--orchid-300)","background":"var(--orchid-100)","color":"var(--orchid-700)","borderRadius":"11px","fontSize":"13.5px","fontWeight":"700","cursor":"pointer"}}>
Next
<Icon name={"arrow-right"} style={{"width":"14px","height":"14px"}} />
</button>
</React.Fragment>
)}

        
<button onClick={submitNewPageCreate} style={{"padding":"11px 22px","border":"none","background":"#7A1C46","color":"#fff","borderRadius":"11px","fontSize":"13.5px","fontWeight":"700","cursor":"pointer","boxShadow":"0 8px 18px -8px rgba(122,28,70,.55)"}}>
Create & submit
</button>

      
</div>

    
</div>

  
</div>


</React.Fragment>
)}
    </React.Fragment>
  );
}
