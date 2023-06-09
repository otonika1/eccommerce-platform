import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { v4 as uuidv4 } from 'uuid';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  constructor(private route:ActivatedRoute,public auth:AuthService) { }
  id:any;
  success:boolean = false;
  productId!:number
  lg1:any
  lg2:any
  ngOnInit(): void {
    this.lg1 = localStorage.getItem("lang") == "geo"
    this.lg2 = localStorage.getItem("language") == "ka" && localStorage.getItem("lang") != "geo" && localStorage.getItem("lang") != "en" 
    //this.id = parseInt(this.route.snapshot.queryParams["id"])
    this.route.paramMap.subscribe(c => {
      this.id = +c.get('id')!;   
    })
    //this.producs()
    this.getProduct();
    
    
  }
  arr:any[] = []
  arr2:any[] = []
  obj!:obj
  producs(){
    this.auth.getStorebyId(this.id).subscribe( (res:any) => {
      //this.arr = res.products
      this.obj = res
      for(let i = 0; i< res.products.length; i++){
        if(localStorage.getItem("lang") == "en"){
  
          this.arr.push(res.products[i].en[0])
          //console.log(this.arr);
        }
        if(localStorage.getItem("lang") == "geo"){
  
          this.arr.push(res.products[i].ge[0])
          //console.log(res.products[i].ge[0]);
        }
        if(localStorage.getItem("language") == "ka" && localStorage.getItem("lang") != "geo" && localStorage.getItem("lang") != "en" ){
  
          this.arr.push(res.products[i].ge[0])
          //console.log(res.products[i].ge[0]);
        }
        this.clone = this.arr
      }
      console.log(res);
      
      
    })
  }
  sortField:string = 'none'
  sortOrder = 0
  reg:boolean = false;
  table:boolean = true;
  
  form2 = new FormGroup(
    { 
      
      name:new FormControl(''),
      name_geo:new FormControl(''),
      description:new FormControl(''),
      description_geo:new FormControl(''),
      img:new FormControl(''),
      price:new FormControl(),
      author:new FormControl(localStorage.getItem('author')),
      summery:new FormControl(''),
      summery_geo:new FormControl(''),
    }
  )
  form = new FormGroup(
    { 
      
      name:new FormControl(''),
      name_geo:new FormControl(''),
      description:new FormControl(''),
      description_geo:new FormControl(''),
      img:new FormControl(''),
      price:new FormControl(),
      author:new FormControl(localStorage.getItem('author')),
      summery:new FormControl(''),
      summery_geo:new FormControl(''),
    }
  )
  sortList(column:string){
    console.log('sort');
    if(this.sortField == column && this.sortOrder !=0){
      this.sortOrder = this.sortOrder * (-1);
    }else{
      this.sortOrder = 1;
    }
    this.sortField = column
    this.arr.sort((a,b) => 
      this.sortOrder * ((<any>a)[this.sortField] > (<any>b)[this.sortField] ?
      1: (<any>a)[this.sortField] < (<any>b)[this.sortField]?-1:0)
    )
  }
  clone:any
  prod:any[] = []
  en:any[] = []
  ge:any[] = []
  successMsg:boolean = false;
  // add(){
  //   //if(this.form.valid){
  //     var obj1 = {id:this.form.get('id')?.value,name:this.form.get('name')?.value,description:this.form.get('description')?.value,img:this.form.get('img')?.value,Price:this.form.get('Price')?.value,author:this.form.get('author')?.value}
  //     var obj2 = {id:this.form.get('id')?.value,name:this.form.get('name_geo')?.value,description:this.form.get('description_geo')?.value,img:this.form.get('img')?.value,Price:this.form.get('Price')?.value,author:this.form.get('author')?.value}
  //     this.en.push(obj1)
  //     this.ge.push(obj2)
  //     var obj3 = {en:this.en,ge:this.ge}
  //     this.obj.products.push(obj3)
  
  //     console.log(this.obj);
  //     this.auth.postStorebyId(this.id, this.obj).subscribe(res=>{
  //       console.log(res);
        
  //     })
  //     this.form.reset()
  //     window.location.reload()
  //     /* this.successMsg = true;
  //     setTimeout(() => {this.successMsg = false;},2000) */
  //   //}
    
  // }
  remove(index:number){
    //to delete we need index of the element from products array and then update whole array
    console.log(this.obj.products);
    this.obj.products.splice(index,1);
    
      console.log(this.obj);
      this.auth.postStorebyId(this.id, this.obj).subscribe(res=>{
        console.log(res);
        window.location.reload();
      })
    
    
  }
  index = 0;
