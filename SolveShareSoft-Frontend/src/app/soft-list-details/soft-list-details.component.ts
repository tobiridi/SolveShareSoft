import { Component, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SoftwarelistService } from '../services/softwarelist.service';
import { SoftwareList } from '../shared/software-list';
import { Subscription } from 'rxjs';
import { AlertService } from '../services/alert.service';
import { DatePipe, DecimalPipe } from '@angular/common';
import { AddSoftwareComponent } from '../add-software/add-software.component';
import { SoftwareService } from '../services/software.service';
import { Software } from '../shared/software';

@Component({
  selector: 'app-soft-list-details',
  standalone: true,
  imports: [DatePipe, DecimalPipe, AddSoftwareComponent],
  templateUrl: './soft-list-details.component.html',
  styleUrl: './soft-list-details.component.scss'
})
export class SoftListDetailsComponent implements OnInit, OnDestroy {
  public currentSoftList?: SoftwareList
  private sub: Subscription;
  private softListId: number;
  public addSoftFormVisible: boolean;

  constructor(private readonly _activedRoute: ActivatedRoute,
    private readonly _softList: SoftwarelistService,
    private readonly _alert: AlertService,
    private readonly _soft: SoftwareService) {

    this.sub = new Subscription();
    this.softListId = this._activedRoute.snapshot.params ["softListId"];
    this.addSoftFormVisible = false;
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
    const delSoftSub: Subscription = this._soft.deleteSoft(softId).subscribe({
      next: (value: any) => {
        const softs: Software[] | undefined = this.currentSoftList?.softwares;
        if(this.currentSoftList && softs) {
          this.currentSoftList.softwares = softs?.filter(s => s.softwareId !== softId);
        }
        this._alert.displayAlert("Logiciel supprimer", 'success');
      },
      error: (err) => {
        console.error(err);
        this._alert.displayAlert("Erreur lors de la suppression du logiciel", 'error');
      }
    });
    
    this.sub.add(delSoftSub);
  }

  public addSoftware(): void {
    this.addSoftFormVisible = true;
  }

  public closeAddSoftwareForm(visibility: boolean): void {
    this.addSoftFormVisible = visibility
  }

}
