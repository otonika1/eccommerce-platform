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
  p:number = 1

  Clients: Clients[] = [];
  clone: any
  sortField: string = 'none'
  sortOrder = 0
  Id: number = 0;
  obj: any;
  success: boolean = false
  form = new FormGroup(
    {
      id: new FormControl(),
      firstname: new FormControl(''),
      firstName: new FormControl(''),
      lastname: new FormControl(''),
      lastName: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
      confirm_password: new FormControl(''),
      role: new FormControl(''),
      balance: new FormControl(),
      isAllowed: new FormControl(),
      enabled: new FormControl(''),
      authorities: new FormControl(''),
      username: new FormControl(''),
      accountNonExpired: new FormControl(''),
      credentialsNonExpired: new FormControl(''),
    }
  )
  /* "id": 22,
        "firstname": "Otoo",
        "lastname": "Avlokhashvili",
        "balance": 100,
        "role": null,
        "password": "$2a$10$PtWSTDwEei1RLN.C6kze/u0X.8mJl8PBaVkb663CPaF3HxAXxGFS2",
        "email": "oto.avloxashvili11@gmail.com",
        "enabled": true,
        "authorities": null,
        "username": "oto.avloxashvili11@gmail.com",
        "accountNonExpired": true,
        "credentialsNonExpired": true,
        "accountNonLocked": true,
        "firstName": "Otoo",
        "lastName": "Avlokhashvili" */
  constructor(public auth: AuthService,) { }
  token: any
  ngOnInit(): void {
    this.token = localStorage.getItem('jwt')
    //this.getClients();

    this.getAll()

  }
  getAll() {

    this.auth.getAll().subscribe(res => {
      console.log("getall", res);
      this.Clients = res
      this.clone = res
    })
  }
  editt(id: number, form: any) {
    console.log(id, form);

    this.auth.edit(id, form).subscribe(res => {
      console.log(res);
      this.getAll()
      this.success = true
    })
  }
  /* getClients(){
    this.auth.getuser().subscribe((res:Clients[]) => {
      console.log(res);
      // this.Clients = res
      // this.clone = res 
    })
  } */
  getById(id: number) {
    this.auth.getById(id).subscribe(res => {
      this.Id = id
      console.log(res);
      if (!this.form.get('isAllowed')?.value) {
        this.form = new FormGroup(
          {
            id: new FormControl(res.id),
            firstname: new FormControl(res.firstname),
            firstName: new FormControl(res.firstName),
            lastname: new FormControl(res.lastname),
            lastName: new FormControl(res.lastName),
            email: new FormControl(res.email),
            password: new FormControl(res.password),
            confirm_password: new FormControl(res.password),
            role: new FormControl(res.role),
            balance: new FormControl(res.balance),
            isAllowed: new FormControl(res.isAllowed),
            enabled: new FormControl(res.enabled),
            authorities: new FormControl(res.authorities),
            username: new FormControl(res.username),
            accountNonExpired: new FormControl(res.accountNonExpired),
            credentialsNonExpired: new FormControl(res.credentialsNonExpired),
          })
      } else {
        this.form = new FormGroup(
          {
            id: new FormControl(res.id),
            firstname: new FormControl(res.firstname),
            firstName: new FormControl(res.firstName),
            lastname: new FormControl(res.lastname),
            lastName: new FormControl(res.lastName),
            email: new FormControl(res.email),
            password: new FormControl(res.password),
            confirm_password: new FormControl(res.password),
            role: new FormControl(res.role),
            balance: new FormControl(res.balance),
            isAllowed: new FormControl(res.isAllowed),
            enabled: new FormControl(res.enabled),
            authorities: new FormControl(res.authorities),
            username: new FormControl(res.username),
            accountNonExpired: new FormControl(res.accountNonExpired),
            credentialsNonExpired: new FormControl(res.credentialsNonExpired),
          })
      }
    })
  }
  del(id: number) {
    this.auth.del(id).subscribe(res => {
      this.getAll()
      this.deleteSuccess = true;
      setTimeout(() => { this.deleteSuccess = false; }, 2000)
    });
  }
  getClientsByid(id: number) {
    this.auth.getuserByid(id).subscribe((res: any) => {

      console.log(res);
      this.Id = id
      if (!this.form.get('isAllowed')?.value) {
        this.form = new FormGroup(
          {
            id: new FormControl(res.id),
            firstname: new FormControl(res.firstname),
            firstName: new FormControl(res.firstName),
            lastname: new FormControl(res.lastname),
            lastName: new FormControl(res.lastName),
            email: new FormControl(res.email),
            password: new FormControl(res.password),
            confirm_password: new FormControl(res.password),
            role: new FormControl(res.role),
            balance: new FormControl(res.balance),
            isAllowed: new FormControl(res.isAllowed),
            enabled: new FormControl(res.enabled),
            authorities: new FormControl(res.authorities),
            username: new FormControl(res.username),
            accountNonExpired: new FormControl(res.accountNonExpired),
            credentialsNonExpired: new FormControl(res.credentialsNonExpired),
          })
      } else {
        this.form = new FormGroup(
          {
            id: new FormControl(res.id),
            firstname: new FormControl(res.firstname),
            firstName: new FormControl(res.firstName),
            lastname: new FormControl(res.lastname),
            lastName: new FormControl(res.lastName),
            email: new FormControl(res.email),
            password: new FormControl(res.password),
            confirm_password: new FormControl(res.password),
            role: new FormControl(res.role),
            balance: new FormControl(res.balance),
            isAllowed: new FormControl(res.isAllowed),
            enabled: new FormControl(res.enabled),
            authorities: new FormControl(res.authorities),
            username: new FormControl(res.username),
            accountNonExpired: new FormControl(res.accountNonExpired),
            credentialsNonExpired: new FormControl(res.credentialsNonExpired),
          })
      }
    })

  }
  edit(id: number, form: any) {
    this.auth.edituser(id, form).subscribe((res: any) => {
      //this.getClients();
      this.getAll()
      this.success = true

    })
  }
  deleteSuccess: boolean = false
  delete(id: number) {
    this.auth.deleteuser(id).subscribe((res: any) => {
      console.log(res);
      //this.getClients();
      this.getAll()
      this.deleteSuccess = true;
      setTimeout(() => { this.deleteSuccess = false; }, 2000)
    });
  }



  sortList(column: string) {
    console.log('sort');
    if (this.sortField == column && this.sortOrder != 0) {
      this.sortOrder = this.sortOrder * (-1);
    } else {
      this.sortOrder = 1;
    }
    this.sortField = column
    this.Clients.sort((a, b) =>
      this.sortOrder * ((<any>a)[this.sortField] > (<any>b)[this.sortField] ?
        1 : (<any>a)[this.sortField] < (<any>b)[this.sortField] ? -1 : 0)
    )
  }
  filterId = new FormControl();
  filter() {
    if (this.filterId.value.length == 0) {
      this.Clients = this.clone
    }
    else {
      this.Clients = this.Clients.filter(el => el.id === Number(this.filterId?.value))
    }
  }
  filterName = new FormControl();
  filterN() {
    if (this.filterName.value.length == 0) {
      this.Clients = this.clone
    }
    else {
      this.Clients = this.Clients.filter(el => el.firstname.toLowerCase() === this.filterName?.value.toLowerCase())
    }
  }
  filterLa = new FormControl();
  filterL() {
    if (this.filterLa.value.length == 0) {
      this.Clients = this.clone
    }
    else {
      this.Clients = this.Clients.filter(el => el.lastname.toLowerCase() === this.filterLa?.value.toLowerCase())
    }
  }
  filterRole = new FormControl();

  filterR() {
    if (this.filterRole.value.length == 0) {
      this.Clients = this.clone
    }
    else {
      this.Clients = this.Clients.filter(el => el.role.toLowerCase() === this.filterRole?.value.toLowerCase())
    }
  }
  refreshFilter() {
    this.Clients = this.clone
  }




}