/*   edit(index:number){
    this.index = index;
    console.log(index);
    console.log(this.obj.products[index]);
    
    this.form = new FormGroup(
      { 
        id: new FormControl(this.obj.products[index].en[0].id),
        name:new FormControl(this.obj.products[index].en[0].name),
        name_geo:new FormControl(this.obj.products[index].ge[0].name),
        description:new FormControl(this.obj.products[index].en[0].description),
        description_geo:new FormControl(this.obj.products[index].ge[0].description),
        img:new FormControl(this.obj.products[index].en[0].img),
        price:new FormControl(this.obj.products[index].en[0].price),
        author:new FormControl(this.obj.products[index].en[0].author),
        summery:new FormControl(this.obj.products[index].en[0].summery),
        summery_geo:new FormControl(this.obj.products[index].en[0].summery),

      })
  } */
  success2:boolean = false;
  /* saveEdit(){
      var obj1 = {name:this.form.get('name')?.value,description:this.form.get('description')?.value,img:this.form.get('img')?.value,Price:this.form.get('Price')?.value,author:this.form.get('author')?.value, summery:this.form.get('summery_en')?.value}
      var obj2 = {name:this.form.get('name_geo')?.value,description:this.form.get('description_geo')?.value,img:this.form.get('img')?.value,Price:this.form.get('Price')?.value,author:this.form.get('author')?.value, summery:this.form.get('summery_geo')?.value}
      this.en.push(obj1)
      this.ge.push(obj2)
      //console.log(obj1, obj2);
      
      var obj3 = {en:this.en,ge:this.ge}
      this.obj.products[this.index] = obj3
      this.auth.postStorebyId(this.id, this.obj).subscribe(res=>{
        console.log(res);
        window.location.reload();
      })
      
  } */
  filterName = new FormControl();
  p: number = 1;
  filter(){
    if(this.filterName.value.length == 0){
      this.arr = this.clone
    }
    else{
      this.arr = this.arr.filter( el =>  el.name.toLowerCase() === this.filterName?.value.toLowerCase())
    } 
  }
  refreshFilter(){
    this.arr= this.clone
  }
  desc:any
  getProduct(){
    this.auth.getByIdStore(this.id).subscribe(res=>{
      this.obj = res
      this.arr = res.products
      this.arr2 = res.products
    });
  }
  editProd(index:number, id:number) {
    this.index = index;
    this.form = new FormGroup(
      { 
        
        name:new FormControl(this.arr2[index].name),
        name_geo:new FormControl(this.arr2[index].name_geo),
        description:new FormControl(this.arr2[index].description),
        description_geo:new FormControl(this.arr2[index].description_geo),
        img:new FormControl(this.arr2[index].img),
        price:new FormControl(this.arr2[index].price),
        author:new FormControl(this.arr2[index].author),
        summery:new FormControl(this.arr2[index].summery),
        summery_geo:new FormControl(this.arr2[index].summery_geo),

      })
      this.productId = id
      
  }
  saveEdit(){
   /*  this.obj.products[this.index] = this.form.value;
    console.log(this.obj.products);
    this.auth.editStore(this.id,this.obj).subscribe(store => {
      this.success = true;
      setTimeout(() => {this.success = false;},2000)
    }); */
    this.auth.editProduct(this.productId,this.form.value).subscribe((res) => {
      console.log(res);
      this.getProduct();
      this.success = true;
      setTimeout(() => {this.success = false;},2000)
    })
  }
  delete(id:number) {
    this.auth.deleteProduct(id).subscribe(res => {
      this.getProduct();
      this.successMsg = true;
      setTimeout(() => {this.successMsg = false;},2000)
    });
  }
  create(){    
    let obj = this.form2.value;
    /* this.auth.createProduct(this.form2.value).subscribe(res => {
      obj = res
      console.log(res);
      
    }); */
    //this.arr.push(obj)
    this.obj.products.push(obj)
    this.auth.editStore(this.id,this.obj).subscribe(res => {
      this.getProduct();
      this.successMsg = true;
      setTimeout(() => {this.successMsg = false;},2000)
      console.log(res);
      
    });
    
    
  }
}
export interface obj{
  id:number,
  name:string,
  name_geo:String
  emp_email:string,
  password: string,
  products:any[]
}
