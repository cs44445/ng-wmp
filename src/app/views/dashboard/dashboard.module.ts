import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { FormsModule } from '@angular/forms';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { WechatUsersModule } from './components/wechat-users/wechat-users.module';
import { WechatUsersComponent } from './components/wechat-users/wechat-users.component';

@NgModule({
  declarations: [
    DashboardComponent,
    WechatUsersComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    DashboardRoutingModule,
    NzButtonModule,
    NzDatePickerModule,
    FormsModule,
    NzSwitchModule,
    WechatUsersModule,
  ],
  exports: [
    WechatUsersComponent
  ]
})
export class DashboardModule { }
