import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanDeactivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorageService } from './services/business/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private ls: LocalStorageService) { }
  canActivate(): boolean {
    if (this.ls.get('token', '')) {
      return true
    } else {
      this.router.navigateByUrl('/login')
      return false
    }
  }
}
