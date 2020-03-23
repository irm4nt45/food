import { Component, OnInit } from '@angular/core';
import { Auth2Service } from 'src/app/shared/services/auth2.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(public authService: Auth2Service) { }

  ngOnInit() {
  }

}
