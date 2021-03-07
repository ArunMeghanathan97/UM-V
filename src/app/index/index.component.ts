import { Component, OnInit } from '@angular/core';
import { IndexService } from './index.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  page:string = "";
  llist:any   = [];
  page_num:number = 1;
  sname:string = "";
  semail:string = "";
  smobile:string = "";
  sstate:string = "";
  sdob:string = "";

  page_set:any          = {};
  baseUrl = environment.baseUrl;

  constructor(private indexService:IndexService,  private router: Router,
    private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.list();
  }

  previousClick(){

    let me            = this;
    if ( me.page_num > 1 ){
      me.page_num         = me.page_num + 1;
      me.list();
    }else{
      alert('Reached first page..!');
    }

  }

  nextClick(){

    let me            = this;
    if ( me.page_set['total'] > me.page_set['now'] ){
      me.page         = me.page + 1;
      me.list();
    }else{
      alert('Reached last page..!');
    }
   
  }

  list(){

    let me  = this;
    let request:any = { page : me.page_num };

    if ( this.sname != ""){
      request = { ...request, name : this.sname };
    }
    if ( this.semail != ""){
      request = { ...request, email : this.semail };
    }
    if ( this.smobile != ""){
      request = { ...request, mobile : this.smobile };
    }
    if ( this.sstate != ""){
      request = { ...request, state : this.sstate };
    }
    if ( this.sdob != ""){
      request = { ...request, dob : this.sdob };
    }

    me.indexService.triggerService('list',request).subscribe(
      res => {
        if ( res['error'] == false ){
          me.page   = res['list']['page'];
          me.llist  = res['list']['list'];
        }
      },
      error => {

      }
      );

  }

  search(){
    this.list();
  }

  add(){
    this.router.navigateByUrl('/add');
  }

  edit(id:number){
    this.router.navigateByUrl('/add?recordid='+id);
  }

  view(id:number){
    this.router.navigateByUrl('/add?recordid='+id+"&isview=1");
  }

  export(){

    let me            = this;
    let url:string    = me.baseUrl;
    url               = url + "list?page="+me.page_num+"&export=1";
    if ( this.sname != ""){
      url = url +'&name='+this.sname;
    }
    if ( this.semail != ""){
      url = url +'&email='+this.semail;
    }
    if ( this.smobile != ""){
      url = url +'&mobile='+this.smobile;
    }
    if ( this.sstate != ""){
      url = url +'&state='+this.sstate;
    }
    if ( this.sdob != ""){
      url = url +'&dob='+this.sdob;
    }
    window.location.href = url;
  }

  delete(id:number){
    let me = this;
    let request = { id : id };
    if(confirm("Are you sure to delete ..?")) {
      me.indexService.triggerService('delete',request).subscribe(
        res => {
          if ( res['error'] == false ){
            me.list();
          }
        },
        error => {
  
        }
        );  
    }

  }

}
