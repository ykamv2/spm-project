import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommunityService } from 'src/app/services/community.service';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-add-community-post-popup',
  templateUrl: './add-community-post-popup.component.html',
  styleUrls: ['./add-community-post-popup.component.scss']
})
export class AddCommunityPostPopupComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<AddCommunityPostPopupComponent>,
    private communityService: CommunityService,
    private generalService: GeneralService,
  ) { }

  postForm:any;
  type:any;

  ngOnInit(): void {
    console.log(this.data);
    this.type = this.data.post_type;
    this.postForm = {
      post_type: this.type,
			title: "",
			content: "",
      company_id: sessionStorage.getItem("companyId"),
      user: sessionStorage.getItem("email")?.split("@")[0]
    }
  }

  onClosePopup(response:any){
    this.dialogRef.close(response);
  }

  addPost(){
    console.log(this.postForm);

    this.communityService.addCommunityPosts(this.postForm).subscribe((response:any) => {
      if(response) {
        console.log(response);
        this.generalService.openMessageSnackBar("Posted Successfully", "Ok");
        this.onClosePopup('success');
      }
    }, (error:any) => {
      console.log(error);
      this.generalService.openMessageSnackBar("Error", "Ok");
      this.onClosePopup('error');
    });
    
  }

}
