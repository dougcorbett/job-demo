import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

import { DataService } from '../../services/data.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;  
  loginInvalid = false;

  constructor(
    private flashMessagesService: FlashMessagesService,
    private router: Router,
    private dataService: DataService,
    public authService: AuthService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {

    this.loginForm = this.fb.group({
      email: ['', [ Validators.required, Validators.minLength(2) ] ],
      password: ['', [ Validators.required, Validators.minLength(2) ] ]
    });
  }

  onSubmit(formValues) {
    if (!this.loginForm.valid) {
      this.flashMessagesService.show('Please fill in all fields', {
        cssClass:'alert-danger', timeout: 4000
      });
      this.router.navigate(['login'])
    } else {
      console.log(formValues);
      this.authService.loginUser(formValues.email, formValues.password).subscribe(
        resp => {
          if (!resp) {
            this.loginInvalid = true;
          } else {
            console.log("success", resp);
            this.router.navigate(['jobs']);
          }
        });
      // .then( (userInfo) => {
      //   console.log("success", userInfo);
      //   this.flashMessagesService.show('Login successful.', {
      //     cssClass:'alert-success', timeout: 4000
      //   });
      //   this.router.navigate(['jobs']);
      // });
    }
  }

}
