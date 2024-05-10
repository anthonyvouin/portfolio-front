import { Component } from '@angular/core';
import { ComposentApiComponent } from '../../components/composent-api/composent-api.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ComposentApiComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {

}
