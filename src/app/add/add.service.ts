import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {
  }

  callAPI(list:string,param:any) {
  
    const headerDict = {
      "Accept": "application/json" ,
    }
    
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict), 
    };
    let params    = {...param, type : 2};
//    return this.http.get(this.baseUrl + list ,requestOptions);
  return this.http.post(this.baseUrl + list, params ,requestOptions);
  }
    private handleError(error: Response) {
      return Observable.throw(error.statusText);
  }
}
