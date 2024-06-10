import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Alertmessage, messageType } from '../shared/alertmessage';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private alertMsg?: Alertmessage;
  private timeout: any;
  private subject: Subject<Alertmessage | undefined>;

  public get obs$(): Observable<Alertmessage | undefined> {
    return this.subject.asObservable();
  }

  constructor() {
    this.subject = new Subject<Alertmessage | undefined>();
  }

  /**
   * 
   * @param message The message displayed
   * @param messageType The message type
   * @param duration In ms, default 2500
   */
  public displayAlert(msg: string, msgType: messageType, duration?: number): void {
    this.alertMsg = {
      message : msg,
      messageType : msgType,
      duration: duration || 2500
    };
    
    this.subject.next(this.alertMsg);

    this.timeout = setTimeout(() => {
      this.closeAlert();
    }, this.alertMsg.duration);
  }

  private closeAlert(): void {
    this.alertMsg = undefined;
    this.subject.next(this.alertMsg);
    clearTimeout(this.timeout);
  }
}
