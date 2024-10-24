import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {



  private baseUrl = 'http://localhost:8080/users';  
  
  constructor(private http:HttpClient) { }  
  
  getUsersList(): Observable<any> {  
    console.log(this.http.get(`${this.baseUrl}`));
    return this.http.get(`${this.baseUrl}`);  
  }  
  
  
 getUser(id: number): Observable<Object> {  
     return this.http.get(`${this.baseUrl}/${id}`);  
    }

 createUser(user: object): Observable<object> {  
      return this.http.post(`${this.baseUrl}`, user);  
    }  
   
  
   
}
