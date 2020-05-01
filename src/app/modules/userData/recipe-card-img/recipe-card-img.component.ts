import { Component, OnInit, Input, PLATFORM_ID, Inject } from '@angular/core';
import { Recipe } from 'src/app/shared/interfaces/interfaces';
import { Router } from '@angular/router';
import { I18n } from '@ngx-translate/i18n-polyfill';
import { ROUTES_CONFIG } from 'src/app/configs/routes.config';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-recipe-card-img',
  templateUrl: './recipe-card-img.component.html',
  styleUrls: ['./recipe-card-img.component.scss']
})
export class RecipeCardImgComponent implements OnInit {

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
  }

}
