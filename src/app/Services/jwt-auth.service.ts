import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JwtAuthService {

  constructor( private http: HttpClient,private router: Router) { }
  
  token:any = localStorage.getItem('jwt');
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': this.token ? `Bearer ${this.token}`: ''
  });
  requestOptions = { headers: this.headers };
  

  Auth(obj:any):Observable<any>{
   
    return this.http.post<any>(`http://localhost:5005/api/v1/auth/authenticate`,obj);
    
  }
  registration(obj:any):Observable<any>{
    return this.http.post<any>(`http://localhost:5005/api/v1/auth/register`,obj);
    
  }
}
