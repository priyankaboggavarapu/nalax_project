import { Component, OnInit,Inject } from '@angular/core';
import {Http} from "@angular/http"

@Component({
  selector: 'app-cat',
  templateUrl: './cat.component.html',
  styleUrls: ['./cat.component.css']
})
export class CatComponent implements OnInit {
txt1=""
data;

  constructor(@Inject(Http) public obj) { }
  
  //inserting category
  fun_ins_cat(){
  var catdt={catname:this.txt1}
    this.obj.post("catserverfile/ins_cat", catdt).subscribe(this.cback1)
}
cback1=(obj)=>{
 alert(obj._body)
 this.txt1=""
 this.fun_get_data()
  
}

//Reading categories

fun_get_data(){
  this.obj.get("catserverfile/get_cat").subscribe(this.cback2)
}

cback2=(obj)=>{
  this.data=JSON.parse(obj._body)
}

//deleting category
dlcat;
del_cat(dlcat){
  var catdel = {catname:dlcat}
  this.obj.post("catserverfile/del_cat", catdel).subscribe(this.delcat)
}
delcat=(delcatdata)=>{
  alert(delcatdata._body)
  this.fun_get_data()
}


//update category
temp=0;updtxt;oldobj;newobj;savdt;newact
cat_update(catdt){
this.temp=catdt._id
this.savdt=catdt
this.updtxt=catdt.catname
this.newact=catdt.active
}
//Saving updated content in category
save_cat(){
  this.oldobj = {_id:this.temp}
  this.newobj = {catname:this.updtxt, active:this.newact}
  var objsav = [this.oldobj, this.newobj]
  this.obj.post("catserverfile/sav_postmet", objsav).subscribe(savdt=>{
  alert(savdt._body)
 
})
this.temp=0 
this.fun_get_data()
}

//Inactive button value

inact_cat(x,inactval){
x.active=0
var objinact = {_id:x._id, active:inactval}
this.obj.post("catserverfile/inact_postmet", objinact).subscribe(iac=>{
alert(iac._body)
})
}

//Active button value

act_cat(y,actval){
  y.active=1
  var objact = {_id:y._id, active:actval}
  this.obj.post("catserverfile/act_postmet", objact).subscribe(ac=>{
  alert(ac._body) 
  }) 
}

  ngOnInit() {
    this.fun_get_data()
  }

}
