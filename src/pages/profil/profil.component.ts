import { Component } from '@angular/core';
import { DeleteAccountComponent } from '../../components/delete-account/delete-account.component';
import { UpdatePasswordComponent } from '../../components/update-password/update-password.component';
import { UpdateUserInfoComponent } from '../../components/update-user-info/update-user-info.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PostprojetComponent } from '../../components/postprojet/postprojet.component';

@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [DeleteAccountComponent, UpdatePasswordComponent,UpdateUserInfoComponent, PostprojetComponent, CommonModule],
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.scss'
})

export class ProfilComponent {
  currentComponent: string = '';

  constructor(private router: Router) {}

  showComponent(component: string) {
    this.currentComponent = component;
  }

  goToHome() {
    this.router.navigate(['/']);  
  }
}
