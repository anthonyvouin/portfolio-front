import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.services';
import { Router } from '@angular/router';
import { Contact } from '../../interface/contact'; 

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})


export class ContactComponent {


  constructor(
    private readonly formBuilder: FormBuilder,
    private apiService: ApiService, 
    private readonly router:Router) {}

  // Initialisation du formulaire réactif avec les champs requis et les validateurs
  formGroup: FormGroup = this.formBuilder.group({
    firstName:["",[Validators.minLength(2), Validators.required]] ,
    lastName: ["",[Validators.minLength(2), Validators.required]],
    email: ["",[Validators.email, Validators.required]],
    objet: ["",[Validators.minLength(2), Validators.required]],   
    message: ["",[Validators.minLength(2), Validators.required]],
  
  })
  
  
    // Méthode pour recuperer les données saisi par utilisateur
    submitContact(): void {
    if (this.formGroup.valid) {
      const contact: Contact = {
        firstName: this.formGroup.get("firstName")?.value,
        lastName: this.formGroup.get("lastName")?.value,
        email: this.formGroup.get("email")?.value,
        objet: this.formGroup.get("objet")?.value,
        message: this.formGroup.get("message")?.value
      };
  

    // Envoi de la requête HTTP pour enregistrer l'utilisateur
    this.apiService.request<any>('/api/contact', 'POST', contact)
        .then(() => {
          this.formGroup.reset();
          this.router.navigate(['/']); 
        })
        .catch(error => {
          console.error('Erreur lors de l\'envoi du message de contact:', error);
          // Gérer l'erreur
        });

  }
 }
}













