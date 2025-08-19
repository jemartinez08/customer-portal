import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ServiceNowQueryParams {
  instanceUrl: string;
  username: string;
  password: string;
  table: string;
  queryParams?: Record<string, any>;
}

@Injectable({
  providedIn: 'root' // disponible globalmente
})
export class ServicenowService {
  private apiUrl = 'http://localhost:3000/api/servicenow/query';

  constructor(private http: HttpClient) {}

  queryServiceNow(payload: ServiceNowQueryParams): Observable<any> {
    return this.http.post<any>(this.apiUrl, payload);
  }
}