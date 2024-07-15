
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.services';
import { AuthService } from '../../services/auth.services';
import { UserPasswordOnly } from '../../interface/user';
import { Router } from '@angular/router';
import { Comment } from '@angular/compiler';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-password',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule],
  templateUrl: './update-password.component.html',
  styleUrl: './update-password.component.scss'
})
export class UpdatePasswordComponent {

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly apiService: ApiService,
  ) { }

  // Définition du formulaire avec les contrôles de mot de passe et de confirmation
  updatePasswordForm: FormGroup = this.formBuilder.group({
    password: ['', [Validators.minLength(8), Validators.required]],
    confirmPassword: ['', Validators.required]
  }, { validator: this.passwordMatchValidator }); 


  // Méthode de validation personnalisée pour vérifier que les mots de passe correspondent
  passwordMatchValidator(formGroup: FormGroup) {
    const passwordControl = formGroup.get('password');
    const confirmPasswordControl = formGroup.get('confirmPassword');

    if (passwordControl && confirmPasswordControl) { 
      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ passwordMismatch: true });
      } else {
        confirmPasswordControl.setErrors(null);
      }
    }
  }


  onSubmit(): void {
    if (this.updatePasswordForm.valid) {
      const updatedUser: UserPasswordOnly = {
        password: this.updatePasswordForm.get('password')?.value
      };
      // Envoi de la requête HTTP pour enregistrer l'utilisateur

      const token = this.authService.getToken();
      
      this.apiService.request<any>('/api/auth/update-password', 'PUT', updatedUser, token)
        .then((data) => {
          this.updatePasswordForm.reset();

        })
        .catch(error => {
          console.error('Erreur lors de la mise à jour du mot de passe:', error);
        });
    }
  }
}