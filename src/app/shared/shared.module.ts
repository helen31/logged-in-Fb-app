import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MyOwnCustomMaterialModule } from '../my-own-custom-material.module';
import { FilterPipe } from './filter.pipe';

@NgModule({
  declarations: [FilterPipe],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MyOwnCustomMaterialModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    MyOwnCustomMaterialModule,
    FilterPipe
  ]
})
export class SharedModule { }
