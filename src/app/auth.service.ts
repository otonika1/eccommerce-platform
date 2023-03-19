import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  curr:any[] = []
  constructor(    private http: HttpClient,
    private router: Router,) { }
  //getuser
  getuser():any{
    return this.http.get(`${environment.BaseUrl}users`)
  }
  //getuserbyid
  getuserByid(id:number):any{
    return this.http.get(`${environment.BaseUrl}users/${id}`)
  }
  edituserByid(id:number,obj:any):any{
    return this.http.put(`${environment.BaseUrl}users/${id}`,obj)
  }
  //post user
  create(form:any){
    
    return this.http.post(`${environment.BaseUrl}users`,form)
  }
  //edituser
  edituser(id:number,obj:any):any{
    return this.http.put(`${environment.BaseUrl}users/${id}`,obj)
  }
  //deleteuser
  deleteuser(id:number):any{
    return this.http.delete(`${environment.BaseUrl}users/${id}`)
  }
  //editcurrentuser
  CurrentUser(obj:any){
    return this.http.put(`${environment.BaseUrl}userInfo`,obj)
  }
  //getcurrentuser
  getCurrentUser():any{
    return this.http.get(`${environment.BaseUrl}userInfo`)
  }
  //getstoreitems
  getStoreItems():any{
    return this.http.get(`${environment.BaseUrl}store`)
  }
    //post store
  createStore(form:any){
    return this.http.post(`${environment.BaseUrl}regStore`,form)
  }
  getStore(){
    return this.http.get(`${environment.BaseUrl}regStore`)
  }
  getStorebyId(id:number){
    return this.http.get(`${environment.BaseUrl}regStore/${id}`)
  }
  postStorebyId(id:number,obj:any){
    return this.http.put(`${environment.BaseUrl}regStore/${id}`,obj)
  }
  deleteStore(id:number){
    return this.http.delete(`${environment.BaseUrl}regStore/${id}`)
  }

  //editcart
  editCart(id:number,obj:any){
    return this.http.put(`${environment.BaseUrl}cart/${id}`,obj)
  }
  //getcart
  getCart(){
    return this.http.get(`${environment.BaseUrl}cart`)
  }
  //post history
  postHystory(obj:any){
    return this.http.post(`${environment.BaseUrl}history`,obj)
  }
  //post history
  getHystory(){
    return this.http.get(`${environment.BaseUrl}history`)
  }
}
