import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzMessageModule } from 'ng-zorro-antd/message';

const nzModules = [
  NzButtonModule,
  NzGridModule,
  NzIconModule,
  NzModalModule,
  NzLayoutModule,
  NzAvatarModule,
  NzDatePickerModule,
  NzTableModule,
  NzInputModule,
  NzSelectModule,
  NzMessageModule,
]
@NgModule({
  imports: [
    CommonModule,
    ...nzModules
  ],
  declarations: [],
  exports: nzModules
})
export class NzCommonModule { }
