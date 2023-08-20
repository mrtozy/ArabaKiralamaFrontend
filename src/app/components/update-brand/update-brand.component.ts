import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Brand } from 'src/app/models/brand/brand';
import { BrandService } from 'src/app/services/brand/brand.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-update-brand',
  templateUrl: './update-brand.component.html',
  styleUrls: ['./update-brand.component.css']
})
export class UpdateBrandComponent implements OnInit {

 
  updateFormGroup: FormGroup;
  constructor(
    private brandService: BrandService,private router:ActivatedRoute,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService
    
  ) 
    {}
  brand =new FormGroup({
    brandName:new FormControl(''),
    

  });

  ngOnInit(): void {
    

   this.brandService.getBrandsFillter( Number(this.router.snapshot.paramMap.get('brandId'))).subscribe((result:any)=>{
      
      this.brand =new FormGroup({
        brandName:new FormControl(result.data["brandName"], Validators.required),
      
    
      });
    });
  
  }

  
  UpdataData(){
  
    if(this.brand.valid){
      let a:any= this.brand.value.brandName;
      let brand:Brand=Object.assign({brandId:Number(this.router.snapshot.paramMap.get('brandId'))},{brandName:a})

      this.brandService.update(brand).subscribe(response=>{
        this.toastrService.success(response.message)
      }, responseError=>{
        this.toastrService.error(responseError.error.message)
      })
      
    }
  }
 

}
