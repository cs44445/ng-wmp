import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { NzCommonModule } from '../shared/nz-common.module';
@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    NzCommonModule
  ],
  exports: [

  ]
})
export class LayoutModule { }
