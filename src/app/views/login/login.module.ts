import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
  ],
  exports: [LoginComponent]
})
export class LoginModule { }
