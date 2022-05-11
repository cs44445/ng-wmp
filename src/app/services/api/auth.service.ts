import { Injectable } from '@angular/core';

/** Mock client-side authentication/authorization service */
@Injectable()
export class AuthService {
  getAuthorizationToken() {
    const authToken = localStorage.getItem('token')!
    return authToken;
    // return 'some-auth-token';
  }
}
