import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable, catchError } from 'rxjs';
import { ApiUrls } from '../api_urls';

@Injectable({
  providedIn: 'root'
})
export class RewardsService {

  constructor(
    private http: HttpClient,
    private apiUrls: ApiUrls,
  ) { }

  handleError() {
    return (err: any) => {
      return throwError(err);
    }
  }

  getRewards(companyId:any): Observable<any>{
    if(!companyId) companyId = sessionStorage.getItem("companyId");
    let url = this.apiUrls.getRewards.replace("{companyId}",companyId);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    // console.log(url);
    return this.http.get(url, httpOptions).pipe(catchError(this.handleError()));
  }

  addRewards(body:any): Observable<any>{
    let url = this.apiUrls.addReward;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    // console.log(url);
    return this.http.post(url, body, httpOptions).pipe(catchError(this.handleError()));
  }

  redeemReward(body:any): Observable<any>{
    let url = this.apiUrls.redeemReward;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    // console.log(url);
    return this.http.post(url, body, httpOptions).pipe(catchError(this.handleError()));
  }

}
