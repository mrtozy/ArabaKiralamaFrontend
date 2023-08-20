import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { CarImage } from 'src/app/models/car/carImage';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { ResponseModel } from 'src/app/models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CarImageService {

  apiUrl = "https://localhost:7026/"
  constructor(private httpClient:HttpClient) { }

  getByCarId(carId:number):Observable<ListResponseModel<CarImage>>{
    let newPath = this.apiUrl + "api/CarImages/getbycarid?carId=" + carId;
    return this.httpClient.get<ListResponseModel<CarImage>>(newPath)
  }
  getImagePath(imagePath: string) {
  
    return "https://localhost:7026/"+ imagePath
  }
  getAllCarImages():Observable<ListResponseModel<CarImage>>{
    let newUrl = this.apiUrl + "api/CarImages/getall";
    return this.httpClient.get<ListResponseModel<CarImage>>(newUrl);
  }

  uploadImage(images: File[], carId: number): Observable<ResponseModel> {
    const formData = new FormData();
  
    for (let i = 0; i < images.length; i++) {
      formData.append('images', images[i]);
    }
 
    formData.append('carId', carId.toString());
  
    return this.httpClient.post<ResponseModel>(this.apiUrl + "api/CarImages/addmultiple", formData); 
  }

 

  deleteImage(carImage: CarImage): Observable<ResponseModel> {
    let newPath = this.apiUrl + "api/carimages/delete";
    return this.httpClient.post<ResponseModel>(newPath, carImage);
  }
}
