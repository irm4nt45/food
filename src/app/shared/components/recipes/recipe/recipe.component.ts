import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/app/shared/interfaces/interfaces';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { RoutesConfig } from 'src/app/configs/routes.config';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent implements OnInit {

  recipe: Recipe;

  constructor(private location: Location,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    
    console.log("recipe component" + this.recipe.strMeal);
    this.recipe = this.activatedRoute.snapshot.data.recipe;
  }

  goBack(): void {
    this.location.back();
  }

  goToTheAnchor(): void {
    this.router.navigate([RoutesConfig.routes.recipes.recipe(this.recipe.strMeal)], {fragment: 'recipe'});
  }

}
