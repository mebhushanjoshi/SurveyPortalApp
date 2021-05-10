import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-participantheader',
  templateUrl: './participantheader.component.html',
  styleUrls: ['./participantheader.component.css']
})
export class ParticipantheaderComponent implements OnInit {

  constructor(private loginService: LoginService) { }
  user;
  ngOnInit(): void {
  
  }
  
  logoutUser(){
    this.loginService.logout();
    location.reload();
  }

}
