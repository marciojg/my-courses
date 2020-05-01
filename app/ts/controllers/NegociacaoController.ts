import { Negociacoes, Negociacao, NegociacaoParcial } from "../models/index";
import { NegociacoesView, MensagemView } from "../views/index";
import { domInject, throttle } from "../helpers/decorators/index";
import { NegociacaoService } from "../services/index";
import { imprime } from "../helpers/index";

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

  private _service = new NegociacaoService();

  constructor() {
    this._negociacoesView.update(this._negociacoes);
  }

  @throttle()
  adiciona() {
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

    imprime(negocicacao, this._negociacoes);

    this._negociacoesView.update(this._negociacoes);
    this._mensagemView.update('Negociação cadastrada com sucesso!');
  }

  @throttle()
  async importaDados() {

    try {
      const negociacoesParaImportar = await this._service.obterNegociacoes(
        (res: Response) => {
          if (res.ok) {
            return res;
          } else {
            throw new Error(res.statusText);
          }
        }
      );

      const negociacoesJaImportadas = this._negociacoes.paraArray();

      negociacoesParaImportar
      .filter(negociacao =>
        !negociacoesJaImportadas.some(jaImportada =>
          negociacao.ehIgual(jaImportada)
        )
      )
      .forEach(negociacao => {
        this._negociacoes.adiciona(negociacao);
      })

      this._negociacoesView.update(this._negociacoes);
      this._mensagemView.update('Negociações importadas com sucesso!');

    } catch (error) {
      this._mensagemView.update(error.message);
    }
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
