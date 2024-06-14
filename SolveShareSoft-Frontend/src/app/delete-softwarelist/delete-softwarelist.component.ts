import { Component, OnDestroy, OnInit } from '@angular/core';
import { SoftwareList } from '../shared/software-list';
import { DatePipe } from '@angular/common';
import { SoftwarelistService } from '../services/softwarelist.service';
import { AlertService } from '../services/alert.service';
import { Subscription } from 'rxjs';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-delete-softwarelist',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './delete-softwarelist.component.html',
  styleUrl: './delete-softwarelist.component.scss'
})
export class DeleteSoftwarelistComponent implements OnInit, OnDestroy {
  public softLists: SoftwareList[];
  private sub: Subscription;

  constructor(private readonly _alert: AlertService,
    private readonly _softList: SoftwarelistService,
    private readonly _user: UserService) {
    this.softLists = [];
    this.sub = new Subscription();
  }

  ngOnInit(): void {
    const allsoftListSub: Subscription = this._user.getAllSoftLists().subscribe({
      next: (value: SoftwareList[]) => {
        this.softLists = value;
      },
      error: (err) => {
        console.error(err);
        this._alert.displayAlert('Erreur lors du chargement des liste de logiciels', 'error');
      },
    });

    this.sub.add(allsoftListSub);
  }

  ngOnDestroy(): void {
      this.sub.unsubscribe();
  }

  public deleteSoftList(softListId: number): void {
    const delSoftListSub: Subscription = this._softList.deleteSoftList(softListId).subscribe({
      next: (value: any) => {
        this.softLists = this.softLists.filter((sftl => sftl.softwareListId !== softListId));
      },
      error: (err) => {
        console.error(err);
        this._alert.displayAlert('Erreur lors de la suppression de la liste', 'error');
      },
    });

    this.sub.add(delSoftListSub);
  }
}
