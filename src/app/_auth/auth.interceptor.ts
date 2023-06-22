import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable, catchError, throwError } from "rxjs";
import { UserAuthService } from "../_services/user-auth.service";
import { Router } from "@angular/router";
import { Injectable } from "@angular/core";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
    
constructor(private userAuthService: UserAuthService,
    private router: Router
    ){

}
intercept(
        req: HttpRequest<any>, 
        next: HttpHandler
        ): Observable<HttpEvent<any>> {
        if(req.headers.get('NO-Auth') == 'True'){
            return next.handle(req.clone());
        }
       const token = this.userAuthService.getToken();
       console.log(token)
       req = this.addToken(req, token);
       console.log(req)
       return next.handle(req).pipe(
        catchError(
            (err: HttpErrorResponse) => {
                console.log(err.status);
                if(err.status == 401){
this.router.navigate(['/login']);
                }else if(err.status == 403){
                    this.router.navigate(['/forbidden']);
                }
               return throwError("Some thing is wrong");
            }
        )
       );
    }

    private addToken(request: HttpRequest<any>, token:string){
        return request.clone({
            setHeaders: {
                Authorization : `Bearer ${token}`
            }
        });
    }
    }