import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SoftwarelistService } from '../services/softwarelist.service';
import { SoftwareList } from '../shared/software-list';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-soft-list-details',
  standalone: true,
  imports: [],
  templateUrl: './soft-list-details.component.html',
  styleUrl: './soft-list-details.component.scss'
})
export class SoftListDetailsComponent implements OnInit, OnDestroy {
  public currentSoftList?: SoftwareList
  private sub: Subscription;
  private softListId: number;

  constructor(private readonly _activedRoute: ActivatedRoute, private readonly _softList: SoftwarelistService) {
    this.sub = new Subscription();
    this.softListId = this._activedRoute.snapshot.params ["softListId"];
  }

  ngOnInit(): void {
    //TODO: get softwares from the soft list
      //const getDate: Subscription = this._softList.
  }

  ngOnDestroy(): void {
      this.sub.unsubscribe();
  }

}
