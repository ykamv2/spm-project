import { DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { response } from 'express';
import { GeneralService } from 'src/app/services/general.service';
import { UserClientService } from 'src/app/services/user-client.service';

@Component({
  selector: 'app-add-feature-popup',
  templateUrl: './add-feature-popup.component.html',
  styleUrls: ['./add-feature-popup.component.scss']
})
export class AddFeaturePopupComponent implements OnInit {

  newFeatureForm:any;

  constructor(
    private dialogRef: DialogRef,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userClientService:UserClientService,
    private generalService: GeneralService,

  ) { }

  ngOnInit(): void {
    console.log(this.data.data);
    
    this.newFeatureForm = {
      projectId : this.data.data["_id"],
      feature_title : "",
      accepted : "No",
      cost : 0,
      // status : "TODO",
      // start_date : new Date().toISOString().split("T")[0],
      // deadline : 0,
    }
  }

  onClosePopup(){
    this.dialogRef.close();
  }

  addFeature(){
    console.log(this.newFeatureForm);
    this.userClientService.addFeature(this.newFeatureForm).subscribe((response:any) => {
      if(response) {
        console.log("Feature added : ", response);
        this.generalService.openMessageSnackBar("Feature Added Successfully", "Ok");
      }
    }, (error:any) => {
      console.log(error);
      this.generalService.openMessageSnackBar("Error", "Ok");
    });
    
    this.onClosePopup();
  }

}
