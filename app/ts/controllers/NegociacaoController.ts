import { Negociacoes, Negociacao } from "../models/index";
import { NegociacoesView, MensagemView } from "../views/index";
import { logarTempoDeExecucao } from "../helpers/index";

export class NegociacaoController {

  private _inputData: JQuery;
  private _inputQuantidade: JQuery;
  private _inputValor: JQuery;
  private _negociacoes = new Negociacoes();
  private _negociacoesView = new NegociacoesView('#negociacoesView');
  private _mensagemView = new MensagemView('#mensagemView');

  constructor() {
    this._inputData = $('#data');
    this._inputQuantidade = $('#quantidade');
    this._inputValor = $('#valor');
    this._negociacoesView.update(this._negociacoes);
  }

  @logarTempoDeExecucao()
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
