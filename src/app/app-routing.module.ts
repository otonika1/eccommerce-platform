import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddToCartComponent } from './add-to-cart/add-to-cart.component';
import { AdminComponent } from './admin/admin.component';
import { AuthComponent } from './auth/auth.component';
import { EditorRegComponent } from './editor-reg/editor-reg.component';
import { EditorComponent } from './editor/editor.component';
import { LoginGuard } from './guard/login.guard';
import { RoleguardGuard } from './guard/roleguard.guard';
import { InfoComponent } from './info/info.component';
import { ProductsComponent } from './products/products.component';
import { DetailsComponent } from './info/details/details.component';

const routes: Routes = [
  {path: '',pathMatch: 'full',redirectTo: 'auth'},
  {path:'auth',component:AuthComponent},
  {path:'info',component:InfoComponent,canActivate:[LoginGuard]},
  {
    path:'admin',
    component:AdminComponent,
    canActivate:[LoginGuard, RoleguardGuard],
    data:{
      expRoles:['Admin']//only admin can access this component
    }
  },
  {
    path:'editor',component:EditorComponent,
    canActivate:[LoginGuard, RoleguardGuard],
    data:{
    expRoles:['Admin','Editor']//only admin and editor can access this component
  }},
  {path:'editor/products',component:ProductsComponent,canActivate:[LoginGuard,RoleguardGuard]},
  {path:'employee-registration',component:EditorRegComponent,canActivate:[LoginGuard]},
  {path:'cart',component:AddToCartComponent,canActivate:[LoginGuard]},
  {path:'info/edit',component:DetailsComponent,canActivate:[LoginGuard,RoleguardGuard]},
  {path:'info/edit/:id',component:DetailsComponent,canActivate:[LoginGuard,RoleguardGuard]},



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
