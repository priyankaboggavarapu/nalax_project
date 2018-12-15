import { Component, OnInit, Inject } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-subsubcat',
  templateUrl: './subsubcat.component.html',
  styleUrls: ['./subsubcat.component.css']
})
export class SubsubcatComponent implements OnInit {
  data1;data2;drpcat;ssubcattxt;drpsubcat
  constructor(@Inject(Http) public obj ) { }

//Getting category dropdown 

  dp_catdata_ssc(){
    this.obj.get("subsubcatserverfile/get_catdata_ssc").subscribe(this.getcatdata)
  }
  getcatdata=(dt)=>{
    this.data1=JSON.parse(dt._body)
  }

  //Getting sub category drop down
  dpsubcatdata(){
    var catiddp = {catid:this.drpcat, subcatid:this.drpsubcat}
    //alert(catiddp.catid)
    this.obj.post("subsubcatserverfile/get_subcatdata_ssc", catiddp).subscribe(this.getsubcatdata)
  }
  getsubcatdata=(dtt)=>{
    this.data2=JSON.parse(dtt._body)
    //alert(this.data2)
  }  

  //Inserting Sub sub categories
  ins_subsubcat(){
    var ssubcatdata = {ssubname:this.ssubcattxt,catid:this.drpcat,subcatid:this.drpsubcat}
    this.obj.post("subsubcatserverfile/ins_ssubcat",ssubcatdata).subscribe(this.insSsubdat)
  }

  insSsubdat=(dttt)=>{
    alert(dttt._body)
    this.ssubcattxt=""
    this.read_sscdata()
  }

  //reading sub sub category data
  allsscatdata
read_sscdata()
{
this.obj.get("subsubcatserverfile/read_ssubcat").subscribe(this.sscdt)
}
sscdt=(dtssc)=>{
 this.allsscatdata=JSON.parse(dtssc._body) 
}

//deleting
deldt;
del_sscat(deldt){
  var objdel = {ssubname:deldt}
  this.obj.post("subsubcatserverfile/del_ssubcat", objdel).subscribe(this.dldt)
}
dldt=(sscdldt)=>{
  alert(sscdldt._body)
  this.read_sscdata()
}


//Update subsubcategory
tem=0;ssc;ssctxt;catid
update_sscat(ssc){
this.tem = ssc._id
this.catid=ssc.catid
this.ssctxt = ssc.ssubname
this.drpcat = ssc.catid
this.drpsubcat = ssc.subcatid

}

//saving sub sub category new content
objsav
sav_sscat(){
var oldob = {_id:this.tem}
var newob={catid:this.drpcat,subcatid:this.drpsubcat, ssubname:this.ssctxt}
var objsave = [oldob, newob]
this.obj.post("subsubcatserverfile/new_sscat", objsave).subscribe(this.savdt)
}
savdt=(dtsc)=>{
  alert(dtsc._body)
  this.tem=0
  this.read_sscdata()
}

/*

*/


//inactive

inact_sscat(inacx){
  inacx.active=0
  var objinact = {_id:inacx._id, active:inacx.active}
  this.obj.post("subsubcatserverfile/inact_ssubcat", objinact).subscribe(this.inatdt)
  }
  inatdt=(iat)=>{
alert(iat._body)
this.read_sscdata()
}


//Active

act_sscat(acx){
  acx.active=1
  var objact = {_id:acx._id, active:acx.active}
  this.obj.post("subsubcatserverfile/inact_ssubcat", objact).subscribe(this.atdt)
  }
  atdt=(at)=>{
alert(at._body)
this.read_sscdata()
}




  ngOnInit() {
    this.dp_catdata_ssc()
    this.read_sscdata()
  }

}
