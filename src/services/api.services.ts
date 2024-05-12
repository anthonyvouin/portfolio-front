// api.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  private baseUrl = 'http://localhost:3000'; // Modifier l'URL de base selon vos besoins

  constructor() { }


  // Méthode générique pour effectuer une requête HTTP
  request<T>(url: string, method:string, body:null | object=null ): Promise<T> {

      // Configuration de la requête HTTP avec les données de l'utilisateur
        const requestOptions: RequestInit = {
          method: method,
          headers: {
            'Content-Type': 'application/json'
          },
          body: body?JSON.stringify(body):null
        };
  

    // Construction de l'URL complète en concaténant l'URL de base et l'URL spécifiée

       return fetch(`${this.baseUrl}${url}`, requestOptions)


      .then(response => {

        if (!response.ok) {

          throw new Error('Erreur lors de la requête HTTP');
        }

        return response.json() as Promise<T>;
      })

      .catch(error => {

        console.error('Erreur lors de la requête HTTP:', error);
        
        throw error;
      });
  }
}