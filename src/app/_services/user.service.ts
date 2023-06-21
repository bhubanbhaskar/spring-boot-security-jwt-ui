import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  PATH_OF_API = " http://localhost:8080"
  requestHeader = new HttpHeaders(
    { "No-Auth": "True" }
  );

  constructor(private httpClient: HttpClient,
    private userAuthService: UserAuthService) { }

  public login(loginData: any) {
    return this.httpClient.post(this.PATH_OF_API + "/api/auth/signin", loginData, { headers: this.requestHeader });

  }

  public roleMatch(allowedRoles:any): boolean {
 
    let isMatch = false;
    const userRoles: any = this.userAuthService.getRoles();
    if (userRoles != null && userRoles) {
        for (let j = 0; j < allowedRoles.length; j++) {
          if (userRoles.includes(allowedRoles[j])) {
            isMatch = true;
          }
}
      }
return isMatch;
    }
  }

