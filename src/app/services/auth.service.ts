import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { User } from '../models/auth/User';
import { Login } from "../models/auth/Login";
import { Register } from "../models/auth/Register";
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _user: BehaviorSubject<User | null>;
  public user: Observable<User | null>;

  constructor(
    private router: Router,
    private apiService: ApiService
  ) {
    this._user = new BehaviorSubject<User | null>(null);
    this.user = this._user.asObservable();
    
    const cachedUser = localStorage.getItem("user");
    if (cachedUser !== null) {
      const user = new User();
      Object.assign(user, JSON.parse(cachedUser));
      this._user.next(user);
      if(!user.expires || new Date(user.expires) < new Date()) {
        this.refreshToken().subscribe();
      }
    }
  }

  public get userValue() {
    return this._user.value;
  }

  register(register: Register) {
    return this.apiService.post("auth/register", register);
  }

  login(login: Login) {
    return this.apiService.post("auth/signin", login).pipe(
      tap(response => {
        const userFromResponse = this.GetUserFromResponse(response);

        this._user.next(userFromResponse);
        localStorage.setItem("user", JSON.stringify(this.userValue));

        this.startRefreshTokenTimer();
        return response;
      })
    );
  }

  refreshToken() {
    return this.apiService.post("auth/refreshToken", {}).pipe(
      map(response => {
        const userFromResponse = this.GetUserFromResponse(response);

        this._user.next(userFromResponse);
        localStorage.setItem("user", JSON.stringify(this.userValue));

        this.startRefreshTokenTimer();
        return response;
      })
    )
  }

  logout() {
    if (this.userValue) {
      this.apiService.post("auth/revokeToken", {}).subscribe();
    }
    this.stopRefreshTokenTimer();
    this._user.next(null);
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  private GetUserFromResponse(response: any) {
    const user: User = new User();
    const jwtToken = JSON.parse(atob(response.accessToken.split('.')[1]));
    jwtToken.expires = new Date(jwtToken.exp * 1000);
    Object.assign(user, jwtToken);
    user.accessToken = response.accessToken;
    return user;
  }

  private refreshTokenTimeout?: NodeJS.Timeout;

  private startRefreshTokenTimer() {
    // parse json object from base64 encoded jwt token
    const jwtBase64 = this.userValue!.accessToken!.split('.')[1];
    const jwtToken = JSON.parse(atob(jwtBase64));

    // set a timeout to refresh the token a minute before it expires
    const expires = new Date(jwtToken.exp * 1000);
    const timeout = expires.getTime() - Date.now() - (60 * 1000);
    this.refreshTokenTimeout = setTimeout(() => this.refreshToken().subscribe(), timeout);
  }

  private stopRefreshTokenTimer() {
    clearTimeout(this.refreshTokenTimeout);
}
}
