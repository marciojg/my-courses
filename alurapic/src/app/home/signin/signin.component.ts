import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { PlatformDetectorService } from 'src/app/core/platform-detector/platform-detector.service';

@Component({
  templateUrl: './signin.component.html'
})
export class SignInComponent implements OnInit {
  fromUrl: string;
  loginForm: FormGroup;
  @ViewChild('userNameInput') userNameInput: ElementRef<HTMLInputElement>;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private platformDetectorService: PlatformDetectorService,
    private activatedRoute: ActivatedRoute
    ) {}

  ngOnInit(): void {
    this.activatedRoute
        .queryParams
        .subscribe(params => this.fromUrl = params['fromUrl']);

    this.loginForm = this.formBuilder.group({
      userName: [ null, Validators.required ],
      password: [ null, Validators.required ]
    });

    this.platformDetectorService.isPlatformBrowser() &&
        this.userNameInput.nativeElement.focus();
  }

  login() {
    const { userName, password } = this.loginForm.value

    this.authService.authenticate(userName, password)
        .subscribe(
          () => this.fromUrl
                ? this.router.navigateByUrl(this.fromUrl)
                : this.router.navigate(['user', userName])
          ,
          error => {
            console.log(error);
            this.loginForm.reset();
            this.platformDetectorService.isPlatformBrowser() &&
                this.userNameInput.nativeElement.focus();
            alert('Invalid user name or password');
          }
        )
  }
}
