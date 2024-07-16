import { Routes } from '@angular/router';
import { HomeComponent } from '../pages/home/home.component';
import { LoginComponent } from '../pages/login/login.component';
import { AuthGuard } from '../guard/auth.guard'
import { ContactComponent } from '../pages/contact/contact.component';
import { ProfilComponent } from '../pages/profil/profil.component';
import { SkillsComponent } from '../pages/skills/skills.component';
import { FormationsComponent } from '../pages/formations/formations.component';
import { DeleteAccountComponent } from '../components/delete-account/delete-account.component';
import { UpdatePasswordComponent } from '../components/update-password/update-password.component';
import { UpdateUserInfoComponent } from '../components/update-user-info/update-user-info.component';
import { ProjetsComponent } from '../pages/projets/projets.component';




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
        path:'formations', component: FormationsComponent, //canActivate: [AuthGuard]
    },
    {
        path:'projets', component: ProjetsComponent,  
    }, 
   

    {
        path:'login', component: LoginComponent 
    },
    {
        path:'profil', component: ProfilComponent, canActivate: [AuthGuard], 
    },
  
   
    
];
