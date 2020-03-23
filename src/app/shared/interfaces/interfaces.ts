export class MealIngrediantList {
    idIngredient: '';
    strIngredient: '';
    strDescription: '';
    strType: '';
 }

 export interface User {
   uid: string;
   email: string;
   displayName: string;
   photoURL: string;
   emailVerified: boolean;
}

export class Receipe {
   idMeal = 0;                 // CoinInfo.Id
   strMeal = '';              // CoinInfo.Name
   strDrinkAltenative = '';          // CoinInfo.FullName
   strCategory = '';              // RAW.USD.PRICE
   strArea = '';             // RAW.USD.SUPPLY
   strInstructions = '';    // RAW.USD.CHANGEPCT24HOUR
   strMealThumb = '';            // RAW.USD.DAILYSCALE
   strTags = '';         // CoinInfo.ProofType
   strYoutube = '';         // CoinInfo.Algorithm
   strIngredient1 = '';               // CoinInfo.Rank
   strIngredient2 = '';          // RAW.USD.IMAGEURL
   strIngredient3 = '';       // RAW.USD.CHANGE24HOUR(dollars)
   strIngredient4 = '';         // RAW.USD.HIGH24HOUR(dollars)
   strIngredient5 = '';       // RAW.USD.VOLUME24HOUR(dollars)
   strIngredient6 = '';             // RAW.USD.MKTCAP
   strIngredient7 = '';               // CoinInfo.Rank
   strIngredient8 = '';          // RAW.USD.IMAGEURL
   strIngredient9 = '';       // RAW.USD.CHANGE24HOUR(dollars)
   strIngredient10 = '';         // RAW.USD.HIGH24HOUR(dollars)
   strIngredient11 = '';       // RAW.USD.VOLUME24HOUR(dollars)
   strIngredient12 = '';     
   strIngredient13 = '';               // CoinInfo.Rank
   strIngredient14 = '';          // RAW.USD.IMAGEURL
   strIngredient15 = '';       // RAW.USD.CHANGE24HOUR(dollars)
   strIngredient16 = '';         // RAW.USD.HIGH24HOUR(dollars)
   strIngredient17 = '';       // RAW.USD.VOLUME24HOUR(dollars)
   strIngredient18 = '';     
   strIngredient19 = '';       // RAW.USD.VOLUME24HOUR(dollars)
   strIngredient20 = ''; 
   strMeasure1 = '';               // CoinInfo.Rank
   strMeasure2 = '';          // RAW.USD.IMAGEURL
   strMeasure3 = '';       // RAW.USD.CHANGE24HOUR(dollars)
   strMeasure4 = '';         // RAW.USD.HIGH24HOUR(dollars)
   strMeasure5 = '';       // RAW.USD.VOLUME24HOUR(dollars)
   strMeasure6 = '';             // RAW.USD.MKTCAP
   strMeasure7 = '';               // CoinInfo.Rank
   strMeasure8 = '';          // RAW.USD.IMAGEURL
   strMeasure9 = '';       // RAW.USD.CHANGE24HOUR(dollars)
   strMeasure10 = '';         // RAW.USD.HIGH24HOUR(dollars)
   strMeasure11 = '';               // CoinInfo.Rank
   strMeasure12 = '';          // RAW.USD.IMAGEURL
   strMeasure13 = '';       // RAW.USD.CHANGE24HOUR(dollars)
   strMeasure14 = '';         // RAW.USD.HIGH24HOUR(dollars)
   strMeasure15 = '';       // RAW.USD.VOLUME24HOUR(dollars)
   strMeasure16 = '';             // RAW.USD.MKTCAP
   strMeasure17 = '';               // CoinInfo.Rank
   strMeasure18 = '';          // RAW.USD.IMAGEURL
   strMeasure19 = '';       // RAW.USD.CHANGE24HOUR(dollars)
   strMeasure20 = ''; 
   strSource = '';
   dateModified = '';
}

export class Category {
   idCategory: '';
   strCategory: '';
   strCategoryThumb: '';
   strCategoryDescription: '';
}

export class CategoryDietList {
   strCategory: '';
}

export class MealAreaList {
   strArea: '';
}

export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  emailVerified: boolean;
}