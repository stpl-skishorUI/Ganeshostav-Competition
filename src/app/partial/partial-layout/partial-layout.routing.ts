import { RouterModule, Routes } from '@angular/router';

export const PartialLayoutRoutes: Routes = [
  { path: 'dashboard', loadChildren: () => import('../dashboard/dashboard.module').then(m => m.DashboardModule), data: { title: 'Dashboard' } },   
  { path: 'participent-list', loadChildren: () => import('../participent-list/participent-list.module').then(m => m.ParticipentListModule) }, 
];
