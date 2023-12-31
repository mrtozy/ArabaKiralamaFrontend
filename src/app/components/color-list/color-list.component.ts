import { Component, OnInit } from '@angular/core';
import { Color } from 'src/app/models/color/color';
import { ColorService } from 'src/app/services/color/color.service';

@Component({
  selector: 'app-color-list',
  templateUrl: './color-list.component.html',
  styleUrls: ['./color-list.component.css']
})


  export class ColorListComponent implements OnInit {
    
    colors: Color[]
    constructor(private colorService: ColorService) { }
  
    ngOnInit(): void {
      this.getAll();
    }
  
    getAll() {
      this.colorService.getColors().subscribe(response => {
        this.colors = response.data
      })
   

    }
  
  }
