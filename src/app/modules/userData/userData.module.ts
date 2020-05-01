import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../../shared/shared.module';
import {HomeComponent} from './home/home.component';
import { DaysService } from './shared/days.service';
import { UserDataRoutingModule } from './userData-routing.module';
import { RecipeCardImgComponent } from './recipe-card-img/recipe-card-img.component';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    UserDataRoutingModule
  ],
  declarations: [
    HomeComponent,
    RecipeCardImgComponent
  ],

  providers: [DaysService]
})

export class UserDataModule {
}
