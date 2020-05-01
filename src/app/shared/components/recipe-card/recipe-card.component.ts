import { Component, OnInit, Input, PLATFORM_ID, Inject } from '@angular/core';
import { Recipe } from '../../interfaces/interfaces';
import { TheMealDbService } from '../../services/the-meal-db.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { I18n } from '@ngx-translate/i18n-polyfill';
import { CookieService } from 'ngx-cookie';
import { ROUTES_CONFIG } from 'src/app/configs/routes.config';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.scss']
})
export class RecipeCardComponent implements OnInit {

  
  @Input() recipe: Recipe;

  canVote: boolean;
  isBrowser: boolean;

  constructor(
    //private recipesService: TheMealDbService,
              private router: Router,
              //private snackBar: MatSnackBar,
              private i18n: I18n,
              //private cookieService: CookieService,
              @Inject(PLATFORM_ID) private platformId: object,
              @Inject(ROUTES_CONFIG) public routesConfig: any) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() {
    //this.canVote = this.recipesService.checkIfUserCanVote();
  }

  //add method for Recipe to be available to list it at favorites 


  // like(recipe: Recipe): Promise<void> {
  //   if (this.canVote) {
  //     recipe.like();
  //     this.cookieService.put('votes', '' + (Number(this.cookieService.get('votes') || 0) + 1));
  //     return this.recipesService.updateHero(recipe);
  //   } else {
  //     this.snackBar.open(this.i18n({value: 'Can\'t vote anymore', id: '@@cannotVote'}), '', {duration: 1000});
  //   }
  // }
}
