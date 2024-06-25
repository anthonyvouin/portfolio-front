import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.services'; 
import { Router } from '@angular/router'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  constructor(private authService: AuthService) {}

  logout(): void {
    this.authService.logout();
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  openLinkedInProfile(): void {
    window.open(
      'https://www.linkedin.com/in/anthony-vouin-b742a91ba/',
      '_blank'
    );
  }
}

  

