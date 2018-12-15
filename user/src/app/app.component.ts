import { Component,Inject,OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Http} from '@angular/http';
import {trigger,state,style,animate, transition,} from '@angular/animations';
import{CartobservableService} from './cartobservable.service';

var myanimation=[trigger("anm1",
[state("st1",style({top:'100px'})),
state("st2",style({top:'-600px'})),
transition("st1<=>st2",animate("1000ms"))]),

trigger("anm2",
[state("reg1",style({top:'100px'})),
state("reg2",style({top:'-600px'})),
transition("reg1<=>reg2",animate("1000ms"))])
]

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations:[myanimation]

})

export class AppComponent {
  data;sdata;ssdata;uname;pwd;tmp="st2";tmp2="reg2";uname1;pwd1;rpwd;em;mbno;hide=1;addcart;searchtxt;sdrp;searchdata;currentitemlength;user

  constructor(@Inject(ActivatedRoute) public ar,@Inject(Http) public obj,public cart:CartobservableService){}

  /////////login//////////

login(){
 //alert("hii")
  //alert(this.uname)
 // alert(this.pwd)
  var ob={uname:this.uname,password:this.pwd}
  this.obj.post("loginserver/login",ob).subscribe(x=>{
    //alert(x._body)
    
      var oc=JSON.parse(x._body)
     // alert(oc)
      console.log(oc)
      if(oc.count==1)
      {
      
        alert("Login Successfully")
        var details={uid:oc.uid,uname:oc.uname}
        //alert(details)
      this.hide=0
     var usertk=oc.tk
      localStorage.setItem("uname",JSON.stringify(details))
     localStorage.setItem("token",JSON.stringify(usertk))

      this.fun_close();
      
      }
      else{
        alert("invalid user")
      }
      
    })
  this.uname="";
  this.pwd="";
}

fun_close(){
  
  this.tmp="st2";
}
    
  login_fun(){
  
    this.tmp="st1";
    
    this.fun_cls();
    
  }



  fun_reg(){
  

    var ob={uname:this.uname1,password:this.pwd1,retypepassword:this.rpwd,email:this.em,mobileno:this.mbno}
    //alert(ob)
    this.obj.post("registorserver/Register",ob).subscribe(

      x=>{
        alert(x._body)
      })
      this.uname1=""
      this.pwd1=""
     this.rpwd=""
     this.em=""
     this.mbno=""
  }

  registor_fun(){

    this.tmp2="reg1";
    this.fun_close();
  }

  fun_cls(){
    this.tmp2="reg2"
  }
funobserve(){
  this.cart.currentitem.subscribe(obs=>{
    //alert(obs)
     this.currentitemlength=obs
   //  alert(this.currentitemlength)
   })
}
funclose(){
  alert("hii")
  localStorage.removeItem("cart")
  localStorage.removeItem("uname")
  localStorage.removeItem("token")
}
  ngOnInit(){

    this.funobserve();
   

    //this.funcart()

    // getting Category Menu///////////////
this.obj.get("catserver/user_cat").subscribe(
  dt=>{
    this.data=JSON.parse(dt._body)
   // alert(this.data)
  })
 this.fun2()
}

// getting subcat in cat dropdown///////////
fun2(){
  this.obj.get("subcatserverfile/user_subcat").subscribe(
    dtt=>{
      this.sdata=JSON.parse(dtt._body)
     // alert(this.sdata)
    })

 this.fun3()
}
///////////getting subsubcategory///////////
 fun3(){
   //alert("hii")
this.obj.get("subsubcatserver/user_subsubcat").subscribe(
  dttt=>{
    this.ssdata=JSON.parse(dttt._body)
    //alert(this.ssdata)
  }
)
}
funsearch(){
  if(this.searchtxt.length==0){
    this.sdrp=0;
  }
  else{
    this.sdrp=1
    var ob={pname:this.searchtxt}
  this.obj.post("productserver/get_search").subscribe(
  search=>{
      this.searchdata=JSON.parse(search._body)
    }
  )
}
}






}
