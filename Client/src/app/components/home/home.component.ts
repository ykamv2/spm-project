import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    setTimeout(function(){
      let b = document.getElementById("login-section") as HTMLElement;
      b.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
    },1500);
  }

  navigateToLogin(type:any){
    this.router.navigate(["login/", type]);
  }

}
