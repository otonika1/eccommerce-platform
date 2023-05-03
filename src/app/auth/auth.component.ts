import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, TitleStrategy } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth.service';
import { v4 as uuidv4, validate } from 'uuid';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  nonExistent: boolean = false;
  login:boolean = true
  register:boolean = false
  constructor(public auth:AuthService,private router:Router,private http:HttpClient) { }
  data:any
  email = new FormControl('',[Validators.email])
  password1 = new FormControl('')
  Observable = new Observable((observer) => {
    console.log("Observer Success");
    observer.next(this.getAuth())
  })
  ngOnInit(): void {
    //get users
    //this.getAuth()
    this.Observable.subscribe((val) => {
      console.log(val);
    })
  }
  getAuth(){
    this.auth.getuser().subscribe((res:any) => {console.log(res);this.data=res})
  }
  //reg switcher
  reg(){
    this.register = true
    this.login = false
  }
  //login switcher
  log(){
    this.login = true
    this.register = false
  }
  //login
  save(){
    for(let i of this.data){
      if(i.email == this.email.value && i.password == this.password1.value){
        var obj = {role: i.role, email: i.email, password: i.password, name:i.name,lastname:i.lastname,token:i.token, balance:i.balance, id:i.id,}
        this.currUser(obj)
        
        localStorage.setItem('token', i.token)
        localStorage.setItem('role', i.role)
        this.nonExistent = false;
        //console.log(i.token);    
        this.router.navigate(['info'])
        .then(() => {
          window.location.reload();
        });
      }
      else{
        this.nonExistent = true;
      }
    }
  }
  form = new FormGroup(
    { 
      name:new FormControl(''),
      lastname:new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
      confirm_password: new FormControl(''),
      token: new FormControl(uuidv4() + Math.random() *100),
      role: new FormControl('Client'),
      balance: new FormControl(0)
    }
  )
  noEqualPass:boolean = false;
  succesMsg:boolean =false
  emailCheck:boolean = false;
  passCheck:boolean = false;
  passCheck2:boolean = false;
  //post user
  add(){
     //if passwords are equal have to be added
     
     if(this.form.get('password')?.value == this.form.get('confirm_password')?.value){

      if(this.form.get('email')?.value != '' || undefined && this.form.get('password')?.value != '' || undefined && this.form.get('confirm_password')?.value != '' || undefined){
        console.log(this.form.get('email')?.valid);
        if(this.form.valid){
          this.auth.create(this.form.value).subscribe(res => {console.log(res);
            this.noEqualPass = false;
            this.succesMsg = true;
            this.emailCheck =  false;
            this.passCheck = false;
            this.passCheck2 = false; 
            setTimeout(() => {this.succesMsg = false;},2000)
          })
          this.form.reset() 
          window.location.reload()
        }
      }else{
        if(this.form.get('email')?.value == '' || undefined){
          this.emailCheck = true;
        }
        if(this.form.get('password')?.value == '' || undefined){
          this.passCheck = true;
        }
        if(this.form.get('confirm_password')?.value == '' || undefined){
          this.passCheck2 = true;
        }
      }
     }else{
        this.noEqualPass = true;
     }
     
  }
  currUser(obj:any){
    this.auth.CurrentUser(obj).subscribe(res => {console.log("---",res)});
  }
}
