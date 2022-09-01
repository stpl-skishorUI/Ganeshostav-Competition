import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MandalReigstrationRoutingModule } from './mandal-reigstration-routing.module';
import { MandalReigstrationComponent } from './mandal-reigstration.component';


@NgModule({
  declarations: [
    MandalReigstrationComponent
  ],
  imports: [
    CommonModule,
    MandalReigstrationRoutingModule
  ]
})
export class MandalReigstrationModule { }
