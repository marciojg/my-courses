import { OnInit, Component } from "@angular/core";
import { OfertasService } from '../ofertas.service';
import { Oferta } from '../shared/oferta.model';

@Component({
  selector: 'app-restaurantes',
  templateUrl: './restaurantes.component.html',
  styleUrls: ['./restaurantes.component.css'],
  providers: [OfertasService]
})
export class RestaurantesComponent implements OnInit {

  public restauranteOfertas: Oferta[];

  constructor(private ofertasService: OfertasService) {}

  ngOnInit() {
    this.ofertasService.getOfertasPorCategoria('restaurante')
                       .then((restauranteOfertas: Oferta[]) => {
                         this.restauranteOfertas = restauranteOfertas
                       })

  }

}