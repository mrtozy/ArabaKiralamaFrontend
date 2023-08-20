import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginModel } from 'src/app/models/login/loginModel';

import { ResponseModel } from 'src/app/models/responseModel';
import { SingleResponseModel } from 'src/app/models/singleResponseModel';
import { TokenModel } from 'src/app/models/token/tokenModel';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { ChangePasswordModel } from 'src/app/models/login/changePasswordModel';

import { RegisterModel } from 'src/app/models/login/registerModel';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = 'https://localhost:7026/api/Auth/';
 
  
  constructor(
    private httpClient: HttpClient,
    private localStorageService: LocalStorageService,
   
   
    ) { }

login(loginModel: LoginModel): Observable<SingleResponseModel<TokenModel>> {
  return this.httpClient.post<SingleResponseModel<TokenModel>>( this.apiUrl + 'login', loginModel  );
}
  isAuthenticated(){
    if(localStorage.getItem("token")){
    return true;
   }
    else{
     return false;
   }
  } 
  logOut() {
    this.localStorageService.remove("token");
   
  }

  register(newUser: RegisterModel): Observable<SingleResponseModel<ResponseModel>> {
    let newPath = this.apiUrl + 'register';
    return this.httpClient.post<SingleResponseModel<ResponseModel>>(newPath, newUser);
  }
 

 
  updatePassword(userPasswordModel:ChangePasswordModel){
    let newUrl = this.apiUrl + "updatepassword";
    return this.httpClient.post<ResponseModel>(newUrl, userPasswordModel)
  }
  
}
