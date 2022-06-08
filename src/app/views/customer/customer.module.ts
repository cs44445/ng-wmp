import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerComponent } from './customer.component';
import { ScoreComponent } from './components/score/score.component';
import { NzCommonModule } from 'src/app/shared/nz-common.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { StarRateComponent } from './components/star-rate/star-rate.component';
import { RatingListComponent } from './components/rating-list/rating-list.component';
import { DirectivesModule } from 'src/app/directives/directives.module';
@NgModule({
  declarations: [
    CustomerComponent,
    ScoreComponent,
    StarRateComponent,
    RatingListComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    NzCommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    DirectivesModule
  ]
})
export class CustomerModule { }
