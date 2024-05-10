import { Component } from '@angular/core';
import { User } from '../../interface/user';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {


  userData: User = {
    firstName: '',
    lastName: '',
    email: '',
    password:'',
  };

  
  registerUser(): void {
    console.log(this.userData)
    fetch('http://localhost:3000/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.userData)
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
