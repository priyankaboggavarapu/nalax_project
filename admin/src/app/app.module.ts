import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {RouterModule} from '@angular/router';
import {Http,HttpModule} from "@angular/http";
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CatComponent } from './cat/cat.component';
import { SubcatComponent } from './subcat/subcat.component';
import { SubsubcatComponent } from './subsubcat/subsubcat.component';
import { BrandsComponent } from './brands/brands.component';
import { ProductsComponent } from './products/products.component';

var obj = [ 
  {path:"", component:CatComponent},
  {path:"cat.id", component:CatComponent},             
  {path:"subcat", component:SubcatComponent},
  {path:"subsubcat",component:SubsubcatComponent},
  {path:"brands",component:BrandsComponent},
  {path:"products",component:ProductsComponent}
]

  var rout = RouterModule.forRoot(obj)


@NgModule({
  declarations: [
    AppComponent,
    CatComponent,
    SubcatComponent,
    SubsubcatComponent,
    BrandsComponent,
    ProductsComponent
  ],
  imports: [
    BrowserModule,rout,HttpModule,FormsModule  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
