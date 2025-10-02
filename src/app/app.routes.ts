import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { CriticalThreadsComponent } from './pages/critical-threads/critical-threads.component';
import { ItsmServicenowComponent } from './pages/itsm-servicenow/itsm-servicenow.component';
import { SocSplunkComponent } from './pages/soc-splunk/soc-splunk.component';
import { EdrCrowdstrikeSentineloneComponent } from './pages/edr-crowdstrike-sentinelone/edr-crowdstrike-sentinelone.component';
import { EppProofpointComponent } from './pages/epp-proofpoint/epp-proofpoint.component';
import { AdvancedThreadHuntingComponent } from './pages/advanced-thread-hunting/advanced-thread-hunting.component';
import { IncidentResponseComponent } from './pages/incident-response/incident-response.component';
import { TicketAnalysisComponent } from './pages/ticket-analysis/ticket-analysis.component';
import { ProjectSlaComplianceComponent } from './pages/project-sla-compliance/project-sla-compliance.component';
import { AccountComponent } from './pages/account/account.component';

import { MsalGuard } from '@azure/msal-angular';

export const routes: Routes = [
  { path: 'home-page', component: HomePageComponent, canActivate: [MsalGuard] },
  {
    path: 'critical-threads',
    component: CriticalThreadsComponent,
    canActivate: [MsalGuard],
  },
  {
    path: 'itsm-servicenow',
    component: ItsmServicenowComponent,
    canActivate: [MsalGuard],
  },
  {
    path: 'soc-splunk',
    component: SocSplunkComponent,
    canActivate: [MsalGuard],
  },
  {
    path: 'edr-crowdstrike-sentinelone',
    component: EdrCrowdstrikeSentineloneComponent,
    canActivate: [MsalGuard],
  },
  {
    path: 'epp-proofpoint',
    component: EppProofpointComponent,
    canActivate: [MsalGuard],
  },
  {
    path: 'advanced-thread-hunting',
    component: AdvancedThreadHuntingComponent,
    canActivate: [MsalGuard],
  },
  {
    path: 'incident-response',
    component: IncidentResponseComponent,
    canActivate: [MsalGuard],
  },
  {
    path: 'ticket-analysis',
    component: TicketAnalysisComponent,
    canActivate: [MsalGuard],
  },
  {
    path: 'project-sla-compliance',
    component: ProjectSlaComplianceComponent,
    canActivate: [MsalGuard],
  },
  {
    path: 'account',
    component: AccountComponent,
    canActivate: [MsalGuard],
  },
  { path: '', redirectTo: '/home-page', pathMatch: 'full' },
  { path: '**', redirectTo: '/home-page' }, // Redirección para rutas incorrectas
];
