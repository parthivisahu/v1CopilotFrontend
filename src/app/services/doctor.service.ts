import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  private apiUrl = 'https://localhost:44313/api'; // replace with your API URL

  constructor(private http: HttpClient) { }

  getDoctors(): Observable<any> {
    return this.http.get(`${this.apiUrl}/doctor`);
  }

  getDoctor(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/doctor/${id}`);
  }

  editDoctor(id: number, doctorData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/doctor/${id}`, doctorData);
  }

  deleteDoctor(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/doctor/${id}`);
  }
}