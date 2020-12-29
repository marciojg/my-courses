import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { UserService } from 'src/app/core/user/user.service';
import { AlertService } from 'src/app/shared/components/alert/alert.service';
import { PhotoService } from '../photo/photo.service';

@Component({
  selector: 'ap-photo-form',
  templateUrl: './photo-form.component.html',
  styleUrls: ['./photo-form.component.css']
})
export class PhotoFormComponent implements OnInit {

  photoForm: FormGroup;
  file: File;
  preview: string;
  percentDone = 0;

  constructor(
    private formBuilder: FormBuilder,
    private photoService: PhotoService,
    private router: Router,
    private alertService: AlertService,
    private userService: UserService
    ) { }

  ngOnInit() {
    this.photoForm = this.formBuilder.group({
      file: ['', Validators.required],
      description: ['', Validators.maxLength(300)],
      allowComments: [true]
    })
  }

  upload() {
    const { description, allowComments } = this.photoForm.getRawValue();

    this.photoService
        .upload(description, allowComments, this.file)
        /* dispara o evento dentro do finalize independente do resultado do subscribe (sucesso ou falha) */
        .pipe(finalize(() => {
          this.router.navigate(['/user', this.userService.getUserName()]);
        }))
        .subscribe(
          (event: HttpEvent<any>) => {
            if (event.type == HttpEventType.UploadProgress) {
              this.percentDone = Math.round(100 * event.loaded / event.total);
              // Outra opção é usar event instanceof  HttpResponse
            } else if (event.type == HttpEventType.Response) {
              this.alertService.success('Upload complete', true);
            }
          },
          err => {
            console.log(err);
            this.alertService.danger('Upload error!', true);
          }
        );
  }

  /*
  Criaremos um reader, que será igual a new FileReader(). Lembrando que isso é JavaScript,
  e não Angular. Passaremos para o reader o readAsDataURL(), que por sua vez receberá file.
  Como estamos lidando com uma operação assíncrona, o resultado dela coletaremos com callback.
  Logo, escreveremos reader.onload = event => this.preview = event.target.result, afinal o
  target.result na documentação do FileReader() está especificado que é nele que encontremos
  o resultado de readAsDataURL()
  */
  handleFile(file: File) {
    this.file = file;
    const reader = new FileReader();
    reader.onload = (event: any) => this.preview = event.target.result;
    reader.readAsDataURL(file);
  }
}
