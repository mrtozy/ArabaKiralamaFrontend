import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private authService : AuthService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = localStorage.getItem("token");
    let newrequest:HttpRequest<any>;
     newrequest = request.clone({
      headers: request.headers.set("Authorization", "Bearer " + token  )
    })
    return next.handle(newrequest);
  }
}