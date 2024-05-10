import { Component } from '@angular/core';
import { CardInterface } from '../../interface/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})


export class CardComponent {
  cardTableau: CardInterface [] =   [
    {
      title:"bidule",
      price:14
    },
    {
      title:"truc",
      price:18
    }
  ]

}
