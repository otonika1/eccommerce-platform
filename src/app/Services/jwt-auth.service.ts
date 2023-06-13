import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
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
  helper = new JwtHelperService();
  //private currentUserSubj = BehaviorSubject<any>
  Auth(obj:any):Observable<any>{
   
    return this.http.post<any>(`http://localhost:5005/api/v1/auth/authenticate`,obj)
    .pipe(map( user => {
      localStorage.setItem('jwt',user.token);
      let userInfo = this.helper.decodeToken(user.token);
      localStorage.setItem('role',userInfo.role);
      localStorage.setItem('currentUser', JSON.stringify(userInfo));
      
      //this.currentUserSubj.next(user);
    }));
    
  }
  registration(obj:any):Observable<any>{
    return this.http.post<any>(`http://localhost:5005/api/v1/auth/register`,obj);
    
  }
}
