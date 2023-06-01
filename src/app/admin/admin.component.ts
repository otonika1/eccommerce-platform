import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../Services/auth.service';
import { Clients } from './clients';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})

export class AdminComponent implements OnInit {
  
  Clients:Clients[] = [];
  clone:any
  sortField:string = 'none'
  sortOrder = 0
  Id:number = 0;
  obj:any;
  success:boolean = false
  form = new FormGroup(
    { 
      name:new FormControl(''),
      lastname:new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
      confirm_password: new FormControl(''),
      role: new FormControl(''),
      balance: new FormControl(),
      isAllowed: new FormControl()
    }
  )
  constructor(public auth:AuthService,) { }
  token:any
  ngOnInit(): void {
    this.token = localStorage.getItem('jwt')
    this.getClients();
    //this.authh();
    this.authh();
  }
  getClients(){
    this.auth.getuser().subscribe((res:Clients[]) => {
      console.log(res);
      this.Clients = res
      this.clone = res
    })
  }
  getClientsByid(id:number){
    this.auth.getuserByid(id).subscribe((res:any) => {
      
      console.log(res);
      this.Id = id
      if(!this.form.get('isAllowed')?.value){
        this.form = new FormGroup(
          { 
            name:new FormControl(res.name),
            lastname:new FormControl(res.lastname),
            email: new FormControl(res.email),
            password: new FormControl(res.password),
            confirm_password: new FormControl(res.confirm_password),
            role: new FormControl(res.role),
            balance: new FormControl(res.balance),
            isAllowed: new FormControl(res.isAllowed)
          })
      }else{
        this.form = new FormGroup(
          { 
            name:new FormControl(res.name),
            lastname:new FormControl(res.lastname),
            email: new FormControl(res.email),
            password: new FormControl(res.password),
            confirm_password: new FormControl(res.confirm_password),
            role: new FormControl(res.role),
            balance: new FormControl(res.balance),
            isAllowed: new FormControl(res.isAllowed)
          })
      }
    })
    
  }
  edit(id:number,form:any){  
    this.auth.edituser(id,form).subscribe((res:any) => {
      this.getClients();
      this.success = true
    
    })
  }
  deleteSuccess:boolean = false
  delete(id:number){
    this.auth.deleteuser(id).subscribe((res:any) => {console.log(res);
      this.getClients();
      this.deleteSuccess = true;
      setTimeout(() => {this.deleteSuccess = false;},2000)
    });
  }
  sortList(column:string){
    console.log('sort');
    if(this.sortField == column && this.sortOrder !=0){
      this.sortOrder = this.sortOrder * (-1);
    }else{
      this.sortOrder = 1;
    }
    this.sortField = column
    this.Clients.sort((a,b) => 
      this.sortOrder * ((<any>a)[this.sortField] > (<any>b)[this.sortField] ?
      1: (<any>a)[this.sortField] < (<any>b)[this.sortField]?-1:0)
    )
  }
  filterId = new FormControl();
  filter(){
    if(this.filterId.value.length == 0){
      this.Clients = this.clone
    }
    else{
      this.Clients = this.Clients.filter( el => el.id === Number(this.filterId?.value))
    } 
  }
  filterName = new FormControl();
  filterN(){
    if(this.filterName.value.length == 0){
      this.Clients = this.clone
    }
    else{
      this.Clients = this.Clients.filter( el => el.name.toLowerCase() === this.filterName?.value.toLowerCase())
    } 
  }
  filterLa = new FormControl();
  filterL(){
    if(this.filterLa.value.length == 0){
      this.Clients = this.clone
    }
    else{
      this.Clients = this.Clients.filter( el => el.lastname.toLowerCase() === this.filterLa?.value.toLowerCase())
    } 
  }
  filterRole = new FormControl();

  filterR(){
    if(this.filterRole.value.length == 0){
      this.Clients = this.clone
    }
    else{
      this.Clients = this.Clients.filter( el => el.role.toLowerCase() === this.filterRole?.value.toLowerCase())
    } 
  }
  refreshFilter(){
    this.Clients = this.clone
  }

  
  authh(){
    let obj1 = {"password":"12345678","email":"oto.avloxashvili10@gmail.com"}
    this.auth.Auth(obj1).subscribe((res:any) => {
      localStorage.setItem('jwt', res.token);
      this.getAll();
    })
  }
  getAll(){
    
    this.auth.getAll().subscribe(res => {
      console.log(res);
      
    })
  }
}