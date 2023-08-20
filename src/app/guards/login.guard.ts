import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private toastrService: ToastrService,
    private router: Router
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      // if (this.authService.isAuthenticated()) {
      //   this.router.navigate([""]);
      //   return true;
       
      // } else {
       
      //   this.toastrService.info("Giriş Yapın");
      //   return false;
      // }


      if (this.authService.isAuthenticated()) {
        if (route.routeConfig?.path === "giris" || route.routeConfig?.path === "register") {
          this.router.navigate([""]);
          this.toastrService.warning("Giriş yapılmıştır.");
          return false;
        } else {
          return true;
        }
      } else {
        if (route.routeConfig?.path === "giris" || route.routeConfig?.path === "register") {
          return true;
        } else {
          this.authService.logOut();
          this.router.navigate(["giris"]);
          this.toastrService.error( "Giriş Yapılamamıştır");
          return false;
        }
      }
  }
  
}
