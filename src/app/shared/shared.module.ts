import {NgModule} from '@angular/core';
// import {MaterialModule} from './modules/material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {CommonModule} from '@angular/common';
import {SpinnerComponent} from './components/spinner/spinner.component';
import {FooterComponent} from './components/footer/footer.component';
import {SearchBarComponent} from './components/search-bar/search-bar.component';
import {HeaderComponent} from './components/header/header.component';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {HeroCardComponent} from './components/hero-card/hero-card.component';
import {NgxExampleLibraryModule} from '@ismaestro/ngx-example-library';
import {HeroLoadingComponent} from './components/hero-loading/hero-loading.component';
import {NgxScrollToFirstInvalidModule} from '@ismaestro/ngx-scroll-to-first-invalid';
import {LoadingPlaceholderComponent} from './components/loading-placeholder/loading-placeholder.component';
import {CapitalizeFirstPipe} from './pipes/capitalize-first.pipe';
import {LazyLoadImageModule} from 'ng-lazyload-image';

import { LoginComponent } from './components/firebase/login/login.component';
import { EmailComponent } from './components/firebase/email/email.component';
import { ForgotPasswordComponent } from './components/firebase/forgot-password/forgot-password.component';
import { SignupComponent } from './components/firebase/signup/signup.component';
import { VerifyEmailComponent } from './components/firebase/verify-email/verify-email.component';
import { DashboardComponent } from './components/firebase/dashboard/dashboard.component';
import { MaterialModule } from './modules/material.module';
import { RecipesComponent, AutocompletePipeStartsWith } from './components/recipes/recipes.component';
import { TheMealDbService } from './services/the-meal-db.service';
//import { AppBrowserModule } from '../app.browser.module';



@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    RouterModule,
    NgxExampleLibraryModule,
    NgxScrollToFirstInvalidModule,
    LazyLoadImageModule,
    FormsModule,
    MaterialModule
    
    

  ],
  declarations: [
    HeaderComponent,
    SearchBarComponent,
    FooterComponent,
    SpinnerComponent,
    HeroCardComponent,
    HeroLoadingComponent,
    LoadingPlaceholderComponent,
    CapitalizeFirstPipe,
    LoginComponent,
    EmailComponent,
    ForgotPasswordComponent,
    SignupComponent,
    VerifyEmailComponent,
    DashboardComponent,
    RecipesComponent,
    AutocompletePipeStartsWith
    
  ],
  exports: [
    CommonModule,
    FlexLayoutModule,
    NgxExampleLibraryModule,
    HeaderComponent,
    SearchBarComponent,
    FooterComponent,
    SpinnerComponent,
    HeroCardComponent,
    HeroLoadingComponent,
    NgxScrollToFirstInvalidModule,
    LoadingPlaceholderComponent,
    CapitalizeFirstPipe,
    LazyLoadImageModule,
    LoginComponent,
    EmailComponent,
    ForgotPasswordComponent,
    SignupComponent,
    VerifyEmailComponent,
    DashboardComponent,
    MaterialModule,
    AutocompletePipeStartsWith
  ],
  providers: []
})

export class SharedModule {
}
