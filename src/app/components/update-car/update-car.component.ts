import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CarService } from 'src/app/services/car/car.service';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car/car';
import { CarImageService } from 'src/app/services/car-image-service/car-image-service';
import { CarImage } from 'src/app/models/car/carImage';
import { ColorService } from 'src/app/services/color/color.service';
import { BrandService } from 'src/app/services/brand/brand.service';
import { Brand } from 'src/app/models/brand/brand';
import { Color } from 'src/app/models/color/color';
@Component({
  selector: 'app-update-car',
  templateUrl: './update-car.component.html',
  styleUrls: ['./update-car.component.css']
})
export class UpdateCarComponent implements OnInit {
  cars: Car[] = [];
  images: CarImage[] = [];
  brands: Brand[];
  brandsLoaded = false;

  colors: Color[];
  colorsLoaded = false;
  updateFormGroup: FormGroup;
  constructor(
    private carService: CarService,private router:ActivatedRoute,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,private imageService:CarImageService, private colorService: ColorService,
    private brandService: BrandService,
    
  ) 
    {}
  car =new FormGroup({
    brandId:new FormControl(''),
    colorId:new FormControl(''),
    modelYear:new FormControl(''),
    dailyPrice:new FormControl(''),
    description:new FormControl(''),
    carName:new FormControl(''),
  


  });
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

  ngOnInit(): void {
   console.log("_______"+this.getImages())
    this.getColors()
    this.getBrands()

   this.carService.getbyid( Number(this.router.snapshot.paramMap.get('carId'))).subscribe((result:any)=>{
      
      this.car =new FormGroup({
        brandId:new FormControl(result.data["brandId"], Validators.required),
        colorId:new FormControl(result.data["colorId"], Validators.required),
        modelYear:new FormControl(result.data["modelYear"], Validators.required),
        dailyPrice:new FormControl(result.data["dailyPrice"], Validators.required),
        description:new FormControl(result.data["description"], Validators.required),
        carName:new FormControl(result.data["carName"], Validators.required),
      
    
      });
    });
    this.getImages();

  
  }
  deleteImage(image: CarImage) {
    this.imageService.deleteImage(image).subscribe(result => {
      if (result.success) {
        this.toastrService.success(result.message);
        this.getImages();
      }
    });
  }
  getImages() {
    
      this.imageService.getByCarId(Number(this.router.snapshot.paramMap.get('carId'))).subscribe(result => {
        if (result.success) {
          this.images = result.data;
        
        }
      });
    
  }
  uploadImages(event: any) {
    let imagesToUpload = []
    for (const image of event.files) {
      imagesToUpload.push(image)
    }
    this.imageService.uploadImage(imagesToUpload,
       Number(this.router.snapshot.paramMap.get('carId'))).subscribe(result => {
      if (result.success) {
        this.toastrService.success(result.message);
        this.getImages()
      }
    });
  }
  UpdataData(){
  
   if(this.car.valid){
      let bI:any= this.car.value.brandId;
      let cI:any= this.car.value.colorId;
      let mY:any= this.car.value.modelYear;
      let dP:any= this.car.value.dailyPrice;
      let d:any= this.car.value.description;
      let cN:any= this.car.value.carName;

      let car:Car=Object.assign({carId:Number(this.router.snapshot.paramMap.get('carId'))},
      {brandId:bI},{colorId:cI},{modelYear:mY},{dailyPrice:dP},{description:d},{carName:cN})

      this.carService.update(car).subscribe(response=>{
        this.toastrService.success(response.message)
      }, responseError=>{
        this.toastrService.error(responseError.error.message)
      })
    }
  }
 

}