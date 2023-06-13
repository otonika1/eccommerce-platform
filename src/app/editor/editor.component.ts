import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})

export class EditorComponent implements OnInit {
  form = new FormGroup(
    { 
      name:new FormControl(''),
      name_geo:new FormControl(''),
      products:new FormControl([]),
      category:new FormControl(''),
      disabled:new FormControl(),
      summery:new FormControl(''),
      summery_geo:new FormControl(''),
    }
  )
  regForm = new FormGroup(
    { 
      name:new FormControl(''),
      name_geo:new FormControl(''),
      products:new FormControl([]),
      category:new FormControl(''),
      disabled:new FormControl(),
      summery:new FormControl(''),
      summery_geo:new FormControl(''),
    }
  )
  items:any[] = []
  clone:any
  obj:any
  success:boolean = false;
  deleteSuccess:boolean = false;
  constructor(public auth:AuthService) { }
  
  ngOnInit(): void {
    //this.getSt()
    this.getAll()
  }
  reg:boolean = false;
  table:boolean = true;
  addStore(){
    //if(this.form.get('emp_email')?.value?.includes("@ibsu.edu.ge")){
      console.log(this.form.value);
      this.auth.createStore(this.form.value).subscribe( res => {
        console.log(res);
        window.location.reload()
      })
    //}
  }
/*   getSt(){
    this.auth.getStore().subscribe((res:any) => {
      console.log(res);
      //this.items = res
      this.obj = res
      for(let i = 0; i< res.length; i++){
        if(localStorage.getItem("lang") == "en"){
          console.log(res[i]);
          
          this.items.push(res[i]);
        }
        if(localStorage.getItem("lang") == "geo"){
          var obj = {id:res[i].id,name:res[i].name_geo,emp_email:res[i].emp_email};
          this.items.push(obj);
        }
        if(localStorage.getItem("language") == "ka" && localStorage.getItem("lang") != "geo" && localStorage.getItem("lang") != "en" ){
          var obj = {id:res[i].id,name:res[i].name_geo,emp_email:res[i].emp_email};
          this.items.push(obj);
        }
      }
      this.clone = this.items
    })
  } */
  sortField:string = 'none'
  sortOrder = 0
  sortList(column:string){
    console.log('sort');
    if(this.sortField == column && this.sortOrder !=0){
      this.sortOrder = this.sortOrder * (-1);
    }else{
      this.sortOrder = 1;
    }
    this.sortField = column
    this.items.sort((a,b) => 
      this.sortOrder * ((<any>a)[this.sortField] > (<any>b)[this.sortField] ?
      1: (<any>a)[this.sortField] < (<any>b)[this.sortField]?-1:0)
    )
  }
  
  remove(id:number){
    this.auth.deleteStore(id).subscribe((res:any) =>{console.log(res);
      window.location.reload()
    })
  }
  id:any
  categ = ["Technic","Household","Food","Other"]
  edit(id:number,index:number){
    this.form = new FormGroup(
      { 
        name:new FormControl(this.obj[index].name),
        name_geo:new FormControl(this.obj[index].name_geo),
        products:new FormControl(this.obj[index].products),
        category:new FormControl(this.obj[index].category),
        disabled:new FormControl(this.obj[index].disabled),
        summery:new FormControl(this.obj[index].summery),
        summery_geo:new FormControl(this.obj[index].summery_geo),
      }
    )
    console.log(this.form.value);
    this.id = id
  }
  /* editStore(){
    this.auth.postStorebyId(this.id, this.form.value).subscribe(res=>{
      console.log(res);
      window.location.reload();
    })
  } */
  filterid = new FormControl();
  p: number = 1;
  filter(){
    if(this.filterid.value.length == 0){
      this.items = this.items
    }
    else{
      this.items = this.items.filter( el =>  el.id === Number(this.filterid?.value))
    } 
  }
  refreshFilter(){
    this.items = this.clone
  }
  getAll(){
    this.auth.getAllStore().subscribe(res=>{
      console.log("items",res);
      this.items = res
      this.obj = res
      for(let i = 0; i< res.length; i++){
       
        if(localStorage.getItem("lang") == "geo"){
          this.items[i].name = this.items[i].name_geo
          this.items[i].description = this.items[i].description_geo
        }
        if(localStorage.getItem("language") == "ka" && localStorage.getItem("lang") != "geo" && localStorage.getItem("lang") != "en" ){
          this.items[i].name = this.items[i].name_geo
          this.items[i].description = this.items[i].description_geo
        }
        
      }
    });
  }
  create(){
    this.auth.createSt(this.regForm.value).subscribe(res => {
      this.getAll();
      
    });
  }
  editSt(){
    this.auth.editStore(this.id, this.form.value).subscribe(res => {
      //console.log(res);
      this.getAll();
      this.success = true;
      setTimeout(() => {
        this.success = false;
      },1000)
    })
  }
  delete(id:number){
    this.auth.delStore(id).subscribe(res => {
      this.getAll();
      this.deleteSuccess = true;
      setTimeout(() => {
        this.deleteSuccess = false;
      },1000)
    });
  }
}
