import React from 'react';
import Icon from '../../components/Icon.jsx';
import { cssTextToObject } from '../../utils/cssText.js';

export default function IdeasRepositorySection({ vm }) {
  const { ideaBack, ideaFiltersUI, ideaPg, ideaRows, ideaStats, showIdeas } = vm;
  return (
    <React.Fragment>
{Boolean(showIdeas) && (
<React.Fragment>

          
<button onClick={ideaBack} style={{"display":"flex","alignItems":"center","gap":"7px","background":"none","border":"none","color":"var(--ink-500)","fontSize":"13px","fontWeight":"600","marginBottom":"14px","padding":"0","cursor":"pointer"}}>
<Icon name={"arrow-left"} style={{"width":"15px","height":"15px"}} />
All repositories
</button>

          
<div style={{"display":"grid","gridTemplateColumns":"repeat(auto-fit,minmax(160px,1fr))","gap":"12px","marginBottom":"18px"}}>

            
{(ideaStats || []).map((s, $index) => (
<React.Fragment key={$index}>

              
<div style={{"background":"#fff","border":"1px solid var(--line-300)","borderRadius":"16px","boxShadow":"var(--shadow-sm)","padding":"14px 16px"}}>

                
<div style={{"display":"flex","alignItems":"center","gap":"7px","marginBottom":"8px"}}>
<Icon name={s.icon} style={cssTextToObject(`width:14px;height:14px;color:${s.color}`)} />
<span style={{"fontSize":"11.5px","fontWeight":"600","color":"var(--ink-500)"}}>
{s.label}
</span>
</div>

                
<div style={cssTextToObject(`font-family:'Sora';font-weight:800;font-size:24px;color:${s.color}`)}>
{s.value}
</div>

              
</div>

            
</React.Fragment>
))}

          
</div>

          
<div style={{"display":"flex","alignItems":"center","gap":"10px","background":"var(--info-100)","border":"1px solid #CBE3EC","color":"var(--info-600)","padding":"11px 15px","borderRadius":"14px","fontSize":"13px","fontWeight":"600","marginBottom":"16px"}}>
<Icon name={"git-branch"} style={{"width":"16px","height":"16px","flexShrink":"0"}} />
<span>
Flow: idea captured against the effort plan (e.g. 12 blogs/month) → submitted to QC Review → approved → moved to Tasks. Ideas stay stored here for reuse across quarters.
</span>
</div>

          
<div style={{"display":"flex","alignItems":"center","gap":"10px","marginBottom":"14px","flexWrap":"wrap"}}>

            
{(ideaFiltersUI || []).map((f, $index) => (
<React.Fragment key={$index}>

              
<div style={{"display":"flex","alignItems":"center","gap":"7px","background":"#fff","border":"1px solid var(--line-300)","borderRadius":"11px","padding":"6px 10px"}}>
<span style={{"fontSize":"11.5px","fontWeight":"700","color":"var(--ink-500)"}}>
{f.label}
</span>
<select value={f.value} onChange={f.onChange} style={{"border":"none","background":"none","fontSize":"13px","fontWeight":"600","color":"var(--beet-700)","outline":"none","cursor":"pointer"}}>
{(f.options || []).map((o, $index) => (
<React.Fragment key={$index}>
<option value={o}>
{o}
</option>
</React.Fragment>
))}
</select>
</div>

            
</React.Fragment>
))}

          
</div>

          
<div style={{"background":"#fff","border":"1px solid var(--line-300)","borderRadius":"20px","boxShadow":"var(--shadow-sm)","overflow":"hidden"}}>

            
<div style={{"display":"grid","gridTemplateColumns":".6fr 2fr .9fr .8fr .8fr .8fr 1.5fr","gap":"11px","padding":"12px 20px","background":"var(--surface-50)","borderBottom":"1px solid var(--line-200)","fontSize":"11px","fontWeight":"700","letterSpacing":".05em","textTransform":"uppercase","color":"var(--ink-500)"}}>

              
<span>
Idea ID
</span>
<span>
Content idea
</span>
<span>
Effort plan
</span>
<span>
Owner
</span>
<span>
Publish
</span>
<span>
Status
</span>
<span>
Action / QC feedback
</span>

            
</div>

            
{(ideaRows || []).map((i, $index) => (
<React.Fragment key={$index}>

              
<div onClick={i.openIdea} style={{"display":"grid","gridTemplateColumns":".6fr 2fr .9fr .8fr .8fr .8fr 1.5fr","gap":"11px","padding":"13px 20px","borderBottom":"1px solid var(--line-200)","alignItems":"center","cursor":"pointer"}} style-hover="background:var(--surface-50)">

                
<span style={{"fontFamily":"'Space Mono'","fontSize":"11px","fontWeight":"700","color":"var(--beet-700)"}}>
{i.id}
</span>

                
<div style={{"minWidth":"0"}}>

                  
<div style={{"display":"flex","alignItems":"center","gap":"7px"}}>
<span style={cssTextToObject(`width:7px;height:7px;border-radius:99px;background:${i.priDot};flex-shrink:0`)} />
<span style={{"fontSize":"13.5px","fontWeight":"700","color":"var(--ink-900)","whiteSpace":"nowrap","overflow":"hidden","textOverflow":"ellipsis"}}>
{i.title}
</span>
</div>

                  
<div style={{"display":"flex","alignItems":"center","gap":"7px","marginTop":"4px","flexWrap":"wrap"}}>

                    
<span style={{"fontSize":"10.5px","fontWeight":"700","padding":"2px 8px","borderRadius":"999px","background":"var(--orchid-100)","color":"var(--orchid-700)"}}>
{i.type}
</span>

                    
<span style={{"fontSize":"11px","color":"var(--ink-400)"}}>
{i.keyword} · via {i.source}
</span>

                    
{Boolean(i.metaLine) && (
<React.Fragment>
<span style={{"fontSize":"11px","color":"var(--ink-500)","fontWeight":"600"}}>
{i.metaLine}
</span>
</React.Fragment>
)}

                    
{Boolean(i.hasReuse) && (
<React.Fragment>
<span style={{"display":"inline-flex","alignItems":"center","gap":"4px","fontSize":"10.5px","fontWeight":"700","padding":"2px 8px","borderRadius":"999px","background":"var(--warn-100)","color":"var(--warn-600)"}}>
<Icon name={"repeat"} style={{"width":"10px","height":"10px"}} />
{i.reused}
</span>
</React.Fragment>
)}

                    
{Boolean(i.hasTask) && (
<React.Fragment>
<span onClick={i.openTask} style={{"display":"inline-flex","alignItems":"center","gap":"4px","fontSize":"10.5px","fontWeight":"700","padding":"2px 8px","borderRadius":"999px","background":"var(--info-100)","color":"var(--info-600)","cursor":"pointer"}}>
<Icon name={"list-checks"} style={{"width":"10px","height":"10px"}} />
{i.taskId}
</span>
</React.Fragment>
)}

                  
</div>

                
</div>

                
<span style={{"fontSize":"11.5px","fontWeight":"600","color":"var(--ink-700)","whiteSpace":"nowrap","overflow":"hidden","textOverflow":"ellipsis"}}>
{i.effortPlan}
</span>

                
<span style={{"fontSize":"12px","color":"var(--ink-700)"}}>
{i.owner}
</span>

                
<span style={{"fontSize":"12px","color":"var(--ink-500)"}}>
{i.publishMonth}
</span>

                
<span style={cssTextToObject(`font-size:10.5px;font-weight:700;padding:4px 9px;border-radius:999px;background:${i.statusBg};color:${i.statusColor};justify-self:start`)}>
{i.status}
</span>

                
<div style={{"minWidth":"0","display":"flex","alignItems":"center","gap":"7px","flexWrap":"wrap"}}>

                  
{Boolean(i.canSubmit) && (
<React.Fragment>
<button onClick={i.submit} style={{"display":"flex","alignItems":"center","gap":"5px","background":"#7A1C46","color":"#fff","border":"none","borderRadius":"9px","padding":"7px 12px","fontSize":"12px","fontWeight":"700","cursor":"pointer"}}>
<Icon name={"send"} style={{"width":"12px","height":"12px"}} />
Submit to QC
</button>
</React.Fragment>
)}

                  
{Boolean(i.canConvert) && (
<React.Fragment>
<button onClick={i.convert} style={{"display":"flex","alignItems":"center","gap":"5px","background":"var(--verify-500)","color":"#fff","border":"none","borderRadius":"9px","padding":"7px 12px","fontSize":"12px","fontWeight":"700","cursor":"pointer"}}>
<Icon name={"list-checks"} style={{"width":"12px","height":"12px"}} />
Move to Tasks
</button>
</React.Fragment>
)}

                  
<button onClick={i.reuseIdea} style={{"display":"flex","alignItems":"center","gap":"5px","background":"#fff","border":"1px solid var(--line-300)","color":"var(--ink-700)","borderRadius":"9px","padding":"7px 11px","fontSize":"12px","fontWeight":"700","cursor":"pointer"}}>
<Icon name={"repeat"} style={{"width":"12px","height":"12px"}} />
Reuse
</button>

                  
{Boolean(i.hasFb) && (
<React.Fragment>
<span style={{"display":"flex","alignItems":"flex-start","gap":"5px","fontSize":"11px","fontWeight":"600","color":"var(--ink-500)","width":"100%"}}>
<Icon name={"message-square-quote"} style={{"width":"11px","height":"11px","flexShrink":"0","marginTop":"2px"}} />
{i.fb}
</span>
</React.Fragment>
)}

                
</div>

              
</div>

            
</React.Fragment>
))}

            
{Boolean(ideaPg.show) && (
<React.Fragment>

              
<div style={{"display":"flex","alignItems":"center","gap":"10px","padding":"12px 20px","background":"var(--surface-50)"}}>
<span style={{"flex":"1","fontSize":"12px","fontWeight":"600","color":"var(--ink-500)"}}>
{ideaPg.label}
</span>
<button onClick={ideaPg.prev} style={cssTextToObject(ideaPg.prevStyle)}>
<Icon name={"chevron-left"} style={{"width":"14px","height":"14px"}} />
Prev
</button>
<button onClick={ideaPg.next} style={cssTextToObject(ideaPg.nextStyle)}>
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
  );
}
