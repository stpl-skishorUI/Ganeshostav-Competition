import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ParticipentListComponent } from './participent-list.component';

const routes: Routes = [{ path: '', component: ParticipentListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParticipentListRoutingModule { }
