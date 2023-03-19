import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router, TitleStrategy } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-editor-reg',
  templateUrl: './editor-reg.component.html',
  styleUrls: ['./editor-reg.component.scss']
})
export class EditorRegComponent implements OnInit {

  constructor(public auth:AuthService,private router:Router,private http:HttpClient) { }
  data:any
  email = new FormControl('',[Validators.email])
  password1 = new FormControl('')
  
  ngOnInit(): void {
    this.auth.getuser().subscribe((res:any) => {console.log(res);this.data=res})
  }

  form = new FormGroup(
    { 
      Store_Name:new FormControl(''),
      Store_Tax_ID:new FormControl(Math.floor(Math.random() *100)),
      name:new FormControl(''),
      email: new FormControl('',[Validators.email]),
      password: new FormControl(''),
      confirm_password: new FormControl(''),
      token: new FormControl(uuidv4() + Math.random() *100),
      role: new FormControl('Pending'),
      balance: new FormControl(0),
      isAllowed: new FormControl(false),
    }
  )

  noEqualPass:boolean = false;
  succesMsg:boolean =false;
  add(){
    if(this.form.get('email')?.value?.includes("@ibsu.edu.ge")){
      if(this.form.get('password')?.value == this.form.get('confirm_password')?.value){
       this.auth.create(this.form.value).subscribe(res => {console.log(res);
         this.noEqualPass = false;
         this.succesMsg = true;
         setTimeout(() => {this.succesMsg = false;},2000)
       })
       this.form.reset() 
      }else{
         this.noEqualPass = true;
      }
    }
    
 }
}
