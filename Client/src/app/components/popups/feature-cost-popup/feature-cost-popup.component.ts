import { DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GeneralService } from 'src/app/services/general.service';
import { UserClientService } from 'src/app/services/user-client.service';

@Component({
  selector: 'app-feature-cost-popup',
  templateUrl: './feature-cost-popup.component.html',
  styleUrls: ['./feature-cost-popup.component.scss']
})
export class FeatureCostPopupComponent implements OnInit {

  cost:any = 0;
  projectData:any;
  feature:any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: DialogRef,
    private userClientService: UserClientService,
    private generalService: GeneralService
  ) { }

  ngOnInit(): void {
    this.feature = this.data.feature;
    this.projectData = this.data.projectData;
    
  }

  accept(){
    let body:any = {
      projectId : this.projectData["_id"],
      feature_title: this.feature.feature_title,
      user_type : 'user',
      status : true,
      cost: this.cost
    }
    this.userClientService.updateFeatureStatus(body).subscribe((response:any) => {
      if(response) {
        console.log(response);
        this.generalService.openMessageSnackBar("Feature Accepted Successfully", "OK")
      }
    }, (error:any) => {
      console.log(error);
      this.generalService.openMessageSnackBar("Error Occured", "OK")
    });
    this.onClosePopup()
  }

  onClosePopup(){
    
    this.dialogRef.close();
  }

}
