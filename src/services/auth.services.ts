import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { DecodedToken } from '../interface/decoded-token';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated: boolean = false;
  private token: string | null = null;

  constructor(
    private cookieService: CookieService,
    private router: Router,
    private jwtHelper: JwtHelperService
  ) {}

  // Méthode pour connecter l'utilisateur et stocker le JWT dans un cookie
  login(token: string): void {
    this.isAuthenticated = true;
    this.token = token;
    // Stocker le JWT dans un cookie avec une expiration
    this.cookieService.set('jwt', token, new Date(Date.now() + 3600 * 1000)); // expire dans 1 heure
  }

  // Méthode pour déconnecter l'utilisateur et supprimer le JWT du cookie
  logout(): void {
    this.isAuthenticated = false;
    this.token = null;
    // Supprimer le JWT du cookie
    this.cookieService.delete('jwt');
    this.router.navigate(['/']); 
  }

  // Méthode pour vérifier si l'utilisateur est connecté en vérifiant la présence du JWT dans le cookie
  isLoggedIn(): boolean {
    return this.cookieService.check('jwt');
  }

  // Méthode pour récupérer le JWT du cookie
  getToken(): string | null {
    return this.cookieService.get('jwt');
  }

  // Méthode pour decoder le jwt
  getDecodedToken(): DecodedToken | null {
    const token = this.getToken();
    if (token) {
      try {
        // Utiliser JwtHelperService pour décoder le jeton
        const decodedToken = this.jwtHelper.decodeToken(token);
        return decodedToken as DecodedToken; // Assurez-vous que le type correspond à votre interface DecodedToken
      } catch (error) {
        console.error('Erreur lors du décodage du token :', error);
        return null;
      }
    }
    return null;
  }

  //Verifie si il est admin
  isAdmin(): boolean {
    const decodedToken = this.getDecodedToken();
    return !!decodedToken && decodedToken.isAdmin === true;
  }
}
