import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user/user';

import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  user:User;
  profileForm:FormGroup;
  passwordForm:FormGroup;
  dataLoaded = false;

  constructor(
    private userService:UserService,
    private authService:AuthService,
    private formBuilder:FormBuilder,
    private toastrService:ToastrService
  ) { }

  ngOnInit(): void {
   this.getUserById();
    this.createProfileForm();
    this.createPasswordForm();
  }
  getUserById(){
    this.userService.getUserById(Number(localStorage.getItem("userId")))
      .subscribe(response=>{
        this.user = response.data
        localStorage.setItem("userName",this.user.firstName+" "+this.user.lastName)
        this.profileForm.patchValue({
          firstName: this.user.firstName,
          lastName: this.user.lastName,
          
          email: this.user.email,
          passwordHash: this.user.passwordHash,
          passwordSalt: this.user.passwordSalt,
          status: this.user.status
        });
        this.dataLoaded = true
     });
  }
  
  createProfileForm(){
    this.profileForm = this.formBuilder.group({
     id:[Number(localStorage.getItem("userId"))],
     firstName: ["", Validators.required],
    lastName: ["", Validators.required],
    email: ["", Validators.required],
    passwordHash: [""],
    passwordSalt: [""],
    status: [true]
  
    })
  }
  updateUserNames(){
    if (this.profileForm.valid) {
     let userModel = Object.assign({}, this.profileForm.value);
      this.userService.updateUserNames(userModel).subscribe(response=>{

        this.toastrService.info(response.message, "Bilgiler Güncellendi.");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
     }, responseError=>{
        console.log(responseError);
       
        this.toastrService.error(responseError.error);
      });
     
    } else {
      this.toastrService.error("Lütfen tüm alanları doldurunuz.", "Hata!");
    }
  }
  createPasswordForm(){
    this.passwordForm = this.formBuilder.group({
      userId:[Number(localStorage.getItem("userId"))],
      oldPassword: ["",Validators.required],
      newPassword:["",Validators.required],
      repeatNewPassword:["",Validators.required]
    })
  }

  

  updatePassword(){
    if (this.passwordForm.valid) {
      let passwordModel = Object.assign({}, this.passwordForm.value);
     
      this.authService.updatePassword(passwordModel).subscribe(response=>{
        
        this.toastrService.info(response.message, "Şifre Güncellendi");
      }, responseError=>{
        this.toastrService.error(responseError.error, "Hata!");
      });
    } else {
      this.toastrService.error("Lütfen tüm alanları doldurunuz.", "Hata!");
    }
  }


}
