import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(
    private formBuilder: FormBuilder,
  ) { }
  createCarForm(): FormGroup {
    return this.formBuilder.group({
      brandId: ["", [Validators.required]],
      colorId: ["", [Validators.required]],
      carName: ["", [Validators.required]],
      modelYear: ["", [Validators.required]],
      dailyPrice: ["", [Validators.required]],
      description: ["", [Validators.required]]
    })
  }
}
