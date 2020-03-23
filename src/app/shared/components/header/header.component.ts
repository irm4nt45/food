import {Component, Inject, OnInit, ViewChild, HostListener} from '@angular/core';
// import {APP_CONFIG} from '../../../configs/app.config';
import {ProgressBarService} from '../../services/progress-bar.service';
import {NavigationEnd, Router, NavigationStart} from '@angular/router';
import {CookieService} from 'ngx-cookie';
import { IgxNavigationDrawerComponent, IgxLayoutDirective } from 'igniteui-angular';
import { filter } from 'rxjs/operators';

import { routes } from '../../../app-routing.module';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

  title = 'ng-universal-example';
  public isIE;
  name: any;
  public innerWidth: any;
  public darkTheme = false;
  public topNavLinks: Array<{
     path: string,
     name: string,
     icon: string,
     subItem: boolean
  }> = [];




  selectedLanguage: string;
  progressBarMode: string;
  currentUrl: string;
  languages: any[];






  public localData;
  isBrowser: boolean;

  @ViewChild(IgxNavigationDrawerComponent, { static: true }) public navdrawer: IgxNavigationDrawerComponent;
  @ViewChild(IgxLayoutDirective, { read: IgxLayoutDirective, static: true }) public layout: IgxLayoutDirective;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
     this.innerWidth = window.innerWidth;
  }







  constructor(
   //   @Inject(APP_CONFIG) public appConfig: any,
              private progressBarService: ProgressBarService,
              private cookieService: CookieService,
              private router: Router,
              public afAuth: AngularFireAuth) {
    this.languages = [{name: 'en', label: 'English'}, {name: 'es', label: 'Español'}];

    this.isIE = /trident\//i.test(window.navigator.userAgent);
     for (const route of routes) {
        if (route.path && route.data && route.path.indexOf('*') === -1) {
           this.topNavLinks.push({
              name: route.data.text,
              path: '/' + route.path,
              icon: route.data.iconName,
              subItem: route.data.subItem
           });
        }
  }

  this.afAuth.authState.subscribe(auth => {
    if (auth) {
       this.name = auth;
    }
 });
  }

  ngOnInit() {
    this.selectedLanguage = this.cookieService.get('language') || 'en';

    this.progressBarService.getUpdateProgressBar().subscribe((mode: string) => {
      this.progressBarMode = mode;
    });

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.url;
        console.log(this.currentUrl);
      }
    });






    document.body.classList.add('light-theme');
     document.body.style.background = '#eee';
     this.router.events
        .pipe(filter((x) => x instanceof NavigationStart))
        .subscribe((event: NavigationStart) => {
           if (event.url !== '/' && !this.navdrawer.pin) {
              // Close drawer when selecting a view on mobile (unpinned)
              this.navdrawer.close();
           }
        });

     this.innerWidth = window.innerWidth;

  }

  changeLanguage(language: string): void {
    this.cookieService.put('language', language);
    this.selectedLanguage = language;
  }









  public changeTheme(dark?: boolean) {
    if (dark) {
       this.darkTheme = true;
       document.body.classList.remove('light-theme');
       document.body.classList.add('dark-theme');
       document.body.style.background = '#414141';
    } else {
       document.body.classList.remove('dark-theme');
       document.body.classList.add('light-theme');
       document.body.style.background = '#eee';
       this.darkTheme = false;
    }
 }


 public logout() {
  this.afAuth.auth.signOut();
  this.router.navigateByUrl('/');
}

public login() {
  this.router.navigate(['/login']);
}
}
