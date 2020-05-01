import { OnInit, Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { OfertasService } from 'src/app/ofertas.service';

@Component({
  selector: 'app-onde-fica',
  templateUrl: './onde-fica.component.html',
  styleUrls: ['./onde-fica.component.css'],
  providers: [ OfertasService ]
})
export class OndeFicaComponent implements OnInit {

  public onde_fica_descricao: string = ''

  constructor(private route: ActivatedRoute, private ofertasService: OfertasService) {}

  ngOnInit() {
    this.route.parent.params.subscribe((parametro: Params) => {
      this.ofertasService.getOndeFicaOfertaPorId(parametro.id)
                         .then((onde_fica_descricao: string) => {
                           this.onde_fica_descricao = onde_fica_descricao
                         })
    })

  }
}