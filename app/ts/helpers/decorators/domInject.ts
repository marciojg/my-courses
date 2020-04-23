export function domInject(seletor: string) {

  return function(target: any, key: string) {

    let elemento: JQuery;

    const getter = function() {
      if (!elemento) {
        console.log(`Capturando elemento ${seletor} e definindo na propriedade ${key}`);
        elemento = $(seletor);
      }

      return elemento;
    }

    Object.defineProperty(target, key, {
      get: getter
    });
  }
}
