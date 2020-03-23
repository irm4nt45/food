import {InjectionToken} from '@angular/core';

export let ROUTES_CONFIG = new InjectionToken('routes.config');

const basePaths = {
  heroes: 'heroes',
};

const routesNames = {
  home: '',
  error404: '404',
  login: 'login',
  email: 'email',
  signup: 'signup',
  dashboard: 'dashboard',
  forgotpassword: 'forgot-password',
  verifyemailaddress: 'verify-email-address',
  search: 'search',
  heroes: {
    basePath: basePaths.heroes
  }
};

export const RoutesConfig: any = {
  routesNames,
  routes: {
    home: `/${routesNames.home}`,
    error404: `/${routesNames.error404}`,
    login: `/${routesNames.login}`,
    email: `/${routesNames.email}`,
    signup: `/${routesNames.signup}`,
    dashboard: `/${routesNames.dashboard}`,
    forgotpassword: `/${routesNames.forgotpassword}`,
    verifyemailaddress: `/${routesNames.verifyemailaddress}`,
    search: `/${routesNames.search}`,
    heroes: {
      detail: getHeroDetail
    }
  }
};

export function getHeroDetail(id) {
  return `/${basePaths.heroes}/${id}`;
}
