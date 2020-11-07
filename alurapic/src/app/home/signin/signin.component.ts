import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/auth.service';

@Component({
  templateUrl: './signin.component.html'
})
export class SignInComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
    ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      userName: [ null, Validators.required ],
      password: [ null, Validators.required ]
    })
  }

  login() {
    const { userName, password } = this.loginForm.value

    this.authService.authenticate(userName, password).
        subscribe(
          () => console.log('autenticado'),
          error => {
            console.log(error);
            this.loginForm.reset();
            alert('Invalid user name or password');
          }
        )
  }
}
