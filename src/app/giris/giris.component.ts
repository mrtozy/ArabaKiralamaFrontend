import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { LoginModel } from '../models/login/loginModel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-giris',
  templateUrl: './giris.component.html',
  styleUrls: ['./giris.component.css']
})
export class GirisComponent implements OnInit {
  loginModel:LoginModel
  loginForm:FormGroup;
 
  constructor(private formBuilder:FormBuilder,
     private authService:AuthService, private toastrService:ToastrService,private router: Router) { }

  ngOnInit(): void {
    this.createLoginForm();
    



  }

  createLoginForm(){
    this.loginForm = this.formBuilder.group({
      email: ["",Validators.required],
      password:["",Validators.required]
    })
  }
  
//tekrar video izle
login() {
  if (this.loginForm.valid) {
    let loginModel = Object.assign({}, this.loginForm.value);

    this.authService.login(loginModel).subscribe(
      (response) => {
        console.log(response.data.token)
        localStorage.setItem("token", response.data.token)
        const storedJwtToken = localStorage.getItem("token");

        if (storedJwtToken) {
          // JWT'yi çözümleme
          const jwtPayload = JSON.parse(
            decodeURIComponent(escape(atob(storedJwtToken.split('.')[1])))
          );

          // Kullanıcı bilgilerine erişim
          const userId = jwtPayload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
          const userEmail = jwtPayload['email'];
          const userName = jwtPayload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
          const role = jwtPayload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/role'];
       

          console.log('Kullanıcı Kimliği:', userId);
          console.log('Kullanıcı E-Posta:', userEmail);

          localStorage.setItem("userName", userName)
          localStorage.setItem("role", role)
          localStorage.setItem("userId", userId)
          console.log('Kullanıcı Adı:', userName);
         
        } else {
          console.log('JWT belirteci localStorage\'da bulunamadı.');
        }

        this.router.navigate([""]);
      },
      (responseError) => {
        this.toastrService.error(responseError.error);
      }
    );
  }
}

}
