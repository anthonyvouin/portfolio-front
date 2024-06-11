
export interface User {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    isAdmin?: boolean;

  }
  
  //Pour se conecter
  export interface UserCredential extends Pick< User, 'email' | 'password' > { } 

  // Pour mettre à jour les informations user
  export interface UserWithoutPwdandAdmin extends Omit< User, 'password'| 'isAdmin' > { }

  //Pour changer le mot de passe
  export interface UserPasswordOnly extends Pick < User, 'password' > { }