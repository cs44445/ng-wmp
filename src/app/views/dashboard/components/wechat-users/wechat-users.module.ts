import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModularTitleComponent } from '../modular-title/modular-title.component';
import { BarChartsComponent } from '../bar-charts/bar-charts.component';

@NgModule({
  declarations: [
    ModularTitleComponent,
    BarChartsComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    ModularTitleComponent,
    BarChartsComponent,
  ]
})
export class WechatUsersModule { }
