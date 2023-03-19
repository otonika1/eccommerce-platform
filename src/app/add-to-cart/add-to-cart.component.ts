import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

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
  success:boolean = false;
  t:any;
  ngOnInit(): void {
    this.auth.getCart().subscribe((res:any) => {
      this.arr = res[0].cartItems;
      console.log(this.arr);
      for(let i = 0; i < this.arr.length; i++){
        this.sum2 += this.arr[i].Price
        this.sum2 = Math.round(this.sum2)
      } 
    })
    this.auth.getHystory().subscribe((res:any) => {
      this.history = res
      console.log("history",this.history);
    })
  }
  remove(index:number){
    this.arr.splice(index,1);
    this.auth.editCart(1,{cartItems:this.arr}).subscribe(res => {
      console.log(res);
      window.location.reload()
    })
  }
  removeAll(){
    this.arr.splice(0);
    this.auth.editCart(1,{cartItems:this.arr}).subscribe(res => {
      console.log(res);
      window.location.reload()
    })
  }
  modal(){
    this.success = true;
  }
  
  buyAll(){
    this.auth.getCurrentUser().subscribe( (res:any) => {
      this.CurrUserName = res.name;
      this.r = res.role;
      this.email = res.email
      this.password = res.password
      this.balance = res.balance;
      this.lastname = res.balance;
      this.id = res.id
      
      for(let i = 0; i < this.arr.length; i++){
        this.sum += this.arr[i].Price
      }
      this.balance = Math.round((this.balance - this.sum) * 100) / 100;

      if (this.balance > 0){
        
        this.auth.edituserByid(this.id,{id:this.id,email:this.email,password:this.password,role:this.r,name:this.CurrUserName,balance:this.balance,lastname:this.lastname}).subscribe((res:any) => {
          console.log(res)
          
          for(let i = 0; i < this.arr.length; i++){
            
            this.auth.postHystory(this.arr[i]).subscribe();
          }
          
          this.auth.CurrentUser({id:this.id,email:this.email,password:this.password,role:this.r,name:this.CurrUserName,balance:this.balance}).subscribe(res => {console.log(res);
          window.location.reload()
          this.succesMsg = true;
          setTimeout(() => {this.succesMsg = false;},2000)
          this.removeAll();
          })
        })      
      }else{
        this.dangerMsg = true;
          setTimeout(() => {this.dangerMsg = false;},2000)
      }
    })
  }
}
