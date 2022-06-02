import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommonTableComponent } from '../components/common-table/common-table.component';
import { SideBarModule } from '../layout/components/side-bar/side-bar.module';
import { PaginationComponent } from '../components/pagination/pagination.component';
import { PageTitleComponent } from '../components/page-title/page-title.component';

const declarations = [
  CommonTableComponent,
  PaginationComponent,
  // PageTitleComponent
]
const modules = [
  SideBarModule,
]
@NgModule({
  declarations: [
    // PaginationComponent,
    PageTitleComponent
  ],
  imports: [
    CommonModule,

  ],
  exports: [
    // PaginationComponent,
    PageTitleComponent,
  ],
  // exports: [...declarations, ...modules]
  // exports: [
  //   SideBarModule,
  // ]
})
export class SharedModule { }
