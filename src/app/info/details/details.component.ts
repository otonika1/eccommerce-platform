import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  constructor(private route:ActivatedRoute,private router:Router,private auth:AuthService) { }
  id:any;
  lg1:any
  lg2:any
  clientId:any;
  clientObj:any
  succesMsg:boolean = false;
  dangerMsg:boolean = false;
  ngOnInit(): void {
    this.lg1 = localStorage.getItem("lang") == "geo"
    this.lg2 = localStorage.getItem("language") == "ka" && localStorage.getItem("lang") != "geo" && localStorage.getItem("lang") != "en" 

    this.route.paramMap.subscribe(c => {
      this.id = c.get('id')!;  
      
      
    })
    //this.getSore();
    this.get();
    this.clientId = JSON.parse(localStorage.getItem('currentUser') || '{}')
    this.clientId = this.clientId.id 

    this.auth.getById(this.clientId).subscribe(res => {
      this.clientObj = res
    });
  }
  items:any
  arr:any[] = [];
  clone:any[] = [];
  details:any;

  get(){
    this.auth.getProductById(this.id).subscribe( res => {
      console.log(res);
      this.details = res
    })
  }
  pay(price:number){   
    if(this.clientObj.balance > price){
      
        let obj = {
          clientId:this.clientId,
          productId:this.details?.id,
          name:this.details?.name,
          name_geo:this.details?.name_geo,
          img:this.details?.img,
          price:this.details?.price
        }
        this.auth.createHistory(obj).subscribe(res => {
        })
        
      
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
}
