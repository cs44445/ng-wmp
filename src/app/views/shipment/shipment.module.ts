import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AngularSvgIconModule } from 'angular-svg-icon';

import { ShipmentRoutingModule } from './shipment-routing.module';
import { ShipmentComponent } from './shipment.component';

import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTableModule } from 'ng-zorro-antd/table';
// import { SharedModule } from 'src/app/shared.module';
import { CommonTableComponent } from 'src/app/components/common-table/common-table.component';
import { NzCommonModule } from 'src/app/shared/nz-common.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { PaginationModule } from 'src/app/components/pagination/pagination.module';
// import { PageHeaderModule } from 'src/app/layout/components/page-header/page-header.module';
// import { PageHeaderComponent } from 'src/app/layout/components/page-header/page-header.component';


@NgModule({
  declarations: [
    ShipmentComponent,
    // CommonTableComponent
  ],
  imports: [
    CommonModule,
    ShipmentRoutingModule,
    AngularSvgIconModule,
    FormsModule,
    NzCommonModule,
    // SharedModule,
    PaginationModule
    // RouterModule.forChild([
    //   {
    //     path: '',
    //     component: 
    //   }
    // ])
  ],
  exports: [

  ]
})
export class ShipmentModule { }
