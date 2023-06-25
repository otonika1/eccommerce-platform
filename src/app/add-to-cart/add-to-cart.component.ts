import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.scss']
})
export class AddToCartComponent implements OnInit {

  constructor(public auth:AuthService) { }
  arr:any;
  history:any
  p:any;
  CurrUserName:any;
  r:any;
  balance:any;
  email:any;
  password:any;
  id:any;
  lastname:any;
  sum:number = 0;
  sum2:number = 0;
  succesMsg:boolean = false;
  dangerMsg:boolean = false;

  noItemsInCart:boolean = false;
  success:boolean = false;
  t:any;

  currentClient:any;
  currentClientId:any;

  lg1:any;
  lg2:any;
  ngOnInit(): void {
    
    
    this.lg1 = localStorage.getItem("lang") == "geo"
    this.lg2 = localStorage.getItem("language") == "ka" && localStorage.getItem("lang") != "geo" && localStorage.getItem("lang") != "en" 
    this.currentClient = JSON.parse(localStorage.getItem('currentUser') || '{}')
    this.currentClientId = this.currentClient.id
    console.log(this.currentClientId);
    this.getCart()
    
  }
  getCart(){
    this.auth.getCartByClientId(this.currentClientId).subscribe(res => {
      //console.log(res);
      this.arr = res
      for(let i = 0; i < this.arr.length; i++){
        this.sum += this.arr[i].price
        this.sum = Math.round(this.sum)
      } 
    
    })
  }
  remove(id:number){
    this.auth.deleteCart(id).subscribe(res => {
      console.log(res);
      this.getCart()
      this.succesMsg = true;
      setTimeout(() => {
        this.succesMsg = false;
      },2000)
    })
  }
  removeAll(){
    this.auth.deleteAllCart().subscribe( () => {
      this.getCart()
      this.succesMsg = true;
      alert
      setTimeout(() => {
        this.succesMsg = false;
      },2000)
    })
  }
  modal(){
    if(this.sum > 0){
      this.success = true;
    }else{
      this.noItemsInCart = true;
      setTimeout(() => {this.noItemsInCart=false;},2000)
    }
  }
  payAll(){
    this.auth.getById(this.currentClientId).subscribe(res => {
      this.currentClient = res
    });
    if(this.currentClient.balance > this.sum && this.sum > 0){
      this.auth.pay(this.currentClientId,this.sum,this.currentClient).subscribe(res => {
        let user = JSON.parse(localStorage.getItem('currentUser') || '{}')
        localStorage.removeItem('currentUser')
        user.balance = res.balance
        localStorage.setItem('currentUser', JSON.stringify(user))
        this.removeAll()
        window.location.reload()
      })
    }else if(this.sum > 0){
      this.dangerMsg = true;
      setTimeout(() => {this.dangerMsg = false;},2000)
    }
  }

}
