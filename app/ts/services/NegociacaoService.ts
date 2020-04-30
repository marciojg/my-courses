import { NegociacaoParcial, Negociacao } from '../models/index';

export class NegociacaoService {

  obterNegociacoes(handler: HandlerFunction): Promise<void | Negociacao[]> {
      return fetch('http://localhost:8089/dados')
          .then(res => handler(res))
          .then(res => res.json())
          .then((dados: NegociacaoParcial[]) =>
              dados.map(dado => new Negociacao(new Date(), dado.vezes, dado.montante))
          )
          .catch((error: Error) => {
            throw error;
          })

  }
}

export interface HandlerFunction {
  (res: Response): Response;
}
