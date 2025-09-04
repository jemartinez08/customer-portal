import { Routes } from '@angular/router';
import { ServicenowComponent } from './pages/servicenow/servicenow.component';
import { SplunkComponent } from './pages/splunk/splunk.component';
import { CrowdstrikeComponent } from './pages/crowdstrike/crowdstrike.component';
import { ProofpointComponent } from './pages/proofpoint/proofpoint.component';
import { MainportalComponent } from './pages/mainportal/mainportal.component';

export const routes: Routes = [
  { path: 'mainportal', component: MainportalComponent },
  { path: 'servicenow', component: ServicenowComponent },
  { path: 'splunk', component: SplunkComponent },
  { path: 'crowdstrike', component: CrowdstrikeComponent },
  { path: 'proofpoint', component: ProofpointComponent },
  { path: '', redirectTo: '/main-portal', pathMatch: 'full' },
  { path: '**', redirectTo: '/main-portal' }, // Redirección para rutas incorrectas
];
