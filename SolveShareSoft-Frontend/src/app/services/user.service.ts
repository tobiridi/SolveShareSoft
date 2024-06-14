import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable, map } from 'rxjs';
import { AuthService } from './auth.service';
import { SoftwareList } from '../shared/software-list';
import { Category } from '../shared/category';

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

  public getAllSoftLists(): Observable<SoftwareList[]> {
    return this._httpClient.get<any>(`${this.apiURL}/softwarelist`)
      .pipe(map((value) => {
        const data = value.data;
        const allPublicSoftList: SoftwareList[] = [];

        data.forEach((element: any) => {
          const cat: Category = {
            categoryId: element.category_id,
            name: element.category_name
          };

          const softList: SoftwareList = {
            softwareListId: element.softwarelist_id,
            title: element.title,
            created: element.created,
            isPublic: element.is_public,
            nbrViews: element.nbr_views,
            category: cat,
            description: element.description,
            lastUpdate: element.last_update,
          };

          allPublicSoftList.push(softList);
        });
        
        return allPublicSoftList;
      }));
  }

}
