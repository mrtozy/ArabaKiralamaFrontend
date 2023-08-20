import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarDetailDto } from 'src/app/models/car/CarDetailDto';
import { Payment } from 'src/app/models/payment/payment';
import { Rental } from 'src/app/models/rental/rental';
import { CarService } from 'src/app/services/car/car.service';
import { PaymentService } from 'src/app/services/payment/payment.service';
import { RentalService } from 'src/app/services/rental/rental.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  car: CarDetailDto;
  cardOwner: string = '';
  cardNumber: string = '';
  expiryMonthAndYear: string = '';
  cvv: string = '';
  datesDiff: number;
  total: any;
  rentDate: string;
  returnDate: string;
  carDataUpdated = true;
  carImagesUpdated = true;
  currentCarId: number;
  savedCard: boolean = false;
  kartOdemeBos:boolean=true
  constructor(
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private paymentService: PaymentService,
    private rentalService: RentalService,
    private router: Router,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params['carId']) {
        this.getCarById(params['carId']);

        this.datesDiff = Number(params['datesDiff']);
        this.currentCarId = Number(params['carId']);
        this.rentDate = params['rentDate'];
        this.returnDate = params['returnDate'];

        this.paymentService.getUserById(localStorage.getItem('userId')).subscribe(response => {
         
          const payment = response.data;
          if(payment==null){
            this.kartOdemeBos=false;
          }

          if(payment.savedCard){
            this.cardOwner = payment.fullName;
            this.cardNumber = payment.cardNumber;
            this.expiryMonthAndYear = `${payment.expiryMonth}/${payment.expiryYear}`;
            this.cvv = payment.cvv;
            this.savedCard = payment.savedCard;
          }
         
        });
      }
    });
  }

  getCarById(carId: number) {
    this.carService.getCarDetailsByCarId(carId).subscribe(response => {
      this.car = response.data;

      this.total = this.datesDiff * this.car.dailyPrice;
      this.carDataUpdated = true;
    });
  }

  addRental() {
    const rental: Rental = {
      rentalId: 0,
      carId: this.currentCarId,
      customerId: Number(localStorage.getItem('userId')),
      rentDate: new Date(this.rentDate),
      returnDate: new Date(this.returnDate)
    };

    this.rentalService.rentalAdding(rental).subscribe(response => {
      this.toastrService.success(response.message);
    });
  }

  pay() {
    if (this.expiryMonthAndYear && this.cardNumber && this.cardOwner && this.cvv) {
      const payment: Payment = {
        id: 0,
        customerId: Number(localStorage.getItem('userId')),
        fullName: this.cardOwner,
        cardNumber: this.cardNumber.replace(/\s/g, ''),
        expiryMonth: Number(this.expiryMonthAndYear.split('/')[0]),
        expiryYear: Number(this.expiryMonthAndYear.split('/')[1]),
        cvv: this.cvv,
        savedCard: this.savedCard
      };


     if(this.kartOdemeBos==false){
      this.paymentService.pay(payment).subscribe(
        (response) => {
          this.toastrService.success(response.message);
          this.addRental();
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 1000);
        },
        (error) => {
          this.toastrService.error(error.error.message);
        }
      );
     }
     else{
      this.addRental();
      setTimeout(() => {
        this.router.navigate(['/']);
      }, 1000);
     }
    } else {
      this.toastrService.error('Lütfen boş alan bırakmayınız veya geçerli bilgileri giriniz.');
    }
  }
}
