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
    showUserModal: false, showMasterModal: false,
    activeMaster: null,
    masterKey: null, masterRecord: null, masterTab: 0, masterQuery: '',
    okrExpanded: [], showOkrPanel: false, okrRecord: null, okrSection: 'okrA', okrOpen: null,
    okrAdded: [],
    okrForm: { title:'', desc:'', owner:'Sarah Johnson', dept:'SEO', brand:'Beetloop', category:'SEO' },
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
    uf: { first:'', last:'', email:'', mobile:'', dept:'SEO', designation:'', manager:'Priya Nair (Manager)', lead:'Aditi Rao (SEO Lead)', role:'Junior Executive' },
    mf: { a:'', b:'' },
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

  DEMO = {
    'admin@beetloop.com':'admin', 'ceo@beetloop.com':'ceo', 'coo@beetloop.com':'coo',
    'manager@beetloop.com':'manager', 'lead@beetloop.com':'team_lead', 'senior@beetloop.com':'senior',
    'junior@beetloop.com':'junior', 'qc@beetloop.com':'qc',
  };

  ACCESS = {
    dashboard:{ ceo:'All', coo:'All', manager:'Department', team_lead:'Team', senior:'Own', junior:'Own', qc:'QC', admin:'All' },
    projects:{ ceo:'View', coo:'View', manager:'Create / Edit', team_lead:'Manage team', senior:'Assigned only', junior:'Assigned only', qc:'View', admin:'Full' },
    campaigns:{ ceo:'View', coo:'View', manager:'Create / Edit', team_lead:'Assign & monitor', senior:'Assigned only', junior:'Assigned only', qc:'View', admin:'Full' },
    tasks:{ ceo:'View', coo:'View', manager:'All', team_lead:'Assign / edit', senior:'Update own', junior:'Update own', qc:'QC tasks', admin:'Full' },
    templates:{ ceo:'View', coo:'View', manager:'Create / Edit', team_lead:'Create / Edit', admin:'Full' },
    files:{ ceo:'View', coo:'View', manager:'View', team_lead:'View', senior:'Own files', junior:'Own files', qc:'View', admin:'Full' },
    effort:{ ceo:'View', coo:'View', manager:'Create / Edit', team_lead:'Create / Edit', admin:'Full' },
    ideas:{ ceo:'View', coo:'View', manager:'Create / Edit', team_lead:'Create / Edit', senior:'Create / Edit', junior:'Create / Edit', qc:'View', admin:'Full' },
    qc:{ manager:'Review', team_lead:'Team QC', qc:'Full', admin:'Full' },
    okr:{ ceo:'View', coo:'View', manager:'Create / Edit', team_lead:'View', senior:'View own', junior:'View own', qc:'View', admin:'Full' },
    analytics:{ ceo:'Full', coo:'Operational', manager:'Department', team_lead:'Team', senior:'Own', junior:'Own', qc:'QC', admin:'Full' },
    repositories:{ ceo:'View', coo:'View', manager:'View', team_lead:'View', senior:'Use assigned', junior:'Use assigned', qc:'View', admin:'Full' },
    content:{ ceo:'View', coo:'View', manager:'Create / Edit', team_lead:'Manage team', senior:'Assigned only', junior:'Assigned only', qc:'View', admin:'Full' },
    masters:{ admin:'Full' },
    users:{ admin:'Full' },
    config:{ ceo:'View', coo:'View', manager:'View', admin:'Full' },
  };

  MODMETA = {
    dashboard:{ label:'Dashboard', icon:'layout-dashboard' },
    projects:{ label:'Projects', icon:'folder-kanban' },
    campaigns:{ label:'Campaigns', icon:'megaphone' },
    tasks:{ label:'Tasks', icon:'list-checks' },
    templates:{ label:'Templates', icon:'layout-template' },
    files:{ label:'Document Repository', icon:'folder-open' },
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

  MASTERS_REG(){
    if(this._masters) return this._masters;
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
        desc:'Platform users with department, designation, reporting hierarchy and role.',
        cols:[ {k:'Employee_ID',l:'Emp ID',mono:1}, {k:'Full_Name',l:'Name'}, {k:'Department',l:'Dept'}, {k:'Designation',l:'Designation'}, {k:'Role',l:'Role'}, {k:'Status',l:'Status',tag:1} ],
        fields:['Employee_ID','Full_Name','Official_Email','Mobile','Department','Designation','Team','Reporting_Manager','Team_Lead','Office_Location','Role','Employment_Type','Joining_Date','Status'],
        rows:[
          {Employee_ID:'EMP-001',Full_Name:'Aditi Rao',Official_Email:'aditi.rao@beetloop.com',Mobile:'+91 98400 11223',Department:'SEO',Designation:'SEO Team Lead',Team:'SEO Alpha',Reporting_Manager:'Priya Nair',Team_Lead:'—',Office_Location:'Chennai',Role:'Team Lead',Employment_Type:'Full-time',Joining_Date:'2022-06-14',Status:'Active'},
          {Employee_ID:'EMP-014',Full_Name:'Sameer Iyer',Official_Email:'sameer.iyer@beetloop.com',Mobile:'+91 98400 55471',Department:'SEO',Designation:'Senior SEO Executive',Team:'SEO Alpha',Reporting_Manager:'Priya Nair',Team_Lead:'Aditi Rao',Office_Location:'Chennai',Role:'Senior Executive',Employment_Type:'Full-time',Joining_Date:'2023-02-01',Status:'Active'},
          {Employee_ID:'EMP-022',Full_Name:'Neha Verma',Official_Email:'neha.verma@beetloop.com',Mobile:'+91 98400 90210',Department:'SEO',Designation:'Junior SEO Executive',Team:'SEO Alpha',Reporting_Manager:'Priya Nair',Team_Lead:'Aditi Rao',Office_Location:'Remote',Role:'Junior Executive',Employment_Type:'Full-time',Joining_Date:'2024-09-30',Status:'Pending Invitation'},
          {Employee_ID:'EMP-007',Full_Name:'Farhan Ali',Official_Email:'farhan.ali@beetloop.com',Mobile:'+91 98400 33189',Department:'Quality',Designation:'QC Reviewer',Team:'Quality',Reporting_Manager:'Rahul Menon',Team_Lead:'—',Office_Location:'Chennai',Role:'QC Reviewer',Employment_Type:'Full-time',Joining_Date:'2022-11-20',Status:'Active'},
        ],
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
    return this._masters;
  }

  humanize(k){ return String(k).replace(/_/g,' ').replace(/\b\w/g,c=>c.toUpperCase()).replace(/\bId\b/,'ID').replace(/\bUrl\b/,'URL').replace(/\bCpc\b/,'CPC').replace(/\bSeo\b/,'SEO').replace(/\bQc\b/,'QC').replace(/\bKpi\b/,'KPI').replace(/\bH1\b/,'H1').replace(/\bSerp\b/,'SERP'); }

  OKR_DATA(){
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
    const nav = buildNav(['dashboard','projects','campaigns','effort','tasks','templates','qc','okr','analytics','content','repositories','files']);
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
      projects:{ eyebrow:'Delivery', icon:'folder-kanban', title:'Projects', sub:'Client initiatives across brands and departments.', actionLabel:'New project', actionIcon:'plus' },
      campaigns:{ eyebrow:'Delivery', icon:'megaphone', title:'Campaigns', sub:'Active marketing campaigns and their status.', actionLabel:'New campaign', actionIcon:'plus' },
      tasks:{ eyebrow:'Execution', icon:'list-checks', title:'Tasks', sub:'Work items assigned across the team.', actionLabel:'Assign task', actionIcon:'plus' },
      templates:{ eyebrow:'Execution', icon:'layout-template', title:'Templates', sub:'Task, KPI & OKR Masters — reusable definitions to pull from everywhere.', actionLabel:{task:'New task template',kpi:'New KPI template',okr:'New OKR template'}[this.state.ttTab||'task'], actionIcon:'plus' },
      files:{ eyebrow:'Assets', icon:'folder-open', title:'Document Repository', sub:'Every document, image and video uploaded across tasks — with QC status and deadlines in one view.' },
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
    };
    const page = Object.assign({ canEdit:this.EDIT_LEVELS.includes(lvl) }, PAGES[route]||PAGES.dashboard);
    // masters/users always show action for admin
    if(route==='users') page.canEdit = rk==='admin';
    if(['dashboard','analytics','masters','config','qc','content','effort'].includes(route)) page.canEdit = false;
    if(showMyKpi){ page.eyebrow='Performance'; page.icon='target'; page.title='My KPIs'; page.sub='Report your check-ins and track your own KPIs.'; page.canEdit=false; }

    const primaryAction = ()=>{
      if(route==='users') this.setState({ showUserModal:true });
      else if(route==='tasks') this.setState({ tkNew:true, tkForm:{ template:'Custom task', priority:'Medium', assignee:'Neha Verma', recurrence:'None' } });
      else if(route==='templates'){ const tb=this.state.ttTab||'task'; if(tb==='kpi') this.setState({ ktNew:true, ktEditId:null, ktForm:{ division:'SEO', category:'Traffic', direction:'Increase', freq:'Monthly', source:'GA4', status:'Active' } }); else if(tb==='okr') this.setState({ otNew:true, otEditId:null, otForm:{ category:'SEO', scope:'Department', division:'SEO', status:'Active', krs:[{t:'',kpi:'',unit:'',target:'',weight:'100',freq:'Monthly'}] } }); else this.setState({ ttNew:true, ttEditId:null, ttForm:{ division:'SEO', priority:'Medium', recurrence:'None', status:'Active', checklist:['',''] } }); }
      else if(route==='ideas') this.setState({ showIdeaForm:true, ideaForm:{} });
      else if(route==='okr') this.setState({ showOkrPanel:true });
      else this.flash('Draft created — opening editor…');
    };

    const readOnly = !this.EDIT_LEVELS.includes(lvl) && ['projects','campaigns','tasks','okr','repositories'].includes(route);
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
    const showTable = ['projects','campaigns','repositories','users'].includes(route);
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
      backToLogin:e=>{e&&e.preventDefault();this.setState({screen:'login'});},
      noop:e=>{e&&e.preventDefault();this.flash('Demo — connect your identity provider to enable.');},
      demoAccounts: Object.entries(this.DEMO).map(([em,r])=>({ label:this.ROLES[r].label, short:this.ROLES[r].short, color:this.ROLES[r].color, pick:()=>this.setState({email:em,password:'demo123',loginError:''}) })),
      // activate
      newPass:this.state.newPass, confirmPass:this.state.confirmPass,
      onNewPass:e=>this.setState({newPass:e.target.value}), onConfirm:e=>this.setState({confirmPass:e.target.value}),
      toggleMfa:()=>this.setState({mfa:!this.state.mfa}),
      mfaBg:this.state.mfa?'var(--verify-500)':'var(--line-300)', mfaX:this.state.mfa?'21px':'3px',
      doActivate:()=>this.doActivate(),
      ...this.pwStrength(),
      // shell
      role, roleKey:rk, nav, adminNav, hasAdmin,
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
      route, page, primaryAction,
      accessBg:tone.bg, accessBorder:tone.bg, accessColor:tone.color, accessIcon, accessLabel,
      // screen switches
      showDash, showQC, showAnalytics, showMastersHub, showMasterDetail, showOKR, showMyKpi, showTable, showTasks2, showTemplates, showFiles, showEffort, showIdeas, showContent, showPageHead, readOnly, readOnlyMsg,
      toast:this.state.toast,
      // modals
      showUserModal:this.state.showUserModal, showMasterModal:this.state.showMasterModal,
      closeUserModal:()=>this.setState({showUserModal:false}), stop:e=>e.stopPropagation(),
      submitUser:()=>this.submitUser(),
      uf:this.state.uf,
      ufFirst:e=>this.uf('first',e), ufLast:e=>this.uf('last',e), ufEmail:e=>this.uf('email',e), ufMobile:e=>this.uf('mobile',e),
      ufDept:e=>this.uf('dept',e), ufDesignation:e=>this.uf('designation',e), ufManager:e=>this.uf('manager',e), ufLead:e=>this.uf('lead',e), ufRole:e=>this.uf('role',e),
      activeMaster:this.state.activeMaster, closeMasterModal:()=>this.setState({showMasterModal:false}),
      masterField1:'Name', masterField2:'Description',
      mf:this.state.mf, mfA:e=>this.setState({mf:{...this.state.mf,a:e.target.value}}), mfB:e=>this.setState({mf:{...this.state.mf,b:e.target.value}}),
      submitMaster:()=>this.submitMaster(),
    };

    if(showDash) Object.assign(out, this.dashData(rk, role));
    if(showQC){ Object.assign(out, this.qcData(rk)); Object.assign(out, this.tkDetailData()); Object.assign(out, this.ideaDetailData()); }
    if(showIdeas) Object.assign(out, this.ideaDetailData());
    if(showAnalytics) out.analyticsCards = this.analyticsData(role.bucket);
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
    if(showTasks2) Object.assign(out, this.tasksView());
    if(showTemplates) Object.assign(out, this.templatesView());
    if(showFiles) Object.assign(out, this.filesView());
    if(showEffort) Object.assign(out, this.effortView());
    if(showIdeas) Object.assign(out, this.ideasView());
    if(showContent) Object.assign(out, this.contentView());

    return out;
  }

  dashTitle(b){ return ({exec:'Executive Dashboard',ops:'Operations Dashboard',manager:'Department Dashboard',lead:'Team Dashboard',senior:'My Workspace',junior:'My Workspace',qc:'QC Dashboard',admin:'Platform Dashboard'})[b]; }
  dashSub(b){ return ({exec:'Company-wide performance and strategic health.',ops:'Delivery, capacity and resource utilization.',manager:'Your department’s projects, campaigns and KPIs.',lead:'Your team’s workload, progress and quality.',senior:'Your assigned work, deliverables and KPIs.',junior:'Your assigned tasks and deadlines only.',qc:'Items awaiting review and quality metrics.',admin:'System health, users and configuration.'})[b]; }

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
    const modsFor = ['dashboard','projects','tasks','qc','analytics','masters'];
    const accessSummary = modsFor.map(m=>{
      const l = (this.ACCESS[m]&&this.ACCESS[m][rk]) || 'No access';
      const t = l==='No access' ? {bg:'var(--danger-100)',color:'var(--danger-600)'} : this.levelTone(l);
      return { mod:this.MODMETA[m].label, level:l, bg:t.bg, color:t.color };
    });

    return { kpis:KPI[b]||KPI.manager, dashRows:rows, dashPanelTitle:panelTitle, scopeBox, accessSummary };
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
    const kpis=[K('Awaiting review',String(list.filter(t=>t.status==='Submitted').length+ideaRows.length),'var(--warn-600)'),K('Tasks approved',String(list.filter(t=>t.status==='Approved').length),'var(--verify-600)'),K('Rework open',String(list.filter(t=>t.status==='Rework').length),'var(--warn-600)'),K('Content ideas in queue',String(ideaRows.length),'var(--orchid-600)')];
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
    const wkAssigned=allT.length, wkDone=allT.filter(t=>t.status==='Approved').length, wkPending=allT.filter(t=>['Assigned','In Progress','Submitted'].includes(t.status)).length, wkRework=allT.filter(t=>t.status==='Rework').length;
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
    return { kpis, qcRows:pg.rows, qcPg:pg, qcCanAct:canAct, qcDayChips, qcWeek, qcPeriodBtns, qcPeriodLabel:'Task analytics — all users · '+period.toLowerCase()+' report',
      qcStatusF:sf, qcOnStatusF:(e)=>this.setState({ qcStatusF:e.target.value, pg:{...(this.state.pg||{}),qc:0} }),
      qcStatusOptions:['All','Awaiting QC','Approved','Rework'] };
  }
  qcAct(id,status,tone,msg){
    this.setState({ qcQueue:this.state.qcQueue.map(q=>q.id===id?{...q,status,statusTone:tone,done:true}:q) });
    this.flash(msg);
  }

  analyticsData(b){
    const rank = {exec:5,ops:5,manager:3,lead:2,senior:1,junior:0,admin:5,qc:1}[b];
    const defs = [
      { title:'Executive Dashboard', desc:'Company revenue, growth and strategic KPIs.', icon:'building-2', min:5 },
      { title:'Resource & Capacity', desc:'Utilization, allocation and capacity planning.', icon:'gauge', min:4 },
      { title:'Department Dashboard', desc:'Projects, campaigns and KPI attainment.', icon:'bar-chart-3', min:3 },
      { title:'Team Dashboard', desc:'Team workload, throughput and quality.', icon:'users', min:2 },
      { title:'Competitor Dashboard', desc:'Benchmarks vs. tracked competitors.', icon:'swords', min:3 },
      { title:'My Scorecard', desc:'Your personal KPIs and deliverables.', icon:'user-round', min:0 },
    ];
    return defs.map(d=>{
      const locked = rank < d.min;
      return { title:d.title, desc:d.desc, icon:d.icon, locked,
        opacity: locked?'.55':'1',
        iconBg: locked?'var(--surface-50)':'var(--orchid-100)', iconColor: locked?'var(--ink-400)':'var(--orchid-600)',
        tag: locked?'Restricted for your role':'Available', tagColor: locked?'var(--ink-400)':'var(--verify-600)' };
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

  openMaster(name){ this.setState({ showMasterModal:true, activeMaster:name, mf:{a:'',b:''} }); }
  submitMaster(){ if(!this.state.mf.a.trim()){ this.flash('Enter a name to save.'); return; } this.setState({ showMasterModal:false, mf:{a:'',b:''} }); this.flash('Entry added to '+(this.state.activeMaster||'master')+'.'); }

  masterDetailData(){
    const reg = this.MASTERS_REG();
    const key = this.state.masterKey;
    const m = reg[key];
    if(!m) return {};
    const st = reg._st;
    const q = (this.state.masterQuery||'').toLowerCase();
    const tagTone = (v)=>{ const t=this.levelTone; const tone=st(v); return { ok:{bg:'var(--verify-100)',color:'var(--verify-600)'}, warn:{bg:'var(--warn-100)',color:'var(--warn-600)'}, danger:{bg:'var(--danger-100)',color:'var(--danger-600)'}, draft:{bg:'var(--surface-50)',color:'var(--ink-500)'}, info:{bg:'var(--info-100)',color:'var(--info-600)'} }[tone]; };
    const rows = m.rows.map((r,idx)=>{
      const cells = m.cols.map(c=>{ const v=r[c.k]; const tt = c.tag?tagTone(v):null; return { val: v===undefined||v===''?'—':String(v), plain:!c.tag, tag:!!c.tag, font: c.mono?"'Space Mono', monospace":"inherit", tagBg: tt?tt.bg:'', tagColor: tt?tt.color:'' }; });
      return { cells, open:()=>this.setState({ masterRecord:idx, masterTab:0 }) };
    }).filter((_,idx)=>{ if(!q) return true; return JSON.stringify(m.rows[idx]).toLowerCase().includes(q); });
    const out = {
      mdLabel:m.label, mdIcon:m.icon, mdDesc:m.desc, mdCount:m.rows.length+' records',
      mdCols:m.cols.map(c=>c.l), ...(()=>{ const pg=this.pgData('md-'+key,rows,8); return { mdRows:pg.rows, mdPg:pg }; })(),
      mdBack:()=>this.setState({ masterKey:null, masterRecord:null }),
      mdAdd:()=>this.flash('New '+m.label+' entry — form opens here in the live build.'),
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
      out.mdAdd=()=>this.setState({ blRecord:'new', blTab:0, blView:'repo' });
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
      activity:[['Record created', this.ROLES[this.state.roleKey].person, this.todayStr()]] };
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
          open:()=>this.setState({ blRecord:idx, blTab:0 }) }; });
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
    const st=this.blStatusTone(d.status);
    const tabs=['Domain Details','Quality Metrics','Platform Rules','Linked Services','Notes','Activity Log'];
    return {
      bd_name:isNew?'New domain':d.name, bd_url:d.url||'—', bd_isNew:!!isNew,
      bd_status:d.status, bd_statusBg:st.bg, bd_statusColor:st.color,
      bd_sub:[d.platform,d.category,d.industry].filter(Boolean).join(' · ')||'Fill in the details below',
      bd_tabs:tabs.map((t,i)=>({ label:t, go:()=>this.setState({blTab:i}), style:'flex:none;padding:9px 13px;border:none;background:none;border-bottom:2px solid '+(i===tab?'var(--orchid-500)':'transparent')+';font-size:13px;font-weight:700;cursor:pointer;color:'+(i===tab?'var(--beet-700)':'var(--ink-500)')+';margin-bottom:-1px;white-space:nowrap' })),
      bd_tab0:tab===0, bd_tab1:tab===1, bd_tab2:tab===2, bd_tab3:tab===3, bd_tab4:tab===4, bd_tab5:tab===5,
      bd_ident:[['Domain Name',d.name],['Domain URL',d.url],['Platform Type',d.platform],['Category',d.category],['Industry',d.industry],['Target Country',d.country],['Language',d.language],['Description',d.description]].map(x=>({k:x[0],v:x[1]||'—'})),
      bd_dates:[['Status',d.status],['Active Status',d.active],['Found Date',d.found],['Verified Date',d.verified],['Last Checked',d.lastChecked],['Checked By',d.checkedBy],['Next Check',d.nextCheck],['Verification Frequency',d.freq]].map(x=>({k:x[0],v:x[1]||'—'})),
      bd_tags:d.tags, bd_hasTags:d.tags.length>0,
      bd_quality:[['Domain Authority (DA)',d.da+(d.da==='—'?'':'/100'),this.blScoreColor(d.da)],['Domain Rating (DR)',d.dr+(d.dr==='—'?'':'/100'),this.blScoreColor(d.dr)],['Spam Score',d.spam+(d.spam==='—'?'':'%'),this.blScoreColor(d.spam,true)],['Traffic (est.)',d.traffic,'var(--beet-700)'],['Backlinks (est.)',d.backlinks,'var(--beet-700)']].map(x=>({k:x[0],v:String(x[1]),color:x[2]})),
      bd_qmeta:[['Follow Type',d.followType],['Link Placement',d.placement],['Paid / Free',d.paid],['Approval Required',d.approval],['Est. Approval Time',d.approvalTime]].map(x=>({k:x[0],v:x[1]||'—'})),
      bd_features:Object.entries(d.features).map(([k,v])=>({ label:k, on:v, icon:v?'check-square':'square', color:v?'var(--verify-600)':'var(--ink-400)' })),
      bd_notes:d.notes||'No notes yet.',
      bd_brands:d.brands, bd_services:d.services, bd_hasBrands:d.brands.length>0, bd_hasServices:d.services.length>0,
      bd_linkStats:[['Submitted URLs',String(d.submittedUrls)],['Live Backlinks',String(d.liveBacklinks)],['Last Live Check',d.lastLiveCheck],['Success Rate',d.successRate]].map(x=>({k:x[0],v:x[1]})),
      bd_activity:d.activity.map(a=>({action:a[0],who:a[1],when:a[2]})),
      bd_back:()=>this.setState({ blRecord:null, blView:'repo' }),
      bd_edit:()=>this.flash(isNew?'Fill the form and save (demo).':'Edit mode (demo) — fields become editable.'),
      bd_save:()=>{ this.setState({blRecord:null, blView:'repo'}); this.flash(isNew?'Domain added to repository (Draft).':'Changes saved.'); },
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
    const expected = o.cycleElapsed; // % of cycle elapsed
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
    const me=this.ROLES[rk].person;
    const own=['senior','junior'].includes(rk);
    const fileType=(n)=>{ const e=String(n).split('.').pop().toLowerCase();
      if(['png','jpg','jpeg','gif','webp','svg'].includes(e)) return {t:'Image',icon:'image',color:'var(--orchid-600)',bg:'var(--orchid-100)'};
      if(['mp4','mov','webm'].includes(e)) return {t:'Video',icon:'video',color:'var(--info-600)',bg:'var(--info-100)'};
      if(e==='pdf') return {t:'PDF',icon:'file-text',color:'var(--danger-600)',bg:'var(--danger-100, #F7E3E6)'};
      if(['xlsx','csv','xls'].includes(e)) return {t:'Spreadsheet',icon:'table',color:'var(--verify-600)',bg:'var(--verify-100)'};
      return {t:'Document',icon:'file',color:'var(--ink-500)',bg:'var(--surface-50)'}; };
    let files=[];
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
        open:()=>this.setState({ route:'tasks', tkOpen:f.task.id }) }; });
    const filtered=enriched.filter(f=> (F.type==='All'||f.type===F.type) && (F.status==='All'||f.status===F.status) && (F.source==='All'||f.source===F.source) && (!q || (f.name+' '+f.taskName+' '+f.by).toLowerCase().includes(q)) );
    const pg=this.pgData('fl',filtered,10);
    const K=(label,value,color)=>({label,value,color});
    return {
      flStats:[K('All files',String(enriched.length),'var(--beet-700)'),K('Images',String(enriched.filter(f=>f.type==='Image').length),'var(--orchid-600)'),K('Documents & PDFs',String(enriched.filter(f=>['Document','PDF','Spreadsheet'].includes(f.type)).length),'var(--info-600)'),K('Videos',String(enriched.filter(f=>f.type==='Video').length),'var(--verify-600)'),K('On tasks awaiting QC',String(enriched.filter(f=>f.status==='Submitted').length),'var(--warn-600)')],
      flRows:pg.rows, flPg:pg, flEmpty:filtered.length===0,
      flOwnNote:own,
      flFilterDefs:[
        {label:'Type',value:F.type,onChange:setF('type'),options:['All','Image','Video','PDF','Spreadsheet','Document']},
        {label:'Source',value:F.source,onChange:setF('source'),options:['All','Task evidence','QC reference','Comment attachment']},
        {label:'Task status',value:F.status,onChange:setF('status'),options:['All','Assigned','In Progress','Submitted','Rework','Approved']},
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
        edit:()=>this.setState({ epView:'create', epPlanId:p.id, epDivision:p.division, epForm:{ name:p.name, quarter:p.period, campaign:p.campaign, dept:p.dept, owner:p.owner, okr:p.okr, start:p.start, end:p.end, type:p.type }, epRows:p.rows.map(r=>({...r})) }),
      };
    });
    const kpiOpts=[{id:'',label:'None — effort only'}].concat(this.epKpiPool().map(k=>({ id:k.id, label:k.id.toUpperCase()+' · '+k.kpi+' — '+k.who })));
    const totalW=rows.reduce((s,r)=>s+(r.weight||0),0);
    const epRows=rows.map((r,i)=>{
      const weekly=Math.ceil((r.monthly||0)/4), daily=Math.ceil((r.monthly||0)/(r.days||25));
      const k=this.epKpiPool().find(x=>x.id===r.kpiId);
      return { ...r, i, monthly:String(r.monthly||0), weekly:weekly.toLocaleString('en-US'), daily:daily.toLocaleString('en-US'), weightStr:String(r.weight||0),
        kpiLabel:k?k.kpi:'—', hasKpi:!!k,
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
      epSetName:setF('name'), epSetQuarter:setF('quarter'), epSetCampaign:setF('campaign'), epSetDept:setF('dept'), epSetOwner:setF('owner'), epSetOkr:setF('okr'), epSetStart:setF('start'), epSetEnd:setF('end'), epSetType:setF('type'),
      epTotalW:totalW+'%', epTotalWColor: totalW===100?'var(--verify-600)':'var(--danger-600)',
      epBalanced: totalW===100,
      epBalanceMsg: totalW===100?'All targets balanced — ready for task generation.':'Weightages must total 100% (currently '+totalW+'%).',
      epGenerated:this.state.epGenerated,
      epGenerate:()=>this.epGenerate(),
      epOwnerOptions:['Neha Verma','Sameer Iyer'],
    };
  }
  epGenerate(){
    const f=this.state.epForm||this.EP_FORM();
    const rows=this.state.epRows||this.EP_DIV_ROWS(this.state.epDivision||'SEO');
    const totalW=rows.reduce((s,r)=>s+(r.weight||0),0);
    if(totalW!==100){ this.flash('Rebalance first — weightages must total 100%.'); return; }
    const who=this.ROLES[this.state.roleKey].person;
    const division=this.state.epDivision||'SEO';
    const added=[...(this.state.tkAdded||[])];
    const startFmt=this.fmtDate(f.start)||'Jul 1, 2026';
    const monthWord=startFmt.split(' ')[0];
    const year=startFmt.split(', ')[1]||'2026';
    const mk=(name,desc,units,end,checklist,r,k)=>{
      const id='TSK-'+(2060+added.length+1);
      added.push({ id, name, desc, template:'Effort plan', project:f.campaign, campaign:f.campaign, start:f.start, end, priority:r.priority, assignee:f.owner, kpiId:r.kpiId||'', kpi:k?k.kpi:'Not linked', units, unit:r.unit, estH:0, actH:0, recurrence:'None', reviewer:who, effortPlan:f.name, effortType:r.type, division, checklist, dep:'—', evidence:[], status:'Assigned', activity:[[who,'Generated from effort plan “'+f.name+'”',this.todayStr()]] });
    };
    let n=0, batched=0;
    rows.forEach(r=>{
      if(!r.monthly) return;
      const k=this.epKpiPool().find(x=>x.id===r.kpiId);
      const days=r.days||25;
      if(r.monthly<=31){
        // discrete deliverables → one task per unit (12 blogs = 12 tasks)
        for(let i=1;i<=r.monthly;i++){
          const day=Math.min(28, Math.max(1, Math.ceil(i*days/r.monthly)));
          mk(r.type+' — '+i+' of '+r.monthly, 'Deliverable '+i+' of '+r.monthly+' from the '+f.name+'. Each approved task adds +1 '+r.unit.replace(/s$/,'')+' to the linked KPI.', 1, monthWord+' '+day+', '+year, [{t:'Produce 1 '+r.unit.replace(/s$/,''),done:false},{t:'Attach deliverable as evidence',done:false},{t:'Submit for QC',done:false}], r, k);
          n++;
        }
      } else {
        // high-volume effort → weekly batch tasks
        const perWeek=Math.ceil(r.monthly/4);
        for(let w=1;w<=4;w++){
          mk(r.type+' — week '+w+' batch ('+perWeek.toLocaleString('en-US')+' '+r.unit+')', 'Weekly batch '+w+' of 4 · monthly target '+r.monthly.toLocaleString('en-US')+' '+r.unit+' ('+Math.ceil(r.monthly/days).toLocaleString('en-US')+'/day). Approved batches roll into the linked KPI.', perWeek, monthWord+' '+Math.min(28,w*7)+', '+year, [{t:'Hit weekly batch of '+perWeek.toLocaleString('en-US')+' '+r.unit,done:false},{t:'Attach work log as evidence',done:false},{t:'Submit for QC',done:false}], r, k);
          n++; 
        }
        batched++;
      }
    });
    this.setState({ tkAdded:added, epGenerated:true, route:'tasks', tkFilter:f.name });
    this.flash(n+' tasks generated — one per deliverable (batched weekly for high-volume efforts), all linked to the plan & KPIs, assigned to '+f.owner+'.');
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
    const who=this.ROLES[this.state.roleKey].person;
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
      idfCampaignOptions:opts('campaign',['— Optional —','Content Engine Q1','Q3 SEO push','Organic Growth Q1','Social Push Q1','CRO Sprint']),
      idfOwnerOptions:['Sameer Iyer','Neha Verma'],
      idfEffortOptions:this.allEpPlans().map(p=>p.name),
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
        duplicate:()=>{ const nid='TPL-'+String(100+all.length+1).slice(-3); this.setState({ ttAdded:[...(this.state.ttAdded||[]),{...t,id:nid,name:t.name+' (copy)',status:'Draft',owner:this.ROLES[rk].person,updated:this.todayStr()}] }); this.flash('Template duplicated as '+nid+' (Draft).'); },
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
      duplicate:()=>{ const nid='kt'+(allK.length+1)+'c'; this.setState({ ktAdded:[...(this.state.ktAdded||[]),{...t,id:nid,name:t.name+' (copy)',status:'Draft',owner:this.ROLES[rk].person,updated:this.todayStr()}] }); this.flash('KPI template duplicated (Draft).'); },
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
      duplicate:()=>{ const nid='ot'+(allO.length+1)+'c'; this.setState({ otAdded:[...(this.state.otAdded||[]),{...t,id:nid,name:t.name+' (copy)',status:'Draft',owner:this.ROLES[rk].person,updated:this.todayStr()}] }); this.flash('OKR template duplicated (Draft).'); },
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
        const rec={ name:of2.name.trim(), category:of2.category||'SEO', scope:of2.scope||'Department', division:of2.division||'SEO', objective:of2.objective||'', desc:of2.desc||'', status:of2.status||'Active', krs, owner:this.ROLES[rk].person, updated:this.todayStr() };
        if(this.state.otEditId){ this.setState({ otUpd:{...(this.state.otUpd||{}),[this.state.otEditId]:rec}, otNew:false, otEditId:null, otForm:{} }); this.flash('OKR template updated.'); }
        else { const nid='ot'+(this.allOkrTemplates().length+1); this.setState({ otAdded:[...(this.state.otAdded||[]),{id:nid,...rec}], otNew:false, otForm:{} }); this.flash('OKR template created — pull it from Create New OKR.'); }
      },
      ktRows:kpg.rows, ktPg:kpg, ktStats,
      ktNew:this.state.ktNew, ktf:kf,
      ktFormTitle:this.state.ktEditId?'Edit KPI template':'New KPI template',
      ktClose:()=>this.setState({ ktNew:false, ktEditId:null, ktForm:{} }),
      ktSetName:setKf('name'), ktSetCategory:setKf('category'), ktSetDivision:setKf('division'), ktSetUnit:setKf('unit'), ktSetDirection:setKf('direction'), ktSetDefTarget:setKf('defTarget'), ktSetFreq:setKf('freq'), ktSetSource:setKf('source'), ktSetDesc:setKf('desc'), ktSetStatus:setKf('status'),
      ktSave:()=>{
        if(!(kf.name&&kf.name.trim())){ this.flash('Enter a KPI name.'); return; }
        const rec={ name:kf.name.trim(), category:kf.category||'Traffic', division:kf.division||'SEO', unit:kf.unit||'count', direction:kf.direction||'Increase', defTarget:kf.defTarget||'—', freq:kf.freq||'Monthly', source:kf.source||'Manual', desc:kf.desc||'', status:kf.status||'Active', owner:this.ROLES[rk].person, updated:this.todayStr() };
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
        const rec={ name:f.name.trim(), division:f.division||'SEO', desc:f.desc||'', kpiId:f.kpiId||'', unit:f.unit||'', estH:parseInt(f.estH,10)||0, priority:f.priority||'Medium', recurrence:f.recurrence||'None', status:f.status||'Active', checklist:steps, owner:this.ROLES[rk].person, updated:this.todayStr() };
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
  tkDivision(t){
    if(t.division) return t.division;
    const map={'Update Meta Descriptions':'SEO','Fix Broken Links':'SEO','Add Alt Text':'SEO','Keyword Research':'SEO','Write Article':'Content'};
    return map[t.template]||'Content';
  }
  tkDivTone(d){ return { Content:{bg:'var(--orchid-100)',c:'var(--orchid-700)'}, Graphics:{bg:'var(--warn-100)',c:'var(--warn-600)'}, 'Web Dev':{bg:'var(--info-100)',c:'var(--info-600)'}, 'Web Developers':{bg:'var(--info-100)',c:'var(--info-600)'}, SMM:{bg:'var(--danger-100)',c:'var(--danger-600)'}, SEO:{bg:'var(--verify-100)',c:'var(--verify-600)'} }[d]||{bg:'var(--surface-50)',c:'var(--ink-500)'}; }
  tkOv(t){ const o=((this.state.tkUpd||{})[t.id])||{}; return {...t, ...o}; }
  allTasks(){ return this.WTASKS().concat(this.state.tkAdded||[]).map(t=>this.tkOv(t)); }
  tkPatch(id, patch, act){
    const t=this.allTasks().find(x=>x.id===id); if(!t) return;
    const upd={...(this.state.tkUpd||{})};
    upd[id]={ ...(upd[id]||{}), ...patch, activity:[...(t.activity||[]), [this.ROLES[this.state.roleKey].person, act, this.todayStr()]] };
    this.setState({ tkUpd:upd });
    this._persistTaskPatch(id, patch);
  }
  // Fire-and-forget: syncs to Supabase when this task exists there (created
  // via tkSubmitNew). No-ops harmlessly for the built-in demo-only tasks.
  _persistTaskPatch(code, patch){
    const dbPatch={};
    if('status' in patch) dbPatch.status=patch.status;
    if('checklist' in patch) dbPatch.checklist=patch.checklist;
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
    const rk=this.state.roleKey, person=this.ROLES[rk].person;
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
      tkNewOpen:()=>this.setState({ tkNew:true, tkForm:{ template:'Custom task', priority:'Medium', assignee:'Neha Verma', recurrence:'None' } }),
      ...this.tkDetailData(), ...this.tkFormData() };
  }

  tkDetailData(){
    const id=this.state.tkOpen; if(!id) return { tkDrawerOpen:false };
    const t=this.allTasks().find(x=>x.id===id); if(!t) return { tkDrawerOpen:false };
    const rk=this.state.roleKey, person=this.ROLES[rk].person;
    const isAssignee=t.assignee===person;
    const isApprover=['manager','team_lead','admin'].includes(rk);
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
      tkMeta:meta.map(m=>({k:m[0],v:m[1]})), tkChecklist:checklist, tkEvidence:evidence, tkHasEvidence:evidence.length>0,
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
      tkAssigneeOptions:['Neha Verma','Sameer Iyer'],
      tkDepOptions:['—'].concat(this.allTasks().map(t=>t.id+' — '+t.name)),
      tkSetTemplate:set('template'), tkSetName:set('name'), tkSetDesc:set('desc'), tkSetProject:set('project'), tkSetCampaign:set('campaign'), tkSetStart:set('start'), tkSetEnd:set('end'), tkSetPriority:set('priority'), tkSetAssignee:set('assignee'), tkSetKpi:set('kpiId'), tkSetUnits:set('units'), tkSetEst:set('estH'), tkSetRecurrence:set('recurrence'), tkSetDep:set('dep'), tkSetDepMode:set('depMode'), tkSetReviewer:set('reviewer'), tkSetDivision:set('division'),
      tkDivisionOptions:['Content','Graphics','Web Developers','SMM','SEO'],
      tkReviewerOptions:['Aditi Rao (Team Lead)','Priya Nair (Manager)','Farhan Ali (QC Reviewer)'],
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
    const who=this.ROLES[this.state.roleKey].person;
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

  _saveOkr(activate, wOk, wTotal, existingCount, rk){
    const f=this.state.okrForm||{};
    if(!f.title||!f.title.trim()){ this.flash('Enter an objective title.'); return; }
    if(activate && !wOk){ this.flash('Key-result weights must total 100% (now '+wTotal+'%).'); return; }
    const code='OKR-'+(this.ROLES[rk].bucket==='admin'?'GEN':'SEO')+'-Q1-'+String(existingCount+1).padStart(3,'0');
    const krs=(this.state.okrDraftKRs||[]).map((k,i)=>({
      t:'Key result '+(i+1), kpi:'KPI '+(i+1), baseline:'0', target:'100', current:'0', unit:'units',
      weight:parseInt(k.weight,10)||0, who:f.owner, freq:'Monthly', due:'Mar 31', status:'Active',
    }));
    const okr={
      id:'okr-local-'+Date.now(), code, v:'v1.0', scope:'Department', title:f.title.trim(), desc:f.desc||'',
      owner:f.owner, team:'', cycle:'Q1 2026', brand:f.brand, dept:f.dept, campaign:'', category:f.category||f.dept,
      progress:0, due:'Mar 31, 2026', start:this.todayStr(), daysLeft:90, cycleElapsed:0,
      status: activate?'Active':'Draft', weight:100, reviewer:this.ROLES[rk].person, approver:this.ROLES[rk].person,
      krs,
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
      name:p.full_name||p.email, sub:(p.designation||roleLabel(p.role_key))+' · '+(p.department||'—'),
      role:roleLabel(p.role_key), dept:p.department||'—', status:p.status||'Active',
      statusTone: (p.status||'Active')==='Active'?'ok':'warn',
    }));
    if(mapped.length) this.setState({ users:mapped });
  }

  checkinView(){
    const rk = this.state.roleKey;
    const person = this.ROLES[rk].person;
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
      contentAI:()=>this.flash('AI Content Assistant — coming soon.'),
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
      npOwnerName: f.owner||this.ROLES[this.state.roleKey].person, npToday:this.todayStr(),
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
    const owner=f.owner||this.ROLES[this.state.roleKey].person; const reviewer=f.reviewer||'—';
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
      cd_pub:[['Owner',p.owner],['Reviewer',p.reviewer],['Approver',p.reviewer],['Publish Date',p.publishDate],['Expiry Date',p.expiry],['Version',p.version]].map(x=>({k:x[0],v:x[1]})),
      cd_analytics:[['Organic Traffic',p.analytics.traffic],['CTR',p.analytics.ctr],['Avg Position',p.analytics.pos],['Bounce Rate',p.analytics.bounce],['Time on Page',p.analytics.time],['Conversions',p.analytics.conv],['Backlinks',p.analytics.backlinks],['Page Speed',p.analytics.speed]].map(x=>({k:x[0],v:x[1]})),
      cd_activity:(p.activity||[]).map(a=>({ who:a[0], action:a[1], date:a[2] })),
      closeContent:()=>this.setState({cOpen:null}),
      contentAINote:()=>this.flash('AI suggestion accepted (demo).'),
    };
  }

  okrRowAct(o,name){ return (e)=>{ if(e)e.stopPropagation(); this.setState({ okrMenu:null }); this.flash(name+' “'+o.title+'”'); }; }
  okrBulkAct(name){ return ()=>{ const n=this.state.okrSelected.length; this.setState({ okrSelected:[] }); this.flash(name+' '+n+' OKR'+(n===1?'':'s')); }; }

  okrView(){
    const rk = this.state.roleKey;
    const canEdit = ['manager','admin'].includes(rk);
    const all = this.OKR_DATA().concat(this.state.okrAdded||[]);
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
        viewAct: this.okrRowAct(o,'Viewing'), editAct: this.okrRowAct(o,'Editing'), cloneAct: this.okrRowAct(o,'Cloned'), archiveAct: this.okrRowAct(o,'Archived'),
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
    const drafts = this.state.okrDraftKRs;
    const wTotal = drafts.reduce((s,k)=>s+(parseInt(k.weight,10)||0),0);
    const wOk = wTotal===100;
    const setDraft=(id,field)=>(e)=>{ const v=e.target.value; this.setState({ okrDraftKRs:this.state.okrDraftKRs.map(x=>x.id===id?{...x,[field]:v}:x) }); };
    const okrDraftKRs = drafts.map((k,i)=>({ n:i+1, weight:k.weight, kr:k.kr||'', kpiSel:k.kpiSel||'', unit:k.unit||'', baseline:k.baseline||'', target:k.target||'', current:k.current||'',
      setKr:setDraft(k.id,'kr'), setKpiSel:setDraft(k.id,'kpiSel'), setUnit:setDraft(k.id,'unit'), setBaseline:setDraft(k.id,'baseline'), setTarget:setDraft(k.id,'target'), setCurrent:setDraft(k.id,'current'),
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
      okrNew:()=>{ if(canEdit) this.setState({ showOkrPanel:true, okrSection:'okrA', okrForm:{ title:'', desc:'', owner:'Sarah Johnson', dept:'SEO', brand:'Beetloop', category:'SEO' } }); else this.flash('Only Managers and Admin can create OKRs.'); },
      showOkrPanel:this.state.showOkrPanel, closeOkr:()=>this.setState({ showOkrPanel:false }),
      okrForm:this.state.okrForm,
      okrSetTitle:e=>this.setState({ okrForm:{...this.state.okrForm, title:e.target.value} }),
      okrSetDesc:e=>this.setState({ okrForm:{...this.state.okrForm, desc:e.target.value} }),
      okrSetOwner:e=>this.setState({ okrForm:{...this.state.okrForm, owner:e.target.value} }),
      okrSetDept:e=>this.setState({ okrForm:{...this.state.okrForm, dept:e.target.value} }),
      okrSetBrand:e=>this.setState({ okrForm:{...this.state.okrForm, brand:e.target.value} }),
      saveOkr:()=>this._saveOkr(true, wOk, wTotal, list.length, rk),
      saveOkrDraft:()=>this._saveOkr(false, wOk, wTotal, list.length, rk),
      okrSteps, kpiOptions, okrDraftKRs,
      okrTplOptions, okrTplPick, okrTplVal:this.state.okrTpl||'',
      okrTaskOptions:this.allTasks().slice(0,10).map(t=>t.id+' — '+t.name),
      okrEffortOptions:this.allEpPlans().map(p=>p.name+' ('+p.division+')'),
      okrAddKR:()=>this.setState({ okrDraftKRs:[...this.state.okrDraftKRs,{id:this.state.okrKRSeq,weight:'0'}], okrKRSeq:this.state.okrKRSeq+1 }),
      okrWeightTotal:wTotal, okrWeightBg: wOk?'var(--verify-100)':'var(--warn-100)', okrWeightColor: wOk?'var(--verify-600)':'var(--warn-600)',
      okrNewCode:'OKR-'+(this.ROLES[rk].bucket==='admin'?'GEN':'SEO')+'-Q1-'+String(list.length+1).padStart(3,'0'),
      okrAuditUser:this.ROLES[rk].person+' ('+this.ROLES[rk].label+')',
    };
  }

  tableData(route, rk, lvl, readOnly){
    const canEdit = this.EDIT_LEVELS.includes(lvl);
    const tag=(t,tone)=>({tag:t,tagBg:{ok:'var(--verify-100)',warn:'var(--warn-100)',info:'var(--info-100)',draft:'var(--surface-50)'}[tone],tagColor:{ok:'var(--verify-600)',warn:'var(--warn-600)',info:'var(--info-600)',draft:'var(--ink-500)'}[tone]});
    const act=(label,fn,primary)=>({actionLabel:label,action:fn,actionStyle: primary
      ? 'padding:6px 13px;border:none;background:#7A1C46;color:#fff;border-radius:9px;font-size:12.5px;font-weight:700;cursor:pointer'
      : 'padding:6px 13px;border:1px solid var(--line-300);background:#fff;color:var(--ink-700);border-radius:9px;font-size:12.5px;font-weight:600;cursor:pointer'});

    if(route==='users'){
      return {
        tableCols:['User','Department','Status','Role','Actions'],
        tableRows:this.state.users.map(u=>({
          c0:u.name, c0sub:u.sub, c1:u.dept, c3:u.role,
          ...tag(u.status, u.statusTone==='ok'?'ok':'warn'),
          ...act(rk==='admin'?'Manage':'View', ()=>this.flash(rk==='admin'?'Opening user record…':'View only.'), false),
        })),
      };
    }
    const scoped = (rows)=> (rk==='junior') ? rows.slice(0,2) : (rk==='senior'? rows.slice(0,3) : rows);
    const viewer = ()=>this.flash('View only — your role can’t change this.');
    const editor = (m)=>()=>this.flash(m);

    if(route==='projects'){
      const rows = scoped([
        ['Pubrica SEO program','12-month retainer','SEO · Aditi Rao',tag('On track','ok')],
        ['Food Research Lab — content','Editorial retainer','Content · Karan Shah',tag('In progress','info')],
        ['Statswork website rebuild','Landing pages','Web Dev · Web team',tag('At risk','warn')],
        ['PepCreations launch','Nutraceutical','Cross-dept · Priya Nair',tag('Planned','info')],
        ['Tutors India local SEO','Local search','SEO · Sameer Iyer',tag('On track','ok')],
      ]);
      return { tableCols:['Project','Type','Owner','Status','Actions'], tableRows:rows.map(r=>({c0:r[0],c0sub:'',c1:r[2],...r[3],c3:'',...act(canEdit?'Edit':'View',canEdit?editor('Opening project editor…'):viewer,canEdit)})) };
    }
    if(route==='campaigns'){
      const rows = scoped([
        ['Q3 SEO push — Pubrica','SEO Campaign','Live',tag('Live','ok')],
        ['Reel series — Statswork','SMM Campaign','Live',tag('Live','ok')],
        ['Whitepaper funnel — FRL','Content Campaign','Draft',tag('Draft','draft')],
        ['Backlink outreach — Tutors','SEO Campaign','Scheduled',tag('Scheduled','info')],
      ]);
      return { tableCols:['Campaign','Type','Phase','Status','Actions'], tableRows:rows.map(r=>({c0:r[0],c0sub:'',c1:r[1],...r[3],c3:r[2],...act(canEdit?'Edit':'View',canEdit?editor('Opening campaign…'):viewer,canEdit)})) };
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
    // repositories
    const rows=[
      ['Content repository','Blogs, whitepapers, case studies','842 items',tag('Content','info')],
      ['SEO repository','Audits, keyword sets, reports','516 items',tag('SEO','info')],
      ['Asset library','Banners, reels, thumbnails','1,204 items',tag('Assets','info')],
      ['Promotions repository','Offers & creative','98 items',tag('Promotions','info')],
    ];
    const useLabel = ['junior','senior'].includes(rk)?'Open':(canEdit?'Manage':'View');
    return { tableCols:['Repository','Contents','Items','Category','Actions'], tableRows:rows.map(r=>{
      const base={c0:r[0],c0sub:r[1],c1:'',...r[3],c3:r[2]};
      if(r[0]==='Content repository') return {...base, ...act('Open ideas', ()=>this.setState({ route:'ideas' }), true)};
      return {...base, ...act(useLabel, canEdit?editor('Opening repository…'):editor('Opening (read-only)…'), canEdit)};
    }) };
  }

  uf(k,e){ this.setState({ uf:{...this.state.uf,[k]:e.target.value} }); }
  async submitUser(){
    const f=this.state.uf;
    if(!f.first.trim()||!f.email.trim()){ this.flash('First name and email are required.'); return; }
    const name=(f.first+' '+f.last).trim();
    const u={ name, sub:(f.designation||f.role)+' · '+f.dept, role:f.role, dept:f.dept, status:'Pending Invitation', statusTone:'warn' };
    this.setState({ users:[u,...this.state.users], showUserModal:false, uf:{ first:'', last:'', email:'', mobile:'', dept:'SEO', designation:'', manager:'Priya Nair (Manager)', lead:'Aditi Rao (SEO Lead)', role:'Junior Executive' } });
    const roleKey=Object.entries(this.ROLES).find(([,r])=>r.label===f.role);
    try{
      const resp=await fetch('/api/invite-user', {
        method:'POST', headers:{ 'Content-Type':'application/json' },
        body:JSON.stringify({ email:f.email.trim(), fullName:name, roleKey:roleKey?roleKey[0]:'junior', department:f.dept, designation:f.designation }),
      });
      const body=await resp.json();
      if(!resp.ok) throw new Error(body.error||'Invite failed');
      this.flash('User created — activation link sent to '+f.email+'.');
      this._loadTeam();
    }catch(err){
      this.flash('Could not send invite ('+err.message+'). The user still appears locally.');
    }
  }

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
    // Fall back to the built-in demo accounts (no real Supabase user needed).
    const r=this.DEMO[em];
    if(r && pw==='demo123'){
      this.setState({ screen:'app', roleKey:r, route:'dashboard', loginError:'', authBusy:false, authUser:null, authProfile:null });
    } else {
      this.setState({ loginError: error ? error.message : 'Invalid credentials. Pick a demo account below to sign in.', authBusy:false });
    }
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
    this._subscribeRealtime();
  }

  // Live notifications: pushes a toast-style entry whenever a task or OKR is
  // created/updated by anyone, so multi-user changes show up without a reload.
  _subscribeRealtime(){
    if(this._realtimeChannel) return;
    const push=(text)=>{
      const entry={ id:Date.now()+Math.random(), text, time:new Date().toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'}), read:false };
      this.setState(s=>({ notifications:[entry, ...(s.notifications||[])].slice(0,30) }));
    };
    this._realtimeChannel = supabase.channel('beetloop-changes')
      .on('postgres_changes', { event:'INSERT', schema:'public', table:'tasks' }, (payload)=>{
        push('New task created: '+(payload.new.name||payload.new.code));
        this._loadTasks();
      })
      .on('postgres_changes', { event:'UPDATE', schema:'public', table:'tasks' }, (payload)=>{
        push('Task '+payload.new.code+' updated — status: '+payload.new.status);
        this._loadTasks();
      })
      .on('postgres_changes', { event:'INSERT', schema:'public', table:'okrs' }, (payload)=>{
        push('New OKR created: '+payload.new.title);
        this._loadOkrs();
      })
      .on('postgres_changes', { event:'UPDATE', schema:'public', table:'okrs' }, (payload)=>{
        push('OKR '+payload.new.code+' updated — status: '+payload.new.status);
        this._loadOkrs();
      })
      .on('postgres_changes', { event:'INSERT', schema:'public', table:'profiles' }, (payload)=>{
        push('New team member: '+(payload.new.full_name||payload.new.email));
        this._loadTeam();
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
