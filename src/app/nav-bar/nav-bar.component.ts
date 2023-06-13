import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../Services/auth.service';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

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
  token:any
  helper = new JwtHelperService();
  CurrUserName = ""
  r:any
  tokenPresent:boolean = false;
  lang:any
  role:any
  current:any;
  expirationDate:any;
  Observable = new Observable((observer) => {
    console.log("Observer Success");
    observer.next(this.getCurr())
  })


  ngOnInit(): void {
    this.token = localStorage.getItem('jwt')
    this.Observable.subscribe((val) => {})
    this.role = localStorage.getItem("role");
    this.lang = localStorage.getItem("lang") || 'en'
    this.current = JSON.parse(localStorage.getItem('currentUser') || '{}')
    localStorage.setItem("author",this.current.firstname)
    //this.getCurr()
    //console.log("role", this.current.firstname);
    if(this.token){
      this.expirationDate = this.helper.getTokenExpirationDate(this.token)?.getTime()
      
      this.expirationDate = this.expirationDate - Date.now()
      console.log("Expired: ",this.helper.isTokenExpired(this.token));
      console.log("Expiration Date: ",this.helper.getTokenExpirationDate(this.token));
      setTimeout(() => {
        this.logout();
      },this.expirationDate);
    }
  }
  changeLg(lg:any){
    localStorage.setItem("lang",lg.value)
    console.log(lg.value);
    window.location.reload()
  }
  
  logout(){
      localStorage.removeItem('jwt')
      localStorage.removeItem('role')
      localStorage.removeItem('currentUser')
      this.router.navigateByUrl('/').then(()=> {
        window.location.reload()
      })
      //this.tokenPresent = false;
      
    /*   this.auth.CurrentUser({role:"",token:"",email:"", name:"",balance:0,id:0,lastname:""}).subscribe(res => {console.log(res);
        window.location.reload()
      }) */
      
      
  }
  balance:any
  obj:any
  getCurr(){
    this.auth.getCurrentUser().subscribe( (res:any) => {
      this.CurrUserName = this.current.firstname;
      this.r = this.role;
      this.balance = res.balance;
    })
  }
}
