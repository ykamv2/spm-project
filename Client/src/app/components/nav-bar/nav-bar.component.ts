import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { HotToastService } from '@ngneat/hot-toast';
import { AsyncPipe } from '@angular/common';
import { GeneralService } from 'src/app/services/general.service';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  sessionData:any = {};
 
  user$ = this.authService.currentUser$;
  navbarBoolean:any = false;
  user_name:any = "Pushpit Jain"
  activeTab:any = "home";
  tabs = ["home","dashboard", "chat", "community", "training", "rewards"]

  constructor(
    private router: Router, public authService: AuthenticationService,private toast: HotToastService,
    private generalService: GeneralService
  ) { }

  isLoggedInBoolean:any;

  ngOnInit(): void {
    this.isLoggedInBoolean = sessionStorage.getItem("email") != null;
    
    this.generalService.navbarLoginSubject.subscribe((res:any) => {
      this.isLoggedInBoolean = res;
    });
    this.generalService.IAMSubject.subscribe((res:any) => {
      this.sessionData = this.generalService.getSessionData();
    });
    this.sessionData = this.generalService.getSessionData();



        // this.navbarBoolean = (window.location.href.split("/").pop() == "home" || window.location.href.split("/").pop() == "login") ;
    this.showTab(window.location.href)
    this.user$.subscribe((res:any) => {
      if(res) {
        console.log(res);
    // debugger
      }
    })
    

    this.authService.navigationSubject.subscribe((data:any) => {
      this.changeTab(data)
    })
  }

  

  showTab(locn:any){
    let currTab:any = "";
    for(let i=0; i<this.tabs.length; i++){
      let j = locn.indexOf(this.tabs[i]);
      if (j>-1){
        currTab = this.tabs[i]; break;
      }else currTab="home";
    }
    switch(currTab){
      case currTab: this.activeTab = currTab; break;
      default: this.activeTab = "home"; break;
    }
  }

  changeTab(tab:any){
    this.activeTab = tab;
    // this.navbarBoolean = (window.location.href.split("/").pop() == "home" || window.location.href.split("/").pop() == "login") ;
  }

  logout(){
    this.authService.logout().pipe(
      this.toast.observe({
        success: 'Logged out Succesfully!',
        loading: 'Loggin out...',
        error: 'There was an error'
      })
    ).subscribe(() => {
      this.router.navigate(['/home']);
      sessionStorage.removeItem("email");
      sessionStorage.removeItem("type");
      sessionStorage.removeItem("companyId");
      sessionStorage.removeItem("user_type");
      this.generalService.navbarLoginSubject.next(false);
      
    });
  }

}
