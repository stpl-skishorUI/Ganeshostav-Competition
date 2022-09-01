import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebLayoutRoutingModule } from './web-layout-routing.module';
import { WebLayoutComponent } from './web-layout.component';
import { WebFooterComponent } from './web-footer/web-footer.component';
import { WebHeaderComponent } from './web-header/web-header.component';

@NgModule({
  declarations: [
    WebLayoutComponent,
    WebFooterComponent,
    WebHeaderComponent
  ],
  imports: [
    CommonModule,
    WebLayoutRoutingModule
  ]
})
export class WebLayoutModule { }
