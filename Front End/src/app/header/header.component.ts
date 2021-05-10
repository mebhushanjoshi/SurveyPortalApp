import { LogInComponent } from './../log-in/log-in.component';
import { LoginService } from './../services/login.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private loginService: LoginService) { }
  user;
  ngOnInit(): void {
  
  }
  
  logoutUser(){
    this.loginService.logout();
    location.reload();
  }
}
