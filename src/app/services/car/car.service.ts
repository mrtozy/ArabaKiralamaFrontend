import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

import {Observable} from "rxjs";

import { ListResponseModel } from 'src/app/models/listResponseModel';
import { Car } from 'src/app/models/car/car';
import { CarDetailDto } from 'src/app/models/car/CarDetailDto';
import { SingleResponseModel } from 'src/app/models/singleResponseModel';
import { ResponseModel } from 'src/app/models/responseModel';
import { ObjectResponseModel } from 'src/app/models/objectResponseModel';



@Injectable({
    providedIn: 'root'
})
export class CarService {
    apiUrl = 'https://localhost:7026/api/';
    constructor(private httpClient:HttpClient) { }

  getCars() : Observable<ListResponseModel<Car>>{
    let newPath=this.apiUrl+"cars/getcardetails"
       return this.httpClient.get<ListResponseModel<Car>>(newPath);
    }
    getCarsByBrandId(brandId: number): Observable<ListResponseModel<Car>> {
        let newPath = this.apiUrl+ 'Cars/getallbybrandid?id='+brandId;
        return this.httpClient.get<ListResponseModel<Car>>(newPath);
      }
      getCarsByColor(colorId:number): Observable<ListResponseModel<Car>> {
        let newPath=this.apiUrl+"Cars/getallbycolorid?id="+colorId
        return this.httpClient.get<ListResponseModel<Car>>(newPath);
        
      }
      getbyid(Id:number):Observable<ListResponseModel<Car>> {
        let newPath=this.apiUrl+"Cars/getbyid?id="+Id
        return this.httpClient.get<ListResponseModel<Car>>(newPath);
        
      }
      
      
  getCarDetailsByCarId(carId: number): Observable<SingleResponseModel<CarDetailDto>> {
    let newUrl = this.apiUrl + "Cars/getbyid?Id=" + carId;
    return this.httpClient.get<SingleResponseModel<CarDetailDto>>(newUrl);
  }
  // add(car:Car):Observable<ResponseModel>{
  //   let newUrl = this.apiUrl + "cars/add"
  //   return this.httpClient.post<ResponseModel>(newUrl, car);
  // }

  add(car: Car): Observable<SingleResponseModel<number>> {
    let newPath = this.apiUrl + "Cars/add"
    return this.httpClient.post<SingleResponseModel<number>>(newPath, car);
  }
  addCar(car:Car):Observable<ObjectResponseModel<number>>{
    let newPath = this.apiUrl + "Cars/add"
    return this.httpClient.post<ObjectResponseModel<number>>(newPath , car)
  }

  update(car: Car): Observable<ResponseModel> {
    let newUrl = this.apiUrl + "cars/update"
    return this.httpClient.post<ResponseModel>(newUrl , car);
  }

}
