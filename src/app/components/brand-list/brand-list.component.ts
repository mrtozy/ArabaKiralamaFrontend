import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/models/brand/brand';
import { BrandService } from 'src/app/services/brand/brand.service';
import { BrandComponent } from '../brand/brand.component';

@Component({
  selector: 'app-brand-list',
  templateUrl: './brand-list.component.html',
  styleUrls: ['./brand-list.component.css']
})
export class BrandListComponent implements OnInit {

  
  brands: Brand[]
  constructor(private brandService: BrandService) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.brandService.getBrands().subscribe(response => {
      this.brands = response.data
    })
 

  }

}
