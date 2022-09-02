import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccessDeniedComponent } from 'src/app/core/errors/access-denied/access-denied.component';

const routes: Routes = [
  // for bidder routing implements
  {
    path: 'dashboard', loadChildren: () => import('../../partial/dashboard/dashboard.module').then(m => m.DashboardModule),
    data: { breadcrumb: [{ title: 'Dashboard', active: true }] }},
    { path: 'participent-list', loadChildren: () => import('../participent-list/participent-list.module').then(m => m.ParticipentListModule),
    data: { breadcrumb: [{ title: 'Participent List', active: true }] } }, 
    { path: 'access-denied', component: AccessDeniedComponent, data: { title: 'Access Denied' } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PartialLayoutRoutingModule { }
