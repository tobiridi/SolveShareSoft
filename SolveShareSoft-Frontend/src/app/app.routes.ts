import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SoftwaresComponent } from './softwares/softwares.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ErrorpageComponent } from './errorpage/errorpage.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'softwares', component: SoftwaresComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'login', component: LoginComponent},
    
    //must be last !!!
    {path: '**', component: ErrorpageComponent},
];
