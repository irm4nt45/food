import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { CookieService } from 'ngx-cookie';
import {AppConfig} from '../../../configs/app.config';
import { MatSnackBarConfig, MatSnackBar } from '@angular/material';
import { I18n } from '@ngx-translate/i18n-polyfill';
import { EndpointsConfig } from 'src/app/configs/endpoints.config';
import { endpoints } from 'src/app/configs/endpoints.config';
import { Observable, of } from 'rxjs';
import { LoggerService } from 'src/app/shared/services/logger.service';
import { catchError } from 'rxjs/operators';
import { Recipe, Day } from 'src/app/shared/interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DaysService {

  //private daysCollection: AngularFirestoreCollection<Recipe>;

  private taskDoc: AngularFirestoreDocument<Day>;
  days: AngularFirestoreCollection<Day>;

  constructor(private db: AngularFirestore,
              private snackBar: MatSnackBar,
              private i18n: I18n,
              private cookieService: CookieService) 
              {
                this.days = db.collection<Day>(endpoints.collection_endpoints);
              
    // this.daysCollection = this.afs.collection<Recipe>(EndpointsConfig.heroes.list, (day) => {
    //   return day.orderBy('default', 'desc').orderBy('likes', 'desc');
    // });
  }

  
  addDay(day) {
    //Add the new task to the collection
    this.days.add(day);
  } //addTask

  updateDay(id, update) {
    //Get the task document
    this.taskDoc = this.db.doc<Day>(`${endpoints.collection_endpoint}/${id}`);
    this.taskDoc.update(update);
 } //updateTask

 deleteDay(id) {
  //Get the task document
  this.taskDoc = this.db.doc<Day>(`${endpoints.collection_endpoint}/${id}`);
  //Delete the document
  this.taskDoc.delete();
} //deleteTask


  private static handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      LoggerService.log(`${operation} failed: ${error.message}`);

      if (error.status >= 500) {
        throw error;
      }

      return of(result);
    };
  }

  // getHeroes(): Observable<Hero[]> {
  //   return this.heroesCollection.snapshotChanges()
  //     .pipe(
  //       map((actions) => {
  //         return actions.map((action) => {
  //           const data = action.payload.doc.data();
  //           return new Hero({id: action.payload.doc.id, ...data});
  //         });
  //       }),
  //       tap(() => LoggerService.log(`fetched heroes`)),
  //       catchError(HeroService.handleError('getHeroes', []))
  //     );
  // }

  // getHero(id: string): Observable<any> {
  //   return this.afs.doc(EndpointsConfig.heroes.detail(id)).get().pipe(
  //     map((hero) => {
  //       return new Hero({id, ...hero.data()});
  //     }),
  //     tap(() => LoggerService.log(`fetched hero ${id}`)),
  //     catchError(HeroService.handleError('getHero', []))
  //   );
  // }

  // createHero(hero: Hero): Promise<DocumentReference> {
  //   return this.heroesCollection.add(JSON.parse(JSON.stringify(hero)));
  // }

  // updateHero(hero: Hero): Promise<void> {
  //   return this.afs.doc(EndpointsConfig.heroes.detail(hero.id)).update(JSON.parse(JSON.stringify(hero))).then(() => {
  //     LoggerService.log(`updated hero w/ id=${hero.id}`);
  //     this.showSnackBar(this.i18n({value: 'Saved', id: '@@saved'}));
  //   });
  // }

  // deleteHero(id: string): Promise<void> {
  //   return this.afs.doc(EndpointsConfig.heroes.detail(id)).delete();
  // }

  // showSnackBar(name): void {
  //   const config: any = new MatSnackBarConfig();
  //   config.duration = AppConfig.snackBarDuration;
  //   this.snackBar.open(name, 'OK', config);
  // }
}
