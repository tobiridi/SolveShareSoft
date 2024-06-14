import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../shared/category';
import { environment } from '../../environments/environment.development';
import { BehaviorSubject, Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiURL: string = `${environment.apiURL}/category`;

  constructor(private readonly _httpClient: HttpClient) {
   }

   public getAllCategories(): Observable<Category[]> {
    return this._httpClient.get<any>(this.apiURL)
        .pipe(map(value => {
          const data = value.data;
          const allCat: Category[] = [];

          data.forEach((element: any) => {
            const cat: Category = {
              categoryId: element.category_id,
              name: element.name
            };

            allCat.push(cat);
          });

          return allCat;
        }));
   }
}
