import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { ListResponseModel } from 'src/app/models/listResponseModel';

import { Customer } from 'src/app/models/customer/customer';
import { SingleResponseModel } from 'src/app/models/singleResponseModel';


@Injectable({
    providedIn: 'root'
})
export class CustomerService {
    apiUrl = 'https://localhost:7026/api/Customers/getall';

    constructor(private httpClient: HttpClient) { }

    getCustomersDetail(): Observable<ListResponseModel<Customer>> {
        return this.httpClient.get<ListResponseModel<Customer>>(this.apiUrl);
    }
    getCustomerByUserId(userId: number): Observable<SingleResponseModel<Customer>> {
        let newPath = this.apiUrl + 'https://localhost:7026/api/getbyuserid?userid=' + userId;
        return this.httpClient.get<SingleResponseModel<Customer>>(newPath);
      }
}
