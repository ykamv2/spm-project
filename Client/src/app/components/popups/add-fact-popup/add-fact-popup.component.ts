import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-add-fact-popup',
  templateUrl: './add-fact-popup.component.html',
  styleUrls: ['./add-fact-popup.component.scss']
})
export class AddFactPopupComponent implements OnInit {

  constructor(
    private generalService: GeneralService,
    private dialogRef: MatDialogRef<AddFactPopupComponent>
  ) { }

  sessionData:any;
  content:any = "";

  ngOnInit(): void {
    this.sessionData = this.generalService.getSessionData();
  }

  onClosePopup(response:any){
    this.dialogRef.close(response);
  }

  addFact(){
    
    let body:any = {
      content: this.content,
      company_id: this.sessionData.companyId
    }

    this.generalService.addFact(body).subscribe((response:any) => {
      if(response) {
        console.log(response);
        this.generalService.openMessageSnackBar("Fact Created Successfully", "Ok");
      }
    }, (error:any) => {
      console.log(error);
      this.generalService.openMessageSnackBar("Error", "Ok");
    });

    this.onClosePopup("");
  }

}
