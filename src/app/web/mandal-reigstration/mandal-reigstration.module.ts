import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MandalReigstrationRoutingModule } from './mandal-reigstration-routing.module';
import { MandalReigstrationComponent } from './mandal-reigstration.component';
// import { NgxSelectModule } from 'ngx-select-ex';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    MandalReigstrationComponent
  ],
  imports: [
    CommonModule,
    MandalReigstrationRoutingModule,
    // NgxSelectModule,
    ReactiveFormsModule,
  ]
})
export class MandalReigstrationModule { }
