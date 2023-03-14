import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable, catchError } from 'rxjs';
import { ApiUrls } from '../api_urls';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  constructor(
    private http: HttpClient,
    private apiUrls: ApiUrls,
  ) { }

  handleError() {
    return (err: any) => {
      return throwError(err);
    }
  }

  // currUserTrainings:any;

  // setCurrUserTrainings(trainings:any){
  //   this.currUserTrainings = trainings;
  // }
  // getParticularCurrUserTrainings(id:any){
  //   let index = this.currUserTrainings.findIndex((t:any) => t.id == id);
  //   if (index > -1) return this.currUserTrainings[index];
  //   else return null;
  // }

  getParticularTraining(id:any): Observable<any>{
    let url = this.apiUrls.getParticularTraining.replace("{training_id}", id);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    // console.log(url);
    return this.http.get(url, httpOptions).pipe(catchError(this.handleError()));
  }

  addTraining(body:any): Observable<any>{
    let url = this.apiUrls.addTraining;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    // console.log(url);
    return this.http.post(url, body, httpOptions).pipe(catchError(this.handleError()));
  }

  getAllTrainings(companyId?:any): Observable<any>{
    if(!companyId) companyId = sessionStorage.getItem("companyId")
    let url = this.apiUrls.getAllTrainings.replace("{companyId}", companyId);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    // console.log(url);
    return this.http.get(url, httpOptions).pipe(catchError(this.handleError()));
  }

  getUserTrainings(email:any): Observable<any>{

    if(!email) email = sessionStorage.getItem("email");
    let url = this.apiUrls.getUserTrainings.replace("{email}", email);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    // console.log(url);
    return this.http.get(url, httpOptions).pipe(catchError(this.handleError()));
  }


  updateTrainingStatus(body:any): Observable<any>{

    let url = this.apiUrls.updateTrainingStatus;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    // console.log(url);
    return this.http.put(url, body, httpOptions).pipe(catchError(this.handleError()));
  }


  assignTraining(body:any): Observable<any>{
    let url = this.apiUrls.assignTraining;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    // console.log(url);
    return this.http.post(url, body, httpOptions).pipe(catchError(this.handleError()));
  }
   

}
