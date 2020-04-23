export function logarTempoDeExecucao(emSegundos: boolean = false) {

  return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {

    const metodoOriginal = descriptor.value;

    // aqui vamos substituir descriptor.value pela lógica do nosso decorator
    descriptor.value = function(...args: any[]) {

      let divisor = 1;
      let unidade = 'milisegundos'
      if(emSegundos) {
          divisor = 1000;
          unidade = 'segundos';
      }

      console.log('-----------------------')
      console.log(`Parâmetros do método ${propertyKey}: ${JSON.stringify(args)}`);
      const t1 = performance.now();

      const resultadoMetodoOriginal = metodoOriginal.apply(this, args);

      console.log(`Resultado do método: ${JSON.stringify(resultadoMetodoOriginal)}` )
      const t2 = performance.now();
      console.log(`${propertyKey} demorou ${(t2 - t1)/divisor} ${unidade}`);
      console.log('-----------------------')

      return resultadoMetodoOriginal;
    }

    return descriptor;
  }
}
