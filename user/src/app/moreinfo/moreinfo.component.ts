import { Component, OnInit, Inject } from '@angular/core';
import{ActivatedRoute} from '@angular/router';
import {Http,HttpModule} from '@angular/http';
import{CartobservableService} from '../cartobservable.service';

@Component({
  selector: 'app-moreinfo',
  templateUrl: './moreinfo.component.html',
  styleUrls: ['./moreinfo.component.css']
})
export class MoreinfoComponent implements OnInit {

  constructor(@Inject(ActivatedRoute) public obj,@Inject(Http) public ob,public cartobs:CartobservableService) { }
moreinfo;ratingarr=[];halfstar=0;cart;selqty=1;
  funmoreinfo(){
    this.obj.params.subscribe(dt=>{

  
      var ob={id:parseInt(dt["id"])}
    
      this.ob.post("moreinfoserver/more",ob).subscribe(mor=>{
        
     this.moreinfo=JSON.parse(mor._body)
     var rating=this.moreinfo[0].prating
    
     for(var i=1;i<rating;i++){
       this.ratingarr.push(i)

     }
     i--;
  //alert(i)
  //alert(rating)
     if(rating>i)
     this.halfstar=1
      })
    
  })
}
funminus(qt){

if(this.selqty>1){
  this.selqty--

}else{
  alert("quantity must be greater than 1")
}


}
funplus(qty){

  if(this.selqty<=qty.pquantity){
    this.selqty++
    

  }
}
 
 arr=[];totarr=[];localdata;
funaddtocart(moreinfo){
  this.arr=[]
  this.totarr=[]

  //alert(JSON.stringify(moreinfo))
this.localdata=JSON.parse(localStorage.getItem("cart"))
//alert(this.localdata)
if(this.localdata!=null){
//alert(this.localdata.length) 
for(var i=0;i<this.localdata.length;i++){
  if(this.localdata[i]._id==moreinfo._id){
    var oldqty=this.localdata[i].selectedqty
   // alert(oldqty)
    var newqty=this.selqty
    //alert(newqty)
    var tqty=oldqty+newqty
   // alert(tqty)
    this.localdata[i].selectedqty=tqty
   // alert(this.localdata[i].selectedqty)
    localStorage.setItem("cart",JSON.stringify(this.localdata))
    
  }
  else{
    
    this.totarr.push(this.localdata[i])
    var length=this.localdata.length
   // alert(length)
    console.log(this.totarr)
    if(this.localdata[i]._id==this.localdata[length-1]._id){
      moreinfo.selectedqty=this.selqty
      this.totarr.push(moreinfo)
      localStorage.setItem("cart",JSON.stringify(this.totarr))
     

    }
  }
  
}

}
else{
  moreinfo.selectedqty=this.selqty
 
this.arr.push(moreinfo)
console.log(moreinfo)
localStorage.setItem("cart",JSON.stringify(this.arr))
//alert(localStorage.getItem('cart'))
this.cartobs.funcartobservable(this.arr.length.toString())
}
this.funobs()

}
funobs(){
  var items=JSON.parse(localStorage.getItem("cart"))
  var cartlength=items.length
  alert(cartlength)
  this.cartobs.funcartobservable(cartlength.toString())
}
  ngOnInit() {
    this.funmoreinfo()

    this.funobs()
  }


}
