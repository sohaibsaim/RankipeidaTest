import { Injectable,Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class GenericApiCallingService {
  baseUrl: string;
  constructor(private http: HttpClient,@Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = baseUrl + 'api/';
   }
   PostData<T>(ControllerName: any, MethodName: any, data: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + ControllerName + '/' + MethodName, data);
  }
  GetData<T>(ControllerName: any, MethodName: any): Observable<any> {
    return this.http.get<any>(this.baseUrl +ControllerName + '/' + MethodName);
  }
}
