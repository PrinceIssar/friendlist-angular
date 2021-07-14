import { Injectable } from '@angular/core';
// to do api calls we need to import httplclient
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
// import any = jasmine.any;

@Injectable({
  providedIn: 'root'
})


// we'll need to create 4 api put post delete
//inside shared folder we create a service. once the folder is created we can delete the testing file as we don't need to do testing

export class ApiService {
// now we can inject the http request from constructor
  constructor(private http : HttpClient) { }
  // we have 4 method post, updating delete, fetch
  postFriend(data : any){
    return this.http.post<any>("http://localhost:3000/posts",data)
      .pipe(map((res:any)=>{
        return res;
    }))
  }

  getFriend(){
    return this.http.get<any>("http://localhost:3000/posts")
      .pipe(map((res:any)=>{
        return res;
      }))
  }

  updateFriend(data : any,id: number){
    return this.http.put<any>("http://localhost:3000/posts/"+id,data)
      .pipe(map((res:any)=>{
        return res;
      }))
  }

  deleteFriend(id : number){
    return this.http.delete<any>("http://localhost:3000/posts/"+id)
      .pipe(map((res:any)=>{
        return res;
      }))
  }

}
// now as we have api method ready, let create a model ,so to have our data which can pass here
