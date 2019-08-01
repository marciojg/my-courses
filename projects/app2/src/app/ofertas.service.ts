import { Oferta } from './shared/oferta.model'
import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core';

@Injectable()
export class OfertasService {

  constructor(private http: HttpClient) {}

  public getOfertas(): Promise<Oferta[]> {
    return this.http.get('http://localhost:4000/ofertas?destaque=true')
               .toPromise()
               .then((resposta: any) => resposta)
    // No curso, o parametro resposta precisa ser convertido para json, usando resposta.json()
  }
}