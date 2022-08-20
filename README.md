# GamesLibrary (EpicSteam)

Construção de Biblioteca de videojogos (Website e Fórum)

## Instalação

### Serviço MySQL

- Ter o serviço mysql a correr

### Ficheiro DotEnv

- Associar ao servidor um ficheiro **_.env_** com a seguinte estrutura :

```.env
# Node app environment variables
NODE_ENV=development
PORT=3031
ACCESS_TOKEN_SECRET=
REFRESH_TOKEN_SECRET=

# Database connection environment variables
HOST=localhost   # Optional
USR=root         # Optional
PASSWD=password  # Required
DB=gameslibrary  # Optional
```

- Substituir as credenciais necessárias

#### Criar os Tokens

Recomendação para gerar os tokens:

- Abrir terminal node e executar o comando para cada token

```shell
require('crypto').randomBytes(64).toString('hex')
```

### Executar os comandos npm

- Na pasta "client" e "server" executar o comando `npm start` (em diferentes terminais);
- <mark>Nota:</mark> Se a base de dados for criada a partir do workbench o script de configuração não populará a base de dados.

![Terminal - npm commands](/mockups/Installation.jpg)

## Entidades

- Categorias
- Posts
- Comentarios
- Utilizadores

## Requisitos

- CRUD de categoria de jogos

Para cada categoria:

- Criar posts (Titulo + descricao) - associado a um jogo

Para cada post:

| Requisitos                                    | Autenticacao | Descricao                                      |
| --------------------------------------------- | ------------ | ---------------------------------------------- |
| Sistema de upvoting                           | registado    | estilo stackoverflow - utilizadores registados |
| Dizer se ja jogou o jogo                      | registado    | checkbox ou equivalente                        |
| Visualizar utilizadores que ja jogaram o jogo | nenhum       | popup com a lista                              |
| Comentar o post                               | registado    | sistema igual ao das redes sociais             |

Para cada comentario:

- Reacoes (podem ser representadas por emojis)

Para cada reacacao:

- Contar o numero de reacoes de cada tipo

### Exemplo

```txt
Categoria – MMOs (Massive Multiplayer Online Games)
    Post (videojogo) – World of Warcraft
    Post (videojogo) – RuneScape
    Post (videojogo) - Star Wars: The Old Republic
```

## Gestao dos Utilizadores

- CRUD de utilizadores

| Dados                             | Informacao                                               |
| --------------------------------- | -------------------------------------------------------- |
| `Data de inscricao`               | Tempo a que ja esta registado (data atual - de registo ) |
| `Tipo de utilizador (Permissoes)` | Gestor do forum, gestor de conteudo e visitante          |

## Permissoes

| Role                 | Permissoes                                                                                                     |
| -------------------- | -------------------------------------------------------------------------------------------------------------- |
| `Gestor do forum`    | Gestao de utilizadores </br> Moderação de categorias & comentários </br> Controlo e configuracao da plataforma |
| `Gestor de conteudo` | Criar e moderar os seus posts                                                                                  |
| `Visitante`          | Comentar posts </br> Reagir a posts e comentários </br> Marcar se já jogou o jogo (no post)                    |

## Mini Jogo

Ligar dicas visuais a titulos de jogos. Deve ter um contador de tempo decrescente (tempo a definir)

## Materiais a Incluir

- package.json
- app.json
- pasta www (com ficheiros html, pasta de imagens, pasta de scripts e pasta styles)
- Ficheiros em sql necessarios para a criacao das tabelas
- Insercao de dummy data
- Comentários JSDOC
