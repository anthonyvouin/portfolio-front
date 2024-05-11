import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-composent-api',
  standalone: true,
  imports: [],
  templateUrl: './composent-api.component.html',
  styleUrl: './composent-api.component.scss'
})

export class ComposentApiComponent implements OnInit {


  async api(){
    console.log("coucou")
    const result = await fetch("http://localhost:3000/test/test")
    console.log(await result.json())
  }

  // Quand jinitialise le composent  ( quand il se charge)
 async ngOnInit(): Promise<void> {

    const result = await fetch("http://localhost:3000/test/test")

    console.log(await result.json())
    
  }

}
