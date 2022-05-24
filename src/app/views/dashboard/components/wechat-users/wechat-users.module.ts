import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModularTitleComponent } from '../modular-title/modular-title.component';
import { BarChartsComponent } from '../bar-charts/bar-charts.component';
import { NgxEchartsModule } from 'ngx-echarts';

@NgModule({
  declarations: [
    ModularTitleComponent,
    BarChartsComponent,
  ],
  imports: [
    CommonModule,
    NgxEchartsModule
  ],
  exports: [
    ModularTitleComponent,
    BarChartsComponent,
  ]
})
export class WechatUsersModule { }
