import { Component, OnInit, Pipe, PipeTransform, ViewChild, PLATFORM_ID, Inject, EventEmitter } from '@angular/core';
//import { Receipe } from '../core/interfaces';
import { Router } from '@angular/router';
//import { TheMealDbService } from '../services/the-meal-db.service';
 import { fillFromJSON, flattenObject } from '../../../modules/core/utils';
//import { flyInOut } from '../router.animations';
// import { IgxExpansionPanelComponent, IgxInputGroupComponent } from 'igniteui-angular';
import { FormBuilder } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';
import { Recipe } from '../../interfaces/interfaces';
import { TheMealDbService } from '../../services/the-meal-db.service';
import { ROUTES_CONFIG } from 'src/app/configs/routes.config';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss'],
  //animations: [flyInOut()]
})
export class RecipesComponent implements OnInit {

  recipes: Recipe[];
  recipeList = [];
  headers: any;
  pagination: string = 'a';
  recipeSelected;
  // searchTab;
  isBrowser: boolean;
  input1 = '';
  recipe;

  str: string;

  recipeListText = [];
  

  ////////////// check animations if they ar working remove this
  // @ViewChild(IgxExpansionPanelComponent, { static: false })
  // public panel: IgxExpansionPanelComponent;

  constructor(private router: Router, 
    private recipeService: TheMealDbService, 
    fb: FormBuilder, 
    @Inject(PLATFORM_ID) private platformId,
    @Inject(ROUTES_CONFIG) public routesConfig: any) 
    
    {
    this.isBrowser = isPlatformBrowser(platformId);

    this.recipeList = [ "aaaaaaa",
      "Apple Frangipan Tart", "Apple & Blackberry Crumble", 
      "Bakewell tart", "Bread and Butter Pudding", "Beef Wellington", "Baingan Bharta", "Beef Brisket Pot Roast", "Beef Sunday Roast", "Braised Beef Chilli", "Beef stroganoff", "Broccoli & Stilton soup", "Bean & Sausage Hotpot", "Banana Pancakes", "Beef Dumpling Stew", "Beef and Mustard Pie", "Beef and Oyster pie", "Blackberry Fool", "Battenberg Cake", "Beef Bourguignon", "Brie wrapped in prosciutto & brioche", "Boulangère Potatoes", "BeaverTails", "Brown Stew Chicken", "Beef Lo Mein", "Baked salmon with fennel & tomatoes", "Budino Di Ricotta", "Breakfast Potatoes", "Bitterballen (Dutch meatballs)", 
      "Fish pie", "French Lentils With Garlic and Thyme", "Fettucine alfredo", "Full English Breakfast", "French Onion Soup", "Flamiche", "French Omelette", "Fish Stew with Rouille", "Fennel Dauphinoise", "Fruit and Cream Cheese Breakfast Pastries", 
      "Dal fry", "Dundee cake", "Duck Confit", 
      "Garides Saganaki", "Grilled Mac and Cheese Sandwich", "General Tso's Chicken", 
      "Kapsalon", "Kentucky Fried Chicken", "Katsu Chicken curry", "Key Lime Pie", "Kidney Bean Curry", "Kedgeree", "Kung Pao Chicken", "Kung Po Prawns", "Kafteji", "Keleya Zaara", "Kumpir", 
      "Irish stew", 
      "Honey Teriyaki Salmon", "Hot Chocolate Fudge", "Hot and Sour Soup", "Home-made Mandazi", 
      "Mediterranean Pasta Salad", "Massaman Beef curry", "Mushroom & Chestnut Rotolo", "Matar Paneer", "Minced Beef Pie", "McSinghs Scotch pie", "Madeira Cake", "Montreal Smoked Meat", "Ma Po Tofu", "Mbuzi Choma (Roasted Goat)", "Mince Pies", 
      "Nutty Chicken Curry", "New York cheesecake", "Nanaimo Bars", 
      "Teriyaki Chicken Casserole", "Tandoori chicken", "Thai Green Curry", "Toad In The Hole", "Turkey Meatloaf", "Tuna Nicoise", "Tahini Lentils", "Three Fish Pie", "Treacle Tart", "Tarte Tatin", "Three-cheese souffles", "Tourtiere", "Timbits", "Tunisian Orange Cake", "Tunisian Lamb Soup", "Tuna and Egg Briks", 
      "Pad See Ew", "Potato Gratin with Chicken", "Poutine", "Pilchard puttanesca", "Pork Cassoulet", "Pancakes", "Pumpkin Pie", "Peanut Butter Cheesecake", "Peach & Blueberry Grunt", "Parkin Cake", "Pear Tarte Tatin", "Provençal Omelette Cake", "Prawn & Fennel Bisque", "Pate Chinois", "Pouding chomeur", "Peanut Butter Cookies", 
      "Jam Roly-Poly", "Jerk chicken with rice & peas", "Jamaican Beef Patties", 
      "Lamb tomato and sweet spices", "Lamb Biryani", "Lamb Rogan josh", "Laksa King Prawn Noodles", "Lamb Tagine", "Lasagne", "Lamb and Potato pie", "Lancashire hotpot", "Leblebi Soup", "Lasagna Sandwiches", 
      "Osso Buco alla Milanese", "Oxtail with broad beans", 
      "Rigatoni with fennel sausage sauce", "Rocky Road Fudge", "Recheado Masala Fish", "Ribollita", "Roasted Eggplant With Tahini, Pine Nuts, and Lentils", "Rock Cakes", "Ratatouille", "Rappie Pie", "Red Peas Soup", "Roast fennel and aubergine paella", 
      "Vegan Lasagna", "Vegan Chocolate Cake", "Vietnamese Grilled Pork (bun-thit-nuong)", "Venetian Duck Ragu", "Vegetarian Casserole", "Vegetarian Chilli", 
      "Eton Mess", "Eccles Cakes", "English Breakfast", "Escovitch Fish", "Egg Drop Soup",
      "Yaki Udon", 
      "White chocolate creme brulee", "Wontons", 
      "Chocolate Gateau", "Chicken Enchilada Casserole", "Cream Cheese Tart", "Christmas Pudding Flapjack", "Chicken Handi", "Chicken Alfredo Primavera", "Chicken Fajita Mac and Cheese", "Cajun spiced fish tacos", "Crock Pot Chicken Baked Tacos", "Chicken Karaage", "Coq au vin", "Chilli prawn linguine", "Clam chowder", "Creamy Tomato Soup", "Chicken & mushroom Hotpot", "Chicken Couscous", "Chocolate Avocado Mousse", "Choc Chip Pecan Pie", "Chocolate Raspberry Brownies", "Chickpea Fajitas", "Chicken Ham and Leek Pie", "Chicken Parmentier", "Carrot Cake", "Chelsea Buns", "Chocolate Souffle", "Chinon Apple Tarts", "Chicken Marengo", "Canadian Butter Tarts", "Chicken Basquaise", "Callaloo Jamaican Style", "Chicken Congee", "Chocolate Caramel Crispy", "Chakchouka ", "Cashew Ghoriba Biscuits", "Corba", "Christmas Pudding Trifle", "Classic Christmas pudding", "Christmas cake", 
      "Spaghetti Bolognese", "Spicy Arrabiata Penne", "Smoky Lentil Chili with Squash", "Sticky Toffee Pudding Ultimate", "Spicy North African Potato Salad", "Stovetop Eggplant With Harissa, Chickpeas, and Cumin Yogurt", "Salmon Prawn Risotto", "Salted Caramel Cheescake", "Seafood fideuà", "Spinach & Ricotta Cannelloni", "Squash linguine", "Spanish Tortilla", "Steak and Kidney Pie", "Sticky Toffee Pudding", "Spotted Dick", "Summer Pudding", "Summer Pistou", "Split Pea Soup", "Sugar Pie", "Steak Diane", "Saltfish and Ackee", "Sweet and Sour Pork", "Szechuan Beef", "Shrimp Chow Fun", "Salmon Avocado Salad", "Salmon Eggs Eggs Benedict", "Shakshuka", "Smoked Haddock Kedgeree", "Stamppot", "Snert (Dutch Split Pea Soup)", "Spaghetti alla Carbonara"
    ]
    // this.searchTab = fb.group({
    //   enteredText: ["", Validators.required]
    // });
    
  }

