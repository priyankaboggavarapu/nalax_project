import { Component, OnInit, Inject } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  iname;drpcat;drpsubcat;drpsubsubcat;data2;data1;data3;data4;txtprdt;drpbrand;colrprdt;prprdt;desprdt;qtyprdt;ratprdt;img;imgprdt
  constructor(@Inject(Http) public obj) { }

  // Getting image file
  fun_img(){
   
  }

  //Getting category dropdown 

  dp_catdata_ssc(){
    this.obj.get("productserverfile/get_catdata_ssc1").subscribe(this.getcatdata)
  }
  getcatdata=(dt)=>{
    this.data1=JSON.parse(dt._body)
  }



  //Getting sub category drop down
  dpsubcatdata(){
    var catiddp = {catid:this.drpcat}
    //alert(catiddp.catid)
    this.obj.post("productserverfile/get_subcatdata_ssc2", catiddp).subscribe(this.getsubcatdata)
  }
  getsubcatdata=(dtt)=>{
    this.data2=JSON.parse(dtt._body)
    //alert(this.data2)
  }  

///////////getting subsubcategory data dropdown///////
dpsubsubcatdata(){
  var subcatiddp={subcatid:this.drpsubcat}
  this.obj.post("productserverfile/get_subsubcatdata_ssc3",subcatiddp).subscribe(this.getsubsubcatdata)
}
getsubsubcatdata=(dttt)=>{
  this.data3=JSON.parse(dttt._body)
  alert(this.data3)
}

/////////////getting brand dropdown/////////
dpbranddata(){
  this.obj.get("productserverfile/get_branddata").subscribe(this.getbrand)
}
getbrand=(dtttt)=>{
  this.data4=JSON.parse(dtttt._body)
  alert(this.data4)
}

///////inserting product details///////////
product_ins(){
  var productdata={pname:this.txtprdt,catid:this.drpcat,subcatid:this.drpsubcat,subsubcatid:this.drpsubsubcat,brandid:this.drpbrand,pcolour:this.colrprdt,pprice:this.prprdt,desprdt:this.desprdt,pquantity:this.qtyprdt,prating:this.ratprdt,}
  this.obj.post("productserverfile/ins_product",productdata).subscribe(this.insproduct)

}
insproduct=(dttt)=>{
  alert(dttt._body)
  this.txtprdt=""
  this.read_product()
  var form_ref=<HTMLFormElement>document.getElementById("fm1")
  form_ref.submit()

}
///////////reading product data////////////
//reading sub sub category data
allproductdata
read_product()
{
this.obj.get("productserverfile/read_product").subscribe(this.prdt)
}
prdt=(dtprdt)=>{
 this.allproductdata=JSON.parse(dtprdt._body) 
}



  ngOnInit()
        
  
  
  {
    this.read_product()
    this.dp_catdata_ssc()
    this.dpsubcatdata()
    this.dpsubsubcatdata()
    this.dpbranddata()
  
    var arr=document.URL.split("?")
    if(arr.length>1){
    var iname= arr[1].split("=")
    // alert(iname)
    if(iname[0]=="res"){
    var img=iname[1]
   alert(img)
   
     var ob={pimg:img}
     alert(ob.pimg)
   this.obj.post("productserverfile/ins_img",ob).subscribe(dt=>{
    alert(dt._body)
  })
}
}
   }}

