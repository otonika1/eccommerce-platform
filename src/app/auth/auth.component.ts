import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, TitleStrategy } from '@angular/router';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { v4 as uuidv4, validate } from 'uuid';
import { Observable, first } from 'rxjs';
import { AuthService } from '../Services/auth.service';
import { JwtAuthService } from '../Services/jwt-auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  nonExistent: boolean = false;
  login:boolean = true
  register:boolean = false
  constructor(public auth:AuthService,private router:Router,private http:HttpClient,public jwt:JwtAuthService) {}
  data:any
  email = new FormControl('',[Validators.email])
  password1 = new FormControl('')
  /* Observable = new Observable((observer) => {
    console.log("Observer Success");
    observer.next(this.getAuth())
  }) */
  ngOnInit(): void {
    //get users
    //this.getAuth()
    /* this.Observable.subscribe((val) => {
      console.log(val);
    }) */
  }
  /* getAuth(){
    this.auth.getuser().subscribe((res:any) => {console.log(res);this.data=res})
  } */
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
  current:any
  helper = new JwtHelperService();
  form = new FormGroup(
    { 
      firstname:new FormControl(''),
      lastname:new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
      confirm_password: new FormControl(''),
      
    }
  )
  noEqualPass:boolean = false;
  succesMsg:boolean =false
  emailCheck:boolean = false;
  passCheck:boolean = false;
  passCheck2:boolean = false;

  loginErrorMsg!:string
  loginErrorImg!:string
  jwtAuth(){
    let obj1 = {"password":this.password1.value,"email":this.email.value}
    console.log(obj1);
    this.jwt.Auth(obj1).pipe(first()).subscribe((res:any) => {
      /* localStorage.setItem('jwt', res.token);
      this.helper.decodeToken(res.token);
      console.log(this.helper.decodeToken(res.token)); */
      
      /* this.getAll();
      setTimeout(() => {this.getAll();},1000)
      setTimeout(() => { this.router.navigate(['info']);},2000)
      this.router.navigate(['info']) */
      //localStorage.setItem('role',)
      
      this.router.navigate(['info'])
        .then(() => {
          window.location.reload();
      });
      
      
    },
    (error:any) => {
      this.loginErrorMsg = "Login Failed password or email is not valid"
      this.loginErrorImg = "../../assets/images/images.png"
    })
  }

  jwtRegistration(){
    

    if(this.form.get('password')?.value == this.form.get('confirm_password')?.value && (this.form.get('password')?.value != '' || undefined && this.form.get('confirm_password')?.value != '' || undefined) ){

      if(this.form.get('email')?.value != '' || undefined && this.form.get('password')?.value != '' || undefined && this.form.get('confirm_password')?.value != '' || undefined){
        console.log(this.form.get('email')?.valid);
        if(this.form.valid){
          this.jwt.registration(this.form.value).subscribe((res:any) => {
            console.log(res);
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
  //post user

 /*  currUser(obj:any){
    this.auth.CurrentUser(obj).subscribe(res => {console.log("---",res)});
  } */
}
