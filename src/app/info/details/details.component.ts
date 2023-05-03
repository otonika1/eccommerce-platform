import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  constructor(private route:ActivatedRoute,private router:Router,private auth:AuthService) { }
  id:any;
  ngOnInit(): void {
    this.route.paramMap.subscribe(c => {
      this.id = c.get('id')!;  
      
      
    })
    this.getSore();
  }
  items:any
  arr:any[] = [];
  clone:any[] = [];
  details:any;
  getSore(){
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
            
            
            
          }
        }
      }
      this.arr = this.arr.filter(el => el.id == this.id)
      this.details = this.arr[0]
      
      
      
    })
  }
}
