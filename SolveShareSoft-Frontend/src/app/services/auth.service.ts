import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticate: boolean;
  private bsub!: BehaviorSubject<boolean>

  public get obs$(): Observable<boolean> {
    return this.bsub.asObservable();
  }

  constructor() {
    //check if already have jwt token
    this.isAuthenticate = localStorage.getItem('jwt') ? true : false;
    this.bsub = new BehaviorSubject<boolean>(this.isAuthenticate);
  }

  public loginUser(): void {
    this.isAuthenticate = true;
    this.bsub.next(this.isAuthenticate);
  }

  public logoutUser(): void {
    this.isAuthenticate = false;
    localStorage.removeItem('jwt');
    this.bsub.next(this.isAuthenticate);
  }

}
