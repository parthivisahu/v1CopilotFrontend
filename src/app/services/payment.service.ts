import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private apiUrl = 'http://your-api-url'; // Replace with your API URL

  constructor(private http: HttpClient) { }

  getInvoice(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/invoice`); // Replace with your API endpoint
  }
}