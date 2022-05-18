import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { SideBarModule } from './components/side-bar/side-bar.module';
@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    // SideBarModule,

  ],
  exports: [

  ]
})
export class LayoutModule { }
