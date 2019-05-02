import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MyOwnCustomMaterialModule } from '../my-own-custom-material.module';
import { FilterPipe } from './filter.pipe';
import { FilterComponent } from './filter/filter.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LoadingComponent } from './loading/loading.component';

@NgModule({
  declarations: [FilterPipe, FilterComponent, LoadingComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MyOwnCustomMaterialModule,
    FlexLayoutModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    MyOwnCustomMaterialModule,
    FilterPipe,
    FilterComponent,
    FlexLayoutModule,
    LoadingComponent
  ]
})
export class SharedModule { }
