import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, switchMap } from 'rxjs/operators';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    // o momento em que a rota efetivamente chegou ao seu fim e o título do componente será mudado.
    this.router.events
        /*
        A partir de filter coletaremos event, e estipularemos que só será encadeado ao pipe()
        o resultado true, isto é, caso seja uma instância de NavigationEnd
        */
        .pipe(filter(event => event instanceof NavigationEnd))
        /*
        É neste ponto que queremos ter acesso ao conteúdo do activatedRoute. Para melhorar
        a legibilidade do código, inseriremos em pipe() um map(), em que retornaremos
        this.activatedRoute, e em seguida vamos tratá-lo na próxima chamada encadeada chamando-o de route.
        Teremos de subir na hierarquia de rotas para coletar a que está sendo executada.
        Para tanto, escreveremos while(rout.firstChild) route = route.firstChild e no final retornaremos route.
        */
        .pipe(map(() => this.activatedRoute))
        .pipe(map(route => {
          while(route.firstChild) route = route.firstChild;
          return route;
        }))
        /*
        Uma vez que a rota correta estiver sido capturada, iremos extrair o título.
        Se escrevermos route.data, teremos acesso à informação que está na rota,
        mas trata-se de um observable, então precisamos realizar a inscrição.
        Usaremos o já conhecido switchMap() via pipe() da route.data.
        */
        .pipe(switchMap(route => route.data))
        .subscribe(event => this.titleService.setTitle(event.title));
  }
}
