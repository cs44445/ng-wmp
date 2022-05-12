import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnthGuard } from './anth.guard';
import { LoginTempComponent } from './views/login-temp/login-temp.component';
import { LoginComponent } from './views/login/login.component';
import { NotAuthPageComponent } from './views/not-auth-page/not-auth-page.component';
import { NotFoundPageComponent } from './views/not-found-page/not-found-page.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'login-temp',
    component: LoginTempComponent
  },
  {
    path: 'dashboard',
    canActivate: [AnthGuard],
    loadChildren: () => import('../app/views/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: '401',
    component: NotAuthPageComponent
  },
  {
    path: '404',
    component: NotFoundPageComponent
  },
  // 需要把默认重定向的路由设置在倒数第二个位置，同时需要配置pathMatch: 'full'，重定向的地址前面需要加 /
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: "**",
    redirectTo: '404',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
