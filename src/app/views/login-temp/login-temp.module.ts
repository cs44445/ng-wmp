import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginTempComponent } from './login-temp.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';

@NgModule({
  declarations: [
    LoginTempComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
  ],
  exports: [LoginTempComponent]
})
export class LoginTempModule { }
