import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AlertpanelComponent } from "../alertpanel/alertpanel.component";
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-navbar',
    standalone: true,
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.scss',
    imports: [RouterLink, AlertpanelComponent]
})
export class NavbarComponent implements OnInit, OnDestroy {
    public userLogged: boolean;
    private sub: Subscription;

    constructor(private readonly _auth: AuthService) {
        this.userLogged = false;
        this.sub = new Subscription();
    }

    ngOnInit(): void {
        const authSub: Subscription = this._auth.obs$.subscribe({
            next: (value: boolean) => {
                this.userLogged = value;
            },
            error: (err) => {
                console.error(err);
            }
        });

        this.sub.add(authSub);
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    public logout(): void {
        this._auth.logoutUser();
    }
}
