import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {Error404PageComponent} from './pages/error404-page/error404-page.component';
import {HomePageComponent} from './pages/home-page/home-page.component';
import {RoutesConfig} from './configs/routes.config';
import { LoginComponent } from './shared/components/firebase/login/login.component';
import { EmailComponent } from './shared/components/firebase/email/email.component';
import { SignupComponent } from './shared/components/firebase/signup/signup.component';
import { DashboardComponent } from './shared/components/firebase/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './shared/components/firebase/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './shared/components/firebase/verify-email/verify-email.component';
import { RecipesComponent } from './shared/components/recipes/recipes.component';
import { AuthGuard } from './shared/services/auth.service';
import { RecipeComponent } from './shared/components/recipes/recipe/recipe.component';
import { HomeComponent } from './modules/userData/home/home.component';

const routesNames = RoutesConfig.routesNames;

export const routes: Routes = [
  {path: routesNames.home, component: HomePageComponent,  pathMatch: 'full', },

  {path: routesNames.heroes.basePath, loadChildren: () => import('./modules/heroes/heroes.module').then(m => m.HeroesModule)},
  {path: 'logedin', component: HomeComponent, loadChildren: () => import('./modules/userData/userData.module')
  .then(m => m.UserDataModule), data: { text: 'Home', iconName: 'account_box' }},
  //{ path: routesNames.day3, component: Days3Component, data: { text: 'Home', iconName: 'account_box' } },


  {path: routesNames.error404, component: Error404PageComponent},


  {path: 'en', redirectTo: ''}, // because english language is the default one


  { path: routesNames.login, component: LoginComponent },
   { path: routesNames.email, component: EmailComponent },
   { path: routesNames.signup, component: SignupComponent },
   { path: routesNames.dashboard, component: DashboardComponent, canActivate: [AuthGuard] },
  { path: routesNames.forgotpassword, component: ForgotPasswordComponent },
  { path: routesNames.verifyemailaddress, component: VerifyEmailComponent },
  { path: routesNames.search, component: RecipesComponent, data: { text: 'Search', iconName: 'account_box' } },
  { path: routesNames.recipes.base, component: RecipesComponent, data: { text: 'Recipes', iconName: 'account_box' },
  children: [
    {
      path: ':id',
      // outlet: 'sidemenu',
      component: RecipeComponent
  },




  
  
]
},
  // otherwise redirect to 404
  {path: '**', redirectTo: RoutesConfig.routes.error404}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabled',
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled'
    })
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule {
}
