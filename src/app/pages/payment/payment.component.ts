import { Component, OnInit } from '@angular/core';
import { PaymentService } from 'src/app/services/payment.service'; // Assuming you have a service to fetch payment data

declare var Razorpay: any;
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})

export class PaymentComponent implements OnInit {
  invoice: any;

  payWithRazorpay() {
    var options = {
      "key": "your_razorpay_key", // Enter your key here
      "amount": this.invoice.total * 100, // amount in the smallest currency unit
      "currency": "INR",
      "name": "Acme Corp",
      "description": "Test Transaction",
      "image": "https://example.com/your_logo",
      "handler": function (response: any){
          alert(response.razorpay_payment_id);
      },
      "prefill": {
          "name": "Gaurav Kumar",
          "email": "gaurav.kumar@example.com"
      },
      "notes": {
          "address": "Razorpay Corporate Office"
      },
      "theme": {
          "color": "#F37254"
      }
    };
    var rzp1 = new Razorpay(options);
    rzp1.open();
  }

  constructor(private paymentService: PaymentService) { }

  ngOnInit(): void {
    this.paymentService.getInvoice().subscribe(invoice => {
      this.invoice = invoice;
    });
  }

  printInvoice() {
    window.print();
  }
}