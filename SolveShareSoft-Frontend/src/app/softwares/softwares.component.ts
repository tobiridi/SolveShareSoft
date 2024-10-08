import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { SoftwareList } from '../shared/software-list';
import { Subscription } from 'rxjs';
import { SoftwarelistService } from '../services/softwarelist.service';
import { AlertService } from '../services/alert.service';
import { Category } from '../shared/category';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-softwares',
  standalone: true,
  imports: [NavbarComponent, SidebarComponent, DatePipe, RouterLink],
  templateUrl: './softwares.component.html',
  styleUrl: './softwares.component.scss'
})
export class SoftwaresComponent implements OnInit, OnDestroy {
  private limitDisplayed: number;
  private allPublicSoftList: SoftwareList[];
  public displayedSoftList: SoftwareList[];
  public newsSoftList: SoftwareList[];
  public allCategories: Category[];
  private sub: Subscription;

  constructor(private readonly _softList: SoftwarelistService, private readonly _alert: AlertService) {
    this.sub = new Subscription();
    this.allPublicSoftList = [];
    this.displayedSoftList = [];
    //limit displayd by page
    this.limitDisplayed = 6;

    //TODO: get all news soft list
    this.newsSoftList = [];
    //TODO: get all category
    this.allCategories = [];
  }
  
  ngOnInit(): void {
      const getAll = this._softList.getAllPublicSoftList().subscribe({
        next: (value: SoftwareList[]) => {
          this.allPublicSoftList = value;
          //TODO: improve limit pagination
          for (let i = 0; i < this.limitDisplayed; i++) {
            this.displayedSoftList.push(this.allPublicSoftList[i]);
          }
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
