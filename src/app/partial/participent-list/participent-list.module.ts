import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParticipentListRoutingModule } from './participent-list-routing.module';
import { ParticipentListComponent } from './participent-list.component';


@NgModule({
  declarations: [
    ParticipentListComponent
  ],
  imports: [
    CommonModule,
    ParticipentListRoutingModule
  ]
})
export class ParticipentListModule { }
