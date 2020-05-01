export function throttle(milisegundos = 500) {

  return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {

    const metodoOriginal = descriptor.value;

    let timer = 0;
    // aqui vamos substituir descriptor.value pela lógica do nosso decorator
    descriptor.value = function(...args: any[]) {
      if(event) event.preventDefault();

      clearInterval(timer)
      timer = setTimeout(() => metodoOriginal.apply(this, args), milisegundos);
    }

    return descriptor;
  }
}
