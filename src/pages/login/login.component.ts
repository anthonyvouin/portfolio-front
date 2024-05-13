import { Component } from '@angular/core';
import { UserCredential } from '../../interface/user'; // Importez l'interface UserCredential
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.services';
import { AuthService } from '../../services/auth.services'; 
import { Router } from '@angular/router'; 


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly apiService: ApiService,
    private readonly router: Router
  ) {}


    // Initialisation du formulaire réactif avec les champs requis et les validateurs
    formGroup: FormGroup = this.formBuilder.group({
      email: ["",[Validators.email, Validators.required]],
      password:["",[Validators.minLength(5), Validators.required]],
    })
    

      // Méthode pour recuperer les données saisons par l'utilisateur
     loginUser(): void {
    if (this.formGroup.valid) {
      const user: UserCredential = {
        email: this.formGroup.get("email")?.value,
        password: this.formGroup.get("password")?.value
      };


      this.apiService.request<any>('/auth/login','POST', user)
      .then((data) => {
        if (typeof data === 'object' && 'token' in data) {
          this.authService.login(data.token); // Utilisez le service AuthService pour stocker le JWT dans les cookies
          this.formGroup.reset();
          this.router.navigate(['/profil']); // Redirigez vers la page de profil
        } else {
          console.error('Erreur: le token est manquant dans la réponse du serveur');
        }
      })
      .catch(error => {
        console.error('Erreur lors de la connexion:', error);
      });
  }
}
}


