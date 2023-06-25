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
  
  CurrUserName = ""
  r:any
  tokenPresent:boolean = false;
  lang:any
  role:any
  current:any;
  expirationDate:any;
  sessionExpiredimg:any
  sessionExpiredMsg:any;
  helper = new JwtHelperService();
  ngOnInit(): void {
    this.token = localStorage.getItem('jwt')
    this.role = localStorage.getItem("role");
    this.r = localStorage.getItem("role");
    this.lang = localStorage.getItem("lang") || 'en'
    this.current = JSON.parse(localStorage.getItem('currentUser') || '{}')
    localStorage.setItem("author",this.current.firstname)
    if(this.token){
      this.expirationDate = this.helper.getTokenExpirationDate(this.token)?.getTime()
      this.expirationDate = this.expirationDate - Date.now()
      console.log("Expired: ",this.helper.isTokenExpired(this.token));
      console.log("Expiration Date: ",this.helper.getTokenExpirationDate(this.token));
      setTimeout(() => {
        this.sessionExpiredMsg = "Session expired you will be redirected to login";
        this.sessionExpiredimg = "../../assets/images/6227339.png";
        localStorage.removeItem('jwt')
        localStorage.removeItem('role')
        localStorage.removeItem('currentUser')
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
  }
  balance:any
  obj:any

}
