// api.service.ts

import { Injectable } from '@angular/core';
import { AuthService } from './auth.services'

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  // Url: du back pour les appels api
  private baseUrl = 'http://localhost:3000'; 

  constructor(  private authService: AuthService)  { }


  // Méthode générique pour effectuer une requête HTTP
  request<T>(url: string, method:string, body:null | object=null, token:string | null = null ): Promise<T> {


      // Configuration de la requête HTTP avec les données de l'utilisateur
        const requestOptions: RequestInit = {
          method: method,
          headers: {
            'Content-Type': 'application/json',
              // Si un token est disponible, l'ajouter à l'en-tête Authorization
        ...(token && { 'Authorization': `Bearer ${token}` })
          },
          
          // Encodage de body en JSON si body est fourni

          body: body?JSON.stringify(body):null
        };
  
  
    // Construction de l'URL complète en concaténant l'URL de base et l'URL spécifiée

       return fetch(`${this.baseUrl}${url}`, requestOptions)

      .then(response => {

        if (!response.ok) {

          throw new Error('Erreur lors de la requête HTTP');
        }

         // Décodage de la réponse JSON
          return response.json() as Promise<T>;
      })

      .catch(error => {

        console.error('Erreur lors de la requête HTTP:', error);
        
        throw error;
      });
  }
}
