import { CarImage } from "./carImage"

export interface Car{
   
    carId:number
   brandId:number
     colorId:number
    modelYear:number
    dailyPrice:number
    carName:string
    colorName:string
    brandName:string
    carImages: CarImage[];
    minFindexScore: number;
    description:string
    
}


