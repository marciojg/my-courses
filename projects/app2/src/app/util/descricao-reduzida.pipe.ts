import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
	name: 'descricaoReduzida'
})
export class DescricaoReduzida implements PipeTransform {
	transform(texto: string, limiteFim: number): string {
		if (texto.length > limiteFim) {
			return texto.substr(0, limiteFim) + '...'
		}

		return texto
	}
}