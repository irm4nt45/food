import { Component, OnInit, ViewChild } from '@angular/core';
//import { moveIn, fallIn } from '../router.animations';
import { IgxSnackbarComponent } from 'igniteui-angular';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss'],
  //animations: [moveIn(), fallIn()],
// tslint:disable-next-line: use-host-property-decorator
  //host: { '[@moveIn]': '' }
})
export class EmailComponent implements OnInit {
  forgotPassword:boolean = false;
  return = '';
  error: any;
  email: any;
  password: any;
  @ViewChild('snack', { static: true }) public snack: IgxSnackbarComponent;

  constructor(public afAuth: AngularFireAuth, private router: Router, private route: ActivatedRoute) {
    this.afAuth.authState.subscribe(auth => {
      if (auth) {
        this.router.navigateByUrl(this.return);
      }
    });
  }

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => this.return = params['return'] || '/home');
  }

  onSubmit(formData) {
    if (formData.valid) {
      this.afAuth.auth.signInWithEmailAndPassword(formData.value.email, formData.value.password).then(
        (success) => {
          this.router.navigate([this.return]);
        }).catch(
          (err) => {
            this.forgotPassword = true;
            this.snack.show();
            this.error = err;
          });
    }
  }
}

