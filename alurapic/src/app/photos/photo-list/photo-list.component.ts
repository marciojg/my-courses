import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { Photo } from '../photo/photo';
import { PhotoService } from '../photo/photo.service';

@Component({
  selector: 'ap-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css']
})
export class PhotoListComponent implements OnInit, OnDestroy {

  photoList: Photo[] = [];
  filter: string = '';
  debounce: Subject<string> = new Subject<string>();
  hasMore: boolean = true;
  currentPage: number = 1;
  userName: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private photoService: PhotoService
  ) { }

  ngOnInit(): void {
    this.userName = this.activatedRoute.snapshot.params.userName;
    this.photoList = this.activatedRoute.snapshot.data.photoList;

    /*
    Por meio de next(), é possível emitirmos um valor para Subject,
    que acessamos caso o tenhamos inscrito. Diferentemente do Observable, com o qual podemos inscrever e obter valores,
    com o Subject podemos, além disso, emitir um valor e escutá-lo.
    A grande sacada é que, com esta alteração chamada de Lettable operators no RxJS,
    por usarmos o debounceTime, quando emitimos um valor no evento keyup,
    todas as emissões serão ignoradas, sendo consideradas após 300ms.
    E é isso que será repassado ao subscribe().
    O Observable é engenhoso para lidar com situações deste tipo, com fluxos e eventos,
    e colocamos threshold, um Pipe no que chamamos de debounce,
    para limitar a quantidade de operações.
     */
    this.debounce
    .pipe(debounceTime(300))
    .subscribe(filter => this.filter = filter);
  }

  ngOnDestroy(): void {
    /* Como a inscrição não tem "fim", ou seja, não pode ser concluída é necessário desinscrever quando o componente é destruido, ou seja, o usuário sai da página e não precisa mais do filtro ativo. */
    this.debounce.unsubscribe();
  }

  load() {
    this.photoService
        .listFromUserPaginated(this.userName, ++this.currentPage)
        .subscribe(photos => {
            this.photoList = this.photoList.concat(photos)
            if(!photos.length) this.hasMore = false;
        });
  }
}
