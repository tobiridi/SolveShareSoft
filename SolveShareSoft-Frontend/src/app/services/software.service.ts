import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SoftwareService {
  private apiURL: string = `${environment.apiURL}/software`;

  constructor(private readonly _httpClient: HttpClient) {
   }

   public createSoft(softData: any): Observable<any> {
    return this._httpClient.post<any>(this.apiURL, softData)
      .pipe(map(response => {
        return response;
      }));
  }

  public deleteSoft(softId: number): Observable<any> {
    return this._httpClient.delete<any>(`${this.apiURL}/${softId}`)
      .pipe(map(response => {
        return response;
      }));
  }
}
