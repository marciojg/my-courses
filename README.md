Projeto com base no curso da Udemy - Curso de Desenvolvimento Web com ES6, TypeScript e Angular

## Comando necessário até a sessão 6

```
cd projects/app1

docker-compose build && docker-compose up -d && docker-compose exec angular bash
```

## App2 - Sem Docker - Todos os comandos abaixos devem ser executados dentro de app2

### Na primeira vez deve rodar
```
sudo rm -Rf node_modules/
curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo npm install npm@latest
sudo npm cache verify
sudo npm cache clear --force
sudo npm install
sudo npm install --only=dev
sudo npm install -g json-server
sudo node --version && sudo npm --version && sudo ng version
```

### Abrir terminal e rodar

```
ng serve --host 0.0.0.0 --port 4200
```

### Abrir outro terminal e rodar

```
json-server --watch banco-de-dados.json --port 4000
```
