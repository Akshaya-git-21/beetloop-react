import React from 'react';
import Icon from '../../components/Icon.jsx';
import { cssTextToObject } from '../../utils/cssText.js';

export default function ContentRepositorySection({ vm }) {
  const { cPg, contentAI, contentBulk, contentEmpty, contentExport, contentImport, contentKpis, contentNew, contentOnQuery, contentOnStatus, contentQuery, contentRepoLabel, contentRepoTabs, contentRows, contentStatusFilter, showContent, contentBrandFilter, contentBrandOptions, contentOnBrand } = vm;
  return (
    <React.Fragment>
{Boolean(showContent) && (
<React.Fragment>

          
<div style={{"display":"flex","flexWrap":"wrap","gap":"8px","marginBottom":"18px"}}>

            
<button onClick={contentNew} style={{"display":"flex","alignItems":"center","gap":"7px","background":"#7A1C46","color":"#fff","border":"none","borderRadius":"11px","padding":"10px 16px","fontSize":"13px","fontWeight":"700","cursor":"pointer","boxShadow":"0 8px 18px -8px rgba(122,28,70,.55)"}}>
<Icon name={"plus"} style={{"width":"15px","height":"15px"}} />
New Page
</button>

            
<button onClick={contentAI} style={{"display":"flex","alignItems":"center","gap":"7px","background":"var(--paper)","color":"var(--orchid-700)","border":"1px solid var(--orchid-200)","borderRadius":"11px","padding":"10px 14px","fontSize":"13px","fontWeight":"700","cursor":"pointer"}}>
<Icon name={"sparkles"} style={{"width":"15px","height":"15px"}} />
AI Content Assistant
</button>

            
<button onClick={contentImport} style={{"display":"flex","alignItems":"center","gap":"7px","background":"var(--paper)","color":"var(--ink-700)","border":"1px solid var(--line-300)","borderRadius":"11px","padding":"10px 14px","fontSize":"13px","fontWeight":"600","cursor":"pointer"}}>
<Icon name={"upload"} style={{"width":"15px","height":"15px"}} />
Import
</button>

            
<button onClick={contentExport} style={{"display":"flex","alignItems":"center","gap":"7px","background":"var(--paper)","color":"var(--ink-700)","border":"1px solid var(--line-300)","borderRadius":"11px","padding":"10px 14px","fontSize":"13px","fontWeight":"600","cursor":"pointer"}}>
<Icon name={"download"} style={{"width":"15px","height":"15px"}} />
Export
</button>

            
<button onClick={contentBulk} style={{"display":"flex","alignItems":"center","gap":"7px","background":"var(--paper)","color":"var(--ink-700)","border":"1px solid var(--line-300)","borderRadius":"11px","padding":"10px 14px","fontSize":"13px","fontWeight":"600","cursor":"pointer"}}>
<Icon name={"layers"} style={{"width":"15px","height":"15px"}} />
Bulk Update
</button>

          
</div>

          
<div style={{"display":"grid","gridTemplateColumns":"repeat(6,1fr)","gap":"12px","marginBottom":"18px"}}>

            
{(contentKpis || []).map((k, $index) => (
<React.Fragment key={$index}>

              
<div style={{"background":"var(--paper)","border":"1px solid var(--line-300)","borderRadius":"16px","boxShadow":"var(--shadow-sm)","padding":"14px 16px"}}>

                
<div style={{"display":"flex","alignItems":"center","gap":"7px","marginBottom":"8px"}}>
<Icon name={k.icon} style={cssTextToObject(`width:14px;height:14px;color:${k.color}`)} />
<span style={{"fontSize":"11.5px","fontWeight":"600","color":"var(--ink-500)"}}>
{k.label}
</span>
</div>

                
<div style={cssTextToObject(`font-family:'Sora';font-weight:800;font-size:23px;color:${k.color}`)}>
{k.value}
</div>

              
</div>

            
</React.Fragment>
))}

          
</div>

          
<div style={{"display":"flex","gap":"18px","alignItems":"flex-start"}}>

            
{/* repo switcher */}


<div style={{"flex":"none","width":"216px","background":"var(--paper)","border":"1px solid var(--line-300)","borderRadius":"16px","boxShadow":"var(--shadow-sm)","padding":"12px"}}>


<div style={{"fontSize":"10px","fontWeight":"700","letterSpacing":".12em","textTransform":"uppercase","color":"var(--ink-400)","padding":"4px 10px 4px"}}>
Brand
</div>


<select value={contentBrandFilter} onChange={contentOnBrand} style={{"width":"100%","padding":"7px 9px","border":"1px solid var(--line-300)","borderRadius":"9px","fontSize":"12.5px","fontWeight":"600","background":"var(--paper)","color":"var(--ink-900)","marginBottom":"12px"}}>
{(contentBrandOptions || []).map((b, $index) => (
<React.Fragment key={$index}>
<option value={b}>
{b==='All'?'All brands':b}
</option>
</React.Fragment>
))}
</select>


<div style={{"fontSize":"10px","fontWeight":"700","letterSpacing":".12em","textTransform":"uppercase","color":"var(--ink-400)","padding":"4px 10px 8px"}}>
Repositories
</div>


{(contentRepoTabs || []).map((r, $index) => (
<React.Fragment key={$index}>

                
<button onClick={r.go} style={cssTextToObject(r.style)}>
<Icon name={r.icon} style={{"width":"16px","height":"16px","flexShrink":"0"}} />
<span style={{"flex":"1"}}>
{r.name}
</span>
<span style={{"fontSize":"11px","fontWeight":"700","color":"var(--ink-400)"}}>
{r.count}
</span>
</button>

              
</React.Fragment>
))}

            
</div>

            
{/* list */}

            
<div style={{"flex":"1","minWidth":"0"}}>

              
<div style={{"display":"flex","alignItems":"center","gap":"10px","marginBottom":"14px","flexWrap":"wrap"}}>

                
<div style={{"position":"relative","flex":"1","minWidth":"220px","maxWidth":"340px"}}>
<Icon name={"search"} style={{"width":"15px","height":"15px","color":"var(--ink-400)","position":"absolute","left":"11px","top":"10px"}} />
<input value={contentQuery} onInput={contentOnQuery} placeholder="Search pages, keywords, topics…" style={{"width":"100%","padding":"9px 12px 9px 34px","border":"1px solid var(--line-300)","borderRadius":"11px","fontSize":"13px","outline":"none","background":"var(--paper)"}} />
</div>

                
<div style={{"display":"flex","alignItems":"center","gap":"7px","background":"var(--paper)","border":"1px solid var(--line-300)","borderRadius":"11px","padding":"6px 10px"}}>
<span style={{"fontSize":"11.5px","fontWeight":"700","color":"var(--ink-500)"}}>
Status
</span>
<select value={contentStatusFilter} onChange={contentOnStatus} style={{"border":"none","background":"none","fontSize":"13px","fontWeight":"600","color":"var(--ink-900)","outline":"none","cursor":"pointer"}}>
<option>
All
</option>
<option>
Published
</option>
<option>
Draft
</option>
<option>
Under Review
</option>
<option>
SEO Review
</option>
<option>
Scheduled
</option>
<option>
Archived
</option>
</select>
</div>

                
<span style={{"fontSize":"12.5px","color":"var(--ink-400)","fontWeight":"600"}}>
{contentRepoLabel}
</span>

              
</div>

              
<div style={{"background":"var(--paper)","border":"1px solid var(--line-300)","borderRadius":"18px","boxShadow":"var(--shadow-sm)","overflow":"hidden"}}>

                
<div style={{"display":"grid","gridTemplateColumns":"2.2fr 1fr 1.1fr .8fr .9fr 40px","gap":"12px","padding":"12px 18px","background":"var(--surface-50)","borderBottom":"1px solid var(--line-200)","fontSize":"10.5px","fontWeight":"700","letterSpacing":".05em","textTransform":"uppercase","color":"var(--ink-500)"}}>

                  
<span>
Page
</span>
<span>
Type
</span>
<span>
Primary keyword
</span>
<span>
SEO
</span>
<span>
Status
</span>
<span />

                
</div>

                
{(contentRows || []).map((p, $index) => (
<React.Fragment key={$index}>

                  
<div>

                    
<div onClick={p.toggle} style={{"display":"grid","gridTemplateColumns":"2.2fr 1fr 1.1fr .8fr .9fr 40px","gap":"12px","padding":"13px 18px","borderBottom":"1px solid var(--line-200)","alignItems":"center","cursor":"pointer"}} style-hover="background:var(--surface-50)">

                      
<div style={cssTextToObject(`display:flex;align-items:center;gap:9px;min-width:0;padding-left:${p.indent}`)}>
{Boolean(p.isChild) && (
<React.Fragment>
<Icon name={"corner-down-right"} style={{"width":"14px","height":"14px","color":"var(--orchid-400)","flexShrink":"0"}} />
</React.Fragment>
)}
<Icon name={p.chevron} style={{"width":"15px","height":"15px","color":"var(--ink-400)","flexShrink":"0"}} />
<div style={{"minWidth":"0"}}>
<div style={{"display":"flex","alignItems":"center","gap":"7px"}}>
<span style={{"fontSize":"13.5px","fontWeight":"700","color":"var(--ink-900)","whiteSpace":"nowrap","overflow":"hidden","textOverflow":"ellipsis"}}>
{p.name}
</span>
{Boolean(p.isNew) && (
<React.Fragment>
<span style={{"fontSize":"9.5px","fontWeight":"800","letterSpacing":".04em","color":"#fff","background":"var(--orchid-500)","borderRadius":"999px","padding":"2px 7px","flexShrink":"0"}}>
NEW
</span>
</React.Fragment>
)}
</div>
<div style={{"fontSize":"11px","color":"var(--ink-400)"}}>
{p.repo} · {p.brand} · {p.industry}
</div>
{Boolean(p.hasLinked) && (
<React.Fragment>
<div style={{"display":"flex","flexWrap":"wrap","gap":"5px","marginTop":"4px"}}>
{(p.linked || []).map((lk, $index) => (
<React.Fragment key={$index}>
<span onClick={lk.open} style={{"display":"inline-flex","alignItems":"center","gap":"5px","fontSize":"10.5px","fontWeight":"700","padding":"2px 8px","borderRadius":"999px","background":"var(--orchid-100)","color":"var(--orchid-700)","cursor":"pointer","border":"1px solid var(--orchid-200)"}}>
<Icon name={lk.icon} style={{"width":"11px","height":"11px"}} />
{lk.name}
</span>
</React.Fragment>
))}
</div>
</React.Fragment>
)}
</div>
</div>

                      
<span style={{"fontSize":"12.5px","color":"var(--ink-500)"}}>
{p.type}
</span>

                      
<span style={{"fontSize":"12.5px","color":"var(--ink-500)","whiteSpace":"nowrap","overflow":"hidden","textOverflow":"ellipsis"}}>
{p.keyword}
</span>

                      
<span style={cssTextToObject(`font-size:13px;font-weight:800;color:${p.seoColor}`)}>
{p.seo}
</span>

                      
<span style={cssTextToObject(`font-size:11px;font-weight:700;padding:4px 10px;border-radius:999px;background:${p.statusBg};color:${p.statusColor};justify-self:start`)}>
{p.status}
</span>

                      
<button onClick={p.open} style={{"justifySelf":"end","width":"30px","height":"30px","borderRadius":"8px","border":"1px solid var(--line-300)","background":"var(--paper)","cursor":"pointer","display":"flex","alignItems":"center","justifyContent":"center"}}>
<Icon name={"panel-right-open"} style={{"width":"15px","height":"15px","color":"var(--ink-500)"}} />
</button>

                    
</div>

                    
{Boolean(p.expanded) && (
<React.Fragment>

                      
<div style={{"padding":"14px 18px 16px 42px","background":"var(--surface-50)","borderBottom":"1px solid var(--line-200)","display":"grid","gridTemplateColumns":"1fr 1fr","gap":"12px 24px"}}>

                        
<div>
<div style={{"fontSize":"10.5px","fontWeight":"700","textTransform":"uppercase","letterSpacing":".04em","color":"var(--ink-400)","marginBottom":"3px"}}>
Meta title
</div>
<div style={{"fontSize":"12.5px","color":"var(--ink-700)"}}>
{p.metaTitle}
</div>
</div>

                        
<div>
<div style={{"fontSize":"10.5px","fontWeight":"700","textTransform":"uppercase","letterSpacing":".04em","color":"var(--ink-400)","marginBottom":"3px"}}>
Meta description
</div>
<div style={{"fontSize":"12.5px","color":"var(--ink-700)"}}>
{p.metaDesc}
</div>
</div>

                        
<div>
<div style={{"fontSize":"10.5px","fontWeight":"700","textTransform":"uppercase","letterSpacing":".04em","color":"var(--ink-400)","marginBottom":"3px"}}>
Owner / reviewer
</div>
<div style={{"fontSize":"12.5px","color":"var(--ink-700)"}}>
{p.owner} · Rev {p.reviewer}
</div>
</div>

                        
<div style={{"display":"flex","gap":"16px"}}>
<div>
<div style={{"fontSize":"10.5px","fontWeight":"700","textTransform":"uppercase","letterSpacing":".04em","color":"var(--ink-400)","marginBottom":"3px"}}>
Related
</div>
<div style={{"fontSize":"12.5px","color":"var(--ink-700)"}}>
{p.relCount} pages
</div>
</div>
<div>
<div style={{"fontSize":"10.5px","fontWeight":"700","textTransform":"uppercase","letterSpacing":".04em","color":"var(--ink-400)","marginBottom":"3px"}}>
Internal links
</div>
<div style={{"fontSize":"12.5px","color":"var(--ink-700)"}}>
{p.linkCount}
</div>
</div>
<div>
<div style={{"fontSize":"10.5px","fontWeight":"700","textTransform":"uppercase","letterSpacing":".04em","color":"var(--ink-400)","marginBottom":"3px"}}>
Updated
</div>
<div style={{"fontSize":"12.5px","color":"var(--ink-700)"}}>
{p.updated}
</div>
</div>
</div>

                        
<div style={{"gridColumn":"1 / -1"}}>
<button onClick={p.open} style={{"display":"inline-flex","alignItems":"center","gap":"7px","background":"var(--paper)","border":"1px solid var(--line-300)","color":"var(--ink-900)","borderRadius":"10px","padding":"8px 14px","fontSize":"12.5px","fontWeight":"700","cursor":"pointer"}}>
<Icon name={"panel-right-open"} style={{"width":"14px","height":"14px"}} />
Open full record
</button>
</div>

                      
</div>

                    
</React.Fragment>
)}

                  
</div>

                
</React.Fragment>
))}

                
{Boolean(cPg.show) && (
<React.Fragment>

                  
<div style={{"display":"flex","alignItems":"center","gap":"10px","padding":"12px 18px","background":"var(--surface-50)"}}>
<span style={{"flex":"1","fontSize":"12px","fontWeight":"600","color":"var(--ink-500)"}}>
{cPg.label}
</span>
<button onClick={cPg.prev} style={cssTextToObject(cPg.prevStyle)}>
<Icon name={"chevron-left"} style={{"width":"14px","height":"14px"}} />
Prev
</button>
<button onClick={cPg.next} style={cssTextToObject(cPg.nextStyle)}>
Next
<Icon name={"chevron-right"} style={{"width":"14px","height":"14px"}} />
</button>
</div>

                
</React.Fragment>
)}

                
{Boolean(contentEmpty) && (
<React.Fragment>

                  
<div style={{"padding":"40px","textAlign":"center","color":"var(--ink-500)"}}>
<Icon name={"search-x"} style={{"width":"24px","height":"24px","color":"var(--ink-400)"}} />
<div style={{"fontSize":"14px","fontWeight":"600","marginTop":"8px"}}>
No pages match.
</div>
</div>

                
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
