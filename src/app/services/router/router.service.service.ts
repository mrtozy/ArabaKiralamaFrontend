import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouterService{

  constructor(private router: Router) { 
   
  
  }
  carDetailsPageByColorId(colorId: number) {
    if (colorId > 0) this.router.navigate([  colorId])
  }
}
