import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { Color } from 'src/app/models/color/color';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { ResponseModel } from 'src/app/models/responseModel';


@Injectable({
    providedIn: 'root'
})
export class ColorService {
    apiUrl = 'https://localhost:7026/api/';

    constructor(private httpClient:HttpClient) { }

    getColors() : Observable<ListResponseModel<Color>>{
        let newPath=this.apiUrl+"Colors/getall"
        return this.httpClient.get<ListResponseModel<Color>>(newPath);
    }
    getColorsFillter(colorId: number) : Observable<ListResponseModel<Color>>{
        let newPath=this.apiUrl+"Colors/getbyid?id=" + colorId
        return this.httpClient.get<ListResponseModel<Color>>(newPath);
    }
    add(color:Color):Observable<ResponseModel>{
        let newUrl = this.apiUrl + "colors/add"
        return this.httpClient.post<ResponseModel>(newUrl, color);
      }
      update(color: Color): Observable<ResponseModel>{
        let newUrl = this.apiUrl + "Colors/update"
        return this.httpClient.post<ResponseModel>(newUrl, color)
      }
}
