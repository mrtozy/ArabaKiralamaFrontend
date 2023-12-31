import {Component, OnInit} from '@angular/core';
import {ColorService} from "../../services/color/color.service";
import {Color} from "../../models/color/color";
import { ActivatedRoute } from '@angular/router';
@Component({
    selector: 'app-color',
    templateUrl: './color.component.html',
    styleUrls: ['./color.component.css']
})
export class ColorComponent implements OnInit {
   
    colors: Color[] = [];
    currentColor:Color ;
    colory=false;
    dataLoaded=false;

    constructor(private colorService: ColorService) { }

    ngOnInit(): void {
     
          this.getColors();
          this.colory=true;
       
    }
    setCurrentColor(color:Color){
        
       this.currentColor=color;
     
      }
    getColors() {
        this.colorService.getColors().subscribe(response => {
            this.colors = response.data;
            this.dataLoaded = true;
        });
    }
    getCurrentColorClass(color:Color){
        if(this.currentColor==color){
          return "list-group-item active"
        }else{
          return "list-group-item"
        }
    
      }
    

}
