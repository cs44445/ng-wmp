import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { zh_CN } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LoginTempModule } from './views/login-temp/login-temp.module';
import { LoginModule } from './views/login/login.module';
import { NotFoundPageComponent } from './views/not-found-page/not-found-page.component';
import { NotAuthPageComponent } from './views/not-auth-page/not-auth-page.component';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { AuthInterceptorsService } from './services/api/authInterceptors.service';
import { LayoutComponent } from './layout/layout.component';
import { HttpInterceptorProviders } from './services/interceptors';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { SideBarComponent } from './layout/components/side-bar/side-bar.component';
import { SideBarModule } from './layout/components/side-bar/side-bar.module';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { PageHeaderModule } from './layout/components/page-header/page-header.module';
import { PageHeaderComponent } from './layout/components/page-header/page-header.component';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';

registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
    NotFoundPageComponent,
    NotAuthPageComponent,
    LayoutComponent,
    SideBarComponent,
    PageHeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AngularSvgIconModule.forRoot(),
    LoginTempModule,
    LoginModule,
    NzButtonModule,
    NzGridModule,
    NzIconModule,
    NzModalModule,
    NzLayoutModule,
    NzAvatarModule,
    SideBarModule,
    PageHeaderModule,
    NzDatePickerModule,
  ],
  providers: [
    { provide: NZ_I18N, useValue: zh_CN },
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: AuthInterceptorsService,
    //   multi: true
    // }
    HttpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
