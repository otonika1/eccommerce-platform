import { Injectable } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';

@Injectable({
  providedIn: 'root'
})
export class FireService {
  isLoged:boolean = false
  constructor(public fire:AngularFireModule) { }
  async signin(email:any, password:any){
    //await this.fire.signInWithEmailAndPassword(email, password)
  }
}
