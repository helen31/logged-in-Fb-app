import { NgModule } from '@angular/core';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';

@NgModule({
  imports: [
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatRadioModule
  ],
  exports: [
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatRadioModule
  ]
})

export class MyOwnCustomMaterialModule {}