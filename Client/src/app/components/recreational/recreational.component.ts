import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { response } from 'express';
import { GeneralService } from 'src/app/services/general.service';
import { AddFactPopupComponent } from '../popups/add-fact-popup/add-fact-popup.component';

@Component({
  selector: 'app-recreational',
  templateUrl: './recreational.component.html',
  styleUrls: ['./recreational.component.scss']
})
export class RecreationalComponent implements OnInit {

  constructor(
    private generalService: GeneralService,
    private dialog: MatDialog
  ) { }

  sessionData:any;
  activitiesList:any = ["Fun Facts"];
  // activitiesList:any = ["Fun Facts", "Ackinator Game"];
  activeTab = 0;
  disableBtnBoolean:any = false;

  ngOnInit(): void {
    this.sessionData = this.generalService.getSessionData();
  }

  changeActivity(i:any){
    this.activeTab = i;
  }

  factGenerator(){
    this.disableBtnBoolean = true;
    this.generalService.getRandomFact(sessionStorage.getItem("companyId")).subscribe((response:any) => {
      if(response){
        this.generalService.openFactSnackBar(response.content, "OOHHHHH");
        this.disableBtnBoolean = false;
      }
    }, (error:any) => {
      console.log(error);
      this.generalService.openMessageSnackBar(error, "Ok");
      this.disableBtnBoolean = false;
    })
  }

  addFact(){

    let dialogRef = this.dialog.open(AddFactPopupComponent, {

    })
  }


}
