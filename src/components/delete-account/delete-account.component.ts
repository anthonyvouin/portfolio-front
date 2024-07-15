import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.services';
import { ApiService } from '../../services/api.services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-account',
  standalone: true,
  imports: [],
  templateUrl: './delete-account.component.html',
  styleUrl: './delete-account.component.scss'
})
export class DeleteAccountComponent {

  constructor(
    private authService: AuthService,
    private apiService: ApiService,
    private router: Router
  ) {}

  confirmDeleteAccount(): void {
    if (confirm("Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.")) {
      this.deleteAccount();
    }
  }


deleteAccount(): void {
  const token = this.authService.getToken(); 

  this.apiService.request<any>('/api/auth/delete-account', 'DELETE', null, token)
    .then((data) => {     
      this.authService.logout();
     })
    .catch(error => {
      console.error('Erreur lors de la suppression du compte:', error);
      // Afficher un message d'erreur à l'utilisateur
      alert('Une erreur est survenue lors de la suppression de votre compte. Veuillez réessayer.');
    });
}
}