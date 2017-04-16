# Semanário de Visitas - [VERSION](VERSION)

### Conteúdos
- [Semanário de visitas](#weekly-calendar)
    - [Descricao](#descricao)
    - [Pre-Requisitos](#pre-requisitos)
    - [Instalacao](#instalacao)
    - [Modulos](#modulos)
    - [Screen Shots](#screen-shots)
    - [Desenvolvimento](#desenvolvimento)

### Descricao

Web App para ajudar o gerente da equipe da X-Corp a controlar o cronograma
semanal de visitas e ajudar os clientes da empresa a programarem suas visitas.

* Logica/Estilo
  - Eu tenho o costume de codar em arquivos e funções separadas tentando comentar o máximo possível para quem precisar realizar alguma manutenção ou ajustar algo tenha facilidade de se achar e entender o código

* O que poderia ser diferente
  - No momento de selecionar o vendedor já alocado para uma cidade dentro das semanas específicas, poderia ter um verificação de [mesorregiões](https://pt.wikipedia.org/wiki/Lista_de_mesorregi%C3%B5es_do_Rio_Grande_do_Sul) ou quadrantes para o vendedor que for para a região de porto alegre, por exemplo, possa atender as cidades próximas e não apenas uma cidade. Classifico isso como um projeto de melhoria a ser analisado e aplicado.

* Estrutura do projeto
  - config: Configurações de ambiente e rotas do projeto
  - controller: Classes de controle
  - db: Arquivos locais para funcionamento do aplicativo
  - public: Arquivos publicos a serem utilizados nas views
  - routes: As rotas definidas para o aplicativo como get, post, put e por diante
  - validate: Classes de validação de informação e formulários
  - views: Scripts de renderização

### Pre-Requisitos

Ter instalado em sua máquina o [NodeJS](https://nodejs.org/en/)

### Instalacao

Para rodar este web app é necessário baixá-lo em sua máquina
Dentro da pasta onde o projeto foi salvo deve ser rodado o comando abaixo para baixar os módulos pré-definidos no arquivo package.json

> npm install

A porta definida para a aplicação foi 8000

Para iniciar o app rode o seguinte comando estando dentro da pasta do projeto

> node app.js

Com o app rodando basta acessar o app seu [localhost](http://localhost:8000) para ve-lo em funcionamento

### Modulos

Este aplicativo web usa::

* [Express] - Node.js web application framework
* [fs] - Módulo para criação de arquivos
* [ejs] - Renderizador

### Screen Shots

[Screen Shots do Projeto](https://drive.google.com/open?id=0B3Jt1W1SBAv_MHpBcXRIajRzM1E)


### Desenvolvimento

instruções para quem for realizar a manutenção deste projeto ou  ajustar algo

* Siga o padrão e estrutura do projeto
* Tente comentar o máximo possível em questões pertinentes
* Teste antes de commitar seu código
