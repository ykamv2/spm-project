import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { switchMap } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { GeneralService } from 'src/app/services/general.service';
import { UserClientService } from 'src/app/services/user-client.service';
import { UsersService } from 'src/app/services/users.service';

export function passwordsMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password && confirmPassword && password !== confirmPassword) {
      return {
        passwordsDontMatch: true,
      };
    }

    return null;
  };
}

interface User {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {

  
  

  signUpForm = new FormGroup(
    {
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
      user: new FormControl(''),
    },
    { validators: passwordsMatchValidator() }
  );

  constructor(
    private authService: AuthenticationService,
    private toast: HotToastService,
    private router: Router,
    private usersService: UsersService,
    private activatedRouter: ActivatedRoute,
    private userClientService: UserClientService,
    private generalService: GeneralService

  ) {}

  type:any;
  userArray:any;
  ngOnInit(): void {
    this.type = this.activatedRouter.snapshot.paramMap.get('type');
    if(this.type == 'user'){
      this.userArray = [
        {value: '0', viewValue: 'Super User'},
        {value: '1', viewValue: 'Manager'},
        {value: '2', viewValue: 'Employee'}
      ];
    }
    else if(this.type == 'client'){
      this.userArray = [
        {value: '3', viewValue: 'Client'}
      ];
    }
    
  }

  
  get name() {
    return this.signUpForm.get('name');
  }

  get email() {
    return this.signUpForm.get('email');
  }

  get password() {
    return this.signUpForm.get('password');
  }
  get user() {
    return this.signUpForm.get('user');
  }

  get confirmPassword() {
    return this.signUpForm.get('confirmPassword');
  }

  submit() {
    if (!this.signUpForm.valid) return console.log("not valid");

    const { name, email, password, user } = this.signUpForm.value;
    this.authService
      .signUp((email == undefined ? '' : email), password!)
      .pipe(
        switchMap(({ user: { uid } }) =>
          this.usersService.addUser({ uid:uid , email:<string>email , displayName: name! , user: user!})
        ),
        this.toast.observe({
          success: 'Congrats! You are all signed up',
          loading: 'Signing in',
          error: ({ message }) => `${message}`,
        })
      )
      .subscribe(() => {
        if(this.type == "user") this.createUser();
        else if(this.type == "client") this.createClient();
        this.router.navigate(['/home']);
        this.generalService.navbarLoginSubject.next(true);

      });
  }

  onNavigateToLogin(){
    this.router.navigate(["login", this.type]);
  }

  createClient(){
    const { name, email, password } = this.signUpForm.value;
    let body:any = {
      email: email,
			name: name,
			password: password,
			company_id: sessionStorage.getItem("companyId"),
    }
    this.userClientService.createClient(body).subscribe((response:any) => {
      if(response) {
        console.log(response);
        this.generalService.openMessageSnackBar("Client Created Successfully", "Ok");
      }
    }, (error:any) => {
      console.log(error);
      this.generalService.openMessageSnackBar("Error", "Ok");
    });

    sessionStorage.setItem("type", "client");
    sessionStorage.setItem("email", <string>email);
  }
  createUser(){
    const { name, email, password, confirmPassword, user } = this.signUpForm.value;
    let body:any = {
      email: email,
			name: name,
			password: password,
			company_id: sessionStorage.getItem("companyId"),
      position: "",
      userType: this.userArray[this.userArray.findIndex((x:any) => x.value == user)].viewValue

    }
    console.log(body);
    
    this.userClientService.createUser(body).subscribe((response:any) => {
      if(response) {
        console.log(response);
        this.generalService.openMessageSnackBar("User Created Successfully", "Ok");
      }
    }, (error:any) => {
      console.log(error);
      this.generalService.openMessageSnackBar("Error", "Ok");
    });

    sessionStorage.setItem("type", "user");
    sessionStorage.setItem("email", <string>email);
  }


}