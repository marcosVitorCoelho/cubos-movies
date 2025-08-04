# Cubos Movies

## Desafio técnico web - Processo seletivo da Cubos

Aplicação desenvolvida em ReactJs com Vite, Tailwindcss, Radix Colors, React Hook Form, Zustand e Shadcnui

### Passo a passo para executar o projeto

- Clonar o projeto do repositório do github
- Rodar o comando `npm i` para baixar as dependências necessárias do projeto
- Criar um arquivo de variáveis `.env` na raiz do projeto e colar as seguintes variáveis:
  - VITE_TMDB_TOKEN=""
  - VITE_BASE_API="https://api.themoviedb.org/3"
- O valor da variável `VITE_TMDB_TOKEN` acima citada é sensível e não deve estar disponível publicamente no repositório. Para obtê-la, navegue até [TMDB](https://www.themoviedb.org/) crie gratuitamente uma conta, e em `CONFIGURAÇÕES` -> `API` copie o `Token de Leitura da API` e cole na variável `VITE_TMDB_TOKEN`
- Feito isso, basta rodar o comando `npm run dev` e acessar a URL localhost
