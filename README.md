# Tickets App — Vue 3 + Vite + Vuetify

Uma aplicação SPA para abertura, listagem e detalhamento de tickets, com autenticação via JWT e rotas protegidas. Projeto focado em simplicidade, acessibilidade e DX (Developer Experience).

- UI com Vuetify 3 e Material Design Icons.
- Estado global com Pinia.
- Roteamento com Vue Router (público + protegido com guarda).
- Consumo de API via Axios com header de autenticação customizado.

---

## Sumário

- [Demonstração rápida](#demonstração-rápida)
- [Requisitos](#requisitos)
- [Instalação e Execução](#instalação-e-execução)
- [Scripts](#scripts)
- [Estrutura de Pastas](#estrutura-de-pastas)
- [Stack e Versões](#stack-e-versões)
- [Rotas do Frontend](#rotas-do-frontend)
- [Configuração da API](#configuração-da-api)
- [Autenticação](#autenticação)
- [Documentação da API (Endpoints)](#documentação-da-api-endpoints)
  - [/usuarios — Registrar](#post-usuarios)
  - [/login — Autenticar](#post-login)
  - [/tickets — Listar](#get-tickets)
  - [/tickets — Criar](#post-tickets)
  - [/tickets/:id — Detalhar](#get-ticketsid)
- [Troubleshooting](#troubleshooting)
- [Roadmap curto](#roadmap-curto)
- [Licença](#licença)

---

## Demonstração rápida

1) Instale dependências:
```bash
npm i
```

2) Rode em desenvolvimento:
```bash
npm run dev
```

3) Acesse no navegador:
- Frontend: http://localhost:5173/
- API esperada: http://localhost:8080/ (vide [Configuração da API](#configuração-da-api))

---

## Requisitos

- Node.js >= 18
- npm >= 9 (ou compatível)
- API backend disponível em http://localhost:8080 (ajustável)

---

## Instalação e Execução

```bash
# na pasta tickets-vue
npm i
npm run dev
```

Build de produção:
```bash
npm run build
npm run preview
```

Type-check:
```bash
npm run type-check
```

---

## Scripts

- `npm run dev`: Vite em modo desenvolvimento (porta 5173).
- `npm run build`: Type-check + build de produção (Vite).
- `npm run preview`: Servidor estático para pré-visualizar o build.
- `npm run type-check`: Checagem de tipos com vue-tsc.

---

## Estrutura de Pastas

```
tickets-vue/
├─ src/
│  ├─ api/
│  │  ├─ auth.ts             # Chamadas de autenticação
│  │  └─ tickets.ts          # Chamadas de tickets
│  ├─ components/
│  │  └─ AppHeader.vue       # Cabeçalho com navegação e ações do usuário
│  ├─ plugins/
│  │  ├─ axios.ts            # Instância Axios + interceptor de auth
│  │  └─ vuetify.ts          # Configuração de tema e ícones
│  ├─ router/
│  │  └─ index.ts            # Rotas + guarda de navegação
│  ├─ stores/
│  │  └─ auth.ts             # Pinia: token e email
│  ├─ views/
│  │  ├─ LoginView.vue
│  │  ├─ RegisterView.vue
│  │  ├─ TicketsListView.vue
│  │  ├─ TicketCreateView.vue
│  │  └─ TicketDetailView.vue
│  ├─ App.vue                # Layout base (v-app / router-view)
│  ├─ env.d.ts
│  └─ main.ts                # Bootstrap do app
├─ index.html
├─ package.json
├─ tsconfig.json
├─ tsconfig.app.json
├─ tsconfig.node.json
└─ vite.config.ts
```

---

## Stack e Versões

Produção:
- Vue: ^3.5.12
- Vue Router: ^4.4.5
- Pinia: ^2.2.6
- Axios: ^1.7.7
- Vuetify: ^3.7.1
- @mdi/font (Material Design Icons): ^7.4.47

Desenvolvimento:
- Vite: ^5.4.10
- @vitejs/plugin-vue: ^5.1.4
- vite-plugin-vuetify: ^2.0.4
- TypeScript: ^5.6.2
- vue-tsc: ^2.1.6
- sass: ^1.81.0
- @types/node: ^22.7.7

Ambiente recomendado:
- Node.js >= 18

---

## Rotas do Frontend

- `/login` — público
- `/register` — público
- `/tickets` — protegido (requer token)
- `/tickets/create` — protegido (requer token)
- `/tickets/:id` — protegido (requer token)

A guarda de navegação redireciona para `/login` se o usuário não estiver autenticado e preserva a rota pretendida via `?redirect=`.

---

## Configuração da API

- Base URL definida em `src/plugins/axios.ts`:
```ts
export const api = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 15000
})
```

- Para alterar, edite `baseURL` conforme seu ambiente (ex.: variável de ambiente, reverse proxy, etc).

---

## Autenticação

- Token JWT é armazenado no `localStorage` como `auth_token`.
- E-mail do usuário é armazenado em `localStorage` como `auth_email`.
- Interceptor Axios envia automaticamente o cabeçalho:
  - `authentication: Bearer <token>`
- O backend deve validar esse header customizado.

---

## Documentação da API (Endpoints)

A API espera/retorna JSON. O cabeçalho `Content-Type: application/json` deve ser enviado em requisições com corpo.

Campo de autenticação:
- Header: `authentication: Bearer <token>`

Tipos utilizados pelo frontend:

```ts
// Login
interface LoginPayload { email: string; senha: string }
interface LoginResponse { token: string }

// Registro
interface RegisterPayload { nome: string; email: string; senha: string }

// Tickets
interface CreateTicketPayload { titulo: string; descricao: string }

interface TicketItem {
  id: number
  titulo: string
  status: string
  nomeSolicitante: string
  dataAbertura: string
}

interface TicketDetail {
  id: number
  titulo: string
  descricao: string
  status: string
  nomeSolicitante: string
  nomeAgente: string | null
  dataAbertura: string
  dataUltimaAtualizacao: string
  dataFechamento: string | null
}
```

### POST /usuarios
Cria um novo usuário.

- URL: `POST http://localhost:8080/usuarios`
- Body:
```json
{
  "nome": "Maria Silva",
  "email": "maria@exemplo.com",
  "senha": "segredo123"
}
```
- Respostas:
  - 201 Created — usuário criado
  - 400/409 — validações ou conflito de e-mail

Exemplo cURL:
```bash
curl -X POST http://localhost:8080/usuarios \
  -H "Content-Type: application/json" \
  -d '{"nome":"Maria Silva","email":"maria@exemplo.com","senha":"segredo123"}'
```

### POST /login
Autentica e retorna o token JWT.

- URL: `POST http://localhost:8080/login`
- Body:
```json
{
  "email": "maria@exemplo.com",
  "senha": "segredo123"
}
```
- Resposta (200 OK):
```json
{ "token": "JWT_AQUI" }
```
- Erros: 401 Unauthorized (credenciais inválidas)

Exemplo cURL:
```bash
curl -X POST http://localhost:8080/login \
  -H "Content-Type: application/json" \
  -d '{"email":"maria@exemplo.com","senha":"segredo123"}'
```

### GET /tickets
Lista os tickets do usuário autenticado.

- URL: `GET http://localhost:8080/tickets`
- Headers:
  - `authentication: Bearer JWT_AQUI`
- Resposta (200 OK):
```json
[
  {
    "id": 1,
    "titulo": "Erro no login",
    "status": "ABERTO",
    "nomeSolicitante": "Maria Silva",
    "dataAbertura": "2025-09-28T12:34:56Z"
  }
]
```
- Erros: 401 (sem token), 403 (token inválido/expirado)

Exemplo cURL:
```bash
curl http://localhost:8080/tickets \
  -H "authentication: Bearer JWT_AQUI"
```

### POST /tickets
Cria um novo ticket.

- URL: `POST http://localhost:8080/tickets`
- Headers:
  - `Content-Type: application/json`
  - `authentication: Bearer JWT_AQUI`
- Body:
```json
{
  "titulo": "Problema no checkout",
  "descricao": "Ao finalizar a compra, recebo erro 500."
}
```
- Resposta (201 Created ou 200 OK): `TicketDetail`

Exemplo cURL:
```bash
curl -X POST http://localhost:8080/tickets \
  -H "Content-Type: application/json" \
  -H "authentication: Bearer JWT_AQUI" \
  -d '{"titulo":"Problema no checkout","descricao":"Ao finalizar a compra, recebo erro 500."}'
```

### GET /tickets/:id
Retorna detalhes de um ticket específico.

- URL: `GET http://localhost:8080/tickets/1`
- Headers:
  - `authentication: Bearer JWT_AQUI`
- Resposta (200 OK):
```json
{
  "id": 1,
  "titulo": "Problema no checkout",
  "descricao": "Ao finalizar a compra, recebo erro 500.",
  "status": "ANDAMENTO",
  "nomeSolicitante": "Maria Silva",
  "nomeAgente": "Atendente 1",
  "dataAbertura": "2025-09-20T10:00:00Z",
  "dataUltimaAtualizacao": "2025-09-28T12:40:00Z",
  "dataFechamento": null
}
```
- Erros: 404 Not Found (id inexistente), 401/403 (auth)

Exemplo cURL:
```bash
curl http://localhost:8080/tickets/1 \
  -H "authentication: Bearer JWT_AQUI"
```

---

## Troubleshooting

- **CORS**: Se o navegador bloquear requisições, habilite CORS no backend para `http://localhost:5173`.
- **Header de auth**: O backend deve ler `authentication: Bearer <token>` (nome de header customizado).
- **401/403**: Faça login novamente e confirme que o token é salvo em `localStorage.auth_token`.
- **Portas**: Ajuste `baseURL` em `src/plugins/axios.ts` caso a API rode em outra porta/host.

---

## Roadmap curto

- Tratamento global de 401/403 (logout + redirect automático).
- Edição/atualização de tickets.
- Paginação e busca na listagem.
- Tema escuro e melhorias de acessibilidade (contraste/atalhos).
- Integração com notificações (toast) para feedback de ações.

---

## Licença

Este projeto é fornecido como exemplo educacional. Adapte a licença conforme a necessidade da sua organização.
