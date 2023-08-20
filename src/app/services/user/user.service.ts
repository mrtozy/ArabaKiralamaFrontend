import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/models/responseModel';
import { SingleResponseModel } from 'src/app/models/singleResponseModel';
import { User } from 'src/app/models/user/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = "https://localhost:7026/api/";

  constructor(private httpClient:HttpClient) { }

  updateUserNames(user:User){
    let newUrl = this.apiUrl + "Users/updateusernames";
    return this.httpClient.post<ResponseModel>(newUrl,user);
  }



  getUserById(userId:number):Observable<SingleResponseModel<User>>{
    let newUrl = this.apiUrl + "users/getbyid?Id=" + userId;
    return this.httpClient.get<SingleResponseModel<User>>(newUrl);
  }
}
