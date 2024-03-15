import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) {}

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ){


  //  if(this.authServices.getAccessToken()){

  //   let tokenizedReq = request.clone({
  //     setHeaders: {
  //       Authorization: this.authServices.getAccessToken(),
        
  //     },
  //   });
  //   return next.handle(tokenizedReq);}
  //   else{
  //     return next.handle(request)
      
  //   }

 // Get the auth token from the service.
 const authToken = this.auth.getAuthorizationToken();
 // Clone the request and replace the original headers with
 // cloned headers, updated with the authorization.

 const authReq = req.clone({
   headers: req.headers.set('babatoken', authToken),
 });

 // send cloned request with header to the next handler.
 return next.handle(authReq);
}


  }

