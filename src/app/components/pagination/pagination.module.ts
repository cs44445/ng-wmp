import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from './pagination.component';
import { NzCommonModule } from 'src/app/shared/nz-common.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    PaginationComponent
  ],
  imports: [
    CommonModule,
    NzCommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    PaginationComponent
  ]
})
export class PaginationModule { }
