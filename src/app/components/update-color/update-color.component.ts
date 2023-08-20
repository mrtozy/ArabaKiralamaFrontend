import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ColorService } from 'src/app/services/color/color.service';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color/color';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-update-color',
  templateUrl: './update-color.component.html',
  styleUrls: ['./update-color.component.css']
})
export class UpdateColorComponent implements OnInit {
   currentColorFromParent: Color;
  updateFormGroup: FormGroup;
  constructor(
    private colorService: ColorService,private router:ActivatedRoute,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService
    
  ) 
    {}
  renk =new FormGroup({
    colorName:new FormControl(''),
    

  });

  ngOnInit(): void {
    

   this.colorService.getColorsFillter( Number(this.router.snapshot.paramMap.get('colorId'))).subscribe((result:any)=>{
      
      this.renk =new FormGroup({
        colorName:new FormControl(result.data["colorName"], Validators.required),
      
    
      });
    });


  
  }

  
  UpdataData(){
  
    if(this.renk.valid){
      let a:any= this.renk.value.colorName;
      let color:Color=Object.assign({colorId:Number(this.router.snapshot.paramMap.get('colorId'))},{colorName:a})

      this.colorService.update(color).subscribe(response=>{
        this.toastrService.success(response.message)
      }, responseError=>{
        this.toastrService.error(responseError.error.message)
      })
    }
  }
 
}
