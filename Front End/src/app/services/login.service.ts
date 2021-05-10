import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

    
    baseUrl: string = `${environment.baseUrl}`;

    constructor(private http: HttpClient) {}

    //generate token
    generateToken(credentials: any)
    {
        //return this.http.post(`http://localhost:8070/login`,credentials) //http://localhost:8070/login
       return this.http.post(`${this.baseUrl}login`,credentials);
    }


    //for login
    loginUser(token) {
        localStorage.setItem("token", token);
        return true;
    }

    //check login status
    isLoggedIn() {
        let token = localStorage.getItem("token");
        if(token==undefined || token==='' || token==null)
            return false;
        else
            return true;
    }

    //logout the user
    logout(){
        localStorage.removeItem('token');
        return true;
    }

    //getting token
    getToken(){
        return localStorage.getItem("token");
    }
}