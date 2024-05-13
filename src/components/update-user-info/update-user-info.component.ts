import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.services';
import { AuthService } from '../../services/auth.services';
import { UserWithoutPwdandAdmin } from '../../interface/user';
import { Router } from '@angular/router'; // *

@Component({
  selector: 'app-update-user-info',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './update-user-info.component.html',
  styleUrl: './update-user-info.component.scss'
})

export class UpdateUserInfoComponent {

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private apiService: ApiService, 
    private readonly router:Router) {}

  // Initialisation du formulaire réactif avec les champs requis et les validateurs
  updateUserInfoForm: FormGroup = this.formBuilder.group({
        firstName: ["", [Validators.minLength(2), Validators.required]],
        lastName: ["", [Validators.minLength(2), Validators.required]],
        email: ["", [Validators.email, Validators.required]]
      });


    // Méthode pour recuperer les données saisi par utilisateur
    onSubmit(): void {
        if (this.updateUserInfoForm.valid) {
        const updatedUserInfo: UserWithoutPwdandAdmin = {
        firstName: this.updateUserInfoForm.value.firstName,
        lastName: this.updateUserInfoForm.value.lastName,
        email: this.updateUserInfoForm.value.email
      };


 // Appel de l'API pour mettre à jour les informations utilisateur
 const token = this.authService.getToken();
 this.apiService.request<any>('/auth/update-account', 'PUT', updatedUserInfo, token)
   .then((data) => {
    this.updateUserInfoForm.reset();

     console.log('Informations utilisateur mises à jour avec succès');
   })
   .catch(error => {
     console.error('Erreur lors de la mise à jour des informations utilisateur:', error);
   });
}
}
}





