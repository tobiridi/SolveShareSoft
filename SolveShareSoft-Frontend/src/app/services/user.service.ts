import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable, map } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiURL: string = `${environment.apiURL}/user`;

  constructor(private readonly _httpClient: HttpClient, private readonly _auth: AuthService) {
  }

  public register(userData: any): Observable<any> {
    return this._httpClient.post<any>(this.apiURL, userData);
  }

  public login(userData: any): Observable<any> {
    return this._httpClient.post<any>(`${this.apiURL}/login`, userData)
      .pipe(map(response => {
        const jwt = response.data.accessToken;
        localStorage.setItem('jwt', jwt);
        //log the user
        this._auth.loginUser();
      }));
  }

}
