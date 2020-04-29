import { Negociacao } from "./Negociacao";
import { Imprimivel } from "./Imprimivel";

export class Negociacoes implements Imprimivel {

  private _negociacoes: Negociacao[] = [];

  adiciona(negociacao: Negociacao): void {
    this._negociacoes.push(negociacao);
  }

  paraArray(): Negociacao[] {
    return ([] as Negociacao[]).concat(this._negociacoes);
  }

  paraTexto(): void {
    console.log('Impressão de Negociações');
    console.log(JSON.stringify(this.paraArray()));
  }
}
