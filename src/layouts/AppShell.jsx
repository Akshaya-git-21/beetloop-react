import React from 'react';
import Sidebar from './Sidebar.jsx';
import Topbar from './Topbar.jsx';
import PageHead from '../components/sections/PageHead.jsx';
import DashboardSection from '../components/sections/DashboardSection.jsx';
import ContentRepositorySection from '../components/sections/ContentRepositorySection.jsx';
import EffortPlannerSection from '../components/sections/EffortPlannerSection.jsx';
import IdeasRepositorySection from '../components/sections/IdeasRepositorySection.jsx';
import DocumentRepositorySection from '../components/sections/DocumentRepositorySection.jsx';
import TaskTemplatesSection from '../components/sections/TaskTemplatesSection.jsx';
import TasksSection from '../components/sections/TasksSection.jsx';
import TableSection from '../components/sections/TableSection.jsx';
import QcSection from '../components/sections/QcSection.jsx';
import AnalyticsSection from '../components/sections/AnalyticsSection.jsx';
import MastersHubSection from '../components/sections/MastersHubSection.jsx';
import MasterDetailSection from '../components/sections/MasterDetailSection.jsx';
import MyKpisSection from '../components/sections/MyKpisSection.jsx';
import MyProfileSection from '../components/sections/MyProfileSection.jsx';
import CampaignsSection from '../components/sections/CampaignsSection.jsx';
import MessagesSection from '../components/sections/MessagesSection.jsx';
import OkrSection from '../components/sections/OkrSection.jsx';
import ContentIdeaQcDrawer from '../components/drawers/ContentIdeaQcDrawer.jsx';
import TaskTemplateFormDrawer from '../components/drawers/TaskTemplateFormDrawer.jsx';
import OkrTemplateFormDrawer from '../components/drawers/OkrTemplateFormDrawer.jsx';
import KpiTemplateFormDrawer from '../components/drawers/KpiTemplateFormDrawer.jsx';
import OkrDetailDrawer from '../components/drawers/OkrDetailDrawer.jsx';
import AddContentIdeaDrawer from '../components/drawers/AddContentIdeaDrawer.jsx';
import TaskDetailDrawer from '../components/drawers/TaskDetailDrawer.jsx';
import CreateTaskModal from '../components/drawers/CreateTaskModal.jsx';
import CheckInModal from '../components/drawers/CheckInModal.jsx';
import CheckInHistoryDrawer from '../components/drawers/CheckInHistoryDrawer.jsx';
import Toast from '../components/drawers/Toast.jsx';
import CreateRecordModal from '../components/drawers/CreateRecordModal.jsx';
import ManageUserModal from '../components/drawers/ManageUserModal.jsx';
import AddUserModal from '../components/drawers/AddUserModal.jsx';
import EditMasterRecordModal from '../components/drawers/EditMasterRecordModal.jsx';
import ConfirmRoleModal from '../components/drawers/ConfirmRoleModal.jsx';
import MasterRecordSlideOver from '../components/drawers/MasterRecordSlideOver.jsx';
import NewPageForm from '../components/drawers/NewPageForm.jsx';
import ContentPageDetailDrawer from '../components/drawers/ContentPageDetailDrawer.jsx';
import OkrCreatePanel from '../components/drawers/OkrCreatePanel.jsx';
import CampaignDetailDrawer from '../components/drawers/CampaignDetailDrawer.jsx';
import CreateCampaignModal from '../components/drawers/CreateCampaignModal.jsx';
import NewThreadModal from '../components/drawers/NewThreadModal.jsx';
import SopSection from '../components/sections/SopSection.jsx';
import SopDetailDrawer from '../components/drawers/SopDetailDrawer.jsx';
import CreateSopModal from '../components/drawers/CreateSopModal.jsx';
import BrandPlaybookSection from '../components/sections/BrandPlaybookSection.jsx';
import SupportSection from '../components/sections/SupportSection.jsx';
import TicketDetailDrawer from '../components/drawers/TicketDetailDrawer.jsx';
import RaiseTicketModal from '../components/drawers/RaiseTicketModal.jsx';

