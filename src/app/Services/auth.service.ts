import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Clients } from '../admin/clients';
import { Carousel } from '../slider/carousel';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  curr:any[] = []
  constructor(    private http: HttpClient,
    private router: Router,) { }
  //getuser
  getuser():Observable<Clients[]>{
    return this.http.get<Clients[]>(`${environment.BaseUrl}users`)
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
  //carousel
  getCarousel():Observable<Carousel[]>{
    return this.http.get<Carousel[]>(`${environment.BaseUrl}carousel`)
  }


  //java integration
  token:any = localStorage.getItem('jwt')
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': this.token ? `Bearer ${this.token}`: ''
  });
  requestOptions = { headers: this.headers };
  Auth(obj:any):Observable<any>{
    
    return this.http.post<any>(`http://localhost:5005/api/v1/auth/authenticate`,obj)
  }
  //Users
  getAll():Observable<any>{
  
    return this.http.get<any>(`http://localhost:5005/api/client/all`,this.requestOptions)
  }
  getById(id:number):Observable<any>{
  
    return this.http.get<any>(`http://localhost:5005/api/client/${id}`,this.requestOptions)
  }
  edit(id:number,obj:any):Observable<any>{
  
    return this.http.put<any>(`http://localhost:5005/api/client/edit/${id}`,obj,this.requestOptions)
  }
  pay(id:number,price:number, obj:any):Observable<any>{
  
    return this.http.put<any>(`http://localhost:5005/api/client/pay/${id}?price=${price}`,obj,this.requestOptions)
  }
  del(id:number):Observable<any>{
  
    return this.http.delete<any>(`http://localhost:5005/api/client/delete/${id}`,this.requestOptions)
  }

  //Store
  getAllStore():Observable<any>{
  
    return this.http.get<any>(`http://localhost:5005/api/store/all`,this.requestOptions)
  }
  createSt(obj:any):Observable<any>{
  
    return this.http.post<any>(`http://localhost:5005/api/store/create`,obj,this.requestOptions)
  }
  getByIdStore(id:number):Observable<any>{
  
    return this.http.get<any>(`http://localhost:5005/api/store/${id}`,this.requestOptions)
  }
  editStore(id:number,obj:any):Observable<any>{
  
    return this.http.put<any>(`http://localhost:5005/api/store/edit/${id}`,obj,this.requestOptions)
  }
  delStore(id:number):Observable<any>{
  
    return this.http.delete<any>(`http://localhost:5005/api/store/delete/${id}`,this.requestOptions)
  }
  //Product
  deleteProduct(id:number):Observable<any>{
  
    return this.http.delete<any>(`http://localhost:5005/api/products/delete/${id}`,this.requestOptions)
  }
  getAllProduct():Observable<any>{
  
    return this.http.get<any>(`http://localhost:5005/api/products/all`,this.requestOptions)
  }
  editProduct(id:number,obj:any):Observable<any>{
  
    return this.http.put<any>(`http://localhost:5005/api/products/edit/${id}`,obj,this.requestOptions)
  }
  createProduct(obj:any):Observable<any>{
  
    return this.http.post<any>(`http://localhost:5005/api/products/create`,obj,this.requestOptions)
  }
  //Carousel
  
}
