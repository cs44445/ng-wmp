/**
 * Implementation based on https://github.com/AzureAD/microsoft-authentication-library-for-js/tree/dev/lib/msal-browser
 */

import * as Msal from "@azure/msal-browser";
import { environment } from '../../environments/environment'

//  import store from '@/store'

const malConfig = {
  auth: {
    clientId: environment.VUE_APP_CLIENT_ID,
    authority: 'https://login.microsoftonline.com/' + environment.VUE_APP_TENANT_ID,
    redirectUri: environment.VUE_APP_LOGIN_REDIRECT_URL,
    postLogoutRedirectUri: environment.VUE_APP_LOGOUT_REDIRECT_URL,
    navigateToLoginRequestUrl: false,
  }
};

const LoginRequest = {
  scopes: [
    "openid",
    "profile",
    "email",
    malConfig.auth.clientId + "/.default"
  ],
  forceRefresh: true,
  prompt: "select_account"
};

export function login() {

  var msalInstance = new Msal.PublicClientApplication(malConfig)
  var loginRequest = LoginRequest;

  console.log('malConfig', malConfig)
  // https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/errors.md#using-loginredirect-or-acquiretokenredirect
  msalInstance.handleRedirectPromise().then(res => {
    console.log('login.handleRedirectPromise res: ', res)
    const accounts = msalInstance.getAllAccounts();
    if (accounts.length === 0 || !res) {
      // No user signed in
      msalInstance.loginRedirect(loginRequest);
    }
  }).catch(err => {
    console.log('login.handleRedirectPromise error: ', err)
  })
}

export async function getAccessToken() {
  var msalInstance = new Msal.PublicClientApplication(malConfig)
  var loginRequest = LoginRequest;

  return msalInstance.handleRedirectPromise().then(res => {
    console.log('getAccessToken.handleRedirectPromise res: ', res)
    if (!res) {
      console.log('acquireTokenRedirect')
      return msalInstance.acquireTokenRedirect(loginRequest);
    } else {
      var account = msalInstance.getAllAccounts()[0]
      console.log('acquireTokenSilent for account: ', account)

      loginRequest.account = account
      return msalInstance.acquireTokenSilent(loginRequest);
    }
  }).catch(err => {
    console.log('getAccessToken.handleRedirectPromise error: ', err)
  })
}

export function logout() {
  var msalInstance = new Msal.PublicClientApplication(malConfig)

  msalInstance.handleRedirectPromise().then(res => {
    console.log('logout.handleRedirectPromise res: ', res)
    if (!res) {
      msalInstance.logoutRedirect()
    }
  }).catch(err => {
    console.log('logout.handleRedirectPromise error: ', err)
  })
}