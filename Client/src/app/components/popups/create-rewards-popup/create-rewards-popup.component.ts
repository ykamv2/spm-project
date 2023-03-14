import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { RewardsService } from 'src/app/services/rewards.service';

@Component({
  selector: 'app-create-rewards-popup',
  templateUrl: './create-rewards-popup.component.html',
  styleUrls: ['./create-rewards-popup.component.scss']
})
export class CreateRewardsPopupComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<CreateRewardsPopupComponent>,
    private rewardsService: RewardsService
  ) { }

  rewardForm:any;

  ngOnInit(): void {
    this.rewardForm = {
      title: "",
			description: "",
      points: 0,
      image: "",
      company_id: sessionStorage.getItem("companyId")
    }
  }

  onClosePopup(resp:any){
    this.dialogRef.close(resp);
  }

  addreward(){
    console.log(this.rewardForm);

    this.rewardsService.addRewards(this.rewardForm).subscribe((response:any) => {
      if(response){
        console.log(response);
        this.onClosePopup("success");
      }
    }, (error) => {
      console.log("Error: ", error);
      this.onClosePopup("error");
    })
  }


}
