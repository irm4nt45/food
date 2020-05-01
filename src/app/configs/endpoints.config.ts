import {InjectionToken} from '@angular/core';

export let ENDPOINTS_CONFIG = new InjectionToken('endpoints.config');

export const EndpointsConfig: any = {
  recipes: {
    collection_endpoint: 'days',
    //detail: getRecipeDetail
  }
};

export const endpoints: any = {
    collection_endpoint: 'days',
    recipes: getRecipes
};

export function getRecipes(id) {
  console.log('inside endpoints.conf.ts file');
  return `/recipes/${id}`;
}
