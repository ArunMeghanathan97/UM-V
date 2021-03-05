import { Component, OnInit } from '@angular/core';
import { IndexService } from './index.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  page:string = "";
  llist:any   = [];

  constructor(private indexService:IndexService) { }

  ngOnInit(): void {
    this.list();
  }

  list(){

    let me  = this;
    let request:any = { page : 1 };
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

}
