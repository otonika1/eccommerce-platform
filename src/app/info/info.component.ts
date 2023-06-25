import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AuthService } from '../Services/auth.service';
import { Observable, pipe } from 'rxjs';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {
  lang:any
  constructor(private auth:AuthService) { }
  role:any
  arr: any[] = []
  clone:any
  clientId:any
  filterName = new FormControl();
  p: number = 1;

  clientObj:any
  filter(){
    if(this.filterName.value.length == 0){
      this.arr = this.clone
    }
    else{
      this.arr = this.arr.filter( el =>  el.name.toLowerCase() === this.filterName?.value.toLowerCase( ))
    } 
  }
  refreshFilter(){
    this.arr = this.clone
  }
  Observable = new Observable((observer) => {
    //observer.next(this.getSore())
    //observer.complete();
    //observer.next(this.getClients())
    //observer.complete();
    observer.next(this.getAll())
    observer.complete();
  })
  ngOnInit(): void {
    this.clientId = JSON.parse(localStorage.getItem('currentUser') || '{}')
    this.clientId = this.clientId.id
    
    this.Observable.subscribe();
    this.lang = localStorage.getItem("lang") || 'en'
    this.role = localStorage.getItem("role")   

    this.auth.getById(this.clientId).subscribe(res => {
      this.clientObj = res
    });
  }
  Clients:any[] = []

  changeLg(lg:any){
    localStorage.setItem("lang",lg.value)
    window.location.reload()
  }
  
  addToCart(id:number){
    let obj = {}
    this.auth.getProductById(id).subscribe(res => {
      obj = {
        clientId:this.clientId,
        productId:res.id,
        name:res.name,
        name_geo:res.name_geo,
        description:res.description,
        description_geo:res.description_geo,
        price:res.price,
        img:res.img,
      }
      this.auth.createCart(obj).subscribe( res => {
        console.log(res);
        this.succesMsg = true;
        setTimeout(() => {this.succesMsg = false;},2000)
      })
    })
    
    
    
  }

  CurrUserName:string | undefined
  r:string | undefined
  balance!:number
  email:string | undefined
  password:string | undefined
  id!:number
  lastname:string | undefined
  succesMsg:boolean =false
  dangerMsg:boolean =false


  items:any
  items2:any
  arr2:any

  cartItems:any = []

  getAll(){
    this.auth.getAllProduct().subscribe(res => {
      console.log(res);
      this.arr = res
    });
  }
  pay(price:number){   
    if(this.clientObj.balance > price){
      this.auth.pay(this.clientId,price,this.clientObj).subscribe(res => {
        let user = JSON.parse(localStorage.getItem('currentUser') || '{}')
        localStorage.removeItem('currentUser')
        user.balance = res.balance
        localStorage.setItem('currentUser', JSON.stringify(user))
        window.location.reload()
        this.succesMsg = true;
        setTimeout(() => {this.succesMsg = false;},2000)
      });
    }
    else{
      this.dangerMsg = true;
      setTimeout(() => {this.dangerMsg = false;},2000)
    }
  }
}
