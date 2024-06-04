import { Routes } from '@angular/router';
import { HomeComponent } from '../pages/home/home.component';
import { LoginComponent } from '../pages/login/login.component';
import { RegisterComponent } from '../pages/register/register.component';
import { AuthGuard } from '../guard/auth.guard'
import { ContactComponent } from '../pages/contact/contact.component';
import { ProfilComponent } from '../pages/profil/profil.component';
import { SkillsComponent } from '../pages/skills/skills.component';



export const routes: Routes = [
    {
        path:'', component: HomeComponent
    },
    {
        path:'contact', component: ContactComponent, //canActivate: [AuthGuard]
    },
    {
        path:'competences', component: SkillsComponent, //canActivate: [AuthGuard]
    },
    
    {
        path:'register', component: RegisterComponent
    },

    {
        path:'login', component: LoginComponent 
    },
    {
        path:'profil', component: ProfilComponent, canActivate: [AuthGuard]
    },
   
    
];
