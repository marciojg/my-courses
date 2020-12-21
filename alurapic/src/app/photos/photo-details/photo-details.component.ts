import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Photo } from '../photo/photo';
import { PhotoService } from '../photo/photo.service';

@Component({
  templateUrl: './photo-details.component.html',
  styleUrls: ['photo-details.component.css']
})
export class PhotoDetailsComponent implements OnInit {

  photo$: Observable<Photo>;
  photoId: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private photoService: PhotoService
  ) {}

  ngOnInit(): void {
    this.photoId = this.activatedRoute.snapshot.params.photoId;
    this.photo$ = this.photoService.findById(this.photoId)
  }
}
