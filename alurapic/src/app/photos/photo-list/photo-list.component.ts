import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Photo } from '../photo/photo';
import { PhotoService } from '../photo/photo.service';


@Component({
  selector: 'ap-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css']
})
export class PhotoListComponent implements OnInit {

  photoList: Photo[] = [];
  filter: string = '';
  hasMore: boolean = true;
  currentPage: number = 1;
  userName: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private photoService: PhotoService
  ) { }

  ngOnInit(): void {
    /*
    Se inscrever nos parâmetros de rota, e toda a vez que ele mudar - mesmo que o componente tenha
    sido carregado - uma ação será executada
    */
    this.activatedRoute.params.subscribe(params => {
      this.userName = params.userName;
      this.photoList = this.activatedRoute.snapshot.data['photoList'];
    });
  }

  load() {
    this.photoService
        .listFromUserPaginated(this.userName, ++this.currentPage)
        .subscribe(photos => {
            this.filter = '';
            this.photoList = this.photoList.concat(photos)
            if(!photos.length) this.hasMore = false;
        });
  }
}
