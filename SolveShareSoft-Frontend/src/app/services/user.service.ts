import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiURL = environment.apiURL;

  constructor(private readonly httpClient: HttpClient) {
  }

  public register(value: any): Observable<object> {
    return this.httpClient.post(`${this.apiURL}/user`, value);
  }

}
