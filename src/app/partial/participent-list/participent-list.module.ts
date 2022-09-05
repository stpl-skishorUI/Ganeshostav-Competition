import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParticipentListRoutingModule } from './participent-list-routing.module';
import { ParticipentListComponent } from './participent-list.component';
import { NgxSelectModule } from 'ngx-select-ex';
import { ReactiveFormsModule } from '@angular/forms';
import { LightboxModule } from '@ngx-gallery/lightbox';
import { GalleryModule } from '@ngx-gallery/core';


@NgModule({
  declarations: [
    ParticipentListComponent
  ],
  imports: [
    CommonModule,
    ParticipentListRoutingModule,
    NgxSelectModule,
    ReactiveFormsModule,
    LightboxModule,
    GalleryModule
  ]
})
export class ParticipentListModule { }
