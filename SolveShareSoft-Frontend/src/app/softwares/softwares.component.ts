import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { SoftwareList } from '../shared/software-list';
import { Subscription } from 'rxjs';
import { SoftwarelistService } from '../services/softwarelist.service';
import { AlertService } from '../services/alert.service';
import { Category } from '../shared/category';

@Component({
  selector: 'app-softwares',
  standalone: true,
  imports: [NavbarComponent, SidebarComponent],
  templateUrl: './softwares.component.html',
  styleUrl: './softwares.component.scss'
})
export class SoftwaresComponent implements OnInit, OnDestroy {
  public allPublicSoftList: SoftwareList[];
  public allCategories: Category[];
  private sub: Subscription;

  constructor(private readonly _softList: SoftwarelistService, private readonly _alert: AlertService) {
    this.sub = new Subscription();
    this.allPublicSoftList = [];
    //TODO: get all category
    this.allCategories = [];
  }
  
  ngOnInit(): void {
      const getAll = this._softList.getAllPublicSoftList().subscribe({
        next: (value: SoftwareList[]) => {
          this.allPublicSoftList = value;
        },
        error: (err) => {
          console.error(err);
          this._alert.displayAlert('Erreur lors du chargement des listes', 'error');
        },
      });

      this.sub.add(getAll);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
