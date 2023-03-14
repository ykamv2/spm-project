import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralService } from 'src/app/services/general.service';
import { UserClientService } from 'src/app/services/user-client.service';

@Component({
  selector: 'app-task-page',
  templateUrl: './task-page.component.html',
  styleUrls: ['./task-page.component.scss']
})
export class TaskPageComponent implements OnInit {

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userClientService: UserClientService,
    private generalService: GeneralService
  ) { }

  sessionData:any;
  
  projectData:any;
  featureData:any;
  taskData:any;

  employeeList:any;
  statusList:any = ["TODO", "In Progress", "In Review", "Blocked", "Done"]

  incomingData:any = {
    projectId: "",
    featur_title: "",
    task_title: ""
  }

  ngOnInit(): void {
    this.sessionData = this.generalService.getSessionData();
    
    this.incomingData.projectId = this.activatedRoute.snapshot.paramMap.get('project_id');
    this.incomingData.featur_title = this.activatedRoute.snapshot.paramMap.get('featur_title');
    this.incomingData.task_title = this.activatedRoute.snapshot.paramMap.get('task_title');
    // console.log(this.projectId);
    this.getProjectData(this.incomingData.projectId);

    this.getEmployeeList();
  }

  getProjectData(projectId:any){
    
    this.userClientService.getParticularProjects(projectId).subscribe((response:any) => {
      if(response){
        console.log(response);
        this.projectData = response[0];
        let fi = this.projectData.features.findIndex((x:any) => x.feature_title == this.incomingData.featur_title)
        if(fi < 0){
          this.router.navigate(["projects", this.incomingData.project_id]);
        }else{
          this.featureData = this.projectData.features[fi];
          let ti = this.featureData.tasks.findIndex((x:any) => x.task_title == this.incomingData.task_title)
          if(ti < 0) this.router.navigate(["projects", this.incomingData.project_id]);
          else{
            this.taskData = this.featureData.tasks[ti];
          }
        }
      }
    }, (error:any)=>{
      console.log("Error : ", error);
    })
  }

  getEmployeeList(){
    this.userClientService.getAllUsers(sessionStorage.getItem("companyId")).subscribe((response:any) => {
      if(response){
        console.log("Emp list : " , response);
        this.employeeList = response;
      }
    })
  }


  onTaskStatusUpdate(){
    let body:any =  {
      projectId: this.projectData["_id"],
      feature_title: this.featureData.feature_title,
      task_title: this.taskData.task_title,
      type: "status",
      status: this.taskData.status,
      assignedEmployee: ""
    };
    console.log(body);
    
    this.userClientService.updateTask(body).subscribe((response:any) => {
      if(response) {
        console.log(response);
        this.generalService.openMessageSnackBar("Task Updated Successfully", "OK")
      }
    }, (error:any) => {
      console.log(error);
      this.generalService.openMessageSnackBar("Error Occured", "OK")
    });
  }

  onTaskAssigneeUpdate(){
    let body:any =  {
      projectId: this.projectData["_id"],
      feature_title: this.featureData.feature_title,
      task_title: this.taskData.task_title,
      type: "assignee",
      status: '',
      assignedEmployee: this.taskData.assignedEmployee
    };
    console.log(body);
    
    this.userClientService.updateTask(body).subscribe((response:any) => {
      if(response) {
        console.log(response);
        this.generalService.openMessageSnackBar("Task Updated Successfully", "OK")
      }
    }, (error:any) => {
      console.log(error);
      this.generalService.openMessageSnackBar("Error Occured", "OK")
    });
    
  }


}
