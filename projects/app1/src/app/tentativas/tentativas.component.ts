import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Coracao } from '../shared/coracao.model';

@Component({
  selector: 'app-tentativas',
  templateUrl: './tentativas.component.html',
  styleUrls: ['./tentativas.component.css']
})
export class TentativasComponent implements OnInit, OnChanges {

  @Input() public tentativasCoracao: number

  public coracoes: Coracao[] = [
    new Coracao(true), new Coracao(true), new Coracao(true)
  ]

  constructor() {
    console.log(this.coracoes)
  }

  ngOnChanges() {
    if (this.tentativasCoracao !== this.coracoes.length) {
      let indice = this.coracoes.length - this.tentativasCoracao

      this.coracoes[indice - 1].cheio = false
      console.log('tentativasCoracoes iterando: ', this.tentativasCoracao)
    }
  }

  ngOnInit() {
  }

}
