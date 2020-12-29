Compilado do curso:

VERSÕES:

- NODE.JS = 8.9
- ANGULAR CLI = 6.X

* [Angular parte 1: Fundamentos](https://cursos.alura.com.br/course/angular-fundamentos)

  ## Tópicos abordados por capítulo

    - ### Aula 01

      > - Instalação do Angular CLI
      > - Criação de um novo projeto com a ferramenta e como executá-lo
      > - Compreensão da estrutura criada
      > - Data binding através de Angular Expression
      > - Data binding de atributos
      > - Convenções adotadas até o momento

    - ### Aula 02

      > - Como o arquivo bootstrap.css pode ser adicionado ao processo de build do Angular CLI.
      > - Criação de um novo componente
      > - A importância de declarar o componente em um módulo
      > - Como passar dados para o componente através das inbound properties
      > - Criação de um módulo e boas práticas
      > - A diretiva ```*ngFor```

  - ### Aula 03

    > - Consumir uma Web API através do serviço HttpClient
    > - Injeção de dependência e a importância de providers
    > - Isolamento da lógica de acesso à Web API em classe de serviço
    > - Tipagem do retorno da API através de interface e sua vantagem
    > - Componentes possuem ciclo de vida
    > - A fase OnInit

  - ### Aula 04

    > - BrowserModule vs CommonModule
    > - Single Page Application e rotas no lado do navegador
    > - O módulo RouterModule
    > - A diretiva router-outlet como grande lacuna para exibição de outros componentes
    > - Módulo de rotas e definição de rotas
    > - Como lidar com páginas 404
    > - Parametrizando rotas e como obter valores do segmento parametrizado

  - ### Aula 05

    > - Novo componente para listar photos
    > - Adequação dos dados recebidos pelo componente
    > - Quando a fase OnInit não é suficiente
    > - A interface OnChanges, e como interagir com SimpleChanges


  - ### Aula 06

    > - Novo componente para filtrar e paginar fotos
    > - Uso e criação de de Pipe para filtro
    > - Uso de property Binding
    > - Uso de resolvers para trazer pagina com dados carregados
    > - Evitando multiplas requisições para api usando Debounce - RxJs e Subject

  - ### Aula 07

    > - Overview sobre módulos, submódulos, imports, exports, declarations
    > - Integração com Font Awesome
    > - Usando o novo componente de filtro com a funcionalidade de output property
    > - Criar uma diretiva de `darken-on-hover`

* [Angular parte 2: Autenticação, Forms e lazy loading](https://cursos.alura.com.br/course/angular-autenticacao)

  - ### Aula 01

    > - Criação de um componente de login
    > - Validação de formulário
    > - Como componentizar mensagens de validação
    > - Como enviar crendenciais para a API
    > - Como redirecionar e obter referências do template (`ViewChild`)
    > - Descobrindo a plataforma de execução

  - ### Aula 02

    > - Como acessar o header de resposta
    > - Armazenamento de token
    > - A segurança do token
    > - Cabeçalho da nossa aplicação

  - ### Aula 03

    > - Como separar responsabilidades
    > - Qual o papel do BehaviorSubject
      >> - O BehaviorSubject armazena a última emissão até que alguém apareça para consumi-la
    > - Utilização do Async pipe
      >> - Com o Async pipe conseguimos capturar a emissão do Observable diretamente do nosso template
    > - A implementação do logout
      >> - O guarda de rotas serve para darmos consistência para nossa aplicação, liberando acesso apenas para as rotas que fazem sentido para nosso usuário
    > - A diretiva routerLink.
      >> - Evitar recarregamento da página e perca de estado da aplicação

  - ### Aula 04

    > - Criação de um componente de registro
    > - Validação de formulário de registro
    > - Como criar nosso próprio validador
    > - Validando de maneira assíncrona
    > - Submissão de dados

  - ### Aula 05
    > - Rotas filhas
    > - Como buildar o projeto
    > - Lazy loading e code splitting
    > - Interceptadores e envio de token

* [Angular parte 3: upload, build e novos componentes](https://cursos.alura.com.br/course/angular-upload-build)

  - ### Aula 01

    > - Criar rodapé
    > - Criar formulário para upload de fotos com validação
    > - Permitir upload de fotos com preview

  - ### Aula 02

    > - Melhoria no botão de upload
    > - Uso de *ngIf e else
    > - Esconder elemento no DOM
    > - Bloquenado acesso não atententicado

    - ### Aula 03

    > - Uso de rotas parametrizadas
    > - Capturando parãmetro de rotas

  - ### Aula 04

    > - Permitir comentário de fotos
    > - Componetizar o formulário de comentário de fotos
    > - Validar fomrulário de fotos e refresh automatizado da lista de comentários

  - ### Aula 05

    > - Limitar o comentário a somente fotos que possuem esta permissão
    > - Permitir remoção de fotos
    > - Revisando Pipe Async
    > - criando nossos próprios tipos

  - ### Aula 06

    > - Criar componente de notificação
    > - Uso do modificador Readlony
    > - Revisão sobre Subject

  - ### Aula 07

    > - Permitir curtir fotos
    > - Exibir botão de curtir para somente usuários logados
    > - Criando Observables com of
    > - Revisão sobre Rxjs

    - ### Aula 08

    > - Diferenciando ambientes de deploy

Parte 4

Feitos na Alura
