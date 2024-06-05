import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SoftwaresComponent } from './softwares/softwares.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'softwares', component: SoftwaresComponent},
];
