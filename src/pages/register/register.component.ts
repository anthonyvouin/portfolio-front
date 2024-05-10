import { ButtonModule } from 'primeng/button';

import { Component } from '@angular/core';
import { User } from '../../interface/user';
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, ButtonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  constructor(private readonly formBuilder: FormBuilder){}

  formGroup: FormGroup = this.formBuilder.group({
    firstName:["",[Validators.minLength(2), Validators.required]] ,
    lastName: ["",[Validators.minLength(2), Validators.required]],
    email: ["",[Validators.email, Validators.required]],
    password:["",[Validators.minLength(5), Validators.required]],
  })
  
  
  registerUser(): void {
    if(this.formGroup.valid) {
      const user:User = {
      firstName:this.formGroup.get("firstName")?.value,
      lastName:this.formGroup.get("lastName")?.value,
      email:this.formGroup.get("email")?.value,
      password:this.formGroup.get("password")?.value
    }

      fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      })
      .then(response => response.json())
      .then(data => {
        console.log('Réponse du serveur:', data);
  
      })
      .catch(error => {
        console.error('Erreur lors de la création du compte:', error);
      });

    }
   
  }

}
