import { DialogRef } from '@angular/cdk/dialog';
import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/services/general.service';
import { UserClientService } from 'src/app/services/user-client.service';

@Component({
  selector: 'app-create-project-popup',
  templateUrl: './create-project-popup.component.html',
  styleUrls: ['./create-project-popup.component.scss']
})
export class CreateProjectPopupComponent implements OnInit {

  constructor(
    private dialogRef: DialogRef,
    private userClientService: UserClientService,
    private generalService: GeneralService,
  ) { }

  projectForm:any;
  ClientList:any; // = [{id:"c1", name:"c1"}, {id:"c2", name:"c2"},{id:"c3", name:"c3"},{id:"c4", name:"c4"},{id:"c1", name:"c1"}, {id:"c2", name:"c2"},{id:"c3", name:"c3"},{id:"c4", name:"c4"},{id:"c1", name:"c1"}, {id:"c2", name:"c2"},{id:"c3", name:"c3"},{id:"c4", name:"c4"},{id:"c1", name:"c1"}, {id:"c2", name:"c2"},{id:"c3", name:"c3"},{id:"c4", name:"c4"},];
  UserList:any; // = [{id:"u1", name:"u1"},{id:"u2", name:"u2"},{id:"u3", name:"u3"},{id:"u4", name:"u4"},{id:"u1", name:"u1"},{id:"u2", name:"u2"},{id:"u3", name:"u3"},{id:"u4", name:"u4"},{id:"u1", name:"u1"},{id:"u2", name:"u2"},{id:"u3", name:"u3"},{id:"u4", name:"u4"},{id:"u1", name:"u1"},{id:"u2", name:"u2"},{id:"u3", name:"u3"},{id:"u4", name:"u4"},];

  ngOnInit(): void {
    this.getAllEmployees();
    this.getAllClients();
  }

  generateProjectForm(){
    this.projectForm = {
      project_title : "",
      description : "",
      clients : [],
      comments : [],
      features : [],
      users : [],
      deadline: "",
      company_id : sessionStorage.getItem("companyId")
    }
    this.ClientList.forEach((cl:any) => {
      this.projectForm.clients.push({id: cl.email, assigned:false});
    });
    this.UserList.forEach((u:any) => {
      this.projectForm.users.push({id: u.email, assigned:false});
    });
  }

  onClosePopup(){
    this.dialogRef.close();
  }

  createProject(){
    let tmpClient:any = [];
    this.projectForm.clients.forEach((elem:any) => {
      if (elem.assigned) tmpClient.push(elem.id);
    });
    let tmpUser:any = [];
    this.projectForm.users.forEach((elem:any) => {
      if (elem.assigned) tmpUser.push(elem.id);
    });
    this.projectForm.clients = tmpClient;
    this.projectForm.users = tmpUser;
    console.log(this.projectForm);

    this.userClientService.addProject(this.projectForm).subscribe((response:any) => {
      if(response) {
        console.log(response);
        this.generalService.openMessageSnackBar("Project Created Successfully", "Ok");
      }
    }, (error:any) => {
      console.log(error);
      this.generalService.openMessageSnackBar("Error", "Ok");
    });
    
    this.onClosePopup();
    
  }

  getAllEmployees(){
    this.userClientService.getAllUsers(sessionStorage.getItem("companyId")).subscribe((response:any) => {
      if(response) {
        this.UserList = response;
        console.log("Emp list: ", this.UserList);
      this.generateProjectForm();

      }
    }, (error:any) => {
      console.log(error);
    });
  }
  getAllClients(){
    this.userClientService.getAllClients(sessionStorage.getItem("companyId")).subscribe((response:any) => {
      if(response) {
        console.log("Client list: ", response);
        this.ClientList = response;
        this.generateProjectForm();

      }
    }, (error:any) => {
      console.log(error);
    });
  }

}
