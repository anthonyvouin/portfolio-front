import { Component } from '@angular/core';
import { User } from '../../interface/user';
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from '../../services/api.services';
import { AuthService } from '../../services/auth.services'; 

import { Router } from '@angular/router'; // *


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {


  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly cookieService: CookieService,
    private readonly authService: AuthService,
    private apiService: ApiService, 
    private readonly router:Router) {}

  // Initialisation du formulaire réactif avec les champs requis et les validateurs
  formGroup: FormGroup = this.formBuilder.group({
    firstName:["",[Validators.minLength(2), Validators.required]] ,
    lastName: ["",[Validators.minLength(2), Validators.required]],
    email: ["",[Validators.email, Validators.required]],
    password:["",[Validators.minLength(5), Validators.required]],
  })
  
  
    // Méthode pour enregistrer un nouvel utilisateur
    registerUser(): void {
    if (this.formGroup.valid) {
      const user: User = {
        firstName: this.formGroup.get("firstName")?.value,
        lastName: this.formGroup.get("lastName")?.value,
        email: this.formGroup.get("email")?.value,
        password: this.formGroup.get("password")?.value
      };
  

    // Envoi de la requête HTTP pour enregistrer l'utilisateur
    this.apiService.request<any>('/auth/register','POST', user)
      .then((data) => {
        if (typeof data === 'object' && 'token' in data) {
          this.authService.login(data.token); // Utilisez le service AuthService pour stocker le JWT dans les cookies

          this.formGroup.reset();
          this.router.navigate(['/profil']); 

        } else {
          console.error('Erreur: le token est manquant dans la réponse du serveur');
        }
      })
      .catch(error => {
        console.error('Erreur lors de la création du compte:', error);
      });


  }
 }
}