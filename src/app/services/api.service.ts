import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpOptions } from '@capacitor/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private domain: string = "https://localhost:7177/api/";
  constructor(private httpClient: HttpClient) { }

  private httpOptions = {
    headers: {'Content-Type': 'application/json'},
    withCredentials: true
  }


  get(endpoint: string) {
    return this.httpClient.get(`${this.domain}${endpoint}`,);
  }

  post(endpoint: string, body: any) {
    return this.httpClient.post<any>(`${this.domain}${endpoint}`, JSON.stringify(body), this.httpOptions);
  }

  put(endpoint: string, body: any) {
    return this.httpClient.put<any>(`${this.domain}${endpoint}`, JSON.stringify(body), this.httpOptions);
  }
}
