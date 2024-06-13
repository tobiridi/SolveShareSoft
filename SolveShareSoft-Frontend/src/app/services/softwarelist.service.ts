import { Injectable } from '@angular/core';
import { SoftwareList } from '../shared/software-list';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Observable, map } from 'rxjs';
import { Category } from '../shared/category';
import { User } from '../shared/user';

@Injectable({
  providedIn: 'root'
})
export class SoftwarelistService {
  private apiURL: string = `${environment.apiURL}/softwarelist`;
  private allPublicSoftList: SoftwareList[];

  constructor(private readonly _httpClient: HttpClient) { 
    this.allPublicSoftList = [];
  }

  public getAllPublicSoftList(): Observable<SoftwareList[]> {
    return this._httpClient.get<any>(this.apiURL)
      .pipe(map((value) => {
        const data = value.data;

        data.forEach((element: any) => {
          const cat: Category = {
            categoryId: element.category_id,
            name: element.category_name
          }

          const owner: User = {
            username: element.owner,
          }

          const softList: SoftwareList = {
            category: cat,
            owner: owner,
            created: element.created,
            description: element.description,
            isPublic: true,
            lastUpdate: element.last_update,
            nbrViews: element.nbr_views,
            softwareListId: element.softwarelist_id,
            title: element.title
          };

          this.allPublicSoftList.push(softList);

        });
        
        return this.allPublicSoftList;
      }));
  }
}
