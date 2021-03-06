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

  sname:string = "";
  semail:string = "";
  smobile:string = "";
  sstate:string = "";
  sdob:string = "";
  baseUrl = environment.baseUrl;

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

  export(){
    // let list:any = [];
    // let me        = this;
    // let hh:any    = [];
    // list.push();
    // this.convertToCsv('users.csv',this.llist);

    let me  = this;
    let request:any = { page : 1 , export : 1};

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

  convertToCsv(fName, rows) {
    var csv = '';
    for (var i = 0; i < rows.length; i++) {
        var row = rows[i];
        for (var j = 0; j < row.length; j++) {
            var val = row[j] === null ? '' : row[j].toString();
            val = val.replace(/\t/gi, " ");
            if (j > 0)
                csv += '\t';
            csv += val;
        }
        csv += '\n';
    }

    // for UTF-16
    var cCode, bArr = [];
    bArr.push(255, 254);
    for (var i = 0; i < csv.length; ++i) {
        cCode = csv.charCodeAt(i);
        bArr.push(cCode & 0xff);
        bArr.push(cCode / 256 >>> 0);
    }

    var blob = new Blob([new Uint8Array(bArr)], { type: 'text/csv;charset=UTF-16LE;' });
    if (navigator.msSaveBlob) {
        navigator.msSaveBlob(blob, fName);
    } else {
        var link = document.createElement("a");
        if (link.download !== undefined) {
            var url = window.URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", fName);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        }
    }
}

}
