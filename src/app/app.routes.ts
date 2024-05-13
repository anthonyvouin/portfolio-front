import { Routes } from '@angular/router';
import { ContactComponent } from '../pages/contact/contact.component';
import { HomeComponent } from '../pages/home/home.component';
import { RegisterComponent } from '../pages/register/register.component';
import { ProfilComponent } from '../pages/profil/profil.component';


export const routes: Routes = [
    {
        path:'', component: HomeComponent
    },
    {
        path:'contact', component: ContactComponent
    },
    {
        path:'register', component: RegisterComponent
    },
    {
        path:'profil', component: ProfilComponent
    },
    
];
