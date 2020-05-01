package br.com.moneymoney.system.validation;

import org.springframework.validation.Errors;
import org.springframework.validation.ValidationUtils;
import org.springframework.validation.Validator;

import br.com.moneymoney.system.models.Movimentacao;

public class MovimentacaoValidation implements Validator {

	@Override
	public boolean supports(Class<?> clazz) {
		return Movimentacao.class.isAssignableFrom(clazz);
	}

	@Override
	public void validate(Object target, Errors errors) {
		ValidationUtils.rejectIfEmpty(errors, "nome", "field.required" );
        ValidationUtils.rejectIfEmpty(errors, "valor", "field.required" );
       ValidationUtils.rejectIfEmpty(errors, "recorrente", "field.required" );
     //   ValidationUtils.rejectIfEmpty(errors, "botar ", "field.required" );

        Movimentacao movimentacaoErrors = (Movimentacao) target;
      /*  if(visitante.getAndar() <= 0 || visitante.getAndar() > 16) {
            errors.rejectValue("andar", "field.required");
        } */
        
   //     ValidationUtils.rejectIfEmpty(errors, "setor", "field.required" );
		
	}
	

}
