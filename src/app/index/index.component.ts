import { Component, OnInit } from '@angular/core';
import { IndexService } from './index.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  page:string = "";
  llist:any   = [];

  sname:string = "";
  semail:string = "";
  smobile:string = "";
  sstate:string = "";
  sdob:string = "";

  constructor(private indexService:IndexService,  private router: Router,
    private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.list();
  }


  list(){

    let me  = this;
    let request:any = { page : 1 };

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
