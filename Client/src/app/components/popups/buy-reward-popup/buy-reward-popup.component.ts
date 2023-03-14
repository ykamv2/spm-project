import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { response } from 'express';
import { GeneralService } from 'src/app/services/general.service';
import { RewardsService } from 'src/app/services/rewards.service';

@Component({
  selector: 'app-buy-reward-popup',
  templateUrl: './buy-reward-popup.component.html',
  styleUrls: ['./buy-reward-popup.component.scss']
})
export class BuyRewardPopupComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef : MatDialogRef<BuyRewardPopupComponent>,
    private rewardsService:RewardsService,
    private generalService: GeneralService,
  ) { }

  // userData:any;

  ngOnInit(): void {
    // this.userData = this.data.userData;
    this.data = this.data.data;
    
  }

  onClosePopup(response?:any){
    this.dialogRef.close(response);
  }

  redeemRewards(){
    var body:any = {
      user: sessionStorage.getItem("email"),
      reward_id: this.data["_id"],
      points: parseInt(this.data["points"]),   
    }
    // console.log(body);

    this.rewardsService.redeemReward(body).subscribe((response:any) => {
      if(response){
        console.log(response);
        this.generalService.openMessageSnackBar("Reward Redeemed Successfully", "Ok");
        this.onClosePopup("success")
      }
    }, (error:any) => {
      console.log(error);
      this.generalService.openMessageSnackBar("Error", "Ok");
      this.onClosePopup("error")

    })
    
  }

}
