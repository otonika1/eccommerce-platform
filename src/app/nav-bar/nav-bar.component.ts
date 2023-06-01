import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../Services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  constructor(public auth:AuthService,private translateService:TranslateService,private router:Router){
    translateService.setDefaultLang('en');
    translateService.use(localStorage.getItem("lang") || 'en')
  }
  CurrUserName = ""
  r:any
  tokenPresent:boolean = false;
  lang:any
  role:any
  current:any;
  Observable = new Observable((observer) => {
    console.log("Observer Success");
    observer.next(this.getCurr())
  })


  ngOnInit(): void {
    this.Observable.subscribe((val) => {})
    this.role = localStorage.getItem("role");
    this.lang = localStorage.getItem("lang") || 'en'
    this.current = JSON.parse(localStorage.getItem('currentUser') || '{}')
    //this.getCurr()
    console.log("curr", this.current.balance);
    
  }
  changeLg(lg:any){
    localStorage.setItem("lang",lg.value)
    console.log(lg.value);
    window.location.reload()
  }
  
  logout(){
      /* localStorage.removeItem('jwt')
      localStorage.removeItem('role')
      this.router.navigateByUrl('/').then()
      this.tokenPresent = false;
      this.auth.CurrentUser({role:"",token:"",email:"", name:"",balance:0,id:0,lastname:""}).subscribe(res => {console.log(res);
        window.location.reload()
      }) */
      
      
  }
  balance:any
  obj:any
  getCurr(){
    this.auth.getCurrentUser().subscribe( (res:any) => {
      this.CurrUserName = res.name;
      this.r = this.role;
      this.balance = res.balance;
      
    })
  }
}
