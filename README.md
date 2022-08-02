# GamesLibrary (EpicSteam)

Construção de Biblioteca de videojogos (Website e Fórum)

## Instalacao

...

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

    Categoria – MMOs (Massive Multiplayer Online Games)
        Post (videojogo) – World of Warcraft
        Post (videojogo) – RuneScape
        Post (videojogo) - Star Wars: The Old Republic

## Gestao dos Utilizadores

- CRUD de utilizadores

| Dados                           | Informacao                                               |
| ------------------------------- | -------------------------------------------------------- |
| Data de inscricao               | Tempo a que ja esta registado (data atual - de registo ) |
| Tipo de utilizador (Permissoes) | Gestor do forum, gestor de conteudo e visitante          |

## Permissoes

| Role                 | Permissoes                                                                                      |
| -------------------- | ----------------------------------------------------------------------------------------------- |
| `Gestor do forum`    | Gestao de utiliadores </br> Moderacao de categorias </br> Controlo e configuracao da plataforma |
| `Gestor de conteudo` | Criar e moderar os seus posts                                                                   |
| `Visitante`          | Comentar e reagir (utilizar os emojis) aos posts                                                |

## Mini Jogo

Ligar dicas visuais a titulos de jogos. Deve ter um contador de tempo decrescente (tempo a definir)

## Materiais a Incluir

- package.json
- app.json
- pasta www (com ficheiros html, pasta de imagens, pasta de scripts e pasta styles)
- Ficheiros em sql necessarios para a criacao das tabelas
- Insercao de dummy data
- COmentarios JSDOC
