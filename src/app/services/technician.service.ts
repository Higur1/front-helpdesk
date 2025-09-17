import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../config/api.config';
import { Observable } from 'rxjs';
import { Technician } from '../models/technician';

@Injectable({
  providedIn: 'root'
})
export class TechnicianService {

  constructor(private httpClient: HttpClient) { }

  findAll(): Observable<Technician[]> {
    return this.httpClient.get<Technician[]>(`${API_CONFIG.baseUrl}/technicians`);
  }

  create(technician: Technician): Observable<Technician> {
    return this.httpClient.post<Technician>(`${API_CONFIG.baseUrl}/technicians`, technician);
  }
  
  findById(id: any): Observable<Technician>{
    return this.httpClient.get<Technician>(`${API_CONFIG.baseUrl}/technicians/${id}`);
  }

  update(technician: Technician): Observable<Technician> {
    return this.httpClient.put<Technician>(`${API_CONFIG.baseUrl}/technicians/${technician.id}`, technician)
  }

  delete(technician: Technician): Observable<Technician> {
    return this.httpClient.delete<Technician>(`${API_CONFIG.baseUrl}/technicians/${technician.id}`)
  }
}
