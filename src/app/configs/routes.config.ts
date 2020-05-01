import {InjectionToken} from '@angular/core';

export let ROUTES_CONFIG = new InjectionToken('routes.config');

const basePaths = {
  heroes: 'heroes',
};

const base = {
  recipes: 'recipes',
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
  day3: 'main-page',
  heroes: {
    basePath: basePaths.heroes
  },
  recipes: {
    base: base.recipes
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
    day3: `/${routesNames.day3}`,
    recipes: {
      recipe: getRecipe
    },
    heroes: {
      detail: getHeroDetail
    }
  }
};

export function getRecipe(id) {
  return `/${base.recipes}/${id}`;
}

export function getHeroDetail(id) {
  return `/${basePaths.heroes}/${id}`;
}
