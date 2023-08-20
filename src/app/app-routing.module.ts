import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { BrandListComponent } from './components/brand-list/brand-list.component';

import { CarAddComponent } from './components/car-add/car-add.component';
import { CarDetailPageComponent } from './components/car-detail-page/car-detail-page.component';
import { CarComponent } from './components/car/car.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { ColorListComponent } from './components/color-list/color-list.component';
import { ColorSelectOptionComponent } from './components/color-select-option/color-select-option.component';


import { PaymentComponent } from './components/payment/payment.component';
import { RentalComponent } from './components/rental/rental.component';
import { UpdateBrandComponent } from './components/update-brand/update-brand.component';
import { UpdateCarComponent } from './components/update-car/update-car.component';
import { UpdateColorComponent } from './components/update-color/update-color.component';
import { LoginComponent } from './components/login/login.component';
import { LoginGuard } from './guards/login.guard';
import { RegisterComponent } from './components/register/register.component';
import { GirisComponent } from './giris/giris.component';
import { AdminComponent } from './components/admin/admin.component';

const routes: Routes = [ {path:"", pathMatch:"full", component:CarComponent},
{path:"cars",component:CarComponent},
{path:"colors:colorId",component:ColorSelectOptionComponent},
{path:"colors",component:ColorListComponent},
{path:"brands",component:BrandListComponent},
{path:"colors/update/:colorId",component:UpdateColorComponent,canActivate:[LoginGuard]},
{path:"brand/update/:brandId",component:UpdateBrandComponent,canActivate:[LoginGuard]},
{path:"cars/update/:carId",component:UpdateCarComponent ,canActivate:[LoginGuard]},


{path:"cars/brand/:brandId", component:CarComponent},
{path:"cars/color/:colorId", component:CarComponent},
{path:"payment/:carId/:datesDiff/:rentDate/:returnDate", component:PaymentComponent,canActivate:[LoginGuard]},
{path:"rentals", component:RentalComponent},

{path:"cars/car-detail-page/:carId", component:CarDetailPageComponent,canActivate:[LoginGuard]},
{path:"cars/add", component:CarAddComponent ,canActivate:[LoginGuard]},
{path:"brands/add", component:BrandAddComponent ,canActivate:[LoginGuard]},
{path:"colors/add", component:ColorAddComponent ,canActivate:[LoginGuard]},

{path:"login", component:LoginComponent ,canActivate:[LoginGuard]},
{path:"register", component:RegisterComponent ,canActivate:[LoginGuard]},
{path:"giris", component:GirisComponent ,canActivate:[LoginGuard]},
{path:"admin", component:AdminComponent ,canActivate:[LoginGuard]},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
