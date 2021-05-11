import { Router } from '@angular/router';
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
  isloginSurveyor: boolean = false;
  isloginParticipant: boolean = false;
  isRegistration: boolean = false;
  isSelecting: boolean = true;
  message: string;
  /**
   * Constructor injecting LOginSer and Router classes
   * @param loginService needed to use login service methods
   * @param router needed for routing
   */
  constructor(private loginService: LoginService, private router: Router) { }
  /**
   * 
   */
  ngOnInit(): void {
  }
  /**
   * This method get a valid token for the Surveyor and help to loggin or deny the request.
   */
  onSubmit() {
    this.loginService.logout();
    this.message = "";
    if ((this.credentials.userName != null && this.credentials.password != null) && (this.credentials.userName != '' && this.credentials.password != '')) {
      this.loginService.generateToken(this.credentials).subscribe(
        (response: any) => {
          this.loginService.loginUser(response.token);
          if (this.loginService.getToken() != 'thisIsNotTheValidToken') {
            this.router.navigate(['/home']);
          }
          else {
            window.alert("Invalid username or password");
            this.message = "Invalid username or password";
            this.loginService.logout();
          }
        },
        error => {
          window.alert("Invalid username or password");
          this.message = "Invalid username or password";
        }
      )
    }
    else {
      console.log("Empty Form");
    }
  }
  /**
   * This method get a valid token for the Participant and help to loggin or deny the request.
   */
  onSubmitParticipant() {
    this.loginService.logout();
    if ((this.credentials.userName != null && this.credentials.password != null) && (this.credentials.userName != '' && this.credentials.password != '')) {
        this.loginService.generateToken(this.credentials).subscribe(
        (response: any) => {
          this.loginService.loginUser(response.token);
          if (this.loginService.getToken() != 'thisIsNotTheValidToken') {
            this.router.navigate(['/participanthome']);
          }
          else {
            window.alert("Invalid username or password");
            this.message = "Invalid username or password";
            this.loginService.logout();
          }
        },
        error => {
          window.alert("Invalid username or password");
          this.message = "Invalid username or password";
        }
      )
    }
    else {
      console.log("Empty Form");
    }
  }
  /**
   * Show the login form for Surveyor
   */
  showSurveyorLogin() {
    this.isloginSurveyor = true;
    this.isloginParticipant = false;
    this.isRegistration = false;
    this.isSelecting = false;
  }
  /**
   * Show the login form for Participant
   */
  showParticipantLogin() {
    this.isloginSurveyor = false;
    this.isloginParticipant = true;
    this.isRegistration = false;
    this.isSelecting = false;
  }
  /**
   * Show the login foem for Surveyor
   */
  showSelection() {
    this.isloginSurveyor = false;
    this.isloginParticipant = false;
    this.isRegistration = false;
    this.isSelecting = true;
  }
  /**
   * Show a Selection page for login
   */
  showRegForm() {
    this.isloginSurveyor = false;
    this.isloginParticipant = false;
    this.isRegistration = true;
    this.isSelecting = false;
  }
}