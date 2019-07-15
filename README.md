Projeto com base no curso da Udemy - Curso de Desenvolvimento Web com ES6, TypeScript e Angular

Acrescentei no projeto a estrutura de infra com docker e docker-compose com base nesse mano aqui: https://medium.com/joolsoftware/how-to-set-up-an-angular-cli-project-with-docker-compose-a3ec78f179ab


## Comando necessário até a sessão 6

```
cd projects/app1

docker-compose build && docker-compose up -d && docker-compose exec angular bash
```

### Para subir o serviço com http-serve

#### Gerar o build do projeto

```
ng build --prod
```

#### Subir serviço

```
docker-compose exec angular bash

cd dist/app1

http-server
```

