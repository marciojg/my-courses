import { OnInit, Component } from '@angular/core';
import { OfertasService } from '../ofertas.service';
import { Oferta } from '../shared/oferta.model';

@Component({
  selector: 'app-diversao',
  templateUrl: './diversao.component.html',
  styleUrls: ['./diversao.component.css'],
  providers: [OfertasService]
})
export class DiversaoComponent implements OnInit {

  public diversoesOferta: any[];

  constructor(private ofertasService: OfertasService) {}

  ngOnInit() {
    this.ofertasService.getOfertasPorCategoria('diversao')
                       .then((diversoesOferta: Oferta[]) => this.diversoesOferta = diversoesOferta)
  }

}