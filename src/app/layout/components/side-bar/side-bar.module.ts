import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoutComponent } from './logout/logout.component';

import { AngularSvgIconModule } from 'angular-svg-icon';
import { LogoComponent } from './logo/logo.component';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { SideBarItemComponent } from './side-bar-item/side-bar-item.component';
import { NzIconModule } from 'ng-zorro-antd/icon';


@NgModule({
  declarations: [
    LogoutComponent,
    LogoComponent,
    SideBarItemComponent,
  ],
  imports: [
    CommonModule,
    AngularSvgIconModule,
    NzPopoverModule,
    NzMenuModule,
    NzLayoutModule,
    NzIconModule,
  ],
  exports: [
    LogoutComponent,
    LogoComponent,
    SideBarItemComponent,
    NzLayoutModule,
    NzMenuModule,
  ]
})
export class SideBarModule { }