  // @ViewChild('inputGroup', { read: IgxInputGroupComponent, static: false }) inputGroup: IgxInputGroupComponent;


  ngOnInit() {
    
  
    this.loadData('a');


//   var arr = new Array(this.recipeListText); 

//   var str = arr.join(", "); 
//   console.log("str : " + str );  

// console.log("my long list : " + str ); 

// console.log("my long list : " + this.str ); 

//   console.log(this.recipeListText);
    

  }

  private loadData(str: string) {
    this.recipeService.searchMealByFirstLetter(str)
     .subscribe(res => {
       console.log(res);
      // const keys = res.headers.keys();
      // this.headers = keys.map(key =>
      //   `${key}: ${res.headers.get(key)}`);

        this.recipes = this.transformReceipe(res.body);
    });
}

private transformReceipe(data) {
  var strr;
  const transformedData = [];
  this.recipes = [];

  if (data['meals'] !== '' && data['meals'] !== false && data['meals'] !== null) {
     const indexes = Object.keys(data['meals']);

     for (const idx of indexes) {
        const newRecipe = new Recipe();
        transformedData.push(flattenObject(data['meals'][idx]));
        fillFromJSON(newRecipe, transformedData[idx]);
        
        this.recipes.push(newRecipe);
        
        console.log(newRecipe); 
        strr += "\"" + newRecipe.strMeal + "\"" +  ", ";
        console.log(strr);
        this.str = strr;
        this.recipeListText.push(newRecipe.strMeal);
     }
  }

  return this.recipes;
}

search(){
  console.log('front end search    ' + this.recipeSelected);
  this.recipeService.searchMealByName(this.recipeSelected)
  .subscribe(res => {
    // const keys = res.headers.keys();
    // this.headers = keys.map(key =>
    //   `${key}: ${res.headers.get(key)}`);
    console.log(res);

      this.recipes = this.transformReceipe(res);
  });
}
public clear() {
  console.log('front end     ' + this.recipeSelected);
  this.recipeSelected = '';
}

public recipeClicked(event){

}

//implement food items images adding /......
// public getReceipeImage(imageUrl: string) {
//   return transformReceipeImgUrl(imageUrl);
// }

}

@Pipe({ name: "startsWith" })
export class AutocompletePipeStartsWith implements PipeTransform {
    public transform(collection: any[], term = "") {
        return collection.filter((item) => item.toString().toLowerCase().startsWith(term.toString().toLowerCase()));
    }
}