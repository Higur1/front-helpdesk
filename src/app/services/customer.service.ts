import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../config/api.config';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private httpClient: HttpClient) { }

  findAll(): Observable<Customer[]> {
    return this.httpClient.get<Customer[]>(`${API_CONFIG.baseUrl}/customers`);
  }

  create(customer: Customer): Observable<Customer> {
    return this.httpClient.post<Customer>(`${API_CONFIG.baseUrl}/customers`, customer);
  }
  
  findById(id: any): Observable<Customer>{
    return this.httpClient.get<Customer>(`${API_CONFIG.baseUrl}/customers/${id}`);
  }

  update(customer: Customer): Observable<Customer> {
    return this.httpClient.put<Customer>(`${API_CONFIG.baseUrl}/customers/${customer.id}`, customer)
  }

  delete(customer: Customer): Observable<Customer> {
    return this.httpClient.delete<Customer>(`${API_CONFIG.baseUrl}/customers/${customer.id}`)
  }
}
