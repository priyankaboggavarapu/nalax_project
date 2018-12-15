import { Component, OnInit, Inject } from '@angular/core';
import {ActivatedRoute} from '@angular/router'
import {Http} from '@angular/http';

@Component({
  selector: 'app-productpage',
  templateUrl: './productpage.component.html',
  styleUrls: ['./productpage.component.css']
})
export class ProductpageComponent implements OnInit {

  constructor(@Inject(ActivatedRoute) public ar,@Inject(Http) public obj ){}

  //geting products data
prdata;
  tmp
  get_prordata(){
    this.ar.params.subscribe(por=>{
      var id=por["_id"]
      var ob={_id:id}
    this.obj.post("productserver/get_prdata", ob ).subscribe(dtpr=>{
    this.prdata=JSON.parse(dtpr._body)
    
  
     })

  })

  }

  ngOnInit() {
    this.get_prordata()
  }

}
