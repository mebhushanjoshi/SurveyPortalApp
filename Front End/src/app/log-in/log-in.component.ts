import { Router } from '@angular/router';
import { UserRoles } from './../models/UserRoles';
import { LoginService } from './../services/login.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  credentials = {
    userName: '',
    password: '',
  }
  userName: string;
  pass;
  role: UserRoles;
  cpassword: string;
  roleString: string;
  isloginSurveyor: boolean = false;
  isloginParticipant: boolean = false;
  isRegistration: boolean = false;
  isSelecting: boolean = true;
  message: string;

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    //console.log("in onsubmit" + this.credentials.userName + " " + this.credentials.password);
    this.loginService.logout();
    this.message="";
    if ((this.credentials.userName != null && this.credentials.password != null) && (this.credentials.userName != '' && this.credentials.password != '')) {
      // console.log("save to server");

      this.loginService.generateToken(this.credentials).subscribe(
        (response: any) => {
          //console.log(response.token);
          this.loginService.loginUser(response.token);
          if(this.loginService.getToken() != 'thisIsNotTheValidToken'){
            this.router.navigate(['/home']);
          }
          else{
            window.alert("Invalid username or password");
            this.message="Invalid username or password";
            this.loginService.logout();
          }
        },
        error => {
          window.alert("Invalid username or password");
          this.message="Invalid username or password";
        }
      )
    }
    else {
      console.log("Empty Form");
    }
  }
  onSubmitParticipant(){

    //console.log("in onsubmit2" + this.credentials.userName + " " + this.credentials.password);
    this.loginService.logout();
    if ((this.credentials.userName != null && this.credentials.password != null) && (this.credentials.userName != '' && this.credentials.password != '')) {
      //console.log("save to server");

      this.loginService.generateToken(this.credentials).subscribe(
        (response: any) => {
          //console.log(response.token);
          this.loginService.loginUser(response.token);
            // window.location.href = "/participanthome";
            if(this.loginService.getToken() != 'thisIsNotTheValidToken'){
              this.router.navigate(['/participanthome']);
            }
            else{
              window.alert("Invalid username or password");
              this.message="Invalid username or password";
              this.loginService.logout();
            }
        },
        error => {
          window.alert("Invalid username or password");
          this.message="Invalid username or password";
        }
      )
    }
    else {
      console.log("Empty Form");
    }
  }

  onSubmitReg(){

  }

  showRegForm() {
    this.isloginSurveyor = false;
    this.isloginParticipant = false;
    this.isRegistration = true;
    this.isSelecting = false;
  }
  showSurveyorLogin(){
    this.isloginSurveyor = true;
    this.isloginParticipant = false;
    this.isRegistration = false;
    this.isSelecting = false;
  }
  showParticipantLogin(){
    this.isloginSurveyor = false;
    this.isloginParticipant = true;
    this.isRegistration = false;
    this.isSelecting = false;
  }

  showSelection(){
    this.isloginSurveyor = false;
    this.isloginParticipant = false;
    this.isRegistration = false;
    this.isSelecting = true;
  }
}