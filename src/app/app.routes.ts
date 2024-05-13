import { Routes } from '@angular/router';
import { HomeComponent } from '../pages/home/home.component';
import { LoginComponent } from '../pages/login/login.component';
import { RegisterComponent } from '../pages/register/register.component';
import { ProfilComponent } from '../pages/profil/profil.component';
import { AuthGuard } from '../guard/auth.guard'


export const routes: Routes = [
    {
        path:'', component: HomeComponent
    },
   
    {
        path:'register', component: RegisterComponent
    },

    {
        path:'login', component: LoginComponent // Utilisez le garde de route pour protéger la route
    },

    {
        path:'profil', component: ProfilComponent, canActivate: [AuthGuard] // Utilisez le garde de route pour protéger la route
    },
  
    
];
