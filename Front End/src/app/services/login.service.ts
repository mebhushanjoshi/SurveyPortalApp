import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LoginService {

    baseUrl: string = `${environment.baseUrl}`;
    /**
     * Constructor with injection of HttpClient to access end point APIs
     * @param http Object of HttpClient
     */
    constructor(private http: HttpClient) { }
    /**
     * Authenticate and generate token
     * @param credentials Login data from login page user id and password
     * @returns token
     */
    generateToken(credentials: any) {
        return this.http.post(`${this.baseUrl}login`, credentials);  //http://localhost:8070/login
    }
    /**
     * Login the user
     * @param token the generated token
     * @returns true as user logged in 
     */
    loginUser(token) {
        localStorage.setItem("token", token);
        return true;
    }
    /**
     * Check login status of a user
     * @returns true if logged in and false if not
     */
    isLoggedIn() {
        let token = localStorage.getItem("token");
        if (token == undefined || token === '' || token == null)
            return false;
        else
            return true;
    }
    /**
     * logout the user 
     * @returns true as user logged out
     */
    logout() {
        localStorage.removeItem('token');
        return true;
    }
    /**
     * send the generated token to the caller
     * @returns genereted token
     */
    getToken() {
        return localStorage.getItem("token");
    }
}