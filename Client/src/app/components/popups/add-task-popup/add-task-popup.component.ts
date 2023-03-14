import { DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GeneralService } from 'src/app/services/general.service';
import { UserClientService } from 'src/app/services/user-client.service';

@Component({
  selector: 'app-add-task-popup',
  templateUrl: './add-task-popup.component.html',
  styleUrls: ['./add-task-popup.component.scss']
})
export class AddTaskPopupComponent implements OnInit {

  constructor(
    private dialogRef: DialogRef,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userClientService: UserClientService,
    private generalService: GeneralService,
  ) { }

  taskForm:any;
  priorityOptions:any = ["Low", "Medium", "High"]
  employeeList:any;


  ngOnInit(): void {
    
    this.getEmployeeList();

    this.taskForm = {
      projectId : this.data.projectId,
      feature_title : this.data.feature_title,
      priority: "Low",
			task_title: "",
			description: "",
			startDateTime: new Date(),
			deadline: "", 
			assignedEmployee: "",
			reward_points: 0,
    }
  }

  onClosePopup(){
    this.dialogRef.close();
  }

  addtask(){
    console.log(this.taskForm);

    this.userClientService.addTask(this.taskForm).subscribe((response:any) => {
      if(response) {
        console.log(response);
        this.generalService.openMessageSnackBar("Task Added Successfully", "OK")
      }
    }, (error:any) => {
      console.log(error);
      this.generalService.openMessageSnackBar("Error Occured", "OK")
    });

    this.onClosePopup();
    
  }

  getEmployeeList(){
    this.userClientService.getAllUsers(sessionStorage.getItem("companyId")).subscribe((response:any) => {
      if(response){
        console.log("Emp list : " , response);
        this.employeeList = response;
      }
    })
  }

}
