import { Component } from '@angular/core';
import { User } from '../../interface/user';
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from '../../services/api.services';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  constructor(private readonly formBuilder: FormBuilder, private readonly cookieService: CookieService, private apiService: ApiService) {}

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
  

    // Configuration de la requête HTTP avec les données de l'utilisateur
    // const requestOptions: RequestInit = {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(user)
    //   };


    // Envoi de la requête HTTP pour enregistrer l'utilisateur
    this.apiService.request<any>('/auth/register','POST', user)
      .then((data) => {
        if (typeof data === 'object' && 'token' in data) {
          console.log('Réponse du serveur:', data);
          // Stocker le JWT dans un cookie avec une durée de validité d'une heure
          document.cookie = `jwt=${data.token}; expires=${new Date(Date.now() + 3600 * 1000).toUTCString()}; path=/`;
          this.formGroup.reset();
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