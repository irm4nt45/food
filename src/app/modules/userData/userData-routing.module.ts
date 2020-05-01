import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {HomeComponent} from './home/home.component';


const userDataRoutes: Routes = [
  // {path: 'logedin', component: HomeComponent},
];

@NgModule({
  imports: [
    RouterModule.forChild(userDataRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
  ]
})

export class UserDataRoutingModule {
}
