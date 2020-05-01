import { OnInit, Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { OfertasService } from '../ofertas.service';
import { Oferta } from '../shared/oferta.model';

@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.css'],
  providers: [ OfertasService ]
})
export class OfertaComponent implements OnInit {

  public oferta: Oferta

  constructor(private route: ActivatedRoute, private ofertasService: OfertasService) {}

  ngOnInit() {

    this.route.params.subscribe((parametro: Params) => {
      this.ofertasService.getOfertaPorId(parametro.id)
                         .then((oferta: Oferta) => this.oferta = oferta)
    })

  }
}