import { Component, OnInit } from '@angular/core';
import * as $ from '../../assets/plugins/jquery/jquery.js';
import { AddService } from './add.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  formdom:any;
  recordid:number   = 0;
  isview:number     = 0;
  name:string       = '';
  username:string   = '';
  email:string      = '';
  mobile:string     = '';
  dob:string        = '';
  address:string    = '';
  city:string       = '';
  state:string      = '';
  country:string    = '';
  imagesrc:string   = "";
  param:any         = [];
  backend : string  = environment.backend;

  constructor(private addService:AddService, private router: Router,
    private route: ActivatedRoute,) { }

  ngOnInit(): void {

    this.formdom    = $('#contact');
    let me        = this; 
    me.route.queryParams.subscribe(params => {

      if (params['recordid'] != null){
        me.recordid = params['recordid'];
      }
      if (params['isview'] != null){
        me.isview = params['isview'];
      }

    });
    if ( me.recordid != 0 ){
      me.callAPI();
    }
  }

  callAPI(){

    let me  = this;
    let request:any = { id : me.recordid };
    me.addService.callAPI('add',request).subscribe(
      res => {
        if ( res['error'] == false ){
          let data    = res['data'];
          me.address  = data['address'];
          me.city     = data['city'];
          me.country  = data['country'];
          me.dob      = data['dob'];
          me.email    = data['email'];
          me.mobile   = data['mobile'];
          me.name     = data['name'];
          me.state    = data['state'];
          me.username = data['username'];
          me.imagesrc = me.backend + data['profile_img'];
        }
      },
      error => {

      }
      );

  }

  save(){

    if ( this.isFielok() ){
      this.saveAPI();
    }

  }

  saveAPI(){

    let me  = this;

    let request:any = { name : this.name, username:this.username, email:this.email, 
      mobile:this.mobile, profile_img:this.param, dob:this.dob, address:this.address, 
      city:this.city, state:this.state, country:this.country };

      if ( me.recordid != 0 ){
        request     = { ...request, id : me.recordid };
      }

    me.addService.callAPI('add',request).subscribe(
      res => {
        if ( res['error'] == false ){
          let data    = res['data'];
          me.address  = data['address'];
          me.city     = data['city'];
          me.country  = data['country'];
          me.dob      = data['dob'];
          me.email    = data['email'];
          me.mobile   = data['mobile'];
          me.name     = data['name'];
          me.state    = data['state'];
          me.username = data['username'];
          me.imagesrc = me.backend + data['profile_img'];
          me.isview   = 1;
        }
      },
      error => {

      }
      );

  }

  uploadFile(event) {

    let my    = this;
    for (let index = 0; index < event.length; index++) {

        const element = event[index];
        var reader = new FileReader();
        var baseString;
        var re = /(?:\.([^.]+))?$/;
        var iFileSize = element.size;
        if ( iFileSize > 10485760){
            alert('File size maximum 10Mb!');
            return; 
        }
        reader.onloadend = function () {
            baseString = reader.result;
            let exten         = re.exec(element.name)[1] ;
            if ( ['png','jpg','jpeg','gif'].includes(exten) ){
              my.imagesrc     = baseString;
              my.param          = [ { ext :exten, encode : baseString } ];
            }else{
              alert("Please select image file, like ( 'png','jpg','jpeg','gif' )");
            }
        };

        reader.readAsDataURL(element);
    }
  }

  isFielok(){
    let flg = true;
    if ( this.name == '' ){
      flg = false;
      alert("Name is Empty..!");
    }else if(this.username == ''){
      alert("Username is Empty..!");
      flg =false;
    }else if(this.email == ''){
      alert("Email is Empty..!");
      flg =false;
    }else if(this.mobile == ''){
      alert("Mobile is Empty..!");
      flg =false;
    }else if(this.dob == ''){
      alert("Date of birth is Empty..!");
      flg =false;
    }else if(this.address == ''){
      alert("Address is Empty..!");
      flg =false;
    }else if(this.city == ''){
      alert("Name is Empty..!");
      flg =false;
    }else if(this.state == ''){
      alert("City is Empty..!");
      flg =false;
    }else if(this.country == ''){
      alert("Country is Empty..!");
      flg =false;
    }
    return flg;
  }

  back(){
    window.history.back();
  }

  edit(){
      this.isview   = 0;
  }
  home(){
    this.router.navigateByUrl('');

  }
}
