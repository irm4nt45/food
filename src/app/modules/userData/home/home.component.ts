import { Component, OnInit, Renderer2, ChangeDetectorRef, ViewChild, ElementRef, IterableDiffers } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { DaysService } from './../shared/days.service';
import { Observable } from 'rxjs';
import { endpoints } from 'src/app/configs/endpoints.config';
import { Day, Recipe, state } from 'src/app/shared/interfaces/interfaces';
import { IDropBaseEventArgs, IDropDroppedEventArgs } from 'igniteui-angular';
import { Auth2Service } from 'src/app/shared/services/auth2.service';
import * as moment from 'moment';
import { TheMealDbService } from 'src/app/shared/services/the-meal-db.service';
import { flattenObject, fillFromJSON } from '../../core/utils';

// enum state {
//    toDo = "toDo",
//    inProgress = "inProgress",
//    done = "done"
//  }
 
//  export class IListItemClass {
//     id: string;
//     text: string;
//     state: state;
//     constructor(
//         id: string,
//         text: string,
//         state: state
//     ) {}
//  }

//  interface IListItem {
//    id: string;
//    text: string;
//    state: state;
//  }


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  days: Observable<any[]>;
  myDays: string;
  recipes: Recipe[];
  editMode: boolean = false;
  dayToEdit: any = {};


  public reicpesFromDbList : Recipe[];
    public day0List: Recipe[] = [];
    public day1List: Recipe[] = [];
    public day2List: Recipe[] = [];
    private dragObj;
    private dummyObj;
    private lastDragEnterList: string;
    private currentList: string;


    @ViewChild("recipesFromDb", { static: true })
    private recipesFromDb: ElementRef;

    @ViewChild("day0", { static: true })
    private day0: ElementRef;

    @ViewChild("day1", { static: true })
    private day1: ElementRef;

    @ViewChild("day2", { static: true })
    private day2: ElementRef;

    differ: any;
    firebaseArray1;
    firebaseArray2;
    firebaseArray3;
    fbArray1;
    fbArray2;
    fbArray3;
    counter1 = -1;
    counter2 = -1;
    counter3 = -1;
    dummyArray1: boolean = false;
    dummyArray2: boolean = false;
    dummyArray3: boolean = false;

    recipesRow: Recipe[];
    str: string;
    recipeListText = [];


    startingDay = 0;
    today;
    tomorrow;
    dayAfterTomorrow;

    mToday;
    mTomorrow;
    mDayAfterTomorrow;


  constructor(
    private db: AngularFirestore, 
    private daysService: DaysService, 
    private renderer: Renderer2,
    private cdr: ChangeDetectorRef, 
    private auth : Auth2Service,
    private differs: IterableDiffers,
    private recipeService: TheMealDbService
    ) {
        this.differ = differs.find([]).create(null);
     }

     ngDoCheck() {
        const change1 = this.differ.diff(this.day0List);
        if (change1) {
            this.firebaseArray1 = JSON.stringify(this.day0List);
            this.fbArray1 = JSON.parse(this.firebaseArray1);
            if(this.fbArray1.length > this.counter1 && this.counter1 != -1){
                for (var i = 0; i < this.fbArray1.length; i++) {
                    console.log(this.fbArray1[i]['strMeal']);
                    if(this.fbArray1[i]['strMeal'] == 'dummy'){
                        this.dummyArray1 = true;
                        break;
                    }          
               }
                if(!this.dummyArray1){
                    console.log('************************************************************************************');
                    //update to firebase database
                }
            } else if(this.dummyArray1 && this.fbArray1.length == this.counter1){
                this.dummyArray1 = false;
                for (var i = 0; i < this.fbArray1.length; i++) {
                    console.log(this.fbArray1[i]['strMeal']);
                    if(this.fbArray1[i]['strMeal'] == 'dummy'){
                        this.dummyArray1 = true;
                        break;
                    }
                }
                if(!this.dummyArray1){
                    console.log('************************************************************************************');
                    //update to firebase database
                }
            } else if(this.fbArray1.length < this.counter1){
                this.dummyArray1 = false;
            }
            this.counter1 = this.fbArray1.length;
        }


        const change2 = this.differ.diff(this.day1List);
        if (change2) {
            this.firebaseArray2 = JSON.stringify(this.day1List);
            this.fbArray2 = JSON.parse(this.firebaseArray2);
            if(this.fbArray2.length > this.counter2 && this.counter2 != -1){
                for (var i = 0; i < this.fbArray2.length; i++) {
                    console.log(this.fbArray2[i]['strMeal']);
                    if(this.fbArray2[i]['strMeal'] == 'dummy'){
                        this.dummyArray2 = true;
                        break;
                    }          
               }
                if(!this.dummyArray2){
                    console.log('************************************************************************************2');
                    //update to firebase database
                }
            } else if(this.dummyArray2 && this.fbArray2.length == this.counter2){
                this.dummyArray2 = false;
                for (var i = 0; i < this.fbArray2.length; i++) {
                    console.log(this.fbArray2[i]['strMeal']);
                    if(this.fbArray2[i]['strMeal'] == 'dummy'){
                        this.dummyArray2 = true;
                        break;
                    }
                }
                if(!this.dummyArray2){
                    console.log('************************************************************************************2');
                    //update to firebase database
                }
            } else if(this.fbArray2.length < this.counter2){
                this.dummyArray2 = false;
            }
            this.counter2 = this.fbArray2.length;
        }
        

        const change3 = this.differ.diff(this.day2List);
        if (change3) {
            this.firebaseArray3 = JSON.stringify(this.day2List);
            this.fbArray3 = JSON.parse(this.firebaseArray3);
            if(this.fbArray3.length > this.counter3 && this.counter3 != -1){
                for (var i = 0; i < this.fbArray3.length; i++) {
                    console.log(this.fbArray3[i]['strMeal']);
                    if(this.fbArray3[i]['strMeal'] == 'dummy'){
                        this.dummyArray3 = true;
                        break;
                    }          
               }
                if(!this.dummyArray3){
                    console.log('************************************************************************************3');
                    //update to firebase database
                }
            } else if(this.dummyArray3 && this.fbArray3.length == this.counter3){
                this.dummyArray3 = false;
                for (var i = 0; i < this.fbArray3.length; i++) {
                    console.log(this.fbArray3[i]['strMeal']);
                    if(this.fbArray3[i]['strMeal'] == 'dummy'){
                        this.dummyArray3 = true;
                        break;
                    }
                }
                if(!this.dummyArray3){
                    console.log('************************************************************************************3');
                    //update to firebase database
                }
            } else if(this.fbArray3.length < this.counter3){
                this.dummyArray3 = false;
            }
            this.counter3 = this.fbArray3.length;
        }
      }

  ngOnInit() {
      

    this.loadRandomRecipes();

    




this.formBoxes();
//need to implement get from firebase database method and to assign values to three lists. 
//then display the items of lists at the boxes; also connect this method to addThreeDays or remove three days methods
      




    //importuojame day is firebaso. Tiek dienu, kiek yra puslapyje.
    //Sugalvoti kaip atnaujinti arrayjus, jei atsiranda scrollas.

    //1. variantas ngOnInit, 
    //2. kitas variantas sukurti array of array, kuriame prisidetu naujos reiksmes pakeitus diena.

//    this.toDoList = [
//       { id: "STR-000132", text: "Implement chat bubble", state: state.toDo },
//       { id: "STR-000097", text: "Implement sticky header", state: state.toDo },
//       { id: "STR-000191", text: "Change trial days to credit", state: state.toDo }

//   ];
//   this.inProgressList = [
//       { id: "STR-000124", text: "Implement fback widget", state: state.inProgress },
//       { id: "STR-000121", text: "Add analytics", state: state.inProgress }
//   ];
//   this.doneList = [
//       { id: "STR-000129", text: "Add SSL to account pages", state: state.done }
//   ];


  this.dragObj = null;
  this.dummyObj = null;
  this.lastDragEnterList = "";
  this.currentList = "";

    this.days = this.db.collection(endpoints.collection_endpoint).snapshotChanges()
    .map(actions => {
       return actions.map(a => {
         //Get document data
         const data = a.payload.doc.data() as Day;
         //Get document id
         const id = a.payload.doc.id;
         //Use spread operator to add the id to the document data
         return { id, ...data };
       });
    });
  }


  private loadRandomRecipes() {
    this.recipeService.search10RandomMeal()
     .subscribe(res => {
       console.log(res);
      // const keys = res.headers.keys();
      // this.headers = keys.map(key =>
      //   `${key}: ${res.headers.get(key)}`);

        this.recipesRow = this.transformReceipe(res.body);
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

          console.log('--------------------------------------' + newRecipe.state);

          if(newRecipe.state = ''){
              newRecipe.state = state.recipesDb;

          }
          console.log('--------------------------------------' + newRecipe.state);

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

  ngAfterViewInit() {
    //console.log('after view init', this.toDoList);
  }

  public onStateContainerEnter(event: IDropDroppedEventArgs) {
   // If we have entered another list container, we have to remove the "dummy" object from the previous one
   console.log('------------------------------------------------------------------1 ' + this.currentList + ' ' + event.owner.element.nativeElement);

   if (this.currentList !== event.owner.element.nativeElement.strMeal) {
       this[this.currentList] = this[this.currentList].filter((item) => {
           return item.strMeal !== "dummy";
       });
       this.cdr.detectChanges();
       this.currentList = event.owner.element.nativeElement.strMeal;
       this.dummyObj = null;
   }
   // Add the blue container hightlight when an item starts being dragged
   this.renderer.addClass(event.owner.element.nativeElement, "dragHovered");

   console.log('------------------------------------------------------------------1');

}

public onStateContainerLeave(event: IDropDroppedEventArgs) {
   // This event also gets raised when the user drags a task over another task tile.
   // That means we have to re-apply the "dragHovered" class in the `onItemEnter` event handler
   this.renderer.removeClass(event.owner.element.nativeElement,  "dragHovered");
   console.log('------------------------------------------------------------------2');
}

public dragStartHandler(event) {
   // We have to save the dragStartList so we could remove the dragged item from it later, when it gets dropped
   this.currentList = event.owner.element.nativeElement.dataset.state + "List";

   console.log('------------------------------------------------------------------ ' + this.currentList + ' ' + event.owner.element.nativeElement.dataset );

   console.log('------------------------------------------------------------------ ' + this.currentList + ' ' + event.owner.element.nativeElement.dataset.state );

   this.lastDragEnterList = this.currentList;
   this.dragObj = this[this.currentList].filter((elem) => {
    console.log('------------------------------------------------------------------3');

       return elem.strMeal === event.owner.element.nativeElement.strMeal;
   })[0];
}

public dragEndHandler(event) {
   this.day0List = this.day0List.filter((x) => {
       return x.strMeal !== "dummy";
   });
   this.day1List = this.day1List.filter((x) => {
       return x.strMeal !== "dummy";
   });
   this.day2List = this.day2List.filter((x) => {
       return x.strMeal !== "dummy";
   });
   
}

public onItemEnter(event: IDropBaseEventArgs) {
   // Applying the container highlighting again
   const listContainer = event.owner.element.nativeElement.dataset.state;
   this.renderer.addClass(this[listContainer].nativeElement, "dragHovered");

   const currentList = event.owner.element.nativeElement.dataset.state + "List";
   const currentItemIndex = this[currentList].findIndex((item) => {
       return item.strMeal === event.owner.element.nativeElement.strMeal;
   });
   // Checking if items in the same list are being reordered
   if (this.lastDragEnterList === currentList) {
       const draggedItemIndex = this[currentList].findIndex((item) => {
           return item.strMeal === this.dragObj.strMeal;
       });
       this.swapTiles(draggedItemIndex, currentItemIndex, currentList);
   } else {
       // We need a hidden dummy object that would make an empty space for the dragged element in the list
       if (!this.dummyObj) {
           this.dummyObj = {strMeal: "dummy", text: "", state: event.owner.element.nativeElement.dataset.state};
           const newCurrentList = [
               ...this[currentList].slice(0, currentItemIndex),
               this.dummyObj,
               ...this[currentList].slice(currentItemIndex)
           ];
           this[currentList] = newCurrentList;
           this.cdr.detectChanges();

       } else {
           const dummyObjIndex = this[currentList].findIndex((item) => {
               return item.strMeal === "dummy";
           });
           if (dummyObjIndex !== -1) {
               this.swapTiles(dummyObjIndex, currentItemIndex, currentList);
           }
       }
   }
   console.log('------------------------------------------------------------------4');
}

public onItemLeave(event: IDropBaseEventArgs) {
   const listContainer = event.owner.element.nativeElement.dataset.state;
   this.renderer.removeClass(this[listContainer].nativeElement, "dragHovered");
   console.log('------------------------------------------------------------------5');
}

public onItemDropped(event: IDropDroppedEventArgs) {
   const dropListState = event.owner.element.nativeElement.strMeal;
   const dragListState = event.drag.element.nativeElement.dataset.state + "List";
   const dummyItemIndex = this[dropListState].findIndex((item) => {
    console.log('------------------------------------------------------------------61');
       return item.strMeal === "dummy";
   });
   if (dropListState !== dragListState) {
       // The state of the dragged object should be updated before inserting it in the dropped list
       this.dragObj.state = dropListState.substring(0, dropListState.length - 4);
       this[dragListState] = this[dragListState].filter((item) => {
        console.log('------------------------------------------------------------------62');
           return item.strMeal !== this.dragObj.strMeal;
       });
       // Check if there is a dummy item and replace it with the dragged one
       if (dummyItemIndex !== -1) {
           this[dropListState].splice(dummyItemIndex, 1, this.dragObj);
       } else {
           this[dropListState].push(this.dragObj);
       }
   }

   this.auth.doSomething();
//    console.log('onItemDropped                                 ' + this.dragListState);

   this.dragObj = null;
   // The default browser drag behavior should be cancelled
   event.cancel = true;
   console.log('------------------------------------------------------------------6');
}

private swapTiles(currentIndex: number, targetIndex: number, itemList: string): void {
   const tempObj = this[itemList][currentIndex];
   this[itemList].splice(currentIndex, 1);
   this[itemList].splice(targetIndex, 0, tempObj);
   this.cdr.detectChanges();
   console.log('------------------------------------------------------------------7');
}




















  edit(day) {
    console.log(day);
    //Set taskToEdit and editMode
    this.dayToEdit = day;
    this.editMode = true;
    //Set form value
    this.myDays = day.date;
  } //edit

  saveTask() {
    if (this.myDays !== null) {
       //Get the input value
       let day = {
          date: this.myDays
       };
       if (!this.editMode) {
          console.log(day);
          this.daysService.addDay(day);
       } else {
          //Get the task id
          let dayId = this.dayToEdit.id;
          //update the task
          this.daysService.updateDay(dayId, day);
       }
       //set edit mode to false and clear form
       this.editMode = false;
       this.myDays = '';
    }
 } //saveTask


 //perrasoma diena(id) su pridetu nauju receptu.
 //prie tos dienos receptu array pridedama nauja reiksme.
 saveRecipeToDayrecipe(recipe: Recipe) {
  if (this.myDays !== null) {
     //Get the input value
     let day = {
        date: this.myDays
        //recipes: 
        //sukuriamas kazkaip is id

     };
     if (!this.editMode) {
        console.log(day);
        this.daysService.addDay(day);
     } else {
        //Get the task id
        let dayId = this.dayToEdit.id;
        //update the task
        this.daysService.updateDay(dayId, day);
     }
     //set edit mode to false and clear form
     this.editMode = false;
     this.myDays = '';
  }
} //saveTask

 deleteTask(day) {
  //Get the task id
  let dayId = day.id;
  //delete the task
  this.daysService.deleteDay(dayId);
} //deleteTask
////////////////////////////////////////////////////////////////////////////////////firebase database



addThreeDays(){
    this.startingDay += 3; 
}
removeThreeDays(){
    this.startingDay -= 3;
}
getDay(){
    return this.startingDay;
}

formBoxes(){
    this.startingDay = this.getDay();

    this.today = moment().add(this.startingDay, 'days').format('dddd Do');
    this.tomorrow = moment().add(this.startingDay + 1, 'days').format('dddd Do'); 
    this.dayAfterTomorrow = moment().add(this.startingDay + 2, 'days').format('dddd Do'); 

    this.mToday = moment().add(this.startingDay, 'days').format('YYYYMMDD');
    this.mTomorrow = moment().add(this.startingDay + 1, 'days').format('YYYYMMDD');
    this.mDayAfterTomorrow = moment().add(this.startingDay + 2, 'days').format('YYYYMMDD'); 
    console.log(this.today);
    console.log(this.mToday);

    console.log(this.tomorrow);

    console.log(this.mDayAfterTomorrow);
}
}
