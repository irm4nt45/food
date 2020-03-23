import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
// import { flattenObject } from '../core/utils';
import { Observable, of } from 'rxjs';
// import { sortDataByKey, fillFromJSON } from '../core/utils';
import 'rxjs/add/operator/map';
import { retry, catchError } from 'rxjs/operators';
import { Receipe, Category, CategoryDietList, MealIngrediantList, MealAreaList } from '../interfaces/interfaces';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/xml',
    'Authorization': 'jwt-token',
    "content_security_policy": "default-src 'none';script-src 'self';style-src 'self';font-src 'self';img-src 'self' data:;connect-src 'self'"
    
    // 'Access-Control-Allow-Origin': '*',
    // 'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
    // 'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token, Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With'
  })
};


@Injectable()
export class TheMealDbService {

   private apiKey = '9973533';
   private baseUrl = `https://www.themealdb.com/api/json/v2/${this.apiKey}`;
//need implement firebase service call befor calling api

httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'jwt-token',
    "content_security_policy": "default-src 'none';script-src 'self';style-src 'self';font-src 'self';img-src 'self' data:;connect-src 'self'"
  })
}

   private allCoinsDataUrl = `https://min-api.cryptocompare.com/data/all/coinlist?api_key=${this.apiKey}`;
   private histoDataUrl = 'https://min-api.cryptocompare.com/data/histoday?fsym=';
   private priceMultiFullUrl = 'https://min-api.cryptocompare.com/data/pricemultifull?fsyms=';


   recipe: Receipe[];
   category: Category[];
   categoryDietList: CategoryDietList[];

   //there shuold be a string like tomatos,potatos,beef,chicken to describe all items in the frige
   itemsInTheFridge: string;

   constructor(private http: HttpClient) { }
   

   searchMealByName(name:string):Observable<any> {
     return this.http.get<Receipe>(this.baseUrl + '/search.php?s=' + name, this.httpOptions).pipe(
      retry(3), catchError(this.handleError<Receipe>('getRecipe')));
   }


   searchMealByFirstLetter(name: string):Observable<HttpResponse<Receipe[]>> {
    return this.http.get<Receipe[]>(this.baseUrl + '/search.php?f=' + name, { observe: 'response' });
  }

  // searchMealByFirstLetter(name: string):Observable<Receipe[]> {
  //   return this.http.get<Receipe[]>(this.baseUrl + '/search.php?f=' + name, httpOptions);
  // }

  searchMealById(id:number):Observable<any> {
    return this.http.get<Receipe>(this.baseUrl + '/lookup.php?i=' + id, httpOptions).pipe(
     retry(3), catchError(this.handleError<Receipe>('getRecipe')));
  }

  searchRandomMeal():Observable<any> {
    return this.http.get<Receipe>(this.baseUrl + '/random.php', httpOptions).pipe(
     retry(3), catchError(this.handleError<Receipe>('getRecipe')));
  }


  //subscribtion
  search10RandomMeal():Observable<Receipe[]> {
    return this.http.get<Receipe[]>(this.baseUrl + '/randomselection.php', httpOptions).pipe(
     retry(3), catchError(this.handleError<Receipe[]>('getRecipe')));
  }
  
  mealCategoriesList():Observable<Category[]> {
    return this.http.get<Category[]>(this.baseUrl + '/categories.php', httpOptions).pipe(
     retry(3), catchError(this.handleError<Category[]>('getRecipe')));
  }

  //subscription
  searchLatestMeals():Observable<Receipe[]> {
    return this.http.get<Receipe[]>(this.baseUrl + '/latest.php', httpOptions).pipe(
      retry(3), catchError(this.handleError<Receipe[]>('getRecipe')));
  }

  mealCategoriesDietList():Observable<CategoryDietList[]> {
    return this.http.get<Category[]>(this.baseUrl + '/list.php?c=list', httpOptions).pipe(
     retry(3), catchError(this.handleError<Category[]>('getRecipe')));
  }
  mealAreaList():Observable<MealAreaList[]> {
    return this.http.get<MealAreaList[]>(this.baseUrl + '/list.php?a=list', httpOptions).pipe(
     retry(3), catchError(this.handleError<MealAreaList[]>('getRecipe')));
  }
  mealIngredientList():Observable<MealIngrediantList[]> {
    return this.http.get<MealIngrediantList[]>(this.baseUrl + '/list.php?i=list', httpOptions).pipe(
     retry(3), catchError(this.handleError<MealIngrediantList[]>('getRecipe')));
  }

  filterByIngredient(ingredient: string):Observable<Receipe[]> {
    return this.http.get<Receipe[]>(this.baseUrl + '/filter.php?i=' + ingredient, httpOptions).pipe(
     retry(3), catchError(this.handleError<Receipe[]>('getRecipe')));
  }
  //subsribtion
  filterByIngredients(ingredients: string):Observable<Receipe[]> {
    this.itemsInTheFridge = ingredients;
    return this.http.get<Receipe[]>(this.baseUrl + '/filter.php?i=' + ingredients, httpOptions).pipe(
     retry(3), catchError(this.handleError<Receipe[]>('getRecipe')));
  }

  filterByCategory(category: string):Observable<Receipe[]> {
    return this.http.get<Receipe[]>(this.baseUrl + '/filter.php?c' + category, httpOptions).pipe(
     retry(3), catchError(this.handleError<Receipe[]>('getRecipe')));
  }
  filterByArea(area: string):Observable<Receipe[]> {
    return this.http.get<Receipe[]>(this.baseUrl + '/filter.php?a' + area, httpOptions).pipe(
     retry(3), catchError(this.handleError<Receipe[]>('getRecipe')));
  }




  //  getData(): Observable<CoinItem[]> {
  //     return this.http.get(this.baseUrl)
  //        .map(result => {
  //           return this.transformData(result);
  //        })
  //        .publishReplay(1, 300000)
  //        .refCount();
  //  }

  //  getSpecificCoinData(symbol): Observable<BlockItem> {
  //     return this.http.get(this.priceMultiFullUrl + symbol + '&tsyms=USD&api_key=' + this.apiKey)
  //        .map(result => {
  //           const returnedCoin = flattenObject(result['RAW'][symbol]['USD']);
  //           const coin = new BlockItem();
  //           fillFromJSON(coin, returnedCoin);
  //           return coin;
  //        });
  //  }

  //  getBetweenDaysPrices(symbol: String, forDays: Number): Observable<any> {
  //     return this.http.get(this.histoDataUrl + symbol + '&tsym=USD&limit=' + forDays + '&api_key=' + this.apiKey)
  //        .map(result => {
  //           return result;
  //        });
  //  }

  //  getHistoricalData(symbol: String): Observable<any> {
  //     return this.http.get(this.histoDataUrl + symbol + '&tsym=USD&limit=730&api_key=' + this.apiKey)
  //        .map(result => {
  //           return { data: result, symbol: symbol };
  //        });
  //  }

  //  getCryptoIdFromSymbol(symbol): Observable<any[]> {
  //     return this.http.get(this.allCoinsDataUrl)
  //        .map(result => {
  //           const crypto = result['Data'][symbol];
  //           return crypto;
  //        });
  //  }

  //  private transformData(data) {
  //     const transformedData = [];
  //     this.coins = [];

  //     if (data['Message'] === 'Success' && data['HasWarning'] === false && data['Data'].length !== 0) {
  //        const indexes = Object.keys(data['Data']);

  //        for (const idx of indexes) {
  //           const newCoin = new CoinItem();
  //           transformedData.push(flattenObject(data['Data'][idx]));
  //           fillFromJSON(newCoin, transformedData[idx]);

  //           if (newCoin.changePct24Hour >= 0) {
  //              newCoin.dailyScale = true;
  //           } else {
  //              newCoin.dailyScale = false;
  //           }

  //           newCoin.rank = Number(idx) + 1;
  //           this.coins.push(newCoin);
  //        }
  //     } else {
  //        for (let i = 0; i < offlineData.length; i++) {
  //           const coin = new CoinItem();
  //           fillFromJSON(coin, offlineData[i]);
  //           this.coins.push(coin);
  //        }
  //     }

  //     return sortDataByKey(this.coins, 'rank');
  //  }



  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
  
      return of(result as T);
    };
  }
  
  private log(message: string) {
    console.log(message);
  }
}
