import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators   } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Car } from 'src/app/models/car/car';
import { CarDetailDto } from 'src/app/models/car/CarDetailDto';

import { CarImage } from 'src/app/models/car/carImage';
import { Customer } from 'src/app/models/customer/customer';
import { Rental } from 'src/app/models/rental/rental';
import { CarImageService } from 'src/app/services/car-image-service/car-image-service';
import { CarService } from 'src/app/services/car/car.service';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { RentalService } from 'src/app/services/rental/rental.service';

@Component({
  selector: 'app-car-detail-page',
  templateUrl: './car-detail-page.component.html',
  styleUrls: ['./car-detail-page.component.css']
})
export class CarDetailPageComponent implements OnInit {

  carDetail:CarDetailDto;
  cars: Car[] = [];
  addFormGroup: FormGroup;
  carImages:CarImage[];
  dataLoaded = false;
  currentImage: CarImage;
  customers: Customer[] = [];
  imageUrl = "https://localhost:7026"
  defoult="https://localhost:7026/images/default.jpg"
 
 
  currentCarId: number;

  constructor(private carDetailService:CarService, private carImageService:CarImageService,  
    
     private activatedRoute:ActivatedRoute, private customerService: CustomerService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
     
      this.getImageByCarId(params["carId"]);
      this.getCarById(params["carId"]);

      

      this.getCarDetailsByCarId(params["carId"]);
    
   
    
   
    })
  }

   getCarById(carId:number){
   this.carDetailService.getbyid(carId).subscribe(response => {
      this.cars = response.data;
      this.dataLoaded = true;
    })
 }

  getImageByCarId(carId:number){
    this.carImageService.getByCarId(carId).subscribe(response => {
      if(response){
        this.carImages = response.data;
        this.dataLoaded = true;
      }else{
        this.defoult
      }
     
      
    })
  }
  getCarDetailsByCarId(carId:number){
    this.carDetailService.getCarDetailsByCarId(carId).subscribe(response=>{
      this.carDetail=response.data
      console.log(response.data)
    })
      }
  getButtonClass(image: CarImage) {
    if ((image === this.carImages[0])) {
      return 'active';
    } else {
      return '';
    }
  }
  

  getCurrentImageClass(image: CarImage) {
    if (this.carImages[0] == image) {
      return 'carousel-item active';
    } else {
      return 'carousel-item ';
    }
  }

  setCurrentImageClass(image: CarImage) {
    this.currentImage = image;
  }

  getCarImage(carImage:CarImage, carId: number){
    if (carImage.carId == 0) {
      let path = this.imageUrl + "/images/default.png"
      return path;

    }
    else{
      let path = this.imageUrl + carImage.imagePath;
      return path;
    }
  }
 


  getCurrentCustomer() {
    this.customerService.getCustomersDetail().subscribe(response => {
      this.customers = response.data;
    });
  }
}
