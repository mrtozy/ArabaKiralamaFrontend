import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarComponent } from './components/car/car.component';
import { ColorComponent } from './components/color/color.component';
import { BrandComponent } from './components/brand/brand.component';
import { RentalComponent } from './components/rental/rental.component';
import { CustomerComponent } from './components/customer/customer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NaviComponent } from './components/navi/navi.component';
import { CarDetailPageComponent } from './components/car-detail-page/car-detail-page.component';
import { FilterCarPipePipe } from './pipes/filter-car-pipe.pipe';
import { FilterColorPipePipe } from './pipes/filter-color-pipe.pipe';
import { FilterRentalPipePipe } from './pipes/filter-rental-pipe.pipe';
import { ColorSelectOptionComponent } from './components/color-select-option/color-select-option.component';
import { BrandSelectOptionComponent } from './components/brand-select-option/brand-select-option/brand-select-option.component';
import { PaymentComponent } from './components/payment/payment.component';

import { ToastrModule } from 'ngx-toastr';
import { CarAddComponent } from './components/car-add/car-add.component';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { UpdateColorComponent } from './components/update-color/update-color.component';
import { ColorListComponent } from './components/color-list/color-list.component';
import { UpdateBrandComponent } from './components/update-brand/update-brand.component';
import { BrandListComponent } from './components/brand-list/brand-list.component';
import { UpdateCarComponent } from './components/update-car/update-car.component';
import { LoginComponent } from './components/login/login.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { RegisterComponent } from './components/register/register.component';
import { GirisComponent } from './giris/giris.component';
import { AdminComponent } from './components/admin/admin.component';





@NgModule({
  declarations: [
    AppComponent,
 
   
    CarComponent,
    ColorComponent,
    BrandComponent,
    RentalComponent,
    CustomerComponent,
    NaviComponent,
    CarDetailPageComponent,
    FilterCarPipePipe,
    FilterColorPipePipe,
    FilterRentalPipePipe,
    ColorSelectOptionComponent,
    BrandSelectOptionComponent,
    PaymentComponent,
    CarAddComponent,
    BrandAddComponent,
    ColorAddComponent,
    UpdateColorComponent,
    ColorListComponent,
    UpdateBrandComponent,
    BrandListComponent,
    UpdateCarComponent,
    LoginComponent,
    RegisterComponent,
    GirisComponent,
    AdminComponent,
  
  
    
   
  ],
  imports: [
    BrowserModule,
    
    AppRoutingModule,
     HttpClientModule,
     FormsModule,
      ReactiveFormsModule,
     
      ToastrModule.forRoot({
        positionClass:"toast-bottom-right"
      })
  ],
  providers: [ { provide: HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
