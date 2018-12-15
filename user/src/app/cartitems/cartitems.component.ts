import { Component, OnInit, inject, Inject } from '@angular/core';
import { Http } from '@angular/http';
import{CartobservableService} from '../cartobservable.service';
import {Router} from '@angular/router'

@Component({
  selector: 'app-3items',
  templateUrl: './cartitems.component.html',
  styleUrls: ['./cartitems.component.css']
})
export class CartitemsComponent implements OnInit {
  cartitems;qty;price
  constructor(@Inject(Http) public obj,public obs:CartobservableService,@Inject(Router) public router) { }
  ///////////getting cartitems//////////////

getcartitems(){
  this.cartitems=JSON.parse(localStorage.getItem("cart"))
  //alert(this.cartitems)
}
data;
removecart(item){

  //alert(item)
this.data.splice(item,1)
localStorage.setItem("cart",JSON.stringify(this.data))
alert("Product removed sucessfully")
this.getcartitems()
}
/////////////////proceed to pay///////////////////
proceedtopay(){
  //alert("hii")
  var tk=localStorage.getItem("token")
  //alert(tk)
  if(localStorage.getItem("token")){
       this.obj.post("loginserver/pay",{token:tk}).subscribe(dt=>{
        alert(dt._body)
        var logtk=dt._body
        if(logtk=="valid"){
      this.obs.funlogobs("invis")
      this.funmath()
      }
      var arr=JSON.parse(localStorage.getItem("cart"))
     console.log(arr)
      var user=JSON.parse(localStorage.getItem("uname"))
      console.log(user)
   this.obj.post("loginserver/orders",{uname:user.uname,uid:user.uid,orderid:this.no,product:arr}).subscribe(dtt=>{
alert(dtt._body)
   })   
  // localStorage.removeItem("cart")
    

    this.router.navigateByUrl("/pay")
    })
  }
  else{
    alert("invalid")
  this.obs.funlogobs("vis")
  }
}
no;
funmath(){
  this.no=Math.random()
  this.no=this.no*100000
  this.no=Math.round(this.no)
  alert(this.no)
}

///////////////////based on the quantity total price//////////////////////
 total=0;
 totitems(){
   var localdata=this.cartitems
   //alert(localdata)
   var length=localdata.length
   //alert(length)
  
   for(var i=0;i<=length-1;i++){
     this.total +=localdata[i].pprice * localdata[i].selectedqty
 //alert(this.total)
   }
 }

  ngOnInit() {
    this.getcartitems()
    this.totitems()
    this.data=JSON.parse(localStorage.getItem("cart"))
  }


}
