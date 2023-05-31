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
  constructor(private authServices: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {


   if(this.authServices.getAccessToken()){

    let tokenizedReq = request.clone({
      setHeaders: {
        Authorization: this.authServices.getAccessToken(),
        
      },
    });
    return next.handle(tokenizedReq);}
    else{
      return next.handle(request)
      
    }
  }
}
