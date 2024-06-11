import { User } from "./user";

export interface DecodedToken extends User  {
    userId: string;
    exp: number; 
  }