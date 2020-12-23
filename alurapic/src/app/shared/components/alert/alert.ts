export class Alert {

  constructor(
    /*
    Propriedade de uma classe pública, porém somente leitura para que não tenhamos que
    escrever métodos acessadores caso fossem privadas
    */
    public readonly alertType: AlertType,
    public readonly message: string
  ) {}
}

export enum AlertType {
  SUCCESS,
  WARNING,
  DANGER,
  INFO
}
