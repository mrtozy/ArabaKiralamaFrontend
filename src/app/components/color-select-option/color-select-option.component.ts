import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Color } from 'src/app/models/color/color';
import { ColorService } from 'src/app/services/color/color.service';
import { RouterService } from 'src/app/services/router/router.service.service';

@Component({
  selector: 'app-color-select-option',
  templateUrl: './color-select-option.component.html',
  styleUrls: ['./color-select-option.component.css']
})
export class ColorSelectOptionComponent implements OnInit {

  colors:Color[]
  colorId:number
  constructor(private colorService:ColorService,private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.getAll();
   
    this.activatedRoute.params.subscribe(params=>{
    this.colorId= params["colorId"]
    })
  }
  selectedTeam = '';
	onSelected(value:string): void {
		this.selectedTeam = value;
	}
  getAll(){
    this.colorService.getColors().subscribe(response=>{
      this.colors=response.data
    })
  }

 routeToCarDetailsPageByColorId(colorId:number){

    this.colorService.getColorsFillter(colorId).subscribe(response=>{
      this.colors=response.data
  
     
    })
  }

}
