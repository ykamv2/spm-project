import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CommunityService } from 'src/app/services/community.service';
import { GeneralService } from 'src/app/services/general.service';
import { AddCommunityPostPopupComponent } from '../popups/add-community-post-popup/add-community-post-popup.component';
import { ToastComponent } from '../toast/toast.component';
@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.scss']
})
export class CommunityComponent implements OnInit {

  sessionData:any;

  isToast:boolean = false;
  isToast1:boolean = false;
  isToast2:boolean = false;
  // postsData:any;
  announcements:any;
  communityPosts:any;
  commentInput:any;

  // announcements:Array<any> = [
    // {title:"1st announcement", message:"This is the first message", date:new Date(),"id": 1, isShow:true},
    // {title:"2nd announcement", message:"This is the second message", date:new Date(), "id": 2,isShow:true},
    // {title:"3rd announcement", message:"This is the third message", date:new Date(), "id": 3, isShow:true},
    // {title:"1st announcement", message:"This is the first message", date:new Date(),"id": 1, isShow:true},
    // {title:"2nd announcement", message:"This is the second message", date:new Date(), "id": 2,isShow:true},
    // {title:"3rd announcement", message:"This is the third message", date:new Date(), "id": 3, isShow:true},
    // {title:"1st announcement", message:"This is the first message", date:new Date(),"id": 1, isShow:true},
    // {title:"2nd announcement", message:"This is the second message", date:new Date(), "id": 2,isShow:true},
    // {title:"3rd announcement", message:"This is the third message", date:new Date(), "id": 3, isShow:true},
  // ]
  // get toasts(){
  //   return this.announcements.filter(f => f.isShow);
  // }


  constructor(
    private router: Router, 
    private authService: AuthenticationService,
    private communityService : CommunityService,
    private dialog: MatDialog,
    private generalService: GeneralService
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

    this.getAnnouncementPosts(); 
    this.getCommunityPosts(); 

  }

  getAnnouncementPosts(){
    this.communityService.getCommunityPosts(sessionStorage.getItem("companyId"), "announcement").subscribe((response:any) => {
      if(response){
        console.log(response);
        this.announcements = response;
      }
    }, (error:any)=>{
      console.log("Error : ", error);
    })
  }
  getCommunityPosts(){
    this.communityService.getCommunityPosts(sessionStorage.getItem("companyId"), "community").subscribe((response:any) => {
      if(response){
        console.log(response);
        this.communityPosts = response;
        this.communityPosts.forEach((post:any) => {
          post.comment = "";
        });
      }
    }, (error:any)=>{
      console.log("Error : ", error);
    })
  }

  onCreatePost(type:any){
    let dialogRef = this.dialog.open(AddCommunityPostPopupComponent, {
      // height: '60%',
      width: '50%',
      panelClass: "scrollable",
      data: {post_type: type}
    });

    dialogRef.afterClosed().subscribe((response:any) => {
      if(response == "success") {
        this.getAnnouncementPosts();
        this.getCommunityPosts();
      }
      
    });
  }

  postComment(post:any){
    let body:any = {
      post_id : post["_id"],
      user : sessionStorage.getItem("email")?.split("@")[0],
      type : "comment",
      content : post.comment,
    }
    this.communityService.updateCommunityPosts(body).subscribe((response:any) => {
      if(response) {
        console.log(response);
        body.timestamp = new Date().toLocaleString();
        post.comments.push(body);
      }
    }, (error:any) => {
      console.log(error);
    });
    post.comment = "";
  }

  like(post:any){
    let body:any = {
      post_id : post["_id"],
      user : sessionStorage.getItem("email"),
      type : "like",
      content : (post.likes.findIndex((l:any) => l == sessionStorage.getItem("email")) > -1 ? "sub" : "add" ),
    }
    
    if(body.content == "add") {
      post.likes.push(sessionStorage.getItem("email"));
      post.likes_count = post.likes_count + 1;
    }else{
      post.likes = post.likes.filter((el:any) => el != sessionStorage.getItem("email"))
      post.likes_count = post.likes_count - 1;
    }

    this.communityService.updateCommunityPosts(body).subscribe((response:any) => {
      if(response) {
        console.log(response);
      }
    }, (error:any) => {
      console.log(error);
    });
  }

  onAnnouncementDelete(toast:any, i:any){
    let body:any = {
      id : toast["_id"],
      post_type : "announcement"
    }
    this.communityService.removeAnnouncement(body).subscribe((response:any) => {
      if(response) {
        console.log(response);
        this.generalService.openMessageSnackBar("Announcement deleted successfully", "Ok");
        this.announcements.splice(i,1);
      }
    }, (error:any) => {
      console.log(error);
      this.generalService.openMessageSnackBar("Error", "Ok");
    });
  }


} 