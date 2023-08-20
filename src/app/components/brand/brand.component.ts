import {Component, OnInit} from '@angular/core';
import {Car} from "../../models/car/car";
import {Brand} from "../../models/brand/brand";
import {BrandService} from "../../services/brand/brand.service";
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-brand',
    templateUrl: './brand.component.html',
    styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {
    brands: Brand[] = [];
    dataLoaded = false;
    currentBrad:Brand ;
    constructor(private brandService:BrandService,private activatedRoute: ActivatedRoute) { }

    ngOnInit(): void {
      
          this.getBrands();
       
      }
    

    getBrands() {
        this.brandService.getBrands().subscribe(response => {
            this.brands = response.data;
            this.dataLoaded = true;
        });
    }

    
    getCurrentBrandClass(brand: Brand) {
        if (brand == this.currentBrad) {
          return 'list-group-item active';
        } else {
          return 'list-group-item';
        }
      }
      setCurrentBrand(brand: Brand) {
        this.currentBrad = brand;
      }
      getAllBrandClass() {
        if (!this.currentBrad) {
          return 'list-group-item active';
        } else {
          return 'list-group-item';
        }
      }
}
