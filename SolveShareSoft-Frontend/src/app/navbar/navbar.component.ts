import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AlertpanelComponent } from "../alertpanel/alertpanel.component";

@Component({
    selector: 'app-navbar',
    standalone: true,
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.scss',
    imports: [RouterLink, AlertpanelComponent]
})
export class NavbarComponent {

}
