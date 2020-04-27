import { Negociacoes, Negociacao, NegociacaoParcial } from "../models/index";
import { NegociacoesView, MensagemView } from "../views/index";
import { domInject } from "../helpers/decorators/index";

export class NegociacaoController {

  @domInject('#data')
  private _inputData: JQuery;

  @domInject('#quantidade')
  private _inputQuantidade: JQuery;

  @domInject('#valor')
  private _inputValor: JQuery;

  private _negociacoes = new Negociacoes();
  private _negociacoesView = new NegociacoesView('#negociacoesView');
  private _mensagemView = new MensagemView('#mensagemView');

  constructor() {
    this._negociacoesView.update(this._negociacoes);
  }

  adiciona(event: Event) {
    event.preventDefault();

    const date = new Date(this._inputData.val().replace(/-/g, ','));

    if (!this._ehDiaUtil(date)) {
      this._mensagemView.update('Negociações somente nos dias úteis');
      return
    }

    const negocicacao = new Negociacao(
      date,
      parseInt(this._inputQuantidade.val()),
      parseFloat(this._inputValor.val())
    );

    this._negociacoes.adiciona(negocicacao);
    this._negociacoesView.update(this._negociacoes);
    this._mensagemView.update('Negociação cadastrada com sucesso!');
  }

  importaDados() {

    function isOk(res: Response) {
      if (res.ok) {
        return res;
      } else {
        throw new Error(res.statusText);
      }
    }

    fetch('http://localhost:8080/dados')
    .then(res => isOk(res))
    .then(res => res.json())
    .then((dados: NegociacaoParcial[]) => {
      dados.map(dado => new Negociacao(new Date(), dado.vezes, dado.montante))
      .forEach(negociacao => {
        this._negociacoes.adiciona(negociacao);
      });

      this._negociacoesView.update(this._negociacoes);
      this._mensagemView.update('Negociações importadas com sucesso!');
    })
    .catch(err => console.log(err.message));
  }

  private _ehDiaUtil(date: Date): boolean {
    return date.getDay() != DiaDaSemana.Sabado && date.getDay() != DiaDaSemana.Domingo;
  }
}

enum DiaDaSemana {
  Domingo,
  Segunda,
  Terca,
  Quarta,
  Quinta,
  Sexta,
  Sabado
}
