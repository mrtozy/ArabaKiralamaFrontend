import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  showErrorMessages: boolean = true;
  rememberMe: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastrService: ToastrService,
    private localStorageService: LocalStorageService,
    private router: Router,
   
  ) { }

  ngOnInit(): void {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      firstName: ["", [Validators.required]],
      lastName: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]],
      confirmPassword: ["", [Validators.required]]
    })
  }

  register() {
    if (this.registerForm.valid) {
      let newUser = Object.assign({}, this.registerForm.value);
      
      this.authService.register(newUser).subscribe(response => {
       

      
       
        this.router.navigate(["giris"]);
        this.toastrService.success("İşlem başarılı", "Giriş yapıldı");
      }, errorResponse => {
        this.toastrService.error("Kayıt Başarısız.");
      })
    } else {
      this.toastrService.error("Bilgilerinizden bazıları doğrulanamadı", "Formunuz hatalı");
    }
  }

  saveEmail(email: string) {
    this.localStorageService.add("remember", email);
  }
}
