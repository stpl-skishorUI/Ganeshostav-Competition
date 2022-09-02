import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MaterialModule } from 'src/app/shared/angularMaterialModule/material.module';
import { PartialLayoutRoutingModule } from './partial-layout-routing.module';





@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    PartialLayoutRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatRippleModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatSelectModule,
    MaterialModule
  ]  
})
export class PartialLayoutModule { }
