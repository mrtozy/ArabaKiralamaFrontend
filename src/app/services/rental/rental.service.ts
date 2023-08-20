import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { Rental } from 'src/app/models/rental/rental';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { ResponseModel } from 'src/app/models/responseModel';


@Injectable({
    providedIn: 'root'
})
export class RentalService {
  
    apiUrl = 'https://localhost:7026/api/';

    constructor(private httpClient: HttpClient) { }

    getRentalsDetail(): Observable<ListResponseModel<Rental>> {
        let newPath=this.apiUrl+"Rentals/getall"
        return this.httpClient.get<ListResponseModel<Rental>>(newPath);
    }
    rentalAdding(rental: Rental) {
        let newPath=this.apiUrl+"Rentals/add"
        return this.httpClient.post<ResponseModel>(newPath,rental);
      }
      

     
      rulesForAdding(rental: Rental) {
        let newPath=this.apiUrl+"Rentals/rulesforadding"
        return this.httpClient.post<ResponseModel>(newPath,rental);
      }
}
