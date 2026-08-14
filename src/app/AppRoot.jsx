import React from 'react';
import { supabase } from '../utils/supabaseClient.js';
import { applyTheme, applyFavicon, applyBranding } from '../utils/theme.js';

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
    clFill: {}, clQc: {}, clSubmitted: {}, clTypeQc: {}, clCampaignQc: {},
    tkDeletedIds: [],
    leadsTab: 'leads', leadAdded: [], contactAdded: [], contactUpd: {}, contactDeleted: [], cnOpen: null, cnNew: false, cnForm: {},
    ldFilters: {service:'All',source:'All',range:'This week'}, ldForm: {}, ldTarget: '10', ldPeriod: 'Weekly',
    pipeFilters: {stage:'All',service:'All',country:'All',owner:'All'},
    showUserModal: false,
    showMasterRecordEdit: false, mrKey: null, mrIndex: null, mrForm: {}, masterAdded: {}, masterDeleted: {},
    masterKey: null, masterRecord: null, masterTab: 0, masterQuery: '',
    okrExpanded: [], showOkrPanel: false, okrRecord: null, okrSection: 'okrA', okrOpen: null,
    okrAdded: [], okrUpd: {}, okrEditId: null, okrDeleted: [],
    okrForm: { title:'', desc:'', owner:'Sarah Johnson', dept:'SEO', brand:'Beetloop', category:'SEO' },
    recordsAdded: [], showRecordModal: false, recordKind: 'projects',
    recordForm: { name:'', type:'', owner:'', status:'On track' },
    recordOverrides: {}, recordEditKey: null, recordIsReal: false,
    cmpFilters: {status:'All',type:'All',dept:'All'}, cmpOpen: null, cmpTab: 'overview',
    cmpNew: false, cmpEditId: null, cmpForm: {}, cmpSection: 'cmpA', cmpEffExpanded: [],
    cmpAdded: [], cmpUpd: {}, cmpDeleted: [], cmpNewEffort: null,
    thOpen: null, thAdded: {}, thNew: [], thForm: null, msgDraft: '', msgFiles: [], msgLink: null,
    fpTarget: null, fpTitle: '', fpTab: 'browse', fpSel: [], fpQuery: '', fpType: 'All', fpName: '', fpKind: 'PDF',
    fileBlobs: {}, fpvFile: null,
    tkTab: 'list', trFilters: {group:'assignee',assignee:'All',campaign:'All',period:'All'}, calF: null, calOff: 0,
    showRoleConfirm: false, roleConfirmKey: null, roleConfirmAction: null,
    showDeleteConfirm: false, deleteConfirmTitle: '', deleteConfirmBody: '', deleteConfirmLabel: 'Delete', deleteConfirmAction: null,
    okrDraftKRs: [ {id:1, weight:'50'}, {id:2, weight:'50'} ], okrKRSeq: 3,
    okrFilters: { dept:'All', status:'All', priority:'All', brand:'All' }, okrSelected: [], okrMenu: null,
    ciOpen: false, ciType: null, ciCtx: null, ciForm: {}, ciAdded: {}, historyOkr: null, kpiActuals: {}, taskDone: {},
    tkUpd: {}, tkAdded: [], tkOpen: null, tkNew: false, tkForm: {}, tkFilter: 'All', tkFilters: {status:'All',priority:'All',assignee:'All'}, tkPage: 0, qcFb: {}, tkComment: '', tkCommentFiles: [],
    ttAdded: [], ttUpd: {}, ttNew: false, ttEditId: null, ttForm: {}, ttFilters: {division:'All',status:'All'}, ttTab: 'task', ttDeleted: [],
    ktAdded: [], ktUpd: {}, ktNew: false, ktEditId: null, ktForm: {}, ktDeleted: [],
    otAdded: [], otUpd: {}, otNew: false, otEditId: null, otForm: {}, okrTpl: '', otDeleted: [],
    ideaAdded: [], ideaUpd: {}, ideaForm: {}, showIdeaForm: false, ideaFilters: {status:'All', quarter:'All'}, ideaOpen: null, qcRef: {}, ideaStep: 1, ideaCmt: {}, ideaDeleted: [],
    epForm: null, epRows: null, epGenerated: false, epView: 'list', epDivision: 'Content Writer', epPlanId: null, epAdded: [], epDeleted: [],
    epFilters: {year:'All', period:'All', role:'All'}, epCustomDivs: [], epAddingDiv: false, epNewDiv: '', epRowAdds: {},
    pg: {}, tblQuery: '', qcStatusF: 'All',
    showNewPage: false, npForm: {}, npTab: 0, npLinks: [{anchor:'',target:''}], npMedia: [{name:'',alt:'',type:'Image'}], cAdded: [], cUpd: {}, npEditId: null, cDeleted: [],
    umTab: 'list', rolePerms: {}, permRole: 'manager',
    uf: { first:'', last:'', email:'', mobile:'', dept:'SEO', designation:'', manager:'', lead:'', role:'Junior Executive', shiftStart:'09:00', shiftEnd:'18:00', breakMin:'60', days:'5', brands:[] },
    users: [],
    services: [
      { name:'SEO', sub:'Search engine optimization', subs:'4 sub-services', status:'Active' },
      { name:'Content Writing', sub:'Editorial & long-form', subs:'6 sub-services', status:'Active' },
      { name:'Technical SEO', sub:'Site health & Core Web Vitals', subs:'3 sub-services', status:'Active' },
      { name:'Web Development', sub:'Builds & landing pages', subs:'5 sub-services', status:'Active' },
      { name:'Social Media', sub:'SMM & community', subs:'4 sub-services', status:'Active' },
      { name:'CRO', sub:'Conversion optimization', subs:'2 sub-services', status:'Draft' },
    ],
  };

  ROLES = {
    admin:{ label:'Admin', short:'AD', tag:'Platform Admin', person:'', color:'#7A1C46', bucket:'admin' },
    ceo:{ label:'CEO', short:'CEO', tag:'Chief Executive', person:'', color:'#2B0B1B', bucket:'exec' },
    coo:{ label:'COO', short:'COO', tag:'Chief Operating Officer', person:'', color:'#4E1631', bucket:'ops' },
    manager:{ label:'Manager', short:'MG', tag:'Marketing Manager', person:'', color:'#8E3F6C', bucket:'manager' },
    team_lead:{ label:'Team Lead', short:'TL', tag:'SEO Team Lead', person:'', color:'#A24E7E', bucket:'lead' },
    senior:{ label:'Senior Executive', short:'SR', tag:'Senior SEO Executive', person:'', color:'#3C8BB0', bucket:'senior' },
    junior:{ label:'Junior Executive', short:'JR', tag:'Junior SEO Executive', person:'', color:'#2E9A6C', bucket:'junior' },
    qc:{ label:'QC Reviewer', short:'QC', tag:'Quality Reviewer', person:'', color:'#D69327', bucket:'qc' },
    dm:{ label:'Digital Marketing Executive', short:'DM', tag:'Digital Marketing', person:'', color:'#3C6FBD', bucket:'dm' },
    sales:{ label:'Sales Executive', short:'SL', tag:'Sales Executive', person:'', color:'#C77B3E', bucket:'sales', brand:'Food Research Lab' },
    secretary:{ label:'Secretary', short:'SEC', tag:'Company Secretary', person:'', color:'#5B8C5A', bucket:'exec' },
  };

  ACCESS = {
    dashboard:{ ceo:'All', coo:'All', manager:'Department', team_lead:'Team', senior:'Own', junior:'Own', qc:'QC', admin:'All', dm:'Own', sales:'Own', secretary:'All' },
    campaigns:{ ceo:'Full', coo:'View', manager:'Create / Edit', team_lead:'Assign & monitor', senior:'Assigned only', junior:'Assigned only', qc:'View', admin:'Full', dm:'View', secretary:'Full' },
    tasks:{ ceo:'Full', coo:'View', manager:'All', team_lead:'Assign / edit', senior:'Update own', junior:'Update own', qc:'QC tasks', admin:'Full', dm:'Update own', sales:'Update own', secretary:'Full' },
    templates:{ ceo:'Full', coo:'View', manager:'Create / Edit', team_lead:'Create / Edit', admin:'Full', secretary:'Full' },
    files:{ ceo:'Full', coo:'View', manager:'View', team_lead:'View', senior:'Own files', junior:'Own files', qc:'View', admin:'Full', dm:'Own files', sales:'Own files', secretary:'Full' },
    messages:{ ceo:'Full', coo:'Full', manager:'Full', team_lead:'Full', senior:'Own', junior:'Own', qc:'Own', admin:'Full', dm:'Own', sales:'Own', secretary:'Full' },
    sop:{ ceo:'Full', coo:'View', manager:'Create / Edit', team_lead:'Create / Edit', senior:'View', junior:'View', qc:'View', admin:'Full', dm:'View', sales:'View', secretary:'Full' },
    support:{ ceo:'Full', coo:'View', manager:'Team tickets', team_lead:'Team tickets', senior:'Own tickets', junior:'Own tickets', qc:'Own tickets', admin:'Full', dm:'Own tickets', sales:'Own tickets', secretary:'Full' },
    effort:{ ceo:'Full', coo:'View', manager:'Create / Edit', team_lead:'Create / Edit', admin:'Full', secretary:'Full' },
    ideas:{ ceo:'Full', coo:'View', manager:'Create / Edit', team_lead:'Create / Edit', senior:'Create / Edit', junior:'Create / Edit', qc:'View', admin:'Full', secretary:'Full' },
    qc:{ ceo:'Full', manager:'Review', team_lead:'Team QC', qc:'Full', admin:'Full', secretary:'Full' },
    okr:{ ceo:'Full', coo:'View', manager:'Create / Edit', team_lead:'View', senior:'View own', junior:'View own', qc:'View', admin:'Full', dm:'View own', sales:'Leads & pipeline', secretary:'Full' },
    leads:{ ceo:'View', coo:'View', manager:'Create / Edit', team_lead:'View', senior:'View own', junior:'View own', admin:'Full', dm:'View own', sales:'Leads & pipeline', secretary:'View' },
    analytics:{ ceo:'Full', coo:'Operational', manager:'Department', team_lead:'Team', senior:'Own', junior:'Own', qc:'QC', admin:'Full', dm:'Own', secretary:'Full' },
    repositories:{ ceo:'Full', coo:'View', manager:'View', team_lead:'View', senior:'Use assigned', junior:'Use assigned', qc:'View', admin:'Full', dm:'View', sales:'View', secretary:'Full' },
    content:{ ceo:'Full', coo:'View', manager:'Create / Edit', team_lead:'Manage team', senior:'Assigned only', junior:'Assigned only', qc:'View', admin:'Full', dm:'Assigned only', secretary:'Full' },
    masters:{ admin:'Full', ceo:'Full', secretary:'View' },
    users:{ admin:'Full', coo:'Full', ceo:'Full', secretary:'View' },
    // Admin Settings (Platform/Security/Integrations) is Super Admin only —
    // deliberately narrower than every other module here, which is why this
    // is the one ACCESS entry with a single role. CEO/COO/Manager/Secretary
    // used to have View/Full here before the module existed for real; now
    // that it holds real security policy and integration config, only the
    // 'admin' role key (this app's actual top tier) may see or touch it.
    config:{ admin:'Full' },
    profile:{ ceo:'View', coo:'View', manager:'View', team_lead:'View', senior:'View', junior:'View', qc:'View', admin:'View', dm:'View', sales:'View', secretary:'View' },
  };

  // CEO/COO/Admin get broad, near-identical access across every module — so
  // assigning one of these roles is a high-impact action that needs an
  // explicit confirmation step before it's applied. Every other role only
  // ever gets its own scoped access per ACCESS above, so no gate is needed.
  HIGH_PRIVILEGE_ROLES = ['ceo','coo','admin','secretary'];
  roleAccessSummary(roleKey){
    return Object.keys(this.ACCESS).filter(m=>this.ACCESS[m][roleKey]).map(m=>({
      module:(this.MODMETA[m]&&this.MODMETA[m].label)||m, level:this.ACCESS[m][roleKey],
    }));
  }
  // Granular Create/Edit/Delete/View permissions, one boolean set per
  // role x module. Defaults are derived from the existing ACCESS level
  // strings (e.g. 'Full' -> everything, 'View' -> read-only, 'No access'
  // -> nothing) the first time a role/module is looked at, then Admin can
  // override individual actions from the Permissions matrix in User
  // Management — overrides persist in state.rolePerms.
  PERMISSION_MODULES(){ return Object.keys(this.ACCESS); }
  defaultPermsFromLevel(level){
    // auditAll never has a default — it must always come from an explicit
    // rolePerms override written via setPerm(), never inferred from a
    // module's normal access level, including for Admin. See myThreads().
    if(!level || level==='No access') return { view:false, create:false, edit:false, delete:false, approve:false, export:false, auditAll:false };
    const l=String(level).toLowerCase();
    // 'all' is used as a standalone top-tier label in a couple of modules
    // (e.g. ACCESS.tasks.manager='All') meaning the same thing 'Full' means
    // everywhere else — treated as an exact match, not a substring, so it
    // can't accidentally match some other label that merely contains "all".
    const isAll=l==='all';
    // 'own ticket' deliberately excluded — a requester managing only their
    // own submissions is not the same as being able to triage/edit others'
    // tickets, but it used to match this regex and silently granted every
    // "Own tickets" role (junior/senior/qc/dm/sales) the full triage panel.
    const rw=isAll||/full|create|edit|assign|manage|team ticket|leads & pipeline/.test(l);
    const del=isAll||/full/.test(l);
    const approve=isAll||/full|review|qc|approv/.test(l);
    return { view:true, create:rw, edit:rw, delete:del, approve, export:rw||del, auditAll:false };
  }
  getPerm(moduleKey, roleKey){
    const stored=(this.state.rolePerms||{})[moduleKey]&&(this.state.rolePerms||{})[moduleKey][roleKey];
    if(stored) return stored;
    return this.defaultPermsFromLevel(this.ACCESS[moduleKey]&&this.ACCESS[moduleKey][roleKey]);
  }
  setPerm(moduleKey, roleKey, action, value){
    const cur=this.state.rolePerms||{};
    const modPerms=cur[moduleKey]||{};
    const rolePerm=this.getPerm(moduleKey, roleKey);
    const nextPerm={...rolePerm, [action]:value};
    const next={...cur, [moduleKey]:{...modPerms, [roleKey]:nextPerm}};
    this.setState({ rolePerms:next });
    supabase.from('role_permissions').upsert({ module_key:moduleKey, role_key:roleKey, perms:nextPerm }).then(({error})=>{
      if(error) console.warn('[supabase] role permission upsert failed:', error.message);
    });
  }
  hasPerm(moduleKey, action){
    return !!this.getPerm(moduleKey, this.state.roleKey)[action];
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
    leads:{ label:'Leads', icon:'user-plus' },
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
    this._syncStateFromLocation();
    this._syncLocationFromState();
    // Branding/theme must render on the login screen too (login logo,
    // login background, colors) — loaded unconditionally, before any
    // auth check, not just post-login inside _loadProfile().
    this._loadPlatformSettings();

    supabase.auth.getSession().then(({ data:{ session } })=>{
      this.setState({ authReady:true });
      if(session && session.user && this.state.screen!=='activate'){
        this._loadProfile(session.user);
      }
      if(session && session.user && this.state.screen==='activate'){
        this._loadActivateInfo(session.user);
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
    if(this._presenceChannel) supabase.removeChannel(this._presenceChannel);
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
    this.flash('Sending reset link…');
    try{
      const resp=await fetch('/api/reset-password', {
        method:'POST', headers:{ 'Content-Type':'application/json' },
        body:JSON.stringify({ email:em }),
      });
      const body=await resp.json();
      if(!resp.ok) throw new Error(body.error||'Reset failed');
      if(body.emailSent) this.flash('Password reset link sent to '+em+'.');
      else this.flash('Reset link generated but email delivery failed'+(body.mailError?(': '+body.mailError):'')+'.');
    }catch(err){
      this.flash('Could not send reset email: '+err.message);
    }
  }
  componentDidUpdate(prevProps, prevState){
    if(prevProps.screenParam!==this.props.screenParam || prevProps.routeParam!==this.props.routeParam){
      this._syncStateFromLocation();
    }
    if(prevState.screen!==this.state.screen || prevState.route!==this.state.route){
      this._syncLocationFromState();
    }
    // WhatsApp-style read receipts: mark every message in the currently
    // open thread as read by me the moment it's actually on screen —
    // entering Messages, switching threads, or a new message landing in the
    // thread you're already looking at (via realtime/_loadThreads).
    const wasOnThread = prevState.route==='messages' ? prevState.thOpen : null;
    const isOnThread = this.state.route==='messages' ? this.state.thOpen : null;
    if(isOnThread && (isOnThread!==wasOnThread || prevState.thAdded!==this.state.thAdded)){
      this._markThreadRead(isOnThread);
    }
  }

  flash(msg){ this.setState({ toast: msg }); clearTimeout(this._t); this._t=setTimeout(()=>this.setState({toast:''}),2400); }

  _timeAgo(ts){
    if(!ts) return '';
    const s=Math.max(0, Math.floor((Date.now()-ts)/1000));
    if(s<60) return 'Just now';
    const m=Math.floor(s/60); if(m<60) return m+' min ago';
    const h=Math.floor(m/60); if(h<24) return h+' hr'+(h>1?'s':'')+' ago';
    const d=Math.floor(h/24); if(d<7) return d+' day'+(d>1?'s':'')+' ago';
    return new Date(ts).toLocaleDateString();
  }
  _nameInitials(name){ return String(name||'?').trim().split(/\s+/).map(w=>w[0]).slice(0,2).join('').toUpperCase(); }
  _nameColor(name){
    const palette=['#7A1C46','#A6417B','#3B7D6B','#2F6FA6','#946C1F','#6A4C9C'];
    let h=0; for(let i=0;i<String(name||'').length;i++) h=(h*31+name.charCodeAt(i))>>>0;
    return palette[h%palette.length];
  }

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
  // Builds the merged registry fresh on every call: this._mastersSeed is the
  // immutable hardcoded base (computed once), overlaid with masterAdded
  // (new/edited rows, keyed by masterKey then by the row's own id field —
  // same overlay pattern as sopUpd/tktUpd/etc. elsewhere) and filtered by
  // masterDeleted. Older code used to push/splice straight into the cached
  // seed array in place, which "worked" only because every read shared the
  // same mutated object in memory — none of it survived a reload.
  MASTERS_REG(){
    const seed=this._mastersSeedOnly();
    const added=this.state.masterAdded||{};
    const deleted=this.state.masterDeleted||{};
    const out={ _st: seed._st };
    Object.keys(seed).forEach(key=>{
      if(key==='_st') return;
      const m=seed[key];
      if(key==='user'){ out[key]={ ...m, rows:this._userMasterRows() }; return; }
      const idField=m.fields[0];
      const addedForKey=added[key]||{};
      const addedIds=new Set(Object.keys(addedForKey));
      const delForKey=deleted[key]||[];
      const baseRows=m.rows.filter(r=>!addedIds.has(String(r[idField])));
      const rows=baseRows.concat(Object.values(addedForKey)).filter(r=>!delForKey.includes(String(r[idField])));
      out[key]={ ...m, rows };
    });
    return out;
  }
  _mastersSeedOnly(){
    if(this._masters){ return this._masters; }
    const st = (s)=>{ const m={Live:'ok',Active:'ok','On track':'ok',Approved:'ok',Draft:'draft',Deprecated:'danger','Merge Candidate':'warn',Pending:'warn'}; return m[s]||'info'; };
    this._masters = {
      service: {
        label:'Service Master', icon:'layers', group:'Business',
        desc:'Service catalogue with SEO metadata, URL maps and linked keywords.',
        cols:[ {k:'Service_ID',l:'ID',mono:1}, {k:'Service_Name',l:'Service'}, {k:'Brand',l:'Brand'}, {k:'Page_Status',l:'Status',tag:1}, {k:'Hierarchy_Level',l:'Level'}, {k:'SEO_Score',l:'SEO'}, {k:'Content_Owner',l:'Owner'} ],
        fields:['Service_ID','Service_Name','Brand','Slug','Parent_Service_ID','Hierarchy_Level','Breadcrumb_Path','Primary_URL','Page_Status','Title_Tag','Meta_Description','H1','Target_Industries','Target_Countries','Primary_Keywords','SEO_Score','Language_Score','Content_Owner','Tech_Owner','Last_Updated'],
        rows:[
          {Service_ID:'SRV001',Service_Name:'Cloud Migration Services',Brand:'Beetloop',Slug:'cloud-migration',Parent_Service_ID:'—',Hierarchy_Level:0,Breadcrumb_Path:'Services > Cloud Migration',Primary_URL:'/services/cloud-migration',Page_Status:'Live',Title_Tag:'Enterprise Cloud Migration Services | Beetloop',Meta_Description:'Seamless cloud migration services for enterprises',H1:'Cloud Migration Services',Target_Industries:'Technology, Finance, Healthcare',Target_Countries:'USA, UK, Canada',Primary_Keywords:'cloud migration, enterprise cloud, cloud transformation',SEO_Score:87,Language_Score:92,Content_Owner:'John Doe',Tech_Owner:'Tech Team',Last_Updated:'2024-10-28'},
          {Service_ID:'SRV001-1',Service_Name:'AWS Migration',Brand:'Beetloop',Slug:'cloud-migration/aws',Parent_Service_ID:'SRV001',Hierarchy_Level:1,Breadcrumb_Path:'Services > Cloud Migration > AWS Migration',Primary_URL:'/services/cloud-migration/aws',Page_Status:'Live',Title_Tag:'AWS Cloud Migration Services | Beetloop',Meta_Description:'Expert AWS migration and optimization services',H1:'AWS Migration Services',Target_Industries:'Technology, Finance',Target_Countries:'USA, UK',Primary_Keywords:'aws migration, aws cloud, migrate to aws',SEO_Score:85,Language_Score:90,Content_Owner:'Jane Smith',Tech_Owner:'Tech Team',Last_Updated:'2024-10-25'},
          {Service_ID:'SRV001-2',Service_Name:'Azure Migration',Brand:'Beetloop',Slug:'cloud-migration/azure',Parent_Service_ID:'SRV001',Hierarchy_Level:1,Breadcrumb_Path:'Services > Cloud Migration > Azure Migration',Primary_URL:'/services/cloud-migration/azure',Page_Status:'Live',Title_Tag:'Azure Cloud Migration Services | Beetloop',Meta_Description:'Professional Azure migration and modernization',H1:'Azure Migration Services',Target_Industries:'Technology, Enterprise',Target_Countries:'USA, UK, Germany',Primary_Keywords:'azure migration, azure cloud, migrate to azure',SEO_Score:83,Language_Score:88,Content_Owner:'Jane Smith',Tech_Owner:'Tech Team',Last_Updated:'2024-10-26'},
          {Service_ID:'SRV002',Service_Name:'AI Implementation',Brand:'Beetloop',Slug:'ai-implementation',Parent_Service_ID:'—',Hierarchy_Level:0,Breadcrumb_Path:'Services > AI Implementation',Primary_URL:'/services/ai-implementation',Page_Status:'Live',Title_Tag:'AI Implementation Services | Beetloop',Meta_Description:'End-to-end AI implementation and integration services',H1:'AI Implementation Services',Target_Industries:'Technology, Retail, Manufacturing',Target_Countries:'USA, UK, Singapore',Primary_Keywords:'ai implementation, artificial intelligence, ai integration',SEO_Score:78,Language_Score:85,Content_Owner:'Bob Johnson',Tech_Owner:'Tech Team',Last_Updated:'2024-10-20'},
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
        cols:[ {k:'Keyword_Code',l:'Code',mono:1}, {k:'Keyword',l:'Keyword'}, {k:'Brand',l:'Brand'}, {k:'Keyword_Type',l:'Type',tag:1}, {k:'Intent',l:'Intent'}, {k:'Search_Volume',l:'Volume'}, {k:'Status',l:'Status',tag:1} ],
        fields:['Keyword_ID','Keyword_Code','Keyword','Brand','Keyword_Type','Parent_Keyword','Keyword_SubCategory','Synonyms','Technical_Terms','Intent','Search_Volume','Keyword_Difficulty','CPC','SERP_Features','Language','Country','Industry_Name','Service_Name','Page_Name','Used_In_Campaign_Flag','Campaign_Usage_Count','Content_Usage_Count','Last_Audited_By','Last_Audited_Date','Status','Notes'],
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
          {Dept_Code:'D-SEO',Department:'SEO',Status:'Active'},
          {Dept_Code:'D-CNT',Department:'Content',Status:'Active'},
          {Dept_Code:'D-GFX',Department:'Graphics',Status:'Active'},
          {Dept_Code:'D-WEB',Department:'Web Developers',Status:'Active'},
          {Dept_Code:'D-SMM',Department:'SMM',Status:'Active'},
          {Dept_Code:'D-ALL',Department:'All',Status:'Active'},
        ],
      },
      businessUnit: {
        label:'Business Unit Master', icon:'briefcase', group:'Organization & Security',
        desc:'Business units available as a dropdown in OKR creation.',
        cols:[ {k:'Unit_Code',l:'Code',mono:1}, {k:'Business_Unit',l:'Business unit'}, {k:'Status',l:'Status',tag:1} ],
        fields:['Unit_Code','Business_Unit','Status'],
        rows:[
          {Unit_Code:'BU-01',Business_Unit:'Digital Marketing',Status:'Active'},
          {Unit_Code:'BU-02',Business_Unit:'Research Services',Status:'Active'},
        ],
      },
      websiteDomain: {
        label:'Website Domain Master', icon:'globe-2', group:'Organization & Security',
        desc:'Domains available as a dropdown in OKR creation.',
        cols:[ {k:'Domain_Code',l:'Code',mono:1}, {k:'Domain',l:'Domain'}, {k:'Status',l:'Status',tag:1} ],
        fields:['Domain_Code','Domain','Status'],
        rows:[
          {Domain_Code:'DOM-01',Domain:'beetloop.com',Status:'Active'},
          {Domain_Code:'DOM-02',Domain:'foodresearchlab.com',Status:'Active'},
          {Domain_Code:'DOM-03',Domain:'pubrica.com',Status:'Active'},
          {Domain_Code:'DOM-04',Domain:'statswork.com',Status:'Active'},
          {Domain_Code:'DOM-05',Domain:'tutorsindia.com',Status:'Active'},
          {Domain_Code:'DOM-06',Domain:'pepcreations.com',Status:'Active'},
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
          {Role_Code:'R-DM',Role:'Digital Marketing Executive',Scope:'Own work',Users:0,Can_Edit_Masters:'No',Can_Manage_Users:'No',Status:'Active'},
          {Role_Code:'R-SL',Role:'Sales Executive',Scope:'Leads & pipeline',Users:0,Can_Edit_Masters:'No',Can_Manage_Users:'No',Status:'Active'},
          {Role_Code:'R-SEC',Role:'Secretary',Scope:'Company (view all)',Users:0,Can_Edit_Masters:'No',Can_Manage_Users:'No',Status:'Active'},
        ],
      },
      brand: {
        label:'Brand Master', icon:'tag', group:'Business',
        desc:'Every brand used across the app — the single source that feeds every brand dropdown (User Management, SOPs, Leads, Campaigns, OKRs, Brand Playbook).',
        cols:[ {k:'Brand_Code',l:'Code',mono:1}, {k:'Brand_Name',l:'Brand'}, {k:'Sector',l:'Sector'}, {k:'Website',l:'Website'}, {k:'Status',l:'Status',tag:1} ],
        fields:['Brand_Code','Brand_Name','Sector','Website','Tagline','Status'],
        rows:[
          {Brand_Code:'BRD-01',Brand_Name:'Beetloop',Sector:'B2B platform · Food, nutrition, cosmeceutical, agri, health',Website:'beetloop.com',Tagline:'Verified intelligence from formulation to market.',Status:'Active'},
          {Brand_Code:'BRD-02',Brand_Name:'Food Research Lab',Sector:'Product development & food R&D services',Website:'foodresearchlab.com',Tagline:'From kitchen idea to compliant shelf-ready product.',Status:'Active'},
          {Brand_Code:'BRD-03',Brand_Name:'Pubrica',Sector:'Scientific & medical writing',Website:'pubrica.com',Tagline:'Research communicated with clinical precision.',Status:'Active'},
          {Brand_Code:'BRD-04',Brand_Name:'Statswork',Sector:'Statistics & data analysis services',Website:'statswork.com',Tagline:'Defensible analysis, explained plainly.',Status:'Active'},
          {Brand_Code:'BRD-05',Brand_Name:'Tutors India',Sector:'Academic research support',Website:'tutorsindia.com',Tagline:'Guidance that gets research over the line.',Status:'Active'},
          {Brand_Code:'BRD-06',Brand_Name:'PepCreations',Sector:'Creative & brand production',Website:'pepcreations.com',Tagline:'Craft that carries the claim.',Status:'Active'},
        ],
      },
      country: {
        label:'Country Master', icon:'map', group:'Business',
        desc:'Countries available for Campaign targeting and other location-scoped fields.',
        cols:[ {k:'Country_Code',l:'Code',mono:1}, {k:'Country_Name',l:'Country'}, {k:'Status',l:'Status',tag:1} ],
        fields:['Country_Code','Country_Name','Status'],
        rows:[
          {Country_Code:'IN',Country_Name:'India',Status:'Active'},
          {Country_Code:'US',Country_Name:'USA',Status:'Active'},
          {Country_Code:'GB',Country_Name:'UK',Status:'Active'},
          {Country_Code:'CA',Country_Name:'Canada',Status:'Active'},
          {Country_Code:'SG',Country_Name:'Singapore',Status:'Active'},
          {Country_Code:'DE',Country_Name:'Germany',Status:'Active'},
          {Country_Code:'AE',Country_Name:'UAE',Status:'Active'},
          {Country_Code:'AU',Country_Name:'Australia',Status:'Active'},
          {Country_Code:'JP',Country_Name:'Japan',Status:'Active'},
          {Country_Code:'XX',Country_Name:'Other',Status:'Active'},
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
          {CT_Code:'CT-01',Content_Type:'Blog',Avg_Word_Count:1500,Default_Owner:'Karan Shah',QC_Checklist:'Blog QC Checklist',Status:'Active'},
          {CT_Code:'CT-02',Content_Type:'Landing Page',Avg_Word_Count:800,Default_Owner:'Karan Shah',QC_Checklist:'Landing Page QC Checklist',Status:'Active'},
          {CT_Code:'CT-03',Content_Type:'Case Study',Avg_Word_Count:2000,Default_Owner:'Karan Shah',QC_Checklist:'Content Audit',Status:'Active'},
          {CT_Code:'CT-04',Content_Type:'Whitepaper',Avg_Word_Count:3500,Default_Owner:'Karan Shah',QC_Checklist:'Content Audit',Status:'Active'},
          {CT_Code:'CT-05',Content_Type:'Service Page',Avg_Word_Count:1200,Default_Owner:'Karan Shah',QC_Checklist:'Content Audit',Status:'Active'},
          {CT_Code:'CT-06',Content_Type:'Product Page',Avg_Word_Count:900,Default_Owner:'Karan Shah',QC_Checklist:'Content Audit',Status:'Active'},
          {CT_Code:'CT-07',Content_Type:'FAQ',Avg_Word_Count:600,Default_Owner:'Karan Shah',QC_Checklist:'Content Audit',Status:'Active'},
          {CT_Code:'CT-08',Content_Type:'News',Avg_Word_Count:500,Default_Owner:'Karan Shah',QC_Checklist:'Content Audit',Status:'Active'},
          {CT_Code:'CT-09',Content_Type:'Resource',Avg_Word_Count:700,Default_Owner:'Karan Shah',QC_Checklist:'Content Audit',Status:'Active'},
          {CT_Code:'CT-10',Content_Type:'Checklist',Avg_Word_Count:900,Default_Owner:'Karan Shah',QC_Checklist:'Content Audit',Status:'Active'},
          {CT_Code:'CT-11',Content_Type:'Video Script',Avg_Word_Count:600,Default_Owner:'Karan Shah',QC_Checklist:'Content Audit',Status:'Active'},
          {CT_Code:'CT-12',Content_Type:'Infographic',Avg_Word_Count:300,Default_Owner:'Karan Shah',QC_Checklist:'Content Audit',Status:'Active'},
          {CT_Code:'CT-13',Content_Type:'Webinar',Avg_Word_Count:400,Default_Owner:'Karan Shah',QC_Checklist:'Content Audit',Status:'Active'},
          {CT_Code:'CT-14',Content_Type:'Social Content',Avg_Word_Count:150,Default_Owner:'Karan Shah',QC_Checklist:'Social Media QC Checklist',Status:'Active'},
          {CT_Code:'CT-15',Content_Type:'Email',Avg_Word_Count:350,Default_Owner:'Karan Shah',QC_Checklist:'Email QC Checklist',Status:'Active'},
          {CT_Code:'CT-16',Content_Type:'Press Release',Avg_Word_Count:600,Default_Owner:'Karan Shah',QC_Checklist:'Content Audit',Status:'Active'},
          {CT_Code:'CT-17',Content_Type:'Glossary',Avg_Word_Count:400,Default_Owner:'Karan Shah',QC_Checklist:'Content Audit',Status:'Active'},
          {CT_Code:'CT-18',Content_Type:'Pillar Page',Avg_Word_Count:4000,Default_Owner:'Karan Shah',QC_Checklist:'Content Audit',Status:'Active'},
          {CT_Code:'CT-19',Content_Type:'Cluster Page',Avg_Word_Count:1500,Default_Owner:'Karan Shah',QC_Checklist:'Content Audit',Status:'Active'},
          {CT_Code:'CT-20',Content_Type:'Ad Campaign',Avg_Word_Count:100,Default_Owner:'Karan Shah',QC_Checklist:'Ad Campaign QC Checklist',Status:'Active'},
        ],
      },
      // Backs the "Repositories" category tabs in Content Repository. Every
      // row here has a Brand — 'All Brands' means it shows for every brand,
      // a specific brand (e.g. Food Research Lab) means it only shows when
      // that brand is selected, so different brands can have their own
      // category taxonomy (e.g. a 'Retort' line only Food Research Lab uses).
      contentCategory: {
        label:'Content Category Master', icon:'folder-tree', group:'SEO & Content',
        desc:'Content Repository categories — universal or brand-specific.',
        cols:[ {k:'Category_Code',l:'Code',mono:1}, {k:'Category_Name',l:'Category'}, {k:'Brand',l:'Brand'}, {k:'Status',l:'Status',tag:1} ],
        fields:['Category_Code','Category_Name','Brand','Status'],
        rows:[
          {Category_Code:'service',Category_Name:'Service',Brand:'All Brands',Status:'Active'},
          {Category_Code:'insights',Category_Name:'Insights',Brand:'All Brands',Status:'Active'},
          {Category_Code:'product',Category_Name:'Product',Brand:'All Brands',Status:'Active'},
          {Category_Code:'career',Category_Name:'Career',Brand:'All Brands',Status:'Active'},
          {Category_Code:'landing',Category_Name:'Landing Page',Brand:'All Brands',Status:'Active'},
          {Category_Code:'case',Category_Name:'Case Study',Brand:'All Brands',Status:'Active'},
          {Category_Code:'resource',Category_Name:'Resource Library',Brand:'All Brands',Status:'Active'},
          {Category_Code:'faq',Category_Name:'FAQ',Brand:'All Brands',Status:'Active'},
          {Category_Code:'news',Category_Name:'News',Brand:'All Brands',Status:'Active'},
          {Category_Code:'home',Category_Name:'Home & Corporate',Brand:'All Brands',Status:'Active'},
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
      // Brand works the same way it does on Content Category: 'All Brands'
      // shows the industry for every brand's targeting/mapping pickers, a
      // specific brand scopes it to only that brand (e.g. a niche vertical
      // only Food Research Lab targets, not the whole company).
      industry: {
        label:'Industry Master', icon:'factory', group:'Marketing & Quality',
        desc:'Industry verticals for targeting and mapping — universal or brand-specific.',
        cols:[ {k:'Ind_Code',l:'Code',mono:1}, {k:'Industry',l:'Industry'}, {k:'Brand',l:'Brand'}, {k:'Clients',l:'Clients'}, {k:'Status',l:'Status',tag:1} ],
        fields:['Ind_Code','Industry','Brand','Clients','Parent_Vertical','Status'],
        rows:[
          {Ind_Code:'IND-01',Industry:'Education',Brand:'All Brands',Clients:2,Parent_Vertical:'Services',Status:'Active'},
          {Ind_Code:'IND-02',Industry:'Food',Brand:'All Brands',Clients:1,Parent_Vertical:'Consumer',Status:'Active'},
          {Ind_Code:'IND-03',Industry:'Nutraceutical',Brand:'All Brands',Clients:1,Parent_Vertical:'Health',Status:'Active'},
          {Ind_Code:'IND-04',Industry:'Healthcare',Brand:'All Brands',Clients:1,Parent_Vertical:'Health',Status:'Active'},
        ],
      },
      // Backs the "Object Category" field on Content Repository pages
      // (Service and non-Service alike) — a content/service classification
      // tag that used to be a hardcoded, uneditable '—' placeholder.
      objectCategory: {
        label:'Object Category Master', icon:'shapes', group:'SEO & Content',
        desc:'Content/service classification tags used on Content Repository pages.',
        cols:[ {k:'OC_Code',l:'Code',mono:1}, {k:'Category_Name',l:'Category'}, {k:'Status',l:'Status',tag:1} ],
        fields:['OC_Code','Category_Name','Status'],
        rows:[
          {OC_Code:'OC-01',Category_Name:'Infrastructure',Status:'Active'},
          {OC_Code:'OC-02',Category_Name:'Security',Status:'Active'},
          {OC_Code:'OC-03',Category_Name:'Analytics',Status:'Active'},
          {OC_Code:'OC-04',Category_Name:'Data & AI',Status:'Active'},
          {OC_Code:'OC-05',Category_Name:'Marketing Tech',Status:'Active'},
          {OC_Code:'OC-06',Category_Name:'Compliance',Status:'Active'},
        ],
      },
      // Backs the Lead Source dropdown across Contacts/Leads — was a plain
      // hardcoded array (leadSourceList()) with no Master Data entry at all.
      leadSource: {
        label:'Lead Source Master', icon:'radar', group:'Business',
        desc:'Where inbound leads and contacts originate from.',
        cols:[ {k:'LS_Code',l:'Code',mono:1}, {k:'Source_Name',l:'Source'}, {k:'Status',l:'Status',tag:1} ],
        fields:['LS_Code','Source_Name','Status'],
        rows:[
          {LS_Code:'LS-01',Source_Name:'Organic Search',Status:'Active'},
          {LS_Code:'LS-02',Source_Name:'Paid Search',Status:'Active'},
          {LS_Code:'LS-03',Source_Name:'Social Media',Status:'Active'},
          {LS_Code:'LS-04',Source_Name:'Email Campaign',Status:'Active'},
          {LS_Code:'LS-05',Source_Name:'Referral',Status:'Active'},
          {LS_Code:'LS-06',Source_Name:'Direct',Status:'Active'},
          {LS_Code:'LS-07',Source_Name:'Guest Post / External',Status:'Active'},
          {LS_Code:'LS-08',Source_Name:'Webinar',Status:'Active'},
          {LS_Code:'LS-09',Source_Name:'Trade Enquiry',Status:'Active'},
        ],
      },
      // "Items" stays a plain display count (unchanged shape, so the
      // existing generic Master Data table keeps rendering it as-is) —
      // the actual checklist question text lives in the new "Item_List"
      // field as a ';'-separated list, the same "encode a list as a
      // delimited string" convention this master's own Applies_To field
      // already used. contentType.QC_Checklist (a single value, already
      // rendered as a dropdown of these rows' Checklist names via
      // MASTER_FIELD_RELATIONS below) is what actually links a Content
      // Type to one of these rows — Applies_To here is just a
      // human-readable annotation, same as it always was.
      // Items used to be a semicolon-delimited string (Item_List) plus a
      // separately hand-typed count (Items) that could drift out of sync
      // with the real list. Items is now the real array of structured
      // {text,type,required} rows — "No. of Checklist Items" everywhere
      // (list column, detail header) is just Items.length, always correct.
      qcChecklist: {
        label:'QC Checklist Master', icon:'clipboard-check', group:'Marketing & Quality',
        desc:'Reusable QC checklists mapped to Campaign Types — a Task\'s linked Campaign resolves its Campaign Type, which determines which checklists apply. Also linked from Content Type via the "QC_Checklist" field for content-type-driven QC.',
        cols:[ {k:'QC_Code',l:'Code',mono:1}, {k:'Checklist',l:'Checklist Name'}, {k:'Campaign_Type',l:'Campaign Type'}, {k:'Status',l:'Status',tag:1} ],
        fields:['QC_Code','Checklist','Campaign_Type','Status'],
        rows:[
          {QC_Code:'QC-01',Checklist:'Content Audit',Campaign_Type:'Content Campaign',Status:'Active',Items:[
            {text:'Grammar & clarity checked',type:'Checkbox',required:true},
            {text:'Plagiarism checked',type:'Checkbox',required:true},
            {text:'Fact-checking complete',type:'Checkbox',required:true},
            {text:'Formatting consistent',type:'Checkbox',required:false},
          ]},
          {QC_Code:'QC-02',Checklist:'SEO Audit',Campaign_Type:'SEO Campaign',Status:'Active',Items:[
            {text:'Title tag checked',type:'Checkbox',required:true},
            {text:'Meta description checked',type:'Checkbox',required:true},
            {text:'Header structure checked',type:'Checkbox',required:true},
            {text:'Internal links checked',type:'Checkbox',required:false},
          ]},
          {QC_Code:'QC-03',Checklist:'Website Audit',Campaign_Type:'Website Campaign',Status:'Active',Items:[
            {text:'Page load speed checked',type:'Checkbox',required:true},
            {text:'Mobile responsiveness checked',type:'Checkbox',required:true},
            {text:'Broken links checked',type:'Checkbox',required:true},
            {text:'Schema markup checked',type:'Checkbox',required:false},
          ]},
          {QC_Code:'QC-04',Checklist:'SMM Audit',Campaign_Type:'SMM Campaign',Status:'Active',Items:[
            {text:'Caption checked',type:'Text',required:true},
            {text:'Hashtags checked',type:'Checkbox',required:true},
            {text:'Image spec checked',type:'Checkbox',required:true},
            {text:'Posting schedule checked',type:'Checkbox',required:false},
          ]},
          {QC_Code:'QC-05',Checklist:'Email QC Checklist',Campaign_Type:'Email Campaign',Status:'Active',Items:[
            {text:'Subject line is relevant and error-free',type:'Text',required:true},
            {text:'Email body content is accurate and complete',type:'Text',required:true},
            {text:'Links are working correctly',type:'Checkbox',required:true},
            {text:'Images are appropriate and optimized',type:'Checkbox',required:false},
            {text:'Mobile rendering checked',type:'Checkbox',required:true},
          ]},
          {QC_Code:'QC-06',Checklist:'Landing Page QC Checklist',Campaign_Type:'Website Campaign',Status:'Active',Items:[
            {text:'Headline checked',type:'Text',required:true},
            {text:'CTA checked',type:'Checkbox',required:true},
            {text:'Form checked',type:'Checkbox',required:true},
            {text:'Links checked',type:'Checkbox',required:false},
            {text:'Mobile responsiveness checked',type:'Checkbox',required:true},
          ]},
          {QC_Code:'QC-07',Checklist:'Blog QC Checklist',Campaign_Type:'Content Campaign',Status:'Active',Items:[
            {text:'Grammar & clarity checked',type:'Checkbox',required:true},
            {text:'SEO title & meta checked',type:'Checkbox',required:true},
            {text:'Internal links checked',type:'Checkbox',required:false},
            {text:'Plagiarism checked',type:'Checkbox',required:true},
            {text:'Readability checked',type:'Checkbox',required:false},
          ]},
          {QC_Code:'QC-08',Checklist:'Social Media QC Checklist',Campaign_Type:'SMM Campaign',Status:'Active',Items:[
            {text:'Caption checked',type:'Text',required:true},
            {text:'Hashtags checked',type:'Checkbox',required:true},
            {text:'Image/video spec checked',type:'Checkbox',required:true},
            {text:'Platform formatting checked',type:'Checkbox',required:false},
            {text:'CTA checked',type:'Checkbox',required:true},
          ]},
          {QC_Code:'QC-09',Checklist:'Ad Campaign QC Checklist',Campaign_Type:'Analytics Campaign',Status:'Active',Items:[
            {text:'Ad copy checked',type:'Text',required:true},
            {text:'Targeting checked',type:'Checkbox',required:true},
            {text:'Creative spec checked',type:'Checkbox',required:true},
            {text:'Landing page link checked',type:'Checkbox',required:true},
            {text:'Budget & schedule checked',type:'Checkbox',required:false},
          ]},
        ],
      },
      // The vocabulary every "Campaign Type" dropdown in the app shares
      // (Campaigns' own Type field, QC Checklist's Campaign Type, filters,
      // and Task creation's Campaign Type — see below). Used to be a
      // hardcoded array (CAMPAIGN_TYPES()) nobody could add to; that method
      // now reads these rows instead, so editing them here immediately
      // updates every dropdown that calls it — no per-screen changes needed.
      campaignType: {
        label:'Campaign Type Master', icon:'megaphone', group:'Marketing & Quality',
        desc:'The shared Campaign Type vocabulary used by Campaigns, Task creation, QC Checklist mapping and filters everywhere.',
        cols:[ {k:'Type_Code',l:'Code',mono:1}, {k:'Campaign_Type',l:'Campaign Type'}, {k:'Status',l:'Status',tag:1} ],
        fields:['Type_Code','Campaign_Type','Status'],
        rows:[
          {Type_Code:'CTY-01',Campaign_Type:'SEO Campaign',Status:'Active'},
          {Type_Code:'CTY-02',Campaign_Type:'Content Campaign',Status:'Active'},
          {Type_Code:'CTY-03',Campaign_Type:'SMM Campaign',Status:'Active'},
          {Type_Code:'CTY-04',Campaign_Type:'Website Campaign',Status:'Active'},
          {Type_Code:'CTY-05',Campaign_Type:'Email Campaign',Status:'Active'},
          {Type_Code:'CTY-06',Campaign_Type:'Analytics Campaign',Status:'Active'},
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
      Brand:{ toMaster:'brand', valueField:'Brand_Name', labelField:'Brand_Name' },
    },
    keyword: {
      Parent_Keyword:{ toMaster:'keyword', valueField:'Keyword', labelField:'Keyword', none:'—' },
      Industry_Name:{ toMaster:'industry', valueField:'Industry', labelField:'Industry' },
      Service_Name:{ toMaster:'service', valueField:'Service_Name', labelField:'Service_Name' },
      Brand:{ toMaster:'brand', valueField:'Brand_Name', labelField:'Brand_Name' },
    },
    user: {
      Department:{ toMaster:'department', valueField:'Department', labelField:'Department' },
      Reporting_Manager:{ toUsers:true }, Team_Lead:{ toUsers:true },
      Role:{ toMaster:'role', valueField:'Role', labelField:'Role' },
    },
    department: { Head:{ toUsers:true }, Members:{ toUsers:true, multi:true } },
    client: { Industry:{ toMaster:'industry', valueField:'Industry', labelField:'Industry' } },
    competitor: { Industry:{ toMaster:'industry', valueField:'Industry', labelField:'Industry' } },
    contentType: {
      Default_Owner:{ toUsers:true },
      QC_Checklist:{ toMaster:'qcChecklist', valueField:'Checklist', labelField:'Checklist' },
    },
    qcChecklist: {
      // Not a master-to-master link (Campaign Type isn't its own master,
      // it's Campaigns' own `type` field — CAMPAIGN_TYPES()) — a static
      // option list, same shared vocabulary the Campaign create form uses.
      Campaign_Type:{ toStatic:true, none:'—' },
    },
    contentCategory: { Brand:{ toMaster:'brand', valueField:'Brand_Name', labelField:'Brand_Name', none:'All Brands' } },
    industry: { Brand:{ toMaster:'brand', valueField:'Brand_Name', labelField:'Brand_Name', none:'All Brands' } },
    kpi: { Department:{ toMaster:'department', valueField:'Department', labelField:'Department' } },
  };
  // Returns null for a plain text/number field, or an array of {value,label}
  // options when the field is a relation into another master or Users.
  masterFieldOptions(masterKey, fieldKey){
    // KPI Master's Status uses Active/Disabled (not Active/Inactive) — the
    // same off-state wording KPI Templates already uses (toggleStatus in
    // KpiTemplateFormDrawer), since both are "reusable KPI definition"
    // masters gating which KPIs can be picked for a NEW OKR Key Result.
    if(masterKey==='kpi' && fieldKey==='Status') return [{ value:'Active', label:'Active' }, { value:'Disabled', label:'Disabled' }];
    // Any Master Data table's Status field gets the same Active/Inactive
    // dropdown, not a free-text box a typo could desync from every filter
    // that checks r.Status==='Active'/'Inactive' elsewhere in the app —
    // regardless of whether that field also happens to have a cross-master
    // relation registered below.
    if(fieldKey==='Status') return [{ value:'Active', label:'Active' }, { value:'Inactive', label:'Inactive' }];
    const rel = this.MASTER_FIELD_RELATIONS[masterKey] && this.MASTER_FIELD_RELATIONS[masterKey][fieldKey];
    if(!rel) return null;
    if(rel.toUsers) return (this.state.users||[]).map(u=>({ value:u.name, label:u.name }));
    if(rel.toStatic){
      const opts=this.CAMPAIGN_TYPES().map(v=>({ value:v, label:v }));
      return rel.none!=null ? [{ value:rel.none, label:rel.none }].concat(opts) : opts;
    }
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
    this._campaigns = [];
    return this._campaigns;
  }
  allCampaigns(){
    const upd=this.state.cmpUpd||{};
    const del=this.state.cmpDeleted||[];
    const added=this.state.cmpAdded||[];
    const addedIds=new Set(added.map(c=>c.id));
    return this.CAMPAIGNS_SEED().filter(c=>!addedIds.has(c.id)).concat(added)
      .filter(c=>!del.includes(c.id))
      .map(c=>upd[c.id]?{...c,...upd[c.id]}:c);
  }
  _nextCampaignId(){
    const del=this.state.cmpDeleted||[];
    const ids=this.CAMPAIGNS_SEED().map(c=>c.id).concat((this.state.cmpAdded||[]).map(c=>c.id)).concat(del);
    const nums=ids.map(id=>{ const m=String(id).match(/^CMP-(\d+)$/); return m?parseInt(m[1],10):0; });
    return 'CMP-'+String(Math.max(100,...nums)+1).padStart(3,'0');
  }
  cmpNum(v){ if(v==null||v==='') return 0; const n=parseFloat(String(v).replace(/,/g,'')); return isNaN(n)?0:n; }
  cmpProgress(c){
    const ks=c.kpis||[]; if(!ks.length) return 0;
    return Math.round(ks.reduce((s,k)=>s+Math.max(0,Math.min(100,this.cmpNum(k.current)/(this.cmpNum(k.target)||1)*100)),0)/ks.length);
  }
  cmpKpiPool(){
    const seedTitles=new Set(this.OKR_SEED().map(o=>o.title));
    const okrs = this.OKR_DATA().filter(o=>!seedTitles.has(o.title));
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
  cmpStatusTone(s){ return {Live:{bg:'var(--verify-100)',c:'var(--verify-600)'},Planning:{bg:'var(--info-100)',c:'var(--info-600)'},Draft:{bg:'var(--surface-50)',c:'var(--ink-500)'},Paused:{bg:'var(--warn-100)',c:'var(--warn-600)'},Completed:{bg:'var(--orchid-100)',c:'var(--orchid-700)'}}[s]||{bg:'var(--surface-50)',c:'var(--ink-500)'}; }
  campaignsView(){
    const rk=this.state.roleKey;
    const canEdit=this.hasPerm('campaigns','edit');
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
        // start/end are stored as fmtDate() display strings (e.g. "Jul 1,
        // 2026") — the <input type="date"> fields need ISO back or they
        // render blank, which is why reopening a saved campaign looked
        // like the dates had vanished.
        edit:(e)=>{ if(e)e.stopPropagation(); if(!canEdit){ this.flash('You do not have permission to edit campaigns.'); return; } this.setState({ cmpNew:true, cmpEditId:c.id, cmpSection:'cmpA', cmpForm:{...c, start:this.isoDate(c.start), end:this.isoDate(c.end), team:(c.team||[]).map(x=>({...x})), kpis:(c.kpis||[]).map(x=>({...x})), efforts:(c.efforts||[]).map(x=>({...x}))} }); },
      }; }),6);
    const K=(label,value,color)=>({label,value,color});
    const stats=[K('Campaigns',String(all.length),'var(--ink-900)'),K('Live',String(all.filter(c=>c.status==='Live').length),'var(--verify-600)'),K('In planning',String(all.filter(c=>c.status==='Planning').length),'var(--info-600)'),K('Linked KPIs',String(all.reduce((s,c)=>s+(c.kpis||[]).length,0)),'var(--orchid-600)'),K('Tasks generated',String(all.reduce((s,c)=>s+(c.taskCount||0),0)),'var(--warn-600)')];
    const out={ cmpStats:stats, cmpRows:pg.rows, cmpPg:pg, cmpCanEdit:canEdit, cmpEmpty:list.length===0, cmpOwnNote:own,
      cmpFilterDefs:[
        {label:'Status',value:F.status,onChange:setF('status'),options:['All','Draft','Planning','Live','Paused','Completed']},
        {label:'Type',value:F.type,onChange:setF('type'),options:['All'].concat(this.CAMPAIGN_TYPES())},
        {label:'Department',value:F.dept,onChange:setF('dept'),options:['All'].concat(this.liveDeptOptions())},
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
    const seg=(on)=>'display:flex;align-items:center;gap:6px;padding:8px 14px;border-radius:10px;font-size:12.5px;font-weight:700;cursor:pointer;border:none;background:'+(on?'var(--paper)':'transparent')+';color:'+(on?'var(--ink-900)':'var(--ink-500)')+';box-shadow:'+(on?'var(--shadow-sm)':'none');
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
          okrLabel:okrCode?okrTitle:'No linked OKR', okrCode:okrCode,
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
  cmpFormData(){
    const f=this.state.cmpForm||{};
    const set=(k)=>(e)=>this.setState({ cmpForm:{...f,[k]:e.target.value} });
    const sec=this.state.cmpSection||'cmpA';
    const sections=[['cmpA','A','Campaign basics'],['cmpB','B','Goal & scope'],['cmpC','C','Target audience'],['cmpD','D','Linked KPIs'],['cmpE','E','Effort lines'],['cmpF','F','Campaign team']];
    const kpiPool=this.cmpKpiPool();
    const rowset=(key,blank)=>{ const arr=f[key]||[blank];
      return { rows:arr.map((r,i)=>({ i, ...r,
          set:(field)=>(e)=>{ const a=arr.map((x,j)=>j===i?{...x,[field]:e.target.value}:x); this.setState({ cmpForm:{...f,[key]:a} }); },
          setA:(e)=>{ const a=arr.map((x,j)=>j===i?{...x,[Object.keys(blank)[0]]:e.target.value}:x); this.setState({ cmpForm:{...f,[key]:a} }); },
          setB:(e)=>{ const a=arr.map((x,j)=>j===i?{...x,[Object.keys(blank)[1]]:e.target.value}:x); this.setState({ cmpForm:{...f,[key]:a} }); },
          setC:(e)=>{ const a=arr.map((x,j)=>j===i?{...x,[Object.keys(blank)[2]]:e.target.value}:x); this.setState({ cmpForm:{...f,[key]:a} }); },
          setD:(e)=>{ const a=arr.map((x,j)=>j===i?{...x,[Object.keys(blank)[3]]:e.target.value}:x); this.setState({ cmpForm:{...f,[key]:a} }); },
          remove:()=>{ const a=arr.slice(); a.splice(i,1); this.setState({ cmpForm:{...f,[key]:a.length?a:[blank]} }); },
          canRemove:arr.length>1 })),
        add:()=>this.setState({ cmpForm:{...f,[key]:[...arr,blank]} }) }; };
    const kpiArr=f.kpis||[{kpi:'',target:'',current:'0',unit:''}];
    const kpis={ rows:kpiArr.map((r,i)=>({ i, ...r,
        srcKey:r.srcKey||'',
        okrLabel:r.okrCode?(r.okrTitle||'Linked OKR'):'Not linked to an OKR',
        okrLinked:!!r.okrCode,
        // Guard r.kpi truthy BEFORE filtering — cmpEffortPool() rows with no
        // KPI of their own (kpi==='') would otherwise match a not-yet-picked
        // KPI row (r.kpi also '') and get listed as "auto-linked" to a KPI
        // that was never selected.
        autoLabel:(()=>{ if(!r.kpi) return ''; const m=this.cmpEffortPool().filter(p=>p.kpi===r.kpi); if(!m.length) return 'No effort line drives this KPI yet';
          return m.length+' effort line'+(m.length===1?'':'s')+' · '+m.reduce((s,x)=>s+(parseInt(x.tasks,10)||0),0)+' tasks available in section E — '+m.map(x=>x.name).join(', '); })(),
        ...(()=>{ const pages=r.pages||[];
          const upd=(a)=>{ const arr=kpiArr.map((x,j)=>j===i?{...x,pages:a}:x); this.setState({ cmpForm:{...f,kpis:arr}}); };
          return {
            pageRows:pages.map((p,pi)=>({ pi, ...p, isInternal:(p.kind||'Internal')==='Internal', isExternal:p.kind==='External',
              setKind:(e)=>upd(pages.map((x,j)=>j===pi?{...x,kind:e.target.value,url:''}:x)),
              setUrl:(e)=>{ const v=e.target.value; const pg=this.allContentPages().find(z=>z.url===v);
                upd(pages.map((x,j)=>j===pi?{...x,url:v,title:pg?pg.name:x.title}:x)); },
              setTitle:(e)=>upd(pages.map((x,j)=>j===pi?{...x,title:e.target.value}:x)),
              setContrib:(e)=>upd(pages.map((x,j)=>j===pi?{...x,contrib:e.target.value}:x)),
              remove:()=>upd(pages.filter((x,j)=>j!==pi)) })),
            hasPages:pages.length>0,
            addInternalPage:()=>upd([...pages,{kind:'Internal',url:'',title:'',contrib:''}]),
            addExternalPage:()=>upd([...pages,{kind:'External',url:'',title:'',contrib:''}]),
            pageSummary:(()=>{ const int=pages.filter(p=>(p.kind||'Internal')==='Internal'&&p.url).length, ext=pages.filter(p=>p.kind==='External'&&p.url).length;
              if(!int&&!ext) return 'No landing pages linked — add the pages this KPI drives traffic to';
              return int+' internal page'+(int===1?'':'s')+' · '+ext+' external URL'+(ext===1?'':'s'); })(),
            repoPageOptions:[{v:'',label:'— Select a page from Website Content Repository —'}].concat(this.allContentPages().map(p=>({ v:p.url, label:(p.repo==='service'?'Service':p.repo==='insight'?'Insight':'Page')+' · '+p.name+' — '+p.url }))) }; })(),
        // Picking a KPI here no longer force-adds every matching Effort
        // Planner line — it only updates the KPI row. Which efforts drive
        // it is a manual choice, made in section E's multi-select (already
        // scoped to exactly this KPI's matches, nothing else) — picking a
        // KPI just makes those matches available there, it doesn't decide
        // for the user which ones belong in the campaign.
        pick:(e)=>{ const v=e.target.value; const src=kpiPool.find(x=>x.key===v);
          const a=kpiArr.map((x,j)=>j===i?(src?{...x, srcKey:v, kpi:src.kpi, unit:src.unit, target:src.target, current:src.current, okrId:src.okrId, okrCode:src.okrCode, okrTitle:src.okrTitle, freq:src.freq}:{...x,srcKey:'',okrId:'',okrCode:'',okrTitle:''}):x);
          this.setState({ cmpForm:{...f,kpis:a} });
          if(!src) return;
          const matchCount=this.cmpEffortPool().filter(p=>p.kpi===src.kpi).length;
          this.flash(matchCount ? (src.kpi+' linked — '+matchCount+' matching effort line'+(matchCount===1?'':'s')+' ready to add in section E.') : (src.kpi+' linked — no Effort Planner line drives this KPI yet; add one in section E.')); },
        setB:(e)=>{ const a=kpiArr.map((x,j)=>j===i?{...x,target:e.target.value}:x); this.setState({ cmpForm:{...f,kpis:a} }); },
        setC:(e)=>{ const a=kpiArr.map((x,j)=>j===i?{...x,current:e.target.value}:x); this.setState({ cmpForm:{...f,kpis:a} }); },
        setD:(e)=>{ const a=kpiArr.map((x,j)=>j===i?{...x,unit:e.target.value}:x); this.setState({ cmpForm:{...f,kpis:a} }); },
        remove:()=>{ const a=kpiArr.slice(); a.splice(i,1); this.setState({ cmpForm:{...f,kpis:a.length?a:[{kpi:'',target:'',current:'0',unit:''}]} }); },
        canRemove:kpiArr.length>1 })),
      add:()=>this.setState({ cmpForm:{...f,kpis:[...kpiArr,{kpi:'',target:'',current:'0',unit:''}]} }) };
    const effPool=this.cmpEffortPool();
    const linkedKpis=(f.kpis||[]).map(k=>k.kpi).filter(Boolean);
    // Once at least one KPI is linked, only efforts actually driving one of
    // those KPIs are offered at all — no "(other KPI)"/"(no KPI)" fallback
    // groups. If nothing matches, the dropdown is just the placeholder:
    // nothing to pick, nothing shown, matching the bulk multi-select box
    // (which disappears entirely under the same condition).
    const effOptions=[{key:'',label:'— Select an effort line from Effort Planner —'}]
      .concat(effPool.filter(e=>!linkedKpis.length||linkedKpis.includes(e.kpi)).map(e=>({key:e.key,label:e.label})));
    const effArr=f.efforts||[];
    const efforts={ rows:effArr.map((r,i)=>({ i, ...r,
        srcKey:r.srcKey||'',
        locked:!!r.srcKey,
        summary:(r.qty||'—')+' '+(r.unit||'')+' · '+(r.cadence||'—'),
        metaLabel:r.name?((r.division||'—')+' · '+(r.owner||'—')+' · '+(r.tasks||'0')+' tasks'+(r.kpi?(' → '+r.kpi):' · effort only')):'Nothing selected',
        planLabel:r.planId?('Locked — owned by '+r.planId+' in Effort Planner'):'Custom line — will be written back to Effort Planner',
        isEnabler:r.mode==='enabler', modeVal:r.mode||'direct',
        openPlan:()=>this.setState({ cmpNew:false, route:'effort', epView:'list' }),
        ...(()=>{ const ts=this.allTasks().filter(t=>t.template===r.name||t.name===r.name||(r.kpi&&t.kpi===r.kpi));
          const exp=(this.state.cmpEffExpanded||[]).includes(r.srcKey||r.name);
          return { taskList:ts.slice(0,8).map(t=>{ const tn=this.tkTone(t.status);
              return { id:t.id, name:t.name, dates:t.start+' → '+t.end, who:t.assignee, status:t.status, statusBg:tn.bg, statusColor:tn.c }; }),
            taskListEmpty:ts.length===0,
            taskMore:ts.length>8?('+ '+(ts.length-8)+' more tasks'):'',
            taskToggleLabel:(exp?'Hide':'Show')+' '+ts.length+' linked task'+(ts.length===1?'':'s'),
            expanded:exp,
            toggleTasks:()=>{ const key=r.srcKey||r.name; const cur=this.state.cmpEffExpanded||[];
              this.setState({ cmpEffExpanded: cur.includes(key)?cur.filter(x=>x!==key):[...cur,key] }); },
            openTasks:()=>this.setState({ cmpNew:false, route:'tasks', tkQuery:r.name }) }; })(),
        pick:(e)=>{ const v=e.target.value; const s=effPool.find(x=>x.key===v);
          const a=effArr.map((x,j)=>j===i?(s?{...x, srcKey:v, name:s.name, qty:s.qty, unit:s.unit, cadence:s.cadence, division:s.division, owner:s.owner, kpi:s.kpi, planId:s.planId, tasks:s.tasks, tasksDone:s.tasksDone, mode:x.mode||'direct'}:{...x,srcKey:'',name:'',qty:'',unit:'',cadence:'',division:'',owner:'',kpi:'',tasks:'',tasksDone:''}):x);
          this.setState({ cmpForm:{...f,efforts:a} }); },
        setMode:(e)=>{ const a=effArr.map((x,j)=>j===i?{...x,mode:e.target.value}:x); this.setState({ cmpForm:{...f,efforts:a} }); },
        setPerUnit:(e)=>{ const a=effArr.map((x,j)=>j===i?{...x,perUnit:e.target.value}:x); this.setState({ cmpForm:{...f,efforts:a} }); },
        setConv:(e)=>{ const a=effArr.map((x,j)=>j===i?{...x,conv:e.target.value}:x); this.setState({ cmpForm:{...f,efforts:a} }); },
        setDriver:(e)=>{ const a=effArr.map((x,j)=>j===i?{...x,driverKpi:e.target.value}:x); this.setState({ cmpForm:{...f,efforts:a} }); },
        setGate:(e)=>{ const a=effArr.map((x,j)=>j===i?{...x,gate:e.target.value}:x); this.setState({ cmpForm:{...f,efforts:a} }); },
        remove:()=>{ const a=effArr.slice(); a.splice(i,1); this.setState({ cmpForm:{...f,efforts:a} }); },
        canRemove:true })),
      add:()=>this.setState({ cmpNewEffort:{ name:'', qty:'', unit:'', cadence:'', division:(f.dept==='Content'?'Content Writer':(f.dept||'SEO')), kpi:(f.kpis&&f.kpis[0]&&f.kpis[0].kpi)||'' } }) };
    const team=rowset('team',{who:'',role:''});
    return {
      cmpFormOpen:this.state.cmpNew,
      cmpf:f,
      cmpFormTitle:this.state.cmpEditId?'Edit campaign':'Create new campaign',
      cmpFormCode:this.state.cmpEditId||this._nextCampaignId(),
      cmpFormSaveLabel:this.state.cmpEditId?'Save changes':'Create campaign',
      cmpFormClose:()=>this.setState({ cmpNew:false, cmpEditId:null, cmpForm:{} }),
      cmpCanDelete:!!this.state.cmpEditId&&this.hasPerm('campaigns','delete'),
      cmpFormDelete:()=>this.confirmDelete('Delete Campaign?', 'Are you sure you want to delete "'+(f.name||this.state.cmpEditId)+'"? This action cannot be undone.', ()=>this._deleteCampaign()),
      cmpFormSave:()=>this._saveCampaign(),
      cmpSections:sections.map(([id,letter,name])=>({ letter, name, active:sec===id,
        go:(e)=>{ if(e)e.preventDefault(); this.setState({ cmpSection:id });
          setTimeout(()=>{ const el=document.getElementById(id); if(!el) return;
            let sc=el.parentElement; while(sc && !(sc.scrollHeight>sc.clientHeight+4 && /auto|scroll/.test(getComputedStyle(sc).overflowY))) sc=sc.parentElement;
            if(sc) sc.scrollTo({ top:Math.max(0, el.offsetTop-20), behavior:'smooth' }); },0); },
        badgeBg:sec===id?'var(--beet-700)':'var(--surface-50)', badgeColor:sec===id?'#fff':'var(--ink-500)' })),
      cmpSetName:set('name'), cmpSetType:set('type'), cmpTypeOptions:this.CAMPAIGN_TYPES(), cmpSetObjective:set('objective'), cmpSetStatus:set('status'), cmpSetBrand:set('brand'), cmpSetDept:set('dept'), cmpSetCycle:set('cycle'), cmpSetStart:set('start'), cmpSetEnd:set('end'), cmpSetOwner:set('owner'), cmpSetBudget:set('budget'), cmpSetGoal:set('goal'),
      cmpDeptOptions:this.liveDeptOptions(), cmpBrandOptions:this.BRAND_LIST(),
      cmpSetCountries:set('countries'), cmpSetIndustries:set('industries'), cmpSetAudience:set('audience'), cmpSetPersona:set('persona'), cmpSetCompanySize:set('companySize'),
      // Target countries/industries as Master-Data-backed pill toggles —
      // same checkbox-chip pattern as ufBrandRows — storing the same
      // comma-joined string shape the rest of the app already expects.
      cmpCountryRows:this.MASTERS_REG().country.rows.filter(r=>r.Status!=='Inactive').map(r=>{ const name=r.Country_Name;
        const cur=(f.countries||'').split(',').map(s=>s.trim()).filter(Boolean); const on=cur.includes(name);
        return { label:name, on,
          style:'display:flex;align-items:center;gap:7px;padding:7px 11px;border-radius:999px;font-size:11.5px;font-weight:700;cursor:pointer;border:1px solid '+(on?'var(--verify-500)':'var(--line-300)')+';background:'+(on?'var(--verify-100)':'var(--paper)')+';color:'+(on?'var(--verify-600)':'var(--ink-700)'),
          toggle:()=>{ const c=on?cur.filter(x=>x!==name):[...cur,name]; this.setState({ cmpForm:{...f, countries:c.join(', ')} }); } }; }),
      cmpIndustryRows:this.MASTERS_REG().industry.rows.filter(r=>r.Status!=='Inactive' && (!f.brand || r.Brand==='All Brands' || r.Brand===f.brand)).map(r=>{ const name=r.Industry;
        const cur=(f.industries||'').split(',').map(s=>s.trim()).filter(Boolean); const on=cur.includes(name);
        return { label:name, on,
          style:'display:flex;align-items:center;gap:7px;padding:7px 11px;border-radius:999px;font-size:11.5px;font-weight:700;cursor:pointer;border:1px solid '+(on?'var(--verify-500)':'var(--line-300)')+';background:'+(on?'var(--verify-100)':'var(--paper)')+';color:'+(on?'var(--verify-600)':'var(--ink-700)'),
          toggle:()=>{ const c=on?cur.filter(x=>x!==name):[...cur,name]; this.setState({ cmpForm:{...f, industries:c.join(', ')} }); } }; }),
      cmpKpiForm:kpis.rows, cmpAddKpi:kpis.add,
      cmpEffortForm:efforts.rows, cmpAddEffort:efforts.add, cmpEffortOptions:effOptions,
      cmpEffortEmpty:effArr.length===0,
      // Multi-select bulk-add: lets a user pick several Effort Planner lines
      // under a KPI in one control instead of repeating "Add effort line"
      // once per effort. Each picked key still becomes its own row (a row's
      // qty/unit/division/owner/tasks are all per-single-effort data, so
      // "select many" means "add many rows", not one row holding several
      // efforts) — this only changes how many rows get added per click.
      // Same fix as effOptions above — an effort-only line is not "linked
      // to" any of the selected KPIs either, so once a KPI is linked this
      // bulk box only offers efforts that actually match one.
      cmpEffortMultiOptions:effPool.filter(e=>(!linkedKpis.length||linkedKpis.includes(e.kpi)) && !effArr.some(r=>r.srcKey===e.key)).map(e=>({key:e.key,label:e.label})),
      cmpEffortMultiVal:this.state.cmpEffortMultiSel||[],
      cmpEffortMultiChange:(e)=>{ const vals=Array.from(e.target.selectedOptions).map(o=>o.value); this.setState({ cmpEffortMultiSel:vals }); },
      cmpEffortMultiAdd:()=>{
        const sel=this.state.cmpEffortMultiSel||[]; if(!sel.length){ this.flash('Select one or more efforts first.'); return; }
        const picked=sel.map(k=>effPool.find(e=>e.key===k)).filter(Boolean)
          .map(s=>({ srcKey:s.key, name:s.name, qty:s.qty, unit:s.unit, cadence:s.cadence, division:s.division, owner:s.owner, kpi:s.kpi, planId:s.planId, tasks:s.tasks, tasksDone:s.tasksDone, mode:'direct' }));
        const base=effArr.filter(r=>r.name||r.srcKey);
        this.setState({ cmpForm:{...f, efforts:[...base, ...picked]}, cmpEffortMultiSel:[] });
        this.flash(picked.length+' effort line'+(picked.length===1?'':'s')+' added.');
      },
      ...(()=>{ const ne=this.state.cmpNewEffort; if(!ne) return { cmpNewEffortOpen:false };
        const setNe=(k)=>(e)=>this.setState({ cmpNewEffort:{...ne,[k]:e.target.value} });
        return { cmpNewEffortOpen:true, cmpNe:ne,
          cmpNeSetName:setNe('name'), cmpNeSetQty:setNe('qty'), cmpNeSetUnit:setNe('unit'), cmpNeSetCadence:setNe('cadence'), cmpNeSetDivision:setNe('division'), cmpNeSetKpi:setNe('kpi'),
          cmpNeKpiOptions:['— No KPI —'].concat((f.kpis||[]).map(k=>k.kpi).filter(Boolean)),
          cmpNeDivisions:this.EP_DIVISIONS?this.EP_DIVISIONS():['SEO','Content Writer','Graphics','Web Developers','SMM'],
          cmpNeCancel:()=>this.setState({ cmpNewEffort:null }),
          cmpNeSave:()=>{
            if(!(ne.name&&ne.name.trim())){ this.flash('Name the effort line.'); return; }
            const qty=parseInt(ne.qty,10)||0;
            if(!qty){ this.flash('Enter the monthly quantity.'); return; }
            const plans=this.allEpPlans();
            let plan=plans.find(p=>p.division===ne.division);
            const row={ type:ne.name.trim(), icon:'gauge', monthly:qty, days:25, unit:ne.unit||'units', priority:'High', weight:0, kpiId:'', kpiName:ne.kpi&&ne.kpi.indexOf('—')!==0?ne.kpi:'' };
            let planId;
            if(plan){ planId=plan.id;
              this.setState({ epRowAdds:{...(this.state.epRowAdds||{}), [plan.id]:[...((this.state.epRowAdds||{})[plan.id]||[]), row]} });
              this._persistEpPlan({ ...plan, rows:[...(plan.rows||[]), row] });
            } else {
              const epNums=this._allEpIdsEver().map(id=>{ const m=String(id).match(/^EP-(\d+)$/); return m?parseInt(m[1],10):0; });
              planId='EP-'+String(Math.max(0,...epNums)+1).padStart(3,'0');
              const newPlan={ id:planId, name:(f.name||'Campaign')+' — '+ne.division+' effort', division:ne.division, period:f.cycle||'Q3 2026', owner:f.owner||this.currentPerson(), dept:f.dept||'SEO', campaign:f.name||'—', okr:(f.kpis&&f.kpis[0]&&f.kpis[0].okrTitle)||'—', start:f.start||this.todayStr(), end:f.end||'—', type:'Monthly', status:'Draft', rows:[row] };
              this.setState({ epAdded:[...(this.state.epAdded||[]),newPlan] });
              this._persistEpPlan(newPlan);
            }
            const line={ srcKey:planId+' :: '+row.type, name:row.type, qty:String(qty), unit:row.unit, cadence:Math.round(qty/25)+' /day · '+qty+' /month', division:ne.division, owner:f.owner||this.currentPerson(), kpi:row.kpiName, planId, tasks:String(qty), tasksDone:'0', mode:'direct', driverKpi:'', perUnit:'', conv:'' };
            this.setState({ cmpForm:{...f, efforts:[...(f.efforts||[]), line]}, cmpNewEffort:null });
            this.flash('Effort line added and written back to '+planId+' in Effort Planner — '+qty+' tasks will be generated.');
          } }; })(),
      cmpTeamForm:team.rows, cmpAddTeam:team.add,
      cmpPeopleNames:(this.state.users||[]).map(u=>u.name),
      cmpRoleNames:['Campaign owner','Content lead','SEO lead','Graphics lead','Web developer','Social media exec','QC reviewer','Analyst'],
      // Label by the OKR's title, not its internal code (e.g.
      // "OKR-GEN-Q1-015") — a reader picking a KPI here needs to know
      // which objective it belongs to, not the objective's system id.
      cmpKpiPoolOptions:[{key:'',label:'— Select a KPI from an existing OKR —'}].concat(kpiPool.map(k=>({key:k.key,label:(k.label)||(k.kpi+' — '+k.okrTitle)}))),
    };
  }
  _saveCampaign(){
    const isEdit=!!this.state.cmpEditId;
    if(!this.hasPerm('campaigns', isEdit?'edit':'create')){ this.flash('You do not have permission to '+(isEdit?'edit':'create')+' campaigns.'); return; }
    const f=this.state.cmpForm||{};
    if(!(f.name&&f.name.trim())){ this.flash('Enter a campaign name.'); return; }
    const kp=(f.kpis||[]).filter(k=>k.kpi&&k.kpi.trim());
    if(!kp.length){ this.flash('Link at least one KPI — the campaign drives KPIs, which drive effort and tasks.'); return; }
    // The campaign's own duration must fall within every linked OKR's
    // start→due window — a campaign can't run outside the objective it
    // serves. Checked against every distinct OKR among the linked KPIs,
    // not just the first, since KPIs from different OKRs may be linked.
    const linkedOkrCodes=Array.from(new Set(kp.map(k=>k.okrCode).filter(Boolean)));
    for(const code of linkedOkrCodes){
      const okr=this.OKR_DATA().find(x=>x.code===code); if(!okr) continue;
      const okrStart=new Date(okr.start), okrDue=new Date(okr.due);
      const cStart=f.start?new Date(f.start):null, cEnd=f.end?new Date(f.end):null;
      if(cStart && (cStart<okrStart||cStart>okrDue)){ this.flash('Campaign start date must fall within '+code+'’s duration ('+okr.start+' – '+okr.due+').'); return; }
      if(cEnd && (cEnd<okrStart||cEnd>okrDue)){ this.flash('Campaign due date must fall within '+code+'’s duration ('+okr.start+' – '+okr.due+').'); return; }
    }
    const ef=(f.efforts||[]).filter(e=>e.name&&e.name.trim()).map(e=>({...e, mode:e.mode||'direct', tasks:e.tasks||e.qty, tasksDone:e.tasksDone||'0'}));
    const tm=(f.team||[]).filter(t=>t.who&&t.who.trim());
    const base={ name:f.name.trim(), type:f.type||'SEO Campaign', objective:f.objective||'Lead Generation', status:f.status||'Draft', brand:f.brand||'Beetloop', dept:f.dept||'SEO', cycle:f.cycle||'Q3 2026', start:this.fmtDate(f.start)||this.todayStr(), end:this.fmtDate(f.end)||'—', owner:f.owner||this.currentPerson(), budget:f.budget||'—', spend:f.spend||'₹0', goal:f.goal||'', countries:f.countries||'—', industries:f.industries||'—', audience:f.audience||'—', persona:f.persona||'—', companySize:f.companySize||'—', kpis:kp, efforts:ef, team:tm.length?tm:[{who:f.owner||this.currentPerson(),role:'Campaign owner'}],
      outcomeKpi:f.outcomeKpi||(kp[0]&&kp[0].kpi)||'Outcome', outcomeTarget:f.outcomeTarget||(kp[0]&&kp[0].target)||'0', outcomeCurrent:f.outcomeCurrent||(kp[0]&&kp[0].current)||'0', outcomeUnit:f.outcomeUnit||(kp[0]&&kp[0].unit)||'',
      taskCount:ef.reduce((s,e)=>s+(parseInt(e.tasks,10)||0),0), taskDone:ef.reduce((s,e)=>s+(parseInt(e.tasksDone,10)||0),0) };
    if(this.state.cmpEditId){
      const editId=this.state.cmpEditId;
      const existing=this.allCampaigns().find(x=>x.id===editId);
      this.setState({ cmpUpd:{...(this.state.cmpUpd||{}),[editId]:base}, cmpNew:false, cmpEditId:null, cmpForm:{} });
      this.flash('Campaign updated.');
      supabase.from('campaigns').upsert({ id:editId, payload:{...existing,...base,id:editId}, created_by:this.state.authUser?this.state.authUser.id:null }).then(({error})=>{
        if(error) console.warn('[supabase] campaign upsert failed:', error.message);
      });
    } else {
      const nid=this._nextCampaignId();
      const rec={id:nid,...base};
      this.setState({ cmpAdded:[...(this.state.cmpAdded||[]),rec], cmpNew:false, cmpForm:{} });
      this.flash(nid+' created — '+kp.length+' KPI'+(kp.length===1?'':'s')+' and '+ef.length+' effort line'+(ef.length===1?'':'s')+' linked. Generate tasks from Effort Planner.');
      supabase.from('campaigns').insert({ id:nid, payload:rec, created_by:this.state.authUser?this.state.authUser.id:null }).then(({error})=>{
        if(error) console.warn('[supabase] campaign insert failed:', error.message);
      });
    }
  }
  _deleteCampaign(){
    if(!this.hasPerm('campaigns','delete')){ this.flash('You do not have permission to delete campaigns.'); return; }
    const id=this.state.cmpEditId; if(!id) return;
    const c=this.allCampaigns().find(x=>x.id===id);
    this.setState({ cmpDeleted:[...(this.state.cmpDeleted||[]), id], cmpNew:false, cmpEditId:null, cmpForm:{} });
    this.flash('Deleted campaign: '+(c?c.name:id)+'.');
    // upsert (not update) — a campaign that's still only in CAMPAIGNS_SEED()
    // has no row yet, so this is what makes the deletion stick past reload
    // instead of the seed entry silently reappearing.
    supabase.from('campaigns').upsert({ id, payload:c||{}, deleted:true, created_by:this.state.authUser?this.state.authUser.id:null }).then(({error})=>{
      if(error) console.warn('[supabase] campaign delete failed:', error.message);
    });
  }

  // ============ Messages (new module) ============
  // thAdded is keyed {threadId: {msgId: payload}} — a patch/overlay, same
  // pattern as sopUpd/tktUpd/etc., not a plain append array. This is what
  // lets an existing message get *edited* — e.g. linked to a task after
  // the fact — instead of only ever supporting brand-new messages.
  allThreads(){
    const added=(this.state.thAdded||{});
    const patched=(this.state.thPatched||{});
    const thNew=this.state.thNew||[];
    return thNew.map(t=>{
      const overlay=added[t.id]||{};
      const baseIds=new Set(t.msgs.map(m=>m.id));
      const merged=t.msgs.map(m=>overlay[m.id]?{...m,...overlay[m.id]}:m);
      const extra=Object.keys(overlay).filter(id=>!baseIds.has(id)).map(id=>overlay[id]);
      return { ...t, ...(patched[t.id]||{}), msgs:[...merged, ...extra] };
    }).filter(t=>!t.deleted);
  }
  // Deletes the whole conversation (not just one message) — the thread
  // record itself gets a `deleted` flag via the same upsert path _patchThread
  // uses, so it survives a reload instead of reappearing.
  _deleteThread(threadId){
    this._patchThread(threadId, { deleted:true });
    this.flash('Conversation deleted.');
  }
  // Private-by-default, like WhatsApp: a group channel only shows to its
  // actual members (DM threads store only the OTHER party in `members` —
  // see thSave() — so every DM is implicitly the viewer's own and always
  // stays visible; only channels need a real membership check). Nobody,
  // not even Admin, sees every conversation by default — that requires the
  // explicit "Audit all conversations" permission (User Management ->
  // Permissions -> Messages), which is off for every role until someone
  // deliberately turns it on. This is the one place in the app where Admin
  // does NOT get automatic full access — conversation privacy comes first.
  myThreads(){
    const all=this.allThreads();
    if(this.hasPerm('messages','auditAll')) return all;
    const me=this.currentPerson();
    return all.filter(t=>t.kind!=='channel' || (t.members||[]).includes(me));
  }
  // Shared write path for both a brand-new message and an edit to an
  // existing one (e.g. task-linking) — same overlay, same upsert, so a
  // message can still be edited and have that edit survive a reload.
  _patchMessage(threadId, msg, patch){
    const full={...msg, ...patch};
    const add={...(this.state.thAdded||{})};
    add[threadId]={...(add[threadId]||{}), [msg.id]:full};
    this.setState({ thAdded:add });
    supabase.from('messages').upsert({
      id:threadId+':'+msg.id, thread_id:threadId, payload:full,
      created_by:this.state.authUser?this.state.authUser.id:null,
    }).then(({error})=>{
      if(error) console.warn('[supabase] message upsert failed:', error.message);
    });
  }
  // Generic thread-payload patch (pin/archive live on the thread record
  // itself, not a message) — same overlay-then-upsert shape as
  // _patchMessage so a pin/archive survives a reload immediately.
  _patchThread(threadId, patch){
    const th=this.allThreads().find(t=>t.id===threadId);
    if(!th) return;
    const { msgs, ...rec }=th;
    const full={...rec, ...patch};
    this.setState(s=>({ thPatched:{ ...(s.thPatched||{}), [threadId]:{ ...((s.thPatched||{})[threadId]), ...patch } } }));
    supabase.from('threads').upsert({ id:threadId, payload:full, created_by:this.state.authUser?this.state.authUser.id:null }).then(({error})=>{
      if(error) console.warn('[supabase] thread upsert failed:', error.message);
    });
  }
  // WhatsApp-style read receipts — appends {who, when} to a message's
  // readBy the first time the current user actually has that thread open.
  // Skips messages already marked and the user's own messages (you always
  // implicitly "see" what you sent).
  _markThreadRead(threadId){
    const me=this.currentPerson();
    const th=this.allThreads().find(t=>t.id===threadId);
    if(!th) return;
    const now=new Date();
    const when=this.todayStr()+' · '+String(now.getHours()).padStart(2,'0')+':'+String(now.getMinutes()).padStart(2,'0');
    th.msgs.forEach(m=>{
      if(m.who===me) return;
      if((m.readBy||[]).some(r=>r.who===me)) return;
      this._patchMessage(threadId, m, { readBy:[...(m.readBy||[]), { who:me, when }] });
    });
  }
  // Unread = messages not sent by me that I haven't read yet (mirrors
  // _markThreadRead's own readBy check, kept in sync by construction since
  // both read the same field).
  _unreadInThread(t, me){
    return t.msgs.filter(m=>m.who!==me && !(m.readBy||[]).some(r=>r.who===me)).length;
  }
  messagesView(){
    const rk=this.state.roleKey, me=this.currentPerson();
    const online=this.state.onlineUsers||{};
    const typingMap=this.state.typingByThread||{};
    const q=(this.state.msgThreadQuery||'').toLowerCase();
    const archiveOpen=!!this.state.msgArchiveOpen;
    const allMine=this.myThreads().filter(t=>archiveOpen===(t.archivedBy||[]).includes(me));
    const filtered=q ? allMine.filter(t=>{ const last=t.msgs[t.msgs.length-1]||{};
      return t.name.toLowerCase().includes(q) || String(last.text||'').toLowerCase().includes(q); }) : allMine;
    const threads=filtered.slice().sort((a,b)=>((b.pinnedBy||[]).includes(me)?1:0)-((a.pinnedBy||[]).includes(me)?1:0));
    const curId=this.state.thOpen||(threads[0]&&threads[0].id);
    const cur=threads.find(t=>t.id===curId)||threads[0];
    const tasks=this.allTasks();
    const archiveToggle={ msgArchiveOpen:archiveOpen,
      msgToggleArchiveView:()=>this.setState({ msgArchiveOpen:!archiveOpen, thOpen:null }) };
    const threadFormVm=(()=>{ const nf=this.state.thForm;
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
          // A sequential id derived from threads.length collided with real
          // DB rows the moment any thread was deleted or simply not visible
          // to this user (myThreads() is privacy-filtered) — that count is
          // never a reliable stand-in for "next free id", so new chats could
          // silently fail to insert. Date.now() matches every other id
          // generator in this file (messages, ideas, backlink domains, ...).
          const id='TH-'+Date.now();
          const name=k==='channel'?('#'+String(nf.name).trim().toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')):mem[0];
          const msgs=[];
          if((nf.first||'').trim()){ const now=new Date();
            msgs.push({ id:'M'+Date.now(), who:me, role:this.ROLES[rk].label,
              when:this.todayStr()+' · '+String(now.getHours()).padStart(2,'0')+':'+String(now.getMinutes()).padStart(2,'0'),
              text:nf.first.trim() }); }
          const threadRec={ id, kind:k, name, members:k==='channel'?[me].concat(mem):mem };
          this.setState({ thNew:[{...threadRec, msgs}].concat(this.state.thNew||[]),
            thForm:null, thOpen:id });
          this.flash((k==='channel'?'Group ':'Conversation ')+name+' created.');
          supabase.from('threads').insert({ id, payload:threadRec, created_by:this.state.authUser?this.state.authUser.id:null }).then(({error})=>{
            if(error) console.warn('[supabase] thread insert failed:', error.message);
          });
          msgs.forEach(msg=>{
            supabase.from('messages').upsert({ id:id+':'+msg.id, thread_id:id, payload:msg, created_by:this.state.authUser?this.state.authUser.id:null }).then(({error})=>{
              if(error) console.warn('[supabase] message insert failed:', error.message);
            });
          });
        } }; })();
    if(!cur) return { msgThreads:[], msgEmpty:true, ...archiveToggle, ...threadFormVm,
      msgThreadQuery:this.state.msgThreadQuery||'', msgSetThreadQuery:(e)=>this.setState({ msgThreadQuery:e.target.value }) };
    const searchOpen=!!this.state.msgSearchOpen;
    const searchQ=(this.state.msgSearchQuery||'').toLowerCase();
    const searchHits=searchQ ? cur.msgs.filter(m=>String(m.text||'').toLowerCase().includes(searchQ)).length : 0;
    return {
      ...archiveToggle,
      msgThreadQuery:this.state.msgThreadQuery||'', msgSetThreadQuery:(e)=>this.setState({ msgThreadQuery:e.target.value }),
      msgSearchOpen:searchOpen, msgSearchQuery:this.state.msgSearchQuery||'', msgSearchHitCount:searchHits,
      msgToggleSearch:()=>this.setState({ msgSearchOpen:!searchOpen, msgSearchQuery:'' }),
      msgSetSearchQuery:(e)=>this.setState({ msgSearchQuery:e.target.value }),
      msgThreads:threads.map(t=>{ const last=t.msgs[t.msgs.length-1]||{};
        const active=t.id===cur.id;
        const unread=this._unreadInThread(t, me);
        const isOnline=t.kind!=='channel' && !!online[t.name];
        const pinned=(t.pinnedBy||[]).includes(me);
        const archived=(t.archivedBy||[]).includes(me);
        return { id:t.id, name:t.name, isChannel:t.kind==='channel',
          icon:t.kind==='channel'?'hash':'user',
          preview:(last.who||'')+': '+String(last.text||'').slice(0,52)+'…',
          when:String(last.when||'').split(' · ')[1]||'',
          count:t.msgs.length+' message'+(t.msgs.length===1?'':'s'),
          hasUnread:unread>0, unreadCount:unread>99?'99+':String(unread),
          isOnline, onlineDotColor:isOnline?'var(--verify-500)':'var(--ink-300)',
          pinned, archived,
          togglePin:()=>this._patchThread(t.id, { pinnedBy: pinned?(t.pinnedBy||[]).filter(x=>x!==me):[...(t.pinnedBy||[]),me] }),
          toggleArchive:()=>this._patchThread(t.id, { archivedBy: archived?(t.archivedBy||[]).filter(x=>x!==me):[...(t.archivedBy||[]),me] }),
          deleteThread:(e)=>{ if(e)e.stopPropagation();
            this.confirmDelete('Delete Conversation?', 'Are you sure you want to delete this conversation? This action cannot be undone.', ()=>{
              this._deleteThread(t.id); if(active) this.setState({ thOpen:null });
            }); },
          style:'display:flex;gap:10px;padding:12px 14px;border-radius:12px;cursor:pointer;border:1px solid '+(active?'var(--orchid-300)':'transparent')+';background:'+(active?'var(--orchid-100)':'transparent'),
          open:()=>{ this.setState({ thOpen:t.id }); this._markThreadRead(t.id); } }; }),
      msgCurName:cur.name, msgCurIcon:cur.kind==='channel'?'hash':'user',
      msgCurOnline:cur.kind!=='channel' && !!online[cur.name],
      // DMs only ever have the other party in `members` (see thSave()), so
      // joining it just repeats the header name right back — show their
      // role instead. Channels genuinely have multiple members, so the
      // joined list stays useful there.
      msgCurMembers:cur.kind==='channel' ? cur.members.join(', ')
        : (()=>{ const u=this.userOf(cur.name); return u ? u.role+' · '+u.dept : 'Direct message'; })(),
      msgCurStatusLine: (()=>{ const typing=typingMap[cur.id];
        if(typing && Date.now()-typing.at<3500) return typing.who+' is typing…';
        if(cur.kind!=='channel') return online[cur.name] ? 'Online' : '';
        return ''; })(),
      msgCurStatusIsTyping: !!(typingMap[cur.id] && Date.now()-typingMap[cur.id].at<3500),
      msgRows:cur.msgs.map(m=>{ const linked=m.taskId&&tasks.find(t=>t.id===m.taskId);
        const mine=m.who===me;
        // WhatsApp-style receipt — only meaningful for messages I sent.
        // DM: single tick "Sent" until the other person's readBy entry
        // shows up, then a colored "Seen · HH:MM". Group: "Seen by N of M"
        // so it never falsely implies everyone's read it.
        const others=(cur.members||[]).filter(x=>x!==m.who);
        const readers=(m.readBy||[]).filter(r=>others.includes(r.who));
        let receiptLabel='', receiptSeen=false;
        if(mine && others.length){
          if(cur.kind==='channel'){
            receiptSeen=readers.length>0;
            receiptLabel=readers.length===0?'Sent':(readers.length===others.length?'Seen by all':('Seen by '+readers.length+' of '+others.length));
          } else {
            receiptSeen=readers.length>0;
            receiptLabel=readers.length?('Seen · '+(String(readers[0].when||'').split(' · ')[1]||'')):'Sent';
          }
        }
        const replySrc=m.replyTo&&cur.msgs.find(x=>x.id===m.replyTo);
        const canDelete=mine||this.hasPerm('messages','delete')||this.hasPerm('messages','auditAll');
        return { ...m, mine, initials:m.who.split(' ').map(s=>s[0]).join('').slice(0,2),
          showNameRow: !mine && cur.kind==='channel',
          bubbleBg:mine?'var(--orchid-100)':'var(--surface-50)',
          avatarBg:mine?'var(--orchid-500)':'var(--beet-700)',
          hasReceipt:!!receiptLabel, receiptLabel, receiptSeen,
          receiptIcon:receiptSeen?'check-check':'check',
          receiptColor:receiptSeen?'var(--verify-600)':'var(--ink-400)',
          searchDim: !!searchQ && !String(m.text||'').toLowerCase().includes(searchQ),
          replyPreview: replySrc ? { who:replySrc.who, text:String(replySrc.text||'').slice(0,80) } : null,
          scrollToReply:()=>{ const el=document.getElementById('msg-'+m.replyTo); if(el) el.scrollIntoView({ behavior:'smooth', block:'center' }); },
          reply:()=>this.setState({ msgReplyTo:m.id, msgEditingId:null }),
          forward:()=>this.setState({ msgForwardId:m.id }),
          forwardPicker:this.state.msgForwardId===m.id,
          forwardOptions:[{v:'',label:'— Choose a conversation —'}].concat(allMine.filter(t=>t.id!==cur.id).map(t=>({ v:t.id, label:t.name }))),
          forwardPick:(e)=>{ const v=e.target.value; if(!v) return;
            const now=new Date();
            const fwd={ id:'M'+Date.now(), who:me, role:this.ROLES[rk].label,
              when:this.todayStr()+' · '+String(now.getHours()).padStart(2,'0')+':'+String(now.getMinutes()).padStart(2,'0'),
              text:m.text, files:m.files||[], forwarded:true };
            this._patchMessage(v, fwd, {});
            this.setState({ msgForwardId:null });
            const t=allMine.find(x=>x.id===v); this.flash('Message forwarded'+(t?(' to '+t.name):'')+'.'); },
          forwardCancel:()=>this.setState({ msgForwardId:null }),
          copy:()=>{ if(navigator.clipboard&&navigator.clipboard.writeText) navigator.clipboard.writeText(String(m.text||'')); this.flash('Message copied.'); },
          canEdit: mine && !m.deleted,
          startEdit:()=>this.setState({ msgEditingId:m.id, msgDraft:String(m.text||''), msgReplyTo:null }),
          canDelete: canDelete && !m.deleted,
          remove:()=>this.confirmDelete('Delete Message?', 'Are you sure you want to delete this message? This action cannot be undone.', ()=>this._patchMessage(cur.id, m, { deleted:true, text:'' })),
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
            this.setState({ tkNew:true, msgConvert:m.id,
              tkForm:{ template:'Custom task', name:String(m.text).slice(0,60), desc:'From '+cur.name+' — '+m.who+': "'+m.text+'"',
                priority:'Medium', assignee:(this.state.users&&this.state.users[0]?this.state.users[0].name:''), recurrence:'None' } });
            this.flash('Creating a task from this message — link its effort plan and KPI to complete the chain.'); },
          linkOpen:()=>this.setState({ msgLink:m.id }),
          linkPicker:this.state.msgLink===m.id,
          linkOptions:[{v:'',label:'— Select an existing task —'}].concat(tasks.map(t=>({ v:t.id, label:t.id+' · '+t.name }))),
          linkPick:(e)=>{ const v=e.target.value; if(!v) return;
            this._patchMessage(cur.id, m, { taskId:v });
            this.setState({ msgLink:null });
            const t=tasks.find(x=>x.id===v); this.flash('Message linked to '+v+(t?(' — '+t.name):'')+'.'); },
          linkCancel:()=>this.setState({ msgLink:null }) }; }),
      msgDraft:this.state.msgDraft||'',
      msgOnDraft:(e)=>{ this.setState({ msgDraft:e.target.value }); this._broadcastTyping(cur.id); },
      msgDraftFiles:(this.state.msgFiles||[]).map((n,i)=>({ name:n,
        icon:/\.(png|jpe?g|gif|webp|svg)$/i.test(n)?'image':(/\.(mp4|mov|webm)$/i.test(n)?'video':(/\.pdf$/i.test(n)?'file-text':'file')),
        remove:()=>{ const a=(this.state.msgFiles||[]).slice(); a.splice(i,1); this.setState({ msgFiles:a }); } })),
      msgHasFiles:(this.state.msgFiles||[]).length>0,
      msgAttach:()=>this.openFilePicker('msg','Attach to message'),
      msgAttachImage:()=>{ this.openFilePicker('msg','Attach image to message'); this.setState({ fpType:'Image', fpKind:'Image' }); },
      msgEmojiOpen:!!this.state.msgEmojiOpen,
      msgToggleEmoji:()=>this.setState({ msgEmojiOpen:!this.state.msgEmojiOpen }),
      msgEmojiList:['😀','😂','😊','😍','👍','🙏','🎉','🔥','❤️','😢','😮','👏','✅','⚠️','🚀','💡'],
      msgPickEmoji:(em)=>this.setState({ msgDraft:(this.state.msgDraft||'')+em }),
      msgReplyingTo: this.state.msgReplyTo ? (()=>{ const src=cur.msgs.find(x=>x.id===this.state.msgReplyTo); return src?{ who:src.who, text:String(src.text||'').slice(0,80) }:null; })() : null,
      msgCancelReply:()=>this.setState({ msgReplyTo:null }),
      msgEditingId:this.state.msgEditingId||null,
      msgCancelEdit:()=>this.setState({ msgEditingId:null, msgDraft:'' }),
      msgSend:()=>{ const txt=(this.state.msgDraft||'').trim();
        const files=this.state.msgFiles||[];
        if(!txt&&!files.length){ this.flash('Type a message or attach a file first.'); return; }
        if(this.state.msgEditingId){
          const orig=cur.msgs.find(x=>x.id===this.state.msgEditingId);
          if(orig){
            this._patchMessage(cur.id, orig, { text:txt, edited:true, editHistory:[...(orig.editHistory||[]), orig.text] });
          }
          this.setState({ msgDraft:'', msgFiles:[], msgEditingId:null });
          return;
        }
        const id='M'+Date.now();
        const now=new Date();
        const msg={ id, who:me, role:this.ROLES[rk].label, when:this.todayStr()+' · '+String(now.getHours()).padStart(2,'0')+':'+String(now.getMinutes()).padStart(2,'0'), text:txt||'(attachment)', files };
        if(this.state.msgReplyTo) msg.replyTo=this.state.msgReplyTo;
        this._patchMessage(cur.id, msg, {});
        this.setState({ msgDraft:'', msgFiles:[], msgReplyTo:null });
        if(files.length) this.flash(files.length+' file'+(files.length===1?'':'s')+' shared.'); },
      msgCanAct:['manager','team_lead','admin','ceo'].includes(rk),
      ...threadFormVm,
    };
  }
  // Floating global widget — same underlying threads/messages as
  // messagesView() (myThreads(), _patchMessage, _markThreadRead,
  // _unreadInThread — no parallel Supabase calls), but its own open/
  // minimized/active-thread state so it survives route navigation
  // independently of the full Messages page's thOpen.
  // Floating widget — full feature parity with the main Messages page
  // (reply/forward/copy/edit/delete/pin/archive/emoji/attachments), but
  // entirely separate `chatWidget*` state so editing/replying/attaching in
  // the widget never collides with whatever the full page is doing with its
  // own `msg*` state for a different thread.
  chatWidgetView(){
    const rk=this.state.roleKey, me=this.currentPerson();
    const online=this.state.onlineUsers||{};
    const typingMap=this.state.typingByThread||{};
    const allMine=this.myThreads().filter(t=>!(t.archivedBy||[]).includes(me));
    const totalUnread=allMine.reduce((sum,t)=>sum+this._unreadInThread(t,me),0);
    const open=!!this.state.chatWidgetOpen;
    const minimized=!!this.state.chatWidgetMinimized;
    const curId=this.state.chatWidgetThread;
    const cur=curId ? allMine.find(t=>t.id===curId) : null;
    const fileIcon=(n)=>/\.(png|jpe?g|gif|webp|svg)$/i.test(n)?'image':(/\.(mp4|mov|webm)$/i.test(n)?'video':(/\.pdf$/i.test(n)?'file-text':'file'));
    return {
      cwOpen:open, cwMinimized:minimized,
      cwHasUnread:totalUnread>0, cwUnreadTotal:totalUnread>99?'99+':String(totalUnread),
      cwToggleOpen:()=>this.setState({ chatWidgetOpen:!open, chatWidgetMinimized:false }),
      cwClose:()=>this.setState({ chatWidgetOpen:false }),
      cwToggleMinimize:()=>this.setState({ chatWidgetMinimized:!minimized }),
      cwBack:()=>this.setState({ chatWidgetThread:null }),
      cwShowList:!cur,
      cwThreads:allMine.slice().sort((a,b)=>((b.pinnedBy||[]).includes(me)?1:0)-((a.pinnedBy||[]).includes(me)?1:0)).map(t=>{
        const last=t.msgs[t.msgs.length-1]||{};
        const unread=this._unreadInThread(t, me);
        const isOnline=t.kind!=='channel' && !!online[t.name];
        const pinned=(t.pinnedBy||[]).includes(me);
        return { id:t.id, name:t.name, icon:t.kind==='channel'?'hash':'user', pinned,
          preview:String(last.text||'').slice(0,44),
          hasUnread:unread>0, unreadCount:unread>99?'99+':String(unread),
          isOnline, onlineDotColor:isOnline?'var(--verify-500)':'var(--ink-300)',
          togglePin:()=>this._patchThread(t.id, { pinnedBy: pinned?(t.pinnedBy||[]).filter(x=>x!==me):[...(t.pinnedBy||[]),me] }),
          open:()=>{ this.setState({ chatWidgetThread:t.id }); this._markThreadRead(t.id); } }; }),
      ...(cur ? {
        cwCurName:cur.name, cwCurIcon:cur.kind==='channel'?'hash':'user',
        cwCurOnline:cur.kind!=='channel' && !!online[cur.name],
        cwCurStatusLine:(()=>{ const typing=typingMap[cur.id];
          if(typing && Date.now()-typing.at<3500) return typing.who+' is typing…';
          if(cur.kind!=='channel') return online[cur.name] ? 'Online' : '';
          return ''; })(),
        cwRows:cur.msgs.map(m=>{ const mine=m.who===me;
          const others=(cur.members||[]).filter(x=>x!==m.who);
          const readers=(m.readBy||[]).filter(r=>others.includes(r.who));
          let receiptLabel='', receiptSeen=false;
          if(mine && others.length){
            receiptSeen=readers.length>0;
            receiptLabel=cur.kind==='channel'
              ? (readers.length===0?'Sent':(readers.length===others.length?'Seen by all':('Seen by '+readers.length+' of '+others.length)))
              : (readers.length?'Seen':'Sent');
          }
          const replySrc=m.replyTo&&cur.msgs.find(x=>x.id===m.replyTo);
          const canDelete=mine||this.hasPerm('messages','delete')||this.hasPerm('messages','auditAll');
          return { id:m.id, mine, deleted:!!m.deleted, text:m.text, who:m.who, forwarded:!!m.forwarded, edited:!!m.edited,
            when:String(m.when||'').split(' · ')[1]||'',
            initials:m.who.split(' ').map(s=>s[0]).join('').slice(0,2),
            bubbleBg:mine?'var(--orchid-100)':'var(--surface-50)',
            avatarBg:mine?'var(--orchid-500)':'var(--beet-700)',
            showNameRow:!mine && cur.kind==='channel',
            hasReceipt:!!receiptLabel, receiptLabel, receiptSeen,
            receiptIcon:receiptSeen?'check-check':'check',
            receiptColor:receiptSeen?'var(--verify-600)':'var(--ink-400)',
            hasFiles:(m.files||[]).length>0,
            fileRows:(m.files||[]).map(n=>({ name:n, icon:fileIcon(n), openRepo:()=>this.setState({ route:'files' }) })),
            replyPreview:replySrc?{ who:replySrc.who, text:String(replySrc.text||'').slice(0,80) }:null,
            scrollToReply:()=>{ const el=document.getElementById('cw-msg-'+m.replyTo); if(el) el.scrollIntoView({ behavior:'smooth', block:'center' }); },
            reply:()=>this.setState({ chatWidgetReplyTo:m.id, chatWidgetEditingId:null }),
            forward:()=>this.setState({ chatWidgetForwardId:m.id }),
            forwardPicker:this.state.chatWidgetForwardId===m.id,
            forwardOptions:[{v:'',label:'— Choose a conversation —'}].concat(allMine.filter(t=>t.id!==cur.id).map(t=>({ v:t.id, label:t.name }))),
            forwardPick:(e)=>{ const v=e.target.value; if(!v) return;
              const now=new Date();
              const fwd={ id:'M'+Date.now(), who:me, role:this.ROLES[rk].label,
                when:this.todayStr()+' · '+String(now.getHours()).padStart(2,'0')+':'+String(now.getMinutes()).padStart(2,'0'),
                text:m.text, files:m.files||[], forwarded:true };
              this._patchMessage(v, fwd, {});
              this.setState({ chatWidgetForwardId:null });
              const t=allMine.find(x=>x.id===v); this.flash('Message forwarded'+(t?(' to '+t.name):'')+'.'); },
            forwardCancel:()=>this.setState({ chatWidgetForwardId:null }),
            copy:()=>{ if(navigator.clipboard&&navigator.clipboard.writeText) navigator.clipboard.writeText(String(m.text||'')); this.flash('Message copied.'); },
            canEdit:mine && !m.deleted,
            startEdit:()=>this.setState({ chatWidgetEditingId:m.id, chatWidgetDraft:String(m.text||''), chatWidgetReplyTo:null }),
            canDelete:canDelete && !m.deleted,
            remove:()=>this.confirmDelete('Delete Message?', 'Are you sure you want to delete this message? This action cannot be undone.', ()=>this._patchMessage(cur.id, m, { deleted:true, text:'' })) }; }),
        cwEmojiOpen:!!this.state.chatWidgetEmojiOpen,
        cwToggleEmoji:()=>this.setState({ chatWidgetEmojiOpen:!this.state.chatWidgetEmojiOpen }),
        cwEmojiList:['😀','😂','😊','😍','👍','🙏','🎉','🔥','❤️','😢','😮','👏','✅','⚠️','🚀','💡'],
        cwPickEmoji:(em)=>this.setState({ chatWidgetDraft:(this.state.chatWidgetDraft||'')+em }),
        cwReplyingTo:this.state.chatWidgetReplyTo ? (()=>{ const src=cur.msgs.find(x=>x.id===this.state.chatWidgetReplyTo); return src?{ who:src.who, text:String(src.text||'').slice(0,80) }:null; })() : null,
        cwCancelReply:()=>this.setState({ chatWidgetReplyTo:null }),
        cwEditingId:this.state.chatWidgetEditingId||null,
        cwCancelEdit:()=>this.setState({ chatWidgetEditingId:null, chatWidgetDraft:'' }),
        cwDraftFiles:(this.state.chatWidgetFiles||[]).map((n,i)=>({ name:n, icon:fileIcon(n),
          remove:()=>{ const a=(this.state.chatWidgetFiles||[]).slice(); a.splice(i,1); this.setState({ chatWidgetFiles:a }); } })),
        cwHasFiles:(this.state.chatWidgetFiles||[]).length>0,
        cwAttach:()=>this.openFilePicker('chatwidget','Attach to message'),
        cwAttachImage:()=>{ this.openFilePicker('chatwidget','Attach image to message'); this.setState({ fpType:'Image', fpKind:'Image' }); },
        cwDraft:this.state.chatWidgetDraft||'',
        cwOnDraft:(e)=>{ this.setState({ chatWidgetDraft:e.target.value }); this._broadcastTyping(cur.id); },
        cwSend:()=>{ const txt=(this.state.chatWidgetDraft||'').trim();
          const files=this.state.chatWidgetFiles||[];
          if(!txt&&!files.length) return;
          if(this.state.chatWidgetEditingId){
            const orig=cur.msgs.find(x=>x.id===this.state.chatWidgetEditingId);
            if(orig) this._patchMessage(cur.id, orig, { text:txt, edited:true, editHistory:[...(orig.editHistory||[]), orig.text] });
            this.setState({ chatWidgetDraft:'', chatWidgetFiles:[], chatWidgetEditingId:null });
            return;
          }
          const id='M'+Date.now(); const now=new Date();
          const msg={ id, who:me, role:this.ROLES[rk].label,
            when:this.todayStr()+' · '+String(now.getHours()).padStart(2,'0')+':'+String(now.getMinutes()).padStart(2,'0'), text:txt||'(attachment)', files };
          if(this.state.chatWidgetReplyTo) msg.replyTo=this.state.chatWidgetReplyTo;
          this._patchMessage(cur.id, msg, {});
          this.setState({ chatWidgetDraft:'', chatWidgetFiles:[], chatWidgetReplyTo:null }); },
      } : {}),
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
  // Recomputed live from o.due, same as cycleElapsedOf — a stored daysLeft
  // number would drift stale the moment the calendar moves on, which is
  // exactly how every DB-loaded OKR ended up permanently showing "90 days
  // left" regardless of its real due date.
  daysLeftOf(o){
    const due=new Date(o.due);
    if(isNaN(due)) return o.daysLeft||0;
    const now=new Date(); now.setHours(0,0,0,0); due.setHours(0,0,0,0);
    return Math.round((due-now)/86400000);
  }
  allOkrs(){
    const upd=this.state.okrUpd||{};
    // Dedupe by `code`, not `id` — a seed OKR's id ('1'), a locally-created
    // one's id ('okr-local-<ts>') and a DB-loaded one's id ('okr-<uuid>')
    // are all differently shaped, so `code` (the one field the app keeps
    // stable everywhere, same as how `tasks.code` works) is the only safe
    // join key once a seed OKR has been edited and gained a real DB row.
    const added=this.state.okrAdded||[];
    const addedCodes=new Set(added.map(o=>o.code));
    const del=this.state.okrDeleted||[];
    return this.OKR_SEED().filter(o=>!addedCodes.has(o.code)).concat(added)
      .filter(o=>!del.includes(o.code))
      .map(o=>upd[o.id]?{...o,...upd[o.id]}:o)
      .map(o=>{
        const p=Math.min(100,this.okrProgress(o));
        return { ...o, progress:p, progressRaw:this.okrProgress(o), cycleElapsed:this.cycleElapsedOf(o), daysLeft:this.daysLeftOf(o) };
      });
  }
  _persistOkr(code, fields){
    supabase.from('okrs').upsert({ code, ...fields }, { onConflict:'code' }).then(({error})=>{
      if(error) console.warn('[supabase] okr upsert failed:', error.message);
    });
  }
  OKR_DATA(){ return this.allOkrs(); }

  renderVals(){
    const rk = this.state.roleKey;
    const profile = this.state.authProfile;
    const role = profile
      ? { ...this.ROLES[rk], person: profile.full_name||profile.email, tag: profile.designation||this.ROLES[rk].tag,
          short: (profile.full_name||profile.email||'?').trim().split(/\s+/).map(w=>w[0]).slice(0,2).join('').toUpperCase(),
          avatarUrl: profile.avatar_url||'' }
      : this.ROLES[rk];
    const route = this.state.route;
    const acc = this.ACCESS;
    const showMyKpi = route==='okr' && ['team_lead','senior','junior'].includes(rk);

    // nav — hidden entirely if Admin has revoked View for this role/module in
    // the Permissions matrix; defaults to the existing ACCESS-derived
    // visibility so nothing changes unless Admin actually overrides a cell.
    const buildNav = (mods) => mods.filter(m=>acc[m] && acc[m][rk] && this.getPerm(m, rk).view).map(m=>{
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
    const nav = buildNav(['dashboard','campaigns','effort','tasks','templates','qc','okr','leads','analytics','content','repositories','files','messages','sop','support']);
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
      leads:{ eyebrow:'Growth', icon:'user-plus', title:'Leads', sub:'Daily lead entry and pipeline — from first enquiry to won.' },
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
    // 'files' (Document Repository) has no create action — it's auto-collected
    // from task evidence/QC refs/comments, not something you manually add to
    // (see the page's own "no separate upload needed" note). Without this,
    // any role with edit-level access showed an empty, unlabeled button here
    // that — if clicked — flashed a false "Draft created" toast and did nothing.
    if(['dashboard','analytics','masters','config','qc','content','effort','profile','files','messages'].includes(route)) page.canEdit = false;
    if(showMyKpi){ page.eyebrow='Performance'; page.icon='target'; page.title='My KPIs'; page.sub='Report your check-ins and track your own KPIs.'; page.canEdit=false; }

    const primaryAction = ()=>{
      if(route==='users') this.setState({ showUserModal:true });
      else if(route==='tasks') this.setState({ tkNew:true, tkForm:{ template:'', priority:'Medium', assignee:(this.state.users&&this.state.users[0]?this.state.users[0].name:''), recurrence:'None' } });
      else if(route==='templates'){ const tb=this.state.ttTab||'task'; if(tb==='kpi') this.setState({ ktNew:true, ktEditId:null, ktForm:{ division:'SEO', category:'Traffic', direction:'Increase', freq:'Monthly', source:'GA4', status:'Active' } }); else if(tb==='okr') this.setState({ otNew:true, otEditId:null, otForm:{ category:'SEO', scope:'Department', division:'SEO', status:'Active', krs:[{t:'',kpi:'',unit:'',target:'',weight:'100',freq:'Monthly'}] } }); else this.setState({ ttNew:true, ttEditId:null, ttForm:{ division:'SEO', priority:'Medium', recurrence:'None', status:'Active', checklist:['',''] } }); }
      else if(route==='ideas') this.setState({ showIdeaForm:true, ideaForm:{} });
      else if(route==='okr') this.setState({ showOkrPanel:true, okrEditId:null,
        okrForm:{ title:'', desc:'', owner:(this.state.users&&this.state.users[0]?this.state.users[0].name:''), dept:'SEO', brand:'Beetloop', category:'SEO', scope:'Department', priority:'Medium', cycle:'Q1 2026', reviewFreq:'Weekly', start:'', end:'', parent:'None (top level)', dependsOn:'', effortTargets:'', progressCalc:'Automatic (from KPI logs)', dataSource:'GA4', reviewer:this.OKR_REVIEWERS()[0], status:'Draft', risks:'' },
        okrDraftKRs:[{id:1,weight:'50'},{id:2,weight:'50'}], okrKRSeq:3 });
      else if(route==='campaigns') this.setState({ cmpNew:true, cmpEditId:null, cmpSection:'cmpA',
        cmpForm:{ type:'SEO Campaign', status:'Draft', brand:'Beetloop', dept:'SEO', objective:'Lead Generation', cycle:'Q3 2026', team:[] } });
      else if(route==='sop') this.setState({ sopNew:true, sopForm:{ division:'Content', status:'Draft', priority:'Medium', frequency:'Per project', category:'Content production' } });
      else if(route==='support') this.setState({ tktNew:true, tktForm:{ cat:'software', priority:'Medium' } });
      else if(route==='repositories') this.setState({ repoNew:true, repoForm:{ cat:'Content', owner:this.currentPerson() } });
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
    const showLeads = route==='leads';
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
    const showConfig = route==='config';
    const showTable = route==='repositories';
    const showUsersTable = route==='users';
    const showPageHead = !showMasterDetail;

    const out = {
      isLogin: this.state.screen==='login',
      isActivate: this.state.screen==='activate',
      isApp: this.state.screen==='app',
      // login
      loginPlatformName:((this.state.platformSettings||{}).general||{}).companyName||'BEETLOOP',
      loginTagline:((this.state.platformSettings||{}).general||{}).tagline||'Marketing operations platform',
      loginLogoUrl:(()=>{ const b=(this.state.platformSettings||{}).branding||{}; return b.loginLogo||b.companyLogo||''; })(),
      loginBackgroundUrl:((this.state.platformSettings||{}).branding||{}).loginBackground||'',
      email:this.state.email, password:this.state.password, loginError:this.state.loginError,
      onEmail:e=>this.setState({email:e.target.value}), onPassword:e=>this.setState({password:e.target.value}),
      doLogin:()=>this.doLogin(), goActivate:e=>{e&&e.preventDefault();this.setState({screen:'activate'});},
      oauthGoogle:e=>{e&&e.preventDefault();this._oauthLogin('google');},
      oauthMicrosoft:e=>{e&&e.preventDefault();this._oauthLogin('azure');},
      forgotPassword:e=>{e&&e.preventDefault();this._forgotPassword();},
      backToLogin:e=>{e&&e.preventDefault();this.setState({screen:'login'});},
      noop:e=>{e&&e.preventDefault();this.flash('Demo — connect your identity provider to enable.');},
      // activate
      activateEmail:this.state.activateEmail||'', activateRoleLabel:this.state.activateRoleLabel||'',
      activateIsRecovery:!!this.state.activateIsRecovery,
      newPass:this.state.newPass, confirmPass:this.state.confirmPass,
      onNewPass:e=>this.setState({newPass:e.target.value}), onConfirm:e=>this.setState({confirmPass:e.target.value}),
      toggleMfa:()=>this.setState({mfa:!this.state.mfa}),
      mfaBg:this.state.mfa?'var(--verify-500)':'var(--line-300)', mfaX:this.state.mfa?'21px':'3px',
      doActivate:()=>this.doActivate(),
      ...this.pwStrength(),
      // shell
      role, roleKey:rk, nav, adminNav, hasAdmin,
      platformName:((this.state.platformSettings||{}).general||{}).companyName||'BEETLOOP',
      platformSub:((this.state.platformSettings||{}).general||{}).tagline||'Marketing Platform',
      platformLogoUrl:(()=>{ const b=(this.state.platformSettings||{}).branding||{}; const dark=((this.state.platformSettings||{}).theme||{}).mode==='dark';
        return (dark&&b.darkLogo)||b.companyLogo||''; })(),
      campaignOptions:this.campaignOptionsFor((this.state.tkForm||{}).campaign,true),
      campaignOptionsNone:this.campaignOptionsFor((this.state.okrForm||{}).campaign,true),
      okrTitleOptions:this.okrTitleOptionsFor((this.state.epForm||{}).okr),
      okrParentOptions:this.okrTitleOptionsFor((this.state.okrForm||{}).parent),
      tkCampaignVal:this.campaignOpt((this.state.tkForm||{}).campaign),
      okrCampaignVal:this.campaignOpt((this.state.okrForm||{}).campaign),
      epOkrVal:this.okrTitleOpt((this.state.epForm||{}).okr),
      okrParentVal:(this.state.okrForm||{}).parent||'None (top level)',
      roleOptions:['admin','ceo','coo','secretary'].map(k=>({key:k,label:this.ROLES[k].label,sel:k===rk})),
      onRoleChange:e=>{ const k=e.target.value; const allowed = this.ACCESS[route]&&this.ACCESS[route][k]; this.setState({ roleKey:k, route: allowed?route:'dashboard' }); },
      notifications:(this.state.notifications||[]).map(n=>({ ...n,
        timeAgo:this._timeAgo(n.ts),
        avatarInitials:n.who?this._nameInitials(n.who):null,
        avatarColor:n.who?this._nameColor(n.who):null,
        go:()=>{ this.setState({ notifications:(this.state.notifications||[]).map(x=>x.id===n.id?{...x,read:true}:x) });
          supabase.from('notifications').update({ read:true }).eq('id', n.id).then(({error})=>{
            if(error) console.warn('[supabase] notification read failed:', error.message); });
          if(n.nav) this.setState({ ...n.nav, showNotifications:false }); } })),
      unreadCount:(this.state.notifications||[]).filter(n=>!n.read).length,
      showNotifications:this.state.showNotifications,
      toggleNotifications:()=>this.setState({ showNotifications:!this.state.showNotifications }),
      markAllNotificationsRead:()=>{
        this.setState({ notifications:(this.state.notifications||[]).map(n=>({...n, read:true})) });
        const uid=this.state.authUser?this.state.authUser.id:null;
        if(uid) supabase.from('notifications').update({ read:true }).eq('user_id', uid).eq('read', false).then(({error})=>{
          if(error) console.warn('[supabase] mark-all-read failed:', error.message);
        });
      },
      logout:()=>this.doLogout(),
      openProfile:()=>this.setState({ route:'profile' }),
      route, page, primaryAction,
      accessBg:tone.bg, accessBorder:tone.bg, accessColor:tone.color, accessIcon, accessLabel,
      // screen switches
      showDash, showQC, showAnalytics, showMastersHub, showMasterDetail, showOKR, showLeads, showMyKpi, showTable, showUsersTable, showTasks2, showTemplates, showFiles, showEffort, showIdeas, showContent, showProfile, showCampaigns, showMessages, showSop, showSupport, showConfig, showPageHead, readOnly, readOnlyMsg,
      toast:this.state.toast,
      // modals
      showUserModal:this.state.showUserModal,
      closeUserModal:()=>this.setState({showUserModal:false}), stop:e=>e.stopPropagation(),
      submitUser:()=>this.submitUser(),
      showRecordModal:this.state.showRecordModal, recordKind:this.state.recordKind, recordForm:this.state.recordForm,
      recordLabel:this._recordLabel(this.state.recordKind),
      closeRecordModal:()=>this.setState({ showRecordModal:false }),
      recordSetName:e=>this.setState({ recordForm:{...this.state.recordForm, name:e.target.value} }),
      recordSetType:e=>this.setState({ recordForm:{...this.state.recordForm, type:e.target.value} }),
      recordSetOwner:e=>this.setState({ recordForm:{...this.state.recordForm, owner:e.target.value} }),
      recordOwnerOptions:(this.state.users||[]).map(u=>u.name),
      recordSetStatus:e=>this.setState({ recordForm:{...this.state.recordForm, status:e.target.value} }),
      saveRecord:()=>this._saveRecord(),
      recordEditKey:this.state.recordEditKey, deleteRecord:()=>this.confirmDelete('Delete Record?', 'Are you sure you want to delete this record? This action cannot be undone.', ()=>this._deleteRecord()),
      uf:this.state.uf,
      ufFirst:e=>this.uf('first',e), ufLast:e=>this.uf('last',e), ufEmail:e=>this.uf('email',e), ufMobile:e=>this.uf('mobile',e),
      ufDept:e=>this.uf('dept',e), ufDesignation:e=>this.uf('designation',e), ufManager:e=>this.uf('manager',e), ufLead:e=>this.uf('lead',e), ufRole:e=>this.uf('role',e),
      ufManagerOptions:(this.state.users||[]).filter(u=>['manager','coo','ceo','admin'].includes(u.roleKey)).map(u=>u.name+' ('+u.role+')'),
      ufLeadOptions:(this.state.users||[]).filter(u=>u.roleKey==='team_lead').map(u=>u.name+' ('+(u.designation||u.role)+')'),
      ufRoleOptions:this.ROLE_LIST(),
      ufDeptOptions:this.liveDeptOptions(),
      ufShiftStart:e=>this.uf('shiftStart',e), ufShiftEnd:e=>this.uf('shiftEnd',e), ufBreak:e=>this.uf('breakMin',e), ufDays:e=>this.uf('days',e),
      ufBrandRows:this.BRAND_LIST().map(b=>{ const cur=(this.state.uf||{}).brands||[]; const on=cur.includes(b);
        return { label:b, on,
          style:'display:flex;align-items:center;gap:7px;padding:7px 11px;border-radius:999px;font-size:11.5px;font-weight:700;cursor:pointer;border:1px solid '+(on?'var(--verify-500)':'var(--line-300)')+';background:'+(on?'var(--verify-100)':'var(--paper)')+';color:'+(on?'var(--verify-600)':'var(--ink-700)'),
          toggle:()=>{ const f=this.state.uf||{}; const c=f.brands||[]; this.setState({ uf:{...f, brands: on?c.filter(x=>x!==b):[...c,b]} }); } }; }),
      ufCapNote:(()=>{ const f=this.state.uf||{}; const hm=(s)=>{ const p=String(s||'').split(':'); return (parseInt(p[0],10)||0)+((parseInt(p[1],10)||0)/60); };
        const gross=hm(f.shiftEnd||'18:00')-hm(f.shiftStart||'09:00');
        const daily=Math.max(0,Math.round((gross-((parseInt(f.breakMin,10)||60)/60))*100)/100);
        const weekly=Math.round(daily*(parseFloat(f.days)||5)*100)/100;
        return daily+' h/day · '+weekly+' h/week capacity'; })(),
      ...this.filePickerData(), ...this.filePreviewData(), ...this.uploadTrayData(),
      showRoleConfirm:this.state.showRoleConfirm,
      roleConfirmLabel:this.state.roleConfirmKey?this.ROLES[this.state.roleConfirmKey].label:'',
      roleConfirmSummary:this.state.roleConfirmKey?this.roleAccessSummary(this.state.roleConfirmKey):[],
      roleConfirmCancel:()=>this.cancelRoleAssignment(),
      roleConfirmOk:()=>this.confirmRoleAssignment(),
      showDeleteConfirm:this.state.showDeleteConfirm,
      deleteConfirmTitle:this.state.deleteConfirmTitle||'',
      deleteConfirmBody:this.state.deleteConfirmBody||'',
      deleteConfirmLabel:this.state.deleteConfirmLabel||'Delete',
      deleteConfirmCancel:()=>this.cancelDeleteConfirm(),
      deleteConfirmOk:()=>this.runDeleteConfirm(),
      showMasterRecordEdit:this.state.showMasterRecordEdit,
      mrCancel:()=>this.setState({ showMasterRecordEdit:false, mrKey:null, mrIndex:null, mrForm:{} }),
      mrSave:()=>this.submitMasterRecord(),
      mrCanDelete:this.state.mrIndex!=null&&this.hasPerm('masters','delete'),
      mrDelete:()=>this.confirmDelete('Delete Master Record?', 'Are you sure you want to delete this record? This action cannot be undone.', ()=>this.deleteMasterRecord()),
      ...(()=>{
        const mk = this.state.mrKey;
        const m = mk && this.MASTERS_REG()[mk];
        if(!m) return { mrTitle:'', mrFieldRows:[] };
        const form = this.state.mrForm||{};
        return {
          mrTitle: (this.state.mrIndex!=null?'Edit ':'Add ')+m.label+' entry',
          mrFieldRows: m.fields.map((f,i)=>{
            const rel = this.MASTER_FIELD_RELATIONS[mk] && this.MASTER_FIELD_RELATIONS[mk][f];
            const options = this.masterFieldOptions(mk, f);
            const isCode = i===0;
            if(rel && rel.multi){
              const selected=String(form[f]||'').split(',').map(s=>s.trim()).filter(Boolean);
              return { key:f, label:this.humanize(f), isMulti:true,
                multiChips:selected.map(name=>({ name,
                  remove:()=>this.setState({ mrForm:{...this.state.mrForm, [f]:selected.filter(x=>x!==name).join(', ')} }) })),
                multiAddVal:'',
                multiOptions:[{value:'',label:'+ Add '+this.humanize(f).toLowerCase().replace(/s$/,'')+'…'}].concat((options||[]).filter(o=>!selected.includes(o.value))),
                onMultiAdd:e=>{ const v=e.target.value; if(!v) return; this.setState({ mrForm:{...this.state.mrForm, [f]:[...selected,v].join(', ')} }); } };
            }
            return { key:f, label:this.humanize(f), value:form[f]!=null?form[f]:'', isSelect:!!options, options:options||[],
              readOnly:isCode, placeholder:isCode?'Assigned automatically on save':undefined,
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
      const seg=(on)=>'display:flex;align-items:center;gap:7px;padding:8px 15px;border:none;border-radius:9px;font-size:13px;font-weight:700;cursor:pointer;'+(on?'background:var(--paper);color:var(--ink-900);box-shadow:var(--shadow-sm)':'background:none;color:var(--ink-500)');
      Object.assign(out, {
        sopTabPlaybook:tab==='playbook', sopTabSops:tab==='sops',
        sopSegPb:seg(tab==='playbook'), sopSegSop:seg(tab==='sops'),
        sopGoPb:()=>this.setState({ sopTab:'playbook' }), sopGoSop:()=>this.setState({ sopTab:'sops' }) });
      if(tab==='sops') Object.assign(out, this.sopView(rk));
      if(tab==='playbook') Object.assign(out, this.playbookView(rk));
      page.canEdit = tab==='sops' && ['manager','team_lead','admin'].includes(rk);
    }
    if(showSupport) Object.assign(out, this.supportView(rk));
    if(showConfig) Object.assign(out, this.configView(rk));
    if(showDash) Object.assign(out, this.dashData(rk, role));
    if(showQC){ Object.assign(out, this.qcData(rk)); Object.assign(out, this.tkDetailData()); Object.assign(out, this.ideaDetailData()); }
    if(showIdeas) Object.assign(out, this.ideaDetailData());
    if(showIdeas||showQC) Object.assign(out, this.convertData());
    if(showAnalytics){ out.analyticsCards = this.analyticsData(role.bucket); Object.assign(out, this.dashboardsView(rk, role)); }
    if(showMastersHub) out.masterGroups = this.mastersData();
    if(showMasterDetail) Object.assign(out, this.masterDetailData());
    if(showOKR) Object.assign(out, this.okrView());
    if(showLeads){
      const leadCanEdit=this.hasPerm('leads','edit');
      const lt=this.state.leadsTab||'leads';
      const seg2=(on)=>'display:flex;align-items:center;gap:7px;padding:8px 15px;border:none;border-radius:9px;font-size:13px;font-weight:700;cursor:pointer;'+(on?'background:var(--paper);color:var(--ink-900);box-shadow:var(--shadow-sm)':'background:none;color:var(--ink-500)');
      Object.assign(out, { okrModLeads:lt==='leads', okrModPipe:lt==='pipe',
        okrSegLeadsStyle:seg2(lt==='leads'), okrSegPipeStyle:seg2(lt==='pipe'),
        okrGoLeads:()=>this.setState({ leadsTab:'leads' }), okrGoPipe:()=>this.setState({ leadsTab:'pipe' }),
        okrTabsVisible:true });
      Object.assign(out, this._leadColVisibility());
      if(lt==='leads') Object.assign(out, this.leadsView(leadCanEdit));
      if(lt==='pipe') Object.assign(out, this.pipelineView(leadCanEdit));
    }
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
      const seg=(on)=>'display:flex;align-items:center;gap:7px;padding:8px 15px;border:none;border-radius:9px;font-size:13px;font-weight:700;cursor:pointer;'+(on?'background:var(--paper);color:var(--ink-900);box-shadow:var(--shadow-sm)':'background:none;color:var(--ink-500)');
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

    // Floating chat widget is a global, always-mounted sibling (see
    // AppShell.jsx) so its vm must be present on every route, not just
    // when route==='messages'.
    Object.assign(out, this.chatWidgetView());

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
      pfAvatarUrl:match.avatar_url||'',
      pfHasAvatar:!!match.avatar_url,
      pfAvatarBusy:!!this.state.avatarBusy,
      pfUploadAvatar:(e)=>{ const f=e.target.files&&e.target.files[0]; e.target.value=''; if(f) this.setAvatarFile(f); },
      pfRemoveAvatar:()=>this.removeAvatar(),
      pfFields:fields.map(([k,v])=>({k,v})),
    };
  }
  // Resizes/compresses to a small JPEG before storing — keeps the profiles
  // row light since this is saved as a data: URL column, not Storage.
  _readAndResizeImage(file, maxDim, quality){
    return new Promise((resolve, reject)=>{
      const reader=new FileReader();
      reader.onerror=()=>reject(reader.error||new Error('Could not read file'));
      reader.onload=()=>{
        const img=new Image();
        img.onerror=()=>reject(new Error('Could not read that image'));
        img.onload=()=>{
          let { width, height } = img;
          if(width>height){ if(width>maxDim){ height=Math.round(height*maxDim/width); width=maxDim; } }
          else if(height>maxDim){ width=Math.round(width*maxDim/height); height=maxDim; }
          const canvas=document.createElement('canvas');
          canvas.width=width; canvas.height=height;
          canvas.getContext('2d').drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL('image/jpeg', quality));
        };
        img.src=reader.result;
      };
      reader.readAsDataURL(file);
    });
  }
  // targetId lets Admin upload/remove another user's photo from User
  // Management — omit it (or pass your own id) to act on your own profile.
  async setAvatarFile(file, targetId){
    if(!/^image\//.test(file.type)){ this.flash('Choose an image file.'); return; }
    this.setState({ avatarBusy:true });
    try{
      const dataUrl = await this._readAndResizeImage(file, 256, 0.85);
      const authP=this.state.authProfile||{};
      const id = targetId || authP.id;
      const isSelf = !targetId || targetId===authP.id;
      this.setState(s=>({ avatarBusy:false,
        authProfile: isSelf ? {...authP, avatar_url:dataUrl} : s.authProfile,
        users:(s.users||[]).map(u=>u.id===id?{...u, avatar_url:dataUrl}:u) }));
      this.flash('Profile photo updated.');
      if(id){
        supabase.from('profiles').update({ avatar_url:dataUrl }).eq('id', id).then(({error})=>{
          if(error) console.warn('[supabase] avatar upload failed:', error.message);
        });
      }
    }catch(err){
      this.setState({ avatarBusy:false });
      this.flash('Could not process that image — try a different file.');
    }
  }
  removeAvatar(targetId){
    const authP=this.state.authProfile||{};
    const id = targetId || authP.id;
    const isSelf = !targetId || targetId===authP.id;
    this.setState(s=>({
      authProfile: isSelf ? {...authP, avatar_url:''} : s.authProfile,
      users:(s.users||[]).map(u=>u.id===id?{...u, avatar_url:''}:u) }));
    this.flash('Profile photo removed.');
    if(id){
      supabase.from('profiles').update({ avatar_url:null }).eq('id', id).then(({error})=>{
        if(error) console.warn('[supabase] avatar remove failed:', error.message);
      });
    }
  }
  dashData(rk, role){
    const b = role.bucket;
    const K = (label,value,delta,tone,icon)=>({label,value,delta,icon,
      iconBg:{ok:'var(--verify-100)',warn:'var(--warn-100)',info:'var(--info-100)',brand:'var(--orchid-100)'}[tone],
      iconColor:{ok:'var(--verify-600)',warn:'var(--warn-600)',info:'var(--info-600)',brand:'var(--orchid-600)'}[tone],
      deltaColor: delta.startsWith('-')?'var(--danger-600)':'var(--verify-600)',
      deltaIcon: delta.startsWith('-')?'trending-down':'trending-up' });
    // Real, DB-derived counts shared by every role tile below — replaces
    // what used to be literal string constants that never changed no
    // matter what was actually in the database (same class of bug fixed
    // on the Admin dashboard).
    const allT=this.allTasks(), allC=this.allCampaigns(), allO=this.OKR_DATA();
    const notDone=t=>!['Approved','Closed'].includes(t.status);
    const isOverdue=t=>{ const d=this.dayDiff(t); return d!==null && d<0 && notDone(t); };
    const activeCampaigns=allC.filter(c=>!['Completed','Archived','Cancelled'].includes(c.status)).length;
    const overdueTasks=allT.filter(isOverdue).length;
    const approvedTasks=allT.filter(t=>t.status==='Approved').length;
    const onTimePct=allT.length?Math.round((allT.length-overdueTasks)/allT.length*100):100;
    const avgOkrProgress=allO.length?Math.round(allO.reduce((s,o)=>s+this.okrProgress(o),0)/allO.length):0;
    const reworkOpen=allT.filter(t=>t.status==='Rework').length;
    const person=this.currentPerson();
    const myTasks=allT.filter(t=>t.assignee===person);
    const myOpen=myTasks.filter(notDone);
    const myDueToday=myOpen.filter(t=>this.dayDiff(t)===0).length;
    const myDueWeek=myOpen.filter(t=>{ const d=this.dayDiff(t); return d!==null&&d>=0&&d<=7; }).length;
    const myApproved=myTasks.filter(t=>t.status==='Approved').length;
    const teamTasks=allT.filter(t=>t.reviewer===person);
    const teamAwaitingQc=teamTasks.filter(t=>t.status==='Submitted').length;
    const teamOnTimePct=teamTasks.length?Math.round((teamTasks.length-teamTasks.filter(isOverdue).length)/teamTasks.length*100):100;
    const submitted=allT.filter(t=>t.status==='Submitted').length;
    const reworked=allT.filter(t=>(t.reworkCount||0)>0).length;
    const rejectionPct=(approvedTasks+reworked)?Math.round(reworked/(approvedTasks+reworked)*100):0;
    const KPI = {
      exec:[K('Active campaigns',String(activeCampaigns),'','ok','megaphone'),K('OKR progress (avg)',avgOkrProgress+'%','','info','target'),K('On-time delivery',onTimePct+'%','','ok','check-circle-2'),K('Open tickets',String(this.allTickets().filter(t=>!['Resolved','Closed'].includes(t.status)).length),'','brand','life-buoy')],
      ops:[K('Overdue tasks',String(overdueTasks),'',overdueTasks?'warn':'ok','alarm-clock'),K('Active campaigns',String(activeCampaigns),'','brand','megaphone'),K('Rework queue',String(reworkOpen),'',reworkOpen?'warn':'ok','rotate-ccw'),K('On-time delivery',onTimePct+'%','','ok','gauge')],
      manager:[K('Active campaigns',String(activeCampaigns),'','info','folder-kanban'),K('Campaigns live',String(allC.filter(c=>c.status==='Live'||c.status==='Active').length),'','brand','megaphone'),K('OKR progress (avg)',avgOkrProgress+'%','','ok','target'),K('Team members',String(this.state.users.length),'','info','users')],
      lead:[K('Team tasks',String(teamTasks.length),'','info','list-checks'),K('Awaiting QC',String(teamAwaitingQc),'',teamAwaitingQc?'warn':'ok','shield-check'),K('Team on-time',teamOnTimePct+'%','','ok','check-circle-2'),K('Rework queue',String(reworkOpen),'',reworkOpen?'warn':'ok','gauge')],
      senior:[K('My open tasks',String(myOpen.length),'','info','list-checks'),K('Due this week',String(myDueWeek),'',myDueWeek?'warn':'ok','calendar-clock'),K('Approved',String(myApproved),'','ok','check-circle-2'),K('My tasks (total)',String(myTasks.length),'','info','target')],
      junior:[K('My tasks',String(myOpen.length),'','info','list-checks'),K('Due today',String(myDueToday),'',myDueToday?'warn':'ok','calendar-clock'),K('Completed',String(myApproved),'','ok','check-circle-2'),K('My tasks (total)',String(myTasks.length),'','brand','list-checks')],
      qc:[K('Awaiting review',String(submitted),'',submitted?'warn':'ok','clock'),K('Approved (total)',String(approvedTasks),'','ok','check-circle-2'),K('Rework raised',String(reworked),'',reworked?'warn':'ok','rotate-ccw'),K('Rejection rate',rejectionPct+'%','','ok','x-circle')],
      admin:(()=>{ const mastersTotal=Object.entries(this.MASTERS_REG()).filter(([k])=>k!=='_st').reduce((s,[,m])=>s+(m.rows?m.rows.length:0),0);
        const openTickets=this.allTickets().filter(t=>!['Resolved','Closed'].includes(t.status)).length;
        return [K('Total users',String(this.state.users.length),'','info','users'),
          K('Active sessions',String(Object.keys(this.state.onlineUsers||{}).length),'','brand','activity'),
          K('Masters',String(mastersTotal),'','info','boxes'),
          K('Open tickets',String(openTickets),'','warn','life-buoy')]; })(),
      dm:(()=>{ const c=this.allContacts(); const today=this.todayStr();
        return [K('Campaigns tracked','9','+1','brand','megaphone'),
          K('Leads today',String(this.allLeads().filter(l=>l.date===today).reduce((s,l)=>s+(parseInt(l.count,10)||0),0)),'','info','users'),
          K('Pipeline total',String(c.length),'','brand','filter'),
          K('Won this month',String(c.filter(x=>x.stage==='Won').length),'','ok','check-circle-2')]; })(),
      sales:(()=>{ const brands=this.mySalesBrands(); const c=this.allContacts(); const today=this.todayStr();
        return [K('Leads today',String(this.allLeads().filter(l=>l.date===today).reduce((s,l)=>s+(parseInt(l.count,10)||0),0)),'','info','users'),
          K('My pipeline',String(c.length),'','brand','filter'),
          K('Won this month',String(c.filter(x=>x.stage==='Won').length),'','ok','check-circle-2'),
          K(brands.length===1?'My brand':'My brands',brands.join(', ')||'—','','info','tag')]; })(),
    };
    const rowsMap = {
      exec:[['CEO strategy review','Q3 board deck · Leadership','On track','ok','target'],['Food Research Lab retainer','Renewal · ₹18L','Won','ok','folder-kanban'],['Nutraceutical vertical launch','Cross-department','At risk','warn','alert-triangle'],['Pubrica SEO program','12-month · SEO','On track','ok','search']],
      manager:[['On-page SEO — Tutors India','Aditi Rao · due Fri','In progress','info','search'],['Content calendar — Pepcreations','Karan Shah · due Mon','Review','warn','file-text'],['Reel series — Statswork','Design team','In progress','info','clapperboard'],['Backlink outreach — Pubrica','SEO team','Planned','info','link']],
      lead:[['Keyword research — Tech vertical','Sameer Iyer','In progress','info','search'],['Broken link fixes — Pubrica','Neha Verma','Awaiting QC','warn','link'],['On-page — Statswork','Sameer Iyer','In progress','info','file-text'],['Local SEO — Food Research Lab','Neha Verma','Planned','info','map-pin']],
      senior:[['Keyword research — Tech vertical','Client A · due Jan 20','In progress','info','search'],['SEO audit — E-commerce','Client C · due Jan 18','Review','warn','file-check'],['On-page — Statswork','Client B','In progress','info','file-text']],
      junior:[['Update meta descriptions — 12 pages','Due today','In progress','warn','file-text'],['Fix broken links — Pubrica','Due Jan 22','Assigned','info','link'],['Add alt text — blog images','Due Jan 24','Assigned','info','image']],
      admin:(()=>{ const recent=(this.state.notifications||[]).slice(0,4);
        return recent.length ? recent.map(n=>[n.text, n.who?('by '+n.who):this._timeAgo(n.ts), n.read?'Read':'New', n.read?'info':'warn', 'bell'])
          : [['No system activity yet','Real events will appear here as they happen','—','info','bell']]; })(),
      dm:[['Q3 SEO push — Pubrica','Live campaign','On track','ok','megaphone'],['Reel series — Statswork','Design team','In progress','info','clapperboard'],['Content calendar — Pepcreations','Karan Shah · due Mon','Review','warn','file-text']],
      sales:[['New enquiries today','Lead Pipeline','Action','warn','users'],['Follow up — SQL stage','Your pipeline','In progress','info','filter'],['Won this week','Your pipeline','Won','ok','check-circle-2']],
    };
    const rowsKey = ({ops:'exec',qc:'lead'})[b] || b;
    const rows = (rowsMap[rowsKey]||rowsMap.manager).map(r=>({
      title:r[0], sub:r[1], tag:r[2], icon:r[4],
      iconBg:'var(--surface-50)', iconColor:'var(--orchid-600)',
      tagBg:{ok:'var(--verify-100)',warn:'var(--warn-100)',info:'var(--info-100)'}[r[3]],
      tagColor:{ok:'var(--verify-600)',warn:'var(--warn-600)',info:'var(--info-600)'}[r[3]],
    }));
    const panelTitle = {exec:'Strategic initiatives',ops:'Delivery pipeline',manager:'Department work',lead:'Team tasks',senior:'My tasks',junior:'My tasks today',qc:'Recent reviews',admin:'System activity',dm:'Marketing activity',sales:'Lead pipeline activity'}[b];

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
      dm:{eyebrow:'Marketing scope',big:'Digital Marketing',sub:'View across campaigns',note:'You view campaigns, content and your own tasks. Lead contact details (phone/email) are restricted — only stage and volume are visible.'},
      sales:{eyebrow:'Personal scope',big:this.mySalesBrands().join(', ')||'No brand assigned',sub:'Assigned brand(s) only',note:'You create and manage leads and pipeline contacts for your assigned brand(s) only — set by Admin in User Management. Other brands are hidden.'},
    };
    const scopeBox = scopeMap[b];
    const modsFor = ['dashboard','campaigns','tasks','qc','analytics','support','masters'];
    const accessSummary = modsFor.map(m=>{
      const l = (this.ACCESS[m]&&this.ACCESS[m][rk]) || 'No access';
      const t = l==='No access' ? {bg:'var(--danger-100)',color:'var(--danger-600)'} : this.levelTone(l);
      return { mod:(this.MODMETA[m]&&this.MODMETA[m].label)||m, level:l, bg:t.bg, color:t.color };
    });

    // "Needs attention" tiles — computed live from Tasks/OKRs/SOPs/Support.
    const X=(label,value,sub,color)=>({label,value,sub,color});
    const tasks=this.allTasks(), me=this.currentPerson();
    const mineT=tasks.filter(t=>t.assignee===me);
    const overdue=(list)=>list.filter(t=>{ const d=this.dayDiff(t); return d!==null&&d<0&&!['Approved','Closed'].includes(t.status); }).length;
    const okrs=this.allOkrs();
    const atRisk=okrs.filter(o=>this.okrHealth(o).label!=='On Track'&&o.status!=='Completed').length;
    const sops=this.allSops();
    const sopOverdue=sops.filter(s=>this.sopReviewState(s).overdue).length;
    const sopUnack=sops.filter(s=>s.status==='Published'&&!(s.ack||[]).includes(me)).length;
    const tickets=this.allTickets();
    const tOpen=tickets.filter(t=>!['Resolved','Closed'].includes(t.status)).length;
    const tUnassigned=tickets.filter(t=>!t.assignee&&!['Resolved','Closed'].includes(t.status)).length;
    const inQC=tasks.filter(t=>t.status==='Submitted').length;
    const rework=tasks.filter(t=>t.status==='Rework').length;
    const overCap=(this.state.users||[]).filter(u=>{ const wk=this.weeklyCapacity(u.name)||40;
      const open=tasks.filter(t=>t.assignee===u.name&&!['Approved','Closed'].includes(t.status));
      return open.reduce((s,t)=>s+(parseFloat(t.estH)||0),0)>wk; }).length;
    // manager/team_lead see only their own department's slice of every number above
    const myDivision=this.myScopeDivision();
    const dTasks=this.scopedTasks(rk), dOkrs=this.scopedOkrs(rk), dSops=this.scopedSops(rk);
    const dInQC=dTasks.filter(t=>t.status==='Submitted').length;
    const dRework=dTasks.filter(t=>t.status==='Rework').length;
    const dAtRisk=dOkrs.filter(o=>this.okrHealth(o).label!=='On Track'&&o.status!=='Completed').length;
    const dSopOverdue=dSops.filter(s=>this.sopReviewState(s).overdue).length;
    const dOverCap=(this.state.users||[]).filter(u=>{ if(myDivision && u.dept!==myDivision) return false;
      const wk=this.weeklyCapacity(u.name)||40;
      const open=dTasks.filter(t=>t.assignee===u.name&&!['Approved','Closed'].includes(t.status));
      return open.reduce((s,t)=>s+(parseFloat(t.estH)||0),0)>wk; }).length;
    // Manager oversees the whole delivery org in this company's structure
    // (matches the existing SOP-visibility rule), so its numbers stay
    // company-wide — only Team Lead's are actually department-scoped, and
    // only Team Lead's tiles get the "— division" note.
    const leadScopeNote=myDivision?(' — '+myDivision):'';
    const EXTRA={
      exec:[X('OKRs at risk',String(atRisk),'need leadership attention',atRisk?'var(--danger-600)':'var(--verify-600)'),
        X('Avg OKR progress',(okrs.length?Math.round(okrs.reduce((s,o)=>s+o.progress,0)/okrs.length):0)+'%','across '+okrs.length+' objectives','var(--ink-900)'),
        X('Awaiting QC',String(inQC),'deliverables in review','var(--info-600)'),
        X('Overdue tasks',String(overdue(tasks)),'past due date',overdue(tasks)?'var(--danger-600)':'var(--verify-600)')],
      ops:[X('Over capacity',String(overCap),'people beyond shift hours',overCap?'var(--danger-600)':'var(--verify-600)'),
        X('Rework queue',String(rework),'sent back by QC',rework?'var(--warn-600)':'var(--verify-600)'),
        X('Open tickets',String(tOpen),tUnassigned+' unassigned','var(--info-600)'),
        X('Overdue tasks',String(overdue(tasks)),'past due date',overdue(tasks)?'var(--danger-600)':'var(--verify-600)')],
      manager:[X('Awaiting QC',String(dInQC),'in the review queue','var(--info-600)'),
        X('Rework',String(dRework),'needs correction',dRework?'var(--warn-600)':'var(--verify-600)'),
        X('OKRs at risk',String(dAtRisk),'in your scope',dAtRisk?'var(--danger-600)':'var(--verify-600)'),
        X('SOPs overdue review',String(dSopOverdue),'governance debt',dSopOverdue?'var(--danger-600)':'var(--verify-600)')],
      lead:[X('Awaiting QC',String(dInQC),'from your team'+leadScopeNote,'var(--info-600)'),
        X('Rework',String(dRework),'to reassign'+leadScopeNote,dRework?'var(--warn-600)':'var(--verify-600)'),
        X('Overdue in team',String(overdue(dTasks)),'past due date'+leadScopeNote,overdue(dTasks)?'var(--danger-600)':'var(--verify-600)'),
        X('Over capacity',String(dOverCap),'people to rebalance'+leadScopeNote,dOverCap?'var(--warn-600)':'var(--verify-600)')],
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
      dm:[X('My overdue',String(overdue(mineT)),'clear these first',overdue(mineT)?'var(--danger-600)':'var(--verify-600)'),
        X('In QC',String(mineT.filter(t=>t.status==='Submitted').length),'awaiting review','var(--info-600)'),
        X('SOPs to acknowledge',String(sopUnack),'read and sign off',sopUnack?'var(--warn-600)':'var(--verify-600)')],
      sales:[X('My overdue',String(overdue(mineT)),'clear these first',overdue(mineT)?'var(--danger-600)':'var(--verify-600)'),
        X('SOPs to acknowledge',String(sopUnack),'read and sign off',sopUnack?'var(--warn-600)':'var(--verify-600)')],
    };

    // Lead pipeline snapshot on the dashboard, computed from real lead/contact records.
    // Widgets resolve against the same ACCESS map the modules use, so no panel
    // renders beyond the role's granted level — no new configuration screen.
    const lvlOf=(mod)=>((this.ACCESS[mod]||{})[rk])||'No access';
    const granted=(mod)=>String(lvlOf(mod)).toLowerCase()!=='no access';
    const leadRoles=['admin','manager','ceo','coo','team_lead','senior','junior','dm','sales'];
    let leadPanel={ dashHasLeads:false };
    if(leadRoles.includes(rk) && granted('okr')){
      const contacts=this.allContacts();
      const leads=this.allLeads();
      const today=this.todayStr();
      const cnt=(s)=>contacts.filter(c=>c.stage===s).length;
      const mqlN=contacts.filter(c=>['MQL','SQL','Opportunity','Won'].includes(c.stage)).length;
      const sqlN=contacts.filter(c=>['SQL','Opportunity','Won'].includes(c.stage)).length;
      const wonN=cnt('Won');
      const totalN=contacts.length;
      const todayCount=leads.filter(l=>l.date===today).reduce((s,l)=>s+(parseInt(l.count,10)||0),0);
      const leadTarget=parseInt(this.state.ldTarget||'10',10);
      const pipeValue=contacts.filter(c=>['SQL','Opportunity'].includes(c.stage)).reduce((s,c)=>s+this.cmpNum(c.value),0);
      const stages=[
        ['All enquiries',totalN,'var(--ink-400)'],
        ['MQL',mqlN,'var(--info-500)'],
        ['SQL',sqlN,'var(--orchid-500)'],
        ['Opportunity',cnt('Opportunity')+wonN,'var(--warn-500)'],
        ['Won',wonN,'var(--verify-500)'],
      ];
      const svc={}; contacts.forEach(c=>{ svc[c.service]=(svc[c.service]||0)+1; });
      const topSvc=Object.entries(svc).sort((a,b2)=>b2[1]-a[1]).slice(0,3);
      leadPanel={
        dashHasLeads:true,
        dashLeadToday:String(todayCount),
        dashLeadTargetNote:todayCount>=leadTarget?('Daily target of '+leadTarget+' met'):(todayCount+' of '+leadTarget+' logged today · '+(leadTarget-todayCount)+' to go'),
        dashLeadTargetColor:todayCount>=leadTarget?'var(--verify-600)':'var(--warn-600)',
        dashLeadW:Math.min(100,Math.round(todayCount/(leadTarget||1)*100))+'%',
        dashLeadBar:todayCount>=leadTarget?'var(--verify-500)':'var(--warn-500)',
        dashLeadStages:stages.map(s=>({ label:s[0], value:String(s[1]), color:s[2],
          w:totalN?Math.max(4,Math.round(s[1]/totalN*100))+'%':'0%',
          rate:s[0]==='MQL'?(totalN?Math.round(mqlN/totalN*100)+'% of all enquiries':'—')
            :s[0]==='SQL'?(mqlN?Math.round(sqlN/mqlN*100)+'% of MQLs':'—')
            :s[0]==='Opportunity'?(sqlN?Math.round((cnt('Opportunity')+wonN)/sqlN*100)+'% of SQLs':'—')
            :s[0]==='Won'?(sqlN?Math.round(wonN/sqlN*100)+'% of SQLs':'—')
            :(totalN?'captured':'—') })),
        dashLeadValue:'₹'+Math.round(pipeValue/1000)+'K',
        dashLeadValueNote:'open pipeline · SQL + Opportunity',
        dashLeadTopSvc:topSvc.map(x=>({ label:x[0], n:x[1]+' lead'+(x[1]===1?'':'s') })),
        dashLeadOpen:()=>this.setState({ route:'leads', leadsTab:'pipe' }),
        dashLeadOpenDaily:()=>this.setState({ route:'leads', leadsTab:'leads' }),
      };
    }
    // Per-user widget visibility — Admin picks which Dashboard blocks a
    // specific person sees (User Management -> edit user -> Dashboard
    // widgets). Stored as the HIDDEN keys, so every account defaults to
    // "everything visible" until Admin actually restricts one.
    const hiddenWidgets=new Set((this.state.authProfile&&this.state.authProfile.dashboard_widgets)||[]);
    return { kpis:hiddenWidgets.has('kpis')?[]:(KPI[b]||KPI.manager),
      dashExtras:hiddenWidgets.has('needsAttention')?[]:(EXTRA[b]||EXTRA.manager),
      dashShowKpis:!hiddenWidgets.has('kpis'), dashShowNeedsAttention:!hiddenWidgets.has('needsAttention'),
      dashShowActivity:!hiddenWidgets.has('activity'), dashShowScope:!hiddenWidgets.has('scope'),
      dashShowAccessSummary:!hiddenWidgets.has('accessSummary'),
      dashCanAnalytics:granted('analytics'), dashCanOkr:granted('okr'),
      dashAccessLine:scopeBox.eyebrow+' · Dashboard '+lvlOf('dashboard')+' · Analytics '+lvlOf('analytics')+' · Tasks '+lvlOf('tasks'),
      dashExtrasLabel:'Needs attention · '+role.label+' scope',
      dashRows:hiddenWidgets.has('activity')?[]:rows, dashPanelTitle:panelTitle, scopeBox, accessSummary,
      ...leadPanel, dashHasLeads: leadPanel.dashHasLeads && !hiddenWidgets.has('leadPipeline') };
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
      contentType:t.contentType||'', hasContentType:!!t.contentType,
      module:'Task', moduleBg:'var(--info-100)', moduleColor:'var(--info-600)',
      priority:t.priority, priDot:pri(t.priority), assignee:t.assignee, dates:t.start+' → '+t.end, dueAlert:this.tkDueAlert(t),
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
            ?'border:none;background:#7A1C46;color:#fff':'border:1px solid var(--line-300);background:var(--paper);color:var(--ink-700)') }; })(),
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
      priority:i.priority, priDot:{Critical:'var(--danger-500)',High:'var(--warn-500)',Medium:'var(--verify-500)',Low:'var(--info-500)'}[i.priority]||'var(--ink-400)',
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
        style:'display:flex;align-items:center;gap:6px;padding:6px 12px;border-radius:999px;font-size:12px;font-weight:700;cursor:pointer;border:1px solid '+(active?'var(--beet-700)':(d==='Overdue'&&n>0?'#F1C9CF':'var(--line-300)'))+';background:'+(active?'var(--beet-700)':'var(--paper)')+';color:'+(active?'#fff':(d==='Overdue'&&n>0?'var(--danger-600)':'var(--ink-700)')),
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
      style:'padding:6px 13px;border-radius:999px;font-size:12px;font-weight:700;cursor:pointer;border:1px solid '+(active?'var(--beet-700)':'var(--line-300)')+';background:'+(active?'var(--beet-700)':'var(--paper)')+';color:'+(active?'#fff':'var(--ink-700)'),
      set:()=>this.setState({ qcPeriod:p }) }; });
    const cs=this.complianceStats(list);
    return { kpis, qcRows:pg.rows, qcPg:pg, qcCanAct:canAct, qcDayChips, qcWeek, qcPeriodBtns, qcPeriodLabel:'Task analytics — all users · '+period.toLowerCase()+' report',
      qcCompliance:[
        { label:'Self-assessment pass', value:cs.selfPct+'%', sub:cs.meets+' of '+cs.scored+' checks meet gold standard', color:cs.selfPct>=80?'var(--verify-600)':cs.selfPct>=50?'var(--warn-600)':'var(--danger-600)' },
        { label:'QC first-pass', value:cs.firstPassPct+'%', sub:cs.compliant+' compliant of '+cs.reviewed+' reviewed', color:cs.firstPassPct>=80?'var(--verify-600)':'var(--warn-600)' },
        { label:'Rework rate', value:cs.reworkPct+'%', sub:cs.rework+' lines sent back', color:cs.reworkPct<=10?'var(--verify-600)':'var(--danger-600)' },
        { label:'Conditional accepts', value:String(cs.conditional), sub:'passed with caveats', color:'var(--warn-600)' },
        { label:'Evidence attached', value:cs.evidencePct+'%', sub:cs.evidence+' of '+cs.scored+' scored checks', color:cs.evidencePct>=90?'var(--verify-600)':'var(--warn-600)' },
        { label:'Checklists submitted', value:String(cs.submitted), sub:'of '+list.length+' tasks in queue', color:'var(--ink-900)' },
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
  hrsOf(t){
    const base=parseFloat(t.actH)||0;
    const tm=this.timerOf(t.id);
    if(tm.running && tm.startedAt) return Math.round((base+(Date.now()-tm.startedAt)/3600000)*100)/100;
    return base;
  }
  dashboardsView(rk, role){
    const b=role.bucket;
    const may={ exec:['exec','capacity','dept','team'], ops:['exec','capacity','dept','team'], admin:['exec','capacity','dept','team'],
      manager:['dept','team','capacity'], lead:['team'], senior:[], junior:[], qc:[] }[b]||[];
    if(!may.length) return { dbHasBoards:false };
    const cur=may.includes(this.state.dbTab)?this.state.dbTab:may[0];
    const META={ exec:{label:'Executive',icon:'crown'}, capacity:{label:'Resource & Capacity',icon:'users'}, dept:{label:'Department',icon:'building-2'}, team:{label:'Team',icon:'user-check'} };
    const seg=(on)=>'display:flex;align-items:center;gap:7px;padding:8px 15px;border:none;border-radius:9px;font-size:13px;font-weight:700;cursor:pointer;'+(on?'background:var(--paper);color:var(--ink-900);box-shadow:var(--shadow-sm)':'background:none;color:var(--ink-500)');
    // Team Lead only ever sees their own division's slice here — Resource &
    // Capacity, Department and Team dashboards all derive from this same
    // scoped list, so a Team Lead can't browse other divisions' people,
    // tasks or OKRs through this screen. Manager oversees the whole
    // delivery org in this company's structure, same as the SOP rule.
    const tasks=this.scopedTasks(rk), okrs=this.scopedOkrs(rk), camps=this.allCampaigns(), plans2=this.allEpPlans();
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
      dbExecKpis:[KP('Avg OKR progress',avgOkr+'%','across '+okrs.length+' objectives','var(--ink-900)'),
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
      dbCapKpis:[KP('People tracked',String(people.length),'with assigned work','var(--ink-900)'),
        KP('Overloaded',String(capRows.filter(r=>parseInt(r.util)>100).length),'assigned beyond shift capacity','var(--danger-600)'),
        KP('Underloaded',String(capRows.filter(r=>parseInt(r.util)<40).length),'below 40% of capacity','var(--info-600)'),
        KP('Open workload',String(open),'tasks in flight','var(--info-600)'),
        KP('Rework load',String(rework),'tasks sent back','var(--orchid-600)')],
      dbCapRows:capRows,
      dbDeptRows:deptRows,
      dbDeptKpis:[KP('Departments',String(divs.length),'delivering work','var(--ink-900)'),
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
      dbTeamKpis:[KP('Team members',String(teamPeople.length),'with tasks in range','var(--ink-900)'),
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
  // Thin wrappers around the generic Master Record editor/delete for the
  // Content Repository sidebar's own custom categories — same underlying
  // contentCategory master Master Data already manages, just reachable
  // without leaving the Content Repository screen.
  editContentCategory(key){
    const idx=this.MASTERS_REG().contentCategory.rows.findIndex(r=>r.Category_Code===key);
    if(idx<0) return;
    this.openMasterRecordEdit('contentCategory', idx);
  }
  deleteContentCategory(key){
    if(!this.hasPerm('masters','delete')){ this.flash('You do not have permission to delete master records.'); return; }
    const idx=this.MASTERS_REG().contentCategory.rows.findIndex(r=>r.Category_Code===key);
    if(idx<0) return;
    const row=this.MASTERS_REG().contentCategory.rows[idx];
    this.confirmDelete('Delete Content Category?', 'Are you sure you want to delete "'+row.Category_Name+'"? Pages already in this category are not deleted, but it will no longer appear as a repository option. This action cannot be undone.', ()=>{
      this.setState({ mrKey:'contentCategory', mrIndex:idx }, ()=>this.deleteMasterRecord());
    });
  }
  submitMasterRecord(){
    const { mrKey, mrIndex, mrForm } = this.state;
    if(!this.hasPerm('masters', mrIndex!=null?'edit':'create')){ this.flash('You do not have permission to '+(mrIndex!=null?'edit':'create')+' master records.'); return; }
    if(mrKey==='user'){ this._submitUserMasterRow(mrIndex, mrForm); return; }
    const m = this.MASTERS_REG()[mrKey];
    if(!m) return;
    const idField = m.fields[0];
    const labelField = m.fields[1]||idField;
    if(!String(mrForm[labelField]||'').trim()){ this.flash('Enter a value for '+this.humanize(labelField)+' to save.'); return; }
    const row = { ...mrForm };
    if(!String(row[idField]||'').trim()){
      // Derived from the highest number ever issued for this prefix — not
      // just the current row count — so deleting a record can never free up
      // a number that collides with one still in use (same pattern as OKR/
      // task/effort-plan code generation elsewhere in this file).
      const prefix=m.label.replace(/[^A-Z]/g,'').slice(0,3).padEnd(3,'X');
      const everIssued=m.rows.map(r=>String(r[idField]||'')).concat((this.state.masterDeleted||{})[mrKey]||[]);
      const nums=everIssued.filter(id=>id.indexOf(prefix)===0).map(id=>parseInt(id.slice(prefix.length),10)||0);
      row[idField] = prefix+String(Math.max(0,...nums)+1).padStart(3,'0');
    }
    const rowId=String(row[idField]);
    const added={...(this.state.masterAdded||{})};
    added[mrKey]={...(added[mrKey]||{}), [rowId]:row};
    this.setState({ masterAdded:added, showMasterRecordEdit:false, mrKey:null, mrIndex:null, mrForm:{} });
    this.flash((mrIndex!=null?'Updated ':'Added ')+m.label+' entry: '+row[labelField]+'.');
    supabase.from('master_records').upsert({
      id:mrKey+':'+rowId, master_key:mrKey, payload:row,
      created_by:this.state.authUser?this.state.authUser.id:null,
    }).then(({error})=>{
      if(error) console.warn('[supabase] master record upsert failed:', error.message);
    });
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
    if(!this.hasPerm('masters','delete')){ this.flash('You do not have permission to delete master records.'); return; }
    const { mrKey, mrIndex } = this.state;
    if(mrKey==='user'){ this._deleteUserMasterRow(mrIndex); return; }
    const m = this.MASTERS_REG()[mrKey];
    if(!m || mrIndex==null) return;
    const idField = m.fields[0];
    const labelField = m.fields[1]||idField;
    const row = m.rows[mrIndex];
    const removedLabel = row ? row[labelField] : '';
    const rowId = row ? String(row[idField]) : null;
    const del={...(this.state.masterDeleted||{})};
    if(rowId) del[mrKey]=[...(del[mrKey]||[]), rowId];
    this.setState({ masterDeleted:del, showMasterRecordEdit:false, mrKey:null, mrIndex:null, mrForm:{}, masterRecord:null });
    this.flash('Deleted '+m.label+' entry: '+removedLabel+'.');
    // upsert (not delete) — a record still only in the hardcoded seed has no
    // row yet, so this is what makes the deletion stick past reload instead
    // of the seed entry silently reappearing.
    if(rowId){
      supabase.from('master_records').upsert({
        id:mrKey+':'+rowId, master_key:mrKey, payload:row||{}, deleted:true,
        created_by:this.state.authUser?this.state.authUser.id:null,
      }).then(({error})=>{
        if(error) console.warn('[supabase] master record delete failed:', error.message);
      });
    }
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

  // ============ QC Checklist Master — bespoke UI ============
  // Every other master goes through the generic field-grid modal
  // (openMasterRecordEdit/EditMasterRecordModal), which has no concept of
  // a nested array of structured sub-rows. QC Checklist's Items (each with
  // its own text/type/required) needs that, so this master gets its own
  // inline list+detail flow instead — same underlying masterAdded/
  // masterDeleted overlay + master_records table every other master uses,
  // just a bespoke view and its own save/delete that know about Items.
  // Rows saved before this master's Items became a structured array (the
  // old shape had a hand-typed count number here instead) would otherwise
  // crash every .map/.length call below — coerce anything non-array to [].
  qcmItemsArray(x){ return Array.isArray(x) ? x : []; }
  qcmCampaignTypeTone(t){
    return { 'SEO Campaign':{bg:'var(--info-100)',color:'var(--info-600)'}, 'Content Campaign':{bg:'var(--orchid-100)',color:'var(--orchid-700)'},
      'SMM Campaign':{bg:'#F0E6F6',color:'#7A3FA0'}, 'Website Campaign':{bg:'var(--verify-100)',color:'var(--verify-600)'},
      'Email Campaign':{bg:'var(--warn-100)',color:'#8A5A00'}, 'Analytics Campaign':{bg:'var(--danger-100, #F7E3E6)',color:'var(--danger-600)'} }[t]
      || {bg:'var(--surface-50)',color:'var(--ink-500)'};
  }
  qcmOpenNew(){
    if(!this.hasPerm('masters','create')){ this.flash('You do not have permission to create master records.'); return; }
    this.setState({ qcmOpen:true, qcmEditCode:null, qcmForm:{ Checklist:'', Campaign_Type:'', Status:'Active', Items:[] } });
  }
  qcmOpenEdit(code){
    if(!this.hasPerm('masters','edit')){ this.flash('You do not have permission to edit master records.'); return; }
    const row=this.MASTERS_REG().qcChecklist.rows.find(r=>r.QC_Code===code);
    if(!row) return;
    this.setState({ qcmOpen:true, qcmEditCode:code, qcmForm:{ Checklist:row.Checklist, Campaign_Type:row.Campaign_Type||'', Status:row.Status||'Active', Items:this.qcmItemsArray(row.Items).map(it=>({...it})) } });
  }
  qcmClose(){ this.setState({ qcmOpen:false, qcmEditCode:null, qcmForm:null }); }
  qcmSetField(k){ return (e)=>this.setState({ qcmForm:{...this.state.qcmForm, [k]:e.target.value} }); }
  qcmAddItem(){
    const items=[...(this.state.qcmForm.Items||[]), { text:'', type:'Checkbox', required:true }];
    this.setState({ qcmForm:{...this.state.qcmForm, Items:items} });
  }
  qcmSetItem(i, k, v){
    const items=(this.state.qcmForm.Items||[]).map((it,j)=>j===i?{...it,[k]:v}:it);
    this.setState({ qcmForm:{...this.state.qcmForm, Items:items} });
  }
  qcmRemoveItem(i){
    const items=(this.state.qcmForm.Items||[]).filter((_,j)=>j!==i);
    this.setState({ qcmForm:{...this.state.qcmForm, Items:items} });
  }
  qcmSave(){
    const editCode=this.state.qcmEditCode;
    if(!this.hasPerm('masters', editCode?'edit':'create')){ this.flash('You do not have permission to '+(editCode?'edit':'create')+' master records.'); return; }
    const f=this.state.qcmForm||{};
    if(!String(f.Checklist||'').trim()){ this.flash('Enter a Checklist Name to save.'); return; }
    if(!f.Campaign_Type){ this.flash('Select a Campaign Type to save.'); return; }
    const items=(f.Items||[]).filter(it=>String(it.text||'').trim()).map(it=>({ text:it.text.trim(), type:it.type||'Checkbox', required:!!it.required }));
    let code=editCode;
    if(!code){
      const reg=this.MASTERS_REG().qcChecklist;
      const everIssued=reg.rows.map(r=>r.QC_Code).concat((this.state.masterDeleted||{}).qcChecklist||[]);
      const nums=everIssued.map(c=>{ const m=/^QC-(\d+)$/.exec(c||''); return m?parseInt(m[1],10):0; });
      code='QC-'+String(Math.max(0,...nums)+1).padStart(2,'0');
    }
    const row={ QC_Code:code, Checklist:f.Checklist.trim(), Campaign_Type:f.Campaign_Type, Status:f.Status||'Active', Items:items };
    const added={...(this.state.masterAdded||{})};
    added.qcChecklist={...(added.qcChecklist||{}), [code]:row};
    this.setState({ masterAdded:added, qcmOpen:false, qcmEditCode:null, qcmForm:null });
    this.flash((editCode?'Updated ':'Added ')+'QC Checklist: '+row.Checklist+'.');
    supabase.from('master_records').upsert({
      id:'qcChecklist:'+code, master_key:'qcChecklist', payload:row,
      created_by:this.state.authUser?this.state.authUser.id:null,
    }).then(({error})=>{
      if(error) console.warn('[supabase] qc checklist upsert failed:', error.message);
    });
  }
  qcmDelete(code){
    if(!this.hasPerm('masters','delete')){ this.flash('You do not have permission to delete master records.'); return; }
    const row=this.MASTERS_REG().qcChecklist.rows.find(r=>r.QC_Code===code);
    if(!row) return;
    this.confirmDelete('Delete QC Checklist?', 'Are you sure you want to delete "'+row.Checklist+'"? This action cannot be undone.', ()=>{
      const del={...(this.state.masterDeleted||{})};
      del.qcChecklist=[...(del.qcChecklist||[]), code];
      this.setState({ masterDeleted:del, qcmOpen:false, qcmEditCode:null, qcmForm:null });
      this.flash('Deleted QC Checklist: '+row.Checklist+'.');
      supabase.from('master_records').upsert({
        id:'qcChecklist:'+code, master_key:'qcChecklist', payload:row, deleted:true,
        created_by:this.state.authUser?this.state.authUser.id:null,
      }).then(({error})=>{
        if(error) console.warn('[supabase] qc checklist delete failed:', error.message);
      });
    });
  }
  qcChecklistMasterData(){
    const reg=this.MASTERS_REG().qcChecklist;
    const q=(this.state.qcmQuery||'').toLowerCase();
    const typeFilter=this.state.qcmTypeFilter||'All';
    const rows=reg.rows.filter(r=>(typeFilter==='All'||r.Campaign_Type===typeFilter) && (!q || JSON.stringify(r).toLowerCase().includes(q)));
    const canEdit=this.hasPerm('masters','edit'), canCreate=this.hasPerm('masters','create'), canDelete=this.hasPerm('masters','delete');
    const out={
      qcmRows: rows.map(r=>{ const tone=this.qcmCampaignTypeTone(r.Campaign_Type);
        return { code:r.QC_Code, name:r.Checklist, itemCount:this.qcmItemsArray(r.Items).length,
          type:r.Campaign_Type||'—', typeBg:tone.bg, typeColor:tone.color,
          status:r.Status||'Active', statusBg:r.Status==='Inactive'?'var(--surface-50)':'var(--verify-100)', statusColor:r.Status==='Inactive'?'var(--ink-500)':'var(--verify-600)',
          canEdit, canDelete, edit:()=>this.qcmOpenEdit(r.QC_Code), delete:()=>this.qcmDelete(r.QC_Code) }; }),
      qcmEmpty: rows.length===0,
      qcmQuery:this.state.qcmQuery||'', qcmOnQuery:(e)=>this.setState({ qcmQuery:e.target.value }),
      qcmTypeFilter:typeFilter, qcmOnTypeFilter:(e)=>this.setState({ qcmTypeFilter:e.target.value }),
      qcmTypeFilterOptions:['All'].concat(this.CAMPAIGN_TYPES()),
      qcmCanCreate:canCreate, qcmNewOpen:()=>this.qcmOpenNew(),
      qcmOpen: !!this.state.qcmOpen,
      qcmIsEdit: !!this.state.qcmEditCode,
    };
    if(this.state.qcmOpen){
      const f=this.state.qcmForm||{ Items:[] };
      const items=f.Items||[];
      out.qcmForm=f;
      out.qcmFormCode=this.state.qcmEditCode||'Assigned automatically on save';
      out.qcmSetName=this.qcmSetField('Checklist'); out.qcmSetType=this.qcmSetField('Campaign_Type'); out.qcmSetStatus=this.qcmSetField('Status');
      out.qcmTypeOptions=this.CAMPAIGN_TYPES();
      out.qcmClose=()=>this.qcmClose(); out.qcmSave=()=>this.qcmSave();
      out.qcmAddItem=()=>this.qcmAddItem();
      out.qcmItemRows=items.map((it,i)=>({ n:i+1, text:it.text, type:it.type||'Checkbox', required:it.required?'Yes':'No',
        setText:(e)=>this.qcmSetItem(i,'text',e.target.value),
        setType:(e)=>this.qcmSetItem(i,'type',e.target.value),
        setRequired:(e)=>this.qcmSetItem(i,'required',e.target.value==='Yes'),
        remove:()=>this.qcmRemoveItem(i) }));
      out.qcmItemCount=items.length;
      out.qcmTotalItems=items.length;
      out.qcmRequiredItems=items.filter(it=>it.required).length;
    }
    return out;
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
      const rec = recIdx==null? null : (recIdx==='new'? this.blankBacklinkDomain() : this.BACKLINK_DOMAINS().find(x=>x.id===recIdx));
      out.mdShowTable=false;
      out.blIsBacklink=!rec; out.blShowDash=view==='dash'&&!rec; out.blShowRepo=view==='repo'&&!rec; out.blShowDetail=!!rec;
      const seg=(v,label,icon)=>({ label, icon, active:view===v, go:()=>this.setState({blView:v, blRecord:null}),
        style:'display:flex;align-items:center;gap:7px;padding:8px 15px;border:none;border-radius:9px;font-size:13px;font-weight:700;cursor:pointer;'+(view===v?'background:var(--paper);color:var(--ink-900);box-shadow:var(--shadow-xs)':'background:none;color:var(--ink-500)') });
      out.blSegs=[seg('dash','Dashboard','layout-dashboard'), seg('repo','Domain Repository','database')];
      out.mdAdd=()=>this.setState({ blRecord:'new', blTab:0, blView:'repo', blForm:this.blankBacklinkDomain() });
      if(out.blShowDash) Object.assign(out, this.backlinkDashData());
      if(out.blShowRepo) Object.assign(out, this.backlinkRepoData());
      if(rec) Object.assign(out, this.backlinkDetailData(rec, recIdx==='new'));
    }
    if(key==='qcChecklist'){
      out.mdShowTable=false;
      out.mdAdd=()=>this.qcmOpenNew();
      Object.assign(out, this.qcChecklistMasterData());
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
        const tabStyle = (active)=> 'padding:9px 14px;border:none;background:none;border-bottom:2px solid '+(active?'var(--orchid-500)':'transparent')+';font-size:13px;font-weight:700;cursor:pointer;color:'+(active?'var(--ink-900)':'var(--ink-500)')+';margin-bottom:-1px';
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

  // Seed is immutable and computed once (this._bldSeed) — actual edits/adds
  // never mutate it in place (that never persisted past a reload). Instead
  // BACKLINK_DOMAINS() below overlays state-held blOverrides/blAdded/blDeleted
  // on top of it, same seed+overlay+dedupe pattern used for SOPs/tickets/
  // campaigns elsewhere in this file.
  _bldSeedOnly(){
    if(this._bldSeed) return this._bldSeed;
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
    this._bldSeed=[
      D('medium.com','Guest Post','Publishing','Technology',95,1,'Approved','Active','12 Apr 2024',3,28,{traffic:'12.4M',backlinks:'1.2B',dr:94,description:'Online publishing platform with high domain authority and strong editorial guidelines.'}),
      D('forbes.com','Guest Post','Publishing','Business',94,1,'Approved','Active','08 Apr 2024',2,15),
      D('linkedin.com','Social Profile','Social Network','Business',98,2,'Approved','Active','05 Apr 2024',5,52),
      D('quora.com','Q&A','Q&A','Technology',93,3,'Approved','Active','03 Apr 2024',4,31),
      D('blogger.com','Web 2.0','Blog Platform','General',89,4,'Approved','Active','28 Mar 2024',6,41),
      D('yellowpages.com','Directory','Directory','Local Business',78,6,'Under Review','Active','26 Mar 2024',2,0),
      D('ezinearticles.com','Article Submission','Article Directory','General',72,10,'Under Review','Active','25 Mar 2024',1,0),
      D('articlebiz.com','Article Submission','Article Directory','General',65,18,'Rejected','Inactive','20 Mar 2024',0,0),
      D('spamsite.info','Directory','Directory','General',32,65,'Blacklisted','Inactive','15 Mar 2024',0,0),
    ].map((d,i)=>({ ...d, id:'bl-seed-'+i }));
    return this._bldSeed;
  }
  BACKLINK_DOMAINS(){
    const seed=this._bldSeedOnly();
    const overrides=this.state.blOverrides||{};
    const added=this.state.blAdded||[];
    const deleted=this.state.blDeleted||[];
    const addedIds=new Set(added.map(a=>a.id));
    const base=seed.filter(d=>!addedIds.has(d.id)).map(d=>overrides[d.id]?{...d,...overrides[d.id]}:d);
    return base.concat(added).filter(d=>!deleted.includes(d.id));
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
          open:()=>this.setState({ blRecord:d.id, blTab:0, blForm:{...d} }) }; });
    return { blRepoRows:rows, blRepoCount:rows.length+' of '+all.length+' domains',
      blQuery:this.state.blQuery||'', blOnQuery:e=>this.setState({blQuery:e.target.value}),
      blFStatus:fS, blOnFStatus:e=>this.setState({blFStatus:e.target.value}),
      blFPlatform:fP, blOnFPlatform:e=>this.setState({blFPlatform:e.target.value}),
      blPlatformOptions:platforms,
      blImport:()=>this.flash('Import domains — upload a CSV (demo).'),
      blExport:()=>this.exportCsv('backlink-domain-repository-'+this._todayIso()+'.csv',
        ['Domain','URL','Platform','Category','Industry','DA','Spam score','Status','Active','Found','Accounts','Live backlinks','Last verified'],
        rows.map(r=>[r.name, r.url, r.platform, r.category, r.industry, r.da, r.spam, r.status, r.activeLabel, r.found, r.accounts, r.live, r.lastVerified])),
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
      bd_tabs:tabs.map((t,i)=>({ label:t, go:()=>this.setState({blTab:i}), style:'flex:none;padding:9px 13px;border:none;background:none;border-bottom:2px solid '+(i===tab?'var(--orchid-500)':'transparent')+';font-size:13px;font-weight:700;cursor:pointer;color:'+(i===tab?'var(--ink-900)':'var(--ink-500)')+';margin-bottom:-1px;white-space:nowrap' })),
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
        {...editableRow('Traffic (est.)',f.traffic,'traffic'), color:'var(--ink-900)'},
        {...editableRow('Backlinks (est.)',f.backlinks,'backlinks'), color:'var(--ink-900)'},
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
      bd_canDelete:!isNew&&this.hasPerm('masters','delete'),
      bd_back:()=>this.setState({ blRecord:null, blView:'repo', blForm:null }),
      bd_save:()=>{
        if(!this.hasPerm('masters', isNew?'create':'edit')){ this.flash('You do not have permission to '+(isNew?'create':'edit')+' backlink domains.'); return; }
        const form=this.state.blForm||d;
        if(!String(form.name||'').trim()){ this.flash('Enter a domain name to save.'); return; }
        const createdBy=this.state.authUser?this.state.authUser.id:null;
        if(isNew){
          const id='bl-'+Date.now();
          const rec={...form, id, activity:[['Domain added', this.currentPerson(), this.todayStr()], ...(form.activity||[])]};
          this.setState({ blAdded:[...(this.state.blAdded||[]), rec], blRecord:null, blView:'repo', blForm:null });
          this.flash('Domain "'+form.name+'" added to the repository.');
          supabase.from('backlink_domains').insert({ id, payload:rec, created_by:createdBy }).then(({error})=>{
            if(error) console.warn('[supabase] backlink domain insert failed:', error.message);
          });
        } else {
          const id=d.id;
          const rec={...form, id};
          const isSeed=String(id).indexOf('bl-seed-')===0;
          if(isSeed) this.setState({ blOverrides:{...(this.state.blOverrides||{}), [id]:rec}, blRecord:null, blView:'repo', blForm:null });
          else this.setState({ blAdded:(this.state.blAdded||[]).map(a=>a.id===id?rec:a), blRecord:null, blView:'repo', blForm:null });
          this.flash('Changes saved for "'+form.name+'".');
          supabase.from('backlink_domains').upsert({ id, payload:rec, created_by:createdBy }).then(({error})=>{
            if(error) console.warn('[supabase] backlink domain upsert failed:', error.message);
          });
        }
      },
      bd_delete:()=>{
        if(isNew) return;
        if(!this.hasPerm('masters','delete')){ this.flash('You do not have permission to delete backlink domains.'); return; }
        const id=d.id, name=f.name, createdBy=this.state.authUser?this.state.authUser.id:null;
        this.confirmDelete('Delete Backlink Domain?', 'Are you sure you want to delete "'+name+'"? This action cannot be undone.', ()=>{
          this.setState({ blDeleted:[...(this.state.blDeleted||[]), id], blRecord:null, blView:'repo', blForm:null });
          this.flash('Deleted domain "'+name+'".');
          supabase.from('backlink_domains').upsert({ id, payload:d, deleted:true, created_by:createdBy }).then(({error})=>{
            if(error) console.warn('[supabase] backlink domain delete failed:', error.message);
          });
        });
      },
    };
  }

  backlinkDashData(){
    return {
      blKpis:[
        {label:'Total domains', value:'48', icon:'globe', color:'var(--ink-900)', sub:'in repository'},
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
    const seed = {
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
    // Layer in key results from REAL OKRs (including ones created after
    // this seed catalog was written) that name the current person as
    // owner — otherwise a newly created OKR's KRs have no check-in path at
    // all and can never show progress moving, no matter how many check-ins
    // get logged against it.
    const person=this.currentPerson();
    const rk=this.state.roleKey;
    const seedTitles=new Set(Object.values(seed).flat().map(k=>k.okr));
    const mine=[];
    (this.allOkrs()||[]).forEach(o=>{
      if(seedTitles.has(o.title)) return;
      (o.krs||[]).forEach((k,i)=>{
        if(k.who!==person) return;
        mine.push({ id:(o.code||o.id)+'-kr'+i, kpi:k.kpi, unit:k.unit||'units', baseline:k.baseline||'0',
          target:k.target||'100', current:k.current||'0', freq:k.freq||'Monthly', okr:o.title, manual:true });
      });
    });
    if(mine.length) seed[rk]=(seed[rk]||[]).concat(mine);
    return seed;
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
      const okrPatch={...(this.state.okrUpd||{})};
      const patchOkrKr=(kpiName, okrTitle, val)=>{
        const o=this.allOkrs().find(x=>x.title===okrTitle); if(!o||!(o.krs||[]).length) return;
        const krs=o.krs.map(kr=>kr.kpi===kpiName?{...kr, current:val, lastReported:date, lastReportedBy:this.currentPerson()}:kr);
        okrPatch[o.id]={...(okrPatch[o.id]||{}), krs};
        if(o.code) this._persistOkr(o.code, {
          title:o.title, description:o.desc, category:o.category,
          scope:o.scope, division:o.dept, status:o.status, key_results:krs,
        });
      };
      kpis.forEach(k=>{ const v=cf['act_'+k.id]; if(v!==undefined && String(v).trim()!==''){
        actuals[k.id]={ val:String(v).trim(), date }; reported.push(k.kpi+' → '+String(v).trim()+' '+k.unit);
        patchOkrKr(k.kpi, k.okr, String(v).trim());
        supabase.from('kpi_actuals').upsert({ kpi_id:k.id, val:String(v).trim(), date }).then(({error})=>{
          if(error) console.warn('[supabase] kpi actual upsert failed:', error.message);
        }); } });
      this.setState({ kpiActuals:actuals, okrUpd:okrPatch });
      if(reported.length===0 && t!=='kpi'){ this.flash('Enter at least one actual value to report.'); return; }
    }
    const qual=[cf.flag&&'Flagged for Manager review', cf.challenges&&('Blockers: '+cf.challenges), cf.risks&&('Risks: '+cf.risks), cf.dependencies&&('Dependencies: '+cf.dependencies), cf.support&&('Support needed: '+cf.support), cf.next&&('Next week: '+cf.next), (cf.files&&cf.files.length)&&('Evidence: '+cf.files.join(', '))].filter(Boolean).join(' · ');
    const text = (reported.length?('Reported — '+reported.join('; ')):'') + (reported.length&&qual?' — ':'') + (qual||cf.comment||'');
    const entry={ date, who:this.currentPerson(), role:role.label, kind, health:cf.health||null, decision:cf.decision||null, progress:ctx.progress||null, confidence:cf.confidence||null, text:text||cf.comment||'' };
    const added={...this.state.ciAdded}; added[okrId]=[...(added[okrId]||[]), entry];
    let py=this.state.ciPendingY;
    if(t==='kpi'){ py={...(this.state.ciPendingY||this.defaultPendingY())}; delete py[ctx.kpiId]; }
    this.setState({ ciAdded:added, ciOpen:false, ciPendingY:py });
    this.flash(kind+' saved'+(escalate?' & escalated to Manager':'')+(reported.length?(' · '+reported.length+' KPI actual'+(reported.length>1?'s':'')+' logged'):'')+'.');
    supabase.from('check_ins').insert({ ref_id:okrId, payload:entry, created_by:this.state.authUser?this.state.authUser.id:null }).then(({error})=>{
      if(error) console.warn('[supabase] check-in insert failed:', error.message);
    });
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
      boxBg: done?'var(--verify-500)':'var(--paper)', boxBorder: done?'var(--verify-500)':'var(--line-300)', checkOpacity: done?'1':'0',
      actionLabel: done?'Reopen':'Mark done',
      toggle:()=>this.toggleTask(t.id),
    }; });
    const done=rows.filter(r=>r.done).length;
    return {
      jtRows:rows,
      jtStats:[
        {label:'My tasks',value:String(tasks.length),color:'var(--ink-900)',icon:'list-checks'},
        {label:'Completed',value:String(done),color:'var(--verify-600)',icon:'check-circle-2'},
        {label:'Open',value:String(tasks.length-done),color:'var(--warn-600)',icon:'circle-dot'},
        {label:'KPIs advanced',value:String(new Set(rows.filter(r=>r.done).map(r=>r.kpi)).size),color:'var(--orchid-600)',icon:'target'},
      ],
    };
  }
  toggleTask(id){ const t=this.JUNIOR_TASKS().find(x=>x.id===id); if(!t) return; const cur=this.taskIsDone(t); this.setState({ taskDone:{...this.state.taskDone,[id]:!cur} }); this.flash(!cur?('Task completed · +'+t.units+' '+t.unit+' to “'+t.kpi+'”'):'Task reopened.');
    supabase.from('task_done').upsert({ task_id:id, done:!cur, created_by:this.state.authUser?this.state.authUser.id:null }).then(({error})=>{
      if(error) console.warn('[supabase] task-done upsert failed:', error.message);
    }); }
  juniorRollup(kpiId){ const tasks=this.allTasks().filter(t=>t.kpiId===kpiId); const done=tasks.filter(t=>t.status==='Approved'); return { val:done.reduce((s,t)=>s+t.units,0), done:done.length, total:tasks.length }; }
  // Closes Task → KPI → OKR: whenever a task linked to a KPI changes status,
  // recompute the Approved-task rollup for that KPI and write the total back
  // onto the matching Key Result's `current` value — the same field the
  // manual check-in path (submitCi's patchOkrKr) already writes to — so OKR
  // and Dashboard progress move from task completion for every role, not
  // just as a live-only display override on the Junior's personal KPI page.
  // Deliberately does NOT resolve the KPI via epKpiPool() — that pool only
  // exposes the CURRENT VIEWER's own junior/senior/team_lead KPIs, so an
  // Admin approving someone else's task would never find their KR. A real
  // per-person Key Result's id is always synthesized as `<okrCode>-kr<N>`
  // (see MY_KPIS()'s "mine" block), which is a stable, role-independent
  // pointer straight at the OKR + KR index — parse that directly instead.
  // Legacy demo personal-KPI catalog ids (jr1, sr2, kt3…) don't match this
  // shape and correctly no-op — they were never wired to a real KR.
  _syncKrFromTasks(kpiId){
    if(!kpiId) return;
    const m=/^(.+)-kr(\d+)$/.exec(kpiId);
    if(!m) return;
    const [, ref, idxStr]=m, idx=parseInt(idxStr,10);
    const o=this.allOkrs().find(x=>x.code===ref||x.id===ref);
    if(!o || !(o.krs||[])[idx]) return;
    const rollup=this.juniorRollup(kpiId);
    if(rollup.total===0) return;
    const kr=o.krs[idx];
    const current=String(this.cmpNum(kr.baseline)+rollup.val);
    if(String(kr.current)===current) return;
    const krs=o.krs.map((k,i)=>i===idx?{...k, current, lastReportedBy:'Auto (task completion)'}:k);
    this.setState({ okrUpd:{...(this.state.okrUpd||{}), [o.id]:{...(this.state.okrUpd[o.id]||{}), krs} } });
    if(o.code) this._persistOkr(o.code, { title:o.title, description:o.desc, category:o.category, scope:o.scope, division:o.dept, status:o.status, key_results:krs });
  }

  // campaign dropped per the Campaign field being removed from Create
  // Effort Plan; okr no longer defaults to a specific hardcoded title —
  // that title was one of the 5 seed OKRs, which don't reflect whatever
  // OKRs actually exist now, so the field starts unset and the user picks
  // from the live list instead.
  EP_FORM(){ return { name:'New effort plan', quarter:'Jul 2026', campaign:'', dept:'SEO', owner:this.currentPerson(), okr:'', start:'Jul 1, 2026', end:'Jul 31, 2026', type:'Monthly' }; }
  EP_DIVISIONS(){ return ['Content Writer','Graphics','Web Developers','SMM','SEO'].concat(this.state.epCustomDivs||[]); }
  EP_DIV_ROWS(d){
    // assignee defaults to '' (falls back to the plan's overall owner in
    // epGenerate) — seed rows have no individual assignee, only plans
    // created/edited through the real UI set one per effort.
    // hours: estimated hours for ONE task delivering this effort — the
    // figure item 58's Task-creation "Estimated Hours" auto-fill reads,
    // distinct from `monthly`/`days` which describe the effort's overall
    // period target, not a single task's workload.
    const R=(type,icon,monthly,days,unit,priority,weight,kpiId,assignee,hours)=>({type,icon,monthly,days,unit,priority,weight,kpiId,assignee:assignee||'',hours:hours||1});
    return {
      'Content Writer':[ R('Long-form content','file-text',25000,25,'words','High',40,'sr3','',6), R('Blog posts','newspaper',12,25,'articles','High',30,'sr3','',3), R('Case studies','file-check',4,20,'case studies','Medium',20,'','',8), R('Proofreading passes','spell-check',20,25,'documents','Low',10,'','',2) ],
      'Graphics':[ R('Social creatives','image',30,25,'designs','High',40,'jr3','',2), R('Reels / video edits','clapperboard',12,25,'reels','High',30,'','',4), R('Infographics','bar-chart-3',6,20,'infographics','Medium',20,'','',5), R('Thumbnails & banners','panels-top-left',20,25,'assets','Low',10,'','',1) ],
      'Web Developers':[ R('Landing pages built','code',8,25,'pages','High',40,'','',8), R('Bug fixes','bug',40,25,'fixes','High',25,'','',2), R('Core Web Vitals fixes','gauge',20,20,'fixes','Medium',20,'tl3','',4), R('Broken link fixes','link',60,25,'links','Low',15,'jr2','',1) ],
      'SMM':[ R('Platform posts','share-2',60,25,'posts','High',40,'','',1), R('Community responses','messages-square',200,25,'replies','Medium',25,'','',1), R('Stories / reels','clapperboard',20,25,'stories','High',25,'','',2), R('Influencer outreach','users',10,20,'contacts','Low',10,'','',3) ],
      'SEO':[ R('Backlinks','link',200,25,'backlinks','High',30,'jr2','',2), R('On-page optimizations','search',120,25,'pages','Medium',25,'jr1','',3), R('Technical SEO fixes','settings-2',40,20,'fixes','Medium',20,'tl3','',4), R('Keyword research','key-round',80,25,'keywords','High',25,'sr2','',4) ],
    }[d]||[];
  }
  EP_PLANS(){ return [
    { id:'EP-001', name:'Jul Content Effort Plan', division:'Content Writer', period:'Jul 2026', owner:'Sameer Iyer', dept:'Content', campaign:'Content Engine Q3', okr:'Launch 30 High-Quality Content Pieces', start:'Jul 1, 2026', end:'Jul 31, 2026', type:'Monthly', status:'Active', rows:this.EP_DIV_ROWS('Content Writer') },
    { id:'EP-002', name:'Jul SEO Effort Plan', division:'SEO', period:'Jul 2026', owner:'Neha Verma', dept:'SEO', campaign:'Q3 SEO push', okr:'Increase Organic Traffic by 50%', start:'Jul 1, 2026', end:'Jul 31, 2026', type:'Monthly', status:'Active', rows:this.EP_DIV_ROWS('SEO') },
    { id:'EP-003', name:'Jul Graphics Effort Plan', division:'Graphics', period:'Jul 2026', owner:'Neha Verma', dept:'Design', campaign:'Social Push Q1', okr:'Grow Social Engagement 3×', start:'Jul 1, 2026', end:'Jul 31, 2026', type:'Monthly', status:'Draft', rows:this.EP_DIV_ROWS('Graphics') },
  ]; }
  allEpPlans(){
    const adds=this.state.epRowAdds||{};
    const added=this.state.epAdded||[];
    const addedIds=new Set(added.map(p=>p.id));
    const del=this.state.epDeleted||[];
    const base=this.EP_PLANS().filter(p=>!addedIds.has(p.id)).concat(added).filter(p=>!del.includes(p.id));
    return base.map(p=>adds[p.id]?{...p, rows:(p.rows||[]).concat(adds[p.id])}:p);
  }
  _allEpIdsEver(){ return this.EP_PLANS().map(p=>p.id).concat((this.state.epAdded||[]).map(p=>p.id)).concat(this.state.epDeleted||[]); }
  _persistEpPlan(plan){
    supabase.from('effort_plans').upsert({ id:plan.id, payload:plan, created_by:this.state.authUser?this.state.authUser.id:null }).then(({error})=>{
      if(error) console.warn('[supabase] effort plan upsert failed:', error.message);
    });
  }
  // Deducts Contribution Units (and records Estimated Hours) against ONE
  // Effort row when a task is created against it — never the row's own
  // `monthly` target, so "remaining" (target - usedUnits) stays derivable
  // and every OTHER row on the same plan is left completely untouched.
  // Same "clone full plan, upsert into epAdded, persist" path the Effort
  // Planner's own save button uses (see epForm's save handler) — a seed
  // plan (EP-001 etc.) that's never been edited yet gets replaced, not
  // duplicated, the first time this fires.
  _deductEffort(planName, effortType, units, hours){
    const plan=this.allEpPlans().find(p=>p.name===planName); if(!plan) return;
    const rows=plan.rows.map(r=>r.type===effortType
      ? { ...r, usedUnits:(r.usedUnits||0)+(units||0), usedHours:(r.usedHours||0)+(hours||0) }
      : r);
    const updated={ ...plan, rows };
    const already=(this.state.epAdded||[]).some(p=>p.id===plan.id);
    const added= already ? (this.state.epAdded||[]).map(p=>p.id===plan.id?updated:p) : [...(this.state.epAdded||[]),updated];
    this.setState({ epAdded:added });
    this._persistEpPlan(updated);
  }
  _deleteEpPlan(id){
    if(!this.hasPerm('effort','delete')){ this.flash('You do not have permission to delete effort plans.'); return; }
    const p=this.allEpPlans().find(x=>x.id===id); if(!p) return;
    this.setState({ epDeleted:[...(this.state.epDeleted||[]), id], epView:'list', epPlanId:null });
    this.flash('Deleted effort plan: '+(p.name||id)+'.');
    // upsert (not update) — a seed plan that's never been edited has no DB
    // row yet, so this is what makes the deletion stick past reload.
    supabase.from('effort_plans').upsert({ id, payload:p||{}, deleted:true, created_by:this.state.authUser?this.state.authUser.id:null }).then(({error})=>{
      if(error) console.warn('[supabase] effort plan delete failed:', error.message);
    });
  }
  // Every KPI a user can actually link an effort/task to — real Key
  // Results from real OKRs (any owner, not just the current viewer's own —
  // an effort can be assigned to anyone) plus real KPI Templates. The old
  // version surfaced MY_KPIS()'s hardcoded junior/senior/team_lead demo
  // catalog here too, so "Link KPI" showed a dozen KPIs nobody in the org
  // had ever created or touched. That catalog stays in MY_KPIS() for the
  // personal check-in page's own display, but never belongs in a picker
  // that's supposed to represent real, curated KPIs.
  epKpiPool(){
    const seedTitles=new Set(this.OKR_SEED().map(o=>o.title));
    const real=[];
    (this.allOkrs()||[]).forEach(o=>{
      if(seedTitles.has(o.title)) return;
      (o.krs||[]).forEach((k,i)=>{
        real.push({ id:(o.code||o.id)+'-kr'+i, kpi:k.kpi||k.t||('KR '+(i+1)), unit:k.unit||'units', baseline:k.baseline||'0', target:k.target||'100', current:k.current||'0', freq:k.freq||'Monthly', okr:o.title, who:k.who||'—' });
      });
    });
    return real.concat(this.allKpiTemplates().filter(t=>t.status==='Active').map(t=>({ id:t.id, kpi:t.name, unit:t.unit, baseline:'0', target:t.defTarget, current:'0', freq:t.freq, who:'Template' })));
  }
  KPI_TEMPLATES(){ return [
    { id:'kt1', name:'Organic Sessions', category:'Traffic', division:'SEO', unit:'sessions', direction:'Increase', defTarget:'100,000', freq:'Monthly', source:'GA4', desc:'Total organic search sessions on tracked domains.', status:'Active', owner:'Priya Nair', updated:'Jun 10, 2026' },
    { id:'kt2', name:'Keywords in Top 10', category:'SEO', division:'SEO', unit:'keywords', direction:'Increase', defTarget:'250', freq:'Weekly', source:'Semrush', desc:'Tracked keywords ranking in positions 1–10.', status:'Active', owner:'Priya Nair', updated:'Jun 10, 2026' },
    { id:'kt3', name:'Referring Domains', category:'SEO', division:'SEO', unit:'domains', direction:'Increase', defTarget:'200', freq:'Monthly', source:'Ahrefs', desc:'Unique referring domains pointing to the site.', status:'Active', owner:'Priya Nair', updated:'May 28, 2026' },
    { id:'kt4', name:'Articles Published', category:'Content', division:'Content', unit:'articles', direction:'Increase', defTarget:'12', freq:'Monthly', source:'KPI Log', desc:'QC-approved articles published in the period.', status:'Active', owner:'Aditi Rao', updated:'Jun 18, 2026' },
    { id:'kt5', name:'Avg. Engagement Rate', category:'Social', division:'SMM', unit:'%', direction:'Increase', defTarget:'4.5', freq:'Weekly', source:'Platform APIs', desc:'Average engagement across social platforms.', status:'Active', owner:'Aditi Rao', updated:'Jun 5, 2026' },
    { id:'kt6', name:'Page Load Time', category:'Technical', division:'Web Developers', unit:'seconds', direction:'Decrease', defTarget:'2.0', freq:'Weekly', source:'Lighthouse', desc:'Median LCP across key templates.', status:'Active', owner:'Priya Nair', updated:'Jun 1, 2026' },
    { id:'kt7', name:'Conversion Rate', category:'Conversion', division:'All', unit:'%', direction:'Increase', defTarget:'4.5', freq:'Monthly', source:'GA4', desc:'Sitewide goal conversion rate.', status:'Active', owner:'Priya Nair', updated:'May 20, 2026' },
    { id:'kt8', name:'Creatives Delivered', category:'Design', division:'Graphics', unit:'assets', direction:'Increase', defTarget:'40', freq:'Monthly', source:'KPI Log', desc:'QC-approved design assets delivered.', status:'Disabled', owner:'Aditi Rao', updated:'Jun 22, 2026' },
  ]; }
  allKpiTemplates(){ const upd=this.state.ktUpd||{}; const added=this.state.ktAdded||[]; const addedIds=new Set(added.map(t=>t.id));
    const del=this.state.ktDeleted||[];
    return this.KPI_TEMPLATES().filter(t=>!addedIds.has(t.id)).concat(added).filter(t=>!del.includes(t.id)).map(t=>upd[t.id]?{...t,...upd[t.id]}:t); }
  OKR_TEMPLATES(){ return [
    { id:'ot1', name:'Organic Growth OKR', category:'SEO', scope:'Department', division:'SEO', objective:'Increase organic traffic by X% this quarter', desc:'Standard quarterly SEO growth objective — traffic, rankings and authority.', status:'Active', owner:'Priya Nair', updated:'Jun 15, 2026', krs:[ {t:'Grow organic sessions', kpi:'Organic Sessions', unit:'sessions', target:'100,000', weight:'40', freq:'Monthly'}, {t:'Increase keywords in top 10', kpi:'Keywords in Top 10', unit:'keywords', target:'250', weight:'30', freq:'Weekly'}, {t:'Build referring domains', kpi:'Referring Domains', unit:'domains', target:'200', weight:'30', freq:'Monthly'} ] },
    { id:'ot2', name:'Content Engine OKR', category:'Content', scope:'Department', division:'Content', objective:'Ship consistent, high-quality content every month', desc:'Publishing cadence and content-led traffic objective.', status:'Active', owner:'Aditi Rao', updated:'Jun 18, 2026', krs:[ {t:'Publish articles on schedule', kpi:'Articles Published', unit:'articles', target:'12', weight:'50', freq:'Monthly'}, {t:'Grow content-led sessions', kpi:'Organic Sessions', unit:'sessions', target:'40,000', weight:'50', freq:'Monthly'} ] },
    { id:'ot3', name:'Site Performance OKR', category:'Technical', scope:'Department', division:'Web Developers', objective:'Make the site measurably faster and more stable', desc:'Core Web Vitals and technical health objective.', status:'Active', owner:'Priya Nair', updated:'Jun 1, 2026', krs:[ {t:'Cut median page load time', kpi:'Page Load Time', unit:'seconds', target:'2.0', weight:'60', freq:'Weekly'}, {t:'Lift conversion rate', kpi:'Conversion Rate', unit:'%', target:'4.5', weight:'40', freq:'Monthly'} ] },
    { id:'ot4', name:'Social Engagement OKR', category:'Social', scope:'Department', division:'SMM', objective:'Grow engaged social audience across platforms', desc:'Engagement-first social objective.', status:'Draft', owner:'Aditi Rao', updated:'Jun 22, 2026', krs:[ {t:'Raise average engagement rate', kpi:'Avg. Engagement Rate', unit:'%', target:'4.5', weight:'100', freq:'Weekly'} ] },
  ]; }
  allOkrTemplates(){ const upd=this.state.otUpd||{}; const added=this.state.otAdded||[]; const addedIds=new Set(added.map(t=>t.id));
    const del=this.state.otDeleted||[];
    return this.OKR_TEMPLATES().filter(t=>!addedIds.has(t.id)).concat(added).filter(t=>!del.includes(t.id)).map(t=>upd[t.id]?{...t,...upd[t.id]}:t); }
  fmtDate(v){ if(!v) return v; const m=String(v).match(/^(\d{4})-(\d{2})-(\d{2})$/); if(!m) return v; const M=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']; return M[parseInt(m[2],10)-1]+' '+parseInt(m[3],10)+', '+m[1]; }
  fmtMonth(v){ if(!v) return v; const m=String(v).match(/^(\d{4})-(\d{2})$/); if(!m) return v; const M=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']; return M[parseInt(m[2],10)-1]+' '+m[1]; }
  filesView(){
    const rk=this.state.roleKey;
    const me=this.currentPerson();
    const own=['senior','junior'].includes(rk);
    const fileType=(n)=>this.fileKind(n);
    // repoFileList() is the single source of truth (threads/tasks/tickets/
    // compliance evidence) shared with the "Attach files" picker, so a file
    // always shows up here too — not just when re-attaching it elsewhere.
    const files=this.repoFileList().filter(f=> !own || f.by===me || (f.task&&f.task.assignee===me) );
    const F=this.state.flFilters||{type:'All',status:'All',source:'All'};
    const setF=(k)=>(e)=>this.setState({ flFilters:{...F,[k]:e.target.value}, pg:{...(this.state.pg||{}),fl:0} });
    const q=(this.state.flQuery||'').toLowerCase();
    const enriched=files.map(f=>{ const ft=fileType(f.name); const task=f.task||{ id:f.where, name:f.where, status:'—', start:'—', end:'—' };
      const tn=this.tkTone(task.status); const due=(this.tkDueAlert&&f.task)?this.tkDueAlert(task):null;
      return { ...f, type:ft.t, ftIcon:ft.icon, ftColor:ft.color, ftBg:ft.bg,
        taskId:task.id, taskName:task.name, status:task.status, statusBg:tn.bg, statusColor:tn.c,
        dates:task.start+' → '+task.end, dueLabel:due&&due.label?due.label:'', dueColor:due&&due.color?due.color:'var(--ink-400)',
        preview:()=>this.openFilePreview(f.name),
        download:(e)=>{ if(e)e.stopPropagation(); this.downloadFile(f.name); },
        open:(e)=>{ if(e)e.stopPropagation();
          if(f.source==='Message attachment') this.setState({ route:'messages' });
          else if(f.source==='Support ticket') this.setState({ route:'support', tktOpen:task.id });
          else this.setState({ route:'tasks', tkOpen:task.id, tkFilter:'All' }); } }; });
    const filtered=enriched.filter(f=> (F.type==='All'||f.type===F.type) && (F.status==='All'||f.status===F.status) && (F.source==='All'||f.source===F.source) && (!q || (f.name+' '+f.taskName+' '+f.by).toLowerCase().includes(q)) );
    const pg=this.pgData('fl',filtered,10);
    const K=(label,value,color)=>({label,value,color});
    return {
      flStats:[K('All files',String(enriched.length),'var(--ink-900)'),K('Images',String(enriched.filter(f=>f.type==='Image').length),'var(--orchid-600)'),K('Documents & PDFs',String(enriched.filter(f=>['Document','PDF','Spreadsheet'].includes(f.type)).length),'var(--info-600)'),K('Videos',String(enriched.filter(f=>f.type==='Video').length),'var(--verify-600)'),K('On tasks awaiting QC',String(enriched.filter(f=>f.status==='Submitted').length),'var(--warn-600)')],
      flRows:pg.rows, flPg:pg, flEmpty:filtered.length===0,
      flOwnNote:own,
      flFilterDefs:[
        {label:'Type',value:F.type,onChange:setF('type'),options:['All','Image','Video','PDF','Spreadsheet','Document']},
        {label:'Source',value:F.source,onChange:setF('source'),options:['All','Task evidence','QC reference','Comment attachment','Message attachment','Support ticket','Compliance evidence']},
        {label:'Task status',value:F.status,onChange:setF('status'),options:['All','Assigned','In Progress','Submitted','Rework','Approved','Closed']},
      ],
      flQuery:this.state.flQuery||'',
      flOnQuery:(e)=>this.setState({ flQuery:e.target.value, pg:{...(this.state.pg||{}),fl:0} }),
      flReset:()=>this.setState({ flFilters:{type:'All',status:'All',source:'All'}, flQuery:'' }),
    };
  }
  effortView(){
    const rk=this.state.roleKey;
    const canEdit=this.hasPerm('effort','edit');
    const canDelete=this.hasPerm('effort','delete');
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
        // quarter/start/end are stored as fmtMonth()/fmtDate() display
        // strings (e.g. "Jul 2026", "Jul 1, 2026") — the <input
        // type="month"/"date"> fields need ISO back or they render blank,
        // which is why reopening a saved plan looked like the dates had
        // vanished.
        edit:()=>this.setState({ epView:'create', epPlanId:p.id, epDivision:p.division, epForm:{ name:p.name, quarter:this.isoMonth(p.period), campaign:p.campaign, dept:p.dept, owner:p.owner, okr:p.okr, start:this.isoDate(p.start), end:this.isoDate(p.end), type:p.type }, epRows:p.rows.map(r=>({...r})) }),
        delete:(e)=>{ if(e)e.stopPropagation(); if(!canDelete){ this.flash('You do not have permission to delete effort plans.'); return; }
          this.confirmDelete('Delete Effort Plan?', 'Are you sure you want to delete "'+(p.name||p.id)+'"? This action cannot be undone.', ()=>this._deleteEpPlan(p.id)); },
      };
    });
    // Linked KPI options are scoped to the plan's own Linked OKR — an
    // effort should only be able to drive a KR that actually belongs to
    // the OKR it's planned against. With no OKR selected yet, show the
    // full pool (nothing to scope against).
    const selectedOkrTitle=(f.okr && f.okr!=='— None —') ? f.okr : '';
    const kpiPoolScoped=selectedOkrTitle ? this.epKpiPool().filter(k=>k.okr===selectedOkrTitle) : this.epKpiPool();
    const kpiOpts=[{id:'',label:'None — effort only'}].concat(kpiPoolScoped.map(k=>({ id:k.id, label:k.kpi+' — '+k.who })));
    const assigneeOpts=[{v:'',label:'(plan owner)'}].concat((this.state.users||[]).filter(u=>u.status==='Active').map(u=>({v:u.name,label:u.name})));
    const totalW=rows.reduce((s,r)=>s+(r.weight||0),0);
    const epRows=rows.map((r,i)=>{
      const weekly=Math.ceil((r.monthly||0)/4), daily=Math.ceil((r.monthly||0)/(r.days||25));
      const k=this.epKpiPool().find(x=>x.id===r.kpiId);
      const kids=(r.kpiIds&&r.kpiIds.length)?r.kpiIds:(r.kpiId?[r.kpiId]:[]);
      const kobjs=kids.map(id=>this.epKpiPool().find(x=>x.id===id)).filter(Boolean);
      const ts=this.allTasks().filter(t=>t.effortType===r.type||t.template===r.type||t.name===r.type||(t.kpiId&&kids.includes(t.kpiId)));
      const expTasks=(this.state.epRowExpanded||[]).includes(r.type);
      return { ...r, i, monthly:String(r.monthly||0), weekly:weekly.toLocaleString('en-US'), daily:daily.toLocaleString('en-US'), weightStr:String(r.weight||0),
        hours:String(r.hours||0), setHours:setRow(i,'hours'),
        kpiLabel:k?k.kpi:'—', hasKpi:!!k,
        kpiChips:kobjs.map(o=>({ label:o.kpi, sub:o.baseline+' → '+o.target+' '+o.unit,
          remove:()=>{ const nk=kids.filter(x=>x!==o.id); this.setState({ epRows:rows.map((x,j)=>j===i?{...x,kpiIds:nk,kpiId:nk[0]||''}:x) }); } })),
        kpiCountLabel:kobjs.length?(kobjs.length+' KPI'+(kobjs.length===1?'':'s')+' linked'):'Effort only — no KPI linked',
        addKpiVal:'',
        addKpi:(e)=>{ const v=e.target.value; if(!v||kids.includes(v)) return; const nk=[...kids,v];
          this.setState({ epRows:rows.map((x,j)=>j===i?{...x,kpiIds:nk,kpiId:nk[0]}:x) });
          const kk=this.epKpiPool().find(x=>x.id===v); this.flash((kk?kk.kpi:'KPI')+' linked to “'+r.type+'” — one effort can drive several KPIs.'); },
        kpiAddOptions:[{id:'',label:'+ Link another KPI…'}].concat(kpiPoolScoped.filter(x=>!kids.includes(x.id)).map(x=>({id:x.id,label:x.kpi+' — '+x.who}))),
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
        assignee:r.assignee||'', setAssignee:setRow(i,'assignee'), assigneeOpts,
        remove:()=>{ const arr=rows.slice(); arr.splice(i,1); this.setState({ epRows:arr }); }, canRemove:rows.length>1 };
    });
    const alloc=epRows.map(r=>({ type:r.type, icon:r.icon, label:Number(r.monthly).toLocaleString('en-US')+' '+r.unit+' / month', w:Math.min(100,r.weight*3)+'%', weight:r.weight+'%' }));
    // effort vs outcome report
    const view=this.state.epView||'list';
    const num=(v)=>parseFloat(String(v).replace(/,/g,''))||0;
    const pc2=(p)=> p>=70?'var(--verify-500)': p>=40?'var(--warn-500)':'var(--danger-500)';
    const kpiCur=(k)=>{ const r=this.juniorRollup(k.id); if(r.total>0) return num(k.baseline)+r.val; const rep=(this.state.kpiActuals||{})[k.id]; return num(rep?rep.val:k.current); };
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
    const seg=(active)=>'display:flex;align-items:center;gap:7px;padding:8px 15px;border:none;border-radius:9px;font-size:13px;font-weight:700;cursor:pointer;'+(active?'background:var(--paper);color:var(--ink-900);box-shadow:var(--shadow-xs)':'background:none;color:var(--ink-500)');
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
        {label:'Efforts tracked',value:String(allR.length),color:'var(--ink-900)',icon:'gauge'},
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
      epSaveDiv:()=>{ const n=(this.state.epNewDiv||'').trim(); if(!n){ this.flash('Enter a role / division name.'); return; } if(this.EP_DIVISIONS().includes(n)){ this.flash('"'+n+'" already exists.'); this.setState({ epAddingDiv:false, epNewDiv:'', epDivision:n }); return; } this.setState({ epCustomDivs:[...(this.state.epCustomDivs||[]),n], epDivision:n, epAddingDiv:false, epNewDiv:'' }); this.flash('Custom role "'+n+'" added — create its effort plan.');
        supabase.from('custom_divisions').upsert({ name:n, created_by:this.state.authUser?this.state.authUser.id:null }).then(({error})=>{
          if(error) console.warn('[supabase] custom division insert failed:', error.message);
        }); },
      epCancelDiv:()=>this.setState({ epAddingDiv:false, epNewDiv:'' }),
      epCanDeleteDiv:canDelete&&(this.state.epCustomDivs||[]).includes(division),
      epDeleteDiv:()=>{
        if(!canDelete){ this.flash('You do not have permission to delete effort plans.'); return; }
        this.confirmDelete('Delete Role / Division?', 'Are you sure you want to delete "'+division+'"? This action cannot be undone.', ()=>{
          const remaining=(this.state.epCustomDivs||[]).filter(d=>d!==division);
          this.setState({ epCustomDivs:remaining, epDivision:'Content Writer' });
          this.flash('Custom role "'+division+'" deleted.');
          supabase.from('custom_divisions').delete().eq('name', division).then(({error})=>{
            if(error) console.warn('[supabase] custom division delete failed:', error.message);
          });
        }); },
      epNew:()=>{ const d=this.state.epDivision||'Content Writer'; const deptMap={'Content Writer':'Content','Graphics':'Design','Web Developers':'Web Development','SMM':'SMM','SEO':'SEO'}; this.setState({ epView:'create', epPlanId:null, epForm:{ ...this.EP_FORM(), name:'Jul '+d+' Effort Plan', dept:deptMap[d]||d }, epRows:this.EP_DIV_ROWS(d).map(r=>({...r})) }); },
      epBack:()=>this.setState({ epView:'list' }),
      epAddRow:()=>this.setState({ epRows:[...rows,{ type:'Custom effort — name it', icon:'plus', monthly:0, days:25, unit:'units', priority:'Medium', weight:0, kpiId:'', hours:1, custom:true }] }),
      epSave:()=>{ if(!canEdit){ this.flash('You do not have permission to create or edit effort plans.'); return; }
        const totalW=rows.reduce((s,r)=>s+(r.weight||0),0); if(!f.name.trim()){ this.flash('Name the plan.'); return; }
        // Mirrors _saveCampaign's OKR-window check (AppRoot.jsx ~1089) — an
        // effort plan can't run outside the objective it delivers either.
        // f.okr stores the OKR's title (see okrTitleOpt/okrSetOkr), not its
        // code, since that's what the picker's own options list is built from.
        if(f.okr && f.okr!=='— None —'){
          const okr=this.allOkrs().find(o=>o.title===f.okr);
          if(okr){
            const okrStart=new Date(okr.start), okrDue=new Date(okr.due);
            const pStart=f.start?new Date(f.start):null, pEnd=f.end?new Date(f.end):null;
            if(pStart && !isNaN(okrStart) && (pStart<okrStart||pStart>okrDue)){ this.flash('Effort plan start date must fall within "'+okr.title+'"’s duration ('+okr.start+' – '+okr.due+').'); return; }
            if(pEnd && !isNaN(okrDue) && (pEnd<okrStart||pEnd>okrDue)){ this.flash('Effort plan end date must fall within "'+okr.title+'"’s duration ('+okr.start+' – '+okr.due+').'); return; }
          }
        }
        // Check against every plan (seed + added), not just epAdded — editing
        // a seed plan (EP-001 etc.) must replace it, not create a duplicate
        // id when it later gets upserted into epAdded.
        const existing=this.allEpPlans().find(p=>p.id===this.state.epPlanId);
        const epNums=this._allEpIdsEver().map(id=>{ const m=String(id).match(/^EP-(\d+)$/); return m?parseInt(m[1],10):0; });
        const epId=this.state.epPlanId||('EP-'+String(Math.max(0,...epNums)+1).padStart(3,'0'));
        const plan={ id:epId, name:f.name, division, period:this.fmtMonth(f.quarter), owner:f.owner, dept:f.dept, campaign:f.campaign, okr:f.okr, start:this.fmtDate(f.start), end:this.fmtDate(f.end), type:f.type, status: totalW===100?'Active':'Draft', rows:rows.map(r=>({...r})) };
        const already=(this.state.epAdded||[]).some(p=>p.id===plan.id);
        const added= already ? (this.state.epAdded||[]).map(p=>p.id===plan.id?plan:p) : [...(this.state.epAdded||[]),plan];
        // epRows already includes any epRowAdds-appended rows (see the edit()
        // handler below, which seeds epRows from the already-merged
        // allEpPlans() output) — so they're now baked into plan.rows and the
        // overlay entry would double them up on the next read if left in place.
        const rowAdds={...(this.state.epRowAdds||{})}; delete rowAdds[plan.id];
        this.setState({ epAdded:added, epRowAdds:rowAdds, epView:'list', epPlanId:plan.id });
        this.flash('Effort plan “'+f.name+'” saved for '+division+(totalW===100?'.':' — weightages incomplete, saved as Draft.'));
        this._persistEpPlan(plan); },
      epForm:f, epRows2:epRows, epAlloc:alloc, epCanEdit:canEdit, epCanDelete:canDelete,
      epIsEdit:!!this.state.epPlanId,
      epEditTitle:this.state.epPlanId?('Edit effort plan · '+this.state.epPlanId):'Create effort plan',
      epEditSub:this.state.epPlanId?'Saved plan — every effort shows its linked KPI and the tasks generated from it.':'Define effort targets, convert them to KPIs and auto-generate tasks for the period.',
      epSaveLabel:this.state.epPlanId?'Save changes':'Save plan',
      epSetName:setF('name'), epSetQuarter:setF('quarter'), epSetDept:setF('dept'), epSetOwner:setF('owner'), epSetStart:setF('start'), epSetEnd:setF('end'), epSetType:setF('type'),
      // Changing the Linked OKR re-scopes every row's KPI options to the
      // new OKR's KRs — any row still pointing at a KPI from the old OKR
      // (now off the list) gets unlinked rather than silently keeping an
      // invalid reference the dropdown can no longer show as selected.
      epSetOkr:(e)=>{
        const newOkr=e.target.value;
        const pool=(newOkr && newOkr!=='— None —') ? this.epKpiPool().filter(k=>k.okr===newOkr) : this.epKpiPool();
        const validIds=new Set(pool.map(k=>k.id));
        const nextRows=rows.map(r=>{
          const kids=(r.kpiIds&&r.kpiIds.length)?r.kpiIds:(r.kpiId?[r.kpiId]:[]);
          const keep=kids.filter(id=>validIds.has(id));
          return keep.length===kids.length ? r : { ...r, kpiIds:keep, kpiId:keep[0]||'' };
        });
        this.setState({ epForm:{...f, okr:newOkr}, epRows:nextRows });
      },
      epTotalW:totalW+'%', epTotalWColor: totalW===100?'var(--verify-600)':'var(--danger-600)',
      epBalanced: totalW===100,
      epBalanceMsg: totalW===100?'All targets balanced — ready for task generation.':'Weightages must total 100% (currently '+totalW+'%).',
      epGenerated:this.state.epGenerated,
      epOwnerOptions:(this.state.users||[]).filter(u=>u.status==='Active').map(u=>u.name),
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
    const baseLen=added.length;
    const existingIds=this.allTasks().map(t=>t.id);
    const startFmt=this.fmtDate(f.start)||'Jul 1, 2026';
    const monthWord=startFmt.split(' ')[0];
    const year=startFmt.split(', ')[1]||'2026';
    const mk=(name,desc,units,end,checklist,r,k)=>{
      const id=this._nextSeqCode('TSK-', existingIds, 3200);
      existingIds.push(id);
      added.push({ id, name, desc, template:'Effort plan', project:f.campaign, campaign:f.campaign, start:f.start, end, startDate:f.start||'', endDate:end||'', priority:r.priority, assignee:r.assignee||f.owner, kpiId:r.kpiId||'', kpi:k?k.kpi:'Not linked', units, unit:r.unit, estH:0, actH:0, recurrence:'None', reviewer:who, effortPlan:f.name, effortType:r.type, division, checklist, dep:'—', evidence:[], status:'Assigned', activity:[[who,'Generated from effort plan “'+f.name+'”',this.todayStr()]] });
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
    const perEffortAssignees=new Set(rows.filter(r=>r.monthly&&r.assignee).map(r=>r.assignee));
    const assigneeNote = perEffortAssignees.size ? ('assigned per effort ('+[...perEffortAssignees].join(', ')+(rows.some(r=>r.monthly&&!r.assignee)?(', rest → '+f.owner):'')+')') : ('assigned to '+f.owner);
    this.flash(n+' task'+(n===1?'':'s')+' generated from '+rows.filter(r=>r.monthly).length+' effort line'+(rows.filter(r=>r.monthly).length===1?'':'s')+' · mode “'+mode+'” · '+assigneeNote+'.');
    added.slice(baseLen).forEach(t=>this._persistNewTask(t, f.start||null, null));
  }

  IDEAS(){ return [
    { id:'CI-001', title:'Plant Based Protein Benefits: Complete Guide', source:'SEO Audit', type:'Blog', category:'Nutrition', priority:'High', owner:'Sameer Iyer', service:'Content Writing', effortPlan:'Jul Content Effort Plan', quarter:'Q3 2026', publishMonth:'Aug 2026', keyword:'plant based protein benefits', intent:'Informational', objective:'Build topical authority around plant nutrition; target the featured snippet.', status:'Approved', qcFeedback:'QC approved — strong keyword cluster, proceed.', taskId:'', reuse:1 },
    { id:'CI-002', title:'Whey vs Plant Protein: Evidence-based Comparison', source:'Customer Question', type:'Blog', category:'Nutrition', priority:'High', owner:'Sameer Iyer', service:'Content Writing', effortPlan:'Jul Content Effort Plan', quarter:'Q3 2026', publishMonth:'Jul 2026', keyword:'plant protein vs whey', intent:'Commercial', objective:'Capture comparison-intent searches feeding the protein hub.', status:'Approved', qcFeedback:'QC approved — align with pillar page.', taskId:'TSK-2052', reuse:0 },
    { id:'CI-003', title:'FAQ: Nutraceutical Compliance for US Market', source:'Sales Team', type:'FAQ', category:'Compliance', priority:'Medium', owner:'Sameer Iyer', service:'Content Writing', effortPlan:'Jul Content Effort Plan', quarter:'Q3 2026', publishMonth:'Aug 2026', keyword:'nutraceutical fda compliance', intent:'Informational', objective:'Answer the top 12 pre-sales compliance questions.', status:'Submitted for QC', qcFeedback:'', taskId:'', reuse:0 },
    { id:'CI-004', title:'Infographic: Beetroot Bioavailability Pathways', source:'Research Team', type:'Infographic', category:'Science', priority:'Medium', owner:'Neha Verma', service:'Content Writing', effortPlan:'Jul Graphics Effort Plan', quarter:'Q3 2026', publishMonth:'Sep 2026', keyword:'beetroot bioavailability', intent:'Informational', objective:'Repurpose lab findings into shareable science visual.', status:'Idea Captured', qcFeedback:'', taskId:'', reuse:0 },
    { id:'CI-005', title:'Case Study: 3× Organic Traffic for Food Research Lab', source:'Employee', type:'Case Study', category:'Marketing', priority:'Low', owner:'Sameer Iyer', service:'SEO', effortPlan:'Jul Content Effort Plan', quarter:'Q3 2026', publishMonth:'Sep 2026', keyword:'seo case study food industry', intent:'Commercial', objective:'Social proof asset for sales; reusable across decks.', status:'Idea Captured', qcFeedback:'', taskId:'', reuse:2 },
  ]; }
  allIdeas(){
    const added=this.state.ideaAdded||[];
    const addedIds=new Set(added.map(i=>i.id));
    const del=this.state.ideaDeleted||[];
    return this.IDEAS().filter(i=>!addedIds.has(i.id)).concat(added).filter(i=>!del.includes(i.id)).map(i=>({ ...i, ...((this.state.ideaUpd||{})[i.id]||{}) }));
  }
  ideaPatch(id,patch){
    const u={...(this.state.ideaUpd||{})};
    const cur=this.allIdeas().find(x=>x.id===id)||{};
    u[id]={...(u[id]||{}),...patch}; this.setState({ ideaUpd:u });
    const nx={...cur,...patch};
    supabase.from('ideas').upsert({ id, payload:nx, created_by:this.state.authUser?this.state.authUser.id:null }).then(({error})=>{
      if(error) console.warn('[supabase] idea upsert failed:', error.message);
    });
  }
  _deleteIdea(id){
    if(!this.hasPerm('ideas','delete')){ this.flash('You do not have permission to delete ideas.'); return; }
    const i=this.allIdeas().find(x=>x.id===id); if(!i) return;
    this.setState({ ideaDeleted:[...(this.state.ideaDeleted||[]), id], ideaOpen:null });
    this.flash('Deleted idea '+id+'.');
    // upsert (not update) — a seed idea that's never been edited has no DB
    // row yet, so this is what makes the deletion stick past reload.
    supabase.from('ideas').upsert({ id, payload:i||{}, deleted:true, created_by:this.state.authUser?this.state.authUser.id:null }).then(({error})=>{
      if(error) console.warn('[supabase] idea delete failed:', error.message);
    });
  }
  ideaTone(s){ return {'Idea Captured':{bg:'var(--surface-50)',c:'var(--ink-500)'},'Submitted for QC':{bg:'var(--orchid-100)',c:'var(--orchid-700)'},'Approved':{bg:'var(--verify-100)',c:'var(--verify-600)'},'Rework':{bg:'var(--danger-100)',c:'var(--danger-600)'}}[s]||{bg:'var(--surface-50)',c:'var(--ink-500)'}; }
  ideaToTask(i){
    // open the convert step — effort line decides how many tasks are generated
    const plan=this.allEpPlans().find(p=>p.name===i.effortPlan)||this.allEpPlans()[0];
    const qcUser=(this.state.users||[]).find(u=>u.roleKey==='qc');
    this.setState({ cvIdea:i.id, cvForm:{ planId:plan?plan.id:'', rowType:'', kpiMode:'existing', kpiId:'', newKpiName:'', newKpiUnit:'', newKpiTarget:'', count:'1', assignee:i.owner||this.currentPerson(), start:'', end:'', reviewer:qcUser?(qcUser.name+' (QC)'):this.currentPerson() } });
  }
  convertData(){
    const iid=this.state.cvIdea; if(!iid) return { cvOpen:false };
    const i=this.allIdeas().find(x=>x.id===iid); if(!i) return { cvOpen:false };
    const f=this.state.cvForm||{};
    const set=(k)=>(e)=>this.setState({ cvForm:{...f,[k]:e.target.value} });
    const plans=this.allEpPlans();
    const plan=plans.find(p=>p.id===f.planId);
    const row=plan&&(plan.rows||[]).find(r=>r.type===f.rowType);
    const kpiPool=this.epKpiPool();
    const isNew=f.kpiMode==='new';
    return {
      cvOpen:true, cvIdeaTitle:i.title, cvIdeaId:i.id, cvf:f,
      cvClose:()=>this.setState({ cvIdea:null, cvForm:{} }),
      cvStop:(e)=>e.stopPropagation(),
      cvPlanOptions:[{v:'',label:'— Select an effort plan —'}].concat(plans.map(p=>({v:p.id,label:p.id+' · '+p.name+' — '+p.division}))),
      cvSetPlan:(e)=>this.setState({ cvForm:{...f, planId:e.target.value, rowType:'', kpiId:'', count:'1'} }),
      cvRowOptions:plan?[{v:'',label:'— Select the effort line this idea delivers —'}].concat((plan.rows||[]).map(r=>({v:r.type,label:r.type+' — '+(r.monthly||0)+' '+r.unit+' / month'}))):[{v:'',label:'Pick an effort plan first'}],
      cvSetRow:(e)=>{ const v=e.target.value; const r=plan&&(plan.rows||[]).find(x=>x.type===v);
        const kid=r?((r.kpiIds&&r.kpiIds[0])||r.kpiId||''):'';
        this.setState({ cvForm:{...f, rowType:v, kpiId:kid, kpiMode:kid?'existing':f.kpiMode, count:r?String(r.monthly||1):'1'} });
        if(r) this.flash('Effort "'+v+'" sets '+(r.monthly||1)+' task'+((r.monthly||1)===1?'':'s')+(kid?' and links its KPI.':'.')); },
      cvEffortInfo:row?(row.monthly+' '+row.unit+' / month · priority '+row.priority):'',
      cvHasRow:!!row,
      cvKpiExisting:!isNew, cvKpiNew:isNew,
      cvModeBtns:[{k:'existing',l:'Link existing KPI'},{k:'new',l:'Create new KPI'}].map(m=>({ label:m.l,
        style:'flex:1;padding:8px 12px;border-radius:9px;font-size:12px;font-weight:700;cursor:pointer;border:1px solid '+(f.kpiMode===m.k?'var(--beet-700)':'var(--line-300)')+';background:'+(f.kpiMode===m.k?'var(--beet-700)':'var(--paper)')+';color:'+(f.kpiMode===m.k?'#fff':'var(--ink-700)'),
        set:()=>this.setState({ cvForm:{...f,kpiMode:m.k} }) })),
      cvKpiOptions:[{v:'',label:'— Select a KPI —'}].concat(kpiPool.map(k=>({v:k.id,label:k.kpi+' — '+k.who+' ('+k.target+' '+k.unit+')'}))),
      cvSetKpi:set('kpiId'), cvSetNewKpiName:set('newKpiName'), cvSetNewKpiUnit:set('newKpiUnit'), cvSetNewKpiTarget:set('newKpiTarget'),
      cvSetCount:set('count'), cvSetAssignee:set('assignee'), cvSetStart:set('start'), cvSetEnd:set('end'), cvSetReviewer:set('reviewer'),
      cvAssignees:(this.state.users||[]).map(u=>u.name),
      cvReviewers:(this.state.users||[]).filter(u=>['manager','team_lead','qc'].includes(u.roleKey)).map(u=>u.name+' ('+u.role+')'),
      cvCountNote:(()=>{ const n=parseInt(f.count,10)||0; return n+' task'+(n===1?'':'s')+' will be created'+(row?(' — from the effort target of '+row.monthly+' '+row.unit):'')+'.'; })(),
      cvSave:()=>{
        if(!f.rowType){ this.flash('Select the effort line — it decides how many tasks are created.'); return; }
        if(f.kpiMode==='existing'&&!f.kpiId){ this.flash('Link a KPI, or switch to Create new KPI.'); return; }
        if(f.kpiMode==='new'&&!(f.newKpiName||'').trim()){ this.flash('Name the new KPI.'); return; }
        const n=Math.max(1,Math.min(60,parseInt(f.count,10)||1));
        const who=this.currentPerson();
        const k=kpiPool.find(x=>x.id===f.kpiId);
        const kpiName=f.kpiMode==='new'?f.newKpiName.trim():(k?k.kpi:'Not linked');
        const kpiUnit=f.kpiMode==='new'?(f.newKpiUnit||'units'):(k?k.unit:'');
        const existingIds=this.allTasks().map(t=>t.id);
        const added=[];
        for(let n2=0;n2<n;n2++){
          const id=this._nextSeqCode('TSK-', existingIds, 3200);
          existingIds.push(id);
          added.push({ id, name:i.title+(n>1?(' — '+(n2+1)+'/'+n):''), desc:(i.objective||'Approved content idea')+' · Keyword: '+(i.keyword||'—'),
            template:'Write Article', project:i.service||'Content', campaign:plan?plan.campaign:'—',
            start:this.fmtDate(f.start)||this.relDate(0), end:this.fmtDate(f.end)||this.relDate(14),
            startDate:f.start||'', endDate:f.end||'',
            priority:(row&&row.priority)||i.priority||'Medium', assignee:f.assignee||who,
            kpiId:f.kpiMode==='new'?'':(f.kpiId||''), kpi:kpiName, units:1, unit:kpiUnit||(row&&row.unit)||'articles',
            estH:10, actH:0, recurrence:'None', reviewer:f.reviewer||who,
            effortPlan:plan?plan.name:'', effortPlanId:plan?plan.id:'', effortType:f.rowType, contentIdea:i.id,
            checklist:[{t:'Draft complete',done:false},{t:'SEO pass',done:false},{t:'Editor review',done:false}],
            dep:'—', evidence:[], status:'Assigned', division:plan?plan.division:'Content',
            activity:[[who,'Generated from approved idea '+i.id+' · effort "'+f.rowType+'"',this.todayStr()]] });
        }
        this.setState({ tkAdded:[...(this.state.tkAdded||[]),...added], cvIdea:null, cvForm:{},
          tkFilter:'All', tkFilters:{status:'All',priority:'All',assignee:'All'} });
        this.ideaPatch(i.id,{ taskId:added[0].id, taskIds:added.map(t=>t.id), effortPlan:plan?plan.name:'', effortRow:f.rowType, kpiName });
        this.flash(n+' task'+(n===1?'':'s')+' generated from '+i.id+' — linked to effort "'+f.rowType+'" and KPI "'+kpiName+'".');
        added.forEach(t=>this._persistNewTask(t, f.start||null, f.end||null));
      },
    };
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
        this.setState({ ideaAdded:[...(this.state.ideaAdded||[]),clone] }); this.ideaPatch(i.id,{reuse:(i.reuse||0)+1}); this.flash('Idea duplicated as '+nid+' — stored for reuse.');
        supabase.from('ideas').insert({ id:nid, payload:clone, created_by:this.state.authUser?this.state.authUser.id:null }).then(({error})=>{
          if(error) console.warn('[supabase] idea insert failed:', error.message);
        }); },
      openTask:(e)=>{ if(e)e.stopPropagation(); if(i.taskId) this.setState({ route:'tasks', tkOpen:i.taskId }); },
    };});
    const all=this.allIdeas();
    const pg=this.pgData('ideas',rows,7);
    const setF=(k)=>(e)=>this.setState({ ideaFilters:{...F,[k]:e.target.value}, pg:{...(this.state.pg||{}),ideas:0} });
    return {
      ideaStats:[
        {label:'Content ideas',value:String(all.length),color:'var(--ink-900)',icon:'lightbulb'},
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
    const stepBtn=(n,label)=>({ n:String(n), label, active:step===n, style:'display:flex;align-items:center;gap:7px;padding:7px 13px;border-radius:999px;font-size:12px;font-weight:700;cursor:pointer;border:1px solid '+(step===n?'var(--beet-700)':'var(--line-300)')+';background:'+(step===n?'var(--beet-700)':'var(--paper)')+';color:'+(step===n?'#fff':'var(--ink-500)'), go:()=>this.setState({ ideaStep:n }) });
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
        return { idfRefs:refs.rows, idfAddRef:refs.add, idfStats:stats.rows, idfAddStat:stats.add, idfExt:ext.rows, idfAddExt:ext.add, idfInt:intr.rows, idfAddInt:intr.add,
          idfAtts:atts.map((a,i)=>({ i, ...a, isImg:a.kind==='Image', icon:a.kind==='Image'?'image':'file-text',
            setCategory:(e)=>{ const arr=atts.map((x,j)=>j===i?{...x,category:e.target.value}:x); this.setState({ ideaForm:{...f,attachments:arr} }); },
            setDesc:(e)=>{ const arr=atts.map((x,j)=>j===i?{...x,desc:e.target.value}:x); this.setState({ ideaForm:{...f,attachments:arr} }); },
            setName:(e)=>{ const arr=atts.map((x,j)=>j===i?{...x,name:e.target.value}:x); this.setState({ ideaForm:{...f,attachments:arr} }); },
            remove:()=>{ const arr=atts.slice(); arr.splice(i,1); this.setState({ ideaForm:{...f,attachments:arr} }); } })),
          idfHasAtts:atts.length>0,
          idfAddDoc:()=>this.openFilePicker('idea:Document','Attach document to idea'),
          idfAddImg:()=>{ this.openFilePicker('idea:Image','Attach image to idea'); this.setState({ fpType:'Image', fpKind:'Image' }); },
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
        style:'flex:1;display:flex;align-items:center;justify-content:center;gap:7px;padding:9px 14px;border-radius:10px;font-size:12.5px;font-weight:700;cursor:pointer;border:1px solid '+(active?'var(--beet-700)':'var(--line-300)')+';background:'+(active?'var(--beet-700)':'var(--paper)')+';color:'+(active?'#fff':'var(--ink-700)'),
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
      idfTypeOptions:opts('type',this.MASTERS_REG().contentType.rows.filter(r=>r.Status!=='Inactive').map(r=>r.Content_Type)),
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
      idApprove:()=>{ const note=(this.state.qcFb||{})[i.id]||''; this.ideaPatch(i.id,{status:'Approved', qcFeedback:note?('QC approved — '+note):'QC approved', comments:[...(i.comments||[]),{who:this.currentPerson(),role:me.label+' (QC)',text:'Approved. '+note,when:this.todayStr()}]}); this.flash(i.id+' approved — move it to Tasks from the Content repository.'); },
      idRework:()=>{ const note=(this.state.qcFb||{})[i.id]||''; if(!note.trim()){ this.flash('Enter QC feedback before requesting rework.'); return; } this.ideaPatch(i.id,{status:'Rework', qcFeedback:'Rework — '+note, comments:[...(i.comments||[]),{who:this.currentPerson(),role:me.label+' (QC)',text:'Rework requested. '+note,when:this.todayStr()}]}); this.flash('Rework requested — feedback sent to '+i.owner+'.'); },
      idComments:(i.comments||[]).map(c=>({ who:c.who, role:c.role, text:c.text, when:c.when, initial:(c.who||'?').charAt(0) })),
      idHasComments:(i.comments||[]).length>0,
      idCmtVal:(this.state.ideaCmt||{})[i.id]||'',
      idOnCmt:(e)=>this.setState({ ideaCmt:{...(this.state.ideaCmt||{}),[i.id]:e.target.value} }),
      idAddCmt:()=>{ const txt=((this.state.ideaCmt||{})[i.id]||'').trim(); if(!txt){ this.flash('Write a comment first.'); return; }
        this.ideaPatch(i.id,{comments:[...(i.comments||[]),{who:this.currentPerson(),role:me.label,text:txt,when:this.todayStr()}]});
        this.setState({ ideaCmt:{...(this.state.ideaCmt||{}),[i.id]:''} }); this.flash('Comment posted on '+i.id+'.'); },
      idCanConvert: ['manager','team_lead','admin'].includes(rk) && i.status==='Approved' && !i.taskId,
      idConvert:()=>this.ideaToTask(i),
      idCanDelete: this.hasPerm('ideas','delete'),
      idDelete:()=>this.confirmDelete('Delete Idea?', 'Are you sure you want to delete "'+(i.title||i.id)+'"? This action cannot be undone.', ()=>this._deleteIdea(i.id)),
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
        const sops=this.sopsForKpi(k.kpi);
        return { n:String(i+1), t:k.t, kpi:k.kpi, baseline:k.baseline, target:k.target, current:k.current, unit:k.unit,
          measured:(k.tool||k.method)?((k.tool||'No tool')+' · '+(k.method||'method not set')+(k.mfreq?(' · '+k.mfreq):'')):'Measurement not configured',
          evidenceLabel:k.evidence?('Evidence: '+k.evidence):'No evidence requirement set',
          hasMeasure:!!(k.tool||k.method),
          sopList:sops.map(sp=>({ id:sp.id, title:sp.title, version:sp.version, status:sp.status,
            bg:this.sopTone(sp.status).bg, color:this.sopTone(sp.status).c,
            steps:(sp.steps||[]).length+' steps · '+sp.frequency,
            open:()=>this.setState({ okrOpen:null, route:'sop', sopTab:'sops', sopOpen:sp.id, sopTabD:'overview' }) })),
          hasSops:sops.length>0,
          sopLabel:sops.length?(sops.length+' SOP'+(sops.length===1?' governs':'s govern')+' how this KPI is delivered'):'',
          ach:ach+'%', achColor:pc(ach), achW:Math.min(100,ach)+'%', weight:k.weight+'%', who:k.who, freq:k.freq, due:k.due, status:k.status, statusBg:ks.bg, statusColor:ks.color, linked, hasLinked:linked.length>0, linkedCount:linked.length+' linked task'+(linked.length===1?'':'s') };
      }),
      okClose:()=>this.setState({ okrOpen:null }),
      okStop:(e)=>e.stopPropagation(),
    };
  }
  idfSave(toQC){
    if(!this.hasPerm('ideas','create')){ this.flash('You do not have permission to create content ideas.'); return; }
    const f=this.state.ideaForm||{};
    if(!f.title||!f.title.trim()){ this.flash('Enter a content title.'); return; }
    const id='CI-'+String(this.allIdeas().length+1).padStart(3,'0');
    const idea={ id, title:f.title.trim(), workingTitle:f.workingTitle||'', source:f.source||'Employee', type:f.type||'Blog', category:f.category||'—', subCategory:f.subCategory||'', priority:f.priority||'Medium', owner:f.owner||'Sameer Iyer', service:(f.service&&f.service.indexOf('—')!==0)?f.service:'Content Writing', campaign:(f.campaign&&f.campaign.indexOf('—')!==0)?f.campaign:'', effortPlan:f.effortPlan||(this.allEpPlans()[0]||{}).name||'', quarter:'Q3 2026', publishMonth:this.fmtMonth(f.publishMonth)||'Sep 2026', keyword:f.keyword||'', secondaryKw:f.secondaryKw||'', intent:f.intent||'Informational', cluster:f.cluster||'', pillar:f.pillar||'', audience:f.audience||'', journey:f.journey||'', goal:f.goal||'', wordCount:f.wordCount||'', internalLinks:f.internalLinks||'', extRefs:f.extRefs||'', competitorUrls:f.competitorUrls||'', reason:f.reason||'', notes:f.notes||'', objective:f.objective||'',
      wcMin:f.wcMin||'', wcMax:f.wcMax||'', recLength:f.recLength||'', readLevel:f.readLevel||'', metaTitle:f.metaTitle||'', metaDesc:f.metaDesc||'', slug:f.slug||'', featImg:f.featImg||'',
      refs:(f.refs||[]).filter(r=>r.title&&r.title.trim()), stats:(f.stats||[]).filter(r=>r.stat&&r.stat.trim()), extRes:(f.extRes||[]).filter(r=>r.name&&r.name.trim()), intRes:(f.intRes||[]).filter(r=>r.name&&r.name.trim()), attachments:(f.attachments||[]).filter(a=>a.name&&a.name.trim()),
      pubDest:f.pubDest||'Internal', intType:f.intType||'', intUrl:f.intUrl||'', extUrl:f.extUrl||'', extCat:f.extCat||'', status: toQC?'Submitted for QC':'Idea Captured', qcFeedback:'', taskId:'', reuse:0 };
    this.setState({ ideaAdded:[...(this.state.ideaAdded||[]),idea], showIdeaForm:false, ideaForm:{}, ideaStep:1 });
    this.flash(id+' created'+(toQC?' — sent to QC Review for approval.':' — saved as captured idea.'));
    supabase.from('ideas').insert({ id, payload:idea, created_by:this.state.authUser?this.state.authUser.id:null }).then(({error})=>{
      if(error) console.warn('[supabase] idea insert failed:', error.message);
    });
  }
  TASK_TEMPLATES(){ return [
    { id:'TPL-001', name:'Update Meta Descriptions', division:'SEO', desc:'Rewrite meta descriptions for target pages using primary keywords.', kpiId:'jr1', unit:'pages', estH:8, priority:'High', recurrence:'None', status:'Active', owner:'Priya Nair', updated:'Jun 12, 2026', checklist:['Pull page list from GSC','Write descriptions ≤160 chars','QA in SERP preview'] },
    { id:'TPL-002', name:'Fix Broken Links', division:'SEO', desc:'Repair or redirect broken internal/outbound links found in crawl.', kpiId:'jr2', unit:'links', estH:10, priority:'High', recurrence:'Monthly', status:'Active', owner:'Priya Nair', updated:'Jun 12, 2026', checklist:['Run crawl report','Fix or redirect links','Re-crawl to verify'] },
    { id:'TPL-003', name:'Add Alt Text', division:'SEO', desc:'Add descriptive alt text to images missing accessibility metadata.', kpiId:'jr3', unit:'images', estH:4, priority:'Medium', recurrence:'Monthly', status:'Active', owner:'Aditi Rao', updated:'May 30, 2026', checklist:['Audit missing alt text','Write descriptive alts','Spot-check accessibility'] },
    { id:'TPL-004', name:'Keyword Research', division:'SEO', desc:'Build intent-clustered keyword lists mapped to landing pages.', kpiId:'sr2', unit:'keywords', estH:6, priority:'High', recurrence:'Quarterly', status:'Active', owner:'Priya Nair', updated:'Jun 2, 2026', checklist:['Seed list from Semrush','Cluster by intent','Map to landing pages'] },
    { id:'TPL-005', name:'Write Article', division:'Content', desc:'Long-form article from approved outline through editor review.', kpiId:'sr3', unit:'articles', estH:12, priority:'High', recurrence:'None', status:'Active', owner:'Aditi Rao', updated:'Jun 20, 2026', checklist:['Outline approved','Draft complete','SEO pass','Editor review'] },
    { id:'TPL-006', name:'Custom task', division:'All', desc:'Blank template — define scope and acceptance criteria per task.', kpiId:'', unit:'', estH:0, priority:'Medium', recurrence:'None', status:'Active', owner:'Admin', updated:'Jan 5, 2026', checklist:['Define acceptance criteria'] },
  ]; }
  allTaskTemplates(){ const upd=this.state.ttUpd||{}; const added=this.state.ttAdded||[]; const addedIds=new Set(added.map(t=>t.id));
    const del=this.state.ttDeleted||[];
    return this.TASK_TEMPLATES().filter(t=>!addedIds.has(t.id)).concat(added).filter(t=>!del.includes(t.id)).map(t=>upd[t.id]?{...t,...upd[t.id]}:t); }
  _deleteTemplate(id, kind){
    if(!this.hasPerm('templates','delete')){ this.flash('You do not have permission to delete templates.'); return; }
    const getAll={ task:()=>this.allTaskTemplates(), okr:()=>this.allOkrTemplates(), kpi:()=>this.allKpiTemplates() }[kind];
    const delKey={ task:'ttDeleted', okr:'otDeleted', kpi:'ktDeleted' }[kind];
    const t=getAll().find(x=>x.id===id); if(!t) return;
    this.setState({ [delKey]:[...(this.state[delKey]||[]), id] });
    this.flash('Deleted template: '+(t.name||id)+'.');
    // upsert (not update) — a seed template that's never been edited has no
    // DB row yet, so this is what makes the deletion stick past reload.
    supabase.from('templates').upsert({ id, kind, payload:t||{}, deleted:true, created_by:this.state.authUser?this.state.authUser.id:null }).then(({error})=>{
      if(error) console.warn('[supabase] template delete failed:', error.message);
    });
  }
  UNIT_MASTER(){ return ['%','Count','Sessions','Users','Visitors','Leads','Keywords','Backlinks','Articles','Pages','Posts','Reels','Impressions','Clicks','CTR %','Ranking position','Score (0–100)','Words','Hours','Days','Seconds','₹ (INR)','$ (USD)','Ratio','Index','Errors','Tickets','Conversions','Conversion rate %','Engagement rate %','Bounce rate %','Domain Authority','Spam score %','Plagiarism %','Readability score','Case studies','Documents','Designs','Infographics','Assets','Fixes']; }
  normUnit(u){
    const s=String(u||'').trim(); if(!s) return 'Count';
    const master=this.UNIT_MASTER();
    const hit=master.find(m=>m.toLowerCase()===s.toLowerCase()); if(hit) return hit;
    const map={ 'case studies':'Case studies', documents:'Documents', fixes:'Fixes', designs:'Designs',
      infographics:'Infographics', assets:'Assets', replies:'Count', contacts:'Count', stories:'Count',
      videos:'Count', banners:'Assets', mockups:'Designs', 'landing pages':'Pages', audits:'Count' };
    if(map[s.toLowerCase()]) return map[s.toLowerCase()];
    const title=s.charAt(0).toUpperCase()+s.slice(1);
    return master.includes(title)?title:'Count';
  }
  effortTargetOptions(){
    const out=[];
    this.allEpPlans().forEach(p=>(p.rows||[]).forEach(r=>{
      out.push({ key:p.id+'|'+r.type, label:r.type+' — '+r.monthly+' '+r.unit+' ('+p.division+' · '+p.period+')',
        target:String(r.monthly), unit:this.normUnit(r.unit), plan:p.name, division:p.division, kpiId:r.kpiId||'' });
    }));
    return out;
  }
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
    const canEdit=this.hasPerm('templates','edit');
    const canDeleteTemplate=this.hasPerm('templates','delete');
    const F=this.state.ttFilters||{division:'All',status:'All'};
    const setF=(k)=>(e)=>this.setState({ ttFilters:{...F,[k]:e.target.value}, pg:{...(this.state.pg||{}),tt:0} });
    const all=this.allTaskTemplates();
    const kpiPool=this.epKpiPool();
    const used=(t)=>this.allTasks().filter(x=>x.template===t.name).length;
    const list=all.filter(t=> (F.division==='All'||t.division===F.division) && (F.status==='All'||t.status===F.status) );
    const K=(label,value,color)=>({label,value,color});
    const ttStats=[K('Templates',String(all.length),'var(--ink-900)'),K('Active',String(all.filter(t=>t.status==='Active').length),'var(--verify-600)'),K('KPI-linked',String(all.filter(t=>t.kpiId).length),'var(--orchid-600)'),K('Tasks created from templates',String(this.allTasks().filter(t=>t.template&&t.template!=='Custom task').length),'var(--info-600)')];
    const pg=this.pgData('tt',list.map(t=>{
      const k=kpiPool.find(x=>x.id===t.kpiId);
      return { ...t, estH:(t.estH||0)+' h', kpiLabel:k?k.kpi:'—', hasKpi:!!k, steps:t.checklist.length+' steps', used:String(used(t)),
        statusBg:t.status==='Active'?'var(--verify-100)':'var(--surface-50)', statusColor:t.status==='Active'?'var(--verify-600)':'var(--ink-500)',
        priDot:{Critical:'var(--danger-500)',High:'var(--warn-500)',Medium:'var(--verify-500)',Low:'var(--info-500)'}[t.priority]||'var(--ink-400)',
        edit:()=>this.setState({ ttNew:true, ttEditId:t.id, ttForm:{...t, checklist:t.checklist.slice()} }),
        duplicate:()=>{ const dupIds=this.TASK_TEMPLATES().map(x=>x.id).concat((this.state.ttAdded||[]).map(x=>x.id)).concat(this.state.ttDeleted||[]);
          const dupNums=dupIds.map(id=>{ const m=String(id).match(/^TPL-(\d+)$/); return m?parseInt(m[1],10):0; });
          const nid='TPL-'+String(Math.max(100,...dupNums)+1).padStart(3,'0');
          const copy={...t,id:nid,name:t.name+' (copy)',status:'Draft',owner:this.currentPerson(),updated:this.todayStr()};
          this.setState({ ttAdded:[...(this.state.ttAdded||[]),copy] }); this.flash('Template duplicated as '+nid+' (Draft).');
          supabase.from('templates').insert({ id:nid, kind:'task', payload:copy, created_by:this.state.authUser?this.state.authUser.id:null }).then(({error})=>{
            if(error) console.warn('[supabase] task template insert failed:', error.message);
          }); },
        toggleStatus:()=>{ const ns=t.status==='Active'?'Archived':'Active'; const nx={...t,status:ns,updated:this.todayStr()};
          this.setState({ ttUpd:{...(this.state.ttUpd||{}),[t.id]:{...(this.state.ttUpd||{})[t.id],status:ns,updated:this.todayStr()}} }); this.flash(t.id+' '+(ns==='Active'?'activated':'archived')+'.');
          supabase.from('templates').upsert({ id:t.id, kind:'task', payload:nx, created_by:this.state.authUser?this.state.authUser.id:null }).then(({error})=>{
            if(error) console.warn('[supabase] task template upsert failed:', error.message);
          }); },
        statusAction:t.status==='Active'?'Archive':'Activate',
        delete:()=>this.confirmDelete('Delete Template?', 'Are you sure you want to delete "'+t.name+'"? This action cannot be undone.', ()=>this._deleteTemplate(t.id,'task')),
      };
    }),8);
    // form
    const f=this.state.ttForm||{};
    const setTf=(k)=>(e)=>this.setState({ ttForm:{...f,[k]:e.target.value} });
    const cl=f.checklist||[''];
    // KPI templates tab
    const tab=this.state.ttTab||'task';
    const seg2=(active)=>'display:flex;align-items:center;gap:7px;padding:8px 15px;border:none;border-radius:9px;font-size:13px;font-weight:700;cursor:pointer;'+(active?'background:var(--paper);color:var(--ink-900);box-shadow:var(--shadow-sm)':'background:none;color:var(--ink-500)');
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
      duplicate:()=>{ const dupIds=this.KPI_TEMPLATES().map(x=>x.id).concat((this.state.ktAdded||[]).map(x=>x.id)).concat(this.state.ktDeleted||[]);
        const dupNums=dupIds.map(id=>{ const m=String(id).match(/^kt(\d+)c$/); return m?parseInt(m[1],10):0; });
        const nid='kt'+(Math.max(0,...dupNums)+1)+'c';
        const copy={...t,id:nid,name:t.name+' (copy)',status:'Disabled',owner:this.currentPerson(),updated:this.todayStr()};
        this.setState({ ktAdded:[...(this.state.ktAdded||[]),copy] }); this.flash('KPI template duplicated (Disabled).');
        supabase.from('templates').insert({ id:nid, kind:'kpi', payload:copy, created_by:this.state.authUser?this.state.authUser.id:null }).then(({error})=>{
          if(error) console.warn('[supabase] kpi template insert failed:', error.message);
        }); },
      toggleStatus:()=>{ const ns=t.status==='Active'?'Disabled':'Active'; const nx={...t,status:ns,updated:this.todayStr()};
        this.setState({ ktUpd:{...(this.state.ktUpd||{}),[t.id]:{...(this.state.ktUpd||{})[t.id],status:ns,updated:this.todayStr()}} }); this.flash(t.name+' '+(ns==='Active'?'activated':'disabled')+'.');
        supabase.from('templates').upsert({ id:t.id, kind:'kpi', payload:nx, created_by:this.state.authUser?this.state.authUser.id:null }).then(({error})=>{
          if(error) console.warn('[supabase] kpi template upsert failed:', error.message);
        }); },
      statusAction:t.status==='Active'?'Disable':'Activate',
      delete:()=>this.confirmDelete('Delete Template?', 'Are you sure you want to delete "'+t.name+'"? This action cannot be undone.', ()=>this._deleteTemplate(t.id,'kpi')),
    })),8);
    const ktStats=[K('KPI templates',String(allK.length),'var(--ink-900)'),K('Active',String(allK.filter(t=>t.status==='Active').length),'var(--verify-600)'),K('Auto-tracked (API source)',String(allK.filter(t=>t.source!=='KPI Log'&&t.source!=='Manual').length),'var(--info-600)'),K('Pulled into tasks / KRs',String(allK.reduce((s,t)=>s+ktUsage(t),0)),'var(--orchid-600)')];
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
      duplicate:()=>{ const dupIds=this.OKR_TEMPLATES().map(x=>x.id).concat((this.state.otAdded||[]).map(x=>x.id)).concat(this.state.otDeleted||[]);
        const dupNums=dupIds.map(id=>{ const m=String(id).match(/^ot(\d+)c$/); return m?parseInt(m[1],10):0; });
        const nid='ot'+(Math.max(0,...dupNums)+1)+'c';
        const copy={...t,id:nid,name:t.name+' (copy)',status:'Draft',owner:this.currentPerson(),updated:this.todayStr()};
        this.setState({ otAdded:[...(this.state.otAdded||[]),copy] }); this.flash('OKR template duplicated (Draft).');
        supabase.from('templates').insert({ id:nid, kind:'okr', payload:copy, created_by:this.state.authUser?this.state.authUser.id:null }).then(({error})=>{
          if(error) console.warn('[supabase] okr template insert failed:', error.message);
        }); },
      toggleStatus:()=>{ const ns=t.status==='Active'?'Archived':'Active'; const nx={...t,status:ns,updated:this.todayStr()};
        this.setState({ otUpd:{...(this.state.otUpd||{}),[t.id]:{...(this.state.otUpd||{})[t.id],status:ns,updated:this.todayStr()}} }); this.flash(t.name+' '+(ns==='Active'?'activated':'archived')+'.');
        supabase.from('templates').upsert({ id:t.id, kind:'okr', payload:nx, created_by:this.state.authUser?this.state.authUser.id:null }).then(({error})=>{
          if(error) console.warn('[supabase] okr template upsert failed:', error.message);
        }); },
      statusAction:t.status==='Active'?'Archive':'Activate',
      delete:()=>this.confirmDelete('Delete Template?', 'Are you sure you want to delete "'+t.name+'"? This action cannot be undone.', ()=>this._deleteTemplate(t.id,'okr')),
    })),8);
    const otStats=[K('OKR templates',String(allO.length),'var(--ink-900)'),K('Active',String(allO.filter(t=>t.status==='Active').length),'var(--verify-600)'),K('KPI-linked key results',String(allO.reduce((s,t)=>s+t.krs.length,0)),'var(--orchid-600)'),K('Departments covered',String([...new Set(allO.map(t=>t.division))].length),'var(--info-600)')];
    const otKpiNames=this.allKpiTemplates().filter(t=>t.status==='Active').map(t=>t.name);
    return {
      ttTabTask:tab==='task', ttTabKpi:tab==='kpi', ttTabOkr:tab==='okr',
      ttSegTaskStyle:seg2(tab==='task'), ttSegKpiStyle:seg2(tab==='kpi'), ttSegOkrStyle:seg2(tab==='okr'),
      ttShowTask:()=>this.setState({ ttTab:'task' }), ttShowKpi:()=>this.setState({ ttTab:'kpi' }), ttShowOkr:()=>this.setState({ ttTab:'okr' }),
      otRows:opg.rows, otPg:opg, otStats,
      otNew:this.state.otNew, otf:of2,
      otFormTitle:this.state.otEditId?'Edit OKR template':'New OKR template',
      otClose:()=>this.setState({ otNew:false, otEditId:null, otForm:{} }),
      otDivisionOptions:this.liveDeptOptions(),
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
        if(!this.hasPerm('templates', this.state.otEditId?'edit':'create')){ this.flash('You do not have permission to '+(this.state.otEditId?'edit':'create')+' templates.'); return; }
        if(!(of2.name&&of2.name.trim())){ this.flash('Enter a template name.'); return; }
        const krs=(of2.krs||[]).filter(k=>k.t&&k.t.trim());
        if(!krs.length){ this.flash('Add at least one key result.'); return; }
        const rec={ name:of2.name.trim(), category:of2.category||'SEO', scope:of2.scope||'Department', division:of2.division||'SEO', objective:of2.objective||'', desc:of2.desc||'', status:of2.status||'Active', krs, owner:this.currentPerson(), updated:this.todayStr() };
        if(this.state.otEditId){
          const editId=this.state.otEditId;
          const existing=this.allOkrTemplates().find(x=>x.id===editId);
          this.setState({ otUpd:{...(this.state.otUpd||{}),[editId]:rec}, otNew:false, otEditId:null, otForm:{} }); this.flash('OKR template updated.');
          supabase.from('templates').upsert({ id:editId, kind:'okr', payload:{...existing,...rec,id:editId}, created_by:this.state.authUser?this.state.authUser.id:null }).then(({error})=>{
            if(error) console.warn('[supabase] okr template upsert failed:', error.message);
          });
        } else {
          const otIds=this.OKR_TEMPLATES().map(t=>t.id).concat((this.state.otAdded||[]).map(t=>t.id)).concat(this.state.otDeleted||[]);
          const otNums=otIds.map(id=>{ const m=String(id).match(/^ot(\d+)$/); return m?parseInt(m[1],10):0; });
          const nid='ot'+(Math.max(0,...otNums)+1); const okrec={id:nid,...rec};
          this.setState({ otAdded:[...(this.state.otAdded||[]),okrec], otNew:false, otForm:{} }); this.flash('OKR template created — pull it from Create New OKR.');
          supabase.from('templates').insert({ id:nid, kind:'okr', payload:okrec, created_by:this.state.authUser?this.state.authUser.id:null }).then(({error})=>{
            if(error) console.warn('[supabase] okr template insert failed:', error.message);
          });
        }
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
      ktDivisionOptions:this.liveDeptOptions(),
      ktSetName:setKf('name'), ktSetCategory:setKf('category'), ktSetDivision:setKf('division'), ktSetUnit:setKf('unit'), ktSetDirection:setKf('direction'), ktSetDefTarget:setKf('defTarget'), ktSetFreq:setKf('freq'), ktSetSource:setKf('source'), ktSetDesc:setKf('desc'), ktSetStatus:setKf('status'),
      ktSave:()=>{
        if(!this.hasPerm('templates', this.state.ktEditId?'edit':'create')){ this.flash('You do not have permission to '+(this.state.ktEditId?'edit':'create')+' templates.'); return; }
        if(!(kf.name&&kf.name.trim())){ this.flash('Enter a KPI name.'); return; }
        const rec={ tool:kf.tool||'', method:kf.method||'', mfreq:kf.mfreq||'', evidence:kf.evidence||'', name:kf.name.trim(), category:kf.category||'Traffic', division:kf.division||'SEO', unit:kf.unit||'count', direction:kf.direction||'Increase', defTarget:kf.defTarget||'—', freq:kf.freq||'Monthly', source:kf.source||'Manual', desc:kf.desc||'', status:kf.status||'Active', owner:this.currentPerson(), updated:this.todayStr() };
        if(this.state.ktEditId){
          const editId=this.state.ktEditId;
          const existing=this.allKpiTemplates().find(x=>x.id===editId);
          this.setState({ ktUpd:{...(this.state.ktUpd||{}),[editId]:rec}, ktNew:false, ktEditId:null, ktForm:{} }); this.flash('KPI template updated.');
          supabase.from('templates').upsert({ id:editId, kind:'kpi', payload:{...existing,...rec,id:editId}, created_by:this.state.authUser?this.state.authUser.id:null }).then(({error})=>{
            if(error) console.warn('[supabase] kpi template upsert failed:', error.message);
          });
        } else {
          const ktIds=this.KPI_TEMPLATES().map(t=>t.id).concat((this.state.ktAdded||[]).map(t=>t.id)).concat(this.state.ktDeleted||[]);
          const ktNums=ktIds.map(id=>{ const m=String(id).match(/^kt(\d+)$/); return m?parseInt(m[1],10):0; });
          const nid='kt'+(Math.max(0,...ktNums)+1); const ktrec={id:nid,...rec};
          this.setState({ ktAdded:[...(this.state.ktAdded||[]),ktrec], ktNew:false, ktForm:{} }); this.flash('KPI template created — now available in Create Task, OKR key results and Effort plans.');
          supabase.from('templates').insert({ id:nid, kind:'kpi', payload:ktrec, created_by:this.state.authUser?this.state.authUser.id:null }).then(({error})=>{
            if(error) console.warn('[supabase] kpi template insert failed:', error.message);
          });
        }
      },
      ttStats, ttRows:pg.rows, ttPg:pg, ttCanEdit:canEdit, ttCanDelete:canDeleteTemplate,
      ttFilterDefs:[
        {label:'Division',value:F.division,onChange:setF('division'),options:['All','SEO','Content','Graphics','Web Developers','SMM']},
        {label:'Status',value:F.status,onChange:setF('status'),options:['All','Active','Draft','Archived']},
      ],
      ttNew:this.state.ttNew, ttf:f,
      ttFormTitle:this.state.ttEditId?('Edit template · '+this.state.ttEditId):'New task template',
      ttClose:()=>this.setState({ ttNew:false, ttEditId:null, ttForm:{} }),
      ttStop:(e)=>e.stopPropagation(),
      ttDivisionOptions:this.liveDeptOptions(),
      ttSetName:setTf('name'), ttSetDivision:setTf('division'), ttSetDesc:setTf('desc'), ttSetUnit:setTf('unit'), ttSetEstH:setTf('estH'), ttSetPriority:setTf('priority'), ttSetRecurrence:setTf('recurrence'), ttSetStatus:setTf('status'), ttSetKpi:setTf('kpiId'),
      ttKpiOptions:[{id:'',label:'None — not KPI-linked'}].concat(kpiPool.map(k=>({ id:k.id, label:k.kpi+' ('+k.unit+') — '+k.who }))),
      ttChecklist:cl.map((s,i)=>({ i, val:s,
        set:(e)=>{ const a=cl.slice(); a[i]=e.target.value; this.setState({ ttForm:{...f,checklist:a} }); },
        remove:()=>{ const a=cl.slice(); a.splice(i,1); this.setState({ ttForm:{...f,checklist:a.length?a:['']} }); },
        canRemove:cl.length>1 })),
      ttAddStep:()=>this.setState({ ttForm:{...f,checklist:[...cl,'']} }),
      ttSave:()=>{
        if(!this.hasPerm('templates', this.state.ttEditId?'edit':'create')){ this.flash('You do not have permission to '+(this.state.ttEditId?'edit':'create')+' templates.'); return; }
        if(!(f.name&&f.name.trim())){ this.flash('Enter a template name.'); return; }
        const steps=(f.checklist||[]).map(s=>s.trim()).filter(Boolean);
        if(!steps.length){ this.flash('Add at least one checklist step.'); return; }
        const rec={ name:f.name.trim(), division:f.division||'SEO', desc:f.desc||'', kpiId:f.kpiId||'', unit:f.unit||'', estH:parseInt(f.estH,10)||0, priority:f.priority||'Medium', recurrence:f.recurrence||'None', status:f.status||'Active', checklist:steps, owner:this.currentPerson(), updated:this.todayStr() };
        if(this.state.ttEditId){
          const editId=this.state.ttEditId;
          const existing=this.allTaskTemplates().find(x=>x.id===editId);
          this.setState({ ttUpd:{...(this.state.ttUpd||{}),[editId]:rec}, ttNew:false, ttEditId:null, ttForm:{} });
          this.flash('Template updated — changes apply to new tasks created from it.');
          supabase.from('templates').upsert({ id:editId, kind:'task', payload:{...existing,...rec,id:editId}, created_by:this.state.authUser?this.state.authUser.id:null }).then(({error})=>{
            if(error) console.warn('[supabase] task template upsert failed:', error.message);
          });
        } else {
          const ttIds=this.TASK_TEMPLATES().map(t=>t.id).concat((this.state.ttAdded||[]).map(t=>t.id)).concat(this.state.ttDeleted||[]);
          const ttNums=ttIds.map(id=>{ const m=String(id).match(/^TPL-(\d+)$/); return m?parseInt(m[1],10):0; });
          const nid='TPL-'+String(Math.max(100,...ttNums)+1).padStart(3,'0');
          const ttrec={id:nid,...rec};
          this.setState({ ttAdded:[...(this.state.ttAdded||[]),ttrec], ttNew:false, ttForm:{} });
          this.flash('Template '+nid+' created — available in Create Task.');
          supabase.from('templates').insert({ id:nid, kind:'task', payload:ttrec, created_by:this.state.authUser?this.state.authUser.id:null }).then(({error})=>{
            if(error) console.warn('[supabase] task template insert failed:', error.message);
          });
        }
      },
    };
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
  // Compliance checklist (self-scores, evidence, QC verdicts) is keyed by
  // task id and upserted whole each time any of the three pieces changes —
  // simplest correct fix given how many small mutation points there are
  // (self value/note per line, evidence add/remove, QC value/verdict/
  // comment per line, submit/reopen, accept-all) versus a differently-
  // shaped per-field endpoint for each.
  // The Content-Type-driven QC checklist (Part C) reuses this SAME table
  // and SAME upsert instead of a second one — its per-item state rides
  // inside the existing `qc` jsonb column under a reserved `__ctQc` key
  // that the division-based compliance checklist never writes to, so no
  // schema migration is needed and old rows (which never have that key)
  // load with an empty content-type-QC state, not an error.
  _persistCompliance(taskId, fillObj, qcObj, submittedFlag, ctQcOverride, cmpQcOverride){
    const ctQc = ctQcOverride!==undefined ? ctQcOverride : ((this.state.clTypeQc||{})[taskId]||{});
    // Campaign-Type-mapped checklist state rides the same reserved-key
    // trick as __ctQc above — __cmpQc — so the auto-inherited, Campaign-
    // Type-driven QC checklists (one task can have several, one per
    // matching qcChecklist row) persist without a second table either.
    const cmpQc = cmpQcOverride!==undefined ? cmpQcOverride : ((this.state.clCampaignQc||{})[taskId]||{});
    supabase.from('compliance_checklists').upsert({
      task_id:taskId, fill:fillObj||{}, qc:{...(qcObj||{}), __ctQc:ctQc, __cmpQc:cmpQc}, submitted:!!submittedFlag,
      created_by:this.state.authUser?this.state.authUser.id:null,
    }).then(({error})=>{
      if(error) console.warn('[supabase] compliance checklist save failed:', error.message);
    });
  }
  async _loadComplianceChecklists(){
    const { data, error } = await supabase.from('compliance_checklists').select('*');
    if(error){ console.warn('[supabase] compliance checklists load failed:', error.message); return; }
    const fill={}, qc={}, submitted={}, ctQc={}, cmpQc={};
    (data||[]).forEach(r=>{ if(r.deleted) return;
      const rawQc=r.qc||{}; const { __ctQc, __cmpQc, ...restQc } = rawQc;
      fill[r.task_id]=r.fill||{}; qc[r.task_id]=restQc; if(__ctQc) ctQc[r.task_id]=__ctQc; if(__cmpQc) cmpQc[r.task_id]=__cmpQc;
      if(r.submitted) submitted[r.task_id]=true; });
    this.setState({ clFill:fill, clQc:qc, clSubmitted:submitted, clTypeQc:ctQc, clCampaignQc:cmpQc });
  }
  // Resolves a Content Type name (e.g. task.contentType) to its QC
  // checklist row — the same "select X, look up Y" shape as
  // npPullFromService, just used at QC-render time instead of form-fill
  // time. Falls back to 'Content Audit' if the type has no QC_Checklist
  // set, and returns null (not a generic checklist) if that name doesn't
  // match any qcChecklist row either — callers must show the "not
  // configured" message rather than silently picking something else.
  qcChecklistFor(contentType){
    if(!contentType) return null;
    const ctRow=this.MASTERS_REG().contentType.rows.find(r=>r.Content_Type===contentType);
    const checklistName=(ctRow&&ctRow.QC_Checklist)||'Content Audit';
    const row=this.MASTERS_REG().qcChecklist.rows.find(r=>r.Checklist===checklistName && r.Status!=='Inactive');
    if(!row) return null;
    const items=this.qcmItemsArray(row.Items).map(it=>({text:it.text}));
    return { Checklist:row.Checklist, Items:items };
  }
  // Task → Campaign Type resolution: a task's Campaign Type is either
  // picked directly on the task (task.campaignType, set at creation or
  // inherited from its linked Campaign) or, for tasks created before that
  // field existed, falls back to whatever its linked Campaign's own
  // `type` currently is. Every qcChecklist row mapped to that Campaign
  // Type via its Campaign_Type field comes back — one Campaign Type can
  // have several active checklists (No_of_Checklists) — and ONLY those;
  // a task never sees checklists belonging to a different Campaign Type.
  qcChecklistsForCampaign(t){
    if(!t) return { campaignType:'', checklists:[] };
    let campaignType=t.campaignType||'';
    if(!campaignType && t.campaign && t.campaign!=='—'){
      const camp=this.allCampaigns().find(c=>c.name===t.campaign);
      campaignType=(camp&&camp.type)||'';
    }
    if(!campaignType) return { campaignType:'', checklists:[] };
    const rows=this.MASTERS_REG().qcChecklist.rows.filter(r=>r.Campaign_Type===campaignType && r.Status!=='Inactive');
    return { campaignType, checklists:rows.map(row=>({
      Checklist:row.Checklist,
      Items:this.qcmItemsArray(row.Items).map(it=>it.text),
    })) };
  }
  tkSetTypeQcItem(taskId, idx, field, value){
    const cur={...(this.state.clTypeQc||{})};
    const forTask={...(cur[taskId]||{})};
    forTask[idx]={...(forTask[idx]||{}), [field]:value};
    cur[taskId]=forTask;
    this.setState({ clTypeQc:cur });
    const t=this.allTasks().find(x=>x.id===taskId)||{};
    const fill=this.complianceFill(t);
    const qc=(this.state.clQc||{})[taskId]||{};
    const submitted=!!(this.state.clSubmitted||{})[taskId];
    this._persistCompliance(taskId, fill, qc, submitted, forTask);
  }
  // Per-item state for the Campaign-Type-mapped checklist(s) — keyed by
  // checklist name (not just index) since a Campaign Type can map to
  // several checklists at once, each with its own item list.
  tkSetCampaignQcItem(taskId, checklistName, idx, field, value){
    const cur={...(this.state.clCampaignQc||{})};
    const forTask={...(cur[taskId]||{})};
    const forList={...(forTask[checklistName]||{})};
    forList[idx]={...(forList[idx]||{}), [field]:value};
    forTask[checklistName]=forList;
    cur[taskId]=forTask;
    this.setState({ clCampaignQc:cur });
    const t=this.allTasks().find(x=>x.id===taskId)||{};
    const fill=this.complianceFill(t);
    const qc=(this.state.clQc||{})[taskId]||{};
    const submitted=!!(this.state.clSubmitted||{})[taskId];
    const ctQc=(this.state.clTypeQc||{})[taskId]||{};
    this._persistCompliance(taskId, fill, qc, submitted, ctQc, forTask);
  }
  // New QC panel driven by task.contentType — sits alongside (not instead
  // of) the existing division-based Compliance checklist, since division
  // (a team categorization) and Content Type (a deliverable categorization)
  // are different axes and both can matter for the same task.
  contentTypeQcData(t, rk){
    if(!t || !t.contentType){
      return { ctQcHasType:false, ctQcMissingMsg:'Content Type has not been configured for this item. Please assign a Content Type before starting QC.' };
    }
    const checklist=this.qcChecklistFor(t.contentType);
    if(!checklist){
      return { ctQcHasType:true, ctQcMissingMsg:'', ctQcContentType:t.contentType, ctQcHasChecklist:false };
    }
    const canEdit=this.hasPerm('qc','edit');
    const saved=((this.state.clTypeQc||{})[t.id])||{};
    const items=(checklist.Items||[]).map((it,idx)=>{
      const row=saved[idx]||{};
      return { n:idx+1, text:it.text,
        status:row.status||'', note:row.note||'',
        setStatus:(e)=>this.tkSetTypeQcItem(t.id, idx, 'status', e.target.value),
        setNote:(e)=>this.tkSetTypeQcItem(t.id, idx, 'note', e.target.value),
        canEdit };
    });
    const done=items.filter(i=>i.status).length;
    return {
      ctQcHasType:true, ctQcMissingMsg:'', ctQcHasChecklist:true,
      ctQcContentType:t.contentType, ctQcChecklistName:checklist.Checklist,
      ctQcItems:items, ctQcCoverage:done+' of '+items.length+' checked',
    };
  }
  // Every active QC Checklist mapped to the task's Campaign Type,
  // auto-inherited and used for the actual QC review — no manual
  // checklist selection. Fully driven off the current Campaign Type on
  // every render (never cached in form state), so if the Campaign Type
  // changes the previously loaded checklists simply stop being computed
  // and the newly-matching ones take their place automatically.
  campaignTypeQcData(t){
    if(!t) return { cmpQcHasCampaign:false, cmpQcHasType:false };
    const hasCampaign=!!(t.campaign && t.campaign!=='—');
    const { campaignType, checklists }=this.qcChecklistsForCampaign(t);
    if(!campaignType){
      return { cmpQcHasCampaign:hasCampaign, cmpQcHasType:false, cmpQcCampaign:t.campaign||'',
        cmpQcMissingMsg: hasCampaign
          ? 'Linked Campaign "'+t.campaign+'" has no Campaign Type set, so no QC checklist can be loaded.'
          : 'No Campaign Type has been set for this task yet — QC checklists will load automatically once one is selected.' };
    }
    const canEdit=this.hasPerm('qc','edit');
    const saved=(this.state.clCampaignQc||{})[t.id]||{};
    const checklistVms=checklists.map(c=>{
      const savedForList=saved[c.Checklist]||{};
      const items=(c.Items||[]).map((text,idx)=>{
        const row=savedForList[idx]||{};
        return { n:idx+1, text,
          status:row.status||'', note:row.note||'',
          setStatus:(e)=>this.tkSetCampaignQcItem(t.id, c.Checklist, idx, 'status', e.target.value),
          setNote:(e)=>this.tkSetCampaignQcItem(t.id, c.Checklist, idx, 'note', e.target.value),
          canEdit };
      });
      const done=items.filter(i=>i.status).length;
      return { name:c.Checklist, items, coverage:done+' of '+items.length+' checked' };
    });
    return {
      cmpQcHasCampaign:hasCampaign, cmpQcHasType:true, cmpQcCampaign:t.campaign||'', cmpQcCampaignType:campaignType,
      cmpQcChecklists:checklistVms, cmpQcEmpty:checklistVms.length===0, cmpQcMissingMsg:'',
    };
  }
  complianceFill(t){
    // Never fabricate self-scores/evidence — a task reaching Submitted via
    // the "Completed — send to QC" shortcut (which doesn't go through this
    // checklist's own gated clSubmit()) must show genuinely blank fields
    // until the assignee fills them in themselves, not synthesized data.
    return (this.state.clFill||{})[t.id] || {};
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
    const isQC=this.hasPerm('qc','approve');
    const canDeleteChecklist=this.hasPerm('qc','delete');
    const writerEditable=isAssignee&&!submitted;
    const qcEditable=isQC&&submitted;
    const V={ Compliant:{bg:'var(--verify-100)',c:'var(--verify-600)'}, 'Accept conditional':{bg:'var(--warn-100)',c:'var(--warn-600)'},
      Rework:{bg:'var(--danger-100)',c:'var(--danger-600)'}, '':{bg:'var(--surface-50)',c:'var(--ink-500)'} };
    let total=0, done=0, pass=0, rework=0;
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
          setSelf:(e)=>{ const cur={...(this.state.clFill||{})}; cur[id]={...(cur[id]||{}),[key]:{...(cur[id]||{})[key],self:e.target.value}}; this.setState({ clFill:cur }); this._persistCompliance(id, cur[id], qc, submitted); },
          setSelfNote:(e)=>{ const cur={...(this.state.clFill||{})}; cur[id]={...(cur[id]||{}),[key]:{...(cur[id]||{})[key],note:e.target.value}}; this.setState({ clFill:cur }); this._persistCompliance(id, cur[id], qc, submitted); },
          writerEditable, qcEditable,
          selfLocked:!writerEditable,
          evFiles:(f.files||[]).map((n,fi)=>({ name:n,
            icon:/\.(png|jpe?g|gif|webp)$/i.test(n)?'image':(/\.pdf$/i.test(n)?'file-text':'file'),
            open:()=>this.openFilePreview(n),
            remove:()=>{ const cur={...(this.state.clFill||{})}; const arr=(((cur[id]||{})[key]||{}).files||[]).slice(); arr.splice(fi,1);
              cur[id]={...(cur[id]||{}),[key]:{...(cur[id]||{})[key],files:arr}}; this.setState({ clFill:cur }); this._persistCompliance(id, cur[id], qc, submitted); } })),
          hasEv:(f.files||[]).length>0,
          evMissing:(f.self!==undefined&&f.self!=='')&&!(f.files||[]).length,
          addEv:()=>{ this.openFilePicker('compliance:'+id+':'+key,'Evidence for “'+r.kpi+'”');
            this.setState({ fpName:String(r.kpi).toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')+'-report' }); },
          selfBadge:selfPass===null?'—':(selfPass?'Meets standard':'Below standard'),
          selfBadgeBg:selfPass===null?'var(--surface-50)':(selfPass?'var(--verify-100)':'var(--danger-100)'),
          selfBadgeColor:selfPass===null?'var(--ink-400)':(selfPass?'var(--verify-600)':'var(--danger-600)'),
          qcVal:q.val||'', setQcVal:(e)=>{ const cur={...(this.state.clQc||{})}; cur[id]={...(cur[id]||{}),[key]:{...(cur[id]||{})[key],val:e.target.value}}; this.setState({ clQc:cur }); this._persistCompliance(id, fill, cur[id], submitted); },
          verdict:q.verdict||'', verdictBg:vt.bg, verdictColor:vt.c,
          setVerdict:(e)=>{ const cur={...(this.state.clQc||{})}; cur[id]={...(cur[id]||{}),[key]:{...(cur[id]||{})[key],verdict:e.target.value}}; this.setState({ clQc:cur }); this._persistCompliance(id, fill, cur[id], submitted); },
          comment:q.comment||'', setComment:(e)=>{ const cur={...(this.state.clQc||{})}; cur[id]={...(cur[id]||{}),[key]:{...(cur[id]||{})[key],comment:e.target.value}}; this.setState({ clQc:cur }); this._persistCompliance(id, fill, cur[id], submitted); },
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
        this.flash('Compliance checklist submitted — locked for QC review.');
        this._persistCompliance(id, fill, qc, true); },
      clReopen:()=>{ this.setState({ clSubmitted:{...(this.state.clSubmitted||{}),[id]:false} });
        this.flash('Checklist returned to the assignee for correction.');
        this._persistCompliance(id, fill, qc, false); },
      clCanReopen:qcEditable,
      clCanDelete:canDeleteChecklist&&submitted,
      clDelete:()=>{
        if(!canDeleteChecklist){ this.flash('You do not have permission to delete compliance checklists.'); return; }
        this.confirmDelete('Delete Compliance Checklist?', 'Are you sure you want to delete the compliance checklist for '+id+'? This action cannot be undone.', ()=>{
          const cf={...(this.state.clFill||{})}; delete cf[id];
          const cq={...(this.state.clQc||{})}; delete cq[id];
          const cs={...(this.state.clSubmitted||{})}; delete cs[id];
          this.setState({ clFill:cf, clQc:cq, clSubmitted:cs });
          this.flash('Compliance checklist deleted for '+id+'.');
          supabase.from('compliance_checklists').update({ deleted:true }).eq('task_id', id).then(({error})=>{
            if(error) console.warn('[supabase] compliance checklist delete failed:', error.message);
          });
        }); },
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
        this.flash('Verified against submitted evidence — lines meeting the gold standard marked Compliant, misses marked Rework.');
        this._persistCompliance(id, fill, o, submitted); },
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
  // Reverses fmtMonth() ("2026-07" -> "Jul 2026") back to "2026-07" — an
  // <input type="month"> needs that ISO form or it silently renders
  // blank, which is why editing a saved Effort Plan showed an empty
  // Period field. If it's already ISO (or unrecognized), pass it through.
  isoMonth(s){
    if(!s||s==='—') return null;
    const iso=String(s).match(/^(\d{4})-(\d{2})$/); if(iso) return s;
    const m=String(s).match(/^([A-Za-z]{3})\w*\s+(\d{4})$/); if(!m) return null;
    const M=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const idx=M.indexOf(m[1].slice(0,1).toUpperCase()+m[1].slice(1,3).toLowerCase());
    if(idx<0) return null;
    return m[2]+'-'+String(idx+1).padStart(2,'0');
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
  // Real per-role data scoping for Dashboard/Analytics — not just different
  // widgets per role, but the underlying records actually filtered: Admin/
  // CEO/COO/QC see the whole company (their ACCESS level is already 'Full'/
  // company-wide by design), Manager/Team Lead see only their own
  // department, everyone else sees only their own assigned work.
  myScopeDivision(){ const u=this.userOf(this.currentPerson()); return u?u.dept:''; }
  scopedTasks(rk){
    const all=this.allTasks();
    if(['admin','ceo','coo','qc','manager','secretary'].includes(rk)) return all;
    if(rk==='team_lead'){ const d=this.myScopeDivision(); return d?all.filter(t=>this.tkDivision(t)===d):all; }
    const me=this.currentPerson(); return all.filter(t=>t.assignee===me);
  }
  scopedOkrs(rk){
    const all=this.allOkrs();
    if(['admin','ceo','coo','qc','manager','secretary'].includes(rk)) return all;
    if(rk==='team_lead'){ const d=this.myScopeDivision(); return d?all.filter(o=>o.dept===d):all; }
    const me=this.currentPerson(); return all.filter(o=>o.owner===me);
  }
  scopedSops(rk){
    const all=this.allSops();
    if(['admin','ceo','coo','qc','manager','secretary'].includes(rk)) return all;
    // Sales doesn't work division-based SOPs (SEO/Content/etc. procedures
    // aren't relevant to them) — they only ever see SOPs explicitly tagged
    // to a brand they're assigned. No brand assigned = nothing to show.
    if(rk==='sales'){
      const brands=this.mySalesBrands();
      if(!brands.length) return [];
      return all.filter(s=>s.brand && brands.includes(s.brand));
    }
    const d=this.myScopeDivision();
    return d?all.filter(s=>!s.division||s.division==='All'||s.division===d):all;
  }
  scopedTickets(rk){
    const all=this.allTickets();
    if(['admin','ceo','coo','qc','manager','secretary'].includes(rk)) return all;
    if(rk==='team_lead'){
      const d=this.myScopeDivision(); if(!d) return all;
      const inDept=(name)=>{ const u=this.userOf(name); return !!(u && u.dept===d); };
      return all.filter(t=>inDept(t.by)||inDept(t.assignee));
    }
    const me=this.currentPerson(); return all.filter(t=>t.by===me||t.assignee===me);
  }
  // Sales brand assignment lives on the user's own record (Admin-configurable
  // via User Management), not a fixed constant — falls back to the demo
  // role's default brand only if the signed-in user has no record/assignment.
  mySalesBrands(){
    const u=this.userOf(this.currentPerson());
    if(u && u.brands && u.brands.length) return u.brands;
    return this.state.roleKey==='sales' ? [this.ROLES.sales.brand] : [];
  }
  // Whether the signed-in person should be fenced to their assigned
  // brand(s) for Leads/Contacts — always true for Sales (unchanged, strict
  // "no brand = nothing" behaviour), and now also true for ANY other role
  // once Admin has actually assigned them one or more brands via the same
  // brand checklist used for Sales. Nobody else is newly restricted —
  // a role with no brands assigned keeps today's unrestricted view.
  _leadBrandRestricted(){
    const u=this.userOf(this.currentPerson());
    return this.state.roleKey==='sales' || !!(u && u.brands && u.brands.length);
  }
  // Per-user column visibility for the Leads module's two tables — mirrors
  // the per-user Dashboard widget visibility pattern (dashboard_widgets):
  // Admin picks which columns THIS person sees (User Management -> edit
  // user), stored as the list of HIDDEN keys so everything starts shown.
  _leadColVisibility(){
    const hidden=new Set((this.state.authProfile&&this.state.authProfile.hidden_lead_columns)||[]);
    const show=(k)=>!hidden.has(k);
    return {
      colPipeCountry:show('pipeCountry'), colPipeService:show('pipeService'), colPipeValue:show('pipeValue'), colPipeOwner:show('pipeOwner'), colPipeStage:show('pipeStage'),
      colLdService:show('ldService'), colLdSource:show('ldSource'), colLdVisitors:show('ldVisitors'), colLdLeads:show('ldLeads'), colLdQualified:show('ldQualified'), colLdValue:show('ldValue'), colLdLoggedBy:show('ldLoggedBy'), colLdNotes:show('ldNotes'), colLdDetails:show('ldDetails'),
    };
  }
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
    const isAdmin=this.hasPerm('users','edit');
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
        avatarUrl:u.avatar_url||'', hasAvatar:!!u.avatar_url,
        statusBg:u.statusTone==='ok'?'var(--verify-100)':'var(--warn-100)',
        statusColor:u.statusTone==='ok'?'var(--verify-600)':'var(--warn-600)' },
      umClose:()=>this.setState({ umOpen:null, umEdit:false, umDraft:{} }),
      umStop:(e)=>e.stopPropagation(),
      umMeta:[['Role',u.role],['Department',u.dept],['Designation',u.sub],['Account status',u.status],
        ['Mobile',u.mobile||'—'],['Team',u.team||'—'],['Reporting manager',u.reportingManager||'—'],
        ['Team lead',u.teamLead||'—'],['Office location',u.officeLocation||'—'],
        ['Shift',(u.shiftStart||'09:00')+' – '+(u.shiftEnd||'18:00')],['Break',(u.breakMin||60)+' minutes'],
        ['Working days',(u.days||5)+' / week'],['Daily capacity',this.dailyCapacity(name)+' h'],
        ['Weekly capacity',wk+' h']].concat(u.role==='Sales Executive'?[['Assigned brand(s)',(u.brands||[]).join(', ')||'None']]:[]).map(x=>({k:x[0],v:x[1]})),
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
        breakMin:String(u.breakMin||60), days:String(u.days||5), role:u.role, dept:u.dept, status:u.status, brands:(u.brands||[]).slice(),
        mobile:u.mobile||'', designation:u.designation||'', team:u.team||'', reportingManager:u.reportingManager||'', teamLead:u.teamLead||'', officeLocation:u.officeLocation||'',
        hiddenWidgets:(u.hiddenWidgets||[]).slice(), hiddenLeadColumns:(u.hiddenLeadColumns||[]).slice() } }),
      umCancelEdit:()=>this.setState({ umEdit:false, umDraft:{} }),
      umD:d, umSetStart:setD('shiftStart'), umSetEnd:setD('shiftEnd'), umSetBreak:setD('breakMin'), umSetDays:setD('days'),
      umSetRole:setD('role'), umSetDept:setD('dept'), umSetStatus:setD('status'),
      umSetMobile:setD('mobile'), umSetDesignation:setD('designation'), umSetTeam:setD('team'),
      umSetReportingManager:setD('reportingManager'), umSetTeamLead:setD('teamLead'), umSetOfficeLocation:setD('officeLocation'),
      umRoleOptions:this.ROLE_LIST(),
      umDeptOptions:this.liveDeptOptions(),
      umStatusOptions:['Active','Pending Invitation','Suspended','Locked','Inactive','Resigned (Archived)'],
      umDayOptions:['4','5','5.5','6'],
      // Brand assignment is available for every role, including Admin/CEO —
      // Admin/CEO default to full, unscoped Brand Playbook access when no
      // brand is assigned, but an explicit assignment (e.g. an "Admin"
      // account that's really scoped to one client/brand) is still honored.
      // Sales additionally uses it to fence leads/pipeline/reports; every
      // other role uses it only to fence Brand Playbook (see playbookView()).
      umBrandRows:this.BRAND_LIST().map(b=>{ const on=(d.brands||[]).includes(b);
        return { label:b, on,
          style:'display:flex;align-items:center;gap:7px;padding:7px 11px;border-radius:999px;font-size:11.5px;font-weight:700;cursor:pointer;border:1px solid '+(on?'var(--verify-500)':'var(--line-300)')+';background:'+(on?'var(--verify-100)':'var(--paper)')+';color:'+(on?'var(--verify-600)':'var(--ink-700)'),
          toggle:()=>{ const cur=d.brands||[]; this.setState({ umDraft:{...d, brands: on?cur.filter(x=>x!==b):[...cur,b]} }); } }; }),
      // Dashboard widget visibility — Admin picks which Dashboard blocks this
      // specific person sees. Stored as the list of HIDDEN keys; unticking a
      // row here hides that block for them, everything starts ticked (shown).
      umWidgetRows:[['kpis','Summary KPI cards'],['needsAttention','Needs attention tiles'],
        ['leadPipeline','Lead pipeline snapshot'],['activity','Recent activity panel'],
        ['scope','Scope & access card'],['accessSummary','Access-level breakdown']].map(([key,label])=>{
        const hidden=(d.hiddenWidgets||[]).includes(key); const on=!hidden;
        return { key, label, on,
          style:'display:flex;align-items:center;gap:7px;padding:7px 11px;border-radius:999px;font-size:11.5px;font-weight:700;cursor:pointer;border:1px solid '+(on?'var(--verify-500)':'var(--line-300)')+';background:'+(on?'var(--verify-100)':'var(--paper)')+';color:'+(on?'var(--verify-600)':'var(--ink-700)'),
          toggle:()=>{ const cur=d.hiddenWidgets||[]; this.setState({ umDraft:{...d, hiddenWidgets: hidden?cur.filter(x=>x!==key):[...cur,key]} }); } }; }),
      // Leads column visibility — same hidden-key-list pattern as Dashboard
      // widgets above, but for the two Leads-module tables (Pipeline +
      // Daily Leads log). The identity column of each table (Lead / Date)
      // isn't listed here — it's never hideable.
      umLeadColumnRows:[['pipeCountry','Pipeline: Country'],['pipeService','Pipeline: Service'],['pipeValue','Pipeline: Value'],['pipeOwner','Pipeline: Owner'],['pipeStage','Pipeline: Stage'],
        ['ldService','Daily: Service'],['ldSource','Daily: Source'],['ldVisitors','Daily: Visitors'],['ldLeads','Daily: Leads'],['ldQualified','Daily: Qualified'],['ldValue','Daily: Est. value'],['ldLoggedBy','Daily: Logged by'],['ldNotes','Daily: Notes'],['ldDetails','Daily: Lead details']].map(([key,label])=>{
        const hidden=(d.hiddenLeadColumns!==undefined?d.hiddenLeadColumns:(u.hiddenLeadColumns||[])).includes(key); const on=!hidden;
        return { key, label, on,
          style:'display:flex;align-items:center;gap:7px;padding:7px 11px;border-radius:999px;font-size:11.5px;font-weight:700;cursor:pointer;border:1px solid '+(on?'var(--verify-500)':'var(--line-300)')+';background:'+(on?'var(--verify-100)':'var(--paper)')+';color:'+(on?'var(--verify-600)':'var(--ink-700)'),
          toggle:()=>{ const cur=d.hiddenLeadColumns!==undefined?d.hiddenLeadColumns:(u.hiddenLeadColumns||[]); this.setState({ umDraft:{...d, hiddenLeadColumns: hidden?cur.filter(x=>x!==key):[...cur,key]} }); } }; }),
      umBrandsSummary:(u.brands||[]).length?(u.brands||[]).join(', '):'No brands assigned',
      umSave:()=>{
        if(!this.hasPerm('users','edit')){ this.flash('You do not have permission to edit users.'); return; }
        const newRole=d.role||u.role, newDept=d.dept||u.dept, newStatus=d.status||u.status;
        const newBrands=d.brands!==undefined?d.brands:(u.brands||[]);
        const newMobile=d.mobile!==undefined?d.mobile:u.mobile;
        const newDesignation=d.designation!==undefined?d.designation:u.designation;
        const newTeam=d.team!==undefined?d.team:u.team;
        const newReportingManager=d.reportingManager!==undefined?d.reportingManager:u.reportingManager;
        const newTeamLead=d.teamLead!==undefined?d.teamLead:u.teamLead;
        const newOfficeLocation=d.officeLocation!==undefined?d.officeLocation:u.officeLocation;
        const newHiddenWidgets=d.hiddenWidgets!==undefined?d.hiddenWidgets:(u.hiddenWidgets||[]);
        const newHiddenLeadColumns=d.hiddenLeadColumns!==undefined?d.hiddenLeadColumns:(u.hiddenLeadColumns||[]);
        const users=(this.state.users||[]).map(x=>x.name===name?{...x,
          shiftStart:d.shiftStart||x.shiftStart, shiftEnd:d.shiftEnd||x.shiftEnd,
          breakMin:parseInt(d.breakMin,10)||x.breakMin, days:parseFloat(d.days)||x.days,
          role:newRole, dept:newDept, status:newStatus, brands:newBrands,
          mobile:newMobile, designation:newDesignation, sub:newDesignation+' · '+newDept, team:newTeam, reportingManager:newReportingManager,
          teamLead:newTeamLead, officeLocation:newOfficeLocation, hiddenWidgets:newHiddenWidgets, hiddenLeadColumns:newHiddenLeadColumns,
          statusTone:newStatus==='Active'?'ok':'warn' }:x);
        this.setState({ users, umEdit:false, umDraft:{} });
        const hm=(s)=>{const p=String(s).split(':');return (parseInt(p[0],10)||0)+((parseInt(p[1],10)||0)/60);};
        const newCap=Math.round((hm(d.shiftEnd||u.shiftEnd||'18:00')-hm(d.shiftStart||u.shiftStart||'09:00')-((parseInt(d.breakMin,10)||u.breakMin||60)/60))*(parseFloat(d.days)||u.days||5)*10)/10;
        this.flash(name+' updated — capacity now '+newCap+' h/week.');
        if(u.id){
          const roleEntry=Object.entries(this.ROLES).find(([,r])=>r.label===newRole);
          supabase.from('profiles').update({
            role_key: roleEntry?roleEntry[0]:u.roleKey, department:newDept, status:newStatus, brands:newBrands,
            mobile:newMobile, designation:newDesignation, team:newTeam, reporting_manager:newReportingManager,
            team_lead:newTeamLead, office_location:newOfficeLocation, dashboard_widgets:newHiddenWidgets,
            hidden_lead_columns:newHiddenLeadColumns,
          }).eq('id', u.id).then(({error})=>{
            if(error) console.warn('[supabase] profile update failed:', error.message);
          });
          // if the Admin is editing their OWN widgets/columns, refresh
          // authProfile immediately so the change is visible without a
          // full reload.
          if(this.state.authProfile && this.state.authProfile.id===u.id){
            this.setState({ authProfile:{...this.state.authProfile, dashboard_widgets:newHiddenWidgets, hidden_lead_columns:newHiddenLeadColumns} });
          }
        } },
      // Photo: reuses the same upload/remove path My Profile uses, just
      // targeted at this user's id instead of the signed-in user's.
      umAvatarUrl:u.avatar_url||'', umHasAvatar:!!u.avatar_url, umAvatarBusy:!!this.state.avatarBusy,
      umUploadAvatar:(e)=>{ const f=e.target.files&&e.target.files[0]; e.target.value=''; if(f) this.setAvatarFile(f, u.id); },
      umRemoveAvatar:()=>this.removeAvatar(u.id),
      // Password: Admin never sets/sees the actual password — this emails the
      // user a reset link through the same reliable pipeline invites use,
      // which is the safer pattern (nobody but the user ever knows it).
      umResetPassword:async()=>{
        if(!u.email){ this.flash('No email on file for '+name+'.'); return; }
        this.flash('Sending password reset link to '+u.email+'…');
        try{
          const resp=await fetch('/api/reset-password', {
            method:'POST', headers:{ 'Content-Type':'application/json' },
            body:JSON.stringify({ email:u.email }),
          });
          const body=await resp.json();
          if(!resp.ok) throw new Error(body.error||'Reset failed');
          if(body.emailSent) this.flash('Password reset link sent to '+u.email+'.');
          else this.flash('Reset link generated but email delivery failed'+(body.mailError?(': '+body.mailError):'')+'.');
        }catch(err){
          this.flash('Could not send reset email: '+err.message);
        } },
      umSuspend:()=>{ const newStatus=u.status==='Suspended'?'Active':'Suspended';
        const users=(this.state.users||[]).map(x=>x.name===name?{...x,status:newStatus,statusTone:newStatus==='Suspended'?'warn':'ok'}:x);
        this.setState({ users }); this.flash(name+(u.status==='Suspended'?' reactivated.':' suspended — login blocked, records retained.'));
        if(u.id) supabase.from('profiles').update({ status:newStatus }).eq('id', u.id).then(({error})=>{
          if(error) console.warn('[supabase] suspend/reactivate failed:', error.message);
        }); },
      umSuspendLabel:u.status==='Suspended'?'Reactivate account':'Suspend account',
      umResend:async()=>{
        if(!u.email){ this.flash('No email on file for '+name+' — add one before resending.'); return; }
        this.flash('Resending invite to '+u.email+'…');
        try{
          const resp=await fetch('/api/invite-user', {
            method:'POST', headers:{ 'Content-Type':'application/json' },
            body:JSON.stringify({ email:u.email, fullName:u.name, roleKey:u.roleKey, department:u.dept, designation:u.designation,
              brands:u.brands||[], reportingManager:u.reportingManager||'', teamLead:u.teamLead||'' }),
          });
          const body=await resp.json();
          if(!resp.ok) throw new Error(body.error||'Resend failed');
          if(body.emailSent) this.flash('Activation link re-sent to '+u.email+'.');
          else this.flash('Link regenerated but email delivery failed'+(body.mailError?(': '+body.mailError):'')+'.');
        }catch(err){
          this.flash('Could not resend invite: '+err.message);
        } },
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
  // tkAdded must win over WTASKS() on a code collision — once a seed task
  // gets its first real edit (_persistTaskPatch upserts it), the DB row
  // loads back into tkAdded with the same code, and the hardcoded seed
  // version needs to step aside instead of showing up as a duplicate row.
  allTasks(){
    return (this.state.tkAdded||[]).map(t=>this.tkOv(t));
  }
  tkPatch(id, patch, act){
    const t=this.allTasks().find(x=>x.id===id); if(!t) return;
    if(patch && patch.status==='Rework') patch={...patch, reworkCount:this.reworkCycles(t)+1};
    // The new activity entry must travel WITH patch into _persistTaskPatch,
    // not just into the local tkUpd overlay — _persistTaskPatch re-fetches
    // the task from this.state.tkUpd, which hasn't flushed yet at this point
    // in the same tick, so without this it silently persists the task's
    // PREVIOUS activity array (missing the entry just added here) every
    // single time. That stale write is what made rework_count and other
    // fields look right immediately but revert to blank after the next
    // realtime reload wiped the local-only overlay.
    const activity=[...(t.activity||[]), [this.currentPerson(), act, this.todayStr()]];
    const fullPatch={...patch, activity};
    const upd={...(this.state.tkUpd||{})};
    upd[id]={ ...(upd[id]||{}), ...fullPatch };
    const kpiId=fullPatch.kpiId!==undefined?fullPatch.kpiId:t.kpiId;
    // setState's callback (not a call right after setState) — the sync reads
    // this.state via allTasks()/juniorRollup(), which must see the merged
    // status, not the pre-patch one still sitting in state at this point.
    this.setState({ tkUpd:upd }, ()=>{ if(patch && patch.status!==undefined) this._syncKrFromTasks(kpiId); });
    this._persistTaskPatch(id, fullPatch);
  }
  // QC comments live inside task.comments (there is no separate QC comment
  // store — QC Review is a mirror of Tasks) with no id on legacy entries, so
  // both helpers address a comment by id when present and fall back to its
  // array index otherwise. Both route through the existing hasPerm('qc', ...)
  // actions per the requirement to reuse the ERP's existing permissions
  // rather than inventing a separate one for comments.
  _findCommentIndex(list, commentId){
    const byId=list.findIndex(c=>c.id && c.id===commentId);
    if(byId>=0) return byId;
    const i=parseInt(commentId,10);
    return (Number.isInteger(i) && i>=0 && i<list.length) ? i : -1;
  }
  editComment(taskId, commentId, newText){
    if(!this.hasPerm('qc','edit')){ this.flash('You do not have permission to edit comments.'); return; }
    const text=(newText||'').trim();
    if(!text){ this.flash('Comment cannot be empty.'); return; }
    const t=this.allTasks().find(x=>x.id===taskId); if(!t) return;
    const list=(this.tkOv(t).comments||[]).slice();
    const idx=this._findCommentIndex(list, commentId); if(idx<0) return;
    list[idx]={ ...list[idx], text, editedAt:this.todayStr() };
    this.tkPatch(taskId, { comments:list }, 'Comment edited');
    this.flash('Comment updated.');
  }
  deleteComment(taskId, commentId){
    if(!this.hasPerm('qc','delete')){ this.flash('You do not have permission to delete comments.'); return; }
    const t=this.allTasks().find(x=>x.id===taskId); if(!t) return;
    const list=(this.tkOv(t).comments||[]).slice();
    const idx=this._findCommentIndex(list, commentId); if(idx<0) return;
    this.confirmDelete('Delete Comment?', 'Are you sure you want to delete this comment? This action cannot be undone.', ()=>{
      const next=list.slice(); next.splice(idx,1);
      this.tkPatch(taskId, { comments:next }, 'Comment deleted');
      this.flash('Comment deleted.');
    });
  }
  reworkCycles(t){
    const fromActivity=(t.activity||[]).filter(a=>/rework/i.test(String(a[1]))).length;
    const fromState=((this.state.tkUpd||{})[t.id]||{}).reworkCount||0;
    // t.reworkCount is the persisted rework_count column itself — the most
    // reliable source once a reload has wiped tkUpd and reset activity's
    // text-matching options, so it must always win over the other two.
    const fromField=t.reworkCount||0;
    return Math.max(fromActivity, fromState, fromField);
  }
  timers(){ return this.state.tkTimers||{}; }
  timerOf(id){ return this.timers()[id]||{ running:false, elapsed:0, sessions:[] }; }
  timerElapsed(id){ const t=this.timerOf(id); return t.elapsed + (t.running&&t.startedAt?Math.floor((Date.now()-t.startedAt)/1000):0); }
  hms(sec){ const h=Math.floor(sec/3600), m=Math.floor((sec%3600)/60), s=sec%60;
    return String(h).padStart(2,'0')+':'+String(m).padStart(2,'0')+':'+String(s).padStart(2,'0'); }
  ensureTick(){ if(this._tick) return; this._tick=setInterval(()=>{ const any=Object.values(this.timers()).some(t=>t.running);
    if(any) this.forceUpdate(); else { clearInterval(this._tick); this._tick=null; } },1000); }
  startTimer(id){
    const t=this.allTasks().find(x=>x.id===id); if(!t) return;
    const running=Object.keys(this.timers()).find(k=>k!==id&&this.timers()[k].running);
    if(running){ this.flash('Stop the timer on '+running+' first — only one task can run at a time.'); return; }
    const cur=this.timerOf(id);
    const baseH=(cur.baseH!==undefined)?cur.baseH:(parseFloat(t.actH)||0);
    const upd={...this.timers(), [id]:{...cur, baseH, running:true, startedAt:Date.now()}};
    const statusPatch={status: t.status==='Assigned'?'In Progress':t.status};
    const patch={...(this.state.tkUpd||{})};
    patch[id]={...(patch[id]||{}), ...statusPatch};
    this.setState({ tkTimers:upd, tkUpd:patch });
    this.ensureTick();
    this.flash('Timer started on '+id+(t.status==='Assigned'?' — task moved to In Progress.':'.'));
    this._persistTaskPatch(id, statusPatch);
  }
  stopTimer(id){
    const cur=this.timerOf(id); if(!cur.running) return;
    const secs=Math.floor((Date.now()-cur.startedAt)/1000);
    const sessions=[...(cur.sessions||[]), { start:cur.startedAt, secs, who:this.currentPerson(), date:this.todayStr() }];
    const total=cur.elapsed+secs;
    const baseH=cur.baseH||0;
    const actH=Math.round((baseH+total/3600)*100)/100;
    const patch={...(this.state.tkUpd||{})};
    patch[id]={...(patch[id]||{}), actH };
    this.setState({ tkTimers:{...this.timers(), [id]:{ running:false, startedAt:null, elapsed:total, sessions, baseH }}, tkUpd:patch });
    this.flash('Timer stopped — '+this.hms(secs)+' logged on '+id+'.');
    this._persistTaskPatch(id, {actH});
  }
  // Upserts (not update) so a seed task (WTASKS()) gets a real row the
  // first time it's touched — same "first edit creates the row" pattern
  // used everywhere else in this migration. Needs the task's full current
  // record, not just the patch, since payload-less columns on an insert
  // path would otherwise fall back to the table's (mostly empty) defaults.
  _persistTaskPatch(code, patch){
    const t=this.allTasks().find(x=>x.id===code); if(!t) return;
    const full={...t, ...patch};
    supabase.from('tasks').upsert({
      code, name:full.name, description:full.desc, priority:full.priority, status:full.status,
      division:full.division, project:full.project, campaign:full.campaign,
      assignee_name:full.assignee, reviewer_name:full.reviewer,
      start_date:full.startDate||null, end_date:full.endDate||null,
      start_time:full.startTime||null, end_time:full.endTime||null,
      effort_estimate:full.estH, effort_actual:full.actH, recurrence:full.recurrence,
      checklist:full.checklist||[], linked_kpi:full.kpi, kpi_id:full.kpiId,
      units:full.units, unit:full.unit, dependency:full.dep,
      effort_plan:full.effortPlan, effort_row:full.effortType, dep_mode:full.depMode,
      evidence:full.evidence||[], comments:full.comments||[], activity:full.activity||[],
      qc_feedback:full.qcFeedback||null, rework_count:full.reworkCount||0,
      created_by:this.state.authUser?this.state.authUser.id:null,
    }, { onConflict:'code' }).then(({error})=>{
      if(error) console.warn('[supabase] task upsert failed:', error.message);
    });
    if(patch.contentType!==undefined) this._persistTaskContentType(code, patch.contentType);
    if(patch.campaignType!==undefined) this._persistTaskCampaignType(code, patch.campaignType);
  }
  // Start/end date+time on an existing task — previously set once at
  // creation with no way to change it afterward. Routed through tkPatch()/
  // _persistTaskPatch() (a full upsert keyed on code) rather than a direct
  // targeted update, because a task that's still only in the hardcoded seed
  // array has no real Supabase row yet — a plain .update() would silently
  // match zero rows and appear to work while writing nothing.
  editTaskDates(id, patch){
    if(!this.hasPerm('tasks','edit')){ this.flash('You do not have permission to edit tasks.'); return; }
    const t=this.allTasks().find(x=>x.id===id); if(!t) return;
    const startDate=patch.startDate!==undefined?patch.startDate:(t.startDate||'');
    const endDate=patch.endDate!==undefined?patch.endDate:(t.endDate||'');
    const startTime=patch.startTime!==undefined?patch.startTime:(t.startTime||'');
    const endTime=patch.endTime!==undefined?patch.endTime:(t.endTime||'');
    this.tkPatch(id, { startDate, endDate, startTime, endTime,
      start:this.fmtDate(startDate)||t.start, end:this.fmtDate(endDate)||t.end }, 'Schedule updated');
    this.flash('Task schedule updated.');
  }
  _deleteTask(id){
    if(!this.hasPerm('tasks','delete')){ this.flash('You do not have permission to delete tasks.'); return; }
    const t=this.allTasks().find(x=>x.id===id); if(!t) return;
    this.setState({ tkAdded:(this.state.tkAdded||[]).filter(x=>x.id!==id), tkDeletedIds:[...(this.state.tkDeletedIds||[]), id], tkOpen:null }, ()=>{ if(t.kpiId) this._syncKrFromTasks(t.kpiId); });
    this.flash('Deleted task '+id+'.');
    supabase.from('tasks').update({ deleted:true }).eq('code', id).then(({error})=>{
      if(error) console.warn('[supabase] task delete failed:', error.message);
    });
  }
  tkTone(s){ return {Assigned:{bg:'var(--info-100)',c:'var(--info-600)'},'In Progress':{bg:'var(--warn-100)',c:'var(--warn-600)'},Submitted:{bg:'var(--orchid-100)',c:'var(--orchid-700)'},Approved:{bg:'var(--verify-100)',c:'var(--verify-600)'},Rework:{bg:'var(--danger-100)',c:'var(--danger-600)'},Closed:{bg:'#EAE4E8',c:'var(--beet-700)'}}[s]||{bg:'var(--surface-50)',c:'var(--ink-500)'}; }
  // Differentiates comment bubbles by the individual person who wrote them,
  // not their role — two people who happen to share a role (e.g. two Admin
  // accounts) must still look visually distinct — but by ROLE, not by
  // individual person: every QC Reviewer's comment shares one color, every
  // Manager's another, so a reader can tell at a glance who's speaking in
  // what capacity. Reuses each role's own brand color (this.ROLES[key].color
  // — already used for that role's avatar/badge elsewhere) rather than a
  // second, disconnected palette.
  _hexToRgba(hex, a){
    const m=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex||'');
    if(!m) return 'rgba(138,138,138,'+a+')';
    return 'rgba('+parseInt(m[1],16)+','+parseInt(m[2],16)+','+parseInt(m[3],16)+','+a+')';
  }
  _commentColor(who){
    const u=(this.state.users||[]).find(x=>x.name===who);
    const role=u&&u.roleKey&&this.ROLES[u.roleKey];
    const hex=role?role.color:'#8A8A8A';
    return { bg:this._hexToRgba(hex,.12), border:this._hexToRgba(hex,.35) };
  }
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
    const bs=(dis)=>'display:flex;align-items:center;gap:5px;padding:7px 12px;border:1px solid var(--line-300);border-radius:9px;font-size:12.5px;font-weight:700;cursor:pointer;background:var(--paper);color:'+(dis?'var(--ink-300)':'var(--ink-700)');
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
      const tmr=this.timerOf(t.id), tmSec=this.timerElapsed(t.id);
      const blockedBy=this.tkBlockedBy(t);
      const locked = isOwn && hasPending && df!==null && df>=0 && ['Assigned','In Progress'].includes(t.status) && !pendingOpen.some(p=>p.id===t.id);
      return {
      tmRunning:tmr.running, tmElapsed:this.hms(tmSec), tmHasTime:tmSec>0,
      tmShow:(t.assignee===person||['manager','team_lead','admin'].includes(rk)) && t.status!=='Approved' && t.status!=='Closed',
      tmBtnStyle:'display:inline-flex;align-items:center;justify-content:center;gap:5px;padding:5px 10px;border-radius:8px;font-size:11px;font-weight:700;cursor:pointer;border:1px solid '+(tmr.running?'var(--danger-600)':'var(--line-300)')+';background:'+(tmr.running?'var(--danger-600)':'var(--paper)')+';color:'+(tmr.running?'#fff':'var(--ink-700)'),
      tmIcon:tmr.running?'square':'play',
      tmText:tmr.running?this.hms(tmSec):(tmSec>0?this.hms(tmSec):'Start'),
      tmToggle:(e)=>{ if(e)e.stopPropagation(); tmr.running?this.stopTimer(t.id):this.startTimer(t.id); },
      waiting: blockedBy && ['Assigned','In Progress'].includes(t.status) ? ('Waiting on '+blockedBy.id) : '',
      division:this.tkDivision(t), divBg:this.tkDivTone(this.tkDivision(t)).bg, divColor:this.tkDivTone(this.tkDivision(t)).c,
      contentType:t.contentType||'—',
      id:t.id, name:t.name, kpi:t.kpi, kpiId:t.kpiId, contribution:'+'+t.units+' '+t.unit,
      effortPlan:t.effortPlan||'', hasEffort:!!t.effortPlan,
      dueAlert:this.tkDueAlert(t), day:this.dayTag(t), locked,
      reviewer:t.reviewer||'—', qcFb:t.qcFeedback||'—', hasQcFb:!!t.qcFeedback,
      priority:t.priority, priDot:pri(t.priority), assignee:t.assignee, dates:t.start+' → '+t.end,
      status:t.status, statusBg:tn.bg, statusColor:tn.c,
      ...(()=>{
        const mine=t.assignee===person, isLead=['manager','team_lead','admin'].includes(rk);
        const canSet=(mine||isLead) && !['Approved','Closed'].includes(t.status);
        const base=['Assigned','In Progress','Completed — send to QC'];
        const cur=t.status==='Submitted'?'Completed — send to QC':t.status;
        const opts=base.includes(cur)?base:[cur].concat(base);
        return { statusCanSet:canSet, statusOptions:opts, statusVal:cur,
          setStatusSel:(e)=>{ if(e)e.stopPropagation(); const v=e.target.value;
            if(v==='Completed — send to QC'){
              this.tkPatch(t.id,{ status:'Submitted' },'Marked complete — routed to QC ('+(t.reviewer||'QC team')+')');
              this.flash(t.id+' marked complete and sent to '+(t.reviewer||'the QC team')+' for review.');
            } else { this.tkPatch(t.id,{ status:v },'Status → '+v); this.flash(t.id+' → '+v+'.'); } } }; })(),
      ...(()=>{ const rc=this.reworkCycles(t);
        return { hasRework:rc>0, reworkCount:String(rc), reworkLabel:rc===1?'1 QC rework':(rc+' QC reworks'),
          reworkBg:rc>=3?'var(--danger-100)':rc===2?'var(--warn-100)':rc===1?'var(--info-100)':'var(--surface-50)',
          reworkColor:rc>=3?'var(--danger-600)':rc===2?'var(--warn-600)':rc===1?'var(--info-600)':'var(--ink-400)' }; })(),
      open:()=>this.setState({ tkOpen:t.id }),
      ...(()=>{
        const mine=t.assignee===person, isQC=rk==='qc', isLead=['manager','team_lead','admin'].includes(rk);
        const set=(st,note,msg)=>(e)=>{ if(e)e.stopPropagation(); this.tkPatch(t.id,{status:st},note); this.flash(msg); };
        const openIt=(e)=>{ if(e)e.stopPropagation(); this.setState({ tkOpen:t.id }); };
        const A=(label,icon,go,primary,hint)=>({ naLabel:label, naIcon:icon, naGo:go, naHint:hint||'',
          naStyle:'display:inline-flex;align-items:center;gap:5px;padding:6px 11px;border-radius:9px;font-size:11.5px;font-weight:700;cursor:pointer;white-space:nowrap;'+(primary
            ?'border:none;background:#7A1C46;color:#fff':'border:1px solid var(--line-300);background:var(--paper);color:var(--ink-700)') });
        if(blockedBy && ['Assigned','In Progress'].includes(t.status))
          return A('Blocked — open '+blockedBy.id,'lock',openIt,false,'Predecessor must finish first');
        if(locked) return A('Clear pending first','lock',openIt,false,'Finish overdue work before today’s');
        switch(t.status){
          case 'Assigned':
            return mine?A('Start task','play',set('In Progress','Started work','Task started — timer and checklist are now active.'),true,'Move to In Progress')
              : isLead?A('Reassign','user-round-cog',openIt,false,'Not started yet')
              : A('View','eye',openIt,false,'');
          case 'In Progress':
            return mine?A('Submit for QC','send',set('Submitted','Submitted for QC review','Submitted — now in the QC reviewer’s queue.'),true,'Attach evidence first')
              : isLead?A('Follow up','message-square',openIt,false,'In progress')
              : A('View','eye',openIt,false,'');
          case 'Submitted':
            return (isQC||isLead)?A('Review now','shield-check',openIt,true,'Approve or request rework')
              : A('Awaiting QC','clock',openIt,false,'No action needed from you');
          case 'Rework':
            return mine?A('Fix & resubmit','rotate-ccw',set('In Progress','Rework started','Reopened — address the QC comments and resubmit.'),true,'QC comments attached')
              : (isQC||isLead)?A('View feedback','message-square',openIt,false,'Waiting on the assignee')
              : A('View','eye',openIt,false,'');
          case 'Approved':
            return isLead?A('Close & log KPI','check-circle-2',set('Closed','Closed — KPI logged','Task closed. The KPI contribution is locked in.'),true,'QC passed — final closure')
              : mine?A('Log KPI actual','target',(e)=>{ if(e)e.stopPropagation(); this.setState({ route:'okr' }); },true,'Record the outcome against your KPI')
              : A('View','eye',openIt,false,'QC approved');
          case 'Closed':
            return A('View record','archive',openIt,false,'Complete — no action');
          default:
            return A('Open','eye',openIt,false,'');
        }
      })(),
    };});
    const queuePending=pendingOpen.map(t=>({ name:t.name, id:t.id, open:()=>this.setState({ tkOpen:t.id }) }));
    const queueToday=isOwn?this.allTasks().filter(t=>t.assignee===person && this.dayDiff(t)===0 && ['Assigned','In Progress','Rework'].includes(t.status)).map(t=>({ name:t.name, id:t.id, locked:hasPending, open:()=>this.setState({ tkOpen:t.id }) })):[];
    const c=(s)=>list.filter(t=>t.status===s).length;
    const tkStats=[
      {label:isOwn?'My tasks':'All tasks',value:String(list.length),color:'var(--ink-900)',icon:'list-checks'},
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
    const aAssigned=aList.length, aDone=aList.filter(t=>['Approved','Closed'].includes(t.status)).length, aPending=aList.filter(t=>['Assigned','In Progress','Submitted'].includes(t.status)).length, aRework=aList.filter(t=>t.status==='Rework').length;
    const apct=(n)=>aAssigned?Math.round(n/aAssigned*100):0;
    const pLbl=period==='Weekly'?'this week':'this month';
    const tkWeek=[
      {label:'Assigned '+pLbl+(isOwn?' — my tasks':' — all users'), value:String(aAssigned), pctW:'100%', color:'var(--info-500)', pct:isOwn?'your assigned tasks':'every assignee, every division'},
      {label:'Completed (QC-approved)', value:String(aDone), pctW:apct(aDone)+'%', color:'var(--verify-500)', pct:apct(aDone)+'% of assigned'},
      {label:'Pending (open / awaiting QC)', value:String(aPending), pctW:apct(aPending)+'%', color:'var(--warn-500)', pct:apct(aPending)+'% of assigned'},
      {label:'Rework requested', value:String(aRework), pctW:apct(aRework)+'%', color:'var(--danger-500)', pct:apct(aRework)+'% of assigned'},
    ];
    const tkPeriodBtns=['Weekly','Monthly'].map(p=>{ const active=period===p; return { label:p+' report', active,
      style:'padding:6px 13px;border-radius:999px;font-size:12px;font-weight:700;cursor:pointer;border:1px solid '+(active?'var(--beet-700)':'var(--line-300)')+';background:'+(active?'var(--beet-700)':'var(--paper)')+';color:'+(active?'#fff':'var(--ink-700)'),
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
        {label:'Status', value:F.status, onChange:setF2('status'), options:['All','Assigned','In Progress','Submitted','Rework','Approved','Closed']},
        {label:'Priority', value:F.priority, onChange:setF2('priority'), options:['All','Critical','High','Medium','Low']},
        {label:'Assignee', value:F.assignee, onChange:setF2('assignee'), options:['All'].concat(Array.from(new Set(this.allTasks().map(t=>t.assignee))))},
      ],
      tkQueuePending:queuePending, tkQueueToday:queueToday,
      tkHasQueue:isOwn && (queuePending.length>0||queueToday.length>0),
      tkHasPending:queuePending.length>0, tkHasToday:queueToday.length>0,
      tkPageLabel:'Page '+(page+1)+' of '+pageCount+' · '+tkRows.length+' tasks',
      tkPrev:()=>this.setState({ tkPage:Math.max(0,page-1) }), tkNext:()=>this.setState({ tkPage:Math.min(pageCount-1,page+1) }),
      tkPrevDisabled:page===0, tkNextDisabled:page>=pageCount-1,
      tkPrevStyle:'display:flex;align-items:center;gap:5px;padding:7px 12px;border:1px solid var(--line-300);border-radius:9px;font-size:12.5px;font-weight:700;cursor:pointer;background:var(--paper);color:'+(page===0?'var(--ink-300)':'var(--ink-700)'),
      tkNextStyle:'display:flex;align-items:center;gap:5px;padding:7px 12px;border:1px solid var(--line-300);border-radius:9px;font-size:12.5px;font-weight:700;cursor:pointer;background:var(--paper);color:'+(page>=pageCount-1?'var(--ink-300)':'var(--ink-700)'),
      tkNewOpen:()=>this.setState({ tkNew:true, tkForm:{ template:'', priority:'Medium', assignee:(this.state.users&&this.state.users[0]?this.state.users[0].name:''), recurrence:'None' } }),
      ...this.tkDetailData(), ...this.tkFormData() };
  }

  // ============ Time & Effort report (new tab on Tasks) ============
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
    const rows=list.map(t=>{ const act=Math.round(this.hrsOf(t)*100)/100, est=parseFloat(t.estH)||0, v=Math.round((act-est)*100)/100;
      const tn=this.tkTone(t.status);
      return { id:t.id, name:t.name, assignee:t.assignee, division:this.tkDivision(t), campaign:this.campaignOpt(t.campaign),
        est:est?est+' h':'—', act:act?act+' h':'0 h', actNum:act, estNum:est,
        variance:(v>0?'+':'')+v+' h', varianceColor:v>0?'var(--danger-600)':(v<0?'var(--verify-600)':'var(--ink-500)'),
        pct:est?Math.round(act/est*100)+'%':'—', pctW:est?Math.min(100,Math.round(act/est*100))+'%':'0%',
        pctColor:est&&act>est?'var(--danger-500)':act>=est*0.8?'var(--verify-500)':'var(--info-500)',
        running:this.timerOf(t.id).running,
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
      trStats:[K('Tasks in scope',String(rows.length),'var(--ink-900)'),K('Estimated',Math.round(sumEst*10)/10+' h','var(--info-600)'),K('Actual logged',Math.round(sumAct*10)/10+' h','var(--verify-600)'),K('Variance',((sumAct-sumEst)>0?'+':'')+Math.round((sumAct-sumEst)*10)/10+' h',(sumAct>sumEst)?'var(--danger-600)':'var(--verify-600)'),K('Avg per task',(rows.length?Math.round(sumAct/rows.length*100)/100:0)+' h','var(--orchid-600)')],
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
        bg:isToday?'var(--orchid-100)':(weekend?'var(--surface-50)':'var(--paper)'),
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
      calStats:[K('Tasks due',String(dueCount),weekView?'this week':'this month','var(--ink-900)'),
        K('Overdue',String(inRange.reduce((s,c)=>s+(parseInt(c.overdueLabel)||0),0)),'past due, not approved','var(--danger-600)'),
        K('Overloaded days',String(inRange.filter(c=>c.over).length),'beyond daily capacity','var(--warn-600)'),
        K('Unscheduled',String(unscheduled.length),'no due date set','var(--info-600)')],
      calLegend:['Content','Graphics','Web Developers','SMM','SEO'].map(d=>({ label:d, bg:dTone(d).bg, color:dTone(d).c })),
      calUnscheduled:unscheduled.slice(0,6).map(t=>({ id:t.id, name:t.name, who:t.assignee,
        open:()=>this.setState({ tkTab:'list', tkOpen:t.id }) })),
      calHasUnscheduled:unscheduled.length>0,
      calExport:()=>{
        const events=pool.map(t=>{ const e=this.isoDate(t.end); if(!e) return null;
          const s=this.isoDate(t.start)||e;
          return { id:t.id, name:t.name, startIso:s, endIso:e, assignee:t.assignee, status:t.status };
        }).filter(Boolean);
        if(!events.length){ this.flash('No scheduled tasks to export in this view.'); return; }
        this.exportIcs('content-calendar-'+this._todayIso()+'.ics', events);
      },
    };
  }

  // ================= BRAND PLAYBOOKS =================
  // Read by every role. Authored by Manager / Team Lead / Admin.
  // Governance chapters (approval matrix, claims & compliance) are Admin-owned —
  // managers own execution, not platform governance.
  // Chapter content (PB_CHAPTERS) is keyed by the hardcoded `key` slug below
  // and stays hardcoded editorial narrative — out of scope to make
  // data-driven. But the identity fields (name/sector/site/tagline) are
  // merged from Brand Master by name when a matching row exists, so editing
  // a brand's tagline/sector in Master Data reflects here without a code
  // change; falls back to these defaults if the row was renamed/removed.
  PB_BRANDS(){
    const reg=this.MASTERS_REG().brand.rows;
    const merge=(name,defaults)=>{ const r=reg.find(x=>x.Brand_Name===name);
      return r ? { ...defaults, name:r.Brand_Name, sector:r.Sector||defaults.sector, site:r.Website||defaults.site, tagline:r.Tagline||defaults.tagline } : defaults; };
    return [
    merge('Beetloop', { key:'beetloop', name:'Beetloop', sector:'B2B platform · Food, nutrition, cosmeceutical, agri, health',
      site:'beetloop.com', tagline:'Verified intelligence from formulation to market.', color:'var(--ink-900)' }),
    merge('Food Research Lab', { key:'frl', name:'Food Research Lab', sector:'Product development & food R&D services',
      site:'foodresearchlab.com', tagline:'From kitchen idea to compliant shelf-ready product.', color:'var(--verify-600)' }),
    merge('Pubrica', { key:'pubrica', name:'Pubrica', sector:'Scientific & medical writing',
      site:'pubrica.com', tagline:'Research communicated with clinical precision.', color:'var(--info-600)' }),
    merge('Statswork', { key:'statswork', name:'Statswork', sector:'Statistics & data analysis services',
      site:'statswork.com', tagline:'Defensible analysis, explained plainly.', color:'var(--orchid-600)' }),
    merge('Tutors India', { key:'tutorsindia', name:'Tutors India', sector:'Academic research support',
      site:'tutorsindia.com', tagline:'Guidance that gets research over the line.', color:'var(--warn-600)' }),
    merge('PepCreations', { key:'pepcreations', name:'PepCreations', sector:'Creative & brand production',
      site:'pepcreations.com', tagline:'Craft that carries the claim.', color:'var(--danger-600)' }),
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
    // access: everyone reads; Manager / Team Lead / Admin author; governance chapters Admin-only.
    // Brand Playbook is scoped to whatever brand(s) a person is assigned in
    // User Management — same idea as Sales' lead/pipeline fencing, now
    // applied to every role. Admin and CEO default to full, unscoped access
    // (an Admin account with nothing assigned shouldn't see zero playbooks),
    // but that default is only a fallback — an Admin/CEO who HAS been given
    // specific brand(s) is scoped to exactly those, same as anyone else, so
    // an "Admin"-labelled account tied to one brand still only sees that one.
    const canAuthor=['manager','team_lead','admin'].includes(rk);
    const isAdmin=rk==='admin';
    const assignedBrands=this.mySalesBrands();
    const fullAccess = (rk==='admin' || rk==='ceo') && !assignedBrands.length;
    const visibleBrands = fullAccess
      ? this.PB_BRANDS()
      : this.PB_BRANDS().filter(x=>assignedBrands.includes(x.name));
    if(!visibleBrands.length){
      return { pbIsOpen:true, pbEmpty:true,
        pbEmptyNote:'No brand assigned to your account yet — ask Admin to assign one in User Management before any brand playbook can show here.' };
    }
    const bk = visibleBrands.some(x=>x.key===this.state.pbBrand) ? this.state.pbBrand : visibleBrands[0].key;
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
      pbIsOpen:true, pbEmpty:false,
      pbBrandTabs:visibleBrands.map(x=>({ name:x.name, key:x.key, active:x.key===bk,
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
        this.flash('“'+cur.title+'” marked as read — '+(arr.length+1)+' of '+chapters.length+' complete.');
        if(this.state.authUser) supabase.from('playbook_reads').upsert({
          id:this.state.authUser.id+':'+bk+':'+curKey, brand_key:bk, chapter_key:curKey, created_by:this.state.authUser.id,
        }).then(({error})=>{
          if(error) console.warn('[supabase] playbook read-mark failed:', error.message);
        }); },
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
  // sopAdded comes from Supabase (both genuinely new SOPs and any hardcoded
  // seed SOP that's been edited at least once, since editing upserts a real
  // row keyed by the seed id) — so it must win over SOP_SEED() on an id
  // clash, or an edited seed SOP would render twice.
  allSops(){ const upd=this.state.sopUpd||{};
    const added=this.state.sopAdded||[];
    const addedIds=new Set(added.map(s=>s.id));
    return added.concat(this.SOP_SEED().filter(s=>!addedIds.has(s.id))).map(s=>upd[s.id]?{...s,...upd[s.id]}:s).filter(s=>!s.deleted); }
  sopTone(s){ return { Published:{bg:'var(--verify-100)',c:'var(--verify-600)'}, Draft:{bg:'var(--surface-50)',c:'var(--ink-500)'},
    'In review':{bg:'var(--warn-100)',c:'var(--warn-600)'}, Retired:{bg:'#EAE4E8',c:'var(--beet-700)'} }[s]||{bg:'var(--surface-50)',c:'var(--ink-500)'}; }
  // SOP permissions resolved from the existing RBAC model (hasPerm/getPerm
  // against ACCESS.sop + any Admin rolePerms override) — no separate
  // permission module for SOP.
  sopPermLabel(rk){
    const p=this.getPerm('sop', rk);
    return ['View','Create','Edit','Delete'].filter((_,i)=>[p.view,p.create,p.edit,p.delete][i]).join(' · ');
  }
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
      sopSetBrand:set('brand'),
      sopSetReview:set('review'), sopSetCategory:set('category'), sopSetPriority:set('priority'),
      sopSetFrequency:set('frequency'), sopSetEstTime:set('estTime'), sopSetTrigger:set('trigger'),
      sopSetApplicability:set('applicability'), sopSetInputs:set('inputs'), sopSetOutputs:set('outputs'),
      sopSetResources:set('resources'), sopSetDocs:set('docs'), sopSetSuccess:set('successCriteria'),
      sopSetRisks:set('risks'), sopSetEscalation:set('escalation'), sopSetTags:set('tags'),
      sopSetChange:set('changeSummary'), sopSetReason:set('reason'),
      sopDivisionOptions:this.liveDeptOptions(),
      // optional brand tag — leave "All brands" for company-wide SOPs; pick a
      // specific brand to restrict this SOP to Sales users assigned that
      // brand (see scopedSops()). Sales sees NO SOPs at all until at least
      // one is tagged to their brand — company-wide SOPs (SEO/Content/etc.)
      // aren't relevant to their role.
      sopBrandOptions:['All brands'].concat(this.BRAND_LIST()),
      sopStatusOptions:['Draft','In review','Published'],
      sopCategoryOptions:this.SOP_CATS(),
      sopPriorityOptions:this.SOP_PRIORITIES(),
      sopFrequencyOptions:this.SOP_FREQ(),
      sopApproverOptions:(this.state.users||[]).map(u=>u.name),
      sopStdRows:this.GOLD_STANDARDS().map(g=>{ const on=(f.standards||[]).includes(g.id);
        return { id:g.id, label:g.name, note:g.note, on,
          style:'display:flex;align-items:center;gap:7px;padding:7px 11px;border-radius:999px;font-size:11.5px;font-weight:700;cursor:pointer;border:1px solid '+(on?'var(--verify-500)':'var(--line-300)')+';background:'+(on?'var(--verify-100)':'var(--paper)')+';color:'+(on?'var(--verify-600)':'var(--ink-700)'),
          toggle:()=>{ const cur=f.standards||[];
            this.setState({ sopForm:{...f, standards:on?cur.filter(x=>x!==g.id):[...cur,g.id]} }); } }; }),
      sopKpiRows:kpiOpts.map(n=>{ const on=(f.kpis||[]).includes(n);
        return { name:n, on,
          style:'display:flex;align-items:center;gap:6px;padding:6px 11px;border-radius:999px;font-size:11.5px;font-weight:700;cursor:pointer;border:1px solid '+(on?'var(--orchid-400)':'var(--line-300)')+';background:'+(on?'var(--orchid-100)':'var(--paper)')+';color:'+(on?'var(--orchid-700)':'var(--ink-700)'),
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
            style:'padding:4px 9px;border-radius:999px;font-size:10px;font-weight:700;cursor:pointer;border:1px solid '+(on?'var(--info-500)':'var(--line-300)')+';background:'+(on?'var(--info-100)':'var(--paper)')+';color:'+(on?'var(--info-600)':'var(--ink-500)'),
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
        if(!this.hasPerm('sop','create')){ this.flash('You do not have permission to create SOPs.'); return; }
        if(!(f.title&&f.title.trim())){ this.flash('Give the SOP a title.'); return; }
        if(!(f.purpose&&f.purpose.trim())){ this.flash('State the purpose — what outcome this procedure guarantees.'); return; }
        const real=steps.filter(s=>(s.t||'').trim());
        if(!real.length){ this.flash('Add at least one step — an SOP without steps is not a procedure.'); return; }
        const csv=(v)=>String(v||'').split(',').map(x=>x.trim()).filter(Boolean);
        const rec={ id:nextId, title:f.title.trim(), division:f.division||'Content', category:f.category||'Content production',
          brand:(f.brand&&f.brand!=='All brands')?f.brand:'',
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
        supabase.from('sops').insert({ id:rec.id, payload:rec, created_by:this.state.authUser?this.state.authUser.id:null }).then(({error})=>{
          if(error) console.warn('[supabase] sop insert failed:', error.message);
        });
      } };
  }
  sopView(rk){
    const me=this.currentPerson();
    const canAuthor=this.hasPerm('sop','create');
    // role-based visibility: leadership/QC see every SOP; everyone else only
    // sees SOPs for their own division (plus any explicitly marked 'All')
    const leadershipRoles=['admin','ceo','coo','manager','team_lead','qc','secretary'];
    const myDept=(this.state.users||[]).find(u=>u.name===me);
    const myDivision=myDept?myDept.dept:'';
    const visibleToMe=(s)=>leadershipRoles.includes(rk) || !s.division || s.division==='All' || s.division===myDivision;
    const all=this.allSops().filter(visibleToMe);
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
        K('Categories',String([...new Set(all.map(s=>s.category))].length),'covered','var(--ink-900)')],
      sopRows:pg.rows, sopPg:pg, sopEmpty:list.length===0,
      sopCanAuthor:canAuthor,
      sopPermSet:this.sopPermLabel(rk),
      sopPermNote:'Your SOP permissions — assigned by role in Administration › User Management.',
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
    const leadershipRoles=['admin','ceo','coo','manager','team_lead','qc','secretary'];
    const myUser=(this.state.users||[]).find(u=>u.name===me);
    const myDivision=myUser?myUser.dept:'';
    if(!leadershipRoles.includes(rk) && s.division && s.division!=='All' && s.division!==myDivision){
      return { sopDrawerOpen:false };
    }
    const tn=this.sopTone(s.status), pt=this.sopPriTone(s.priority);
    const acked=(s.ack||[]).includes(me);
    // "Full"-level roles (Admin/Secretary/CEO — anyone whose ACCESS.sop level
    // grants delete) may author any SOP; everyone else with edit rights may
    // only author the SOPs they own. Uses hasPerm('sop','delete') as the
    // non-hardcoded signal for "elevated/manage-any", since that's exactly
    // what separates a 'Full' level from 'Create / Edit' in defaultPermsFromLevel.
    const canAuthor=this.hasPerm('sop','edit')&&(s.owner===me||this.hasPerm('sop','delete'));
    const rv=this.sopReviewState(s);
    const patch=(p,msg,auditRow)=>{ const u={...(this.state.sopUpd||{})};
      const cur={...(u[s.id]||{})};
      const nx={...s,...cur,...p};
      if(auditRow) nx.audit=[...(nx.audit||[]),auditRow];
      u[s.id]={...cur,...p, audit:nx.audit};
      this.setState({ sopUpd:u }); if(msg) this.flash(msg);
      supabase.from('sops').upsert({ id:s.id, payload:nx, created_by:this.state.authUser?this.state.authUser.id:null }).then(({error})=>{
        if(error) console.warn('[supabase] sop upsert failed:', error.message);
      }); };
    const tab=this.state.sopTabD||'overview';
    const seg=(on)=>'display:flex;align-items:center;gap:6px;padding:7px 13px;border:none;border-radius:9px;font-size:12px;font-weight:700;cursor:pointer;'+(on?'background:var(--paper);color:var(--ink-900);box-shadow:var(--shadow-sm)':'background:none;color:var(--ink-500)');
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
          open:()=>this.setState({ sopOpen:null, route:'okr' }) }; }),
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
      sopPublish:()=>{ if(!this.hasPerm('sop','edit')){ this.flash('You do not have permission to edit SOPs.'); return; }
        patch({ status:'Published', updated:this.todayStr(), updatedBy:me, ack:[] },
        s.id+' published as '+s.version+' — acknowledgements reset, everyone must read it again.',
        ['Published',me,this.todayStr()]); },
      sopPublishLabel:s.status==='Published'?'Re-publish current version':'Publish',
      sopBump:()=>{ if(!this.hasPerm('sop','edit')){ this.flash('You do not have permission to edit SOPs.'); return; }
        const p=String(s.version||'v1.0').replace('v','').split('.');
        const nv='v'+p[0]+'.'+((parseInt(p[1],10)||0)+1);
        const entry={ v:nv, by:me, date:this.todayStr(),
          summary:'Revision — change summary pending.', reason:'Recorded on version bump.',
          published:s.status==='Published'?this.todayStr():'', review:s.review };
        patch({ version:nv, updated:this.todayStr(), updatedBy:me, ack:[],
          versions:[entry].concat(s.versions||[]) },
          s.id+' → '+nv+' · previous versions kept in history, acknowledgements reset.',
          ['Version updated',me,this.todayStr()]); },
      sopMarkReviewed:()=>{ if(!this.hasPerm('sop','edit')){ this.flash('You do not have permission to edit SOPs.'); return; }
        patch({ lastReviewed:this.todayStr(), review:this.relDate(90) },
        s.id+' marked reviewed — next review in 90 days.', ['Reviewed',me,this.todayStr()]); },
      sopRetire:()=>{ if(!this.hasPerm('sop','edit')){ this.flash('You do not have permission to edit SOPs.'); return; }
        patch({ status:s.status==='Retired'?'Published':'Retired' },
        s.status==='Retired'?(s.id+' reinstated.'):(s.id+' retired — kept for audit, no longer in force.'),
        [s.status==='Retired'?'Published':'Retired',me,this.todayStr()]); },
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
      ...(()=>{ const canView=this.hasPerm('sop','view'), canEdit=canAuthor, canDel=this.hasPerm('sop','delete');
        return { sopCanDownload:canView, sopCanEditD:canEdit, sopCanUpdateD:canEdit,
          sopCanDeleteD:canDel, sopCanManageD:canEdit,
          sopPermLine:'Your permissions on this SOP — '+['View','Download','Edit','Update','Delete']
            .filter((_,i)=>[canView,canView,canEdit,canEdit,canDel][i]).join(' · '),
          sopDownload:()=>this.flash('Downloading '+s.id+' '+s.version+' — '+s.title+'.pdf'),
          sopDelete:()=>{ if(!this.hasPerm('sop','delete')){ this.flash('You do not have permission to delete SOPs.'); return; }
            this.confirmDelete('Delete SOP?', 'Are you sure you want to delete "'+s.title+'"? This action cannot be undone.', ()=>{
              patch({ deleted:true }, s.id+' deleted — retained in the audit log for compliance.', ['Deleted',me,this.todayStr()]);
              this.setState({ sopOpen:null });
            }); } }; })(),
    };
  }

  // ---- Help & Support — tickets for software, technical, training and access issues ----
  TICKET_CATS(){
    const owner=(roleKey)=>{ const u=(this.state.users||[]).find(x=>x.roleKey===roleKey&&x.status==='Active'); return u?u.name:this.currentPerson(); };
    const admin=owner('admin'), lead=owner('team_lead'), manager=owner('manager');
    return [
    { key:'software', label:'Software / platform issue', icon:'monitor-cog', queue:'Platform Admin', owner:admin, sla:8,
      hint:'Login, permissions, module errors, data not saving.' },
    { key:'technical', label:'Technical query', icon:'wrench', queue:'Function Lead', owner:lead, sla:24,
      hint:'How to do the work — SEO, code, design, analytics questions.' },
    { key:'training', label:'Training request', icon:'graduation-cap', queue:'Manager / L&D', owner:manager, sla:72,
      hint:'Need a walkthrough, upskilling or refresher session.' },
    { key:'access', label:'Access / tool request', icon:'key-round', queue:'Platform Admin', owner:admin, sla:12,
      hint:'New tool licence, repository access, role change.' },
    { key:'data', label:'Data correction', icon:'database-backup', queue:'Platform Admin', owner:admin, sla:24,
      hint:'Wrong KPI value, duplicate record, incorrect master entry.' },
    { key:'process', label:'Process / clarification', icon:'help-circle', queue:'Function Lead', owner:lead, sla:24,
      hint:'Which workflow applies, who approves, what the standard is.' },
  ]; }
  ticketCat(key){ return this.TICKET_CATS().find(c=>c.key===key)||this.TICKET_CATS()[0]; }
  TICKET_STATES(){ return ['Open','Triaged','Assigned','In Progress','Waiting on requester','Resolved','Closed']; }
  TICKET_PRIORITIES(){ return ['Critical','High','Medium','Low']; }
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
    const added=this.state.tktAdded||[];
    const addedIds=new Set(added.map(t=>t.id));
    const del=this.state.tktDeleted||[];
    return added.concat(this.TICKET_SEED().filter(t=>!addedIds.has(t.id)))
      .filter(t=>!del.includes(t.id))
      .map(t=>upd[t.id]?{...t,...upd[t.id]}:t); }
  _deleteTicket(id){
    if(!this.hasPerm('support','delete')){ this.flash('You do not have permission to delete tickets.'); return; }
    const t=this.allTickets().find(x=>x.id===id); if(!t) return;
    this.setState({ tktDeleted:[...(this.state.tktDeleted||[]), id], tktOpen:null });
    this.flash('Deleted ticket: '+(t.subject||id)+'.');
    // upsert (not update) — a seed ticket that's never been edited has no DB
    // row yet, so this is what makes the deletion stick past reload.
    supabase.from('tickets').upsert({ id, payload:t||{}, deleted:true, created_by:this.state.authUser?this.state.authUser.id:null }).then(({error})=>{
      if(error) console.warn('[supabase] ticket delete failed:', error.message);
    });
  }
  tktPatch(id,patch,note,files,internal){
    const upd={...(this.state.tktUpd||{})};
    const cur=this.allTickets().find(t=>t.id===id)||{};
    // 5th tuple slot is optional/additive — omitted (undefined) on every
    // existing entry, so old threads render exactly as before. Only entries
    // explicitly marked internal (assignment/priority/status housekeeping)
    // get hidden from viewers without hasPerm('support','edit').
    const thread=note?[...(cur.thread||[]),[this.currentPerson(),note,this.todayStr(),files||[],!!internal]]:(cur.thread||[]);
    upd[id]={ ...(upd[id]||{}), ...patch, thread };
    this.setState({ tktUpd:upd });
    const nx={ ...cur, ...patch, thread };
    supabase.from('tickets').upsert({ id, payload:nx, created_by:this.state.authUser?this.state.authUser.id:null }).then(({error})=>{
      if(error) console.warn('[supabase] ticket upsert failed:', error.message);
    });
  }
  // A requester may edit their own submission only while it hasn't started
  // moving through the workflow yet — once it's assigned or moved to In
  // Progress, the record of what was originally asked must stay fixed.
  // 'Triaged' (categorized but still unassigned) is still editable — only
  // assignment or work starting locks it, per spec item 61.
  tktCanEdit(t){
    if(!t) return false;
    return t.by===this.currentPerson() && ['Open','Triaged'].includes(t.status) && !t.assignee;
  }
  tktOpenEdit(id){
    const t=this.allTickets().find(x=>x.id===id);
    if(!t || !this.tktCanEdit(t)){ this.flash('This ticket can no longer be edited.'); return; }
    this.setState({ tktEditId:id, tktForm:{ cat:t.cat, subject:t.subject, desc:t.desc, priority:t.priority, task:t.task, training:t.trainingNeeded, files:t.files||[] } });
  }
  // Hard-guarded again here — not just at the Edit button's visibility —
  // so a stale open form (e.g. the ticket got assigned in another tab while
  // this one sat open) can't slip an edit through after the fact.
  tktSaveEdit(id, patch){
    const t=this.allTickets().find(x=>x.id===id);
    if(!t || !this.tktCanEdit(t)){ this.flash('This ticket can no longer be edited.'); this.setState({ tktEditId:null, tktForm:{} }); return; }
    const allowed={};
    ['cat','subject','desc','files'].forEach(k=>{ if(patch[k]!==undefined) allowed[k]=patch[k]; });
    this.tktPatch(id, allowed, 'Ticket details updated by requester');
    this.setState({ tktEditId:null, tktForm:{} });
    this.flash(id+' updated.');
  }
  tktOpenAssign(){
    const id=this.state.tktOpen; const t=this.allTickets().find(x=>x.id===id); if(!t) return;
    if(!this.hasPerm('support','edit')){ this.flash('You do not have permission to assign tickets.'); return; }
    this.setState({ showAssignTicket:true, tktAssignForm:{ assignee:t.assignee||'', priority:t.priority||'Medium', status:t.status||'Open' } });
  }
  tktCloseAssign(){ this.setState({ showAssignTicket:false, tktAssignForm:{} }); }
  tktSaveAssign(){
    const id=this.state.tktOpen; const t=this.allTickets().find(x=>x.id===id); if(!t) return;
    if(!this.hasPerm('support','edit')){ this.flash('You do not have permission to assign tickets.'); return; }
    const f=this.state.tktAssignForm||{};
    const assignee=f.assignee||''; const priority=f.priority||t.priority; const status=f.status||t.status;
    this.tktPatch(id, { assignee, priority, status },
      'Assignment updated — Assignee: '+(assignee||'Unassigned')+', Priority: '+priority+', Status: '+status,
      null, true);
    this.setState({ showAssignTicket:false, tktAssignForm:{} });
    this.flash(id+' assignment saved.');
  }
  ticketAge(t){
    if(t.createdAt) return Math.max(0, Math.round((Date.now()-t.createdAt)/3600000));
    const iso=this.isoDate(t.created); if(!iso) return 0;
    // seeded rows carry no timestamp — assume a 10:00 raise time rather than midnight
    return Math.max(0, Math.round((Date.now()-new Date(iso+'T10:00:00').getTime())/3600000)); }
  ticketFormData(){
    const editId=this.state.tktEditId;
    if(!this.state.tktNew && !editId) return { tktFormOpen:false };
    const f=this.state.tktForm||{};
    const set=(k)=>(e)=>this.setState({ tktForm:{...f,[k]:e.target.value} });
    const c=this.ticketCat(f.cat);
    const me=this.currentPerson();
    return { tktFormOpen:true, tf:f,
      tktIsEdit:!!editId,
      tktFormTitle:editId?'Edit ticket':'Raise a ticket',
      tktSaveLabel:editId?'Save changes':'Submit ticket',
      tktClose:()=>this.setState({ tktNew:false, tktEditId:null, tktForm:{} }),
      tktStop:(e)=>e.stopPropagation(),
      tktCatOptions:this.TICKET_CATS().map(x=>({ v:x.key, label:x.label })),
      tktSetCat:set('cat'), tktSetSubject:set('subject'), tktSetDesc:set('desc'),
      tktSetPriority:set('priority'), tktSetTask:set('task'),
      tktPriorityOptions:this.TICKET_PRIORITIES(),
      tktTaskOptions:['— None —'].concat(this.allTasks().filter(t=>t.assignee===me).map(t=>t.id+' — '+t.name)),
      tktRouteNote:'Routes to '+c.queue+' ('+c.owner+') · target response '+c.sla+' h',
      tktCatHint:c.hint,
      tktTraining:f.training?'Yes':'No',
      tktToggleTraining:()=>this.setState({ tktForm:{...f, training:!f.training} }),
      tktFiles:(f.files||[]).map((n,i)=>({ name:n,
        remove:()=>{ const a=(f.files||[]).slice(); a.splice(i,1); this.setState({ tktForm:{...f,files:a} }); } })),
      tktHasFiles:(f.files||[]).length>0,
      tktAttach:()=>this.openFilePicker('ticket','Attach to ticket'),
      tktSave:()=>{
        if(!(f.subject&&f.subject.trim())){ this.flash('Describe the issue in one line.'); return; }
        if(!(f.desc&&f.desc.trim())){ this.flash('Add details so it can be actioned without a follow-up.'); return; }
        if(editId){
          this.tktSaveEdit(editId, { cat:f.cat||'software', subject:f.subject.trim(), desc:f.desc.trim(), files:f.files||[] });
          return;
        }
        const tktIds=this.TICKET_SEED().map(x=>x.id).concat((this.state.tktAdded||[]).map(x=>x.id)).concat(this.state.tktDeleted||[]);
        const tktNums=tktIds.map(id=>{ const m=String(id).match(/^TKT-(\d+)$/); return m?parseInt(m[1],10):0; });
        const rec={ id:'TKT-'+(Math.max(1040,...tktNums)+1), cat:f.cat||'software', subject:f.subject.trim(), desc:f.desc.trim(),
          by:me, role:this.ROLES[this.state.roleKey].label, created:this.todayStr(), createdAt:Date.now(),
          priority:f.priority||'Medium', status:'Open', assignee:'', task:(f.task&&f.task!=='— None —')?String(f.task).split(' — ')[0]:'',
          trainingNeeded:!!f.training, files:f.files||[],
          thread:[[me,f.desc.trim(),this.todayStr()]] };
        this.setState({ tktAdded:[rec,...(this.state.tktAdded||[])], tktNew:false, tktForm:{}, tktOpen:rec.id });
        this.flash(rec.id+' raised — routed to '+c.queue+' ('+c.owner+'), target response '+c.sla+' h.');
        supabase.from('tickets').insert({ id:rec.id, payload:rec, created_by:this.state.authUser?this.state.authUser.id:null }).then(({error})=>{
          if(error) console.warn('[supabase] ticket insert failed:', error.message);
        });
      } };
  }
  // Admin Settings (Platform/Security/Integrations) is deliberately thin
  // here — unlike every other module, this one's data doesn't come from
  // this.state via renderVals(); ConfigurationSection.jsx calls the
  // /api/admin/* routes itself (with its own loading/error state) because
  // security policy and integration secrets must never round-trip through
  // a plain supabase.from() call reachable by the anon key. This method
  // only gates access and hands the component what it needs to make those
  // authenticated calls itself.
  configView(rk){
    const canView=this.hasPerm('config','view');
    if(!canView) return { configAccessDenied:true, configCanEdit:false };
    return {
      configAccessDenied:false,
      configCanEdit:rk==='admin',
      configTab:this.state.configTab||'platform',
      configGoPlatform:()=>this.setState({ configTab:'platform' }),
      configGoSecurity:()=>this.setState({ configTab:'security' }),
      configGoIntegrations:()=>this.setState({ configTab:'integrations' }),
    };
  }
  supportView(rk){
    const me=this.currentPerson();
    const isAdmin=rk==='admin';
    const isTriage=this.hasPerm('support','edit');
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
      supStats:[K('Open tickets',String(open.length),'awaiting resolution','var(--ink-900)'),
        K('Unassigned',String(all.filter(t=>!t.assignee&&!['Resolved','Closed'].includes(t.status)).length),'need triage','var(--warn-600)'),
        K('SLA breached',String(all.filter(t=>breached(t)).length),'past target response','var(--danger-600)'),
        K('Training requests',String(all.filter(t=>t.trainingNeeded||t.cat==='training').length),'flagged for L&D','var(--orchid-600)'),
        K('Resolved',String(all.filter(t=>['Resolved','Closed'].includes(t.status)).length),'closed out','var(--verify-600)'),
        K('My tickets',String(mine.length),'raised by or assigned to me','var(--info-600)')],
      supRows:pg.rows, supPg:pg, supEmpty:list.length===0,
      supIsTriage:isTriage, supIsAdmin:isAdmin,
      supScopeBtns:isTriage?['All tickets','My tickets'].map(s=>({ label:s, active:scope===s,
        style:'padding:7px 13px;border-radius:999px;font-size:12px;font-weight:700;cursor:pointer;border:1px solid '+(scope===s?'var(--beet-700)':'var(--line-300)')+';background:'+(scope===s?'var(--beet-700)':'var(--paper)')+';color:'+(scope===s?'#fff':'var(--ink-700)'),
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
    const isTriage=this.hasPerm('support','edit');
    const canDeleteTicket=this.hasPerm('support','delete');
    const isOwner=t.assignee===me;
    const isRequester=t.by===me;
    const age=this.ticketAge(t);
    const bad=!['Resolved','Closed'].includes(t.status)&&age>c.sla;
    const people=(this.state.users||[]).filter(u=>u.status==='Active').map(u=>u.name);
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
      // Index 0 is always the original request text (seeded at creation) —
      // the "Original request" card above already shows it, so the
      // conversation list starts from index 1 to avoid showing it twice.
      // Entries flagged internal (assignment/priority/status housekeeping
      // from the Assign modal) are hidden from anyone who can't triage.
      tktThread:(t.thread||[]).slice(1).filter(x=>!x[4]||isTriage).map(x=>({ who:x[0], text:x[1], when:x[2],
        mine:x[0]===me, kind:x[4]?'system':(x[0]===t.by?'requester':'support'),
        bg:x[4]?'var(--surface-50)':(x[0]===me?'var(--orchid-100)':'var(--surface-50)'),
        files:(x[3]||[]).map(f=>({name:f, open:()=>this.openFilePreview(f)})), hasFiles:(x[3]||[]).length>0 })),
      tktHasConversation:(t.thread||[]).slice(1).some(x=>!x[4]||isTriage),
      tktFilesD:(t.files||[]).map(n=>({ name:n })),
      tktHasFilesD:(t.files||[]).length>0,
      tktOpenTask:()=>this.setState({ tktOpen:null, route:'tasks', tkTab:'list', tkOpen:t.task }),
      tktReply:this.state.tktReply||'',
      tktSetReply:(e)=>this.setState({ tktReply:e.target.value }),
      tktReplyFiles:(this.state.tktReplyFiles||[]).map((f,i)=>({ name:f, remove:()=>{ const a=(this.state.tktReplyFiles||[]).slice(); a.splice(i,1); this.setState({tktReplyFiles:a}); } })),
      tktHasReplyFiles:(this.state.tktReplyFiles||[]).length>0,
      tktAddReplyFile:()=>this.openFilePicker('ticketReply','Attach to reply'),
      tktSend:()=>{ const v=(this.state.tktReply||'').trim(); const files=this.state.tktReplyFiles||[];
        if(!v && !files.length){ this.flash('Type a reply or attach a file.'); return; }
        this.tktPatch(t.id,{},v||('Attached '+files.length+' file'+(files.length>1?'s':'')), files);
        this.setState({ tktReply:'', tktReplyFiles:[] }); },
      tktCanTriage:isTriage,
      tktCanWork:isTriage||isOwner,
      tktCanDelete:canDeleteTicket,
      tktDelete:()=>{ if(!canDeleteTicket){ this.flash('You do not have permission to delete tickets.'); return; }
        this.confirmDelete('Delete Ticket?', 'Are you sure you want to delete "'+(t.subject||t.id)+'"? This action cannot be undone.', ()=>this._deleteTicket(t.id)); },
      tktCanClose:isRequester&&t.status==='Resolved',
      // Ownership + workflow-state only — deliberately not permission-gated,
      // matching the existing isRequester/tktCanClose precedent: a
      // requester can always act on their own not-yet-triaged ticket
      // regardless of role.
      tktCanEdit:this.tktCanEdit(t),
      tktOpenEditBtn:()=>this.tktOpenEdit(t.id),
      tktHasAssignee:!!t.assignee,
      tktOpenAssignBtn:()=>this.tktOpenAssign(),
      showAssignTicket:!!this.state.showAssignTicket,
      tktAmForm:this.state.tktAssignForm||{ assignee:t.assignee||'', priority:t.priority||'Medium', status:t.status||'Open' },
      tktAmAssigneeOptions:['Unassigned'].concat(people),
      tktAmPriorityOptions:this.TICKET_PRIORITIES(),
      tktAmStatusOptions:this.TICKET_STATES(),
      tktAmSetAssignee:(e)=>{ const v=e.target.value==='Unassigned'?'':e.target.value; this.setState({ tktAssignForm:{...(this.state.tktAssignForm||{}), assignee:v} }); },
      tktAmSetPriority:(e)=>this.setState({ tktAssignForm:{...(this.state.tktAssignForm||{}), priority:e.target.value} }),
      tktAmSetStatus:(e)=>this.setState({ tktAssignForm:{...(this.state.tktAssignForm||{}), status:e.target.value} }),
      tktAmCancel:()=>this.tktCloseAssign(),
      tktAmSave:()=>this.tktSaveAssign(),
      tktAmStop:(e)=>e.stopPropagation(),
      tktToggleTrainingD:()=>{ this.tktPatch(t.id,{ trainingNeeded:!t.trainingNeeded }, t.trainingNeeded?'Training flag removed':'Flagged as training need', null, true);
        this.flash(t.trainingNeeded?'Training flag removed.':'Flagged for training — visible to Manager / L&D.'); },
      tktTrainingLabel:t.trainingNeeded?'Remove training flag':'Flag as training need',
      tktResolve:()=>{ this.tktPatch(t.id,{ status:'Resolved' },'Resolved'); this.flash(t.id+' resolved — requester can confirm or reopen.'); },
      tktReopen:()=>{ this.tktPatch(t.id,{ status:'Open', assignee:t.assignee },'Reopened by requester'); this.flash(t.id+' reopened.'); },
      tktConfirm:()=>{ this.tktPatch(t.id,{ status:'Closed' },'Confirmed & closed by requester'); this.flash(t.id+' closed. Thanks for confirming.'); },
      // convert a ticket into real work
      tktToTask:()=>{
        const nid=this._nextSeqCode('TSK-', this._allTaskIdsEver(), 3400);
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
        this._persistNewTask(task, null, null);
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
    // QC Reviewer was missing from this list entirely (couldn't approve
    // from the drawer, only from the QC queue) — added. Never lets someone
    // approve/reassign their own submitted work, regardless of role.
    const isApprover=['qc','manager','team_lead','admin'].includes(rk) && !isAssignee;
    const canReassign=['manager','team_lead','admin','ceo'].includes(rk) && !isAssignee;
    const canEditDates=this.hasPerm('tasks','edit');
    const tn=this.tkTone(t.status);
    // t.contentType (the Content Type Master value) used to be shown here
    // mislabeled "Campaign Type" — same mislabel CreateTaskModal.jsx's
    // create form already had fixed. Corrected to its real name, "Content
    // type", and a genuine "Campaign Type" entry added alongside it for
    // t.campaignType (falling back to the linked Campaign's own type for
    // tasks created before this field existed) — the value that actually
    // drives which QC checklists get auto-inherited (campaignTypeQcData).
    const displayCampaignType = t.campaignType || (()=>{ if(!t.campaign||t.campaign==='—') return ''; const c=this.allCampaigns().find(x=>x.name===t.campaign); return c&&c.type?c.type:''; })();
    const meta=[['Campaign',t.campaign],['Campaign Type',displayCampaignType||'—'],['Content type',t.contentType||'—'],['Start date',t.start+(t.startTime?(' · '+t.startTime):'')],['End date',t.end+(t.endTime?(' · '+t.endTime):'')],['Priority',t.priority],['Assignee',t.assignee],['Reviewer / QC',t.reviewer],['Effort (est / actual)',t.estH+'h / '+t.actH+'h'],['Recurrence',t.recurrence],['Template',t.template],['Dependency',(t.dep||'—')+(t.dep&&t.dep!=='—'?(' · '+(t.depMode||'Parallel')):'')],['Effort plan',t.effortPlan||'—'],['Task ID',t.id]];
    const chain=this.tkChain(t);
    const stage=(x,role)=>x?{ id:x.id, name:x.name, division:x.division||'—', status:x.status, statusBg:this.tkTone(x.status).bg, statusColor:this.tkTone(x.status).c, role, open:()=>this.setState({ tkOpen:x.id }) }:null;
    const tkStages=[stage(chain.prev,'Previous stage'), stage({...t, division:t.division||'—'},'This task'), ...chain.next.map(n=>stage(n,'Next stage'))].filter(Boolean).map(s=>({ ...s, isThis:s.id===t.id }));
    const checklist=(t.checklist||[]).map((c,i)=>({ t:c.t, done:c.done,
      boxBg:c.done?'var(--verify-500)':'var(--paper)', boxBorder:c.done?'var(--verify-500)':'var(--line-300)', op:c.done?'1':'0',
      toggle:()=>{ if(!isAssignee){ this.flash('Only the assignee updates the checklist.'); return; } const arr=(t.checklist||[]).map((x,j)=>j===i?{...x,done:!x.done}:x); this.tkPatch(t.id,{checklist:arr},(c.done?'Unchecked':'Completed')+' checklist item — '+c.t); } }));
    const evidence=(t.evidence||[]).map(f=>{ const k=this.fileKind(f);
      return { name:f, icon:k.icon, open:()=>this.openFilePreview(f),
        download:(e)=>{ if(e)e.stopPropagation(); this.downloadFile(f); } }; });
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
      const comment={ id:'cmt-'+Date.now()+'-'+Math.random().toString(36).slice(2), who:this.currentPerson(), roleKey:rk, role:(rk==='qc'?'QC Reviewer':me.label+' (QC)'), text:(status==='Approved'?'Approved. ':'Rework requested. ')+(note||''), when:this.todayStr(), files:refs };
      this.tkPatch(t.id,{ status, qcFeedback:fbText, comments:[...cur,comment] }, label+(note?' — '+note:''));
      this.setState({ qcFb:{...(this.state.qcFb||{}),[t.id]:''}, qcRef:{...(this.state.qcRef||{}),[t.id]:{files:[],url:''}} });
      const unlocked=status==='Approved'?this.tkChain(t).next.filter(n=>(n.depMode||'Parallel')==='Sequential'):[];
      this.flash(status==='Approved'?('Approved · +'+t.units+' '+t.unit+' → '+t.kpi+'.'+(unlocked.length?(' Next stage unlocked: '+unlocked.map(n=>n.id).join(', ')+'.'):'')):'Rework requested — feedback & references sent to '+t.assignee+'.');
    };
    const canAttach=isAssignee && t.status!=='Approved';
    const tm=this.timerOf(id), elapsed=this.timerElapsed(id);
    const timerData={
      tmRunning:tm.running, tmElapsed:this.hms(elapsed),
      tmCanTrack:isAssignee||['manager','team_lead','admin'].includes(rk),
      tmLabel:tm.running?'Stop timer':'Start timer',
      tmIcon:tm.running?'square':'play',
      tmBtnStyle:'display:flex;align-items:center;gap:7px;padding:9px 16px;border:none;border-radius:11px;font-size:13px;font-weight:700;cursor:pointer;color:#fff;background:'+(tm.running?'var(--danger-600)':'#7A1C46'),
      tmToggle:()=>tm.running?this.stopTimer(id):this.startTimer(id),
      tmDotStyle:'width:8px;height:8px;border-radius:99px;background:'+(tm.running?'var(--danger-500)':'var(--ink-400)'),
      tmStatus:tm.running?'Running — time is being logged':'Not running',
      tmSessions:(tm.sessions||[]).slice().reverse().map(s=>({ dur:this.hms(s.secs), who:s.who, date:s.date,
        time:new Date(s.start).toLocaleTimeString('en-GB',{hour:'2-digit',minute:'2-digit'}) })),
      tmHasSessions:(tm.sessions||[]).length>0,
      ...(()=>{ const baseH=(tm.baseH!==undefined)?tm.baseH:(parseFloat(t.actH)||0);
        const totalH=Math.round((baseH+elapsed/3600)*100)/100;
        return {
          tmTotalLabel:(tm.sessions||[]).length+' session'+((tm.sessions||[]).length===1?'':'s')+' this cycle · '+totalH+' h actual'+(baseH?(' (incl. '+baseH+' h previously logged)'):'')+(t.estH?(' of '+t.estH+' h estimated'):''),
          tmProgressW:t.estH?Math.min(100,Math.round(totalH/t.estH*100))+'%':'0%',
          tmOver:t.estH&&totalH>t.estH }; })(),
    };
    return {
      ...(()=>{ const d=this.qcCommentDigest(t);
        return { tkQcDigestHas:d.hasAny,
          tkQcVerdictLine:d.verdictLabel||'Not reviewed yet',
          tkQcOverall:d.overall||'No overall QC note recorded.',
          tkQcLines:d.lines.map(l=>({ kpi:l.kpi, text:l.text, verdict:l.verdict,
            bg:l.verdict==='Compliant'?'var(--verify-100)':l.verdict==='Rework'?'var(--danger-100)':'var(--warn-100)',
            color:l.verdict==='Compliant'?'var(--verify-600)':l.verdict==='Rework'?'var(--danger-600)':'var(--warn-600)' })),
          tkQcHasLines:d.lines.length>0,
          tkQcCoverage:d.reviewed+' of '+d.total+' checks reviewed',
          tkQcW:d.total?Math.round(d.reviewed/d.total*100)+'%':'0%' }; })(),
      tkDrawerOpen:true, tkD:{ id:t.id, name:t.name, desc:t.desc, status:t.status, statusBg:tn.bg, statusColor:tn.c, kpi:t.kpi, kpiId:t.kpiId, contribution:'+'+t.units+' '+t.unit },
      ...(()=>{
        const mine=t.assignee===person;
        const canSet=mine||['manager','team_lead','admin'].includes(rk);
        const base=['Assigned','In Progress','Completed — send to QC'];
        const cur=t.status==='Submitted'?'Completed — send to QC':t.status;
        const opts=base.includes(cur)?base:[cur].concat(base);
        return {
          tkStatusCanSet:canSet && !['Approved','Closed'].includes(t.status),
          tkStatusOptions:opts, tkStatusVal:cur,
          tkSetStatusSel:(e)=>{ const v=e.target.value;
            if(v==='Completed — send to QC'){
              this.tkPatch(t.id,{ status:'Submitted' },'Marked complete — routed to QC ('+(t.reviewer||'QC team')+')');
              this.flash(t.id+' marked complete and sent to '+(t.reviewer||'the QC team')+' for review.');
            } else {
              this.tkPatch(t.id,{ status:v },'Status → '+v);
              this.flash(t.id+' → '+v+'.');
            } },
          tkStatusHint:t.status==='Submitted'
            ? ('Awaiting QC review by '+(t.reviewer||'the QC team')+'.')
            : (t.status==='Rework'
              ? 'QC sent this back — address the comments, then choose “Completed — send to QC”.'
              : 'Choosing “Completed — send to QC” routes this task to the QC queue automatically.') }; })(),
      ...timerData,
      tkHasFb:!!t.qcFeedback, tkFb:t.qcFeedback||'',
      ...(()=>{
        const canComment = isAssignee || ['manager','team_lead','admin','qc','coo','ceo','secretary'].includes(rk);
        const canEditComment=this.hasPerm('qc','edit'), canDeleteComment=this.hasPerm('qc','delete');
        const comments=(this.tkOv(t).comments||[]).map((c,ci)=>{ const cc=this._commentColor(c.who);
          const cid=c.id||String(ci);
          const editing=this.state.tkCommentEditId===cid;
          return { who:c.who, role:c.role, text:c.text, when:c.when,
          initials:c.who.split(' ').map(x=>x[0]).join(''),
          isQC:/QC|Manager|Lead|Admin/i.test(c.role),
          bubbleBg:cc.bg, bubbleBorder:cc.border,
          files:(c.files||[]).map(f=>({name:f, open:()=>this.openFilePreview(f)})), hasFiles:(c.files||[]).length>0,
          editedLabel:c.editedAt?'edited':'',
          canEdit:canEditComment, canDelete:canDeleteComment, hasActions:canEditComment||canDeleteComment,
          editing, editVal:editing?(this.state.tkCommentEditVal||''):'',
          setEditVal:(e)=>this.setState({ tkCommentEditVal:e.target.value }),
          startEdit:()=>this.setState({ tkCommentEditId:cid, tkCommentEditVal:c.text }),
          cancelEdit:()=>this.setState({ tkCommentEditId:null, tkCommentEditVal:'' }),
          saveEdit:()=>{ this.editComment(t.id, cid, this.state.tkCommentEditVal); this.setState({ tkCommentEditId:null, tkCommentEditVal:'' }); },
          delete:()=>this.deleteComment(t.id, cid) }; });
        const cfl=(this.state.tkCommentFiles||[]).map((f,i)=>({ name:f, remove:()=>{ const a=(this.state.tkCommentFiles||[]).slice(); a.splice(i,1); this.setState({tkCommentFiles:a}); } }));
        return {
          tkComments:comments, tkHasComments:comments.length>0, tkCanComment:canComment,
          tkCommentVal:this.state.tkComment||'', tkOnComment:(e)=>this.setState({ tkComment:e.target.value }),
          tkCommentFiles:cfl, tkHasCommentFiles:cfl.length>0,
          tkAddCommentFile:()=>this.openFilePicker('comment','Attach to comment'),
          tkPostComment:()=>{ const txt=(this.state.tkComment||'').trim(); const fls=this.state.tkCommentFiles||[];
            if(!txt && !fls.length){ this.flash('Write a comment or attach a document.'); return; }
            const me=this.ROLES[rk];
            const roleLabel = isAssignee ? me.tag : (rk==='qc'?'QC Reviewer':me.label);
            const cur=this.tkOv(t).comments||[];
            this.tkPatch(t.id,{ comments:[...cur,{ id:'cmt-'+Date.now()+'-'+Math.random().toString(36).slice(2), who:this.currentPerson(), role:roleLabel, roleKey:rk, text:txt, when:this.todayStr(), files:fls }] }, 'Commented'+(fls.length?' with '+fls.length+' attachment'+(fls.length>1?'s':''):''));
            this.setState({ tkComment:'', tkCommentFiles:[] });
            this.flash('Comment posted — visible to assignee and QC.'); },
        };
      })(),
      tkFbBg: t.status==='Rework'?'var(--danger-100)':'var(--verify-100)', tkFbBorder: t.status==='Rework'?'#F1C9CF':'#BFE3D0', tkFbColor: t.status==='Rework'?'var(--danger-600)':'var(--verify-600)',
      tkMeta:meta.map(m=>{
        if(m[0]==='Assignee'&&canReassign) return {
          k:m[0], v:m[1], isSelect:true, options:(this.state.users||[]).map(u=>u.name),
          onChange:e=>{ const na=e.target.value; this.tkPatch(t.id,{assignee:na},'Reassigned to '+na); this.flash('Task '+t.id+' reassigned to '+na+'.'); },
        };
        if(m[0]==='Content type'&&canEditDates){
          // Once QC has recorded any result against the Content-Type checklist,
          // or the task has reached a terminal state, switching Content Type
          // would silently swap the checklist under those results without
          // touching them (Part D.1: historical QC data is never rewritten or
          // deleted) — so require an explicit confirm rather than blocking or
          // silently allowing it.
          const ctQcNow=this.contentTypeQcData(t, rk);
          const hasQcResults=!!(ctQcNow.ctQcItems||[]).some(it=>it.status);
          const locked=hasQcResults || ['Approved','Closed'].includes(t.status);
          return {
            k:m[0], v:m[1], isSelect:true, options:['—'].concat(this.MASTERS_REG().contentType.rows.filter(r=>r.Status!=='Inactive').map(r=>r.Content_Type)),
            onChange:e=>{
              const nv=e.target.value==='—'?'':e.target.value;
              const apply=()=>this.tkPatch(t.id,{contentType:nv},'Content type → '+(nv||'—'));
              if(locked){
                this.confirmDelete('Change Content Type?',
                  'This task already has QC results recorded (or is Approved/Closed). Changing the Content Type will switch which QC checklist shows going forward — the existing results are kept, not deleted, but they belong to the previous type. Continue?',
                  apply, 'Change anyway');
              } else apply();
            },
          };
        }
        if(m[0]==='Campaign Type'&&canEditDates){
          // Changing Campaign Type re-derives the auto-inherited QC
          // checklist(s) live from the new value (campaignTypeQcData reads
          // t.campaignType fresh on every render) — nothing to manually
          // clear. Once any of those checklist items has a recorded result,
          // or the task is terminal, require the same explicit confirm as
          // Content Type above rather than silently swapping the checklist
          // set under existing results.
          const cmpQcNow=this.campaignTypeQcData(t);
          const hasQcResults=(cmpQcNow.cmpQcChecklists||[]).some(c=>(c.items||[]).some(it=>it.status));
          const locked=hasQcResults || ['Approved','Closed'].includes(t.status);
          return {
            k:m[0], v:m[1], isSelect:true, options:['—'].concat(this.CAMPAIGN_TYPES()),
            onChange:e=>{
              const nv=e.target.value==='—'?'':e.target.value;
              const apply=()=>this.tkPatch(t.id,{campaignType:nv},'Campaign Type → '+(nv||'—'));
              if(locked){
                this.confirmDelete('Change Campaign Type?',
                  'This task already has QC results recorded against its Campaign-Type checklist(s) (or is Approved/Closed). Changing the Campaign Type will load a different checklist set going forward — the existing results are kept, not deleted, but they belong to the previous type. Continue?',
                  apply, 'Change anyway');
              } else apply();
            },
          };
        }
        if((m[0]==='Start date'||m[0]==='End date')&&canEditDates){
          const isStart=m[0]==='Start date';
          return { k:m[0], v:m[1], isDateTime:true,
            dateVal:isStart?(t.startDate||''):(t.endDate||''),
            timeVal:isStart?(t.startTime||''):(t.endTime||''),
            onChangeDate:e=>this.editTaskDates(t.id, isStart?{startDate:e.target.value}:{endDate:e.target.value}),
            onChangeTime:e=>this.editTaskDates(t.id, isStart?{startTime:e.target.value}:{endTime:e.target.value}),
          };
        }
        return {k:m[0],v:m[1]};
      }), tkChecklist:checklist, tkEvidence:evidence, tkHasEvidence:evidence.length>0,
      tkActions:actions, tkHasActions:actions.length>0, tkCanAttach:canAttach,
      tkAttach:()=>this.openFilePicker('evidence:'+t.id,'Attach task evidence'),
      tkActivity:(this.tkOv(t).activity||[]).slice().reverse().map(a=>({who:a[0],what:a[1],when:a[2]})),
      tkQcPanel:qcPanel,
      tkQcFbVal:(this.state.qcFb||{})[t.id]||'', tkQcOnFb:(e)=>this.setState({ qcFb:{...(this.state.qcFb||{}),[t.id]:e.target.value} }),
      tkQcUrl:ref.url||'', tkQcOnUrl:(e)=>setRef({url:e.target.value}),
      tkQcFiles:(ref.files||[]).map((f,i2)=>({ name:f, open:()=>this.openFilePreview(f), remove:()=>{ const a=(ref.files||[]).slice(); a.splice(i2,1); setRef({files:a}); } })),
      tkQcHasFiles:(ref.files||[]).length>0,
      tkQcAddFile:()=>this.openFilePicker('qcref:'+t.id,'Attach QC reference'),
      tkStages, tkHasChain:tkStages.length>1,
      tkQcApprove:()=>qcFinish('Approved','QC approved — counted toward KPI'),
      tkQcRework:()=>qcFinish('Rework','Rework requested'),
      tkClose:()=>this.setState({ tkOpen:null }),
      tkCanDelete:this.hasPerm('tasks','delete'),
      tkDelete:()=>this.confirmDelete('Delete Task?', 'Are you sure you want to delete "'+(t.name||t.id)+'"? This action cannot be undone.', ()=>this._deleteTask(t.id)),
      tkKpiNote: t.status==='Approved' ? 'Counted toward KPI on approval.' : 'Counts toward the KPI once QC approves.',
      ...this.complianceData(t, rk),
      ...this.contentTypeQcData(t, rk),
      ...this.campaignTypeQcData(t),
    };
  }

  tkFormData(){
    const f=this.state.tkForm||{};
    const set=(k)=>(e)=>{
      const v=e.target.value; const nf={...this.state.tkForm,[k]:v};
      // "None" (v==='') leaves every field exactly as the user typed it —
      // no template to pull from. Picking a real template auto-fills
      // every field/variable it defines (name, description, unit,
      // estimated hours, priority, recurrence, linked KPI), the same way
      // it'll display once saved in Task Details/Task List.
      if(k==='template'){
        const tpl=v?this.allTaskTemplates().find(x=>x.name===v):null;
        if(tpl){
          nf.name=tpl.name; nf.desc=tpl.desc||''; nf.division=tpl.division||nf.division;
          nf.priority=tpl.priority||'Medium'; nf.recurrence=tpl.recurrence||'None';
          nf.units=nf.units||'1'; nf.estH=String(tpl.estH||1);
          if(tpl.kpiId) nf.kpiId=tpl.kpiId;
        }
      }
      // Picking a Campaign auto-fetches its Campaign Type — the other of
      // the two entry paths the user can use (pick Campaign Type directly,
      // below, is the first). Overwrites any previously-picked Campaign
      // Type so the two never sit out of sync; the QC checklist panel
      // reads campaignType live, so this alone clears/reloads whichever
      // checklists were showing.
      if(k==='campaign'){
        const camp=v&&v!=='—'?this.allCampaigns().find(x=>x.name===v):null;
        nf.campaignType=camp&&camp.type?camp.type:(nf.campaignType||'');
      }
      this.setState({ tkForm:nf });
    };
    const kpiPool=this.epKpiPool();
    const nextCode=this._nextSeqCode('TSK-', this._allTaskIdsEver(), 2060);
    const tpl=f.template?this.allTaskTemplates().find(x=>x.name===f.template):null;
    return {
      tkNew:this.state.tkNew, tkf:f, tkCode:nextCode,
      tkCloseNew:()=>this.setState({ tkNew:false, msgConvert:null }),
      tkTplOptions:[{name:''}].concat(this.allTaskTemplates().filter(x=>x.status!=='Archived').map(x=>({name:x.name}))),
      ...(()=>{
        const plan0=this.allEpPlans().find(p=>p.name===f.effortPlan);
        const row0=plan0&&plan0.rows.find(r=>r.type===f.effortRow);
        let pool=kpiPool, scoped=false, note='All KPIs — link an effort to narrow this list.';
        if(row0){
          const ids=[row0.kpiId].concat(row0.kpiIds||[]).filter(Boolean);
          const sub=kpiPool.filter(k=>ids.includes(k.id));
          if(sub.length){ pool=sub; scoped=true;
            note='Showing only the '+sub.length+' KPI'+(sub.length===1?'':'s')+' linked to “'+row0.type+'”.'; }
          else { pool=[]; scoped=true; note='“'+row0.type+'” is effort-only — no KPI linked to it.'; }
        } else if(plan0){
          const ids=plan0.rows.map(r=>r.kpiId).filter(Boolean);
          const sub=kpiPool.filter(k=>ids.includes(k.id));
          if(sub.length){ pool=sub; scoped=true;
            note='Showing the '+sub.length+' KPI'+(sub.length===1?'':'s')+' used by “'+plan0.name+'” — pick an effort to narrow further.'; }
        }
        return {
          tkKpiOptions:[{id:'',label:pool.length?'None — not KPI-linked':'None — effort only'}]
            .concat(pool.map(k=>({ id:k.id, label:k.kpi+' ('+k.unit+') — '+k.who }))),
          tkKpiScoped:scoped, tkKpiNote:note }; })(),
      tkCampaignOptions:['—'].concat(this.allCampaigns().map(c=>c.name)),
      // Campaign Type: selectable directly, OR auto-filled from the chosen
      // Campaign (see the 'campaign' branch in set() above) — either entry
      // path lands on the same f.campaignType. Whichever active QC
      // Checklists map to it (qcChecklistsForCampaign) are previewed here
      // and auto-inherited into the task on save, with no separate
      // checklist-picking step.
      tkCampaignTypeOptions:['—'].concat(this.CAMPAIGN_TYPES()),
      tkSetCampaignType:set('campaignType'),
      tkCampaignTypeChecklists:(()=>{
        if(!f.campaignType) return [];
        return this.MASTERS_REG().qcChecklist.rows
          .filter(r=>r.Campaign_Type===f.campaignType && r.Status!=='Inactive')
          .map(r=>r.Checklist);
      })(),
      tkAssigneeOptions:(this.state.users||[]).map(u=>u.name),
      tkDepOptions:['—'].concat(this.allTasks().map(t=>t.id+' — '+t.name)),
      tkSetTemplate:set('template'), tkSetName:set('name'), tkSetDesc:set('desc'), tkSetCampaign:set('campaign'), tkSetStart:set('start'), tkSetEnd:set('end'), tkSetStartTime:set('startTime'), tkSetEndTime:set('endTime'), tkSetPriority:set('priority'), tkSetAssignee:set('assignee'), tkSetKpi:set('kpiId'), tkSetUnits:set('units'), tkSetEst:set('estH'), tkSetRecurrence:set('recurrence'), tkSetDep:set('dep'), tkSetDepMode:set('depMode'), tkSetReviewer:set('reviewer'), tkSetDivision:set('division'),
      tkDivisionOptions:this.liveDeptOptions(),
      // "Campaign Type" on Tasks is the same Content Type Master that backs
      // Content Repository's "Content Type" and (later) QC's checklist
      // lookup — one shared vocabulary flowing Task → Content → QC, just
      // labelled differently per screen, not a separate master.
      tkContentTypeOptions:this.MASTERS_REG().contentType.rows.filter(r=>r.Status!=='Inactive').map(r=>r.Content_Type),
      tkSetContentType:set('contentType'),
      tkReviewerOptions:(this.state.users||[])
        .filter(u=>['Team Lead','Manager','QC Reviewer','COO','CEO','Admin'].some(r=>(u.role||'').includes(r)))
        .map(u=>u.name+' ('+u.role+')'),
      tkEffortOptions:[{v:'',label:'None — standalone task'}].concat(this.allEpPlans().map(p=>({ v:p.name, label:p.name+' · '+p.division }))),
      ...(()=>{
        const plan=this.allEpPlans().find(p=>p.name===f.effortPlan);
        const selectedRow=plan&&plan.rows.find(x=>x.type===f.effortRow);
        // Target/Remaining: usedUnits accumulates every task's Contribution
        // Units against this ONE row (see tkSubmitNew's deduction) — the
        // row's own `monthly` target is never mutated, so "remaining" is
        // always derivable and other rows in the same plan are untouched.
        const remainingFor=(r)=>Math.max(0,(r.monthly||0)-(r.usedUnits||0));
        return {
          tkSetEffort:(e)=>this.setState({ tkForm:{...f, effortPlan:e.target.value, effortRow:'', units:'', estH:''} }),
          tkHasPlan:!!plan,
          tkPlanInfo: plan ? (plan.division+' · '+plan.period+' · owner: '+plan.owner) : '',
          tkEffortRowOptions: plan ? [{v:'',label:'Choose the effort this task delivers…'}].concat(plan.rows.map(r=>({ v:r.type, label:r.type+' — '+remainingFor(r).toLocaleString('en-US')+' '+r.unit+' remaining (of '+(r.monthly||0).toLocaleString('en-US')+' target)' }))) : [],
          tkEffortRowVal:f.effortRow||'',
          // Contribution Units / Estimated Hours are no longer guessed from
          // the monthly target — the user enters both manually, and
          // tkSubmitNew validates the units against this row's remaining
          // target before deducting. KPI/priority/name still auto-fill
          // since those aren't part of the manual-entry requirement.
          tkSetEffortRow:(e)=>{ const v=e.target.value; const r=plan&&plan.rows.find(x=>x.type===v); const nf={...f, effortRow:v, units:'', estH:''};
            if(r){ nf.kpiId=r.kpiId||''; nf.priority=r.priority; if(!f.name){ nf.name=r.type+' — '+plan.name; } }
            this.setState({ tkForm:nf }); this.flash(r?'KPI & priority auto-filled — enter Contribution Units and Estimated Hours for this task.':''); },
          tkEffortRemainingHint: selectedRow ? (remainingFor(selectedRow).toLocaleString('en-US')+' '+selectedRow.unit+' remaining of '+(selectedRow.monthly||0).toLocaleString('en-US')+' target for “'+selectedRow.type+'”') : '',
        };
      })(),
      tkTplChecklist:(tpl?tpl.checklist:[]).join(' · '),
      tkSubmitNew:()=>this.tkSubmitNew(),
    };
  }
  tkSubmitNew(){
    const f=this.state.tkForm||{};
    if(!f.name||!f.name.trim()){ this.flash('Enter a task name.'); return; }
    if(!(parseFloat(f.estH)>0)){ this.flash('Enter estimated hours — capacity planning and utilisation depend on it.'); return; }
    // When a single Effort is selected, Contribution Units is the amount
    // of that effort's remaining target THIS task will consume — must be
    // entered (manually, not guessed) and can't exceed what's left, since
    // it gets deducted from that one Effort row (and only that row) below.
    const plan0=f.effortPlan?this.allEpPlans().find(p=>p.name===f.effortPlan):null;
    const row0=(plan0&&f.effortRow)?plan0.rows.find(r=>r.type===f.effortRow):null;
    if(row0){
      const units0=parseFloat(f.units);
      if(!(units0>0)){ this.flash('Enter Contribution Units for “'+row0.type+'”.'); return; }
      const remaining0=Math.max(0,(row0.monthly||0)-(row0.usedUnits||0));
      if(units0>remaining0){ this.flash('Contribution Units ('+units0+') exceeds the '+remaining0.toLocaleString('en-US')+' '+row0.unit+' remaining on “'+row0.type+'”.'); return; }
    }
    const kpiPool=this.epKpiPool();
    const k=kpiPool.find(x=>x.id===f.kpiId);
    const tpl=(f.template?this.allTaskTemplates().find(x=>x.name===f.template):null)||{checklist:[]};
    const id=this._nextSeqCode('TSK-', this._allTaskIdsEver(), 2060);
    const who=this.currentPerson();
    const task={ id, name:f.name.trim(), desc:f.desc||'—', template:f.template||'', project:f.project||'—', campaign:f.campaign||'—', start:this.fmtDate(f.start)||this.todayStr(), end:this.fmtDate(f.end)||'—', startDate:f.start||'', endDate:f.end||'', startTime:f.startTime||'', endTime:f.endTime||'', priority:f.priority||'Medium', assignee:f.assignee||'Neha Verma', kpiId:f.kpiId||'', kpi:k?k.kpi:'Not linked', units:parseInt(f.units,10)||0, unit:k?k.unit:(row0?row0.unit:''), estH:parseInt(f.estH,10)||0, actH:0, recurrence:f.recurrence||'None', reviewer:f.reviewer||who, effortPlan:f.effortPlan||'', effortType:f.effortRow||'', depMode:f.depMode||'Parallel', division:f.division||'Content', contentType:f.contentType||'', campaignType:(f.campaignType&&f.campaignType!=='—')?f.campaignType:'', checklist:tpl.checklist.map(t=>({t,done:false})), dep:f.dep||'—', evidence:[], status:'Assigned', activity:[[who,'Created & assigned','' +this.todayStr()]] };
    const fromMsg=this.state.msgConvert;
    this.setState({ tkAdded:[...(this.state.tkAdded||[]),task], tkNew:false, tkOpen:fromMsg?null:id, msgConvert:null });
    if(fromMsg) this._linkMessageToTask(fromMsg, id);
    if(row0) this._deductEffort(plan0.name, row0.type, task.units, task.estH);
    this.flash('Task '+id+' created and assigned to '+task.assignee+(fromMsg?' — linked back to the message.':'.'));
    this._persistNewTask(task, f.start||null, f.end||null, f.startTime||null, f.endTime||null);
  }
  // Shared by every task-creation path (single-task form, Convert Idea to
  // Tasks, Generate from Effort Plan) so a task only has to be built once
  // and persisted the same way everywhere. rawStart/rawEnd are the raw
  // date-input values where available (ISO); the bulk generators don't
  // always have one, so those pass null rather than the pre-formatted
  // display string — Postgres's date column would reject or misparse
  // "Jul 1, 2026", so null (shown as "today" on next load) is safer than
  // a value that looks right but silently corrupts.
  _persistNewTask(task, rawStart, rawEnd, rawStartTime, rawEndTime){
    supabase.from('tasks').insert({
      code:task.id, name:task.name, description:task.desc, priority:task.priority, status:task.status,
      division:task.division, project:task.project, campaign:task.campaign,
      assignee_name:task.assignee, reviewer_name:task.reviewer,
      start_date:rawStart||null, end_date:rawEnd||null,
      start_time:rawStartTime||null, end_time:rawEndTime||null,
      effort_estimate:task.estH, effort_actual:task.actH, recurrence:task.recurrence, checklist:task.checklist,
      linked_kpi:task.kpi, kpi_id:task.kpiId, units:task.units, unit:task.unit,
      dependency:task.dep, effort_plan:task.effortPlan, effort_row:task.effortType, dep_mode:task.depMode,
      evidence:task.evidence, comments:[], activity:task.activity,
      created_by:this.state.authUser?this.state.authUser.id:null,
    }).then(({error})=>{
      if(error) console.warn('[supabase] task insert failed:', error.message);
      // Only fires once the row actually exists — content_type/campaign_type
      // are separate UPDATEs (schema_v24.sql / schema_v29.sql, see
      // _persistTaskContentType/_persistTaskCampaignType), and firing them in
      // parallel with the INSERT let them race ahead and match zero rows,
      // silently dropping the value on every new task.
      else { this._persistTaskContentType(task.id, task.contentType); this._persistTaskCampaignType(task.id, task.campaignType); }
    });
  }
  // content_type is a separate, best-effort write (schema_v24.sql) rather
  // than a field in the main insert/upsert above — those two calls carry
  // EVERY task field and run for every single task create/edit, so if
  // content_type were baked into them, a database that hasn't run that
  // migration yet would fail to create or update ANY task at all (unknown
  // column). Isolating it here means it silently no-ops (with a console
  // warning) until the migration lands, instead of breaking task CRUD.
  _persistTaskContentType(code, contentType){
    if(contentType===undefined) return;
    supabase.from('tasks').update({ content_type:contentType||null }).eq('code', code).then(({error})=>{
      if(error) console.warn('[supabase] task content_type save failed — has schema_v24.sql (content_type column) been applied?', error.message);
    });
  }
  // Same best-effort, separate-write pattern as _persistTaskContentType
  // above (schema_v29.sql), for the Campaign Type that drives the
  // auto-inherited QC checklist(s).
  _persistTaskCampaignType(code, campaignType){
    if(campaignType===undefined) return;
    supabase.from('tasks').update({ campaign_type:campaignType||null }).eq('code', code).then(({error})=>{
      if(error) console.warn('[supabase] task campaign_type save failed — has schema_v29.sql (campaign_type column) been applied?', error.message);
    });
  }
  _linkMessageToTask(msgId, taskId){
    const th=this.allThreads().find(t=>t.msgs.some(x=>x.id===msgId));
    if(!th) return;
    const msg=th.msgs.find(x=>x.id===msgId);
    this._patchMessage(th.id, msg, { taskId });
  }

  // Loads every Supabase-backed task and replaces tkAdded with the persisted
  // set, so created/edited tasks survive reloads and are shared across users.
  // Every task code ever issued, including soft-deleted ones — mirrors
  // _allContentPageIdsEver()'s reasoning exactly: a deleted task's row
  // still exists (deleted:true) in Supabase, so a new task reusing that
  // same code would collide with it on insert. Length-based id generation
  // (this.state.tkAdded.length) doesn't see deleted rows at all, which is
  // exactly how a real collision happened during Phase C verification.
  _allTaskIdsEver(){
    return this.allTasks().map(t=>t.id).concat(this.state.tkDeletedIds||[]);
  }
  async _loadTasks(){
    const { data, error } = await supabase.from('tasks').select('*').order('created_at', { ascending:true });
    if(error){ console.warn('[supabase] task load failed:', error.message); return; }
    this.setState({ tkDeletedIds:(data||[]).filter(r=>r.deleted).map(r=>r.code) });
    const mapped=(data||[]).filter(r=>!r.deleted).map(r=>({
      id:r.code, name:r.name, desc:r.description||'—', template:'Custom task',
      project:r.project||'—', campaign:r.campaign||'—',
      start:this.fmtDate(r.start_date)||this.todayStr(), end:this.fmtDate(r.end_date)||'—',
      startDate:r.start_date||'', endDate:r.end_date||'', startTime:r.start_time||'', endTime:r.end_time||'',
      priority:r.priority||'Medium', assignee:r.assignee_name||'Unassigned',
      kpiId:r.kpi_id||'', kpi:r.linked_kpi||'Not linked', units:r.units||0, unit:r.unit||'',
      estH:r.effort_estimate||0, actH:r.effort_actual||0, recurrence:r.recurrence||'None',
      reviewer:r.reviewer_name||'—', effortPlan:r.effort_plan||'', effortType:r.effort_row||'',
      depMode:r.dep_mode||'Parallel', division:r.division||'Content',
      checklist:r.checklist||[], dep:r.dependency||'—', evidence:r.evidence||[],
      comments:r.comments||[], status:r.status||'Assigned', activity:r.activity||[],
      qcFeedback:r.qc_feedback||'', reworkCount:r.rework_count||0,
      contentType:r.content_type||'', campaignType:r.campaign_type||'',
    }));
    this.setState({ tkAdded:mapped, tkUpd:{} });
  }

  OKR_REVIEWERS(){
    const list=(this.state.users||[]).filter(u=>['manager','team_lead','coo','ceo','admin','qc','secretary'].includes(u.roleKey)).map(u=>u.name+' ('+u.role+')');
    return list.length?list:[this.currentPerson()+' ('+this.ROLES[this.state.roleKey].label+')'];
  }
  okrReviewerOpt(name){ if(!name) return this.OKR_REVIEWERS()[0];
    const hit=this.OKR_REVIEWERS().find(o=>o===name||o.split(' (')[0]===String(name).split(' (')[0]);
    return hit||name; }
  openOkrEdit(id){
    const o=this.OKR_DATA().find(x=>x.id===id);
    if(!o) return;
    this.setState({ showOkrPanel:true, okrSection:'okrA', okrEditId:id,
      okrForm:{ title:o.title, desc:o.desc||'', owner:o.owner, dept:o.dept, brand:o.brand, businessUnit:o.businessUnit||'', websiteDomain:o.websiteDomain||'', campaign:o.campaign&&o.campaign!=='—'?o.campaign:'', category:o.category, scope:o.scope, priority:o.priority||this.okrPriority(o).label,
        cycle:o.cycle, reviewFreq:o.reviewFreq||'Weekly', start:this.isoDate(o.start), end:this.isoDate(o.due),
        parent:o.parent||'None (top level)', dependsOn:o.dependsOn||'', effortTargets:o.effortTargets||'',
        progressCalc:o.progressCalc||'Automatic (from KPI logs)', dataSource:o.dataSource||'GA4',
        reviewer:this.okrReviewerOpt(o.reviewer), status:o.status==='Archived'?'Draft':o.status, risks:o.risks||'', contributors:o.contributors||[] },
      okrDraftKRs:(o.krs||[]).map((k,i)=>({ id:i+1, kr:k.t, kpiSel:k.kpi, unit:k.unit, baseline:k.baseline, target:k.target, current:k.current, weight:String(k.weight),
        who:k.who, freq:k.freq||'Monthly', due:this.isoDate(k.due),
        tool:k.tool||'', method:k.method||'', mfreq:k.mfreq||'', evidence:k.evidence||'', tsrc:k.tsrc||'Manual', tref:k.tref||'',
        taskLinks:(k.taskLinks||[{key:''}]), effortLinks:(k.effortLinks||[{key:''}]) })),
      okrKRSeq:(o.krs||[]).length+1,
    });
  }
  _saveOkr(activate, wOk, wTotal, rk){
    const f=this.state.okrForm||{};
    if(!f.title||!f.title.trim()){ this.flash('Enter an objective title.'); return; }
    if(!f.end){ this.flash('Select a Due Date.'); return; }
    if(activate && !wOk){ this.flash('Key-result weights must total 100% (now '+wTotal+'%).'); return; }
    // Leaving "Linked KPI name" blank on a KR used to silently fall back
    // to "KPI 1"/"KPI 2" placeholders — meaningless everywhere that KR's
    // KPI gets shown (Effort Planner, Campaigns, checklists). Same
    // draft-lenient/activate-strict pattern as the weight check above.
    if(activate){
      const missing=(this.state.okrDraftKRs||[]).findIndex(k=>!k.kpiSel||!k.kpiSel.trim());
      if(missing>=0){ this.flash('Key result '+(missing+1)+' needs a Linked KPI name before this OKR can be activated.'); return; }
    }
    const krs=(this.state.okrDraftKRs||[]).map((k,i)=>({
      t:k.kr&&k.kr.trim()?k.kr.trim():'Key result '+(i+1), kpi:k.kpiSel||'KPI '+(i+1),
      baseline:k.baseline||'0', target:k.target||'100', current:k.current||'0', unit:k.unit||'units',
      weight:parseInt(k.weight,10)||0, who:k.who||f.owner, freq:k.freq||'Monthly', due:this.fmtDate(k.due)||'Mar 31', status:'Active',
      tool:k.tool||'', method:k.method||'', mfreq:k.mfreq||'', evidence:k.evidence||'', tsrc:k.tsrc||'Manual', tref:k.tref||'',
      taskLinks:(k.taskLinks||[]).filter(x=>x.key), effortLinks:(k.effortLinks||[]).filter(x=>x.key),
    }));
    const editId=this.state.okrEditId;
    const shared={ title:f.title.trim(), desc:f.desc||'', owner:f.owner, dept:f.dept, brand:f.brand, businessUnit:f.businessUnit||'', websiteDomain:f.websiteDomain||'', campaign:f.campaign||'—', category:f.category||f.dept,
      scope:f.scope||'Department', priority:f.priority||'Medium', cycle:f.cycle||'Q1 2026', reviewFreq:f.reviewFreq||'Weekly',
      start:this.fmtDate(f.start)||this.todayStr(), due:this.fmtDate(f.end),
      parent:f.parent||'None (top level)', dependsOn:f.dependsOn||'', effortTargets:f.effortTargets||'',
      progressCalc:f.progressCalc||'Automatic (from KPI logs)', dataSource:f.dataSource||'GA4',
      reviewer:f.reviewer||this.currentPerson(), risks:f.risks||'', krs, status: activate?(f.status&&f.status!=='Draft'?f.status:'Active'):'Draft',
      contributors:(f.contributors||[]), team:(f.contributors&&f.contributors.length)?('+'+f.contributors.length):'' };
    if(editId){
      const prev=this.OKR_DATA().find(x=>x.id===editId)||{};
      const ver='v'+(parseFloat(String(prev.v||'v1.0').replace('v',''))+0.1).toFixed(1);
      this.setState({ okrUpd:{...(this.state.okrUpd||{}), [editId]:{...shared, v:ver}},
        showOkrPanel:false, okrEditId:null, okrDraftKRs:[{id:1,weight:'50'},{id:2,weight:'50'}], okrKRSeq:3 });
      this.flash('Changes saved to '+(prev.code||editId)+' ('+ver+').');
      if(prev.code) this._persistOkr(prev.code, {
        title:shared.title, description:shared.desc, category:shared.category,
        scope:shared.scope, division:shared.dept, status:shared.status, key_results:krs,
        business_unit:shared.businessUnit, website_domain:shared.websiteDomain, contributors:shared.contributors, owner:shared.owner,
        brand:shared.brand||null, reviewer:shared.reviewer||null, start_date:f.start||null, due_date:f.end||null,
      });
      return;
    }
    // Derived from the highest previously-issued number for this prefix
    // (seed + added + deleted), not a visible/filtered count — a filtered
    // OKR list can undercount the true total and mint a code that collides
    // with (and silently shadows) an existing OKR.
    const prefix='OKR-'+(this.ROLES[rk].bucket==='admin'?'GEN':'SEO')+'-Q1-';
    const allCodes=this.OKR_DATA().map(o=>o.code).concat((this.state.okrAdded||[]).map(o=>o.code)).concat(this.state.okrDeleted||[]);
    const nums=allCodes.filter(c=>c&&c.indexOf(prefix)===0).map(c=>parseInt(c.slice(prefix.length),10)||0);
    const code=prefix+String(Math.max(0,...nums)+1).padStart(3,'0');
    const okr={
      id:'okr-local-'+Date.now(), code, v:'v1.0', team:'', campaign:'', daysLeft:0, cycleElapsed:0,
      weight:100, approver:this.currentPerson(), ...shared,
    };
    this.setState({ okrAdded:[...(this.state.okrAdded||[]), okr], showOkrPanel:false,
      okrDraftKRs:[{id:1,weight:'50'},{id:2,weight:'50'}], okrKRSeq:3 });
    this.flash(activate ? 'OKR '+code+' saved & activated.' : 'OKR '+code+' saved as draft.');
    supabase.from('okrs').insert({
      code, title:okr.title, description:okr.desc, category:okr.category, scope:okr.scope, division:okr.dept,
      status:okr.status, key_results:krs, business_unit:okr.businessUnit, website_domain:okr.websiteDomain,
      contributors:okr.contributors, owner:okr.owner, brand:okr.brand||null, reviewer:okr.reviewer||null, approver:okr.approver||null,
      start_date:f.start||null, due_date:f.end||null,
      created_by:this.state.authUser?this.state.authUser.id:null,
    }).then(({error})=>{
      if(error) console.warn('[supabase] okr insert failed:', error.message);
    });
  }
  _deleteOkr(){
    if(!this.hasPerm('okr','delete')){ this.flash('You do not have permission to delete OKRs.'); return; }
    const id=this.state.okrEditId; if(!id) return;
    const o=this.OKR_DATA().find(x=>x.id===id); if(!o) return;
    this.setState({ okrDeleted:[...(this.state.okrDeleted||[]), o.code], showOkrPanel:false, okrEditId:null,
      okrDraftKRs:[{id:1,weight:'50'},{id:2,weight:'50'}], okrKRSeq:3 });
    this.flash('Deleted OKR: '+(o.code||id)+'.');
    // upsert (not update) — a seed OKR that's never been edited has no DB
    // row yet, so this is what makes the deletion stick past reload.
    supabase.from('okrs').upsert({
      code:o.code, title:o.title, description:o.desc, category:o.category, scope:o.scope, division:o.dept,
      status:o.status, key_results:o.krs||[], business_unit:o.businessUnit, website_domain:o.websiteDomain,
      deleted:true, created_by:this.state.authUser?this.state.authUser.id:null,
    }, { onConflict:'code' }).then(({error})=>{
      if(error) console.warn('[supabase] okr delete failed:', error.message);
    });
  }

  // Loads every Supabase-backed OKR and replaces okrAdded, so created OKRs
  // survive reloads and are shared across users.
  async _loadOkrs(){
    const { data, error } = await supabase.from('okrs').select('*').order('created_at', { ascending:true });
    if(error){ console.warn('[supabase] okr load failed:', error.message); return; }
    const rows=data||[];
    const mapped=rows.filter(r=>!r.deleted).map(r=>({
      id:'okr-'+r.id, code:r.code, v:'v1.0', scope:r.scope||'Department', title:r.title, desc:r.description||'',
      owner:r.owner||(r.key_results&&r.key_results[0]&&r.key_results[0].who)||'—',
      contributors:r.contributors||[], team:(r.contributors&&r.contributors.length)?('+'+r.contributors.length):'', cycle:'Q1 2026',
      brand:r.brand||'', businessUnit:r.business_unit||'', websiteDomain:r.website_domain||'', dept:r.division||'', campaign:'', category:r.category||r.division||'',
      progress:0, due:this.fmtDate(r.due_date)||'—', start:this.fmtDate(r.start_date)||this.todayStr(), daysLeft:0, cycleElapsed:0,
      status:r.status||'Draft', weight:100, reviewer:r.reviewer||'', approver:r.approver||'',
      krs:r.key_results||[],
    }));
    this.setState({ okrAdded:mapped, okrDeleted:rows.filter(r=>r.deleted).map(r=>r.code) });
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
      brands:p.brands||[], avatar_url:p.avatar_url||'', hiddenWidgets:p.dashboard_widgets||[],
      hiddenLeadColumns:p.hidden_lead_columns||[],
    }));
    if(mapped.length) this.setState({ users:mapped });
  }

  _saveRecord(){
    const editKey=this.state.recordEditKey;
    if(!this.hasPerm('repositories', editKey!=null?'edit':'create')){ this.flash('You do not have permission to '+(editKey!=null?'edit':'create')+' repository records.'); return; }
    const f=this.state.recordForm||{};
    const kind=this.state.recordKind;
    if(!f.name||!f.name.trim()){ this.flash('Enter a name.'); return; }
    const label=this._recordLabel(kind);

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
      // Editing a demo/seed record (RECORDS_SEED) — its synthetic key
      // ('projects#seed#0' etc.) isn't a real records.id, so this upserts
      // by the unique seed_key column instead, same "first edit creates a
      // real row" pattern used everywhere else in this migration.
      const ov={ name:f.name.trim(), type:f.type, owner:f.owner, status:f.status };
      const recordOverrides={...this.state.recordOverrides, [editKey]:ov};
      this.setState({ recordOverrides, showRecordModal:false });
      this.flash(label+' "'+f.name.trim()+'" updated.');
      supabase.from('records').upsert({
        seed_key:editKey, kind, name:ov.name, type:ov.type, owner:ov.owner, status:ov.status, deleted:false,
        created_by:this.state.authUser?this.state.authUser.id:null,
      }, { onConflict:'seed_key' }).then(({error})=>{
        if(error) console.warn('[supabase] record seed-override upsert failed:', error.message);
      });
    }
  }

  _deleteRecord(){
    if(!this.hasPerm('repositories','delete')){ this.flash('You do not have permission to delete repository records.'); return; }
    const kind=this.state.recordKind;
    const editKey=this.state.recordEditKey;
    if(editKey==null) return;
    if(this.state.recordIsReal){
      this.setState({ recordsAdded:this.state.recordsAdded.filter(r=>r.id!==editKey), showRecordModal:false });
      supabase.from('records').delete().eq('id', editKey).then(({error})=>{
        if(error) console.warn('[supabase] record delete failed:', error.message);
      });
    } else {
      const prevOv=(this.state.recordOverrides||{})[editKey]||{};
      this.setState({ recordOverrides:{...this.state.recordOverrides, [editKey]:{...prevOv, deleted:true}}, showRecordModal:false });
      supabase.from('records').upsert({
        seed_key:editKey, kind, name:prevOv.name||'', type:prevOv.type||'', owner:prevOv.owner||'', status:prevOv.status||'Draft', deleted:true,
        created_by:this.state.authUser?this.state.authUser.id:null,
      }, { onConflict:'seed_key' }).then(({error})=>{
        if(error) console.warn('[supabase] record seed-delete upsert failed:', error.message);
      });
    }
    this.flash(this._recordLabel(kind)+' deleted.');
  }

  async _loadRecords(){
    const { data, error } = await supabase.from('records').select('*').order('created_at', { ascending:true });
    if(error){ console.warn('[supabase] records load failed:', error.message); return; }
    const rows=data||[];
    // Rows with a seed_key are an edit/delete of one of the hardcoded demo
    // Projects/Campaigns rows (RECORDS_SEED) — those go into recordOverrides
    // keyed by that seed_key, same overlay recordsFor() already reads.
    // Genuinely new records (seed_key null) go into recordsAdded as before.
    const mapped=rows.filter(r=>!r.seed_key).map(r=>({ id:'record-'+r.id, kind:r.kind, name:r.name, type:r.type||'', owner:r.owner||'', status:r.status||'Draft' }));
    const overrides={};
    rows.filter(r=>r.seed_key).forEach(r=>{ overrides[r.seed_key]={ name:r.name, type:r.type, owner:r.owner, status:r.status, deleted:r.deleted }; });
    this.setState({ recordsAdded:mapped, recordOverrides:overrides });
  }

  // The modules below (SOPs, Tickets, Content Pages, Campaigns, Leads,
  // Contacts, Threads/Messages, Templates) all store their full record as a
  // single `payload` jsonb column — see supabase/schema_v2.sql for why: none
  // of them are ever filtered/sorted server-side, so per-field columns would
  // just be dead weight. Loading always means `{...row.payload, id:row.id}`.
  async _loadSops(){
    const { data, error } = await supabase.from('sops').select('*').order('created_at', { ascending:true });
    if(error){ console.warn('[supabase] sops load failed:', error.message); return; }
    this.setState({ sopAdded:(data||[]).map(r=>({ ...r.payload, id:r.id })) });
  }
  async _loadTickets(){
    // Loads every row regardless of `deleted` — a deleted seed ticket still
    // needs its id in tktDeleted on every load, or the hardcoded TICKET_SEED()
    // entry (baked into the JS bundle) would silently reappear.
    const { data, error } = await supabase.from('tickets').select('*').order('created_at', { ascending:true });
    if(error){ console.warn('[supabase] tickets load failed:', error.message); return; }
    const rows=data||[];
    this.setState({
      tktAdded:rows.filter(r=>!r.deleted).map(r=>({ ...r.payload, id:r.id })),
      tktDeleted:rows.filter(r=>r.deleted).map(r=>r.id),
    });
  }
  async _loadContentPages(){
    const { data, error } = await supabase.from('content_pages').select('*').order('created_at', { ascending:true });
    if(error){ console.warn('[supabase] content_pages load failed:', error.message); return; }
    const rows=data||[];
    this.setState({
      cAdded:rows.filter(r=>!r.deleted).map(r=>({ ...r.payload, id:r.id })),
      cDeleted:rows.filter(r=>r.deleted).map(r=>r.id),
    });
  }
  async _loadBacklinkDomains(){
    const { data, error } = await supabase.from('backlink_domains').select('*').order('created_at', { ascending:true });
    if(error){ console.warn('[supabase] backlink domains load failed:', error.message); return; }
    const seedIds=new Set(this._bldSeedOnly().map(d=>d.id));
    const overrides={}, added=[], deletedIds=[];
    (data||[]).forEach(r=>{
      if(r.deleted){ deletedIds.push(r.id); return; }
      if(seedIds.has(r.id)) overrides[r.id]=r.payload;
      else added.push({ ...r.payload, id:r.id });
    });
    this.setState({ blOverrides:overrides, blAdded:added, blDeleted:deletedIds });
  }
  async _loadPlaybookReads(){
    if(!this.state.authUser) return;
    const { data, error } = await supabase.from('playbook_reads').select('brand_key,chapter_key').eq('created_by', this.state.authUser.id);
    if(error){ console.warn('[supabase] playbook reads load failed:', error.message); return; }
    const r={};
    (data||[]).forEach(row=>{ r[row.brand_key]=[...(r[row.brand_key]||[]), row.chapter_key]; });
    this.setState({ pbRead:r });
  }
  async _loadCampaigns(){
    // Loads every row regardless of `deleted` — a deleted seed campaign
    // still needs its id in cmpDeleted on every load, or the hardcoded
    // CAMPAIGNS_SEED() entry (which the delete never actually removes,
    // it's baked into the JS bundle) would silently reappear.
    const { data, error } = await supabase.from('campaigns').select('*').order('created_at', { ascending:true });
    if(error){ console.warn('[supabase] campaigns load failed:', error.message); return; }
    const rows=data||[];
    this.setState({
      cmpAdded:rows.filter(r=>!r.deleted).map(r=>({ ...r.payload, id:r.id })),
      cmpDeleted:rows.filter(r=>r.deleted).map(r=>r.id),
    });
  }
  async _loadLeads(){
    const { data, error } = await supabase.from('leads').select('*').order('created_at', { ascending:true });
    if(error){ console.warn('[supabase] leads load failed:', error.message); return; }
    const rows=data||[];
    this.setState({
      leadAdded:rows.filter(r=>!r.deleted).map(r=>({ ...r.payload, id:r.id })),
      leadDeleted:rows.filter(r=>r.deleted).map(r=>r.id),
    });
  }
  async _loadContacts(){
    const { data, error } = await supabase.from('contacts').select('*').order('created_at', { ascending:true });
    if(error){ console.warn('[supabase] contacts load failed:', error.message); return; }
    const rows=data||[];
    this.setState({
      contactAdded:rows.filter(r=>!r.deleted).map(r=>({ ...r.payload, id:r.id })),
      contactDeleted:rows.filter(r=>r.deleted).map(r=>r.id),
    });
  }
  async _loadThreads(){
    const { data:threadRows, error:tErr } = await supabase.from('threads').select('*').order('created_at', { ascending:true });
    if(tErr){ console.warn('[supabase] threads load failed:', tErr.message); return; }
    const { data:msgRows, error:mErr } = await supabase.from('messages').select('*').order('created_at', { ascending:true });
    if(mErr){ console.warn('[supabase] messages load failed:', mErr.message); return; }
    const byThread={};
    (msgRows||[]).forEach(r=>{ (byThread[r.thread_id]=byThread[r.thread_id]||{})[r.payload.id]=r.payload; });
    this.setState({
      thNew:(threadRows||[]).map(r=>({ ...r.payload, id:r.id, msgs:[] })),
      thAdded:byThread,
    });
  }
  async _loadTemplates(){
    // Loads every row regardless of `deleted` — a deleted seed template still
    // needs its id in the matching xDeleted array on every load, or the
    // hardcoded TASK_TEMPLATES()/OKR_TEMPLATES()/KPI_TEMPLATES() entry (baked
    // into the JS bundle) would silently reappear.
    const { data, error } = await supabase.from('templates').select('*').order('created_at', { ascending:true });
    if(error){ console.warn('[supabase] templates load failed:', error.message); return; }
    const rows=data||[];
    this.setState({
      ttAdded:rows.filter(r=>r.kind==='task'&&!r.deleted).map(r=>({ ...r.payload, id:r.id })),
      otAdded:rows.filter(r=>r.kind==='okr'&&!r.deleted).map(r=>({ ...r.payload, id:r.id })),
      ktAdded:rows.filter(r=>r.kind==='kpi'&&!r.deleted).map(r=>({ ...r.payload, id:r.id })),
      ttDeleted:rows.filter(r=>r.kind==='task'&&r.deleted).map(r=>r.id),
      otDeleted:rows.filter(r=>r.kind==='okr'&&r.deleted).map(r=>r.id),
      ktDeleted:rows.filter(r=>r.kind==='kpi'&&r.deleted).map(r=>r.id),
    });
  }
  async _loadCheckIns(){
    const { data, error } = await supabase.from('check_ins').select('*').order('created_at', { ascending:true });
    if(error){ console.warn('[supabase] check-ins load failed:', error.message); return; }
    const grouped={};
    (data||[]).forEach(r=>{ (grouped[r.ref_id]=grouped[r.ref_id]||[]).push(r.payload); });
    this.setState({ ciAdded:grouped });
  }
  async _loadKpiActuals(){
    const { data, error } = await supabase.from('kpi_actuals').select('*');
    if(error){ console.warn('[supabase] kpi actuals load failed:', error.message); return; }
    const actuals={};
    (data||[]).forEach(r=>{ actuals[r.kpi_id]={ val:r.val, date:r.date }; });
    this.setState({ kpiActuals:actuals });
  }
  async _loadTaskDone(){
    const { data, error } = await supabase.from('task_done').select('*');
    if(error){ console.warn('[supabase] task-done load failed:', error.message); return; }
    const taskDone={};
    (data||[]).forEach(r=>{ taskDone[r.task_id]=r.done; });
    this.setState({ taskDone });
  }
  async _loadDocumentRepo(){
    const { data, error } = await supabase.from('document_repo').select('*').order('created_at', { ascending:true });
    if(error){ console.warn('[supabase] document repo load failed:', error.message); return; }
    const custom=[], upd={}, hidden=[];
    (data||[]).forEach(r=>{
      if(String(r.id).startsWith('builtin:')){
        const key=String(r.id).slice('builtin:'.length);
        if(r.payload && r.payload.hidden) hidden.push(key);
        else upd[key]=r.payload;
      } else custom.push({ ...r.payload, key:r.id });
    });
    this.setState({ repoAdded:custom, repoUpd:upd, repoHiddenBuiltin:hidden });
  }
  // Real bytes for every device-picked attachment (task evidence, QC refs,
  // messages, tickets, comments, check-ins, idea references) — loaded once
  // at login so every attachment previews/downloads for every user, not
  // just in the browser tab that originally picked the file.
  async _loadFileBlobs(){
    const { data, error } = await supabase.from('file_blobs').select('name, data_url, mime, size');
    if(error){ console.warn('[supabase] file blobs load failed:', error.message); return; }
    const blobs={};
    (data||[]).forEach(r=>{ blobs[r.name]={ dataUrl:r.data_url, type:r.mime, size:r.size }; });
    this.setState(s=>({ fileBlobs:{...blobs, ...(s.fileBlobs||{})} }));
  }
  async _loadEffortPlans(){
    // Loads every row regardless of `deleted` — a deleted seed plan still
    // needs its id in epDeleted on every load, or the hardcoded EP_PLANS()
    // entry (baked into the JS bundle) would silently reappear.
    const { data, error } = await supabase.from('effort_plans').select('*').order('created_at', { ascending:true });
    if(error){ console.warn('[supabase] effort plans load failed:', error.message); return; }
    const rows=data||[];
    this.setState({
      epAdded:rows.filter(r=>!r.deleted).map(r=>({ ...r.payload, id:r.id })),
      epDeleted:rows.filter(r=>r.deleted).map(r=>r.id),
      epRowAdds:{},
    });
  }
  // Read-only, direct-Supabase load — platform_settings is the one Admin
  // Settings table with a select policy for every authenticated role (it
  // holds no secrets), because branding/theme must apply for everyone, not
  // just Admin. Writes still only ever happen through /api/admin/settings.
  async _loadPlatformSettings(){
    const { data, error } = await supabase.from('platform_settings').select('value').eq('key','default').maybeSingle();
    if(error){ console.warn('[supabase] platform settings load failed:', error.message); return; }
    const value=(data&&data.value)||{};
    this.setState({ platformSettings:value });
    applyTheme(value.theme);
    applyFavicon(value.branding);
    applyBranding(value.general);
  }
  async _loadCustomDivisions(){
    const { data, error } = await supabase.from('custom_divisions').select('*').order('created_at', { ascending:true });
    if(error){ console.warn('[supabase] custom divisions load failed:', error.message); return; }
    this.setState({ epCustomDivs:(data||[]).map(r=>r.name) });
  }
  async _loadIdeas(){
    const { data, error } = await supabase.from('ideas').select('*').order('created_at', { ascending:true });
    if(error){ console.warn('[supabase] ideas load failed:', error.message); return; }
    const rows=data||[];
    this.setState({
      ideaAdded:rows.filter(r=>!r.deleted).map(r=>({ ...r.payload, id:r.id })),
      ideaDeleted:rows.filter(r=>r.deleted).map(r=>r.id),
    });
  }
  async _loadRolePerms(){
    const { data, error } = await supabase.from('role_permissions').select('*');
    if(error){ console.warn('[supabase] role permissions load failed:', error.message); return; }
    const rolePerms={};
    (data||[]).forEach(r=>{ (rolePerms[r.module_key]=rolePerms[r.module_key]||{})[r.role_key]=r.perms; });
    this.setState({ rolePerms });
  }
  async _loadMasterRecords(){
    const { data, error } = await supabase.from('master_records').select('*').order('created_at', { ascending:true });
    if(error){ console.warn('[supabase] master records load failed:', error.message); return; }
    const rows=data||[];
    const added={}, deleted={};
    rows.forEach(r=>{
      const rowId=r.id.slice(r.master_key.length+1); // id is "<master_key>:<rowId>"
      if(r.deleted){ (deleted[r.master_key]=deleted[r.master_key]||[]).push(rowId); }
      else { (added[r.master_key]=added[r.master_key]||{})[rowId]=r.payload; }
    });
    this.setState({ masterAdded:added, masterDeleted:deleted });
  }

  checkinView(){
    const rk = this.state.roleKey;
    const person = this.currentPerson();
    const base = (this.MY_KPIS()[rk]||[]);
    const pc = (p)=> p>=70?'var(--verify-500)': p>=40?'var(--warn-500)':'var(--danger-500)';
    const num = (v)=>parseFloat(String(v).replace(/,/g,''))||0;
    const rows = base.map(k=>{
      let currentVal, source, updated, updatedColor;
      if(this.juniorRollup(k.id).total>0){
        const r=this.juniorRollup(k.id); currentVal=num(k.baseline)+r.val;
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
      r.cardStyle='background:var(--paper);border:1px solid var(--line-300);border-radius:18px;box-shadow:var(--shadow-sm);padding:18px 20px';
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
        r.cardStyle='background:var(--paper);border:1px solid var(--line-200);border-radius:18px;padding:18px 20px;opacity:.55;filter:grayscale(.4)';
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
      ciFlagStyle:'display:flex;align-items:center;gap:10px;width:100%;padding:12px 14px;border-radius:12px;cursor:pointer;font-size:13px;font-weight:700;border:1px solid '+(cf.flag?'var(--warn-500)':'var(--line-300)')+';background:'+(cf.flag?'var(--warn-100)':'var(--paper)')+';color:'+(cf.flag?'var(--warn-600)':'var(--ink-700)'),
      ciToggleFlag:()=>this.setState({ ciForm:{...cf, flag:!cf.flag} }),
      ciFiles:(cf.files||[]).map((f,i)=>({ name:f, remove:()=>{ const arr=(cf.files||[]).slice(); arr.splice(i,1); this.setState({ ciForm:{...cf, files:arr} }); } })),
      ciHasFiles:(cf.files||[]).length>0,
      ciAddFile:()=>this.openFilePicker('checkin','Attach check-in evidence'),
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

  // Category tabs are live Master Data (contentCategory), not a fixed list —
  // a category tagged 'All Brands' shows for every brand, one tagged to a
  // specific brand (e.g. Food Research Lab) only shows when that brand is
  // selected, so admins can add brand-specific categories (e.g. 'Retort')
  // via Master Data without touching every other brand's taxonomy.
  // brand===undefined returns every category regardless of brand, so id
  // lookups (find by key) keep working even when the list is filtered elsewhere.
  CONTENT_REPOS(brand){
    const icons={ service:'briefcase', insights:'lightbulb', product:'package', career:'user-round', landing:'panels-top-left', case:'file-check-2', resource:'library', faq:'circle-help', news:'newspaper', home:'building-2' };
    const rows=this.MASTERS_REG().contentCategory.rows.filter(r=>r.Status!=='Inactive' && (!brand || brand==='All' || r.Brand==='All Brands' || r.Brand===brand));
    return [{key:'all', name:'All content', icon:'layers'}].concat(rows.map(r=>({ key:r.Category_Code, name:r.Category_Name, icon:icons[r.Category_Code]||'folder' })));
  }
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
        media:[['Gallery','product-shots','Product screenshots','2.1 MB','1'],['PDF','brochure.pdf','Product brochure','3.4 MB','8']],
        workflow:'Published', publishDate:'Oct 20, 2024', expiry:'—', version:'v3.1',
        analytics:{traffic:'8,700',ctr:'6.2%',pos:'2.4',bounce:'34%',time:'3m 40s',conv:'210',backlinks:'96',speed:'1.6s'},
        activity:[['John Doe','Published','Oct 20, 2024'],['Priya Nair','QC approved','Oct 19, 2024']] },
    ];
    // Pre-brand-field seed pages default to Beetloop (the house brand) so
    // existing data doesn't silently vanish once pages are brand-scoped.
    this._cpages.forEach(p=>{ if(!p.brand) p.brand='Beetloop'; });
    return this._cpages;
  }

  // Every content-page id ever issued, including soft-deleted ones — a new
  // page's id must never reuse a deleted page's id, since the row still
  // exists (deleted:true) and a same-id insert would hit the primary key.
  _allContentPageIdsEver(){
    return this.CONTENT_PAGES().map(p=>p.id)
      .concat((this.state.cAdded||[]).map(p=>p.id))
      .concat(this.state.cDeleted||[]);
  }
  // Next sequential code for a prefix, based on the highest numeric suffix
  // among every id currently carrying it (seed + added), not the visible
  // array's length — length shrinks on delete, so a length-derived id can
  // collide with (and silently overwrite) an existing record.
  _nextSeqCode(prefix, ids, floor){
    const nums=ids.map(id=>{ const m=String(id).match(new RegExp('^'+prefix.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+'(\\d+)$')); return m?parseInt(m[1],10):0; });
    return prefix+(Math.max(floor||0, ...nums)+1);
  }
  allContentPages(){ const upd=this.state.cUpd||{};
    const added=(this.state.cAdded||[]).slice().reverse();
    const addedIds=new Set(added.map(p=>p.id));
    const del=this.state.cDeleted||[];
    return added.concat(this.CONTENT_PAGES().filter(p=>!addedIds.has(p.id))).filter(p=>!del.includes(p.id)).map(p=>upd[p.id]?{...p,...upd[p.id]}:p); }
  contentStatusTone(s){ return { Published:{bg:'var(--verify-100)',color:'var(--verify-600)'}, Draft:{bg:'var(--surface-50)',color:'var(--ink-500)'}, 'Under Review':{bg:'var(--warn-100)',color:'var(--warn-600)'}, 'SEO Review':{bg:'var(--info-100)',color:'var(--info-600)'}, Scheduled:{bg:'var(--orchid-100)',color:'var(--orchid-700)'}, Archived:{bg:'var(--surface-50)',color:'var(--ink-400)'} }[s]||{bg:'var(--surface-50)',color:'var(--ink-500)'}; }

  contentView(){
    const rk=this.state.roleKey;
    const canEdit = ['manager','admin','team_lead'].includes(rk);
    const cBrand=this.state.cBrand||'All';
    const repos=this.CONTENT_REPOS(cBrand);
    const allRaw=this.allContentPages();
    const all=allRaw.filter(p=>cBrand==='All'||p.brand===cBrand);
    const cRepo=this.state.cRepo||'all', q=(this.state.cQuery||'').toLowerCase(), cStatus=this.state.cStatus||'All';
    const seoColor=(v)=> v>=80?'var(--verify-600)': v>=60?'var(--warn-600)':'var(--danger-600)';
    let list=all.filter(p=> (cRepo==='all'||p.repo===cRepo) && (cStatus==='All'||p.status===cStatus) && (!q || (p.name+' '+p.keyword+' '+p.topic).toLowerCase().includes(q)) );
    const repoName=(k)=>{ const r=repos.find(x=>x.key===k); return r?r.name:k; };
    // tree ordering: parents first, children indented beneath
    const inList={}; list.forEach(p=>inList[p.id]=true);
    const roots=list.filter(p=>!p.pid || !inList[p.pid]);
    const ordered=[]; const walk=(p,depth)=>{ ordered.push({p,depth}); list.filter(c=>c.pid===p.id).forEach(c=>walk(c,depth+1)); };
    roots.forEach(r=>walk(r,0));
    const byId={}; allRaw.forEach(p=>byId[p.id]=p);
    const rows=ordered.map(({p,depth})=>{
      const st=this.contentStatusTone(p.status); const exp=(this.state.cExpanded||[]).includes(p.id);
      const isNew=(this.state.cAdded||[]).some(x=>x.id===p.id);
      const linked=(p.linkedIds||[]).filter(id=>byId[id]).map(id=>({ name:byId[id].name, isService:byId[id].repo==='service',
        icon: byId[id].repo==='service'?'briefcase':'lightbulb',
        open:(e)=>{ if(e)e.stopPropagation(); this.setState({ cOpen:id, cTab:0 }); } }));
      return { id:p.id, isNew, depth, indent:(depth*26)+'px', isChild:depth>0, linked, hasLinked:linked.length>0,
        name:p.name, repo:repoName(p.repo), brand:p.brand||'—', type:p.type, topic:p.topic, industry:p.industry, keyword:p.keyword,
        status:p.status, statusBg:st.bg, statusColor:st.color, seo:p.seo, seoColor:seoColor(p.seo), updated:p.updated, owner:p.owner, reviewer:p.reviewer,
        metaTitle:(p.seoMeta.find(m=>m[0]==='Meta Title')||[])[1]||'—', metaDesc:(p.seoMeta.find(m=>m[0]==='Meta Description')||[])[1]||'—',
        relCount:Object.values(p.rel||{}).reduce((s,a)=>s+a.length,0), linkCount:(p.internal||[]).length,
        expanded:exp, chevron:exp?'chevron-down':'chevron-right',
        toggle:()=>this.setState({ cExpanded: exp?this.state.cExpanded.filter(x=>x!==p.id):[...(this.state.cExpanded||[]),p.id] }),
        open:(e)=>{ if(e)e.stopPropagation(); this.setState({ cOpen:p.id, cTab:0 }); },
      };
    });
    const cnt=(f)=>all.filter(f).length;
    // The 10 seed Category_Codes ship with the app and existing pages
    // reference them by key (repo==='service' etc.) — only categories
    // added later via Master Data (brand-specific ones like "Retort Main
    // Test") are safe to let someone edit/delete straight from this list.
    const foundational=['service','insights','product','career','landing','case','resource','faq','news','home'];
    const repoTabs=repos.map(r=>({ key:r.key, name:r.name, icon:r.icon, active:r.key===cRepo, count: r.key==='all'?all.length:all.filter(p=>p.repo===r.key).length,
      go:()=>this.setState({ cRepo:r.key, cExpanded:[] }),
      canManage: r.key!=='all' && !foundational.includes(r.key) && this.hasPerm('masters','edit'),
      edit:(e)=>{ if(e)e.stopPropagation(); this.editContentCategory(r.key); },
      canDelete: r.key!=='all' && !foundational.includes(r.key) && this.hasPerm('masters','delete'),
      delete:(e)=>{ if(e)e.stopPropagation(); this.deleteContentCategory(r.key); },
      style:'display:flex;align-items:center;gap:9px;width:100%;text-align:left;border:none;cursor:pointer;padding:8px 10px;margin-bottom:2px;border-radius:9px;font-size:13px;font-weight:'+(r.key===cRepo?'700':'600')+';'+(r.key===cRepo?'background:var(--orchid-100);color:var(--ink-900)':'background:transparent;color:var(--ink-500)') }));
    return {
      contentRepoTabs:repoTabs, contentCanEdit:canEdit,
      contentBrandFilter:cBrand, contentBrandOptions:['All'].concat(this.BRAND_LIST()),
      contentOnBrand:e=>this.setState({ cBrand:e.target.value, cRepo:'all', cExpanded:[] }),
      contentKpis:[
        {label:'Total pages',value:String(all.length),color:'var(--ink-900)',icon:'files'},
        {label:'Published',value:String(cnt(p=>p.status==='Published')),color:'var(--verify-600)',icon:'check-circle-2'},
        {label:'Draft',value:String(cnt(p=>p.status==='Draft')),color:'var(--ink-500)',icon:'file-pen'},
        {label:'Scheduled',value:String(cnt(p=>p.status==='Scheduled')),color:'var(--orchid-600)',icon:'calendar-clock'},
        {label:'Avg SEO score',value:String(Math.round(all.reduce((s,p)=>s+p.seo,0)/all.length)),color:'var(--info-600)',icon:'gauge'},
        {label:'Missing metadata',value:String(cnt(p=>p.seo<60)),color:'var(--warn-600)',icon:'alert-triangle'},
      ],
      contentStatusFilter:this.state.cStatus||'All', contentOnStatus:e=>this.setState({cStatus:e.target.value}),
      contentQuery:this.state.cQuery||'', contentOnQuery:e=>this.setState({cQuery:e.target.value}),
      contentRepoLabel:repoName(cRepo), ...(()=>{ const pg=this.pgData('content',rows,8); return { contentRows:pg.rows, cPg:pg }; })(), contentEmpty:rows.length===0,
      contentNew:()=>canEdit?this.setState({ showNewPage:true, npTab:0, npLinks:[{anchor:'',target:''}], npMedia:[{name:'',alt:'',type:'Image'}], npForm:{ repo: cRepo==='all'?'service':cRepo, brand: cBrand!=='All'?cBrand:'Beetloop' } }):this.flash('View only for your role.'),
      contentAI:()=>this.setState({ route:'ideas' }),
      contentExport:()=>this.exportCsv('content-repository-'+this._todayIso()+'.csv',
        ['ID','Name','Repository','Type','Topic','Keyword','Status','SEO score','Owner','Reviewer','Updated'],
        rows.map(r=>[r.id, r.name, r.repo, r.type, r.topic, r.keyword, r.status, r.seo, r.owner, r.reviewer, r.updated])),
      contentImport:()=>canEdit?this.setState({ contentImportOpen:true, contentImportFile:null }):this.flash('View only for your role.'),
      contentBulk:()=>canEdit?this.setState({ contentBulkOpen:true, contentBulkStatus:'Published' }):this.flash('View only for your role.'),
      contentBulkMatchCount: list.length,
      ...this.contentDetail(),
      ...this.newPageData(),
      ...this.contentBulkData(),
      ...this.contentImportData(),
    };
  }
  contentBulkData(){
    const open=!!this.state.contentBulkOpen;
    return {
      contentBulkOpen:open,
      contentBulkStatus:this.state.contentBulkStatus||'Published',
      contentBulkSetStatus:e=>this.setState({ contentBulkStatus:e.target.value }),
      contentBulkClose:()=>this.setState({ contentBulkOpen:false }),
      contentBulkStop:e=>e.stopPropagation(),
      contentBulkApply:()=>this.contentBulkApply(),
    };
  }
  contentBulkApply(){
    const rk=this.state.roleKey;
    if(!['manager','admin','team_lead'].includes(rk)){ this.flash('View only for your role.'); return; }
    const status=this.state.contentBulkStatus||'Published';
    const cRepo=this.state.cRepo||'all', q=(this.state.cQuery||'').toLowerCase(), cStatus=this.state.cStatus||'All';
    const all=this.allContentPages();
    const list=all.filter(p=> (cRepo==='all'||p.repo===cRepo) && (cStatus==='All'||p.status===cStatus) && (!q || (p.name+' '+p.keyword+' '+p.topic).toLowerCase().includes(q)) );
    if(!list.length){ this.flash('No pages match the current filters.'); return; }
    const today=this.todayStr(), me=this.currentPerson();
    const upd={...(this.state.cUpd||{})};
    list.forEach(p=>{
      const patched={...p, status, updated:today, activity:[[me,'Bulk status update to '+status,today], ...(p.activity||[])]};
      upd[p.id]=patched;
      supabase.from('content_pages').upsert({ id:p.id, payload:patched, created_by:this.state.authUser?this.state.authUser.id:null }).then(({error})=>{
        if(error) console.warn('[supabase] content page bulk update failed:', error.message);
      });
    });
    this.setState({ cUpd:upd, contentBulkOpen:false });
    this.flash('Status set to "'+status+'" for '+list.length+' page'+(list.length===1?'':'s')+'.');
  }
  contentImportData(){
    const file=this.state.contentImportFile;
    return {
      contentImportOpen:!!this.state.contentImportOpen,
      contentImportFileName:file?file.name:'',
      contentImportPick:e=>this.setState({ contentImportFile:(e.target.files||[])[0]||null }),
      contentImportClose:()=>this.setState({ contentImportOpen:false, contentImportFile:null }),
      contentImportStop:e=>e.stopPropagation(),
      contentImportRun:()=>this.contentImportRun(),
    };
  }
  // Small in-house CSV parser (quoted-comma aware) — no new dependency needed
  // for a one-off bulk import.
  _parseCsv(text){
    const rows=[]; let row=[]; let field=''; let inQuotes=false;
    for(let i=0;i<text.length;i++){
      const c=text[i];
      if(inQuotes){
        if(c==='"'){ if(text[i+1]==='"'){ field+='"'; i++; } else inQuotes=false; }
        else field+=c;
      } else if(c==='"'){ inQuotes=true; }
      else if(c===','){ row.push(field); field=''; }
      else if(c==='\n'||c==='\r'){ if(c==='\r'&&text[i+1]==='\n') i++; row.push(field); rows.push(row); row=[]; field=''; }
      else field+=c;
    }
    if(field.length||row.length){ row.push(field); rows.push(row); }
    return rows.filter(r=>!(r.length===1&&r[0]===''));
  }
  contentImportRun(){
    const file=this.state.contentImportFile;
    if(!file){ this.flash('Choose a CSV file first.'); return; }
    const reader=new FileReader();
    reader.onload=()=>{
      const rows=this._parseCsv(String(reader.result||''));
      if(rows.length<2){ this.flash('That CSV has no data rows.'); return; }
      const header=rows[0].map(h=>String(h||'').trim().toLowerCase());
      const idx=(name)=>header.indexOf(name);
      const iTitle=idx('title')>=0?idx('title'):idx('name');
      const iTopic=idx('topic'), iType=idx('type'), iStatus=idx('status'), iKeyword=idx('keyword');
      if(iTitle<0){ this.flash('CSV needs a "Title" column.'); return; }
      const existingIds=this._allContentPageIdsEver();
      const today=this.todayStr(), me=this.currentPerson();
      const created=[];
      for(let r=1;r<rows.length;r++){
        const row=rows[r]; const name=(row[iTitle]||'').trim();
        if(!name) continue;
        const code=this._nextSeqCode('PG-', existingIds, 1000);
        existingIds.push(code);
        const slug=name.toLowerCase().trim().replace(/[^a-z0-9\s-]/g,'').replace(/\s+/g,'-').replace(/-+/g,'-');
        const keyword=iKeyword>=0?(row[iKeyword]||'—'):'—';
        const status=(iStatus>=0&&row[iStatus])?row[iStatus].trim():'Draft';
        created.push({ id:code, name, repo:'service', type:iType>=0?(row[iType]||'Service Page'):'Service Page',
          topic:iTopic>=0?(row[iTopic]||keyword):keyword, industry:'—', keyword,
          status, seo:28, updated:today, owner:me, reviewer:'—',
          pid:null, linkedIds:[], slug, url:'/services/'+slug, parent:'Website Content', menuCat:'Website Content', menuOrder:0,
          breadcrumb:'Home > Website Content > '+name, description:'—',
          cls:[['Service Category','General'],['Sub-Service','To be assigned'],['Primary Keyword',keyword],['Industry','—'],['Sector','—'],['Application Category','—'],['Target Countries','—']],
          seoMeta:[['Meta Title',name],['Meta Description','—'],['Primary Keywords',keyword],['Secondary Keywords','—'],['Keyword Intent','—'],['Canonical URL','/services/'+slug],['Schema Type','Service'],['Robots','Index, Follow'],['Index Status','Not indexed'],['Hreflang','en-US'],['OG Title',name],['OG Description','—'],['OG Image','—'],['Twitter Card','summary_large_image']],
          blocks:[['Heading','H1',name],['Paragraph','','Imported via CSV — add content.']],
          rel:{Services:['Link a related service'],Insights:['Link a related article']},
          internal:[[keyword, '/services/'+slug, 'Internal', '—']],
          media:[['Image','hero-placeholder.jpg','Add a hero image · alt text','—','0']],
          workflow:'Draft', publishDate:'—', expiry:'—', version:'v0.1',
          analytics:{traffic:'—',ctr:'—',pos:'—',bounce:'—',time:'—',conv:'—',backlinks:'0',speed:'—'},
          activity:[[me,'Imported from CSV',today]] });
      }
      if(!created.length){ this.flash('No valid rows found — check the Title column.'); return; }
      this.setState({ cAdded:[...(this.state.cAdded||[]), ...created], contentImportOpen:false, contentImportFile:null });
      this.flash(created.length+' page'+(created.length===1?'':'s')+' imported.');
      created.forEach(page=>{
        supabase.from('content_pages').insert({ id:page.id, payload:page, created_by:this.state.authUser?this.state.authUser.id:null }).then(({error})=>{
          if(error) console.warn('[supabase] content page import insert failed:', error.message);
        });
      });
    };
    reader.readAsText(file);
  }

  // Legacy categories map to their historical URL prefix; a brand-specific
  // category added later via Master Data (e.g. 'Retort') has no such
  // mapping, so its prefix is derived from the category name itself
  // (slugified) — e.g. Retort -> /retort/.
  repoUrlPrefix(repoKey){
    const legacy={ service:'/services/', insights:'/insights/', product:'/product/', career:'/careers/', landing:'/lp/', case:'/case-studies/', resource:'/resources/', faq:'/faq/', news:'/news/', home:'/' };
    if(legacy[repoKey]) return legacy[repoKey];
    const cat=this.CONTENT_REPOS().find(r=>r.key===repoKey);
    const slug=(cat&&cat.name?cat.name:repoKey).toLowerCase().trim().replace(/[^a-z0-9\s-]/g,'').replace(/\s+/g,'-').replace(/-+/g,'-');
    return '/'+slug+'/';
  }
  newPageData(){
    const f=this.state.npForm||{};
    const repos=this.CONTENT_REPOS().filter(r=>r.key!=='all');
    const editId=this.state.npEditId;
    const code = editId||this._nextSeqCode('PG-', this._allContentPageIdsEver(), 1000);
    const slugify=(s)=> (s||'').toLowerCase().trim().replace(/[^a-z0-9\s-]/g,'').replace(/\s+/g,'-').replace(/-+/g,'-');
    // "Index page" means this page IS the category/parent root — its URL
    // ends right at that folder (e.g. /retort-main/) with no extra slug
    // segment, rather than every page needing its own trailing slug.
    const baseSlug = f.isIndex ? '' : (f.slug || slugify(f.name));
    const repoPath = this.repoUrlPrefix(f.repo||'service');
    const parentPage = f.pid ? this.allContentPages().find(p=>p.id===f.pid) : null;
    // Parent pages that are themselves an index already end in '/' — strip
    // it before appending our own slash so we don't emit a double '//'.
    const base = parentPage ? (parentPage.url.replace(/\/+$/,'') + '/') : repoPath;
    // A pulled Service/Sub-Service Master record's Primary_URL is that
    // record's own full, authoritative path (see npPullFromService) — it
    // wins over the generic repoUrlPrefix()+slug reconstruction, but only
    // when the author hasn't explicitly nested this page under a different
    // parent or marked it an index page, either of which is a deliberate
    // structural choice that should take precedence.
    const url = (f.customUrl && !parentPage && !f.isIndex) ? f.customUrl
      : f.isIndex ? base : (baseSlug ? (base + baseSlug) : (base + '…'));
    const set=(k)=>(e)=>this.setState({ npForm:{...this.state.npForm,[k]:e.target.value} });
    return {
      showNewPage:this.state.showNewPage, npCode:code, npIsEdit:!!editId, npPanelTitle:editId?'Edit page':'Create new page',
      npRepos:repos.map(r=>({key:r.key,name:r.name})),
      npBrandOptions:this.BRAND_LIST(),
      // Changing Brand invalidates whatever Service was picked under the
      // old brand — a Service Page's Service must belong to its own Brand,
      // never a mismatched leftover from before the switch.
      npSetBrand:(e)=>this.setState({ npForm:{...this.state.npForm, brand:e.target.value, linkService:'', linkSubService:'', customUrl:'' } }),
      npObjectCategoryOptions:this.MASTERS_REG().objectCategory.rows.filter(r=>r.Status!=='Inactive').map(r=>r.Category_Name), npSetObjectCategory:set('objectCategory'),
      npTypeOptions:this.MASTERS_REG().contentType.rows.filter(r=>r.Status!=='Inactive').map(r=>r.Content_Type),
      // Service Master already carries real SEO metadata (Title_Tag,
      // Meta_Description, Primary_Keywords, Target_Industries/Countries) for
      // every service — picking one here pulls it straight in instead of
      // making the author retype what Master Data already has on file.
      // Scoped to the page's own Brand (item 55) — a Food Research Lab page
      // has no business offering a Beetloop service.
      // Hierarchy_Level compared loosely — Master Data's generic record
      // editor writes it as a string ("0"/"1") from a plain text input,
      // while the seed rows use real numbers; a strict === would silently
      // exclude every admin-created service record.
      npServiceMasterOptions:this.MASTERS_REG().service.rows.filter(r=>r.Page_Status!=='Archived' && String(r.Hierarchy_Level)==='0' && (!f.brand||r.Brand===f.brand)).map(r=>r.Service_Name),
      npIndustryOptions:this.MASTERS_REG().industry.rows.filter(r=>r.Status!=='Inactive').map(r=>r.Industry),
      npLinkServiceVal:f.linkService||'',
      npPullFromService:(e)=>{
        const name=e.target.value;
        const row=this.MASTERS_REG().service.rows.find(r=>r.Service_Name===name);
        if(!row){ this.setState({ npForm:{...this.state.npForm, linkService:'', customUrl:''} }); return; }
        // Only fill the page name from the service when the author hasn't
        // already named the page — a page nested under a category (e.g. a
        // landing page for a service) keeps its own name, it just borrows
        // the service's SEO metadata.
        const curName=(this.state.npForm.name||'').trim();
        this.setState({ npForm:{...this.state.npForm,
          linkService:name, linkSubService:'',
          name: curName?curName:name,
          // Service Master's own canonical Slug (item 56) rather than
          // re-deriving one from the name — the two can differ (e.g. a
          // service renamed after its slug was already indexed).
          slug:row.Slug||slugify(name),
          // Primary_URL is the record's OWN full, authoritative path — it
          // is NOT necessarily repoUrlPrefix(repo)+slug. A brand like Food
          // Research Lab may live at the domain root ('/retort-main-test/')
          // with no '/services/' folder at all, while Beetloop's own seed
          // services genuinely do sit under '/services/…'. Overriding the
          // generic prefix+slug reconstruction with this value (see
          // newPageData()/submitNewPage()) is what makes the live URL match
          // the master record instead of a folder that may not apply.
          customUrl:row.Primary_URL||'',
          metaTitle:row.Title_Tag||'',
          metaDesc:row.Meta_Description||'',
          primaryKw:row.Primary_Keywords||'',
          keyword:(row.Primary_Keywords||'').split(',')[0].trim(),
          industry:(row.Target_Industries||'').split(',')[0].trim(),
          countries:row.Target_Countries||'',
        } });
        this.flash('Pulled SEO details from Service Master — '+name+'.');
      },
      // Sub-Service was a free-text field (item 57) — now the same
      // Brand-scoped, Master-backed dropdown pattern as the parent Service
      // field above, sourced from Service Master's own child rows
      // (Hierarchy_Level 1). Picking one auto-fills the URL slug from that
      // row's own canonical Slug (already the full nested path, e.g.
      // 'cloud-migration/aws' — matches its Primary_URL) instead of the
      // page slugifying just its name.
      npSubServiceMasterOptions:this.MASTERS_REG().service.rows.filter(r=>r.Page_Status!=='Archived' && String(r.Hierarchy_Level)==='1' && (!f.brand||r.Brand===f.brand)).map(r=>r.Service_Name),
      npLinkSubServiceVal:f.linkSubService||f.subService||'',
      npPullFromSubService:(e)=>{
        const name=e.target.value;
        const row=this.MASTERS_REG().service.rows.find(r=>r.Service_Name===name && String(r.Hierarchy_Level)==='1');
        if(!row){ this.setState({ npForm:{...this.state.npForm, linkSubService:'', subService:''} }); return; }
        this.setState({ npForm:{...this.state.npForm,
          linkSubService:name, subService:name,
          slug:row.Slug||slugify(name),
          customUrl:row.Primary_URL||'',
          metaTitle:row.Title_Tag||this.state.npForm.metaTitle,
          metaDesc:row.Meta_Description||this.state.npForm.metaDesc,
        } });
        this.flash('Pulled SEO details from Service Master — '+name+'.');
      },
      npIsIndex:!!f.isIndex, npSetIsIndex:e=>this.setState({ npForm:{...this.state.npForm, isIndex:e.target.checked} }),
      npParentOptions:[{id:'',label:'None — top-level page'}].concat(this.allContentPages().map(p=>({ id:p.id, label:p.name+'  ·  '+p.url }))),
      npSetParentId:(e)=>this.setState({ npForm:{...this.state.npForm, pid:e.target.value} }),
      npParentUrl: parentPage ? parentPage.url : '',
      npHasParent: !!parentPage,
      npf:f,
      // Repo change or a manual slug edit invalidates a pulled Service
      // Master customUrl (it was that record's full path, not just a
      // fragment to recombine with a new folder/slug) — clear it so the
      // normal repoUrlPrefix()+slug reconstruction takes back over.
      npSetRepo:(e)=>this.setState({ npForm:{...this.state.npForm, repo:e.target.value, customUrl:''} }),
      npSetType:set('type'), npSetName:set('name'),
      npSetSlug:(e)=>this.setState({ npForm:{...this.state.npForm, slug:e.target.value, customUrl:''} }),
      npSetKeyword:set('keyword'), npSetIndustry:set('industry'), npSetMetaTitle:set('metaTitle'), npSetMetaDesc:set('metaDesc'), npSetOwner:set('owner'), npSetReviewer:set('reviewer'),
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
      npTabs:['Page Info','Classification','SEO','Content','Relationships','Links','Media','Publishing','Analytics','Activity'].map((t,i)=>({ label:t, go:()=>this.setState({npTab:i}), style:'flex:none;padding:9px 13px;border:none;background:none;border-bottom:2px solid '+(i===(this.state.npTab||0)?'var(--orchid-500)':'transparent')+';font-size:13px;font-weight:700;cursor:pointer;color:'+(i===(this.state.npTab||0)?'var(--ink-900)':'var(--ink-500)')+';margin-bottom:-1px;white-space:nowrap' })),
      npTab0:(this.state.npTab||0)===0, npTab1:this.state.npTab===1, npTab2:this.state.npTab===2, npTab3:this.state.npTab===3, npTab4:this.state.npTab===4, npTab5:this.state.npTab===5, npTab6:this.state.npTab===6, npTab7:this.state.npTab===7, npTab8:this.state.npTab===8, npTab9:this.state.npTab===9,
      npOwnerName: f.owner||this.currentPerson(), npToday:this.todayStr(),
      npNext:()=>this.setState({ npTab: Math.min(9,(this.state.npTab||0)+1) }),
      npBack:()=>this.setState({ npTab: Math.max(0,(this.state.npTab||0)-1) }),
      npNotLast:(this.state.npTab||0)<9, npNotFirst:(this.state.npTab||0)>0,
      npSlug:baseSlug, npUrl:url,
      closeNewPage:()=>this.setState({ showNewPage:false, npEditId:null }),
      npCanDelete: !!editId && this.hasPerm('content','delete'),
      npDelete:()=>this.confirmDelete('Delete Page?', 'Are you sure you want to delete "'+(f.name||'this page')+'"? This action cannot be undone.', ()=>this._deleteContentPage()),
      submitNewPageDraft:()=>this.submitNewPage(false),
      submitNewPageCreate:()=>this.submitNewPage(true),
    };
  }
  submitNewPage(activate){
    const editId=this.state.npEditId;
    if(!this.hasPerm('content', editId?'edit':'create')){ this.flash('You do not have permission to '+(editId?'edit':'create')+' content pages.'); return; }
    const f=this.state.npForm||{};
    if(!f.name || !f.name.trim()){ this.flash('Enter a page name.'); return; }
    const existing=editId?this.allContentPages().find(x=>x.id===editId):null;
    const repo=f.repo||'service';
    const code=editId||this._nextSeqCode('PG-', this._allContentPageIdsEver(), 1000);
    const repoName=(this.CONTENT_REPOS().find(r=>r.key===repo)||{}).name;
    const name=f.name.trim();
    const slugify=(s)=> (s||'').toLowerCase().trim().replace(/[^a-z0-9\s-]/g,'').replace(/\s+/g,'-').replace(/-+/g,'-');
    const slug=f.isIndex?'':(f.slug||slugify(name));
    const repoPath=this.repoUrlPrefix(repo);
    const parentPage = f.pid ? this.allContentPages().find(p=>p.id===f.pid) : null;
    const parentBase = parentPage ? parentPage.url.replace(/\/+$/,'') : '';
    // See newPageData()'s matching comment — a pulled Service/Sub-Service
    // Master record's own Primary_URL overrides the generic
    // repoUrlPrefix()+slug reconstruction unless the author explicitly
    // nested or index-flagged this page.
    const url = (f.customUrl && !parentPage && !f.isIndex) ? f.customUrl
      : f.isIndex ? (parentPage?(parentBase+'/'):repoPath) : (parentPage ? (parentBase+'/'+slug) : (repoPath+slug));
    const owner=f.owner||this.currentPerson(); const reviewer=f.reviewer||'—';
    const metaTitle=f.metaTitle||name; const metaDesc=f.metaDesc||'—';
    const seo = (f.metaTitle&&f.metaDesc)? (f.keyword?68:58) : (f.metaTitle||f.metaDesc?42:28);
    const today=this.todayStr();
    const page={
      id:code, name, repo, brand:f.brand||(existing&&existing.brand)||'Beetloop', type:f.type||'Service Page', topic:f.keyword||'—', industry:f.industry||'—', keyword:f.keyword||'—',
      status: activate?'Under Review':'Draft', seo, updated:today, owner, reviewer,
      pid: f.pid||null, linkedIds: [f.relServiceId,f.relInsightId].filter(Boolean),
      slug, url, isIndex:!!f.isIndex, parent: parentPage?parentPage.name:(f.parent||repoName), menuCat:f.menuCat||repoName, menuOrder:parseInt(f.menuOrder,10)||0,
      // An index page IS the category/parent folder itself, so its
      // breadcrumb stops there instead of repeating the page name as an
      // extra trailing crumb (e.g. "Home > Retort Main", not
      // "Home > Retort Main > Retort Main").
      breadcrumb: f.isIndex ? (parentPage?parentPage.breadcrumb:('Home > '+(f.parent||repoName))) : (parentPage?(parentPage.breadcrumb+' > '+name):('Home > '+(f.parent||repoName)+' > '+name)),
      description:metaDesc,
      cls: repo==='service'
        ? [['Service Category',f.industry||'General'],['Sub-Service',f.subService||'To be assigned'],['Primary Keyword',f.keyword||'—'],['Industry',f.industry||'—'],['Sector',f.sector||'—'],['Application Category',f.objectCategory||'—'],['Target Countries',f.countries||'—']]
        : [['Topic',f.keyword||name],['Author',owner],['Content Type',f.type||'Article'],['Object Category',f.objectCategory||'—'],['Sector',f.sector||'—'],['Tags',f.keyword||'—'],['Target Countries',f.countries||'—'],['Related Services',f.subService||'—']],
      seoMeta:[['Meta Title',metaTitle],['Meta Description',metaDesc],['Primary Keywords',f.primaryKw||f.keyword||'—'],['Secondary Keywords',f.secondaryKw||'—'],['Keyword Intent',f.intent||'—'],['Canonical URL',url],['Schema Type', f.schema||(repo==='service'?'Service':'WebPage')],['Robots',f.robots||'Index, Follow'],['Index Status', activate?'Pending':'Not indexed'],['Hreflang','en-US'],['OG Title',f.ogTitle||metaTitle],['OG Description',f.ogDesc||metaDesc],['OG Image',f.ogImage||'—'],['Twitter Card','summary_large_image']],
      blocks:[['Heading','H1',name],['Paragraph','',f.intro||'Draft introduction — start writing this page.'],
        ['Heading','H2',f.h2||'Overview'],['Paragraph','',f.h2body||f.overview||('Add supporting content for '+(f.keyword||name)+'.')],
        ...(f.h3||f.h3body ? [['Heading','H3',f.h3||'Details'],['Paragraph','',f.h3body||'Add supporting detail.']] : []),
        ['CTA','',f.cta||'Add a call to action'],['FAQ','','Add frequently asked questions']],
      rel:(()=>{ const sv=this.allContentPages().find(p=>p.id===f.relServiceId); const iv=this.allContentPages().find(p=>p.id===f.relInsightId);
        return { Services:[sv?(sv.name+' ('+sv.url+')'):'Link a related service'], Insights:[iv?(iv.name+' ('+iv.url+')'):'Link a related article'] }; })(),
      internal: (()=>{ const ls=(this.state.npLinks||[]).filter(l=>l.anchor||l.target); return ls.length? ls.map(l=>[l.anchor||f.keyword||name.toLowerCase(), l.target||url, l.ltype||'Internal', '—']) : [[f.keyword||name.toLowerCase(), url, 'Internal', '—']]; })(),
      media:(()=>{ const ms=(this.state.npMedia||[]).filter(m=>m.name||m.alt); return ms.length? ms.map(m=>[m.type||'Image', m.name||'untitled', m.alt||'—','—','0']) : [['Image','hero-placeholder.jpg','Add a hero image · alt text','—','0']]; })(),
      workflow: existing?existing.workflow:(activate?'Under Review':'Draft'),
      publishDate:this.fmtDate(f.publishDate)||(existing?existing.publishDate:'—'),
      expiry:existing?existing.expiry:'—', version:existing?existing.version:'v0.1',
      analytics:existing?existing.analytics:{traffic:'—',ctr:'—',pos:'—',bounce:'—',time:'—',conv:'—',backlinks:'0',speed:'—'},
      activity: existing
        ? [[owner,'Page updated',today], ...(existing.activity||[])]
        : [[owner, activate?'Submitted for review':'Created draft', today],[owner,'Page created — '+code, today]],
    };
    if(existing){
      page.status=existing.status;
      const upd={...(this.state.cUpd||{}), [code]:page};
      this.setState({ cUpd:upd, showNewPage:false, npForm:{}, npEditId:null, cOpen:code, cTab:0 });
      this.flash('Page “'+name+'” updated.');
      supabase.from('content_pages').upsert({ id:code, payload:{...existing,...page}, created_by:this.state.authUser?this.state.authUser.id:null }).then(({error})=>{
        if(error) console.warn('[supabase] content page upsert failed:', error.message);
      });
      return;
    }
    const next=[...(this.state.cAdded||[]), page];
    this.setState({ cAdded:next, showNewPage:false, npForm:{}, cRepo:repo, cStatus:'All', cQuery:'', cOpen:code, cTab:0 });
    this.flash('Page “'+name+'” created as '+code+' — added to '+repoName+' (top of list).');
    supabase.from('content_pages').insert({ id:code, payload:page, created_by:this.state.authUser?this.state.authUser.id:null }).then(({error})=>{
      if(error) console.warn('[supabase] content page insert failed:', error.message);
    });
  }
  _deleteContentPage(){
    if(!this.hasPerm('content','delete')){ this.flash('You do not have permission to delete content pages.'); return; }
    const id=this.state.npEditId; if(!id) return;
    const p=this.allContentPages().find(x=>x.id===id);
    this.setState({ cDeleted:[...(this.state.cDeleted||[]), id], showNewPage:false, npForm:{}, npEditId:null, cOpen:null });
    this.flash('Deleted page: '+(p?p.name:id)+'.');
    // upsert (not update) — a seed page that's never been edited has no DB
    // row yet, so this is what makes the deletion stick past reload.
    supabase.from('content_pages').upsert({ id, payload:p||{}, deleted:true, created_by:this.state.authUser?this.state.authUser.id:null }).then(({error})=>{
      if(error) console.warn('[supabase] content page delete failed:', error.message);
    });
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
  // ==== Leads/CRM pipeline — daily lead logging + contact pipeline ====
  SERVICE_PAGES(){
    const pages=this.allContentPages().filter(p=>p.repo==='service')
      .map(p=>({ name:p.name, url:p.url, src:'Website Content Repository' }));
    const reg=this.MASTERS_REG?this.MASTERS_REG():null;
    const master=(reg&&reg.service&&reg.service.rows||[]).map(r=>({ name:r.Service_Name, url:r.Primary_URL||'', src:'Service Master' }));
    const core=[
      { name:'New Product Development', url:'/services/new-product-development', src:'Website Content Repository' },
      { name:'Nutraceutical Formulation', url:'/services/nutraceutical-formulation', src:'Website Content Repository' },
      { name:'Clinical Trial Support', url:'/services/clinical-trial-support', src:'Website Content Repository' },
      { name:'Regulatory & Compliance', url:'/services/regulatory-compliance', src:'Website Content Repository' },
      { name:'Food Technology Consulting', url:'/services/food-technology-consulting', src:'Website Content Repository' },
    ];
    const seen={}; const out=[];
    core.concat(pages, master).forEach(s=>{ if(!s.name||seen[s.name]) return; seen[s.name]=1; out.push(s); });
    return out;
  }
  SERVICE_LIST(){ return this.SERVICE_PAGES().map(s=>s.name); }
  servicePageOf(name){ return this.SERVICE_PAGES().find(s=>s.name===name)||null; }
  leadSourceList(){ return this.MASTERS_REG().leadSource.rows.filter(r=>r.Status!=='Inactive').map(r=>r.Source_Name); }
  LEAD_SEED(){ const d=(n)=>this.relDate(-n); return [
    { id:'LD-001', date:d(0), service:'New Product Development', source:'Organic Search', visitors:1240, count:4, qualified:3, value:'₹4,20,000', who:'Neha Verma', notes:'2 enquiries from the NPD services page.', brand:'Food Research Lab' },
    { id:'LD-002', date:d(0), service:'Nutraceutical Formulation', source:'Paid Search', visitors:860, count:2, qualified:1, value:'₹1,10,000', who:'Neha Verma', notes:'', brand:'Food Research Lab' },
    { id:'LD-003', date:d(1), service:'New Product Development', source:'Referral', visitors:410, count:3, qualified:3, value:'₹3,60,000', who:'Sameer Iyer', notes:'Referred by existing FRL client.', brand:'Food Research Lab' },
    { id:'LD-004', date:d(1), service:'Regulatory & Compliance', source:'Email Campaign', visitors:520, count:5, qualified:2, value:'₹95,000', who:'Sameer Iyer', notes:'', brand:'Statswork' },
    { id:'LD-005', date:d(2), service:'New Product Development', source:'Guest Post / External', visitors:290, count:2, qualified:2, value:'₹2,40,000', who:'Neha Verma', notes:'From the Medium guest article.', brand:'Food Research Lab' },
    { id:'LD-006', date:d(3), service:'Clinical Trial Support', source:'Organic Search', visitors:180, count:1, qualified:1, value:'₹80,000', who:'Aditi Rao', notes:'', brand:'Food Research Lab' },
  ]; }
  serviceTargeting(name){
    const sp=this.servicePageOf(name); const url=sp&&sp.url;
    const t=url?this.targetedPages()[url]:null;
    if(t) return { targeted:true, url, kpis:t.kpis, campaigns:t.campaigns, expected:t.expected };
    const worked=this.allTasks().some(x=>String(x.name||'').toLowerCase().indexOf(String(name).toLowerCase())>=0);
    return { targeted:worked, url:url||'', kpis:[], campaigns:[], expected:0, viaEffort:worked };
  }
  _allLeadIdsEver(){ return this.LEAD_SEED().map(l=>l.id).concat((this.state.leadAdded||[]).map(l=>l.id)).concat(this.state.leadDeleted||[]); }
  allLeads(){ const del=this.state.leadDeleted||[];
    const all=(this.state.leadAdded||[]).concat(this.LEAD_SEED()).filter(l=>!del.includes(l.id));
    // Strict brand fencing: once a person is brand-restricted (always true
    // for Sales; true for anyone else Admin has assigned specific brands
    // to), they only ever see leads tagged to a brand they're assigned to.
    // No brand assigned = nothing, not "everything untagged" — an untagged
    // lead is a data-entry gap, not a green light.
    if(this._leadBrandRestricted()){ const bs=this.mySalesBrands(); return bs.length?all.filter(l=>bs.includes(l.brand)):[]; }
    return all; }
  _deleteLead(id){
    if(!this.hasPerm('leads','delete')){ this.flash('You do not have permission to delete leads.'); return; }
    const l=this.allLeads().find(x=>x.id===id); if(!l) return;
    this.setState({ leadDeleted:[...(this.state.leadDeleted||[]), id] });
    this.flash('Deleted lead entry: '+id+'.');
    // upsert (not update) — a lead still only in LEAD_SEED() has no row yet,
    // so this is what makes the deletion stick past reload.
    supabase.from('leads').upsert({ id, payload:l||{}, deleted:true, created_by:this.state.authUser?this.state.authUser.id:null }).then(({error})=>{
      if(error) console.warn('[supabase] lead delete failed:', error.message);
    });
  }
  LEAD_STAGES(){ return ['New','UQL','MQL','SQL','Opportunity','Won','Lost']; }
  // Brand Master (Master Data) is the single source of truth for every
  // brand dropdown across the app — Sales/User brand assignment, SOP/Lead
  // filters, Campaign/OKR forms, Brand Playbook. Inactive brands drop out
  // of every dropdown but stay in Master Data (soft-disable, not delete).
  BRAND_LIST(){ return this.MASTERS_REG().brand.rows.filter(r=>r.Status!=='Inactive').map(r=>r.Brand_Name); }
  // Single source for "Campaign Type" — was duplicated as a hardcoded array
  // in the Campaigns filter dropdown and the Create Campaign form; now also
  // the same vocabulary the QC Checklist master's Campaign Type field maps
  // against (item 60's Task → Campaign → Campaign Type → matching QC
  // Checklists flow needs both sides speaking the same values).
  CAMPAIGN_TYPES(){ return this.MASTERS_REG().campaignType.rows.filter(r=>r.Status!=='Inactive').map(r=>r.Campaign_Type); }
  liveDeptOptions(){ return this.MASTERS_REG().department.rows.filter(r=>r.Status!=='Inactive').map(r=>r.Department).filter(Boolean); }
  ROLE_LIST(){ return this.MASTERS_REG().role.rows.filter(r=>r.Status!=='Inactive').map(r=>r.Role); }
  stageTone(s){ return { New:{bg:'var(--surface-50)',c:'var(--ink-500)'}, UQL:{bg:'var(--surface-50)',c:'var(--ink-700)'},
    MQL:{bg:'var(--info-100)',c:'var(--info-600)'}, SQL:{bg:'var(--orchid-100)',c:'var(--orchid-700)'},
    Opportunity:{bg:'var(--warn-100)',c:'var(--warn-600)'}, Won:{bg:'var(--verify-100)',c:'var(--verify-600)'},
    Lost:{bg:'var(--danger-100, #F7E3E6)',c:'var(--danger-600)'} }[s]||{bg:'var(--surface-50)',c:'var(--ink-500)'}; }
  CONTACT_SEED(){ const d=(n)=>this.relDate(-n); return [
    { id:'CN-001', leadId:'LD-001', name:'Dr. Ananya Krishnan', phone:'+91 98400 22114', email:'ananya.k@vitalfoods.in', country:'India', company:'VitalFoods Pvt Ltd', service:'New Product Development', source:'Organic Search', stage:'SQL', value:'₹4,20,000', date:d(0), owner:'Neha Verma', desc:'Needs a protein bar formulation for the Indian market, FSSAI compliant.', brand:'Food Research Lab', log:[['Enquiry received','Organic Search',d(0)],['Qualified as MQL','Neha Verma',d(0)],['Moved to SQL — budget confirmed','Neha Verma',d(0)]] },
    { id:'CN-002', leadId:'LD-001', name:'Rahul Bhatt', phone:'+91 99620 77410', email:'rahul@nutrigen.co', country:'India', company:'NutriGen', service:'New Product Development', source:'Organic Search', stage:'MQL', value:'₹1,80,000', date:d(0), owner:'Neha Verma', desc:'Exploring plant-protein RTD beverage development.', brand:'Food Research Lab', log:[['Enquiry received','Organic Search',d(0)],['Qualified as MQL','Neha Verma',d(0)]] },
    { id:'CN-003', leadId:'LD-003', name:'Sarah Whitfield', phone:'+44 7700 900321', email:'s.whitfield@purelabs.uk', country:'United Kingdom', company:'PureLabs', service:'New Product Development', source:'Referral', stage:'Won', value:'₹3,60,000', date:d(1), owner:'Sameer Iyer', desc:'Referred by FRL. Signed for a 3-month formulation sprint.', brand:'Food Research Lab', log:[['Enquiry received','Referral',d(1)],['Qualified as SQL','Sameer Iyer',d(1)],['Proposal sent','Sameer Iyer',d(1)],['Won — contract signed','Sameer Iyer',d(0)]] },
    { id:'CN-004', leadId:'LD-004', name:'Mohammed Al-Rashid', phone:'+971 50 123 4567', email:'m.rashid@gulfnutra.ae', country:'UAE', company:'Gulf Nutra', service:'Regulatory & Compliance', source:'Email Campaign', stage:'UQL', value:'—', date:d(1), owner:'Sameer Iyer', desc:'General query on GCC labelling rules — no budget indicated.', brand:'Statswork', log:[['Enquiry received','Email Campaign',d(1)]] },
    { id:'CN-005', leadId:'LD-005', name:'Priya Deshmukh', phone:'+91 90040 55231', email:'priya@wellcorenutra.com', country:'India', company:'WellCore', service:'New Product Development', source:'Guest Post / External', stage:'Opportunity', value:'₹2,40,000', date:d(2), owner:'Neha Verma', desc:'Read the Medium article; wants a gummy supplement line.', brand:'Food Research Lab', log:[['Enquiry received','Guest Post',d(2)],['Qualified as SQL','Neha Verma',d(2)],['Proposal in review','Neha Verma',d(1)]] },
    { id:'CN-006', leadId:'LD-006', name:'Dr. Kenji Tanaka', phone:'+81 90 1234 5678', email:'k.tanaka@bioclin.jp', country:'Japan', company:'BioClin', service:'Clinical Trial Support', source:'Organic Search', stage:'Lost', value:'₹80,000', date:d(3), owner:'Aditi Rao', desc:'Timeline mismatch — needed delivery in 3 weeks.', brand:'Food Research Lab', log:[['Enquiry received','Organic Search',d(3)],['Lost — timeline mismatch','Aditi Rao',d(2)]] },
  ]; }
  _allContactIdsEver(){ return this.CONTACT_SEED().map(c=>c.id).concat((this.state.contactAdded||[]).map(c=>c.id)).concat(this.state.contactDeleted||[]); }
  allContacts(){ const upd=this.state.contactUpd||{};
    const added=this.state.contactAdded||[];
    const del=this.state.contactDeleted||[];
    const addedIds=new Set(added.map(c=>c.id));
    let list=added.concat(this.CONTACT_SEED().filter(c=>!addedIds.has(c.id)))
      .filter(c=>!del.includes(c.id))
      .map(c=>upd[c.id]?{...c,...upd[c.id]}:c);
    if(this._leadBrandRestricted()){ const bs=this.mySalesBrands(); list=bs.length?list.filter(c=>bs.includes(c.brand)):[]; }
    return list; }
  _deleteContact(id){
    if(!this.hasPerm('leads','delete')){ this.flash('You do not have permission to delete contacts.'); return; }
    const c=this.allContacts().find(x=>x.id===id); if(!c) return;
    this.setState({ contactDeleted:[...(this.state.contactDeleted||[]), id], cnOpen:null });
    this.flash('Deleted contact: '+(c?c.name:id)+'.');
    // upsert (not update) — a contact still only in CONTACT_SEED() has no
    // row yet, so this is what makes the deletion stick past reload.
    supabase.from('contacts').upsert({ id, payload:c||{}, deleted:true, created_by:this.state.authUser?this.state.authUser.id:null }).then(({error})=>{
      if(error) console.warn('[supabase] contact delete failed:', error.message);
    });
  }
  pipelineView(canWrite){
    const me=this.currentPerson();
    const all=this.allContacts();
    const F=this.state.pipeFilters||{stage:'All',service:'All',country:'All',owner:'All'};
    const setF=(k)=>(e)=>this.setState({ pipeFilters:{...F,[k]:e.target.value}, pg:{...(this.state.pg||{}),pipe:0} });
    const list=all.filter(c=> (F.stage==='All'||c.stage===F.stage) && (F.service==='All'||c.service===F.service) && (F.country==='All'||c.country===F.country) && (F.owner==='All'||c.owner===F.owner) );
    const cnt=(s)=>all.filter(c=>c.stage===s).length;
    const total=all.length, mql=all.filter(c=>['MQL','SQL','Opportunity','Won'].includes(c.stage)).length;
    const sql=all.filter(c=>['SQL','Opportunity','Won'].includes(c.stage)).length;
    const won=cnt('Won');
    const funnel=[
      { label:'All enquiries', n:total, sub:'captured', color:'var(--ink-400)' },
      { label:'UQL — unqualified', n:cnt('UQL')+cnt('New'), sub:'no budget / not a fit', color:'var(--ink-500)' },
      { label:'MQL — marketing qualified', n:mql, sub:total?Math.round(mql/total*100)+'% of enquiries':'—', color:'var(--info-500)' },
      { label:'SQL — sales qualified', n:sql, sub:mql?Math.round(sql/mql*100)+'% of MQLs':'—', color:'var(--orchid-500)' },
      { label:'Opportunity', n:cnt('Opportunity')+won, sub:sql?Math.round((cnt('Opportunity')+won)/sql*100)+'% of SQLs':'—', color:'var(--warn-500)' },
      { label:'Won', n:won, sub:sql?Math.round(won/sql*100)+'% SQL→Won':'—', color:'var(--verify-500)' },
    ].map(f=>({ ...f, value:String(f.n), w:total?Math.max(4,Math.round(f.n/total*100))+'%':'0%' }));
    const pipeValue=all.filter(c=>['SQL','Opportunity'].includes(c.stage)).reduce((s,c)=>s+this.cmpNum(c.value),0);
    const wonValue=all.filter(c=>c.stage==='Won').reduce((s,c)=>s+this.cmpNum(c.value),0);
    const K=(label,value,sub,color)=>({label,value,sub,color});
    const pg=this.pgData('pipe',list.map(c=>{ const t=this.stageTone(c.stage);
      return { ...c, stageBg:t.bg, stageColor:t.c,
        canWrite:!!canWrite,
        setStage:(e)=>{ if(!canWrite){ this.flash('View only — stage changes are restricted to Admin, Manager and Sales.'); return; }
          const v=e.target.value; const u={...(this.state.contactUpd||{})};
          const log=[...(c.log||[]),['Stage → '+v,me,this.todayStr()]];
          u[c.id]={...(u[c.id]||{}), stage:v, log};
          this.setState({ contactUpd:u }); this.flash(c.name+' moved to '+v+'.');
          supabase.from('contacts').upsert({ id:c.id, payload:{...c, stage:v, log}, created_by:this.state.authUser?this.state.authUser.id:null }).then(({error})=>{
            if(error) console.warn('[supabase] contact upsert failed:', error.message);
          }); },
        open:()=>{ if(!canWrite){ this.flash('View only — lead detail is restricted to Admin, Manager and Sales.'); return; }
          this.setState({ cnOpen:c.id }); } }; }),8);
    return {
      pipeStats:[K('Total leads',String(total),'in pipeline','var(--ink-900)'),
        K('MQL',String(mql),total?Math.round(mql/total*100)+'% of enquiries':'—','var(--info-600)'),
        K('SQL',String(sql),mql?Math.round(sql/mql*100)+'% of MQLs':'—','var(--orchid-600)'),
        K('Won',String(won),sql?Math.round(won/sql*100)+'% SQL conversion':'—','var(--verify-600)'),
        K('Open pipeline','₹'+Math.round(pipeValue/1000)+'K','SQL + Opportunity','var(--warn-600)'),
        K('Won value','₹'+Math.round(wonValue/1000)+'K','closed','var(--verify-600)')],
      pipeFunnel:funnel,
      pipeRows:pg.rows, pipePg:pg, pipeEmpty:list.length===0,
      pipeStageOptions:this.LEAD_STAGES(),
      pipeFilterDefs:[
        {label:'Stage',value:F.stage,onChange:setF('stage'),options:['All'].concat(this.LEAD_STAGES())},
        {label:'Service',value:F.service,onChange:setF('service'),options:['All'].concat([...new Set(all.map(c=>c.service))])},
        {label:'Country',value:F.country,onChange:setF('country'),options:['All'].concat([...new Set(all.map(c=>c.country))])},
        {label:'Owner',value:F.owner,onChange:setF('owner'),options:['All'].concat([...new Set(all.map(c=>c.owner))])},
      ],
      pipeReset:()=>this.setState({ pipeFilters:{stage:'All',service:'All',country:'All',owner:'All'} }),
      pipeCanWrite:!!canWrite, pipeReadOnly:!canWrite,
      pipeMaskNote:'Contact details are restricted — visible to Admin, Manager and Sales only.',
      pipeNew:()=>{ if(!canWrite){ this.flash('View only — lead entry is restricted to Admin, Manager and Sales.'); return; }
        this.setState({ cnNew:true, cnForm:{ stage:'New', country:'India', date:'' } }); },
      ...this.contactFormData(), ...this.contactDetailData(),
    };
  }
  contactFormData(){
    if(!this.state.cnNew) return { cnFormOpen:false };
    const f=this.state.cnForm||{};
    const set=(k)=>(e)=>this.setState({ cnForm:{...f,[k]:e.target.value} });
    return { cnFormOpen:true, cnf:f,
      cnFromDaily:!!f.leadId,
      cnFromDailyNote:f.leadId?('Linked to daily lead entry '+f.leadId+' — '+(f.service||'')+' · '+(f.source||'')):'',
      cnClose:()=>this.setState({ cnNew:false, cnForm:{} }),
      cnStop:(e)=>e.stopPropagation(),
      cnSetName:set('name'), cnSetCountry:set('country'),
      cnSetCompany:set('company'), cnSetService:set('service'), cnSetSource:set('source'), cnSetStage:set('stage'),
      cnSetValue:set('value'), cnSetDesc:set('desc'), cnSetDate:set('date'), cnSetBrand:set('brand'),
      cnSetEmail:set('email'), cnSetPhone:set('phone'),
      cnServiceOptions:this.SERVICE_LIST(), cnSourceOptions:this.leadSourceList(), cnStageOptions:this.LEAD_STAGES(),
      cnCountryOptions:this.MASTERS_REG().country.rows.filter(r=>r.Status!=='Inactive').map(r=>r.Country_Name),
      cnBrandOptions: this._leadBrandRestricted() ? this.mySalesBrands() : this.BRAND_LIST(),
      cnBrandVal: this._leadBrandRestricted() ? (f.brand||this.mySalesBrands()[0]||'') : (f.brand||''),
      cnBrandLocked: this._leadBrandRestricted() && this.mySalesBrands().length<=1,
      cnBrandNote: this._leadBrandRestricted() ? ('Assigned brand'+(this.mySalesBrands().length===1?'':'s')+': '+(this.mySalesBrands().join(', ')||'none — contact Admin')) : '',
      cnSave:()=>{
        if(!(f.name&&f.name.trim())){ this.flash('Enter the contact name.'); return; }
        const me=this.currentPerson();
        const nums=this._allContactIdsEver().map(id=>{ const m=String(id).match(/^CN-(\d+)$/); return m?parseInt(m[1],10):0; });
        const id='CN-'+String(Math.max(0,...nums)+1).padStart(3,'0');
        const rec={ id, leadId:f.leadId||'', name:f.name.trim(), country:f.country||'India',
          company:f.company||'—', service:f.service||this.SERVICE_LIST()[0], source:f.source||'Organic Search',
          stage:f.stage||'New', value:f.value||'—', date:this.fmtDate(f.date)||this.todayStr(), owner:me, desc:f.desc||'',
          email:f.email||'', phone:f.phone||'',
          brand: this._leadBrandRestricted()?(f.brand||this.mySalesBrands()[0]||''):(f.brand||''),
          log:[['Lead created',me,this.todayStr()]] };
        this.setState({ contactAdded:[rec,...(this.state.contactAdded||[])], cnNew:false, cnForm:{} });
        this.flash(rec.id+' — '+rec.name+' added to the lead pipeline as '+rec.stage+'.');
        supabase.from('contacts').insert({ id:rec.id, payload:rec, created_by:this.state.authUser?this.state.authUser.id:null }).then(({error})=>{
          if(error) console.warn('[supabase] contact insert failed:', error.message);
        });
      } };
  }
  contactDetailData(){
    const id=this.state.cnOpen; if(!id) return { cnDrawerOpen:false };
    const c=this.allContacts().find(x=>x.id===id); if(!c) return { cnDrawerOpen:false };
    const t=this.stageTone(c.stage); const me=this.currentPerson();
    const canWrite=this.hasPerm('leads','edit');
    const canDelete=this.hasPerm('leads','delete');
    return { cnDrawerOpen:true,
      cnD:{ ...c, stageBg:t.bg, stageColor:t.c },
      cnDClose:()=>this.setState({ cnOpen:null }),
      cnDStop:(e)=>e.stopPropagation(),
      cnMeta:[['Lead ID',c.id],['Company',c.company],['Email',c.email],['Phone',c.phone],['Country',c.country],
        ['Service requested',c.service],['Source',c.source],['Campaign',c.campaign],['Est. value',c.value],['Captured',c.date],['Owner',c.owner]].map(x=>({k:x[0],v:x[1]||'—'})),
      cnLog:(c.log||[]).slice().reverse().map(l=>({ what:l[0], who:l[1], when:l[2] })),
      cnStageOptions2:this.LEAD_STAGES(),
      cnDCanWrite:canWrite,
      cnDCanDelete:canDelete,
      cnDDelete:()=>{ if(!canDelete){ this.flash('You do not have permission to delete contacts.'); return; }
        this.confirmDelete('Delete Contact?', 'Are you sure you want to delete "'+(c.name||c.id)+'"? This action cannot be undone.', ()=>this._deleteContact(c.id)); },
      cnDSetStage:(e)=>{ if(!canWrite){ this.flash('You do not have permission to edit leads.'); return; }
        const v=e.target.value; const u={...(this.state.contactUpd||{})};
        const log=[...(c.log||[]),['Stage → '+v,me,this.todayStr()]];
        u[c.id]={...(u[c.id]||{}), stage:v, log};
        this.setState({ contactUpd:u }); this.flash(c.name+' moved to '+v+'.');
        supabase.from('contacts').upsert({ id:c.id, payload:{...c, stage:v, log}, created_by:this.state.authUser?this.state.authUser.id:null }).then(({error})=>{
          if(error) console.warn('[supabase] contact upsert failed:', error.message);
        }); } };
  }
  leadsView(canWrite){
    const rk=this.state.roleKey, me=this.currentPerson();
    const today=this.todayStr();
    const all=this.allLeads();
    const F=this.state.ldFilters||{service:'All',source:'All',range:'This week'};
    const setF=(k)=>(e)=>this.setState({ ldFilters:{...F,[k]:e.target.value}, pg:{...(this.state.pg||{}),ld:0} });
    const win=F.range==='Today'?0:(F.range==='This week'?7:(F.range==='This month'?31:9999));
    const dayAgo=(ds)=>{ const iso=this.isoDate(ds); if(!iso) return 0; return Math.round((Date.now()-new Date(iso+'T00:00:00').getTime())/86400000); };
    let list=all.filter(l=> (F.service==='All'||l.service===F.service) && (F.source==='All'||l.source===F.source) && dayAgo(l.date)<=win );
    const sum=(a,k)=>a.reduce((s,x)=>s+(parseInt(x[k],10)||0),0);
    const todays=all.filter(l=>l.date===today);
    const mine=todays.filter(l=>l.who===me);
    const target=parseInt(this.state.ldTarget||'10',10);
    const todayTotal=sum(todays,'count');
    const svcMap={}; list.forEach(l=>{ svcMap[l.service]=svcMap[l.service]||{c:0,q:0,n:0,v:0}; svcMap[l.service].c+=parseInt(l.count,10)||0; svcMap[l.service].q+=parseInt(l.qualified,10)||0; svcMap[l.service].v+=parseInt(l.visitors,10)||0; svcMap[l.service].n++; });
    const maxSvc=Math.max(1,...Object.values(svcMap).map(v=>v.c));
    const svcRows=Object.entries(svcMap).sort((a,b)=>b[1].c-a[1].c).map(([k,v])=>({
      label:k, count:String(v.c), qualified:v.q+' qualified', entries:v.n+' entr'+(v.n===1?'y':'ies'),
      pageUrl:(this.servicePageOf(k)||{}).url||'no page mapped',
      visitors:v.v.toLocaleString('en-IN')+' visitors', cvr:v.v?((Math.round(v.c/v.v*1000)/10)+'% CVR'):'—',
      w:Math.round(v.c/maxSvc*100)+'%', rate:v.c?Math.round(v.q/v.c*100)+'% qualified':'—',
      color:v.q/(v.c||1)>=0.6?'var(--verify-500)':v.q/(v.c||1)>=0.3?'var(--warn-500)':'var(--danger-500)' }));
    const pg=this.pgData('ld',list.map(l=>({ ...l, countLabel:String(l.count), qualifiedLabel:String(l.qualified),
      visitorsLabel:(parseInt(l.visitors,10)||0).toLocaleString('en-IN'),
      ...(()=>{ const kids=this.allContacts().filter(c=>c.leadId===l.id);
        const n=kids.length, need=parseInt(l.count,10)||0, complete=n>=need;
        return { detailCount:n+' / '+need+' entered', detailComplete:complete,
          detailBg:complete?'var(--verify-100)':'var(--warn-100)', detailColor:complete?'var(--verify-600)':'var(--warn-600)',
          detailLabel:complete?'View details':('Add '+(need-n)+' detail'+((need-n)===1?'':'s')),
          contactNames:kids.map(c=>({ name:c.name, stage:c.stage,
            bg:this.stageTone(c.stage).bg, color:this.stageTone(c.stage).c,
            open:()=>this.setState({ leadsTab:'pipe', cnOpen:c.id }) })),
          hasContacts:n>0,
          addDetail:()=>this.setState({ cnNew:true, leadsTab:'pipe',
            cnForm:{ stage:'New', country:'India', service:l.service, source:l.source, date:this.isoDate(l.date), leadId:l.id, brand:l.brand||'' } }) }; })(),
      pageUrl:(this.servicePageOf(l.service)||{}).url||'', hasPage:!!(this.servicePageOf(l.service)||{}).url,
      openPage:()=>{ const s=this.servicePageOf(l.service); const p=s&&this.allContentPages().find(x=>x.url===s.url);
        if(p) this.setState({ route:'content', cOpen:p.id, cTab:0 }); else this.flash('No repository page mapped to "'+l.service+'" yet.'); },
      canDeleteLead:this.hasPerm('leads','delete'), deleteLead:()=>{ if(!this.hasPerm('leads','delete')){ this.flash('You do not have permission to delete leads.'); return; }
        this.confirmDelete('Delete Lead?', 'Are you sure you want to delete this lead entry ('+l.id+')? This action cannot be undone.', ()=>this._deleteLead(l.id)); },
      isToday:l.date===today, dateBg:l.date===today?'var(--verify-100)':'var(--surface-50)', dateColor:l.date===today?'var(--verify-600)':'var(--ink-500)' })),10);
    const f=this.state.ldForm||{};
    const set=(k)=>(e)=>this.setState({ ldForm:{...f,[k]:e.target.value} });
    const K=(label,value,sub,color)=>({label,value,sub,color});
    const pct=Math.min(100,Math.round(todayTotal/(target||1)*100));
    return {
      ldStats:[K('Leads today',String(todayTotal),'target '+target+' / day',todayTotal>=target?'var(--verify-600)':'var(--warn-600)'),
        K('Qualified today',String(sum(todays,'qualified')),'from '+todays.length+' entries','var(--orchid-600)'),
        K('In range',String(sum(list,'count')),F.range.toLowerCase(),'var(--info-600)'),
        K('Services active',String(Object.keys(svcMap).length),'generating leads','var(--ink-900)'),
        K('My entries today',String(mine.length),mine.length?'logged':'not logged yet',mine.length?'var(--verify-600)':'var(--danger-600)')],
      ldTodayPct:pct+'%', ldTodayW:pct+'%',
      ldTodayColor:pct>=100?'var(--verify-500)':pct>=60?'var(--warn-500)':'var(--danger-500)',
      ldTodayNote:todayTotal>=target?('Daily target met — '+todayTotal+' of '+target+' leads.'):(todayTotal+' of '+target+' leads today · '+(target-todayTotal)+' to go'),
      ldPendingToday:mine.length===0,
      ldSvcRows:svcRows, ldRows:pg.rows, ldPg:pg, ldEmpty:list.length===0, ldCanEnter:!!canWrite, ldReadOnly:!canWrite,
      ...(()=>{
        const grp={ targeted:{v:0,c:0,q:0,svc:[]}, untargeted:{v:0,c:0,q:0,svc:[]} };
        Object.entries(svcMap).forEach(([name,val])=>{ const t=this.serviceTargeting(name);
          const g=t.targeted?grp.targeted:grp.untargeted;
          g.v+=val.v; g.c+=val.c; g.q+=val.q;
          g.svc.push({ name, visitors:val.v.toLocaleString('en-IN'), leads:val.c, leadsLabel:val.c+' lead'+(val.c===1?'':'s'), qualified:val.q,
            url:t.url||'no page mapped',
            cvr:val.v?((Math.round(val.c/val.v*1000)/10)+'%'):'—',
            why:t.targeted?(t.kpis.length?('KPI: '+t.kpis.join(', ')+(t.campaigns.length?(' · '+t.campaigns[0]):'')):'Effort/tasks working on it'):'No KPI or effort assigned',
            expected:t.expected?('expected '+t.expected):'' }); });
        const mk=(key,label,tone)=>{ const g=grp[key]; const tot=grp.targeted.c+grp.untargeted.c;
          return { label, visitors:g.v.toLocaleString('en-IN'), leads:String(g.c), qualified:String(g.q),
            cvr:g.v?((Math.round(g.c/g.v*1000)/10)+'%'):'—',
            share:tot?Math.round(g.c/tot*100)+'% of leads':'—',
            w:tot?Math.round(g.c/tot*100)+'%':'0%',
            color:tone, pages:g.svc.sort((a,b)=>b.leads-a.leads),
            hasPages:g.svc.length>0, noPages:g.svc.length===0,
            empty:key==='targeted'?'No targeted pages produced leads in this range.':'Every lead came from a targeted page — good attribution.' }; };
        return { ldSplit:[ mk('targeted','Targeted pages — planned, with KPI & effort behind them','var(--verify-500)'),
                           mk('untargeted','Untargeted pages — leads arriving without a plan','var(--warn-500)') ],
          ldSplitNote:'Targeted = the page is linked to a campaign KPI or has effort/tasks working on it. Untargeted leads are unplanned wins — consider bringing those pages into a campaign.' }; })(),
      ldFilterDefs:[
        {label:'Service',value:F.service,onChange:setF('service'),options:['All'].concat(this.SERVICE_LIST())},
        {label:'Source',value:F.source,onChange:setF('source'),options:['All'].concat(this.leadSourceList())},
        {label:'Range',value:F.range,onChange:setF('range'),options:['Today','This week','This month','All time']},
      ],
      ldReset:()=>this.setState({ ldFilters:{service:'All',source:'All',range:'This week'} }),
      ...(()=>{
        const per=this.state.ldPeriod||'Weekly';
        const N={Weekly:7,Monthly:30,Quarterly:91}[per];
        const buckets=(per==='Weekly'?6:(per==='Monthly'?6:4));
        const label=(i)=>{ const end=new Date(Date.now()-i*N*86400000);
          const M=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
          if(per==='Monthly') return M[end.getMonth()]+' '+end.getFullYear();
          if(per==='Quarterly') return 'Q'+(Math.floor(end.getMonth()/3)+1)+' '+end.getFullYear();
          return i===0?'This week':(i===1?'Last week':(i+' weeks ago')); };
        const rows=[];
        for(let i=0;i<buckets;i++){
          const inBucket=all.filter(l=>{ const d=dayAgo(l.date); return d>=i*N && d<(i+1)*N; });
          const c=sum(inBucket,'count'), q=sum(inBucket,'qualified');
          const svc={}; inBucket.forEach(l=>{ svc[l.service]=(svc[l.service]||0)+(parseInt(l.count,10)||0); });
          const top=Object.entries(svc).sort((a,b)=>b[1]-a[1])[0];
          const src={}; inBucket.forEach(l=>{ src[l.source]=(src[l.source]||0)+(parseInt(l.count,10)||0); });
          const topSrc=Object.entries(src).sort((a,b)=>b[1]-a[1])[0];
          rows.push({ i, label:label(i), count:c, qualified:q, entries:inBucket.length,
            top:top?(top[0]+' ('+top[1]+')'):'—', topSrc:topSrc?(topSrc[0]+' ('+topSrc[1]+')'):'—',
            rate:c?Math.round(q/c*100)+'%':'—',
            target:target*N, hit:c>=target*N });
        }
        const max=Math.max(1,...rows.map(r=>r.count));
        const cur=rows[0]||{count:0,qualified:0}, prev=rows[1]||{count:0};
        const delta=cur.count-prev.count;
        const pctD=prev.count?Math.round(delta/prev.count*100):(cur.count?100:0);
        return {
          ldPeriod:per,
          ldPeriodBtns:['Weekly','Monthly','Quarterly'].map(p=>({ label:p, active:per===p,
            style:'padding:7px 14px;border-radius:999px;font-size:12px;font-weight:700;cursor:pointer;border:1px solid '+(per===p?'var(--beet-700)':'var(--line-300)')+';background:'+(per===p?'var(--beet-700)':'var(--paper)')+';color:'+(per===p?'#fff':'var(--ink-700)'),
            set:()=>this.setState({ ldPeriod:p }) })),
          ldReportTitle:per+' lead report',
          ldReportRows:rows.map(r=>({ ...r, countLabel:String(r.count), qualifiedLabel:String(r.qualified),
            entriesLabel:r.entries+' entr'+(r.entries===1?'y':'ies'),
            targetLabel:'target '+r.target,
            w:Math.round(r.count/max*100)+'%',
            color:r.hit?'var(--verify-500)':(r.count?'var(--warn-500)':'var(--line-300)'),
            badge:r.hit?'Target met':'Below target',
            badgeBg:r.hit?'var(--verify-100)':'var(--warn-100)', badgeColor:r.hit?'var(--verify-600)':'var(--warn-600)' })),
          ldTrendLabel:(delta>=0?'▲ +':'▼ ')+delta+' leads vs previous period ('+(pctD>=0?'+':'')+pctD+'%)',
          ldTrendColor:delta>=0?'var(--verify-600)':'var(--danger-600)',
          ldReportSummary:cur.count+' leads · '+cur.qualified+' qualified · '+(cur.count?Math.round(cur.qualified/cur.count*100):0)+'% qualification rate',
        }; })(),
      ldf:f, ldSourceOptions:this.leadSourceList(),
      ldServiceOptions:this.SERVICE_PAGES().map(s=>({ v:s.name, label:s.name+(s.url?(' — '+s.url):'')+' · '+s.src })),
      ldServicePageNote:(()=>{ const s=f.service&&this.servicePageOf(f.service);
        return s?('Linked page: '+(s.url||'no URL on record')+' · '+s.src):'Pick a service — its repository page is linked automatically.'; })(),
      ldSetService:(e)=>{ const v=e.target.value;
        const sp=this.servicePageOf(v);
        const tp=sp&&this.targetedPages()[sp.url];
        const camp=(tp&&tp.campaigns&&tp.campaigns[0])||'';
        this.setState({ ldForm:{...f, service:v, campaign:camp||f.campaign||'— None —'} });
        if(camp) this.flash('Campaign auto-filled from "'+v+'" — '+camp+'.'); },
      ldCampaignNote:(()=>{ const sp=f.service&&this.servicePageOf(f.service);
        const tp=sp&&this.targetedPages()[sp.url];
        return (tp&&tp.campaigns&&tp.campaigns.length)
          ? ('Auto-filled from the campaign targeting '+sp.url)
          : (f.service?'No campaign targets this service page yet — pick one manually.':'Select a service to auto-fill the campaign.'); })(),
      ldSetDate:set('date'), ldSetSource:set('source'), ldSetCount:set('count'), ldSetQualified:set('qualified'), ldSetValue:set('value'), ldSetNotes:set('notes'), ldSetVisitors:set('visitors'),
      ldSetCampaign:set('campaign'), ldCampaignOptions:['— None —'].concat(this.campaignNames(false)),
      ldSetBrand:set('brand'), ldBrandOptions: this._leadBrandRestricted() ? this.mySalesBrands() : this.BRAND_LIST(),
      ldBrandVal: this._leadBrandRestricted() ? (f.brand||this.mySalesBrands()[0]||'') : (f.brand||''),
      ldBrandLocked: this._leadBrandRestricted() && this.mySalesBrands().length<=1,
      ldBrandNote: this._leadBrandRestricted() ? ('Assigned brand'+(this.mySalesBrands().length===1?'':'s')+': '+(this.mySalesBrands().join(', ')||'none — contact Admin')) : '',
      ldSave:()=>{
        const n=parseInt(f.count,10)||0;
        if(!f.service){ this.flash('Select the service these leads came in for.'); return; }
        if(!n){ this.flash('Enter how many leads came in.'); return; }
        const nums=this._allLeadIdsEver().map(id=>{ const m=String(id).match(/^LD-(\d+)$/); return m?parseInt(m[1],10):0; });
        const id='LD-'+String(Math.max(0,...nums)+1).padStart(3,'0');
        const sp=this.servicePageOf(f.service);
        const rec={ id, date:this.fmtDate(f.date)||today, service:f.service, servicePage:(sp&&sp.url)||'', source:f.source||'Organic Search',
          visitors:parseInt(f.visitors,10)||0, count:n, qualified:parseInt(f.qualified,10)||0, value:f.value||'—', who:me, campaign:f.campaign||'', notes:f.notes||'',
          brand: this._leadBrandRestricted()?(f.brand||this.mySalesBrands()[0]||''):(f.brand||'') };
        this.setState({ leadAdded:[rec,...(this.state.leadAdded||[])], ldForm:{} });
        this.flash(n+' lead'+(n===1?'':'s')+' logged for '+f.service+' — counted toward today’s KPI.');
        supabase.from('leads').insert({ id:rec.id, payload:rec, created_by:this.state.authUser?this.state.authUser.id:null }).then(({error})=>{
          if(error) console.warn('[supabase] lead insert failed:', error.message);
        });
      },
    };
  }
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
    const approved=['QC Approved','Scheduled','Published'].includes(p.workflow)||!!(this.state.cwApproved||{})[p.id]||!!p.approved;
    const stages=this.PAGE_STAGES(mode);
    const kpiTargets=this.targetedPages()[p.url]||null;
    const done=linked.filter(t=>['Approved','Closed'].includes(t.status)).length;
    return {
      cwMode:mode, cwCanRun:canRun,
      cwModeBtns:['New page','Revamp'].map(m=>({ label:m==='New page'?'New page build':'Revamp existing content', active:mode===m,
        style:'padding:7px 13px;border-radius:999px;font-size:11.5px;font-weight:700;cursor:pointer;border:1px solid '+(mode===m?'var(--beet-700)':'var(--line-300)')+';background:'+(mode===m?'var(--beet-700)':'var(--paper)')+';color:'+(mode===m?'#fff':'var(--ink-700)'),
        set:()=>this.setState({ cwMode:{...(this.state.cwMode||{}),[p.id]:m} }) })),
      cwApproved:approved,
      cwApproveLabel:approved?'Brief approved':'Approve brief for production',
      cwApprove:()=>{ this.setState({ cwApproved:{...(this.state.cwApproved||{}),[p.id]:true} });
        this.flash('Brief approved for '+p.id+' — production tasks can now be generated.');
        supabase.from('content_pages').upsert({ id:p.id, payload:{...p, approved:true}, created_by:this.state.authUser?this.state.authUser.id:null }).then(({error})=>{
          if(error) console.warn('[supabase] brief approval failed:', error.message);
        }); },
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
        const existingIds=this.allTasks().map(t=>t.id);
        const taskIds=stages.map(()=>{ const id=this._nextSeqCode('TSK-', existingIds, 3200); existingIds.push(id); return id; });
        const reviewer=(this.state.users.find(u=>u.roleKey==='qc')||{}).name || this.currentPerson();
        const added=stages.map((s,i)=>({
          id:taskIds[i], name:s.stage+' — '+p.name, desc:mode+' production for '+p.url+'.',
          template:s.tpl, project:'—', campaign:(kpiTargets&&kpiTargets.campaigns[0])||'—',
          start:this.relDate(i*2), end:this.relDate(i*2+2), priority:'High', assignee:s.who,
          kpiId:'', kpi:s.kpi, units:1, unit:'pages', estH:s.hrs, actH:0, recurrence:'None',
          reviewer, effortPlan:'Auto — from '+p.id, effortType:s.effort,
          depMode:'Sequential', dep:i===0?'—':taskIds[i-1],
          division:s.division, contentType:p.type||'', stage:s.stage, sourcePage:p.id, sourcePageUrl:p.url,
          checklist:[{t:'Work complete',done:false},{t:'Evidence attached',done:false},{t:'Compliance checklist filled',done:false}],
          evidence:[], status:i===0?'Assigned':'Assigned',
          activity:[[who,'Generated from '+p.id+' ('+mode+' chain, stage '+(i+1)+' of '+stages.length+')',this.todayStr()]] }));
        this.setState({ tkAdded:[...(this.state.tkAdded||[]),...added] });
        this.flash(added.length+' sequential tasks generated for '+p.id+' — Content → '+(mode==='Revamp'?'SEO → Publish':'Graphics → Web → SEO → Publish')+', each with QC and effort linkage.');
        added.forEach(t=>this._persistNewTask(t, null, null));
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
      cd_tabs:tabs.map((t,i)=>({ label:t, active:i===tab, go:()=>this.setState({cTab:i}), style:'flex:none;padding:9px 13px;border:none;background:none;border-bottom:2px solid '+(i===tab?'var(--orchid-500)':'transparent')+';font-size:13px;font-weight:700;cursor:pointer;color:'+(i===tab?'var(--ink-900)':'var(--ink-500)')+';margin-bottom:-1px;white-space:nowrap' })),
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
      cdAddBlock:()=>this.editContentPage(p.id, 3), cdAddLink:()=>this.editContentPage(p.id, 4),
      cdEditorStyle:'display:flex;align-items:center;gap:6px;padding:6px 13px;border:none;border-radius:8px;font-size:12.5px;font-weight:700;cursor:pointer;'+(!this.state.cdPreview?'background:var(--paper);color:var(--ink-900);box-shadow:var(--shadow-xs)':'background:none;color:var(--ink-500)'),
      cdPreviewStyle:'display:flex;align-items:center;gap:6px;padding:6px 13px;border:none;border-radius:8px;font-size:12.5px;font-weight:700;cursor:pointer;'+(this.state.cdPreview?'background:var(--paper);color:var(--ink-900);box-shadow:var(--shadow-xs)':'background:none;color:var(--ink-500)'),
      cd_rel:Object.entries(p.rel||{}).map(([k,v])=>({ group:k, items:v })),
      cd_internal:(p.internal||[]).map(l=>({ anchor:l[0], target:l[1], strength:l[2], score:l[3] })),
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
      cdCanEdit:['manager','admin','team_lead'].includes(this.state.roleKey),
      cdEdit:()=>this.editContentPage(p.id),
    };
  }
  editContentPage(id, startTab){
    const p=this.allContentPages().find(x=>x.id===id); if(!p) return;
    const clsGet=(label)=>{ const row=(p.cls||[]).find(x=>x[0]===label); return row?row[1]:''; };
    const seoGet=(label)=>{ const row=(p.seoMeta||[]).find(x=>x[0]===label); return row?row[1]:''; };
    const h2Block=(p.blocks||[]).find(b=>b[0]==='Heading'&&b[1]==='H2');
    const h2ParaIdx=h2Block?(p.blocks||[]).indexOf(h2Block)+1:-1;
    const h3Block=(p.blocks||[]).find(b=>b[0]==='Heading'&&b[1]==='H3');
    const h3ParaIdx=h3Block?(p.blocks||[]).indexOf(h3Block)+1:-1;
    const introBlock=(p.blocks||[]).find(b=>b[0]==='Paragraph');
    const ctaBlock=(p.blocks||[]).find(b=>b[0]==='CTA');
    const svc=(p.rel&&p.rel.Services&&p.rel.Services[0])||'';
    const svcMatch=this.allContentPages().find(x=>svc.indexOf(x.name)===0);
    const insight=(p.rel&&p.rel.Insights&&p.rel.Insights[0])||'';
    const insightMatch=this.allContentPages().find(x=>insight.indexOf(x.name)===0);
    this.setState({ showNewPage:true, npTab:startTab||0, npEditId:id,
      npLinks:(p.internal||[]).map(l=>({anchor:l[0],target:l[1],ltype:l[2]||'Internal'})).length?(p.internal||[]).map(l=>({anchor:l[0],target:l[1],ltype:l[2]||'Internal'})):[{anchor:'',target:'',ltype:'Internal'}],
      npMedia:(p.media||[]).map(m=>({name:m[1],alt:m[2],type:m[0]})).length?(p.media||[]).map(m=>({name:m[1],alt:m[2],type:m[0]})):[{name:'',alt:'',type:'Image'}],
      npForm:{ repo:p.repo, brand:p.brand||'Beetloop', type:p.type, name:p.name, slug:p.slug, isIndex:!!p.isIndex, keyword:p.keyword!=='—'?p.keyword:'', industry:p.industry!=='—'?p.industry:'',
        metaTitle:seoGet('Meta Title'), metaDesc:p.description, owner:p.owner, reviewer:p.reviewer!=='—'?p.reviewer:'',
        subService:clsGet('Sub-Service')!=='To be assigned'?clsGet('Sub-Service'):'', sector:clsGet('Sector')!=='—'?clsGet('Sector'):'',
        objectCategory:(()=>{ const v=clsGet('Object Category')||clsGet('Application Category'); return v!=='—'?v:''; })(),
        countries:clsGet('Target Countries')!=='—'?clsGet('Target Countries'):'', pid:p.pid||'',
        menuCat:p.menuCat, menuOrder:String(p.menuOrder||0), secondaryKw:seoGet('Secondary Keywords')!=='—'?seoGet('Secondary Keywords'):'',
        intent:seoGet('Keyword Intent')!=='—'?seoGet('Keyword Intent'):'', schema:seoGet('Schema Type'),
        primaryKw:seoGet('Primary Keywords')!=='—'?seoGet('Primary Keywords'):'', ogTitle:seoGet('OG Title'), ogDesc:seoGet('OG Description'),
        ogImage:seoGet('OG Image')!=='—'?seoGet('OG Image'):'', robots:seoGet('Robots'),
        intro:introBlock?introBlock[2]:'', h2:h2Block?h2Block[2]:'', h2body:h2ParaIdx>=0&&(p.blocks||[])[h2ParaIdx]?(p.blocks||[])[h2ParaIdx][2]:'',
        h3:h3Block?h3Block[2]:'', h3body:h3ParaIdx>=0&&(p.blocks||[])[h3ParaIdx]?(p.blocks||[])[h3ParaIdx][2]:'',
        cta:ctaBlock?ctaBlock[2]:'', publishDate:this.isoDate(p.publishDate),
        relServiceId:svcMatch?svcMatch.id:'', relInsightId:insightMatch?insightMatch.id:'' } });
  }

  okrBulkAct(name){ return ()=>{ const n=this.state.okrSelected.length; this.setState({ okrSelected:[] }); this.flash(name+' '+n+' OKR'+(n===1?'':'s')); }; }

  okrView(){
    const rk = this.state.roleKey;
    const canEdit = this.hasPerm('okr','edit');
    const canDeleteOkr = this.hasPerm('okr','delete');
    const all = this.OKR_DATA();
    const F = this.state.okrFilters;
    const fq=F.kpiFreq||'All', dueF=F.due||'All';
    const dueMatch=(o)=>{ if(dueF==='All') return true; if(dueF==='Overdue') return o.daysLeft<0&&o.status!=='Completed'; if(dueF==='Due this week') return o.daysLeft>=0&&o.daysLeft<=7; if(dueF==='Due this month') return o.daysLeft>=0&&o.daysLeft<=31; if(dueF==='Due this quarter') return o.daysLeft>=0&&o.daysLeft<=92; return true; };
    const list = all.filter(o=> (F.dept==='All'||o.dept===F.dept) && (F.status==='All'||o.status===F.status) && (F.brand==='All'||o.brand===F.brand) && (F.priority==='All'||this.okrPriority(o).label===F.priority) && ((F.scope||'All')==='All'||o.scope===F.scope) && (fq==='All'||o.krs.some(k=>k.freq===fq)) && dueMatch(o) );
    const allKrs=all.reduce((a,o)=>a.concat(o.krs),[]);
    const freqCount=(f)=>allKrs.filter(k=>k.freq===f).length;
    const kpiFreqChips=['All','Daily','Weekly','Monthly','Quarterly','Yearly'].map(f=>{ const active=fq===f; const n=f==='All'?allKrs.length:freqCount(f); return {
      label:(f==='All'?'Total KPIs this year':f), count:String(n), active,
      style:'display:flex;align-items:center;gap:7px;padding:7px 13px;border-radius:999px;font-size:12px;font-weight:700;cursor:pointer;border:1px solid '+(active?'var(--beet-700)':'var(--line-300)')+';background:'+(active?'var(--beet-700)':'var(--paper)')+';color:'+(active?'#fff':'var(--ink-700)'),
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
      // The row used to surface the OKR's internal code (e.g.
      // "OKR-GEN-Q1-015") next to the version — meaningless to anyone but
      // the system. Showing the linked KPI name(s) instead tells a reader
      // what this objective is actually measured by, at a glance.
      const kpiNames=(o.krs||[]).map(k=>k.kpi).filter(Boolean);
      const kpiLabel=kpiNames.length?('KPI · '+kpiNames.join(', ')):'No KPI linked';
      return {
        id:o.id, title:o.title, code:o.code, kpiLabel, ver:o.v, krCount:o.krs.length+' KRs', owner:o.owner, team:o.team, cycle:o.cycle, due:o.due,
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
        checked, checkBg: checked?'#7A1C46':'var(--paper)', checkBorder: checked?'#7A1C46':'var(--line-300)', checkIconOpacity: checked?'1':'0',
        toggleSel:(e)=>{ if(e)e.stopPropagation(); this.setState({ okrSelected: checked?sel.filter(x=>x!==o.id):[...sel,o.id] }); },
        toggle:(e)=>{ if(e)e.stopPropagation(); this.setState({ okrExpanded: expanded?this.state.okrExpanded.filter(x=>x!==o.id):[...this.state.okrExpanded,o.id] }); },
        menuOpen: this.state.okrMenu===o.id,
        toggleMenu:(e)=>{ if(e)e.stopPropagation(); this.setState({ okrMenu: this.state.okrMenu===o.id?null:o.id }); },
        viewAct:(e)=>{ if(e)e.stopPropagation(); this.setState({ okrMenu:null, okrOpen:o.id }); },
        editAct:(e)=>{ if(e)e.stopPropagation(); this.setState({ okrMenu:null }); this.openOkrEdit(o.id); },
        cloneAct:(e)=>{ if(e)e.stopPropagation();
          const clone={ ...o, id:'okr-local-'+Date.now(), code:o.code+'-COPY', v:'v1.0', title:o.title+' (Copy)', status:'Draft', progress:0 };
          this.setState({ okrMenu:null, okrAdded:[...(this.state.okrAdded||[]), clone] });
          this.flash('Cloned "'+o.title+'" as a new draft.');
          supabase.from('okrs').insert({
            code:clone.code, title:clone.title, description:clone.desc, category:clone.category,
            scope:clone.scope, division:clone.dept, status:clone.status, key_results:clone.krs||[],
            created_by:this.state.authUser?this.state.authUser.id:null,
          }).then(({error})=>{
            if(error) console.warn('[supabase] okr clone insert failed:', error.message);
          }); },
        archiveAct:(e)=>{ if(e)e.stopPropagation();
          const nextPatch={...(this.state.okrUpd||{})[o.id], status:'Archived'};
          this.setState({ okrMenu:null, okrUpd:{...(this.state.okrUpd||{}), [o.id]:nextPatch} });
          this.flash('Archived "'+o.title+'".');
          this._persistOkr(o.code, {
            title:o.title, description:o.desc, category:o.category, scope:o.scope,
            division:o.dept, status:'Archived', key_results:o.krs||[],
          }); },
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
      navStyle:'display:flex;align-items:center;gap:10px;padding:9px 10px;margin-bottom:2px;border-radius:10px;font-size:13px;font-weight:'+(active?'700':'600')+';text-decoration:none;'+(active?'background:var(--orchid-100);color:var(--ink-900)':'color:var(--ink-500)'),
      badgeBg: active?'var(--beet-700)':'var(--surface-50)', badgeColor: active?'#fff':'var(--ink-500)' }; });
    const reg = this.MASTERS_REG();
    // Disabled KPI Master rows (and Disabled KPI Templates, already
    // filtered) never appear as pickable options for a NEW Key Result —
    // once a KPI is actually linked to a live KR it flows into Campaigns/
    // Effort Planner regardless of a later Status change here, matching
    // every other "Status gates new selections, not existing links" master.
    const kpiOptions = reg.kpi.rows.filter(r=>r.Status!=='Disabled').map(r=>({ label:r.KPI+' ('+r.Unit+')' })).concat(this.allKpiTemplates().filter(t=>t.status==='Active').map(t=>({ label:t.name+' ('+t.unit+') — Template' })));
    // Same "type your own, or pick from an existing master" choice as the
    // KPI field above, now for the Key Result title itself — sourced from
    // every Active OKR Template's own KR phrasings (deduped), since there's
    // no separate standalone "KR Master"; picking one is purely a
    // convenience autofill, never required — the free-text box beside it
    // always works standalone.
    const krTitleOptions=[...new Set(this.allOkrTemplates().filter(t=>t.status==='Active').flatMap(t=>(t.krs||[]).map(k=>k.t)).filter(Boolean))];
    const drafts = this.state.okrDraftKRs;
    const wTotal = drafts.reduce((s,k)=>s+(parseInt(k.weight,10)||0),0);
    const wOk = wTotal===100;
    const setDraft=(id,field)=>(e)=>{ const v=e.target.value; this.setState({ okrDraftKRs:this.state.okrDraftKRs.map(x=>x.id===id?{...x,[field]:v}:x) }); };
    const taskOpts=this.allTasks().map(t=>({ key:t.id, label:t.id+' · '+t.name }));
    const effOpts=this.cmpEffortPool().map(e=>({ key:e.key, label:e.name+' — '+e.division }));
    const setLinks=(id,field,arr)=>this.setState({ okrDraftKRs:this.state.okrDraftKRs.map(x=>x.id===id?{...x,[field]:arr}:x) });
    const okrDraftKRs = drafts.map((k,i)=>({ n:i+1, weight:k.weight, kr:k.kr||'', kpiSel:k.kpiSel||'', unit:k.unit||'', baseline:k.baseline||'', target:k.target||'', current:k.current||'',
      taskLinks:(k.taskLinks||[{key:''}]).map((tl,ti)=>({ ti, key:tl.key||'',
        set:(e)=>{ const a=(k.taskLinks||[{key:''}]).map((x,j)=>j===ti?{key:e.target.value}:x); setLinks(k.id,'taskLinks',a); },
        remove:()=>{ const a=(k.taskLinks||[{key:''}]).slice(); a.splice(ti,1); setLinks(k.id,'taskLinks',a.length?a:[{key:''}]); },
        canRemove:(k.taskLinks||[]).length>1 })),
      addTaskLink:()=>setLinks(k.id,'taskLinks',[...(k.taskLinks||[{key:''}]),{key:''}]),
      effortLinks:(k.effortLinks||[{key:''}]).map((el,ei)=>({ ei, key:el.key||'',
        set:(e)=>{ const a=(k.effortLinks||[{key:''}]).map((x,j)=>j===ei?{key:e.target.value}:x); setLinks(k.id,'effortLinks',a); },
        remove:()=>{ const a=(k.effortLinks||[{key:''}]).slice(); a.splice(ei,1); setLinks(k.id,'effortLinks',a.length?a:[{key:''}]); },
        canRemove:(k.effortLinks||[]).length>1 })),
      addEffortLink:()=>setLinks(k.id,'effortLinks',[...(k.effortLinks||[{key:''}]),{key:''}]),
      linkSummary:(()=>{ const t=(k.taskLinks||[]).filter(x=>x.key).length, e=(k.effortLinks||[]).filter(x=>x.key).length;
        const divs=[...new Set((k.effortLinks||[]).filter(x=>x.key).map(x=>(effOpts.find(o=>o.key===x.key)||{}).label||'').map(l=>l.split('— ')[1]||'').filter(Boolean))];
        if(!t&&!e) return 'Auto — every task tagged with this KPI counts toward it';
        return t+' task'+(t===1?'':'s')+' · '+e+' effort line'+(e===1?'':'s')+(divs.length?(' across '+divs.join(', ')):''); })(),
      setKr:setDraft(k.id,'kr'), setKpiSel:setDraft(k.id,'kpiSel'), setUnit:setDraft(k.id,'unit'), setBaseline:setDraft(k.id,'baseline'), setTarget:setDraft(k.id,'target'), setCurrent:setDraft(k.id,'current'),
      krPickOptions:[{value:'',label:'— Pick a Key Result from Templates —'}].concat(krTitleOptions.map(t=>({value:t,label:t}))),
      setKrPick:(e)=>{ const v=e.target.value; if(!v) return; this.setState({ okrDraftKRs:this.state.okrDraftKRs.map(x=>x.id===k.id?{...x,kr:v}:x) }); },
      // The KPI field's datalist already offers Master/Template suggestions
      // as you type, but that's easy to miss — this explicit dropdown is
      // the same source, discoverable without typing first. Either path
      // (type your own, or pick here) writes the same kpiSel field.
      kpiPickOptions:[{value:'',label:'— Pick from KPI Master / Templates —'}].concat(kpiOptions.map(o=>({value:o.label,label:o.label}))),
      setKpiPick:(e)=>{ const v=e.target.value; if(!v) return; this.setState({ okrDraftKRs:this.state.okrDraftKRs.map(x=>x.id===k.id?{...x,kpiSel:v}:x) }); },
      who:k.who||'', freq:k.freq||'Monthly', due:k.due||'',
      setWho:setDraft(k.id,'who'), setFreq:setDraft(k.id,'freq'), setDue:setDraft(k.id,'due'),
      tool:k.tool||'', method:k.method||'', mfreq:k.mfreq||'', evidence:k.evidence||'',
      setTool:(e)=>{ const v=e.target.value;
        this.setState({ okrDraftKRs:this.state.okrDraftKRs.map(x=>x.id===k.id?{...x, tool:v,
          method:this.methodForTool(v)||x.method, mfreq:this.freqForTool(v)||x.mfreq}:x) });
        if(this.methodForTool(v)) this.flash('Measurement method & frequency auto-filled for '+v+'.'); },
      setMethod:setDraft(k.id,'method'), setMfreq:setDraft(k.id,'mfreq'), setEvidence:setDraft(k.id,'evidence'),
      methodAuto:this.methodForTool(k.tool)?('Auto-set from '+k.tool+' — override if your process differs.'):'',
      ...(()=>{ const src=k.tsrc||'Manual';
        const upd=(patch)=>this.setState({ okrDraftKRs:this.state.okrDraftKRs.map(x=>x.id===k.id?{...x,...patch}:x) });
        const isEff=src==='Effort plan', isGold=src==='Gold standard', isTpl=src==='KPI template', isManual=src==='Manual', isDept=src==='Department allocation';
        return {
          tsrc:src, tref:k.tref||'',
          targetLocked:!isManual&&!!k.tref,
          setTsrc:(e)=>{ const v=e.target.value; upd({ tsrc:v, tref:'', ...(v==='Manual'?{}:{ target:'' }) }); },
          isEffSrc:isEff, isGoldSrc:isGold, isTplSrc:isTpl, isDeptSrc:isDept, isManualSrc:isManual,
          effOptions:this.effortTargetOptions(),
          goldOptions:this.GOLD_STANDARDS().map(g=>({ id:g.id, label:g.name+' — '+g.note })),
          tplOptions:kpiOptions,
          setTref:(e)=>{ const v=e.target.value;
            if(isEff){ const o=this.effortTargetOptions().find(x=>x.key===v);
              upd({ tref:v, target:o?o.target:'', unit:o?o.unit:k.unit, baseline:k.baseline||'0' }); }
            else if(isGold){ const g=this.GOLD_STANDARDS().find(x=>x.id===v);
              upd({ tref:v, target:g?(g.op+' '+g.val):'', unit:g?g.unit:k.unit, tool:g?g.tool:k.tool,
                method:k.method||'Semi-automated — tool + manual check' }); }
            else if(isTpl){ const t=(kpiOptions||[]).find(x=>x.label===v)||{};
              upd({ tref:v, kpiSel:v, target:t.target||'', unit:t.unit||k.unit }); }
            else upd({ tref:v }); },
          unlockTarget:()=>upd({ tsrc:'Manual', tref:'' }),
          targetHint:isEff?'Pulled from the effort plan — change the plan to change this target.'
            :isGold?'Pulled from the Gold Standard master — quality thresholds stay consistent everywhere.'
            :isTpl?'Pulled from the KPI template default.'
            :isDept?'Allocated from the department target for this cycle.'
            :'Manual — use for volatile targets (lead counts, revenue) that change every cycle.',
          deptOptions:['SEO — Q3 organic sessions','Content — Q3 published assets','SMM — Q3 engagement','Web — Q3 page fixes','Sales — Q3 qualified leads'],
        }; })(),
      measureSummary:(k.tool||k.method)?((k.tool||'No tool')+' · '+(k.method||'method not set')+(k.mfreq?(' · '+k.mfreq):'')):'No measurement tool set — progress will be manual.',
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
        {label:'Avg achievement',value:avgAch+'%',color:'var(--ink-900)',icon:'gauge'},
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
      okrBulkReviewer:this.okrBulkAct('Assigned reviewer to'), okrBulkOwner:this.okrBulkAct('Changed owner for'), okrBulkArchive:this.okrBulkAct('Archived'),
      okrBulkExport:()=>{ const chosen=sel.length?list.filter(o=>sel.includes(o.id)):list;
        this.exportCsv('okrs-'+this._todayIso()+'.csv',
          ['Code','Title','Category','Priority','Scope','Owner','Department','Brand','Status','Progress %','Due'],
          chosen.map(o=>[o.code, o.title, o.category, this.okrPriority(o).label, o.scope||'Department', o.owner, o.dept, o.brand, o.status, o.progress, o.due]));
        this.setState({ okrSelected:[] }); },
      ...(()=>{ const pg=this.pgData('okr',rows,6); return { okrRows:pg.rows, okrPg:pg }; })(), okrCanEdit:canEdit, okrEmpty:rows.length===0,
      okrNew:()=>{ if(canEdit) this.setState({ showOkrPanel:true, okrSection:'okrA', okrEditId:null, okrForm:{ title:'', desc:'', owner:(this.state.users&&this.state.users[0]?this.state.users[0].name:''), dept:'SEO', brand:this.BRAND_LIST()[0]||'Beetloop', businessUnit:'', websiteDomain:'', category:'SEO', scope:'Department', priority:'Medium', cycle:'Q1 2026', reviewFreq:'Weekly', start:'', end:'', parent:'None (top level)', dependsOn:'', effortTargets:'', progressCalc:'Automatic (from KPI logs)', dataSource:'GA4', reviewer:this.OKR_REVIEWERS()[0], status:'Draft', risks:'', contributors:[] }, okrDraftKRs:[{id:1,weight:'50'},{id:2,weight:'50'}], okrKRSeq:3 }); else this.flash('Only Managers and Admin can create OKRs.'); },
      showOkrPanel:this.state.showOkrPanel, closeOkr:()=>this.setState({ showOkrPanel:false, okrEditId:null }),
      okrIsEdit:!!this.state.okrEditId, okrPanelTitle:this.state.okrEditId?'Edit OKR':'Create new OKR', okrSaveLabel:this.state.okrEditId?'Save changes':'Save & activate',
      okrCanDelete:canDeleteOkr && !!this.state.okrEditId,
      okrDelete:()=>{ if(!canDeleteOkr){ this.flash('You do not have permission to delete OKRs.'); return; }
        const oe=this.state.okrEditId&&all.find(x=>x.id===this.state.okrEditId);
        this.confirmDelete('Delete OKR?', 'Are you sure you want to delete "'+(oe?oe.title:'this OKR')+'"? This action cannot be undone.', ()=>this._deleteOkr()); },
      ...(()=>{ const er=this.state.okrEditId?all.find(x=>x.id===this.state.okrEditId):null;
        return { okrPanelCode:er?er.code:('OKR-'+(this.ROLES[rk].bucket==='admin'?'GEN':'SEO')+'-Q1-'+String(list.length+1).padStart(3,'0')), okrPanelVerBadge:er?(er.status+' · '+(er.v||'v1.0')):'Draft · v1.0' }; })(),
      okrForm:this.state.okrForm,
      okrSetTitle:e=>this.setState({ okrForm:{...this.state.okrForm, title:e.target.value} }),
      okrSetDesc:e=>this.setState({ okrForm:{...this.state.okrForm, desc:e.target.value} }),
      okrSetOwner:e=>this.setState({ okrForm:{...this.state.okrForm, owner:e.target.value} }),
      okrOwnerOptions:(this.state.users||[]).map(u=>u.name),
      // Contributors used to be a plain, disconnected text input (no state,
      // nothing saved) — real users, chip + dropdown, same add/remove
      // pattern as the multi-KPI-link chips in the Effort Planner.
      okrContributorChips:(this.state.okrForm&&this.state.okrForm.contributors||[]).map(name=>({ name,
        remove:()=>{ const cur=(this.state.okrForm.contributors||[]).filter(x=>x!==name); this.setState({ okrForm:{...this.state.okrForm, contributors:cur} }); } })),
      okrAddContributorVal:'',
      okrAddContributor:e=>{ const v=e.target.value; if(!v) return;
        const cur=this.state.okrForm.contributors||[];
        if(cur.includes(v)){ this.flash(v+' is already a contributor.'); return; }
        this.setState({ okrForm:{...this.state.okrForm, contributors:[...cur, v]} }); },
      okrContributorOptions:[{v:'',label:'+ Add contributor…'}].concat((this.state.users||[]).filter(u=>u.status==='Active'&&u.name!==this.state.okrForm.owner&&!(this.state.okrForm.contributors||[]).includes(u.name)).map(u=>({v:u.name,label:u.name}))),
      okrSetDept:e=>this.setState({ okrForm:{...this.state.okrForm, dept:e.target.value} }),
      okrDeptOptions:this.MASTERS_REG().department.rows.map(r=>r.Department),
      okrSetBrand:e=>this.setState({ okrForm:{...this.state.okrForm, brand:e.target.value} }),
      okrBrandOptions:this.BRAND_LIST(),
      okrSetBusinessUnit:e=>this.setState({ okrForm:{...this.state.okrForm, businessUnit:e.target.value} }),
      okrBusinessUnitOptions:this.MASTERS_REG().businessUnit.rows.map(r=>r.Business_Unit),
      okrSetWebsiteDomain:e=>this.setState({ okrForm:{...this.state.okrForm, websiteDomain:e.target.value} }),
      okrWebsiteDomainOptions:this.MASTERS_REG().websiteDomain.rows.map(r=>r.Domain),
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
      saveOkr:()=>this._saveOkr(true, wOk, wTotal, rk),
      saveOkrDraft:()=>this._saveOkr(false, wOk, wTotal, rk),
      okrSteps, kpiOptions, okrDraftKRs,
      okrTplOptions, okrTplPick, okrTplVal:this.state.okrTpl||'',
      okrUnitOptions:this.UNIT_MASTER(),
      okrTsrcOptions:['Manual','Effort plan','Gold standard','KPI template','Department allocation'],
      okrToolGroups:this.MEASURE_TOOLS().map(g=>({ g:g.g, tools:g.t })),
      okrMethodOptions:this.MEASURE_METHODS(), okrMfreqOptions:this.MEASURE_FREQ(),
      okrTaskLinkOptions:[{key:'',label:'Auto — all tasks tagged with this KPI'}].concat(taskOpts),
      okrEffortLinkOptions:[{key:'',label:'None — outcome only'}].concat(effOpts),
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
  permissionsData(){
    const permCanManage=this.state.roleKey==='admin';
    const roleKeys=Object.keys(this.ROLES);
    const permRole=roleKeys.includes(this.state.permRole)?this.state.permRole:'manager';
    const mods=this.PERMISSION_MODULES();
    const toggle=(m,action)=>()=>{
      if(!permCanManage) return;
      const cur=this.getPerm(m,permRole);
      this.setPerm(m,permRole,action,!cur[action]);
    };
    const dotStyle=(on)=>'display:flex;align-items:center;justify-content:center;width:26px;height:26px;border-radius:8px;cursor:'+(permCanManage?'pointer':'default')+';border:1px solid '+(on?'var(--verify-500)':'var(--line-300)')+';background:'+(on?'var(--verify-100)':'var(--paper)')+';color:'+(on?'var(--verify-600)':'var(--ink-400)');
    return {
      permCanManage,
      permRoleOptions:roleKeys.map(k=>({ key:k, label:this.ROLES[k].label })),
      permRoleVal:permRole,
      permSetRole:(e)=>this.setState({ permRole:e.target.value }),
      permRows:mods.map(m=>{
        const p=this.getPerm(m,permRole);
        return { key:m, label:(this.MODMETA[m]&&this.MODMETA[m].label)||m,
          defaultLevel:this.ACCESS[m][permRole]||'No access',
          view:p.view, create:p.create, edit:p.edit, delete:p.delete, approve:p.approve, export:p.export,
          viewStyle:dotStyle(p.view), createStyle:dotStyle(p.create), editStyle:dotStyle(p.edit), deleteStyle:dotStyle(p.delete),
          approveStyle:dotStyle(p.approve), exportStyle:dotStyle(p.export),
          toggleView:toggle(m,'view'), toggleCreate:toggle(m,'create'), toggleEdit:toggle(m,'edit'), toggleDelete:toggle(m,'delete'),
          toggleApprove:toggle(m,'approve'), toggleExport:toggle(m,'export'),
          // "Audit all conversations" only ever makes sense for Messages —
          // every other module already grants full visibility through the
          // normal permission levels above, so this column stays blank
          // everywhere else.
          isMessages:m==='messages', auditAll:!!p.auditAll, auditAllStyle:dotStyle(p.auditAll),
          toggleAuditAll:toggle(m,'auditAll') };
      }),
      permReset:()=>{ if(!permCanManage) return;
        this.confirmDelete('Reset Permissions?', 'You are about to permanently reset every custom permission override for '+this.ROLES[permRole].label+' across all modules back to their defaults. This action cannot be undone.', ()=>{
          const cur={...(this.state.rolePerms||{})};
          mods.forEach(m=>{ if(cur[m]) cur[m]={...cur[m]}; if(cur[m]) delete cur[m][permRole]; });
          this.setState({ rolePerms:cur });
          this.flash('Permissions for '+this.ROLES[permRole].label+' reset to defaults.');
          supabase.from('role_permissions').delete().eq('role_key', permRole).then(({error})=>{
            if(error) console.warn('[supabase] role permission reset failed:', error.message);
          });
        }, 'Reset'); },
    };
  }
  tableData(route, rk, lvl, readOnly){
    const canEdit = this.EDIT_LEVELS.includes(lvl);
    const tag=(t,tone)=>({tag:t,tagBg:{ok:'var(--verify-100)',warn:'var(--warn-100)',info:'var(--info-100)',draft:'var(--surface-50)'}[tone],tagColor:{ok:'var(--verify-600)',warn:'var(--warn-600)',info:'var(--info-600)',draft:'var(--ink-500)'}[tone]});
    const act=(label,fn,primary)=>({actionLabel:label,action:fn,actionStyle: primary
      ? 'padding:6px 13px;border:none;background:#7A1C46;color:#fff;border-radius:9px;font-size:12.5px;font-weight:700;cursor:pointer'
      : 'padding:6px 13px;border:1px solid var(--line-300);background:var(--paper);color:var(--ink-700);border-radius:9px;font-size:12.5px;font-weight:600;cursor:pointer'});

    if(route==='users'){
      const empOf=(name)=>{ const idx=this.state.users.findIndex(u=>u.name===name); return 'EMP-'+String(100+idx+1).slice(-3); };
      const umTab=this.state.umTab||'list';
      const seg=(on)=>'display:flex;align-items:center;gap:7px;padding:8px 15px;border:none;border-radius:9px;font-size:13px;font-weight:700;cursor:pointer;'+(on?'background:var(--paper);color:var(--ink-900);box-shadow:var(--shadow-sm)':'background:none;color:var(--ink-500)');
      return {
        umTabList:umTab==='list', umTabPerms:umTab==='perms',
        umSegListStyle:seg(umTab==='list'), umSegPermStyle:seg(umTab==='perms'),
        umGoList:()=>this.setState({ umTab:'list' }), umGoPerm:()=>this.setState({ umTab:'perms' }),
        umIsList:umTab==='list',
        ...this.permissionsData(rk),
        umRows:this.state.users.map(u=>{
          const open=this.allTasks().filter(t=>t.assignee===u.name&&!['Approved','Closed'].includes(t.status));
          const assigned=open.reduce((s,t)=>s+(parseFloat(t.estH)||0),0);
          const wk=this.weeklyCapacity(u.name)||40;
          const util=wk?Math.round(assigned/wk*100):0;
          const free=Math.round((wk-assigned)*10)/10;
          return {
            emp:empOf(u.name), name:u.name, sub:u.sub, dept:u.dept, role:u.role,
            hasBrands:true, brandsLabel:(u.brands||[]).join(', ')||'None',
            initials:u.name.split(' ').map(x=>x[0]).join('').slice(0,2),
            avatarUrl:u.avatar_url||'', hasAvatar:!!u.avatar_url,
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
            actionLabel:this.hasPerm('users','edit')?'Manage':'View',
            actionStyle:'display:inline-flex;align-items:center;gap:5px;padding:6px 12px;border-radius:9px;font-size:11.5px;font-weight:700;cursor:pointer;'+(this.hasPerm('users','edit')
              ?'border:none;background:#7A1C46;color:#fff':'border:1px solid var(--line-300);background:var(--paper);color:var(--ink-700)'),
            open:()=>this.setState({ umOpen:u.name, umEdit:false }),
            suspendLabel:u.status==='Suspended'?'Reactivate':'Suspend',
            suspend:(e)=>{ if(e)e.stopPropagation();
              if(!this.hasPerm('users','edit')){ this.flash('You do not have permission to suspend or reactivate users.'); return; }
              const newStatus=u.status==='Suspended'?'Active':'Suspended';
              const users=(this.state.users||[]).map(x=>x.name===u.name?{...x,status:newStatus,statusTone:newStatus==='Suspended'?'warn':'ok'}:x);
              this.setState({ users }); this.flash(u.name+(u.status==='Suspended'?' reactivated.':' suspended — login blocked, records retained.'));
              if(u.id) supabase.from('profiles').update({ status:newStatus }).eq('id', u.id).then(({error})=>{
                if(error) console.warn('[supabase] suspend/reactivate failed:', error.message);
              }); },
            canSuspend:this.hasPerm('users','edit'),
            canDelete:this.hasPerm('users','delete'),
            delete:(e)=>{ if(e)e.stopPropagation();
              if(!this.hasPerm('users','delete')){ this.flash('You do not have permission to delete users.'); return; }
              this.confirmDelete('Delete User?', 'Are you sure you want to delete "'+u.name+'"? This action cannot be undone.', ()=>{
                this.setState({ users:(this.state.users||[]).filter(x=>x.name!==u.name) });
                this.flash(u.name+' removed from the platform.');
                if(u.id) supabase.from('profiles').delete().eq('id', u.id).then(({error})=>{
                  if(error) console.warn('[supabase] user delete failed:', error.message);
                });
              }); } };
        }),
        umStats:(()=>{ const rows=this.state.users.map(u=>{
            const open=this.allTasks().filter(t=>t.assignee===u.name&&!['Approved','Closed'].includes(t.status));
            const wk=this.weeklyCapacity(u.name)||40;
            return wk?Math.round(open.reduce((s,t)=>s+(parseFloat(t.estH)||0),0)/wk*100):0; });
          const K=(label,value,sub,color)=>({label,value,sub,color});
          return [K('Users',String(this.state.users.length),'on the platform','var(--ink-900)'),
            K('Active',String(this.state.users.filter(u=>u.status==='Active').length),'can sign in','var(--verify-600)'),
            K('Overloaded',String(rows.filter(x=>x>100).length),'beyond shift capacity','var(--danger-600)'),
            K('Underloaded',String(rows.filter(x=>x<40).length),'below 40% of capacity','var(--info-600)'),
            K('Total capacity',this.state.users.reduce((s,u)=>s+(this.weeklyCapacity(u.name)||0),0)+' h','per week','var(--orchid-600)')]; })(),
        ...this.userDetailData(rk),
      };
    }
    const scoped = (rows)=> (rk==='junior') ? rows.slice(0,2) : (rk==='senior'? rows.slice(0,3) : rows);
    const viewer = ()=>this.flash('View only — your role can’t change this.');

    const statusTone=(s)=>({'On track':'ok','Live':'ok','In progress':'info','Scheduled':'info','Planned':'info','At risk':'warn','Draft':'draft'}[s]||'info');
    const editAction=(kind,row)=>()=>this.setState({ showRecordModal:true, recordKind:kind, recordEditKey:row.key, recordIsReal:row.isReal,
      recordForm:{ name:row.name, type:row.type==='—'?'':row.type, owner:row.owner==='—'?'':row.owner, status:row.status } });
    // A custom repository has been opened from the Repositories list — show
    // its records (reuses the same Supabase-backed records CRUD originally
    // built for Projects/Campaigns, generalized to any repository key).
    if(this.state.repoDetailKey){
      const key = this.state.repoDetailKey;
      const rows = scoped(this.recordsFor(key));
      return {
        tableCols:['Name','Type','Owner','Status','Actions'],
        tableRows: rows.map(row=>({c0:row.name, c0sub:'', c1:row.type, ...tag(row.status,statusTone(row.status)), c3:row.owner,
          ...act(canEdit?'Edit':'View', canEdit?editAction(key,row):viewer, canEdit)})),
        tableBackLabel:'Back to Repositories',
        tableBackAction:()=>this.setState({ repoDetailKey:null }),
        tableAddLabel: canEdit ? ('+ Add '+this._recordLabel(key).toLowerCase()) : '',
        tableAddAction:()=>this.setState({ showRecordModal:true, recordKind:key, recordEditKey:null, recordIsReal:true,
          recordForm:{ name:'', type:'', owner:'', status:'Draft' } }),
      };
    }
    // repositories are real records with live counts, and Admin can create new ones
    return this.repositoriesView(rk, canEdit);
  }
  // Single source of truth for every file uploaded anywhere in the app —
  // threads, tasks, tickets and compliance evidence. Used both by the
  // Document Repository page itself (filesView()) and by the "Attach files"
  // picker (filePickerData()), so a file always shows up in both places or
  // neither — never one but not the other.
  repoFileList(){
    const out=[]; const seen={};
    const add=(name,source,by,where,task)=>{ const k=name+'|'+source+'|'+where; if(seen[k]) return; seen[k]=1;
      out.push({ name, source, by, where, task }); };
    this.myThreads().forEach(th=>th.msgs.forEach(m=>(m.files||[]).forEach(n=>add(n,'Message attachment',m.who,th.name,
      { id:th.name, name:'“'+String(m.text).slice(0,48)+'”', status:'Shared', start:String(m.when).split(' · ')[0], end:'—', assignee:m.who }))));
    this.allTasks().forEach(t=>{ const ov=this.tkOv?this.tkOv(t):t;
      (ov.evidence||t.evidence||[]).forEach(n=>add(n,'Task evidence',t.assignee,t.id,t));
      (ov.comments||t.comments||[]).forEach(c=>(c.files||[]).forEach(n=>{ if(String(n).indexOf('http')===0) return;
        add(n,(c.role||'').indexOf('QC')>=0?'QC reference':'Comment attachment',c.who,t.id,t); })); });
    this.allTickets().forEach(t=>(t.files||[]).forEach(n=>add(n,'Support ticket',t.by,t.id,
      { id:t.id, name:t.subject||t.id, status:t.status||'Open', start:t.created||'—', end:'—', assignee:t.assignee||'—', isTicket:true })));
    Object.entries(this.state.clFill||{}).forEach(([tid,rows])=>{ const t=this.allTasks().find(x=>x.id===tid);
      Object.values(rows||{}).forEach(r=>(r.files||[]).forEach(n=>add(n,'Compliance evidence','—',tid,
        t||{ id:tid, name:'Compliance — '+tid, status:'—', start:'—', end:'—', assignee:'—' }))); });
    return out;
  }
  // One real file picker used by every "Attach" point in the app: Browse lists
  // files that actually exist in the Document Repository (reuse + traceability
  // across messages/tasks/tickets/compliance), Upload records a named file with
  // a type. Replaces the various buttons that previously fabricated a fake name.
  fileKind(n){ const e=String(n).split('.').pop().toLowerCase();
    if(['png','jpg','jpeg','gif','webp','svg','avif','bmp','ico'].includes(e)) return {t:'Image',icon:'image',color:'var(--orchid-600)',bg:'var(--orchid-100)'};
    if(['mp4','mov','webm'].includes(e)) return {t:'Video',icon:'video',color:'var(--info-600)',bg:'var(--info-100)'};
    if(e==='pdf') return {t:'PDF',icon:'file-text',color:'var(--danger-600)',bg:'var(--danger-100)'};
    if(['xlsx','csv','xls'].includes(e)) return {t:'Spreadsheet',icon:'table',color:'var(--verify-600)',bg:'var(--verify-100)'};
    if(['docx','doc','txt','md'].includes(e)) return {t:'Document',icon:'file-text',color:'var(--ink-500)',bg:'var(--surface-50)'};
    return {t:'Document',icon:'file',color:'var(--ink-500)',bg:'var(--surface-50)'}; }
  fpFinalName(){
    const ext={PDF:'.pdf',Image:'.png',Spreadsheet:'.xlsx',Document:'.docx',Video:'.mp4'}[this.state.fpKind||'PDF'];
    const raw=(this.state.fpName||'file').trim();
    const stem=raw.replace(/\.[a-z0-9]+$/i,'').replace(/\s+/g,'-').replace(/[^A-Za-z0-9._-]/g,'').toLowerCase();
    return (stem||'file')+ext;
  }
  openFilePicker(target, title){ this.setState({ fpTarget:target, fpTitle:title||'Attach files',
    fpTab:'browse', fpSel:[], fpQuery:'', fpType:'All', fpName:'', fpKind:'PDF' }); }
  applyPickedFiles(target, names){
    if(!names.length) return;
    const t=String(target||'');
    if(t==='msg') this.setState({ msgFiles:[...(this.state.msgFiles||[]), ...names] });
    else if(t==='chatwidget') this.setState({ chatWidgetFiles:[...(this.state.chatWidgetFiles||[]), ...names] });
    else if(t==='ticket'){ const f=this.state.tktForm||{}; this.setState({ tktForm:{...f, files:[...(f.files||[]), ...names]} }); }
    else if(t==='ticketReply') this.setState({ tktReplyFiles:[...(this.state.tktReplyFiles||[]), ...names] });
    else if(t==='comment') this.setState({ tkCommentFiles:[...(this.state.tkCommentFiles||[]), ...names] });
    else if(t==='checkin'){ const cf=this.state.ciForm||{}; this.setState({ ciForm:{...cf, files:[...(cf.files||[]), ...names]} }); }
    else if(t.indexOf('qcref:')===0){ const id=t.slice(6); const refs={...(this.state.qcRef||{})};
      const cur=refs[id]||{files:[],url:''}; refs[id]={...cur, files:[...(cur.files||[]), ...names]}; this.setState({ qcRef:refs }); }
    else if(t.indexOf('evidence:')===0){ const id=t.slice(9); const task=this.allTasks().find(x=>x.id===id);
      const base=task?(task.evidence||[]):[]; this.tkPatch(id,{evidence:[...base, ...names]},'Attached evidence'); }
    else if(t.indexOf('compliance:')===0){ const p=t.split(':'); const id=p[1], key=p[2];
      const cur={...(this.state.clFill||{})}; const row=((cur[id]||{})[key])||{};
      cur[id]={...(cur[id]||{}),[key]:{...row, files:[...(row.files||[]), ...names]}};
      this.setState({ clFill:cur });
      this._persistCompliance(id, cur[id], (this.state.clQc||{})[id]||{}, !!(this.state.clSubmitted||{})[id]); }
    else if(t.indexOf('idea:')===0){ const kind=t.slice(5); const f=this.state.ideaForm||{};
      const atts=(f.attachments||[]).concat(names.map(n=>({ kind, name:n, category:kind==='Image'?'Image':'Reference', desc:'' })));
      this.setState({ ideaForm:{...f, attachments:atts} }); }
    this.flash(names.length+' file'+(names.length===1?'':'s')+' attached.');
  }
  filePickerData(){
    const target=this.state.fpTarget; if(!target) return { fpOpen:false };
    const q=(this.state.fpQuery||'').toLowerCase();
    const type=this.state.fpType||'All';
    const sel=this.state.fpSel||[];
    const all=this.repoFileList();
    const list=all.filter(f=>{ const k=this.fileKind(f.name);
      return (type==='All'||k.t===type) && (!q || (f.name+' '+f.source+' '+f.by+' '+f.where).toLowerCase().indexOf(q)>=0); });
    const tab=this.state.fpTab||'browse';
    const seg=(on)=>'display:flex;align-items:center;gap:6px;padding:8px 14px;border:none;border-radius:9px;font-size:12.5px;font-weight:700;cursor:pointer;'+(on?'background:var(--paper);color:var(--ink-900);box-shadow:var(--shadow-sm)':'background:none;color:var(--ink-500)');
    return {
      fpOpen:true, fpTitle:this.state.fpTitle||'Attach files',
      fpIsBrowse:tab==='browse', fpIsUpload:tab==='upload',
      fpBrowseStyle:seg(tab==='browse'), fpUploadStyle:seg(tab==='upload'),
      fpGoBrowse:()=>this.setState({ fpTab:'browse' }), fpGoUpload:()=>this.setState({ fpTab:'upload' }),
      fpClose:()=>this.setState({ fpTarget:null, fpSel:[] }),
      fpStop:(e)=>e.stopPropagation(),
      fpQuery:this.state.fpQuery||'', fpSetQuery:(e)=>this.setState({ fpQuery:e.target.value }),
      fpTypeVal:type, fpSetType:(e)=>this.setState({ fpType:e.target.value }),
      fpTypeOptions:['All','Image','Video','PDF','Spreadsheet','Document'],
      fpRows:list.map(f=>{ const k=this.fileKind(f.name); const on=sel.includes(f.name);
        return { name:f.name, source:f.source, by:f.by, where:f.where, kind:k.t, icon:k.icon, iconBg:k.bg, iconColor:k.color, on,
          rowStyle:'display:flex;align-items:center;gap:11px;padding:10px 13px;border:1px solid '+(on?'var(--orchid-400)':'var(--line-200)')+';background:'+(on?'var(--orchid-100)':'var(--paper)')+';border-radius:11px;cursor:pointer;text-align:left;width:100%',
          toggle:()=>this.setState({ fpSel:on?sel.filter(x=>x!==f.name):[...sel,f.name] }) }; }),
      fpEmpty:list.length===0,
      fpEmptyNote:all.length?'No files match this search.':'The repository is empty — upload a new file instead.',
      fpCount:sel.length?(sel.length+' selected'):'Nothing selected',
      fpCanAttach:sel.length>0,
      fpAttach:()=>{ const names=sel.slice(); this.setState({ fpTarget:null, fpSel:[] }); this.applyPickedFiles(target, names); },
      fpName:this.state.fpName||'', fpSetName:(e)=>this.setState({ fpName:e.target.value }),
      fpKindVal:this.state.fpKind||'PDF', fpSetKind:(e)=>this.setState({ fpKind:e.target.value }),
      fpKindOptions:['PDF','Image','Spreadsheet','Document','Video'],
      fpExtNote:'Saved as '+this.fpFinalName(),
      fpUpload:()=>{ if(!(this.state.fpName||'').trim()){ this.flash('Name the file you are uploading.'); return; }
        const name=this.fpFinalName();
        this.setState({ fpTarget:null, fpSel:[], fpName:'' });
        this.applyPickedFiles(target, [name]); },
      // Opens the device's native file explorer (real <input type=file>); the
      // chosen file(s) are attached immediately using their real filenames.
      // Content is read into fileBlobs for immediate use, then persisted to
      // Supabase (file_blobs) so this exact attachment previews/downloads
      // for every user, in any session, not just this one browser tab.
      fpFilesPicked:(e)=>{
        const MAX_BYTES=1024*1024;
        const picked=Array.from(e.target.files||[]);
        e.target.value='';
        if(!picked.length) return;
        const oversized=picked.filter(f=>f.size>MAX_BYTES);
        const files=picked.filter(f=>f.size<=MAX_BYTES);
        if(oversized.length) this.flash(oversized.map(f=>f.name).join(', ')+' — over the 1 MB attachment limit. Not uploaded.');
        if(!files.length) return;
        const names=files.map(f=>f.name);
        this.setState({ fpTarget:null, fpSel:[], fpName:'' });
        this.applyPickedFiles(target, names);
        const prog={...(this.state.fpUploading||{})};
        names.forEach(n=>{ prog[n]={ pct:0, phase:'reading' }; });
        this.setState({ fpUploading:prog });
        files.forEach(file=>{
          const reader=new FileReader();
          // lengthComputable read progress is real for the base64-encode
          // step; the network upsert after it has no byte-level progress API
          // from supabase-js, so that phase shows as an indeterminate
          // "Saving…" state instead of a fabricated percentage.
          reader.onprogress=(ev)=>{
            if(!ev.lengthComputable) return;
            const pct=Math.round(ev.loaded/ev.total*100);
            this.setState(s=>({ fpUploading:{...(s.fpUploading||{}), [file.name]:{ pct, phase:'reading' }} }));
          };
          reader.onload=()=>{
            this.setState(s=>({
              fileBlobs:{...(s.fileBlobs||{}), [file.name]:{ dataUrl:reader.result, type:file.type, size:file.size } },
              fpUploading:{...(s.fpUploading||{}), [file.name]:{ pct:100, phase:'saving' }},
            }));
            supabase.from('file_blobs').upsert({
              name:file.name, data_url:reader.result, mime:file.type, size:file.size,
              created_by:this.state.authUser?this.state.authUser.id:null,
            }).then(({error})=>{
              if(error) console.warn('[supabase] file blob save failed:', error.message);
              this.setState(s=>({ fpUploading:{...(s.fpUploading||{}), [file.name]:{ pct:100, phase:error?'error':'done' }} }));
              setTimeout(()=>{
                this.setState(s=>{ const p={...(s.fpUploading||{})}; delete p[file.name]; return { fpUploading:p }; });
              }, 2200);
            });
          };
          reader.readAsDataURL(file);
        });
      },
    };
  }
  uploadTrayData(){
    const rows=Object.entries(this.state.fpUploading||{}).map(([name,info])=>({
      name, pct:info.pct||0,
      label: info.phase==='reading'?('Reading '+(info.pct||0)+'%')
        : info.phase==='saving'?'Saving to database…'
        : info.phase==='error'?'Failed to save — check connection and retry'
        : 'Saved',
      barColor: info.phase==='error'?'var(--danger-500)':(info.phase==='done'?'var(--verify-500)':'var(--orchid-500)'),
      barPct: (info.phase==='reading')?(info.pct||0):100,
      done: info.phase==='done', error: info.phase==='error',
    }));
    return { utRows:rows, utHasRows:rows.length>0 };
  }
  openFilePreview(name){ this.setState({ fpvFile:name }); }
  // Quick-download from a chip/row without opening the modal first — falls
  // back to the preview modal's "no content stored" explainer for
  // legacy name-only attachments that never had a real device file picked.
  downloadFile(name){
    const blob=(this.state.fileBlobs||{})[name];
    if(!blob){ this.openFilePreview(name); return; }
    const a=document.createElement('a');
    a.href=blob.dataUrl; a.download=name;
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
  }
  // Generic file-download used by every "Export" action across the app —
  // real data tables/calendars, not the mock "(demo)" toasts they used to be.
  _downloadTextFile(filename, content, mime){
    const blob=new Blob([content], { type: mime||'text/plain' });
    const url=URL.createObjectURL(blob);
    const a=document.createElement('a');
    a.href=url; a.download=filename;
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
  _todayIso(){ return new Date().toISOString().slice(0,10); }
  _csvCell(v){
    const s=(v===null||v===undefined)?'':String(v);
    return /[",\r\n]/.test(s) ? '"'+s.replace(/"/g,'""')+'"' : s;
  }
  // rows: array of arrays, values in the same order as headers.
  exportCsv(filename, headers, rows){
    const lines=[headers.map(h=>this._csvCell(h)).join(',')]
      .concat(rows.map(r=>r.map(v=>this._csvCell(v)).join(',')));
    this._downloadTextFile(filename, lines.join('\r\n'), 'text/csv;charset=utf-8;');
    this.flash('Exported '+rows.length+' row'+(rows.length===1?'':'s')+' to '+filename+'.');
  }
  _icsEscape(s){ return String(s||'').replace(/\\/g,'\\\\').replace(/;/g,'\\;').replace(/,/g,'\\,').replace(/\n/g,'\\n'); }
  _icsDate(iso){ return String(iso||'').replace(/-/g,''); }
  _icsDateAdd1(iso){ const d=new Date(iso+'T00:00:00'); d.setDate(d.getDate()+1);
    return d.getFullYear()+String(d.getMonth()+1).padStart(2,'0')+String(d.getDate()).padStart(2,'0'); }
  // events: array of { id, name, startIso, endIso, assignee, status }.
  exportIcs(filename, events){
    const stamp=new Date().toISOString().replace(/[-:]/g,'').split('.')[0]+'Z';
    const lines=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Beetloop//Content Calendar//EN','CALSCALE:GREGORIAN'];
    events.forEach(ev=>{
      lines.push('BEGIN:VEVENT');
      lines.push('UID:'+ev.id+'@beetloop');
      lines.push('DTSTAMP:'+stamp);
      lines.push('DTSTART;VALUE=DATE:'+this._icsDate(ev.startIso));
      lines.push('DTEND;VALUE=DATE:'+this._icsDateAdd1(ev.endIso));
      lines.push('SUMMARY:'+this._icsEscape(ev.id+' — '+ev.name));
      lines.push('DESCRIPTION:'+this._icsEscape('Assignee: '+(ev.assignee||'—')+' · Status: '+(ev.status||'—')));
      lines.push('END:VEVENT');
    });
    lines.push('END:VCALENDAR');
    this._downloadTextFile(filename, lines.join('\r\n'), 'text/calendar;charset=utf-8;');
    this.flash('Calendar feed downloaded — '+events.length+' task'+(events.length===1?'':'s')+' exported as '+filename+'.');
  }
  filePreviewData(){
    const name=this.state.fpvFile; if(!name) return { fpvOpen:false };
    const blob=(this.state.fileBlobs||{})[name];
    const k=this.fileKind(name);
    const ext=String(name).split('.').pop().toLowerCase();
    const isSheet=!!blob && k.t==='Spreadsheet';
    const isDocx=!!blob && ext==='docx';
    const isText=!!blob && ['txt','md'].includes(ext);
    return {
      fpvOpen:true, fpvName:name, fpvKind:k.t, fpvIcon:k.icon, fpvIconBg:k.bg, fpvIconColor:k.color,
      fpvHasContent:!!blob,
      fpvIsImage:!!blob && k.t==='Image',
      fpvIsPdf:!!blob && k.t==='PDF',
      fpvIsSheet:isSheet, fpvIsDocx:isDocx, fpvIsText:isText,
      fpvIsOther:!!blob && k.t!=='Image' && k.t!=='PDF' && !isSheet && !isDocx && !isText,
      fpvDataUrl:blob?blob.dataUrl:'',
      fpvSize:blob?(blob.size>1048576?(Math.round(blob.size/104857.6)/10+' MB'):(Math.round(blob.size/102.4)/10+' KB')):'',
      fpvClose:()=>this.setState({ fpvFile:null }),
      fpvStop:(e)=>e.stopPropagation(),
      fpvGoRepo:()=>this.setState({ fpvFile:null, route:'files', flQuery:name }),
    };
  }
  REPO_REGISTRY(){
    const count=(n)=>n.toLocaleString('en-IN');
    const upd=this.state.repoUpd||{};
    const hidden=this.state.repoHiddenBuiltin||[];
    const built=[
      { key:'ideas', name:'Content Ideas', desc:'Quarterly content ideas from the writers — QC-approved ideas convert to tasks.',
        cat:'Content', icon:'lightbulb', owner:'Platform',
        n:this.allIdeas().length, unit:'ideas', go:()=>this.setState({ route:'ideas' }) },
      { key:'content', name:'Website Content', desc:'Every service page, insight and article with its SEO, links and media.',
        cat:'Content', icon:'folder-tree', owner:'Platform',
        n:this.allContentPages().length, unit:'pages', go:()=>this.setState({ route:'content' }) },
      { key:'backlink', name:'Backlink Domains', desc:'Approved backlink sources with authority, spam score and platform rules.',
        cat:'SEO', icon:'link', owner:'Platform',
        n:this.BACKLINK_DOMAINS().length, unit:'domains', go:()=>this.setState({ route:'masters', masterKey:'backlink' }) },
      { key:'files', name:'Documents & Assets', desc:'Every file uploaded across tasks, QC, messages and compliance evidence.',
        cat:'Assets', icon:'folder-open', owner:'Platform',
        n:this.repoFileList().length, unit:'files', go:()=>this.setState({ route:'files' }) },
      { key:'templates', name:'Templates', desc:'Reusable task, KPI and OKR templates that seed new work.',
        cat:'Performance', icon:'layout-template', owner:'Platform',
        n:(this.TASK_TEMPLATES?this.TASK_TEMPLATES().length:0)+(this.KPI_TEMPLATES?this.KPI_TEMPLATES().length:0),
        unit:'templates', go:()=>this.setState({ route:'templates' }) },
    ]
      // A built-in repo's name/desc/category/owner can be edited (repoUpd
      // overlay, same seed+overlay pattern used everywhere else in this
      // app) without touching the hardcoded entry itself — the record
      // count and its "go" navigation stay wired to the real module either
      // way, since "editing" one of these is relabelling it, not replacing
      // the module it points to.
      .filter(r=>!hidden.includes(r.key))
      .map(r=>upd[r.key] ? {...r, ...upd[r.key]} : r);
    const custom=(this.state.repoAdded||[]).map(r=>({ ...r, n:this.recordsFor(r.key).length, unit:'items', custom:true,
      go:()=>this.setState({ repoDetailKey:r.key }) }));
    return custom.concat(built).map(r=>({ ...r, items:count(r.n)+' '+r.unit }));
  }
  repoDeleteCustom(key){
    if(!this.hasPerm('repositories','delete')){ this.flash('You do not have permission to delete repositories.'); return; }
    const repo=(this.state.repoAdded||[]).find(r=>r.key===key);
    if(!repo) return;
    this.setState({ repoAdded:(this.state.repoAdded||[]).filter(r=>r.key!==key),
      repoDetailKey: this.state.repoDetailKey===key ? null : this.state.repoDetailKey });
    this.flash('"'+repo.name+'" repository deleted.');
    supabase.from('document_repo').delete().eq('id', key).then(({error})=>{
      if(error) console.warn('[supabase] document repo delete failed:', error.message);
    });
  }
  REPO_BUILTIN_KEYS(){ return ['ideas','content','backlink','files','templates']; }
  // Removing a built-in repo only hides it from this list — it's a
  // navigation/labelling entry, not the module itself (Tasks, Content
  // Repository etc. keep working and stay reachable through their own nav
  // item either way), so there's nothing destructive to actually delete.
  repoDeleteBuiltin(key){
    if(!this.hasPerm('repositories','delete')){ this.flash('You do not have permission to delete repositories.'); return; }
    const repo=this.REPO_REGISTRY().find(r=>r.key===key);
    if(!repo) return;
    const hidden=[...(this.state.repoHiddenBuiltin||[]), key];
    this.setState({ repoHiddenBuiltin:hidden });
    this.flash('"'+repo.name+'" removed from this list.');
    supabase.from('document_repo').upsert({ id:'builtin:'+key, payload:{ hidden:true }, created_by:this.state.authUser?this.state.authUser.id:null }).then(({error})=>{
      if(error) console.warn('[supabase] built-in repo hide failed:', error.message);
    });
  }
  repoDeleteAny(key){
    if(this.REPO_BUILTIN_KEYS().includes(key)) this.repoDeleteBuiltin(key);
    else this.repoDeleteCustom(key);
  }
  // Generic label for the create/edit-record modal — 'Project'/'Campaign' for
  // the two original demo kinds, the repository's own name for a custom
  // repository, 'Record' as a safe fallback for anything else.
  _recordLabel(kind){
    if(kind==='campaigns') return 'Campaign';
    if(kind==='projects') return 'Project';
    const repo=(this.state.repoAdded||[]).find(r=>r.key===kind);
    return repo ? repo.name.replace(/s$/,'') : 'Record';
  }
  repositoriesView(rk, canEdit){
    const canCreate=this.hasPerm('repositories','create');
    const canDelete=this.hasPerm('repositories','delete');
    const list=this.REPO_REGISTRY();
    const tag=(t)=>({tag:t,tagBg:'var(--info-100)',tagColor:'var(--info-600)'});
    const f=this.state.repoForm||{};
    const setR=(k)=>(e)=>this.setState({ repoForm:{...f,[k]:e.target.value} });
    return {
      tableCols:['Repository','Owner','Category','Items','Actions'],
      tableRows:list.map(r=>({
        c0:r.name, c0sub:r.desc, c1:r.owner, ...tag(r.cat), c3:r.items,
        actionLabel:['junior','senior'].includes(rk)?'Open':(canEdit?'Manage':'View'),
        action:r.go,
        actionStyle:'padding:6px 13px;border-radius:9px;font-size:12.5px;font-weight:700;cursor:pointer;'+(canEdit
          ?'border:none;background:#7A1C46;color:#fff':'border:1px solid var(--line-300);background:var(--paper);color:var(--ink-700)'),
        // Every repo can be relabelled/removed from this list now — a
        // built-in one (Content Ideas, Website Content, …) isn't a plain
        // record, so "delete" here only hides the list entry (see
        // repoDeleteBuiltin); the module it points to keeps working and
        // stays reachable from its own nav item.
        canDelete: canDelete,
        delete: ()=>this.confirmDelete('Delete Repository?', r.custom
          ? 'Are you sure you want to delete "'+r.name+'"? This action cannot be undone.'
          : '"'+r.name+'" is a built-in module (still reachable from its own nav item) — this only removes it from the Repositories list. Continue?',
          ()=>this.repoDeleteAny(r.key)),
        canEdit: canCreate,
        edit: ()=>this.repoOpenEdit(r.key),
      })),
      repoCanCreate:canCreate,
      repoFormOpen:!!this.state.repoNew,
      repoIsEdit:!!this.state.repoEditKey,
      repoFormTitle:this.state.repoEditKey?'Edit repository':'New repository',
      repoSaveLabel:this.state.repoEditKey?'Save changes':'Create repository',
      repoClose:()=>this.setState({ repoNew:false, repoEditKey:null, repoForm:{} }),
      repoStop:(e)=>e.stopPropagation(),
      rf:f, repoSetName:setR('name'), repoSetDesc:setR('desc'), repoSetCat:setR('cat'), repoSetOwner:setR('owner'),
      repoCatOptions:['Content','SEO','Assets','Promotions','Performance','Quality','Research'],
      repoOwnerOptions:(this.state.users||[]).map(u=>u.name),
      repoSave:()=>{
        const editKey=this.state.repoEditKey;
        if(!this.hasPerm('repositories', editKey?'edit':'create')){ this.flash('You do not have permission to '+(editKey?'edit':'create')+' repositories.'); return; }
        if(!(f.name&&f.name.trim())){ this.flash('Name the repository.'); return; }
        if(editKey && this.REPO_BUILTIN_KEYS().includes(editKey)){
          // Built-in repos aren't records in repoAdded — relabelling one
          // is an overlay on the hardcoded entry (repoUpd), same
          // seed+overlay shape as everything else in this app, so the
          // module it actually points to (Tasks, Content Repository, …)
          // is completely untouched.
          const patch={ name:f.name.trim(), desc:f.desc||'', cat:f.cat||'Content', owner:f.owner||'Platform' };
          const upd={...(this.state.repoUpd||{}), [editKey]:patch};
          this.setState({ repoUpd:upd, repoNew:false, repoEditKey:null, repoForm:{} });
          this.flash('“'+patch.name+'” updated.');
          supabase.from('document_repo').upsert({ id:'builtin:'+editKey, payload:patch, created_by:this.state.authUser?this.state.authUser.id:null }).then(({error})=>{
            if(error) console.warn('[supabase] built-in repo relabel failed:', error.message);
          });
          return;
        }
        if(editKey){
          const updated={ key:editKey, name:f.name.trim(), desc:f.desc||'Custom repository.', cat:f.cat||'Content', icon:'database', owner:f.owner||this.currentPerson() };
          this.setState({ repoAdded:(this.state.repoAdded||[]).map(r=>r.key===editKey?updated:r), repoNew:false, repoEditKey:null, repoForm:{} });
          this.flash('“'+updated.name+'” updated.');
          supabase.from('document_repo').update({ payload:updated }).eq('id', editKey).then(({error})=>{
            if(error) console.warn('[supabase] document repo update failed:', error.message);
          });
          return;
        }
        const rec={ key:'r'+Date.now(), name:f.name.trim(), desc:f.desc||'Custom repository.',
          cat:f.cat||'Content', icon:'database', owner:f.owner||this.currentPerson() };
        this.setState({ repoAdded:[rec,...(this.state.repoAdded||[])], repoNew:false, repoForm:{} });
        this.flash('“'+rec.name+'” created under '+rec.cat+' — owned by '+rec.owner+'.');
        supabase.from('document_repo').insert({ id:rec.key, payload:rec, created_by:this.state.authUser?this.state.authUser.id:null }).then(({error})=>{
          if(error) console.warn('[supabase] document repo insert failed:', error.message);
        });
      },
    };
  }
  repoOpenEdit(key){
    if(!this.hasPerm('repositories','edit')){ this.flash('You do not have permission to edit repositories.'); return; }
    const repo=this.REPO_REGISTRY().find(r=>r.key===key); if(!repo) return;
    this.setState({ repoNew:true, repoEditKey:key, repoForm:{ name:repo.name, desc:repo.desc, cat:repo.cat, owner:repo.owner } });
  }

  uf(k,e){ this.setState({ uf:{...this.state.uf,[k]:e.target.value} }); }
  submitUser(){
    const f=this.state.uf;
    if(!f.first.trim()||!f.email.trim()){ this.flash('First name and email are required.'); return; }
    if(/@/.test(f.first)||/@/.test(f.last||'')){ this.flash('The name fields shouldn’t contain an email address — check First/Last name and put the address in "Official email" instead.'); return; }
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim())){ this.flash('Enter a valid email address.'); return; }
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
    const u={ name, email:f.email.trim(), sub:(f.designation||f.role)+' · '+f.dept, role:f.role, roleKey, dept:f.dept, designation:f.designation||'',
      status:'Pending Invitation', statusTone:'warn',
      shiftStart:f.shiftStart||'09:00', shiftEnd:f.shiftEnd||'18:00', breakMin:parseInt(f.breakMin,10)||60, days:parseFloat(f.days)||5,
      reportingManager:f.manager||'', teamLead:f.lead||'', brands:f.brands||[] };
    this.setState({ users:[u,...this.state.users], showUserModal:false, uf:{ first:'', last:'', email:'', mobile:'', dept:'SEO', designation:'', manager:'', lead:'', role:'Junior Executive', shiftStart:'09:00', shiftEnd:'18:00', breakMin:'60', days:'5', brands:[] } });
    try{
      const resp=await fetch('/api/invite-user', {
        method:'POST', headers:{ 'Content-Type':'application/json' },
        body:JSON.stringify({ email:f.email.trim(), fullName:name, roleKey, department:f.dept, designation:f.designation,
          brands:f.brands||[], reportingManager:f.manager||'', teamLead:f.lead||'' }),
      });
      const body=await resp.json();
      if(!resp.ok) throw new Error(body.error||'Invite failed');
      if(body.emailSent) this.flash('User created — activation link sent to '+f.email+'.');
      else this.flash('User created, but the invite email failed to send'+(body.mailError?(': '+body.mailError):'')+'. Use "Resend invite" once you\'ve confirmed mail delivery is set up.');
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
  // Global delete confirmation — every delete call site in the app routes
  // through this instead of deleting on the first click. The permission
  // check (hasPerm) still happens at the call site and again inside the
  // actual delete handler; this is a separate, additional UX safeguard,
  // not a substitute for it.
  confirmDelete(title, body, onConfirm, confirmLabel){
    this.setState({ showDeleteConfirm:true, deleteConfirmTitle:title, deleteConfirmBody:body,
      deleteConfirmLabel:confirmLabel||'Delete', deleteConfirmAction:onConfirm });
  }
  runDeleteConfirm(){
    const fn=this.state.deleteConfirmAction;
    this.setState({ showDeleteConfirm:false, deleteConfirmTitle:'', deleteConfirmBody:'', deleteConfirmAction:null });
    if(fn) fn();
  }
  cancelDeleteConfirm(){ this.setState({ showDeleteConfirm:false, deleteConfirmTitle:'', deleteConfirmBody:'', deleteConfirmAction:null }); }

  pwStrength(){
    const p=this.state.newPass; let s=0;
    if(p.length>=12)s++; if(/[a-z]/.test(p)&&/[A-Z]/.test(p))s++; if(/[0-9]/.test(p))s++; if(/[^A-Za-z0-9]/.test(p))s++;
    const on='var(--verify-500)', off='var(--line-300)';
    const c=n=> s>=n?on:off;
    const labels=['Enter a password','Weak','Fair','Good','Strong'];
    return { pw1:c(1),pw2:c(2),pw3:c(3),pw4:c(4), pwLabel:labels[s] };
  }
  // Fetches the invited/reset user's real email + role so the activation
  // screen can show who's actually activating instead of static placeholder
  // text — and tells whether this is a fresh invite (profile still "Pending
  // Invitation") or a password reset for an already-active account, so the
  // copy on screen matches what really happened.
  async _loadActivateInfo(user){
    const { data: profile } = await supabase.from('profiles').select('email, role_key, status').eq('id', user.id).single();
    const roleLabel = profile ? ((this.ROLES[profile.role_key]&&this.ROLES[profile.role_key].label) || profile.role_key) : '';
    this.setState({
      activateEmail: (profile&&profile.email) || user.email || '',
      activateRoleLabel: roleLabel,
      activateIsRecovery: !!(profile && profile.status!=='Pending Invitation'),
    });
  }
  async doActivate(){
    if(this.state.newPass.length<12){ this.flash('Password must be at least 12 characters.'); return; }
    if(this.state.newPass!==this.state.confirmPass){ this.flash('Passwords do not match.'); return; }
    this.setState({ authBusy:true });
    // A real invite/reset link (sent via Supabase Auth) signs the browser
    // into a temporary session automatically; activating just sets the real
    // password. If Supabase can't find a session, the link has already
    // expired or been used (a common cause: some email clients "pre-click"
    // links to scan them, burning the one-time token before the person
    // actually opens the mail) — that must be a hard error, never a fake
    // success, or the person is told they're activated while their password
    // was never actually changed and they can't sign in afterward.
    const { data: { session } } = await supabase.auth.getSession();
    if(!session || !session.user){
      this.setState({ authBusy:false });
      this.flash('This link has expired or was already used. Please request a new invite or password reset link and try again.');
      return;
    }
    const { error } = await supabase.auth.updateUser({ password:this.state.newPass });
    this.setState({ authBusy:false });
    if(error){ this.flash('Could not activate: '+error.message); return; }
    const { error: statusErr } = await supabase.from('profiles').update({ status:'Active' }).eq('id', session.user.id);
    if(statusErr) console.warn('[supabase] profile activation status update failed:', statusErr.message);
    await this._loadProfile(session.user);
    this.flash('Account activated. Welcome to Beetloop.');
  }
  async doLogin(){
    const em=this.state.email.trim().toLowerCase();
    const pw=this.state.password;
    this.setState({ authBusy:true, loginError:'' });
    const { data, error } = await supabase.auth.signInWithPassword({ email: em, password: pw });
    if(!error && data.user){
      await this._loadProfile(data.user);
      this._recordLoginSession();
      this.setState({ authBusy:false });
      return;
    }
    this.setState({ loginError: error ? error.message : 'Invalid credentials.', authBusy:false });
  }
  // Fire-and-forget — Admin's Active Sessions list depends on this, but a
  // failure here must never block or fail the actual sign-in.
  async _recordLoginSession(){
    try{
      const { data } = await supabase.auth.getSession();
      const token = data && data.session && data.session.access_token;
      if(!token) return;
      await fetch('/api/auth/record-session', { method:'POST', headers:{ 'Content-Type':'application/json', Authorization:'Bearer '+token } });
    }catch(e){ console.warn('[session] record failed:', e.message); }
  }

  async _loadProfile(user){
    const { data: profile, error } = await supabase.from('profiles').select('*').eq('id', user.id).single();
    // Tasks/OKRs must be loaded before the app becomes interactive: their
    // "next code" is computed from the local array's length (TSK-2061,
    // OKR-GEN-Q1-010, ...), so creating one before this load lands would
    // compute a code that already exists in the DB, silently fail the
    // insert on the unique `code` constraint, and vanish on next reload.
    // Every other _load*() below is fire-and-forget since nothing else
    // derives a uniqueness-critical value from it this early.
    await Promise.all([this._loadTasks(), this._loadOkrs()]);
    if(error || !profile){
      this.setState({ authUser:user, authProfile:null, screen:'app', roleKey:'junior', route:'dashboard', loginError:'' });
    } else {
      this.setState({
        authUser:user, authProfile:profile,
        screen:'app', roleKey:profile.role_key||'junior', route:'dashboard', loginError:'',
      });
    }
    this._loadTeam();
    this._loadRecords();
    this._loadSops();
    this._loadTickets();
    this._loadContentPages();
    this._loadCampaigns();
    this._loadLeads();
    this._loadContacts();
    this._loadThreads();
    this._loadTemplates();
    this._loadMasterRecords();
    this._loadRolePerms();
    this._loadIdeas();
    this._loadEffortPlans();
    this._loadCustomDivisions();
    this._loadDocumentRepo();
    this._requestNotificationPermission();
    this._loadCheckIns();
    this._loadKpiActuals();
    this._loadTaskDone();
    this._loadFileBlobs();
    this._loadPlaybookReads();
    this._loadBacklinkDomains();
    this._loadComplianceChecklists();
    await this._loadNotifications();
    this._subscribeRealtime();
    this._catchUpNotifications();
  }

  // Notifications used to live only in this.state.notifications, wiped by
  // every reload — this restores the signed-in user's own notification
  // history from Supabase before catch-up/realtime start appending to it.
  async _loadNotifications(){
    const uid=this.state.authUser?this.state.authUser.id:null;
    if(!uid) return;
    const { data, error } = await supabase.from('notifications').select('*').eq('user_id', uid).order('created_at', { ascending:false }).limit(30);
    if(error){ console.warn('[supabase] notifications load failed:', error.message); return; }
    this.setState({ notifications:(data||[]).map(r=>({ id:r.id, text:r.text, who:r.who, nav:r.nav, read:r.read, ts:new Date(r.created_at).getTime() })) });
  }

  // The realtime feed below only fires for changes that happen while a
  // session is already connected — someone assigned a task to you while you
  // were offline gets nothing from it. This runs once at login and surfaces
  // anything already sitting on your plate as notifications too, so logging
  // in itself catches you up instead of only live-going-forward changes.
  async _catchUpNotifications(){
    const person = this.currentPerson();
    const uid=this.state.authUser?this.state.authUser.id:null;
    if(!person||!uid) return;
    const { data, error } = await supabase.from('tasks').select('code,name,status')
      .eq('assignee_name', person).eq('status', 'Assigned');
    if(error || !data || !data.length) return;
    const entries = data.map(t=>({
      id:'catchup-task-'+t.code,
      text:'You have a task assigned: '+(t.name||t.code),
      who:person, ts:Date.now(),
      read:false,
      nav:{ route:'tasks', tkTab:'list', tkOpen:t.code },
    }));
    this.setState(s=>{
      const existingIds=new Set((s.notifications||[]).map(n=>n.id));
      const fresh=entries.filter(e=>!existingIds.has(e.id));
      return fresh.length?{ notifications:[...fresh, ...(s.notifications||[])].slice(0,30) }:null;
    });
    // insert (not upsert) — a catch-up entry that already exists from a
    // previous login must keep whatever read state the user gave it, not
    // get silently reset to unread every time they log back in.
    entries.forEach(e=>{
      supabase.from('notifications').insert({ id:e.id, user_id:uid, text:e.text, who:e.who, nav:e.nav, read:false }).then(({error})=>{
        if(error && error.code!=='23505') console.warn('[supabase] catch-up notification save failed:', error.message);
      });
    });
  }

  // Live notifications: pushes a toast-style entry whenever a task or OKR is
  // created/updated by anyone, so multi-user changes show up without a reload.
  // Live notifications — scoped to what's actually relevant to whoever is
  // logged in, not a global firehose of every change in the system:
  //   - your own tasks/OKRs/projects/profile → always notified, worded as "you"
  //   - things you manage (as reviewer, or via role-based edit access) → notified
  //   - everything else → silent for you, still refreshes the underlying data
  // Every task edit (timer start/stop, checklist tick, comment, evidence,
  // status change...) upserts the FULL row via _persistTaskPatch, so the
  // realtime UPDATE payload can't tell what actually changed just from the
  // new row — it always looked like a generic "status: X" update, which was
  // actively misleading for anything that isn't a status change (e.g.
  // starting a timer re-announced the unchanged status as if it were news).
  // Comparing against payload.old (needs REPLICA IDENTITY FULL — see
  // schema_v6.sql) lets this describe what genuinely changed instead.
  _describeTaskChange(oldT, newT){
    // Without REPLICA IDENTITY FULL (see schema_v6.sql), payload.old only
    // ever carries the primary key — not enough to diff — so fall back to
    // the old generic message rather than misreading a blank old.status as
    // "status changed" on every single edit.
    if(!oldT || oldT.status===undefined) return 'updated — status: '+newT.status;
    if(oldT.status!==newT.status) return 'status → '+newT.status;
    if(oldT.effort_actual!==newT.effort_actual) return 'time logged — '+(newT.effort_actual||0)+' h actual';
    if(JSON.stringify(oldT.checklist)!==JSON.stringify(newT.checklist)) return 'checklist updated';
    if(oldT.qc_feedback!==newT.qc_feedback) return 'QC feedback added';
    if(JSON.stringify(oldT.comments)!==JSON.stringify(newT.comments)) return 'new comment';
    if(JSON.stringify(oldT.evidence)!==JSON.stringify(newT.evidence)) return 'evidence attached';
    if(oldT.assignee_name!==newT.assignee_name) return 'reassigned to '+(newT.assignee_name||'Unassigned');
    if(oldT.rework_count!==newT.rework_count) return 'sent back for rework';
    return 'updated';
  }
  _subscribeRealtime(){
    if(this._realtimeChannel) return;
    const push=(text, nav)=>{
      const isMine=/^Your?\b/.test(text);
      const id='live-'+Date.now()+'-'+Math.random().toString(36).slice(2);
      const who=isMine?this.currentPerson():null;
      const entry={ id, text, who, ts:Date.now(), read:false, nav };
      this.setState(s=>({ notifications:[entry, ...(s.notifications||[])].slice(0,30) }));
      const uid=this.state.authUser?this.state.authUser.id:null;
      if(uid) supabase.from('notifications').insert({ id, user_id:uid, text, who, nav:nav||null, read:false }).then(({error})=>{
        if(error) console.warn('[supabase] notification save failed:', error.message);
      });
    };
    const me=()=>this.currentPerson();
    const myId=()=>this.state.authUser&&this.state.authUser.id;
    // Admin sees every notification regardless of module-specific management
    // rules below — always OR'd in, so it can never be narrowed by mistake.
    const isAdmin=()=>this.state.roleKey==='admin';
    const canManageTasks=()=>isAdmin()||['manager','team_lead','ceo'].includes(this.state.roleKey);
    const canManageOkrs=()=>isAdmin()||['manager','ceo'].includes(this.state.roleKey);
    const canManageUsers=()=>isAdmin()||['coo','ceo'].includes(this.state.roleKey);
    const canManageRecords=()=>isAdmin()||['manager','ceo'].includes(this.state.roleKey);
    const canManageCampaigns=()=>isAdmin()||['manager','ceo','coo'].includes(this.state.roleKey);
    const canManageTickets=()=>isAdmin()||['manager','team_lead'].includes(this.state.roleKey);

    this._realtimeChannel = supabase.channel('beetloop-changes')
      .on('postgres_changes', { event:'INSERT', schema:'public', table:'tasks' }, (payload)=>{
        const t=payload.new; const nav={ route:'tasks', tkTab:'list', tkOpen:t.code };
        if(t.assignee_name===me()) push('You were assigned a new task: '+(t.name||t.code), nav);
        else if(canManageTasks()) push('New task created: '+(t.name||t.code)+' — assigned to '+(t.assignee_name||'Unassigned'), nav);
        this._loadTasks();
      })
      .on('postgres_changes', { event:'UPDATE', schema:'public', table:'tasks' }, (payload)=>{
        const t=payload.new; const nav={ route:'tasks', tkTab:'list', tkOpen:t.code };
        const what=this._describeTaskChange(payload.old, t);
        if(t.assignee_name===me()) push('Your task '+t.code+' — '+what, nav);
        else if(t.reviewer_name===me()) push('Task '+t.code+' you\'re reviewing — '+what, nav);
        else if(canManageTasks()) push('Task '+t.code+' — '+what+' (assignee: '+(t.assignee_name||'Unassigned')+')', nav);
        this._loadTasks();
      })
      .on('postgres_changes', { event:'INSERT', schema:'public', table:'okrs' }, (payload)=>{
        const o=payload.new; const owner=o.key_results&&o.key_results[0]&&o.key_results[0].who;
        const nav={ route:'okr', okrOpen:'okr-'+o.id };
        if(owner===me()) push('You were set as owner on a new OKR: '+o.title, nav);
        else if(canManageOkrs()) push('New OKR created: '+o.title, nav);
        this._loadOkrs();
      })
      .on('postgres_changes', { event:'UPDATE', schema:'public', table:'okrs' }, (payload)=>{
        const o=payload.new; const owner=o.key_results&&o.key_results[0]&&o.key_results[0].who;
        const nav={ route:'okr', okrOpen:'okr-'+o.id };
        if(owner===me()) push('Your OKR '+o.code+' was updated — status: '+o.status, nav);
        else if(canManageOkrs()) push('OKR '+o.code+' updated — status: '+o.status, nav);
        this._loadOkrs();
      })
      // KPI/Task/OKR Templates and Master Data (incl. the Campaign Type /
      // Content Type master) drive dropdowns across Effort Planner, Task
      // creation and Campaigns — reload on any change so a KPI or Campaign
      // Type another session just created/edited shows up without a manual
      // refresh, the same live-refresh guarantee tasks/okrs/campaigns
      // already had.
      .on('postgres_changes', { event:'INSERT', schema:'public', table:'templates' }, ()=>{ this._loadTemplates(); })
      .on('postgres_changes', { event:'UPDATE', schema:'public', table:'templates' }, ()=>{ this._loadTemplates(); })
      .on('postgres_changes', { event:'INSERT', schema:'public', table:'master_records' }, ()=>{ this._loadMasterRecords(); })
      .on('postgres_changes', { event:'UPDATE', schema:'public', table:'master_records' }, ()=>{ this._loadMasterRecords(); })
      .on('postgres_changes', { event:'INSERT', schema:'public', table:'profiles' }, (payload)=>{
        if(canManageUsers()) push('New team member: '+(payload.new.full_name||payload.new.email), { route:'users', umOpen:payload.new.full_name });
        this._loadTeam();
      })
      .on('postgres_changes', { event:'UPDATE', schema:'public', table:'profiles' }, (payload)=>{
        const roleLabel=(this.ROLES[payload.new.role_key]&&this.ROLES[payload.new.role_key].label)||payload.new.role_key;
        const nav={ route:'users', umOpen:payload.new.full_name };
        if(payload.new.id===myId()) push('Your profile was updated — role: '+roleLabel+', status: '+payload.new.status, { route:'profile' });
        else if(canManageUsers()) push((payload.new.full_name||payload.new.email)+' updated — role: '+roleLabel+', status: '+payload.new.status, nav);
        this._loadTeam();
      })
      .on('postgres_changes', { event:'INSERT', schema:'public', table:'records' }, (payload)=>{
        const r=payload.new; const nav={ route: r.kind==='campaigns'?'campaigns':'masters' };
        if(r.owner===me()) push('You were set as owner on a new '+r.kind.slice(0,-1)+': '+r.name, nav);
        else if(canManageRecords()) push('New '+r.kind.slice(0,-1)+': '+r.name, nav);
        this._loadRecords();
      })
      .on('postgres_changes', { event:'UPDATE', schema:'public', table:'records' }, (payload)=>{
        const r=payload.new; const label=r.kind==='campaigns'?'Campaign':'Project';
        const nav={ route: r.kind==='campaigns'?'campaigns':'masters' };
        if(r.owner===me()) push('Your '+label.toLowerCase()+' '+r.name+' was updated — status: '+r.status, nav);
        else if(canManageRecords()) push(label+' updated: '+r.name+' — status: '+r.status, nav);
        this._loadRecords();
      })
      .on('postgres_changes', { event:'INSERT', schema:'public', table:'campaigns' }, (payload)=>{
        const c=payload.new.payload||{}; const nav={ route:'campaigns', cmpOpen:payload.new.id };
        if(c.owner===me()) push('You were set as owner on a new campaign: '+(c.name||payload.new.id), nav);
        else if(canManageCampaigns()) push('New campaign created: '+(c.name||payload.new.id), nav);
        this._loadCampaigns();
      })
      .on('postgres_changes', { event:'UPDATE', schema:'public', table:'campaigns' }, (payload)=>{
        const c=payload.new.payload||{}; const nav={ route:'campaigns', cmpOpen:payload.new.id };
        if(c.owner===me()) push('Your campaign '+(c.name||payload.new.id)+' was updated — status: '+(c.status||'—'), nav);
        else if(canManageCampaigns()) push('Campaign updated: '+(c.name||payload.new.id)+' — status: '+(c.status||'—'), nav);
        this._loadCampaigns();
      })
      .on('postgres_changes', { event:'INSERT', schema:'public', table:'tickets' }, (payload)=>{
        const t=payload.new.payload||{}; const nav={ route:'support', tktOpen:payload.new.id };
        if(t.assignee===me()) push('You were assigned a new ticket: '+(t.subject||payload.new.id), nav);
        else if(canManageTickets()) push('New ticket raised: '+(t.subject||payload.new.id)+' by '+(t.by||'—'), nav);
        this._loadTickets();
      })
      .on('postgres_changes', { event:'UPDATE', schema:'public', table:'tickets' }, (payload)=>{
        const t=payload.new.payload||{}; const nav={ route:'support', tktOpen:payload.new.id };
        if(t.assignee===me()) push('Your ticket '+(t.subject||payload.new.id)+' was updated — status: '+(t.status||'—'), nav);
        else if(canManageTickets()) push('Ticket updated: '+(t.subject||payload.new.id)+' — status: '+(t.status||'—'), nav);
        this._loadTickets();
      })
      // Messages/threads: merge the single changed row into local state
      // instead of a full _loadThreads() reload — a wholesale reload here
      // would race an optimistic local send exactly like the bug already
      // fixed for tasks (tkPatch/_persistTaskPatch), silently reverting a
      // message that hasn't round-tripped to the DB yet.
      .on('postgres_changes', { event:'INSERT', schema:'public', table:'messages' }, (payload)=>{
        const row=payload.new||{}; const msg=row.payload||{};
        this._applyMessageRealtime(row.thread_id, msg);
        if(msg.who===me()) return;
        const visible=this.myThreads().some(t=>t.id===row.thread_id);
        if(!visible) return;
        const isOpen=this.state.route==='messages' && this.state.thOpen===row.thread_id;
        this._notifyNewMessage(row.thread_id, msg, isOpen);
        if(!isOpen) push((msg.who||'Someone')+' — '+String(msg.text||'sent an attachment').slice(0,60), { route:'messages', thOpen:row.thread_id });
      })
      .on('postgres_changes', { event:'UPDATE', schema:'public', table:'messages' }, (payload)=>{
        const row=payload.new||{};
        this._applyMessageRealtime(row.thread_id, row.payload||{});
      })
      .on('postgres_changes', { event:'INSERT', schema:'public', table:'threads' }, (payload)=>{
        const row=payload.new||{};
        this._applyThreadRealtime({ ...(row.payload||{}), id:row.id });
      })
      .on('postgres_changes', { event:'UPDATE', schema:'public', table:'threads' }, (payload)=>{
        const row=payload.new||{};
        this._applyThreadUpdateRealtime({ ...(row.payload||{}), id:row.id });
      })
      .subscribe();
    this._subscribePresence();
  }
  // Merges one message row into the thAdded overlay (functional setState so
  // it always applies against the latest state, not a stale closure — safe
  // even if several messages land in quick succession).
  _applyMessageRealtime(threadId, msg){
    if(!threadId || !msg || !msg.id) return;
    this.setState(s=>{
      const add={...(s.thAdded||{})};
      add[threadId]={ ...(add[threadId]||{}), [msg.id]:msg };
      return { thAdded:add };
    });
  }
  // Adds a newly-created thread (from another session) if we don't already
  // have it — the creator's own client already added it optimistically in
  // thSave(), so this only ever matters for everyone else in that thread.
  _applyThreadRealtime(threadRec){
    if(!threadRec || !threadRec.id) return;
    this.setState(s=>{
      const cur=s.thNew||[];
      if(cur.some(t=>t.id===threadRec.id)) return null;
      return { thNew:[...cur, { ...threadRec, msgs:[] }] };
    });
  }
  // Merges a thread-record update (pin/archive/rename/membership change)
  // from another session into the thPatched overlay — same merge-not-
  // replace pattern as _applyMessageRealtime, so it can never race an
  // optimistic local _patchThread() call and revert it.
  _applyThreadUpdateRealtime(threadRec){
    if(!threadRec || !threadRec.id) return;
    this.setState(s=>({ thPatched:{ ...(s.thPatched||{}), [threadRec.id]:{ ...((s.thPatched||{})[threadRec.id]), ...threadRec } } }));
  }
  // Presence (who's online right now) + typing broadcasts — a genuinely
  // different Realtime primitive from postgres_changes above: nothing here
  // is a database row, it's ephemeral state that only exists while sockets
  // are connected. Presence keys itself by the signed-in user's id.
  _subscribePresence(){
    if(this._presenceChannel) return;
    const me=this.currentPerson();
    const myId=(this.state.authUser&&this.state.authUser.id)||me;
    const channel=supabase.channel('beetloop-presence', { config:{ presence:{ key:String(myId) } } });
    channel.on('presence', { event:'sync' }, ()=>{
      const state=channel.presenceState();
      const online={};
      Object.values(state).forEach(entries=>{ (entries||[]).forEach(p=>{ if(p&&p.name) online[p.name]=true; }); });
      this.setState({ onlineUsers:online });
    });
    channel.on('broadcast', { event:'typing' }, (msg)=>{
      const { thread, who } = (msg&&msg.payload)||{};
      if(!thread || !who || who===me) return;
      this.setState(s=>({ typingByThread:{ ...(s.typingByThread||{}), [thread]:{ who, at:Date.now() } } }));
      this._typingClear=this._typingClear||{};
      clearTimeout(this._typingClear[thread]);
      this._typingClear[thread]=setTimeout(()=>{
        this.setState(s=>{ const t={ ...(s.typingByThread||{}) }; delete t[thread]; return { typingByThread:t }; });
      }, 3000);
    });
    channel.subscribe(async (status)=>{
      if(status==='SUBSCRIBED'){
        try{ await channel.track({ name:me, online_at:new Date().toISOString() }); }catch(e){}
      }
    });
    this._presenceChannel=channel;
  }
  // Throttled so holding a key down doesn't flood the broadcast channel —
  // one "I'm typing" ping per 1.5s is plenty for the other side to keep
  // showing the indicator (it self-clears after 3s of silence anyway).
  _broadcastTyping(threadId){
    if(!this._presenceChannel || !threadId) return;
    const now=Date.now();
    if(this._lastTypingSent && now-this._lastTypingSent<1500) return;
    this._lastTypingSent=now;
    this._presenceChannel.send({ type:'broadcast', event:'typing', payload:{ thread:threadId, who:this.currentPerson() } });
  }
  _requestNotificationPermission(){
    if(typeof Notification==='undefined') return;
    if(Notification.permission==='default'){
      Notification.requestPermission().catch(()=>{});
    }
  }
  // Real OS-level notification for a message that arrived in a thread the
  // user isn't actively looking at (either a different thread, a different
  // route entirely, or the tab is backgrounded). Never fires for a thread
  // that's both open AND visible — that's what the in-app read receipt/
  // unread badge is for.
  _notifyNewMessage(threadId, msg, isThreadOpen){
    if(isThreadOpen && !document.hidden) return;
    this._playNotificationSound();
    if(typeof Notification==='undefined' || Notification.permission!=='granted') return;
    try{
      const n=new Notification(msg.who||'New message', { body:String(msg.text||'Sent an attachment').slice(0,120) });
      n.onclick=()=>{ window.focus(); this.setState({ screen:'app', route:'messages', thOpen:threadId }); n.close(); };
    }catch(e){}
  }
  // A short two-tone beep synthesized on the fly — no bundled audio asset,
  // no network fetch, works the moment the tab has been interacted with.
  _playNotificationSound(){
    try{
      const Ctx=window.AudioContext||window.webkitAudioContext; if(!Ctx) return;
      const ctx=new Ctx();
      const osc=ctx.createOscillator(); const gain=ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination);
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      osc.frequency.setValueAtTime(1108, ctx.currentTime+0.09);
      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime+0.28);
      osc.start(); osc.stop(ctx.currentTime+0.3);
    }catch(e){}
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
