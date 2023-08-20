import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'; // Form modülünden FormGroup ve FormBuilder eklenmeli
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup; // loginForm adında FormGroup oluşturulmalı

  constructor(
    private formBuilder: FormBuilder, // FormBuilder eklenmeli
    private authService: AuthService,
    private toastrService: ToastrService,
    private localStorageService: LocalStorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.createLoginForm(); 
   /// const token = 'eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTUxMiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJlbWFpbCI6Im1lcnRAbWVydC5jb20iLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoibWVydCDDtnpzb3kiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJjYXIuYWRkIiwibmJmIjoxNjkwMDQ5MDY4LCJleHAiOjE2OTAwNDk2NjgsImlzcyI6Im1lcnRAbWVydC5jb20iLCJhdWQiOiJtZXJ0QG1lcnQuY29tIn0.1fZVt0CG8eyANNz36dR6OleDSfJWM8SisDwNACS1ADf3FP7PygTUALSMV28s20pxzBCAtHpk9mRm9KL4Nulo0w';
//const parsedToken = this.parseJwt(token);


//console.log(parsedToken);
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required], // email alanı eklenmeli ve zorunlu olmalı
      password: ['', Validators.required], // password alanı eklenmeli ve zorunlu olmalı
    });
  }

  parseJwt(token: string): any {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const decodedPayload = atob(base64);
    const payloadObject = JSON.parse(decodedPayload);
    return payloadObject; // parseJwt(token: string) fonksiyonu eklenmeli
  }

  login(){
    if(this.loginForm.valid){
      console.log(this.loginForm.value);
      let loginModel = Object.assign({},this.loginForm.value)

      this.authService.login(loginModel).subscribe(response=>{
        this.toastrService.info(response.message)
        console.log(response.message.toString)
        
        localStorage.setItem("token",response.data.token)
      },responseError=>{
        //console.log(responseError)
        this.toastrService.error(responseError.error)
      })
    }
  }
}
