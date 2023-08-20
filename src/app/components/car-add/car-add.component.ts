import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Brand } from 'src/app/models/brand/brand';
import { Color } from 'src/app/models/color/color';
import { BrandService } from 'src/app/services/brand/brand.service';
import { CarService } from 'src/app/services/car/car.service';
import { ColorService } from 'src/app/services/color/color.service';
import { ToastrService } from 'ngx-toastr'; 

import { CarImageService } from 'src/app/services/car-image-service/car-image-service';

import { Car } from 'src/app/models/car/car';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css']
})
export class CarAddComponent implements OnInit {
  brands: Brand[];
  brandsLoaded = false;

  colors: Color[];
  colorsLoaded = false;
  carId: number;
  images: any[] = [];
  cars: Car[] = [];

lastCarId: number | undefined;
  carAddForm: FormGroup;

  constructor(
    private colorService: ColorService,
    private brandService: BrandService,
    private carService: CarService,
    private imageService: CarImageService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {

    this.createCarAddForm()
    this.getColors()
    this.getBrands()
    this.getCars().subscribe(lastCarId => {
      this.carId = lastCarId+1;
     
    });
    
  }

  getBrands() {
    this.brandService.getBrands().subscribe(result => {
      if (result.success) {
        this.brands = result.data
        this.brandsLoaded = true
      }
    });
  }

  getColors() {
    this.colorService.getColors().subscribe(result => {
      if (result.success) {
        this.colors = result.data
        this.colorsLoaded = true
      }
    });
  }
  getCars(): Observable<number> {
    return this.carService.getCars().pipe(
      map(result => {
        if (result.success) {
          this.cars = result.data;
          this.colorsLoaded = true;
  
          let lastCarId: number | undefined;
  
          
          this.cars.forEach(car => {
            lastCarId = car.carId;
          });
  
          if (lastCarId !== undefined) {
            console.log('Last Car ID:', lastCarId);
            return lastCarId; 
          } else {
            console.log('No Car IDs found');
            return 0; 
          }
  
        } else {
          console.log('Error fetching cars');
          return 0; 
        }
      })
    );
  }
        
    
  

  
  createCarAddForm() {
    this.carAddForm = this.formBuilder.group({
      brandId: [0, [Validators.required]],
      colorId: [0, [Validators.required]],
      carName: ['', [Validators.required]],
      dailyPrice: [0, [Validators.required]],
      modelYear: [0, [Validators.required]],
      description: ['', [Validators.required]],
      findexScore: [0, [Validators.required]]
    });
  }

  setImages(event: any) {
    this.images = [];
    for (let file of event.files) {
      this.images.push(file);
    }
    let plural = this.images.length > 1 ? 's' : '';
    this.toastrService.success(`${this.images.length} file${plural} selected`);
  }

  addCar() {
    this.carService.addCar(this.carAddForm.value).subscribe(result => {
      if (result.success) {

        this.toastrService.success(result.message)
        if (this.images) {
       
          this.imageService.uploadImage(this.images, this.carId).subscribe(imageResult => {
            if (imageResult.success) {
              this.toastrService.success(imageResult.message);
              this.carAddForm.reset();
              this.images = [];
            }
            else {
              this.toastrService.error(imageResult.message, "Couldn't upload images")
            }
          })
        }
      }
      else {
        this.toastrService.error(result.message)
      }
    });
  }

}
