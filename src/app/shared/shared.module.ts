import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommonTableComponent } from '../components/common-table/common-table.component';
import { SideBarModule } from '../layout/components/side-bar/side-bar.module';
import { PageTitleComponent } from '../components/page-title/page-title.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { PaginationModule } from '../components/pagination/pagination.module';
import { CommonModalModule } from '../components/common-modal/common-modal.module';
import { PageHeaderComponent } from '../layout/components/page-header/page-header.component';

const declarations = [
  CommonTableComponent,
  PageTitleComponent,
  PageHeaderComponent,
]
const modules = [
  SideBarModule,
  AngularSvgIconModule,
  PaginationModule,
  CommonModalModule,
]
@NgModule({
  declarations: declarations,
  imports: [
    CommonModule,
    AngularSvgIconModule,
  ],
  exports: [...declarations, ...modules]
})
export class SharedModule { }
