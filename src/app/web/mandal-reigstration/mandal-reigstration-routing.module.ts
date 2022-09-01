import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MandalReigstrationComponent } from './mandal-reigstration.component';

const routes: Routes = [{ path: '', component: MandalReigstrationComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MandalReigstrationRoutingModule { }
