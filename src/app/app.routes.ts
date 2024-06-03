import { Routes } from '@angular/router';
import { HomeComponent } from '../pages/home/home.component';
import { LoginComponent } from '../pages/login/login.component';
import { RegisterComponent } from '../pages/register/register.component';
import { AuthGuard } from '../guard/auth.guard'
import { ContactComponent } from '../pages/contact/contact.component';


export const routes: Routes = [
    {
        path:'', component: HomeComponent
    },
   
    {
        path:'register', component: RegisterComponent
    },

    {
        path:'login', component: LoginComponent 
    },
    {
        path:'contact', component: ContactComponent, canActivate: [AuthGuard]
    },
    
];