export default function AppShell({ vm }) {
  const { route } = vm;
  return (
    <React.Fragment>


<div style={{"display":"flex","minHeight":"100vh"}}>

  
{/* Sidebar */}

  
<Sidebar vm={vm} />


  
{/* Main */}

  
<div style={{"flex":"1","minWidth":"0","display":"flex","flexDirection":"column"}}>

    
{/* Topbar */}

    
<Topbar vm={vm} />


    
{/* Content */}

    
<main className="blscroll" style={{"flex":"1","overflowY":"auto","padding":"28px 32px"}}>

      
<div style={{"maxWidth":"1240px","margin":"0 auto"}} key={route}>

        
{/* page head */}

        
<PageHead vm={vm} />


        
{/* DASHBOARD */}


<DashboardSection vm={vm} />



{/* MY PROFILE */}


<MyProfileSection vm={vm} />


{/* CAMPAIGNS */}


<CampaignsSection vm={vm} />


{/* MESSAGES */}


<MessagesSection vm={vm} />


{/* SOPs */}


<SopSection vm={vm} />
<BrandPlaybookSection vm={vm} />


{/* SUPPORT */}


<SupportSection vm={vm} />


        
{/* WEBSITE CONTENT REPOSITORY */}

        
<ContentRepositorySection vm={vm} />


        
{/* EFFORT PLANNER */}

        
<EffortPlannerSection vm={vm} />


        
{/* CONTENT IDEAS REPOSITORY */}

        
<IdeasRepositorySection vm={vm} />


        
{/* DOCUMENT REPOSITORY MODULE */}

        
<DocumentRepositorySection vm={vm} />


        
{/* TASK TEMPLATES MODULE */}

        
<TaskTemplatesSection vm={vm} />


        
{/* TASKS MODULE */}

        
<TasksSection vm={vm} />


        
{/* TABLE SCREENS (projects / campaigns / tasks / okr / repositories / users / masters detail) */}

        
<TableSection vm={vm} />


        
{/* QC */}

        
<QcSection vm={vm} />


        
{/* ANALYTICS */}

        
<AnalyticsSection vm={vm} />


        
{/* MASTERS HUB */}

        
<MastersHubSection vm={vm} />


        
{/* MASTER DETAIL */}

        
<MasterDetailSection vm={vm} />


        
{/* MY KPIs / CHECK-INS (Team Lead / Senior / Junior) */}

        
<MyKpisSection vm={vm} />


        
{/* OKR & KPI */}

        
<OkrSection vm={vm} />


      
</div>

    
</main>

  
</div>


</div>



{/* CONTENT IDEA QC DETAIL DRAWER */}


<ContentIdeaQcDrawer vm={vm} />



{/* TASK TEMPLATE FORM DRAWER */}


<TaskTemplateFormDrawer vm={vm} />



{/* OKR TEMPLATE FORM DRAWER */}


<OkrTemplateFormDrawer vm={vm} />



{/* KPI TEMPLATE FORM DRAWER */}


<KpiTemplateFormDrawer vm={vm} />



{/* OKR DETAIL DRAWER */}


<OkrDetailDrawer vm={vm} />



{/* ADD CONTENT IDEA DRAWER */}


<AddContentIdeaDrawer vm={vm} />



{/* TASK DETAIL DRAWER */}


<TaskDetailDrawer vm={vm} />



{/* CREATE TASK MODAL */}


<CreateTaskModal vm={vm} />



{/* CHECK-IN MODAL (role-based) */}


<CheckInModal vm={vm} />



{/* CHECK-IN HISTORY DRAWER */}


<CheckInHistoryDrawer vm={vm} />



{/* Toast */}


<Toast vm={vm} />
<CreateRecordModal vm={vm} />
<ManageUserModal vm={vm} />



{/* ADD USER MODAL */}


<AddUserModal vm={vm} />



{/* EDIT MASTER RECORD MODAL */}


<EditMasterRecordModal vm={vm} />


{/* CONFIRM ROLE MODAL */}


<ConfirmRoleModal vm={vm} />



{/* MASTER RECORD SLIDE-OVER */}


<MasterRecordSlideOver vm={vm} />



{/* NEW PAGE FORM */}


<NewPageForm vm={vm} />



{/* CONTENT PAGE DETAIL DRAWER */}


<ContentPageDetailDrawer vm={vm} />



{/* OKR CREATE PANEL */}


<OkrCreatePanel vm={vm} />


{/* CAMPAIGN DETAIL & CREATE/EDIT */}


<CampaignDetailDrawer vm={vm} />
<CreateCampaignModal vm={vm} />
<NewThreadModal vm={vm} />


{/* SOP DETAIL DRAWER */}


<SopDetailDrawer vm={vm} />
<CreateSopModal vm={vm} />


{/* TICKET DETAIL DRAWER */}


<TicketDetailDrawer vm={vm} />
<RaiseTicketModal vm={vm} />



    </React.Fragment>
  );
}
