import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private authServices: AuthService,private _router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.authServices.getaccessToken()) {
      return true;
    }
    else{
      return false;
    }


    // const redirectUrl = state.url === "/logout" ? "/" : state.url;
    // return this.check(redirectUrl);

  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return true;
  }


  // private check(redirectURL: string): Observable<boolean> {
  //   // Check the authentication status
  //   return this.authServices.statusCheck().pipe(
  //     switchMap((authenticated) => {
  //       // If the user is not authenticated...
  //       if (!authenticated) {
  //         // Redirect to the sign-in page
  //         this._router.navigate(["login"], {
  //           queryParams: { redirectURL },
  //         });

  //         // Prevent the access
  //         return of(false);
  //       }

  //       // Allow the access
  //       return of(true);
  //     })
  //   );
  // }
}
