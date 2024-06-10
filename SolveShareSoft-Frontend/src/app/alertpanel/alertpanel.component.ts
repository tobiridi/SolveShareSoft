import { Component, OnDestroy, OnInit } from '@angular/core';
import { AlertService } from '../services/alert.service';
import { Subscription } from 'rxjs';
import { Alertmessage } from '../shared/alertmessage';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-alertpanel',
  standalone: true,
  imports: [NgClass],
  templateUrl: './alertpanel.component.html',
  styleUrl: './alertpanel.component.scss'
})
export class AlertpanelComponent implements OnInit, OnDestroy {
  public alertMsg?: Alertmessage
  private sub!: Subscription;

  constructor(private readonly _alert: AlertService) {
  }

  ngOnInit(): void {
    //set default visibility to 'none'
    this.isVisible(false);

    this.sub = this._alert.obs$.subscribe({
      next: (value: Alertmessage | undefined) => {
        this.alertMsg = value;
        this.isVisible(value ? true : false);
      },
      error: (err) => console.error(err),
    });

  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  private isVisible(visibility: boolean) {
    const element = document.getElementById('alertPanel') as HTMLDivElement;
    element.style.display = visibility ? 'block' : 'none';
  }

}
