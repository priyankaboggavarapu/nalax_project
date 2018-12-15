import { Component, OnInit, Inject } from '@angular/core';
import {Http} from '@angular/http';

@Component({
  selector: 'app-subcat',
  templateUrl: './subcat.component.html',
  styleUrls: ['./subcat.component.css']
})
export class SubcatComponent implements OnInit {

  constructor(@Inject(Http) private obj) { }


//  Insert sub category Method
txtsubcat; drpcat=1;
  fun_ins_subcat(){    
    var dataobj={subcatname:this.txtsubcat,catid:this.drpcat}
    this.obj.post("subcatserverfile/ins_sub_cat",dataobj).subscribe(this.cback2)
  }
  cback2=(dtt)=>{
    alert(dtt._body)
    this.txtsubcat=""
    this.fun_get_subcat()
  }

  
  //reading the sub cat  data fromdb
  allsubcat;
  fun_get_subcat(){
    this.obj.get("subcatserverfile/get_subcat").subscribe(sub=>{
    this.allsubcat=JSON.parse(sub._body)
  }
 )}

  //delete method

  fun_del_subcat(x){
    var obj={subcatname:x}
    this.obj.post("subcatserverfile/del_sub_cat",obj).subscribe(delsub=>{
      alert(delsub._body)
      this.fun_get_subcat()
    })
  }

  //Update button method
catupdate;temp=0;txt
fun_update(ob){
  this.temp=ob._id
  this.txt=ob.subcatname
  this.catupdate=ob.catid
  this.fun_get_subcat()
  
}

fun_save(){
var id={_id:this.temp}
var sname={subcatname:this.txt,catid:this.catupdate}
this.obj.post("subcatserverfile/savesubcat",[id,sname]).subscribe(save=>{
  alert(save._body)
  this.fun_get_subcat()
})
this.temp=0;

}

//inactive button
inact_scat(xsc){
xsc.active=0
var objinact = {_id:xsc._id, active:xsc.active}
this.obj.post("subcatserverfile/inactscat", objinact).subscribe(this.inactdt)
}
inactdt=(iadt)=>{
alert(iadt._body)
this.fun_get_subcat()
}

//active button
act_subcat(ysc){
  ysc.active=1
  var objact = {_id:ysc._id, active:ysc.active}
  this.obj.post("subcatserverfile/actscat", objact).subscribe(this.actdt)
}
actdt=(adt)=>{
alert(adt._body)
this.fun_get_subcat()
}


  //Update category dropdown method
  cat_data;
  ngOnInit ( ) {
  this.obj.get("catserverfile/get_cat").subscribe(dtt=>{    
  this.cat_data=JSON.parse(dtt._body)
  this.fun_get_subcat()
  }

    )}

  }