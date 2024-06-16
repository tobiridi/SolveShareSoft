import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SoftwareList } from '../shared/software-list';
import { AlertService } from '../services/alert.service';
import { Subscription } from 'rxjs';
import { SoftwarelistService } from '../services/softwarelist.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-my-soft-lists',
  standalone: true,
  imports: [DatePipe, RouterLink],
  templateUrl: './my-soft-lists.component.html',
  styleUrl: './my-soft-lists.component.scss'
})
export class MySoftListsComponent implements OnInit, OnDestroy {
  public mySoftLists: SoftwareList[];
  private sub: Subscription;

  constructor(private readonly _alert: AlertService, private readonly _userService: UserService) {
    this.mySoftLists = [];
    this.sub = new Subscription();
  }

  ngOnInit(): void {
      const getSoftLists: Subscription = this._userService.getSoftListsWithSofts().subscribe({
        next: (value: SoftwareList[]) => {
          this.mySoftLists = value;
        },
        error: (err) => {
          console.error(err);
        },
      });

      this.sub.add(getSoftLists);
  }

  ngOnDestroy(): void {
      this.sub.unsubscribe();
  }

}
