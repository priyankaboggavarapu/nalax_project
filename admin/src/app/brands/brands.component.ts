import { Component, OnInit, Inject } from '@angular/core';
import { Http } from '@angular/http'

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit {

  constructor(@Inject(Http) public obj) { }

  //Inserting brand
  txtbr
  ins_brands(){
    var obj={brandname:this.txtbr}
    this.obj.post("brandserverfile/ins_brand", obj).subscribe(this.inbrnd)
    
  }
  inbrnd=(obj)=>{
 alert(obj._body)
 this.txtbr=""
this.read_brands()
  }

  //Reading Brands
  brdata
  read_brands(){
    this.obj.get("brandserverfile/read_brand").subscribe(this.rdbrnd)
  }  
  rdbrnd=(obj)=>{
    this.brdata=JSON.parse(obj._body)
  }

  //update Brands
temp=0;updtxt;oldobj;newobj;savdt;newact
brand_update(brdt){
this.temp=brdt._id
this.savdt=brdt
this.updtxt=brdt.brandname
this.newact=brdt.active
}
//Saving updated content in Brands
save_brand(){
  this.oldobj = {_id:this.temp}
  this.newobj = {brandname:this.updtxt, active:this.newact}
  var objsav = [this.oldobj, this.newobj]
  this.obj.post("brandserverfile/sav_brand", objsav).subscribe(savdt=>{
  alert(savdt._body)
 
})
this.temp=0 
this.read_brands()
}


  
//deleting brand
dlbrand;
del_brand(dlbrand){
  var brdel = {brandname:dlbrand}
  this.obj.post("brandserverfile/del_brnd", brdel).subscribe(this.delbr)
}
delbr=(delbrdata)=>{
  alert(delbrdata._body)
  this.read_brands()
}

//Inactive button value

inact_brand(x,inactval){
  x.active=0
  var objinact = {_id:x._id, active:inactval}
  this.obj.post("brandserverfile/inact_brand", objinact).subscribe(iac=>{
  alert(iac._body)
  })
  }
  
  //Active button value
  
  act_brand(y,actval){
    y.active=1
    var objact = {_id:y._id, active:actval}
    this.obj.post("brandserverfile/act_brand", objact).subscribe(ac=>{
    alert(ac._body) 
    }) 
  }



  /*

  */

  ngOnInit() {
    this.read_brands()
  }

}
