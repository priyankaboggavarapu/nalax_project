import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpModule} from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute, Routes } from '@angular/router'

import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ProductpageComponent } from './productpage/productpage.component';
import { DetailspageComponent } from './detailspage/detailspage.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MoreinfoComponent } from './moreinfo/moreinfo.component';
import { CartitemsComponent } from './cartitems/cartitems.component';
import{CartobservableService} from './cartobservable.service';
import { PaymentComponent } from './payment/payment.component';
var obj:Routes=[
  {path:"", component:HomepageComponent},
  {path:"product", component:ProductpageComponent},
  {path:"detais", component:DetailspageComponent},
  {path:"more",component:MoreinfoComponent},
  {path:"cart",component:CartitemsComponent},
  {path:"pay",component:PaymentComponent}

]

var routs = RouterModule.forRoot(obj)

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    ProductpageComponent,
    DetailspageComponent,
    MoreinfoComponent,
    CartitemsComponent,
    PaymentComponent
  ],
  imports: [
    BrowserModule,HttpModule,FormsModule,routs,BrowserAnimationsModule
  ],
  providers: [CartobservableService],
  bootstrap: [AppComponent]
})
export class AppModule { }
