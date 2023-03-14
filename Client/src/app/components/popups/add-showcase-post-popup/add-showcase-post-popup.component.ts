import { DialogRef } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { response } from 'express';
import { GeneralService } from 'src/app/services/general.service';
import { ShowcaseService } from 'src/app/services/showcase.service';

@Component({
  selector: 'app-add-showcase-post-popup',
  templateUrl: './add-showcase-post-popup.component.html',
  styleUrls: ['./add-showcase-post-popup.component.scss']
})
export class AddShowcasePostPopupComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<AddShowcasePostPopupComponent>,
    private showcaseService: ShowcaseService,
    private generalService: GeneralService,
  ) { }

  showcasePostForm:any;

  ngOnInit(): void {
    this.showcasePostForm = {
      title : "",
      content : "",
      date_posted : new Date(),
      img : "",
      post_type: "showcase",
      company_id: sessionStorage.getItem("companyId")
    }
  }

  onClosePopup(){
    this.dialogRef.close();
  }

  createShowcasePost(){
    console.log(this.showcasePostForm);

    this.showcaseService.addShowcasePost(this.showcasePostForm).subscribe((response:any) => {
      if(response) {
        console.log(response);
        this.generalService.openMessageSnackBar("Posted Successfully", "Ok");
      }
    }, (error:any) => {
      console.log(error);
      this.generalService.openMessageSnackBar("Error", "Ok");
    });

    this.onClosePopup();
  }

}
