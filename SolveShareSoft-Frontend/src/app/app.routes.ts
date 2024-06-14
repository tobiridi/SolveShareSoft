import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SoftwaresComponent } from './softwares/softwares.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ErrorpageComponent } from './errorpage/errorpage.component';
import { AddSofwarelistComponent } from './add-sofwarelist/add-sofwarelist.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'softwares', component: SoftwaresComponent},
    {path: 'softwares/add', component: AddSofwarelistComponent},
    // {path:'update/:id', component: },
    // {path:'delete', component: },
    {path: 'register', component: RegisterComponent},
    {path: 'login', component: LoginComponent},
    
    //must be last !!!
    {path: '**', component: ErrorpageComponent},
];
