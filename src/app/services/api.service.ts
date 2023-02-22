import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private domain: string = "https://localhost:7177/api/";
  constructor(private httpClient: HttpClient) { }

  private httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json', withCredentials: 'true'})
  }


  get(endpoint: string) {
    return this.httpClient.get(`${this.domain}${endpoint}`, this.httpOptions);
  }

  post(endpoint: string, body: any) {
    return this.httpClient.post<any>(`${this.domain}${endpoint}`, JSON.stringify(body), this.httpOptions );
  }
}
