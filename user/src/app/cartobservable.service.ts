import { Injectable } from '@angular/core';
import { BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartobservableService {
private initialItem=new BehaviorSubject("0")
currentitem=this.initialItem.asObservable()
  constructor() { }
  funcartobservable(items:string){
    this.initialItem.next(items)
  }
  public login=new BehaviorSubject("vis")
  log=this.login.asObservable()
  funlogobs(n){
    this.login.next(n)
  }
}

