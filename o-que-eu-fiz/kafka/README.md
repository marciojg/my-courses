Em todos os sistemas operacionais é necessário abrir o programa para editar o *hosts* como Administrator da máquina ou root.

Execute o comando:

```
docker-compose up
```

Espere um pouco antes de testar o Control Center no endereço: `http://localhost:9021`.

Configure um client no painel de developers do Twitter: [https://developer.twitter.com/en](https://developer.twitter.com/en), antes de criar um connector do Twitter no painel do Kafka Connect.

Crie o connector do Twitter, depois o do MongoDB (necessário iniciar o serviço do MongoDB do `docker-compose.yaml` do Nest.js).
