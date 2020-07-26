import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { PhotoService } from '../photo/photo.service';
import { Photo } from '../photo/photo';

/*
Em photo-list.component.ts, a lista de imagens começa com um array vazia (photos: Photo[] = []),
então, quando o componente é carregado, a lista será considerada no *ngIf e a mensagem será exibida.
Depois, na inicialização ngOnInit(), os dados serão trazidos da API e colocados na propriedade photos,
que então terá dados, fazendo com que a mensagem deixe de ser exibida.

O problema é que a busca destes dados está sendo feita no componente, então,
para que a mensagem não apareça, o ideal é que o componente receba a lista de
imagens pronta antes de navegarmos a ele. Em suma, entraremos na rota e,
antes do componente ser criado e renderizado, resolveremos e disponibilizaremos
os dados de que ele precisa. Deste modo, o componente receberá os dados prontos,
sem precisar buscá-los, e o array de imagens será preenchido.

Podemos resolver este tipo de problema com o Angular, por meio do Resolver,
capaz de lidar com dados durante a navegação de uma rota para disponibilizá-los
a um componente antes deste ser carregado.
*/
@Injectable({ providedIn: 'root'})
export class PhotoListResolver implements Resolve<Observable<Photo[]>>{

  constructor(private photoService: PhotoService) {}

  resolve(route: ActivatedRouteSnapshot, _state: RouterStateSnapshot) {
    const userName = route.params.userName;
    return this.photoService.listFromUserPaginated(userName, 1);
  }
}
