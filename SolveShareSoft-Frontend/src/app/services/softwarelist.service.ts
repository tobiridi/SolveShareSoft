import { Injectable } from '@angular/core';
import { SoftwareList } from '../shared/software-list';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Observable, flatMap, map } from 'rxjs';
import { Category } from '../shared/category';
import { User } from '../shared/user';
import { Software } from '../shared/software';

@Injectable({
  providedIn: 'root'
})
export class SoftwarelistService {
  private apiURL: string = `${environment.apiURL}/softwarelist`;

  constructor(private readonly _httpClient: HttpClient) { 
  }

  public createSoftList(softListData: any): Observable<any> {
    return this._httpClient.post<any>(this.apiURL, softListData)
      .pipe(map(response => {
        return response;
      }));
  }

  public deleteSoftList(softListId: number): Observable<any> {
    return this._httpClient.delete<any>(`${this.apiURL}/${softListId}`)
      .pipe(map(response => {
        console.log(response);
        return response;
      }));
  }

  public getAllPublicSoftList(): Observable<SoftwareList[]> {
    return this._httpClient.get<any>(this.apiURL)
      .pipe(map((value) => {
        const data = value.data;
        const allPublicSoftList: SoftwareList[] = [];

        data.forEach((element: any) => {
          const cat: Category = {
            categoryId: element.category_id,
            name: element.category_name
          };

          const owner: User = {
            username: element.owner,
          };

          const softList: SoftwareList = {
            category: cat,
            owner: owner,
            created: element.created,
            description: element.description,
            isPublic: true,
            lastUpdate: element.last_update,
            nbrViews: element.nbr_views,
            softwareListId: element.softwarelist_id,
            title: element.title,
            softwares: []
          };

          allPublicSoftList.push(softList);
        });
        
        return allPublicSoftList;
      }));
  }

  public getSoftwaresSoftList(softListId: number): Observable<SoftwareList | undefined> {
    return this._httpClient.get<any>(`${this.apiURL}/${softListId}/software`)
      .pipe(map((value) => {
        const data = value.data;
        let lastListId: number = 0;
        let userSoftList: SoftwareList | undefined = undefined;

        data.forEach((element: any) => {
          if(lastListId !== element.softwarelist_id) {
            lastListId = element.softwarelist_id;

            const cat: Category = {
              categoryId: element.category_id,
              name: element.category_name
            };
  
            const softList: SoftwareList = {
              category: cat,
              created: element.created,
              description: element.softList_desc,
              isPublic: true,
              lastUpdate: element.softList_last_upd,
              nbrViews: element.nbr_views,
              softwareListId: element.softwarelist_id,
              title: element.title,
              softwares: []
            };

            userSoftList = softList;
          }

          if(element.software_id !== null && userSoftList) {
              const soft: Software = {
                softwareId: element.software_id,
                softwareList: userSoftList,
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

              userSoftList.softwares.push(soft);
          }
        });
        
        return userSoftList;
      }));
  }

}
