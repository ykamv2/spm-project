import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { ApiUrls } from '../api_urls';

@Injectable({
  providedIn: 'root'
})
export class UserClientService {

  constructor(
    private http: HttpClient,
    private apiUrls: ApiUrls,
  ) { }

  handleError() {
    return (err: any) => {
      return throwError(err);
    }
  }

  getLoggedInUserEmail(){
    return sessionStorage.getItem("email");
  }
  getLoggedInUserType(){
    return sessionStorage.getItem("type");
  }

  // ================================= USER ================================= 

  createUser(body:any): Observable<any>{
    let url = this.apiUrls.createUser;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    // console.log(url);
    return this.http.post(url, body, httpOptions).pipe(catchError(this.handleError()));
  }

  getUserData(email:any): Observable<any>{
    
    if(email == "") email = this.getLoggedInUserEmail();
    let url = this.apiUrls.getUserByEmail.replace("{email}", email);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    // console.log(url);
    return this.http.get(url, httpOptions).pipe(catchError(this.handleError()));
  }

  getUserProjects(userId:any): Observable<any>{
    let url = this.apiUrls.getUserProjects.replace("{userId}", userId);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    // console.log(url);
    return this.http.get(url, httpOptions).pipe(catchError(this.handleError()));
  }

  getAllUsers(companyId:any): Observable<any>{
    if(!companyId) companyId = sessionStorage.getItem("companyId");
    let url = this.apiUrls.getAllUsers.replace("{companyId}", companyId);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    // console.log(url);
    return this.http.get(url, httpOptions).pipe(catchError(this.handleError()));
  }


  // ================================= CLIENT ================================= 

  createClient(body:any): Observable<any>{
    let url = this.apiUrls.createClient;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    // console.log(url);
    return this.http.post(url, body, httpOptions).pipe(catchError(this.handleError()));
  }

  getClientData(email:any): Observable<any>{

    if(email == "") email = this.getLoggedInUserEmail();
    let url = this.apiUrls.getClientByEmail.replace("{email}", email);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    // console.log(url);
    return this.http.get(url, httpOptions).pipe(catchError(this.handleError()));
  }

  getClientProjects(clientId:any): Observable<any>{
    let url = this.apiUrls.getClientProjects.replace("{clientId}", clientId);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    // console.log(url);
    return this.http.get(url, httpOptions).pipe(catchError(this.handleError()));
  }

  getAllClients(companyId:any): Observable<any>{
    if(!companyId) companyId = sessionStorage.getItem("companyId");
    let url = this.apiUrls.getAllClients.replace("{companyId}", companyId);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    // console.log(url);
    return this.http.get(url, httpOptions).pipe(catchError(this.handleError()));
  }

  // ================================= PROJECT GENERAL ================================= 
  
  getParticularProjects(projectId:any): Observable<any>{
    // Note: projectId is the _id value and not the projectId value from project data
    let url = this.apiUrls.getParticularProject.replace("{projectId}", projectId);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    // console.log(url);
    return this.http.get(url, httpOptions).pipe(catchError(this.handleError()));
  }

  addCommentToProject(body:any): Observable<any>{
    let url = this.apiUrls.addComment;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    // console.log(url);
    return this.http.post(url, body, httpOptions).pipe(catchError(this.handleError()));
  }

  addProject(body:any): Observable<any>{
    let url = this.apiUrls.addProject;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    // console.log(url);
    return this.http.post(url, body, httpOptions).pipe(catchError(this.handleError()));
  }


  // ================================= TASKS ================================= 

  addTask(body:any): Observable<any>{
    let url = this.apiUrls.addTask;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    // console.log(url);
    return this.http.post(url, body, httpOptions).pipe(catchError(this.handleError()));
  }

  updateTask(body:any): Observable<any>{
    let url = this.apiUrls.updateTask;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    // console.log(url);
    return this.http.put(url, body, httpOptions).pipe(catchError(this.handleError()));
  }


  addFeature(body:any): Observable<any>{
    let url = this.apiUrls.addFeature;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    // console.log(url);
    return this.http.post(url, body, httpOptions).pipe(catchError(this.handleError()));
  }

  removeFeature(body:any): Observable<any>{
    let url = this.apiUrls.removeFeature;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    // console.log(url);
    return this.http.put(url, body, httpOptions).pipe(catchError(this.handleError()));
  }

  updateFeatureStatus(body:any): Observable<any>{
    let url = this.apiUrls.updateFeatureStatus;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    // console.log(url);
    return this.http.put(url, body, httpOptions).pipe(catchError(this.handleError()));
  }

  


}
