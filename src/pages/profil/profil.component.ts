import { Component } from '@angular/core';
import { DeleteAccountComponent } from '../../components/delete-account/delete-account.component';
import { UpdateUserInfoComponent } from '../../components/update-user-info/update-user-info.component';

@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [DeleteAccountComponent,UpdateUserInfoComponent],
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.scss'
})
export class ProfilComponent {

}
