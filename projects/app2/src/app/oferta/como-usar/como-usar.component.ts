import { OnInit, Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { OfertasService } from 'src/app/ofertas.service';
import { ComoUsar } from 'src/app/shared/como-usar.model';

@Component({
  selector: 'app-como-usar',
  templateUrl: './como-usar.component.html',
  styleUrls: ['./como-usar.component.css'],
  providers: [ OfertasService ]
})
export class ComoUsarComponent implements OnInit {

  public como_usar_descricao: string = ''

  constructor(private route: ActivatedRoute, private ofertasService: OfertasService) {}

  ngOnInit() {
    this.route.parent.params.subscribe((parametro: Params) => {
      this.ofertasService.getComoUsarOfertaPorId(parametro.id)
                         .then((como_usar_descricao: string) => this.como_usar_descricao = como_usar_descricao)
    })

  }
}