import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { debounceTime, first, map, switchMap } from 'rxjs/operators';
import { SignUpService } from './signup.service';

/* Validadores assíncronos geralmente dependem da integração com um service para buscar no backend
alguma informação. Mas uma função validadora, ou seja, um validador não aceita injeção dependência.
Por isso nestes casos é criado um Validador/Serviço que é um serviço que tem um método que retorna uma
função de validação*/
@Injectable({ providedIn: 'root' })
export class UserNotTakenValidatorService {

	constructor(private signUpService: SignUpService) {}

	// Função que retorna uma função validadora
	checkUserNameTaken() {
		// Função validadora
		return (control: AbstractControl) => {
				// Retorno da validação igual uma validação síncrona que é um objeto com o erro de validação ou nulo
				return control
						.valueChanges // retorna um observable de cada valor digitado pelo usuário
						.pipe(debounceTime(300)) // aguardar 300 ms antes de bater no backend
						.pipe(
							/*
							Utilizamos o switchMap() pois primeiro pegamos a emissão do Observable, após o qual temos
							que retornar a emissão do Observable de checkUserNameTaken().
							Para não obtermos as duas emissões concomitantemente, exigiremos que o fluxo anterior
							seja pausado e trocado para o fluxo de verificação do username.
							Este processo é repetido toda vez que é feita uma nova digitação no campo de input.
							 */
							switchMap(userName =>
								// retorna true ou false
								this.signUpService.checkUserNameTaken(userName)
						))
						.pipe(
							/*
							O resultado disso será "verdadeiro" ou "falso", que precisarão se tornar "nulo" ou
							objeto JavaScript, havendo a falha da validação. Então, pediremos ajuda a outro operador
							do rxjs, o map. Pode-se notar que estes retornos se assemelham aos do nosso lowerCase,
							acessado no template.
							*/
							map(isTaken => isTaken ? { userNameTaken: true } : null))
						.pipe(
							/*
							No entanto, não poderemos deixar o código da maneira em que está, pois quando há o
							retorno do Observable com o sistema de validação assíncrona do Angular, este fará o
							subscribe mas, para acessar o valor para tal, o processo todo precisa indicar quando
							for concluído, o que não ocorre em momento algum.

							Assim, é necessário importarmos o operador first, com que será informada a sua conclusão
							logo após o primeiro valor emitido, forçando um complete, considerando que cada
							emissão tenha 300ms de duração.
							*/
							first());
		}
	}
}
