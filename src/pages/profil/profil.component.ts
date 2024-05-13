import { Component } from '@angular/core';
import { DeleteAccountComponent } from '../../components/delete-account/delete-account.component';

@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [DeleteAccountComponent],
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.scss'
})
export class ProfilComponent {

}
