import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Brand } from 'src/app/models/brand/brand';
import { BrandService } from 'src/app/services/brand/brand.service';

@Component({
  selector: 'app-brand-select-option',
  templateUrl: './brand-select-option.component.html',
  styleUrls: ['./brand-select-option.component.css']
})
export class BrandSelectOptionComponent implements OnInit {

  brands:Brand[]
  brandId:number
  constructor(private brandService:BrandService,private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.getAll();
   
    this.activatedRoute.params.subscribe(params=>{
    this.brandId= params["brandId"]
    })
  }
  selectedTeam = '';
	onSelected(value:string): void {
		this.selectedTeam = value;
	}
  getAll(){
    this.brandService.getBrands().subscribe(response=>{
      this.brands=response.data
    })
  }

 routeToCarDetailsPageByColorId(brandId:number){

    this.brandService.getBrandsFillter(brandId).subscribe(response=>{
      this.brands=response.data
    
      
     
    })
  }


}
