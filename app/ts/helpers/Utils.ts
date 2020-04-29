import { Imprimivel } from "../models/index";

export function imprime(...objects: Imprimivel[]) {
  objects.forEach(object => object.paraTexto());
}
