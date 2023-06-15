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
  
  filterName = new FormControl();
  p: number = 1;
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
    this.Observable.subscribe();
    this.lang = localStorage.getItem("lang") || 'en'
    this.role = localStorage.getItem("role")   
    //this.getItems();
    //this.getSore();
    
    
  }
  Clients:any[] = []
/*   getClients(){
    this.auth.getuser().subscribe((res:any) => {
      
      //console.log(res);
      this.Clients = res
      this.clone = res
    })
  } */
  changeLg(lg:any){
    localStorage.setItem("lang",lg.value)
    //console.log(lg.value);
    window.location.reload()
  }
/*   getItems(){
    this.auth.getStoreItems().subscribe( (res:any) => {
      
      for(let i = 0; i< res.length; i++){
        if(localStorage.getItem("lang") == "en"){
  
          this.arr.push(res[i].en[0])
          this.clone = this.arr
          //console.log(res[i].en[0]);
        }
        if(localStorage.getItem("lang") == "geo"){
  
          this.arr.push(res[i].ge[0])
          this.clone = this.arr
          //console.log(res[i].ge[0]);
        }
        if(localStorage.getItem("language") == "ka" && localStorage.getItem("lang") != "geo" && localStorage.getItem("lang") != "en" ){
  
          this.arr.push(res[i].ge[0])
          this.clone = this.arr
          //console.log(res[i].ge[0]);
        }
      }
    })
  } */

  CurrUserName:string | undefined
  r:string | undefined
  balance!:number
  email:string | undefined
  password:string | undefined
  id!:number
  lastname:string | undefined
  succesMsg:boolean =false
  dangerMsg:boolean =false
/*   Pay(g:number)
  {
    this.auth.getCurrentUser().subscribe( (res:any) => {
      this.CurrUserName = res.name;
      this.r = res.role;
      this.email = res.email
      this.password = res.password
      this.balance = res.balance;
      this.lastname = res.balance;
      this.id = res.id
      
      this.balance = Math.round((this.balance - this.arr[g].Price) * 100) / 100;

      if (this.balance > 0){     
        this.auth.postHystory(this.arr[g]).subscribe(); 
        this.auth.edituserByid(this.id,{id:this.id,email:this.email,password:this.password,role:this.r,name:this.CurrUserName,balance:this.balance,lastname:this.lastname}).subscribe((res:any) => {
          console.log(res)
          this.auth.CurrentUser({id:this.id,email:this.email,password:this.password,role:this.r,name:this.CurrUserName,balance:this.balance}).subscribe(res => {console.log(res);
          window.location.reload()
          this.succesMsg = true;
          setTimeout(() => {this.succesMsg = false;},2000)
          })
        })      
      }else{
        this.dangerMsg = true;
          setTimeout(() => {this.dangerMsg = false;},2000)
      }
    })
  } */

  items:any
  items2:any
  arr2:any
/*   getSore(){
    this.auth.getStore().subscribe(res =>{
      this.items = res
     // console.log("---",this.items);
      console.log("--",res);
      
      for(let i = 0;i<this.items.length;i++){
        if(!this.items[i].disabled){
          //console.log("---",this.items[i]);
          for(let j = 0;j<this.items[i].products.length;j++){
            if(localStorage.getItem("lang") == "en"){
    
              this.arr.push(this.items[i].products[j].en[0])
              this.clone = this.arr
              //console.log(res[i].en[0]);
            }
            if(localStorage.getItem("lang") == "geo"){
      
              this.arr.push(this.items[i].products[j].ge[0])
              this.clone = this.arr
              //console.log(res[i].ge[0]);
            }
            if(localStorage.getItem("language") == "ka" && localStorage.getItem("lang") != "geo" && localStorage.getItem("lang") != "en" ){
      
              this.arr.push(this.items[i].products[j].ge[0])
              this.clone = this.arr
              //console.log(res[i].ge[0]);
            }
            
            //console.log(this.items[i].products[j]);
          }
        }
      }
      
    })
  } */
  cartItems:any = []
  addToCart(index:number){
    
    this.cartItems.push(this.arr[index])
    console.log(this.cartItems);
    this.auth.editCart(1,{cartItems:this.cartItems}).subscribe(res => {
      console.log(res);
    })
    this.succesMsg = true;
        setTimeout(() => {this.succesMsg = false;},1000)
    
  }
  getAll(){
    this.auth.getAllProduct().subscribe(res => {
      console.log(res);
      this.arr = res
    });
  }
}
