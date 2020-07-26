import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Photo } from '../../photo/photo';

@Component({
  selector: 'ap-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnChanges {

  @Input() photos: Photo[] = [];
  rows: any[] = [];

  constructor() { }

  /*
  Vamos testar isso implementando if para o caso de haver mudanças especificamente
  na inbound property photos e, caso positivo, executaremos this.groupColumns()
  passando os novos dados das imagens.
  Testamos com photos pois poderemos ter várias propriedades,
  porém apenas uma delas sofrer alteração.
  É necessário testar cada propriedade da inbound property.

  **SimpleChanges**
  Um objeto do tipo SimpleChanges possui uma propriedade de mesmo
  nome da inbound property que sofreu mudança.
  */
  ngOnChanges(changes: SimpleChanges): void {
    if(changes.photos) {
      this.rows = this.groupColumns(this.photos);
    }
  }

  groupColumns(photos: Photo[]) {
    const newRows = [];

    for(let index = 0; index < photos.length; index+=3) {
      newRows.push(photos.slice(index, index + 3));
    }
    return newRows;
  }
}
