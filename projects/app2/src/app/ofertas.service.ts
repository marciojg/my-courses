import { Oferta } from './shared/oferta.model'
import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { API_URL_OFERTAS, API_URL_COMO_USAR, API_URL_ONDE_FICA } from './app.api';

@Injectable()
export class OfertasService {

  constructor(private http: HttpClient) {}

  public getOfertas(): Promise<Oferta[]> {
    return this.http.get(`${API_URL_OFERTAS}?destaque=true`)
               .toPromise()
               .then((resposta: any) => resposta)
    // No curso, o parametro resposta precisa ser convertido para json, usando resposta.json()
  }

  public getOfertasPorCategoria(categoria: string): Promise<Oferta[]> {
    return this.http.get(`${API_URL_OFERTAS}?categoria=${categoria}`)
               .toPromise()
               .then((resposta: any) => resposta)
  }

  public getOfertaPorId(id: number): Promise<Oferta> {
    return this.http.get(`${API_URL_OFERTAS}?id=${id}`)
               .toPromise()
               .then((resposta: any) => resposta[0])
  }

  public getComoUsarOfertaPorId(id: number): Promise<string> {
    return this.http.get(`${API_URL_COMO_USAR}?id=${id}`)
               .toPromise()
               .then((resposta: any) => resposta[0].descricao)
  }

  public getOndeFicaOfertaPorId(id: number): Promise<string> {
    return this.http.get(`${API_URL_ONDE_FICA}?id=${id}`)
               .toPromise()
               .then((resposta: any) => resposta[0].descricao)
  }
}