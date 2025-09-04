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

export const routes: Routes = [
  { path: 'home-page', component: HomePageComponent },
  { path: 'critical-threads', component: CriticalThreadsComponent },
  { path: 'itsm-servicenow', component: ItsmServicenowComponent },
  { path: 'soc-splunk', component: SocSplunkComponent },
  {
    path: 'edr-crowdstrike-sentinelone',
    component: EdrCrowdstrikeSentineloneComponent,
  },
  { path: 'epp-proofpoint', component: EppProofpointComponent },
  {
    path: 'advanced-thread-hunting',
    component: AdvancedThreadHuntingComponent,
  },
  { path: 'incident-response', component: IncidentResponseComponent },
  { path: 'ticket-analysis', component: TicketAnalysisComponent },
  { path: '', redirectTo: '/home-page', pathMatch: 'full' },
  { path: '**', redirectTo: '/home-page' }, // Redirección para rutas incorrectas
];
