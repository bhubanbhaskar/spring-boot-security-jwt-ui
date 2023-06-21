import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
  
})
export class UserAuthService {

  constructor() { }

  public setRoles(roles: []){
    localStorage.setItem('roles', JSON.stringify(roles));
  }

  public getRoles(): string {
    return localStorage.getItem("roles") || '{}';
  }

  public setToken(jwtToken: string){
    localStorage.setItem("jwtToken", jwtToken);
  }

  public getToken() : string {
    return (localStorage.getItem("jwtToken")!);
  }

  public clear(){
    localStorage.clear();
  }
public isLoggedIn(){
 if(this.getRoles() && this.getToken())
 return true;
 else{
  return false;
 }
 
 }

}
   

