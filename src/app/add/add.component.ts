import { Component, OnInit } from '@angular/core';
import * as $ from '../../assets/plugins/jquery/jquery.js';
import { AddService } from './add.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  formdom:any;

  name:string       = '';
  username:string   = '';
  email:string      = '';
  mobile:string     = '';
  dob:string        = '';
  address:string    = '';
  city:string       = '';
  state:string      = '';
  country:string    = '';
  profile_img:any   = [];

  constructor(private addService:AddService) { }

  ngOnInit(): void {
    this.formdom    = $('#contact');
  }

  save(){

    if ( this.isFielok() ){
      this.save();
    }

  }

  saveAPI(){

    let me  = this;

    let request:any = { name : this.name, username:this.username, email:this.email, 
      mobile:this.mobile, profile_img:this.profile_img, dob:this.dob, address:this.address, 
      city:this.city, state:this.state, country:this.country };

    me.addService.save('add',request).subscribe(
      res => {
        if ( res['error'] == false ){
          
        }
      },
      error => {

      }
      );

  }

  isFielok(){
    let flg = true;
    if ( this.name == '' ){
      flg = false;
      alert("Name is Empty..!");
    }else if(this.username == ''){
      flg =false;
    }else if(this.email == ''){
      flg =false;
    }else if(this.mobile == ''){
      flg =false;
    }else if(this.dob == ''){
      flg =false;
    }else if(this.address == ''){
      flg =false;
    }else if(this.city == ''){
      flg =false;
    }else if(this.state == ''){
      flg =false;
    }else if(this.country == ''){
      flg =false;
    }
    return flg;
  }

}
