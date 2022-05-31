import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzCommonModule } from 'src/app/shared/nz-common.module';
import { CommonTableComponent } from './common-table.component';
import { NzTableModule } from 'ng-zorro-antd/table';



@NgModule({
  declarations: [
    CommonTableComponent
  ],
  imports: [
    CommonModule,
    NzCommonModule,
    // NzTableModule,
  ],
})
export class CommonTableModule { }
