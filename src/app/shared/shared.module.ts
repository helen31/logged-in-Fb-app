import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MyOwnCustomMaterialModule } from '../my-own-custom-material.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MyOwnCustomMaterialModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    MyOwnCustomMaterialModule
  ]
})
export class SharedModule { }
