import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonModalComponent } from './common-modal.component';
import { NzModalModule } from 'ng-zorro-antd/modal';

@NgModule({
  declarations: [
    CommonModalComponent
  ],
  imports: [
    CommonModule,
    NzModalModule
  ],
  exports: [
    CommonModalComponent
  ]
})
export class CommonModalModule { }
