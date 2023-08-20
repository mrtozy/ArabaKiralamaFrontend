import {Component, OnInit} from '@angular/core';
import {CarService} from "../../services/car/car.service";
import {Car} from "../../models/car/car";
import { ActivatedRoute } from '@angular/router';
import { CarDetailDto } from 'src/app/models/car/CarDetailDto';
import { CarImage } from 'src/app/models/car/carImage';
import { CarImageService } from 'src/app/services/car-image-service/car-image-service';
import { Observable } from 'rxjs/internal/Observable';
import { tap } from 'rxjs';
import { map } from 'rxjs/operators';
@Component({
    selector: 'app-car',
    templateUrl: './car.component.html',
    styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {
  carDetailDto:CarDetailDto;
   
    cars: Car[] = [];
    dataLoaded = false;
    filterText="";
    cr: CarImage[] = [];
   
    constructor(private carService: CarService, private activatedRoute: ActivatedRoute 
      ,private carImageService:CarImageService ) { }

    ngOnInit(): void {
        this.activatedRoute.params.subscribe((params) => {
       
          if (params['brandId']) {
            this.getCarsByBrandId(params['brandId']);
          }else if(params["colorId"]){
            this.getCarsByColor(params["colorId"])
          }
          else if(params["carid"]){
            this.getCarDetailsByCarId(params["carid"])
          
          }
          else {
            this.getCars();
          }
        });
        this.getAllCarImages();
      
       
        
      }
      getAllCarImages(){
        this.carImageService.getAllCarImages().subscribe(response => {
          this.cr = response.data;
        })
      }
      
      getCarImagePath(carId: number): string {
        let url: string | undefined; // Başlangıçta 'undefined' olarak tanımlıyoruz
      
        for (const carImage of this.cr) {
          if (carImage.carId === carId) {
            url = "https://localhost:7026/" + carImage.imagePath;
            break; // İlk uygun resmi bulduktan sonra döngüyü kır
          }
        }
      
        if (url === undefined) {
          url = "https://localhost:7026/images/default.jpg"; // Varsayılan resim yolu
        }
      
        return url;
      }
      
    
    getCarsByBrandId(brandId: number) {
        this.carService.getCarsByBrandId(brandId).subscribe((response) => {
          this.cars = response.data;
          this.dataLoaded = true;
          
          console.log(response.data);
        });
      }

      getCars() {
        this.carService.getCars().subscribe(response => {
          this.cars = response.data;
          this.dataLoaded = true;
         
        });
      }
    getCarsByColor(colorId:number) {
      this.carService.getCarsByColor(colorId).subscribe(response=>{
        this.cars=response.data
        this.dataLoaded=true;
      })
    }
    getCarDetailsByCarId(carid:number) {
      this.carService.getCarDetailsByCarId(carid).subscribe(response=>{
        this.carDetailDto=response.data
      
      })
    }
    
   
  
   
    
    
    
    }
    
    
  
   
  
      

