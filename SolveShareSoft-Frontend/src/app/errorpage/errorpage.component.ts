import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-errorpage',
  standalone: true,
  imports: [],
  templateUrl: './errorpage.component.html',
  styleUrl: './errorpage.component.scss'
})
export class ErrorpageComponent implements OnDestroy {
  private timeout: any;

  constructor(private readonly _router: Router, private readonly _activatedRoute: ActivatedRoute) {
    //redirect to Homepage
    this.timeout = setTimeout(() => {
      this._router.navigate(['']);
    }, 2500);
  }

  ngOnDestroy(): void {
    clearTimeout(this.timeout);
  }

}
