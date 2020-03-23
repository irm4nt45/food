import { Component, OnInit } from '@angular/core';
import { Auth2Service } from 'src/app/shared/services/auth2.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent implements OnInit {

  constructor(public authService: Auth2Service) { }

  ngOnInit() {
  }

}
