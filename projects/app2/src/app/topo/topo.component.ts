import { Component, OnInit } from '@angular/core';
import { OfertasService } from '../ofertas.service';
import { Oferta } from '../shared/oferta.model';
import { Subject, Observable } from 'rxjs';
import { switchMap, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.css'],
  providers: [ OfertasService ]
})
export class TopoComponent implements OnInit {

  public ofertas: Observable<Oferta[]>
  private subjectPesquisa: Subject<string> = new Subject<string>()

  constructor(private ofertasService: OfertasService) { }

  ngOnInit() {
    this.ofertas = this.subjectPesquisa
      .pipe(
        debounceTime(1000),
        switchMap((termo: string) => {
          return this.ofertasService.pesquisaOfertas(termo)
        })
      )

    this.ofertas.subscribe((ofertas: Oferta[]) => console.log('retornoou aqui maluco', ofertas))
  }

  public pesquisa(termoDaPesquisa: string): void {
    console.log('evento do keyup', termoDaPesquisa)
    this.subjectPesquisa.next(termoDaPesquisa)
  }

}
