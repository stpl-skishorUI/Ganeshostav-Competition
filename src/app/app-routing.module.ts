import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/auth/auth.guard';
import { AuthorizationGuard } from './core/auth/authorization.guard';
import { WebLayoutComponent } from './web/web-layout/web-layout.component';
import { PartialLayoutComponent } from './partial/partial-layout/partial-layout.component';
import { PageNotFoundComponent } from './core/errors/page-not-found/page-not-found.component';

// const routes: Routes = [
//   { path: '', redirectTo: 'home', pathMatch: 'full' },
//   {
//     path: '',
//     component: WebLayoutComponent,
//     children: [
//       { path: '', loadChildren: () => import('./web/web-layout/web-layout.module').then(m => m.WebLayoutModule) },
//         ]
//   },
//   {
//     path: '',
//     component: PartialLayoutComponent,
//     children: [
//       { path: '', loadChildren: () => import('./partial/partial-layout/partial-layout.module').then(m => m.PartialLayoutModule), data: { title: 'Login' } },
//     ]
//   },
// ];


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '', component: WebLayoutComponent,  loadChildren: () => import('./web/web-layout/web-layout.module').then(m => m.WebLayoutModule) },
  {
    path: '',
    canActivate: [AuthGuard],
    canActivateChild: [AuthorizationGuard],
    component: PartialLayoutComponent,
    loadChildren: () => import('./partial/partial-layout/partial-layout.module').then(m => m.PartialLayoutModule)
  },

  { path: '**', component: PageNotFoundComponent},
];






@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
