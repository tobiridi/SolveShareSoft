import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable, last, map } from 'rxjs';
import { AuthService } from './auth.service';
import { SoftwareList } from '../shared/software-list';
import { Category } from '../shared/category';
import { Software } from '../shared/software';

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
            softwares: []
          };

          allPublicSoftList.push(softList);
        });
        
        return allPublicSoftList;
      }));
  }

  public getSoftListsWithSofts(): Observable<SoftwareList[]> {
    return this._httpClient.get<any>(`${this.apiURL}/softwarelist/software`)
      .pipe(map((value) => {
        const data = value.data;
        const allSoftLists: SoftwareList[] = [];
        let lastListId: number = 0;

        data.forEach((element: any) => {
          //add a new software list
          if(lastListId !== element.softwarelist_id) {
            lastListId = element.softwarelist_id;

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
              description: element.softList_desc,
              lastUpdate: element.softList_last_upd,
              softwares: []
            };

            allSoftLists.push(softList);
          }

          //add software in the current software list
          //value is null when no software in the current software list
          if(element.software_id !== null) {
            const lastList: SoftwareList | undefined = allSoftLists.pop();
  
            if(lastList) {
              const soft: Software = {
                softwareId: element.software_id,
                softwareList: lastList,
                name: element.name,
                lang: element.lang,
                link: element.link,
                nbrDownloads: element.nbr_downloads,
                size: element.size,
                sizeUnit: element.size_unit,
                description: element.soft_desc,
                lastUpdate: element.soft_last_upd,
                version: element.version
              };
  
              lastList.softwares.push(soft);
              allSoftLists.push(lastList);
            }
          }

        });
        
        return allSoftLists;
      }));
  }

}
