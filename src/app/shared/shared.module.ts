import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommonTableComponent } from '../components/common-table/common-table.component';
import { SideBarModule } from '../layout/components/side-bar/side-bar.module';
import { PaginationComponent } from '../components/pagination/pagination.component';

const declarations = [
  CommonTableComponent,
  PaginationComponent
]
const modules = [
  SideBarModule,
]
@NgModule({
  declarations: [
    // PaginationComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    // PaginationComponent,
  ],
  // exports: [...declarations, ...modules]
  // exports: [
  //   SideBarModule,
  // ]
})
export class SharedModule { }