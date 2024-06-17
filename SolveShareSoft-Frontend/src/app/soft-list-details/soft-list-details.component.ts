import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SoftwarelistService } from '../services/softwarelist.service';
import { SoftwareList } from '../shared/software-list';
import { Subscription } from 'rxjs';
import { AlertService } from '../services/alert.service';
import { DatePipe, DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-soft-list-details',
  standalone: true,
  imports: [DatePipe, DecimalPipe],
  templateUrl: './soft-list-details.component.html',
  styleUrl: './soft-list-details.component.scss'
})
export class SoftListDetailsComponent implements OnInit, OnDestroy {
  public currentSoftList?: SoftwareList
  private sub: Subscription;
  private softListId: number;

  constructor(private readonly _activedRoute: ActivatedRoute,
    private readonly _softList: SoftwarelistService, private readonly _alert: AlertService) {

    this.sub = new Subscription();
    this.softListId = this._activedRoute.snapshot.params ["softListId"];
  }

  ngOnInit(): void {
      const getSoftwaresSub: Subscription = this._softList.getSoftwaresSoftList(this.softListId).subscribe({
        next: (value: SoftwareList | undefined) => {
          this.currentSoftList = value;
        },
        error: (err) => {
          console.error(err);
          this._alert.displayAlert('Erreur lors du chargement du details', 'error');
        },
      });

      this.sub.add(getSoftwaresSub);
  }

  ngOnDestroy(): void {
      this.sub.unsubscribe();
  }

  public deleteSoft(softId: number): void {
    //TODO: delete software
    console.log(softId);
  }

}
