import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-softwares',
  standalone: true,
  imports: [NavbarComponent, SidebarComponent],
  templateUrl: './softwares.component.html',
  styleUrl: './softwares.component.scss'
})
export class SoftwaresComponent {

}
