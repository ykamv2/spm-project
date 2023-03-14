import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, catchError, throwError, Subject } from 'rxjs';
import { ApiUrls } from '../api_urls';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor(
    private _snackBar: MatSnackBar,
    private apiUrls: ApiUrls,
    private http: HttpClient,

  ) { }

  navbarLoginSubject:any = new Subject();
  IAMSubject:any = new Subject();

  openMessageSnackBar(message: string, action: string) {
    this._snackBar.open(message, action,{
      duration: 3000,
      panelClass: "bottomSnackbar"
    });
  }
  openFactSnackBar(message: string, action: string) {
    this._snackBar.open(message, action,{
      duration: 3000,
      panelClass: "factSnackbar"
    });
  }

  handleError() {
    return (err: any) => {
      return throwError(err);
    }
  }


  addFact(body:any): Observable<any>{
    let url = this.apiUrls.addFact;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    // {
    //   company_id: "As",
    //   content: ""
    // }
    return this.http.post(url, body, httpOptions).pipe(catchError(this.handleError()));
  }

  getRandomFact(companyId:any): Observable<any>{
    
    if(!companyId) companyId = sessionStorage.getItem("companyId");

    let url = this.apiUrls.getRandomFact.replace("{companyId}", companyId);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    // console.log(url);
    return this.http.get(url, httpOptions).pipe(catchError(this.handleError()));
  }

  getSessionData(){
    return {
      companyId : sessionStorage.getItem("companyId"),
      email : sessionStorage.getItem("email"),
      type : sessionStorage.getItem("type"),
      user_type : sessionStorage.getItem("user_type"),
    }
  }

 }
