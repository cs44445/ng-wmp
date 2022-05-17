import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { SideBarModule } from './components/side-bar/side-bar.module';
import { SideBarComponent } from './components/side-bar/side-bar.component';


@NgModule({
  declarations: [
    // SideBarComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    SideBarModule
  ],
  exports: [
    // SideBarComponent
  ]
})
export class LayoutModule { }
