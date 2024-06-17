import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.services';
import { Projet } from '../../interface/projet';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-projets',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projets.component.html',
  styleUrl: './projets.component.scss'
})

export class ProjetsComponent implements OnInit {

  projets: Projet[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.fetchProjets();
  }

  fetchProjets(): void {
    this.apiService.request<Projet[]>('/projet/get-all-projets', 'GET')
      .then(projets => {
        this.projets = projets;
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des projets :', error);
        // Gérer l'erreur comme nécessaire
      });
  }

}