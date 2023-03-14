import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { HotToastService } from '@ngneat/hot-toast';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })

  type:any;
  
  constructor(
    private authService: AuthenticationService, 
    private router: Router,
    private toast: HotToastService,
    private activatedRouter: ActivatedRoute,
    private generalService: GeneralService,
    ) { }

  ngOnInit(): void {
    this.type = this.activatedRouter.snapshot.paramMap.get('type');
    console.log(this.type);
    
  }

  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }

  submit() {
    if (!this.loginForm.valid) {
      return;
    }

    const { email, password } = this.loginForm.value;

    // console.log(typeof email);
    this.authService.login(email, password).pipe(
      this.toast.observe({
        success: 'Logged in Succesfully!',
        loading: 'Loggin in...',
        error: 'There was an error'
      })
    ).subscribe(() => {
      this.authService.navigationSubject.next("dashboard");
      this.generalService.navbarLoginSubject.next(true);
      this.router.navigate(['/dashboard']);
      sessionStorage.setItem("type", this.type);
      sessionStorage.setItem("email", <string>email);
    });


  }

  onNavigateToSignUp(){
    this.router.navigate(["sign-up", this.type]);
  }
}
