import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { GeneralService } from 'src/app/services/general.service';
import { RewardsService } from 'src/app/services/rewards.service';
import { UserClientService } from 'src/app/services/user-client.service';
import { BuyRewardPopupComponent } from '../popups/buy-reward-popup/buy-reward-popup.component';
import { CreateRewardsPopupComponent } from '../popups/create-rewards-popup/create-rewards-popup.component';

@Component({
  selector: 'app-reward',
  templateUrl: './reward.component.html',
  styleUrls: ['./reward.component.scss']
})
export class RewardComponent implements OnInit {

 
  sessionData:any;
  rewardsList:any = [];
  currBalance:any = 2000;
  userData:any;

  constructor(
    private router: Router,
    private authService : AuthenticationService,
    private rewardsService : RewardsService,
    private dialog: MatDialog,
    private generalService: GeneralService,
    private userClientService: UserClientService
  ) {
    // Function to throw unsigned user out
    this.authService.currentUser$.subscribe((user:any) => {
      if(user){
        // console.log(user);
      }else{
        this.router.navigate(["home"]);
        this.authService.navigationSubject.next("home");
      }
    })
  }

  ngOnInit(): void {
    this.sessionData = this.generalService.getSessionData();
    
    if(sessionStorage.getItem("email"))
    {
      this.getUserData(sessionStorage.getItem("email"));
    }
    if(sessionStorage.getItem("companyId")){
      this.getRewards();
    }
  }

  openBuyRewardPopup(item:any){
    let dialogRef = this.dialog.open(BuyRewardPopupComponent, {
      // height: '72%',
      maxHeight: "70%",
      width: '70%',
      data: {data:item},
      panelClass: "scrollable"
    });
    dialogRef.afterClosed().subscribe((response:any) => {
      if(response == "success"){
        this.getUserData(this.sessionData.email)
      }
    })
  }

  getRewards(){
    this.rewardsService.getRewards(sessionStorage.getItem("companyId")).subscribe((response:any) => {
      if(response){
        console.log("Rewards: ", response);
        this.rewardsList = response;
      }
    })
  }

  getUserData(email:any){
    this.userClientService.getUserData(email).subscribe((response:any) => {
      if(response){
        console.log("User data: ", response);
        this.userData = response[0];
      }
    }, (error:any)=>{
      console.log("Error : ", error);
    })
  }

  onAddReward(){
    let dialogRef = this.dialog.open(CreateRewardsPopupComponent, {
      height: '60%',
      width: '50%',
      panelClass: "scrollable"
    });

    dialogRef.afterClosed().subscribe(response => {
      if(response == "error") this.generalService.openMessageSnackBar("Error", "ok");
      else if(response == "success"){
        this.generalService.openMessageSnackBar("Reward Added", "ok");
        this.getRewards();
      }
    });
  }

  

}
