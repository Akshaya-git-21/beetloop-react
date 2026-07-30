import React from 'react';
import { supabase } from '../utils/supabaseClient.js';

const LoginPage = React.lazy(() => import('../pages/LoginPage.jsx'));
const ActivatePage = React.lazy(() => import('../pages/ActivatePage.jsx'));
const AppShell = React.lazy(() => import('../layouts/AppShell.jsx'));

class AppRoot extends React.Component {
  state = {
    screen: 'login',
    roleKey: 'admin',
    route: 'dashboard',
    authUser: null, authProfile: null, authBusy: false, authReady: false,
    notifications: [], showNotifications: false,
    email: '', password: '', loginError: '',
    newPass: '', confirmPass: '', mfa: true,
    toast: '',
    dbTab: '', dbTeamF: { period:'This month', from:'', to:'', division:'All' }, dbTeamOpen: [],
    umOpen: null, umEdit: false, umDraft: {},
    clFill: {}, clQc: {}, clSubmitted: {}, clEvDraft: {},
    showUserModal: false,
    showMasterRecordEdit: false, mrKey: null, mrIndex: null, mrForm: {},
    masterKey: null, masterRecord: null, masterTab: 0, masterQuery: '',
    okrExpanded: [], showOkrPanel: false, okrRecord: null, okrSection: 'okrA', okrOpen: null,
    okrAdded: [], okrUpd: {}, okrEditId: null,
    okrForm: { title:'', desc:'', owner:'Sarah Johnson', dept:'SEO', brand:'Beetloop', category:'SEO' },
    recordsAdded: [], showRecordModal: false, recordKind: 'projects',
    recordForm: { name:'', type:'', owner:'', status:'On track' },
    recordOverrides: {}, recordEditKey: null, recordIsReal: false,
    cmpFilters: {status:'All',type:'All',dept:'All'}, cmpOpen: null, cmpTab: 'overview',
    cmpNew: false, cmpEditId: null, cmpForm: {}, cmpSection: 'cmpA', cmpEffExpanded: [],
    thOpen: null, thAdded: {}, thNew: [], thForm: null, msgDraft: '', msgFiles: [], msgLink: null,
    tkTab: 'list', trFilters: {group:'assignee',assignee:'All',campaign:'All',period:'All'}, calF: null, calOff: 0,
    showRoleConfirm: false, roleConfirmKey: null, roleConfirmAction: null,
    okrDraftKRs: [ {id:1, weight:'50'}, {id:2, weight:'50'} ], okrKRSeq: 3,
    okrFilters: { dept:'All', status:'All', priority:'All', brand:'All' }, okrSelected: [], okrMenu: null,
    ciOpen: false, ciType: null, ciCtx: null, ciForm: {}, ciAdded: {}, historyOkr: null, kpiActuals: {}, taskDone: {},
    tkUpd: {}, tkAdded: [], tkOpen: null, tkNew: false, tkForm: {}, tkFilter: 'All', tkFilters: {status:'All',priority:'All',assignee:'All'}, tkPage: 0, qcFb: {}, tkComment: '', tkCommentFiles: [],
    ttAdded: [], ttUpd: {}, ttNew: false, ttEditId: null, ttForm: {}, ttFilters: {division:'All',status:'All'}, ttTab: 'task',
    ktAdded: [], ktUpd: {}, ktNew: false, ktEditId: null, ktForm: {},
    otAdded: [], otUpd: {}, otNew: false, otEditId: null, otForm: {}, okrTpl: '',
    ideaAdded: [], ideaUpd: {}, ideaForm: {}, showIdeaForm: false, ideaFilters: {status:'All', quarter:'All'}, ideaOpen: null, qcRef: {}, ideaStep: 1, ideaCmt: {},
    epForm: null, epRows: null, epGenerated: false, epView: 'list', epDivision: 'Content Writer', epPlanId: null, epAdded: [],
    epFilters: {year:'All', period:'All', role:'All'}, epCustomDivs: [], epAddingDiv: false, epNewDiv: '',
    pg: {}, tblQuery: '', qcStatusF: 'All',
    showNewPage: false, npForm: {}, npTab: 0, npLinks: [{anchor:'',target:''}], npMedia: [{name:'',alt:'',type:'Image'}], cAdded: [],
    uf: { first:'', last:'', email:'', mobile:'', dept:'SEO', designation:'', manager:'Priya Nair (Manager)', lead:'Aditi Rao (SEO Lead)', role:'Junior Executive', shiftStart:'09:00', shiftEnd:'18:00', breakMin:'60', days:'5' },
    users: [
      { name:'Aarav Kapoor', sub:'CEO · Leadership', role:'CEO', dept:'Leadership', status:'Active', statusTone:'ok' },
      { name:'Rahul Menon', sub:'COO · Operations', role:'COO', dept:'Operations', status:'Active', statusTone:'ok' },
      { name:'Priya Nair', sub:'Marketing Manager', role:'Manager', dept:'Marketing', status:'Active', statusTone:'ok' },
      { name:'Aditi Rao', sub:'SEO Team Lead', role:'Team Lead', dept:'SEO', status:'Active', statusTone:'ok' },
      { name:'Sameer Iyer', sub:'Senior SEO Executive', role:'Senior Executive', dept:'SEO', status:'Active', statusTone:'ok' },
      { name:'Neha Verma', sub:'Junior SEO Executive', role:'Junior Executive', dept:'SEO', status:'Pending Invitation', statusTone:'warn' },
      { name:'Farhan Ali', sub:'QC Reviewer', role:'QC Reviewer', dept:'Quality', status:'Active', statusTone:'ok' },
    ],
    services: [
      { name:'SEO', sub:'Search engine optimization', subs:'4 sub-services', status:'Active' },
      { name:'Content Writing', sub:'Editorial & long-form', subs:'6 sub-services', status:'Active' },
      { name:'Technical SEO', sub:'Site health & Core Web Vitals', subs:'3 sub-services', status:'Active' },
      { name:'Web Development', sub:'Builds & landing pages', subs:'5 sub-services', status:'Active' },
      { name:'Social Media', sub:'SMM & community', subs:'4 sub-services', status:'Active' },
      { name:'CRO', sub:'Conversion optimization', subs:'2 sub-services', status:'Draft' },
    ],
    qcQueue: [
      { id:1, title:'Blog: "Beetroot bioavailability" — 1,800 words', meta:'Content · Food Research Lab · Submitted by Sameer Iyer', icon:'file-text', status:'Awaiting QC', statusTone:'warn', done:false },
      { id:2, title:'Technical SEO audit — Pubrica', meta:'SEO · Pubrica · Submitted by Neha Verma', icon:'search', status:'Awaiting QC', statusTone:'warn', done:false },
      { id:3, title:'Instagram reel — nutraceutical launch', meta:'Design · PepCreations · Submitted by Design team', icon:'clapperboard', status:'Awaiting QC', statusTone:'warn', done:false },
      { id:4, title:'Landing page build — Statswork', meta:'Web Dev · Statswork · Submitted by Web team', icon:'code', status:'Approved', statusTone:'ok', done:true },
    ],
  };

  ROLES = {
    admin:{ label:'Admin', short:'AD', tag:'Platform Admin', person:'Meera Krishnan', color:'#7A1C46', bucket:'admin' },
    ceo:{ label:'CEO', short:'CEO', tag:'Chief Executive', person:'Aarav Kapoor', color:'#2B0B1B', bucket:'exec' },
    coo:{ label:'COO', short:'COO', tag:'Chief Operating Officer', person:'Rahul Menon', color:'#4E1631', bucket:'ops' },
    manager:{ label:'Manager', short:'MG', tag:'Marketing Manager', person:'Priya Nair', color:'#8E3F6C', bucket:'manager' },
    team_lead:{ label:'Team Lead', short:'TL', tag:'SEO Team Lead', person:'Aditi Rao', color:'#A24E7E', bucket:'lead' },
    senior:{ label:'Senior Executive', short:'SR', tag:'Senior SEO Executive', person:'Sameer Iyer', color:'#3C8BB0', bucket:'senior' },
    junior:{ label:'Junior Executive', short:'JR', tag:'Junior SEO Executive', person:'Neha Verma', color:'#2E9A6C', bucket:'junior' },
    qc:{ label:'QC Reviewer', short:'QC', tag:'Quality Reviewer', person:'Farhan Ali', color:'#D69327', bucket:'qc' },
  };

  ACCESS = {
    dashboard:{ ceo:'All', coo:'All', manager:'Department', team_lead:'Team', senior:'Own', junior:'Own', qc:'QC', admin:'All' },
    campaigns:{ ceo:'Full', coo:'View', manager:'Create / Edit', team_lead:'Assign & monitor', senior:'Assigned only', junior:'Assigned only', qc:'View', admin:'Full' },
    tasks:{ ceo:'Full', coo:'View', manager:'All', team_lead:'Assign / edit', senior:'Update own', junior:'Update own', qc:'QC tasks', admin:'Full' },
    templates:{ ceo:'Full', coo:'View', manager:'Create / Edit', team_lead:'Create / Edit', admin:'Full' },
    files:{ ceo:'Full', coo:'View', manager:'View', team_lead:'View', senior:'Own files', junior:'Own files', qc:'View', admin:'Full' },
    messages:{ ceo:'Full', coo:'Full', manager:'Full', team_lead:'Full', senior:'Own', junior:'Own', qc:'Own', admin:'Full' },
    sop:{ ceo:'Full', coo:'View', manager:'Create / Edit', team_lead:'Create / Edit', senior:'View', junior:'View', qc:'View', admin:'Full' },
    support:{ ceo:'Full', coo:'View', manager:'Team tickets', team_lead:'Team tickets', senior:'Own tickets', junior:'Own tickets', qc:'Own tickets', admin:'Full' },
    effort:{ ceo:'Full', coo:'View', manager:'Create / Edit', team_lead:'Create / Edit', admin:'Full' },
    ideas:{ ceo:'Full', coo:'View', manager:'Create / Edit', team_lead:'Create / Edit', senior:'Create / Edit', junior:'Create / Edit', qc:'View', admin:'Full' },
    qc:{ ceo:'Full', manager:'Review', team_lead:'Team QC', qc:'Full', admin:'Full' },
    okr:{ ceo:'Full', coo:'View', manager:'Create / Edit', team_lead:'View', senior:'View own', junior:'View own', qc:'View', admin:'Full' },
    analytics:{ ceo:'Full', coo:'Operational', manager:'Department', team_lead:'Team', senior:'Own', junior:'Own', qc:'QC', admin:'Full' },
    repositories:{ ceo:'Full', coo:'View', manager:'View', team_lead:'View', senior:'Use assigned', junior:'Use assigned', qc:'View', admin:'Full' },
    content:{ ceo:'Full', coo:'View', manager:'Create / Edit', team_lead:'Manage team', senior:'Assigned only', junior:'Assigned only', qc:'View', admin:'Full' },
    masters:{ admin:'Full', ceo:'Full' },
    users:{ admin:'Full', coo:'Full', ceo:'Full' },
    config:{ ceo:'Full', coo:'View', manager:'View', admin:'Full' },
    profile:{ ceo:'View', coo:'View', manager:'View', team_lead:'View', senior:'View', junior:'View', qc:'View', admin:'View' },
  };

  // CEO/COO/Admin get broad, near-identical access across every module — so
  // assigning one of these roles is a high-impact action that needs an
  // explicit confirmation step before it's applied. Every other role only
  // ever gets its own scoped access per ACCESS above, so no gate is needed.
  HIGH_PRIVILEGE_ROLES = ['ceo','coo','admin'];
  roleAccessSummary(roleKey){
    return Object.keys(this.ACCESS).filter(m=>this.ACCESS[m][roleKey]).map(m=>({
      module:(this.MODMETA[m]&&this.MODMETA[m].label)||m, level:this.ACCESS[m][roleKey],
    }));
  }

  // The name of whoever is actually logged in — real accounts must resolve
  // to their own name/email, never the role bucket's demo persona (e.g. a
  // real "junior" account is not "Neha Verma"). Getting this wrong breaks
  // every self-reference in the app: "my tasks" filtering, "you were
  // assigned" notifications, activity-log authorship, OKR/template
  // ownership, etc. — all of which compare against this value.
  currentPerson(){
    const p = this.state.authProfile;
    if(p) return p.full_name || p.email;
    return this.ROLES[this.state.roleKey].person;
  }
  MODMETA = {
    dashboard:{ label:'Dashboard', icon:'layout-dashboard' },
    campaigns:{ label:'Campaigns', icon:'megaphone' },
    tasks:{ label:'Tasks', icon:'list-checks' },
    templates:{ label:'Templates', icon:'layout-template' },
    files:{ label:'Document Repository', icon:'folder-open' },
    messages:{ label:'Messages', icon:'message-square' },
    sop:{ label:'SOPs', icon:'book-open-check' },
    support:{ label:'Help & Support', icon:'life-buoy' },
    qc:{ label:'QC Review', icon:'shield-check' },
    okr:{ label:'OKR & KPI', icon:'target' },
    effort:{ label:'Effort Planner', icon:'gauge' },
    ideas:{ label:'Content Ideas', icon:'lightbulb' },
    analytics:{ label:'Analytics', icon:'bar-chart-3' },
    repositories:{ label:'Repositories', icon:'database' },
    content:{ label:'Content Repository', icon:'folder-tree' },
    masters:{ label:'Master Data', icon:'boxes' },
    users:{ label:'User Management', icon:'users' },
    config:{ label:'Configuration', icon:'settings-2' },
  };

  EDIT_LEVELS = ['Full','Create / Edit','Assign / edit','Manage team','Assign & monitor','All'];

  componentDidMount(){
    try{ const saved=localStorage.getItem('beetloop_content_pages'); if(saved){ const arr=JSON.parse(saved); if(Array.isArray(arr)&&arr.length) this.setState({ cAdded:arr }); } }catch(e){}
    this._syncStateFromLocation();
    this._syncLocationFromState();

    supabase.auth.getSession().then(({ data:{ session } })=>{
      this.setState({ authReady:true });
      if(session && session.user && this.state.screen!=='activate'){
        this._loadProfile(session.user);
      }
    });
    this._authSub = supabase.auth.onAuthStateChange((event, session)=>{
      if(event==='SIGNED_OUT'){
        this.setState({ authUser:null, authProfile:null });
      }
    }).data.subscription;
  }
  componentWillUnmount(){
    clearTimeout(this._t);
    if(this._authSub) this._authSub.unsubscribe();
    if(this._realtimeChannel) supabase.removeChannel(this._realtimeChannel);
  }

  async doLogout(){
    if(this.state.authUser) await supabase.auth.signOut();
    if(this._realtimeChannel){ supabase.removeChannel(this._realtimeChannel); this._realtimeChannel=null; }
    this.setState({ screen:'login', email:'', password:'', authUser:null, authProfile:null, notifications:[] });
  }

  async _oauthLogin(provider){
    const { error } = await supabase.auth.signInWithOAuth({
      provider, options:{ redirectTo: window.location.origin + '/app/dashboard' },
    });
    if(error) this.flash('Could not start '+provider+' sign-in: '+error.message);
  }

  async _forgotPassword(){
    const em=(this.state.email||'').trim().toLowerCase();
    if(!em){ this.flash('Enter your work email above first, then click "Forgot password?".'); return; }
    const { error } = await supabase.auth.resetPasswordForEmail(em, {
      redirectTo: window.location.origin + '/activate',
    });
    if(error) this.flash('Could not send reset email: '+error.message);
    else this.flash('Password reset link sent to '+em+' (if an account exists).');
  }
  componentDidUpdate(prevProps, prevState){
    if(prevProps.screenParam!==this.props.screenParam || prevProps.routeParam!==this.props.routeParam){
      this._syncStateFromLocation();
    }
    if(prevState.screen!==this.state.screen || prevState.route!==this.state.route){
      this._syncLocationFromState();
    }
  }

  flash(msg){ this.setState({ toast: msg }); clearTimeout(this._t); this._t=setTimeout(()=>this.setState({toast:''}),2400); }

  levelTone(level){
    if(this.EDIT_LEVELS.includes(level)) return { bg:'var(--verify-100)', color:'var(--verify-600)' };
    if(['Own','Update own','View own','Assigned only','Use assigned','QC','QC tasks'].includes(level)) return { bg:'var(--warn-100)', color:'var(--warn-600)' };
    return { bg:'var(--info-100)', color:'var(--info-600)' };
  }

  // User Master (Master Data) mirrors the real Supabase-backed team list —
  // the same data shown in User Management — instead of its own static demo
  // rows, so the two screens never disagree about who's actually a user.
  _userMasterRows(){
    return (this.state.users||[]).map(u=>({
      Employee_ID: u.id ? 'EMP-'+String(u.id).slice(0,6).toUpperCase() : '—',
      Full_Name:u.name, Official_Email:u.email||'—', Mobile:u.mobile||'—',
      Department:u.dept||'—', Designation:u.designation||'—', Team:u.team||'—',
      Reporting_Manager:u.reportingManager||'—', Team_Lead:u.teamLead||'—',
      Office_Location:u.officeLocation||'—', Role:u.role,
      Shift_Start:u.shiftStart||'09:00', Shift_End:u.shiftEnd||'18:00',
      Break_Minutes:String(u.breakMin||60), Working_Days:String(u.days||5),
      Daily_Capacity_Hours:String(this.dailyCapacity(u.name)),
      Weekly_Capacity_Hours:String(this.weeklyCapacity(u.name)),
      Employment_Type:u.employmentType||'Full-time', Joining_Date:u.joiningDate||'—',
      Status:u.status,
    }));
  }
  MASTERS_REG(){
    if(this._masters){ this._masters.user.rows = this._userMasterRows(); return this._masters; }
    const st = (s)=>{ const m={Live:'ok',Active:'ok','On track':'ok',Approved:'ok',Draft:'draft',Deprecated:'danger','Merge Candidate':'warn',Pending:'warn'}; return m[s]||'info'; };
    this._masters = {
      service: {
        label:'Service Master', icon:'layers', group:'Business',
        desc:'Service catalogue with SEO metadata, URL maps and linked keywords.',
        cols:[ {k:'Service_ID',l:'ID',mono:1}, {k:'Service_Name',l:'Service'}, {k:'Page_Status',l:'Status',tag:1}, {k:'Hierarchy_Level',l:'Level'}, {k:'SEO_Score',l:'SEO'}, {k:'Content_Owner',l:'Owner'} ],
        fields:['Service_ID','Service_Name','Slug','Parent_Service_ID','Hierarchy_Level','Breadcrumb_Path','Primary_URL','Page_Status','Title_Tag','Meta_Description','H1','Target_Industries','Target_Countries','Primary_Keywords','SEO_Score','Language_Score','Content_Owner','Tech_Owner','Last_Updated'],
        rows:[
          {Service_ID:'SRV001',Service_Name:'Cloud Migration Services',Slug:'cloud-migration',Parent_Service_ID:'—',Hierarchy_Level:0,Breadcrumb_Path:'Services > Cloud Migration',Primary_URL:'/services/cloud-migration',Page_Status:'Live',Title_Tag:'Enterprise Cloud Migration Services | Beetloop',Meta_Description:'Seamless cloud migration services for enterprises',H1:'Cloud Migration Services',Target_Industries:'Technology, Finance, Healthcare',Target_Countries:'USA, UK, Canada',Primary_Keywords:'cloud migration, enterprise cloud, cloud transformation',SEO_Score:87,Language_Score:92,Content_Owner:'John Doe',Tech_Owner:'Tech Team',Last_Updated:'2024-10-28'},
          {Service_ID:'SRV001-1',Service_Name:'AWS Migration',Slug:'cloud-migration/aws',Parent_Service_ID:'SRV001',Hierarchy_Level:1,Breadcrumb_Path:'Services > Cloud Migration > AWS Migration',Primary_URL:'/services/cloud-migration/aws',Page_Status:'Live',Title_Tag:'AWS Cloud Migration Services | Beetloop',Meta_Description:'Expert AWS migration and optimization services',H1:'AWS Migration Services',Target_Industries:'Technology, Finance',Target_Countries:'USA, UK',Primary_Keywords:'aws migration, aws cloud, migrate to aws',SEO_Score:85,Language_Score:90,Content_Owner:'Jane Smith',Tech_Owner:'Tech Team',Last_Updated:'2024-10-25'},
          {Service_ID:'SRV001-2',Service_Name:'Azure Migration',Slug:'cloud-migration/azure',Parent_Service_ID:'SRV001',Hierarchy_Level:1,Breadcrumb_Path:'Services > Cloud Migration > Azure Migration',Primary_URL:'/services/cloud-migration/azure',Page_Status:'Live',Title_Tag:'Azure Cloud Migration Services | Beetloop',Meta_Description:'Professional Azure migration and modernization',H1:'Azure Migration Services',Target_Industries:'Technology, Enterprise',Target_Countries:'USA, UK, Germany',Primary_Keywords:'azure migration, azure cloud, migrate to azure',SEO_Score:83,Language_Score:88,Content_Owner:'Jane Smith',Tech_Owner:'Tech Team',Last_Updated:'2024-10-26'},
          {Service_ID:'SRV002',Service_Name:'AI Implementation',Slug:'ai-implementation',Parent_Service_ID:'—',Hierarchy_Level:0,Breadcrumb_Path:'Services > AI Implementation',Primary_URL:'/services/ai-implementation',Page_Status:'Live',Title_Tag:'AI Implementation Services | Beetloop',Meta_Description:'End-to-end AI implementation and integration services',H1:'AI Implementation Services',Target_Industries:'Technology, Retail, Manufacturing',Target_Countries:'USA, UK, Singapore',Primary_Keywords:'ai implementation, artificial intelligence, ai integration',SEO_Score:78,Language_Score:85,Content_Owner:'Bob Johnson',Tech_Owner:'Tech Team',Last_Updated:'2024-10-20'},
        ],
        tabs:['Service details','Service URLs','Linked keywords'],
        urls:[
          {Map_ID:'MAP001',URL_Type:'Main',URL:'/services/cloud-migration',Locale:'en-US',Country:'USA',Is_Canonical:'Yes',Status:'Live'},
          {Map_ID:'MAP002',URL_Type:'Main',URL:'/en-uk/services/cloud-migration',Locale:'en-GB',Country:'UK',Is_Canonical:'No',Status:'Live'},
          {Map_ID:'MAP003',URL_Type:'Blog',URL:'/blog/cloud-migration-guide',Locale:'en-US',Country:'USA',Is_Canonical:'No',Status:'Live'},
        ],
        linked:[
          {Keyword:'enterprise cloud migration',Intent:'Commercial',Search_Volume:'2,400',Keyword_Difficulty:68,CPC:'$12.50',Priority:'High'},
          {Keyword:'aws cloud migration',Intent:'Commercial',Search_Volume:'1,800',Keyword_Difficulty:65,CPC:'$10.20',Priority:'High'},
          {Keyword:'cloud migration strategy',Intent:'Informational',Search_Volume:'3,200',Keyword_Difficulty:45,CPC:'$5.80',Priority:'Medium'},
        ],
      },
      keyword: {
        label:'Keyword Master', icon:'key-round', group:'SEO & Content',
        desc:'Tracked keywords with intent, metrics, mapping, usage log and competitor map.',
        cols:[ {k:'Keyword_Code',l:'Code',mono:1}, {k:'Keyword',l:'Keyword'}, {k:'Keyword_Type',l:'Type',tag:1}, {k:'Intent',l:'Intent'}, {k:'Search_Volume',l:'Volume'}, {k:'Status',l:'Status',tag:1} ],
        fields:['Keyword_ID','Keyword_Code','Keyword','Keyword_Type','Parent_Keyword','Keyword_SubCategory','Synonyms','Technical_Terms','Intent','Search_Volume','Keyword_Difficulty','CPC','SERP_Features','Language','Country','Industry_Name','Service_Name','Page_Name','Used_In_Campaign_Flag','Campaign_Usage_Count','Content_Usage_Count','Last_Audited_By','Last_Audited_Date','Status','Notes'],
        rows:[
          {Keyword_ID:'KW001',Keyword_Code:'KW-TECH-00123',Keyword:'enterprise cloud migration',Keyword_Type:'Main',Parent_Keyword:'—',Keyword_SubCategory:'Cloud Services',Synonyms:'enterprise cloud transformation, business cloud migration',Technical_Terms:'lift-and-shift migration, cloud replatforming',Intent:'Commercial',Search_Volume:'8,200',Keyword_Difficulty:68,CPC:'$12.50',SERP_Features:'Featured Snippet, People Also Ask, Video',Language:'en-US',Country:'US',Industry_Name:'Technology',Service_Name:'SEO Services',Page_Name:'Enterprise Cloud Migration Guide',Used_In_Campaign_Flag:'Yes',Campaign_Usage_Count:5,Content_Usage_Count:12,Last_Audited_By:'USR002',Last_Audited_Date:'2024-10-25',Status:'Active',Notes:'High-value keyword for enterprise segment. Focus on content depth.'},
          {Keyword_ID:'KW002',Keyword_Code:'KW-TECH-00124',Keyword:'cloud migration services',Keyword_Type:'Primary',Parent_Keyword:'enterprise cloud migration',Keyword_SubCategory:'Cloud Services',Synonyms:'cloud transition services, cloud relocation services',Technical_Terms:'IaaS migration, PaaS migration, SaaS migration',Intent:'Transactional',Search_Volume:'12,400',Keyword_Difficulty:72,CPC:'$18.75',SERP_Features:'Local Pack, Sitelinks, People Also Ask',Language:'en-US',Country:'US',Industry_Name:'Technology',Service_Name:'SEO Services',Page_Name:'—',Used_In_Campaign_Flag:'Yes',Campaign_Usage_Count:8,Content_Usage_Count:15,Last_Audited_By:'USR002',Last_Audited_Date:'2024-10-28',Status:'Active',Notes:'Strong transactional intent. Priority for paid campaigns.'},
          {Keyword_ID:'KW003',Keyword_Code:'KW-FIN-00045',Keyword:'fintech seo strategies',Keyword_Type:'Long-tail',Parent_Keyword:'—',Keyword_SubCategory:'SEO Strategy',Synonyms:'fintech search optimization, financial technology seo',Technical_Terms:'YMYL content optimization, E-A-T for fintech',Intent:'Informational',Search_Volume:'1,200',Keyword_Difficulty:45,CPC:'$8.20',SERP_Features:'FAQ, People Also Ask',Language:'en-US',Country:'US',Industry_Name:'FinTech',Service_Name:'SEO Services',Page_Name:'FinTech SEO Guide',Used_In_Campaign_Flag:'Yes',Campaign_Usage_Count:3,Content_Usage_Count:7,Last_Audited_By:'USR001',Last_Audited_Date:'2024-10-15',Status:'Active',Notes:'Niche keyword with good opportunity. Create pillar content.'},
          {Keyword_ID:'KW004',Keyword_Code:'KW-TECH-00089',Keyword:'saas content marketing',Keyword_Type:'Secondary',Parent_Keyword:'—',Keyword_SubCategory:'Content Marketing',Synonyms:'software content marketing, saas marketing content',Technical_Terms:'PLG content, freemium content strategy',Intent:'Commercial',Search_Volume:'4,800',Keyword_Difficulty:58,CPC:'$14.30',SERP_Features:'Featured Snippet, Video, Image Pack',Language:'en-US',Country:'US',Industry_Name:'SaaS',Service_Name:'Content Marketing',Page_Name:'Guide to SaaS Content Marketing',Used_In_Campaign_Flag:'No',Campaign_Usage_Count:0,Content_Usage_Count:18,Last_Audited_By:'USR003',Last_Audited_Date:'2024-10-22',Status:'Active',Notes:'High content usage. Consider dedicated campaign.'},
          {Keyword_ID:'KW006',Keyword_Code:'KW-BRND-00012',Keyword:'beetloop marketing services',Keyword_Type:'Branded',Parent_Keyword:'—',Keyword_SubCategory:'Brand',Synonyms:'beetloop seo, beetloop digital marketing',Technical_Terms:'—',Intent:'Navigational',Search_Volume:'320',Keyword_Difficulty:15,CPC:'$2.10',SERP_Features:'Sitelinks, Knowledge Panel',Language:'en-US',Country:'US',Industry_Name:'—',Service_Name:'—',Page_Name:'—',Used_In_Campaign_Flag:'Yes',Campaign_Usage_Count:2,Content_Usage_Count:5,Last_Audited_By:'USR002',Last_Audited_Date:'2024-10-20',Status:'Active',Notes:'Brand protection keyword. Monitor consistently.'},
        ],
        tabs:['Keyword details','Usage log','Competitor map'],
        usage:[
          {Usage_Type:'Campaign',Linked_Name:'Q4 Enterprise SEO Campaign',Used_By_User_Name:'Alice Johnson',Usage_Date:'2024-10-28',Count:3},
          {Usage_Type:'Content',Linked_Name:'Cloud Migration Best Practices Guide',Used_By_User_Name:'Carol Smith',Usage_Date:'2024-10-30',Count:8},
          {Usage_Type:'SEO',Linked_Name:'Cloud Migration Services Page',Used_By_User_Name:'Alice Johnson',Usage_Date:'2024-10-29',Count:5},
          {Usage_Type:'Paid',Linked_Name:'Google Ads — Cloud Services',Used_By_User_Name:'Bob Wilson',Usage_Date:'2024-10-27',Count:2},
        ],
        compmap:[
          {Competitor_Name:'CloudTech Solutions',Competitor_URL:'cloudtech.example.com/migration',Rank_Position:3,Search_Volume:'8,200',Last_Checked:'2024-10-30'},
          {Competitor_Name:'Digital Transform Inc',Competitor_URL:'digitaltransform.example.com/cloud',Rank_Position:7,Search_Volume:'8,200',Last_Checked:'2024-10-30'},
          {Competitor_Name:'Enterprise Cloud Partners',Competitor_URL:'ecp.example.com/migration-services',Rank_Position:5,Search_Volume:'12,400',Last_Checked:'2024-10-30'},
        ],
      },
      user: {
        label:'User Master', icon:'users', group:'Organization & Security',
        desc:'Platform users with department, designation, reporting hierarchy, role and shift capacity — the same records shown in User Management.',
        cols:[ {k:'Employee_ID',l:'Emp ID',mono:1}, {k:'Full_Name',l:'Name'}, {k:'Department',l:'Dept'}, {k:'Role',l:'Role'}, {k:'Shift_Start',l:'Shift'}, {k:'Weekly_Capacity_Hours',l:'Cap h/wk',mono:1}, {k:'Status',l:'Status',tag:1} ],
        fields:['Employee_ID','Full_Name','Official_Email','Mobile','Department','Designation','Team','Reporting_Manager','Team_Lead','Office_Location','Role','Shift_Start','Shift_End','Break_Minutes','Working_Days','Daily_Capacity_Hours','Weekly_Capacity_Hours','Employment_Type','Joining_Date','Status'],
        rows:[], // populated live from this.state.users on every MASTERS_REG() call — see below
      },
      department: {
        label:'Department Master', icon:'building', group:'Organization & Security',
        desc:'Functional departments and their heads.',
        cols:[ {k:'Dept_Code',l:'Code',mono:1}, {k:'Department',l:'Department'}, {k:'Head',l:'Head'}, {k:'Members',l:'Members'}, {k:'Status',l:'Status',tag:1} ],
        fields:['Dept_Code','Department','Head','Members','Cost_Center','Status'],
        rows:[
          {Dept_Code:'DPT-SEO',Department:'SEO',Head:'Priya Nair',Members:12,Cost_Center:'CC-101',Status:'Active'},
          {Dept_Code:'DPT-CNT',Department:'Content',Head:'Karan Shah',Members:9,Cost_Center:'CC-102',Status:'Active'},
          {Dept_Code:'DPT-SMM',Department:'SMM',Head:'Priya Nair',Members:6,Cost_Center:'CC-103',Status:'Active'},
          {Dept_Code:'DPT-WEB',Department:'Web Development',Head:'Rahul Menon',Members:7,Cost_Center:'CC-104',Status:'Active'},
          {Dept_Code:'DPT-DSN',Department:'Design',Head:'Priya Nair',Members:5,Cost_Center:'CC-105',Status:'Active'},
        ],
      },
      role: {
        label:'Role Master', icon:'key-round', group:'Organization & Security',
        desc:'Security roles and their permission scope.',
        cols:[ {k:'Role_Code',l:'Code',mono:1}, {k:'Role',l:'Role'}, {k:'Scope',l:'Scope'}, {k:'Users',l:'Users'}, {k:'Status',l:'Status',tag:1} ],
        fields:['Role_Code','Role','Scope','Users','Can_Edit_Masters','Can_Manage_Users','Status'],
        rows:[
          {Role_Code:'R-CEO',Role:'CEO',Scope:'Company (view all)',Users:1,Can_Edit_Masters:'No',Can_Manage_Users:'No',Status:'Active'},
          {Role_Code:'R-COO',Role:'COO',Scope:'Operations',Users:1,Can_Edit_Masters:'No',Can_Manage_Users:'No',Status:'Active'},
          {Role_Code:'R-MGR',Role:'Manager',Scope:'Department',Users:4,Can_Edit_Masters:'No',Can_Manage_Users:'No',Status:'Active'},
          {Role_Code:'R-TL',Role:'Team Lead',Scope:'Team',Users:6,Can_Edit_Masters:'No',Can_Manage_Users:'No',Status:'Active'},
          {Role_Code:'R-SR',Role:'Senior Executive',Scope:'Own work',Users:14,Can_Edit_Masters:'No',Can_Manage_Users:'No',Status:'Active'},
          {Role_Code:'R-JR',Role:'Junior Executive',Scope:'Assigned only',Users:18,Can_Edit_Masters:'No',Can_Manage_Users:'No',Status:'Active'},
          {Role_Code:'R-QC',Role:'QC Reviewer',Scope:'QC tasks',Users:3,Can_Edit_Masters:'No',Can_Manage_Users:'No',Status:'Active'},
          {Role_Code:'R-ADM',Role:'Admin',Scope:'Full platform',Users:1,Can_Edit_Masters:'Yes',Can_Manage_Users:'Yes',Status:'Active'},
        ],
      },
      client: {
        label:'Client / Website Master', icon:'globe', group:'Business',
        desc:'Brands, domains and industry mapping.',
        cols:[ {k:'Client_Code',l:'Code',mono:1}, {k:'Client',l:'Client'}, {k:'Domain',l:'Domain'}, {k:'Industry',l:'Industry'}, {k:'Country',l:'Country'}, {k:'Status',l:'Status',tag:1} ],
        fields:['Client_Code','Client','Domain','Industry','Country','Primary_Contact','Status'],
        rows:[
          {Client_Code:'CL-001',Client:'Tutors India',Domain:'tutorsindia.com',Industry:'Education',Country:'India',Primary_Contact:'S. Ramesh',Status:'Active'},
          {Client_Code:'CL-002',Client:'Food Research Lab',Domain:'foodresearchlab.com',Industry:'Food',Country:'UK',Primary_Contact:'L. Byrne',Status:'Active'},
          {Client_Code:'CL-003',Client:'Pubrica',Domain:'pubrica.com',Industry:'Healthcare',Country:'India',Primary_Contact:'A. Nair',Status:'Active'},
          {Client_Code:'CL-004',Client:'Statswork',Domain:'statswork.com',Industry:'Education',Country:'UK',Primary_Contact:'M. Rao',Status:'Active'},
          {Client_Code:'CL-005',Client:'PepCreations',Domain:'pepcreations.com',Industry:'Nutraceutical',Country:'India',Primary_Contact:'V. Shah',Status:'Draft'},
        ],
      },
      competitor: {
        label:'Competitor Master', icon:'swords', group:'SEO & Content',
        desc:'Tracked competitors with priority and domain authority.',
        cols:[ {k:'Comp_Code',l:'Code',mono:1}, {k:'Competitor',l:'Competitor'}, {k:'Website',l:'Website'}, {k:'Industry',l:'Industry'}, {k:'Priority',l:'Priority',tag:1}, {k:'Status',l:'Status',tag:1} ],
        fields:['Comp_Code','Competitor','Website','Industry','Country','Domain_Authority','Priority','Status'],
        rows:[
          {Comp_Code:'CMP-001',Competitor:'CloudTech Solutions',Website:'cloudtech.example.com',Industry:'Technology',Country:'USA',Domain_Authority:74,Priority:'High',Status:'Active'},
          {Comp_Code:'CMP-002',Competitor:'Digital Transform Inc',Website:'digitaltransform.example.com',Industry:'Technology',Country:'USA',Domain_Authority:68,Priority:'High',Status:'Active'},
          {Comp_Code:'CMP-003',Competitor:'Enterprise Cloud Partners',Website:'ecp.example.com',Industry:'Technology',Country:'UK',Domain_Authority:61,Priority:'Medium',Status:'Active'},
          {Comp_Code:'CMP-004',Competitor:'SaaS Growth Lab',Website:'saasgrowth.example.com',Industry:'SaaS',Country:'USA',Domain_Authority:55,Priority:'Medium',Status:'Active'},
        ],
      },
      backlink: {
        label:'Backlink Master', icon:'link', group:'SEO & Content',
        desc:'Approved backlink sources with authority and spam score.',
        cols:[ {k:'BL_Code',l:'Code',mono:1}, {k:'Domain',l:'Domain'}, {k:'Domain_Authority',l:'DA'}, {k:'Spam_Score',l:'Spam'}, {k:'Link_Type',l:'Type'}, {k:'Status',l:'Status',tag:1} ],
        fields:['BL_Code','Domain','Domain_Authority','Spam_Score','Link_Type','Category','Status'],
        rows:[
          {BL_Code:'BL-001',Domain:'techcrunch.com',Domain_Authority:93,Spam_Score:'1%',Link_Type:'Editorial',Category:'News',Status:'Active'},
          {BL_Code:'BL-002',Domain:'medium.com',Domain_Authority:95,Spam_Score:'2%',Link_Type:'Guest Post',Category:'Blog',Status:'Active'},
          {BL_Code:'BL-003',Domain:'g2.com',Domain_Authority:91,Spam_Score:'1%',Link_Type:'Listing',Category:'Directory',Status:'Active'},
          {BL_Code:'BL-004',Domain:'randomlinks.info',Domain_Authority:22,Spam_Score:'48%',Link_Type:'Comment',Category:'Forum',Status:'Deprecated'},
        ],
      },
      contentType: {
        label:'Content Type Master', icon:'file-text', group:'SEO & Content',
        desc:'Content formats produced by the content team.',
        cols:[ {k:'CT_Code',l:'Code',mono:1}, {k:'Content_Type',l:'Type'}, {k:'Avg_Word_Count',l:'Avg words'}, {k:'Default_Owner',l:'Owner'}, {k:'Status',l:'Status',tag:1} ],
        fields:['CT_Code','Content_Type','Avg_Word_Count','Default_Owner','QC_Checklist','Status'],
        rows:[
          {CT_Code:'CT-01',Content_Type:'Blog',Avg_Word_Count:1500,Default_Owner:'Karan Shah',QC_Checklist:'Content Audit',Status:'Active'},
          {CT_Code:'CT-02',Content_Type:'Landing Page',Avg_Word_Count:800,Default_Owner:'Karan Shah',QC_Checklist:'Content Audit',Status:'Active'},
          {CT_Code:'CT-03',Content_Type:'Case Study',Avg_Word_Count:2000,Default_Owner:'Karan Shah',QC_Checklist:'Content Audit',Status:'Active'},
          {CT_Code:'CT-04',Content_Type:'Whitepaper',Avg_Word_Count:3500,Default_Owner:'Karan Shah',QC_Checklist:'Content Audit',Status:'Active'},
        ],
      },
      platform: {
        label:'Platform Master', icon:'share-2', group:'Marketing & Quality',
        desc:'Social platforms managed by the SMM team.',
        cols:[ {k:'PF_Code',l:'Code',mono:1}, {k:'Platform',l:'Platform'}, {k:'Primary_Format',l:'Format'}, {k:'Handle',l:'Handle'}, {k:'Status',l:'Status',tag:1} ],
        fields:['PF_Code','Platform','Primary_Format','Handle','Post_Frequency','Status'],
        rows:[
          {PF_Code:'PF-01',Platform:'LinkedIn',Primary_Format:'Article / Post',Handle:'@beetloop',Post_Frequency:'3x / week',Status:'Active'},
          {PF_Code:'PF-02',Platform:'Instagram',Primary_Format:'Reel / Story',Handle:'@beetloop',Post_Frequency:'5x / week',Status:'Active'},
          {PF_Code:'PF-03',Platform:'YouTube',Primary_Format:'Video',Handle:'@beetloop',Post_Frequency:'1x / week',Status:'Active'},
          {PF_Code:'PF-04',Platform:'X',Primary_Format:'Post',Handle:'@beetloop',Post_Frequency:'Daily',Status:'Active'},
        ],
      },
      industry: {
        label:'Industry Master', icon:'factory', group:'Marketing & Quality',
        desc:'Industry verticals for targeting and mapping.',
        cols:[ {k:'Ind_Code',l:'Code',mono:1}, {k:'Industry',l:'Industry'}, {k:'Clients',l:'Clients'}, {k:'Status',l:'Status',tag:1} ],
        fields:['Ind_Code','Industry','Clients','Parent_Vertical','Status'],
        rows:[
          {Ind_Code:'IND-01',Industry:'Education',Clients:2,Parent_Vertical:'Services',Status:'Active'},
          {Ind_Code:'IND-02',Industry:'Food',Clients:1,Parent_Vertical:'Consumer',Status:'Active'},
          {Ind_Code:'IND-03',Industry:'Nutraceutical',Clients:1,Parent_Vertical:'Health',Status:'Active'},
          {Ind_Code:'IND-04',Industry:'Healthcare',Clients:1,Parent_Vertical:'Health',Status:'Active'},
        ],
      },
      qcChecklist: {
        label:'QC Checklist Master', icon:'clipboard-check', group:'Marketing & Quality',
        desc:'Reusable QC checklists applied during review.',
        cols:[ {k:'QC_Code',l:'Code',mono:1}, {k:'Checklist',l:'Checklist'}, {k:'Items',l:'Items'}, {k:'Applies_To',l:'Applies to'}, {k:'Status',l:'Status',tag:1} ],
        fields:['QC_Code','Checklist','Items','Applies_To','Severity_Default','Status'],
        rows:[
          {QC_Code:'QC-01',Checklist:'Content Audit',Items:18,Applies_To:'Blog, Landing Page',Severity_Default:'Medium',Status:'Active'},
          {QC_Code:'QC-02',Checklist:'SEO Audit',Items:24,Applies_To:'On-page, Technical',Severity_Default:'High',Status:'Active'},
          {QC_Code:'QC-03',Checklist:'Website Audit',Items:31,Applies_To:'Web builds',Severity_Default:'High',Status:'Active'},
          {QC_Code:'QC-04',Checklist:'SMM Audit',Items:12,Applies_To:'Reels, Posts',Severity_Default:'Low',Status:'Active'},
        ],
      },
      kpi: {
        label:'KPI Master', icon:'target', group:'Marketing & Quality',
        desc:'KPI definitions, units and target directions.',
        cols:[ {k:'KPI_Code',l:'Code',mono:1}, {k:'KPI',l:'KPI'}, {k:'Unit',l:'Unit'}, {k:'Direction',l:'Direction'}, {k:'Department',l:'Dept'}, {k:'Status',l:'Status',tag:1} ],
        fields:['KPI_Code','KPI','Unit','Direction','Department','Frequency','Target_Default','Status'],
        rows:[
          {KPI_Code:'KPI-01',KPI:'Organic Traffic',Unit:'visitors/mo',Direction:'Higher is better',Department:'SEO',Frequency:'Monthly',Target_Default:'100,000',Status:'Active'},
          {KPI_Code:'KPI-02',KPI:'Keywords in Top 10',Unit:'keywords',Direction:'Higher is better',Department:'SEO',Frequency:'Weekly',Target_Default:'50',Status:'Active'},
          {KPI_Code:'KPI-03',KPI:'Content Published',Unit:'articles',Direction:'Higher is better',Department:'Content',Frequency:'Weekly',Target_Default:'30',Status:'Active'},
          {KPI_Code:'KPI-04',KPI:'Page Load Time',Unit:'seconds',Direction:'Lower is better',Department:'Web Development',Frequency:'Weekly',Target_Default:'2.0',Status:'Active'},
        ],
      },
    };
    // attach status-tone helper on registry
    this._masters._st = st;
    this._masters.user.rows = this._userMasterRows();
    return this._masters;
  }

  humanize(k){ return String(k).replace(/_/g,' ').replace(/\b\w/g,c=>c.toUpperCase()).replace(/\bId\b/,'ID').replace(/\bUrl\b/,'URL').replace(/\bCpc\b/,'CPC').replace(/\bSeo\b/,'SEO').replace(/\bQc\b/,'QC').replace(/\bKpi\b/,'KPI').replace(/\bH1\b/,'H1').replace(/\bSerp\b/,'SERP'); }

  // Field-level master-to-master relationships: a field on one master that
  // actually points at a record in another master (or at Users), so editing
  // it should be a picker over the real related records instead of free text.
  // Scoped per master key (not just field name) — e.g. Role Master's own
  // "Role" field is the thing itself and must stay free text, while User
  // Master's "Role" field is a genuine reference into Role Master. Keying
  // only by field name would make a master's identity field a picker over
  // itself, blocking new entries entirely.
  MASTER_FIELD_RELATIONS = {
    service: {
      Parent_Service_ID:{ toMaster:'service', valueField:'Service_ID', labelField:'Service_Name', none:'—' },
      Content_Owner:{ toUsers:true }, Tech_Owner:{ toUsers:true },
    },
    keyword: {
      Parent_Keyword:{ toMaster:'keyword', valueField:'Keyword', labelField:'Keyword', none:'—' },
      Industry_Name:{ toMaster:'industry', valueField:'Industry', labelField:'Industry' },
      Service_Name:{ toMaster:'service', valueField:'Service_Name', labelField:'Service_Name' },
    },
    user: {
      Department:{ toMaster:'department', valueField:'Department', labelField:'Department' },
      Reporting_Manager:{ toUsers:true }, Team_Lead:{ toUsers:true },
      Role:{ toMaster:'role', valueField:'Role', labelField:'Role' },
    },
    department: { Head:{ toUsers:true } },
    client: { Industry:{ toMaster:'industry', valueField:'Industry', labelField:'Industry' } },
    competitor: { Industry:{ toMaster:'industry', valueField:'Industry', labelField:'Industry' } },
    contentType: {
      Default_Owner:{ toUsers:true },
      QC_Checklist:{ toMaster:'qcChecklist', valueField:'Checklist', labelField:'Checklist' },
    },
    kpi: { Department:{ toMaster:'department', valueField:'Department', labelField:'Department' } },
  };
  // Returns null for a plain text/number field, or an array of {value,label}
  // options when the field is a relation into another master or Users.
  masterFieldOptions(masterKey, fieldKey){
    const rel = this.MASTER_FIELD_RELATIONS[masterKey] && this.MASTER_FIELD_RELATIONS[masterKey][fieldKey];
    if(!rel) return null;
    if(rel.toUsers) return (this.state.users||[]).map(u=>({ value:u.name, label:u.name }));
    const reg = this.MASTERS_REG();
    const target = reg[rel.toMaster];
    if(!target) return null;
    const opts = target.rows.map(r=>({ value:r[rel.valueField], label:r[rel.labelField]+(rel.labelField!==rel.valueField?' ('+r[rel.valueField]+')':'') }));
    return rel.none!=null ? [{ value:rel.none, label:rel.none }].concat(opts) : opts;
  }

  // ============ Campaigns (redesigned — replaces the old Projects module) ============
  // Campaign → linked KPIs → effort lines → tasks: a campaign sets the goal and
  // audience, its KPIs become measurable targets, effort lines set the output
  // volume, and the Effort Planner generates the assignable tasks.
  CAMPAIGNS_SEED(){
    if(this._campaigns) return this._campaigns;
    this._campaigns = [
      { id:'CMP-101', name:'Q3 SEO push — Pubrica', type:'SEO Campaign', status:'Live', brand:'Pubrica', dept:'SEO', objective:'Lead Generation', cycle:'Q3 2026',
        start:'Jul 1, 2026', end:'Sep 30, 2026', owner:'Aditi Rao', budget:'₹6,00,000', spend:'₹3,40,000',
        goal:'Grow organic, non-branded traffic to service pages and convert visits into qualified demo requests.',
        countries:'India, USA, UK', industries:'Healthcare, Life Sciences', audience:'Research heads, publication managers', persona:'Director of Research Operations', companySize:'50–500 employees',
        kpis:[
          { kpi:'Organic Sessions', target:'100000', current:'68000', unit:'visitors', okrCode:'OKR-SEO-Q1-001', okrTitle:'Increase Organic Traffic by 50%', pages:[{kind:'Internal',url:'/services/cloud-migration',title:'Cloud Migration Services',contrib:'+18,000 sessions'}] },
          { kpi:'Keywords in Top 10', target:'50', current:'34', unit:'keywords', okrCode:'OKR-SEO-Q1-001', okrTitle:'Increase Organic Traffic by 50%', pages:[] },
        ],
        efforts:[
          { name:'On-page SEO — Content Writer', qty:'12', unit:'pages', cadence:'12 /month', division:'Content Writer', owner:'Karan Shah', kpi:'Organic Sessions', tasks:'12', tasksDone:'8', mode:'direct', driverKpi:'Organic Sessions', perUnit:'450', conv:'6' },
          { name:'Backlink outreach — SEO', qty:'20', unit:'links', cadence:'20 /month', division:'SEO', owner:'Aditi Rao', kpi:'Keywords in Top 10', tasks:'20', tasksDone:'11', mode:'enabler', driverKpi:'Domain Authority', gate:'65', gateCurrent:'62', gateMet:false },
        ],
        team:[{who:'Aditi Rao',role:'Campaign Owner'},{who:'Sameer Iyer',role:'SEO Executive'},{who:'Karan Shah',role:'Content Lead'}],
        taskCount:32, taskDone:19, outcomeKpi:'Organic Sessions', outcomeUnit:'visitors', outcomeTarget:100000, outcomeCurrent:68000,
      },
      { id:'CMP-102', name:'Reel series — Statswork', type:'SMM Campaign', status:'Live', brand:'Statswork', dept:'SMM', objective:'Brand Awareness', cycle:'Q3 2026',
        start:'Jul 15, 2026', end:'Sep 15, 2026', owner:'Priya Nair', budget:'₹2,50,000', spend:'₹1,10,000',
        goal:'Build short-form video presence across Instagram and LinkedIn to lift brand recall among academic researchers.',
        countries:'India, UK, Australia', industries:'Education, Research', audience:'PhD scholars, research students', persona:'Research Scholar', companySize:'N/A — individual researchers',
        kpis:[ { kpi:'Social Impressions', target:'500000', current:'180000', unit:'impressions', okrCode:'OKR-SMM-Q1-004', okrTitle:'Grow Social Engagement 3×', pages:[] } ],
        efforts:[ { name:'Reel production — Graphics', qty:'16', unit:'reels', cadence:'16 /month', division:'Graphics', owner:'Neha Verma', kpi:'Social Impressions', tasks:'16', tasksDone:'9', mode:'direct', driverKpi:'Social Impressions', perUnit:'8500', conv:'100' } ],
        team:[{who:'Priya Nair',role:'Campaign Owner'},{who:'Neha Verma',role:'Design Executive'}],
        taskCount:16, taskDone:9, outcomeKpi:'Social Impressions', outcomeUnit:'impressions', outcomeTarget:500000, outcomeCurrent:180000,
      },
      { id:'CMP-103', name:'Whitepaper funnel — FRL', type:'Content Campaign', status:'Draft', brand:'Food Research Lab', dept:'Content', objective:'Lead Generation', cycle:'Q4 2026',
        start:'Oct 1, 2026', end:'Dec 31, 2026', owner:'Karan Shah', budget:'₹3,20,000', spend:'₹0',
        goal:'Publish a gated whitepaper on food-safety compliance and drive qualified downloads via organic and email.',
        countries:'UK, EU', industries:'Food & Beverage', audience:'Compliance managers, QA heads', persona:'Head of Quality Assurance', companySize:'200–2000 employees',
        kpis:[ { kpi:'Content Published', target:'30', current:'13', unit:'articles', okrCode:'OKR-CNT-Q1-002', okrTitle:'Launch 30 High-Quality Content Pieces', pages:[] } ],
        efforts:[ { name:'Whitepaper drafting — Content Writer', qty:'1', unit:'whitepaper', cadence:'1 /quarter', division:'Content Writer', owner:'Karan Shah', kpi:'Content Published', tasks:'6', tasksDone:'2', mode:'direct', driverKpi:'Content Published', perUnit:'1', conv:'100' } ],
        team:[{who:'Karan Shah',role:'Campaign Owner'}],
        taskCount:6, taskDone:2, outcomeKpi:'Content Published', outcomeUnit:'articles', outcomeTarget:30, outcomeCurrent:13,
      },
      { id:'CMP-104', name:'Backlink outreach — Tutors', type:'SEO Campaign', status:'Scheduled', brand:'Tutors India', dept:'SEO', objective:'Domain Authority', cycle:'Q4 2026',
        start:'Oct 15, 2026', end:'Nov 30, 2026', owner:'Sameer Iyer', budget:'₹1,80,000', spend:'₹0',
        goal:'Secure high-authority editorial backlinks to lift domain rating ahead of the Q1 local-SEO push.',
        countries:'India', industries:'Education', audience:'Local students, parents', persona:'Parent researching tutoring services', companySize:'N/A',
        kpis:[ { kpi:'Referring Domains', target:'200', current:'135', unit:'backlinks', okrCode:'OKR-SEO-Q1-001', okrTitle:'Increase Organic Traffic by 50%', pages:[] } ],
        efforts:[ { name:'Outreach — SEO', qty:'15', unit:'links', cadence:'15 /month', division:'SEO', owner:'Sameer Iyer', kpi:'Referring Domains', tasks:'15', tasksDone:'0', mode:'direct', driverKpi:'Referring Domains', perUnit:'1', conv:'100' } ],
        team:[{who:'Sameer Iyer',role:'Campaign Owner'}],
        taskCount:15, taskDone:0, outcomeKpi:'Referring Domains', outcomeUnit:'backlinks', outcomeTarget:200, outcomeCurrent:135,
      },
    ];
    return this._campaigns;
  }
  allCampaigns(){ return this.CAMPAIGNS_SEED(); }
  cmpNum(v){ if(v==null||v==='') return 0; const n=parseFloat(String(v).replace(/,/g,'')); return isNaN(n)?0:n; }
  cmpProgress(c){
    const rows=(c.kpis||[]).map(k=>{ const t=this.cmpNum(k.target); return t?Math.min(100,Math.round(this.cmpNum(k.current)/t*100)):0; });
    return rows.length?Math.round(rows.reduce((s,x)=>s+x,0)/rows.length):0;
  }
  cmpKpiPool(){
    const okrs = this.OKR_DATA();
    const out=[];
    okrs.forEach(o=>(o.krs||[]).forEach(k=>{
      out.push({ key:o.code+'::'+k.kpi, kpi:k.kpi, unit:k.unit, target:k.target, current:k.current, okrId:o.id, okrCode:o.code, okrTitle:o.title, freq:k.freq });
    }));
    return out;
  }
  cmpEffortPool(){
    const kpiPool=this.cmpKpiPool();
    const out=[];
    this.allEpPlans().forEach(p=>{
      (p.rows||[]).forEach(r=>{
        const k=kpiPool.find(x=>x.kpi&&r.kpiId&&this.epKpiPool().some(e=>e.id===r.kpiId&&e.kpi===x.kpi));
        const kpiName=k?k.kpi:((this.epKpiPool().find(e=>e.id===r.kpiId)||{}).kpi||'');
        const tasks=this.allTasks().filter(t=>t.template===r.type||t.name===r.type);
        out.push({ key:p.id+' :: '+r.type,
          name:r.type, planId:p.id, planName:p.name, division:p.division, dept:p.dept, owner:p.owner,
          qty:String(r.monthly), unit:r.unit, cadence:Math.round(r.monthly/(r.days||1))+' /day · '+r.monthly+' /'+(p.type==='Monthly'?'month':'cycle'),
          kpiId:r.kpiId||'', kpi:kpiName, tasks:String(r.days||r.monthly), tasksDone:String(tasks.filter(t=>['Approved','Closed'].includes(t.status)).length),
          label:r.type+' — '+p.division+' · '+r.monthly+' '+r.unit+(kpiName?(' → '+kpiName):' (effort only)')+' · '+p.id });
      });
    });
    return out;
  }
  cmpOutcomeModel(c){
    const n=(v)=>this.cmpNum(v);
    const fmt=(v)=>Math.round(v).toLocaleString('en-IN');
    const target=n(c.outcomeTarget), current=n(c.outcomeCurrent);
    const rows=(c.efforts||[]).map(e=>{
      const qty=n(e.qty), tasks=n(e.tasks)||qty, done=n(e.tasksDone);
      const taskPct=tasks?Math.round(done/tasks*100):0;
      if(e.mode==='enabler'){
        return { ...e, isEnabler:true, isDirect:false,
          chain:qty+' '+e.unit+' → '+e.driverKpi+' '+e.gate,
          projected:'—', projectedNum:0, delivered:'—',
          gateLabel:(e.gateMet?'Met':'Not met')+' · now '+e.gateCurrent+' (needs '+e.gate+')',
          gateBg:e.gateMet?'var(--verify-100)':'var(--warn-100)', gateColor:e.gateMet?'var(--verify-600)':'var(--warn-600)',
          tasksLabel:done+' / '+tasks+' tasks', taskPctW:taskPct+'%', taskPct:taskPct+'%',
          taskColor:taskPct>=70?'var(--verify-500)':taskPct>=40?'var(--warn-500)':'var(--danger-500)',
          note:'Quality gate — unlocks the direct lines above; contributes no '+c.outcomeUnit+' on its own.' };
      }
      const perUnit=n(e.perUnit), conv=n(e.conv);
      const reach=qty*perUnit, projected=reach*(conv/100), delivered=(done/(tasks||1))*projected;
      return { ...e, isEnabler:false, isDirect:true,
        chain:qty+' '+e.unit+' × '+fmt(perUnit)+' '+(e.driverKpi||'').toLowerCase().replace(/ per .*/,'')+' × '+e.conv+'% = '+fmt(projected)+' '+c.outcomeUnit,
        reach:fmt(reach), projected:fmt(projected)+' '+c.outcomeUnit, projectedNum:projected,
        delivered:fmt(delivered)+' '+c.outcomeUnit,
        tasksLabel:done+' / '+tasks+' tasks', taskPctW:taskPct+'%', taskPct:taskPct+'%',
        taskColor:taskPct>=70?'var(--verify-500)':taskPct>=40?'var(--warn-500)':'var(--danger-500)',
        note:e.division+' · '+e.owner+' — '+tasks+' tasks generated from this effort target.' };
    });
    const planned=rows.reduce((s,r)=>s+r.projectedNum,0);
    const gap=planned-target;
    const gapOk=gap>=0;
    const blockers=rows.filter(r=>r.isEnabler&&!r.gateMet);
    return { rows, target, current,
      outcomeKpi:c.outcomeKpi||'Outcome', outcomeUnit:c.outcomeUnit||'',
      targetLabel:fmt(target)+' '+(c.outcomeUnit||''),
      currentLabel:fmt(current)+' '+(c.outcomeUnit||''),
      plannedLabel:fmt(planned)+' '+(c.outcomeUnit||''),
      currentPctW:Math.min(100,Math.round(current/(target||1)*100))+'%',
      plannedPctW:Math.min(100,Math.round(planned/(target||1)*100))+'%',
      gapLabel:(gapOk?'Plan covers target with +':'Plan short by ')+fmt(Math.abs(gap))+' '+(c.outcomeUnit||''),
      gapBg:gapOk?'var(--verify-100)':'var(--danger-100, #F7E3E6)', gapColor:gapOk?'var(--verify-600)':'var(--danger-600)',
      blockerLabel:blockers.length?(blockers.length+' quality gate'+(blockers.length===1?'':'s')+' not met — '+blockers.map(b=>b.driverKpi).join(', ')):'All quality gates met',
      blockerBg:blockers.length?'var(--warn-100)':'var(--verify-100)', blockerColor:blockers.length?'var(--warn-600)':'var(--verify-600)',
      hasBlockers:blockers.length>0 };
  }
  cmpStatusTone(s){ return {Live:{bg:'var(--verify-100)',c:'var(--verify-600)'},Planning:{bg:'var(--info-100)',c:'var(--info-600)'},Draft:{bg:'var(--surface-50)',c:'var(--ink-500)'},Paused:{bg:'var(--warn-100)',c:'var(--warn-600)'},Scheduled:{bg:'var(--info-100)',c:'var(--info-600)'},Completed:{bg:'var(--orchid-100)',c:'var(--orchid-700)'}}[s]||{bg:'var(--surface-50)',c:'var(--ink-500)'}; }
  campaignsView(){
    const rk=this.state.roleKey;
    const lvl=(this.ACCESS.campaigns&&this.ACCESS.campaigns[rk])||'No access';
    const canEdit=this.EDIT_LEVELS.includes(lvl);
    const me=this.currentPerson();
    const own=['senior','junior'].includes(rk);
    const F=this.state.cmpFilters||{status:'All',type:'All',dept:'All'};
    const setF=(k)=>(e)=>this.setState({ cmpFilters:{...F,[k]:e.target.value}, pg:{...(this.state.pg||{}),cmp:0} });
    let all=this.allCampaigns();
    if(own) all=all.filter(c=>(c.team||[]).some(t=>t.who===me));
    const tone=(s)=>this.cmpStatusTone(s);
    const list=all.filter(c=> (F.status==='All'||c.status===F.status) && (F.type==='All'||c.type===F.type) && (F.dept==='All'||c.dept===F.dept) );
    const pg=this.pgData('cmp',list.map(c=>{ const t=tone(c.status); const p=this.cmpProgress(c);
      return { ...c, statusBg:t.bg, statusColor:t.c, progress:p+'%', progressW:p+'%',
        progressColor:p>=70?'var(--verify-500)':p>=40?'var(--warn-500)':'var(--danger-500)',
        kpiCount:(c.kpis||[]).length+' KPIs', effortCount:(c.efforts||[]).length+' effort lines', taskLabel:c.taskDone+' / '+c.taskCount+' tasks done',
        teamNames:(c.team||[]).map(x=>x.who).join(', '), teamSize:String((c.team||[]).length),
        dates:c.start+' → '+c.end,
        open:()=>this.setState({ cmpOpen:c.id, cmpTab:'overview' }),
        edit:(e)=>{ if(e)e.stopPropagation(); if(!canEdit){ this.flash('Only Managers and Admin can edit campaigns.'); return; } this.setState({ cmpNew:true, cmpEditId:c.id, cmpSection:'cmpA', cmpForm:{...c, team:(c.team||[]).map(x=>({...x})), kpis:(c.kpis||[]).map(x=>({...x})), efforts:(c.efforts||[]).map(x=>({...x}))} }); },
      }; }),6);
    const K=(label,value,color)=>({label,value,color});
    const stats=[K('Campaigns',String(all.length),'var(--beet-700)'),K('Live',String(all.filter(c=>c.status==='Live').length),'var(--verify-600)'),K('In planning',String(all.filter(c=>['Planning','Draft','Scheduled'].includes(c.status)).length),'var(--info-600)'),K('Linked KPIs',String(all.reduce((s,c)=>s+(c.kpis||[]).length,0)),'var(--orchid-600)'),K('Tasks generated',String(all.reduce((s,c)=>s+(c.taskCount||0),0)),'var(--warn-600)')];
    const out={ cmpStats:stats, cmpRows:pg.rows, cmpPg:pg, cmpCanEdit:canEdit, cmpEmpty:list.length===0, cmpOwnNote:own,
      cmpFilterDefs:[
        {label:'Status',value:F.status,onChange:setF('status'),options:['All','Draft','Planning','Live','Paused','Scheduled','Completed']},
        {label:'Type',value:F.type,onChange:setF('type'),options:['All','SEO Campaign','Content Campaign','SMM Campaign','Website Campaign','Email Campaign','Analytics Campaign']},
        {label:'Department',value:F.dept,onChange:setF('dept'),options:['All','SEO','Content','SMM','Web Development','Design']},
      ],
      cmpReset:()=>this.setState({ cmpFilters:{status:'All',type:'All',dept:'All'} }),
    };
    Object.assign(out, this.cmpDetailData(tone), this.cmpFormData());
    return out;
  }
  cmpDetailData(tone){
    const id=this.state.cmpOpen; if(!id) return { cmpDrawerOpen:false };
    const c=this.allCampaigns().find(x=>x.id===id); if(!c) return { cmpDrawerOpen:false };
    const t=tone(c.status); const p=this.cmpProgress(c);
    const tab=this.state.cmpTab||'overview';
    const seg=(on)=>'display:flex;align-items:center;gap:6px;padding:8px 14px;border-radius:10px;font-size:12.5px;font-weight:700;cursor:pointer;border:none;background:'+(on?'#fff':'transparent')+';color:'+(on?'var(--beet-700)':'var(--ink-500)')+';box-shadow:'+(on?'var(--shadow-sm)':'none');
    return {
      cmpDrawerOpen:true,
      cmpD:{ ...c, statusBg:t.bg, statusColor:t.c, progress:p+'%', progressW:p+'%', progressColor:p>=70?'var(--verify-500)':p>=40?'var(--warn-500)':'var(--danger-500)', dates:c.start+' → '+c.end, taskLabel:c.taskDone+' / '+c.taskCount },
      cmpClose:()=>this.setState({ cmpOpen:null }),
      cmpStop:(e)=>e.stopPropagation(),
      cmpTabOverview:tab==='overview', cmpTabAudience:tab==='audience', cmpTabChain:tab==='chain', cmpTabTeam:tab==='team', cmpTabModel:tab==='model',
      cmpSegOverview:seg(tab==='overview'), cmpSegAudience:seg(tab==='audience'), cmpSegChain:seg(tab==='chain'), cmpSegTeam:seg(tab==='team'), cmpSegModel:seg(tab==='model'),
      cmpGoOverview:()=>this.setState({ cmpTab:'overview' }), cmpGoAudience:()=>this.setState({ cmpTab:'audience' }), cmpGoChain:()=>this.setState({ cmpTab:'chain' }), cmpGoTeam:()=>this.setState({ cmpTab:'team' }), cmpGoModel:()=>this.setState({ cmpTab:'model' }),
      cmpModel:this.cmpOutcomeModel(c),
      cmpMeta:[['Campaign ID',c.id],['Type',c.type],['Objective',c.objective],['Brand',c.brand],['Department',c.dept],['Cycle',c.cycle],['Start → End',c.start+' → '+c.end],['Owner',c.owner],['Budget',c.budget],['Spend to date',c.spend]],
      cmpAudienceMeta:[['Target countries',c.countries],['Target industries',c.industries],['Target audience',c.audience],['Decision-making persona',c.persona],['Company size',c.companySize]],
      cmpGoal:c.goal,
      cmpKpiRows:(c.kpis||[]).map(k=>{ const pc=Math.round(Math.min(100,this.cmpNum(k.current)/(this.cmpNum(k.target)||1)*100));
        const src=this.cmpKpiPool().find(x=>x.kpi===k.kpi&&x.okrCode);
        const okrCode=k.okrCode||(src?src.okrCode:''), okrTitle=k.okrTitle||(src?src.okrTitle:'');
        return { ...k, pct:pc+'%', pctW:pc+'%', pctColor:pc>=70?'var(--verify-500)':pc>=40?'var(--warn-500)':'var(--danger-500)',
          okrLabel:okrCode?(okrCode+' · '+okrTitle):'No linked OKR', okrCode:okrCode,
          pages:(k.pages||[]).filter(p=>p.url).map(p=>({ ...p, isExternal:p.kind==='External',
            label:(p.title||p.url), sub:p.url+(p.contrib?(' · expected '+p.contrib):''),
            icon:p.kind==='External'?'external-link':'file-text',
            bg:p.kind==='External'?'var(--info-100)':'var(--orchid-100)', color:p.kind==='External'?'var(--info-600)':'var(--orchid-600)' })),
          hasPages:(k.pages||[]).filter(p=>p.url).length>0,
          openOkr:()=>{ const o=this.OKR_DATA().find(x=>x.code===okrCode); if(o) this.setState({ cmpOpen:null, route:'okr', okrOpen:o.id }); else this.flash('This KPI is not linked to an OKR yet.'); } }; }),
      cmpEffortRows:c.efforts||[],
      cmpTeamRows:(c.team||[]).map(x=>({ ...x, initials:x.who.split(' ').map(s=>s[0]).join('').slice(0,2) })),
      cmpTaskLabel:c.taskDone+' of '+c.taskCount+' tasks completed',
      cmpTaskPctW:Math.round((c.taskDone/(c.taskCount||1))*100)+'%',
      cmpGoTasks:()=>this.setState({ route:'tasks', cmpOpen:null, tkFilter:c.name }),
      cmpGoEffort:()=>this.setState({ route:'effort', cmpOpen:null, epView:'list' }),
      cmpGoOkr:()=>this.setState({ route:'okr', cmpOpen:null }),
    };
  }
  // Simplified vs. the source design: KPI/effort/team rows are plain manual
  // fields here rather than auto-linking to Effort Planner pools and
  // auto-counting tasks as you pick — that auto-link magic is deferred (see
  // implementation report). The 6-section structure, validation-free
  // add/remove rows, and section-jump nav all work as designed.
  cmpFormData(){
    const f=this.state.cmpForm||{};
    const set=(k)=>(e)=>this.setState({ cmpForm:{...f,[k]:e.target.value} });
    const sec=this.state.cmpSection||'cmpA';
    const sections=[['cmpA','A','Campaign basics'],['cmpB','B','Goal & scope'],['cmpC','C','Target audience'],['cmpD','D','Linked KPIs'],['cmpE','E','Effort lines'],['cmpF','F','Campaign team']];
    const rowset=(key,blank,fields)=>{ const arr=f[key]||[blank];
      return { rows:arr.map((r,i)=>({ i, ...r,
          ...Object.fromEntries(fields.map(field=>[ 'set'+field.charAt(0).toUpperCase()+field.slice(1),
            (e)=>{ const a=arr.map((x,j)=>j===i?{...x,[field]:e.target.value}:x); this.setState({ cmpForm:{...f,[key]:a} }); } ])),
          remove:()=>{ const a=arr.slice(); a.splice(i,1); this.setState({ cmpForm:{...f,[key]:a.length?a:[blank]} }); },
          canRemove:arr.length>1 })),
        add:()=>this.setState({ cmpForm:{...f,[key]:[...arr,blank]} }) }; };
    const kpis=rowset('kpis',{kpi:'',target:'',current:'0',unit:''},['kpi','target','current','unit']);
    const efforts=rowset('efforts',{name:'',qty:'',unit:'',cadence:'',mode:'direct'},['name','qty','unit','cadence','mode']);
    const team=rowset('team',{who:'',role:''},['who','role']);
    return {
      cmpFormOpen:this.state.cmpNew,
      cmpf:f,
      cmpFormTitle:this.state.cmpEditId?'Edit campaign':'Create new campaign',
      cmpFormCode:this.state.cmpEditId||('CMP-'+String(100+this.allCampaigns().length+1).slice(-3)),
      cmpFormSaveLabel:this.state.cmpEditId?'Save changes':'Create campaign',
      cmpFormClose:()=>this.setState({ cmpNew:false, cmpEditId:null, cmpForm:{} }),
      cmpCanDelete:!!this.state.cmpEditId,
      cmpFormDelete:()=>this._deleteCampaign(),
      cmpFormSave:()=>this._saveCampaign(),
      cmpSections:sections.map(([id,letter,name])=>({ letter, name, active:sec===id,
        go:(e)=>{ if(e)e.preventDefault(); this.setState({ cmpSection:id }); },
        badgeBg:sec===id?'var(--beet-700)':'var(--surface-50)', badgeColor:sec===id?'#fff':'var(--ink-500)' })),
      cmpSetName:set('name'), cmpSetType:set('type'), cmpSetObjective:set('objective'), cmpSetStatus:set('status'), cmpSetBrand:set('brand'), cmpSetDept:set('dept'), cmpSetCycle:set('cycle'), cmpSetStart:set('start'), cmpSetEnd:set('end'), cmpSetOwner:set('owner'), cmpSetBudget:set('budget'), cmpSetGoal:set('goal'),
      cmpSetCountries:set('countries'), cmpSetIndustries:set('industries'), cmpSetAudience:set('audience'), cmpSetPersona:set('persona'), cmpSetCompanySize:set('companySize'),
      cmpPeopleNames:(this.state.users||[]).map(u=>u.name),
      cmpKpiForm:kpis.rows, cmpAddKpi:kpis.add,
      cmpEffortForm:efforts.rows, cmpAddEffort:efforts.add, cmpEffortEmpty:(f.efforts||[]).length===0,
      cmpTeamForm:team.rows, cmpAddTeam:team.add,
    };
  }
  _saveCampaign(){
    const f=this.state.cmpForm||{};
    if(!f.name||!f.name.trim()){ this.flash('Enter a campaign name.'); return; }
    const all=this.allCampaigns();
    if(this.state.cmpEditId){
      const idx=all.findIndex(c=>c.id===this.state.cmpEditId);
      if(idx>-1) all[idx] = {...all[idx], ...f, id:this.state.cmpEditId};
      this.flash('Campaign "'+f.name+'" updated.');
    } else {
      const id='CMP-'+String(100+all.length+1).slice(-3);
      const firstKpi=(f.kpis||[])[0];
      all.unshift({ id, taskCount:0, taskDone:0, spend:'₹0',
        outcomeKpi:firstKpi?firstKpi.kpi:'Outcome', outcomeUnit:firstKpi?firstKpi.unit:'',
        outcomeTarget:firstKpi?this.cmpNum(firstKpi.target):0, outcomeCurrent:firstKpi?this.cmpNum(firstKpi.current):0,
        ...f, kpis:f.kpis||[], efforts:f.efforts||[], team:f.team||[] });
      this.flash('Campaign "'+f.name+'" created.');
    }
    this.setState({ cmpNew:false, cmpEditId:null, cmpForm:{} });
  }
  _deleteCampaign(){
    const all=this.allCampaigns();
    const idx=all.findIndex(c=>c.id===this.state.cmpEditId);
    if(idx>-1){ const name=all[idx].name; all.splice(idx,1); this.flash('Deleted campaign: '+name+'.'); }
    this.setState({ cmpNew:false, cmpEditId:null, cmpForm:{} });
  }

  // ============ Messages (new module) ============
  THREADS_SEED(){
    if(this._threads) return this._threads;
    this._threads = [
      { id:'TH-001', kind:'channel', name:'#seo-team', members:['Aditi Rao','Sameer Iyer','Priya Nair'],
        msgs:[
          { id:'M1', who:'Priya Nair', role:'Manager', when:'Jul 28, 2026 · 09:12', text:'Backlink outreach numbers are behind plan this week — can we push harder on Pubrica?' },
          { id:'M2', who:'Aditi Rao', role:'Team Lead', when:'Jul 28, 2026 · 09:20', text:'On it — I\'ll reassign two outreach slots to Sameer today.', taskId:'TSK-2061' },
          { id:'M3', who:'Sameer Iyer', role:'Senior Executive', when:'Jul 28, 2026 · 10:05', text:'Picked those up. Sharing the prospect list I found for the enterprise cloud vertical.', files:['prospect-list-q3.csv'] },
        ] },
      { id:'TH-002', kind:'dm', name:'Karan Shah', members:['Karan Shah'],
        msgs:[
          { id:'M4', who:'Karan Shah', role:'Content Lead', when:'Jul 27, 2026 · 15:40', text:'Whitepaper draft for Food Research Lab is ready for review.', files:['whitepaper-draft-v2.pdf'] },
          { id:'M5', who:'Karan Shah', role:'Content Lead', when:'Jul 27, 2026 · 15:41', text:'Let me know if the compliance section needs another pass before QC.' },
        ] },
      { id:'TH-003', kind:'channel', name:'#smm-content', members:['Neha Verma','Priya Nair'],
        msgs:[
          { id:'M6', who:'Neha Verma', role:'Junior Executive', when:'Jul 26, 2026 · 11:02', text:'Reel scripts for the Statswork series are drafted — should I create tasks for the shoot days?' },
        ] },
    ];
    return this._threads;
  }
  allThreads(){
    const added=(this.state.thAdded||{});
    const base=this.THREADS_SEED().concat(this.state.thNew||[]);
    return base.map(t=>({ ...t, msgs:[...t.msgs, ...(added[t.id]||[])] }));
  }
  messagesView(){
    const rk=this.state.roleKey, me=this.currentPerson();
    const threads=this.allThreads();
    const curId=this.state.thOpen||threads[0].id;
    const cur=threads.find(t=>t.id===curId)||threads[0];
    const tasks=this.allTasks();
    return {
      msgThreads:threads.map(t=>{ const last=t.msgs[t.msgs.length-1]||{};
        const active=t.id===cur.id;
        return { id:t.id, name:t.name, isChannel:t.kind==='channel',
          icon:t.kind==='channel'?'hash':'user',
          preview:(last.who||'')+': '+String(last.text||'').slice(0,52)+'…',
          when:String(last.when||'').split(' · ')[1]||'',
          count:t.msgs.length+' message'+(t.msgs.length===1?'':'s'),
          style:'display:flex;gap:10px;padding:12px 14px;border-radius:12px;cursor:pointer;border:1px solid '+(active?'var(--orchid-300)':'transparent')+';background:'+(active?'var(--orchid-100)':'transparent'),
          open:()=>this.setState({ thOpen:t.id }) }; }),
      msgCurName:cur.name, msgCurIcon:cur.kind==='channel'?'hash':'user',
      msgCurMembers:cur.members.join(', '),
      msgRows:cur.msgs.map(m=>{ const linked=m.taskId&&tasks.find(t=>t.id===m.taskId);
        const mine=m.who===me;
        return { ...m, initials:m.who.split(' ').map(s=>s[0]).join('').slice(0,2),
          bubbleBg:mine?'var(--orchid-100)':'var(--surface-50)',
          avatarBg:mine?'var(--orchid-500)':'var(--beet-700)',
          hasTask:!!linked,
          taskLabel:linked?(linked.id+' · '+linked.name):'',
          taskStatus:linked?linked.status:'',
          taskBg:linked?this.tkTone(linked.status).bg:'', taskColor:linked?this.tkTone(linked.status).c:'',
          taskKpi:linked?(linked.kpi||'Not linked'):'', taskEffort:linked?(linked.effortPlan||'No effort plan'):'',
          hasFiles:(m.files||[]).length>0,
          fileRows:(m.files||[]).map(n=>({ name:n,
            icon:/\.(png|jpe?g|gif|webp|svg)$/i.test(n)?'image':(/\.(mp4|mov|webm)$/i.test(n)?'video':(/\.pdf$/i.test(n)?'file-text':'file')),
            openRepo:()=>this.setState({ route:'files' }) })),
          openTask:()=>this.setState({ route:'tasks', tkOpen:m.taskId }),
          convert:()=>{
            this.setState({ tkNew:true,
              tkForm:{ template:'Custom task', name:String(m.text).slice(0,60), desc:'From '+cur.name+' — '+m.who+': "'+m.text+'"',
                priority:'Medium', assignee:(this.state.users&&this.state.users[0]?this.state.users[0].name:''), recurrence:'None' } });
            this.flash('Creating a task from this message — link its effort plan and KPI to complete the chain.'); },
          linkOpen:()=>this.setState({ msgLink:m.id }),
          linkPicker:this.state.msgLink===m.id,
          linkOptions:[{v:'',label:'— Select an existing task —'}].concat(tasks.map(t=>({ v:t.id, label:t.id+' · '+t.name }))),
          linkPick:(e)=>{ const v=e.target.value; if(!v) return;
            // Seed/new-thread messages are mutated in place (same pattern used
            // for Master Data and Backlink rows); messages sent this session
            // live in thAdded and get patched there instead.
            const seedThread=this.THREADS_SEED().find(x=>x.id===cur.id) || (this.state.thNew||[]).find(x=>x.id===cur.id);
            const seedMsg=seedThread && seedThread.msgs.find(x=>x.id===m.id);
            if(seedMsg){ seedMsg.taskId=v; }
            else {
              const add={...(this.state.thAdded||{})};
              add[cur.id]=(add[cur.id]||[]).map(x=>x.id===m.id?{...x,taskId:v}:x);
              this.setState({ thAdded:add });
            }
            this.setState({ msgLink:null });
            const t=tasks.find(x=>x.id===v); this.flash('Message linked to '+v+(t?(' — '+t.name):'')+'.'); },
          linkCancel:()=>this.setState({ msgLink:null }) }; }),
      msgDraft:this.state.msgDraft||'',
      msgOnDraft:(e)=>this.setState({ msgDraft:e.target.value }),
      msgDraftFiles:(this.state.msgFiles||[]).map((n,i)=>({ name:n,
        icon:/\.(png|jpe?g|gif|webp|svg)$/i.test(n)?'image':(/\.(mp4|mov|webm)$/i.test(n)?'video':(/\.pdf$/i.test(n)?'file-text':'file')),
        remove:()=>{ const a=(this.state.msgFiles||[]).slice(); a.splice(i,1); this.setState({ msgFiles:a }); } })),
      msgHasFiles:(this.state.msgFiles||[]).length>0,
      msgAttach:()=>{ const n='attachment-'+(Date.now()%10000)+'.pdf'; this.setState({ msgFiles:[...(this.state.msgFiles||[]),n] }); },
      msgAttachImage:()=>{ const n='image-'+(Date.now()%10000)+'.png'; this.setState({ msgFiles:[...(this.state.msgFiles||[]),n] }); },
      msgSend:()=>{ const txt=(this.state.msgDraft||'').trim();
        const files=this.state.msgFiles||[];
        if(!txt&&!files.length){ this.flash('Type a message or attach a file first.'); return; }
        const id='M'+Date.now();
        const now=new Date();
        const msg={ id, who:me, role:this.ROLES[rk].label, when:this.todayStr()+' · '+String(now.getHours()).padStart(2,'0')+':'+String(now.getMinutes()).padStart(2,'0'), text:txt||'(attachment)', files };
        const add={...(this.state.thAdded||{})}; add[cur.id]=[...(add[cur.id]||[]), msg];
        this.setState({ thAdded:add, msgDraft:'', msgFiles:[] });
        if(files.length) this.flash(files.length+' file'+(files.length===1?'':'s')+' shared.'); },
      msgCanAct:['manager','team_lead','admin','ceo'].includes(rk),
      ...(()=>{ const nf=this.state.thForm;
        const people=(this.state.users||[]).map(u=>u.name).filter(p=>p!==me);
        const set=(k)=>(e)=>this.setState({ thForm:{...nf,[k]:e.target.value} });
        return {
          msgNewGroup:()=>this.setState({ thForm:{ kind:'channel', name:'', members:[], first:'' } }),
          msgNewDm:()=>this.setState({ thForm:{ kind:'dm', name:'', members:[], first:'' } }),
          thFormOpen:!!nf, thf:nf||{},
          thIsChannel:!!nf&&nf.kind==='channel', thIsDm:!!nf&&nf.kind==='dm',
          thFormTitle:nf?(nf.kind==='channel'?'New group':'New direct message'):'',
          thClose:()=>this.setState({ thForm:null }),
          thStop:(e)=>e.stopPropagation(),
          thSetName:set('name'), thSetFirst:set('first'),
          thKindBtns:['channel','dm'].map(k=>({ label:k==='channel'?'Group channel':'Direct message', active:!!nf&&nf.kind===k,
            set:()=>this.setState({ thForm:{...nf, kind:k, members:[]} }) })),
          thPeople:people.map(p=>{ const on=!!nf&&(nf.members||[]).includes(p);
            return { name:p, initials:p.split(' ').map(s=>s[0]).join('').slice(0,2), on,
              toggle:()=>{ const cur2=(nf.members||[]); const next=on?cur2.filter(x=>x!==p):(nf.kind==='dm'?[p]:[...cur2,p]);
                this.setState({ thForm:{...nf, members:next} }); } }; }),
          thMemberNote:nf?((nf.members||[]).length?((nf.members||[]).length+' member'+((nf.members||[]).length===1?'':'s')+' selected'+(nf.kind==='dm'?'':' — you are added automatically')):(nf.kind==='dm'?'Pick one person':'Pick the people for this group')):'',
          thSave:()=>{
            const k=nf.kind;
            const mem=nf.members||[];
            if(k==='dm'&&!mem.length){ this.flash('Pick the person to message.'); return; }
            if(k==='channel'&&!(nf.name||'').trim()){ this.flash('Name the group.'); return; }
            if(k==='channel'&&!mem.length){ this.flash('Add at least one member.'); return; }
            const id='TH-'+String(100+threads.length+1).slice(-3);
            const name=k==='channel'?('#'+String(nf.name).trim().toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')):mem[0];
            const msgs=[];
            if((nf.first||'').trim()){ const now=new Date();
              msgs.push({ id:'M'+Date.now(), who:me, role:this.ROLES[rk].label,
                when:this.todayStr()+' · '+String(now.getHours()).padStart(2,'0')+':'+String(now.getMinutes()).padStart(2,'0'),
                text:nf.first.trim() }); }
            this.setState({ thNew:[{ id, kind:k, name, members:k==='channel'?[me].concat(mem):mem, msgs }].concat(this.state.thNew||[]),
              thForm:null, thOpen:id });
            this.flash((k==='channel'?'Group ':'Conversation ')+name+' created.');
          } }; })(),
    };
  }

  OKR_SEED(){
    return [
      { id:'1', code:'OKR-SEO-Q1-001', v:'v1.2', scope:'Organization', title:'Increase Organic Traffic by 50%', desc:'Drive significant growth in organic search visitors through SEO optimization.', owner:'Sarah Johnson', team:'+1', cycle:'Q1 2025', brand:'Food Research Lab', dept:'SEO', campaign:'Organic Growth Q1', category:'SEO', progress:68, due:'Mar 31, 2025', start:'Jan 1, 2025', daysLeft:15, cycleElapsed:75, status:'Active', weight:30, reviewer:'John Smith', approver:'Rahul Menon',
        krs:[
          {t:'Increase organic visitors to 100K/month', kpi:'Organic Sessions', baseline:'52,000', target:'100,000', current:'68,000', unit:'visitors', weight:40, who:'Sarah Johnson', freq:'Monthly', due:'Mar 31', status:'Active'},
          {t:'Rank for 50 high-volume keywords in top 10', kpi:'Keywords in Top 10', baseline:'12', target:'50', current:'34', unit:'keywords', weight:30, who:'Mike Chen', freq:'Weekly', due:'Mar 31', status:'Active'},
          {t:'Build 200 quality backlinks', kpi:'Referring Domains', baseline:'40', target:'200', current:'135', unit:'backlinks', weight:30, who:'Sarah Johnson', freq:'Quarterly', due:'Mar 31', status:'Active'},
        ] },
      { id:'2', code:'OKR-CNT-Q1-002', v:'v1.0', scope:'Department', title:'Launch 30 High-Quality Content Pieces', desc:'Create comprehensive content across all service categories.', owner:'Mike Chen', team:'+1', cycle:'Q1 2025', brand:'Pubrica', dept:'Content', campaign:'Content Engine Q1', category:'Content', progress:43, due:'Mar 31, 2025', start:'Jan 1, 2025', daysLeft:15, cycleElapsed:75, status:'Active', weight:25, reviewer:'John Smith', approver:'Priya Nair',
        krs:[
          {t:'Publish 30 blog posts', kpi:'Content Published', baseline:'0', target:'30', current:'13', unit:'articles', weight:50, who:'Mike Chen', freq:'Weekly', due:'Mar 31', status:'Active'},
          {t:'Achieve 50K avg views per article', kpi:'Content Engagement', baseline:'8,000', target:'50,000', current:'21,000', unit:'views', weight:50, who:'Emily Davis', freq:'Monthly', due:'Mar 31', status:'Active'},
        ] },
      { id:'3', code:'OKR-WEB-Q1-003', v:'v1.1', scope:'Department', title:'Optimize Website Performance', desc:'Improve site speed and user experience metrics.', owner:'Alex Martinez', team:'', cycle:'Q1 2025', brand:'Statswork', dept:'Web Development', campaign:'Core Web Vitals', category:'Technical', progress:82, due:'Mar 20, 2025', start:'Jan 1, 2025', daysLeft:4, cycleElapsed:80, status:'Active', weight:20, reviewer:'John Smith', approver:'Rahul Menon',
        krs:[
          {t:'Reduce page load time to under 2s', kpi:'Page Load Time', baseline:'4.8', target:'2', current:'2.3', unit:'seconds', weight:60, who:'Alex Martinez', freq:'Weekly', due:'Mar 20', status:'Active'},
          {t:'Achieve 95+ Lighthouse score', kpi:'Lighthouse Score', baseline:'62', target:'95', current:'88', unit:'score', weight:40, who:'Alex Martinez', freq:'Daily', due:'Mar 20', status:'Active'},
        ] },
      { id:'4', code:'OKR-SMM-Q1-004', v:'v1.0', scope:'Department', title:'Grow Social Engagement 3×', desc:'Scale reach and engagement across LinkedIn and Instagram.', owner:'Neha Verma', team:'+2', cycle:'Q1 2025', brand:'Beetloop', dept:'SMM', campaign:'Social Push Q1', category:'Branding', progress:22, due:'Mar 10, 2025', start:'Jan 1, 2025', daysLeft:-6, cycleElapsed:106, status:'At Risk', weight:15, reviewer:'Priya Nair', approver:'Rahul Menon',
        krs:[
          {t:'Reach 500K monthly impressions', kpi:'Social Impressions', baseline:'120,000', target:'500,000', current:'180,000', unit:'impressions', weight:50, who:'Neha Verma', freq:'Weekly', due:'Mar 10', status:'At Risk'},
          {t:'Grow followers to 25K', kpi:'Followers', baseline:'11,000', target:'25,000', current:'14,200', unit:'followers', weight:50, who:'Arjun Pillai', freq:'Monthly', due:'Mar 10', status:'At Risk'},
        ] },
      { id:'5', code:'OKR-CNV-Q4-009', v:'v2.0', scope:'Individual', title:'Lift Landing-Page CVR to 4.5%', desc:'Improve conversion rate across primary service landing pages.', owner:'Sameer Iyer', team:'', cycle:'Q4 2024', brand:'Tutors India', dept:'Web Development', campaign:'CRO Sprint', category:'Conversion', progress:100, due:'Dec 31, 2024', start:'Oct 1, 2024', daysLeft:0, cycleElapsed:100, status:'Completed', weight:20, reviewer:'John Smith', approver:'Priya Nair',
        krs:[
          {t:'Increase CVR from 2.8% to 4.5%', kpi:'Conversion Rate', baseline:'2.8', target:'4.5', current:'4.6', unit:'%', weight:60, who:'Sameer Iyer', freq:'Yearly', due:'Dec 31', status:'Completed'},
          {t:'Reduce bounce rate below 40%', kpi:'Bounce Rate', baseline:'58', target:'40', current:'38', unit:'%', weight:40, who:'Sameer Iyer', freq:'Weekly', due:'Dec 31', status:'Completed'},
        ] },
    ];
  }
  krAchievement(k){
    const cur=this.cmpNum(k.current), base=this.cmpNum(k.baseline), tgt=this.cmpNum(k.target);
    if(tgt===base) return cur>=tgt?100:0;
    const lowerIsBetter = base>tgt;
    const pct = lowerIsBetter ? (base-cur)/(base-tgt)*100 : (cur-base)/(tgt-base)*100;
    return Math.max(0, Math.min(100, Math.round(pct)));
  }
  okrProgress(o){
    const krs=o.krs||[];
    if(!krs.length) return o.progress||0;
    const totalWeight = krs.reduce((s,k)=>s+(k.weight||0),0) || krs.length;
    const weighted = krs.reduce((s,k)=>s+this.krAchievement(k)*(k.weight||(100/krs.length)),0);
    return Math.round(weighted/totalWeight);
  }
  cycleElapsedOf(o){
    const start=new Date(o.start), due=new Date(o.due);
    if(isNaN(start)||isNaN(due)||due<=start) return o.cycleElapsed||0;
    const now=new Date();
    const pct=(now-start)/(due-start)*100;
    return Math.round(Math.max(0, pct));
  }
  allOkrs(){
    const upd=this.state.okrUpd||{};
    return this.OKR_SEED().concat(this.state.okrAdded||[])
      .map(o=>upd[o.id]?{...o,...upd[o.id]}:o)
      .map(o=>{
        const p=Math.min(100,this.okrProgress(o));
        return { ...o, progress:p, progressRaw:this.okrProgress(o), cycleElapsed:this.cycleElapsedOf(o) };
      });
  }
  OKR_DATA(){ return this.allOkrs(); }

  renderVals(){
    const rk = this.state.roleKey;
    const profile = this.state.authProfile;
    const role = profile
      ? { ...this.ROLES[rk], person: profile.full_name||profile.email, tag: profile.designation||this.ROLES[rk].tag,
          short: (profile.full_name||profile.email||'?').trim().split(/\s+/).map(w=>w[0]).slice(0,2).join('').toUpperCase() }
      : this.ROLES[rk];
    const route = this.state.route;
    const acc = this.ACCESS;
    const showMyKpi = route==='okr' && ['team_lead','senior','junior'].includes(rk);

    // nav
    const buildNav = (mods) => mods.filter(m=>acc[m] && acc[m][rk]).map(m=>{
      const active = route===m;
      const lvl = acc[m][rk];
      const canEdit = this.EDIT_LEVELS.includes(lvl);
      return {
        icon: this.MODMETA[m].icon, label: this.MODMETA[m].label,
        locked: !canEdit && m!=='dashboard' && m!=='qc',
        go: ()=> this.setState({ route:m }),
        style: `display:flex;align-items:center;gap:11px;width:100%;padding:9px 12px;margin-bottom:3px;border:none;border-radius:11px;cursor:pointer;font-size:13.5px;font-weight:${active?'700':'600'};text-align:left;transition:.15s;`+
          (active? 'background:rgba(180,90,140,.22);color:#fff;box-shadow:inset 3px 0 0 var(--orchid-400);'
                 : 'background:transparent;color:rgba(255,255,255,.72);'),
      };
    });
    const nav = buildNav(['dashboard','campaigns','effort','tasks','templates','qc','okr','analytics','content','repositories','files','messages','sop','support']);
    const adminNav = buildNav(['masters','users','config']);
    const hasAdmin = adminNav.length>0;

    // access badge for current page
    const lvl = (acc[route] && acc[route][rk]) || 'No access';
    const tone = this.levelTone(lvl);
    let accessIcon='eye', accessLabel=lvl+' access';
    if(this.EDIT_LEVELS.includes(lvl)){ accessIcon='pencil'; accessLabel=lvl+' access'; }
    if(['Own','Update own','View own','Assigned only'].includes(lvl)){ accessIcon='user'; }

    // page head
    const PAGES = {
      dashboard:{ eyebrow:'Overview', icon:'layout-dashboard', title:this.dashTitle(role.bucket), sub:this.dashSub(role.bucket) },
      campaigns:{ eyebrow:'Delivery', icon:'megaphone', title:'Campaigns', sub:'Goal → audience → KPIs → effort → tasks. Every campaign is team work with one accountable owner.', actionLabel:'New campaign', actionIcon:'plus' },
      tasks:{ eyebrow:'Execution', icon:'list-checks', title:'Tasks', sub:'Work items assigned across the team.', actionLabel:'Assign task', actionIcon:'plus' },
      templates:{ eyebrow:'Execution', icon:'layout-template', title:'Templates', sub:'Task, KPI & OKR Masters — reusable definitions to pull from everywhere.', actionLabel:{task:'New task template',kpi:'New KPI template',okr:'New OKR template'}[this.state.ttTab||'task'], actionIcon:'plus' },
      files:{ eyebrow:'Assets', icon:'folder-open', title:'Document Repository', sub:'Every document, image and video uploaded across tasks — with QC status and deadlines in one view.' },
      messages:{ eyebrow:'Collaboration', icon:'message-square', title:'Messages', sub:'Team conversations — turn any message into a task, or attach it to an existing one.' },
      sop:{ eyebrow:'Governance', icon:'book-open-check', title:'SOPs', sub:'The documented way work is done, tied to gold standards and QC.', actionLabel:'New SOP', actionIcon:'plus' },
      support:{ eyebrow:'Help', icon:'life-buoy', title:'Help & Support', sub:'Raise and track tickets — software issues, technical questions, training and access requests.', actionLabel:'Raise a ticket', actionIcon:'plus' },
      effort:{ eyebrow:'Planning', icon:'gauge', title:'Create Effort Plan', sub:'Define effort targets, convert them to KPIs and auto-generate tasks for the period.' },
      ideas:{ eyebrow:'Repositories', icon:'lightbulb', title:'Content Repository — Ideas', sub:'Quarterly content ideas from the writers — QC-approved ideas convert to tasks and stay stored for reuse.', actionLabel:'Add Content Idea', actionIcon:'plus' },
      qc:{ eyebrow:'Quality', icon:'shield-check', title:'QC Review', sub:'Independent quality validation and approvals.' },
      okr:{ eyebrow:'Performance', icon:'target', title:'OKR & KPI', sub:'Objectives, key results and KPI definitions.', actionLabel:'New OKR', actionIcon:'plus' },
      analytics:{ eyebrow:'Intelligence', icon:'bar-chart-3', title:'Analytics', sub:'Dashboards scoped to your level of access.' },
      repositories:{ eyebrow:'Assets', icon:'database', title:'Repositories', sub:'Shared content, SEO and asset repositories.', actionLabel:'New repository', actionIcon:'plus' },
      content:{ eyebrow:'Content', icon:'folder-tree', title:'Website Content Repository', sub:'Structured source of truth for every website page, its SEO and relationships.' },
      masters:{ eyebrow:'Administration', icon:'boxes', title:'Master Data', sub:'Admin-owned reference data that powers the platform.' },
      users:{ eyebrow:'Administration', icon:'users', title:'User Management', sub:'Create accounts, assign roles and manage the hierarchy.', actionLabel:'Add user', actionIcon:'user-plus' },
      config:{ eyebrow:'Administration', icon:'settings-2', title:'Configuration', sub:'Platform settings, security and integrations.' },
      profile:{ eyebrow:'Account', icon:'user', title:'My Profile', sub:'Your account details.' },
    };
    const page = Object.assign({ canEdit:this.EDIT_LEVELS.includes(lvl) }, PAGES[route]||PAGES.dashboard);
    // masters/users always show action for admin
    if(route==='users') page.canEdit = ['admin','coo','ceo'].includes(rk);
    if(route==='repositories') page.canEdit = rk==='admin';
    if(['dashboard','analytics','masters','config','qc','content','effort','profile'].includes(route)) page.canEdit = false;
    if(showMyKpi){ page.eyebrow='Performance'; page.icon='target'; page.title='My KPIs'; page.sub='Report your check-ins and track your own KPIs.'; page.canEdit=false; }

    const primaryAction = ()=>{
      if(route==='users') this.setState({ showUserModal:true });
      else if(route==='tasks') this.setState({ tkNew:true, tkForm:{ template:'Custom task', priority:'Medium', assignee:(this.state.users&&this.state.users[0]?this.state.users[0].name:''), recurrence:'None' } });
      else if(route==='templates'){ const tb=this.state.ttTab||'task'; if(tb==='kpi') this.setState({ ktNew:true, ktEditId:null, ktForm:{ division:'SEO', category:'Traffic', direction:'Increase', freq:'Monthly', source:'GA4', status:'Active' } }); else if(tb==='okr') this.setState({ otNew:true, otEditId:null, otForm:{ category:'SEO', scope:'Department', division:'SEO', status:'Active', krs:[{t:'',kpi:'',unit:'',target:'',weight:'100',freq:'Monthly'}] } }); else this.setState({ ttNew:true, ttEditId:null, ttForm:{ division:'SEO', priority:'Medium', recurrence:'None', status:'Active', checklist:['',''] } }); }
      else if(route==='ideas') this.setState({ showIdeaForm:true, ideaForm:{} });
      else if(route==='okr') this.setState({ showOkrPanel:true });
      else if(route==='campaigns') this.setState({ cmpNew:true, cmpEditId:null, cmpSection:'cmpA',
        cmpForm:{ type:'SEO Campaign', status:'Draft', brand:'Beetloop', dept:'SEO', objective:'Lead Generation', cycle:'Q3 2026', team:[] } });
      else if(route==='sop') this.setState({ sopNew:true, sopForm:{ division:'Content', status:'Draft', priority:'Medium', frequency:'Per project', category:'Content production' } });
      else if(route==='support') this.setState({ tktNew:true, tktForm:{ cat:'software', priority:'Medium' } });
      else if(route==='repositories') this.setState({ repoNew:true, repoForm:{ cat:'Content', owner:'Priya Nair' } });
      else this.flash('Draft created — opening editor…');
    };

    const readOnly = !this.EDIT_LEVELS.includes(lvl) && ['campaigns','tasks','okr','repositories'].includes(route);
    const readOnlyMsg = `Your role (${role.label}) has ${lvl.toLowerCase()} access here. Actions that change data are hidden.`;

    // screen flags
    const showDash = route==='dashboard';
    const showQC = route==='qc';
    const showAnalytics = route==='analytics';
    const showMastersHub = route==='masters' && !this.state.masterKey;
    const showMasterDetail = route==='masters' && !!this.state.masterKey;
    const showOKR = route==='okr' && !showMyKpi;
    const showContent = route==='content';
    const showTasks2 = route==='tasks';
    const showTemplates = route==='templates';
    const showFiles = route==='files';
    const showEffort = route==='effort';
    const showIdeas = route==='ideas';
    const showProfile = route==='profile';
    const showCampaigns = route==='campaigns';
    const showMessages = route==='messages';
    const showSop = route==='sop';
    const showSupport = route==='support';
    const showTable = route==='repositories';
    const showUsersTable = route==='users';
    const showPageHead = !showMasterDetail;

    const out = {
      isLogin: this.state.screen==='login',
      isActivate: this.state.screen==='activate',
      isApp: this.state.screen==='app',
      // login
      email:this.state.email, password:this.state.password, loginError:this.state.loginError,
      onEmail:e=>this.setState({email:e.target.value}), onPassword:e=>this.setState({password:e.target.value}),
      doLogin:()=>this.doLogin(), goActivate:e=>{e&&e.preventDefault();this.setState({screen:'activate'});},
      oauthGoogle:e=>{e&&e.preventDefault();this._oauthLogin('google');},
      oauthMicrosoft:e=>{e&&e.preventDefault();this._oauthLogin('azure');},
      forgotPassword:e=>{e&&e.preventDefault();this._forgotPassword();},
      backToLogin:e=>{e&&e.preventDefault();this.setState({screen:'login'});},
      noop:e=>{e&&e.preventDefault();this.flash('Demo — connect your identity provider to enable.');},
      // activate
      newPass:this.state.newPass, confirmPass:this.state.confirmPass,
      onNewPass:e=>this.setState({newPass:e.target.value}), onConfirm:e=>this.setState({confirmPass:e.target.value}),
      toggleMfa:()=>this.setState({mfa:!this.state.mfa}),
      mfaBg:this.state.mfa?'var(--verify-500)':'var(--line-300)', mfaX:this.state.mfa?'21px':'3px',
      doActivate:()=>this.doActivate(),
      ...this.pwStrength(),
      // shell
      role, roleKey:rk, nav, adminNav, hasAdmin,
      campaignOptions:this.campaignOptionsFor((this.state.tkForm||{}).campaign,true),
      campaignOptionsNone:this.campaignOptionsFor((this.state.okrForm||{}).campaign,true),
      epCampaignOptions:this.campaignOptionsFor((this.state.epForm||{}).campaign,true),
      okrTitleOptions:this.okrTitleOptionsFor((this.state.epForm||{}).okr),
      okrParentOptions:this.okrTitleOptionsFor((this.state.okrForm||{}).parent),
      tkCampaignVal:this.campaignOpt((this.state.tkForm||{}).campaign),
      okrCampaignVal:this.campaignOpt((this.state.okrForm||{}).campaign),
      epCampaignVal:this.campaignOpt((this.state.epForm||{}).campaign),
      epOkrVal:this.okrTitleOpt((this.state.epForm||{}).okr),
      okrParentVal:(this.state.okrForm||{}).parent||'None (top level)',
      roleOptions:['admin','ceo','coo'].map(k=>({key:k,label:this.ROLES[k].label,sel:k===rk})),
      onRoleChange:e=>{ const k=e.target.value; const allowed = this.ACCESS[route]&&this.ACCESS[route][k]; this.setState({ roleKey:k, route: allowed?route:'dashboard' }); },
      notifications:this.state.notifications, unreadCount:(this.state.notifications||[]).filter(n=>!n.read).length,
      showNotifications:this.state.showNotifications,
      toggleNotifications:()=>{
        const opening=!this.state.showNotifications;
        this.setState({ showNotifications:opening,
          notifications: opening ? this.state.notifications.map(n=>({...n, read:true})) : this.state.notifications });
      },
      logout:()=>this.doLogout(),
      openProfile:()=>this.setState({ route:'profile' }),
      route, page, primaryAction,
      accessBg:tone.bg, accessBorder:tone.bg, accessColor:tone.color, accessIcon, accessLabel,
      // screen switches
      showDash, showQC, showAnalytics, showMastersHub, showMasterDetail, showOKR, showMyKpi, showTable, showUsersTable, showTasks2, showTemplates, showFiles, showEffort, showIdeas, showContent, showProfile, showCampaigns, showMessages, showSop, showSupport, showPageHead, readOnly, readOnlyMsg,
      toast:this.state.toast,
      // modals
      showUserModal:this.state.showUserModal,
      closeUserModal:()=>this.setState({showUserModal:false}), stop:e=>e.stopPropagation(),
      submitUser:()=>this.submitUser(),
      showRecordModal:this.state.showRecordModal, recordKind:this.state.recordKind, recordForm:this.state.recordForm,
      closeRecordModal:()=>this.setState({ showRecordModal:false }),
      recordSetName:e=>this.setState({ recordForm:{...this.state.recordForm, name:e.target.value} }),
      recordSetType:e=>this.setState({ recordForm:{...this.state.recordForm, type:e.target.value} }),
      recordSetOwner:e=>this.setState({ recordForm:{...this.state.recordForm, owner:e.target.value} }),
      recordOwnerOptions:(this.state.users||[]).map(u=>u.name),
      recordSetStatus:e=>this.setState({ recordForm:{...this.state.recordForm, status:e.target.value} }),
      saveRecord:()=>this._saveRecord(),
      recordEditKey:this.state.recordEditKey, deleteRecord:()=>this._deleteRecord(),
      uf:this.state.uf,
      ufFirst:e=>this.uf('first',e), ufLast:e=>this.uf('last',e), ufEmail:e=>this.uf('email',e), ufMobile:e=>this.uf('mobile',e),
      ufDept:e=>this.uf('dept',e), ufDesignation:e=>this.uf('designation',e), ufManager:e=>this.uf('manager',e), ufLead:e=>this.uf('lead',e), ufRole:e=>this.uf('role',e),
      ufShiftStart:e=>this.uf('shiftStart',e), ufShiftEnd:e=>this.uf('shiftEnd',e), ufBreak:e=>this.uf('breakMin',e), ufDays:e=>this.uf('days',e),
      ufCapNote:(()=>{ const f=this.state.uf||{}; const hm=(s)=>{ const p=String(s||'').split(':'); return (parseInt(p[0],10)||0)+((parseInt(p[1],10)||0)/60); };
        const gross=hm(f.shiftEnd||'18:00')-hm(f.shiftStart||'09:00');
        const daily=Math.max(0,Math.round((gross-((parseInt(f.breakMin,10)||60)/60))*100)/100);
        const weekly=Math.round(daily*(parseFloat(f.days)||5)*100)/100;
        return daily+' h/day · '+weekly+' h/week capacity'; })(),
      showRoleConfirm:this.state.showRoleConfirm,
      roleConfirmLabel:this.state.roleConfirmKey?this.ROLES[this.state.roleConfirmKey].label:'',
      roleConfirmSummary:this.state.roleConfirmKey?this.roleAccessSummary(this.state.roleConfirmKey):[],
      roleConfirmCancel:()=>this.cancelRoleAssignment(),
      roleConfirmOk:()=>this.confirmRoleAssignment(),
      showMasterRecordEdit:this.state.showMasterRecordEdit,
      mrCancel:()=>this.setState({ showMasterRecordEdit:false, mrKey:null, mrIndex:null, mrForm:{} }),
      mrSave:()=>this.submitMasterRecord(),
      mrCanDelete:this.state.mrIndex!=null,
      mrDelete:()=>this.deleteMasterRecord(),
      ...(()=>{
        const mk = this.state.mrKey;
        const m = mk && this.MASTERS_REG()[mk];
        if(!m) return { mrTitle:'', mrFieldRows:[] };
        const form = this.state.mrForm||{};
        return {
          mrTitle: (this.state.mrIndex!=null?'Edit ':'Add ')+m.label+' entry',
          mrFieldRows: m.fields.map(f=>{
            const options = this.masterFieldOptions(mk, f);
            return { key:f, label:this.humanize(f), value:form[f]!=null?form[f]:'', isSelect:!!options, options:options||[],
              onChange:e=>this.setState({ mrForm:{...this.state.mrForm, [f]:e.target.value} }) };
          }),
        };
      })(),
    };

    if(showProfile) Object.assign(out, this.myProfileData(rk, role));
    if(showCampaigns) Object.assign(out, this.campaignsView());
    if(showMessages){ Object.assign(out, this.messagesView()); Object.assign(out, this.tkFormData()); }
    if(showSop){
      const tab=this.state.sopTab||'playbook';
      const seg=(on)=>'display:flex;align-items:center;gap:7px;padding:8px 15px;border:none;border-radius:9px;font-size:13px;font-weight:700;cursor:pointer;'+(on?'background:#fff;color:var(--beet-700);box-shadow:var(--shadow-sm)':'background:none;color:var(--ink-500)');
      Object.assign(out, {
        sopTabPlaybook:tab==='playbook', sopTabSops:tab==='sops',
        sopSegPb:seg(tab==='playbook'), sopSegSop:seg(tab==='sops'),
        sopGoPb:()=>this.setState({ sopTab:'playbook' }), sopGoSop:()=>this.setState({ sopTab:'sops' }) });
      if(tab==='sops') Object.assign(out, this.sopView(rk));
      if(tab==='playbook') Object.assign(out, this.playbookView(rk));
      page.canEdit = tab==='sops' && ['manager','team_lead','admin'].includes(rk);
    }
    if(showSupport) Object.assign(out, this.supportView(rk));
    if(showDash) Object.assign(out, this.dashData(rk, role));
    if(showQC){ Object.assign(out, this.qcData(rk)); Object.assign(out, this.tkDetailData()); Object.assign(out, this.ideaDetailData()); }
    if(showIdeas) Object.assign(out, this.ideaDetailData());
    if(showAnalytics){ out.analyticsCards = this.analyticsData(role.bucket); Object.assign(out, this.dashboardsView(rk, role)); }
    if(showMastersHub) out.masterGroups = this.mastersData();
    if(showMasterDetail) Object.assign(out, this.masterDetailData());
    if(showOKR) Object.assign(out, this.okrView());
    if(route==='okr') Object.assign(out, this.okrDetailData());
    if(showMyKpi) Object.assign(out, this.checkinView());
    if(route==='okr') Object.assign(out, this.ciData());
    if(showTable){
      Object.assign(out, this.tableData(route, rk, lvl, readOnly));
      const q=(this.state.tblQuery||'').toLowerCase();
      let tr=out.tableRows||[];
      if(q) tr=tr.filter(r=>((r.c0||'')+' '+(r.c0sub||'')+' '+(r.c1||'')+' '+(r.c3||'')+' '+(r.tag||'')).toLowerCase().includes(q));
      const pg=this.pgData('tbl-'+route, tr, 8);
      out.tableRows=pg.rows; out.tblPg=pg;
      out.tblQuery=this.state.tblQuery||'';
      out.tblOnQuery=(e)=>this.setState({ tblQuery:e.target.value, pg:{...(this.state.pg||{}),['tbl-'+route]:0} });
    }
    if(showUsersTable) Object.assign(out, this.tableData(route, rk, lvl, readOnly));
    if(showTasks2){ Object.assign(out, this.tasksView());
      const tkTab=this.state.tkTab||'list';
      const seg=(on)=>'display:flex;align-items:center;gap:7px;padding:8px 15px;border:none;border-radius:9px;font-size:13px;font-weight:700;cursor:pointer;'+(on?'background:#fff;color:var(--beet-700);box-shadow:var(--shadow-sm)':'background:none;color:var(--ink-500)');
      Object.assign(out, { tkTabList:tkTab==='list', tkTabTime:tkTab==='time', tkTabCal:tkTab==='cal',
        tkSegListStyle:seg(tkTab==='list'), tkSegTimeStyle:seg(tkTab==='time'), tkSegCalStyle:seg(tkTab==='cal'),
        tkShowList:()=>this.setState({ tkTab:'list' }), tkShowTime:()=>this.setState({ tkTab:'time' }),
        tkShowCal:()=>this.setState({ tkTab:'cal' }) });
      if(tkTab==='time') Object.assign(out, this.timeReportData());
      if(tkTab==='cal') Object.assign(out, this.calendarData(rk));
    }
    if(showTemplates) Object.assign(out, this.templatesView());
    if(showFiles) Object.assign(out, this.filesView());
    if(showEffort) Object.assign(out, this.effortView());
    if(showIdeas) Object.assign(out, this.ideasView());
    if(showContent) Object.assign(out, this.contentView());

    return out;
  }

  dashTitle(b){ return ({exec:'Executive Dashboard',ops:'Operations Dashboard',manager:'Department Dashboard',lead:'Team Dashboard',senior:'My Workspace',junior:'My Workspace',qc:'QC Dashboard',admin:'Platform Dashboard'})[b]; }
  dashSub(b){ return ({exec:'Company-wide performance and strategic health.',ops:'Delivery, capacity and resource utilization.',manager:'Your department’s projects, campaigns and KPIs.',lead:'Your team’s workload, progress and quality.',senior:'Your assigned work, deliverables and KPIs.',junior:'Your assigned tasks and deadlines only.',qc:'Items awaiting review and quality metrics.',admin:'System health, users and configuration.'})[b]; }

  // Read-only "My Profile" — the account details for whoever is currently
  // logged in. Prefers the real Supabase profile (has every column,
  // including the extended User Master fields); falls back to the matching
  // entry in the team list for a role persona without a linked account.
  myProfileData(rk, role){
    const authP = this.state.authProfile;
    const match = authP || (this.state.users||[]).find(u=>u.name===role.person) || {};
    const name = match.full_name||match.name||role.person;
    const roleLabel = this.ROLES[rk].label;
    const fields = [
      ['Full name', name],
      ['Email', match.email||'—'],
      ['Mobile', match.mobile||'—'],
      ['Department', match.department||match.dept||'—'],
      ['Designation', match.designation||role.tag||'—'],
      ['Team', match.team||'—'],
      ['Reporting manager', match.reporting_manager||match.reportingManager||'—'],
      ['Team lead', match.team_lead||match.teamLead||'—'],
      ['Office location', match.office_location||match.officeLocation||'—'],
      ['Role', roleLabel],
      ['Employment type', match.employment_type||match.employmentType||'Full-time'],
      ['Joining date', match.joining_date||match.joiningDate||'—'],
      ['Status', match.status||'Active'],
    ];
    return {
      pfName:name, pfRoleLabel:roleLabel, pfColor:role.color,
      pfShort:(name||'?').trim().split(/\s+/).map(w=>w[0]).slice(0,2).join('').toUpperCase(),
      pfFields:fields.map(([k,v])=>({k,v})),
    };
  }
  dashData(rk, role){
    const b = role.bucket;
    const K = (label,value,delta,tone,icon)=>({label,value,delta,icon,
      iconBg:{ok:'var(--verify-100)',warn:'var(--warn-100)',info:'var(--info-100)',brand:'var(--orchid-100)'}[tone],
      iconColor:{ok:'var(--verify-600)',warn:'var(--warn-600)',info:'var(--info-600)',brand:'var(--orchid-600)'}[tone],
      deltaColor: delta.startsWith('-')?'var(--danger-600)':'var(--verify-600)',
      deltaIcon: delta.startsWith('-')?'trending-down':'trending-up' });
    const KPI = {
      exec:[K('Revenue (QTD)','₹4.8Cr','+12.4%','ok','indian-rupee'),K('Active projects','38','+5','info','folder-kanban'),K('On-time delivery','91%','+3%','ok','check-circle-2'),K('NPS','62','+8','brand','heart')],
      ops:[K('Capacity utilization','84%','+2%','info','gauge'),K('Active campaigns','27','+4','brand','megaphone'),K('SLA breaches','3','-2','ok','alarm-clock'),K('Team allocation','96%','+1%','ok','users')],
      manager:[K('Dept projects','14','+2','info','folder-kanban'),K('Campaigns live','9','+1','brand','megaphone'),K('KPI attainment','88%','+4%','ok','target'),K('Team members','12','0','info','users')],
      lead:[K('Team tasks','32','+6','info','list-checks'),K('Awaiting QC','5','-1','warn','shield-check'),K('Team on-time','93%','+2%','ok','check-circle-2'),K('Workload balance','Healthy','','ok','gauge')],
      senior:[K('My open tasks','7','-2','info','list-checks'),K('Due this week','3','0','warn','calendar-clock'),K('Approved','24','+5','ok','check-circle-2'),K('My KPI score','92%','+3%','ok','target')],
      junior:[K('My tasks','4','-1','info','list-checks'),K('Due today','1','0','warn','calendar-clock'),K('Completed','18','+3','ok','check-circle-2'),K('QC comments','2','','brand','message-square')],
      qc:[K('Awaiting review','5','+2','warn','clock'),K('Approved today','8','+3','ok','check-circle-2'),K('Rework raised','2','0','warn','rotate-ccw'),K('Rejection rate','7%','-2%','ok','x-circle')],
      admin:[K('Total users','48','+3','info','users'),K('Active sessions','21','','brand','activity'),K('Masters','36','','info','boxes'),K('Integrations','6','+1','ok','plug')],
    };
    const rowsMap = {
      exec:[['CEO strategy review','Q3 board deck · Leadership','On track','ok','target'],['Food Research Lab retainer','Renewal · ₹18L','Won','ok','folder-kanban'],['Nutraceutical vertical launch','Cross-department','At risk','warn','alert-triangle'],['Pubrica SEO program','12-month · SEO','On track','ok','search']],
      manager:[['On-page SEO — Tutors India','Aditi Rao · due Fri','In progress','info','search'],['Content calendar — Pepcreations','Karan Shah · due Mon','Review','warn','file-text'],['Reel series — Statswork','Design team','In progress','info','clapperboard'],['Backlink outreach — Pubrica','SEO team','Planned','info','link']],
      lead:[['Keyword research — Tech vertical','Sameer Iyer','In progress','info','search'],['Broken link fixes — Pubrica','Neha Verma','Awaiting QC','warn','link'],['On-page — Statswork','Sameer Iyer','In progress','info','file-text'],['Local SEO — Food Research Lab','Neha Verma','Planned','info','map-pin']],
      senior:[['Keyword research — Tech vertical','Client A · due Jan 20','In progress','info','search'],['SEO audit — E-commerce','Client C · due Jan 18','Review','warn','file-check'],['On-page — Statswork','Client B','In progress','info','file-text']],
      junior:[['Update meta descriptions — 12 pages','Due today','In progress','warn','file-text'],['Fix broken links — Pubrica','Due Jan 22','Assigned','info','link'],['Add alt text — blog images','Due Jan 24','Assigned','info','image']],
      admin:[['New user: Neha Verma','Pending invitation','Action','warn','user-plus'],['Semrush integration','Connected','Active','ok','plug'],['Role Master updated','by Meera Krishnan','Logged','info','shield'],['Nightly backup','02:00 IST','Success','ok','database']],
    };
    const rowsKey = ({ops:'exec',qc:'lead'})[b] || b;
    const rows = (rowsMap[rowsKey]||rowsMap.manager).map(r=>({
      title:r[0], sub:r[1], tag:r[2], icon:r[4],
      iconBg:'var(--surface-50)', iconColor:'var(--orchid-600)',
      tagBg:{ok:'var(--verify-100)',warn:'var(--warn-100)',info:'var(--info-100)'}[r[3]],
      tagColor:{ok:'var(--verify-600)',warn:'var(--warn-600)',info:'var(--info-600)'}[r[3]],
    }));
    const panelTitle = {exec:'Strategic initiatives',ops:'Delivery pipeline',manager:'Department work',lead:'Team tasks',senior:'My tasks',junior:'My tasks today',qc:'Recent reviews',admin:'System activity'}[b];

    // scope box + access summary
    const scopeMap = {
      exec:{eyebrow:'Company scope',big:'All',sub:'Full visibility, no editing',note:'You see everything across the company but do not edit masters, assign tasks, or perform QC — strategy only.'},
      ops:{eyebrow:'Operational scope',big:'All ops',sub:'Delivery & resource planning',note:'Full operational visibility. You cannot edit system masters, KPI definitions or security settings.'},
      manager:{eyebrow:'Department scope',big:'Marketing',sub:'Own department only',note:'You create projects, campaigns and OKRs and review KPIs — but you cannot edit masters or change roles.'},
      lead:{eyebrow:'Team scope',big:'SEO team',sub:'Your team only',note:'You assign tasks and QC within your function. You cannot create projects, OKRs or edit configuration.'},
      senior:{eyebrow:'Personal scope',big:'My work',sub:'Assigned tasks only',note:'You complete and update your assigned work and view your own KPIs. You cannot assign tasks or edit masters.'},
      junior:{eyebrow:'Personal scope',big:'My tasks',sub:'Assigned only',note:'You see only your own assigned tasks and deadlines. Analytics, competitor data and company dashboards are hidden.'},
      qc:{eyebrow:'Quality scope',big:'QC only',sub:'Independent review',note:'You approve, reject or request rework and view Gold Standards. You cannot modify task content or masters.'},
      admin:{eyebrow:'Platform scope',big:'Full',sub:'Configuration & security',note:'You manage users, masters, roles and integrations — but business decisions like OKRs and campaign approvals belong to leadership.'},
    };
    const scopeBox = scopeMap[b];
    const modsFor = ['dashboard','campaigns','tasks','qc','analytics','masters'];
    const accessSummary = modsFor.map(m=>{
      const l = (this.ACCESS[m]&&this.ACCESS[m][rk]) || 'No access';
      const t = l==='No access' ? {bg:'var(--danger-100)',color:'var(--danger-600)'} : this.levelTone(l);
      return { mod:(this.MODMETA[m]&&this.MODMETA[m].label)||m, level:l, bg:t.bg, color:t.color };
    });

    // "Needs attention" tiles — computed live from Tasks/OKRs, which already
    // exist. SOPs/Support/Leads-dependent stats show 0 until those modules
    // are built (SOPs and Support aren't implemented yet; the Leads/CRM
    // pipeline panel below is hidden entirely rather than shown empty).
    const X=(label,value,sub,color)=>({label,value,sub,color});
    const tasks=this.allTasks(), me=this.currentPerson();
    const mineT=tasks.filter(t=>t.assignee===me);
    const overdue=(list)=>list.filter(t=>{ const d=this.dayDiff(t); return d!==null&&d<0&&!['Approved','Closed'].includes(t.status); }).length;
    const okrs=this.allOkrs();
    const atRisk=okrs.filter(o=>this.okrHealth(o).label!=='On Track'&&o.status!=='Completed').length;
    const sopOverdue=0, sopUnack=0; // SOPs module not built yet
    const tOpen=0, tUnassigned=0; // Support module not built yet
    const inQC=tasks.filter(t=>t.status==='Submitted').length;
    const rework=tasks.filter(t=>t.status==='Rework').length;
    const overCap=(this.state.users||[]).filter(u=>{ const wk=this.weeklyCapacity(u.name);
      const open=tasks.filter(t=>t.assignee===u.name&&!['Approved','Closed'].includes(t.status));
      return open.reduce((s,t)=>s+(parseFloat(t.estH)||0),0)>wk; }).length;
    const EXTRA={
      exec:[X('OKRs at risk',String(atRisk),'need leadership attention',atRisk?'var(--danger-600)':'var(--verify-600)'),
        X('Avg OKR progress',(okrs.length?Math.round(okrs.reduce((s,o)=>s+o.progress,0)/okrs.length):0)+'%','across '+okrs.length+' objectives','var(--beet-700)'),
        X('Awaiting QC',String(inQC),'deliverables in review','var(--info-600)'),
        X('Overdue tasks',String(overdue(tasks)),'past due date',overdue(tasks)?'var(--danger-600)':'var(--verify-600)')],
      ops:[X('Over capacity',String(overCap),'people beyond shift hours',overCap?'var(--danger-600)':'var(--verify-600)'),
        X('Rework queue',String(rework),'sent back by QC',rework?'var(--warn-600)':'var(--verify-600)'),
        X('Open tickets',String(tOpen),tUnassigned+' unassigned','var(--info-600)'),
        X('Overdue tasks',String(overdue(tasks)),'past due date',overdue(tasks)?'var(--danger-600)':'var(--verify-600)')],
      manager:[X('Awaiting QC',String(inQC),'in the review queue','var(--info-600)'),
        X('Rework',String(rework),'needs correction',rework?'var(--warn-600)':'var(--verify-600)'),
        X('OKRs at risk',String(atRisk),'in your scope',atRisk?'var(--danger-600)':'var(--verify-600)'),
        X('SOPs overdue review',String(sopOverdue),'governance debt',sopOverdue?'var(--danger-600)':'var(--verify-600)')],
      lead:[X('Awaiting QC',String(inQC),'from your team','var(--info-600)'),
        X('Rework',String(rework),'to reassign',rework?'var(--warn-600)':'var(--verify-600)'),
        X('Overdue in team',String(overdue(tasks)),'past due date',overdue(tasks)?'var(--danger-600)':'var(--verify-600)'),
        X('Over capacity',String(overCap),'people to rebalance',overCap?'var(--warn-600)':'var(--verify-600)')],
      senior:[X('My overdue',String(overdue(mineT)),'clear these first',overdue(mineT)?'var(--danger-600)':'var(--verify-600)'),
        X('In QC',String(mineT.filter(t=>t.status==='Submitted').length),'awaiting review','var(--info-600)'),
        X('My rework',String(mineT.filter(t=>t.status==='Rework').length),'QC comments to address',mineT.filter(t=>t.status==='Rework').length?'var(--warn-600)':'var(--verify-600)'),
        X('SOPs to acknowledge',String(sopUnack),'read and sign off',sopUnack?'var(--warn-600)':'var(--verify-600)')],
      junior:[X('My overdue',String(overdue(mineT)),'blocks today’s work',overdue(mineT)?'var(--danger-600)':'var(--verify-600)'),
        X('In QC',String(mineT.filter(t=>t.status==='Submitted').length),'awaiting review','var(--info-600)'),
        X('My rework',String(mineT.filter(t=>t.status==='Rework').length),'fix and resubmit',mineT.filter(t=>t.status==='Rework').length?'var(--warn-600)':'var(--verify-600)'),
        X('SOPs to acknowledge',String(sopUnack),'read and sign off',sopUnack?'var(--warn-600)':'var(--verify-600)')],
      qc:[X('In my queue',String(inQC),'submitted for review','var(--info-600)'),
        X('Rework raised',String(rework),'awaiting the doer',rework?'var(--warn-600)':'var(--verify-600)'),
        X('Overdue submissions',String(overdue(tasks)),'past due date',overdue(tasks)?'var(--danger-600)':'var(--verify-600)'),
        X('SOPs to acknowledge',String(sopUnack),'standards you review against',sopUnack?'var(--warn-600)':'var(--verify-600)')],
      admin:[X('Over capacity',String(overCap),'users beyond shift hours',overCap?'var(--danger-600)':'var(--verify-600)'),
        X('Open tickets',String(tOpen),tUnassigned+' need triage','var(--info-600)'),
        X('SOPs overdue review',String(sopOverdue),'governance debt',sopOverdue?'var(--danger-600)':'var(--verify-600)'),
        X('Rework queue',String(rework),'quality returns',rework?'var(--warn-600)':'var(--verify-600)')],
    };

    return { kpis:KPI[b]||KPI.manager, dashExtras:EXTRA[b]||EXTRA.manager,
      dashExtrasLabel:'Needs attention · '+role.label+' scope',
      dashRows:rows, dashPanelTitle:panelTitle, scopeBox, accessSummary, dashHasLeads:false };
  }

  qcData(rk){
    const canAct = ['qc','team_lead','manager','admin'].includes(rk);
    const K=(label,value,color)=>({label,value,iconColor:color});
    const fb=this.state.qcFb||{};
    const pri=(p)=>({Critical:'var(--danger-500)',High:'var(--warn-500)',Medium:'var(--verify-500)',Low:'var(--info-500)'}[p]||'var(--ink-400)');
    const order={Submitted:0,Rework:1,Approved:2};
    const list=this.allTasks().filter(t=>['Submitted','Rework','Approved'].includes(t.status)).sort((a,b)=>order[a.status]-order[b.status]);
    const qcRows=list.map(t=>{ const tn=this.tkTone(t.status); return {
      id:t.id, name:t.name, kpi:t.kpi, contribution:'+'+t.units+' '+t.unit, effortPlan:t.effortPlan||'', hasEffort:!!t.effortPlan,
      module:'Task', moduleBg:'var(--info-100)', moduleColor:'var(--info-600)',
      project:t.project, priority:t.priority, priDot:pri(t.priority), assignee:t.assignee, dates:t.start+' → '+t.end, dueAlert:this.tkDueAlert(t),
      status:t.status==='Submitted'?'Awaiting QC':t.status, statusBg:tn.bg, statusColor:tn.c,
      open:()=>this.setState({ tkOpen:t.id }),
      // comments are captured inside the review drawer — the list only reflects them
      ...(()=>{ const d=this.qcCommentDigest(t);
        return { qcHasComments:d.lines.length>0||!!d.overall,
          qcVerdictLine:d.verdictLabel,
          qcHasVerdicts:d.reviewed>0,
          qcOverall:d.overall,
          qcHasOverall:!!d.overall,
          qcLineComments:d.lines.slice(0,3).map(l=>({ kpi:l.kpi, text:l.text, verdict:l.verdict,
            bg:l.verdict==='Compliant'?'var(--verify-100)':l.verdict==='Rework'?'var(--danger-100)':'var(--warn-100)',
            color:l.verdict==='Compliant'?'var(--verify-600)':l.verdict==='Rework'?'var(--danger-600)':'var(--warn-600)' })),
          qcMoreComments:d.lines.length>3?('+'+(d.lines.length-3)+' more line comments'):'',
          qcNoComments:!d.hasAny,
          qcReviewLabel:t.status==='Submitted'?'Review & comment':'Open review',
          qcReviewStyle:'display:inline-flex;align-items:center;gap:5px;padding:7px 12px;border-radius:9px;font-size:11.5px;font-weight:700;cursor:pointer;'+(t.status==='Submitted'
            ?'border:none;background:#7A1C46;color:#fff':'border:1px solid var(--line-300);background:#fff;color:var(--ink-700)') }; })(),
      actionable: canAct && t.status==='Submitted',
      reviewed: t.status!=='Submitted',
      feedback: t.qcFeedback||'No QC comment recorded.',
      feedbackColor: t.status==='Rework'?'var(--danger-600)':'var(--verify-600)',
      fbVal:fb[t.id]||'', onFb:(e)=>this.setState({ qcFb:{...this.state.qcFb,[t.id]:e.target.value} }),
      stopClick:(e)=>e.stopPropagation(),
      approve:(e)=>{ if(e)e.stopPropagation(); const note=(this.state.qcFb||{})[t.id]||''; this.tkPatch(t.id,{status:'Approved', qcFeedback:note?('QC approved — '+note):'QC approved'},'QC approved'+(note?' — '+note:'')+' · counted toward KPI'); this.flash('Task approved · +'+t.units+' '+t.unit+' → '+t.kpi+'.'); },
      rework:(e)=>{ if(e)e.stopPropagation(); const note=(this.state.qcFb||{})[t.id]||''; if(!note.trim()){ this.flash('Enter QC feedback before requesting rework.'); return; } this.tkPatch(t.id,{status:'Rework', qcFeedback:'Rework — '+note},'Rework requested — '+note); this.flash('Rework requested — feedback sent to '+t.assignee+'.'); },
    };});
    // content ideas awaiting QC approval
    const ideaRows=this.allIdeas().filter(i=>i.status==='Submitted for QC').map(i=>{ return {
      id:i.id, name:i.title, kpi:i.type, contribution:i.keyword||'—', effortPlan:i.effortPlan||'', hasEffort:!!i.effortPlan,
      module:'Content Idea', moduleBg:'var(--warn-100)', moduleColor:'var(--warn-600)',
      project:i.service, priority:i.priority, priDot:{Critical:'var(--danger-500)',High:'var(--warn-500)',Medium:'var(--verify-500)',Low:'var(--info-500)'}[i.priority]||'var(--ink-400)',
      assignee:i.owner, dates:'Publish · '+i.publishMonth, dueAlert:null,
      status:'Awaiting QC', statusBg:'var(--orchid-100)', statusColor:'var(--orchid-700)',
      open:()=>this.setState({ ideaOpen:i.id }),
      actionable:canAct, reviewed:false, feedback:'',
      fbVal:fb[i.id]||'', onFb:(e)=>this.setState({ qcFb:{...this.state.qcFb,[i.id]:e.target.value} }),
      stopClick:(e)=>e.stopPropagation(),
      approve:(e)=>{ if(e)e.stopPropagation(); const note=(this.state.qcFb||{})[i.id]||''; this.ideaPatch(i.id,{status:'Approved', qcFeedback:note?('QC approved — '+note):'QC approved'}); this.flash(i.id+' approved — it can now be moved to Tasks from the Content repository.'); },
      rework:(e)=>{ if(e)e.stopPropagation(); const note=(this.state.qcFb||{})[i.id]||''; if(!note.trim()){ this.flash('Enter QC feedback before requesting rework.'); return; } this.ideaPatch(i.id,{status:'Rework', qcFeedback:'Rework — '+note}); this.flash('Rework requested — feedback sent to '+i.owner+'.'); },
    };});
    const kpis=[K('Awaiting review',String(list.filter(t=>t.status==='Submitted').length+ideaRows.length),'var(--warn-600)'),K('Tasks approved',String(list.filter(t=>['Approved','Closed'].includes(t.status)).length),'var(--verify-600)'),K('Rework open',String(list.filter(t=>t.status==='Rework').length),'var(--warn-600)'),K('Content ideas in queue',String(ideaRows.length),'var(--orchid-600)')];
    const sf=this.state.qcStatusF||'All';
    // day classification for tasks in queue (by due date)
    const dayKey=(t)=>{ const df=this.dayDiff(t); if(df===null) return '—'; if(df<0) return 'Overdue'; if(df===0) return 'Today'; if(df===1) return 'Tomorrow'; if(df===2) return 'Day after'; return 'Later'; };
    qcRows.forEach((r,ix)=>{ r.day=dayKey(list[ix]); });
    ideaRows.forEach(r=>{ r.day='—'; });
    const merged=ideaRows.concat(qcRows);
    const df2=this.state.qcDayF||'All';
    const dayCount=(d)=>merged.filter(r=>r.day===d).length;
    const qcDayChips=['All','Overdue','Today','Tomorrow','Day after','Later'].map(d=>{ const active=df2===d; const n=d==='All'?merged.length:dayCount(d);
      return { label:d, count:String(n), active,
        style:'display:flex;align-items:center;gap:6px;padding:6px 12px;border-radius:999px;font-size:12px;font-weight:700;cursor:pointer;border:1px solid '+(active?'var(--beet-700)':(d==='Overdue'&&n>0?'#F1C9CF':'var(--line-300)'))+';background:'+(active?'var(--beet-700)':'#fff')+';color:'+(active?'#fff':(d==='Overdue'&&n>0?'var(--danger-600)':'var(--ink-700)')),
        countStyle:'font-size:10.5px;font-weight:800;padding:1px 7px;border-radius:999px;background:'+(active?'rgba(255,255,255,.2)':'var(--orchid-100)')+';color:'+(active?'#fff':'var(--orchid-700)'),
        set:()=>this.setState({ qcDayF:d, pg:{...(this.state.pg||{}),qc:0} }) }; });
    let filtered=sf==='All'?merged:merged.filter(r=>r.status===(sf==='Submitted'?'Awaiting QC':sf) || r.status===sf);
    if(df2!=='All') filtered=filtered.filter(r=>r.day===df2);
    const pg=this.pgData('qc',filtered,6);
    // analytics — across ALL users' tasks, filterable Weekly / Monthly
    const period=this.state.qcPeriod||'Weekly';
    const win=period==='Weekly'?7:31;
    const allT=this.allTasks().filter(t=>{ const df=this.dayDiff(t); return df===null?true:Math.abs(df)<=win; });
    const wkAssigned=allT.length, wkDone=allT.filter(t=>['Approved','Closed'].includes(t.status)).length, wkPending=allT.filter(t=>['Assigned','In Progress','Submitted'].includes(t.status)).length, wkRework=allT.filter(t=>t.status==='Rework').length;
    const pct=(n)=>wkAssigned?Math.round(n/wkAssigned*100):0;
    const pLbl=period==='Weekly'?'this week':'this month';
    const qcWeek=[
      {label:'Assigned '+pLbl+' — all users', value:String(wkAssigned), pctW:'100%', color:'var(--info-500)', pct:'every assignee, every division'},
      {label:'Completed (QC-approved)', value:String(wkDone), pctW:pct(wkDone)+'%', color:'var(--verify-500)', pct:pct(wkDone)+'% of assigned'},
      {label:'Pending (open / awaiting QC)', value:String(wkPending), pctW:pct(wkPending)+'%', color:'var(--warn-500)', pct:pct(wkPending)+'% of assigned'},
      {label:'Rework requested', value:String(wkRework), pctW:pct(wkRework)+'%', color:'var(--danger-500)', pct:pct(wkRework)+'% of assigned'},
    ];
    const qcPeriodBtns=['Weekly','Monthly'].map(p=>{ const active=period===p; return { label:p+' report', active,
      style:'padding:6px 13px;border-radius:999px;font-size:12px;font-weight:700;cursor:pointer;border:1px solid '+(active?'var(--beet-700)':'var(--line-300)')+';background:'+(active?'var(--beet-700)':'#fff')+';color:'+(active?'#fff':'var(--ink-700)'),
      set:()=>this.setState({ qcPeriod:p }) }; });
    const cs=this.complianceStats(list);
    return { kpis, qcRows:pg.rows, qcPg:pg, qcCanAct:canAct, qcDayChips, qcWeek, qcPeriodBtns, qcPeriodLabel:'Task analytics — all users · '+period.toLowerCase()+' report',
      qcCompliance:[
        { label:'Self-assessment pass', value:cs.selfPct+'%', sub:cs.meets+' of '+cs.scored+' checks meet gold standard', color:cs.selfPct>=80?'var(--verify-600)':cs.selfPct>=50?'var(--warn-600)':'var(--danger-600)' },
        { label:'QC first-pass', value:cs.firstPassPct+'%', sub:cs.compliant+' compliant of '+cs.reviewed+' reviewed', color:cs.firstPassPct>=80?'var(--verify-600)':'var(--warn-600)' },
        { label:'Rework rate', value:cs.reworkPct+'%', sub:cs.rework+' lines sent back', color:cs.reworkPct<=10?'var(--verify-600)':'var(--danger-600)' },
        { label:'Conditional accepts', value:String(cs.conditional), sub:'passed with caveats', color:'var(--warn-600)' },
        { label:'Evidence attached', value:cs.evidencePct+'%', sub:cs.evidence+' of '+cs.scored+' scored checks', color:cs.evidencePct>=90?'var(--verify-600)':'var(--warn-600)' },
        { label:'Checklists submitted', value:String(cs.submitted), sub:'of '+list.length+' tasks in queue', color:'var(--beet-700)' },
      ],
      qcComplianceDiv:cs.byDiv.map(d=>({ label:d.label,
        selfPct:d.selfPct+'%', w:d.selfPct+'%',
        color:d.selfPct>=80?'var(--verify-500)':d.selfPct>=50?'var(--warn-500)':'var(--danger-500)',
        sub:d.scored+' checks scored · '+d.reviewed+' reviewed · '+d.reworkPct+'% rework' })),
      qcComplianceHas:cs.scored>0||cs.reviewed>0,
      qcComplianceEmpty:cs.scored===0&&cs.reviewed===0,
      qcStatusF:sf, qcOnStatusF:(e)=>this.setState({ qcStatusF:e.target.value, pg:{...(this.state.pg||{}),qc:0} }),
      qcStatusOptions:['All','Awaiting QC','Approved','Rework'] };
  }
  qcAct(id,status,tone,msg){
    this.setState({ qcQueue:this.state.qcQueue.map(q=>q.id===id?{...q,status,statusTone:tone,done:true}:q) });
    this.flash(msg);
  }

  // Simplified from source: no live start/stop stopwatch feature is ported,
  // so "hours logged" reads the task's recorded actual hours directly rather
  // than a running timer session on top of a base value.
  hrsOf(t){ return parseFloat(t.actH)||0; }
  dashboardsView(rk, role){
    const b=role.bucket;
    const may={ exec:['exec','capacity','dept','team'], ops:['exec','capacity','dept','team'], admin:['exec','capacity','dept','team'],
      manager:['dept','team','capacity'], lead:['team'], senior:[], junior:[], qc:[] }[b]||[];
    if(!may.length) return { dbHasBoards:false };
    const cur=may.includes(this.state.dbTab)?this.state.dbTab:may[0];
    const META={ exec:{label:'Executive',icon:'crown'}, capacity:{label:'Resource & Capacity',icon:'users'}, dept:{label:'Department',icon:'building-2'}, team:{label:'Team',icon:'user-check'} };
    const seg=(on)=>'display:flex;align-items:center;gap:7px;padding:8px 15px;border:none;border-radius:9px;font-size:13px;font-weight:700;cursor:pointer;'+(on?'background:#fff;color:var(--beet-700);box-shadow:var(--shadow-sm)':'background:none;color:var(--ink-500)');
    const tasks=this.allTasks(), okrs=this.allOkrs(), camps=this.allCampaigns(), plans2=this.allEpPlans();
    const hrsOf=(t)=>this.hrsOf(t);
    const KP=(label,value,sub,color)=>({label,value,sub,color});
    const done=tasks.filter(t=>['Approved','Closed'].includes(t.status)).length;
    const open=tasks.filter(t=>['Assigned','In Progress','Submitted'].includes(t.status)).length;
    const rework=tasks.filter(t=>t.status==='Rework').length;
    const avgOkr=okrs.length?Math.round(okrs.reduce((s,o)=>s+o.progress,0)/okrs.length):0;
    const atRisk=okrs.filter(o=>this.okrHealth(o).label!=='On Track'&&o.status!=='Completed').length;
    const totBudget=camps.reduce((s,c)=>s+this.cmpNum(c.budget),0), totSpend=camps.reduce((s,c)=>s+this.cmpNum(c.spend),0);
    const people=[...new Set(tasks.map(t=>t.assignee))];
    const capRows=people.map(p=>{ const mine=tasks.filter(t=>t.assignee===p);
      const CAP=this.weeklyCapacity(p)||40;
      const open=mine.filter(t=>!['Approved','Closed'].includes(t.status));
      const act=mine.reduce((s,t)=>s+hrsOf(t),0), est=open.reduce((s,t)=>s+(parseFloat(t.estH)||0),0);
      const util=Math.round(est/CAP*100);
      const free=Math.round((CAP-est)*10)/10;
      return { label:p, tasks:open.length+' open task'+(open.length===1?'':'s'),
        shift:this.shiftLabel(p),
        est:est.toFixed(1)+' h assigned', act:Math.round(act*10)/10+' h logged',
        capLabel:CAP+' h/week capacity',
        freeLabel:free>=0?(free.toFixed(1)+' h free'):(Math.abs(free).toFixed(1)+' h over'),
        freeColor:free>=0?'var(--verify-600)':'var(--danger-600)',
        util:util+'%', w:Math.min(100,util)+'%',
        color:util>100?'var(--danger-500)':util>=85?'var(--warn-500)':util>=40?'var(--verify-500)':'var(--info-500)',
        state:util>100?'Overloaded':util>=85?'Fully booked':util>=40?'Balanced':'Underloaded',
        stateBg:util>100?'var(--danger-100)':util>=85?'var(--warn-100)':util>=40?'var(--verify-100)':'var(--info-100)',
        stateColor:util>100?'var(--danger-600)':util>=85?'var(--warn-600)':util>=40?'var(--verify-600)':'var(--info-600)' }; })
      .sort((a,b2)=>parseInt(b2.util)-parseInt(a.util));
    const divs=[...new Set(tasks.map(t=>this.tkDivision(t)))];
    const deptRows=divs.map(d=>{ const mine=tasks.filter(t=>this.tkDivision(t)===d);
      const ok=mine.filter(t=>['Approved','Closed'].includes(t.status)).length;
      const dOkrs=okrs.filter(o=>this.deptKey(o.dept)===this.deptKey(d));
      const prog=dOkrs.length?Math.round(dOkrs.reduce((s,o)=>s+o.progress,0)/dOkrs.length):0;
      return { label:this.deptLabel(d), tasks:mine.length+' tasks', done:ok+' approved', okrs:dOkrs.length+' OKRs',
        pct:prog+'%', w:prog+'%', color:prog>=70?'var(--verify-500)':prog>=40?'var(--warn-500)':'var(--danger-500)',
        completion:mine.length?Math.round(ok/mine.length*100)+'% task completion':'no tasks' }; });
    const TF=this.state.dbTeamF||{ period:'This month', from:'', to:'', division:'All' };
    const setTF=(k)=>(e)=>this.setState({ dbTeamF:{...TF,[k]:e.target.value} });
    const winOf={ 'This week':7, 'Bi-monthly':14, 'This month':31, 'This quarter':92, 'This year':366, 'All time':99999 }[TF.period]||31;
    const inRange=(t)=>{
      if(TF.from||TF.to){ const iso=this.isoDate(t.end)||this.isoDate(t.start); if(!iso) return true;
        if(TF.from&&iso<TF.from) return false; if(TF.to&&iso>TF.to) return false; return true; }
      const df=this.dayDiff(t); return df===null?true:Math.abs(df)<=winOf;
    };
    const teamTasks=tasks.filter(t=>inRange(t)&&(TF.division==='All'||this.tkDivision(t)===TF.division));
    const teamPeople=[...new Set(teamTasks.map(t=>t.assignee))];
    const teamRows=teamPeople.map(p=>{ const mine=teamTasks.filter(t=>t.assignee===p);
      const ok=mine.filter(t=>['Approved','Closed'].includes(t.status)).length, rw=mine.filter(t=>t.status==='Rework').length;
      const late=mine.filter(t=>{ const df=this.dayDiff(t); return df!==null&&df<0&&!['Approved','Closed'].includes(t.status); }).length;
      const q=mine.length?Math.round((ok/(mine.length))*100):0;
      const effRows=[]; plans2.forEach(pl=>(pl.rows||[]).forEach(r=>{ if(String(r.assignee||'')===p) effRows.push({pl,r}); }));
      const effAssigned=effRows.reduce((s,x)=>s+(parseInt(x.r.monthly,10)||0),0);
      const effCreated=mine.filter(t=>t.effortPlan).length;
      const kpiMap={};
      mine.forEach(t=>{ if(!t.kpi) return; kpiMap[t.kpi]=kpiMap[t.kpi]||{target:0,ach:0,n:0,unit:t.unit||''};
        kpiMap[t.kpi].target+=parseInt(t.units,10)||0; kpiMap[t.kpi].n++;
        if(['Approved','Closed'].includes(t.status)) kpiMap[t.kpi].ach+=parseInt(t.units,10)||0; });
      const kpiRows=Object.entries(kpiMap).map(([k,v])=>({ kpi:k,
        target:v.target+' '+v.unit, ach:v.ach+' '+v.unit,
        pct:(v.target?Math.round(v.ach/v.target*100):0)+'%', w:Math.min(100,v.target?Math.round(v.ach/v.target*100):0)+'%',
        color:(v.target&&v.ach/v.target>=0.7)?'var(--verify-500)':(v.target&&v.ach/v.target>=0.4)?'var(--warn-500)':'var(--danger-500)' }));
      const typeMap={}; mine.forEach(t=>{ const d=this.tkDivision(t); typeMap[d]=(typeMap[d]||0)+1; });
      const expanded=(this.state.dbTeamOpen||[]).includes(p);
      return { label:p, initials:p.split(' ').map(x=>x[0]).join('').slice(0,2), tasks:String(mine.length), done:String(ok), rework:String(rw), late:String(late),
        pct:q+'%', w:q+'%', color:q>=70?'var(--verify-500)':q>=40?'var(--warn-500)':'var(--danger-500)',
        flagBg:late>0?'var(--danger-100)':'var(--verify-100)', flagColor:late>0?'var(--danger-600)':'var(--verify-600)',
        flag:late>0?(late+' overdue'):'On schedule',
        hours:Math.round(mine.reduce((s,t)=>s+hrsOf(t),0)*10)/10+' h logged',
        effAssignedLabel:effAssigned?(effAssigned.toLocaleString('en-IN')+' units planned'):'No effort assigned',
        effCreatedLabel:effCreated+' task'+(effCreated===1?'':'s')+' generated from effort',
        effPlans:effRows.slice(0,6).map(x=>({ name:x.r.type, plan:x.pl.name, qty:(x.r.monthly||0)+' '+x.r.unit,
          open:()=>this.setState({ route:'effort', epView:'detail', epPlanId:x.pl.id }) })),
        hasEffPlans:effRows.length>0,
        kpiRows, hasKpis:kpiRows.length>0,
        typeRows:Object.entries(typeMap).map(([d,n])=>({ label:d, n:String(n),
          bg:this.tkDivTone(d).bg, color:this.tkDivTone(d).c })),
        taskRows:mine.slice(0,8).map(t=>{ const tt=this.tkTone(t.status);
          return { id:t.id, name:t.name, type:this.tkDivision(t), dates:t.start+' → '+t.end,
            status:t.status, bg:tt.bg, color:tt.c, open:()=>this.setState({ route:'tasks', tkOpen:t.id }) }; }),
        taskMore:mine.length>8?('+'+(mine.length-8)+' more tasks'):'',
        expanded, toggleLabel:expanded?'Hide detail':'Effort · KPI · tasks',
        toggle:()=>{ const cur=this.state.dbTeamOpen||[];
          this.setState({ dbTeamOpen:cur.includes(p)?cur.filter(x=>x!==p):[...cur,p] }); } }; })
      .sort((a,b2)=>parseInt(b2.pct)-parseInt(a.pct));
    return {
      dbHasBoards:true,
      dbTabs:may.map(k=>({ label:META[k].label, icon:META[k].icon, style:seg(cur===k), go:()=>this.setState({ dbTab:k }) })),
      dbIsExec:cur==='exec', dbIsCapacity:cur==='capacity', dbIsDept:cur==='dept', dbIsTeam:cur==='team',
      dbTitle:META[cur].label+' dashboard',
      dbSub:{ exec:'Company-wide performance — OKRs, campaigns, delivery and spend.',
        capacity:'Workload and utilisation across the team — who is over or under capacity.',
        dept:'Department-level delivery and objective progress.',
        team:'Individual scorecards — throughput, quality and schedule adherence.' }[cur],
      dbExecKpis:[KP('Avg OKR progress',avgOkr+'%','across '+okrs.length+' objectives','var(--beet-700)'),
        KP('OKRs at risk',String(atRisk),'need leadership attention',atRisk?'var(--danger-600)':'var(--verify-600)'),
        KP('Live campaigns',String(camps.filter(c=>c.status==='Live').length),'of '+camps.length+' total','var(--orchid-600)'),
        KP('Task completion',(tasks.length?Math.round(done/tasks.length*100):0)+'%',done+' of '+tasks.length+' approved','var(--verify-600)'),
        KP('Budget committed','₹'+(Math.round(totSpend/1000))+'K','of ₹'+(Math.round(totBudget/1000))+'K planned','var(--info-600)')],
      dbExecOkrs:okrs.map(o=>({ label:o.title, sub:o.dept+' · '+o.cycle+' · '+o.owner, pct:o.progress+'%', w:o.progress+'%',
        color:o.progress>=70?'var(--verify-500)':o.progress>=40?'var(--warn-500)':'var(--danger-500)',
        health:this.okrHealth(o).label, healthBg:this.okrHealth(o).bg, healthColor:this.okrHealth(o).color,
        open:()=>this.setState({ route:'okr', okrOpen:o.id }) })),
      dbExecCampaigns:camps.map(c=>{ const p=this.cmpProgress(c); const sp=this.cmpNum(c.spend), bd=this.cmpNum(c.budget);
        return { label:c.name, sub:c.brand+' · '+c.dept+' · '+c.status, pct:p+'%', w:p+'%',
          color:p>=70?'var(--verify-500)':p>=40?'var(--warn-500)':'var(--danger-500)',
          spend:'₹'+Math.round(sp/1000)+'K / ₹'+Math.round(bd/1000)+'K', spendW:Math.min(100,Math.round(sp/(bd||1)*100))+'%',
          open:()=>this.setState({ route:'campaigns', cmpOpen:c.id, cmpTab:'model' }) }; }),
      dbCapKpis:[KP('People tracked',String(people.length),'with assigned work','var(--beet-700)'),
        KP('Overloaded',String(capRows.filter(r=>parseInt(r.util)>100).length),'assigned beyond shift capacity','var(--danger-600)'),
        KP('Underloaded',String(capRows.filter(r=>parseInt(r.util)<40).length),'below 40% of capacity','var(--info-600)'),
        KP('Open workload',String(open),'tasks in flight','var(--info-600)'),
        KP('Rework load',String(rework),'tasks sent back','var(--orchid-600)')],
      dbCapRows:capRows,
      dbDeptRows:deptRows,
      dbDeptKpis:[KP('Departments',String(divs.length),'delivering work','var(--beet-700)'),
        KP('Tasks in flight',String(open),'open across departments','var(--info-600)'),
        KP('Approved',String(done),'QC-passed','var(--verify-600)'),
        KP('Rework',String(rework),'awaiting correction','var(--danger-600)')],
      dbTeamRows:teamRows,
      dbTeamFilters:[
        { label:'Period', value:TF.period, onChange:setTF('period'), options:['This week','Bi-monthly','This month','This quarter','This year','All time'] },
        { label:'Division', value:TF.division, onChange:setTF('division'), options:['All'].concat([...new Set(tasks.map(t=>this.tkDivision(t)))]) },
      ],
      dbTeamFrom:TF.from, dbTeamTo:TF.to, dbTeamSetFrom:setTF('from'), dbTeamSetTo:setTF('to'),
      dbTeamReset:()=>this.setState({ dbTeamF:{ period:'This month', from:'', to:'', division:'All' }, dbTeamOpen:[] }),
      dbTeamRangeNote:(TF.from||TF.to)
        ? ('Custom range '+(this.fmtDate(TF.from)||'start')+' → '+(this.fmtDate(TF.to)||'today')+' · '+teamTasks.length+' tasks')
        : (TF.period+' · '+teamTasks.length+' tasks'+(TF.division!=='All'?(' · '+TF.division):'')),
      dbTeamEmpty:teamRows.length===0,
      dbTeamKpis:[KP('Team members',String(teamPeople.length),'with tasks in range','var(--beet-700)'),
        KP('Avg completion',(teamRows.length?Math.round(teamRows.reduce((s,r)=>s+parseInt(r.pct),0)/teamRows.length):0)+'%','approved vs assigned','var(--verify-600)'),
        KP('Overdue tasks',String(teamRows.reduce((s,r)=>s+parseInt(r.late),0)),'past due date','var(--danger-600)'),
        KP('Rework items',String(teamTasks.filter(t=>t.status==='Rework').length),'quality returns','var(--warn-600)')],
    };
  }
  analyticsData(b){
    const rank = {exec:5,ops:5,manager:3,lead:2,senior:1,junior:0,admin:5,qc:1}[b];
    const defs = [
      { title:'Executive Dashboard', desc:'Company revenue, growth and strategic KPIs.', icon:'building-2', min:5, tab:'exec' },
      { title:'Resource & Capacity', desc:'Utilization, allocation and capacity planning.', icon:'gauge', min:4, tab:'capacity' },
      { title:'Department Dashboard', desc:'Projects, campaigns and KPI attainment.', icon:'bar-chart-3', min:3, tab:'dept' },
      { title:'Team Dashboard', desc:'Team workload, throughput and quality.', icon:'users', min:2, tab:'team' },
      { title:'Competitor Dashboard', desc:'Benchmarks vs. tracked competitors.', icon:'swords', min:3, soon:true },
      { title:'My Scorecard', desc:'Your personal KPIs and deliverables.', icon:'user-round', min:0, soon:true },
    ];
    return defs.map(d=>{
      const locked = rank < d.min;
      const live = !locked && !!d.tab;
      return { title:d.title, desc:d.desc, icon:d.icon, locked,
        opacity: locked?'.55':'1',
        cursor: live?'pointer':'auto',
        open: live?(()=>this.setState({ dbTab:d.tab })):(()=>{ if(d.soon) this.flash(d.title+' is planned for a later release.'); }),
        iconBg: locked?'var(--surface-50)':'var(--orchid-100)', iconColor: locked?'var(--ink-400)':'var(--orchid-600)',
        tag: locked?'Restricted for your role':(live?'Open dashboard →':'Planned'),
        tagColor: locked?'var(--ink-400)':(live?'var(--orchid-600)':'var(--ink-400)') };
    });
  }

  mastersData(){
    const reg = this.MASTERS_REG();
    const groupIcons = { 'Organization & Security':'shield', 'Business':'briefcase', 'SEO & Content':'search', 'Marketing & Quality':'sparkles' };
    const order = ['Organization & Security','Business','SEO & Content','Marketing & Quality'];
    const byGroup = {};
    Object.keys(reg).forEach(key=>{ if(key.startsWith('_')) return; const m=reg[key]; (byGroup[m.group]=byGroup[m.group]||[]).push({key,m}); });
    return order.filter(g=>byGroup[g]).map(g=>({
      name:g, icon:groupIcons[g]||'boxes', count:byGroup[g].length+' masters',
      items: byGroup[g].map(({key,m})=>({ name:m.label, desc:m.desc, rows:String(m.rows.length), icon:m.icon, open:()=>this.setState({ masterKey:key, masterRecord:null, masterTab:0, masterQuery:'' }) })),
    }));
  }

  // Opens the full multi-field master record editor. idx===null means a new
  // record (all fields blank); otherwise pre-fills from the existing row so
  // relational fields (Parent Service, Owner, Department, etc.) show as
  // pickers over the real related records/users, not free text.
  openMasterRecordEdit(key, idx){
    const m = this.MASTERS_REG()[key];
    if(!m) return;
    const form = {};
    m.fields.forEach(f=>{ form[f] = (idx!=null && m.rows[idx] && m.rows[idx][f]!=null) ? m.rows[idx][f] : ''; });
    this.setState({ showMasterRecordEdit:true, mrKey:key, mrIndex:idx, mrForm:form });
  }
  submitMasterRecord(){
    const { mrKey, mrIndex, mrForm } = this.state;
    if(mrKey==='user'){ this._submitUserMasterRow(mrIndex, mrForm); return; }
    const m = this.MASTERS_REG()[mrKey];
    if(!m) return;
    const idField = m.fields[0];
    const labelField = m.fields[1]||idField;
    if(!String(mrForm[labelField]||'').trim()){ this.flash('Enter a value for '+this.humanize(labelField)+' to save.'); return; }
    const row = { ...mrForm };
    if(!String(row[idField]||'').trim()){
      row[idField] = m.label.replace(/[^A-Z]/g,'').slice(0,3).padEnd(3,'X')+String(m.rows.length+1).padStart(3,'0');
    }
    if(mrIndex!=null && m.rows[mrIndex]) m.rows[mrIndex] = row;
    else m.rows.push(row);
    this.setState({ showMasterRecordEdit:false, mrKey:null, mrIndex:null, mrForm:{} });
    this.flash((mrIndex!=null?'Updated ':'Added ')+m.label+' entry: '+row[labelField]+'.');
  }
  // User Master edits write straight into the real Supabase-backed user
  // list (and the profiles table), not a disposable local row — so changes
  // made here show up in User Management too, and vice versa.
  _submitUserMasterRow(mrIndex, mrForm){
    if(!String(mrForm.Full_Name||'').trim()){ this.flash('Enter a name to save.'); return; }
    const roleEntry = Object.entries(this.ROLES).find(([,r])=>r.label===mrForm.Role);
    const roleKey = roleEntry?roleEntry[0]:'junior';
    const status = mrForm.Status||'Active';
    const userPatch = {
      name:mrForm.Full_Name.trim(), email:mrForm.Official_Email||'', mobile:mrForm.Mobile||'',
      dept:mrForm.Department||'—', designation:mrForm.Designation||'', team:mrForm.Team||'',
      reportingManager:mrForm.Reporting_Manager||'', teamLead:mrForm.Team_Lead||'',
      officeLocation:mrForm.Office_Location||'', role:mrForm.Role||this.ROLES[roleKey].label, roleKey,
      employmentType:mrForm.Employment_Type||'Full-time', joiningDate:mrForm.Joining_Date||'',
      status, statusTone: status==='Active'?'ok':'warn',
    };
    userPatch.sub = (userPatch.designation||userPatch.role)+' · '+userPatch.dept;
    if(mrIndex!=null && this.state.users[mrIndex]){
      const existing = this.state.users[mrIndex];
      const updated = { ...existing, ...userPatch };
      const users=[...this.state.users]; users[mrIndex]=updated;
      this.setState({ users, showMasterRecordEdit:false, mrKey:null, mrIndex:null, mrForm:{} });
      this.flash('Updated User Master entry: '+updated.name+'.');
      if(existing.id){
        supabase.from('profiles').update({
          full_name:updated.name, department:updated.dept, designation:updated.designation||null,
          role_key:updated.roleKey, status:updated.status, mobile:updated.mobile||null, team:updated.team||null,
          reporting_manager:updated.reportingManager||null, team_lead:updated.teamLead||null,
          office_location:updated.officeLocation||null, employment_type:updated.employmentType||null,
          joining_date:updated.joiningDate||null,
        }).eq('id', existing.id).then(({error})=>{
          if(error) console.warn('[supabase] profile update failed:', error.message);
        });
      }
    } else {
      this.setState({ users:[userPatch, ...this.state.users], showMasterRecordEdit:false, mrKey:null, mrIndex:null, mrForm:{} });
      this.flash('Added User Master entry: '+userPatch.name+' — local only, since this doesn\'t send a real invite. Use "Add user" in User Management to create a real account.');
    }
  }
  deleteMasterRecord(){
    const { mrKey, mrIndex } = this.state;
    if(mrKey==='user'){ this._deleteUserMasterRow(mrIndex); return; }
    const m = this.MASTERS_REG()[mrKey];
    if(!m || mrIndex==null) return;
    const labelField = m.fields[1]||m.fields[0];
    const removedLabel = m.rows[mrIndex] ? m.rows[mrIndex][labelField] : '';
    m.rows.splice(mrIndex,1);
    this.setState({ showMasterRecordEdit:false, mrKey:null, mrIndex:null, mrForm:{}, masterRecord:null });
    this.flash('Deleted '+m.label+' entry: '+removedLabel+'.');
  }
  _deleteUserMasterRow(mrIndex){
    if(mrIndex==null) return;
    const existing = this.state.users[mrIndex];
    const users = this.state.users.filter((_,i)=>i!==mrIndex);
    this.setState({ users, showMasterRecordEdit:false, mrKey:null, mrIndex:null, mrForm:{}, masterRecord:null });
    this.flash('Deleted User Master entry: '+(existing?existing.name:'')+'.');
    if(existing && existing.id){
      supabase.from('profiles').delete().eq('id', existing.id).then(({error})=>{
        if(error) console.warn('[supabase] profile delete failed:', error.message);
      });
    }
  }

  masterDetailData(){
    const reg = this.MASTERS_REG();
    const key = this.state.masterKey;
    const m = reg[key];
    if(!m) return {};
    const st = reg._st;
    const q = (this.state.masterQuery||'').toLowerCase();
    const tagTone = (v)=>{ const t=this.levelTone; const tone=st(v); return { ok:{bg:'var(--verify-100)',color:'var(--verify-600)'}, warn:{bg:'var(--warn-100)',color:'var(--warn-600)'}, danger:{bg:'var(--danger-100)',color:'var(--danger-600)'}, draft:{bg:'var(--surface-50)',color:'var(--ink-500)'}, info:{bg:'var(--info-100)',color:'var(--info-600)'} }[tone]; };
    const rows = m.rows.map((r,idx)=>{
      const cells = m.cols.map(c=>{ let v=r[c.k];
        if(key==='user'&&c.k==='Shift_Start') v=(r.Shift_Start||'')+'–'+(r.Shift_End||'');
        const tt = c.tag?tagTone(v):null; return { val: v===undefined||v===''?'—':String(v), plain:!c.tag, tag:!!c.tag, font: c.mono?"'Space Mono', monospace":"inherit", tagBg: tt?tt.bg:'', tagColor: tt?tt.color:'' }; });
      return { cells, open:()=>{ if(key==='user'){ this.setState({ route:'users', umOpen:r.Full_Name, umEdit:false }); return; }
        this.setState({ masterRecord:idx, masterTab:0 }); } };
    }).filter((_,idx)=>{ if(!q) return true; return JSON.stringify(m.rows[idx]).toLowerCase().includes(q); });
    const out = {
      mdLabel:m.label, mdIcon:m.icon, mdDesc:m.desc, mdCount:m.rows.length+' records'+(key==='user'?' · synced with User Management':''),
      mdCols:m.cols.map(c=>c.l), ...(()=>{ const pg=this.pgData('md-'+key,rows,8); return { mdRows:pg.rows, mdPg:pg }; })(),
      mdBack:()=>this.setState({ masterKey:null, masterRecord:null }),
      mdAdd:()=>this.openMasterRecordEdit(key, null),
      mdQuery:this.state.masterQuery, mdOnQuery:e=>this.setState({ masterQuery:e.target.value }),
      mdHasRecord: this.state.masterRecord!==null,
      mdShowTable:true,
    };
    if(key==='backlink'){
      const view=this.state.blView||'dash';
      const recIdx=this.state.blRecord;
      const rec = recIdx==null? null : (recIdx==='new'? this.blankBacklinkDomain() : this.BACKLINK_DOMAINS()[recIdx]);
      out.mdShowTable=false;
      out.blIsBacklink=!rec; out.blShowDash=view==='dash'&&!rec; out.blShowRepo=view==='repo'&&!rec; out.blShowDetail=!!rec;
      const seg=(v,label,icon)=>({ label, icon, active:view===v, go:()=>this.setState({blView:v, blRecord:null}),
        style:'display:flex;align-items:center;gap:7px;padding:8px 15px;border:none;border-radius:9px;font-size:13px;font-weight:700;cursor:pointer;'+(view===v?'background:#fff;color:var(--beet-700);box-shadow:var(--shadow-xs)':'background:none;color:var(--ink-500)') });
      out.blSegs=[seg('dash','Dashboard','layout-dashboard'), seg('repo','Domain Repository','database')];
      out.mdAdd=()=>this.setState({ blRecord:'new', blTab:0, blView:'repo', blForm:this.blankBacklinkDomain() });
      if(out.blShowDash) Object.assign(out, this.backlinkDashData());
      if(out.blShowRepo) Object.assign(out, this.backlinkRepoData());
      if(rec) Object.assign(out, this.backlinkDetailData(rec, recIdx==='new'));
    }
    if(this.state.masterRecord!==null){
      const rec = m.rows[this.state.masterRecord];
      if(rec){
        out.mdRecTitle = rec[m.cols[1].k] || rec[m.cols[0].k];
        out.mdRecSub = rec[m.cols[0].k];
        out.mdRecClose = ()=>this.setState({ masterRecord:null });
        out.mdRecEdit = ()=>this.openMasterRecordEdit(key, this.state.masterRecord);
        out.mdRecFields = m.fields.map(f=>({ label:this.humanize(f), value: (rec[f]===undefined||rec[f]===''||rec[f]===null)?'—':String(rec[f]) }));
        const ti = this.state.masterTab;
        const tabStyle = (active)=> 'padding:9px 14px;border:none;background:none;border-bottom:2px solid '+(active?'var(--orchid-500)':'transparent')+';font-size:13px;font-weight:700;cursor:pointer;color:'+(active?'var(--beet-700)':'var(--ink-500)')+';margin-bottom:-1px';
        out.mdTabs = (m.tabs||[]).map((t,i)=>({ label:t, active:i===ti, style:tabStyle(i===ti), go:()=>this.setState({ masterTab:i }) }));
        out.mdHasTabs = !!(m.tabs && m.tabs.length);
        out.mdShowFields = !m.tabs || ti===0;
        if(key==='service'){ out.mdSubUrls = m.urls; out.mdSubLinked = m.linked; out.mdShowUrls = ti===1; out.mdShowLinked = ti===2; }
        if(key==='keyword'){ out.mdSubUsage = m.usage; out.mdSubComp = m.compmap; out.mdShowUsage = ti===1; out.mdShowComp = ti===2; }
        out.mdKind = key;
      }
    }
    return out;
  }

  BACKLINK_DOMAINS(){
    if(this._bld) return this._bld;
    const D=(name,platform,category,industry,da,spam,status,active,found,accounts,live,extra)=>Object.assign({
      name, url:'https://'+name, platform, category, industry, da, spam, status, active, found, accounts, live,
      verified:'14 Apr 2024', lastChecked:'05 May 2025', nextCheck:'12 May 2025', checkedBy:'Rohit Sharma', freq:'Weekly',
      country:'Global', language:'English', description:'Approved backlink source.',
      features:{'Guest Post Accepted':da>60,'Do-follow Links':spam<10,'High Authority':da>=80,'No-follow Links':false,'Sponsored Content':false,'Dofollow Possible':spam<10,'User Profile':platform==='Social Profile','Directory Listing':platform==='Directory','Forum':platform==='Forum'},
      notes:'Content must be high quality and relevant to the audience. Links placed contextually.',
      dr:da-1, traffic:'1.2M', backlinks:'40M', followType:'Dofollow Possible', placement:'In Content', paid:'Free', approval:'Yes', approvalTime:'3 - 7 Days',
      brands:['Food Research Lab','Pubrica'], services:['Content Writing','SEO Services'],
      submittedUrls:12, liveBacklinks:live, lastLiveCheck:'05 May 2025', successRate:'87.5%',
      tags:['High DA', platform],
      activity:[['Domain approved','John Smith','14 Apr 2024'],['Account created','FRL_SEO_Team','15 Apr 2024'],['First submission','Article published','16 Apr 2024'],['Backlink live','Verified dofollow','23 Apr 2024'],['Last checked','All links live','05 May 2025']],
    }, extra||{});
    this._bld=[
      D('medium.com','Guest Post','Publishing','Technology',95,1,'Approved','Active','12 Apr 2024',3,28,{traffic:'12.4M',backlinks:'1.2B',dr:94,description:'Online publishing platform with high domain authority and strong editorial guidelines.'}),
      D('forbes.com','Guest Post','Publishing','Business',94,1,'Approved','Active','08 Apr 2024',2,15),
      D('linkedin.com','Social Profile','Social Network','Business',98,2,'Approved','Active','05 Apr 2024',5,52),
      D('quora.com','Q&A','Q&A','Technology',93,3,'Approved','Active','03 Apr 2024',4,31),
      D('blogger.com','Web 2.0','Blog Platform','General',89,4,'Approved','Active','28 Mar 2024',6,41),
      D('yellowpages.com','Directory','Directory','Local Business',78,6,'Under Review','Active','26 Mar 2024',2,0),
      D('ezinearticles.com','Article Submission','Article Directory','General',72,10,'Under Review','Active','25 Mar 2024',1,0),
      D('articlebiz.com','Article Submission','Article Directory','General',65,18,'Rejected','Inactive','20 Mar 2024',0,0),
      D('spamsite.info','Directory','Directory','General',32,65,'Blacklisted','Inactive','15 Mar 2024',0,0),
    ];
    return this._bld;
  }
  blankBacklinkDomain(){
    return { name:'', url:'', platform:'', category:'', industry:'', da:'—', spam:'—', status:'Draft', active:'Inactive', found:this.todayStr(), accounts:0, live:0,
      verified:'—', lastChecked:'—', nextCheck:'—', checkedBy:'—', freq:'Weekly', country:'Global', language:'English', description:'',
      features:{'Guest Post Accepted':false,'Do-follow Links':false,'High Authority':false,'No-follow Links':false,'Sponsored Content':false,'Dofollow Possible':false,'User Profile':false,'Directory Listing':false,'Forum':false},
      notes:'', dr:'—', traffic:'—', backlinks:'—', followType:'Dofollow Possible', placement:'In Content', paid:'Free', approval:'Yes', approvalTime:'—',
      brands:[], services:[], submittedUrls:0, liveBacklinks:0, lastLiveCheck:'—', successRate:'—', tags:[],
      activity:[['Record created', this.currentPerson(), this.todayStr()]] };
  }
  blStatusTone(s){ return { Approved:{bg:'var(--verify-100)',color:'var(--verify-600)'}, 'Under Review':{bg:'var(--warn-100)',color:'var(--warn-600)'}, Rejected:{bg:'var(--danger-100)',color:'var(--danger-600)'}, Blacklisted:{bg:'#EAE4E8',color:'var(--ink-700)'}, Draft:{bg:'var(--surface-50)',color:'var(--ink-500)'}, Inactive:{bg:'var(--surface-50)',color:'var(--ink-500)'} }[s]||{bg:'var(--surface-50)',color:'var(--ink-500)'}; }
  blScoreColor(v,inv){ if(v==='—')return 'var(--ink-400)'; return inv? (v<=5?'var(--verify-600)':v<=20?'var(--warn-600)':'var(--danger-600)') : (v>=80?'var(--verify-600)':v>=60?'var(--warn-600)':'var(--danger-600)'); }

  backlinkRepoData(){
    const q=(this.state.blQuery||'').toLowerCase();
    const fS=this.state.blFStatus||'All', fP=this.state.blFPlatform||'All';
    const all=this.BACKLINK_DOMAINS();
    const platforms=['All',...Array.from(new Set(all.map(d=>d.platform)))];
    const rows=all.map((d,idx)=>({d,idx})).filter(({d})=> (fS==='All'||d.status===fS) && (fP==='All'||d.platform===fP) && (!q||(d.name+' '+d.platform+' '+d.category+' '+d.industry).toLowerCase().includes(q)) )
      .map(({d,idx})=>{ const st=this.blStatusTone(d.status);
        return { name:d.name, url:d.url, platform:d.platform, category:d.category, industry:d.industry,
          da:String(d.da), daColor:this.blScoreColor(d.da), spam:d.spam+'%', spamColor:this.blScoreColor(d.spam,true),
          status:d.status, statusBg:st.bg, statusColor:st.color,
          activeLabel:d.active, activeDot:d.active==='Active'?'var(--verify-500)':'var(--danger-500)',
          found:d.found, accounts:String(d.accounts), live:String(d.live), lastVerified:d.lastChecked,
          open:()=>this.setState({ blRecord:idx, blTab:0, blForm:{...this.BACKLINK_DOMAINS()[idx]} }) }; });
    return { blRepoRows:rows, blRepoCount:rows.length+' of '+all.length+' domains',
      blQuery:this.state.blQuery||'', blOnQuery:e=>this.setState({blQuery:e.target.value}),
      blFStatus:fS, blOnFStatus:e=>this.setState({blFStatus:e.target.value}),
      blFPlatform:fP, blOnFPlatform:e=>this.setState({blFPlatform:e.target.value}),
      blPlatformOptions:platforms,
      blImport:()=>this.flash('Import domains — upload a CSV (demo).'), blExport:()=>this.flash('Exported domain repository (demo).'),
      blRepoEmpty:rows.length===0 };
  }

  backlinkDetailData(d, isNew){
    const tab=this.state.blTab||0;
    const f=this.state.blForm||d;
    const st=this.blStatusTone(f.status);
    const set=(key)=>e=>this.setState({ blForm:{...(this.state.blForm||d), [key]:e.target.value} });
    const tabs=['Domain Details','Quality Metrics','Platform Rules','Linked Services','Notes','Activity Log'];
    const editableRow=(k,v,key)=>({ k, v: v==null||v===''?'':v, onChange: set(key) });
    return {
      bd_name:isNew?'New domain':f.name, bd_url:f.url||'—', bd_isNew:!!isNew,
      bd_status:f.status, bd_statusBg:st.bg, bd_statusColor:st.color,
      bd_sub:[f.platform,f.category,f.industry].filter(Boolean).join(' · ')||'Fill in the details below',
      bd_tabs:tabs.map((t,i)=>({ label:t, go:()=>this.setState({blTab:i}), style:'flex:none;padding:9px 13px;border:none;background:none;border-bottom:2px solid '+(i===tab?'var(--orchid-500)':'transparent')+';font-size:13px;font-weight:700;cursor:pointer;color:'+(i===tab?'var(--beet-700)':'var(--ink-500)')+';margin-bottom:-1px;white-space:nowrap' })),
      bd_tab0:tab===0, bd_tab1:tab===1, bd_tab2:tab===2, bd_tab3:tab===3, bd_tab4:tab===4, bd_tab5:tab===5,
      bd_ident:[
        editableRow('Domain Name',f.name,'name'), editableRow('Domain URL',f.url,'url'),
        editableRow('Platform Type',f.platform,'platform'), editableRow('Category',f.category,'category'),
        editableRow('Industry',f.industry,'industry'), editableRow('Target Country',f.country,'country'),
        editableRow('Language',f.language,'language'), editableRow('Description',f.description,'description'),
      ],
      bd_dates:[
        editableRow('Status',f.status,'status'), editableRow('Active Status',f.active,'active'),
        {k:'Found Date',v:f.found||'—'}, {k:'Verified Date',v:f.verified||'—'},
        {k:'Last Checked',v:f.lastChecked||'—'}, {k:'Checked By',v:f.checkedBy||'—'},
        {k:'Next Check',v:f.nextCheck||'—'}, {k:'Verification Frequency',v:f.freq||'—'},
      ],
      bd_tags:d.tags, bd_hasTags:d.tags.length>0,
      bd_quality:[
        {...editableRow('Domain Authority (DA)',f.da,'da'), color:this.blScoreColor(f.da)},
        {...editableRow('Domain Rating (DR)',f.dr,'dr'), color:this.blScoreColor(f.dr)},
        {...editableRow('Spam Score',f.spam,'spam'), color:this.blScoreColor(f.spam,true)},
        {...editableRow('Traffic (est.)',f.traffic,'traffic'), color:'var(--beet-700)'},
        {...editableRow('Backlinks (est.)',f.backlinks,'backlinks'), color:'var(--beet-700)'},
      ],
      bd_qmeta:[
        editableRow('Follow Type',f.followType,'followType'), editableRow('Link Placement',f.placement,'placement'),
        editableRow('Paid / Free',f.paid,'paid'), editableRow('Approval Required',f.approval,'approval'),
        editableRow('Est. Approval Time',f.approvalTime,'approvalTime'),
      ],
      bd_features:Object.entries(f.features||{}).map(([k,v])=>({ label:k, on:v, icon:v?'check-square':'square', color:v?'var(--verify-600)':'var(--ink-400)',
        toggle:()=>this.setState({ blForm:{...f, features:{...f.features, [k]:!v}} }) })),
      bd_notes:f.notes||'', bd_setNotes:set('notes'),
      bd_brands:(f.brands||[]).map((b,i)=>({ label:b, remove:()=>this.setState({ blForm:{...f, brands:f.brands.filter((_,x)=>x!==i)} }) })),
      bd_services:(f.services||[]).map((s,i)=>({ label:s, remove:()=>this.setState({ blForm:{...f, services:f.services.filter((_,x)=>x!==i)} }) })),
      bd_hasBrands:(f.brands||[]).length>0, bd_hasServices:(f.services||[]).length>0,
      bd_newBrand:this.state.blNewBrand||'', bd_setNewBrand:e=>this.setState({blNewBrand:e.target.value}),
      bd_addBrand:()=>{ const v=(this.state.blNewBrand||'').trim(); if(!v) return; this.setState({ blForm:{...f, brands:[...(f.brands||[]),v]}, blNewBrand:'' }); },
      bd_newService:this.state.blNewService||'', bd_setNewService:e=>this.setState({blNewService:e.target.value}),
      bd_addService:()=>{ const v=(this.state.blNewService||'').trim(); if(!v) return; this.setState({ blForm:{...f, services:[...(f.services||[]),v]}, blNewService:'' }); },
      bd_linkStats:[['Submitted URLs',String(d.submittedUrls)],['Live Backlinks',String(d.liveBacklinks)],['Last Live Check',d.lastLiveCheck],['Success Rate',d.successRate]].map(x=>({k:x[0],v:x[1]})),
      bd_activity:d.activity.map(a=>({action:a[0],who:a[1],when:a[2]})),
      bd_canDelete:!isNew,
      bd_back:()=>this.setState({ blRecord:null, blView:'repo', blForm:null }),
      bd_save:()=>{
        const form=this.state.blForm||d;
        if(!String(form.name||'').trim()){ this.flash('Enter a domain name to save.'); return; }
        this.BACKLINK_DOMAINS(); // ensure this._bld is initialized
        if(isNew){
          this._bld.unshift({...form, activity:[['Domain added', this.currentPerson(), this.todayStr()], ...(form.activity||[])]});
        } else {
          this._bld[this.state.blRecord] = {...form};
        }
        this.setState({ blRecord:null, blView:'repo', blForm:null });
        this.flash(isNew?'Domain "'+form.name+'" added to the repository.':'Changes saved for "'+form.name+'".');
      },
      bd_delete:()=>{
        if(isNew) return;
        const name=f.name;
        this._bld.splice(this.state.blRecord,1);
        this.setState({ blRecord:null, blView:'repo', blForm:null });
        this.flash('Deleted domain "'+name+'".');
      },
    };
  }

  backlinkDashData(){
    return {
      blKpis:[
        {label:'Total domains', value:'48', icon:'globe', color:'var(--beet-700)', sub:'in repository'},
        {label:'Active accounts', value:'36', icon:'user-check', color:'var(--verify-600)', sub:'logins verified'},
        {label:'Pending submissions', value:'12', icon:'clock', color:'var(--warn-600)', sub:'awaiting approval'},
        {label:'Live backlinks', value:'1,240', icon:'link', color:'var(--info-600)', sub:'indexed & live'},
        {label:'Broken links', value:'18', icon:'unlink', color:'var(--danger-600)', sub:'need fixing'},
        {label:'Weekly verification queue', value:'9', icon:'shield-check', color:'var(--orchid-600)', sub:'due this week'},
      ],
      blDaDist:[
        {bucket:'DA 90+', count:6, w:'26%', color:'var(--verify-500)'},
        {bucket:'DA 70–89', count:14, w:'62%', color:'var(--verify-500)'},
        {bucket:'DA 50–69', count:17, w:'75%', color:'var(--info-500)'},
        {bucket:'DA 30–49', count:8, w:'35%', color:'var(--warn-500)'},
        {bucket:'DA < 30', count:3, w:'13%', color:'var(--danger-500)'},
      ],
      blPlatforms:[
        {name:'Guest Post', count:14, icon:'file-text'},
        {name:'Directory', count:9, icon:'folder-open'},
        {name:'Editorial', count:8, icon:'newspaper'},
        {name:'Forum', count:6, icon:'messages-square'},
        {name:'Web 2.0', count:6, icon:'panels-top-left'},
        {name:'Profile', count:5, icon:'user-round'},
      ],
      blActivity:[
        {who:'Ananya Rao', action:'Added domain techradar.com (DA 92) to repository', when:'Today, 11:20'},
        {who:'Karan Mehta', action:'Submitted guest post to medium.com — pending approval', when:'Today, 09:45'},
        {who:'System', action:'Weekly verification: 3 links on g2.com confirmed live', when:'Yesterday'},
        {who:'Rohit Sharma', action:'Flagged randomlinks.info — spam score rose to 48%', when:'Yesterday'},
        {who:'Ananya Rao', action:'Fixed broken backlink on producthunt.com', when:'2 days ago'},
      ],
      blVerify:()=>this.flash('Verification run queued — results land in the activity feed.'),
    };
  }

  okrCategoryTone(cat){
    const m = { SEO:{bg:'var(--verify-100)',color:'var(--verify-600)'}, Content:{bg:'var(--info-100)',color:'var(--info-600)'}, Technical:{bg:'var(--orchid-100)',color:'var(--orchid-700)'}, Branding:{bg:'#F3E8D6',color:'var(--warn-600)'}, Conversion:{bg:'#E7E0F2',color:'#6D51A8'}, Traffic:{bg:'var(--verify-100)',color:'var(--verify-600)'} };
    return m[cat]||{bg:'var(--surface-50)',color:'var(--ink-500)'};
  }
  okrPriority(o){
    if(o.status==='Completed') return { label:'Medium', dot:'var(--verify-500)', color:'var(--ink-700)' };
    if(o.daysLeft<0 || o.status==='At Risk') return { label:'Critical', dot:'var(--danger-500)', color:'var(--danger-600)' };
    if(o.daysLeft<=7) return { label:'High', dot:'var(--warn-500)', color:'var(--warn-600)' };
    return { label:'Medium', dot:'var(--verify-500)', color:'var(--ink-700)' };
  }
  okrHealth(o){
    if(o.status==='Completed') return { label:'Complete', color:'var(--verify-600)', bg:'var(--verify-100)', dot:'var(--verify-500)' };
    const expected = this.cycleElapsedOf(o); // % of cycle elapsed
    if(o.progress >= expected - 5) return { label:'Healthy', color:'var(--verify-600)', bg:'var(--verify-100)', dot:'var(--verify-500)' };
    if(o.progress >= expected - 25) return { label:'At Risk', color:'var(--warn-600)', bg:'var(--warn-100)', dot:'var(--warn-500)' };
    return { label:'Off Track', color:'var(--danger-600)', bg:'var(--danger-100)', dot:'var(--danger-500)' };
  }
  okrDue(o){
    if(o.status==='Completed') return { label:'Delivered', color:'var(--ink-400)' };
    if(o.daysLeft<0) return { label:'Overdue '+Math.abs(o.daysLeft)+'d', color:'var(--danger-600)' };
    if(o.daysLeft<=7) return { label:o.daysLeft+' days left', color:'var(--warn-600)' };
    return { label:o.daysLeft+' days left', color:'var(--ink-500)' };
  }

  MY_KPIS(){
    return {
      team_lead:[
        { id:'tl1', kpi:'Team Keywords in Top 10', unit:'keywords', baseline:'22', target:'80', current:'54', freq:'Weekly', okr:'Increase Organic Traffic by 50%', manual:true },
        { id:'tl2', kpi:'Team On-time Delivery', unit:'%', baseline:'82', target:'95', current:'93', freq:'Weekly', okr:'SEO delivery SLA', manual:true },
        { id:'tl3', kpi:'Team Effort — page fixes', unit:'fixes', baseline:'0', target:'160', current:'118', freq:'Monthly', okr:'Optimize Website Performance', manual:true },
      ],
      senior:[
        { id:'sr1', kpi:'Organic Sessions (owned pages)', unit:'sessions', baseline:'18,000', target:'40,000', current:'27,500', freq:'Monthly', okr:'Increase Organic Traffic by 50%', manual:false },
        { id:'sr2', kpi:'Keywords in Top 10', unit:'keywords', baseline:'6', target:'25', current:'17', freq:'Weekly', okr:'Increase Organic Traffic by 50%', manual:true },
        { id:'sr3', kpi:'Content Published', unit:'articles', baseline:'0', target:'12', current:'7', freq:'Weekly', okr:'Launch 30 Content Pieces', manual:true },
      ],
      junior:[
        { id:'jr1', kpi:'Meta descriptions updated', unit:'pages', baseline:'0', target:'120', current:'86', freq:'Daily', okr:'Optimize Website Performance', manual:true },
        { id:'jr2', kpi:'Broken links fixed', unit:'links', baseline:'0', target:'200', current:'142', freq:'Daily', okr:'Optimize Website Performance', manual:true },
        { id:'jr3', kpi:'Alt text added', unit:'images', baseline:'0', target:'300', current:'175', freq:'Weekly', okr:'Content quality', manual:true },
        { id:'jr4', kpi:'GMB profile updates', unit:'updates', baseline:'0', target:'12', current:'7', freq:'Monthly', okr:'Local SEO — Food Research Lab', manual:true },
        { id:'jr5', kpi:'SEO certification modules', unit:'modules', baseline:'0', target:'4', current:'1', freq:'Quarterly', okr:'Team capability building', manual:true },
      ],
    };
  }

  CHECKINS(){
    return {
      'team-team_lead':[
        {date:'Jan 8', who:'Aditi Rao', role:'Team Lead', kind:'Weekly check-in', health:null, progress:'54%', text:'Published 6 briefs; keyword tracker updated. Dev support pending for 3 fixes.'},
        {date:'Jan 15', who:'Aditi Rao', role:'Team Lead', kind:'Weekly check-in', health:null, progress:'61%', text:'On-page rollout on track. Risk: algorithm update volatility on 4 pages.'},
      ],
      'team-senior':[
        {date:'Jan 15', who:'Sameer Iyer', role:'Senior Executive', kind:'Weekly update', health:null, text:'Cleared audit backlog. Blocker: awaiting content approval for 2 pillar pages.'},
      ],
      '1':[
        {date:'Jan 8', who:'Aditi Rao', role:'Team Lead', kind:'Weekly check-in', progress:'54%', text:'Team ramping; backlink outreach started.'},
        {date:'Jan 31', who:'Priya Nair', role:'Manager', kind:'Monthly review', health:'Healthy', decision:'Continue', text:'Solid trajectory, ahead of pace. Keep current owners.'},
      ],
      '3':[
        {date:'Jan 31', who:'Priya Nair', role:'Manager', kind:'Monthly review', health:'Healthy', decision:'Continue', text:'CWV work nearly done, load time close to target.'},
      ],
      '4':[
        {date:'Jan 31', who:'Priya Nair', role:'Manager', kind:'Monthly review', health:'At Risk', decision:'Needs Attention', text:'Impressions lagging target; add paid amplification.'},
        {date:'Feb 10', who:'Rahul Menon', role:'COO', kind:'Executive comment', text:'Reallocating one designer to unblock social output.'},
      ],
    };
  }
  ciHistory(id){ const seed=(this.CHECKINS()[id]||[]); const add=((this.state.ciAdded||{})[id]||[]); return seed.concat(add).slice().reverse(); }
  defaultPendingY(){ return this.state.roleKey==='junior' ? {jr1:true} : {}; }
  todayStr(){ const d=new Date(); const m=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][d.getMonth()]; return m+' '+d.getDate()+', '+d.getFullYear(); }
  openCi(type, ctx){ const seed = (type==='senior'||type==='lead') ? { date:this.todayStr() } : {}; this.setState({ ciOpen:true, ciType:type, ciCtx:ctx||null, ciForm:seed, okrMenu:null }); }
  ciSet(k){ return (e)=>this.setState({ ciForm:{...this.state.ciForm,[k]:e.target.value} }); }
  submitCi(escalate){
    const t=this.state.ciType, ctx=this.state.ciCtx||{}, cf=this.state.ciForm||{};
    const okrId = ctx.id || 'general';
    const role=this.ROLES[this.state.roleKey];
    const kind={senior:'Weekly update',lead:'Weekly check-in',manager:'Monthly review',exec:'Executive comment',kpi:(ctx.freq||'')+' check-in'}[t];
    const date = cf.date || this.todayStr();
    if(t==='manager' && !cf.health){ this.flash('Select an overall health status.'); return; }
    // persist reported actuals (senior / team lead / per-KPI)
    let reported=[];
    if(t==='senior' || t==='lead' || t==='kpi'){
      const kpis = this.MY_KPIS()[this.state.roleKey]||[];
      const actuals={...this.state.kpiActuals};
      kpis.forEach(k=>{ const v=cf['act_'+k.id]; if(v!==undefined && String(v).trim()!==''){ actuals[k.id]={ val:String(v).trim(), date }; reported.push(k.kpi+' → '+String(v).trim()+' '+k.unit); } });
      this.setState({ kpiActuals:actuals });
      if(reported.length===0 && t!=='kpi'){ this.flash('Enter at least one actual value to report.'); return; }
    }
    const qual=[cf.flag&&'Flagged for Manager review', cf.challenges&&('Blockers: '+cf.challenges), cf.risks&&('Risks: '+cf.risks), cf.dependencies&&('Dependencies: '+cf.dependencies), cf.support&&('Support needed: '+cf.support), cf.next&&('Next week: '+cf.next), (cf.files&&cf.files.length)&&('Evidence: '+cf.files.join(', '))].filter(Boolean).join(' · ');
    const text = (reported.length?('Reported — '+reported.join('; ')):'') + (reported.length&&qual?' — ':'') + (qual||cf.comment||'');
    const entry={ date, who:role.person, role:role.label, kind, health:cf.health||null, decision:cf.decision||null, progress:ctx.progress||null, confidence:cf.confidence||null, text:text||cf.comment||'' };
    const added={...this.state.ciAdded}; added[okrId]=[...(added[okrId]||[]), entry];
    let py=this.state.ciPendingY;
    if(t==='kpi'){ py={...(this.state.ciPendingY||this.defaultPendingY())}; delete py[ctx.kpiId]; }
    this.setState({ ciAdded:added, ciOpen:false, ciPendingY:py });
    this.flash(kind+' saved'+(escalate?' & escalated to Manager':'')+(reported.length?(' · '+reported.length+' KPI actual'+(reported.length>1?'s':'')+' logged'):'')+'.');
  }

  JUNIOR_TASKS(){
    return [
      { id:'t1', title:'Meta descriptions — service pages', kpiId:'jr1', kpi:'Meta descriptions updated', units:40, unit:'pages', due:'Jan 20', done:true },
      { id:'t2', title:'Meta descriptions — blog archive', kpiId:'jr1', kpi:'Meta descriptions updated', units:46, unit:'pages', due:'Jan 22', done:true },
      { id:'t3', title:'Meta descriptions — landing pages', kpiId:'jr1', kpi:'Meta descriptions updated', units:20, unit:'pages', due:'Jan 26', done:false },
      { id:'t4', title:'Fix broken links — Pubrica', kpiId:'jr2', kpi:'Broken links fixed', units:60, unit:'links', due:'Jan 19', done:true },
      { id:'t5', title:'Fix broken links — Food Research Lab', kpiId:'jr2', kpi:'Broken links fixed', units:50, unit:'links', due:'Jan 21', done:true },
      { id:'t6', title:'Fix broken links — Statswork', kpiId:'jr2', kpi:'Broken links fixed', units:32, unit:'links', due:'Jan 23', done:true },
      { id:'t7', title:'Fix broken links — Tutors India', kpiId:'jr2', kpi:'Broken links fixed', units:40, unit:'links', due:'Jan 25', done:false },
      { id:'t8', title:'Alt text — blog images', kpiId:'jr3', kpi:'Alt text added', units:90, unit:'images', due:'Jan 20', done:true },
      { id:'t9', title:'Alt text — product images', kpiId:'jr3', kpi:'Alt text added', units:85, unit:'images', due:'Jan 22', done:true },
      { id:'t10', title:'Alt text — case studies', kpiId:'jr3', kpi:'Alt text added', units:60, unit:'images', due:'Jan 27', done:false },
    ];
  }
  taskIsDone(t){ const o=(this.state.taskDone||{})[t.id]; return o===undefined?t.done:o; }
  juniorTasksView(){
    const tasks=this.JUNIOR_TASKS();
    const rows=tasks.map(t=>{ const done=this.taskIsDone(t); return {
      id:t.id, title:t.title, kpi:t.kpi, contribution:'+'+t.units+' '+t.unit, due:t.due, done,
      statusLabel: done?'Done':'Open', statusBg: done?'var(--verify-100)':'var(--info-100)', statusColor: done?'var(--verify-600)':'var(--info-600)',
      boxBg: done?'var(--verify-500)':'#fff', boxBorder: done?'var(--verify-500)':'var(--line-300)', checkOpacity: done?'1':'0',
      actionLabel: done?'Reopen':'Mark done',
      toggle:()=>this.toggleTask(t.id),
    }; });
    const done=rows.filter(r=>r.done).length;
    return {
      jtRows:rows,
      jtStats:[
        {label:'My tasks',value:String(tasks.length),color:'var(--beet-700)',icon:'list-checks'},
        {label:'Completed',value:String(done),color:'var(--verify-600)',icon:'check-circle-2'},
        {label:'Open',value:String(tasks.length-done),color:'var(--warn-600)',icon:'circle-dot'},
        {label:'KPIs advanced',value:String(new Set(rows.filter(r=>r.done).map(r=>r.kpi)).size),color:'var(--orchid-600)',icon:'target'},
      ],
    };
  }
  toggleTask(id){ const t=this.JUNIOR_TASKS().find(x=>x.id===id); if(!t) return; const cur=this.taskIsDone(t); this.setState({ taskDone:{...this.state.taskDone,[id]:!cur} }); this.flash(!cur?('Task completed · +'+t.units+' '+t.unit+' to “'+t.kpi+'”'):'Task reopened.'); }
  juniorRollup(kpiId){ const tasks=this.allTasks().filter(t=>t.kpiId===kpiId); const done=tasks.filter(t=>t.status==='Approved'); return { val:done.reduce((s,t)=>s+t.units,0), done:done.length, total:tasks.length }; }

  EP_FORM(){ return { name:'New effort plan', quarter:'Jul 2026', campaign:'Q3 SEO push', dept:'SEO', owner:'Neha Verma', okr:'Increase Organic Traffic by 50%', start:'Jul 1, 2026', end:'Jul 31, 2026', type:'Monthly' }; }
  EP_DIVISIONS(){ return ['Content Writer','Graphics','Web Developers','SMM','SEO'].concat(this.state.epCustomDivs||[]); }
  EP_DIV_ROWS(d){
    const R=(type,icon,monthly,days,unit,priority,weight,kpiId)=>({type,icon,monthly,days,unit,priority,weight,kpiId});
    return {
      'Content Writer':[ R('Long-form content','file-text',25000,25,'words','High',40,'sr3'), R('Blog posts','newspaper',12,25,'articles','High',30,'sr3'), R('Case studies','file-check',4,20,'case studies','Medium',20,''), R('Proofreading passes','spell-check',20,25,'documents','Low',10,'') ],
      'Graphics':[ R('Social creatives','image',30,25,'designs','High',40,'jr3'), R('Reels / video edits','clapperboard',12,25,'reels','High',30,''), R('Infographics','bar-chart-3',6,20,'infographics','Medium',20,''), R('Thumbnails & banners','panels-top-left',20,25,'assets','Low',10,'') ],
      'Web Developers':[ R('Landing pages built','code',8,25,'pages','High',40,''), R('Bug fixes','bug',40,25,'fixes','High',25,''), R('Core Web Vitals fixes','gauge',20,20,'fixes','Medium',20,'tl3'), R('Broken link fixes','link',60,25,'links','Low',15,'jr2') ],
      'SMM':[ R('Platform posts','share-2',60,25,'posts','High',40,''), R('Community responses','messages-square',200,25,'replies','Medium',25,''), R('Stories / reels','clapperboard',20,25,'stories','High',25,''), R('Influencer outreach','users',10,20,'contacts','Low',10,'') ],
      'SEO':[ R('Backlinks','link',200,25,'backlinks','High',30,'jr2'), R('On-page optimizations','search',120,25,'pages','Medium',25,'jr1'), R('Technical SEO fixes','settings-2',40,20,'fixes','Medium',20,'tl3'), R('Keyword research','key-round',80,25,'keywords','High',25,'sr2') ],
    }[d]||[];
  }
  EP_PLANS(){ return [
    { id:'EP-001', name:'Jul Content Effort Plan', division:'Content Writer', period:'Jul 2026', owner:'Sameer Iyer', dept:'Content', campaign:'Content Engine Q3', okr:'Launch 30 High-Quality Content Pieces', start:'Jul 1, 2026', end:'Jul 31, 2026', type:'Monthly', status:'Active', rows:this.EP_DIV_ROWS('Content Writer') },
    { id:'EP-002', name:'Jul SEO Effort Plan', division:'SEO', period:'Jul 2026', owner:'Neha Verma', dept:'SEO', campaign:'Q3 SEO push', okr:'Increase Organic Traffic by 50%', start:'Jul 1, 2026', end:'Jul 31, 2026', type:'Monthly', status:'Active', rows:this.EP_DIV_ROWS('SEO') },
    { id:'EP-003', name:'Jul Graphics Effort Plan', division:'Graphics', period:'Jul 2026', owner:'Neha Verma', dept:'Design', campaign:'Social Push Q1', okr:'Grow Social Engagement 3×', start:'Jul 1, 2026', end:'Jul 31, 2026', type:'Monthly', status:'Draft', rows:this.EP_DIV_ROWS('Graphics') },
  ]; }
  allEpPlans(){ return this.EP_PLANS().concat(this.state.epAdded||[]); }
  epKpiPool(){ return [].concat((this.MY_KPIS().junior||[]).map(k=>({...k,who:'Junior'})),(this.MY_KPIS().senior||[]).map(k=>({...k,who:'Senior'})),(this.MY_KPIS().team_lead||[]).map(k=>({...k,who:'Team Lead'})),this.allKpiTemplates().filter(t=>t.status==='Active').map(t=>({ id:t.id, kpi:t.name, unit:t.unit, baseline:'0', target:t.defTarget, current:'0', freq:t.freq, who:'Template' }))); }
  KPI_TEMPLATES(){ return [
    { id:'kt1', name:'Organic Sessions', category:'Traffic', division:'SEO', unit:'sessions', direction:'Increase', defTarget:'100,000', freq:'Monthly', source:'GA4', desc:'Total organic search sessions on tracked domains.', status:'Active', owner:'Priya Nair', updated:'Jun 10, 2026' },
    { id:'kt2', name:'Keywords in Top 10', category:'SEO', division:'SEO', unit:'keywords', direction:'Increase', defTarget:'250', freq:'Weekly', source:'Semrush', desc:'Tracked keywords ranking in positions 1–10.', status:'Active', owner:'Priya Nair', updated:'Jun 10, 2026' },
    { id:'kt3', name:'Referring Domains', category:'SEO', division:'SEO', unit:'domains', direction:'Increase', defTarget:'200', freq:'Monthly', source:'Ahrefs', desc:'Unique referring domains pointing to the site.', status:'Active', owner:'Priya Nair', updated:'May 28, 2026' },
    { id:'kt4', name:'Articles Published', category:'Content', division:'Content', unit:'articles', direction:'Increase', defTarget:'12', freq:'Monthly', source:'KPI Log', desc:'QC-approved articles published in the period.', status:'Active', owner:'Aditi Rao', updated:'Jun 18, 2026' },
    { id:'kt5', name:'Avg. Engagement Rate', category:'Social', division:'SMM', unit:'%', direction:'Increase', defTarget:'4.5', freq:'Weekly', source:'Platform APIs', desc:'Average engagement across social platforms.', status:'Active', owner:'Aditi Rao', updated:'Jun 5, 2026' },
    { id:'kt6', name:'Page Load Time', category:'Technical', division:'Web Developers', unit:'seconds', direction:'Decrease', defTarget:'2.0', freq:'Weekly', source:'Lighthouse', desc:'Median LCP across key templates.', status:'Active', owner:'Priya Nair', updated:'Jun 1, 2026' },
    { id:'kt7', name:'Conversion Rate', category:'Conversion', division:'All', unit:'%', direction:'Increase', defTarget:'4.5', freq:'Monthly', source:'GA4', desc:'Sitewide goal conversion rate.', status:'Active', owner:'Priya Nair', updated:'May 20, 2026' },
    { id:'kt8', name:'Creatives Delivered', category:'Design', division:'Graphics', unit:'assets', direction:'Increase', defTarget:'40', freq:'Monthly', source:'KPI Log', desc:'QC-approved design assets delivered.', status:'Draft', owner:'Aditi Rao', updated:'Jun 22, 2026' },
  ]; }
  allKpiTemplates(){ const upd=this.state.ktUpd||{}; return this.KPI_TEMPLATES().concat(this.state.ktAdded||[]).map(t=>upd[t.id]?{...t,...upd[t.id]}:t); }
  OKR_TEMPLATES(){ return [
    { id:'ot1', name:'Organic Growth OKR', category:'SEO', scope:'Department', division:'SEO', objective:'Increase organic traffic by X% this quarter', desc:'Standard quarterly SEO growth objective — traffic, rankings and authority.', status:'Active', owner:'Priya Nair', updated:'Jun 15, 2026', krs:[ {t:'Grow organic sessions', kpi:'Organic Sessions', unit:'sessions', target:'100,000', weight:'40', freq:'Monthly'}, {t:'Increase keywords in top 10', kpi:'Keywords in Top 10', unit:'keywords', target:'250', weight:'30', freq:'Weekly'}, {t:'Build referring domains', kpi:'Referring Domains', unit:'domains', target:'200', weight:'30', freq:'Monthly'} ] },
    { id:'ot2', name:'Content Engine OKR', category:'Content', scope:'Department', division:'Content', objective:'Ship consistent, high-quality content every month', desc:'Publishing cadence and content-led traffic objective.', status:'Active', owner:'Aditi Rao', updated:'Jun 18, 2026', krs:[ {t:'Publish articles on schedule', kpi:'Articles Published', unit:'articles', target:'12', weight:'50', freq:'Monthly'}, {t:'Grow content-led sessions', kpi:'Organic Sessions', unit:'sessions', target:'40,000', weight:'50', freq:'Monthly'} ] },
    { id:'ot3', name:'Site Performance OKR', category:'Technical', scope:'Department', division:'Web Developers', objective:'Make the site measurably faster and more stable', desc:'Core Web Vitals and technical health objective.', status:'Active', owner:'Priya Nair', updated:'Jun 1, 2026', krs:[ {t:'Cut median page load time', kpi:'Page Load Time', unit:'seconds', target:'2.0', weight:'60', freq:'Weekly'}, {t:'Lift conversion rate', kpi:'Conversion Rate', unit:'%', target:'4.5', weight:'40', freq:'Monthly'} ] },
    { id:'ot4', name:'Social Engagement OKR', category:'Social', scope:'Department', division:'SMM', objective:'Grow engaged social audience across platforms', desc:'Engagement-first social objective.', status:'Draft', owner:'Aditi Rao', updated:'Jun 22, 2026', krs:[ {t:'Raise average engagement rate', kpi:'Avg. Engagement Rate', unit:'%', target:'4.5', weight:'100', freq:'Weekly'} ] },
  ]; }
  allOkrTemplates(){ const upd=this.state.otUpd||{}; return this.OKR_TEMPLATES().concat(this.state.otAdded||[]).map(t=>upd[t.id]?{...t,...upd[t.id]}:t); }
  fmtDate(v){ if(!v) return v; const m=String(v).match(/^(\d{4})-(\d{2})-(\d{2})$/); if(!m) return v; const M=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']; return M[parseInt(m[2],10)-1]+' '+parseInt(m[3],10)+', '+m[1]; }
  fmtMonth(v){ if(!v) return v; const m=String(v).match(/^(\d{4})-(\d{2})$/); if(!m) return v; const M=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']; return M[parseInt(m[2],10)-1]+' '+m[1]; }
  filesView(){
    const rk=this.state.roleKey;
    const me=this.currentPerson();
    const own=['senior','junior'].includes(rk);
    const fileType=(n)=>{ const e=String(n).split('.').pop().toLowerCase();
      if(['png','jpg','jpeg','gif','webp','svg'].includes(e)) return {t:'Image',icon:'image',color:'var(--orchid-600)',bg:'var(--orchid-100)'};
      if(['mp4','mov','webm'].includes(e)) return {t:'Video',icon:'video',color:'var(--info-600)',bg:'var(--info-100)'};
      if(e==='pdf') return {t:'PDF',icon:'file-text',color:'var(--danger-600)',bg:'var(--danger-100, #F7E3E6)'};
      if(['xlsx','csv','xls'].includes(e)) return {t:'Spreadsheet',icon:'table',color:'var(--verify-600)',bg:'var(--verify-100)'};
      return {t:'Document',icon:'file',color:'var(--ink-500)',bg:'var(--surface-50)'}; };
    let files=[];
    // message attachments — collected from every thread
    this.allThreads().forEach(th=>th.msgs.forEach(m=>(m.files||[]).forEach(n=>{
      if(own && m.who!==me) return;
      files.push({ name:n, source:'Message attachment', by:m.who,
        task:{ id:th.name, name:'“'+String(m.text).slice(0,48)+'”', status:'Shared', start:String(m.when).split(' · ')[0], end:'—', assignee:m.who } });
    })));
    this.allTasks().forEach(t=>{
      if(own && t.assignee!==me) return;
      const ov=this.tkOv?this.tkOv(t):t;
      (ov.evidence||t.evidence||[]).forEach(n=>files.push({ name:n, source:'Task evidence', by:t.assignee, task:t }));
      (ov.comments||t.comments||[]).forEach(c=>(c.files||[]).forEach(n=>{ if(String(n).indexOf('http')===0) return; files.push({ name:n, source:(c.role||'').indexOf('QC')>=0?'QC reference':'Comment attachment', by:c.who, task:t }); }));
    });
    const F=this.state.flFilters||{type:'All',status:'All',source:'All'};
    const setF=(k)=>(e)=>this.setState({ flFilters:{...F,[k]:e.target.value}, pg:{...(this.state.pg||{}),fl:0} });
    const q=(this.state.flQuery||'').toLowerCase();
    const enriched=files.map(f=>{ const ft=fileType(f.name); const tn=this.tkTone(f.task.status); const due=this.tkDueAlert?this.tkDueAlert(f.task):null;
      return { ...f, type:ft.t, ftIcon:ft.icon, ftColor:ft.color, ftBg:ft.bg,
        taskId:f.task.id, taskName:f.task.name, status:f.task.status, statusBg:tn.bg, statusColor:tn.c,
        dates:f.task.start+' → '+f.task.end, dueLabel:due&&due.label?due.label:'', dueColor:due&&due.color?due.color:'var(--ink-400)',
        open:()=>{ if(f.source==='Message attachment') this.setState({ route:'messages' });
          else this.setState({ route:'tasks', tkOpen:f.task.id, tkFilter:'All' }); } }; });
    const filtered=enriched.filter(f=> (F.type==='All'||f.type===F.type) && (F.status==='All'||f.status===F.status) && (F.source==='All'||f.source===F.source) && (!q || (f.name+' '+f.taskName+' '+f.by).toLowerCase().includes(q)) );
    const pg=this.pgData('fl',filtered,10);
    const K=(label,value,color)=>({label,value,color});
    return {
      flStats:[K('All files',String(enriched.length),'var(--beet-700)'),K('Images',String(enriched.filter(f=>f.type==='Image').length),'var(--orchid-600)'),K('Documents & PDFs',String(enriched.filter(f=>['Document','PDF','Spreadsheet'].includes(f.type)).length),'var(--info-600)'),K('Videos',String(enriched.filter(f=>f.type==='Video').length),'var(--verify-600)'),K('On tasks awaiting QC',String(enriched.filter(f=>f.status==='Submitted').length),'var(--warn-600)')],
      flRows:pg.rows, flPg:pg, flEmpty:filtered.length===0,
      flOwnNote:own,
      flFilterDefs:[
        {label:'Type',value:F.type,onChange:setF('type'),options:['All','Image','Video','PDF','Spreadsheet','Document']},
        {label:'Source',value:F.source,onChange:setF('source'),options:['All','Task evidence','QC reference','Comment attachment','Message attachment']},
        {label:'Task status',value:F.status,onChange:setF('status'),options:['All','Assigned','In Progress','Submitted','Rework','Approved','Closed']},
      ],
      flQuery:this.state.flQuery||'',
      flOnQuery:(e)=>this.setState({ flQuery:e.target.value, pg:{...(this.state.pg||{}),fl:0} }),
      flReset:()=>this.setState({ flFilters:{type:'All',status:'All',source:'All'}, flQuery:'' }),
    };
  }
  effortView(){
    const rk=this.state.roleKey;
    const canEdit=['manager','team_lead','admin'].includes(rk);
    const division=this.state.epDivision||'SEO';
    const f=this.state.epForm||this.EP_FORM();
    const rows=this.state.epRows||this.EP_DIV_ROWS(division);
    const setF=(k)=>(e)=>this.setState({ epForm:{...f,[k]:e.target.value} });
    const setRow=(i,k)=>(e)=>{ const arr=rows.map((r,j)=>j===i?{...r,[k]: (k==='monthly'||k==='weight'||k==='days')?(parseInt(e.target.value,10)||0):e.target.value}:r); this.setState({ epRows:arr }); };
    // list view — filters: year (FY), period (monthly/quarterly), role/division
    const EF=this.state.epFilters||{year:'All',period:'All',role:'All'};
    const setEF=(k)=>(e)=>this.setState({ epFilters:{...EF,[k]:e.target.value} });
    const planYear=(p)=>{ const m=String(p.period||'').match(/20\d\d/); return m?('FY '+m[0]):'FY 2026'; };
    const planPtype=(p)=> /q[1-4]/i.test(p.period||'')?'Quarterly':'Monthly';
    const epYears=['All'].concat([...new Set(this.allEpPlans().map(planYear))].sort()).concat(['FY 2024 - Q1','FY 2025 - Q1','Custom…']);
    const epFiltered=this.allEpPlans().filter(p=> (EF.year==='All'||planYear(p)===EF.year||String(p.period||'').includes(String(EF.year).replace('FY ',''))) && (EF.period==='All'||planPtype(p)===EF.period) && (EF.role==='All'||p.division===EF.role) );
    const plans=epFiltered.map(p=>{
      const total=p.rows.reduce((s,r)=>s+(r.monthly||0),0);
      const linked=p.rows.filter(r=>r.kpiId).length;
      return { id:p.id, name:p.name, division:p.division, period:p.period, owner:p.owner, status:p.status,
        statusBg:p.status==='Active'?'var(--verify-100)':'var(--surface-50)', statusColor:p.status==='Active'?'var(--verify-600)':'var(--ink-500)',
        efforts:p.rows.length+' efforts', total:total.toLocaleString('en-US')+' units / month', linked:linked+' KPI-linked',
        divIcon:{'Content Writer':'file-text','Graphics':'image','Web Developers':'code','SMM':'share-2','SEO':'search'}[p.division]||'gauge',
        campaignName:p.campaign||'—', okrName:p.okr||'—',
        openCampaign:(e)=>{ if(e)e.stopPropagation(); const resolved=this.campaignOpt(p.campaign); const c=this.allCampaigns().find(x=>x.name===resolved);
          if(c) this.setState({ route:'campaigns', cmpOpen:c.id, cmpTab:'chain' }); else this.flash('No campaign matches "'+p.campaign+'" yet.'); },
        openOkr:(e)=>{ if(e)e.stopPropagation(); const o=this.allOkrs().find(x=>x.title===p.okr);
          if(o) this.setState({ route:'okr', okrOpen:o.id }); else this.flash('No OKR matches "'+p.okr+'" yet.'); },
        edit:()=>this.setState({ epView:'create', epPlanId:p.id, epDivision:p.division, epForm:{ name:p.name, quarter:p.period, campaign:p.campaign, dept:p.dept, owner:p.owner, okr:p.okr, start:p.start, end:p.end, type:p.type }, epRows:p.rows.map(r=>({...r})) }),
      };
    });
    const kpiOpts=[{id:'',label:'None — effort only'}].concat(this.epKpiPool().map(k=>({ id:k.id, label:k.id.toUpperCase()+' · '+k.kpi+' — '+k.who })));
    const totalW=rows.reduce((s,r)=>s+(r.weight||0),0);
    const epRows=rows.map((r,i)=>{
      const weekly=Math.ceil((r.monthly||0)/4), daily=Math.ceil((r.monthly||0)/(r.days||25));
      const k=this.epKpiPool().find(x=>x.id===r.kpiId);
      const kids=(r.kpiIds&&r.kpiIds.length)?r.kpiIds:(r.kpiId?[r.kpiId]:[]);
      const kobjs=kids.map(id=>this.epKpiPool().find(x=>x.id===id)).filter(Boolean);
      const ts=this.allTasks().filter(t=>t.effortType===r.type||t.template===r.type||t.name===r.type||(t.kpiId&&kids.includes(t.kpiId)));
      const expTasks=(this.state.epRowExpanded||[]).includes(r.type);
      return { ...r, i, monthly:String(r.monthly||0), weekly:weekly.toLocaleString('en-US'), daily:daily.toLocaleString('en-US'), weightStr:String(r.weight||0),
        kpiLabel:k?k.kpi:'—', hasKpi:!!k,
        kpiChips:kobjs.map(o=>({ label:o.kpi, sub:o.baseline+' → '+o.target+' '+o.unit,
          remove:()=>{ const nk=kids.filter(x=>x!==o.id); this.setState({ epRows:rows.map((x,j)=>j===i?{...x,kpiIds:nk,kpiId:nk[0]||''}:x) }); } })),
        kpiCountLabel:kobjs.length?(kobjs.length+' KPI'+(kobjs.length===1?'':'s')+' linked'):'Effort only — no KPI linked',
        addKpiVal:'',
        addKpi:(e)=>{ const v=e.target.value; if(!v||kids.includes(v)) return; const nk=[...kids,v];
          this.setState({ epRows:rows.map((x,j)=>j===i?{...x,kpiIds:nk,kpiId:nk[0]}:x) });
          const kk=this.epKpiPool().find(x=>x.id===v); this.flash((kk?kk.kpi:'KPI')+' linked to “'+r.type+'” — one effort can drive several KPIs.'); },
        kpiAddOptions:[{id:'',label:'+ Link another KPI…'}].concat(this.epKpiPool().filter(x=>!kids.includes(x.id)).map(x=>({id:x.id,label:x.kpi+' — '+x.who}))),
        kpiChain:kobjs.length?kobjs.map(o=>o.kpi+' · '+o.baseline+' → '+o.target+' '+o.unit).join('   |   '):'Effort only — no KPI linked',
        taskCount:String(ts.length), taskDone:String(ts.filter(t=>['Approved','Closed'].includes(t.status)).length),
        taskToggle:(expTasks?'Hide':'Show')+' '+ts.length+' task'+(ts.length===1?'':'s'),
        tasksExpanded:expTasks, tasksEmpty:ts.length===0,
        toggleTasks:()=>{ const cur=this.state.epRowExpanded||[]; this.setState({ epRowExpanded: cur.includes(r.type)?cur.filter(x=>x!==r.type):[...cur,r.type] }); },
        taskRows:ts.slice(0,10).map(t=>{ const tn=this.tkTone(t.status);
          return { id:t.id, name:t.name, dates:t.start+' → '+t.end, who:t.assignee, status:t.status, statusBg:tn.bg, statusColor:tn.c,
            open:()=>this.setState({ route:'tasks', tkOpen:t.id, tkFilter:'All' }) }; }),
        priDot:{Critical:'var(--danger-500)',High:'var(--warn-500)',Medium:'var(--verify-500)',Low:'var(--info-500)'}[r.priority]||'var(--ink-400)',
        setMonthly:setRow(i,'monthly'), setWeight:setRow(i,'weight'), setPriority:setRow(i,'priority'), setKpi:setRow(i,'kpiId'), kpiOpts,
        setType:setRow(i,'type'), setUnit:setRow(i,'unit'),
        remove:()=>{ const arr=rows.slice(); arr.splice(i,1); this.setState({ epRows:arr }); }, canRemove:rows.length>1 };
    });
    const alloc=epRows.map(r=>({ type:r.type, icon:r.icon, label:Number(r.monthly).toLocaleString('en-US')+' '+r.unit+' / month', w:Math.min(100,r.weight*3)+'%', weight:r.weight+'%' }));
    // effort vs outcome report
    const view=this.state.epView||'list';
    const num=(v)=>parseFloat(String(v).replace(/,/g,''))||0;
    const pc2=(p)=> p>=70?'var(--verify-500)': p>=40?'var(--warn-500)':'var(--danger-500)';
    const kpiCur=(k)=>{ const r=this.juniorRollup(k.id); if(r.total>0) return r.val; const rep=(this.state.kpiActuals||{})[k.id]; return num(rep?rep.val:k.current); };
    const RF=this.state.epRepFilters||{year:'All',month:'All',role:'All'};
    const setRF=(k)=>(e)=>this.setState({ epRepFilters:{...RF,[k]:e.target.value} });
    const rYear=(p)=>{ const m=String(p.period||'').match(/20\d\d/); return m?('FY '+m[0]):'FY 2026'; };
    const rMonth=(p)=>{ const m=String(p.period||'').match(/^[A-Za-z]{3}/); return m?m[0]:'—'; };
    const repPlans=this.allEpPlans().filter(p=> (RF.year==='All'||rYear(p)===RF.year) && (RF.month==='All'||rMonth(p)===RF.month) && (RF.role==='All'||p.division===RF.role) ).map(p=>{
      const rowsR=p.rows.map(r=>{
        const tasks=this.allTasks().filter(t=>t.effortPlan===p.name && ((t.effortType&&t.effortType===r.type)||(!t.effortType&&t.name.indexOf(r.type)===0)));
        const appr=tasks.filter(t=>t.status==='Approved');
        const delivered=appr.reduce((s,t)=>s+(t.units||0),0);
        const effortPct=r.monthly?Math.min(100,Math.round(delivered/r.monthly*100)):0;
        const k=this.epKpiPool().find(x=>x.id===r.kpiId);
        let outcome=null;
        if(k){ const cur=kpiCur(k); const ach=Math.min(999,Math.round(cur/num(k.target)*100)); outcome={ kpi:k.kpi, baseline:k.baseline, current:cur.toLocaleString('en-US'), target:k.target, unit:k.unit, ach:ach+'%', achColor:pc2(ach) }; }
        const health = !tasks.length? {label:'No tasks yet',bg:'var(--surface-50)',color:'var(--ink-500)'} : effortPct>=100?{label:'Achieved',bg:'var(--verify-100)',color:'var(--verify-600)'}: effortPct>=60?{label:'On track',bg:'var(--info-100)',color:'var(--info-600)'}:{label:'Behind',bg:'var(--warn-100)',color:'var(--warn-600)'};
        return { type:r.type, icon:r.icon, target:(r.monthly||0).toLocaleString('en-US')+' '+r.unit, tasksLabel:appr.length+' / '+tasks.length+' approved', hasTasks:tasks.length>0,
          delivered:delivered.toLocaleString('en-US')+' '+r.unit, effortPct:effortPct+'%', effortW:effortPct+'%', effortColor:pc2(effortPct),
          hasOutcome:!!outcome, noOutcome:!outcome, outcome:outcome||{}, health, epPct:effortPct };
      });
      const avgE=rowsR.length?Math.round(rowsR.reduce((s,r)=>s+r.epPct,0)/rowsR.length):0;
      return { id:p.id, name:p.name, division:p.division, period:p.period, owner:p.owner, rows:rowsR, avg:avgE+'% effort delivered', avgColor:pc2(avgE),
        divIcon:{'Content Writer':'file-text','Graphics':'image','Web Developers':'code','SMM':'share-2','SEO':'search'}[p.division]||'gauge' };
    });
    const allR=repPlans.reduce((a,p)=>a.concat(p.rows),[]);
    const achieved=allR.filter(r=>r.health.label==='Achieved').length;
    const onTrackC=allR.filter(r=>r.health.label==='On track').length;
    const behind=allR.filter(r=>r.health.label==='Behind').length;
    const avgEffort=allR.length?Math.round(allR.reduce((s,r)=>s+r.epPct,0)/allR.length):0;
    const withOutcome=allR.filter(r=>r.hasOutcome);
    const avgOutcome=withOutcome.length?Math.round(withOutcome.reduce((s,r)=>s+Math.min(100,parseInt(r.outcome.ach,10)),0)/withOutcome.length):0;
    const seg=(active)=>'display:flex;align-items:center;gap:7px;padding:8px 15px;border:none;border-radius:9px;font-size:13px;font-weight:700;cursor:pointer;'+(active?'background:#fff;color:var(--beet-700);box-shadow:var(--shadow-xs)':'background:none;color:var(--ink-500)');
    return {
      epIsList:view==='list', epIsCreate:view==='create', epIsReport:view==='report', epNotCreate:view!=='create',
      epShowList:()=>this.setState({ epView:'list' }), epShowReport:()=>this.setState({ epView:'report' }),
      epSegListStyle:seg(view==='list'), epSegReportStyle:seg(view==='report'),
      epRepPlans:repPlans,
      epRepFilterDefs:[
        {label:'Year',value:RF.year,onChange:setRF('year'),options:['All'].concat([...new Set(this.allEpPlans().map(rYear))].sort())},
        {label:'Month',value:RF.month,onChange:setRF('month'),options:['All'].concat([...new Set(this.allEpPlans().map(rMonth))].filter(m=>m!=='—'))},
        {label:'Role / division',value:RF.role,onChange:setRF('role'),options:['All'].concat(this.EP_DIVISIONS())},
      ],
      epRepReset:()=>this.setState({ epRepFilters:{year:'All',month:'All',role:'All'} }),
      epRepStats:[
        {label:'Efforts tracked',value:String(allR.length),color:'var(--beet-700)',icon:'gauge'},
        {label:'Achieved',value:String(achieved),color:'var(--verify-600)',icon:'check-circle-2'},
        {label:'On track',value:String(onTrackC),color:'var(--info-600)',icon:'trending-up'},
        {label:'Behind',value:String(behind),color:'var(--warn-600)',icon:'alert-triangle'},
        {label:'Avg effort delivered',value:avgEffort+'%',color:'var(--orchid-600)',icon:'list-checks'},
        {label:'Avg outcome (KPI)',value:avgOutcome+'%',color:'var(--info-600)',icon:'target'},
      ],
      epPlans:plans, epDivision:division,
      epDivOptions:this.EP_DIVISIONS(),
      epSetDivision:(e)=>{ if(e.target.value==='__add'){ this.setState({ epAddingDiv:true }); return; } this.setState({ epDivision:e.target.value }); },
      epFilterDefs:[
        {label:'Year',value:EF.year,onChange:setEF('year'),options:epYears},
        {label:'Period',value:EF.period,onChange:setEF('period'),options:['All','Monthly','Quarterly']},
        {label:'Role / division',value:EF.role,onChange:setEF('role'),options:['All'].concat(this.EP_DIVISIONS())},
      ],
      epResetFilters:()=>this.setState({ epFilters:{year:'All',period:'All',role:'All'} }),
      epAddingDiv:this.state.epAddingDiv,
      epNewDiv:this.state.epNewDiv||'',
      epOnNewDiv:(e)=>this.setState({ epNewDiv:e.target.value }),
      epSaveDiv:()=>{ const n=(this.state.epNewDiv||'').trim(); if(!n){ this.flash('Enter a role / division name.'); return; } if(this.EP_DIVISIONS().includes(n)){ this.flash('"'+n+'" already exists.'); this.setState({ epAddingDiv:false, epNewDiv:'', epDivision:n }); return; } this.setState({ epCustomDivs:[...(this.state.epCustomDivs||[]),n], epDivision:n, epAddingDiv:false, epNewDiv:'' }); this.flash('Custom role "'+n+'" added — create its effort plan.'); },
      epCancelDiv:()=>this.setState({ epAddingDiv:false, epNewDiv:'' }),
      epNew:()=>{ const d=this.state.epDivision||'Content Writer'; const deptMap={'Content Writer':'Content','Graphics':'Design','Web Developers':'Web Development','SMM':'SMM','SEO':'SEO'}; this.setState({ epView:'create', epPlanId:null, epForm:{ ...this.EP_FORM(), name:'Jul '+d+' Effort Plan', dept:deptMap[d]||d }, epRows:this.EP_DIV_ROWS(d).map(r=>({...r})) }); },
      epBack:()=>this.setState({ epView:'list' }),
      epAddRow:()=>this.setState({ epRows:[...rows,{ type:'Custom effort — name it', icon:'plus', monthly:0, days:25, unit:'units', priority:'Medium', weight:0, kpiId:'', custom:true }] }),
      epSave:()=>{ const totalW=rows.reduce((s,r)=>s+(r.weight||0),0); if(!f.name.trim()){ this.flash('Name the plan.'); return; }
        const existing=(this.state.epAdded||[]).find(p=>p.id===this.state.epPlanId);
        const plan={ id:this.state.epPlanId||('EP-'+String(this.allEpPlans().length+1).padStart(3,'0')), name:f.name, division, period:this.fmtMonth(f.quarter), owner:f.owner, dept:f.dept, campaign:f.campaign, okr:f.okr, start:this.fmtDate(f.start), end:this.fmtDate(f.end), type:f.type, status: totalW===100?'Active':'Draft', rows:rows.map(r=>({...r})) };
        const added= existing ? (this.state.epAdded||[]).map(p=>p.id===plan.id?plan:p) : [...(this.state.epAdded||[]),plan];
        this.setState({ epAdded:added, epView:'list', epPlanId:plan.id });
        this.flash('Effort plan “'+f.name+'” saved for '+division+(totalW===100?'.':' — weightages incomplete, saved as Draft.')); },
      epForm:f, epRows2:epRows, epAlloc:alloc, epCanEdit:canEdit,
      epIsEdit:!!this.state.epPlanId,
      epEditTitle:this.state.epPlanId?('Edit effort plan · '+this.state.epPlanId):'Create effort plan',
      epEditSub:this.state.epPlanId?'Saved plan — every effort shows its linked KPI and the tasks generated from it.':'Define effort targets, convert them to KPIs and auto-generate tasks for the period.',
      epSaveLabel:this.state.epPlanId?'Save changes':'Save plan',
      epSetName:setF('name'), epSetQuarter:setF('quarter'), epSetCampaign:setF('campaign'), epSetDept:setF('dept'), epSetOwner:setF('owner'), epSetOkr:setF('okr'), epSetStart:setF('start'), epSetEnd:setF('end'), epSetType:setF('type'),
      epTotalW:totalW+'%', epTotalWColor: totalW===100?'var(--verify-600)':'var(--danger-600)',
      epBalanced: totalW===100,
      epBalanceMsg: totalW===100?'All targets balanced — ready for task generation.':'Weightages must total 100% (currently '+totalW+'%).',
      epGenerated:this.state.epGenerated,
      epGenerate:()=>this.epGenerate(),
      ...(()=>{ const mode=this.state.epGenMode||'One task per effort line';
        const live=rows.filter(r=>r.monthly);
        const count=mode==='Weekly batches'?live.length*4
          :mode==='One task per deliverable'?live.reduce((s,r)=>s+Math.min(r.monthly,31),0)
          :live.length;
        return {
          epGenModes:['One task per effort line','Weekly batches','One task per deliverable'].map(m=>({ label:m, active:mode===m,
            style:'padding:7px 13px;border-radius:999px;font-size:11.5px;font-weight:700;cursor:pointer;border:1px solid '+(mode===m?'#fff':'rgba(255,255,255,.35)')+';background:'+(mode===m?'#fff':'transparent')+';color:'+(mode===m?'var(--beet-700)':'rgba(255,255,255,.9)'),
            set:()=>this.setState({ epGenMode:m }) })),
          epGenPreview:'Will create '+count+' task'+(count===1?'':'s')+' from '+live.length+' effort line'+(live.length===1?'':'s'),
          epGenWarn:count>20?('That is a lot of tasks — consider “One task per effort line”.'):'' }; })(),
      epOwnerOptions:['Neha Verma','Sameer Iyer'],
    };
  }
  epGenerate(){
    const f=this.state.epForm||this.EP_FORM();
    const rows=this.state.epRows||this.EP_DIV_ROWS(this.state.epDivision||'SEO');
    const totalW=rows.reduce((s,r)=>s+(r.weight||0),0);
    if(totalW!==100){ this.flash('Rebalance first — weightages must total 100%.'); return; }
    const who=this.currentPerson();
    const division=this.state.epDivision||'SEO';
    const added=[...(this.state.tkAdded||[])];
    const startFmt=this.fmtDate(f.start)||'Jul 1, 2026';
    const monthWord=startFmt.split(' ')[0];
    const year=startFmt.split(', ')[1]||'2026';
    const mk=(name,desc,units,end,checklist,r,k)=>{
      const id='TSK-'+(2060+added.length+1);
      added.push({ id, name, desc, template:'Effort plan', project:f.campaign, campaign:f.campaign, start:f.start, end, priority:r.priority, assignee:f.owner, kpiId:r.kpiId||'', kpi:k?k.kpi:'Not linked', units, unit:r.unit, estH:0, actH:0, recurrence:'None', reviewer:who, effortPlan:f.name, effortType:r.type, division, checklist, dep:'—', evidence:[], status:'Assigned', activity:[[who,'Generated from effort plan “'+f.name+'”',this.todayStr()]] });
    };
    // generation mode is explicit — default is ONE task per effort line, so a
    // 60-unit target no longer explodes into 60 tasks unless deliberately chosen.
    const mode=this.state.epGenMode||'One task per effort line';
    const already=(this.state.tkAdded||[]).filter(t=>t.effortPlan===f.name);
    if(already.length){ this.flash(already.length+' tasks already exist for “'+f.name+'”. Delete them first to regenerate.'); return; }
    let n=0;
    rows.forEach(r=>{
      if(!r.monthly) return;
      const k=this.epKpiPool().find(x=>x.id===r.kpiId);
      const days=r.days||25;
      const unitOne=r.unit.replace(/s$/,'');
      if(mode==='Weekly batches'){
        const perWeek=Math.ceil(r.monthly/4);
        for(let w=1;w<=4;w++){
          mk(r.type+' — week '+w+' of 4 ('+perWeek.toLocaleString('en-US')+' '+r.unit+')',
            'Weekly batch '+w+' of 4 · period target '+r.monthly.toLocaleString('en-US')+' '+r.unit+'.',
            perWeek, monthWord+' '+Math.min(28,w*7)+', '+year,
            [{t:'Hit weekly batch of '+perWeek.toLocaleString('en-US')+' '+r.unit,done:false},{t:'Attach work log as evidence',done:false},{t:'Submit for QC',done:false}], r, k);
          n++;
        }
      } else if(mode==='One task per deliverable'){
        const cap=Math.min(r.monthly, 31); // hard ceiling — protects against runaway generation
        for(let i=1;i<=cap;i++){
          const day=Math.min(28, Math.max(1, Math.ceil(i*days/cap)));
          mk(r.type+' — '+i+' of '+cap, 'Deliverable '+i+' of '+cap+' from '+f.name+'.', 1,
            monthWord+' '+day+', '+year,
            [{t:'Produce 1 '+unitOne,done:false},{t:'Attach deliverable as evidence',done:false},{t:'Submit for QC',done:false}], r, k);
          n++;
        }
      } else {
        // default — a single task carrying the whole target for that effort line
        mk(r.type+' — '+r.monthly.toLocaleString('en-US')+' '+r.unit,
          'Effort line from '+f.name+' · target '+r.monthly.toLocaleString('en-US')+' '+r.unit+
          ' over '+days+' working days ('+Math.ceil(r.monthly/days).toLocaleString('en-US')+'/day).',
          r.monthly, monthWord+' 28, '+year,
          [{t:'Deliver '+r.monthly.toLocaleString('en-US')+' '+r.unit,done:false},{t:'Attach work log as evidence',done:false},{t:'Submit for QC',done:false}], r, k);
        n++;
      }
    });
    this.setState({ tkAdded:added, epGenerated:true, route:'tasks', tkFilter:f.name });
    this.flash(n+' task'+(n===1?'':'s')+' generated from '+rows.filter(r=>r.monthly).length+' effort line'+(rows.filter(r=>r.monthly).length===1?'':'s')+' · mode “'+mode+'” · assigned to '+f.owner+'.');
  }

  IDEAS(){ return [
    { id:'CI-001', title:'Plant Based Protein Benefits: Complete Guide', source:'SEO Audit', type:'Blog', category:'Nutrition', priority:'High', owner:'Sameer Iyer', service:'Content Writing', effortPlan:'Jul Content Effort Plan', quarter:'Q3 2026', publishMonth:'Aug 2026', keyword:'plant based protein benefits', intent:'Informational', objective:'Build topical authority around plant nutrition; target the featured snippet.', status:'Approved', qcFeedback:'QC approved — strong keyword cluster, proceed.', taskId:'', reuse:1 },
    { id:'CI-002', title:'Whey vs Plant Protein: Evidence-based Comparison', source:'Customer Question', type:'Blog', category:'Nutrition', priority:'High', owner:'Sameer Iyer', service:'Content Writing', effortPlan:'Jul Content Effort Plan', quarter:'Q3 2026', publishMonth:'Jul 2026', keyword:'plant protein vs whey', intent:'Commercial', objective:'Capture comparison-intent searches feeding the protein hub.', status:'Approved', qcFeedback:'QC approved — align with pillar page.', taskId:'TSK-2052', reuse:0 },
    { id:'CI-003', title:'FAQ: Nutraceutical Compliance for US Market', source:'Sales Team', type:'FAQ', category:'Compliance', priority:'Medium', owner:'Sameer Iyer', service:'Content Writing', effortPlan:'Jul Content Effort Plan', quarter:'Q3 2026', publishMonth:'Aug 2026', keyword:'nutraceutical fda compliance', intent:'Informational', objective:'Answer the top 12 pre-sales compliance questions.', status:'Submitted for QC', qcFeedback:'', taskId:'', reuse:0 },
    { id:'CI-004', title:'Infographic: Beetroot Bioavailability Pathways', source:'Research Team', type:'Infographic', category:'Science', priority:'Medium', owner:'Neha Verma', service:'Content Writing', effortPlan:'Jul Graphics Effort Plan', quarter:'Q3 2026', publishMonth:'Sep 2026', keyword:'beetroot bioavailability', intent:'Informational', objective:'Repurpose lab findings into shareable science visual.', status:'Idea Captured', qcFeedback:'', taskId:'', reuse:0 },
    { id:'CI-005', title:'Case Study: 3× Organic Traffic for Food Research Lab', source:'Employee', type:'Case Study', category:'Marketing', priority:'Low', owner:'Sameer Iyer', service:'SEO', effortPlan:'Jul Content Effort Plan', quarter:'Q3 2026', publishMonth:'Sep 2026', keyword:'seo case study food industry', intent:'Commercial', objective:'Social proof asset for sales; reusable across decks.', status:'Idea Captured', qcFeedback:'', taskId:'', reuse:2 },
  ]; }
  allIdeas(){ return this.IDEAS().concat(this.state.ideaAdded||[]).map(i=>({ ...i, ...((this.state.ideaUpd||{})[i.id]||{}) })); }
  ideaPatch(id,patch){ const u={...(this.state.ideaUpd||{})}; u[id]={...(u[id]||{}),...patch}; this.setState({ ideaUpd:u }); }
  ideaTone(s){ return {'Idea Captured':{bg:'var(--surface-50)',c:'var(--ink-500)'},'Submitted for QC':{bg:'var(--orchid-100)',c:'var(--orchid-700)'},'Approved':{bg:'var(--verify-100)',c:'var(--verify-600)'},'Rework':{bg:'var(--danger-100)',c:'var(--danger-600)'}}[s]||{bg:'var(--surface-50)',c:'var(--ink-500)'}; }
  ideaToTask(i){
    const id='TSK-'+(2060+(this.state.tkAdded||[]).length+1);
    const who=this.currentPerson();
    const task={ id, name:i.title, desc:(i.objective||'Approved content idea')+' · Keyword: '+(i.keyword||'—'), template:'Write Article', project:i.service||'Content', campaign:i.effortPlan||'—', start:this.relDate(0), end:this.relDate(14), priority:i.priority||'Medium', assignee: i.owner==='Neha Verma'?'Neha Verma':'Sameer Iyer', kpiId:'sr3', kpi:'Content Published', units:1, unit:'articles', estH:10, actH:0, recurrence:'None', reviewer:'Priya Nair (Manager)', effortPlan:i.effortPlan||'', effortType:'Content idea', contentIdea:i.id, checklist:[{t:'Draft complete',done:false},{t:'SEO pass',done:false},{t:'Editor review',done:false}], dep:'—', evidence:[], status:'Assigned', activity:[[who,'Created from approved content idea '+i.id,this.todayStr()]] };
    this.setState({ tkAdded:[...(this.state.tkAdded||[]),task] });
    this.ideaPatch(i.id,{ taskId:id });
    this.flash('Task '+id+' created from '+i.id+' — linked to the effort plan & Content KPI.');
  }
  ideasView(){
    const rk=this.state.roleKey;
    const canEdit=['manager','team_lead','senior','junior','admin'].includes(rk);
    const F=this.state.ideaFilters||{status:'All',quarter:'All'};
    let list=this.allIdeas();
    if(F.status!=='All') list=list.filter(i=>i.status===F.status);
    if(F.quarter!=='All') list=list.filter(i=>i.quarter===F.quarter);
    const pri=(p)=>({Critical:'var(--danger-500)',High:'var(--warn-500)',Medium:'var(--verify-500)',Low:'var(--info-500)'}[p]||'var(--ink-400)');
    const rows=list.map(i=>{ const tn=this.ideaTone(i.status); return {
      id:i.id, title:i.title, type:i.type, source:i.source, keyword:i.keyword||'—', category:i.category,
      metaLine:[i.category, i.cluster, i.audience, i.journey, i.wordCount?(i.wordCount+' words'):''].filter(Boolean).join(' · '),
      openIdea:()=>this.setState({ ideaOpen:i.id }),
      effortPlan:i.effortPlan||'—', owner:i.owner, priority:i.priority, priDot:pri(i.priority), publishMonth:i.publishMonth, quarter:i.quarter,
      status:i.status, statusBg:tn.bg, statusColor:tn.c,
      fb:i.qcFeedback||'', hasFb:!!i.qcFeedback,
      taskId:i.taskId||'', hasTask:!!i.taskId,
      reused:i.reuse>0?('Reused ×'+i.reuse):'', hasReuse:i.reuse>0,
      canSubmit: canEdit && (i.status==='Idea Captured'||i.status==='Rework'),
      canConvert: ['manager','team_lead','admin'].includes(rk) && i.status==='Approved' && !i.taskId,
      submit:(e)=>{ if(e)e.stopPropagation(); this.ideaPatch(i.id,{status:'Submitted for QC'}); this.flash(i.id+' sent to QC Review for approval.'); },
      convert:(e)=>{ if(e)e.stopPropagation(); this.ideaToTask(i); },
      reuseIdea:(e)=>{ if(e)e.stopPropagation(); const nid='CI-'+String(this.allIdeas().length+1).padStart(3,'0'); const clone={...i, id:nid, title:i.title+' — reuse', status:'Idea Captured', qcFeedback:'', taskId:'', reuse:0 };
        this.setState({ ideaAdded:[...(this.state.ideaAdded||[]),clone] }); this.ideaPatch(i.id,{reuse:(i.reuse||0)+1}); this.flash('Idea duplicated as '+nid+' — stored for reuse.'); },
      openTask:(e)=>{ if(e)e.stopPropagation(); if(i.taskId) this.setState({ route:'tasks', tkOpen:i.taskId }); },
    };});
    const all=this.allIdeas();
    const pg=this.pgData('ideas',rows,7);
    const setF=(k)=>(e)=>this.setState({ ideaFilters:{...F,[k]:e.target.value}, pg:{...(this.state.pg||{}),ideas:0} });
    return {
      ideaStats:[
        {label:'Content ideas',value:String(all.length),color:'var(--beet-700)',icon:'lightbulb'},
        {label:'Awaiting QC',value:String(all.filter(i=>i.status==='Submitted for QC').length),color:'var(--orchid-600)',icon:'shield-check'},
        {label:'Approved',value:String(all.filter(i=>i.status==='Approved').length),color:'var(--verify-600)',icon:'check-circle-2'},
        {label:'Moved to tasks',value:String(all.filter(i=>i.taskId).length),color:'var(--info-600)',icon:'list-checks'},
        {label:'Reused',value:String(all.reduce((s,i)=>s+(i.reuse||0),0)),color:'var(--warn-600)',icon:'repeat'},
      ],
      ideaRows:pg.rows, ideaPg:pg, ideaEmpty:pg.rows.length===0, ideaCanEdit:canEdit,
      ideaFiltersUI:[
        {label:'Status',value:F.status,onChange:setF('status'),options:['All','Idea Captured','Submitted for QC','Approved','Rework']},
        {label:'Quarter',value:F.quarter,onChange:setF('quarter'),options:['All'].concat(Array.from(new Set(all.map(i=>i.quarter))))},
      ],
      ideaBack:()=>this.setState({ route:'repositories' }),
      ...this.ideaFormData(),
    };
  }
  ideaFormData(){
    const f=this.state.ideaForm||{};
    const CUSTOM='+ Add custom…';
    const set=(k)=>(e)=>{ const v=e.target.value; if(v===CUSTOM){ this.setState({ ideaCustomFld:k, ideaCustomVal:'' }); return; } this.setState({ ideaForm:{...f,[k]:v} }); };
    const co=this.state.ideaCustomOpts||{};
    const opts=(k,base)=>base.concat(co[k]||[]).concat([CUSTOM]);
    const step=this.state.ideaStep||1;
    const stepBtn=(n,label)=>({ n:String(n), label, active:step===n, style:'display:flex;align-items:center;gap:7px;padding:7px 13px;border-radius:999px;font-size:12px;font-weight:700;cursor:pointer;border:1px solid '+(step===n?'var(--beet-700)':'var(--line-300)')+';background:'+(step===n?'var(--beet-700)':'#fff')+';color:'+(step===n?'#fff':'var(--ink-500)'), go:()=>this.setState({ ideaStep:n }) });
    return {
      showIdeaForm:this.state.showIdeaForm,
      idf:f, idfCode:'CI-'+String(this.allIdeas().length+1).padStart(3,'0'),
      idfClose:()=>this.setState({ showIdeaForm:false, ideaStep:1 }),
      idfStep1:step===1, idfStep2:step===2, idfStep3:step===3,
      idfSteps:[stepBtn(1,'1 · Content Information'),stepBtn(2,'2 · SEO & Planning'),stepBtn(3,'3 · References & Resources')],
      idfNext:()=>{ if(step===1 && !(f.title&&f.title.trim())){ this.flash('Enter a content title first.'); return; } this.setState({ ideaStep:Math.min(3,step+1) }); },
      idfPrev:()=>this.setState({ ideaStep:Math.max(1,step-1) }),
      idfNotLast:step<3, idfNotFirst:step>1,
      ...(()=>{ // step 3 — references & resources builders
        const mk=(key,blank)=>{
          const list=f[key]||[Object.assign({},blank)];
          return {
            rows:list.map((r,i)=>{ const o={ i, ...r, canRemove:list.length>1,
              remove:()=>{ const a=list.slice(); a.splice(i,1); this.setState({ ideaForm:{...f,[key]:a.length?a:[Object.assign({},blank)]} }); } };
              Object.keys(blank).forEach(fld=>{ o['set_'+fld]=(e)=>{ const a=list.map((x,j)=>j===i?{...x,[fld]:e.target.value}:x); this.setState({ ideaForm:{...f,[key]:a} }); }; });
              return o; }),
            add:()=>this.setState({ ideaForm:{...f,[key]:[...list,Object.assign({},blank)]} }),
          }; };
        const refs=mk('refs',{title:'',authors:'',source:'',year:'',rtype:'Review Paper',use:'Key Reference'});
        const stats=mk('stats',{stat:'',source:'',year:'',use:'Market Data',citation:''});
        const ext=mk('extRes',{name:'',url:''});
        const intr=mk('intRes',{name:'',itype:'PDF'});
        const atts=f.attachments||[];
        const addAtt=(kind)=>{ const n=atts.filter(a=>a.kind===kind).length+1;
          const name=kind==='Image'?('image-'+n+'.jpg'):('document-'+n+'.pdf');
          this.setState({ ideaForm:{...f, attachments:[...atts,{ name, kind, category:kind==='Image'?'Image':'Reference', desc:'' }]} }); };
        return { idfRefs:refs.rows, idfAddRef:refs.add, idfStats:stats.rows, idfAddStat:stats.add, idfExt:ext.rows, idfAddExt:ext.add, idfInt:intr.rows, idfAddInt:intr.add,
          idfAtts:atts.map((a,i)=>({ i, ...a, isImg:a.kind==='Image', icon:a.kind==='Image'?'image':'file-text',
            setCategory:(e)=>{ const arr=atts.map((x,j)=>j===i?{...x,category:e.target.value}:x); this.setState({ ideaForm:{...f,attachments:arr} }); },
            setDesc:(e)=>{ const arr=atts.map((x,j)=>j===i?{...x,desc:e.target.value}:x); this.setState({ ideaForm:{...f,attachments:arr} }); },
            setName:(e)=>{ const arr=atts.map((x,j)=>j===i?{...x,name:e.target.value}:x); this.setState({ ideaForm:{...f,attachments:arr} }); },
            remove:()=>{ const arr=atts.slice(); arr.splice(i,1); this.setState({ ideaForm:{...f,attachments:arr} }); } })),
          idfHasAtts:atts.length>0,
          idfAddDoc:()=>addAtt('Document'), idfAddImg:()=>addAtt('Image'),
          idfAttCats:['Brief','Planning','Research','Reference','Image','Media'].concat(co['attCat']||[]),
          idfRefTypes:['Review Paper','Clinical Trial','Research Paper','Meta-analysis','Case Study','Industry Report'].concat(co['refType']||[]),
          idfRefUses:['Key Reference','Supporting Data','Background Info'],
          idfStatUses:['Market Data','Scientific Statistic','Clinical Data','Benchmark'].concat(co['statUse']||[]),
          idfIntTypes:['PDF','DOCX','XLSX','Template','Previous content','Whitepaper'] };
      })(),
      idfTitleLen:((f.title||'').length)+'/200', idfWtLen:((f.workingTitle||'').length)+'/200', idfReasonLen:((f.reason||'').length)+'/500', idfObjLen:((f.objective||'').length)+'/300',
      idfSetTitle:set('title'), idfSetWorkingTitle:set('workingTitle'), idfSetSource:set('source'), idfSetType:set('type'), idfSetCategory:set('category'), idfSetSubCategory:set('subCategory'), idfSetPriority:set('priority'), idfSetOwner:set('owner'), idfSetService:set('service'), idfSetCampaign:set('campaign'), idfSetEffort:set('effortPlan'), idfSetMonth:set('publishMonth'), idfSetReason:set('reason'), idfSetObjective:set('objective'), idfSetNotes:set('notes'),
      idfSetKeyword:set('keyword'), idfSetSecondaryKw:set('secondaryKw'), idfSetIntent:set('intent'), idfSetCluster:set('cluster'), idfSetPillar:set('pillar'), idfSetAudience:set('audience'), idfSetJourney:set('journey'), idfSetGoal:set('goal'), idfSetWordCount:set('wordCount'), idfSetInternalLinks:set('internalLinks'), idfSetExtRefs:set('extRefs'), idfSetCompetitorUrls:set('competitorUrls'),
      idfSetWcMin:set('wcMin'), idfSetWcMax:set('wcMax'), idfSetRecLength:set('recLength'), idfSetReadLevel:set('readLevel'),
      idfSetMetaTitle:set('metaTitle'), idfSetMetaDesc:set('metaDesc'), idfSetSlug:set('slug'), idfSetFeatImg:set('featImg'),
      idfMetaTitleLen:((f.metaTitle||'').length)+'/60', idfMetaTitleColor:(f.metaTitle||'').length>60?'var(--danger-600)':'var(--ink-400)',
      idfMetaDescLen:((f.metaDesc||'').length)+'/160', idfMetaDescColor:(f.metaDesc||'').length>160?'var(--danger-600)':'var(--ink-400)',
      idfRecLengthOptions:opts('recLength',['Short (600–1,000 words)','Standard (1,200–1,800 words)','Long-form (2,000–3,000 words)','Pillar (3,000+ words)']),
      idfReadLevelOptions:opts('readLevel',['General audience (Grade 8)','Intermediate (Grade 10–12)','Professional / B2B','Academic / Scientific']),
      idfPubDest:f.pubDest||'Internal',
      idfPubIsInternal:(f.pubDest||'Internal')==='Internal', idfPubIsExternal:f.pubDest==='External',
      idfPubBtns:['Internal','External'].map(d=>{ const active=(f.pubDest||'Internal')===d; return { label:d+' publication', active,
        style:'flex:1;display:flex;align-items:center;justify-content:center;gap:7px;padding:9px 14px;border-radius:10px;font-size:12.5px;font-weight:700;cursor:pointer;border:1px solid '+(active?'var(--beet-700)':'var(--line-300)')+';background:'+(active?'var(--beet-700)':'#fff')+';color:'+(active?'#fff':'var(--ink-700)'),
        set:()=>this.setState({ ideaForm:{...f, pubDest:d} }) }; }),
      idfSetIntType:set('intType'), idfIntType:f.intType||'Service page',
      idfSetIntUrl:set('intUrl'),
      idfIntPull:f.intPull||'',
      idfSetIntPull:(e)=>{ const v=e.target.value; this.setState({ ideaForm:{...f, intPull:v, intUrl:v&&v.indexOf('—')!==0?v:f.intUrl} }); },
      idfIntPullOptions:['— Or pull from Content repositories —'].concat(this.allContentPages().filter(p=>p.repo===((f.intType||'Service page')==='Service page'?'service':'insight')).map(p=>p.url+' — '+p.name)),
      idfSetExtUrl:set('extUrl'),
      idfSetExtCat:set('extCat'),
      idfExtCatOptions:opts('extCat',['Guest post','News / PR site','Industry publication','Partner blog','Directory / listing','Social platform','Forum / community','Other']),
      idfSourceOptions:opts('source',['Employee','SEO Audit','Google Search Console','Competitor','Customer Question','Sales Team','Product Team','Research Team','AI Suggestion']),
      idfTypeOptions:opts('type',['Blog','Landing Page','Service Page','FAQ','Case Study','Whitepaper','Checklist','Video Script','Infographic','Webinar','Social Content','Email','Press Release','Glossary','Pillar Page','Cluster Page']),
      idfCatOptions:opts('category',['Nutrition','Science','Compliance','Marketing','Health','Food Technology']),
      idfSubCatOptions:opts('subCategory',['— Optional —','Plant Proteins','Formulation','Regulatory','SEO','Branding','Clinical']),
      idfServiceOptions:opts('service',['— Optional —','Content Writing','SEO','Technical SEO','Web Development','Digital Marketing','Social Media','CRO']),
      idfCampaignOptions:opts('campaign',['— Optional —'].concat(this.campaignNames(false))),
      idfOwnerOptions:['Sameer Iyer','Neha Verma'],
      idfEffortOptions:['— Optional —'].concat(this.allEpPlans().map(p=>p.name)),
      idfClusterOptions:opts('cluster',['Plant Based Nutrition','Protein Types & Benefits','Nutraceutical Compliance','Food Innovation']),
      idfPillarOptions:opts('pillar',['Plant Based Protein Hub','Compliance Hub','Formulation Hub']),
      idfAudienceOptions:opts('audience',['Health Conscious Adults','Formulators','Manufacturers','Researchers','Students']),
      idfJourneyOptions:opts('journey',['Awareness','Consideration','Decision','Retention']),
      idfGoalOptions:opts('goal',['Educate & Build Topical Authority','Increase Organic Traffic','Generate Leads','Drive Product Sales','Build Brand Authority','Improve Engagement']),
      idfCustomActive:!!this.state.ideaCustomFld,
      idfCustomLabel:'Add custom option — '+String(this.state.ideaCustomFld||'').replace(/([A-Z])/g,' $1').toLowerCase(),
      idfCustomVal:this.state.ideaCustomVal||'',
      idfOnCustomVal:(e)=>this.setState({ ideaCustomVal:e.target.value }),
      idfSaveCustom:()=>{ const k=this.state.ideaCustomFld; const v=(this.state.ideaCustomVal||'').trim(); if(!v){ this.flash('Type the custom value first.'); return; }
        const cur=(this.state.ideaCustomOpts||{})[k]||[];
        this.setState({ ideaCustomOpts:{...(this.state.ideaCustomOpts||{}),[k]:cur.includes(v)?cur:[...cur,v]}, ideaForm:{...f,[k]:v}, ideaCustomFld:null, ideaCustomVal:'' });
        this.flash('"'+v+'" added and selected.'); },
      idfCancelCustom:()=>this.setState({ ideaCustomFld:null, ideaCustomVal:'' }),
      idfSaveDraft:()=>this.idfSave(false), idfSaveSubmit:()=>this.idfSave(true),
    };
  }
  ideaDetailData(){
    const id=this.state.ideaOpen; if(!id) return { idDrawerOpen:false };
    const i=this.allIdeas().find(x=>x.id===id); if(!i) return { idDrawerOpen:false };
    const rk=this.state.roleKey;
    const canAct=['qc','team_lead','manager','admin'].includes(rk);
    const me=this.ROLES[rk];
    const tn=this.ideaTone(i.status);
    const fb=(this.state.qcFb||{})[i.id]||'';
    return {
      idDrawerOpen:true,
      idD:{ id:i.id, title:i.title, status:i.status, statusBg:tn.bg, statusColor:tn.c, objective:i.objective||'—' },
      idMeta:[['Content type',i.type],['Idea source',i.source],['Publication',(i.pubDest||'Internal')+(i.pubDest==='External'?(i.extCat?(' · '+i.extCat):''):(i.intType?(' · '+i.intType):''))],['Target URL',i.pubDest==='External'?(i.extUrl||'—'):(i.intUrl||'—')],['Working title',i.workingTitle||'—'],['Category',(i.category||'—')+(i.subCategory&&i.subCategory.indexOf('—')!==0?(' / '+i.subCategory):'')],['Priority',i.priority],['Owner',i.owner],['Service',i.service],['Campaign',i.campaign||'—'],['Effort plan',i.effortPlan||'—'],['Quarter',i.quarter],['Expected publish',i.publishMonth],['Primary keyword',i.keyword||'—'],['Secondary keywords',i.secondaryKw||'—'],['Search intent',i.intent||'—'],['Topic cluster',i.cluster||'—'],['Pillar page',i.pillar||'—'],['Audience',i.audience||'—'],['Journey stage',i.journey||'—'],['Content goal',i.goal||'—'],['Target word count',(i.wcMin||i.wcMax)?((i.wcMin||'?')+' – '+(i.wcMax||'?')+' words'):(i.wordCount||'—')],['Recommended length',i.recLength||'—'],['Reading level',i.readLevel||'—'],['Meta title',i.metaTitle||'—'],['Meta description',i.metaDesc||'—'],['URL slug',i.slug||'—'],['Featured image suggestion',i.featImg||'—'],['Internal links',i.internalLinks||'—'],['External references',i.extRefs||'—'],['Competitor URLs',i.competitorUrls||'—'],['Reason / background',i.reason||'—'],['Notes',i.notes||'—'],['Scientific references',(i.refs||[]).length?(i.refs.map(r=>r.title+(r.source?(' — '+r.source):'')+(r.year?(' ('+r.year+')'):'')).join(' · ')):'—'],['Statistics & data',(i.stats||[]).length?(i.stats.map(s=>s.stat).join(' · ')):'—'],['Trusted external resources',(i.extRes||[]).length?(i.extRes.map(x=>x.name+(x.url?(' — '+x.url):'')).join(' · ')):'—'],['Internal resources',(i.intRes||[]).length?(i.intRes.map(x=>x.name+' ('+(x.itype||'PDF')+')').join(' · ')):'—'],['Attachments & images',(i.attachments||[]).length?(i.attachments.map(a=>a.name+' ['+(a.category||a.kind)+']').join(' · ')):'—'],['Linked task',i.taskId||'Not yet moved to tasks']].map(m=>({k:m[0],v:m[1]})),
      idHasFb:!!i.qcFeedback, idFb:i.qcFeedback||'',
      idFbBg: i.status==='Rework'?'var(--danger-100)':'var(--verify-100)', idFbBorder: i.status==='Rework'?'#F1C9CF':'#BFE3D0', idFbColor: i.status==='Rework'?'var(--danger-600)':'var(--verify-600)',
      idCanAct: canAct && i.status==='Submitted for QC',
      idFbVal:fb, idOnFb:(e)=>this.setState({ qcFb:{...this.state.qcFb,[i.id]:e.target.value} }),
      idApprove:()=>{ const note=(this.state.qcFb||{})[i.id]||''; this.ideaPatch(i.id,{status:'Approved', qcFeedback:note?('QC approved — '+note):'QC approved', comments:[...(i.comments||[]),{who:me.person,role:me.label+' (QC)',text:'Approved. '+note,when:this.todayStr()}]}); this.flash(i.id+' approved — move it to Tasks from the Content repository.'); },
      idRework:()=>{ const note=(this.state.qcFb||{})[i.id]||''; if(!note.trim()){ this.flash('Enter QC feedback before requesting rework.'); return; } this.ideaPatch(i.id,{status:'Rework', qcFeedback:'Rework — '+note, comments:[...(i.comments||[]),{who:me.person,role:me.label+' (QC)',text:'Rework requested. '+note,when:this.todayStr()}]}); this.flash('Rework requested — feedback sent to '+i.owner+'.'); },
      idComments:(i.comments||[]).map(c=>({ who:c.who, role:c.role, text:c.text, when:c.when, initial:(c.who||'?').charAt(0) })),
      idHasComments:(i.comments||[]).length>0,
      idCmtVal:(this.state.ideaCmt||{})[i.id]||'',
      idOnCmt:(e)=>this.setState({ ideaCmt:{...(this.state.ideaCmt||{}),[i.id]:e.target.value} }),
      idAddCmt:()=>{ const txt=((this.state.ideaCmt||{})[i.id]||'').trim(); if(!txt){ this.flash('Write a comment first.'); return; }
        this.ideaPatch(i.id,{comments:[...(i.comments||[]),{who:me.person,role:me.label,text:txt,when:this.todayStr()}]});
        this.setState({ ideaCmt:{...(this.state.ideaCmt||{}),[i.id]:''} }); this.flash('Comment posted on '+i.id+'.'); },
      idCanConvert: ['manager','team_lead','admin'].includes(rk) && i.status==='Approved' && !i.taskId,
      idConvert:()=>this.ideaToTask(i),
      idClose:()=>this.setState({ ideaOpen:null }),
    };
  }
  okrDetailData(){
    const id=this.state.okrOpen; if(!id) return { okrDrawerOpen:false };
    const o=this.OKR_DATA().find(x=>x.id===id); if(!o) return { okrDrawerOpen:false };
    const tone=(s)=>({ 'Completed':{bg:'var(--verify-100)',color:'var(--verify-600)'}, 'At Risk':{bg:'var(--warn-100)',color:'var(--warn-600)'}, 'Active':{bg:'var(--info-100)',color:'var(--info-600)'} }[s]||{bg:'var(--surface-50)',color:'var(--ink-500)'});
    const pc=(p)=> p>=70?'var(--verify-500)': p>=40?'var(--warn-500)':'var(--danger-500)';
    const tn=tone(o.status); const health=this.okrHealth(o); const pri=this.okrPriority(o);
    const tasks=this.allTasks();
    return {
      okrDrawerOpen:true,
      okD:{ id:o.id, code:o.code, ver:o.v, title:o.title, desc:o.desc, status:o.status, statusBg:tn.bg, statusColor:tn.color, progress:o.progress+'%', progressW:o.progress+'%', progressColor:pc(o.progress), scope:o.scope||'Department' },
      okMeta:[['Scope',o.scope||'Department'],['Brand / Company',o.brand],['Department',o.dept],['Campaign',o.campaign],['Cycle',o.cycle],['Start → Due',o.start+' → '+o.due],['Days left',o.daysLeft<0?('Overdue by '+Math.abs(o.daysLeft)+' days'):(o.daysLeft+' days')],['Owner',o.owner+(o.team?(' '+o.team):'')],['Reviewer',o.reviewer],['Approver',o.approver],['Priority',pri.label],['Health',health.label],['Objective weight',o.weight+'%'],['Version',o.v]].map(m=>({k:m[0],v:m[1]})),
      okKrs:o.krs.map((k,i)=>{ const ks=tone(k.status); const ach=Math.min(999,Math.round((parseFloat(String(k.current).replace(/,/g,''))/parseFloat(String(k.target).replace(/,/g,'')))*100));
        const linked=tasks.filter(t=>t.kpi===k.kpi).map(t=>{ const tt=this.tkTone(t.status); return { id:t.id, name:t.name, assignee:t.assignee, status:t.status, statusBg:tt.bg, statusColor:tt.c, effortPlan:t.effortPlan||'', hasEffort:!!t.effortPlan, contribution:'+'+t.units+' '+t.unit, open:()=>this.setState({ okrOpen:null, route:'tasks', tkOpen:t.id }) }; });
        return { n:String(i+1), t:k.t, kpi:k.kpi, baseline:k.baseline, target:k.target, current:k.current, unit:k.unit, ach:ach+'%', achColor:pc(ach), achW:Math.min(100,ach)+'%', weight:k.weight+'%', who:k.who, freq:k.freq, due:k.due, status:k.status, statusBg:ks.bg, statusColor:ks.color, linked, hasLinked:linked.length>0, linkedCount:linked.length+' linked task'+(linked.length===1?'':'s') };
      }),
      okClose:()=>this.setState({ okrOpen:null }),
      okStop:(e)=>e.stopPropagation(),
    };
  }
  idfSave(toQC){
    const f=this.state.ideaForm||{};
    if(!f.title||!f.title.trim()){ this.flash('Enter a content title.'); return; }
    const id='CI-'+String(this.allIdeas().length+1).padStart(3,'0');
    const idea={ id, title:f.title.trim(), workingTitle:f.workingTitle||'', source:f.source||'Employee', type:f.type||'Blog', category:f.category||'—', subCategory:f.subCategory||'', priority:f.priority||'Medium', owner:f.owner||'Sameer Iyer', service:(f.service&&f.service.indexOf('—')!==0)?f.service:'Content Writing', campaign:(f.campaign&&f.campaign.indexOf('—')!==0)?f.campaign:'', effortPlan:f.effortPlan||(this.allEpPlans()[0]||{}).name||'', quarter:'Q3 2026', publishMonth:this.fmtMonth(f.publishMonth)||'Sep 2026', keyword:f.keyword||'', secondaryKw:f.secondaryKw||'', intent:f.intent||'Informational', cluster:f.cluster||'', pillar:f.pillar||'', audience:f.audience||'', journey:f.journey||'', goal:f.goal||'', wordCount:f.wordCount||'', internalLinks:f.internalLinks||'', extRefs:f.extRefs||'', competitorUrls:f.competitorUrls||'', reason:f.reason||'', notes:f.notes||'', objective:f.objective||'',
      wcMin:f.wcMin||'', wcMax:f.wcMax||'', recLength:f.recLength||'', readLevel:f.readLevel||'', metaTitle:f.metaTitle||'', metaDesc:f.metaDesc||'', slug:f.slug||'', featImg:f.featImg||'',
      refs:(f.refs||[]).filter(r=>r.title&&r.title.trim()), stats:(f.stats||[]).filter(r=>r.stat&&r.stat.trim()), extRes:(f.extRes||[]).filter(r=>r.name&&r.name.trim()), intRes:(f.intRes||[]).filter(r=>r.name&&r.name.trim()), attachments:(f.attachments||[]).filter(a=>a.name&&a.name.trim()),
      pubDest:f.pubDest||'Internal', intType:f.intType||'', intUrl:f.intUrl||'', extUrl:f.extUrl||'', extCat:f.extCat||'', status: toQC?'Submitted for QC':'Idea Captured', qcFeedback:'', taskId:'', reuse:0 };
    this.setState({ ideaAdded:[...(this.state.ideaAdded||[]),idea], showIdeaForm:false, ideaForm:{}, ideaStep:1 });
    this.flash(id+' created'+(toQC?' — sent to QC Review for approval.':' — saved as captured idea.'));
  }
  TASK_TEMPLATES(){ return [
    { id:'TPL-001', name:'Update Meta Descriptions', division:'SEO', desc:'Rewrite meta descriptions for target pages using primary keywords.', kpiId:'jr1', unit:'pages', estH:8, priority:'High', recurrence:'None', status:'Active', owner:'Priya Nair', updated:'Jun 12, 2026', checklist:['Pull page list from GSC','Write descriptions ≤160 chars','QA in SERP preview'] },
    { id:'TPL-002', name:'Fix Broken Links', division:'SEO', desc:'Repair or redirect broken internal/outbound links found in crawl.', kpiId:'jr2', unit:'links', estH:10, priority:'High', recurrence:'Monthly', status:'Active', owner:'Priya Nair', updated:'Jun 12, 2026', checklist:['Run crawl report','Fix or redirect links','Re-crawl to verify'] },
    { id:'TPL-003', name:'Add Alt Text', division:'SEO', desc:'Add descriptive alt text to images missing accessibility metadata.', kpiId:'jr3', unit:'images', estH:4, priority:'Medium', recurrence:'Monthly', status:'Active', owner:'Aditi Rao', updated:'May 30, 2026', checklist:['Audit missing alt text','Write descriptive alts','Spot-check accessibility'] },
    { id:'TPL-004', name:'Keyword Research', division:'SEO', desc:'Build intent-clustered keyword lists mapped to landing pages.', kpiId:'sr2', unit:'keywords', estH:6, priority:'High', recurrence:'Quarterly', status:'Active', owner:'Priya Nair', updated:'Jun 2, 2026', checklist:['Seed list from Semrush','Cluster by intent','Map to landing pages'] },
    { id:'TPL-005', name:'Write Article', division:'Content', desc:'Long-form article from approved outline through editor review.', kpiId:'sr3', unit:'articles', estH:12, priority:'High', recurrence:'None', status:'Active', owner:'Aditi Rao', updated:'Jun 20, 2026', checklist:['Outline approved','Draft complete','SEO pass','Editor review'] },
    { id:'TPL-006', name:'Custom task', division:'All', desc:'Blank template — define scope and acceptance criteria per task.', kpiId:'', unit:'', estH:0, priority:'Medium', recurrence:'None', status:'Active', owner:'Admin', updated:'Jan 5, 2026', checklist:['Define acceptance criteria'] },
  ]; }
  allTaskTemplates(){ const upd=this.state.ttUpd||{}; return this.TASK_TEMPLATES().concat(this.state.ttAdded||[]).map(t=>upd[t.id]?{...t,...upd[t.id]}:t); }
  UNIT_MASTER(){ return ['%','Count','Sessions','Users','Visitors','Leads','Keywords','Backlinks','Articles','Pages','Posts','Reels','Impressions','Clicks','CTR %','Ranking position','Score (0–100)','Words','Hours','Days','Seconds','₹ (INR)','$ (USD)','Ratio','Index','Errors','Tickets','Conversions','Conversion rate %','Engagement rate %','Bounce rate %','Domain Authority','Spam score %','Plagiarism %','Readability score','Case studies','Documents','Designs','Infographics','Assets','Fixes']; }
  MEASURE_TOOLS(){ return [
    { g:'Analytics', t:['Google Analytics 4','Google Search Console','Microsoft Clarity','Hotjar','Looker Studio','Matomo'] },
    { g:'SEO', t:['Semrush','Ahrefs','Moz','Screaming Frog','Sitebulb','SE Ranking','PageSpeed Insights','Lighthouse'] },
    { g:'Content quality', t:['Grammarly','Turnitin','Copyscape','Originality.ai','Hemingway Editor','Yoast SEO','SurferSEO','Manual editorial review'] },
    { g:'Social & ads', t:['Meta Business Suite','LinkedIn Analytics','YouTube Studio','Google Ads','Buffer','Hootsuite'] },
    { g:'Delivery & CRM', t:['Jira','Asana','ClickUp','HubSpot','Zoho CRM','Salesforce'] },
    { g:'Internal', t:['Beetloop KPI Log','Beetloop QC checklist','Manual entry','Spreadsheet tracker','Client report'] },
  ]; }
  MEASURE_TOOL_LIST(){ return this.MEASURE_TOOLS().reduce((a,g)=>a.concat(g.t),[]); }
  MEASURE_METHODS(){ return ['Automated — tool API sync','Automated — scheduled export','Semi-automated — tool + manual check','Manual — tool report entered by owner','Manual — sampled audit','Manual — full review','Third-party / client-reported']; }
  // each tool implies how it is read, so the method (and cadence) auto-populate
  TOOL_METHOD(){ return {
    'Google Analytics 4':['Automated — tool API sync','Daily'], 'Google Search Console':['Automated — tool API sync','Daily'],
    'Microsoft Clarity':['Automated — scheduled export','Weekly'], 'Hotjar':['Automated — scheduled export','Weekly'],
    'Looker Studio':['Automated — tool API sync','Real-time'], 'Matomo':['Automated — tool API sync','Daily'],
    'Semrush':['Automated — scheduled export','Weekly'], 'Ahrefs':['Automated — scheduled export','Weekly'],
    'Moz':['Automated — scheduled export','Monthly'], 'Screaming Frog':['Semi-automated — tool + manual check','Monthly'],
    'Sitebulb':['Semi-automated — tool + manual check','Monthly'], 'SE Ranking':['Automated — scheduled export','Weekly'],
    'PageSpeed Insights':['Automated — tool API sync','Weekly'], 'Lighthouse':['Automated — tool API sync','Weekly'],
    'Grammarly':['Manual — tool report entered by owner','On completion'], 'Turnitin':['Manual — tool report entered by owner','On completion'],
    'Copyscape':['Manual — tool report entered by owner','On completion'], 'Originality.ai':['Manual — tool report entered by owner','On completion'],
    'Hemingway Editor':['Manual — tool report entered by owner','On completion'], 'Yoast SEO':['Semi-automated — tool + manual check','On completion'],
    'SurferSEO':['Semi-automated — tool + manual check','On completion'], 'Manual editorial review':['Manual — full review','On completion'],
    'Meta Business Suite':['Automated — scheduled export','Weekly'], 'LinkedIn Analytics':['Automated — scheduled export','Weekly'],
    'YouTube Studio':['Automated — scheduled export','Weekly'], 'Google Ads':['Automated — tool API sync','Daily'],
    'Buffer':['Automated — scheduled export','Weekly'], 'Hootsuite':['Automated — scheduled export','Weekly'],
    'Jira':['Automated — tool API sync','Real-time'], 'Asana':['Automated — tool API sync','Real-time'],
    'ClickUp':['Automated — tool API sync','Real-time'], 'HubSpot':['Automated — tool API sync','Daily'],
    'Zoho CRM':['Automated — tool API sync','Daily'], 'Salesforce':['Automated — tool API sync','Daily'],
    'Beetloop KPI Log':['Manual — tool report entered by owner','Weekly'], 'Beetloop QC checklist':['Manual — full review','On completion'],
    'Manual entry':['Manual — tool report entered by owner','Weekly'], 'Spreadsheet tracker':['Manual — tool report entered by owner','Weekly'],
    'Client report':['Third-party / client-reported','Monthly'],
  }; }
  methodForTool(tool){ return (this.TOOL_METHOD()[tool]||[])[0]||''; }
  freqForTool(tool){ return (this.TOOL_METHOD()[tool]||[])[1]||''; }
  MEASURE_FREQ(){ return ['Real-time','Daily','Weekly','Fortnightly','Monthly','Quarterly','On completion']; }
  templatesView(){
    const rk=this.state.roleKey;
    const canEdit=['manager','team_lead','admin'].includes(rk);
    const F=this.state.ttFilters||{division:'All',status:'All'};
    const setF=(k)=>(e)=>this.setState({ ttFilters:{...F,[k]:e.target.value}, pg:{...(this.state.pg||{}),tt:0} });
    const all=this.allTaskTemplates();
    const kpiPool=this.epKpiPool();
    const used=(t)=>this.allTasks().filter(x=>x.template===t.name).length;
    const list=all.filter(t=> (F.division==='All'||t.division===F.division) && (F.status==='All'||t.status===F.status) );
    const K=(label,value,color)=>({label,value,color});
    const ttStats=[K('Templates',String(all.length),'var(--beet-700)'),K('Active',String(all.filter(t=>t.status==='Active').length),'var(--verify-600)'),K('KPI-linked',String(all.filter(t=>t.kpiId).length),'var(--orchid-600)'),K('Tasks created from templates',String(this.allTasks().filter(t=>t.template&&t.template!=='Custom task').length),'var(--info-600)')];
    const pg=this.pgData('tt',list.map(t=>{
      const k=kpiPool.find(x=>x.id===t.kpiId);
      return { ...t, estH:(t.estH||0)+' h', kpiLabel:k?k.kpi:'—', hasKpi:!!k, steps:t.checklist.length+' steps', used:String(used(t)),
        statusBg:t.status==='Active'?'var(--verify-100)':'var(--surface-50)', statusColor:t.status==='Active'?'var(--verify-600)':'var(--ink-500)',
        priDot:{Critical:'var(--danger-500)',High:'var(--warn-500)',Medium:'var(--verify-500)',Low:'var(--info-500)'}[t.priority]||'var(--ink-400)',
        edit:()=>this.setState({ ttNew:true, ttEditId:t.id, ttForm:{...t, checklist:t.checklist.slice()} }),
        duplicate:()=>{ const nid='TPL-'+String(100+all.length+1).slice(-3); this.setState({ ttAdded:[...(this.state.ttAdded||[]),{...t,id:nid,name:t.name+' (copy)',status:'Draft',owner:this.currentPerson(),updated:this.todayStr()}] }); this.flash('Template duplicated as '+nid+' (Draft).'); },
        toggleStatus:()=>{ const ns=t.status==='Active'?'Archived':'Active'; this.setState({ ttUpd:{...(this.state.ttUpd||{}),[t.id]:{...(this.state.ttUpd||{})[t.id],status:ns,updated:this.todayStr()}} }); this.flash(t.id+' '+(ns==='Active'?'activated':'archived')+'.'); },
        statusAction:t.status==='Active'?'Archive':'Activate',
      };
    }),8);
    // form
    const f=this.state.ttForm||{};
    const setTf=(k)=>(e)=>this.setState({ ttForm:{...f,[k]:e.target.value} });
    const cl=f.checklist||[''];
    // KPI templates tab
    const tab=this.state.ttTab||'task';
    const seg2=(active)=>'display:flex;align-items:center;gap:7px;padding:8px 15px;border:none;border-radius:9px;font-size:13px;font-weight:700;cursor:pointer;'+(active?'background:#fff;color:var(--beet-700);box-shadow:var(--shadow-sm)':'background:none;color:var(--ink-500)');
    const allK=this.allKpiTemplates();
    const kf=this.state.ktForm||{};
    const setKf=(k)=>(e)=>this.setState({ ktForm:{...kf,[k]:e.target.value} });
    const ktUsage=(t)=>this.allTasks().filter(x=>x.kpiId===t.id).length;
    const ktList=allK.filter(t=> (F.division==='All'||t.division===F.division||t.division==='All') && (F.status==='All'||t.status===F.status) );
    const kpg=this.pgData('kt',ktList.map(t=>({ ...t,
      dirIcon:t.direction==='Decrease'?'trending-down':'trending-up', dirColor:t.direction==='Decrease'?'var(--info-600)':'var(--verify-600)',
      used:String(ktUsage(t)),
      statusBg:t.status==='Active'?'var(--verify-100)':'var(--surface-50)', statusColor:t.status==='Active'?'var(--verify-600)':'var(--ink-500)',
      edit:()=>this.setState({ ktNew:true, ktEditId:t.id, ktForm:{...t} }),
      duplicate:()=>{ const nid='kt'+(allK.length+1)+'c'; this.setState({ ktAdded:[...(this.state.ktAdded||[]),{...t,id:nid,name:t.name+' (copy)',status:'Draft',owner:this.currentPerson(),updated:this.todayStr()}] }); this.flash('KPI template duplicated (Draft).'); },
      toggleStatus:()=>{ const ns=t.status==='Active'?'Archived':'Active'; this.setState({ ktUpd:{...(this.state.ktUpd||{}),[t.id]:{...(this.state.ktUpd||{})[t.id],status:ns,updated:this.todayStr()}} }); this.flash(t.name+' '+(ns==='Active'?'activated':'archived')+'.'); },
      statusAction:t.status==='Active'?'Archive':'Activate',
    })),8);
    const ktStats=[K('KPI templates',String(allK.length),'var(--beet-700)'),K('Active',String(allK.filter(t=>t.status==='Active').length),'var(--verify-600)'),K('Auto-tracked (API source)',String(allK.filter(t=>t.source!=='KPI Log'&&t.source!=='Manual').length),'var(--info-600)'),K('Pulled into tasks / KRs',String(allK.reduce((s,t)=>s+ktUsage(t),0)),'var(--orchid-600)')];
    // OKR templates tab
    const allO=this.allOkrTemplates();
    const of2=this.state.otForm||{};
    const setOf=(k)=>(e)=>this.setState({ otForm:{...of2,[k]:e.target.value} });
    const okrs2=of2.krs||[];
    const otList=allO.filter(t=> (F.division==='All'||t.division===F.division||t.division==='All') && (F.status==='All'||t.status===F.status) );
    const opg=this.pgData('ot',otList.map(t=>({ ...t,
      krsPreview:t.krs.map(k=>k.t+' → '+k.kpi+' ('+k.target+')').join(' · '), krCount:t.krs.length+' KRs',
      statusBg:t.status==='Active'?'var(--verify-100)':'var(--surface-50)', statusColor:t.status==='Active'?'var(--verify-600)':'var(--ink-500)',
      use:()=>{ this.setState({ route:'okr', showOkrPanel:true, okrSection:'okrA', okrTpl:t.id, okrDraftKRs:t.krs.map((k,i)=>({ id:i+1, kr:k.t, kpiSel:k.kpi, unit:k.unit, baseline:'0', target:k.target, current:'0', weight:k.weight })), okrKRSeq:t.krs.length+1 }); this.flash('Create OKR opened from "'+t.name+'" — objective & KRs pre-filled.'); },
      edit:()=>this.setState({ otNew:true, otEditId:t.id, otForm:{...t, krs:t.krs.map(k=>({...k}))} }),
      duplicate:()=>{ const nid='ot'+(allO.length+1)+'c'; this.setState({ otAdded:[...(this.state.otAdded||[]),{...t,id:nid,name:t.name+' (copy)',status:'Draft',owner:this.currentPerson(),updated:this.todayStr()}] }); this.flash('OKR template duplicated (Draft).'); },
      toggleStatus:()=>{ const ns=t.status==='Active'?'Archived':'Active'; this.setState({ otUpd:{...(this.state.otUpd||{}),[t.id]:{...(this.state.otUpd||{})[t.id],status:ns,updated:this.todayStr()}} }); this.flash(t.name+' '+(ns==='Active'?'activated':'archived')+'.'); },
      statusAction:t.status==='Active'?'Archive':'Activate',
    })),8);
    const otStats=[K('OKR templates',String(allO.length),'var(--beet-700)'),K('Active',String(allO.filter(t=>t.status==='Active').length),'var(--verify-600)'),K('KPI-linked key results',String(allO.reduce((s,t)=>s+t.krs.length,0)),'var(--orchid-600)'),K('Departments covered',String([...new Set(allO.map(t=>t.division))].length),'var(--info-600)')];
    const otKpiNames=this.allKpiTemplates().filter(t=>t.status==='Active').map(t=>t.name);
    return {
      ttTabTask:tab==='task', ttTabKpi:tab==='kpi', ttTabOkr:tab==='okr',
      ttSegTaskStyle:seg2(tab==='task'), ttSegKpiStyle:seg2(tab==='kpi'), ttSegOkrStyle:seg2(tab==='okr'),
      ttShowTask:()=>this.setState({ ttTab:'task' }), ttShowKpi:()=>this.setState({ ttTab:'kpi' }), ttShowOkr:()=>this.setState({ ttTab:'okr' }),
      otRows:opg.rows, otPg:opg, otStats,
      otNew:this.state.otNew, otf:of2,
      otFormTitle:this.state.otEditId?'Edit OKR template':'New OKR template',
      otClose:()=>this.setState({ otNew:false, otEditId:null, otForm:{} }),
      otSetName:setOf('name'), otSetCategory:setOf('category'), otSetScope:setOf('scope'), otSetDivision:setOf('division'), otSetObjective:setOf('objective'), otSetDesc:setOf('desc'), otSetStatus:setOf('status'),
      otKpiNames:otKpiNames,
      otKrs:okrs2.map((k,i)=>({ i, ...k,
        setT:(e)=>{ const a=okrs2.map((x,j)=>j===i?{...x,t:e.target.value}:x); this.setState({ otForm:{...of2,krs:a} }); },
        setKpi:(e)=>{ const a=okrs2.map((x,j)=>j===i?{...x,kpi:e.target.value}:x); this.setState({ otForm:{...of2,krs:a} }); },
        setTarget:(e)=>{ const a=okrs2.map((x,j)=>j===i?{...x,target:e.target.value}:x); this.setState({ otForm:{...of2,krs:a} }); },
        setWeight:(e)=>{ const a=okrs2.map((x,j)=>j===i?{...x,weight:e.target.value}:x); this.setState({ otForm:{...of2,krs:a} }); },
        remove:()=>{ const a=okrs2.slice(); a.splice(i,1); this.setState({ otForm:{...of2,krs:a.length?a:[{t:'',kpi:'',unit:'',target:'',weight:'100',freq:'Monthly'}]} }); },
        canRemove:okrs2.length>1 })),
      otAddKr:()=>this.setState({ otForm:{...of2,krs:[...okrs2,{t:'',kpi:'',unit:'',target:'',weight:'0',freq:'Monthly'}]} }),
      otSave:()=>{
        if(!(of2.name&&of2.name.trim())){ this.flash('Enter a template name.'); return; }
        const krs=(of2.krs||[]).filter(k=>k.t&&k.t.trim());
        if(!krs.length){ this.flash('Add at least one key result.'); return; }
        const rec={ name:of2.name.trim(), category:of2.category||'SEO', scope:of2.scope||'Department', division:of2.division||'SEO', objective:of2.objective||'', desc:of2.desc||'', status:of2.status||'Active', krs, owner:this.currentPerson(), updated:this.todayStr() };
        if(this.state.otEditId){ this.setState({ otUpd:{...(this.state.otUpd||{}),[this.state.otEditId]:rec}, otNew:false, otEditId:null, otForm:{} }); this.flash('OKR template updated.'); }
        else { const nid='ot'+(this.allOkrTemplates().length+1); this.setState({ otAdded:[...(this.state.otAdded||[]),{id:nid,...rec}], otNew:false, otForm:{} }); this.flash('OKR template created — pull it from Create New OKR.'); }
      },
      ktRows:kpg.rows, ktPg:kpg, ktStats,
      ktNew:this.state.ktNew, ktf:kf,
      ktFormTitle:this.state.ktEditId?'Edit KPI template':'New KPI template',
      ktClose:()=>this.setState({ ktNew:false, ktEditId:null, ktForm:{} }),
      ktUnitOptions:this.UNIT_MASTER(), ktToolGroups:this.MEASURE_TOOLS().map(g=>({ g:g.g, tools:g.t })),
      ktMethodOptions:this.MEASURE_METHODS(), ktMfreqOptions:this.MEASURE_FREQ(),
      ktSetTool:(e)=>{ const v=e.target.value; const cur=this.state.ktForm||{};
        this.setState({ ktForm:{...cur, tool:v, method:this.methodForTool(v)||cur.method, mfreq:this.freqForTool(v)||cur.mfreq} });
        if(this.methodForTool(v)) this.flash('Measurement method & frequency auto-filled for '+v+'.'); },
      ktMethodAuto:this.methodForTool((this.state.ktForm||{}).tool)?('Auto-set from '+(this.state.ktForm||{}).tool):'',
      ktSetMethod:setKf('method'), ktSetMfreq:setKf('mfreq'), ktSetEvidence:setKf('evidence'),
      ktSetName:setKf('name'), ktSetCategory:setKf('category'), ktSetDivision:setKf('division'), ktSetUnit:setKf('unit'), ktSetDirection:setKf('direction'), ktSetDefTarget:setKf('defTarget'), ktSetFreq:setKf('freq'), ktSetSource:setKf('source'), ktSetDesc:setKf('desc'), ktSetStatus:setKf('status'),
      ktSave:()=>{
        if(!(kf.name&&kf.name.trim())){ this.flash('Enter a KPI name.'); return; }
        const rec={ tool:kf.tool||'', method:kf.method||'', mfreq:kf.mfreq||'', evidence:kf.evidence||'', name:kf.name.trim(), category:kf.category||'Traffic', division:kf.division||'SEO', unit:kf.unit||'count', direction:kf.direction||'Increase', defTarget:kf.defTarget||'—', freq:kf.freq||'Monthly', source:kf.source||'Manual', desc:kf.desc||'', status:kf.status||'Active', owner:this.currentPerson(), updated:this.todayStr() };
        if(this.state.ktEditId){ this.setState({ ktUpd:{...(this.state.ktUpd||{}),[this.state.ktEditId]:rec}, ktNew:false, ktEditId:null, ktForm:{} }); this.flash('KPI template updated.'); }
        else { const nid='kt'+(this.allKpiTemplates().length+1); this.setState({ ktAdded:[...(this.state.ktAdded||[]),{id:nid,...rec}], ktNew:false, ktForm:{} }); this.flash('KPI template created — now available in Create Task, OKR key results and Effort plans.'); }
      },
      ttStats, ttRows:pg.rows, ttPg:pg, ttCanEdit:canEdit,
      ttFilterDefs:[
        {label:'Division',value:F.division,onChange:setF('division'),options:['All','SEO','Content','Graphics','Web Developers','SMM']},
        {label:'Status',value:F.status,onChange:setF('status'),options:['All','Active','Draft','Archived']},
      ],
      ttNew:this.state.ttNew, ttf:f,
      ttFormTitle:this.state.ttEditId?('Edit template · '+this.state.ttEditId):'New task template',
      ttClose:()=>this.setState({ ttNew:false, ttEditId:null, ttForm:{} }),
      ttStop:(e)=>e.stopPropagation(),
      ttSetName:setTf('name'), ttSetDivision:setTf('division'), ttSetDesc:setTf('desc'), ttSetUnit:setTf('unit'), ttSetEstH:setTf('estH'), ttSetPriority:setTf('priority'), ttSetRecurrence:setTf('recurrence'), ttSetStatus:setTf('status'), ttSetKpi:setTf('kpiId'),
      ttKpiOptions:[{id:'',label:'None — not KPI-linked'}].concat(kpiPool.map(k=>({ id:k.id, label:k.id.toUpperCase()+' · '+k.kpi+' ('+k.unit+') — '+k.who }))),
      ttChecklist:cl.map((s,i)=>({ i, val:s,
        set:(e)=>{ const a=cl.slice(); a[i]=e.target.value; this.setState({ ttForm:{...f,checklist:a} }); },
        remove:()=>{ const a=cl.slice(); a.splice(i,1); this.setState({ ttForm:{...f,checklist:a.length?a:['']} }); },
        canRemove:cl.length>1 })),
      ttAddStep:()=>this.setState({ ttForm:{...f,checklist:[...cl,'']} }),
      ttSave:()=>{
        if(!(f.name&&f.name.trim())){ this.flash('Enter a template name.'); return; }
        const steps=(f.checklist||[]).map(s=>s.trim()).filter(Boolean);
        if(!steps.length){ this.flash('Add at least one checklist step.'); return; }
        const rec={ name:f.name.trim(), division:f.division||'SEO', desc:f.desc||'', kpiId:f.kpiId||'', unit:f.unit||'', estH:parseInt(f.estH,10)||0, priority:f.priority||'Medium', recurrence:f.recurrence||'None', status:f.status||'Active', checklist:steps, owner:this.currentPerson(), updated:this.todayStr() };
        if(this.state.ttEditId){
          this.setState({ ttUpd:{...(this.state.ttUpd||{}),[this.state.ttEditId]:rec}, ttNew:false, ttEditId:null, ttForm:{} });
          this.flash('Template updated — changes apply to new tasks created from it.');
        } else {
          const nid='TPL-'+String(100+this.allTaskTemplates().length+1).slice(-3);
          this.setState({ ttAdded:[...(this.state.ttAdded||[]),{id:nid,...rec}], ttNew:false, ttForm:{} });
          this.flash('Template '+nid+' created — available in Create Task.');
        }
      },
    };
  }
  WTASKS(){
    const cl=(a)=>a.map(t=>({t,done:true}));
    const clo=(a,n)=>a.map((t,i)=>({t,done:i<n}));
    return [
      { id:'TSK-2041', name:'Meta descriptions — service pages', desc:'Rewrite metas for 40 service pages using target keywords.', template:'Update Meta Descriptions', project:'Pubrica SEO program', campaign:'Q3 SEO push', start:'Jan 13', end:'Jan 20', priority:'High', assignee:'Neha Verma', kpiId:'jr1', kpi:'Meta descriptions updated', units:40, unit:'pages', estH:8, actH:7, recurrence:'None', reviewer:'Aditi Rao', checklist:cl(['Pull page list from GSC','Write descriptions ≤160 chars','QA in SERP preview']), dep:'—', evidence:['serp-preview.png'], status:'Approved', activity:[['Aditi Rao','Created & assigned','Jan 13'],['Neha Verma','Submitted with evidence','Jan 19'],['Aditi Rao','QC approved — counted toward KPI','Jan 20']] },
      { id:'TSK-2042', name:'Meta descriptions — blog archive', desc:'46 legacy blog posts need refreshed metas.', template:'Update Meta Descriptions', project:'Pubrica SEO program', campaign:'Q3 SEO push', start:'Jan 15', end:'Jan 22', priority:'Medium', assignee:'Neha Verma', kpiId:'jr1', kpi:'Meta descriptions updated', units:46, unit:'pages', estH:9, actH:9, recurrence:'None', reviewer:'Aditi Rao', checklist:cl(['Pull page list from GSC','Write descriptions ≤160 chars','QA in SERP preview']), dep:'TSK-2041', evidence:['metas-batch2.xlsx'], status:'Approved', activity:[['Aditi Rao','Created & assigned','Jan 15'],['Aditi Rao','QC approved — counted toward KPI','Jan 22']] },
      { id:'TSK-2043', name:'Meta descriptions — landing pages', desc:'20 campaign landing pages.', template:'Update Meta Descriptions', project:'Statswork website rebuild', campaign:'CRO Sprint', start:this.relDate(-2), end:this.relDate(0), priority:'Medium', assignee:'Neha Verma', kpiId:'jr1', kpi:'Meta descriptions updated', units:20, unit:'pages', estH:4, actH:0, recurrence:'None', reviewer:'Aditi Rao', checklist:clo(['Pull page list from GSC','Write descriptions ≤160 chars','QA in SERP preview'],0), dep:'—', evidence:[], status:'Assigned', activity:[['Aditi Rao','Created & assigned','Jan 22']] },
      { id:'TSK-2044', name:'Fix broken links — Pubrica', desc:'60 broken outbound links from crawl.', template:'Fix Broken Links', project:'Pubrica SEO program', campaign:'Q3 SEO push', start:'Jan 10', end:'Jan 19', priority:'High', assignee:'Neha Verma', kpiId:'jr2', kpi:'Broken links fixed', units:60, unit:'links', estH:10, actH:11, recurrence:'None', reviewer:'Aditi Rao', checklist:cl(['Run crawl report','Fix or redirect links','Re-crawl to verify']), dep:'—', evidence:['crawl-before-after.pdf'], status:'Approved', activity:[['Aditi Rao','Created & assigned','Jan 10'],['Aditi Rao','QC approved — counted toward KPI','Jan 19']] },
      { id:'TSK-2045', name:'Fix broken links — Food Research Lab', desc:'50 links, mostly expired citations.', template:'Fix Broken Links', project:'Food Research Lab — content', campaign:'Organic Growth Q1', start:'Jan 12', end:'Jan 21', priority:'Medium', assignee:'Neha Verma', kpiId:'jr2', kpi:'Broken links fixed', units:50, unit:'links', estH:8, actH:8, recurrence:'None', reviewer:'Aditi Rao', checklist:cl(['Run crawl report','Fix or redirect links','Re-crawl to verify']), dep:'—', evidence:['frl-fix-log.xlsx'], status:'Approved', activity:[['Aditi Rao','Created & assigned','Jan 12'],['Aditi Rao','QC approved — counted toward KPI','Jan 21']] },
      { id:'TSK-2046', name:'Fix broken links — Statswork', desc:'32 internal 404s after rebuild.', template:'Fix Broken Links', project:'Statswork website rebuild', campaign:'Core Web Vitals', start:'Jan 14', end:'Jan 23', priority:'High', assignee:'Neha Verma', kpiId:'jr2', kpi:'Broken links fixed', units:32, unit:'links', estH:6, actH:5, recurrence:'None', reviewer:'Aditi Rao', checklist:cl(['Run crawl report','Fix or redirect links','Re-crawl to verify']), dep:'—', evidence:['statswork-404s.csv'], status:'Approved', activity:[['Aditi Rao','Created & assigned','Jan 14'],['Aditi Rao','QC approved — counted toward KPI','Jan 23']] },
      { id:'TSK-2047', name:'Fix broken links — Tutors India', desc:'40 links across course pages.', template:'Fix Broken Links', project:'Tutors India local SEO', campaign:'Q3 SEO push', start:'Jan 18', end:'Jan 25', priority:'Medium', assignee:'Neha Verma', kpiId:'jr2', kpi:'Broken links fixed', units:40, unit:'links', estH:7, actH:6, recurrence:'None', reviewer:'Aditi Rao', checklist:cl(['Run crawl report','Fix or redirect links','Re-crawl to verify']), dep:'—', evidence:['tutors-fix-log.xlsx'], status:'Submitted', activity:[['Aditi Rao','Created & assigned','Jan 18'],['Neha Verma','Submitted for QC with evidence','Jan 24']] },
      { id:'TSK-2048', name:'Alt text — blog images', desc:'90 images missing alt text.', template:'Add Alt Text', project:'Food Research Lab — content', campaign:'Content Engine Q1', start:'Jan 11', end:'Jan 20', priority:'Low', assignee:'Neha Verma', kpiId:'jr3', kpi:'Alt text added', units:90, unit:'images', estH:6, actH:6, recurrence:'None', reviewer:'Aditi Rao', checklist:cl(['Audit missing alt text','Write descriptive alts','Spot-check accessibility']), dep:'—', evidence:['alt-audit.xlsx'], status:'Approved', activity:[['Aditi Rao','Created & assigned','Jan 11'],['Aditi Rao','QC approved — counted toward KPI','Jan 20']] },
      { id:'TSK-2049', name:'Alt text — product images', desc:'85 product shots on PepCreations.', template:'Add Alt Text', project:'PepCreations launch', campaign:'Social Push Q1', start:'Jan 13', end:'Jan 22', priority:'Low', assignee:'Neha Verma', kpiId:'jr3', kpi:'Alt text added', units:85, unit:'images', estH:6, actH:7, recurrence:'None', reviewer:'Aditi Rao', checklist:cl(['Audit missing alt text','Write descriptive alts','Spot-check accessibility']), dep:'—', evidence:['pep-alts.xlsx'], status:'Approved', activity:[['Aditi Rao','Created & assigned','Jan 13'],['Aditi Rao','QC approved — counted toward KPI','Jan 22']] },
      { id:'TSK-2050', name:'Alt text — case studies', desc:'60 images across case-study library.', template:'Add Alt Text', project:'Pubrica SEO program', campaign:'Content Engine Q1', start:this.relDate(-4), end:this.relDate(-1), priority:'Medium', assignee:'Neha Verma', kpiId:'jr3', kpi:'Alt text added', units:60, unit:'images', estH:4, actH:2, recurrence:'None', reviewer:'Aditi Rao', checklist:clo(['Audit missing alt text','Write descriptive alts','Spot-check accessibility'],1), dep:'—', evidence:[], status:'In Progress', activity:[['Aditi Rao','Created & assigned','Jan 20'],['Neha Verma','Started task','Jan 21']] },
      { id:'TSK-2051', name:'Keyword research — Tech vertical', desc:'Cluster 8 target keywords for the new vertical.', template:'Keyword Research', project:'Pubrica SEO program', campaign:'Organic Growth Q1', start:this.relDate(-3), end:this.relDate(0), priority:'High', assignee:'Sameer Iyer', kpiId:'sr2', kpi:'Keywords in Top 10', units:8, unit:'keywords', estH:10, actH:6, recurrence:'None', reviewer:'Aditi Rao', checklist:clo(['Seed list from Semrush','Cluster by intent','Map to landing pages'],2), dep:'—', evidence:[], status:'In Progress', activity:[['Priya Nair','Created & assigned','Jan 16'],['Sameer Iyer','Started task','Jan 17']] },
      { id:'TSK-2052', name:'Pillar article — plant proteins', desc:'2,500-word pillar for FRL.', template:'Write Article', project:'Food Research Lab — content', campaign:'Content Engine Q1', start:'Jan 12', end:'Jan 21', priority:'High', assignee:'Sameer Iyer', kpiId:'sr3', kpi:'Content Published', units:1, unit:'articles', estH:12, actH:13, recurrence:'None', reviewer:'Priya Nair', checklist:clo(['Outline approved','Draft complete','SEO pass','Editor review'],3), dep:'—', evidence:['draft-v2.docx'], status:'Rework', activity:[['Priya Nair','Created & assigned','Jan 12'],['Sameer Iyer','Submitted for QC with evidence','Jan 19'],['Priya Nair','Rework requested — tighten intro, add citations','Jan 20']],
        qcFeedback:'Rework — tighten intro, add citations',
        comments:[
          { who:'Priya Nair', role:'Manager (QC)', text:'Intro runs 400 words before the thesis — cut to ~150. Also add citations for the protein-absorption claims in section 2.', when:'Jan 20', files:['qc-checklist-content.pdf'] },
          { who:'Sameer Iyer', role:'Senior Executive', text:'Understood — trimming the intro tonight. For citations, is the 2024 EFSA opinion acceptable or do you want peer-reviewed only?', when:'Jan 20', files:[] },
          { who:'Priya Nair', role:'Manager (QC)', text:'EFSA is fine for regulatory claims; use peer-reviewed for the bioavailability numbers.', when:'Jan 21', files:[] },
        ] },
      { id:'TSK-2053', name:'Alt text — landing page images', desc:'30 images on new landing pages.', template:'Add Alt Text', project:'Statswork website rebuild', campaign:'CRO Sprint', start:this.relDate(0), end:this.relDate(1), priority:'Low', assignee:'Neha Verma', kpiId:'jr3', kpi:'Alt text added', units:30, unit:'images', estH:2, actH:0, recurrence:'None', reviewer:'Aditi Rao', checklist:[{t:'Audit missing alt text',done:false},{t:'Write descriptive alts',done:false}], dep:'—', evidence:[], status:'Assigned', activity:[['Aditi Rao','Created & assigned',this.relDate(0)]] },
      { id:'TSK-2054', name:'Hero graphic + inline visuals — pillar article', desc:'Design hero banner and 3 inline visuals for the plant-proteins pillar. Starts when the article passes QC.', template:'Custom task', project:'Food Research Lab — content', campaign:'Content Engine Q1', start:this.relDate(1), end:this.relDate(5), priority:'High', assignee:'Neha Verma', kpiId:'jr3', kpi:'Alt text added', units:4, unit:'assets', estH:6, actH:0, recurrence:'None', reviewer:'Aditi Rao', division:'Graphics', checklist:[{t:'Hero banner',done:false},{t:'3 inline visuals',done:false},{t:'Export web-optimized',done:false}], dep:'TSK-2052', depMode:'Sequential', evidence:[], status:'Assigned', activity:[['Priya Nair','Created — sequential after TSK-2052 (Content stage)',this.relDate(0)]] },
      { id:'TSK-2055', name:'Social promotion — pillar article launch', desc:'LinkedIn + Instagram posts using the approved graphics. Starts when graphics stage completes.', template:'Custom task', project:'Food Research Lab — content', campaign:'Social Push Q1', start:this.relDate(5), end:this.relDate(8), priority:'Medium', assignee:'Sameer Iyer', kpiId:'sr3', kpi:'Content Published', units:1, unit:'articles', estH:3, actH:0, recurrence:'None', reviewer:'Priya Nair (Manager)', division:'SMM', checklist:[{t:'Post copy ×3',done:false},{t:'Schedule on platforms',done:false}], dep:'TSK-2054', depMode:'Sequential', evidence:[], status:'Assigned', activity:[['Priya Nair','Created — sequential after TSK-2054 (Graphics stage)',this.relDate(0)]] },
    ];
  }
  tkBlockedBy(t){
    if(!t.dep || t.dep==='—' || (t.depMode||'Parallel')!=='Sequential') return null;
    const depId=String(t.dep).split(' ')[0];
    const d=this.allTasks().find(x=>x.id===depId);
    if(d && d.status!=='Approved') return d;
    return null;
  }
  tkChain(t){
    const all=this.allTasks();
    const depId=t.dep&&t.dep!=='—'?String(t.dep).split(' ')[0]:null;
    const prev=depId?all.find(x=>x.id===depId):null;
    const next=all.filter(x=>x.dep && String(x.dep).split(' ')[0]===t.id);
    return { prev, next };
  }
  // ---- Compliance checklists — self-assessment against gold standards, reconciled at QC ----
  // Data layer only in this phase: the interactive per-task self-assessment/QC-verdict
  // UI (a "Compliance" tab in Task Detail) is deferred; complianceFill() auto-synthesizes
  // plausible self-scores for any task that has reached QC so the stats below are real.
  COMPLIANCE_SEED(){ return {
    Content:[
      { h:'Content excellence', rows:[
        { kpi:'Content originality', method:'Plagiarism scan', tool:'Turnitin', unit:'%', gold:'≥ 95' },
        { kpi:'AI-content originality', method:'AI detection', tool:'Originality.ai', unit:'%', gold:'≥ 95' },
        { kpi:'Grammar & clarity', method:'Automated grammar check', tool:'Grammarly', unit:'Score (0–100)', gold:'≥ 90' },
        { kpi:'Readability', method:'Readability index', tool:'Hemingway Editor', unit:'Readability score', gold:'≥ 60' },
      ]},
      { h:'SEO compliance', rows:[
        { kpi:'On-page SEO score', method:'On-page audit', tool:'Yoast SEO', unit:'Score (0–100)', gold:'≥ 85' },
        { kpi:'Focus keyword usage', method:'Keyword density check', tool:'SurferSEO', unit:'%', gold:'1–2' },
        { kpi:'Meta title length', method:'Character count', tool:'Manual entry', unit:'Count', gold:'≤ 60' },
        { kpi:'Meta description length', method:'Character count', tool:'Manual entry', unit:'Count', gold:'≤ 160' },
      ]},
      { h:'Editorial & factual', rows:[
        { kpi:'Citation accuracy', method:'Source verification', tool:'Manual editorial review', unit:'%', gold:'100' },
        { kpi:'Brand tone adherence', method:'Style-guide review', tool:'Beetloop QC checklist', unit:'Score (0–100)', gold:'≥ 90' },
      ]},
    ],
    Graphics:[
      { h:'Design quality', rows:[
        { kpi:'Brand guideline adherence', method:'Visual audit', tool:'Beetloop QC checklist', unit:'Score (0–100)', gold:'≥ 90' },
        { kpi:'Asset resolution', method:'File inspection', tool:'Manual entry', unit:'Count', gold:'≥ 300 dpi' },
        { kpi:'Licensing compliance', method:'Rights check', tool:'Manual entry', unit:'%', gold:'100' },
      ]},
    ],
    Web:[
      { h:'Technical quality', rows:[
        { kpi:'Lighthouse performance', method:'Automated audit', tool:'Lighthouse', unit:'Score (0–100)', gold:'≥ 90' },
        { kpi:'Core Web Vitals — LCP', method:'Field/lab measurement', tool:'PageSpeed Insights', unit:'Seconds', gold:'≤ 2.5' },
        { kpi:'Broken links', method:'Crawl', tool:'Screaming Frog', unit:'Errors', gold:'0' },
        { kpi:'Accessibility score', method:'Automated audit', tool:'Lighthouse', unit:'Score (0–100)', gold:'≥ 90' },
      ]},
    ],
    SEO:[
      { h:'Link quality', rows:[
        { kpi:'Referring domain authority', method:'Authority lookup', tool:'Ahrefs', unit:'Domain Authority', gold:'≥ 40' },
        { kpi:'Spam score', method:'Spam analysis', tool:'Moz', unit:'Spam score %', gold:'≤ 3' },
        { kpi:'Anchor text relevance', method:'Manual review', tool:'Manual editorial review', unit:'Score (0–100)', gold:'≥ 85' },
      ]},
    ],
    SMM:[
      { h:'Post quality', rows:[
        { kpi:'Brand tone adherence', method:'Style-guide review', tool:'Beetloop QC checklist', unit:'Score (0–100)', gold:'≥ 90' },
        { kpi:'Asset spec compliance', method:'Platform spec check', tool:'Manual entry', unit:'%', gold:'100' },
        { kpi:'Caption & hashtag review', method:'Editorial review', tool:'Manual editorial review', unit:'Score (0–100)', gold:'≥ 85' },
      ]},
    ],
  }; }
  complianceSections(kind){
    const seed=this.COMPLIANCE_SEED()[kind]||this.COMPLIANCE_SEED().Content;
    return seed.concat((this.state.clCustom||{})[kind]||[]);
  }
  clKind(t){ const d=this.tkDivision(t)||'Content';
    if(/graphic|design/i.test(d)) return 'Graphics';
    if(/web/i.test(d)) return 'Web';
    if(/smm|social/i.test(d)) return 'SMM';
    if(/seo/i.test(d)) return 'SEO';
    return 'Content'; }
  clPass(val,gold){
    const v=parseFloat(String(val).replace(/[^0-9.]/g,''));
    if(isNaN(v)) return null;
    const g=String(gold);
    const num=parseFloat(g.replace(/[^0-9.]/g,''));
    if(g.indexOf('≤')===0||/^\s*≤/.test(g)) return v<=num;
    if(g.indexOf('≥')===0||/^\s*≥/.test(g)) return v>=num;
    if(/–|-/.test(g)){ const p=g.split(/–|-/).map(x=>parseFloat(x)); return v>=p[0]&&v<=p[1]; }
    return v>=num;
  }
  complianceAtQc(t){ return ['Submitted','Rework','Approved','Closed'].includes(t.status); }
  complianceSubmitted(t){ return (!!(this.state.clSubmitted||{})[t.id]) || this.complianceAtQc(t); }
  complianceFill(t){
    const stored=(this.state.clFill||{})[t.id];
    if(stored) return stored;
    if(!this.complianceAtQc(t)) return {};
    const o={};
    this.complianceSections(this.clKind(t)).forEach((s,si)=>s.rows.forEach((r,ri)=>{
      const g=String(r.gold), n=parseFloat(g.replace(/[^0-9.]/g,''))||0;
      const lower=/^\s*≤/.test(g);
      const miss=((si+ri)%4===3); // mostly meets, occasionally misses
      const val=lower?(miss?(n+Math.max(1,Math.round(n*0.4))):Math.max(0,n-Math.max(1,Math.round(n*0.3))))
                     :(miss?Math.round(n*0.88):Math.round(n*1.03));
      const slug=String(r.kpi).toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
      o[si+'-'+ri]={ self:String(val), note:'', files:[slug+'-report-1'+(/score|readab|authority|position/i.test(r.kpi)?'.png':'.pdf')] };
    }));
    return o;
  }
  // every QC comment recorded against a task — per-line checklist comments + the overall note
  qcCommentDigest(t){
    const q=(this.state.clQc||{})[t.id]||{};
    const secs=this.complianceSections(this.clKind(t));
    const lines=[];
    secs.forEach((s,si)=>s.rows.forEach((r,ri)=>{
      const e=q[si+'-'+ri]||{};
      if(e.verdict&&(e.comment||'').trim()) lines.push({ kpi:r.kpi, verdict:e.verdict, text:e.comment.trim() });
    }));
    let compliant=0, conditional=0, rework=0, reviewed=0, total=0;
    secs.forEach((s,si)=>s.rows.forEach((r,ri)=>{ total++; const v=(q[si+'-'+ri]||{}).verdict;
      if(v){ reviewed++; if(v==='Compliant') compliant++; else if(v==='Accept conditional') conditional++; else if(v==='Rework') rework++; } }));
    const overall=(t.qcFeedback||'').trim();
    return { lines, compliant, conditional, rework, reviewed, total, overall,
      verdictLabel:reviewed?(compliant+' compliant · '+conditional+' conditional · '+rework+' rework of '+reviewed+' reviewed'):'',
      hasAny:lines.length>0||!!overall||reviewed>0 };
  }
  complianceStats(taskList){
    const qc=this.state.clQc||{};
    let filled=0, total=0, meets=0, scored=0, compliant=0, conditional=0, rework=0, reviewed=0, submitted=0, evidence=0;
    const byDiv={};
    (taskList||this.allTasks()).forEach(t=>{
      const kind=this.clKind(t);
      const secs=this.complianceSections(kind);
      const f=this.complianceFill(t), q=qc[t.id]||{};
      if(this.complianceSubmitted(t)) submitted++;
      byDiv[kind]=byDiv[kind]||{ meets:0, scored:0, rework:0, reviewed:0 };
      secs.forEach((s,si)=>s.rows.forEach((r,ri)=>{
        const key=si+'-'+ri; total++;
        const ff=f[key]||{}, qq=q[key]||{};
        if(ff.self!==undefined&&String(ff.self)!==''){ filled++; scored++;
          const p=this.clPass(ff.self,r.gold);
          if(p){ meets++; byDiv[kind].meets++; }
          byDiv[kind].scored++; }
        if((ff.files||[]).length) evidence++;
        if(qq.verdict){ reviewed++; byDiv[kind].reviewed++;
          if(qq.verdict==='Compliant') compliant++;
          else if(qq.verdict==='Accept conditional') conditional++;
          else if(qq.verdict==='Rework'){ rework++; byDiv[kind].rework++; } }
      }));
    });
    return { filled, total, meets, scored, compliant, conditional, rework, reviewed, submitted, evidence,
      selfPct:scored?Math.round(meets/scored*100):0,
      firstPassPct:reviewed?Math.round(compliant/reviewed*100):0,
      reworkPct:reviewed?Math.round(rework/reviewed*100):0,
      evidencePct:scored?Math.round(evidence/scored*100):0,
      byDiv:Object.entries(byDiv).filter(([,v])=>v.scored||v.reviewed).map(([k,v])=>({ label:k,
        selfPct:v.scored?Math.round(v.meets/v.scored*100):0,
        reworkPct:v.reviewed?Math.round(v.rework/v.reviewed*100):0,
        scored:v.scored, reviewed:v.reviewed })) };
  }
  // Interactive checklist for one task: writer fills self-scores + evidence,
  // QC records a verified value + verdict per line once submitted. Evidence
  // here is a simple filename entry rather than the shared document-picker
  // modal (that subsystem isn't ported), so "attach" just records a name.
  complianceData(t, rk){
    const id=t.id;
    const kind=this.clKind(t);
    const secsFor=this.complianceSections(kind);
    const fill=this.complianceFill(t);
    const qc=((this.state.clQc||{})[id])||{};
    const submitted=this.complianceSubmitted(t);
    const isAssignee=t.assignee===this.currentPerson();
    const isQC=rk==='qc'||['manager','team_lead','admin'].includes(rk);
    const writerEditable=isAssignee&&!submitted;
    const qcEditable=isQC&&submitted;
    const V={ Compliant:{bg:'var(--verify-100)',c:'var(--verify-600)'}, 'Accept conditional':{bg:'var(--warn-100)',c:'var(--warn-600)'},
      Rework:{bg:'var(--danger-100)',c:'var(--danger-600)'}, '':{bg:'var(--surface-50)',c:'var(--ink-500)'} };
    let total=0, done=0, pass=0, rework=0;
    const evDraft=this.state.clEvDraft||{};
    const sections=secsFor.map((s,si)=>({
      h:s.h,
      rows:s.rows.map((r,ri)=>{
        const key=si+'-'+ri;
        const f=fill[key]||{}, q=qc[key]||{};
        total++; if(f.self!==undefined&&f.self!=='') done++;
        const selfPass=this.clPass(f.self,r.gold);
        if(q.verdict==='Compliant') pass++; if(q.verdict==='Rework') rework++;
        const vt=V[q.verdict||''];
        return { kpi:r.kpi, method:r.method, tool:r.tool, unit:r.unit, gold:r.gold,
          self:f.self||'', selfNote:f.note||'',
          setSelf:(e)=>{ const cur={...(this.state.clFill||{})}; cur[id]={...(cur[id]||{}),[key]:{...(cur[id]||{})[key],self:e.target.value}}; this.setState({ clFill:cur }); },
          setSelfNote:(e)=>{ const cur={...(this.state.clFill||{})}; cur[id]={...(cur[id]||{}),[key]:{...(cur[id]||{})[key],note:e.target.value}}; this.setState({ clFill:cur }); },
          writerEditable, qcEditable,
          selfLocked:!writerEditable,
          evFiles:(f.files||[]).map((n,fi)=>({ name:n,
            icon:/\.(png|jpe?g|gif|webp)$/i.test(n)?'image':(/\.pdf$/i.test(n)?'file-text':'file'),
            remove:()=>{ const cur={...(this.state.clFill||{})}; const arr=(((cur[id]||{})[key]||{}).files||[]).slice(); arr.splice(fi,1);
              cur[id]={...(cur[id]||{}),[key]:{...(cur[id]||{})[key],files:arr}}; this.setState({ clFill:cur }); } })),
          hasEv:(f.files||[]).length>0,
          evMissing:(f.self!==undefined&&f.self!=='')&&!(f.files||[]).length,
          evDraftVal:evDraft[id+':'+key]||'',
          setEvDraft:(e)=>this.setState({ clEvDraft:{...evDraft,[id+':'+key]:e.target.value} }),
          addEv:()=>{ const name=(evDraft[id+':'+key]||'').trim(); if(!name){ this.flash('Type an evidence file name first.'); return; }
            const cur={...(this.state.clFill||{})}; const arr=(((cur[id]||{})[key]||{}).files||[]).slice(); arr.push(name);
            cur[id]={...(cur[id]||{}),[key]:{...(cur[id]||{})[key],files:arr}};
            this.setState({ clFill:cur, clEvDraft:{...evDraft,[id+':'+key]:''} }); },
          selfBadge:selfPass===null?'—':(selfPass?'Meets standard':'Below standard'),
          selfBadgeBg:selfPass===null?'var(--surface-50)':(selfPass?'var(--verify-100)':'var(--danger-100)'),
          selfBadgeColor:selfPass===null?'var(--ink-400)':(selfPass?'var(--verify-600)':'var(--danger-600)'),
          qcVal:q.val||'', setQcVal:(e)=>{ const cur={...(this.state.clQc||{})}; cur[id]={...(cur[id]||{}),[key]:{...(cur[id]||{})[key],val:e.target.value}}; this.setState({ clQc:cur }); },
          verdict:q.verdict||'', verdictBg:vt.bg, verdictColor:vt.c,
          setVerdict:(e)=>{ const cur={...(this.state.clQc||{})}; cur[id]={...(cur[id]||{}),[key]:{...(cur[id]||{})[key],verdict:e.target.value}}; this.setState({ clQc:cur }); },
          comment:q.comment||'', setComment:(e)=>{ const cur={...(this.state.clQc||{})}; cur[id]={...(cur[id]||{}),[key]:{...(cur[id]||{})[key],comment:e.target.value}}; this.setState({ clQc:cur }); },
          needsComment:q.verdict==='Rework'||q.verdict==='Accept conditional' };
      }) }));
    return { clHas:true, clKind:kind, clSections:sections,
      clVerdictOptions:['','Compliant','Accept conditional','Rework'],
      clSubmitted:submitted, clWriterEditable:writerEditable, clQcEditable:qcEditable,
      clProgress:done+' of '+total+' filled', clProgressW:total?Math.round(done/total*100)+'%':'0%',
      clStatusNote:submitted
        ? (qcEditable?'Writer entries are locked. Record your verified value and verdict per line.':'Submitted for QC — awaiting review.')
        : (writerEditable?'Fill your self-assessment against each gold standard, then submit for QC.':'Awaiting the assignee’s self-assessment.'),
      clQcSummary:submitted?(pass+' compliant · '+rework+' rework of '+total+' checks'):'',
      clCanSubmit:writerEditable&&done>0,
      clSubmit:()=>{ if(done<total){ this.flash('Fill every line before submitting ('+done+'/'+total+').'); return; }
        const noEv=[]; secsFor.forEach((s,si)=>s.rows.forEach((r,ri)=>{
          const ff=fill[si+'-'+ri]||{}; if(!(ff.files||[]).length) noEv.push(r.kpi); }));
        if(noEv.length){ this.flash('Attach evidence for: '+noEv.slice(0,3).join(', ')+(noEv.length>3?(' +'+(noEv.length-3)+' more'):'')+'.'); return; }
        this.setState({ clSubmitted:{...(this.state.clSubmitted||{}),[id]:true} });
        this.tkPatch(id,{},'Compliance checklist submitted for QC');
        this.flash('Compliance checklist submitted — locked for QC review.'); },
      clReopen:()=>{ this.setState({ clSubmitted:{...(this.state.clSubmitted||{}),[id]:false} });
        this.flash('Checklist returned to the assignee for correction.'); },
      clCanReopen:qcEditable,
      clQcShowBulk:qcEditable,
      clQcCoverage:(()=>{ let v=0,n=0; secsFor.forEach((s,si)=>s.rows.forEach((r,ri)=>{ n++; if((qc[si+'-'+ri]||{}).verdict) v++; }));
        return v+' of '+n+' lines reviewed'; })(),
      clQcCoverageW:(()=>{ let v=0,n=0; secsFor.forEach((s,si)=>s.rows.forEach((r,ri)=>{ n++; if((qc[si+'-'+ri]||{}).verdict) v++; }));
        return n?Math.round(v/n*100)+'%':'0%'; })(),
      clAcceptAll:()=>{ const cur={...(this.state.clQc||{})}; const o={...(cur[id]||{})};
        secsFor.forEach((s,si)=>s.rows.forEach((r,ri)=>{ const key=si+'-'+ri; const f2=fill[key]||{};
          if((o[key]||{}).verdict) return;
          const pass=this.clPass(f2.self,r.gold);
          o[key]={ ...(o[key]||{}), val:f2.self||'', verdict:pass?'Compliant':'Rework',
            comment:pass?'':'Self-reported '+(f2.self||'—')+' does not meet '+r.gold+' — rework required.' }; }));
        cur[id]=o; this.setState({ clQc:cur });
        this.flash('Verified against submitted evidence — lines meeting the gold standard marked Compliant, misses marked Rework.'); },
    };
  }
  tkDivision(t){
    if(t.division) return t.division;
    const map={'Update Meta Descriptions':'SEO','Fix Broken Links':'SEO','Add Alt Text':'SEO','Keyword Research':'SEO','Write Article':'Content'};
    return map[t.template]||'Content';
  }
  tkDivTone(d){ return { Content:{bg:'var(--orchid-100)',c:'var(--orchid-700)'}, Graphics:{bg:'var(--warn-100)',c:'var(--warn-600)'}, 'Web Dev':{bg:'var(--info-100)',c:'var(--info-600)'}, 'Web Developers':{bg:'var(--info-100)',c:'var(--info-600)'}, SMM:{bg:'var(--danger-100)',c:'var(--danger-600)'}, SEO:{bg:'var(--verify-100)',c:'var(--verify-600)'} }[d]||{bg:'var(--surface-50)',c:'var(--ink-500)'}; }
  // Tasks store start/end as formatted strings ("Jul 1, 2026") — same parsing
  // convention as dayDiff(), just returning ISO for calendar day-bucketing.
  isoDate(s){
    if(!s||s==='—') return null;
    const d=new Date(/\d{4}/.test(s)?s:(s+', 2026'));
    if(isNaN(d)) return null;
    return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
  }
  DEPT_MASTER(){ return [
    { key:'seo',     label:'SEO',             aliases:['seo','search'] },
    { key:'content', label:'Content',         aliases:['content','content writing','editorial','copy'] },
    { key:'smm',     label:'SMM',             aliases:['smm','social','social media'] },
    { key:'web',     label:'Web Development', aliases:['web','web development','web dev','development','engineering'] },
    { key:'design',  label:'Design',          aliases:['design','graphics','graphic design','creative'] },
    { key:'quality', label:'Quality',         aliases:['quality','qc','qa'] },
    { key:'analytics',label:'Analytics',      aliases:['analytics','data','bi'] },
    { key:'marketing',label:'Marketing',      aliases:['marketing','growth','demand gen'] },
    { key:'leadership',label:'Leadership',    aliases:['leadership','exec','management'] },
    { key:'ops',     label:'Operations',      aliases:['operations','ops','delivery'] },
  ]; }
  deptKey(v){
    const s=String(v==null?'':v).trim().toLowerCase();
    if(!s||s==='—') return '';
    const hit=this.DEPT_MASTER().find(d=>d.key===s||d.label.toLowerCase()===s||d.aliases.indexOf(s)>=0);
    if(hit) return hit.key;
    const partial=this.DEPT_MASTER().find(d=>d.aliases.some(a=>s.indexOf(a)>=0||a.indexOf(s)>=0));
    return partial?partial.key:s;
  }
  deptLabel(v){ const k=this.deptKey(v); const hit=this.DEPT_MASTER().find(d=>d.key===k); return hit?hit.label:(v||'—'); }
  userOf(name){ return (this.state.users||[]).find(u=>u.name===name)||null; }
  dailyCapacity(name){
    const u=this.userOf(name); if(!u) return 8;
    const hm=(s)=>{ const p=String(s||'').split(':'); return (parseInt(p[0],10)||0)+((parseInt(p[1],10)||0)/60); };
    const gross=hm(u.shiftEnd||'18:00')-hm(u.shiftStart||'09:00');
    return Math.max(0, Math.round((gross-((u.breakMin||60)/60))*100)/100);
  }
  weeklyCapacity(name){ const u=this.userOf(name); return Math.round(this.dailyCapacity(name)*((u&&u.days)||5)*100)/100; }
  shiftLabel(name){ const u=this.userOf(name); if(!u) return 'No shift set';
    return (u.shiftStart||'09:00')+'–'+(u.shiftEnd||'18:00')+' · '+(u.breakMin||60)+'m break · '+this.dailyCapacity(name)+' h/day'; }
  userDetailData(rk){
    const name=this.state.umOpen; if(!name) return { umDrawerOpen:false };
    const u=this.userOf(name); if(!u) return { umDrawerOpen:false };
    const isAdmin=rk==='admin';
    const editing=isAdmin&&!!this.state.umEdit;
    const d=this.state.umDraft||{};
    const setD=(k)=>(e)=>this.setState({ umDraft:{...d,[k]:e.target.value} });
    const tasks=this.allTasks().filter(t=>t.assignee===name);
    const open=tasks.filter(t=>!['Approved','Closed'].includes(t.status));
    const assigned=open.reduce((s,t)=>s+(parseFloat(t.estH)||0),0);
    const wk=this.weeklyCapacity(name)||40;
    const util=wk?Math.round(assigned/wk*100):0;
    return {
      umDrawerOpen:true, umEditing:editing, umCanEdit:isAdmin,
      umU:{ name:u.name, sub:u.sub, role:u.role, dept:u.dept, status:u.status,
        initials:u.name.split(' ').map(x=>x[0]).join('').slice(0,2),
        statusBg:u.statusTone==='ok'?'var(--verify-100)':'var(--warn-100)',
        statusColor:u.statusTone==='ok'?'var(--verify-600)':'var(--warn-600)' },
      umClose:()=>this.setState({ umOpen:null, umEdit:false, umDraft:{} }),
      umStop:(e)=>e.stopPropagation(),
      umMeta:[['Role',u.role],['Department',u.dept],['Designation',u.sub],['Account status',u.status],
        ['Shift',(u.shiftStart||'09:00')+' – '+(u.shiftEnd||'18:00')],['Break',(u.breakMin||60)+' minutes'],
        ['Working days',(u.days||5)+' / week'],['Daily capacity',this.dailyCapacity(name)+' h'],
        ['Weekly capacity',wk+' h']].map(x=>({k:x[0],v:x[1]})),
      umLoad:{ assigned:assigned.toFixed(1)+' h assigned', cap:wk+' h capacity',
        free:(wk-assigned>=0?((wk-assigned).toFixed(1)+' h free'):(Math.abs(wk-assigned).toFixed(1)+' h over')),
        freeColor:(wk-assigned)>=0?'var(--verify-600)':'var(--danger-600)',
        pct:util+'%', w:Math.min(100,util)+'%',
        color:util>100?'var(--danger-500)':util>=85?'var(--warn-500)':util>=40?'var(--verify-500)':'var(--info-500)',
        state:util>100?'Overloaded':util>=85?'Fully booked':util>=40?'Balanced':'Underloaded',
        stateBg:util>100?'var(--danger-100)':util>=85?'var(--warn-100)':util>=40?'var(--verify-100)':'var(--info-100)',
        stateColor:util>100?'var(--danger-600)':util>=85?'var(--warn-600)':util>=40?'var(--verify-600)':'var(--info-600)',
        openTasks:open.length+' open of '+tasks.length+' total' },
      umTasks:tasks.slice(0,8).map(t=>{ const tt=this.tkTone(t.status);
        return { id:t.id, name:t.name, hours:(t.estH||0)+' h', dates:t.start+' → '+t.end,
          status:t.status, bg:tt.bg, color:tt.c, open:()=>this.setState({ umOpen:null, route:'tasks', tkOpen:t.id }) }; }),
      umHasTasks:tasks.length>0,
      umTaskMore:tasks.length>8?('+'+(tasks.length-8)+' more'):'',
      umStartEdit:()=>this.setState({ umEdit:true, umDraft:{ shiftStart:u.shiftStart||'09:00', shiftEnd:u.shiftEnd||'18:00',
        breakMin:String(u.breakMin||60), days:String(u.days||5), role:u.role, dept:u.dept, status:u.status } }),
      umCancelEdit:()=>this.setState({ umEdit:false, umDraft:{} }),
      umD:d, umSetStart:setD('shiftStart'), umSetEnd:setD('shiftEnd'), umSetBreak:setD('breakMin'), umSetDays:setD('days'),
      umSetRole:setD('role'), umSetDept:setD('dept'), umSetStatus:setD('status'),
      umRoleOptions:['CEO','COO','Manager','Team Lead','Senior Executive','Junior Executive','QC Reviewer','Admin'],
      umDeptOptions:['SEO','Content','SMM','Web Development','Design','Analytics','Marketing','Quality','Leadership','Operations'],
      umStatusOptions:['Active','Pending Invitation','Suspended','Locked','Inactive','Resigned (Archived)'],
      umDayOptions:['4','5','5.5','6'],
      umSave:()=>{ const users=(this.state.users||[]).map(x=>x.name===name?{...x,
          shiftStart:d.shiftStart||x.shiftStart, shiftEnd:d.shiftEnd||x.shiftEnd,
          breakMin:parseInt(d.breakMin,10)||x.breakMin, days:parseFloat(d.days)||x.days,
          role:d.role||x.role, dept:d.dept||x.dept, status:d.status||x.status,
          statusTone:(d.status||x.status)==='Active'?'ok':'warn' }:x);
        this.setState({ users, umEdit:false, umDraft:{} });
        const hm=(s)=>{const p=String(s).split(':');return (parseInt(p[0],10)||0)+((parseInt(p[1],10)||0)/60);};
        const newCap=Math.round((hm(d.shiftEnd||u.shiftEnd||'18:00')-hm(d.shiftStart||u.shiftStart||'09:00')-((parseInt(d.breakMin,10)||u.breakMin||60)/60))*(parseFloat(d.days)||u.days||5)*10)/10;
        this.flash(name+' updated — capacity now '+newCap+' h/week.'); },
      umSuspend:()=>{ const users=(this.state.users||[]).map(x=>x.name===name?{...x,status:x.status==='Suspended'?'Active':'Suspended',statusTone:x.status==='Suspended'?'ok':'warn'}:x);
        this.setState({ users }); this.flash(name+(u.status==='Suspended'?' reactivated.':' suspended — login blocked, records retained.')); },
      umSuspendLabel:u.status==='Suspended'?'Reactivate account':'Suspend account',
      umResend:()=>this.flash('Activation link re-sent to '+String(u.name).toLowerCase().replace(/\s+/g,'.')+'@beetloop.com.'),
      umShowResend:u.status==='Pending Invitation',
    };
  }
  campaignOpt(c){ return (c&&c!=='—')?c:'— None —'; }
  campaignNames(withNone){ const names=this.allCampaigns().map(c=>c.name); return withNone?['— None —'].concat(names):names; }
  campaignOptionsFor(stored,withNone){ const base=this.campaignNames(withNone);
    const v=this.campaignOpt(stored);
    return base.includes(v)?base:base.concat([v]); }
  okrTitleOpt(stored){ if(!stored||stored==='—') return '— None —';
    const t=this.allOkrs().map(o=>o.title);
    return t.find(x=>x===stored)||stored; }
  okrTitleOptionsFor(stored){ const base=['— None —'].concat(this.allOkrs().map(o=>o.title));
    const v=this.okrTitleOpt(stored); return base.includes(v)?base:base.concat([v]); }
  tkOv(t){ const o=((this.state.tkUpd||{})[t.id])||{}; return {...t, ...o}; }
  allTasks(){ return this.WTASKS().concat(this.state.tkAdded||[]).map(t=>this.tkOv(t)); }
  tkPatch(id, patch, act){
    const t=this.allTasks().find(x=>x.id===id); if(!t) return;
    const upd={...(this.state.tkUpd||{})};
    upd[id]={ ...(upd[id]||{}), ...patch, activity:[...(t.activity||[]), [this.currentPerson(), act, this.todayStr()]] };
    this.setState({ tkUpd:upd });
    this._persistTaskPatch(id, patch);
  }
  // Fire-and-forget: syncs to Supabase when this task exists there (created
  // via tkSubmitNew). No-ops harmlessly for the built-in demo-only tasks.
  _persistTaskPatch(code, patch){
    const dbPatch={};
    if('status' in patch) dbPatch.status=patch.status;
    if('checklist' in patch) dbPatch.checklist=patch.checklist;
    if('assignee' in patch) dbPatch.assignee_name=patch.assignee;
    if(!Object.keys(dbPatch).length) return;
    supabase.from('tasks').update(dbPatch).eq('code', code).then(({error})=>{
      if(error) console.warn('[supabase] task update failed:', error.message);
    });
  }
  tkTone(s){ return {Assigned:{bg:'var(--info-100)',c:'var(--info-600)'},'In Progress':{bg:'var(--warn-100)',c:'var(--warn-600)'},Submitted:{bg:'var(--orchid-100)',c:'var(--orchid-700)'},Approved:{bg:'var(--verify-100)',c:'var(--verify-600)'},Rework:{bg:'var(--danger-100)',c:'var(--danger-600)'}}[s]||{bg:'var(--surface-50)',c:'var(--ink-500)'}; }
  relDate(n){ const d=new Date(Date.now()+n*86400000); const m=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][d.getMonth()]; return m+' '+d.getDate()+', '+d.getFullYear(); }
  dayDiff(t){ const s=String(t.end||''); if(!s||s==='—') return null; const d=Date.parse(/\d{4}/.test(s)?s:(s+', 2026')); if(isNaN(d)) return null; const a=new Date(); a.setHours(0,0,0,0); const b=new Date(d); b.setHours(0,0,0,0); return Math.round((b-a)/86400000); }
  dayTag(t){ const df=this.dayDiff(t); if(df===null) return {label:'—',bg:'var(--surface-50)',color:'var(--ink-400)'};
    if(t.status==='Approved') return {label:'Done',bg:'var(--verify-100)',color:'var(--verify-600)'};
    if(df===0) return {label:'Today',bg:'var(--verify-100)',color:'var(--verify-600)'};
    if(df===1) return {label:'Tomorrow',bg:'var(--info-100)',color:'var(--info-600)'};
    if(df===-1) return {label:'Yesterday',bg:'var(--danger-100)',color:'var(--danger-600)'};
    if(df===-2) return {label:'Day before',bg:'var(--danger-100)',color:'var(--danger-600)'};
    if(df<-2) return {label:'Overdue',bg:'var(--danger-100)',color:'var(--danger-600)'};
    return {label:'Upcoming',bg:'var(--surface-50)',color:'var(--ink-500)'};
  }
  tkPendingOpen(person){ return this.allTasks().filter(t=>t.assignee===person && ['Assigned','In Progress','Rework'].includes(t.status) && this.dayDiff(t)!==null && this.dayDiff(t)<0); }
  pgData(key, rows, size){
    size=size||8;
    const pages=Math.max(1,Math.ceil(rows.length/size));
    const page=Math.min((this.state.pg||{})[key]||0,pages-1);
    const set=(p)=>this.setState({ pg:{...(this.state.pg||{}),[key]:p} });
    const bs=(dis)=>'display:flex;align-items:center;gap:5px;padding:7px 12px;border:1px solid var(--line-300);border-radius:9px;font-size:12.5px;font-weight:700;cursor:pointer;background:#fff;color:'+(dis?'var(--ink-300)':'var(--ink-700)');
    return { rows:rows.slice(page*size,(page+1)*size), label:'Page '+(page+1)+' of '+pages+' · '+rows.length+' items',
      prev:()=>set(Math.max(0,page-1)), next:()=>set(Math.min(pages-1,page+1)),
      prevStyle:bs(page===0), nextStyle:bs(page>=pages-1), show:rows.length>0 };
  }
  tkDueAlert(t){
    if(t.status==='Approved') return null;
    const s=String(t.end||''); if(!s||s==='—') return null;
    const d=Date.parse(/\d{4}/.test(s)?s:(s+', 2026')); if(isNaN(d)) return null;
    const diff=Math.round((d-Date.now())/86400000);
    if(diff<0) return { label:'Overdue '+Math.abs(diff)+'d', color:'var(--danger-600)' };
    if(diff<=3) return { label:'Due in '+diff+'d', color:'var(--warn-600)' };
    return null;
  }

  tasksView(){
    const rk=this.state.roleKey, person=this.currentPerson();
    const canCreate=['manager','team_lead','admin'].includes(rk);
    const isOwn=['junior','senior'].includes(rk);
    let list=this.allTasks(); if(isOwn) list=list.filter(t=>t.assignee===person);
    const fil=this.state.tkFilter||'All';
    const effortNames=Array.from(new Set(this.allTasks().map(t=>t.effortPlan).filter(Boolean)));
    if(fil==='Standalone') list=list.filter(t=>!t.effortPlan);
    else if(fil!=='All') list=list.filter(t=>t.effortPlan===fil);
    const F=this.state.tkFilters||{status:'All',priority:'All',assignee:'All'};
    if(F.status!=='All') list=list.filter(t=>t.status===F.status);
    if(F.priority!=='All') list=list.filter(t=>t.priority===F.priority);
    if(F.assignee!=='All') list=list.filter(t=>t.assignee===F.assignee);
    if(F.division&&F.division!=='All') list=list.filter(t=>this.tkDivision(t)===F.division);
    const dayF=F.day||'All';
    if(dayF!=='All') list=list.filter(t=>{ const df=this.dayDiff(t); if(df===null) return false;
      if(dayF==='Today') return df===0; if(dayF==='Tomorrow') return df===1; if(dayF==='Yesterday') return df===-1; if(dayF==='Day before') return df===-2; if(dayF==='Overdue') return df<0 && t.status!=='Approved'; return true; });
    // pending-first lock model for assignees
    const pendingOpen=isOwn?this.tkPendingOpen(person):[];
    const hasPending=pendingOpen.length>0;
    const pri=(p)=>({Critical:'var(--danger-500)',High:'var(--warn-500)',Medium:'var(--verify-500)',Low:'var(--info-500)'}[p]||'var(--ink-400)');
    const tkRows=list.map(t=>{ const tn=this.tkTone(t.status); const df=this.dayDiff(t);
      const blockedBy=this.tkBlockedBy(t);
      const locked = isOwn && hasPending && df!==null && df>=0 && ['Assigned','In Progress'].includes(t.status) && !pendingOpen.some(p=>p.id===t.id);
      return {
      waiting: blockedBy && ['Assigned','In Progress'].includes(t.status) ? ('Waiting on '+blockedBy.id) : '',
      division:this.tkDivision(t), divBg:this.tkDivTone(this.tkDivision(t)).bg, divColor:this.tkDivTone(this.tkDivision(t)).c,
      id:t.id, name:t.name, kpi:t.kpi, kpiId:t.kpiId, contribution:'+'+t.units+' '+t.unit, project:t.project,
      effortPlan:t.effortPlan||'', hasEffort:!!t.effortPlan,
      dueAlert:this.tkDueAlert(t), day:this.dayTag(t), locked,
      reviewer:t.reviewer||'—', qcFb:t.qcFeedback||'—', hasQcFb:!!t.qcFeedback,
      priority:t.priority, priDot:pri(t.priority), assignee:t.assignee, dates:t.start+' → '+t.end,
      status:t.status, statusBg:tn.bg, statusColor:tn.c,
      open:()=>this.setState({ tkOpen:t.id }),
    };});
    const queuePending=pendingOpen.map(t=>({ name:t.name, id:t.id, open:()=>this.setState({ tkOpen:t.id }) }));
    const queueToday=isOwn?this.allTasks().filter(t=>t.assignee===person && this.dayDiff(t)===0 && ['Assigned','In Progress','Rework'].includes(t.status)).map(t=>({ name:t.name, id:t.id, locked:hasPending, open:()=>this.setState({ tkOpen:t.id }) })):[];
    const c=(s)=>list.filter(t=>t.status===s).length;
    const tkStats=[
      {label:isOwn?'My tasks':'All tasks',value:String(list.length),color:'var(--beet-700)',icon:'list-checks'},
      {label:'In progress',value:String(c('In Progress')+c('Assigned')),color:'var(--info-600)',icon:'circle-dot'},
      {label:'Awaiting QC',value:String(c('Submitted')),color:'var(--orchid-600)',icon:'shield-check'},
      {label:'Approved → KPI',value:String(c('Approved')),color:'var(--verify-600)',icon:'check-circle-2'},
      {label:'Rework',value:String(c('Rework')),color:'var(--danger-600)',icon:'rotate-ccw'},
    ];
    const tkNote = isOwn
      ? 'Only your assigned tasks are shown. Update status and attach evidence — approved tasks automatically advance the linked KPI.'
      : (rk==='admin' ? 'Admin: you manage the Task Master (templates) and can create tasks. Day-to-day assignment belongs to Managers & Team Leads.' : 'Create tasks from Task Master templates and assign them. Submitted work needs your QC approval before it counts toward the KPI.');
    // task analytics — same as QC Review: period toggle, scoped to own tasks for senior/junior
    const period=this.state.tkPeriod||'Weekly';
    const win=period==='Weekly'?7:31;
    const aList=list.filter(t=>{ const df=this.dayDiff(t); return df===null?true:Math.abs(df)<=win; });
    const aAssigned=aList.length, aDone=aList.filter(t=>t.status==='Approved').length, aPending=aList.filter(t=>['Assigned','In Progress','Submitted'].includes(t.status)).length, aRework=aList.filter(t=>t.status==='Rework').length;
    const apct=(n)=>aAssigned?Math.round(n/aAssigned*100):0;
    const pLbl=period==='Weekly'?'this week':'this month';
    const tkWeek=[
      {label:'Assigned '+pLbl+(isOwn?' — my tasks':' — all users'), value:String(aAssigned), pctW:'100%', color:'var(--info-500)', pct:isOwn?'your assigned tasks':'every assignee, every division'},
      {label:'Completed (QC-approved)', value:String(aDone), pctW:apct(aDone)+'%', color:'var(--verify-500)', pct:apct(aDone)+'% of assigned'},
      {label:'Pending (open / awaiting QC)', value:String(aPending), pctW:apct(aPending)+'%', color:'var(--warn-500)', pct:apct(aPending)+'% of assigned'},
      {label:'Rework requested', value:String(aRework), pctW:apct(aRework)+'%', color:'var(--danger-500)', pct:apct(aRework)+'% of assigned'},
    ];
    const tkPeriodBtns=['Weekly','Monthly'].map(p=>{ const active=period===p; return { label:p+' report', active,
      style:'padding:6px 13px;border-radius:999px;font-size:12px;font-weight:700;cursor:pointer;border:1px solid '+(active?'var(--beet-700)':'var(--line-300)')+';background:'+(active?'var(--beet-700)':'#fff')+';color:'+(active?'#fff':'var(--ink-700)'),
      set:()=>this.setState({ tkPeriod:p }) }; });
    const tkPeriodLabel='Task analytics — '+(isOwn?'my tasks':'all users')+' · '+period.toLowerCase()+' report';
    const pageSize=8, pageCount=Math.max(1,Math.ceil(tkRows.length/pageSize));
    const page=Math.min(this.state.tkPage||0, pageCount-1);
    const paged=tkRows.slice(page*pageSize,(page+1)*pageSize);
    const setF2=(k)=>(e)=>this.setState({ tkFilters:{...F,[k]:e.target.value}, tkPage:0 });
    return { tkRows:paged, tkStats, tkNote, tkCanCreate:canCreate, tkEmpty:paged.length===0,
      tkWeek, tkPeriodBtns, tkPeriodLabel,
      tkFilterVal:fil, tkOnFilter:(e)=>this.setState({ tkFilter:e.target.value, tkPage:0 }),
      tkFilterOptions:['All','Standalone'].concat(effortNames),
      tkFilterActive: fil!=='All',
      tkSubFilters:[
        {label:'Type', value:F.division||'All', onChange:setF2('division'), options:['All','Content','Graphics','Web Developers','SMM','SEO']},
        {label:'Day', value:dayF, onChange:setF2('day'), options:['All','Overdue','Day before','Yesterday','Today','Tomorrow']},
        {label:'Status', value:F.status, onChange:setF2('status'), options:['All','Assigned','In Progress','Submitted','Rework','Approved']},
        {label:'Priority', value:F.priority, onChange:setF2('priority'), options:['All','Critical','High','Medium','Low']},
        {label:'Assignee', value:F.assignee, onChange:setF2('assignee'), options:['All'].concat(Array.from(new Set(this.allTasks().map(t=>t.assignee))))},
      ],
      tkQueuePending:queuePending, tkQueueToday:queueToday,
      tkHasQueue:isOwn && (queuePending.length>0||queueToday.length>0),
      tkHasPending:queuePending.length>0, tkHasToday:queueToday.length>0,
      tkPageLabel:'Page '+(page+1)+' of '+pageCount+' · '+tkRows.length+' tasks',
      tkPrev:()=>this.setState({ tkPage:Math.max(0,page-1) }), tkNext:()=>this.setState({ tkPage:Math.min(pageCount-1,page+1) }),
      tkPrevDisabled:page===0, tkNextDisabled:page>=pageCount-1,
      tkPrevStyle:'display:flex;align-items:center;gap:5px;padding:7px 12px;border:1px solid var(--line-300);border-radius:9px;font-size:12.5px;font-weight:700;cursor:pointer;background:#fff;color:'+(page===0?'var(--ink-300)':'var(--ink-700)'),
      tkNextStyle:'display:flex;align-items:center;gap:5px;padding:7px 12px;border:1px solid var(--line-300);border-radius:9px;font-size:12.5px;font-weight:700;cursor:pointer;background:#fff;color:'+(page>=pageCount-1?'var(--ink-300)':'var(--ink-700)'),
      tkNewOpen:()=>this.setState({ tkNew:true, tkForm:{ template:'Custom task', priority:'Medium', assignee:(this.state.users&&this.state.users[0]?this.state.users[0].name:''), recurrence:'None' } }),
      ...this.tkDetailData(), ...this.tkFormData() };
  }

  // ============ Time & Effort report (new tab on Tasks) ============
  // Simplified vs. source: no live start/stop task timer exists in this app,
  // so "actual hours" reads t.actH directly instead of a running-timer
  // computation — the report math (variance, grouping, utilization) is
  // otherwise a verbatim port.
  timeReportData(){
    const rk=this.state.roleKey, person=this.currentPerson();
    const isOwn=['junior','senior'].includes(rk);
    let list=this.allTasks(); if(isOwn) list=list.filter(t=>t.assignee===person);
    const F=this.state.trFilters||{group:'assignee',assignee:'All',campaign:'All',period:'All'};
    const setF=(k)=>(e)=>this.setState({ trFilters:{...F,[k]:e.target.value}, pg:{...(this.state.pg||{}),tr:0} });
    if(F.assignee!=='All') list=list.filter(t=>t.assignee===F.assignee);
    if(F.campaign!=='All') list=list.filter(t=>this.campaignOpt(t.campaign)===F.campaign);
    if(F.period!=='All'){ const win=F.period==='This week'?7:31;
      list=list.filter(t=>{ const df=this.dayDiff(t); return df===null?true:Math.abs(df)<=win; }); }
    const rows=list.map(t=>{ const act=Math.round((parseFloat(t.actH)||0)*100)/100, est=parseFloat(t.estH)||0, v=Math.round((act-est)*100)/100;
      const tn=this.tkTone(t.status);
      return { id:t.id, name:t.name, assignee:t.assignee, division:this.tkDivision(t), campaign:this.campaignOpt(t.campaign),
        est:est?est+' h':'—', act:act?act+' h':'0 h', actNum:act, estNum:est,
        variance:(v>0?'+':'')+v+' h', varianceColor:v>0?'var(--danger-600)':(v<0?'var(--verify-600)':'var(--ink-500)'),
        pct:est?Math.round(act/est*100)+'%':'—', pctW:est?Math.min(100,Math.round(act/est*100))+'%':'0%',
        pctColor:est&&act>est?'var(--danger-500)':act>=est*0.8?'var(--verify-500)':'var(--info-500)',
        running:false,
        status:t.status, statusBg:tn.bg, statusColor:tn.c,
        open:()=>this.setState({ tkOpen:t.id }) }; });
    const pg=this.pgData('tr',rows,10);
    const sumEst=rows.reduce((s,r)=>s+r.estNum,0), sumAct=rows.reduce((s,r)=>s+r.actNum,0);
    const groupKey=F.group==='campaign'?'campaign':(F.group==='division'?'division':'assignee');
    const groups={}; rows.forEach(r=>{ const k=r[groupKey]||'—'; groups[k]=groups[k]||{est:0,act:0,n:0}; groups[k].est+=r.estNum; groups[k].act+=r.actNum; groups[k].n++; });
    const groupRows=Object.entries(groups).sort((a,b)=>b[1].act-a[1].act).map(([k,g])=>{
      const v=Math.round((g.act-g.est)*100)/100;
      return { label:k, tasks:g.n+' task'+(g.n===1?'':'s'), est:Math.round(g.est*100)/100+' h', act:Math.round(g.act*100)/100+' h',
        variance:(v>0?'+':'')+v+' h', varianceColor:v>0?'var(--danger-600)':(v<0?'var(--verify-600)':'var(--ink-500)'),
        pctW:g.est?Math.min(100,Math.round(g.act/g.est*100))+'%':'0%',
        pctColor:g.est&&g.act>g.est?'var(--danger-500)':'var(--verify-500)',
        util:g.est?Math.round(g.act/g.est*100)+'% of estimate':'no estimate' }; });
    const K=(label,value,color)=>({label,value,color});
    const withOpts=(defs)=>defs.map(d=>({...d, opts:d.options.map(o=>({ v:o, label:(d.labels&&d.labels[o])||o }))}));
    return {
      trStats:[K('Tasks in scope',String(rows.length),'var(--beet-700)'),K('Estimated',Math.round(sumEst*10)/10+' h','var(--info-600)'),K('Actual logged',Math.round(sumAct*10)/10+' h','var(--verify-600)'),K('Variance',((sumAct-sumEst)>0?'+':'')+Math.round((sumAct-sumEst)*10)/10+' h',(sumAct>sumEst)?'var(--danger-600)':'var(--verify-600)'),K('Avg per task',(rows.length?Math.round(sumAct/rows.length*100)/100:0)+' h','var(--orchid-600)')],
      trRows:pg.rows, trPg:pg, trGroupRows:groupRows, trEmpty:rows.length===0,
      trGroupTitle:'Totals by '+({assignee:'assignee',division:'division',campaign:'campaign'}[groupKey]),
      trFilterDefs:withOpts([
        {label:'Group by',value:F.group,onChange:setF('group'),options:['assignee','division','campaign'],
          labels:{assignee:'Assignee',division:'Division',campaign:'Campaign'}},
        {label:'Assignee',value:F.assignee,onChange:setF('assignee'),options:['All'].concat([...new Set(this.allTasks().map(t=>t.assignee))])},
        {label:'Campaign',value:F.campaign,onChange:setF('campaign'),options:['All'].concat([...new Set(this.campaignNames(false).concat(this.allTasks().map(t=>this.campaignOpt(t.campaign))).filter(x=>x&&x!=='— None —'))])},
        {label:'Period',value:F.period,onChange:setF('period'),options:['All','This week','This month']},
      ]),
      trReset:()=>this.setState({ trFilters:{group:'assignee',assignee:'All',campaign:'All',period:'All'} }),
    };
  }

  // ============ Content calendar (new tab on Tasks) ============
  calendarData(rk){
    const me=this.currentPerson();
    const orgView=['ceo','coo','manager','team_lead','admin','qc'].includes(rk);
    const F=this.state.calF||{ scope:orgView?'Organisation':'Mine', person:'All', type:'All', view:'Month' };
    const setF=(k)=>(e)=>this.setState({ calF:{...F,[k]:e.target.value} });
    const off=this.state.calOff||0;
    const MON=['January','February','March','April','May','June','July','August','September','October','November','December'];
    const SHORT=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const today=new Date(); today.setHours(0,0,0,0);
    const iso=(d)=>d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
    const ganttView=F.view==='Timeline';
    const weekView=F.view==='Week';
    let pool=this.allTasks();
    if(!orgView || F.scope==='Mine') pool=pool.filter(t=>t.assignee===me);
    if(orgView && F.scope==='Organisation' && F.person!=='All') pool=pool.filter(t=>t.assignee===F.person);
    if(F.type!=='All') pool=pool.filter(t=>this.tkDivision(t)===F.type);
    const byDay={};
    const unscheduled=[];
    pool.forEach(t=>{
      const s=this.isoDate(t.start), e=this.isoDate(t.end);
      if(!e){ unscheduled.push(t); return; }
      const from=s?new Date(s+'T00:00:00'):new Date(e+'T00:00:00');
      const to=new Date(e+'T00:00:00');
      if(to<from){ (byDay[e]=byDay[e]||[]).push({t,isDue:true}); return; }
      for(let d=new Date(from); d<=to; d.setDate(d.getDate()+1)){
        const k=iso(d);
        (byDay[k]=byDay[k]||[]).push({ t, isDue:k===e, isStart:k===s });
      }
    });
    let gridStart, gridDays, title;
    if(weekView){
      const base=new Date(today); base.setDate(base.getDate()+off*7);
      const dow=(base.getDay()+6)%7;
      gridStart=new Date(base); gridStart.setDate(base.getDate()-dow);
      gridDays=7;
      const endW=new Date(gridStart); endW.setDate(gridStart.getDate()+6);
      title=SHORT[gridStart.getMonth()]+' '+gridStart.getDate()+' – '+SHORT[endW.getMonth()]+' '+endW.getDate()+', '+endW.getFullYear();
    } else {
      const first=new Date(today.getFullYear(), today.getMonth()+off, 1);
      const dow=(first.getDay()+6)%7;
      gridStart=new Date(first); gridStart.setDate(first.getDate()-dow);
      const last=new Date(first.getFullYear(), first.getMonth()+1, 0);
      gridDays=Math.ceil((dow+last.getDate())/7)*7;
      title=MON[first.getMonth()]+' '+first.getFullYear();
    }
    const curMonth=weekView?null:new Date(today.getFullYear(), today.getMonth()+off, 1).getMonth();
    const dTone=(d)=>this.tkDivTone(d);
    const cells=[];
    for(let i=0;i<gridDays;i++){
      const d=new Date(gridStart); d.setDate(gridStart.getDate()+i);
      const k=iso(d);
      const items=(byDay[k]||[]);
      const dueItems=items.filter(x=>x.isDue);
      const hrs=dueItems.reduce((s,x)=>s+(parseFloat(x.t.estH)||0),0);
      const cap=(F.scope==='Mine'||!orgView)?this.dailyCapacity(me):0;
      const over=cap>0&&hrs>cap;
      const isToday=k===iso(today);
      const isPast=d<today;
      const weekend=[0,6].includes(d.getDay());
      const overdue=dueItems.filter(x=>isPast&&!['Approved','Closed'].includes(x.t.status)).length;
      cells.push({
        key:k, day:String(d.getDate()),
        dim:!weekView&&curMonth!==null&&d.getMonth()!==curMonth,
        isToday, weekend,
        bg:isToday?'var(--orchid-100)':(weekend?'var(--surface-50)':'#fff'),
        dayColor:isToday?'var(--orchid-700)':(d.getMonth()!==curMonth&&!weekView?'var(--ink-400)':'var(--ink-900)'),
        hasItems:items.length>0,
        count:items.length?String(items.length):'',
        hoursLabel:hrs?(Math.round(hrs*10)/10+' h due'):'',
        hoursColor:over?'var(--danger-600)':'var(--ink-400)',
        over, overCap:over?('over '+cap+' h capacity'):'',
        overdueLabel:overdue?(overdue+' overdue'):'',
        items:items.slice(0,weekView?8:3).map(x=>{ const tn=dTone(this.tkDivision(x.t)); const st=this.tkTone(x.t.status);
          return { id:x.t.id, name:x.t.name, who:x.t.assignee, div:this.tkDivision(x.t),
            bg:tn.bg, color:tn.c, isDue:x.isDue, isStart:x.isStart,
            marker:x.isDue?'▸ due':(x.isStart?'▪ start':'·'),
            statusBg:st.bg, statusColor:st.c, status:x.t.status,
            open:(e)=>{ if(e)e.stopPropagation(); this.setState({ tkTab:'list', tkOpen:x.t.id }); } }; }),
        more:items.length>(weekView?8:3)?('+'+(items.length-(weekView?8:3))+' more'):'',
      });
    }
    const inRange=cells.filter(c=>!c.dim);
    const dueCount=inRange.reduce((s,c)=>s+c.items.filter(i=>i.isDue).length,0);
    const K=(label,value,sub,color)=>({label,value,sub,color});
    const people=[...new Set(this.allTasks().map(t=>t.assignee))];
    return {
      calTitle:title,
      calScopeLabel:(F.scope==='Mine'||!orgView)?('My calendar — '+me):(F.person==='All'?'Organisation calendar — all staff':('Calendar — '+F.person)),
      calDows:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
      calCells:cells, calWeekView:weekView,
      calCols:'repeat(7,minmax(0,1fr))',
      calPrev:()=>this.setState({ calOff:off-1 }),
      calNext:()=>this.setState({ calOff:off+1 }),
      calToday:()=>this.setState({ calOff:0 }),
      calTodayLabel:off===0?'Today':'Back to today',
      calFilters:[
        ...(orgView?[{label:'Scope',value:F.scope,onChange:setF('scope'),options:['Organisation','Mine']}]:[]),
        ...(orgView&&F.scope==='Organisation'?[{label:'Staff',value:F.person,onChange:setF('person'),options:['All'].concat(people)}]:[]),
        {label:'Type',value:F.type,onChange:setF('type'),options:['All','Content','Graphics','Web Developers','SMM','SEO']},
        {label:'View',value:F.view,onChange:setF('view'),options:['Month','Week','Timeline']},
      ],
      ...(()=>{
        if(!ganttView) return { calIsGantt:false, calIsGrid:true };
        const first=new Date(today.getFullYear(), today.getMonth()+off, 1);
        const last=new Date(first.getFullYear(), first.getMonth()+1, 0);
        const span=last.getDate();
        const dayOf=(d)=>Math.floor((d-first)/86400000)+1;
        const groups={};
        pool.forEach(t=>{
          const e=this.isoDate(t.end); if(!e) return;
          const s=this.isoDate(t.start)||e;
          const sd=new Date(s+'T00:00:00'), ed=new Date(e+'T00:00:00');
          if(ed<first||sd>last) return;
          const from=Math.max(1, dayOf(sd)), to=Math.min(span, dayOf(ed));
          const key=(F.scope==='Mine'||!orgView)?this.tkDivision(t):t.assignee;
          const tn=this.tkDivTone(this.tkDivision(t)), st=this.tkTone(t.status);
          const late=ed<today&&!['Approved','Closed'].includes(t.status);
          (groups[key]=groups[key]||[]).push({
            id:t.id, name:t.name, div:this.tkDivision(t), status:t.status,
            statusBg:st.bg, statusColor:st.c,
            left:((from-1)/span*100)+'%', width:(Math.max(1,to-from+1)/span*100)+'%',
            bg:late?'var(--danger-500)':tn.c, label:t.id,
            dates:t.start+' → '+t.end,
            hours:(t.estH||0)+' h',
            late, lateNote:late?'overdue':'',
            open:()=>this.setState({ tkTab:'list', tkOpen:t.id }) });
        });
        const ticks=[]; for(let d=1;d<=span;d++){ const dd=new Date(first.getFullYear(),first.getMonth(),d);
          ticks.push({ d:String(d), weekend:[0,6].includes(dd.getDay()), isToday:iso(dd)===iso(today),
            w:(100/span)+'%',
            bg:iso(dd)===iso(today)?'var(--orchid-100)':([0,6].includes(dd.getDay())?'var(--surface-50)':'transparent') }); }
        const todayLeft=(first.getMonth()===today.getMonth()&&first.getFullYear()===today.getFullYear())
          ?(((dayOf(today)-0.5)/span)*100)+'%':null;
        return {
          calIsGantt:true, calIsGrid:false,
          calGanttTicks:ticks,
          calGanttTodayLeft:todayLeft, calGanttHasToday:!!todayLeft,
          calGanttGroupBy:(F.scope==='Mine'||!orgView)?'By work type':'By assignee',
          calGanttRows:Object.entries(groups).sort((a,b2)=>b2[1].length-a[1].length).map(([k,bars])=>({
            label:k, count:bars.length+' task'+(bars.length===1?'':'s'),
            late:bars.filter(b=>b.late).length?(bars.filter(b=>b.late).length+' overdue'):'',
            bars })),
          calGanttEmpty:Object.keys(groups).length===0,
        }; })(),
      calReset:()=>this.setState({ calF:{ scope:orgView?'Organisation':'Mine', person:'All', type:'All', view:'Month' }, calOff:0 }),
      calStats:[K('Tasks due',String(dueCount),weekView?'this week':'this month','var(--beet-700)'),
        K('Overdue',String(inRange.reduce((s,c)=>s+(parseInt(c.overdueLabel)||0),0)),'past due, not approved','var(--danger-600)'),
        K('Overloaded days',String(inRange.filter(c=>c.over).length),'beyond daily capacity','var(--warn-600)'),
        K('Unscheduled',String(unscheduled.length),'no due date set','var(--info-600)')],
      calLegend:['Content','Graphics','Web Developers','SMM','SEO'].map(d=>({ label:d, bg:dTone(d).bg, color:dTone(d).c })),
      calUnscheduled:unscheduled.slice(0,6).map(t=>({ id:t.id, name:t.name, who:t.assignee,
        open:()=>this.setState({ tkTab:'list', tkOpen:t.id }) })),
      calHasUnscheduled:unscheduled.length>0,
      calExport:()=>{ this.flash('Calendar feed ready — '+dueCount+' tasks exported as .ics for Outlook / Google Calendar.'); },
    };
  }

  // ================= BRAND PLAYBOOKS =================
  // Read by every role. Authored by Manager / Team Lead / Admin.
  // Governance chapters (approval matrix, claims & compliance) are Admin-owned —
  // managers own execution, not platform governance.
  PB_BRANDS(){ return [
    { key:'beetloop', name:'Beetloop', sector:'B2B platform · Food, nutrition, cosmeceutical, agri, health',
      site:'beetloop.com', tagline:'Verified intelligence from formulation to market.', color:'var(--beet-700)' },
    { key:'frl', name:'Food Research Lab', sector:'Product development & food R&D services',
      site:'foodresearchlab.com', tagline:'From kitchen idea to compliant shelf-ready product.', color:'var(--verify-600)' },
    { key:'pubrica', name:'Pubrica', sector:'Scientific & medical writing',
      site:'pubrica.com', tagline:'Research communicated with clinical precision.', color:'var(--info-600)' },
    { key:'statswork', name:'Statswork', sector:'Statistics & data analysis services',
      site:'statswork.com', tagline:'Defensible analysis, explained plainly.', color:'var(--orchid-600)' },
    { key:'tutorsindia', name:'Tutors India', sector:'Academic research support',
      site:'tutorsindia.com', tagline:'Guidance that gets research over the line.', color:'var(--warn-600)' },
    { key:'pepcreations', name:'PepCreations', sector:'Creative & brand production',
      site:'pepcreations.com', tagline:'Craft that carries the claim.', color:'var(--danger-600)' },
  ]; }
  PB_BRAND(k){ return this.PB_BRANDS().find(b=>b.key===k)||this.PB_BRANDS()[0]; }
  // block helpers
  _p(t){ return { type:'p', text:t }; }
  _h(t){ return { type:'h', text:t }; }
  _l(items){ return { type:'list', items }; }
  _n(t){ return { type:'note', text:t }; }
  _tbl(cols,rows){ return { type:'table', cols, rows }; }
  _kv(pairs){ return { type:'kv', pairs }; }
  _do(dos,donts){ return { type:'do', dos, donts }; }
  _sw(items){ return { type:'swatch', items }; }
  PB_ICP(k){
    const S=(name,who,size,geo,pains,triggers,channels,objections,message)=>({ name,who,size,geo,pains,triggers,channels,objections,message });
    const map={
      beetloop:[
        S('Formulation-led startup founder','Founder or head of product at a 5–50 person consumer brand, technically curious, no in-house regulatory team.',
          '5–50 staff · ₹1–20 Cr revenue','India, UAE, UK, Singapore',
          ['No idea which regulations apply in each target market','Cannot tell a credible manufacturer from a broker','Formulation trial-and-error burns 6–9 months'],
          ['Preparing a first export market','A failed batch or rejected label','Raising a seed round and needing a launch date'],
          ['Organic search on formulation + compliance questions','LinkedIn founder communities','Referral from a lab or co-packer'],
          ['"We already have a consultant"','"Is this just a directory?"','"Our formula is confidential"'],
          'You get a verified path from formulation to a compliant, market-ready product — not a list of contacts.'),
        S('Manufacturing / co-packer business head','Commercial lead at a contract manufacturer seeking qualified inbound rather than cold outreach.',
          '50–500 staff','India, South-East Asia',
          ['Inbound leads are unqualified and waste plant time','Capability is invisible to the brands that need it','Compliance documentation requests repeat endlessly'],
          ['Idle capacity','Losing a tender on documentation, not price','Entering a new category'],
          ['Industry events and trade bodies','Search on category + contract manufacturing','Platform listing and RFQ flow'],
          ['"We are already at capacity"','"Will this expose our client list?"'],
          'Qualified demand with the compliance paperwork already assembled — so your plant quotes, not chases.'),
        S('Regulatory / QA manager','Owns market approval and label defensibility; risk-averse, evidence-driven, the real gatekeeper.',
          '50–5,000 staff','Global',
          ['Frameworks change faster than internal documents','Claims arrive from marketing without substantiation','Audit trails are scattered across email'],
          ['A regulatory update in a key market','An audit or recall scare','A new claim being pushed by marketing'],
          ['Regulatory newsletters and standards bodies','Search on specific framework clauses','Peer referral'],
          ['"Can I trust your interpretation?"','"Who is liable if this is wrong?"'],
          'Every claim traceable to its source framework, with the dossier assembled as you work.'),
        S('Ingredient vendor / distributor','Sells inputs and needs to reach formulators at the moment of specification.',
          '10–200 staff','India, EU, US',
          ['Reaches purchasing, not the formulator who specifies','Technical dossiers rarely get read','Long, opaque sales cycles'],
          ['New ingredient launch','A competitor winning a specification','Certification achieved and unused'],
          ['Technical content and application notes','Platform ingredient discovery','Trade shows'],
          ['"Formulators will not switch"','"Our datasheets are enough"'],
          'Be discoverable at the moment a formulator specifies — with your evidence attached.'),
      ],
      frl:[
        S('D2C food brand founder','Non-technical founder with a recipe and a market, needing it made repeatably and legally.',
          '2–30 staff','India, GCC, UK',
          ['Home recipe will not scale or hold shelf life','No idea of FSSAI or target-market labelling','Manufacturer wants a spec they cannot write'],
          ['A retail listing conversation','Shelf-life failure','Investor pressure to launch'],
          ['Organic search on product development','Instagram founder content','Referrals from co-packers'],
          ['"Can I not just brief a factory?"','"Will you own my recipe?"'],
          'A shelf-stable, compliant, manufacturable product spec — your IP stays yours.'),
        S('Nutraceutical / supplement brand manager','Marketing or NPD lead who must launch SKUs on a calendar with claims that survive scrutiny.',
          '20–200 staff','India, US, EU',
          ['Claims outrun the evidence','Regional dossier differences','Stability and shelf-life data missing'],
          ['A category trend window','Regulatory rejection','Competitor launch'],
          ['Industry publications','Search on formulation + claim substantiation','Trade events'],
          ['"Our lab already does this"','"Timelines are too long"'],
          'Launch on schedule with claims that hold — formulation, stability and dossier in one track.'),
        S('Foodservice / HORECA innovation lead','Standardises dishes across outlets without losing the chef\'s intent.',
          '100+ staff · multi-outlet','India, GCC',
          ['Inconsistency between outlets','Costing drifts with seasonality','Central-kitchen scale-up fails'],
          ['New menu cycle','Outlet expansion','Food-cost pressure'],
          ['Industry associations','Search on central kitchen standardisation','Supplier referral'],
          ['"Our chefs will resist"','"Standardising will flatten taste"'],
          'The same dish, every outlet, at a cost you control — the chef\'s intent written into a spec.'),
      ],
      pubrica:[
        S('Clinical researcher / physician-author','Publishing to progress; strong science, limited writing time.',
          'Individual or 2–10 person unit','India, Middle East, SE Asia',
          ['Desk rejection on language and structure','Journal formatting consumes weeks','Reporting standards unfamiliar'],
          ['A submission deadline','A desk rejection','Grant reporting obligation'],
          ['Search on manuscript and journal requirements','Institutional referral','Academic networks'],
          ['"Is this ghost-writing?"','"Will it pass ethics?"'],
          'Your science, communicated to journal standard — authorship and integrity intact.'),
        S('Pharma / medical-device regulatory writer','Needs submission-grade documents on a regulated clock.',
          '100–5,000 staff','US, EU, India',
          ['Internal bandwidth cannot absorb submission peaks','Template and terminology drift','Traceability demands from QA'],
          ['A submission window','An audit finding','Portfolio expansion'],
          ['Industry conferences','Procurement shortlists','Peer referral'],
          ['"Vendors do not know our product"','"Confidentiality risk"'],
          'Submission-grade writing with version control and audit trail built in.'),
      ],
      statswork:[
        S('PhD scholar / research fellow','Has data, needs analysis they can defend in a viva.',
          'Individual','India, Africa, Middle East',
          ['Wrong test chosen for the design','Cannot defend the method under questioning','Software output without interpretation'],
          ['Analysis chapter deadline','Reviewer statistical query','Viva preparation'],
          ['Search on specific statistical tests','University forums','Peer referral'],
          ['"Is this allowed by my university?"','"Will I understand it?"'],
          'Analysis you can defend — method justified, output explained in your own words.'),
        S('Clinical trial / CRO data lead','Needs a statistically sound plan and reproducible outputs.',
          '50–1,000 staff','India, US, EU',
          ['SAP quality varies by vendor','Reproducibility gaps','Regulatory queries on methodology'],
          ['Trial start-up','A regulatory query','Interim analysis'],
          ['Industry networks','Procurement','Publication track record'],
          ['"Can you meet our SOPs?"','"Validated environment?"'],
          'A defensible SAP and reproducible outputs that survive regulatory questioning.'),
      ],
      tutorsindia:[
        S('Doctoral candidate','Mid-programme, stalled on methodology or writing, working against a supervisor calendar.',
          'Individual','India, UK, Africa, Middle East',
          ['Supervisor feedback loops are slow','Methodology chapter unclear','Isolation and loss of momentum'],
          ['Failed milestone review','Approaching submission date','Change of supervisor'],
          ['Search on chapter-specific problems','Student communities','Word of mouth'],
          ['"Is this academic misconduct?"','"Can I afford it?"'],
          'Structured guidance that builds your capability — your thesis stays your work.'),
        S('Master\'s student — dissertation','First substantial research project, short timeline.',
          'Individual','India, UK, Australia',
          ['Never scoped a research question before','Literature review sprawls','Deadline compression'],
          ['Dissertation module start','A poor draft grade'],
          ['Search on dissertation help','Campus networks','Social'],
          ['"Will my university object?"','"Is it plagiarism-safe?"'],
          'A clear plan and honest coaching — originality guaranteed, learning included.'),
      ],
      pepcreations:[
        S('Brand marketing manager','Needs on-brand creative at content velocity without a full in-house studio.',
          '20–500 staff','India, GCC',
          ['Freelancers drift off-brand','Volume outpaces the team','Rework cycles eat the calendar'],
          ['Campaign launch','Rebrand','Always-on content commitment'],
          ['Portfolio referral','Search on creative production','LinkedIn'],
          ['"Will you understand our brand?"','"Can you hold quality at volume?"'],
          'On-brand craft at campaign speed — the guideline is the brief, not an afterthought.'),
        S('Founder-led brand','No marketing team; needs identity and assets that look funded.',
          '2–30 staff','India',
          ['Identity is inconsistent across surfaces','No asset library','Cannot judge creative quality'],
          ['Launch','Funding round','A visible competitor'],
          ['Instagram and portfolio','Founder referral'],
          ['"Too expensive for our stage"','"We will do it in-house"'],
          'A coherent identity and a reusable asset system — built once, used everywhere.'),
      ],
    };
    return (map[k]||map.beetloop).map(x=>x);
  }
  PB_CHAPTERS(k){
    const b=this.PB_BRAND(k);
    const P=this._p.bind(this), H=this._h.bind(this), L=this._l.bind(this), N=this._n.bind(this),
      T=this._tbl.bind(this), KV=this._kv.bind(this), DO=this._do.bind(this), SW=this._sw.bind(this);
    const VISION={
      beetloop:{ vision:'The world\'s most trusted AI-powered digital ecosystem for food, nutrition, cosmeceutical, agricultural and health innovation.',
        mission:'Enable every formulator, manufacturer, vendor and buyer to collaborate through verified knowledge, compliance and intelligence — turning ideas into market-ready products that reach consumers faster and smarter.',
        promise:'Trust at scale.', proof:['Verified partners, not listings','Compliance built into the workflow','Intelligence traceable to its source'] },
      frl:{ vision:'Every good food idea reaches the shelf without being diluted by the journey.',
        mission:'Turn concepts into manufacturable, compliant, shelf-stable products through applied food science — while the founder keeps their IP and their intent.',
        promise:'From idea to shelf-ready.', proof:['Scale-up tested, not theorised','Compliance mapped per target market','Recipe IP stays with the client'] },
      pubrica:{ vision:'Research judged on its science, never lost to its writing.',
        mission:'Communicate research to journal and submission standard with complete integrity of authorship and evidence.',
        promise:'Clinical precision in communication.', proof:['Reporting standards applied by design','Full version and audit trail','Authorship never compromised'] },
      statswork:{ vision:'No researcher defeated by their own data.',
        mission:'Deliver statistically sound, reproducible analysis that the researcher can explain and defend themselves.',
        promise:'Defensible analysis, explained plainly.', proof:['Method justified before it is run','Reproducible scripts and outputs','Interpretation the client can voice'] },
      tutorsindia:{ vision:'Capable researchers, not just completed theses.',
        mission:'Provide structured, ethical research guidance that builds the candidate\'s own capability to finish and defend their work.',
        promise:'Guidance that gets research over the line.', proof:['Coaching model, never ghost-writing','Milestone-based structure','Originality verified'] },
      pepcreations:{ vision:'Craft that makes a claim believable.',
        mission:'Produce on-brand creative at campaign velocity, governed by a living design system rather than personal taste.',
        promise:'Craft that carries the claim.', proof:['Guideline-led production','Reusable asset systems','Quality held at volume'] },
    }[k]||{};
    const ch=[];
    ch.push({ key:'vision', title:'Vision & Mission', icon:'compass', owner:'Aarav Kapoor', gov:false,
      summary:'Why this brand exists and what it promises. Every campaign and every page must be traceable to this.',
      blocks:[
        H('Vision'), P(VISION.vision),
        H('Mission'), P(VISION.mission),
        H('The promise in one line'), P('“'+(VISION.promise||'')+'”'),
        H('How we prove it'), L(VISION.proof||[]),
        H('What this means for your work'),
        L(['If a piece of content cannot be traced back to the mission, it does not get published.',
           'Every claim we make must have a proof point behind it — see Claims & Compliance.',
           'When in doubt between speed and credibility, credibility wins. Always.']),
        N('If you are new: read this chapter, then ICP Library, then Messaging & Positioning. Those three cover 80% of day-to-day decisions.'),
      ]});
    ch.push({ key:'philosophy', title:'Marketing Philosophy', icon:'lightbulb', owner:'Priya Nair', gov:false,
      summary:'How we believe marketing works here — the reasoning behind the operating model.',
      blocks:[
        H('We market by earning the specification, not by shouting'),
        P('Our buyers are technical and risk-averse. They do not respond to volume or urgency; they respond to evidence, specificity and the sense that we have already solved their exact problem. So our marketing is a demonstration of competence, not a persuasion exercise.'),
        H('Five beliefs that drive every decision'),
        L(['**Demand is captured, not created.** We show up at the moment a problem is being scoped — which is why search intent and service-page depth matter more than awareness campaigns.',
           '**Specificity outsells superlatives.** "12 regional frameworks" beats "world-class compliance" every time.',
           '**The buyer teaches themselves.** Our job is to publish the material they use to build their internal case.',
           '**Effort is planned, outcomes are measured.** We commit to output volume (effort) and separately to result (KPI). Confusing the two hides failure.',
           '**Quality is a system, not a talent.** Gold standards and QC exist so output does not depend on who happened to do the work.']),
        H('What we deliberately do not do'),
        DO(['Publish depth on the exact problem being scoped','Attribute every lead to the page that earned it','Let QC block work that misses the standard'],
           ['Manufactured urgency, countdown tactics, fake scarcity','Claims without a substantiation source','Volume publishing that dilutes the service pages','Vanity metrics with no line to revenue']),
        N('This philosophy is why the platform is built the way it is: Effort → KPI → Task → QC → Outcome. If a request cannot be expressed in that chain, question the request.'),
      ]});
    ch.push({ key:'principles', title:'Core Principles', icon:'anchor', owner:'Rahul Menon', gov:false,
      summary:'Non-negotiables. When two instructions conflict, these decide.',
      blocks:[
        H('The seven principles'),
        L(['**Evidence before claim.** Nothing is asserted publicly without a source we can produce on demand.',
           '**One source of truth.** A fact lives in one master record. If you find two versions, fix the master — do not pick one.',
           '**Independence of quality.** QC never edits the work it reviews, and no one approves their own output.',
           '**Traceability by default.** Every lead, task, file and claim carries its origin. Untraceable work is treated as incomplete.',
           '**Plan the effort, measure the outcome.** Effort targets are commitments; KPIs are results. Both are visible, neither substitutes for the other.',
           '**Escalate early, not politely.** A blocker raised on day one is operations. Raised on day five it is a failure.',
           '**Client IP is sacred.** Formulations, data and drafts are never reused, referenced or shown without written permission.']),
        H('Applying them when they clash'),
        T(['Conflict','Which principle wins','Why'],
          [['Deadline vs. missing evidence','Evidence before claim','A late launch is recoverable; a false claim is not.'],
           ['Client pressure vs. QC rejection','Independence of quality','If QC can be overruled by pressure, it does not exist.'],
           ['Speed vs. traceability','Traceability by default','Untraced work has to be redone anyway.'],
           ['Effort shortfall vs. KPI hit','Report both honestly','Hiding either breaks the planning model for the next cycle.']]),
        N('Anyone at any level may cite a principle to stop work. That is not insubordination — it is the control working.'),
      ]});
    ch.push({ key:'architecture', title:'Brand Architecture', icon:'git-branch', owner:'Aarav Kapoor', gov:false,
      summary:'How the brands relate, what each one owns, and which brand a piece of work belongs to.',
      blocks:[
        H('The house'),
        P('We operate a **branded house of specialists**: each brand owns a distinct competence and audience, and they refer work to one another rather than competing. A buyer should never be confused about which brand solves their problem.'),
        T(['Brand','Owns','Audience','Refers to'],
          [['Beetloop','The ecosystem — discovery, verification, compliance intelligence','Formulators, manufacturers, vendors, buyers','FRL for development, Pubrica for dossiers'],
           ['Food Research Lab','Product development and food R&D','Brand founders, NPD and foodservice leads','Beetloop for sourcing, Statswork for shelf-life data'],
           ['Pubrica','Scientific, medical and regulatory writing','Researchers, pharma, device firms','Statswork for analysis'],
           ['Statswork','Statistics and data analysis','Scholars, CROs, research units','Pubrica for write-up'],
           ['Tutors India','Academic research guidance','Doctoral and master\'s candidates','Statswork for analysis'],
           ['PepCreations','Creative and brand production','Marketing teams, founder-led brands','All brands for production']]),
        H('Deciding which brand a piece of content belongs to'),
        L(['Ask what the reader is trying to do, not what the topic is.',
           'If they are choosing a partner or checking compliance → Beetloop.',
           'If they are making a product → Food Research Lab.',
           'If they are writing it up → Pubrica. If they are analysing it → Statswork.',
           'If they are being examined on it → Tutors India. If they are producing assets → PepCreations.']),
        N('Cross-brand content requires the Manager of both brands to sign off. Never publish the same asset under two brands.'),
      ]});
    ch.push({ key:'icp', title:'ICP Library', icon:'users', owner:'Priya Nair', gov:false,
      summary:'Who we are for — and who we are not. Every brief names an ICP.',
      blocks:[
        H('How to use this library'),
        P('Every campaign, page, article and idea names exactly one primary ICP. If you cannot name one, the work is not ready to start. The ICP determines the depth, vocabulary, proof type and channel.'),
        { type:'icp', items:this.PB_ICP(k) },
        H('Who we are not for'),
        L(['Buyers shopping purely on price with no compliance requirement.',
           'Anyone asking us to make a claim we cannot substantiate.',
           'Projects where the client will not let us document the work — traceability is not optional.']),
        N('ICPs are reviewed quarterly against actual won business in the Lead Pipeline. If an ICP stops converting, it changes or leaves the library.'),
      ]});
    ch.push({ key:'strategy', title:'Marketing Strategy Framework', icon:'target', owner:'Priya Nair', gov:false,
      summary:'The operating model that turns strategy into daily tasks.',
      blocks:[
        H('The chain — memorise this'),
        P('**Objective (OKR) → Key Result (KPI) → Effort target → Task → QC → Outcome.** Every piece of work in this platform sits somewhere on that chain. If a request does not, it has not been thought through yet.'),
        T(['Layer','Owner','Answers','Lives in'],
          [['Objective','Manager / Leadership','What are we trying to change this quarter?','OKR & KPI'],
           ['Key result (KPI)','Manager','How will we know it changed?','OKR & KPI'],
           ['Effort target','Manager / Team Lead','How much work does that take?','Effort Planner'],
           ['Task','Team Lead','Who does what, by when?','Tasks'],
           ['QC','QC Reviewer','Does it meet the standard?','QC Review'],
           ['Outcome','Manager','Did the effort produce the result?','Effort vs Outcome report']]),
        H('The quarterly rhythm'),
        L(['**Week 0 — Plan.** OKRs set, KPIs linked, effort targets agreed per function.',
           '**Weeks 1–12 — Execute.** Tasks generated from effort, QC gates every deliverable, check-ins on the configured cadence.',
           '**Weekly — Review.** Effort delivered vs planned, KPI actual vs target, blockers escalated.',
           '**Week 13 — Close.** Effort vs Outcome report, ICP conversion review, SOPs updated with what we learned.']),
        H('Channel priorities and why'),
        T(['Channel','Role','Primary metric'],
          [['Organic search','Capture in-market intent at the point of specification','Qualified leads per service page'],
           ['Service pages','Convert intent into enquiry with depth and proof','Page conversion rate'],
           ['Insight articles','Build the internal case for the buyer','Assisted enquiries, time on page'],
           ['External / guest','Reach audiences we do not own','Referred visitors and leads'],
           ['Social','Sustain presence and recruit talent','Engagement rate, reach'],
           ['Email','Nurture unconverted enquiries','Reply and re-engagement rate']]),
        N('A channel with no KPI attached is not a channel — it is a hobby. Every active channel must appear in a KPI.'),
      ]});
    ch.push({ key:'messaging', title:'Messaging & Positioning', icon:'message-square-quote', owner:'Priya Nair', gov:false,
      summary:'The exact words that carry the brand — and the ones that never do.',
      blocks:[
        H('Positioning statement'),
        P('For **'+(this.PB_ICP(k)[0]||{}).name+'** who need '+((this.PB_ICP(k)[0]||{}).pains||[''])[0].toLowerCase()+' solved, **'+b.name+'** is the '+b.sector.toLowerCase()+' partner that delivers '+b.tagline.toLowerCase()+' Unlike alternatives that stop at advice or introductions, we carry the work through to something verifiable.'),
        H('Message hierarchy'),
        T(['Level','Message','Where it appears'],
          [['Primary',b.tagline,'Homepage hero, deck cover, ad headline'],
           ['Supporting 1','Evidence for every claim, produced on request.','Service pages, trust sections'],
           ['Supporting 2','Documented process, so results do not depend on luck.','Proposals, about, methodology sections'],
           ['Supporting 3','Specialists who refer, not generalists who guess.','Cross-brand pages, partner conversations'],
           ['Proof','Named frameworks, measured outcomes, verifiable references.','Case studies, dossiers, footnotes']]),
        H('Message per ICP'),
        T(['ICP','Lead with','Never lead with'],
          this.PB_ICP(k).map(x=>[x.name, x.message, 'Generic capability lists'])),
        H('Objection handling'),
        T(['Objection','Response','Proof to attach'],
          this.PB_ICP(k).slice(0,3).map(x=>[(x.objections||[''])[0],
            'Acknowledge, then answer with a specific mechanism — never with reassurance alone.','Relevant case study or framework reference'])),
        H('Words we use / words we ban'),
        DO(['Verified','Compliance','Intelligence','Formulation','Dossier','Traceability','Market-ready','Documented','Substantiated'],
           ['Revolutionary','World-class','Cutting-edge','Game-changing','Best-in-class','Synergy','Seamlessly (unqualified)','Guaranteed results']),
        N('Every headline must survive the "so what, prove it" test: state the outcome, then name the mechanism that produces it.'),
      ]});
    ch.push({ key:'voice', title:'Voice of Brand', icon:'audio-lines', owner:'Priya Nair', gov:false,
      summary:'How we sound — with worked before/after examples you can copy.',
      blocks:[
        H('Our voice in four dimensions'),
        T(['Dimension','We are','We are not'],
          [['Authority','A trusted specialist explaining plainly','A vendor asserting greatness'],
           ['Warmth','Direct and human, second person','Corporate, distant, passive'],
           ['Precision','Specific, numeric, sourced','Vague, superlative, hedged'],
           ['Energy','Calm and confident','Urgent, breathless, salesy']]),
        H('Rules that are not negotiable'),
        L(['Address the reader as **you**. Refer to us as **'+b.name+'** or *we*, sparingly.',
           'Headlines in **sentence case**. Only the wordmark is uppercase.',
           'Eyebrows in UPPERCASE with wide tracking.',
           'Buttons are verb-first and sentence case: *Start a formulation*, *Request a quote*, *View dossier*.',
           'Active voice. If the sentence hides who acts, rewrite it.',
           'No emoji in any product or marketing surface.',
           'Numbers must be defensible. If you cannot source it, cut it.']),
        H('Before and after'),
        T(['Weak','Rewritten','Why'],
          [['We are a world-class partner for product development.','We take a formulation from concept to a compliant, manufacturable spec.','Replaces a superlative with the actual outcome.'],
           ['Our seamless platform revolutionises compliance.','Beetloop checks every claim against the frameworks of your target markets.','Names the mechanism instead of asserting magic.'],
           ['Leverage our synergistic expertise today!','Talk to the team that has taken 200+ products to market.','Drops jargon, adds a verifiable proof point.'],
           ['Results are guaranteed.','Every claim we publish is traceable to its source framework.','Replaces an unprovable promise with a testable commitment.']]),
        H('Tone by surface'),
        T(['Surface','Tone shift'],
          [['Service page','Confident, structured, proof-dense'],
           ['Insight article','Teacherly, generous, sourced'],
           ['Email to a lead','Brief, specific, one clear next step'],
           ['Proposal','Precise, scoped, risk-aware'],
           ['Social','Human and observational — still no hype'],
           ['Error or empty state','Plain, helpful, tells the user what to do next']]),
      ]});
    ch.push({ key:'design', title:'Design System', icon:'palette', owner:'Neha Verma', gov:false,
      summary:'The visual rules — colour, type, spacing, imagery and asset specs.',
      blocks:[
        H('Colour'),
        SW([{ name:'Deep Beet — primary ink', hex:'#380F23', use:'Headers, body ink, dark panels, wordmark' },
            { name:'Orchid — accent', hex:'#B45A8C', use:'CTAs, links, highlights, the loop. Used sparingly.' },
            { name:'Canvas', hex:'#F8F5F7', use:'App and page background — warm, never blue-grey' },
            { name:'Verified green', hex:'#2E7D57', use:'Compliant, approved, on track' },
            { name:'Pending amber', hex:'#B7791F', use:'At risk, awaiting review' },
            { name:'Flagged rose', hex:'#B3384F', use:'Rework, breach, overdue' }]),
        L(['All neutrals are **beet-tinted (warm)**. Never introduce a blue-grey.',
           'Orchid is a jewel, not a wash — accents and actions only.',
           'Green always means *verified / compliant*. Do not use it decoratively.',
           'Maximum two background tones per page or deck.']),
        H('Type'),
        T(['Role','Family','Weights','Used for'],
          [['Display','Sora','700–800','Headlines, hero, large numbers'],
           ['UI / body','Manrope','400–700','Interface, body copy, labels'],
           ['Data','Space Mono','400–700','IDs, codes, slugs, version stamps']]),
        L(['Headlines: tight tracking (−0.02em), sentence case.',
           'Body: 1.55 line-height, `text-wrap: pretty`.',
           'Eyebrows: uppercase, letter-spacing 0.06–0.1em.',
           'Minimums — 1920×1080 slides never below 24px; print never below 12pt; mobile touch targets never below 44px.']),
        H('Spacing, corners, elevation'),
        L(['4px base grid. Cards breathe: 24–32px internal padding.',
           'Radii — cards 18–20px, buttons and inputs 10–14px, pills fully round.',
           'Borders — 1px warm hairlines. On dark panels, white at 10%.',
           'Shadows — warm-tinted, soft, low. Never hard black.',
           'Layout — flex/grid with `gap`. Never space siblings with margins or whitespace.']),
        H('Imagery'),
        L(['Warm, clean, slightly clinical. Natural ingredient tones — botanicals, powders, oils.',
           'Never neon, never heavily filtered, never generic handshake stock.',
           'The dotted infinity loop is the only signature texture — large, low-contrast, sparing.',
           'People imagery must look like real practitioners in real environments.']),
        H('Asset specs'),
        T(['Asset','Dimensions','Notes'],
          [['Social — square','1080×1080','Safe margin 64px'],
           ['Social — story / reel','1080×1920','Text inside the middle 60%'],
           ['LinkedIn / OG image','1200×627','Legible at 25% scale'],
           ['Blog hero','1600×900','Under 250 KB, WebP preferred'],
           ['Presentation','1920×1080','Text never below 24px'],
           ['Print / flier','A4 or Letter','300 dpi, 3mm bleed']]),
        N('Do not invent colours, fonts or components. If something is missing from this system, request it — do not improvise it.'),
      ]});
    ch.push({ key:'naming', title:'Naming Conventions', icon:'tag', owner:'Karan Shah', gov:false,
      summary:'Predictable names for everything, so search and audit both work.',
      blocks:[
        H('Why this matters'),
        P('Names are how the platform stays searchable at 10,000 records. A file called `final_v2.docx` is lost the moment it is saved.'),
        H('Record IDs — generated, never typed'),
        T(['Record','Pattern','Example'],
          [['Task','TSK-####','TSK-2045'],
           ['OKR','OKR-<FUNCTION>-<CYCLE>-###','OKR-SEO-Q3-001'],
           ['KPI','KPI-<FUNCTION>-###','KPI-CON-014'],
           ['Effort plan','EP-###','EP-004'],
           ['Campaign','CMP-###','CMP-012'],
           ['Lead / contact','LD-### / CN-###','LD-007 / CN-003'],
           ['SOP','SOP-###','SOP-002'],
           ['Ticket','TKT-####','TKT-1044']]),
        H('Files'),
        L(['`<record-id>-<what-it-is>-v<n>.<ext>` — e.g. `TSK-2045-turnitin-report-v1.pdf`.',
           'Lowercase, hyphens only. No spaces, no `final`, no `latest`, no personal initials.',
           'Version numbers increment; they never get replaced by words.']),
        H('URLs and slugs'),
        T(['Page type','Pattern','Example'],
          [['Service','/services/<service-slug>','/services/new-product-development'],
           ['Sub-service','/services/<parent>/<child>','/services/seo/technical-seo'],
           ['Insight','/insights/<topic-slug>','/insights/fssai-labelling-2026'],
           ['Case study','/case-studies/<client-outcome>','/case-studies/frl-3x-organic'],
           ['Landing','/lp/<campaign-slug>','/lp/npd-q3']]),
        L(['Lowercase, hyphenated, no dates, no stop words, no trailing slash. Slugs are permanent — changing one requires a redirect.']),
        H('Campaigns, UTMs and assets'),
        L(['Campaign: `<Brand> <Objective> <Cycle>` — e.g. *Beetloop Organic Growth Q3*.',
           'UTM: `utm_source=<platform>&utm_medium=<channel>&utm_campaign=<brand>-<objective>-<cycle>` — all lowercase.',
           'Creative: `<brand>-<campaign>-<format>-<variant>` — e.g. `beetloop-npd-q3-story-a`.']),
        N('Anything that breaks these conventions fails QC on the naming line — it is not a stylistic preference.'),
      ]});
    ch.push({ key:'approval', title:'Approval Matrix', icon:'shield-check', owner:'Karan Shah', gov:true,
      summary:'Who signs off what, before it goes out. Governance — Admin-maintained.',
      blocks:[
        N('This chapter is governance. Managers and Team Leads read and apply it; only Admin can change it — the same separation that keeps QC independent.'),
        H('Approval by artefact'),
        T(['Artefact','Prepared by','Reviewed by','Approved by','Cannot approve'],
          [['Blog / insight article','Writer','QC Reviewer','Content Team Lead','The author'],
           ['Service page','Writer + SEO','QC Reviewer','Manager','The author'],
           ['Any external claim','Writer','Compliance check','Admin + Manager','Anyone alone'],
           ['Campaign launch','Manager','COO (operational)','Manager','Team Lead'],
           ['Creative asset','Designer','Brand check (Design Lead)','Team Lead','The designer'],
           ['Guest / external placement','Executive','SEO Lead','Manager','The executive'],
           ['OKR / KPI definition','Manager','Leadership','Manager','Admin (business decision)'],
           ['Effort plan','Manager / Team Lead','—','Manager','Executive'],
           ['SOP or playbook chapter','Manager / Team Lead','Function owner','Approver named on the SOP','The author'],
           ['Master data change','Admin','—','Admin','Manager'],
           ['New user / role change','Admin','—','Admin','Anyone else']]),
        H('Standing rules'),
        L(['**No self-approval, ever** — including Managers and Admin on their own output.',
           '**Two-key rule for public claims** — a compliance check plus a business approval.',
           '**QC cannot be overridden by seniority.** A rejection is resolved by fixing the work or changing the standard through Admin.',
           '**Admin does not make business decisions** — no OKRs, no departmental targets, no campaign approvals.',
           '**Leadership does not assign daily tasks.** CEO and COO read and approve strategy; execution stays with Managers and Team Leads.']),
        H('Escalation ladder and clocks'),
        T(['Step','Who','Response time'],
          [['1 — Blocker raised','Team Lead','Same day'],
           ['2 — Unresolved','Manager','24 hours'],
           ['3 — Cross-function or client-impacting','COO','48 hours'],
           ['4 — Strategic or reputational','CEO','As convened']]),
      ]});
    ch.push({ key:'claims', title:'Claims & Compliance', icon:'scale', owner:'Karan Shah', gov:true,
      summary:'What we may say, what we must never say, and the evidence each claim requires. Governance — Admin-maintained.',
      blocks:[
        N('Governance chapter. Everyone must follow it; only Admin can amend it. If you believe a rule blocks legitimate work, raise a ticket — do not work around it.'),
        H('The rule beneath every other rule'),
        P('**No claim goes out without a substantiation source recorded against it.** Not "we know it is true" — a document, a study, a framework clause or a measured result that we can produce within one working day.'),
        H('Claim types and what each one needs'),
        T(['Claim type','Example','Required evidence','Approver'],
          [['Capability','"We have taken 200+ products to market."','Verifiable internal record','Manager'],
           ['Performance / result','"3× organic traffic in six months."','Analytics export + client written consent','Manager'],
           ['Comparative','"Faster than conventional development."','Documented like-for-like basis','Admin + Manager'],
           ['Regulatory','"FSSAI compliant."','Named clause and current version','Admin'],
           ['Health / nutrition','"Supports immunity."','Permitted-claim list for that market + study','Admin (mandatory)'],
           ['Scientific','"Clinically shown to…"','Peer-reviewed citation, correctly scoped','Admin'],
           ['Client reference','Named logo or quote','Written permission on file','Manager']]),
        H('Never, under any circumstances'),
        L(['Health claims not on the permitted list for the specific target market.',
           'Diagnosis, treatment, cure or prevention language for any non-medicinal product.',
           'Client names, logos or results without written permission on file.',
           'Competitor claims we cannot substantiate on a like-for-like basis.',
           '"Guaranteed", "100% safe", "no side effects", "risk-free".',
           'Statistics without a source, or a source we have not read in full.',
           'Reusing a claim approved for one market in another without re-checking that market.']),
        H('Market differences you must check every time'),
        T(['Market','Framework','Watch for'],
          [['India','FSSAI, ASCI, CDSCO','Nutraceutical claim list; advertising code'],
           ['EU','EFSA, EU 1924/2006','Only authorised health claims; strict wording'],
           ['US','FDA, FTC','Structure/function vs. disease claims; substantiation'],
           ['UAE / GCC','ESMA, GSO','Registration and Arabic labelling'],
           ['UK','FSA, CAP Code','Post-Brexit divergence from EU lists']]),
        H('The compliance workflow'),
        L(['**1. Draft the claim** with its intended market named.',
           '**2. Attach the evidence** to the task before submitting — a claim without evidence fails QC automatically.',
           '**3. Compliance check** verifies the claim against that market\'s framework.',
           '**4. Approval** per the Approval Matrix — health, regulatory and comparative claims require Admin.',
           '**5. Record it** — approved claim, market, evidence and expiry go on the record.',
           '**6. Re-verify** when the framework changes, the study ages, or the market changes.']),
        H('If you get it wrong'),
        L(['Stop the publication immediately — do not wait for permission to stop.',
           'Raise a Critical support ticket in the Data correction category.',
           'Admin assesses reach and issues the correction. We correct openly; we never quietly delete.']),
        N('Personal liability is real in regulated claims. When you are unsure, the correct action is always to ask, never to approximate.'),
      ]});
    return ch;
  }
  playbookView(rk){
    // access: everyone reads; Manager / Team Lead / Admin author; governance chapters Admin-only
    const canAuthor=['manager','team_lead','admin'].includes(rk);
    const isAdmin=rk==='admin';
    const bk=this.state.pbBrand||'beetloop';
    const b=this.PB_BRAND(bk);
    const chapters=this.PB_CHAPTERS(bk);
    const curKey=chapters.some(c=>c.key===this.state.pbChapter)?this.state.pbChapter:chapters[0].key;
    const cur=chapters.find(c=>c.key===curKey);
    const read=(this.state.pbRead||{})[bk]||[];
    const q=(this.state.pbQuery||'').toLowerCase();
    const hits=q?chapters.filter(c=>(c.title+' '+c.summary+' '+JSON.stringify(c.blocks)).toLowerCase().indexOf(q)>=0):[];
    const editable=canAuthor && (!cur.gov || isAdmin);
    // render **bold** and `code` as real tokens rather than literal punctuation
    const tok=(s)=>{ const out=[]; const re=/(\*\*[^*]+\*\*|`[^`]+`)/g; let last=0, m;
      while((m=re.exec(String(s)))!==null){
        if(m.index>last) out.push({ text:String(s).slice(last,m.index), plain:true });
        const v=m[0];
        if(v.indexOf('**')===0) out.push({ text:v.slice(2,-2), bold:true });
        else out.push({ text:v.slice(1,-1), code:true });
        last=m.index+v.length;
      }
      if(last<String(s).length) out.push({ text:String(s).slice(last), plain:true });
      return out.length?out:[{ text:String(s), plain:true }]; };
    const B=(bl)=>({ ...bl, tokens:tok(bl.text||''),
      isH:bl.type==='h', isP:bl.type==='p', isList:bl.type==='list', isNote:bl.type==='note',
      isTable:bl.type==='table', isKv:bl.type==='kv', isDo:bl.type==='do', isSwatch:bl.type==='swatch', isIcp:bl.type==='icp',
      items:(bl.items||[]).map(x=>(typeof x==='string')?{ text:x, tokens:tok(x) } : x),
      rows:(bl.rows||[]).map(r=>({ cells:r.map(c=>({ v:c, tokens:tok(c) })) })),
      cols:(bl.cols||[]).map(c=>({ v:c })),
      dos:(bl.dos||[]).map(x=>({ text:x })), donts:(bl.donts||[]).map(x=>({ text:x })),
      swatches:(bl.items&&bl.type==='swatch')?bl.items.map(s=>({ ...s })):[],
      icps:(bl.type==='icp'?bl.items:[]).map(x=>({ name:x.name, who:x.who, size:x.size, geo:x.geo, message:x.message,
        pains:(x.pains||[]).map(p=>({ text:p })), triggers:(x.triggers||[]).map(p=>({ text:p })),
        channels:(x.channels||[]).map(p=>({ text:p })), objections:(x.objections||[]).map(p=>({ text:p })) })),
    });
    return {
      pbIsOpen:true,
      pbBrandTabs:this.PB_BRANDS().map(x=>({ name:x.name, key:x.key, active:x.key===bk,
        style:'display:flex;flex-direction:column;gap:2px;padding:9px 14px;border-radius:11px;cursor:pointer;text-align:left;border:1px solid '+(x.key===bk?'transparent':'var(--line-300)')+';background:'+(x.key===bk?x.color:'#fff')+';color:'+(x.key===bk?'#fff':'var(--ink-700)'),
        sub:x.sector.split(' · ')[0],
        set:()=>this.setState({ pbBrand:x.key, pbChapter:null }) })),
      pbBrandName:b.name, pbBrandTagline:b.tagline, pbBrandSector:b.sector, pbBrandSite:b.site,
      pbProgress:read.length+' of '+chapters.length+' chapters read',
      pbProgressW:Math.round(read.length/chapters.length*100)+'%',
      pbChapters:chapters.map((c,i)=>({ key:c.key, n:String(i+1), title:c.title, icon:c.icon, summary:c.summary,
        gov:c.gov, govLabel:c.gov?'Admin-owned':'',
        done:read.includes(c.key),
        style:'display:flex;align-items:flex-start;gap:9px;width:100%;text-align:left;padding:10px 12px;border-radius:11px;cursor:pointer;border:1px solid '+(c.key===curKey?'var(--orchid-400)':'transparent')+';background:'+(c.key===curKey?'var(--orchid-100)':'transparent'),
        go:()=>this.setState({ pbChapter:c.key }) })),
      pbCur:{ title:cur.title, icon:cur.icon, summary:cur.summary, owner:cur.owner,
        gov:cur.gov, n:String(chapters.findIndex(c=>c.key===curKey)+1), total:String(chapters.length) },
      pbBlocks:(cur.blocks||[]).map(B),
      pbEditable:editable,
      pbGovLocked:cur.gov&&!isAdmin&&canAuthor,
      pbGovNote:'This chapter is Admin-owned governance — you can read and apply it, but not change it.',
      pbEdit:()=>this.flash(editable
        ? ('Editing “'+cur.title+'” — changes are versioned and require '+(cur.gov?'Admin':'the function owner')+' approval before publishing.')
        : 'View only for your role.'),
      pbMarkRead:()=>{ const r={...(this.state.pbRead||{})};
        const arr=r[bk]||[]; if(arr.includes(curKey)){ this.flash('Already marked as read.'); return; }
        r[bk]=[...arr,curKey]; this.setState({ pbRead:r });
        this.flash('“'+cur.title+'” marked as read — '+(arr.length+1)+' of '+chapters.length+' complete.'); },
      pbIsRead:read.includes(curKey),
      pbNext:()=>{ const i=chapters.findIndex(c=>c.key===curKey);
        this.setState({ pbChapter:chapters[Math.min(chapters.length-1,i+1)].key }); },
      pbPrev:()=>{ const i=chapters.findIndex(c=>c.key===curKey);
        this.setState({ pbChapter:chapters[Math.max(0,i-1)].key }); },
      pbQuery:this.state.pbQuery||'', pbSetQuery:(e)=>this.setState({ pbQuery:e.target.value }),
      pbHasHits:hits.length>0,
      pbHits:hits.map(c=>({ title:c.title, go:()=>this.setState({ pbChapter:c.key, pbQuery:'' }) })),
    };
  }

  // ---- SOPs — the documented way work is done, tied to gold standards and QC ----
  SOP_CATS(){ return ['Content production','SEO execution','Social media','Web development','Design & creative','Quality control','Lead & pipeline','Reporting & analytics','Client onboarding','Platform administration']; }
  SOP_FREQ(){ return ['Daily','Weekly','Monthly','Per project','One-time','On trigger']; }
  SOP_PRIORITIES(){ return ['Critical','High','Medium','Low']; }
  SOP_EVIDENCE(){ return ['File upload','URL','Screenshot','PDF','Document']; }
  SOP_REL(){ return ['Requires completion of','Related SOP','Parent SOP','Child SOP']; }
  GOLD_STANDARDS(){ return [
    { id:'gs1', name:'Plagiarism / similarity', op:'≤', val:'5', unit:'Plagiarism %', tool:'Turnitin', note:'≤ 5% similarity (≥ 95% originality)' },
    { id:'gs2', name:'AI-content originality', op:'≥', val:'95', unit:'%', tool:'Originality.ai', note:'≥ 95% human-written score' },
    { id:'gs3', name:'Grammar & clarity score', op:'≥', val:'90', unit:'Score (0–100)', tool:'Grammarly', note:'≥ 90 Grammarly score' },
    { id:'gs4', name:'Readability', op:'≥', val:'60', unit:'Readability score', tool:'Hemingway Editor', note:'≥ 60 Flesch reading ease' },
    { id:'gs5', name:'On-page SEO score', op:'≥', val:'85', unit:'Score (0–100)', tool:'Yoast SEO', note:'≥ 85 on-page score' },
    { id:'gs6', name:'Core Web Vitals — LCP', op:'≤', val:'2.5', unit:'Seconds', tool:'PageSpeed Insights', note:'≤ 2.5s LCP' },
    { id:'gs7', name:'Lighthouse performance', op:'≥', val:'90', unit:'Score (0–100)', tool:'Lighthouse', note:'≥ 90 performance score' },
    { id:'gs8', name:'Backlink spam score', op:'≤', val:'3', unit:'Spam score %', tool:'Moz', note:'≤ 3% spam score' },
    { id:'gs9', name:'Referring domain authority', op:'≥', val:'40', unit:'Domain Authority', tool:'Ahrefs', note:'DA ≥ 40' },
    { id:'gs10', name:'QC first-pass approval', op:'≥', val:'90', unit:'%', tool:'Beetloop QC checklist', note:'≥ 90% approved without rework' },
    { id:'gs11', name:'Broken links on site', op:'≤', val:'0', unit:'Errors', tool:'Screaming Frog', note:'Zero broken links' },
  ]; }
  sopPriTone(p){ return { Critical:{bg:'var(--danger-100)',c:'var(--danger-600)'}, High:{bg:'var(--warn-100)',c:'var(--warn-600)'},
    Medium:{bg:'var(--info-100)',c:'var(--info-600)'}, Low:{bg:'var(--surface-50)',c:'var(--ink-500)'} }[p]||{bg:'var(--surface-50)',c:'var(--ink-500)'}; }
  SOP_SEED(){ const d=(n)=>this.relDate(-n); const f=(n)=>this.relDate(n);
    const S=(t,desc,outcome,dur,ev,subs,links,notes)=>({ t, d:desc, outcome:outcome||'', dur:dur||'', ev:ev||[], subs:subs||[], links:links||[], notes:notes||'', files:[] });
    return [
    { id:'SOP-001', title:'Publishing a service page', division:'Content', category:'Content production',
      version:'v3.2', status:'Published', priority:'Critical', estTime:'6 h', frequency:'Per project',
      owner:'Priya Nair', approver:'Aarav Kapoor', updated:d(6), updatedBy:'Priya Nair', review:f(80), lastReviewed:d(40),
      lastExecuted:d(2), execCount:34, avgTime:'6.4 h', trend:'+8% faster than last quarter',
      tags:['service page','seo','launch'],
      trigger:'A new or refreshed service is approved for market',
      applicability:'Any service page on a Beetloop-group domain, all markets',
      purpose:'Every service page ships with complete SEO metadata, internal links and QC sign-off before it goes live.',
      scope:'Covers drafting through publication. Excludes paid landing pages (see SOP-006).',
      inputs:['Approved service brief','Target keyword set','Two competitor references'],
      outputs:['Published page URL','Completed compliance checklist','Logged KPI actual'],
      resources:['Website Content Repository','Turnitin','Grammarly','Yoast SEO'],
      docs:[{ name:'service-page-outline-v4.docx', kind:'Template' },{ name:'seo-metadata-checklist.pdf', kind:'Document' },{ name:'page-walkthrough.mp4', kind:'Video' },{ name:'Gold standard reference', kind:'Link' }],
      successCriteria:'Approved by QC on first pass with on-page score ≥ 85 and originality ≥ 95%.',
      risks:'Pages go live with thin metadata, lose ranking, and require a costly retrofit.',
      escalation:'Priya Nair → Rahul Menon',
      standards:['On-page SEO score ≥ 85','Plagiarism ≤ 5%','Meta title ≤ 60 characters'],
      templates:['Write Service Page'], roles:['Content Writer','SEO Lead','QC Reviewer'],
      kpis:[{ name:'Organic Sessions', owner:'Aditi Rao', status:'On track' },{ name:'Qualified Leads', owner:'Priya Nair', status:'At risk' }],
      sops:[{ rel:'Requires completion of', id:'SOP-007' },{ rel:'Related SOP', id:'SOP-002' },{ rel:'Child SOP', id:'SOP-006' }],
      steps:[
        S('Create the page record','Website Content Repository → New page. Complete Page Info and Classification before writing.','A page record exists with a permanent slug','20 m',['Screenshot'],[['Confirm the slug against Naming Conventions','Lowercase, hyphenated, no dates'],['Set the parent page','So the hierarchy renders correctly in the repository']],[{label:'Naming Conventions',url:'/sop/naming'}],'Slugs are permanent — a change later needs a redirect.'),
        S('Draft against the outline','Use the approved H1/H2/H3 scaffold. Minimum 1,200 words for a service page.','A complete draft matching the outline','3 h',['Document'],[['Write the intro to the ICP','Name the pain in the first 40 words'],['Add the proof section','At least one measurable outcome']],[],''),
        S('Complete SEO metadata','Meta title, description, focus and secondary keywords, canonical, schema type.','All 12 metadata rows populated','30 m',['Screenshot'],[],[],'Character counters must be green before you continue.'),
        S('Add relationships and links','Link one related insight and two internal service pages with descriptive anchors.','Links resolve, anchors are descriptive','20 m',[],[],[],''),
        S('Run the quality tools','Turnitin, Grammarly, Yoast. Attach each report to the task.','Three reports attached','40 m',['PDF','File upload'],[],[],'Reports below the gold standard must be fixed before submission, not explained.'),
        S('Self-assess the checklist','Fill every compliance line with its value and evidence, then submit for QC.','Checklist submitted and locked','30 m',['File upload'],[],[],''),
        S('QC review','QC verifies each line and returns Compliant / Accept conditional / Rework.','A recorded QC verdict per line','1 h',[],[],[],'QC never edits the page.'),
        S('Publish and log the KPI','On approval, publish and close the task — the KPI actual logs automatically.','Page live, task closed, KPI updated','20 m',['URL'],[],[],''),
      ],
      versions:[
        { v:'v3.2', by:'Priya Nair', date:d(6), summary:'Added evidence requirement to the quality-tools step.', reason:'Two pages published without Turnitin reports last cycle.', published:d(6), review:f(80) },
        { v:'v3.1', by:'Aditi Rao', date:d(60), summary:'Raised on-page score threshold from 80 to 85.', reason:'Competitor benchmark moved.', published:d(60), review:d(6) },
        { v:'v3.0', by:'Priya Nair', date:d(150), summary:'Restructured into eight steps with sub-steps.', reason:'Writers were skipping metadata.', published:d(150), review:d(60) },
      ],
      audit:[['Created','Priya Nair',d(300)],['Published','Priya Nair',d(150)],['Version updated','Aditi Rao',d(60)],['Reviewed','Aarav Kapoor',d(40)],['Version updated','Priya Nair',d(6)]],
      comments:[
        { by:'Sameer Iyer', when:d(4), step:'Complete SEO metadata', text:'Should secondary keywords be capped at three? Pages with six read badly.' },
        { by:'Priya Nair', when:d(3), step:'', text:'Yes — three is the cap. Adding it to the next revision.' },
      ],
      ack:['Sameer Iyer','Neha Verma'] },
    { id:'SOP-002', title:'Backlink outreach and verification', division:'SEO', category:'SEO execution',
      version:'v2.0', status:'Published', priority:'High', estTime:'2 h', frequency:'Weekly',
      owner:'Aditi Rao', approver:'Priya Nair', updated:d(12), updatedBy:'Aditi Rao', review:f(60), lastReviewed:d(30),
      lastExecuted:d(1), execCount:112, avgTime:'1.8 h', trend:'stable',
      tags:['backlinks','outreach','verification'],
      trigger:'Weekly link-building cycle opens, or a new target page is published',
      applicability:'All link acquisition across group domains',
      purpose:'Only qualified domains are used, and every placed link is verified live on a weekly cycle.',
      scope:'Covers qualification, submission and verification. Excludes paid placements.',
      inputs:['Target page URL','Approved anchor list','Domain shortlist'],
      outputs:['Live link record','Updated domain repository entry'],
      resources:['Backlink Domain Repository','Ahrefs','Moz'],
      docs:[{ name:'outreach-email-templates.docx', kind:'Template' },{ name:'domain-qualification-rules.pdf', kind:'Document' }],
      successCriteria:'Link live, correct anchor and target, verified within seven days.',
      risks:'Toxic domains damage the profile and take months to disavow.',
      escalation:'Aditi Rao → Priya Nair',
      standards:['Referring domain authority ≥ 40','Spam score ≤ 3%','DoFollow where possible'],
      templates:['Backlink Outreach'], roles:['SEO Executive','SEO Lead'],
      kpis:[{ name:'Referring Domains', owner:'Aditi Rao', status:'On track' }],
      sops:[{ rel:'Related SOP', id:'SOP-001' }],
      steps:[
        S('Qualify the domain','Confirm it exists in the repository with DA ≥ 40 and spam ≤ 3%.','A qualified domain record','20 m',['Screenshot'],[['Check the industry match','Off-topic domains are rejected regardless of DA']],[],''),
        S('Record the submission','Log the submitted URL and account against the domain record.','Submission logged','15 m',[],[],[],''),
        S('Verify placement','Confirm the link is live with the correct anchor and target.','Verified live link','20 m',['Screenshot','URL'],[],[],''),
        S('Weekly re-verification','Re-check live status weekly; mark broken links immediately.','Verification queue cleared','45 m',['File upload'],[],[],''),
      ],
      versions:[
        { v:'v2.0', by:'Aditi Rao', date:d(12), summary:'Added weekly re-verification as a required step.', reason:'14% of links were silently removed.', published:d(12), review:f(60) },
        { v:'v1.0', by:'Aditi Rao', date:d(200), summary:'Initial procedure.', reason:'New function.', published:d(200), review:d(12) },
      ],
      audit:[['Created','Aditi Rao',d(210)],['Published','Aditi Rao',d(200)],['Reviewed','Priya Nair',d(30)],['Version updated','Aditi Rao',d(12)]],
      comments:[], ack:['Sameer Iyer','Arjun Pillai'] },
    { id:'SOP-003', title:'QC review and rework loop', division:'Quality', category:'Quality control',
      version:'v1.4', status:'Published', priority:'Critical', estTime:'1 h', frequency:'Daily',
      owner:'Farhan Ali', approver:'Rahul Menon', updated:d(3), updatedBy:'Farhan Ali', review:f(95), lastReviewed:d(20),
      lastExecuted:d(0), execCount:486, avgTime:'52 m', trend:'+12% faster',
      tags:['qc','review','independence'],
      trigger:'A task is submitted for QC',
      applicability:'Every deliverable across all functions',
      purpose:'QC stays independent: reviewers verify against the gold standards and never edit the work themselves.',
      scope:'All QC verdicts and rework routing.',
      inputs:['Submitted task','Self-assessed checklist','Attached evidence'],
      outputs:['QC verdict per line','Written rework reason where applicable'],
      resources:['QC Review queue','Compliance checklist','Gold Standard master'],
      docs:[{ name:'qc-verdict-guidance.pdf', kind:'Document' }],
      successCriteria:'Every line has a verdict, and every rework carries a written reason.',
      risks:'QC becomes a rubber stamp and defects reach clients.',
      escalation:'Farhan Ali → Rahul Menon',
      standards:['QC first-pass approval ≥ 90%','Every rework carries a written reason'],
      templates:[], roles:['QC Reviewer','Team Lead'],
      kpis:[{ name:'QC First-Pass Rate', owner:'Farhan Ali', status:'On track' }],
      sops:[{ rel:'Parent SOP', id:'SOP-001' }],
      steps:[
        S('Open the QC queue','Work oldest-first within SLA. Confirm evidence is attached before reviewing.','Queue triaged','10 m',[],[],[],''),
        S('Verify each checklist line','Enter your own measured value beside the self score.','Independent value recorded per line','25 m',['Screenshot'],[],[],''),
        S('Decide per line','Compliant, Accept conditional, or Rework — the last two require a comment.','A verdict per line','15 m',[],[],[],''),
        S('Return or approve','Approve only when every line is Compliant or conditionally accepted.','Task routed','5 m',[],[],[],''),
        S('Never edit the deliverable','Request the change; the doer makes it.','Independence preserved','—',[],[],[],'This is a principle, not a preference.'),
      ],
      versions:[
        { v:'v1.4', by:'Farhan Ali', date:d(3), summary:'Clarified the conditional-acceptance path.', reason:'Reviewers were rejecting minor issues outright.', published:d(3), review:f(95) },
        { v:'v1.3', by:'Farhan Ali', date:d(90), summary:'Added the no-editing rule explicitly.', reason:'An audit finding.', published:d(90), review:d(3) },
      ],
      audit:[['Created','Farhan Ali',d(240)],['Published','Farhan Ali',d(230)],['Version updated','Farhan Ali',d(90)],['Reviewed','Rahul Menon',d(20)],['Version updated','Farhan Ali',d(3)]],
      comments:[], ack:['Aditi Rao'] },
    { id:'SOP-004', title:'Daily lead logging', division:'Marketing', category:'Lead & pipeline',
      version:'v1.1', status:'Published', priority:'High', estTime:'20 m', frequency:'Daily',
      owner:'Priya Nair', approver:'Rahul Menon', updated:d(2), updatedBy:'Priya Nair', review:f(70), lastReviewed:d(25),
      lastExecuted:d(0), execCount:180, avgTime:'16 m', trend:'stable',
      tags:['leads','attribution','daily'],
      trigger:'End of each working day',
      applicability:'All inbound enquiries across group brands',
      purpose:'Leads are attributed to the service page that produced them, on the day they arrive.',
      scope:'Logging and attribution only. Qualification is covered by the pipeline process.',
      inputs:['Enquiry records','Analytics visitor counts'],
      outputs:['Daily lead entry','Named contact records'],
      resources:['OKR & KPI → Daily leads','GA4'],
      docs:[], successCriteria:'Every lead in the count has a named contact and a service page.',
      risks:'Attribution is lost and channel investment cannot be justified.',
      escalation:'Priya Nair → Rahul Menon',
      standards:['Logged same day','Every lead attributed to a service page'],
      templates:[], roles:['Manager','Admin'],
      kpis:[{ name:'Qualified Leads', owner:'Priya Nair', status:'At risk' }],
      sops:[],
      steps:[
        S('Log before end of day','OKR & KPI → Daily leads. Never backdate more than one day.','Entry saved for today','5 m',[],[],[],''),
        S('Attribute to a service page','Pick the page from the repository — the campaign auto-fills.','Lead linked to a page','5 m',[],[],[],''),
        S('Record visitors alongside leads','So conversion rate is computable per page.','Visitors captured','5 m',['Screenshot'],[],[],''),
        S('Add the contact record','Each lead needs a named contact with a qualification stage.','Contacts created','5 m',[],[],[],''),
      ],
      versions:[{ v:'v1.1', by:'Priya Nair', date:d(2), summary:'Added the visitors field as mandatory.', reason:'Conversion rate was not computable.', published:d(2), review:f(70) }],
      audit:[['Created','Priya Nair',d(120)],['Published','Priya Nair',d(115)],['Reviewed','Rahul Menon',d(25)],['Version updated','Priya Nair',d(2)]],
      comments:[], ack:[] },
    { id:'SOP-005', title:'Reel production and scheduling', division:'SMM', category:'Social media',
      version:'v0.6', status:'Draft', priority:'Medium', estTime:'4 h', frequency:'Weekly',
      owner:'Neha Verma', approver:'Priya Nair', updated:d(1), updatedBy:'Neha Verma', review:f(120), lastReviewed:'',
      lastExecuted:'', execCount:0, avgTime:'—', trend:'no data yet',
      tags:['reels','video','smm'],
      trigger:'Weekly content calendar slot',
      applicability:'Instagram, YouTube Shorts, LinkedIn video',
      purpose:'Draft — standardise reel specs, caption format and posting windows across platforms.',
      scope:'Production and scheduling. Paid promotion excluded.',
      inputs:['Approved hook','Brand asset kit'],
      outputs:['Scheduled reel','Caption and hashtag set'],
      resources:['Asset library','Buffer'],
      docs:[{ name:'reel-spec-sheet.pdf', kind:'Document' }],
      successCriteria:'Published on schedule at spec with brand check passed.',
      risks:'Off-spec assets get cropped and the brand looks careless.',
      escalation:'Neha Verma → Priya Nair',
      standards:['Brand guideline adherence ≥ 90','Asset spec compliance 100%'],
      templates:['Create Reel'], roles:['Graphic Designer','SMM Executive'],
      kpis:[{ name:'Engagement Rate', owner:'Neha Verma', status:'No data' }],
      sops:[{ rel:'Related SOP', id:'SOP-003' }],
      steps:[
        S('Confirm the brief','Hook, payoff and CTA agreed before production.','Signed-off brief','30 m',[],[],[],''),
        S('Produce to platform specs','9:16, safe margins, captions burned in.','Export at spec','2 h',['File upload'],[],[],''),
        S('QC the asset','Brand check plus spec check before scheduling.','QC approval','30 m',['Screenshot'],[],[],''),
      ],
      versions:[{ v:'v0.6', by:'Neha Verma', date:d(1), summary:'Working draft.', reason:'New channel.', published:'', review:f(120) }],
      audit:[['Created','Neha Verma',d(10)],['Edited','Neha Verma',d(1)]],
      comments:[{ by:'Priya Nair', when:d(1), step:'Produce to platform specs', text:'Add the LinkedIn 4:5 variant before this goes to review.' }],
      ack:[] },
    { id:'SOP-006', title:'Campaign landing page build', division:'Web Development', category:'Web development',
      version:'v1.2', status:'In review', priority:'High', estTime:'8 h', frequency:'Per project',
      owner:'Rohit Sharma', approver:'Priya Nair', updated:d(4), updatedBy:'Rohit Sharma', review:f(20), lastReviewed:d(70),
      lastExecuted:d(9), execCount:11, avgTime:'8.6 h', trend:'-4% slower',
      tags:['landing page','campaign','performance'],
      trigger:'A campaign is approved with a paid or outbound component',
      applicability:'All /lp/ campaign pages',
      purpose:'Landing pages load fast, track correctly and convert — before spend starts.',
      scope:'Build, instrumentation and pre-launch checks.',
      inputs:['Campaign brief','Approved copy','UTM plan'],
      outputs:['Live landing page','Verified tracking','Performance report'],
      resources:['Lighthouse','PageSpeed Insights','GA4'],
      docs:[{ name:'lp-build-checklist.pdf', kind:'Document' },{ name:'lp-starter.zip', kind:'Template' }],
      successCriteria:'LCP ≤ 2.5s, Lighthouse ≥ 90, conversion tracking verified end to end.',
      risks:'Spend starts against a page that does not track — the budget is unattributable.',
      escalation:'Rohit Sharma → Priya Nair',
      standards:['Lighthouse performance ≥ 90','Core Web Vitals — LCP ≤ 2.5s','Broken links 0'],
      templates:[], roles:['Web Developer','SEO Lead'],
      kpis:[{ name:'Landing Page Conversion', owner:'Rohit Sharma', status:'On track' }],
      sops:[{ rel:'Parent SOP', id:'SOP-001' }],
      steps:[
        S('Build from the starter','Use the approved starter, not a copied page.','Page scaffolded','2 h',[],[],[],''),
        S('Instrument tracking','UTMs, events and goal verified in GA4 before launch.','Tracking verified','2 h',['Screenshot'],[['Fire a test conversion','Confirm it lands in GA4']],[],''),
        S('Run performance checks','Lighthouse and PageSpeed against the gold standards.','Reports attached','1 h',['PDF'],[],[],''),
        S('Pre-launch QC','Links, forms, mobile layout, consent banner.','QC approval','1 h',['Screenshot'],[],[],''),
      ],
      versions:[
        { v:'v1.2', by:'Rohit Sharma', date:d(4), summary:'Added the test-conversion sub-step.', reason:'A campaign ran three days untracked.', published:'', review:f(20) },
        { v:'v1.1', by:'Rohit Sharma', date:d(100), summary:'Added Core Web Vitals thresholds.', reason:'Google update.', published:d(100), review:d(4) },
      ],
      audit:[['Created','Rohit Sharma',d(180)],['Published','Rohit Sharma',d(170)],['Version updated','Rohit Sharma',d(100)],['Reviewed','Priya Nair',d(70)],['Edited','Rohit Sharma',d(4)]],
      comments:[], ack:['Arjun Pillai'] },
    { id:'SOP-007', title:'Keyword research and mapping', division:'SEO', category:'SEO execution',
      version:'v2.1', status:'Published', priority:'High', estTime:'5 h', frequency:'Monthly',
      owner:'Aditi Rao', approver:'Priya Nair', updated:d(18), updatedBy:'Sameer Iyer', review:d(5), lastReviewed:d(110),
      lastExecuted:d(6), execCount:26, avgTime:'5.2 h', trend:'stable',
      tags:['keywords','research','mapping'],
      trigger:'Monthly planning cycle, or a new service is added',
      applicability:'All group domains and markets',
      purpose:'Every target page has one primary keyword and no two pages compete for it.',
      scope:'Research, clustering and page mapping.',
      inputs:['Service list','Competitor set','Market'],
      outputs:['Keyword master entries','Page-to-keyword map'],
      resources:['Semrush','Google Search Console','Keyword master'],
      docs:[{ name:'clustering-method.pdf', kind:'Document' }],
      successCriteria:'Zero cannibalisation and every priority page mapped.',
      risks:'Two pages compete, both rank lower, and effort is wasted.',
      escalation:'Aditi Rao → Priya Nair',
      standards:['Focus keyword usage 1–2%'],
      templates:['Keyword Research'], roles:['SEO Executive','SEO Lead'],
      kpis:[{ name:'Keywords in Top 10', owner:'Aditi Rao', status:'On track' }],
      sops:[{ rel:'Child SOP', id:'SOP-001' }],
      steps:[
        S('Pull the seed set','Search Console plus Semrush for the market.','Seed list exported','1 h',['File upload'],[],[],''),
        S('Cluster by intent','Group by what the searcher is trying to do, not by string similarity.','Intent clusters','2 h',[],[],[],''),
        S('Map one keyword per page','Check the existing map for conflicts before assigning.','Conflict-free map','1 h',['Document'],[],[],''),
        S('Update the keyword master','Volume, difficulty, intent, priority, landing page.','Master updated','1 h',[],[],[],''),
      ],
      versions:[
        { v:'v2.1', by:'Sameer Iyer', date:d(18), summary:'Added the cannibalisation check before assignment.', reason:'Two service pages competed in Q1.', published:d(18), review:d(5) },
        { v:'v2.0', by:'Aditi Rao', date:d(140), summary:'Switched from volume-first to intent-first clustering.', reason:'Better conversion on lower-volume terms.', published:d(140), review:d(18) },
      ],
      audit:[['Created','Aditi Rao',d(260)],['Published','Aditi Rao',d(250)],['Version updated','Aditi Rao',d(140)],['Reviewed','Priya Nair',d(110)],['Version updated','Sameer Iyer',d(18)]],
      comments:[], ack:['Sameer Iyer'] },
  ]; }
  allSops(){ const upd=this.state.sopUpd||{};
    return (this.state.sopAdded||[]).concat(this.SOP_SEED()).map(s=>upd[s.id]?{...s,...upd[s.id]}:s); }
  sopTone(s){ return { Published:{bg:'var(--verify-100)',c:'var(--verify-600)'}, Draft:{bg:'var(--surface-50)',c:'var(--ink-500)'},
    'In review':{bg:'var(--warn-100)',c:'var(--warn-600)'}, Retired:{bg:'#EAE4E8',c:'var(--beet-700)'} }[s]||{bg:'var(--surface-50)',c:'var(--ink-500)'}; }
  sopReviewState(s){
    const iso=this.isoDate(s.review); if(!iso) return { label:'no review set', color:'var(--ink-400)', overdue:false, soon:false };
    const days=Math.round((new Date(iso+'T00:00:00')-Date.now())/86400000);
    if(days<0) return { label:'overdue by '+Math.abs(days)+' d', color:'var(--danger-600)', overdue:true, soon:false, days };
    if(days<=30) return { label:'due in '+days+' d', color:'var(--warn-600)', overdue:false, soon:true, days };
    return { label:s.review, color:'var(--ink-500)', overdue:false, soon:false, days };
  }
  // bi-directional: which SOPs contribute to a given KPI name
  sopsForKpi(name){ return this.allSops().filter(s=>(s.kpis||[]).some(k=>k.name===name)); }
  sopFormData(rk){
    if(!this.state.sopNew) return { sopFormOpen:false };
    const f=this.state.sopForm||{};
    const set=(k)=>(e)=>this.setState({ sopForm:{...f,[k]:e.target.value} });
    const steps=f.steps||[{t:'',d:'',outcome:'',dur:'',ev:[],subs:[]}];
    const all=this.allSops();
    const nextId='SOP-'+String(all.length+1).padStart(3,'0');
    const kpiPool=[...new Set(all.reduce((a,s)=>a.concat((s.kpis||[]).map(k=>k.name)),[]))]
      .concat(['Organic Sessions','Qualified Leads','Keywords in Top 10','Referring Domains','Engagement Rate','QC First-Pass Rate']);
    const kpiOpts=[...new Set(kpiPool)];
    const sec=(f.section||'basics');
    const secs=[['basics','Identification','file-text'],['classify','Classification','tag'],['context','Execution context','workflow'],['steps','Steps','list-checks'],['links','Relationships','git-branch'],['gov','Governance','shield-check']];
    return { sopFormOpen:true, sf:f, sopNextId:nextId,
      sopClose:()=>this.setState({ sopNew:false, sopForm:{} }),
      sopStop:(e)=>e.stopPropagation(),
      sopSecs:secs.map(x=>({ key:x[0], label:x[1], icon:x[2], active:sec===x[0],
        style:'display:flex;align-items:center;gap:6px;padding:7px 12px;border-radius:9px;font-size:11.5px;font-weight:700;cursor:pointer;border:none;'+(sec===x[0]?'background:var(--beet-700);color:#fff':'background:var(--surface-50);color:var(--ink-500)'),
        go:()=>this.setState({ sopForm:{...f, section:x[0]} }) })),
      sopSecBasics:sec==='basics', sopSecClassify:sec==='classify', sopSecContext:sec==='context',
      sopSecSteps:sec==='steps', sopSecLinks:sec==='links', sopSecGov:sec==='gov',
      sopSetTitle:set('title'), sopSetPurpose:set('purpose'), sopSetScope:set('scope'),
      sopSetDivision:set('division'), sopSetStatus:set('status'), sopSetApprover:set('approver'),
      sopSetReview:set('review'), sopSetCategory:set('category'), sopSetPriority:set('priority'),
      sopSetFrequency:set('frequency'), sopSetEstTime:set('estTime'), sopSetTrigger:set('trigger'),
      sopSetApplicability:set('applicability'), sopSetInputs:set('inputs'), sopSetOutputs:set('outputs'),
      sopSetResources:set('resources'), sopSetDocs:set('docs'), sopSetSuccess:set('successCriteria'),
      sopSetRisks:set('risks'), sopSetEscalation:set('escalation'), sopSetTags:set('tags'),
      sopSetChange:set('changeSummary'), sopSetReason:set('reason'),
      sopDivisionOptions:['Content','SEO','SMM','Web Development','Design','Quality','Marketing','Analytics','Operations'],
      sopStatusOptions:['Draft','In review','Published'],
      sopCategoryOptions:this.SOP_CATS(),
      sopPriorityOptions:this.SOP_PRIORITIES(),
      sopFrequencyOptions:this.SOP_FREQ(),
      sopApproverOptions:(this.state.users||[]).map(u=>u.name),
      sopStdRows:this.GOLD_STANDARDS().map(g=>{ const on=(f.standards||[]).includes(g.id);
        return { id:g.id, label:g.name, note:g.note, on,
          style:'display:flex;align-items:center;gap:7px;padding:7px 11px;border-radius:999px;font-size:11.5px;font-weight:700;cursor:pointer;border:1px solid '+(on?'var(--verify-500)':'var(--line-300)')+';background:'+(on?'var(--verify-100)':'#fff')+';color:'+(on?'var(--verify-600)':'var(--ink-700)'),
          toggle:()=>{ const cur=f.standards||[];
            this.setState({ sopForm:{...f, standards:on?cur.filter(x=>x!==g.id):[...cur,g.id]} }); } }; }),
      sopKpiRows:kpiOpts.map(n=>{ const on=(f.kpis||[]).includes(n);
        return { name:n, on,
          style:'display:flex;align-items:center;gap:6px;padding:6px 11px;border-radius:999px;font-size:11.5px;font-weight:700;cursor:pointer;border:1px solid '+(on?'var(--orchid-400)':'var(--line-300)')+';background:'+(on?'var(--orchid-100)':'#fff')+';color:'+(on?'var(--orchid-700)':'var(--ink-700)'),
          toggle:()=>{ const cur=f.kpis||[];
            this.setState({ sopForm:{...f, kpis:on?cur.filter(x=>x!==n):[...cur,n]} }); } }; }),
      sopRelRows:(f.rels||[{rel:'Related SOP',id:''}]).map((r,i)=>({
        rel:r.rel, id:r.id, n:String(i+1),
        relOptions:this.SOP_REL(),
        sopOptions:[''].concat(all.map(s=>s.id+' — '+s.title)),
        setRel:(e)=>{ const a=(f.rels||[{rel:'Related SOP',id:''}]).slice(); a[i]={...a[i],rel:e.target.value}; this.setState({ sopForm:{...f,rels:a} }); },
        setId:(e)=>{ const a=(f.rels||[{rel:'Related SOP',id:''}]).slice(); a[i]={...a[i],id:String(e.target.value).split(' — ')[0]}; this.setState({ sopForm:{...f,rels:a} }); },
        remove:()=>{ const a=(f.rels||[]).slice(); a.splice(i,1); this.setState({ sopForm:{...f,rels:a.length?a:[{rel:'Related SOP',id:''}]} }); },
        canRemove:(f.rels||[]).length>1 })),
      sopAddRel:()=>this.setState({ sopForm:{...f, rels:[...(f.rels||[{rel:'Related SOP',id:''}]),{rel:'Related SOP',id:''}]} }),
      sopSteps:steps.map((st,i)=>({ n:String(i+1), t:st.t, d:st.d, outcome:st.outcome||'', dur:st.dur||'', notes:st.notes||'',
        setT:(e)=>{ const a=steps.slice(); a[i]={...a[i],t:e.target.value}; this.setState({ sopForm:{...f,steps:a} }); },
        setD:(e)=>{ const a=steps.slice(); a[i]={...a[i],d:e.target.value}; this.setState({ sopForm:{...f,steps:a} }); },
        setOutcome:(e)=>{ const a=steps.slice(); a[i]={...a[i],outcome:e.target.value}; this.setState({ sopForm:{...f,steps:a} }); },
        setDur:(e)=>{ const a=steps.slice(); a[i]={...a[i],dur:e.target.value}; this.setState({ sopForm:{...f,steps:a} }); },
        setNotes:(e)=>{ const a=steps.slice(); a[i]={...a[i],notes:e.target.value}; this.setState({ sopForm:{...f,steps:a} }); },
        evRows:this.SOP_EVIDENCE().map(ev=>{ const on=(st.ev||[]).includes(ev);
          return { label:ev, on,
            style:'padding:4px 9px;border-radius:999px;font-size:10px;font-weight:700;cursor:pointer;border:1px solid '+(on?'var(--info-500)':'var(--line-300)')+';background:'+(on?'var(--info-100)':'#fff')+';color:'+(on?'var(--info-600)':'var(--ink-500)'),
            toggle:()=>{ const a=steps.slice(); const cur=a[i].ev||[];
              a[i]={...a[i], ev:on?cur.filter(x=>x!==ev):[...cur,ev]};
              this.setState({ sopForm:{...f,steps:a} }); } }; }),
        subRows:(st.subs||[]).map((sb,j)=>({ t:sb[0]||sb.t||'', d:sb[1]||sb.d||'',
          setT:(e)=>{ const a=steps.slice(); const sa=(a[i].subs||[]).slice(); sa[j]=[e.target.value,(sa[j]&&(sa[j][1]||sa[j].d))||'']; a[i]={...a[i],subs:sa}; this.setState({ sopForm:{...f,steps:a} }); },
          setD:(e)=>{ const a=steps.slice(); const sa=(a[i].subs||[]).slice(); sa[j]=[(sa[j]&&(sa[j][0]||sa[j].t))||'',e.target.value]; a[i]={...a[i],subs:sa}; this.setState({ sopForm:{...f,steps:a} }); },
          remove:()=>{ const a=steps.slice(); const sa=(a[i].subs||[]).slice(); sa.splice(j,1); a[i]={...a[i],subs:sa}; this.setState({ sopForm:{...f,steps:a} }); } })),
        hasSubs:(st.subs||[]).length>0,
        addSub:()=>{ const a=steps.slice(); a[i]={...a[i], subs:[...(a[i].subs||[]),['','']]}; this.setState({ sopForm:{...f,steps:a} }); },
        remove:()=>{ const a=steps.slice(); a.splice(i,1); this.setState({ sopForm:{...f,steps:a.length?a:[{t:'',d:'',ev:[],subs:[]}]} }); },
        moveUp:()=>{ if(i===0) return; const a=steps.slice(); const t=a[i-1]; a[i-1]=a[i]; a[i]=t; this.setState({ sopForm:{...f,steps:a} }); },
        moveDown:()=>{ if(i===steps.length-1) return; const a=steps.slice(); const t=a[i+1]; a[i+1]=a[i]; a[i]=t; this.setState({ sopForm:{...f,steps:a} }); },
        canRemove:steps.length>1 })),
      sopAddStep:()=>this.setState({ sopForm:{...f, steps:[...steps,{t:'',d:'',outcome:'',dur:'',ev:[],subs:[]}]} }),
      sopStepCount:steps.filter(s=>(s.t||'').trim()).length+' step'+(steps.filter(s=>(s.t||'').trim()).length===1?'':'s')+' defined',
      sopDupOptions:[''].concat(all.map(s=>s.id+' — '+s.title)),
      sopDupFrom:(e)=>{ const id=String(e.target.value).split(' — ')[0]; const src=all.find(x=>x.id===id); if(!src) return;
        this.setState({ sopForm:{ ...f, title:src.title+' (copy)', purpose:src.purpose, scope:src.scope,
          division:src.division, category:src.category, priority:src.priority, frequency:src.frequency,
          estTime:src.estTime, trigger:src.trigger, applicability:src.applicability,
          inputs:(src.inputs||[]).join(', '), outputs:(src.outputs||[]).join(', '),
          resources:(src.resources||[]).join(', '), tags:(src.tags||[]).join(', '),
          successCriteria:src.successCriteria, risks:src.risks, escalation:src.escalation,
          approver:src.approver, status:'Draft', section:sec,
          kpis:(src.kpis||[]).map(k=>k.name), rels:(src.sops||[]).length?src.sops.slice():[{rel:'Related SOP',id:''}],
          steps:(src.steps||[]).map(st=>({ t:st.t, d:st.d, outcome:st.outcome, dur:st.dur, ev:(st.ev||[]).slice(), subs:(st.subs||[]).slice(), notes:st.notes })) } });
        this.flash('Duplicated '+src.id+' — edit and save as a new SOP.'); },
      sopSave:()=>{
        if(!(f.title&&f.title.trim())){ this.flash('Give the SOP a title.'); return; }
        if(!(f.purpose&&f.purpose.trim())){ this.flash('State the purpose — what outcome this procedure guarantees.'); return; }
        const real=steps.filter(s=>(s.t||'').trim());
        if(!real.length){ this.flash('Add at least one step — an SOP without steps is not a procedure.'); return; }
        const csv=(v)=>String(v||'').split(',').map(x=>x.trim()).filter(Boolean);
        const rec={ id:nextId, title:f.title.trim(), division:f.division||'Content', category:f.category||'Content production',
          version:'v1.0', status:f.status||'Draft', priority:f.priority||'Medium', estTime:f.estTime||'—',
          frequency:f.frequency||'Per project', owner:this.currentPerson(), approver:f.approver||'Priya Nair',
          updated:this.todayStr(), updatedBy:this.currentPerson(), review:this.fmtDate(f.review)||this.relDate(90), lastReviewed:'',
          lastExecuted:'', execCount:0, avgTime:'—', trend:'no data yet',
          tags:csv(f.tags), trigger:f.trigger||'', applicability:f.applicability||'',
          purpose:f.purpose.trim(), scope:f.scope||'',
          inputs:csv(f.inputs), outputs:csv(f.outputs), resources:csv(f.resources),
          docs:csv(f.docs).map(n=>({ name:n, kind:'Document' })),
          successCriteria:f.successCriteria||'', risks:f.risks||'', escalation:f.escalation||'',
          standards:(f.standards||[]).map(id=>{ const g=this.GOLD_STANDARDS().find(x=>x.id===id); return g?(g.name+' — '+g.note):id; }),
          templates:[], roles:[],
          kpis:(f.kpis||[]).map(n=>({ name:n, owner:'Priya Nair', status:'No data' })),
          sops:(f.rels||[]).filter(r=>r.id),
          steps:real.map(s=>({ t:s.t.trim(), d:s.d||'', outcome:s.outcome||'', dur:s.dur||'',
            ev:s.ev||[], subs:s.subs||[], links:[], files:[], notes:s.notes||'' })),
          versions:[{ v:'v1.0', by:this.currentPerson(), date:this.todayStr(),
            summary:f.changeSummary||'Initial version.', reason:f.reason||'New procedure.',
            published:(f.status==='Published')?this.todayStr():'', review:this.fmtDate(f.review)||this.relDate(90) }],
          audit:[['Created',this.currentPerson(),this.todayStr()]],
          comments:[], ack:[] };
        if(f.status==='Published') rec.audit.push(['Published',this.currentPerson(),this.todayStr()]);
        this.setState({ sopAdded:[rec,...(this.state.sopAdded||[])], sopNew:false, sopForm:{}, sopOpen:rec.id, sopTabD:'overview' });
        this.flash(rec.id+' created as '+rec.status+' — '+rec.steps.length+' step'+(rec.steps.length===1?'':'s')+', approver '+rec.approver+'.');
      } };
  }
  sopView(rk){
    const me=this.currentPerson();
    const canAuthor=['manager','team_lead','admin'].includes(rk);
    const all=this.allSops();
    const F=this.state.sopF||{ division:'All', status:'All', mine:'All', category:'All', priority:'All', frequency:'All', approver:'All', tag:'All' };
    const setF=(k)=>(e)=>this.setState({ sopF:{...F,[k]:e.target.value}, pg:{...(this.state.pg||{}),sop:0} });
    let list=all.filter(s=>
      (F.division==='All'||s.division===F.division) &&
      (F.status==='All'||s.status===F.status) &&
      (F.category==='All'||s.category===F.category) &&
      (F.priority==='All'||s.priority===F.priority) &&
      (F.frequency==='All'||s.frequency===F.frequency) &&
      (F.approver==='All'||s.approver===F.approver) &&
      (F.tag==='All'||(s.tags||[]).includes(F.tag)));
    if(F.mine==='Needs my acknowledgement') list=list.filter(s=>s.status==='Published'&&!(s.ack||[]).includes(me));
    if(F.mine==='Owned by me') list=list.filter(s=>s.owner===me);
    if(F.mine==='Review due or overdue') list=list.filter(s=>{ const r=this.sopReviewState(s); return r.overdue||r.soon; });
    const q=(this.state.sopQuery||'').toLowerCase();
    if(q) list=list.filter(s=>[s.id,s.title,s.purpose,s.category,s.division,(s.tags||[]).join(' '),
      (s.kpis||[]).map(k=>k.name).join(' '), (s.sops||[]).map(x=>x.id).join(' '), (s.resources||[]).join(' ')]
      .join(' ').toLowerCase().indexOf(q)>=0);
    const K=(label,value,sub,color)=>({label,value,sub,color});
    const unack=all.filter(s=>s.status==='Published'&&!(s.ack||[]).includes(me));
    const overdue=all.filter(s=>this.sopReviewState(s).overdue);
    const soon=all.filter(s=>this.sopReviewState(s).soon);
    const expanded=this.state.sopExp||[];
    const pg=this.pgData('sop',list.map(s=>{ const tn=this.sopTone(s.status), pt=this.sopPriTone(s.priority);
      const rv=this.sopReviewState(s); const acked=(s.ack||[]).includes(me);
      const exp=expanded.includes(s.id);
      return { id:s.id, title:s.title, division:s.division, category:s.category, version:s.version, owner:s.owner,
        approver:s.approver, updated:s.updated, frequency:s.frequency, estTime:s.estTime,
        lastExecuted:s.lastExecuted||'never', trigger:s.trigger,
        status:s.status, statusBg:tn.bg, statusColor:tn.c,
        priority:s.priority, priBg:pt.bg, priColor:pt.c,
        stepCount:(s.steps||[]).length+' steps', stdCount:(s.standards||[]).length+' standards',
        kpiCount:(s.kpis||[]).length?((s.kpis||[]).length+' KPI'+((s.kpis||[]).length===1?'':'s')):'No KPI',
        kpiNames:(s.kpis||[]).map(k=>k.name).join(', ')||'—',
        sopCount:(s.sops||[]).length?((s.sops||[]).length+' linked SOP'+((s.sops||[]).length===1?'':'s')):'No linked SOPs',
        sopNames:(s.sops||[]).map(x=>x.rel+' '+x.id).join(' · ')||'—',
        tagList:(s.tags||[]).map(t=>({ label:t })),
        acked, ackLabel:acked?'Acknowledged':'Not acknowledged',
        ackBg:acked?'var(--verify-100)':'var(--warn-100)', ackColor:acked?'var(--verify-600)':'var(--warn-600)',
        reviewLabel:rv.label, reviewColor:rv.color,
        expanded:exp,
        toggle:(e)=>{ if(e)e.stopPropagation(); const cur=this.state.sopExp||[];
          this.setState({ sopExp:cur.includes(s.id)?cur.filter(x=>x!==s.id):[...cur,s.id] }); },
        open:()=>this.setState({ sopOpen:s.id, sopTabD:'overview' }) }; }),8);
    return {
      sopIsList:true,
      sopStats:[K('Published',String(all.filter(s=>s.status==='Published').length),'in force','var(--verify-600)'),
        K('In review / draft',String(all.filter(s=>['Draft','In review'].includes(s.status)).length),'not yet in force','var(--ink-500)'),
        K('Needs my sign-off',String(unack.length),unack.length?'read and acknowledge':'all acknowledged',unack.length?'var(--warn-600)':'var(--verify-600)'),
        K('Reviews overdue',String(overdue.length),'past review date','var(--danger-600)'),
        K('Reviews due soon',String(soon.length),'within 30 days','var(--warn-600)'),
        K('Categories',String([...new Set(all.map(s=>s.category))].length),'covered','var(--beet-700)')],
      sopRows:pg.rows, sopPg:pg, sopEmpty:list.length===0,
      sopCanAuthor:canAuthor,
      sopQuery:this.state.sopQuery||'', sopSetQuery:(e)=>this.setState({ sopQuery:e.target.value }),
      sopSearchHint:'Searches ID, title, tags, purpose, category, linked KPIs, linked SOPs and resources',
      sopFilters:[
        {label:'Category',value:F.category,onChange:setF('category'),options:['All'].concat([...new Set(all.map(s=>s.category))])},
        {label:'Function',value:F.division,onChange:setF('division'),options:['All'].concat([...new Set(all.map(s=>s.division))])},
        {label:'Status',value:F.status,onChange:setF('status'),options:['All','Published','In review','Draft','Retired']},
        {label:'Priority',value:F.priority,onChange:setF('priority'),options:['All'].concat(this.SOP_PRIORITIES())},
        {label:'Frequency',value:F.frequency,onChange:setF('frequency'),options:['All'].concat(this.SOP_FREQ())},
        {label:'Approver',value:F.approver,onChange:setF('approver'),options:['All'].concat([...new Set(all.map(s=>s.approver))])},
        {label:'Tag',value:F.tag,onChange:setF('tag'),options:['All'].concat([...new Set(all.reduce((a,s)=>a.concat(s.tags||[]),[]))])},
        {label:'Show',value:F.mine,onChange:setF('mine'),options:['All','Needs my acknowledgement','Owned by me','Review due or overdue']},
      ],
      sopReset:()=>this.setState({ sopF:{ division:'All', status:'All', mine:'All', category:'All', priority:'All', frequency:'All', approver:'All', tag:'All' }, sopQuery:'' }),
      sopNewBtn:()=>this.setState({ sopNew:true, sopForm:{ division:'Content', status:'Draft', priority:'Medium', frequency:'Per project', category:'Content production' } }),
      ...this.sopFormData(rk), ...this.sopDetailData(rk),
    };
  }
  sopDetailData(rk){
    const id=this.state.sopOpen; if(!id) return { sopDrawerOpen:false };
    const s=this.allSops().find(x=>x.id===id); if(!s) return { sopDrawerOpen:false };
    const me=this.currentPerson();
    const tn=this.sopTone(s.status), pt=this.sopPriTone(s.priority);
    const acked=(s.ack||[]).includes(me);
    const canAuthor=['manager','team_lead','admin'].includes(rk)&&(s.owner===me||rk==='admin');
    const rv=this.sopReviewState(s);
    const patch=(p,msg,auditRow)=>{ const u={...(this.state.sopUpd||{})};
      const cur={...(u[s.id]||{})};
      const nx={...s,...cur,...p};
      if(auditRow) nx.audit=[...(nx.audit||[]),auditRow];
      u[s.id]={...cur,...p, audit:nx.audit};
      this.setState({ sopUpd:u }); if(msg) this.flash(msg); };
    const tab=this.state.sopTabD||'overview';
    const seg=(on)=>'display:flex;align-items:center;gap:6px;padding:7px 13px;border:none;border-radius:9px;font-size:12px;font-weight:700;cursor:pointer;'+(on?'background:#fff;color:var(--beet-700);box-shadow:var(--shadow-sm)':'background:none;color:var(--ink-500)');
    const byId=(x)=>this.allSops().find(y=>y.id===x);
    const relTone=(r)=>({ 'Requires completion of':{bg:'var(--danger-100)',c:'var(--danger-600)',icon:'lock'},
      'Related SOP':{bg:'var(--info-100)',c:'var(--info-600)',icon:'link'},
      'Parent SOP':{bg:'var(--orchid-100)',c:'var(--orchid-700)',icon:'corner-left-up'},
      'Child SOP':{bg:'var(--surface-50)',c:'var(--ink-500)',icon:'corner-right-down'} }[r]||{bg:'var(--surface-50)',c:'var(--ink-500)',icon:'link'});
    const kpiTone=(st)=>({ 'On track':{bg:'var(--verify-100)',c:'var(--verify-600)'},'At risk':{bg:'var(--warn-100)',c:'var(--warn-600)'},
      'Off track':{bg:'var(--danger-100)',c:'var(--danger-600)'},'No data':{bg:'var(--surface-50)',c:'var(--ink-500)'} }[st]||{bg:'var(--surface-50)',c:'var(--ink-500)'});
    const cmt=this.state.sopCmt||'';
    return { sopDrawerOpen:true,
      sopD:{ id:s.id, title:s.title, division:s.division, category:s.category, version:s.version, status:s.status,
        statusBg:tn.bg, statusColor:tn.c, priority:s.priority, priBg:pt.bg, priColor:pt.c,
        owner:s.owner, approver:s.approver, updated:s.updated, updatedBy:s.updatedBy||s.owner,
        review:s.review, reviewLabel:rv.label, reviewColor:rv.color,
        purpose:s.purpose, hasPurpose:!!(s.purpose&&String(s.purpose).trim()),
        ackCount:(s.ack||[]).length+' acknowledged' },
      sopDClose:()=>this.setState({ sopOpen:null }),
      sopDStop:(e)=>e.stopPropagation(),
      sopTabs:[['overview','Overview','info'],['exec','Execution','list-checks'],['rel','Relationships','git-branch'],
        ['gov','Governance','shield-check'],['hist','History','activity'],['cmt','Comments','message-square']]
        .map(x=>({ label:x[1], icon:x[2], style:seg(tab===x[0]), go:()=>this.setState({ sopTabD:x[0] }) })),
      sopTabOverview:tab==='overview', sopTabExec:tab==='exec', sopTabRel:tab==='rel',
      sopTabGov:tab==='gov', sopTabHist:tab==='hist', sopTabCmt:tab==='cmt',
      // overview
      sopOv:[['Category',s.category],['Function',s.division],['Priority',s.priority],['Estimated time',s.estTime],
        ['Frequency',s.frequency],['Trigger',s.trigger||'—'],['Applicability',s.applicability||'—'],
        ['Owner',s.owner],['Approver',s.approver],['Escalation',s.escalation||'—']].map(x=>({k:x[0],v:x[1]||'—'})),
      sopScope:s.scope||'', sopHasScope:!!s.scope,
      sopInputs:(s.inputs||[]).map(x=>({ text:x })), sopHasInputs:(s.inputs||[]).length>0,
      sopOutputs:(s.outputs||[]).map(x=>({ text:x })), sopHasOutputs:(s.outputs||[]).length>0,
      sopResources:(s.resources||[]).map(x=>({ text:x })), sopHasResources:(s.resources||[]).length>0,
      sopTagsD:(s.tags||[]).map(x=>({ label:x })), sopHasTags:(s.tags||[]).length>0,
      sopSuccess:s.successCriteria||'', sopHasSuccess:!!s.successCriteria,
      sopRisks:s.risks||'', sopHasRisks:!!s.risks,
      sopDStandards:(s.standards||[]).map(x=>({ label:x })), sopHasStandards:(s.standards||[]).length>0,
      // execution
      sopDSteps:(s.steps||[]).map((st,i)=>({ n:String(i+1), t:st.t, d:st.d, outcome:st.outcome||'', dur:st.dur||'—',
        notes:st.notes||'', hasNotes:!!st.notes, hasOutcome:!!st.outcome,
        evList:(st.ev||[]).map(e=>({ label:e })), needsEv:(st.ev||[]).length>0,
        subs:(st.subs||[]).map((sb,j)=>({ n:(i+1)+'.'+(j+1), t:(sb[0]||sb.t||''), d:(sb[1]||sb.d||'') })),
        hasSubs:(st.subs||[]).length>0,
        links:(st.links||[]).map(l=>({ label:l.label, url:l.url })), hasLinks:(st.links||[]).length>0 })),
      sopStepTotal:(s.steps||[]).length+' steps · '+((s.steps||[]).filter(x=>(x.ev||[]).length).length)+' require evidence',
      // resources
      sopDocs:(s.docs||[]).map(d=>({ name:d.name, kind:d.kind,
        icon:d.kind==='Video'?'video':(d.kind==='Template'?'layout-template':(d.kind==='Link'?'external-link':'file-text')),
        open:()=>this.flash('Opening '+d.name+' from the Document Repository.') })),
      sopHasDocs:(s.docs||[]).length>0,
      sopDTemplates:(s.templates||[]).map(x=>({ label:x, open:()=>this.setState({ sopOpen:null, route:'templates' }) })),
      sopHasTemplates:(s.templates||[]).length>0,
      sopDRoles:(s.roles||[]).map(x=>({ label:x })), sopHasRoles:(s.roles||[]).length>0,
      // relationships
      sopKpiRowsD:(s.kpis||[]).map(k=>{ const t=kpiTone(k.status);
        return { name:k.name, owner:k.owner, status:k.status, bg:t.bg, color:t.c,
          contributing:(()=>{ const n=this.sopsForKpi(k.name).length; return n+' SOP'+(n===1?' contributes':'s contribute'); })(),
          open:()=>this.setState({ sopOpen:null, route:'okr', okrModTab:'okrs' }) }; }),
      sopHasKpisD:(s.kpis||[]).length>0,
      sopRelRowsD:(s.sops||[]).map(r=>{ const t=relTone(r.rel); const o=byId(r.id);
        return { rel:r.rel, id:r.id, title:o?o.title:'(not found)', status:o?o.status:'—',
          bg:t.bg, color:t.c, icon:t.icon,
          blocking:r.rel==='Requires completion of',
          open:()=>o?this.setState({ sopOpen:o.id, sopTabD:'overview' }):this.flash('That SOP no longer exists.') }; }),
      sopHasRelD:(s.sops||[]).length>0,
      sopUsedBy:this.allSops().filter(x=>(x.sops||[]).some(r=>r.id===s.id))
        .map(x=>({ id:x.id, title:x.title, open:()=>this.setState({ sopOpen:x.id, sopTabD:'overview' }) })),
      sopHasUsedBy:this.allSops().some(x=>(x.sops||[]).some(r=>r.id===s.id)),
      // governance
      sopVersions:(s.versions||[]).map((v,i)=>({ v:v.v, by:v.by, date:v.date, summary:v.summary, reason:v.reason,
        published:v.published||'not published', review:v.review||'—', current:i===0,
        dotBg:i===0?'var(--orchid-500)':'var(--line-300)' })),
      sopHasVersions:(s.versions||[]).length>0,
      sopGov:[['Current version',s.version],['Last updated',s.updated+' by '+(s.updatedBy||s.owner)],
        ['Last reviewed',s.lastReviewed||'never'],['Next review',s.review+((rv.overdue||rv.soon)?(' — '+rv.label):'')],
        ['Approver',s.approver],['Acknowledgements',(s.ack||[]).length+' of team']].map(x=>({k:x[0],v:x[1]})),
      // execution history
      sopHist:[['Last executed',s.lastExecuted||'never'],['Times executed',String(s.execCount||0)],
        ['Average completion',s.avgTime||'—'],['Estimated time',s.estTime||'—'],['Trend',s.trend||'—']].map(x=>({k:x[0],v:x[1]})),
      sopAudit:(s.audit||[]).slice().reverse().map(a=>({ what:a[0], who:a[1], when:a[2],
        icon:{Created:'plus',Edited:'pencil',Published:'upload-cloud','Version updated':'git-branch',Reviewed:'eye',Retired:'archive'}[a[0]]||'dot',
        color:{Created:'var(--ink-500)',Edited:'var(--ink-500)',Published:'var(--verify-600)','Version updated':'var(--orchid-600)',Reviewed:'var(--info-600)',Retired:'var(--ink-400)'}[a[0]]||'var(--ink-500)' })),
      // comments
      sopComments:(s.comments||[]).slice().reverse().map(c=>({ by:c.by, when:c.when, text:c.text,
        step:c.step||'', hasStep:!!c.step, mine:c.by===me,
        bg:c.by===me?'var(--orchid-100)':'var(--surface-50)' })),
      sopHasComments:(s.comments||[]).length>0,
      sopCmt:cmt, sopSetCmt:(e)=>this.setState({ sopCmt:e.target.value }),
      sopCmtStep:this.state.sopCmtStep||'', sopSetCmtStep:(e)=>this.setState({ sopCmtStep:e.target.value }),
      sopStepOptions:[''].concat((s.steps||[]).map(x=>x.t)),
      sopAddComment:()=>{ const v=(this.state.sopCmt||'').trim(); if(!v){ this.flash('Type a comment first.'); return; }
        patch({ comments:[...(s.comments||[]),{ by:me, when:this.todayStr(), step:this.state.sopCmtStep||'', text:v }] },
          'Comment added'+(this.state.sopCmtStep?(' on “'+this.state.sopCmtStep+'”.'):'.'));
        this.setState({ sopCmt:'', sopCmtStep:'' }); },
      // actions
      sopAckedByMe:acked, sopNeedsAck:s.status==='Published'&&!acked,
      sopAck:()=>patch({ ack:[...(s.ack||[]), me] }, 'You acknowledged '+s.id+' '+s.version+'.'),
      sopAckList:(s.ack||[]).map(n=>({ name:n, initials:n.split(' ').map(x=>x[0]).join('').slice(0,2) })),
      sopCanAuthorD:canAuthor,
      sopPublish:()=>patch({ status:'Published', updated:this.todayStr(), updatedBy:me, ack:[] },
        s.id+' published as '+s.version+' — acknowledgements reset, everyone must read it again.',
        ['Published',me,this.todayStr()]),
      sopPublishLabel:s.status==='Published'?'Re-publish current version':'Publish',
      sopBump:()=>{ const p=String(s.version||'v1.0').replace('v','').split('.');
        const nv='v'+p[0]+'.'+((parseInt(p[1],10)||0)+1);
        const entry={ v:nv, by:me, date:this.todayStr(),
          summary:'Revision — change summary pending.', reason:'Recorded on version bump.',
          published:s.status==='Published'?this.todayStr():'', review:s.review };
        patch({ version:nv, updated:this.todayStr(), updatedBy:me, ack:[],
          versions:[entry].concat(s.versions||[]) },
          s.id+' → '+nv+' · previous versions kept in history, acknowledgements reset.',
          ['Version updated',me,this.todayStr()]); },
      sopMarkReviewed:()=>patch({ lastReviewed:this.todayStr(), review:this.relDate(90) },
        s.id+' marked reviewed — next review in 90 days.', ['Reviewed',me,this.todayStr()]),
      sopRetire:()=>patch({ status:s.status==='Retired'?'Published':'Retired' },
        s.status==='Retired'?(s.id+' reinstated.'):(s.id+' retired — kept for audit, no longer in force.'),
        [s.status==='Retired'?'Published':'Retired',me,this.todayStr()]),
      sopRetireLabel:s.status==='Retired'?'Reinstate':'Retire',
      sopDuplicate:()=>{ this.setState({ sopOpen:null, sopNew:true,
        sopForm:{ title:s.title+' (copy)', purpose:s.purpose, scope:s.scope, division:s.division, category:s.category,
          priority:s.priority, frequency:s.frequency, estTime:s.estTime, trigger:s.trigger, applicability:s.applicability,
          inputs:(s.inputs||[]).join(', '), outputs:(s.outputs||[]).join(', '), resources:(s.resources||[]).join(', '),
          tags:(s.tags||[]).join(', '), successCriteria:s.successCriteria, risks:s.risks, escalation:s.escalation,
          approver:s.approver, status:'Draft', section:'basics',
          kpis:(s.kpis||[]).map(k=>k.name), rels:(s.sops||[]).length?s.sops.slice():[{rel:'Related SOP',id:''}],
          steps:(s.steps||[]).map(st=>({ t:st.t, d:st.d, outcome:st.outcome, dur:st.dur, ev:(st.ev||[]).slice(), subs:(st.subs||[]).slice(), notes:st.notes })) } });
        this.flash('Duplicated '+s.id+' — saved as a new draft when you submit.'); },
      sopSaveAsTemplate:()=>this.flash('“'+s.title+'” saved as a reusable SOP template — available in the New SOP duplicate list.'),
    };
  }

  // ---- Help & Support — tickets for software, technical, training and access issues ----
  TICKET_CATS(){ return [
    { key:'software', label:'Software / platform issue', icon:'monitor-cog', queue:'Platform Admin', owner:'Karan Shah', sla:8,
      hint:'Login, permissions, module errors, data not saving.' },
    { key:'technical', label:'Technical query', icon:'wrench', queue:'Function Lead', owner:'Aditi Rao', sla:24,
      hint:'How to do the work — SEO, code, design, analytics questions.' },
    { key:'training', label:'Training request', icon:'graduation-cap', queue:'Manager / L&D', owner:'Priya Nair', sla:72,
      hint:'Need a walkthrough, upskilling or refresher session.' },
    { key:'access', label:'Access / tool request', icon:'key-round', queue:'Platform Admin', owner:'Karan Shah', sla:12,
      hint:'New tool licence, repository access, role change.' },
    { key:'data', label:'Data correction', icon:'database-backup', queue:'Platform Admin', owner:'Karan Shah', sla:24,
      hint:'Wrong KPI value, duplicate record, incorrect master entry.' },
    { key:'process', label:'Process / clarification', icon:'help-circle', queue:'Function Lead', owner:'Aditi Rao', sla:24,
      hint:'Which workflow applies, who approves, what the standard is.' },
  ]; }
  ticketCat(key){ return this.TICKET_CATS().find(c=>c.key===key)||this.TICKET_CATS()[0]; }
  TICKET_STATES(){ return ['Open','Triaged','Assigned','In Progress','Waiting on requester','Resolved','Closed']; }
  ticketTone(s){ return { Open:{bg:'var(--warn-100)',c:'var(--warn-600)'}, Triaged:{bg:'var(--info-100)',c:'var(--info-600)'},
    Assigned:{bg:'var(--info-100)',c:'var(--info-600)'}, 'In Progress':{bg:'var(--orchid-100)',c:'var(--orchid-700)'},
    'Waiting on requester':{bg:'var(--surface-50)',c:'var(--ink-500)'}, Resolved:{bg:'var(--verify-100)',c:'var(--verify-600)'},
    Closed:{bg:'#EAE4E8',c:'var(--beet-700)'} }[s]||{bg:'var(--surface-50)',c:'var(--ink-500)'}; }
  TICKET_SEED(){ const d=(n)=>this.relDate(-n); return [
    { id:'TKT-1041', cat:'software', subject:'Cannot upload evidence on TSK-2045', desc:'File picker closes without attaching. Tried PDF and PNG under 2 MB.',
      by:'Neha Verma', role:'Junior Executive', created:d(1), createdAt:Date.now()-26*3600000, priority:'High', status:'Assigned', assignee:'Karan Shah', task:'TSK-2045',
      trainingNeeded:false, files:['upload-error.png'],
      thread:[['Neha Verma','File picker closes without attaching.',d(1)],['Karan Shah','Reproduced on Safari — patch going out today.',d(0)]] },
    { id:'TKT-1042', cat:'technical', subject:'Which schema for a service page with FAQs?', desc:'Service + FAQPage together, or FAQ only?',
      by:'Sameer Iyer', role:'Senior Executive', created:d(2), priority:'Medium', status:'Resolved', assignee:'Aditi Rao', task:'TSK-2052',
      trainingNeeded:false, files:[],
      thread:[['Sameer Iyer','Service + FAQPage together, or FAQ only?',d(2)],['Aditi Rao','Nest FAQPage inside Service. Gold standard doc updated.',d(1)]] },
    { id:'TKT-1043', cat:'training', subject:'Refresher on the compliance checklist', desc:'Unsure what evidence QC expects for originality.',
      by:'Neha Verma', role:'Junior Executive', created:d(3), priority:'Low', status:'Triaged', assignee:'Priya Nair', task:'',
      trainingNeeded:true, files:[],
      thread:[['Neha Verma','Unsure what evidence QC expects for originality.',d(3)]] },
    { id:'TKT-1044', cat:'access', subject:'Semrush seat needed', desc:'Cannot pull competitor gap data without a seat.',
      by:'Arjun Pillai', role:'Senior Executive', created:d(0), createdAt:Date.now()-3*3600000, priority:'Medium', status:'Open', assignee:'', task:'',
      trainingNeeded:false, files:[], thread:[['Arjun Pillai','Cannot pull competitor gap data without a seat.',d(0)]] },
    { id:'TKT-1045', cat:'data', subject:'KPI actual double-counted for June', desc:'Backlinks show 260 against a 200 target — two logs on the same day.',
      by:'Aditi Rao', role:'Team Lead', created:d(5), priority:'Critical', status:'Closed', assignee:'Karan Shah', task:'',
      trainingNeeded:false, files:['kpi-log-export.xlsx'], rating:5,
      thread:[['Aditi Rao','Two logs on the same day.',d(5)],['Karan Shah','Duplicate removed, validation added.',d(4)]] },
  ]; }
  allTickets(){ const upd=this.state.tktUpd||{};
    return (this.state.tktAdded||[]).concat(this.TICKET_SEED()).map(t=>upd[t.id]?{...t,...upd[t.id]}:t); }
  tktPatch(id,patch,note){
    const upd={...(this.state.tktUpd||{})};
    const cur=this.allTickets().find(t=>t.id===id)||{};
    const thread=note?[...(cur.thread||[]),[this.currentPerson(),note,this.todayStr()]]:(cur.thread||[]);
    upd[id]={ ...(upd[id]||{}), ...patch, thread };
    this.setState({ tktUpd:upd });
  }
  ticketAge(t){
    if(t.createdAt) return Math.max(0, Math.round((Date.now()-t.createdAt)/3600000));
    const iso=this.isoDate(t.created); if(!iso) return 0;
    // seeded rows carry no timestamp — assume a 10:00 raise time rather than midnight
    return Math.max(0, Math.round((Date.now()-new Date(iso+'T10:00:00').getTime())/3600000)); }
  ticketFormData(){
    if(!this.state.tktNew) return { tktFormOpen:false };
    const f=this.state.tktForm||{};
    const set=(k)=>(e)=>this.setState({ tktForm:{...f,[k]:e.target.value} });
    const c=this.ticketCat(f.cat);
    const me=this.currentPerson();
    return { tktFormOpen:true, tf:f,
      tktClose:()=>this.setState({ tktNew:false, tktForm:{} }),
      tktStop:(e)=>e.stopPropagation(),
      tktCatOptions:this.TICKET_CATS().map(x=>({ v:x.key, label:x.label })),
      tktSetCat:set('cat'), tktSetSubject:set('subject'), tktSetDesc:set('desc'),
      tktSetPriority:set('priority'), tktSetTask:set('task'),
      tktPriorityOptions:['Critical','High','Medium','Low'],
      tktTaskOptions:['— None —'].concat(this.allTasks().filter(t=>t.assignee===me).map(t=>t.id+' — '+t.name)),
      tktRouteNote:'Routes to '+c.queue+' ('+c.owner+') · target response '+c.sla+' h',
      tktCatHint:c.hint,
      tktTraining:f.training?'Yes':'No',
      tktToggleTraining:()=>this.setState({ tktForm:{...f, training:!f.training} }),
      tktFiles:(f.files||[]).map((n,i)=>({ name:n,
        remove:()=>{ const a=(f.files||[]).slice(); a.splice(i,1); this.setState({ tktForm:{...f,files:a} }); } })),
      tktHasFiles:(f.files||[]).length>0,
      tktAttach:()=>{ const n='attachment-'+(Date.now()%10000)+'.png'; this.setState({ tktForm:{...f, files:[...(f.files||[]),n]} }); },
      tktSave:()=>{
        if(!(f.subject&&f.subject.trim())){ this.flash('Describe the issue in one line.'); return; }
        if(!(f.desc&&f.desc.trim())){ this.flash('Add details so it can be actioned without a follow-up.'); return; }
        const n=this.allTickets().length+1;
        const rec={ id:'TKT-'+String(1040+n), cat:f.cat||'software', subject:f.subject.trim(), desc:f.desc.trim(),
          by:me, role:this.ROLES[this.state.roleKey].label, created:this.todayStr(), createdAt:Date.now(),
          priority:f.priority||'Medium', status:'Open', assignee:'', task:(f.task&&f.task!=='— None —')?String(f.task).split(' — ')[0]:'',
          trainingNeeded:!!f.training, files:f.files||[],
          thread:[[me,f.desc.trim(),this.todayStr()]] };
        this.setState({ tktAdded:[rec,...(this.state.tktAdded||[])], tktNew:false, tktForm:{}, tktOpen:rec.id });
        this.flash(rec.id+' raised — routed to '+c.queue+' ('+c.owner+'), target response '+c.sla+' h.');
      } };
  }
  supportView(rk){
    const me=this.currentPerson();
    const isAdmin=rk==='admin';
    const isTriage=['admin','manager','team_lead'].includes(rk);
    let all=this.allTickets();
    const mine=all.filter(t=>t.by===me||t.assignee===me);
    const scope=isTriage?(this.state.tktScope||'All tickets'):'My tickets';
    let list=(scope==='My tickets')?mine:all;
    let F=this.state.tktF||{ cat:'All', status:'All', priority:'All', assignee:'All' };
    if(!isTriage && F.assignee!=='All') F={...F, assignee:'All'}; // control is hidden for these roles — never filter silently
    const setF=(k)=>(e)=>this.setState({ tktF:{...F,[k]:e.target.value}, pg:{...(this.state.pg||{}),tkt:0} });
    if(F.cat!=='All') list=list.filter(t=>this.ticketCat(t.cat).label===F.cat);
    if(F.status!=='All') list=list.filter(t=>t.status===F.status);
    if(F.priority!=='All') list=list.filter(t=>t.priority===F.priority);
    if(F.assignee!=='All') list=list.filter(t=>(t.assignee||'Unassigned')===F.assignee);
    const order={Open:0,Triaged:1,Assigned:2,'In Progress':3,'Waiting on requester':4,Resolved:5,Closed:6};
    list=list.slice().sort((a,b)=>(order[a.status]-order[b.status])||(this.ticketAge(b)-this.ticketAge(a)));
    const breached=(t)=>!['Resolved','Closed'].includes(t.status)&&this.ticketAge(t)>this.ticketCat(t.cat).sla;
    const K=(label,value,sub,color)=>({label,value,sub,color});
    const open=all.filter(t=>!['Resolved','Closed'].includes(t.status));
    const pg=this.pgData('tkt',list.map(t=>{ const c=this.ticketCat(t.cat), tn=this.ticketTone(t.status);
      const age=this.ticketAge(t), bad=breached(t);
      return { id:t.id, subject:t.subject, cat:c.label, catIcon:c.icon, queue:c.queue,
        by:t.by, byRole:t.role, created:t.created, priority:t.priority,
        priColor:{Critical:'var(--danger-600)',High:'var(--warn-600)',Medium:'var(--info-600)',Low:'var(--ink-500)'}[t.priority]||'var(--ink-500)',
        status:t.status, statusBg:tn.bg, statusColor:tn.c,
        assignee:t.assignee||'Unassigned', unassigned:!t.assignee,
        task:t.task||'', hasTask:!!t.task,
        training:!!t.trainingNeeded,
        ageLabel:age<24?(age+' h old'):(Math.round(age/24)+' d old'),
        sla:bad?('SLA breached · target '+c.sla+' h'):('within SLA · '+c.sla+' h'),
        slaColor:bad?'var(--danger-600)':'var(--verify-600)',
        replies:String((t.thread||[]).length),
        open:()=>this.setState({ tktOpen:t.id }) }; }),8);
    return {
      supIsList:true,
      supStats:[K('Open tickets',String(open.length),'awaiting resolution','var(--beet-700)'),
        K('Unassigned',String(all.filter(t=>!t.assignee&&!['Resolved','Closed'].includes(t.status)).length),'need triage','var(--warn-600)'),
        K('SLA breached',String(all.filter(t=>breached(t)).length),'past target response','var(--danger-600)'),
        K('Training requests',String(all.filter(t=>t.trainingNeeded||t.cat==='training').length),'flagged for L&D','var(--orchid-600)'),
        K('Resolved',String(all.filter(t=>['Resolved','Closed'].includes(t.status)).length),'closed out','var(--verify-600)'),
        K('My tickets',String(mine.length),'raised by or assigned to me','var(--info-600)')],
      supRows:pg.rows, supPg:pg, supEmpty:list.length===0,
      supIsTriage:isTriage, supIsAdmin:isAdmin,
      supScopeBtns:isTriage?['All tickets','My tickets'].map(s=>({ label:s, active:scope===s,
        style:'padding:7px 13px;border-radius:999px;font-size:12px;font-weight:700;cursor:pointer;border:1px solid '+(scope===s?'var(--beet-700)':'var(--line-300)')+';background:'+(scope===s?'var(--beet-700)':'#fff')+';color:'+(scope===s?'#fff':'var(--ink-700)'),
        set:()=>this.setState({ tktScope:s }) })):[],
      supFilters:[
        {label:'Category',value:F.cat,onChange:setF('cat'),options:['All'].concat(this.TICKET_CATS().map(c=>c.label))},
        {label:'Status',value:F.status,onChange:setF('status'),options:['All'].concat(this.TICKET_STATES())},
        {label:'Priority',value:F.priority,onChange:setF('priority'),options:['All','Critical','High','Medium','Low']},
        ...(isTriage?[{label:'Assignee',value:F.assignee,onChange:setF('assignee'),options:['All','Unassigned'].concat([...new Set(all.map(t=>t.assignee).filter(Boolean))])}]:[]),
      ],
      supReset:()=>this.setState({ tktF:{ cat:'All', status:'All', priority:'All', assignee:'All' } }),
      supNew:()=>this.setState({ tktNew:true, tktForm:{ cat:'software', priority:'Medium' } }),
      supCatCards:this.TICKET_CATS().map(c=>({ label:c.label, icon:c.icon, queue:c.queue, hint:c.hint,
        sla:'Target response '+c.sla+' h',
        pick:()=>this.setState({ tktNew:true, tktForm:{ cat:c.key, priority:'Medium' } }) })),
      ...this.ticketFormData(), ...this.ticketDetailData(rk),
    };
  }
  ticketDetailData(rk){
    const id=this.state.tktOpen; if(!id) return { tktDrawerOpen:false };
    const t=this.allTickets().find(x=>x.id===id); if(!t) return { tktDrawerOpen:false };
    const c=this.ticketCat(t.cat), tn=this.ticketTone(t.status);
    const me=this.currentPerson();
    const isTriage=['admin','manager','team_lead'].includes(rk);
    const isOwner=t.assignee===me;
    const isRequester=t.by===me;
    const age=this.ticketAge(t);
    const bad=!['Resolved','Closed'].includes(t.status)&&age>c.sla;
    const people=['Karan Shah','Aditi Rao','Priya Nair','Rohit Sharma','Arjun Pillai','Farhan Ali','Sameer Iyer'];
    return { tktDrawerOpen:true,
      tktD:{ id:t.id, subject:t.subject, desc:t.desc, cat:c.label, catIcon:c.icon, queue:c.queue,
        status:t.status, statusBg:tn.bg, statusColor:tn.c, priority:t.priority,
        by:t.by, byRole:t.role, created:t.created, assignee:t.assignee||'Unassigned',
        ageLabel:age<24?(age+' h old'):(Math.round(age/24)+' d old'),
        sla:bad?('SLA breached — target '+c.sla+' h'):('Within SLA — target '+c.sla+' h'),
        slaColor:bad?'var(--danger-600)':'var(--verify-600)',
        task:t.task||'', hasTask:!!t.task, training:!!t.trainingNeeded },
      tktDClose:()=>this.setState({ tktOpen:null }),
      tktDStop:(e)=>e.stopPropagation(),
      tktThread:(t.thread||[]).map(x=>({ who:x[0], text:x[1], when:x[2],
        mine:x[0]===me, bg:x[0]===me?'var(--orchid-100)':'var(--surface-50)' })),
      tktFilesD:(t.files||[]).map(n=>({ name:n })),
      tktHasFilesD:(t.files||[]).length>0,
      tktOpenTask:()=>this.setState({ tktOpen:null, route:'tasks', tkTab:'list', tkOpen:t.task }),
      tktReply:this.state.tktReply||'',
      tktSetReply:(e)=>this.setState({ tktReply:e.target.value }),
      tktSend:()=>{ const v=(this.state.tktReply||'').trim(); if(!v){ this.flash('Type a reply first.'); return; }
        this.tktPatch(t.id,{},v); this.setState({ tktReply:'' }); },
      tktCanTriage:isTriage,
      tktCanWork:isTriage||isOwner,
      tktCanClose:isRequester&&t.status==='Resolved',
      tktAssignOptions:['Unassigned'].concat(people),
      tktAssignVal:t.assignee||'Unassigned',
      tktSetAssign:(e)=>{ const v=e.target.value==='Unassigned'?'':e.target.value;
        this.tktPatch(t.id,{ assignee:v, status:v?'Assigned':'Open' }, v?('Assigned to '+v):'Unassigned');
        this.flash(v?(t.id+' assigned to '+v+'.'):(t.id+' returned to the queue.')); },
      tktStatusOptions:this.TICKET_STATES(),
      tktSetStatus:(e)=>{ const v=e.target.value; this.tktPatch(t.id,{ status:v },'Status → '+v); this.flash(t.id+' → '+v+'.'); },
      tktPriorityVal:t.priority,
      tktSetPriorityD:(e)=>{ const v=e.target.value; this.tktPatch(t.id,{ priority:v },'Priority → '+v); },
      tktPriorityOptionsD:['Critical','High','Medium','Low'],
      tktToggleTrainingD:()=>{ this.tktPatch(t.id,{ trainingNeeded:!t.trainingNeeded }, t.trainingNeeded?'Training flag removed':'Flagged as training need');
        this.flash(t.trainingNeeded?'Training flag removed.':'Flagged for training — visible to Manager / L&D.'); },
      tktTrainingLabel:t.trainingNeeded?'Remove training flag':'Flag as training need',
      tktResolve:()=>{ this.tktPatch(t.id,{ status:'Resolved' },'Resolved'); this.flash(t.id+' resolved — requester can confirm or reopen.'); },
      tktReopen:()=>{ this.tktPatch(t.id,{ status:'Open', assignee:t.assignee },'Reopened by requester'); this.flash(t.id+' reopened.'); },
      tktConfirm:()=>{ this.tktPatch(t.id,{ status:'Closed' },'Confirmed & closed by requester'); this.flash(t.id+' closed. Thanks for confirming.'); },
      // convert a ticket into real work
      tktToTask:()=>{
        const base=this.allTasks().length;
        const nid='TSK-'+(3400+base);
        const div={software:'Web',technical:'SEO',training:'Content',access:'Web',data:'Analytics',process:'Content'}[t.cat]||'Content';
        const task={ id:nid, name:'['+t.id+'] '+t.subject, desc:t.desc, template:'Custom task', project:'',
          campaign:'—', start:this.todayStr(), end:this.relDate(2), priority:t.priority,
          assignee:t.assignee||'Karan Shah', kpiId:'', kpi:'Not linked', units:1, unit:'items',
          estH:4, actH:0, recurrence:'None', reviewer:'Farhan Ali', effortPlan:'', effortType:'',
          depMode:'Parallel', dep:'—', division:div, sourceTicket:t.id,
          checklist:[{t:'Investigate',done:false},{t:'Fix / deliver',done:false},{t:'Confirm with requester',done:false}],
          evidence:[], status:'Assigned',
          activity:[[me,'Created from support ticket '+t.id,this.todayStr()]] };
        this.setState({ tkAdded:[...(this.state.tkAdded||[]),task] });
        this.tktPatch(t.id,{ status:'In Progress', task:nid },'Converted to task '+nid);
        this.flash(nid+' created from '+t.id+' — assigned to '+task.assignee+', linked back to this ticket.');
      },
    };
  }

  tkDetailData(){
    const id=this.state.tkOpen; if(!id) return { tkDrawerOpen:false };
    const t=this.allTasks().find(x=>x.id===id); if(!t) return { tkDrawerOpen:false };
    const rk=this.state.roleKey, person=this.currentPerson();
    const isAssignee=t.assignee===person;
    const isApprover=['manager','team_lead','admin'].includes(rk);
    const canReassign=['manager','team_lead','admin','ceo'].includes(rk);
    const tn=this.tkTone(t.status);
    const meta=[['Project',t.project],['Campaign',t.campaign],['Start date',t.start],['End date',t.end],['Priority',t.priority],['Assignee',t.assignee],['Reviewer / QC',t.reviewer],['Effort (est / actual)',t.estH+'h / '+t.actH+'h'],['Recurrence',t.recurrence],['Template',t.template],['Dependency',(t.dep||'—')+(t.dep&&t.dep!=='—'?(' · '+(t.depMode||'Parallel')):'')],['Effort plan',t.effortPlan||'—'],['Task ID',t.id]];
    const chain=this.tkChain(t);
    const stage=(x,role)=>x?{ id:x.id, name:x.name, division:x.division||'—', status:x.status, statusBg:this.tkTone(x.status).bg, statusColor:this.tkTone(x.status).c, role, open:()=>this.setState({ tkOpen:x.id }) }:null;
    const tkStages=[stage(chain.prev,'Previous stage'), stage({...t, division:t.division||'—'},'This task'), ...chain.next.map(n=>stage(n,'Next stage'))].filter(Boolean).map(s=>({ ...s, isThis:s.id===t.id }));
    const checklist=(t.checklist||[]).map((c,i)=>({ t:c.t, done:c.done,
      boxBg:c.done?'var(--verify-500)':'#fff', boxBorder:c.done?'var(--verify-500)':'var(--line-300)', op:c.done?'1':'0',
      toggle:()=>{ if(!isAssignee){ this.flash('Only the assignee updates the checklist.'); return; } const arr=(t.checklist||[]).map((x,j)=>j===i?{...x,done:!x.done}:x); this.tkPatch(t.id,{checklist:arr},(c.done?'Unchecked':'Completed')+' checklist item — '+c.t); } }));
    const evidence=(t.evidence||[]).map(f=>({name:f}));
    const actions=[];
    const btn=(label,icon,bg,fg,go,border)=>actions.push({label,icon,go,style:'display:flex;align-items:center;gap:7px;border-radius:11px;padding:10px 16px;font-size:13px;font-weight:700;cursor:pointer;background:'+bg+';color:'+fg+';border:'+(border||'none')});
    if(isAssignee){
      const pend=this.tkPendingOpen(person).filter(x=>x.id!==t.id);
      const df=this.dayDiff(t);
      const blockedBy=this.tkBlockedBy(t);
      if(blockedBy && ['Assigned','In Progress'].includes(t.status)){
        btn('Waiting — '+blockedBy.id+' must be approved first','hourglass','var(--surface-50)','var(--ink-400)',()=>this.flash('Sequential dependency: this stage unlocks when '+blockedBy.id+' ('+blockedBy.name+') is QC-approved.'),'1px solid var(--line-300)');
      }
      else if(t.status==='Assigned' && pend.length && df!==null && df>=0){
        btn('Locked — clear '+pend.length+' pending task'+(pend.length>1?'s':'')+' first','lock','var(--surface-50)','var(--ink-400)',()=>this.flash('Complete your pending (overdue) tasks before starting today’s.'),'1px solid var(--line-300)');
      }
      else if(t.status==='Assigned') btn('Start task','play','var(--verify-500)','#fff',()=>this.tkPatch(t.id,{status:'In Progress'},'Started task'));
      if(t.status==='In Progress'||t.status==='Rework') btn(t.status==='Rework'?'Resubmit for QC':'Submit for QC','send','#7A1C46','#fff',()=>{ if(!(this.tkOv(t).evidence||[]).length){ this.flash('Attach evidence before submitting for QC.'); return; } this.tkPatch(t.id,{status:'Submitted'},'Submitted for QC with evidence'); this.flash('Submitted — awaiting QC approval.'); });
    }
    // QC panel (approvers, submitted tasks) — feedback + reference attachments
    const qcPanel = isApprover && t.status==='Submitted';
    const ref=(this.state.qcRef||{})[t.id]||{files:[],url:''};
    const setRef=(patch)=>this.setState({ qcRef:{...(this.state.qcRef||{}),[t.id]:{...ref,...patch}} });
    const qcFinish=(status,label)=>{
      const note=((this.state.qcFb||{})[t.id]||'').trim();
      if(status==='Rework' && !note){ this.flash('Enter QC comments before requesting rework.'); return; }
      const refs=(ref.files||[]).slice(); if(ref.url&&ref.url.trim()) refs.push(ref.url.trim());
      const fbText=(status==='Approved'?'QC approved':'Rework')+(note?' — '+note:'')+(refs.length?(' · Ref: '+refs.join(', ')):'');
      const me=this.ROLES[rk];
      const cur=this.tkOv(t).comments||[];
      const comment={ who:me.person, role:(rk==='qc'?'QC Reviewer':me.label+' (QC)'), text:(status==='Approved'?'Approved. ':'Rework requested. ')+(note||''), when:this.todayStr(), files:refs };
      this.tkPatch(t.id,{ status, qcFeedback:fbText, comments:[...cur,comment] }, label+(note?' — '+note:''));
      this.setState({ qcFb:{...(this.state.qcFb||{}),[t.id]:''}, qcRef:{...(this.state.qcRef||{}),[t.id]:{files:[],url:''}} });
      const unlocked=status==='Approved'?this.tkChain(t).next.filter(n=>(n.depMode||'Parallel')==='Sequential'):[];
      this.flash(status==='Approved'?('Approved · +'+t.units+' '+t.unit+' → '+t.kpi+'.'+(unlocked.length?(' Next stage unlocked: '+unlocked.map(n=>n.id).join(', ')+'.'):'')):'Rework requested — feedback & references sent to '+t.assignee+'.');
    };
    const canAttach=isAssignee && t.status!=='Approved';
    return {
      tkDrawerOpen:true, tkD:{ id:t.id, name:t.name, desc:t.desc, status:t.status, statusBg:tn.bg, statusColor:tn.c, kpi:t.kpi, kpiId:t.kpiId, contribution:'+'+t.units+' '+t.unit },
      tkHasFb:!!t.qcFeedback, tkFb:t.qcFeedback||'',
      ...(()=>{
        const canComment = isAssignee || ['manager','team_lead','admin','qc'].includes(rk);
        const comments=(this.tkOv(t).comments||[]).map(c=>({ who:c.who, role:c.role, text:c.text, when:c.when,
          initials:c.who.split(' ').map(x=>x[0]).join(''),
          isQC:/QC|Manager|Lead|Admin/i.test(c.role),
          bubbleBg:/QC|Manager|Lead|Admin/i.test(c.role)?'var(--orchid-100)':'var(--surface-50)',
          bubbleBorder:/QC|Manager|Lead|Admin/i.test(c.role)?'var(--orchid-200)':'var(--line-200)',
          files:(c.files||[]).map(f=>({name:f})), hasFiles:(c.files||[]).length>0 }));
        const cfl=(this.state.tkCommentFiles||[]).map((f,i)=>({ name:f, remove:()=>{ const a=(this.state.tkCommentFiles||[]).slice(); a.splice(i,1); this.setState({tkCommentFiles:a}); } }));
        return {
          tkComments:comments, tkHasComments:comments.length>0, tkCanComment:canComment,
          tkCommentVal:this.state.tkComment||'', tkOnComment:(e)=>this.setState({ tkComment:e.target.value }),
          tkCommentFiles:cfl, tkHasCommentFiles:cfl.length>0,
          tkAddCommentFile:()=>this.setState({ tkCommentFiles:[...(this.state.tkCommentFiles||[]),'attachment-'+((this.state.tkCommentFiles||[]).length+1)+'.pdf'] }),
          tkPostComment:()=>{ const txt=(this.state.tkComment||'').trim(); const fls=this.state.tkCommentFiles||[];
            if(!txt && !fls.length){ this.flash('Write a comment or attach a document.'); return; }
            const me=this.ROLES[rk];
            const roleLabel = rk==='qc'?'QC Reviewer':(isAssignee?me.tag:me.label+' (QC)');
            const cur=this.tkOv(t).comments||[];
            this.tkPatch(t.id,{ comments:[...cur,{ who:me.person, role:roleLabel, text:txt, when:this.todayStr(), files:fls }] }, 'Commented'+(fls.length?' with '+fls.length+' attachment'+(fls.length>1?'s':''):''));
            this.setState({ tkComment:'', tkCommentFiles:[] });
            this.flash('Comment posted — visible to assignee and QC.'); },
        };
      })(),
      tkFbBg: t.status==='Rework'?'var(--danger-100)':'var(--verify-100)', tkFbBorder: t.status==='Rework'?'#F1C9CF':'#BFE3D0', tkFbColor: t.status==='Rework'?'var(--danger-600)':'var(--verify-600)',
      tkMeta:meta.map(m=>m[0]==='Assignee'&&canReassign?{
        k:m[0], v:m[1], isSelect:true, options:(this.state.users||[]).map(u=>u.name),
        onChange:e=>{ const na=e.target.value; this.tkPatch(t.id,{assignee:na},'Reassigned to '+na); this.flash('Task '+t.id+' reassigned to '+na+'.'); },
      }:{k:m[0],v:m[1]}), tkChecklist:checklist, tkEvidence:evidence, tkHasEvidence:evidence.length>0,
      tkActions:actions, tkHasActions:actions.length>0, tkCanAttach:canAttach,
      tkAttach:()=>{ const ev=(this.tkOv(t).evidence||[]); this.tkPatch(t.id,{evidence:[...ev,'evidence-'+(ev.length+1)+'.png']},'Attached evidence'); },
      tkActivity:(this.tkOv(t).activity||[]).slice().reverse().map(a=>({who:a[0],what:a[1],when:a[2]})),
      tkQcPanel:qcPanel,
      tkQcFbVal:(this.state.qcFb||{})[t.id]||'', tkQcOnFb:(e)=>this.setState({ qcFb:{...(this.state.qcFb||{}),[t.id]:e.target.value} }),
      tkQcUrl:ref.url||'', tkQcOnUrl:(e)=>setRef({url:e.target.value}),
      tkQcFiles:(ref.files||[]).map((f,i2)=>({ name:f, remove:()=>{ const a=(ref.files||[]).slice(); a.splice(i2,1); setRef({files:a}); } })),
      tkQcHasFiles:(ref.files||[]).length>0,
      tkQcAddFile:()=>setRef({ files:[...(ref.files||[]),'reference-'+((ref.files||[]).length+1)+'.png'] }),
      tkStages, tkHasChain:tkStages.length>1,
      tkQcApprove:()=>qcFinish('Approved','QC approved — counted toward KPI'),
      tkQcRework:()=>qcFinish('Rework','Rework requested'),
      tkClose:()=>this.setState({ tkOpen:null }),
      tkKpiNote: t.status==='Approved' ? 'Counted toward KPI on approval.' : 'Counts toward the KPI once QC approves.',
      ...this.complianceData(t, rk),
    };
  }

  tkFormData(){
    const f=this.state.tkForm||{};
    const set=(k)=>(e)=>{
      const v=e.target.value; const nf={...this.state.tkForm,[k]:v};
      if(k==='template'){ const tpl=this.TASK_TEMPLATES().find(x=>x.name===v); if(tpl&&tpl.kpiId){ nf.kpiId=tpl.kpiId; } }
      this.setState({ tkForm:nf });
    };
    const kpiPool=this.epKpiPool(); const _unused=[].concat((this.MY_KPIS().junior||[]).map(k=>({...k,who:'Junior'})),(this.MY_KPIS().senior||[]).map(k=>({...k,who:'Senior'})),(this.MY_KPIS().team_lead||[]).map(k=>({...k,who:'Team Lead'})));
    const nextCode='TSK-'+(2060+(this.state.tkAdded||[]).length+1);
    const tpl=this.TASK_TEMPLATES().find(x=>x.name===(f.template||'Custom task'));
    return {
      tkNew:this.state.tkNew, tkf:f, tkCode:nextCode,
      tkCloseNew:()=>this.setState({ tkNew:false }),
      tkTplOptions:this.allTaskTemplates().filter(x=>x.status!=='Archived').map(x=>({name:x.name})),
      tkKpiOptions:[{id:'',label:'None — not KPI-linked'}].concat(kpiPool.map(k=>({ id:k.id, label:k.id.toUpperCase()+' · '+k.kpi+' ('+k.unit+') — '+k.who }))),
      tkProjectOptions:['—'].concat(this.recordsFor('projects').map(r=>r.name)),
      tkCampaignOptions:['—'].concat(this.allCampaigns().map(c=>c.name)),
      tkAssigneeOptions:(this.state.users||[]).map(u=>u.name),
      tkDepOptions:['—'].concat(this.allTasks().map(t=>t.id+' — '+t.name)),
      tkSetTemplate:set('template'), tkSetName:set('name'), tkSetDesc:set('desc'), tkSetProject:set('project'), tkSetCampaign:set('campaign'), tkSetStart:set('start'), tkSetEnd:set('end'), tkSetPriority:set('priority'), tkSetAssignee:set('assignee'), tkSetKpi:set('kpiId'), tkSetUnits:set('units'), tkSetEst:set('estH'), tkSetRecurrence:set('recurrence'), tkSetDep:set('dep'), tkSetDepMode:set('depMode'), tkSetReviewer:set('reviewer'), tkSetDivision:set('division'),
      tkDivisionOptions:['Content','Graphics','Web Developers','SMM','SEO'],
      tkReviewerOptions:(this.state.users||[])
        .filter(u=>['Team Lead','Manager','QC Reviewer','COO','CEO','Admin'].some(r=>(u.role||'').includes(r)))
        .map(u=>u.name+' ('+u.role+')'),
      tkEffortOptions:[{v:'',label:'None — standalone task'}].concat(this.allEpPlans().map(p=>({ v:p.name, label:p.name+' · '+p.division }))),
      ...(()=>{
        const plan=this.allEpPlans().find(p=>p.name===f.effortPlan);
        return {
          tkSetEffort:(e)=>this.setState({ tkForm:{...f, effortPlan:e.target.value, effortRow:''} }),
          tkHasPlan:!!plan,
          tkPlanInfo: plan ? (plan.division+' · '+plan.period+' · owner: '+plan.owner) : '',
          tkEffortRowOptions: plan ? [{v:'',label:'Choose the effort this task delivers…'}].concat(plan.rows.map(r=>({ v:r.type, label:r.type+' — '+(r.monthly||0).toLocaleString('en-US')+' '+r.unit+' / month' }))) : [],
          tkEffortRowVal:f.effortRow||'',
          tkSetEffortRow:(e)=>{ const v=e.target.value; const r=plan&&plan.rows.find(x=>x.type===v); const nf={...f, effortRow:v};
            if(r){ nf.kpiId=r.kpiId||''; nf.priority=r.priority; nf.units=(r.monthly<=31)?'1':String(Math.ceil((r.monthly||0)/4)); if(!f.name){ nf.name=r.type+' — '+plan.name; } }
            this.setState({ tkForm:nf }); this.flash(r?'KPI, priority & contribution auto-filled from the effort.':''); },
        };
      })(),
      tkTplChecklist:(tpl?tpl.checklist:[]).join(' · '),
      tkSubmitNew:()=>this.tkSubmitNew(),
    };
  }
  tkSubmitNew(){
    const f=this.state.tkForm||{};
    if(!f.name||!f.name.trim()){ this.flash('Enter a task name.'); return; }
    const kpiPool=this.epKpiPool();
    const k=kpiPool.find(x=>x.id===f.kpiId);
    const tpl=this.TASK_TEMPLATES().find(x=>x.name===(f.template||'Custom task'))||{checklist:[]};
    const id='TSK-'+(2060+(this.state.tkAdded||[]).length+1);
    const who=this.currentPerson();
    const task={ id, name:f.name.trim(), desc:f.desc||'—', template:f.template||'Custom task', project:f.project||'—', campaign:f.campaign||'—', start:this.fmtDate(f.start)||this.todayStr(), end:this.fmtDate(f.end)||'—', priority:f.priority||'Medium', assignee:f.assignee||'Neha Verma', kpiId:f.kpiId||'', kpi:k?k.kpi:'Not linked', units:parseInt(f.units,10)||0, unit:k?k.unit:'', estH:parseInt(f.estH,10)||0, actH:0, recurrence:f.recurrence||'None', reviewer:f.reviewer||who, effortPlan:f.effortPlan||'', effortType:f.effortRow||'', depMode:f.depMode||'Parallel', division:f.division||'Content', checklist:tpl.checklist.map(t=>({t,done:false})), dep:f.dep||'—', evidence:[], status:'Assigned', activity:[[who,'Created & assigned','' +this.todayStr()]] };
    this.setState({ tkAdded:[...(this.state.tkAdded||[]),task], tkNew:false, tkOpen:id });
    this.flash('Task '+id+' created and assigned to '+task.assignee+'.');
    supabase.from('tasks').insert({
      code:id, name:task.name, description:task.desc, priority:task.priority, status:task.status,
      division:task.division, project:task.project, campaign:task.campaign,
      assignee_name:task.assignee, reviewer_name:task.reviewer,
      start_date:f.start||null, end_date:f.end||null,
      effort_estimate:task.estH, effort_actual:task.actH, recurrence:task.recurrence, checklist:task.checklist,
      linked_kpi:task.kpi, kpi_id:task.kpiId, units:task.units, unit:task.unit,
      dependency:task.dep, effort_plan:task.effortPlan, effort_row:task.effortType, dep_mode:task.depMode,
      evidence:task.evidence, comments:[], activity:task.activity,
      created_by:this.state.authUser?this.state.authUser.id:null,
    }).then(({error})=>{
      if(error) console.warn('[supabase] task insert failed:', error.message);
    });
  }

  // Loads every Supabase-backed task and replaces tkAdded with the persisted
  // set, so created/edited tasks survive reloads and are shared across users.
  async _loadTasks(){
    const { data, error } = await supabase.from('tasks').select('*').order('created_at', { ascending:true });
    if(error){ console.warn('[supabase] task load failed:', error.message); return; }
    const mapped=(data||[]).map(r=>({
      id:r.code, name:r.name, desc:r.description||'—', template:'Custom task',
      project:r.project||'—', campaign:r.campaign||'—',
      start:this.fmtDate(r.start_date)||this.todayStr(), end:this.fmtDate(r.end_date)||'—',
      priority:r.priority||'Medium', assignee:r.assignee_name||'Unassigned',
      kpiId:r.kpi_id||'', kpi:r.linked_kpi||'Not linked', units:r.units||0, unit:r.unit||'',
      estH:r.effort_estimate||0, actH:r.effort_actual||0, recurrence:r.recurrence||'None',
      reviewer:r.reviewer_name||'—', effortPlan:r.effort_plan||'', effortType:r.effort_row||'',
      depMode:r.dep_mode||'Parallel', division:r.division||'Content',
      checklist:r.checklist||[], dep:r.dependency||'—', evidence:r.evidence||[],
      comments:r.comments||[], status:r.status||'Assigned', activity:r.activity||[],
      qcFeedback:r.qc_feedback||'',
    }));
    this.setState({ tkAdded:mapped, tkUpd:{} });
  }

  OKR_REVIEWERS(){ return ['John Smith (Admin)','Priya Nair (Manager)','Rahul Menon (COO)','Aditi Rao (Team Lead)','Farhan Ali (QC)']; }
  okrReviewerOpt(name){ if(!name) return this.OKR_REVIEWERS()[0];
    const hit=this.OKR_REVIEWERS().find(o=>o===name||o.split(' (')[0]===String(name).split(' (')[0]);
    return hit||name; }
  openOkrEdit(id){
    const o=this.OKR_DATA().find(x=>x.id===id);
    if(!o) return;
    this.setState({ showOkrPanel:true, okrSection:'okrA', okrEditId:id,
      okrForm:{ title:o.title, desc:o.desc||'', owner:o.owner, dept:o.dept, brand:o.brand, campaign:o.campaign&&o.campaign!=='—'?o.campaign:'', category:o.category, scope:o.scope, priority:o.priority||this.okrPriority(o).label,
        cycle:o.cycle, reviewFreq:o.reviewFreq||'Weekly', start:this.isoDate(o.start), end:this.isoDate(o.due),
        parent:o.parent||'None (top level)', dependsOn:o.dependsOn||'', effortTargets:o.effortTargets||'',
        progressCalc:o.progressCalc||'Automatic (from KPI logs)', dataSource:o.dataSource||'GA4',
        reviewer:this.okrReviewerOpt(o.reviewer), status:o.status==='Archived'?'Draft':o.status, risks:o.risks||'' },
      okrDraftKRs:(o.krs||[]).map((k,i)=>({ id:i+1, kr:k.t, kpiSel:k.kpi, unit:k.unit, baseline:k.baseline, target:k.target, current:k.current, weight:String(k.weight), who:k.who })),
      okrKRSeq:(o.krs||[]).length+1,
    });
  }
  _saveOkr(activate, wOk, wTotal, existingCount, rk){
    const f=this.state.okrForm||{};
    if(!f.title||!f.title.trim()){ this.flash('Enter an objective title.'); return; }
    if(activate && !wOk){ this.flash('Key-result weights must total 100% (now '+wTotal+'%).'); return; }
    const krs=(this.state.okrDraftKRs||[]).map((k,i)=>({
      t:k.kr&&k.kr.trim()?k.kr.trim():'Key result '+(i+1), kpi:k.kpiSel||'KPI '+(i+1),
      baseline:k.baseline||'0', target:k.target||'100', current:k.current||'0', unit:k.unit||'units',
      weight:parseInt(k.weight,10)||0, who:k.who||f.owner, freq:'Monthly', due:'Mar 31', status:'Active',
    }));
    const editId=this.state.okrEditId;
    const shared={ title:f.title.trim(), desc:f.desc||'', owner:f.owner, dept:f.dept, brand:f.brand, campaign:f.campaign||'—', category:f.category||f.dept,
      scope:f.scope||'Department', priority:f.priority||'Medium', cycle:f.cycle||'Q1 2026', reviewFreq:f.reviewFreq||'Weekly',
      start:this.fmtDate(f.start)||this.todayStr(), due:this.fmtDate(f.end)||'Mar 31, 2026',
      parent:f.parent||'None (top level)', dependsOn:f.dependsOn||'', effortTargets:f.effortTargets||'',
      progressCalc:f.progressCalc||'Automatic (from KPI logs)', dataSource:f.dataSource||'GA4',
      reviewer:f.reviewer||this.currentPerson(), risks:f.risks||'', krs, status: activate?(f.status&&f.status!=='Draft'?f.status:'Active'):'Draft' };
    if(editId){
      const prev=this.OKR_DATA().find(x=>x.id===editId)||{};
      const ver='v'+(parseFloat(String(prev.v||'v1.0').replace('v',''))+0.1).toFixed(1);
      this.setState({ okrUpd:{...(this.state.okrUpd||{}), [editId]:{...shared, v:ver}},
        showOkrPanel:false, okrEditId:null, okrDraftKRs:[{id:1,weight:'50'},{id:2,weight:'50'}], okrKRSeq:3 });
      this.flash('Changes saved to '+(prev.code||editId)+' ('+ver+').');
      return;
    }
    const code='OKR-'+(this.ROLES[rk].bucket==='admin'?'GEN':'SEO')+'-Q1-'+String(existingCount+1).padStart(3,'0');
    const okr={
      id:'okr-local-'+Date.now(), code, v:'v1.0', team:'', campaign:'', daysLeft:90, cycleElapsed:0,
      weight:100, approver:this.currentPerson(), ...shared,
    };
    this.setState({ okrAdded:[...(this.state.okrAdded||[]), okr], showOkrPanel:false,
      okrDraftKRs:[{id:1,weight:'50'},{id:2,weight:'50'}], okrKRSeq:3 });
    this.flash(activate ? 'OKR '+code+' saved & activated.' : 'OKR '+code+' saved as draft.');
    supabase.from('okrs').insert({
      code, title:okr.title, description:okr.desc, category:okr.category, scope:okr.scope, division:okr.dept,
      status:okr.status, key_results:krs, created_by:this.state.authUser?this.state.authUser.id:null,
    }).then(({error})=>{
      if(error) console.warn('[supabase] okr insert failed:', error.message);
    });
  }

  // Loads every Supabase-backed OKR and replaces okrAdded, so created OKRs
  // survive reloads and are shared across users.
  async _loadOkrs(){
    const { data, error } = await supabase.from('okrs').select('*').order('created_at', { ascending:true });
    if(error){ console.warn('[supabase] okr load failed:', error.message); return; }
    const mapped=(data||[]).map(r=>({
      id:'okr-'+r.id, code:r.code, v:'v1.0', scope:r.scope||'Department', title:r.title, desc:r.description||'',
      owner:(r.key_results&&r.key_results[0]&&r.key_results[0].who)||'—', team:'', cycle:'Q1 2026',
      brand:'', dept:r.division||'', campaign:'', category:r.category||r.division||'',
      progress:0, due:'Mar 31, 2026', start:this.todayStr(), daysLeft:90, cycleElapsed:0,
      status:r.status||'Draft', weight:100, reviewer:'', approver:'',
      krs:r.key_results||[],
    }));
    this.setState({ okrAdded:mapped });
  }

  // Loads real Supabase-backed team members (profiles) and merges them into
  // the users list so newly invited/created accounts show up in User Management.
  async _loadTeam(){
    const { data, error } = await supabase.from('profiles').select('*').order('created_at', { ascending:true });
    if(error){ console.warn('[supabase] team load failed:', error.message); return; }
    const roleLabel=r=> (this.ROLES[r]&&this.ROLES[r].label) || r;
    const mapped=(data||[]).map(p=>({
      id:p.id, email:p.email, name:p.full_name||p.email, sub:(p.designation||roleLabel(p.role_key))+' · '+(p.department||'—'),
      roleKey:p.role_key||'junior', role:roleLabel(p.role_key), dept:p.department||'—', designation:p.designation||'',
      status:p.status||'Active', statusTone: (p.status||'Active')==='Active'?'ok':'warn',
      mobile:p.mobile||'', team:p.team||'', reportingManager:p.reporting_manager||'', teamLead:p.team_lead||'',
      officeLocation:p.office_location||'', employmentType:p.employment_type||'Full-time', joiningDate:p.joining_date||'',
    }));
    if(mapped.length) this.setState({ users:mapped });
  }

  _saveRecord(){
    const f=this.state.recordForm||{};
    const kind=this.state.recordKind;
    const editKey=this.state.recordEditKey;
    if(!f.name||!f.name.trim()){ this.flash('Enter a name.'); return; }
    const label=kind==='campaigns'?'Campaign':'Project';

    if(editKey==null){
      // create
      const rec={ id:kind+'-local-'+Date.now(), kind, name:f.name.trim(), type:f.type||'', owner:f.owner||'', status:f.status||'Draft' };
      this.setState({ recordsAdded:[...(this.state.recordsAdded||[]), rec], showRecordModal:false });
      this.flash(label+' "'+rec.name+'" created.');
      supabase.from('records').insert({
        kind, name:rec.name, type:rec.type, owner:rec.owner, status:rec.status,
        created_by:this.state.authUser?this.state.authUser.id:null,
      }).then(({error})=>{
        if(error) console.warn('[supabase] record insert failed:', error.message);
      });
      return;
    }

    if(this.state.recordIsReal){
      // edit a Supabase-backed record
      const recordsAdded=this.state.recordsAdded.map(r=>r.id===editKey?{...r,name:f.name.trim(),type:f.type,owner:f.owner,status:f.status}:r);
      this.setState({ recordsAdded, showRecordModal:false });
      this.flash(label+' "'+f.name.trim()+'" updated.');
      supabase.from('records').update({ name:f.name.trim(), type:f.type, owner:f.owner, status:f.status }).eq('id', editKey).then(({error})=>{
        if(error) console.warn('[supabase] record update failed:', error.message);
      });
    } else {
      // edit a demo/seed record — local override only
      const recordOverrides={...this.state.recordOverrides, [editKey]:{ name:f.name.trim(), type:f.type, owner:f.owner, status:f.status }};
      this.setState({ recordOverrides, showRecordModal:false });
      this.flash(label+' "'+f.name.trim()+'" updated (demo record — local only).');
    }
  }

  _deleteRecord(){
    const kind=this.state.recordKind;
    const editKey=this.state.recordEditKey;
    if(editKey==null) return;
    if(this.state.recordIsReal){
      this.setState({ recordsAdded:this.state.recordsAdded.filter(r=>r.id!==editKey), showRecordModal:false });
      supabase.from('records').delete().eq('id', editKey).then(({error})=>{
        if(error) console.warn('[supabase] record delete failed:', error.message);
      });
    } else {
      this.setState({ recordOverrides:{...this.state.recordOverrides, [editKey]:{deleted:true}}, showRecordModal:false });
    }
    this.flash((kind==='campaigns'?'Campaign':'Project')+' deleted.');
  }

  async _loadRecords(){
    const { data, error } = await supabase.from('records').select('*').order('created_at', { ascending:true });
    if(error){ console.warn('[supabase] records load failed:', error.message); return; }
    const mapped=(data||[]).map(r=>({ id:'record-'+r.id, kind:r.kind, name:r.name, type:r.type||'', owner:r.owner||'', status:r.status||'Draft' }));
    this.setState({ recordsAdded:mapped });
  }

  checkinView(){
    const rk = this.state.roleKey;
    const person = this.currentPerson();
    const base = (this.MY_KPIS()[rk]||[]);
    const pc = (p)=> p>=70?'var(--verify-500)': p>=40?'var(--warn-500)':'var(--danger-500)';
    const num = (v)=>parseFloat(String(v).replace(/,/g,''))||0;
    const rows = base.map(k=>{
      let currentVal, source, updated, updatedColor;
      if(rk==='junior' && this.juniorRollup(k.id).total>0){
        const r=this.juniorRollup(k.id); currentVal=r.val;
        source='Auto · rolls up from tasks';
        updated=r.done+' of '+r.total+' tasks done'; updatedColor= r.done>0?'var(--verify-600)':'var(--ink-400)';
      } else {
        const rep = (this.state.kpiActuals||{})[k.id];
        currentVal = rep ? rep.val : k.current;
        source = k.manual?'Manual KPI · self-reported':'Auto · KPI log';
        updated = rep ? ('Reported '+rep.date) : 'Awaiting this period’s actual';
        updatedColor = rep ? 'var(--verify-600)' : 'var(--ink-400)';
      }
      const ach = Math.min(999, Math.round(num(currentVal)/num(k.target)*100));
      const ciList=((this.state.ciAdded||{})['kpi-'+k.id]||[]);
      const lastCi = ciList.length? ('Last check-in · '+ciList[ciList.length-1].date) : ('No check-in yet · '+k.freq.split(' ')[0].toLowerCase()+' cadence');
      const lt=this.allTasks().filter(t=>t.kpiId===k.id).map(t=>{ const tn=this.tkTone(t.status); return { code:t.id, name:t.name, units:'+'+t.units+' '+t.unit, status:t.status, statusBg:tn.bg, statusColor:tn.c, open:()=>this.setState({ route:'tasks', tkOpen:t.id }) }; });
      return { id:k.id, kpi:k.kpi, unit:k.unit, baseline:k.baseline, target:k.target+' '+k.unit, current:currentVal+' '+k.unit,
        linkedTasks:lt, hasLinkedTasks:lt.length>0,
        ach:ach+'%', achColor:pc(ach), achW:Math.min(100,ach)+'%', freq:k.freq, okr:k.okr,
        source, updated, updatedColor,
        lastCi, lastCiColor: ciList.length?'var(--verify-600)':'var(--warn-600)',
        freqChip:k.freq.split(' ')[0]+' check-in',
        checkin:()=>this.openCi('kpi',{ id:'kpi-'+k.id, kpiId:k.id, title:k.kpi, freq:k.freq.split(' ')[0], okr:k.okr }),
        history:()=>this.setState({ historyOkr:'kpi-'+k.id }) };
    });
    // due / pending / lock model
    const today=this.todayStr();
    const pendingY=this.state.ciPendingY || this.defaultPendingY();
    const doneToday=(id)=>{ const l=((this.state.ciAdded||{})['kpi-'+id]||[]); return l.length>0 && l[l.length-1].date===today; };
    const hasOverdue=rows.some(r=>pendingY[r.id]);
    rows.forEach(r=>{
      const cad=r.freq.split(' ')[0];
      const btn=(label,bg,fg,border)=>{ r.btnLabel=label; r.btnStyle='display:flex;align-items:center;gap:6px;border-radius:10px;padding:8px 14px;font-size:12.5px;font-weight:700;cursor:pointer;background:'+bg+';color:'+fg+';border:'+(border||'none'); };
      r.cardStyle='background:#fff;border:1px solid var(--line-300);border-radius:18px;box-shadow:var(--shadow-sm);padding:18px 20px';
      r.btnIcon='clipboard-check';
      if(pendingY[r.id]){ // date passed, missed → red
        r.due={label:'Delayed — missed check-in',bg:'var(--danger-100)',color:'var(--danger-600)'};
        btn('Check in · delayed','var(--danger-500)','#fff'); r.btnIcon='alert-circle';
      }
      else if(doneToday(r.id)){
        r.due={label:'Checked in today',bg:'var(--verify-100)',color:'var(--verify-600)'};
        btn('Checked in','var(--surface-50)','var(--ink-400)','1px solid var(--line-300)'); r.btnIcon='check';
        const done=r.checkin; r.checkin=()=>this.flash('Already checked in today — next one unlocks tomorrow.');
      }
      else if(cad==='Daily'){ // today, on time → green
        r.due={label: hasOverdue?'Due today — locked':'Due today',bg:'var(--warn-100)',color:'var(--warn-600)'};
        r.locked=hasOverdue;
        if(r.locked){ btn('Locked','var(--surface-50)','var(--ink-400)','1px solid var(--line-300)'); r.btnIcon='lock'; r.checkin=()=>this.flash('Complete yesterday’s pending check-in first.'); }
        else btn('Check in · today','var(--verify-500)','#fff');
      }
      else if(cad==='Weekly'){ // date arrived this period, not done → pending amber
        r.due={label:'Pending this week',bg:'var(--warn-100)',color:'var(--warn-600)'};
        btn('Check in · pending','var(--warn-500)','#fff'); r.btnIcon='clock';
      }
      else { // date not arrived → blurred & locked
        r.due={label:'Unlocks '+({Monthly:'at month end',Quarterly:'at quarter end'}[cad]||'later'),bg:'var(--surface-50)',color:'var(--ink-400)'};
        r.upcoming=true;
        r.cardStyle='background:#fff;border:1px solid var(--line-200);border-radius:18px;padding:18px 20px;opacity:.55;filter:grayscale(.4)';
        btn('Locked until due','var(--surface-50)','var(--ink-400)','1px solid var(--line-300)'); r.btnIcon='lock';
        r.checkin=()=>this.flash('This check-in unlocks when its date arrives.');
        r.history=r.history;
      }
    });
    const cadOrder=['Daily','Weekly','Monthly','Quarterly'];
    const groups=cadOrder.map(c=>({ name:c+' check-ins', icon:{Daily:'sun',Weekly:'calendar-days',Monthly:'calendar',Quarterly:'calendar-range'}[c], rows:rows.filter(r=>r.freq.split(' ')[0]===c) })).filter(g=>g.rows.length);
    // today's queue
    const qYesterday=rows.filter(r=>pendingY[r.id]).map(r=>({ title:r.kpi, sub:'Missed yesterday · '+r.freqChip, go:r.checkin }));
    const qToday=rows.filter(r=>!pendingY[r.id] && r.freq.split(' ')[0]==='Daily' && !doneToday(r.id)).map(r=>({ title:r.kpi, sub:'Due today · daily check-in', go:r.checkin, locked:r.locked }));
    const qDone=rows.filter(r=>doneToday(r.id)).length;
    // consolidated report
    const num2=(v)=>parseFloat(String(v).replace(/,/g,''))||0;
    const completed=rows.filter(r=>doneToday(r.id)).length;
    const pendingCt=qYesterday.length+qToday.length;
    const notAch=rows.filter(r=>parseInt(r.ach,10)<60).length;
    const monthAch=rows.length?Math.round(rows.reduce((s,r)=>s+Math.min(100,parseInt(r.ach,10)),0)/rows.length):0;
    const weekly=rows.filter(r=>r.freq.split(' ')[0]==='Weekly');
    const weekAch=weekly.length?Math.round(weekly.reduce((s,r)=>s+Math.min(100,parseInt(r.ach,10)),0)/weekly.length):0;
    const totalUnits=rows.reduce((s,r)=>s+num2(r.current),0);
    const avg = rows.length?Math.round(rows.reduce((s,r)=>s+parseInt(r.ach,10),0)/rows.length):0;
    const teamId = 'team-'+rk;
    const freq = { team_lead:'Weekly', senior:'Weekly (KR owner)', junior:'Daily task updates' }[rk];
    return {
      isJuniorCi: rk==='junior', isSeniorCi: rk==='senior', isLeadCi: rk==='team_lead',
      myKpiPerson:person, myKpiRole:this.ROLES[rk].label, myKpiFreq:freq,
      myKpiStats:[
        {label:'Check-ins done today',value:String(completed),color:'var(--verify-600)',icon:'check-circle-2'},
        {label:'Pending check-ins',value:String(pendingCt),color:pendingCt?'var(--danger-600)':'var(--verify-600)',icon:'clock'},
        {label:'Month achievement',value:monthAch+'%',color:'var(--info-600)',icon:'gauge'},
        {label:'Not achieved (<60%)',value:String(notAch),color:notAch?'var(--warn-600)':'var(--verify-600)',icon:'alert-triangle'},
      ],
      myKpiRows:rows, myKpiGroups:groups,
      qYesterday, qToday, hasQYesterday:qYesterday.length>0, hasQToday:qToday.length>0,
      queueClear:qYesterday.length===0&&qToday.length===0, qDoneMsg:'All caught up — '+qDone+' check-in'+(qDone===1?'':'s')+' completed today.',
      rep:{ completed:String(completed), pending:String(pendingCt), notAch:String(notAch), monthAch:monthAch+'%', weekAch:weekAch+'%', totalUnits:totalUnits.toLocaleString('en-US'), kpis:String(rows.length) },
      shareReport:()=>this.flash('Consolidated KPI report copied — ready to share with your Team Lead.'),
      goTasks:()=>this.setState({ route:'tasks' }),
      openWeekly:()=>this.openCi(rk==='team_lead'?'lead':'senior', {id:teamId, title:this.ROLES[rk].tag+' — weekly'}),
      openMyHistory:()=>this.setState({ historyOkr:teamId }),
    };
  }

  ciData(){
    const t=this.state.ciType, cf=this.state.ciForm||{};
    const titles={senior:'Weekly update',lead:'Weekly check-in',manager:'Monthly OKR review',exec:'Executive comment',kpi:((this.state.ciCtx||{}).freq||'')+' check-in'};
    const ctx=this.state.ciCtx||{};
    const hid=this.state.historyOkr;
    let histTitle='Check-in history';
    if(hid){ const o=this.OKR_DATA().find(x=>x.id===hid); if(o) histTitle=o.title; else if(hid.indexOf('team-')===0) histTitle=this.ROLES[this.state.roleKey].tag+' — check-ins'; }
    const histRows=(hid?this.ciHistory(hid):[]).map(e=>{
      const hTone = e.health==='Healthy'?{bg:'var(--verify-100)',color:'var(--verify-600)'}: e.health==='At Risk'?{bg:'var(--warn-100)',color:'var(--warn-600)'}: e.health==='Critical'?{bg:'var(--danger-100)',color:'var(--danger-600)'}:null;
      return { date:e.date, who:e.who, role:e.role, kind:e.kind, text:e.text||'', progress:e.progress||'', health:e.health||'', hasHealth:!!e.health, healthBg:hTone?hTone.bg:'', healthColor:hTone?hTone.color:'', decision:e.decision||'', hasDecision:!!e.decision,
        dot: e.kind.indexOf('Manager')>=0||e.kind.indexOf('Monthly')>=0?'var(--orchid-500)': e.kind.indexOf('Executive')>=0?'var(--beet-700)':'var(--info-500)' };
    });
    // assigned KPIs for actuals entry (senior / team lead)
    const pc = (p)=> p>=70?'var(--verify-500)': p>=40?'var(--warn-500)':'var(--danger-500)';
    const num = (v)=>parseFloat(String(v).replace(/,/g,''))||0;
    let ciKpis=[];
    if(t==='kpi'){
      ciKpis = (this.MY_KPIS()[this.state.roleKey]||[]).filter(k=>k.id===ctx.kpiId).map(k=>{
        const rep=(this.state.kpiActuals||{})[k.id];
        let prev = rep?rep.val:k.current;
        if(this.state.roleKey==='junior'){ prev=String(this.juniorRollup(k.id).val); }
        const typed = cf['act_'+k.id];
        const shown = (typed!==undefined && String(typed).trim()!=='') ? typed : '';
        const effective = shown!==''?shown:prev;
        const ach=Math.min(999,Math.round(num(effective)/num(k.target)*100));
        return { id:k.id, kpi:k.kpi, unit:k.unit, target:k.target+' '+k.unit, prev:prev+' '+k.unit, actVal:shown, onAct:this.ciSet('act_'+k.id), ach:ach+'%', achColor:pc(ach) };
      });
    }
    if(t==='senior' || t==='lead'){
      ciKpis = (this.MY_KPIS()[this.state.roleKey]||[]).map(k=>{
        const rep=(this.state.kpiActuals||{})[k.id];
        const prev = rep?rep.val:k.current;
        const typed = cf['act_'+k.id];
        const shown = (typed!==undefined && String(typed).trim()!=='') ? typed : '';
        const effective = shown!==''?shown:prev;
        const ach=Math.min(999,Math.round(num(effective)/num(k.target)*100));
        return { id:k.id, kpi:k.kpi, unit:k.unit, target:k.target+' '+k.unit, prev:prev+' '+k.unit, actVal:shown, onAct:this.ciSet('act_'+k.id), ach:ach+'%', achColor:pc(ach) };
      });
    }
    return {
      ciOpen:this.state.ciOpen, ciType:t,
      isCiSenior:t==='senior', isCiLead:t==='lead', isCiManager:t==='manager', isCiExec:t==='exec', isCiKpi:t==='kpi',
      ciNeedsActuals: t==='senior'||t==='lead'||t==='kpi',
      ciFlagOn:!!cf.flag,
      ciFlagStyle:'display:flex;align-items:center;gap:10px;width:100%;padding:12px 14px;border-radius:12px;cursor:pointer;font-size:13px;font-weight:700;border:1px solid '+(cf.flag?'var(--warn-500)':'var(--line-300)')+';background:'+(cf.flag?'var(--warn-100)':'#fff')+';color:'+(cf.flag?'var(--warn-600)':'var(--ink-700)'),
      ciToggleFlag:()=>this.setState({ ciForm:{...cf, flag:!cf.flag} }),
      ciFiles:(cf.files||[]).map((f,i)=>({ name:f, remove:()=>{ const arr=(cf.files||[]).slice(); arr.splice(i,1); this.setState({ ciForm:{...cf, files:arr} }); } })),
      ciHasFiles:(cf.files||[]).length>0,
      ciAddFile:()=>{ const arr=(cf.files||[]).slice(); arr.push('evidence-'+(arr.length+1)+'.png'); this.setState({ ciForm:{...cf, files:arr} }); },
      ciKpis, ciDate: cf.date||this.todayStr(), ciSetDate:this.ciSet('date'), ciSetAct:(key)=>this.ciSet(key),
      ciTitle: titles[t]||'Check-in', ciSubtitle: ctx.title||'',
      ciProgress: ctx.progress? ('OKR progress: '+ctx.progress) : 'Enter actuals below — progress recalculates automatically',
      cf,
      ciSetAcc:this.ciSet('accomplishments'), ciSetChal:this.ciSet('challenges'), ciSetRisk:this.ciSet('risks'), ciSetDep:this.ciSet('dependencies'), ciSetSupport:this.ciSet('support'), ciSetNext:this.ciSet('next'), ciSetConf:this.ciSet('confidence'), ciSetComment:this.ciSet('comment'), ciSetHealth:this.ciSet('health'), ciSetDecision:this.ciSet('decision'),
      closeCi:()=>this.setState({ ciOpen:false }),
      submitCi:()=>this.submitCi(false), submitCiEscalate:()=>this.submitCi(true),
      historyOpen:!!hid, historyTitle:histTitle, historyRows:histRows,
      historyEmpty: !!hid && histRows.length===0,
      closeHistory:()=>this.setState({ historyOkr:null }),
      stop:e=>e.stopPropagation(),
    };
  }

  CONTENT_REPOS(){ return [
    {key:'all', name:'All content', icon:'layers'},
    {key:'service', name:'Service', icon:'briefcase'},
    {key:'insights', name:'Insights', icon:'lightbulb'},
    {key:'product', name:'Product', icon:'package'},
    {key:'career', name:'Career', icon:'user-round'},
    {key:'landing', name:'Landing Page', icon:'panels-top-left'},
    {key:'case', name:'Case Study', icon:'file-check-2'},
    {key:'resource', name:'Resource Library', icon:'library'},
    {key:'faq', name:'FAQ', icon:'circle-help'},
    {key:'news', name:'News', icon:'newspaper'},
    {key:'home', name:'Home & Corporate', icon:'building-2'},
  ]; }
  CONTENT_PAGES(){
    if(this._cpages) return this._cpages;
    this._cpages = [
      { id:'PG-1001', name:'Cloud Migration Services', repo:'service', linkedIds:['PG-1002'], type:'Service Page', topic:'Cloud Migration', industry:'Technology', keyword:'enterprise cloud migration', status:'Published', seo:87, updated:'Oct 28, 2024', owner:'John Doe', reviewer:'Priya Nair',
        slug:'cloud-migration', url:'/services/cloud-migration', parent:'Services', menuCat:'Services', menuOrder:1, breadcrumb:'Home > Services > Cloud Migration', description:'Enterprise cloud migration services across AWS, Azure and GCP.',
        cls:[['Service Category','Cloud Services'],['Sub-Service','AWS / Azure Migration'],['Industry','Technology'],['Sector','Enterprise'],['Application Category','Infrastructure'],['Target Countries','USA, UK, Canada']],
        seoMeta:[['Meta Title','Enterprise Cloud Migration Services | Beetloop'],['Meta Description','Seamless, secure cloud migration for enterprises — AWS, Azure & GCP.'],['Focus Keyword','enterprise cloud migration'],['Secondary Keywords','aws migration, cloud transformation'],['Keyword Intent','Commercial'],['Canonical URL','/services/cloud-migration'],['Schema Type','Service'],['Robots','index, follow'],['Index Status','Indexed'],['Hreflang','en-US, en-GB'],['OG Title','Enterprise Cloud Migration'],['Twitter Card','summary_large_image']],
        blocks:[['Heading','H1','Cloud Migration Services'],['Paragraph','','Move to the cloud with zero downtime and full compliance.'],['Heading','H2','Why Beetloop'],['Image','','hero-cloud.jpg · alt: cloud migration diagram'],['CTA','','Request a migration assessment'],['FAQ','','6 questions on cloud migration'],['Comparison Table','','AWS vs Azure vs GCP']],
        rel:{Services:['AWS Migration','Azure Migration'],Insights:['Cloud Migration Best Practices'],'Case Studies':['FinTech cloud move'],Downloads:['Migration checklist (PDF)']},
        internal:[['zero-downtime migration','/insights/zero-downtime','Strong','92'],['cloud compliance','/services/compliance','Medium','74']],
        aiLinks:[['cloud cost optimization','/insights/cloud-cost','88'],['multi-cloud strategy','/services/multi-cloud','81']],
        media:[['Image','hero-cloud.jpg','Cloud migration diagram','420 KB','3'],['PDF','migration-checklist.pdf','Migration checklist','1.2 MB','12'],['Video','overview.mp4','Service overview','18 MB','1']],
        workflow:'Published', publishDate:'Oct 28, 2024', expiry:'—', version:'v4.2',
        analytics:{traffic:'12,400',ctr:'4.8%',pos:'3.2',bounce:'38%',time:'2m 41s',conv:'126',backlinks:'84',speed:'1.9s'},
        activity:[['John Doe','Published','Oct 28, 2024'],['Priya Nair','QC approved','Oct 27, 2024'],['John Doe','Edited SEO metadata','Oct 25, 2024'],['John Doe','Created page','Oct 10, 2024']] },
      { id:'PG-1007', name:'AWS Migration Services', repo:'service', pid:'PG-1001', linkedIds:['PG-1002'], type:'Service Page', topic:'Cloud Migration', industry:'Technology', keyword:'aws migration services', status:'Published', seo:83, updated:'Nov 2, 2024', owner:'John Doe', reviewer:'Priya Nair',
        slug:'aws-migration', url:'/services/cloud-migration/aws-migration', parent:'Cloud Migration Services', menuCat:'Services', menuOrder:1, breadcrumb:'Home > Services > Cloud Migration > AWS Migration', description:'Specialised AWS migration under the cloud migration service line.',
        cls:[['Service Category','Cloud Services'],['Sub-Service','AWS Migration'],['Industry','Technology'],['Target Countries','USA, UK']],
        seoMeta:[['Meta Title','AWS Migration Services | Beetloop'],['Meta Description','Plan and execute AWS migrations with zero downtime.'],['Focus Keyword','aws migration services'],['Keyword Intent','Commercial'],['Canonical URL','/services/cloud-migration/aws-migration'],['Schema Type','Service'],['Robots','index, follow'],['Index Status','Indexed']],
        blocks:[['Heading','H1','AWS Migration Services'],['Paragraph','','Migrate workloads to AWS with a proven playbook.'],['CTA','','Request an AWS assessment']],
        rel:{Services:['Cloud Migration Services'],Insights:['Cloud Migration Best Practices']},
        internal:[['cloud migration','/services/cloud-migration','Strong','90']],
        aiLinks:[['aws cost optimization','/insights/aws-cost','82']],
        media:[['Image','aws-hero.jpg','AWS migration hero','300 KB','1']],
        workflow:'Published', publishDate:'Nov 2, 2024', expiry:'—', version:'v1.4',
        analytics:{traffic:'5,100',ctr:'4.2%',pos:'4.8',bounce:'40%',time:'2m 20s',conv:'54',backlinks:'22',speed:'1.8s'},
        activity:[['John Doe','Published','Nov 2, 2024']] },
      { id:'PG-1008', name:'AWS Database Migration', repo:'service', pid:'PG-1007', linkedIds:['PG-1002'], type:'Service Page', topic:'Cloud Migration', industry:'Technology', keyword:'aws database migration', status:'Draft', seo:52, updated:'Nov 6, 2024', owner:'Bob Wilson', reviewer:'—',
        slug:'database-migration', url:'/services/cloud-migration/aws-migration/database-migration', parent:'AWS Migration Services', menuCat:'Services', menuOrder:1, breadcrumb:'Home > Services > Cloud Migration > AWS Migration > Database Migration', description:'RDS / Aurora database migration sub-service.',
        cls:[['Service Category','Cloud Services'],['Sub-Service','AWS Database Migration'],['Industry','Technology'],['Target Countries','USA']],
        seoMeta:[['Meta Title','AWS Database Migration | Beetloop'],['Meta Description','Migrate databases to RDS and Aurora safely.'],['Focus Keyword','aws database migration'],['Keyword Intent','Commercial'],['Schema Type','Service'],['Robots','index, follow'],['Index Status','Not indexed']],
        blocks:[['Heading','H1','AWS Database Migration'],['Paragraph','','Move databases with integrity checks and rollback plans.']],
        rel:{Services:['AWS Migration Services'],Insights:['Cloud Migration Best Practices']},
        internal:[['aws migration','/services/cloud-migration/aws-migration','Strong','88']],
        aiLinks:[['aurora vs rds','/insights/aurora-rds','80']],
        media:[],
        workflow:'Draft', publishDate:'—', expiry:'—', version:'v0.3',
        analytics:{traffic:'—',ctr:'—',pos:'—',bounce:'—',time:'—',conv:'—',backlinks:'0',speed:'—'},
        activity:[['Bob Wilson','Created draft','Nov 6, 2024']] },
      { id:'PG-1002', name:'Cloud Migration Best Practices', repo:'insights', linkedIds:['PG-1001','PG-1007'], type:'Blog', topic:'Cloud Migration', industry:'Technology', keyword:'cloud migration strategy', status:'Under Review', seo:72, updated:'Oct 30, 2024', owner:'Carol Smith', reviewer:'Karan Shah',
        slug:'cloud-migration-guide', url:'/insights/cloud-migration-guide', parent:'Insights', menuCat:'Insights', menuOrder:4, breadcrumb:'Home > Insights > Cloud Migration Best Practices', description:'A practical guide to planning and executing a cloud migration.',
        cls:[['Topic','Cloud Migration'],['Author','Carol Smith'],['Content Type','Blog'],['Reading Time','8 min'],['Tags','cloud, migration, strategy'],['Publish Date','Nov 2, 2024'],['Related Services','Cloud Migration Services']],
        seoMeta:[['Meta Title','Cloud Migration Best Practices (2025 Guide)'],['Meta Description','12 best practices for a smooth enterprise cloud migration.'],['Focus Keyword','cloud migration strategy'],['Keyword Intent','Informational'],['Schema Type','Article'],['Index Status','Pending'],['Robots','index, follow']],
        blocks:[['Heading','H1','Cloud Migration Best Practices'],['Paragraph','','Planning is everything. Start with an audit.'],['Checklist','','Pre-migration checklist (10 items)'],['Quote','','"Migrate in waves, not big-bang."']],
        rel:{Services:['Cloud Migration Services'],Insights:['Multi-cloud strategy'],Downloads:['Migration checklist (PDF)']},
        internal:[['cloud migration services','/services/cloud-migration','Strong','90']],
        aiLinks:[['cloud security','/services/security','79']],
        media:[['Image','guide-cover.jpg','Guide cover','310 KB','2']],
        workflow:'Under Review', publishDate:'Nov 2, 2024', expiry:'—', version:'v1.3',
        analytics:{traffic:'3,200',ctr:'3.1%',pos:'8.4',bounce:'52%',time:'3m 12s',conv:'18',backlinks:'12',speed:'2.2s'},
        activity:[['Karan Shah','Sent to SEO review','Oct 30, 2024'],['Carol Smith','Submitted for review','Oct 29, 2024'],['Carol Smith','Created page','Oct 22, 2024']] },
      { id:'PG-1003', name:'FinTech SEO — Case Study', repo:'case', type:'Case Study', topic:'SEO', industry:'FinTech', keyword:'fintech seo case study', status:'Published', seo:81, updated:'Oct 18, 2024', owner:'Alice Johnson', reviewer:'Priya Nair',
        slug:'fintech-seo', url:'/case-studies/fintech-seo', parent:'Case Studies', menuCat:'Case Studies', menuOrder:2, breadcrumb:'Home > Case Studies > FinTech SEO', description:'How we grew a FinTech client’s organic traffic 3×.',
        cls:[['Industry','FinTech'],['Service','SEO Services'],['Outcome','+210% organic traffic'],['Duration','9 months']],
        seoMeta:[['Meta Title','FinTech SEO Case Study — 3× Organic Growth'],['Focus Keyword','fintech seo case study'],['Keyword Intent','Commercial'],['Schema Type','Article'],['Index Status','Indexed']],
        blocks:[['Heading','H1','FinTech SEO Case Study'],['Paragraph','','The challenge and the results.'],['Table','','Before / after metrics']],
        rel:{Services:['SEO Services'],Insights:['FinTech SEO strategies']},
        internal:[['SEO services','/services/seo','Strong','86']],
        aiLinks:[['YMYL content','/insights/ymyl','77']],
        media:[['Image','results-chart.png','Results chart','260 KB','4']],
        workflow:'Published', publishDate:'Oct 18, 2024', expiry:'—', version:'v2.0',
        analytics:{traffic:'4,900',ctr:'5.4%',pos:'4.1',bounce:'41%',time:'2m 58s',conv:'42',backlinks:'31',speed:'2.0s'},
        activity:[['Alice Johnson','Published','Oct 18, 2024'],['Priya Nair','QC approved','Oct 17, 2024']] },
      { id:'PG-1004', name:'Enterprise SEO Audit — Landing', repo:'landing', type:'Landing Page', topic:'SEO Audit', industry:'Technology', keyword:'enterprise seo audit', status:'Scheduled', seo:79, updated:'Oct 29, 2024', owner:'Bob Wilson', reviewer:'Karan Shah',
        slug:'lp/seo-audit', url:'/lp/enterprise-seo-audit', parent:'Landing Pages', menuCat:'—', menuOrder:0, breadcrumb:'Home > Enterprise SEO Audit', description:'Free enterprise SEO audit — lead capture landing page.',
        cls:[['Campaign','Q4 Enterprise SEO'],['Offer','Free audit'],['Industry','Technology'],['Target Countries','USA, UK']],
        seoMeta:[['Meta Title','Free Enterprise SEO Audit'],['Focus Keyword','enterprise seo audit'],['Keyword Intent','Transactional'],['Schema Type','WebPage'],['Robots','index, follow'],['Index Status','Scheduled']],
        blocks:[['Heading','H1','Get your free enterprise SEO audit'],['CTA','','Book my audit'],['FAQ','','4 questions']],
        rel:{Services:['SEO Services'],'Case Studies':['FinTech SEO']},
        internal:[],
        aiLinks:[['technical seo','/services/technical-seo','83'],['seo services','/services/seo','80']],
        media:[['Image','lp-hero.jpg','Landing hero','380 KB','1']],
        workflow:'Scheduled', publishDate:'Nov 5, 2024', expiry:'Dec 31, 2024', version:'v1.0',
        analytics:{traffic:'—',ctr:'—',pos:'—',bounce:'—',time:'—',conv:'—',backlinks:'2',speed:'1.7s'},
        activity:[['Bob Wilson','Scheduled for Nov 5','Oct 29, 2024'],['Karan Shah','SEO approved','Oct 28, 2024']] },
      { id:'PG-1005', name:'What is Technical SEO?', repo:'faq', type:'FAQ', topic:'Technical SEO', industry:'—', keyword:'what is technical seo', status:'Draft', seo:41, updated:'Oct 31, 2024', owner:'Carol Smith', reviewer:'—',
        slug:'faq/technical-seo', url:'/faq/technical-seo', parent:'FAQ', menuCat:'FAQ', menuOrder:9, breadcrumb:'Home > FAQ > Technical SEO', description:'FAQ entry explaining technical SEO.',
        cls:[['Topic','Technical SEO'],['Category','SEO Basics']],
        seoMeta:[['Meta Title','What is Technical SEO? | Beetloop'],['Focus Keyword','what is technical seo'],['Keyword Intent','Informational'],['Schema Type','FAQPage'],['Index Status','Not indexed']],
        blocks:[['Heading','H2','What is technical SEO?'],['Paragraph','','Technical SEO covers crawlability, speed and structure.']],
        rel:{Services:['Technical SEO'],Insights:['Core Web Vitals guide']},
        internal:[],
        aiLinks:[['core web vitals','/insights/cwv','75']],
        media:[],
        workflow:'Draft', publishDate:'—', expiry:'—', version:'v0.2',
        analytics:{traffic:'—',ctr:'—',pos:'—',bounce:'—',time:'—',conv:'—',backlinks:'0',speed:'—'},
        activity:[['Carol Smith','Created draft','Oct 31, 2024']] },
      { id:'PG-1006', name:'Beetloop Platform — Overview', repo:'product', type:'Product Page', topic:'Platform', industry:'SaaS', keyword:'marketing intelligence platform', status:'Published', seo:90, updated:'Oct 20, 2024', owner:'John Doe', reviewer:'Priya Nair',
        slug:'product/platform', url:'/product/platform', parent:'Product', menuCat:'Product', menuOrder:1, breadcrumb:'Home > Product > Platform', description:'The Beetloop marketing intelligence platform overview.',
        cls:[['Product Name','Beetloop Platform'],['Category','Marketing Intelligence'],['Industry','SaaS'],['Applications','SEO, Content, Analytics'],['Downloads','Product brochure']],
        seoMeta:[['Meta Title','Beetloop — Marketing Intelligence Platform'],['Focus Keyword','marketing intelligence platform'],['Keyword Intent','Commercial'],['Schema Type','Product'],['Index Status','Indexed']],
        blocks:[['Heading','H1','One platform for marketing intelligence'],['Gallery','','4 product screenshots'],['Button','','Start free trial']],
        rel:{Services:['SEO Services','Content Marketing'],Downloads:['Product brochure (PDF)'],Videos:['Product demo']},
        internal:[['content marketing','/services/content','Strong','88']],
        aiLinks:[['analytics','/product/analytics','85']],
        media:[['Gallery','product-shots','Product screenshots','2.1 MB','1'],['PDF','brochure.pdf','Product brochure','3.4 MB','8']],
        workflow:'Published', publishDate:'Oct 20, 2024', expiry:'—', version:'v3.1',
        analytics:{traffic:'8,700',ctr:'6.2%',pos:'2.4',bounce:'34%',time:'3m 40s',conv:'210',backlinks:'96',speed:'1.6s'},
        activity:[['John Doe','Published','Oct 20, 2024'],['Priya Nair','QC approved','Oct 19, 2024']] },
    ];
    return this._cpages;
  }

  allContentPages(){ return (this.state.cAdded||[]).slice().reverse().concat(this.CONTENT_PAGES()); }
  contentStatusTone(s){ return { Published:{bg:'var(--verify-100)',color:'var(--verify-600)'}, Draft:{bg:'var(--surface-50)',color:'var(--ink-500)'}, 'Under Review':{bg:'var(--warn-100)',color:'var(--warn-600)'}, 'SEO Review':{bg:'var(--info-100)',color:'var(--info-600)'}, Scheduled:{bg:'var(--orchid-100)',color:'var(--orchid-700)'}, Archived:{bg:'var(--surface-50)',color:'var(--ink-400)'} }[s]||{bg:'var(--surface-50)',color:'var(--ink-500)'}; }

  contentView(){
    const rk=this.state.roleKey;
    const canEdit = ['manager','admin','team_lead'].includes(rk);
    const repos=this.CONTENT_REPOS();
    const all=this.allContentPages();
    const cRepo=this.state.cRepo||'all', q=(this.state.cQuery||'').toLowerCase(), cStatus=this.state.cStatus||'All';
    const seoColor=(v)=> v>=80?'var(--verify-600)': v>=60?'var(--warn-600)':'var(--danger-600)';
    let list=all.filter(p=> (cRepo==='all'||p.repo===cRepo) && (cStatus==='All'||p.status===cStatus) && (!q || (p.name+' '+p.keyword+' '+p.topic).toLowerCase().includes(q)) );
    const repoName=(k)=>{ const r=repos.find(x=>x.key===k); return r?r.name:k; };
    // tree ordering: parents first, children indented beneath
    const inList={}; list.forEach(p=>inList[p.id]=true);
    const roots=list.filter(p=>!p.pid || !inList[p.pid]);
    const ordered=[]; const walk=(p,depth)=>{ ordered.push({p,depth}); list.filter(c=>c.pid===p.id).forEach(c=>walk(c,depth+1)); };
    roots.forEach(r=>walk(r,0));
    const byId={}; all.forEach(p=>byId[p.id]=p);
    const rows=ordered.map(({p,depth})=>{
      const st=this.contentStatusTone(p.status); const exp=(this.state.cExpanded||[]).includes(p.id);
      const isNew=(this.state.cAdded||[]).some(x=>x.id===p.id);
      const linked=(p.linkedIds||[]).filter(id=>byId[id]).map(id=>({ name:byId[id].name, isService:byId[id].repo==='service',
        icon: byId[id].repo==='service'?'briefcase':'lightbulb',
        open:(e)=>{ if(e)e.stopPropagation(); this.setState({ cOpen:id, cTab:0 }); } }));
      return { id:p.id, isNew, depth, indent:(depth*26)+'px', isChild:depth>0, linked, hasLinked:linked.length>0,
        name:p.name, repo:repoName(p.repo), type:p.type, topic:p.topic, industry:p.industry, keyword:p.keyword,
        status:p.status, statusBg:st.bg, statusColor:st.color, seo:p.seo, seoColor:seoColor(p.seo), updated:p.updated, owner:p.owner, reviewer:p.reviewer,
        metaTitle:(p.seoMeta.find(m=>m[0]==='Meta Title')||[])[1]||'—', metaDesc:(p.seoMeta.find(m=>m[0]==='Meta Description')||[])[1]||'—',
        relCount:Object.values(p.rel||{}).reduce((s,a)=>s+a.length,0), linkCount:(p.internal||[]).length,
        expanded:exp, chevron:exp?'chevron-down':'chevron-right',
        toggle:()=>this.setState({ cExpanded: exp?this.state.cExpanded.filter(x=>x!==p.id):[...(this.state.cExpanded||[]),p.id] }),
        open:(e)=>{ if(e)e.stopPropagation(); this.setState({ cOpen:p.id, cTab:0 }); },
      };
    });
    const cnt=(f)=>all.filter(f).length;
    const repoTabs=repos.map(r=>({ key:r.key, name:r.name, icon:r.icon, active:r.key===cRepo, count: r.key==='all'?all.length:all.filter(p=>p.repo===r.key).length,
      go:()=>this.setState({ cRepo:r.key, cExpanded:[] }),
      style:'display:flex;align-items:center;gap:9px;width:100%;text-align:left;border:none;cursor:pointer;padding:8px 10px;margin-bottom:2px;border-radius:9px;font-size:13px;font-weight:'+(r.key===cRepo?'700':'600')+';'+(r.key===cRepo?'background:var(--orchid-100);color:var(--beet-700)':'background:transparent;color:var(--ink-500)') }));
    return {
      contentRepoTabs:repoTabs, contentCanEdit:canEdit,
      contentKpis:[
        {label:'Total pages',value:String(all.length),color:'var(--beet-700)',icon:'files'},
        {label:'Published',value:String(cnt(p=>p.status==='Published')),color:'var(--verify-600)',icon:'check-circle-2'},
        {label:'Draft',value:String(cnt(p=>p.status==='Draft')),color:'var(--ink-500)',icon:'file-pen'},
        {label:'Scheduled',value:String(cnt(p=>p.status==='Scheduled')),color:'var(--orchid-600)',icon:'calendar-clock'},
        {label:'Avg SEO score',value:String(Math.round(all.reduce((s,p)=>s+p.seo,0)/all.length)),color:'var(--info-600)',icon:'gauge'},
        {label:'Missing metadata',value:String(cnt(p=>p.seo<60)),color:'var(--warn-600)',icon:'alert-triangle'},
      ],
      contentStatusFilter:this.state.cStatus||'All', contentOnStatus:e=>this.setState({cStatus:e.target.value}),
      contentQuery:this.state.cQuery||'', contentOnQuery:e=>this.setState({cQuery:e.target.value}),
      contentRepoLabel:repoName(cRepo), ...(()=>{ const pg=this.pgData('content',rows,8); return { contentRows:pg.rows, cPg:pg }; })(), contentEmpty:rows.length===0,
      contentNew:()=>canEdit?this.setState({ showNewPage:true, npTab:0, npLinks:[{anchor:'',target:''}], npMedia:[{name:'',alt:'',type:'Image'}], npForm:{ repo: cRepo==='all'?'service':cRepo } }):this.flash('View only for your role.'),
      contentAI:()=>this.setState({ route:'ideas' }),
      ...this.contentDetail(),
      ...this.newPageData(),
    };
  }

  newPageData(){
    const f=this.state.npForm||{};
    const repos=this.CONTENT_REPOS().filter(r=>r.key!=='all');
    const nextNum = 1000 + this.allContentPages().length + 1;
    const code = 'PG-'+nextNum;
    const slugify=(s)=> (s||'').toLowerCase().trim().replace(/[^a-z0-9\s-]/g,'').replace(/\s+/g,'-').replace(/-+/g,'-');
    const baseSlug = f.slug || slugify(f.name);
    const repoPath = { service:'/services/', insights:'/insights/', product:'/product/', career:'/careers/', landing:'/lp/', case:'/case-studies/', resource:'/resources/', faq:'/faq/', news:'/news/', home:'/' }[f.repo||'service'] || '/';
    const parentPage = f.pid ? this.allContentPages().find(p=>p.id===f.pid) : null;
    const base = parentPage ? (parentPage.url + '/') : repoPath;
    const url = baseSlug ? (base + baseSlug) : (base + '…');
    const set=(k)=>(e)=>this.setState({ npForm:{...this.state.npForm,[k]:e.target.value} });
    return {
      showNewPage:this.state.showNewPage, npCode:code,
      npRepos:repos.map(r=>({key:r.key,name:r.name})),
      npParentOptions:[{id:'',label:'None — top-level page'}].concat(this.allContentPages().map(p=>({ id:p.id, label:p.name+'  ·  '+p.url }))),
      npSetParentId:(e)=>this.setState({ npForm:{...this.state.npForm, pid:e.target.value} }),
      npParentUrl: parentPage ? parentPage.url : '',
      npHasParent: !!parentPage,
      npf:f, npSetRepo:set('repo'), npSetType:set('type'), npSetName:set('name'), npSetSlug:set('slug'), npSetKeyword:set('keyword'), npSetIndustry:set('industry'), npSetMetaTitle:set('metaTitle'), npSetMetaDesc:set('metaDesc'), npSetOwner:set('owner'), npSetReviewer:set('reviewer'),
      npSetSubService:set('subService'), npSetSector:set('sector'), npSetCountries:set('countries'), npSetParent:set('parent'), npSetMenuCat:set('menuCat'), npSetMenuOrder:set('menuOrder'), npSetSecondaryKw:set('secondaryKw'), npSetIntent:set('intent'), npSetSchema:set('schema'),
      npSetPrimaryKw:set('primaryKw'), npSetOgTitle:set('ogTitle'), npSetOgDesc:set('ogDesc'), npSetOgImage:set('ogImage'), npSetRobots:set('robots'),
      npTitleLen:((f.metaTitle||'').length)+'/60 characters', npTitleLenColor:(f.metaTitle||'').length>60?'var(--danger-600)':'var(--ink-400)',
      npDescLen:((f.metaDesc||'').length)+'/160 characters', npDescLenColor:(f.metaDesc||'').length>160?'var(--danger-600)':'var(--ink-400)',
      npSetIntro:set('intro'), npSetOverview:set('overview'), npSetCta:set('cta'), npSetMediaName:set('mediaName'), npSetMediaAlt:set('mediaAlt'), npSetPublishDate:set('publishDate'),
      npSetRelServiceId:(e)=>this.setState({ npForm:{...this.state.npForm, relServiceId:e.target.value} }),
      npSetRelInsightId:(e)=>this.setState({ npForm:{...this.state.npForm, relInsightId:e.target.value} }),
      npServiceOptions:[{id:'',label:'None'}].concat(this.allContentPages().filter(p=>p.repo==='service').map(p=>({ id:p.id, label:p.name+'  ·  '+p.url }))),
      npInsightOptions:[{id:'',label:'None'}].concat(this.allContentPages().filter(p=>p.repo==='insights'||p.repo==='case'||p.repo==='resource').map(p=>({ id:p.id, label:p.name+'  ·  '+p.url }))),
      npRelServiceUrl:(()=>{ const p=this.allContentPages().find(x=>x.id===f.relServiceId); return p?p.url:''; })(),
      npRelInsightUrl:(()=>{ const p=this.allContentPages().find(x=>x.id===f.relInsightId); return p?p.url:''; })(),
      npSetH2:set('h2'), npSetH2Body:set('h2body'), npSetH3:set('h3'), npSetH3Body:set('h3body'),
      npLinks:(this.state.npLinks&&this.state.npLinks.length?this.state.npLinks:[{anchor:'',target:'',ltype:'Internal'}]).map((l,i)=>{
        const upd=(k)=>(e)=>{ const arr=(this.state.npLinks&&this.state.npLinks.length?this.state.npLinks:[{anchor:'',target:'',ltype:'Internal'}]).slice(); arr[i]={...arr[i],[k]:e.target.value}; this.setState({npLinks:arr}); };
        return { anchor:l.anchor, target:l.target, ltype:l.ltype||'Internal', n:i+1,
          setAnchor:upd('anchor'), setTarget:upd('target'), setLtype:upd('ltype'),
          remove:()=>{ const arr=(this.state.npLinks||[]).slice(); arr.splice(i,1); this.setState({npLinks:arr.length?arr:[{anchor:'',target:'',ltype:'Internal'}]}); },
          canRemove:(this.state.npLinks||[]).length>1 };
      }),
      npAddLink:()=>this.setState({ npLinks:[...(this.state.npLinks&&this.state.npLinks.length?this.state.npLinks:[{anchor:'',target:'',ltype:'Internal'}]),{anchor:'',target:'',ltype:'Internal'}] }),
      npMedia:(this.state.npMedia&&this.state.npMedia.length?this.state.npMedia:[{name:'',alt:'',type:'Image'}]).map((m,i)=>({
        name:m.name, alt:m.alt, type:m.type||'Image', n:i+1,
        setName:(e)=>{ const arr=(this.state.npMedia&&this.state.npMedia.length?this.state.npMedia:[{name:'',alt:'',type:'Image'}]).slice(); arr[i]={...arr[i],name:e.target.value}; this.setState({npMedia:arr}); },
        setAlt:(e)=>{ const arr=(this.state.npMedia&&this.state.npMedia.length?this.state.npMedia:[{name:'',alt:'',type:'Image'}]).slice(); arr[i]={...arr[i],alt:e.target.value}; this.setState({npMedia:arr}); },
        setType:(e)=>{ const arr=(this.state.npMedia&&this.state.npMedia.length?this.state.npMedia:[{name:'',alt:'',type:'Image'}]).slice(); arr[i]={...arr[i],type:e.target.value}; this.setState({npMedia:arr}); },
        remove:()=>{ const arr=(this.state.npMedia||[]).slice(); arr.splice(i,1); this.setState({npMedia:arr.length?arr:[{name:'',alt:'',type:'Image'}]}); },
        canRemove:(this.state.npMedia||[]).length>1,
      })),
      npAddMedia:()=>this.setState({ npMedia:[...(this.state.npMedia&&this.state.npMedia.length?this.state.npMedia:[{name:'',alt:'',type:'Image'}]),{name:'',alt:'',type:'Image'}] }),
      npTabs:['Page Info','Classification','SEO','Content','Relationships','Links','Media','Publishing','Analytics','Activity'].map((t,i)=>({ label:t, go:()=>this.setState({npTab:i}), style:'flex:none;padding:9px 13px;border:none;background:none;border-bottom:2px solid '+(i===(this.state.npTab||0)?'var(--orchid-500)':'transparent')+';font-size:13px;font-weight:700;cursor:pointer;color:'+(i===(this.state.npTab||0)?'var(--beet-700)':'var(--ink-500)')+';margin-bottom:-1px;white-space:nowrap' })),
      npTab0:(this.state.npTab||0)===0, npTab1:this.state.npTab===1, npTab2:this.state.npTab===2, npTab3:this.state.npTab===3, npTab4:this.state.npTab===4, npTab5:this.state.npTab===5, npTab6:this.state.npTab===6, npTab7:this.state.npTab===7, npTab8:this.state.npTab===8, npTab9:this.state.npTab===9,
      npOwnerName: f.owner||this.currentPerson(), npToday:this.todayStr(),
      npNext:()=>this.setState({ npTab: Math.min(9,(this.state.npTab||0)+1) }),
      npBack:()=>this.setState({ npTab: Math.max(0,(this.state.npTab||0)-1) }),
      npNotLast:(this.state.npTab||0)<9, npNotFirst:(this.state.npTab||0)>0,
      npSlug:baseSlug, npUrl:url,
      closeNewPage:()=>this.setState({ showNewPage:false }),
      npAI:()=>this.flash('AI drafted meta title & description (demo).'),
      submitNewPageDraft:()=>this.submitNewPage(false),
      submitNewPageCreate:()=>this.submitNewPage(true),
    };
  }
  submitNewPage(activate){
    const f=this.state.npForm||{};
    if(!f.name || !f.name.trim()){ this.flash('Enter a page name.'); return; }
    const repo=f.repo||'service';
    const code='PG-'+(1000+this.allContentPages().length+1);
    const repoName=(this.CONTENT_REPOS().find(r=>r.key===repo)||{}).name;
    const name=f.name.trim();
    const slugify=(s)=> (s||'').toLowerCase().trim().replace(/[^a-z0-9\s-]/g,'').replace(/\s+/g,'-').replace(/-+/g,'-');
    const slug=f.slug||slugify(name);
    const repoPath={ service:'/services/', insights:'/insights/', product:'/product/', career:'/careers/', landing:'/lp/', case:'/case-studies/', resource:'/resources/', faq:'/faq/', news:'/news/', home:'/' }[repo]||'/';
    const parentPage = f.pid ? this.allContentPages().find(p=>p.id===f.pid) : null;
    const url = parentPage ? (parentPage.url+'/'+slug) : (repoPath+slug);
    const owner=f.owner||this.currentPerson(); const reviewer=f.reviewer||'—';
    const metaTitle=f.metaTitle||name; const metaDesc=f.metaDesc||'—';
    const seo = (f.metaTitle&&f.metaDesc)? (f.keyword?68:58) : (f.metaTitle||f.metaDesc?42:28);
    const today=this.todayStr();
    const page={
      id:code, name, repo, type:f.type||'Service Page', topic:f.keyword||'—', industry:f.industry||'—', keyword:f.keyword||'—',
      status: activate?'Under Review':'Draft', seo, updated:today, owner, reviewer,
      pid: f.pid||null, linkedIds: [f.relServiceId,f.relInsightId].filter(Boolean),
      slug, url, parent: parentPage?parentPage.name:(f.parent||repoName), menuCat:f.menuCat||repoName, menuOrder:parseInt(f.menuOrder,10)||0, breadcrumb: parentPage?(parentPage.breadcrumb+' > '+name):('Home > '+(f.parent||repoName)+' > '+name), description:metaDesc,
      cls: repo==='service'
        ? [['Service Category',f.industry||'General'],['Sub-Service',f.subService||'To be assigned'],['Primary Keyword',f.keyword||'—'],['Industry',f.industry||'—'],['Sector',f.sector||'—'],['Application Category','—'],['Target Countries',f.countries||'—']]
        : [['Topic',f.keyword||name],['Author',owner],['Content Type',f.type||'Article'],['Sector',f.sector||'—'],['Tags',f.keyword||'—'],['Target Countries',f.countries||'—'],['Related Services',f.subService||'—']],
      seoMeta:[['Meta Title',metaTitle],['Meta Description',metaDesc],['Primary Keywords',f.primaryKw||f.keyword||'—'],['Secondary Keywords',f.secondaryKw||'—'],['Keyword Intent',f.intent||'—'],['Canonical URL',url],['Schema Type', f.schema||(repo==='service'?'Service':'WebPage')],['Robots',f.robots||'Index, Follow'],['Index Status', activate?'Pending':'Not indexed'],['Hreflang','en-US'],['OG Title',f.ogTitle||metaTitle],['OG Description',f.ogDesc||metaDesc],['OG Image',f.ogImage||'—'],['Twitter Card','summary_large_image']],
      blocks:[['Heading','H1',name],['Paragraph','',f.intro||'Draft introduction — start writing this page.'],
        ['Heading','H2',f.h2||'Overview'],['Paragraph','',f.h2body||f.overview||('Add supporting content for '+(f.keyword||name)+'.')],
        ...(f.h3||f.h3body ? [['Heading','H3',f.h3||'Details'],['Paragraph','',f.h3body||'Add supporting detail.']] : []),
        ['CTA','',f.cta||'Add a call to action'],['FAQ','','Add frequently asked questions']],
      rel:(()=>{ const sv=this.allContentPages().find(p=>p.id===f.relServiceId); const iv=this.allContentPages().find(p=>p.id===f.relInsightId);
        return { Services:[sv?(sv.name+' ('+sv.url+')'):'Link a related service'], Insights:[iv?(iv.name+' ('+iv.url+')'):'Link a related article'] }; })(),
      internal: (()=>{ const ls=(this.state.npLinks||[]).filter(l=>l.anchor||l.target); return ls.length? ls.map(l=>[l.anchor||f.keyword||name.toLowerCase(), l.target||url, l.ltype||'Internal', '—']) : [[f.keyword||name.toLowerCase(), url, 'Internal', '—']]; })(),
      aiLinks:[['Run AI internal-link suggestions', '—', '—']],
      media:(()=>{ const ms=(this.state.npMedia||[]).filter(m=>m.name||m.alt); return ms.length? ms.map(m=>[m.type||'Image', m.name||'untitled', m.alt||'—','—','0']) : [['Image','hero-placeholder.jpg','Add a hero image · alt text','—','0']]; })(),
      workflow: activate?'Under Review':'Draft', publishDate:this.fmtDate(f.publishDate)||'—', expiry:'—', version:'v0.1',
      analytics:{traffic:'—',ctr:'—',pos:'—',bounce:'—',time:'—',conv:'—',backlinks:'0',speed:'—'},
      activity:[[owner, activate?'Submitted for review':'Created draft', today],[owner,'Page created — '+code, today]],
    };
    const next=[...(this.state.cAdded||[]), page];
    this.setState({ cAdded:next, showNewPage:false, npForm:{}, cRepo:repo, cStatus:'All', cQuery:'', cOpen:code, cTab:0 });
    try{ localStorage.setItem('beetloop_content_pages', JSON.stringify(next)); }catch(e){}
    this.flash('Page “'+name+'” created as '+code+' — added to '+repoName+' (top of list).');
  }

  // a service page is "targeted" when a campaign KPI links it
  targetedPages(){
    const map={};
    this.allCampaigns().forEach(c=>(c.kpis||[]).forEach(k=>(k.pages||[]).forEach(p=>{
      if(!p.url) return; map[p.url]=map[p.url]||{url:p.url,title:p.title||p.url,kpis:[],campaigns:[],expected:0};
      if(k.kpi&&map[p.url].kpis.indexOf(k.kpi)<0) map[p.url].kpis.push(k.kpi);
      if(map[p.url].campaigns.indexOf(c.name)<0) map[p.url].campaigns.push(c.name);
      map[p.url].expected+=this.cmpNum(p.contrib);
    })));
    return map;
  }
  // Leads/CRM pipeline isn't built in this phase — recorded-performance reconciliation
  // degrades to source's own "no visitor data recorded" fallback rather than crashing.
  SERVICE_PAGES(){ return []; }
  allLeads(){ return []; }
  PAGE_STAGES(mode){
    const all=[
      { stage:'Content draft', division:'Content', tpl:'Write Article', who:'Sameer Iyer', hrs:12, kpi:'Content Published', effort:'Service pages' },
      { stage:'Graphics & assets', division:'Graphics', tpl:'Create Reel', who:'Arjun Pillai', hrs:6, kpi:'Assets delivered', effort:'Banners / creatives' },
      { stage:'Web build', division:'Web', tpl:'Build Landing Page', who:'Rohit Sharma', hrs:8, kpi:'Pages shipped', effort:'Landing pages' },
      { stage:'SEO on-page', division:'SEO', tpl:'Update Meta Descriptions', who:'Aditi Rao', hrs:4, kpi:'On-page SEO score', effort:'On-page optimisation' },
      { stage:'Publish & QA', division:'Web', tpl:'Publish Page', who:'Rohit Sharma', hrs:2, kpi:'Pages shipped', effort:'Landing pages' },
    ];
    if(mode==='Revamp') return all.filter(s=>['Content draft','SEO on-page','Publish & QA'].includes(s.stage));
    return all;
  }
  pageWorkView(p){
    const rk=this.state.roleKey, who=this.currentPerson();
    const canRun=['manager','team_lead','admin'].includes(rk);
    const mode=(this.state.cwMode||{})[p.id]||'New page';
    const linked=this.allTasks().filter(t=>t.sourcePage===p.id);
    const approved=['QC Approved','Scheduled','Published'].includes(p.workflow)||!!(this.state.cwApproved||{})[p.id];
    const stages=this.PAGE_STAGES(mode);
    const kpiTargets=this.targetedPages()[p.url]||null;
    const done=linked.filter(t=>['Approved','Closed'].includes(t.status)).length;
    return {
      cwMode:mode, cwCanRun:canRun,
      cwModeBtns:['New page','Revamp'].map(m=>({ label:m==='New page'?'New page build':'Revamp existing content', active:mode===m,
        style:'padding:7px 13px;border-radius:999px;font-size:11.5px;font-weight:700;cursor:pointer;border:1px solid '+(mode===m?'var(--beet-700)':'var(--line-300)')+';background:'+(mode===m?'var(--beet-700)':'#fff')+';color:'+(mode===m?'#fff':'var(--ink-700)'),
        set:()=>this.setState({ cwMode:{...(this.state.cwMode||{}),[p.id]:m} }) })),
      cwApproved:approved,
      cwApproveLabel:approved?'Brief approved':'Approve brief for production',
      cwApprove:()=>{ this.setState({ cwApproved:{...(this.state.cwApproved||{}),[p.id]:true} });
        this.flash('Brief approved for '+p.id+' — production tasks can now be generated.'); },
      cwStages:stages.map((s,i)=>{
        const t=linked.find(x=>x.stage===s.stage);
        const tn=t?this.tkTone(t.status):{bg:'var(--surface-50)',c:'var(--ink-500)'};
        return { n:String(i+1), stage:s.stage, division:s.division, who:s.who, hrs:s.hrs+' h', kpi:s.kpi, effort:s.effort,
          has:!!t, id:t?t.id:'—', status:t?t.status:'Not generated', bg:tn.bg, color:tn.c,
          dep:i===0?'Starts the chain':('After '+stages[i-1].stage),
          open:t?(()=>this.setState({ cOpen:null, route:'tasks', tkOpen:t.id })):(()=>this.flash('Generate production tasks first.')) };
      }),
      cwLinkedCount:linked.length?(done+' of '+linked.length+' stages complete'):'No tasks generated yet',
      cwProgressW:linked.length?Math.round(done/linked.length*100)+'%':'0%',
      cwHasTasks:linked.length>0,
      cwKpiNote:kpiTargets
        ? ('Targeted by KPI: '+(kpiTargets.kpis.join(', ')||'—')+(kpiTargets.campaigns.length?(' · '+kpiTargets.campaigns[0]):'')+(kpiTargets.expected?(' · expected '+kpiTargets.expected):''))
        : 'This page is not linked to a campaign KPI yet — add it as a targeted page so traffic and leads roll up.',
      cwKpiLinked:!!kpiTargets,
      cwOpenKpi:()=>this.setState({ cOpen:null, route:'campaigns' }),
      cwGenerate:()=>{
        if(!approved){ this.flash('Approve the brief before generating production tasks.'); return; }
        if(linked.length){ this.flash('Tasks already generated for '+p.id+' — open them in Tasks.'); return; }
        const base=this.allTasks().length;
        const added=stages.map((s,i)=>({
          id:'TSK-'+(3200+base+i), name:s.stage+' — '+p.name, desc:mode+' production for '+p.url+'.',
          template:s.tpl, project:'—', campaign:(kpiTargets&&kpiTargets.campaigns[0])||'—',
          start:this.relDate(i*2), end:this.relDate(i*2+2), priority:'High', assignee:s.who,
          kpiId:'', kpi:s.kpi, units:1, unit:'pages', estH:s.hrs, actH:0, recurrence:'None',
          reviewer:'Farhan Ali', effortPlan:'Auto — from '+p.id, effortType:s.effort,
          depMode:'Sequential', dep:i===0?'—':(s.stage?('TSK-'+(3200+base+i-1)):'—'),
          division:s.division, stage:s.stage, sourcePage:p.id, sourcePageUrl:p.url,
          checklist:[{t:'Work complete',done:false},{t:'Evidence attached',done:false},{t:'Compliance checklist filled',done:false}],
          evidence:[], status:i===0?'Assigned':'Assigned',
          activity:[[who,'Generated from '+p.id+' ('+mode+' chain, stage '+(i+1)+' of '+stages.length+')',this.todayStr()]] }));
        this.setState({ tkAdded:[...(this.state.tkAdded||[]),...added] });
        this.flash(added.length+' sequential tasks generated for '+p.id+' — Content → '+(mode==='Revamp'?'SEO → Publish':'Graphics → Web → SEO → Publish')+', each with QC and effort linkage.');
      },
      cwOpenTasks:()=>this.setState({ cOpen:null, route:'tasks', tkQuery:p.id }),
    };
  }
  contentDetail(){
    const id=this.state.cOpen; if(!id) return { contentOpen:false };
    const p=this.allContentPages().find(x=>x.id===id); if(!p) return { contentOpen:false };
    const tab=this.state.cTab||0;
    const st=this.contentStatusTone(p.status);
    const tabs=['Page Info','Classification','SEO','Content','Relationships','Internal Links','Media','Publishing','Analytics','Activity'];
    const wf=['Draft','Under Review','SEO Review','QC Approved','Scheduled','Published','Archived'];
    const wfIdx=wf.indexOf(p.workflow); const activeWf=wfIdx<0?0:wfIdx;
    return {
      contentOpen:true, cd_name:p.name, cd_id:p.id, cd_url:p.url, cd_status:p.status, cd_statusBg:st.bg, cd_statusColor:st.color,
      cd_tabs:tabs.map((t,i)=>({ label:t, active:i===tab, go:()=>this.setState({cTab:i}), style:'flex:none;padding:9px 13px;border:none;background:none;border-bottom:2px solid '+(i===tab?'var(--orchid-500)':'transparent')+';font-size:13px;font-weight:700;cursor:pointer;color:'+(i===tab?'var(--beet-700)':'var(--ink-500)')+';margin-bottom:-1px;white-space:nowrap' })),
      cd_tab:tab, cd_tab0:tab===0,cd_tab1:tab===1,cd_tab2:tab===2,cd_tab3:tab===3,cd_tab4:tab===4,cd_tab5:tab===5,cd_tab6:tab===6,cd_tab7:tab===7,cd_tab8:tab===8,cd_tab9:tab===9,
      cd_info:[['Repository',this.CONTENT_REPOS().find(r=>r.key===p.repo).name],['Page Type',p.type],['Page Name',p.name],['URL Slug',p.slug],['Page URL',p.url],['Parent Page',p.parent],['Menu Category',p.menuCat],['Menu Order',String(p.menuOrder)],['Breadcrumb',p.breadcrumb],['Status',p.status],['Description',p.description]].map(x=>({k:x[0],v:x[1]})),
      cd_cls:p.cls.map(x=>({k:x[0],v:x[1]})), cd_isService:p.repo==='service',
      cd_seo:p.seoMeta.map(x=>({k:x[0],v:x[1]})), cd_seoScore:p.seo, cd_seoColor: p.seo>=80?'var(--verify-600)':p.seo>=60?'var(--warn-600)':'var(--danger-600)',
      cd_blocks:p.blocks.map((b,i)=>{ const type=b[0], level=b[1], text=b[2];
        const hSize={H1:'27px',H2:'21px',H3:'18px',H4:'16px',H5:'14px'}[level]||'20px';
        return { n:i+1, type, level, text,
          isHeading:type==='Heading', isPara:type==='Paragraph', isImage:type==='Image'||type==='Gallery', isCTA:type==='CTA'||type==='Button', isFAQ:type==='FAQ'||type==='Accordion', isTable:type==='Table'||type==='Comparison Table', isQuote:type==='Quote', isMisc:!['Heading','Paragraph','Image','Gallery','CTA','Button','FAQ','Accordion','Table','Comparison Table','Quote'].includes(type),
          hSize, hWeight: level==='H1'?'800':'700', icon:{Image:'image',Gallery:'images',CTA:'megaphone',Button:'square-mouse-pointer',FAQ:'circle-help',Accordion:'chevrons-up-down',Table:'table',Video:'clapperboard',Checklist:'list-checks',Quote:'quote',Download:'download',Code:'code','Comparison Table':'columns-3'}[type]||'square' };
      }),
      cdPreview: !!this.state.cdPreview, cdEditorMode: !this.state.cdPreview,
      cdSetEditor:()=>this.setState({cdPreview:false}), cdSetPreview:()=>this.setState({cdPreview:true}),
      cdEditorStyle:'display:flex;align-items:center;gap:6px;padding:6px 13px;border:none;border-radius:8px;font-size:12.5px;font-weight:700;cursor:pointer;'+(!this.state.cdPreview?'background:#fff;color:var(--beet-700);box-shadow:var(--shadow-xs)':'background:none;color:var(--ink-500)'),
      cdPreviewStyle:'display:flex;align-items:center;gap:6px;padding:6px 13px;border:none;border-radius:8px;font-size:12.5px;font-weight:700;cursor:pointer;'+(this.state.cdPreview?'background:#fff;color:var(--beet-700);box-shadow:var(--shadow-xs)':'background:none;color:var(--ink-500)'),
      cd_rel:Object.entries(p.rel||{}).map(([k,v])=>({ group:k, items:v })),
      cd_internal:(p.internal||[]).map(l=>({ anchor:l[0], target:l[1], strength:l[2], score:l[3] })),
      cd_ai:(p.aiLinks||[]).map(l=>({ anchor:l[0], target:l[1], score:l[2] })),
      cd_media:(p.media||[]).map(m=>({ type:m[0], name:m[1], alt:m[2], size:m[3], usage:m[4] })),
      cd_mediaEmpty:(p.media||[]).length===0,
      cd_wf:wf.map((w,i)=>({ label:w, done:i<activeWf, active:i===activeWf,
        dotBg: i<activeWf?'var(--verify-500)':(i===activeWf?'var(--orchid-500)':'var(--line-300)'),
        color: i<=activeWf?'var(--ink-900)':'var(--ink-400)' })),
      cd_pub:[['Owner',p.owner],['Reviewer',p.reviewer],['Approver',p.reviewer],['Publish Date',p.publishDate],['Expiry / review due',p.expiry],['Version',p.version],['Menu order',String(p.menuOrder)],['Breadcrumb',p.breadcrumb]].map(x=>({k:x[0],v:x[1]})),
      cd_analytics:[['Organic Traffic',p.analytics.traffic],['CTR',p.analytics.ctr],['Avg Position',p.analytics.pos],['Bounce Rate',p.analytics.bounce],['Time on Page',p.analytics.time],['Conversions',p.analytics.conv],['Backlinks',p.analytics.backlinks],['Page Speed',p.analytics.speed]].map(x=>({k:x[0],v:x[1]})),
      cd_activity:(p.activity||[]).map(a=>({ who:a[0], action:a[1], date:a[2] })),
      // page analytics reconciled with recorded lead/visitor data for the same URL
      ...(()=>{
        const svc=this.SERVICE_PAGES().find(s=>s.url===p.url);
        const leads=svc?this.allLeads().filter(l=>l.service===svc.name):[];
        if(!leads.length) return { cd_liveHas:false, cd_liveNote:'No visitor or lead entries recorded against this URL yet — figures below are the last imported analytics snapshot.' };
        const vis=leads.reduce((s,l)=>s+(parseInt(l.visitors,10)||0),0);
        const ld=leads.reduce((s,l)=>s+(parseInt(l.count,10)||0),0);
        const q=leads.reduce((s,l)=>s+(parseInt(l.qualified,10)||0),0);
        const snap=parseInt(String(p.analytics.traffic).replace(/[^0-9]/g,''),10)||0;
        return { cd_liveHas:true,
          cd_live:[['Visitors (recorded)',vis.toLocaleString('en-IN')],['Leads',String(ld)],['Qualified',String(q)],
            ['Conversion rate',vis?((Math.round(ld/vis*1000)/10)+'%'):'—'],['Entries',String(leads.length)],
            ['Snapshot traffic',p.analytics.traffic]].map(x=>({k:x[0],v:x[1]})),
          cd_liveNote:'Recorded from daily lead entries against this service page.',
          cd_liveWarn:snap>0&&vis>0&&Math.abs(snap-vis)/Math.max(snap,vis)>0.25,
          cd_liveWarnMsg:'Snapshot traffic ('+p.analytics.traffic+') differs from recorded visitors ('+vis.toLocaleString('en-IN')+') by more than 25% — reconcile the analytics import.' }; })(),
      ...this.pageWorkView(p),
      closeContent:()=>this.setState({cOpen:null}),
      contentAINote:()=>this.flash('AI suggestion accepted (demo).'),
    };
  }

  okrBulkAct(name){ return ()=>{ const n=this.state.okrSelected.length; this.setState({ okrSelected:[] }); this.flash(name+' '+n+' OKR'+(n===1?'':'s')); }; }

  okrView(){
    const rk = this.state.roleKey;
    const canEdit = ['manager','admin'].includes(rk);
    const all = this.OKR_DATA();
    const F = this.state.okrFilters;
    const fq=F.kpiFreq||'All', dueF=F.due||'All';
    const dueMatch=(o)=>{ if(dueF==='All') return true; if(dueF==='Overdue') return o.daysLeft<0&&o.status!=='Completed'; if(dueF==='Due this week') return o.daysLeft>=0&&o.daysLeft<=7; if(dueF==='Due this month') return o.daysLeft>=0&&o.daysLeft<=31; if(dueF==='Due this quarter') return o.daysLeft>=0&&o.daysLeft<=92; return true; };
    const list = all.filter(o=> (F.dept==='All'||o.dept===F.dept) && (F.status==='All'||o.status===F.status) && (F.brand==='All'||o.brand===F.brand) && (F.priority==='All'||this.okrPriority(o).label===F.priority) && ((F.scope||'All')==='All'||o.scope===F.scope) && (fq==='All'||o.krs.some(k=>k.freq===fq)) && dueMatch(o) );
    const allKrs=all.reduce((a,o)=>a.concat(o.krs),[]);
    const freqCount=(f)=>allKrs.filter(k=>k.freq===f).length;
    const kpiFreqChips=['All','Daily','Weekly','Monthly','Quarterly','Yearly'].map(f=>{ const active=fq===f; const n=f==='All'?allKrs.length:freqCount(f); return {
      label:(f==='All'?'Total KPIs this year':f), count:String(n), active,
      style:'display:flex;align-items:center;gap:7px;padding:7px 13px;border-radius:999px;font-size:12px;font-weight:700;cursor:pointer;border:1px solid '+(active?'var(--beet-700)':'var(--line-300)')+';background:'+(active?'var(--beet-700)':'#fff')+';color:'+(active?'#fff':'var(--ink-700)'),
      countStyle:'font-size:11px;font-weight:800;padding:1px 8px;border-radius:999px;background:'+(active?'rgba(255,255,255,.2)':'var(--orchid-100)')+';color:'+(active?'#fff':'var(--orchid-700)'),
      set:()=>this.setState({ okrFilters:{...F, kpiFreq:f} }),
    };});
    const scopeTone=(s)=>({ Organization:{bg:'var(--beet-700)',c:'#fff'}, Department:{bg:'var(--info-100)',c:'var(--info-600)'}, Individual:{bg:'var(--verify-100)',c:'var(--verify-600)'} }[s]||{bg:'var(--surface-50)',c:'var(--ink-500)'});
    const tone = (s)=>({ 'In Progress':{bg:'var(--info-100)',color:'var(--info-600)'}, 'Draft':{bg:'var(--surface-50)',color:'var(--ink-500)'}, 'Completed':{bg:'var(--verify-100)',color:'var(--verify-600)'}, 'At Risk':{bg:'var(--warn-100)',color:'var(--warn-600)'}, 'Archived':{bg:'var(--orchid-100)',color:'var(--orchid-700)'}, 'Active':{bg:'var(--info-100)',color:'var(--info-600)'} }[s]||{bg:'var(--surface-50)',color:'var(--ink-500)'});
    const pc = (p)=> p>=70?'var(--verify-500)': p>=40?'var(--warn-500)':'var(--danger-500)';
    const sel = this.state.okrSelected;
    const rows = list.map(o=>{
      const expanded = this.state.okrExpanded.includes(o.id);
      const tS = tone(o.status);
      const cat = this.okrCategoryTone(o.category);
      const pri = this.okrPriority(o);
      const health = this.okrHealth(o);
      const due = this.okrDue(o);
      const checked = sel.includes(o.id);
      return {
        id:o.id, title:o.title, code:o.code, ver:o.v, krCount:o.krs.length+' KRs', owner:o.owner, team:o.team, cycle:o.cycle, due:o.due,
        brand:o.brand, dept:o.dept, campaign:o.campaign, reviewer:o.reviewer,
        scope:o.scope||'Department', scopeBg:scopeTone(o.scope).bg, scopeColor:scopeTone(o.scope).c,
        openDetail:()=>this.setState({ okrOpen:o.id }),
        category:o.category, catBg:cat.bg, catColor:cat.color,
        priority:pri.label, priDot:pri.dot, priColor:pri.color,
        healthLabel:health.label, healthColor:health.color, healthBg:health.bg, healthDot:health.dot,
        dueLabel:due.label, dueColor:due.color,
        progress:o.progress, progressColor:pc(o.progress), progressW:o.progress+'%',
        status:o.status, statusBg:tS.bg, statusColor:tS.color,
        expanded, chevron: expanded?'chevron-down':'chevron-right',
        checked, checkBg: checked?'#7A1C46':'#fff', checkBorder: checked?'#7A1C46':'var(--line-300)', checkIconOpacity: checked?'1':'0',
        toggleSel:(e)=>{ if(e)e.stopPropagation(); this.setState({ okrSelected: checked?sel.filter(x=>x!==o.id):[...sel,o.id] }); },
        toggle:(e)=>{ if(e)e.stopPropagation(); this.setState({ okrExpanded: expanded?this.state.okrExpanded.filter(x=>x!==o.id):[...this.state.okrExpanded,o.id] }); },
        menuOpen: this.state.okrMenu===o.id,
        toggleMenu:(e)=>{ if(e)e.stopPropagation(); this.setState({ okrMenu: this.state.okrMenu===o.id?null:o.id }); },
        viewAct:(e)=>{ if(e)e.stopPropagation(); this.setState({ okrMenu:null, okrOpen:o.id }); },
        editAct:(e)=>{ if(e)e.stopPropagation(); this.setState({ okrMenu:null }); this.openOkrEdit(o.id); },
        cloneAct:(e)=>{ if(e)e.stopPropagation(); this.setState({ okrMenu:null,
            okrAdded:[...(this.state.okrAdded||[]), { ...o, id:'okr-local-'+Date.now(), code:o.code+'-COPY', v:'v1.0', title:o.title+' (Copy)', status:'Draft', progress:0 }] });
          this.flash('Cloned "'+o.title+'" as a new draft.'); },
        archiveAct:(e)=>{ if(e)e.stopPropagation(); this.setState({ okrMenu:null,
            okrUpd:{...(this.state.okrUpd||{}), [o.id]:{...(this.state.okrUpd||{})[o.id], status:'Archived'}} });
          this.flash('Archived "'+o.title+'".'); },
        histAct:(e)=>{ if(e)e.stopPropagation(); this.setState({ okrMenu:null, historyOkr:o.id }); },
        isManagerReviewer: rk==='manager'||rk==='admin', isExecReviewer: rk==='ceo'||rk==='coo',
        reviewAct:(e)=>{ if(e)e.stopPropagation(); this.openCi('manager',{id:o.id,title:o.title,progress:o.progress+'%'}); },
        commentAct:(e)=>{ if(e)e.stopPropagation(); this.openCi('exec',{id:o.id,title:o.title,progress:o.progress+'%'}); },
        krs:o.krs.map((k,i)=>{ const ks=tone(k.status); const ach=Math.min(999,Math.round((parseFloat(String(k.current).replace(/,/g,''))/parseFloat(String(k.target).replace(/,/g,'')))*100)); return { n:i+1, t:k.t, kpi:k.kpi, baseline:k.baseline, target:k.target, current:k.current, unit:k.unit, ach:ach+'%', achColor:pc(ach), weight:k.weight+'%', who:k.who, due:k.due, status:k.status, statusBg:ks.bg, statusColor:ks.color }; }),
      };
    });
    const totalKRs = list.reduce((s,o)=>s+o.krs.length,0);
    const avg = list.length?Math.round(list.reduce((s,o)=>s+o.progress,0)/list.length):0;
    const onTrack = list.length?Math.round(list.filter(o=>o.progress>=50).length/list.length*100):0;
    // create-panel data
    const steps = [['okrA','A','Objective details'],['okrB','B','Scope & classification'],['okrC','C','Timeline'],['okrD','D','Key results'],['okrE','E','Alignment'],['okrF','F','Progress & source'],['okrG','G','Review & governance'],['okrH','H','Risk & assumptions'],['okrI','I','Audit']];
    const cur = this.state.okrSection;
    const okrSteps = steps.map(([id,letter,name])=>{ const active=id===cur; return { id, letter, name, label:letter+' · '+name,
      go:(e)=>{ if(e)e.preventDefault(); this.setState({ okrSection:id }); const el=document.getElementById(id); if(el){ const sc=el.closest('.blscroll'); if(sc) sc.scrollTo({ top: el.offsetTop - 20, behavior:'smooth' }); } },
      navStyle:'display:flex;align-items:center;gap:10px;padding:9px 10px;margin-bottom:2px;border-radius:10px;font-size:13px;font-weight:'+(active?'700':'600')+';text-decoration:none;'+(active?'background:var(--orchid-100);color:var(--beet-700)':'color:var(--ink-500)'),
      badgeBg: active?'var(--beet-700)':'var(--surface-50)', badgeColor: active?'#fff':'var(--ink-500)' }; });
    const reg = this.MASTERS_REG();
    const kpiOptions = reg.kpi.rows.map(r=>({ label:r.KPI+' ('+r.Unit+')' })).concat(this.allKpiTemplates().filter(t=>t.status==='Active').map(t=>({ label:t.name+' ('+t.unit+') — Template' })));
    // KR drafts cover the core fields (KPI, baseline/target/current, owner, weight).
    // Source's richer per-KR tool/target-source picker and multi-task/effort link
    // arrays are out of scope for this pass — tasks/effort still link to a KR via
    // its KPI name (see epGenerate/effortView), so linkage isn't lost, just less
    // granular to configure from this form.
    const drafts = this.state.okrDraftKRs;
    const wTotal = drafts.reduce((s,k)=>s+(parseInt(k.weight,10)||0),0);
    const wOk = wTotal===100;
    const setDraft=(id,field)=>(e)=>{ const v=e.target.value; this.setState({ okrDraftKRs:this.state.okrDraftKRs.map(x=>x.id===id?{...x,[field]:v}:x) }); };
    const okrDraftKRs = drafts.map((k,i)=>({ n:i+1, weight:k.weight, kr:k.kr||'', kpiSel:k.kpiSel||'', unit:k.unit||'', baseline:k.baseline||'', target:k.target||'', current:k.current||'', who:k.who||'',
      setKr:setDraft(k.id,'kr'), setKpiSel:setDraft(k.id,'kpiSel'), setUnit:setDraft(k.id,'unit'), setBaseline:setDraft(k.id,'baseline'), setTarget:setDraft(k.id,'target'), setCurrent:setDraft(k.id,'current'), setWho:setDraft(k.id,'who'),
      setWeight:(e)=>{ const v=e.target.value; this.setState({ okrDraftKRs:this.state.okrDraftKRs.map(x=>x.id===k.id?{...x,weight:v}:x) }); },
      remove:()=>{ if(this.state.okrDraftKRs.length>1) this.setState({ okrDraftKRs:this.state.okrDraftKRs.filter(x=>x.id!==k.id) }); } }));
    const okrTpls=this.allOkrTemplates().filter(t=>t.status==='Active');
    const okrTplOptions=[{id:'',label:'— Start from an OKR template (optional) —'}].concat(okrTpls.map(t=>({ id:t.id, label:t.name+' · '+t.division+' ('+t.krs.length+' KRs)' })));
    const okrTplPick=(e)=>{ const id=e.target.value; if(!id){ this.setState({ okrTpl:'' }); return; } const t=okrTpls.find(x=>x.id===id); if(!t) return;
      this.setState({ okrTpl:id, okrDraftKRs:t.krs.map((k,i)=>({ id:i+1, kr:k.t, kpiSel:k.kpi, unit:k.unit, baseline:'0', target:k.target, current:'0', weight:k.weight })), okrKRSeq:t.krs.length+1 });
      this.flash('Template "'+t.name+'" applied — key results pre-filled, adjust targets & weights.'); };
    const cntActive = all.filter(o=>o.status==='Active').length;
    const cntRisk = all.filter(o=>this.okrHealth(o).label==='At Risk'||this.okrHealth(o).label==='Off Track').length;
    const cntDone = all.filter(o=>o.status==='Completed').length;
    const cntOverdue = all.filter(o=>o.daysLeft<0 && o.status!=='Completed').length;
    const cntReview = all.filter(o=>o.daysLeft>=0 && o.daysLeft<=7 && o.status!=='Completed').length;
    const avgAch = Math.round(all.reduce((s,o)=>s+o.progress,0)/all.length);
    const setF = (k)=>(e)=>this.setState({ okrFilters:{...this.state.okrFilters,[k]:e.target.value} });
    const depts = ['All',...Array.from(new Set(all.map(o=>o.dept)))];
    const brands = ['All',...Array.from(new Set(all.map(o=>o.brand)))];
    return {
      okrStats:[
        {label:'Active OKRs',value:String(cntActive),color:'var(--info-600)',icon:'circle-dot'},
        {label:'At risk',value:String(cntRisk),color:'var(--warn-600)',icon:'alert-triangle'},
        {label:'Overdue',value:String(cntOverdue),color:'var(--danger-600)',icon:'clock-alert'},
        {label:'Completed',value:String(cntDone),color:'var(--verify-600)',icon:'check-circle-2'},
        {label:'Avg achievement',value:avgAch+'%',color:'var(--beet-700)',icon:'gauge'},
        {label:'Upcoming reviews',value:String(cntReview),color:'var(--orchid-600)',icon:'calendar-clock'},
      ],
      okrFilters:[
        {label:'Department',value:F.dept,onChange:setF('dept'),options:depts},
        {label:'Brand',value:F.brand,onChange:setF('brand'),options:brands},
        {label:'Status',value:F.status,onChange:setF('status'),options:['All','Active','At Risk','Completed','Draft']},
        {label:'Priority',value:F.priority,onChange:setF('priority'),options:['All','Critical','High','Medium']},
        {label:'Scope',value:F.scope||'All',onChange:setF('scope'),options:['All','Organization','Department','Individual']},
        {label:'KPI frequency',value:fq,onChange:setF('kpiFreq'),options:['All','Daily','Weekly','Monthly','Quarterly','Yearly']},
        {label:'Date & day',value:dueF,onChange:setF('due'),options:['All','Overdue','Due this week','Due this month','Due this quarter']},
      ],
      kpiFreqChips,
      okrResetFilters:()=>this.setState({ okrFilters:{dept:'All',status:'All',priority:'All',brand:'All',scope:'All',kpiFreq:'All',due:'All'} }),
      okrSelCount:sel.length, okrHasSel:sel.length>0,
      okrClearSel:()=>this.setState({ okrSelected:[] }),
      okrBulkReviewer:this.okrBulkAct('Assigned reviewer to'), okrBulkOwner:this.okrBulkAct('Changed owner for'), okrBulkArchive:this.okrBulkAct('Archived'), okrBulkExport:this.okrBulkAct('Exported'),
      ...(()=>{ const pg=this.pgData('okr',rows,6); return { okrRows:pg.rows, okrPg:pg }; })(), okrCanEdit:canEdit, okrEmpty:rows.length===0,
      okrNew:()=>{ if(canEdit) this.setState({ showOkrPanel:true, okrSection:'okrA', okrEditId:null, okrForm:{ title:'', desc:'', owner:(this.state.users&&this.state.users[0]?this.state.users[0].name:''), dept:'SEO', brand:'Beetloop', category:'SEO', scope:'Department', priority:'Medium', cycle:'Q1 2026', reviewFreq:'Weekly', start:'', end:'', parent:'None (top level)', dependsOn:'', effortTargets:'', progressCalc:'Automatic (from KPI logs)', dataSource:'GA4', reviewer:this.OKR_REVIEWERS()[0], status:'Draft', risks:'' } }); else this.flash('Only Managers and Admin can create OKRs.'); },
      showOkrPanel:this.state.showOkrPanel, closeOkr:()=>this.setState({ showOkrPanel:false, okrEditId:null }),
      okrIsEdit:!!this.state.okrEditId, okrPanelTitle:this.state.okrEditId?'Edit OKR':'Create new OKR', okrSaveLabel:this.state.okrEditId?'Save changes':'Save & activate',
      ...(()=>{ const er=this.state.okrEditId?all.find(x=>x.id===this.state.okrEditId):null;
        return { okrPanelCode:er?er.code:('OKR-'+(this.ROLES[rk].bucket==='admin'?'GEN':'SEO')+'-Q1-'+String(list.length+1).padStart(3,'0')), okrPanelVerBadge:er?(er.status+' · '+(er.v||'v1.0')):'Draft · v1.0' }; })(),
      okrForm:this.state.okrForm,
      okrSetTitle:e=>this.setState({ okrForm:{...this.state.okrForm, title:e.target.value} }),
      okrSetDesc:e=>this.setState({ okrForm:{...this.state.okrForm, desc:e.target.value} }),
      okrSetOwner:e=>this.setState({ okrForm:{...this.state.okrForm, owner:e.target.value} }),
      okrOwnerOptions:(this.state.users||[]).map(u=>u.name),
      okrSetDept:e=>this.setState({ okrForm:{...this.state.okrForm, dept:e.target.value} }),
      okrSetBrand:e=>this.setState({ okrForm:{...this.state.okrForm, brand:e.target.value} }),
      okrSetCampaign:e=>{ const v=e.target.value; this.setState({ okrForm:{...this.state.okrForm, campaign: v==='— None —'?'':v} }); },
      okrSetCategory:e=>this.setState({ okrForm:{...this.state.okrForm, category:e.target.value} }),
      okrSetScope:e=>this.setState({ okrForm:{...this.state.okrForm, scope:e.target.value} }),
      okrSetPriority:e=>this.setState({ okrForm:{...this.state.okrForm, priority:e.target.value} }),
      okrSetCycle:e=>this.setState({ okrForm:{...this.state.okrForm, cycle:e.target.value} }),
      okrSetReviewFreq:e=>this.setState({ okrForm:{...this.state.okrForm, reviewFreq:e.target.value} }),
      okrSetStart:e=>this.setState({ okrForm:{...this.state.okrForm, start:e.target.value} }),
      okrSetEnd:e=>this.setState({ okrForm:{...this.state.okrForm, end:e.target.value} }),
      okrSetParent:e=>this.setState({ okrForm:{...this.state.okrForm, parent:e.target.value} }),
      okrSetDependsOn:e=>this.setState({ okrForm:{...this.state.okrForm, dependsOn:e.target.value} }),
      okrSetEffortTargets:e=>this.setState({ okrForm:{...this.state.okrForm, effortTargets:e.target.value} }),
      okrSetProgressCalc:e=>this.setState({ okrForm:{...this.state.okrForm, progressCalc:e.target.value} }),
      okrSetDataSource:e=>this.setState({ okrForm:{...this.state.okrForm, dataSource:e.target.value} }),
      okrSetReviewer:e=>this.setState({ okrForm:{...this.state.okrForm, reviewer:e.target.value} }),
      okrSetStatus:e=>this.setState({ okrForm:{...this.state.okrForm, status:e.target.value} }),
      okrSetRisks:e=>this.setState({ okrForm:{...this.state.okrForm, risks:e.target.value} }),
      okrReviewerOptions:this.OKR_REVIEWERS(),
      saveOkr:()=>this._saveOkr(true, wOk, wTotal, list.length, rk),
      saveOkrDraft:()=>this._saveOkr(false, wOk, wTotal, list.length, rk),
      okrSteps, kpiOptions, okrDraftKRs,
      okrTplOptions, okrTplPick, okrTplVal:this.state.okrTpl||'',
      okrTaskOptions:this.allTasks().slice(0,10).map(t=>t.id+' — '+t.name),
      okrEffortOptions:this.allEpPlans().map(p=>p.name+' ('+p.division+')'),
      okrAddKR:()=>this.setState({ okrDraftKRs:[...this.state.okrDraftKRs,{id:this.state.okrKRSeq,weight:'0'}], okrKRSeq:this.state.okrKRSeq+1 }),
      okrWeightTotal:wTotal, okrWeightBg: wOk?'var(--verify-100)':'var(--warn-100)', okrWeightColor: wOk?'var(--verify-600)':'var(--warn-600)',
      okrNewCode:'OKR-'+(this.ROLES[rk].bucket==='admin'?'GEN':'SEO')+'-Q1-'+String(list.length+1).padStart(3,'0'),
      okrAuditUser:this.currentPerson()+' ('+this.ROLES[rk].label+')',
    };
  }

  RECORDS_SEED(kind){
    const seeds = {
      projects: [
        ['Pubrica SEO program','12-month retainer','SEO · Aditi Rao','On track'],
        ['Food Research Lab — content','Editorial retainer','Content · Karan Shah','In progress'],
        ['Statswork website rebuild','Landing pages','Web Dev · Web team','At risk'],
        ['PepCreations launch','Nutraceutical','Cross-dept · Priya Nair','Planned'],
        ['Tutors India local SEO','Local search','SEO · Sameer Iyer','On track'],
      ],
      campaigns: [
        ['Q3 SEO push — Pubrica','SEO Campaign','Live','Live'],
        ['Reel series — Statswork','SMM Campaign','Live','Live'],
        ['Whitepaper funnel — FRL','Content Campaign','Draft','Draft'],
        ['Backlink outreach — Tutors','SEO Campaign','Scheduled','Scheduled'],
      ],
    };
    return seeds[kind]||[];
  }
  // Single source of truth for Projects/Campaigns records (real Supabase-backed
  // rows plus the demo seed rows), so any screen that needs to reference a
  // project/campaign by name — like the Task creation form — stays in sync
  // with what Projects/Campaigns actually shows.
  recordsFor(kind){
    const tuples = this.RECORDS_SEED(kind);
    const seedRows = tuples.map((r,idx)=>{
      const key=kind+'#seed#'+idx;
      const ov=(this.state.recordOverrides||{})[key];
      if(ov && ov.deleted) return null;
      return { key, name:ov&&ov.name!=null?ov.name:r[0], type:ov&&ov.type!=null?ov.type:r[1], owner:ov&&ov.owner!=null?ov.owner:r[2], status:ov&&ov.status!=null?ov.status:r[3], isReal:false };
    }).filter(Boolean);
    const addedRows = (this.state.recordsAdded||[]).filter(r=>r.kind===kind && !r.deleted)
      .map(r=>({ key:r.id, name:r.name, type:r.type||'—', owner:r.owner||'—', status:r.status, isReal:true }));
    return addedRows.concat(seedRows);
  }
  tableData(route, rk, lvl, readOnly){
    const canEdit = this.EDIT_LEVELS.includes(lvl);
    const tag=(t,tone)=>({tag:t,tagBg:{ok:'var(--verify-100)',warn:'var(--warn-100)',info:'var(--info-100)',draft:'var(--surface-50)'}[tone],tagColor:{ok:'var(--verify-600)',warn:'var(--warn-600)',info:'var(--info-600)',draft:'var(--ink-500)'}[tone]});
    const act=(label,fn,primary)=>({actionLabel:label,action:fn,actionStyle: primary
      ? 'padding:6px 13px;border:none;background:#7A1C46;color:#fff;border-radius:9px;font-size:12.5px;font-weight:700;cursor:pointer'
      : 'padding:6px 13px;border:1px solid var(--line-300);background:#fff;color:var(--ink-700);border-radius:9px;font-size:12.5px;font-weight:600;cursor:pointer'});

    if(route==='users'){
      const empOf=(name)=>{ const idx=this.state.users.findIndex(u=>u.name===name); return 'EMP-'+String(100+idx+1).slice(-3); };
      return {
        umIsList:true,
        umRows:this.state.users.map(u=>{
          const open=this.allTasks().filter(t=>t.assignee===u.name&&!['Approved','Closed'].includes(t.status));
          const assigned=open.reduce((s,t)=>s+(parseFloat(t.estH)||0),0);
          const wk=this.weeklyCapacity(u.name)||40;
          const util=wk?Math.round(assigned/wk*100):0;
          const free=Math.round((wk-assigned)*10)/10;
          return {
            emp:empOf(u.name), name:u.name, sub:u.sub, dept:u.dept, role:u.role,
            initials:u.name.split(' ').map(x=>x[0]).join('').slice(0,2),
            shift:(u.shiftStart||'09:00')+'–'+(u.shiftEnd||'18:00'),
            shiftSub:(u.breakMin||60)+'m break · '+(u.days||5)+' days',
            daily:this.dailyCapacity(u.name)+' h/day',
            weekly:wk+' h',
            loadLabel:assigned.toFixed(1)+' h assigned',
            freeLabel:free>=0?(free.toFixed(1)+' h free'):(Math.abs(free).toFixed(1)+' h over'),
            freeColor:free>=0?'var(--verify-600)':'var(--danger-600)',
            util:util+'%', w:Math.min(100,util)+'%',
            barColor:util>100?'var(--danger-500)':util>=85?'var(--warn-500)':util>=40?'var(--verify-500)':'var(--info-500)',
            load:util>100?'Overloaded':util>=85?'Fully booked':util>=40?'Balanced':'Underloaded',
            loadBg:util>100?'var(--danger-100)':util>=85?'var(--warn-100)':util>=40?'var(--verify-100)':'var(--info-100)',
            loadColor:util>100?'var(--danger-600)':util>=85?'var(--warn-600)':util>=40?'var(--verify-600)':'var(--info-600)',
            status:u.status,
            statusBg:u.statusTone==='ok'?'var(--verify-100)':'var(--warn-100)',
            statusColor:u.statusTone==='ok'?'var(--verify-600)':'var(--warn-600)',
            actionLabel:rk==='admin'?'Manage':'View',
            actionStyle:'display:inline-flex;align-items:center;gap:5px;padding:6px 12px;border-radius:9px;font-size:11.5px;font-weight:700;cursor:pointer;'+(rk==='admin'
              ?'border:none;background:#7A1C46;color:#fff':'border:1px solid var(--line-300);background:#fff;color:var(--ink-700)'),
            open:()=>this.setState({ umOpen:u.name, umEdit:false }),
            suspendLabel:u.status==='Suspended'?'Reactivate':'Suspend',
            suspend:(e)=>{ if(e)e.stopPropagation();
              const users=(this.state.users||[]).map(x=>x.name===u.name?{...x,status:x.status==='Suspended'?'Active':'Suspended',statusTone:x.status==='Suspended'?'ok':'warn'}:x);
              this.setState({ users }); this.flash(u.name+(u.status==='Suspended'?' reactivated.':' suspended — login blocked, records retained.')); },
            canSuspend:rk==='admin' };
        }),
        umStats:(()=>{ const rows=this.state.users.map(u=>{
            const open=this.allTasks().filter(t=>t.assignee===u.name&&!['Approved','Closed'].includes(t.status));
            const wk=this.weeklyCapacity(u.name)||40;
            return wk?Math.round(open.reduce((s,t)=>s+(parseFloat(t.estH)||0),0)/wk*100):0; });
          const K=(label,value,sub,color)=>({label,value,sub,color});
          return [K('Users',String(this.state.users.length),'on the platform','var(--beet-700)'),
            K('Active',String(this.state.users.filter(u=>u.status==='Active').length),'can sign in','var(--verify-600)'),
            K('Overloaded',String(rows.filter(x=>x>100).length),'beyond shift capacity','var(--danger-600)'),
            K('Underloaded',String(rows.filter(x=>x<40).length),'below 40% of capacity','var(--info-600)'),
            K('Total capacity',this.state.users.reduce((s,u)=>s+(this.weeklyCapacity(u.name)||0),0)+' h','per week','var(--orchid-600)')]; })(),
        ...this.userDetailData(rk),
      };
    }
    const scoped = (rows)=> (rk==='junior') ? rows.slice(0,2) : (rk==='senior'? rows.slice(0,3) : rows);
    const viewer = ()=>this.flash('View only — your role can’t change this.');
    const editor = (m)=>()=>this.flash(m);

    const statusTone=(s)=>({'On track':'ok','Live':'ok','In progress':'info','Scheduled':'info','Planned':'info','At risk':'warn','Draft':'draft'}[s]||'info');
    const editAction=(kind,row)=>()=>this.setState({ showRecordModal:true, recordKind:kind, recordEditKey:row.key, recordIsReal:row.isReal,
      recordForm:{ name:row.name, type:row.type==='—'?'':row.type, owner:row.owner==='—'?'':row.owner, status:row.status } });
    const linkedTasks=(name)=>this.allTasks().filter(t=>t.project===name||t.campaign===name).length;
    const linkedSub=(name)=>{ const n=linkedTasks(name); return n+' linked task'+(n===1?'':'s'); };
    if(route==='projects'){
      const rows = scoped(this.recordsFor('projects'));
      return { tableCols:['Project','Type','Status','Owner','Actions'], tableRows:rows.map(row=>({c0:row.name,c0sub:linkedSub(row.name),c1:row.type,...tag(row.status,statusTone(row.status)),c3:row.owner,
        ...act(canEdit?'Edit':'View', canEdit?editAction('projects',row):viewer, canEdit)})) };
    }
    if(route==='campaigns'){
      const rows = scoped(this.recordsFor('campaigns'));
      return { tableCols:['Campaign','Type','Phase','Status','Actions'], tableRows:rows.map(row=>({c0:row.name,c0sub:linkedSub(row.name),c1:row.type,...tag(row.status,statusTone(row.status)),c3:row.owner,
        ...act(canEdit?'Edit':'View', canEdit?editAction('campaigns',row):viewer, canEdit)})) };
    }
    if(route==='tasks'){
      const own = ['junior','senior'].includes(rk);
      const rows = scoped([
        ['Keyword research — Tech vertical','Sameer Iyer · due Jan 20',tag('In progress','info')],
        ['Fix broken links — Pubrica','Neha Verma · due Jan 22',tag('Assigned','info')],
        ['SEO audit — E-commerce','Sameer Iyer · due Jan 18',tag('Review','warn')],
        ['Update meta — 12 pages','Neha Verma · due today',tag('In progress','warn')],
        ['Local SEO — FRL','Neha Verma · due Jan 24',tag('Assigned','info')],
      ]);
      const label = own?'Update':(canEdit?'Reassign':'View');
      return { tableCols:['Task','Assignee & due','Status','Owner','Actions'], tableRows:rows.map(r=>({c0:r[0],c0sub:'',c1:r[1],...r[2],c3:'',...act(label, own?editor('Task status updated.'):(canEdit?editor('Reassigning task…'):viewer), own||canEdit)})) };
    }
    if(route==='okr'){
      const rows=[
        ['Grow organic traffic 30% QoQ','Company objective','Q3',tag('On track','ok')],
        ['Publish 40 pillar articles','Content KR','Q3',tag('62%','info')],
        ['Improve avg. keyword rank to top 10','SEO KR','Q3',tag('At risk','warn')],
        ['Lift landing-page CVR to 4.5%','Web KR','Q3',tag('On track','ok')],
      ];
      return { tableCols:['Objective / KR','Type','Cycle','Progress','Actions'], tableRows:rows.map(r=>({c0:r[0],c0sub:'',c1:r[1],...r[3],c3:r[2],...act(canEdit?'Edit':'View',canEdit?editor('Editing OKR…'):viewer,canEdit)})) };
    }
    // repositories are real records with live counts, and Admin can create new ones
    return this.repositoriesView(rk, canEdit);
  }
  repoFileList(){
    const out=[]; const seen={};
    const add=(name,source,by,where)=>{ const k=name+'|'+source+'|'+where; if(seen[k]) return; seen[k]=1;
      out.push({ name, source, by, where }); };
    this.allThreads().forEach(th=>th.msgs.forEach(m=>(m.files||[]).forEach(n=>add(n,'Message attachment',m.who,th.name))));
    this.allTasks().forEach(t=>{ const ov=this.tkOv?this.tkOv(t):t;
      (ov.evidence||t.evidence||[]).forEach(n=>add(n,'Task evidence',t.assignee,t.id));
      (ov.comments||t.comments||[]).forEach(c=>(c.files||[]).forEach(n=>{ if(String(n).indexOf('http')===0) return;
        add(n,(c.role||'').indexOf('QC')>=0?'QC reference':'Comment attachment',c.who,t.id); })); });
    this.allTickets().forEach(t=>(t.files||[]).forEach(n=>add(n,'Support ticket',t.by,t.id)));
    return out;
  }
  REPO_REGISTRY(){
    const count=(n)=>n.toLocaleString('en-IN');
    const built=[
      { key:'ideas', name:'Content Ideas', desc:'Quarterly content ideas from the writers — QC-approved ideas convert to tasks.',
        cat:'Content', icon:'lightbulb', owner:'Priya Nair',
        n:this.allIdeas().length, unit:'ideas', go:()=>this.setState({ route:'ideas' }) },
      { key:'content', name:'Website Content', desc:'Every service page, insight and article with its SEO, links and media.',
        cat:'Content', icon:'folder-tree', owner:'Priya Nair',
        n:this.allContentPages().length, unit:'pages', go:()=>this.setState({ route:'content' }) },
      { key:'backlink', name:'Backlink Domains', desc:'Approved backlink sources with authority, spam score and platform rules.',
        cat:'SEO', icon:'link', owner:'Aditi Rao',
        n:this.BACKLINK_DOMAINS().length, unit:'domains', go:()=>this.setState({ route:'masters', masterKey:'backlink' }) },
      { key:'files', name:'Documents & Assets', desc:'Every file uploaded across tasks, QC, messages and compliance evidence.',
        cat:'Assets', icon:'folder-open', owner:'Karan Shah',
        n:this.repoFileList().length, unit:'files', go:()=>this.setState({ route:'files' }) },
      { key:'templates', name:'Templates', desc:'Reusable task, KPI and OKR templates that seed new work.',
        cat:'Performance', icon:'layout-template', owner:'Priya Nair',
        n:(this.TASK_TEMPLATES?this.TASK_TEMPLATES().length:0)+(this.KPI_TEMPLATES?this.KPI_TEMPLATES().length:0),
        unit:'templates', go:()=>this.setState({ route:'templates' }) },
    ];
    const custom=(this.state.repoAdded||[]).map(r=>({ ...r, n:0, unit:'items', custom:true,
      go:()=>this.flash('“'+r.name+'” is empty — add the first record from its source module.') }));
    return custom.concat(built).map(r=>({ ...r, items:count(r.n)+' '+r.unit }));
  }
  repositoriesView(rk, canEdit){
    const isAdmin=rk==='admin';
    const list=this.REPO_REGISTRY();
    const tag=(t)=>({tag:t,tagBg:'var(--info-100)',tagColor:'var(--info-600)'});
    const f=this.state.repoForm||{};
    const setR=(k)=>(e)=>this.setState({ repoForm:{...f,[k]:e.target.value} });
    return {
      tableCols:['Repository','Owner','Category','Items','Actions'],
      tableRows:list.map(r=>({
        c0:r.name, c0sub:r.desc, c1:r.owner, ...tag(r.cat), c3:r.items,
        actionLabel:r.custom?'Empty':(['junior','senior'].includes(rk)?'Open':(canEdit?'Manage':'View')),
        action:r.go,
        actionStyle:'padding:6px 13px;border-radius:9px;font-size:12.5px;font-weight:700;cursor:pointer;'+(canEdit&&!r.custom
          ?'border:none;background:#7A1C46;color:#fff':'border:1px solid var(--line-300);background:#fff;color:var(--ink-700)'),
      })),
      repoCanCreate:isAdmin,
      repoFormOpen:!!this.state.repoNew,
      repoNew:()=>this.setState({ repoNew:true, repoForm:{ cat:'Content', owner:'Priya Nair' } }),
      repoClose:()=>this.setState({ repoNew:false, repoForm:{} }),
      repoStop:(e)=>e.stopPropagation(),
      rf:f, repoSetName:setR('name'), repoSetDesc:setR('desc'), repoSetCat:setR('cat'), repoSetOwner:setR('owner'),
      repoCatOptions:['Content','SEO','Assets','Promotions','Performance','Quality','Research'],
      repoOwnerOptions:(this.state.users||[]).map(u=>u.name),
      repoSave:()=>{
        if(!(f.name&&f.name.trim())){ this.flash('Name the repository.'); return; }
        const rec={ key:'r'+Date.now(), name:f.name.trim(), desc:f.desc||'Custom repository.',
          cat:f.cat||'Content', icon:'database', owner:f.owner||'Karan Shah' };
        this.setState({ repoAdded:[rec,...(this.state.repoAdded||[])], repoNew:false, repoForm:{} });
        this.flash('“'+rec.name+'” created under '+rec.cat+' — owned by '+rec.owner+'.');
      },
    };
  }

  uf(k,e){ this.setState({ uf:{...this.state.uf,[k]:e.target.value} }); }
  submitUser(){
    const f=this.state.uf;
    if(!f.first.trim()||!f.email.trim()){ this.flash('First name and email are required.'); return; }
    const roleEntry=Object.entries(this.ROLES).find(([,r])=>r.label===f.role);
    const roleKey=roleEntry?roleEntry[0]:'junior';
    if(this.HIGH_PRIVILEGE_ROLES.includes(roleKey)){
      this.setState({ showRoleConfirm:true, roleConfirmKey:roleKey, roleConfirmAction:'add' });
      return;
    }
    this._createUser(roleKey);
  }
  async _createUser(roleKey){
    const f=this.state.uf;
    const name=(f.first+' '+f.last).trim();
    const u={ name, sub:(f.designation||f.role)+' · '+f.dept, role:f.role, dept:f.dept, status:'Pending Invitation', statusTone:'warn',
      shiftStart:f.shiftStart||'09:00', shiftEnd:f.shiftEnd||'18:00', breakMin:parseInt(f.breakMin,10)||60, days:parseFloat(f.days)||5 };
    this.setState({ users:[u,...this.state.users], showUserModal:false, uf:{ first:'', last:'', email:'', mobile:'', dept:'SEO', designation:'', manager:'Priya Nair (Manager)', lead:'Aditi Rao (SEO Lead)', role:'Junior Executive', shiftStart:'09:00', shiftEnd:'18:00', breakMin:'60', days:'5' } });
    try{
      const resp=await fetch('/api/invite-user', {
        method:'POST', headers:{ 'Content-Type':'application/json' },
        body:JSON.stringify({ email:f.email.trim(), fullName:name, roleKey, department:f.dept, designation:f.designation }),
      });
      const body=await resp.json();
      if(!resp.ok) throw new Error(body.error||'Invite failed');
      this.flash('User created — activation link sent to '+f.email+'.');
      this._loadTeam();
    }catch(err){
      this.flash('Could not send invite ('+err.message+'). The user still appears locally.');
    }
  }
  confirmRoleAssignment(){
    const { roleConfirmKey, roleConfirmAction } = this.state;
    this.setState({ showRoleConfirm:false, roleConfirmKey:null, roleConfirmAction:null });
    if(roleConfirmAction==='add') this._createUser(roleConfirmKey);
  }
  cancelRoleAssignment(){ this.setState({ showRoleConfirm:false, roleConfirmKey:null, roleConfirmAction:null }); }

  pwStrength(){
    const p=this.state.newPass; let s=0;
    if(p.length>=12)s++; if(/[a-z]/.test(p)&&/[A-Z]/.test(p))s++; if(/[0-9]/.test(p))s++; if(/[^A-Za-z0-9]/.test(p))s++;
    const on='var(--verify-500)', off='var(--line-300)';
    const c=n=> s>=n?on:off;
    const labels=['Enter a password','Weak','Fair','Good','Strong'];
    return { pw1:c(1),pw2:c(2),pw3:c(3),pw4:c(4), pwLabel:labels[s] };
  }
  async doActivate(){
    if(this.state.newPass.length<12){ this.flash('Password must be at least 12 characters.'); return; }
    if(this.state.newPass!==this.state.confirmPass){ this.flash('Passwords do not match.'); return; }
    this.setState({ authBusy:true });
    // A real invite link (sent via Supabase Auth) signs the browser into a
    // temporary session automatically; activating just sets the real password.
    const { data: { session } } = await supabase.auth.getSession();
    if(session && session.user){
      const { error } = await supabase.auth.updateUser({ password:this.state.newPass });
      this.setState({ authBusy:false });
      if(error){ this.flash('Could not activate: '+error.message); return; }
      const { error: statusErr } = await supabase.from('profiles').update({ status:'Active' }).eq('id', session.user.id);
      if(statusErr) console.warn('[supabase] profile activation status update failed:', statusErr.message);
      await this._loadProfile(session.user);
      this.flash('Account activated. Welcome to Beetloop.');
      return;
    }
    // No invite session present (e.g. opened this screen directly, demo path).
    this.setState({ screen:'app', roleKey:'junior', route:'dashboard', authBusy:false });
    this.flash('Account activated. Welcome to Beetloop.');
  }
  async doLogin(){
    const em=this.state.email.trim().toLowerCase();
    const pw=this.state.password;
    this.setState({ authBusy:true, loginError:'' });
    const { data, error } = await supabase.auth.signInWithPassword({ email: em, password: pw });
    if(!error && data.user){
      await this._loadProfile(data.user);
      this.setState({ authBusy:false });
      return;
    }
    this.setState({ loginError: error ? error.message : 'Invalid credentials.', authBusy:false });
  }

  async _loadProfile(user){
    const { data: profile, error } = await supabase.from('profiles').select('*').eq('id', user.id).single();
    if(error || !profile){
      this.setState({ authUser:user, authProfile:null, screen:'app', roleKey:'junior', route:'dashboard', loginError:'' });
    } else {
      this.setState({
        authUser:user, authProfile:profile,
        screen:'app', roleKey:profile.role_key||'junior', route:'dashboard', loginError:'',
      });
    }
    this._loadTasks();
    this._loadOkrs();
    this._loadTeam();
    this._loadRecords();
    this._subscribeRealtime();
    this._catchUpNotifications();
  }

  // The realtime feed below only fires for changes that happen while a
  // session is already connected — someone assigned a task to you while you
  // were offline gets nothing from it. This runs once at login and surfaces
  // anything already sitting on your plate as notifications too, so logging
  // in itself catches you up instead of only live-going-forward changes.
  async _catchUpNotifications(){
    const person = this.currentPerson();
    if(!person) return;
    const { data, error } = await supabase.from('tasks').select('code,name,status')
      .eq('assignee_name', person).eq('status', 'Assigned');
    if(error || !data || !data.length) return;
    const entries = data.map(t=>({
      id:'catchup-task-'+t.code,
      text:'You have a task assigned: '+(t.name||t.code),
      time:new Date().toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'}),
      read:false,
    }));
    this.setState(s=>({ notifications:[...entries, ...(s.notifications||[])].slice(0,30) }));
  }

  // Live notifications: pushes a toast-style entry whenever a task or OKR is
  // created/updated by anyone, so multi-user changes show up without a reload.
  // Live notifications — scoped to what's actually relevant to whoever is
  // logged in, not a global firehose of every change in the system:
  //   - your own tasks/OKRs/projects/profile → always notified, worded as "you"
  //   - things you manage (as reviewer, or via role-based edit access) → notified
  //   - everything else → silent for you, still refreshes the underlying data
  _subscribeRealtime(){
    if(this._realtimeChannel) return;
    const push=(text)=>{
      const entry={ id:Date.now()+Math.random(), text, time:new Date().toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'}), read:false };
      this.setState(s=>({ notifications:[entry, ...(s.notifications||[])].slice(0,30) }));
    };
    const me=()=>this.currentPerson();
    const myId=()=>this.state.authUser&&this.state.authUser.id;
    const canManageTasks=()=>['manager','team_lead','admin','ceo'].includes(this.state.roleKey);
    const canManageOkrs=()=>['manager','admin','ceo'].includes(this.state.roleKey);
    const canManageUsers=()=>['admin','coo','ceo'].includes(this.state.roleKey);
    const canManageRecords=()=>['manager','admin','ceo'].includes(this.state.roleKey);

    this._realtimeChannel = supabase.channel('beetloop-changes')
      .on('postgres_changes', { event:'INSERT', schema:'public', table:'tasks' }, (payload)=>{
        const t=payload.new;
        if(t.assignee_name===me()) push('You were assigned a new task: '+(t.name||t.code));
        else if(canManageTasks()) push('New task created: '+(t.name||t.code)+' — assigned to '+(t.assignee_name||'Unassigned'));
        this._loadTasks();
      })
      .on('postgres_changes', { event:'UPDATE', schema:'public', table:'tasks' }, (payload)=>{
        const t=payload.new;
        if(t.assignee_name===me()) push('Your task '+t.code+' was updated — status: '+t.status);
        else if(t.reviewer_name===me()) push('Task '+t.code+' you\'re reviewing — status: '+t.status);
        else if(canManageTasks()) push('Task '+t.code+' updated — status: '+t.status+' (assignee: '+(t.assignee_name||'Unassigned')+')');
        this._loadTasks();
      })
      .on('postgres_changes', { event:'INSERT', schema:'public', table:'okrs' }, (payload)=>{
        const o=payload.new; const owner=o.key_results&&o.key_results[0]&&o.key_results[0].who;
        if(owner===me()) push('You were set as owner on a new OKR: '+o.title);
        else if(canManageOkrs()) push('New OKR created: '+o.title);
        this._loadOkrs();
      })
      .on('postgres_changes', { event:'UPDATE', schema:'public', table:'okrs' }, (payload)=>{
        const o=payload.new; const owner=o.key_results&&o.key_results[0]&&o.key_results[0].who;
        if(owner===me()) push('Your OKR '+o.code+' was updated — status: '+o.status);
        else if(canManageOkrs()) push('OKR '+o.code+' updated — status: '+o.status);
        this._loadOkrs();
      })
      .on('postgres_changes', { event:'INSERT', schema:'public', table:'profiles' }, (payload)=>{
        if(canManageUsers()) push('New team member: '+(payload.new.full_name||payload.new.email));
        this._loadTeam();
      })
      .on('postgres_changes', { event:'UPDATE', schema:'public', table:'profiles' }, (payload)=>{
        const roleLabel=(this.ROLES[payload.new.role_key]&&this.ROLES[payload.new.role_key].label)||payload.new.role_key;
        if(payload.new.id===myId()) push('Your profile was updated — role: '+roleLabel+', status: '+payload.new.status);
        else if(canManageUsers()) push((payload.new.full_name||payload.new.email)+' updated — role: '+roleLabel+', status: '+payload.new.status);
        this._loadTeam();
      })
      .on('postgres_changes', { event:'INSERT', schema:'public', table:'records' }, (payload)=>{
        const r=payload.new;
        if(r.owner===me()) push('You were set as owner on a new '+r.kind.slice(0,-1)+': '+r.name);
        else if(canManageRecords()) push('New '+r.kind.slice(0,-1)+': '+r.name);
        this._loadRecords();
      })
      .on('postgres_changes', { event:'UPDATE', schema:'public', table:'records' }, (payload)=>{
        const r=payload.new; const label=r.kind==='campaigns'?'Campaign':'Project';
        if(r.owner===me()) push('Your '+label.toLowerCase()+' '+r.name+' was updated — status: '+r.status);
        else if(canManageRecords()) push(label+' updated: '+r.name+' — status: '+r.status);
        this._loadRecords();
      })
      .subscribe();
  }

  _syncStateFromLocation(){
    const { screenParam, routeParam } = this.props;
    if(screenParam==='app'){
      if(this.state.screen!=='app' || (routeParam && this.state.route!==routeParam)){
        this.setState({ screen:'app', route: routeParam || 'dashboard' });
      }
    } else if(this.state.screen!==screenParam){
      this.setState({ screen: screenParam });
    }
  }
  _syncLocationFromState(){
    const { screen, route } = this.state;
    const target = screen==='app' ? ('/app/'+route) : screen==='activate' ? '/activate' : '/login';
    if(this.props.location.pathname!==target) this.props.navigate(target);
  }
  render(){
    const vm = this.renderVals();
    return (
      <React.Suspense fallback={null}>
        {this.state.screen==='login' ? <LoginPage vm={vm} />
          : this.state.screen==='activate' ? <ActivatePage vm={vm} />
          : <AppShell vm={vm} />}
      </React.Suspense>
    );
  }
}


export default AppRoot;
