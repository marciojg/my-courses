import { Component, OnInit } from '@angular/core';
import { OfertasService } from '../ofertas.service';
import { Oferta } from '../shared/oferta.model';
import { Subject, Observable, of } from 'rxjs';
import { switchMap, debounceTime, distinctUntilChanged, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.css'],
  providers: [ OfertasService ]
})
export class TopoComponent implements OnInit {

  public ofertas: Observable<Oferta[]>
  public ofertas2: Oferta[]
  private subjectPesquisa: Subject<string> = new Subject<string>()

  constructor(private ofertasService: OfertasService) { }

  ngOnInit() {
    this.ofertas = this.subjectPesquisa
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        switchMap((termo: string) => {
          console.log('requisição http para a api')

          if(termo.trim() === '') {
            console.log('enttrou no if')
            return of([])
          }

          return this.ofertasService.pesquisaOfertas(termo)
        }),
        catchError((erro: any) => {
          console.log('Erro tratado pelo catch Error', erro)
          return of([])
        })
      )

    this.ofertas.subscribe((ofertas: Oferta[]) => {
      console.log('retornoou aqui maluco', ofertas)
      this.ofertas2 = ofertas
    })
  }

  public pesquisa(termoDaPesquisa: string): void {
    console.log('evento do keyup', termoDaPesquisa)
    this.subjectPesquisa.next(termoDaPesquisa)
  }

}
