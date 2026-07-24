import React from 'react';
import Icon from '../../components/Icon.jsx';
import { cssTextToObject } from '../../utils/cssText.js';

export default function AddContentIdeaDrawer({ vm }) {
  const { idf, idfAddDoc, idfAddExt, idfAddImg, idfAddInt, idfAddRef, idfAddStat, idfAttCats, idfAtts, idfAudienceOptions, idfCampaignOptions, idfCancelCustom, idfCatOptions, idfClose, idfClusterOptions, idfCode, idfCustomActive, idfCustomLabel, idfCustomVal, idfEffortOptions, idfExt, idfExtCatOptions, idfGoalOptions, idfHasAtts, idfInt, idfIntPull, idfIntPullOptions, idfIntType, idfIntTypes, idfJourneyOptions, idfMetaDescColor, idfMetaDescLen, idfMetaTitleColor, idfMetaTitleLen, idfNext, idfNotFirst, idfNotLast, idfObjLen, idfOnCustomVal, idfOwnerOptions, idfPillarOptions, idfPrev, idfPubBtns, idfPubIsExternal, idfPubIsInternal, idfReadLevelOptions, idfReasonLen, idfRecLengthOptions, idfRefTypes, idfRefUses, idfRefs, idfSaveCustom, idfSaveDraft, idfSaveSubmit, idfServiceOptions, idfSetAudience, idfSetCampaign, idfSetCategory, idfSetCluster, idfSetCompetitorUrls, idfSetEffort, idfSetExtCat, idfSetExtRefs, idfSetExtUrl, idfSetFeatImg, idfSetGoal, idfSetIntPull, idfSetIntType, idfSetIntUrl, idfSetIntent, idfSetInternalLinks, idfSetJourney, idfSetKeyword, idfSetMetaDesc, idfSetMetaTitle, idfSetMonth, idfSetNotes, idfSetObjective, idfSetOwner, idfSetPillar, idfSetPriority, idfSetReadLevel, idfSetReason, idfSetRecLength, idfSetSecondaryKw, idfSetService, idfSetSlug, idfSetSource, idfSetSubCategory, idfSetTitle, idfSetType, idfSetWcMax, idfSetWcMin, idfSetWorkingTitle, idfSourceOptions, idfStatUses, idfStats, idfStep1, idfStep2, idfStep3, idfSteps, idfSubCatOptions, idfTitleLen, idfTypeOptions, idfWtLen, showIdeaForm, stop } = vm;
  return (
    <React.Fragment>
{Boolean(showIdeaForm) && (
<React.Fragment>

  
<div onClick={idfClose} style={{"position":"fixed","inset":"0","background":"rgba(31,8,20,.5)","backdropFilter":"blur(3px)","zIndex":"165","display":"flex","justifyContent":"flex-end"}}>

    
<div onClick={stop} className="blscroll" style={{"width":"100%","maxWidth":"760px","height":"100%","background":"#fff","boxShadow":"var(--shadow-xl)","overflowY":"auto","animation":"blrise .3s var(--ease-out)"}}>

      
<div style={{"position":"sticky","top":"0","background":"#fff","borderBottom":"1px solid var(--line-200)","padding":"18px 24px","display":"flex","alignItems":"flex-start","justifyContent":"space-between","zIndex":"3"}}>

        
<div>
<div style={{"fontSize":"11px","fontWeight":"700","letterSpacing":".1em","textTransform":"uppercase","color":"var(--orchid-500)"}}>
Content Repository
</div>
<h3 style={{"fontFamily":"'Sora'","fontWeight":"700","fontSize":"20px","color":"var(--beet-700)","margin":"4px 0 0"}}>
Add Content Idea
</h3>
<div style={{"display":"flex","alignItems":"center","gap":"8px","marginTop":"6px"}}>
<span style={{"fontSize":"11px","fontWeight":"700","color":"var(--ink-500)"}}>
Idea ID
</span>
<span style={{"fontFamily":"'Space Mono'","fontSize":"12.5px","fontWeight":"700","color":"var(--beet-700)","background":"var(--surface-50)","border":"1px solid var(--line-300)","borderRadius":"7px","padding":"2px 9px"}}>
{idfCode}
</span>
<span style={{"fontSize":"10.5px","color":"var(--ink-400)"}}>
auto-generated
</span>
</div>
</div>

        
<button onClick={idfClose} style={{"width":"34px","height":"34px","borderRadius":"10px","border":"1px solid var(--line-300)","background":"#fff","cursor":"pointer","display":"flex","alignItems":"center","justifyContent":"center"}}>
<Icon name={"x"} style={{"width":"17px","height":"17px","color":"var(--ink-700)"}} />
</button>

      
</div>

      
<div style={{"padding":"16px 24px 0","display":"flex","gap":"8px","flexWrap":"wrap"}}>

        
{(idfSteps || []).map((s, $index) => (
<React.Fragment key={$index}>
<button onClick={s.go} style={cssTextToObject(s.style)}>
{s.label}
</button>
</React.Fragment>
))}

      
</div>

      
{Boolean(idfCustomActive) && (
<React.Fragment>

        
<div style={{"margin":"14px 24px 0","display":"flex","alignItems":"center","gap":"9px","background":"#fff","border":"1.5px solid var(--orchid-400)","borderRadius":"13px","padding":"11px 14px","boxShadow":"var(--shadow-sm)"}}>

          
<Icon name={"plus-circle"} style={{"width":"16px","height":"16px","color":"var(--orchid-600)","flexShrink":"0"}} />

          
<span style={{"fontSize":"12px","fontWeight":"700","color":"var(--ink-700)","flexShrink":"0","textTransform":"capitalize"}}>
{idfCustomLabel}
</span>

          
<input value={idfCustomVal} onInput={idfOnCustomVal} placeholder="Type the new option…" style={{"flex":"1","padding":"8px 11px","border":"1px solid var(--line-300)","borderRadius":"10px","fontSize":"12.5px","outline":"none"}} />

          
<button onClick={idfSaveCustom} style={{"display":"flex","alignItems":"center","gap":"5px","padding":"8px 13px","border":"none","background":"#7A1C46","color":"#fff","borderRadius":"10px","fontSize":"12px","fontWeight":"700","cursor":"pointer"}}>
<Icon name={"check"} style={{"width":"12px","height":"12px"}} />
Add & select
</button>

          
<button onClick={idfCancelCustom} style={{"padding":"8px 13px","border":"1px solid var(--line-300)","background":"#fff","color":"var(--ink-700)","borderRadius":"10px","fontSize":"12px","fontWeight":"700","cursor":"pointer"}}>
Cancel
</button>

        
</div>

      
</React.Fragment>
)}

      
<div style={{"padding":"18px 24px","display":"flex","flexDirection":"column","gap":"14px"}}>


        
{/* STEP 1 · CONTENT INFORMATION */}

        
{Boolean(idfStep1) && (
<React.Fragment>

          
<div style={{"fontSize":"11.5px","fontWeight":"700","letterSpacing":".08em","textTransform":"uppercase","color":"var(--ink-400)"}}>
1 · Content information
</div>

          
<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Content title 
<span style={{"color":"var(--danger-600)"}}>
*
</span>
</label>
<input value={idf.title} onInput={idfSetTitle} placeholder="Enter a clear, engaging title for the content idea" style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","outline":"none"}} />
<div style={{"fontSize":"10.5px","color":"var(--ink-400)","textAlign":"right","marginTop":"3px"}}>
{idfTitleLen}
</div>
</div>

          
<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Working title (internal)
</label>
<input value={idf.workingTitle} onInput={idfSetWorkingTitle} placeholder="Enter internal working title (optional)" style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","outline":"none"}} />
<div style={{"fontSize":"10.5px","color":"var(--ink-400)","textAlign":"right","marginTop":"3px"}}>
{idfWtLen}
</div>
</div>

          
<div style={{"display":"grid","gridTemplateColumns":"1fr 1fr","gap":"14px"}}>

            
<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Idea source 
<span style={{"color":"var(--danger-600)"}}>
*
</span>
</label>
<select value={idf.source} onChange={idfSetSource} style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","background":"#fff"}}>
{(idfSourceOptions || []).map((o, $index) => (
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
Content type 
<span style={{"color":"var(--danger-600)"}}>
*
</span>
</label>
<select value={idf.type} onChange={idfSetType} style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","background":"#fff"}}>
{(idfTypeOptions || []).map((o, $index) => (
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
Category 
<span style={{"color":"var(--danger-600)"}}>
*
</span>
</label>
<select value={idf.category} onChange={idfSetCategory} style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","background":"#fff"}}>
{(idfCatOptions || []).map((o, $index) => (
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
Sub category
</label>
<select value={idf.subCategory} onChange={idfSetSubCategory} style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","background":"#fff"}}>
{(idfSubCatOptions || []).map((o, $index) => (
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
Service (related)
</label>
<select value={idf.service} onChange={idfSetService} style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","background":"#fff"}}>
{(idfServiceOptions || []).map((o, $index) => (
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
Campaign (optional)
</label>
<select value={idf.campaign} onChange={idfSetCampaign} style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","background":"#fff"}}>
{(idfCampaignOptions || []).map((o, $index) => (
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
Priority 
<span style={{"color":"var(--danger-600)"}}>
*
</span>
</label>
<select value={idf.priority} onChange={idfSetPriority} style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","background":"#fff"}}>
<option>
Critical
</option>
<option>
High
</option>
<option>
Medium
</option>
<option>
Low
</option>
</select>
<div style={{"fontSize":"10.5px","color":"var(--ink-400)","marginTop":"4px"}}>
Set by business impact, search demand & strategy
</div>
</div>

            
<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Owner 
<span style={{"color":"var(--danger-600)"}}>
*
</span>
</label>
<select value={idf.owner} onChange={idfSetOwner} style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","background":"#fff"}}>
{(idfOwnerOptions || []).map((o, $index) => (
<React.Fragment key={$index}>
<option value={o}>
{o}
</option>
</React.Fragment>
))}
</select>
<div style={{"fontSize":"10.5px","color":"var(--ink-400)","marginTop":"4px"}}>
Who will drive this content idea forward
</div>
</div>

            
<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Expected publish month
</label>
<input type="month" value={idf.publishMonth} onInput={idfSetMonth} style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","outline":"none","background":"#fff"}} />
</div>

            
<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Target word count (range)
</label>
<div style={{"display":"flex","alignItems":"center","gap":"8px"}}>
<input value={idf.wcMin} onInput={idfSetWcMin} placeholder="Min — 1,200" style={{"flex":"1","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","outline":"none"}} />
<span style={{"fontSize":"12px","color":"var(--ink-400)"}}>
to
</span>
<input value={idf.wcMax} onInput={idfSetWcMax} placeholder="Max — 1,800" style={{"flex":"1","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","outline":"none"}} />
</div>
</div>

            
<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Recommended length
</label>
<select value={idf.recLength} onChange={idfSetRecLength} style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","background":"#fff"}}>
{(idfRecLengthOptions || []).map((o, $index) => (
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
Reading level
</label>
<select value={idf.readLevel} onChange={idfSetReadLevel} style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","background":"#fff"}}>
{(idfReadLevelOptions || []).map((o, $index) => (
<React.Fragment key={$index}>
<option value={o}>
{o}
</option>
</React.Fragment>
))}
</select>
</div>

          
</div>

          
<div style={{"border":"1px solid var(--line-200)","borderRadius":"14px","padding":"14px 16px","background":"var(--surface-50)"}}>

            
<div style={{"display":"flex","alignItems":"center","gap":"7px","marginBottom":"10px"}}>
<Icon name={"globe"} style={{"width":"14px","height":"14px","color":"var(--info-600)"}} />
<span style={{"fontSize":"11.5px","fontWeight":"700","letterSpacing":".08em","textTransform":"uppercase","color":"var(--info-600)"}}>
Publication destination
</span>
</div>

            
<div style={{"display":"flex","gap":"8px"}}>

              
{(idfPubBtns || []).map((b, $index) => (
<React.Fragment key={$index}>
<button onClick={b.set} style={cssTextToObject(b.style)}>
{b.label}
</button>
</React.Fragment>
))}

            
</div>

            
{Boolean(idfPubIsInternal) && (
<React.Fragment>

              
<div style={{"display":"grid","gridTemplateColumns":"1fr 1fr","gap":"12px","marginTop":"12px"}}>

                
<div>
<label style={{"display":"block","fontSize":"12px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"5px"}}>
Internal page type
</label>
<select value={idfIntType} onChange={idfSetIntType} style={{"width":"100%","padding":"9px 11px","border":"1px solid var(--line-300)","borderRadius":"10px","fontSize":"12.5px","background":"#fff"}}>
<option>
Service page
</option>
<option>
Insights
</option>
</select>
</div>

                
<div>
<label style={{"display":"block","fontSize":"12px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"5px"}}>
Pull from Content repositories
</label>
<select value={idfIntPull} onChange={idfSetIntPull} style={{"width":"100%","padding":"9px 11px","border":"1px solid var(--line-300)","borderRadius":"10px","fontSize":"12.5px","background":"#fff"}}>
{(idfIntPullOptions || []).map((o, $index) => (
<React.Fragment key={$index}>
<option value={o}>
{o}
</option>
</React.Fragment>
))}
</select>
</div>

                
<div style={{"gridColumn":"1 / -1"}}>
<label style={{"display":"block","fontSize":"12px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"5px"}}>
Target page URL (or paste manually)
</label>
<input value={idf.intUrl} onInput={idfSetIntUrl} placeholder="/services/cloud-migration or /insights/…" style={{"width":"100%","padding":"9px 11px","border":"1px solid var(--line-300)","borderRadius":"10px","fontSize":"12.5px","outline":"none","fontFamily":"'Space Mono'"}} />
</div>

              
</div>

            
</React.Fragment>
)}

            
{Boolean(idfPubIsExternal) && (
<React.Fragment>

              
<div style={{"display":"grid","gridTemplateColumns":"1fr 1fr","gap":"12px","marginTop":"12px"}}>

                
<div style={{"gridColumn":"1 / -1"}}>
<label style={{"display":"block","fontSize":"12px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"5px"}}>
External URL (manual)
</label>
<input value={idf.extUrl} onInput={idfSetExtUrl} placeholder="https://industrypublication.com/guest-post-slot" style={{"width":"100%","padding":"9px 11px","border":"1px solid var(--line-300)","borderRadius":"10px","fontSize":"12.5px","outline":"none","fontFamily":"'Space Mono'"}} />
</div>

                
<div style={{"gridColumn":"1 / -1"}}>
<label style={{"display":"block","fontSize":"12px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"5px"}}>
What is this URL? (categorize)
</label>
<select value={idf.extCat} onChange={idfSetExtCat} style={{"width":"100%","padding":"9px 11px","border":"1px solid var(--line-300)","borderRadius":"10px","fontSize":"12.5px","background":"#fff"}}>
{(idfExtCatOptions || []).map((o, $index) => (
<React.Fragment key={$index}>
<option value={o}>
{o}
</option>
</React.Fragment>
))}
</select>
</div>

              
</div>

            
</React.Fragment>
)}

          
</div>

          
<div style={{"background":"var(--orchid-100)","border":"1px solid var(--orchid-200)","borderRadius":"14px","padding":"14px 16px"}}>

            
<div style={{"display":"flex","alignItems":"center","gap":"7px","marginBottom":"10px"}}>
<Icon name={"gauge"} style={{"width":"14px","height":"14px","color":"var(--orchid-700)"}} />
<span style={{"fontSize":"11.5px","fontWeight":"700","letterSpacing":".08em","textTransform":"uppercase","color":"var(--orchid-700)"}}>
Effort plan linkage
</span>
</div>

            
<select value={idf.effortPlan} onChange={idfSetEffort} style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13px","background":"#fff"}}>
{(idfEffortOptions || []).map((o, $index) => (
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
Reason / background 
<span style={{"color":"var(--danger-600)"}}>
*
</span>
</label>
<textarea value={idf.reason} onInput={idfSetReason} rows="2" placeholder="Why is this content idea important? What problem will it solve?" style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","outline":"none","resize":"vertical"}} />
<div style={{"fontSize":"10.5px","color":"var(--ink-400)","textAlign":"right","marginTop":"3px"}}>
{idfReasonLen}
</div>
</div>

          
<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Business objective 
<span style={{"color":"var(--danger-600)"}}>
*
</span>
</label>
<textarea value={idf.objective} onInput={idfSetObjective} rows="2" placeholder="What is the expected outcome of this content?" style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","outline":"none","resize":"vertical"}} />
<div style={{"fontSize":"10.5px","color":"var(--ink-400)","textAlign":"right","marginTop":"3px"}}>
{idfObjLen}
</div>
</div>

          
<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Additional notes (optional)
</label>
<textarea value={idf.notes} onInput={idfSetNotes} rows="2" placeholder="Any other context, references or notes for the planning team" style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","outline":"none","resize":"vertical"}} />
</div>

          
<div style={{"display":"flex","alignItems":"center","gap":"9px","background":"var(--surface-50)","border":"1px solid var(--line-200)","borderRadius":"12px","padding":"11px 14px","fontSize":"12.5px","color":"var(--ink-500)"}}>
<Icon name={"info"} style={{"width":"15px","height":"15px","flexShrink":"0","color":"var(--orchid-600)"}} />
<span>
Once saved, this idea is created in "Idea Captured" status and can be edited anytime before planning.
</span>
</div>

        
</React.Fragment>
)}


        
{/* STEP 2 · SEO & EXECUTION PLANNING */}

        
{Boolean(idfStep2) && (
<React.Fragment>

          
<div style={{"fontSize":"11.5px","fontWeight":"700","letterSpacing":".08em","textTransform":"uppercase","color":"var(--ink-400)"}}>
2 · SEO & planning
</div>

          
<div style={{"display":"grid","gridTemplateColumns":"1fr 1fr","gap":"14px"}}>

            
<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Primary keyword 
<span style={{"color":"var(--danger-600)"}}>
*
</span>
</label>
<input value={idf.keyword} onInput={idfSetKeyword} placeholder="e.g. plant based protein benefits" style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","outline":"none"}} />
</div>

            
<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Search intent 
<span style={{"color":"var(--danger-600)"}}>
*
</span>
</label>
<select value={idf.intent} onChange={idfSetIntent} style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","background":"#fff"}}>
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

          
</div>

          
<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Secondary keywords
</label>
<input value={idf.secondaryKw} onInput={idfSetSecondaryKw} placeholder="comma-separated, max 10 — e.g. benefits of plant protein, plant protein vs whey" style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","outline":"none"}} />
</div>

          
<div style={{"fontSize":"11.5px","fontWeight":"700","letterSpacing":".08em","textTransform":"uppercase","color":"var(--ink-400)","marginTop":"4px"}}>
Topic & content architecture
</div>

          
<div style={{"display":"grid","gridTemplateColumns":"1fr 1fr","gap":"14px"}}>

            
<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Topic cluster
</label>
<select value={idf.cluster} onChange={idfSetCluster} style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","background":"#fff"}}>
{(idfClusterOptions || []).map((o, $index) => (
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
Pillar page
</label>
<select value={idf.pillar} onChange={idfSetPillar} style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","background":"#fff"}}>
{(idfPillarOptions || []).map((o, $index) => (
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
Target audience / persona
</label>
<select value={idf.audience} onChange={idfSetAudience} style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","background":"#fff"}}>
{(idfAudienceOptions || []).map((o, $index) => (
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
Customer journey stage
</label>
<select value={idf.journey} onChange={idfSetJourney} style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","background":"#fff"}}>
{(idfJourneyOptions || []).map((o, $index) => (
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
Content goal
</label>
<select value={idf.goal} onChange={idfSetGoal} style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","background":"#fff"}}>
{(idfGoalOptions || []).map((o, $index) => (
<React.Fragment key={$index}>
<option value={o}>
{o}
</option>
</React.Fragment>
))}
</select>
</div>

          
</div>

          
<div style={{"fontSize":"11.5px","fontWeight":"700","letterSpacing":".08em","textTransform":"uppercase","color":"var(--ink-400)","marginTop":"4px"}}>
SEO metadata (draft)
</div>

          
<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Meta title
</label>
<input value={idf.metaTitle} onInput={idfSetMetaTitle} placeholder="e.g. Benefits of Curcumin Extract: A Complete Guide | Beetloop" style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","outline":"none"}} />
<div style={cssTextToObject(`font-size:10.5px;text-align:right;margin-top:3px;color:${idfMetaTitleColor}`)}>
{idfMetaTitleLen}
</div>
</div>

          
<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Meta description
</label>
<textarea value={idf.metaDesc} onInput={idfSetMetaDesc} rows="2" placeholder="Draft SERP description for this content" style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","outline":"none","resize":"vertical"}} />
<div style={cssTextToObject(`font-size:10.5px;text-align:right;margin-top:3px;color:${idfMetaDescColor}`)}>
{idfMetaDescLen}
</div>
</div>

          
<div style={{"display":"grid","gridTemplateColumns":"1fr 1fr","gap":"14px"}}>

            
<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
URL slug
</label>
<input value={idf.slug} onInput={idfSetSlug} placeholder="e.g. benefits-of-curcumin-extract" style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13px","outline":"none","fontFamily":"'Space Mono'"}} />
</div>

            
<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Featured image suggestion
</label>
<input value={idf.featImg} onInput={idfSetFeatImg} placeholder="e.g. Turmeric powder + capsules, warm clinical styling" style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13.5px","outline":"none"}} />
</div>

          
</div>

          
<div style={{"fontSize":"11.5px","fontWeight":"700","letterSpacing":".08em","textTransform":"uppercase","color":"var(--ink-400)","marginTop":"4px"}}>
Linking & references
</div>

          
<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Internal links to include (min. 3)
</label>
<textarea value={idf.internalLinks} onInput={idfSetInternalLinks} rows="2" placeholder="/plant-protein-vs-whey-protein, /best-plant-protein-powders…" style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"12.5px","outline":"none","resize":"vertical","fontFamily":"'Space Mono'"}} />
</div>

          
<div style={{"display":"grid","gridTemplateColumns":"1fr 1fr","gap":"14px"}}>

            
<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
External references (min. 2)
</label>
<textarea value={idf.extRefs} onInput={idfSetExtRefs} rows="2" placeholder="https://ncbi.nlm.nih.gov/…" style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"12.5px","outline":"none","resize":"vertical","fontFamily":"'Space Mono'"}} />
</div>

            
<div>
<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"var(--ink-700)","marginBottom":"6px"}}>
Competitor URLs (benchmarking)
</label>
<textarea value={idf.competitorUrls} onInput={idfSetCompetitorUrls} rows="2" placeholder="https://healthline.com/…" style={{"width":"100%","padding":"10px 12px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"12.5px","outline":"none","resize":"vertical","fontFamily":"'Space Mono'"}} />
</div>

          
</div>

          
<div style={{"display":"flex","alignItems":"center","gap":"9px","background":"var(--surface-50)","border":"1px solid var(--line-200)","borderRadius":"12px","padding":"11px 14px","fontSize":"12.5px","color":"var(--ink-500)"}}>
<Icon name={"workflow"} style={{"width":"15px","height":"15px","flexShrink":"0","color":"var(--orchid-600)"}} />
<span>
Idea Captured → Submitted for QC → Approved → Moved to Tasks. Approved ideas stay stored here for reuse.
</span>
</div>

        
</React.Fragment>
)}


        
{/* STEP 3 · REFERENCES & RESOURCES */}

        
{Boolean(idfStep3) && (
<React.Fragment>

          
<div style={{"fontSize":"11.5px","fontWeight":"700","letterSpacing":".08em","textTransform":"uppercase","color":"var(--ink-400)"}}>
3 · References & resources
</div>

          
<div style={{"display":"flex","alignItems":"center","gap":"9px","background":"var(--info-100)","border":"1px solid #CBE3EC","borderRadius":"12px","padding":"10px 13px","fontSize":"12.5px","color":"var(--info-600)"}}>
<Icon name={"info"} style={{"width":"15px","height":"15px","flexShrink":"0"}} />
<span>
Ensure all claims are evidence-backed and properly cited using the provided references and data.
</span>
</div>

          
<div>

            
<div style={{"display":"flex","alignItems":"center","justifyContent":"space-between","marginBottom":"4px"}}>
<span style={{"fontSize":"13px","fontWeight":"800","color":"var(--beet-700)"}}>
1. Scientific references
</span>
<button onClick={idfAddRef} style={{"display":"flex","alignItems":"center","gap":"5px","padding":"6px 11px","border":"1px solid var(--line-300)","background":"#fff","color":"var(--ink-700)","borderRadius":"9px","fontSize":"12px","fontWeight":"700","cursor":"pointer"}}>
<Icon name={"plus"} style={{"width":"12px","height":"12px"}} />
Add reference
</button>
</div>

            
<div style={{"fontSize":"11.5px","color":"var(--ink-500)","marginBottom":"9px"}}>
Peer-reviewed studies, clinical trials and scientific papers relevant to this topic.
</div>

            
<div style={{"display":"flex","flexDirection":"column","gap":"8px"}}>

              
{(idfRefs || []).map((r, $index) => (
<React.Fragment key={$index}>

                
<div style={{"background":"var(--surface-50)","border":"1px solid var(--line-200)","borderRadius":"12px","padding":"11px"}}>

                  
<div style={{"display":"flex","gap":"8px","alignItems":"center","marginBottom":"8px"}}>

                    
<input value={r.title} onInput={r.set_title} placeholder="Title — e.g. Curcumin and Its Derivatives: A Review…" style={{"flex":"1","padding":"9px 11px","border":"1px solid var(--line-300)","borderRadius":"10px","fontSize":"12.5px","outline":"none","background":"#fff"}} />

                    
{Boolean(r.canRemove) && (
<React.Fragment>
<button onClick={r.remove} style={{"width":"30px","height":"30px","borderRadius":"9px","border":"1px solid var(--line-300)","background":"#fff","cursor":"pointer","display":"flex","alignItems":"center","justifyContent":"center","flexShrink":"0"}}>
<Icon name={"trash-2"} style={{"width":"13px","height":"13px","color":"var(--ink-500)"}} />
</button>
</React.Fragment>
)}

                  
</div>

                  
<div style={{"display":"grid","gridTemplateColumns":"1.2fr 1fr .5fr","gap":"8px","marginBottom":"8px"}}>

                    
<input value={r.authors} onInput={r.set_authors} placeholder="Authors — e.g. Aggarwal, B.B., Gupta, S.C." style={{"padding":"8px 10px","border":"1px solid var(--line-300)","borderRadius":"9px","fontSize":"12px","outline":"none","background":"#fff"}} />

                    
<input value={r.source} onInput={r.set_source} placeholder="Journal / source" style={{"padding":"8px 10px","border":"1px solid var(--line-300)","borderRadius":"9px","fontSize":"12px","outline":"none","background":"#fff"}} />

                    
<input value={r.year} onInput={r.set_year} placeholder="Year" style={{"padding":"8px 10px","border":"1px solid var(--line-300)","borderRadius":"9px","fontSize":"12px","outline":"none","background":"#fff"}} />

                  
</div>

                  
<div style={{"display":"grid","gridTemplateColumns":"1fr 1fr","gap":"8px"}}>

                    
<select value={r.rtype} onChange={r.set_rtype} style={{"padding":"8px 10px","border":"1px solid var(--line-300)","borderRadius":"9px","fontSize":"12px","background":"#fff"}}>
{(idfRefTypes || []).map((o, $index) => (
<React.Fragment key={$index}>
<option value={o}>
{o}
</option>
</React.Fragment>
))}
</select>

                    
<select value={r.use} onChange={r.set_use} style={{"padding":"8px 10px","border":"1px solid var(--line-300)","borderRadius":"9px","fontSize":"12px","background":"#fff"}}>
{(idfRefUses || []).map((o, $index) => (
<React.Fragment key={$index}>
<option value={o}>
{o}
</option>
</React.Fragment>
))}
</select>

                  
</div>

                
</div>

              
</React.Fragment>
))}

            
</div>

          
</div>

          
<div>

            
<div style={{"display":"flex","alignItems":"center","justifyContent":"space-between","marginBottom":"4px"}}>
<span style={{"fontSize":"13px","fontWeight":"800","color":"var(--beet-700)"}}>
2. Statistics & data
</span>
<button onClick={idfAddStat} style={{"display":"flex","alignItems":"center","gap":"5px","padding":"6px 11px","border":"1px solid var(--line-300)","background":"#fff","color":"var(--ink-700)","borderRadius":"9px","fontSize":"12px","fontWeight":"700","cursor":"pointer"}}>
<Icon name={"plus"} style={{"width":"12px","height":"12px"}} />
Add statistic
</button>
</div>

            
<div style={{"fontSize":"11.5px","color":"var(--ink-500)","marginBottom":"9px"}}>
Key statistics, market data and numerical insights to be included.
</div>

            
<div style={{"display":"flex","flexDirection":"column","gap":"8px"}}>

              
{(idfStats || []).map((s, $index) => (
<React.Fragment key={$index}>

                
<div style={{"background":"var(--surface-50)","border":"1px solid var(--line-200)","borderRadius":"12px","padding":"11px"}}>

                  
<div style={{"display":"flex","gap":"8px","alignItems":"center","marginBottom":"8px"}}>

                    
<input value={s.stat} onInput={s.set_stat} placeholder="Statistic / data point — e.g. Market size valued at USD 1.1B, CAGR 10.2%" style={{"flex":"1","padding":"9px 11px","border":"1px solid var(--line-300)","borderRadius":"10px","fontSize":"12.5px","outline":"none","background":"#fff"}} />

                    
{Boolean(s.canRemove) && (
<React.Fragment>
<button onClick={s.remove} style={{"width":"30px","height":"30px","borderRadius":"9px","border":"1px solid var(--line-300)","background":"#fff","cursor":"pointer","display":"flex","alignItems":"center","justifyContent":"center","flexShrink":"0"}}>
<Icon name={"trash-2"} style={{"width":"13px","height":"13px","color":"var(--ink-500)"}} />
</button>
</React.Fragment>
)}

                  
</div>

                  
<div style={{"display":"grid","gridTemplateColumns":"1fr .4fr .8fr .8fr","gap":"8px"}}>

                    
<input value={s.source} onInput={s.set_source} placeholder="Source — e.g. Grand View Research" style={{"padding":"8px 10px","border":"1px solid var(--line-300)","borderRadius":"9px","fontSize":"12px","outline":"none","background":"#fff"}} />

                    
<input value={s.year} onInput={s.set_year} placeholder="Year" style={{"padding":"8px 10px","border":"1px solid var(--line-300)","borderRadius":"9px","fontSize":"12px","outline":"none","background":"#fff"}} />

                    
<select value={s.use} onChange={s.set_use} style={{"padding":"8px 10px","border":"1px solid var(--line-300)","borderRadius":"9px","fontSize":"12px","background":"#fff"}}>
{(idfStatUses || []).map((o, $index) => (
<React.Fragment key={$index}>
<option value={o}>
{o}
</option>
</React.Fragment>
))}
</select>

                    
<input value={s.citation} onInput={s.set_citation} placeholder="Citation — e.g. GVR, 2023" style={{"padding":"8px 10px","border":"1px solid var(--line-300)","borderRadius":"9px","fontSize":"12px","outline":"none","background":"#fff"}} />

                  
</div>

                
</div>

              
</React.Fragment>
))}

            
</div>

          
</div>

          
<div style={{"display":"grid","gridTemplateColumns":"1fr 1fr","gap":"14px"}}>

            
<div>

              
<div style={{"display":"flex","alignItems":"center","justifyContent":"space-between","marginBottom":"4px"}}>
<span style={{"fontSize":"13px","fontWeight":"800","color":"var(--beet-700)"}}>
3. Trusted external resources
</span>
<button onClick={idfAddExt} style={{"display":"flex","alignItems":"center","gap":"5px","padding":"6px 11px","border":"1px solid var(--line-300)","background":"#fff","color":"var(--ink-700)","borderRadius":"9px","fontSize":"12px","fontWeight":"700","cursor":"pointer"}}>
<Icon name={"plus"} style={{"width":"12px","height":"12px"}} />
Add
</button>
</div>

              
<div style={{"fontSize":"11.5px","color":"var(--ink-500)","marginBottom":"9px"}}>
Authoritative websites, databases and organizations.
</div>

              
<div style={{"display":"flex","flexDirection":"column","gap":"8px"}}>

                
{(idfExt || []).map((x, $index) => (
<React.Fragment key={$index}>

                  
<div style={{"background":"var(--surface-50)","border":"1px solid var(--line-200)","borderRadius":"12px","padding":"10px","display":"flex","flexDirection":"column","gap":"7px"}}>

                    
<div style={{"display":"flex","gap":"7px","alignItems":"center"}}>

                      
<input value={x.name} onInput={x.set_name} placeholder="e.g. National Institutes of Health (NIH)" style={{"flex":"1","padding":"8px 10px","border":"1px solid var(--line-300)","borderRadius":"9px","fontSize":"12px","outline":"none","background":"#fff"}} />

                      
{Boolean(x.canRemove) && (
<React.Fragment>
<button onClick={x.remove} style={{"width":"28px","height":"28px","borderRadius":"8px","border":"1px solid var(--line-300)","background":"#fff","cursor":"pointer","display":"flex","alignItems":"center","justifyContent":"center","flexShrink":"0"}}>
<Icon name={"trash-2"} style={{"width":"12px","height":"12px","color":"var(--ink-500)"}} />
</button>
</React.Fragment>
)}

                    
</div>

                    
<input value={x.url} onInput={x.set_url} placeholder="https://…" style={{"padding":"8px 10px","border":"1px solid var(--line-300)","borderRadius":"9px","fontSize":"11.5px","outline":"none","background":"#fff","fontFamily":"'Space Mono'"}} />

                  
</div>

                
</React.Fragment>
))}

              
</div>

            
</div>

            
<div>

              
<div style={{"display":"flex","alignItems":"center","justifyContent":"space-between","marginBottom":"4px"}}>
<span style={{"fontSize":"13px","fontWeight":"800","color":"var(--beet-700)"}}>
4. Internal resources
</span>
<button onClick={idfAddInt} style={{"display":"flex","alignItems":"center","gap":"5px","padding":"6px 11px","border":"1px solid var(--line-300)","background":"#fff","color":"var(--ink-700)","borderRadius":"9px","fontSize":"12px","fontWeight":"700","cursor":"pointer"}}>
<Icon name={"plus"} style={{"width":"12px","height":"12px"}} />
Add
</button>
</div>

              
<div style={{"fontSize":"11.5px","color":"var(--ink-500)","marginBottom":"9px"}}>
Company data, whitepapers, previous content and templates.
</div>

              
<div style={{"display":"flex","flexDirection":"column","gap":"8px"}}>

                
{(idfInt || []).map((x, $index) => (
<React.Fragment key={$index}>

                  
<div style={{"background":"var(--surface-50)","border":"1px solid var(--line-200)","borderRadius":"12px","padding":"10px","display":"flex","gap":"7px","alignItems":"center"}}>

                    
<input value={x.name} onInput={x.set_name} placeholder="e.g. FRL Whitepaper — Curcumin Applications" style={{"flex":"1","padding":"8px 10px","border":"1px solid var(--line-300)","borderRadius":"9px","fontSize":"12px","outline":"none","background":"#fff"}} />

                    
<select value={x.itype} onChange={x.set_itype} style={{"padding":"8px 10px","border":"1px solid var(--line-300)","borderRadius":"9px","fontSize":"12px","background":"#fff"}}>
{(idfIntTypes || []).map((o, $index) => (
<React.Fragment key={$index}>
<option value={o}>
{o}
</option>
</React.Fragment>
))}
</select>

                    
{Boolean(x.canRemove) && (
<React.Fragment>
<button onClick={x.remove} style={{"width":"28px","height":"28px","borderRadius":"8px","border":"1px solid var(--line-300)","background":"#fff","cursor":"pointer","display":"flex","alignItems":"center","justifyContent":"center","flexShrink":"0"}}>
<Icon name={"trash-2"} style={{"width":"12px","height":"12px","color":"var(--ink-500)"}} />
</button>
</React.Fragment>
)}

                  
</div>

                
</React.Fragment>
))}

              
</div>

            
</div>

          
</div>

          
<div>

            
<div style={{"display":"flex","alignItems":"center","justifyContent":"space-between","marginBottom":"4px"}}>

              
<span style={{"fontSize":"13px","fontWeight":"800","color":"var(--beet-700)"}}>
5. Attachments & images
</span>

              
<div style={{"display":"flex","gap":"6px"}}>

                
<button onClick={idfAddDoc} style={{"display":"flex","alignItems":"center","gap":"5px","padding":"6px 11px","border":"1px solid var(--line-300)","background":"#fff","color":"var(--ink-700)","borderRadius":"9px","fontSize":"12px","fontWeight":"700","cursor":"pointer"}}>
<Icon name={"paperclip"} style={{"width":"12px","height":"12px"}} />
Attach file
</button>

                
<button onClick={idfAddImg} style={{"display":"flex","alignItems":"center","gap":"5px","padding":"6px 11px","border":"1px solid var(--line-300)","background":"#fff","color":"var(--ink-700)","borderRadius":"9px","fontSize":"12px","fontWeight":"700","cursor":"pointer"}}>
<Icon name={"image-plus"} style={{"width":"12px","height":"12px"}} />
Add image
</button>

              
</div>

            
</div>

            
<div style={{"fontSize":"11.5px","color":"var(--ink-500)","marginBottom":"9px"}}>
Briefs, planning documents, research files and images supporting this idea.
</div>

            
{Boolean(idfHasAtts) && (
<React.Fragment>

              
<div style={{"display":"flex","flexDirection":"column","gap":"8px","marginBottom":"9px"}}>

                
{(idfAtts || []).map((a, $index) => (
<React.Fragment key={$index}>

                  
<div style={{"background":"var(--surface-50)","border":"1px solid var(--line-200)","borderRadius":"12px","padding":"10px","display":"flex","gap":"8px","alignItems":"center"}}>

                    
<span style={{"width":"30px","height":"30px","borderRadius":"9px","background":"var(--orchid-100)","display":"flex","alignItems":"center","justifyContent":"center","flexShrink":"0"}}>
<Icon name={a.icon} style={{"width":"14px","height":"14px","color":"var(--orchid-600)"}} />
</span>

                    
<input value={a.name} onInput={a.setName} style={{"width":"200px","padding":"8px 10px","border":"1px solid var(--line-300)","borderRadius":"9px","fontSize":"12px","outline":"none","background":"#fff","fontFamily":"'Space Mono'"}} />

                    
<select value={a.category} onChange={a.setCategory} style={{"padding":"8px 10px","border":"1px solid var(--line-300)","borderRadius":"9px","fontSize":"12px","background":"#fff"}}>
{(idfAttCats || []).map((o, $index) => (
<React.Fragment key={$index}>
<option value={o}>
{o}
</option>
</React.Fragment>
))}
</select>

                    
<input value={a.desc} onInput={a.setDesc} placeholder="Description — what this file contains" style={{"flex":"1","padding":"8px 10px","border":"1px solid var(--line-300)","borderRadius":"9px","fontSize":"12px","outline":"none","background":"#fff"}} />

                    
<button onClick={a.remove} style={{"width":"28px","height":"28px","borderRadius":"8px","border":"1px solid var(--line-300)","background":"#fff","cursor":"pointer","display":"flex","alignItems":"center","justifyContent":"center","flexShrink":"0"}}>
<Icon name={"trash-2"} style={{"width":"12px","height":"12px","color":"var(--ink-500)"}} />
</button>

                  
</div>

                
</React.Fragment>
))}

              
</div>

            
</React.Fragment>
)}

            
<div onClick={idfAddDoc} style={{"border":"1.5px dashed var(--line-300)","borderRadius":"12px","padding":"18px","textAlign":"center","cursor":"pointer"}} style-hover="border-color:var(--orchid-400);background:var(--surface-50)">

              
<Icon name={"upload-cloud"} style={{"width":"22px","height":"22px","color":"var(--orchid-600)"}} />

              
<div style={{"fontSize":"12.5px","fontWeight":"700","color":"var(--orchid-600)","marginTop":"5px"}}>
Drag & drop files here or click to upload
</div>

              
<div style={{"fontSize":"11px","color":"var(--ink-400)","marginTop":"3px"}}>
Supported formats: PDF, DOC, DOCX, XLS, XLSX, PPT, PPTX, JPG, PNG (Max 20 MB per file)
</div>

            
</div>

          
</div>

        
</React.Fragment>
)}

      
</div>

      
<div style={{"position":"sticky","bottom":"0","background":"#fff","padding":"16px 24px","borderTop":"1px solid var(--line-200)","display":"flex","gap":"10px"}}>

        
{Boolean(idfNotFirst) && (
<React.Fragment>
<button onClick={idfPrev} style={{"display":"flex","alignItems":"center","gap":"6px","padding":"10px 16px","border":"1px solid var(--line-300)","background":"#fff","borderRadius":"11px","fontSize":"13.5px","fontWeight":"700","color":"var(--ink-700)","cursor":"pointer"}}>
<Icon name={"arrow-left"} style={{"width":"14px","height":"14px"}} />
Back
</button>
</React.Fragment>
)}

        
<div style={{"flex":"1"}} />

        
<button onClick={idfClose} style={{"padding":"10px 18px","border":"1px solid var(--line-300)","background":"#fff","borderRadius":"11px","fontSize":"13.5px","fontWeight":"700","color":"var(--ink-700)","cursor":"pointer"}}>
Cancel
</button>

        
<button onClick={idfSaveDraft} style={{"padding":"10px 18px","border":"1px solid var(--line-300)","background":"#fff","borderRadius":"11px","fontSize":"13.5px","fontWeight":"700","color":"var(--ink-700)","cursor":"pointer"}}>
Save as draft
</button>

        
{Boolean(idfNotLast) && (
<React.Fragment>
<button onClick={idfNext} style={{"display":"flex","alignItems":"center","gap":"7px","padding":"10px 20px","border":"none","background":"#7A1C46","color":"#fff","borderRadius":"11px","fontSize":"13.5px","fontWeight":"700","cursor":"pointer"}}>
Save & continue
<Icon name={"arrow-right"} style={{"width":"14px","height":"14px"}} />
</button>
</React.Fragment>
)}

        
{Boolean(idfStep3) && (
<React.Fragment>
<button onClick={idfSaveSubmit} style={{"display":"flex","alignItems":"center","gap":"7px","padding":"10px 20px","border":"none","background":"#7A1C46","color":"#fff","borderRadius":"11px","fontSize":"13.5px","fontWeight":"700","cursor":"pointer"}}>
<Icon name={"send"} style={{"width":"15px","height":"15px"}} />
Save & submit to QC
</button>
</React.Fragment>
)}

      
</div>

    
</div>

  
</div>


</React.Fragment>
)}
    </React.Fragment>
  );
}
