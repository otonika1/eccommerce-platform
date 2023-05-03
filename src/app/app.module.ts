import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { AppRoutingModule } from './app-routing.module';
import { InfoComponent } from './info/info.component';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { AngularFireModule} from '@angular/fire/compat'
import { FireService } from './fire.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { AdminComponent } from './admin/admin.component';
import { EditorComponent } from './editor/editor.component';
import { EditorRegComponent } from './editor-reg/editor-reg.component';
import { ProductsComponent } from './products/products.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { AddToCartComponent } from './add-to-cart/add-to-cart.component';
import { SliderComponent } from './slider/slider.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DetailsComponent } from './info/details/details.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    InfoComponent,
    AuthComponent,
    NavBarComponent,
    AdminComponent,
    EditorComponent,
    EditorRegComponent,
    ProductsComponent,
    AddToCartComponent,
    SliderComponent,
    DetailsComponent,
    
  ],
  imports: [
    HttpClientModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgxPaginationModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
    }),
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyDiXPS6Ge8rgGKkSjaK7r4f7IewTjgq2n0",
      authDomain: "frontend-project-20c52.firebaseapp.com",
      projectId: "frontend-project-20c52",
      storageBucket: "frontend-project-20c52.appspot.com",
      messagingSenderId: "1089688823758",
      appId: "1:1089688823758:web:a14c930272fd76fb4c2d9f"
    }),
    NgbModule,
    
  ],
  exports:[TranslateModule],
  providers: [HttpClient,FireService],
  bootstrap: [AppComponent]
})
export class AppModule { }
