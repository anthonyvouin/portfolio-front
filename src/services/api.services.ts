// api.service.ts

import { Injectable } from '@angular/core';
import { AuthService } from './auth.services'

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  private baseUrl = 'http://localhost:3000'; 

  constructor(  private authService: AuthService)  { }


  // Méthode générique pour effectuer une requête HTTP
  request<T>(
    url: string,
    method:string, 
    body:null | object | FormData = null, 
    token:string | null = null,
    contentType: string = 'application/json'   
  
  ): Promise<T> {


    // Headers de la requête
    const headers: Record<string, string> = {};

    if(body && !(body instanceof FormData)) {
      headers['content-Type'] = contentType
    }

    // Ajouter l'en-tête Authorization si un token est disponible
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

      // Options de la requête
      const requestOptions: RequestInit = {
        method: method,
        headers: headers,
        body: body instanceof FormData ? body : body ? JSON.stringify(body) : null,
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


      .then(data => {
        // Si les données renvoyées contiennent des chemins d'image, les ajuster si nécessaire
        if (Array.isArray(data)) {
          data.forEach((item: any) => {
            // Assurez-vous que le chemin d'image est complet avec l'URL de base si nécessaire
            if (item.image && !item.image.startsWith('http')) {
              item.image = `${this.baseUrl}/${item.image}`;
            }
          });
        }
        return data;
      })


      .catch(error => {

        console.error('Erreur lors de la requête HTTP:', error);
        
        throw error;
      });
  }
}
