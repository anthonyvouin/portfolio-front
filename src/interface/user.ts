
export interface User {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }
  
  export interface UserCredential extends Pick< User, 'email' | 'password' > { } 
