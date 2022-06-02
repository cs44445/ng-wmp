import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerComponent } from './customer.component';
import { ScoreComponent } from './components/score/score.component';
import { NzCommonModule } from 'src/app/shared/nz-common.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageTitleComponent } from 'src/app/components/page-title/page-title.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { StarRateComponent } from './components/star-rate/star-rate.component';


@NgModule({
  declarations: [
    CustomerComponent,
    ScoreComponent,
    StarRateComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    NzCommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class CustomerModule { }
