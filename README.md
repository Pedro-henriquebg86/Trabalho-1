# Trabalho-1

# API de Biblioteca – Projeto Completo em Node.js e Express

## 1. Introdução

Este projeto consiste no desenvolvimento de uma **API RESTful** para o gerenciamento de uma **Biblioteca**, construída utilizando **Node.js** e **Express.js**, seguindo o padrão arquitetural **MVC (Model-View-Controller)**.
A aplicação atende a todos os requisitos fundamentais de um sistema de gerenciamento de dados, incluindo:

* **CRUD completo (Create, Read, Update, Delete)** para diversas entidades.
* **Autenticação e autorização de usuários** com **JWT (JSON Web Token)**.
* **Controle de acesso baseado em papéis (admin e usuário comum)**.
* **Persistência de dados** utilizando arquivos JSON como banco de dados local.
* **Estrutura modular e organizada**, facilitando manutenção e escalabilidade.

O objetivo deste trabalho é demonstrar domínio dos conceitos de **APIs REST**, **boas práticas de programação**, **middlewares**, **segurança** e **estrutura MVC**.

---

## 2. Tecnologias Utilizadas

| Tecnologia             | Função                                                          |
| ---------------------- | --------------------------------------------------------------- |
| **Node.js**            | Ambiente de execução JavaScript no servidor.                    |
| **Express.js**         | Framework para criação de rotas e controle de requisições HTTP. |
| **bcrypt**             | Biblioteca para criptografar senhas.                            |
| **jsonwebtoken (JWT)** | Implementa autenticação via tokens.                             |
| **File System (fs)**   | Manipulação de arquivos JSON.                                   |
| **Thunder Client**     | Ferramenta para testes de requisições HTTP.                     |

---

## 3. Estrutura do Projeto (Arquitetura MVC)

A API segue o padrão **MVC (Model-View-Controller)**, com separação clara entre as camadas de dados, lógica e rotas.

```
biblioteca-api/
│
├─ controllers/               # Lógica de negócio e tratamento das requisições
│   ├─ autoresController.js
│   ├─ livrosController.js
│   ├─ usuariosController.js
│   ├─ editorasController.js
│   └─ emprestimosController.js
│
├─ models/                    # Manipulação e persistência dos dados (JSON)
│   ├─ autoresModel.js
│   ├─ livrosModel.js
│   ├─ usuariosModel.js
│   ├─ editorasModel.js
│   └─ emprestimosModel.js
│
├─ routes/                    # Definição dos endpoints da API
│   ├─ autores.js
│   ├─ livros.js
│   ├─ usuarios.js
│   ├─ editoras.js
│   └─ emprestimos.js
│
├─ middleware/                # Middlewares de autenticação e autorização
│   ├─ authMiddleware.js
│   └─ roleMiddleware.js
│
├─ data/                      # Banco de dados em formato JSON
│   ├─ autores.json
│   ├─ livros.json
│   ├─ usuarios.json
│   ├─ editoras.json
│   └─ emprestimos.json
│
├─ server.js                  # Ponto de entrada da aplicação
└─ package.json               # Dependências e scripts do projeto
```

---

## 4. Funcionalidades Implementadas

A API possui **cinco entidades principais**, cada uma com suas próprias rotas e controladores:

1. **Usuários** – registro, autenticação e papéis (admin e comum).
2. **Livros** – gerenciamento de obras literárias.
3. **Autores** – informações biográficas dos autores.
4. **Editoras** – controle de editoras e seus dados.
5. **Empréstimos** – registro e controle de livros emprestados e devolvidos.

Todas as entidades possuem **operações CRUD completas**.

---

## 5. Instalação e Execução

### 5.1 Instalar dependências

```bash
npm install express bcrypt jsonwebtoken
```

### 5.2 Executar o servidor

```bash
node server.js
```

O servidor estará disponível em:

```
http://localhost:3000
```

---

## 6. Segurança e Autenticação

A autenticação foi implementada com **JWT (JSON Web Token)** e senhas criptografadas com **bcrypt**.

### 6.1 Criptografia de senhas

Todas as senhas são criptografadas antes de serem armazenadas no arquivo `usuarios.json`.

### 6.2 Geração de Token

Ao realizar login, o sistema gera um token JWT válido por 1 hora, contendo informações do usuário (id e role).

Header necessário para rotas protegidas:

```
Authorization: Bearer <seu_token_aqui>
```

### 6.3 Controle de Acesso

* Usuários **comuns**: podem listar informações (GET).
* Usuários **administradores**: podem criar, atualizar e excluir registros.

---

## 7. Endpoints da API

### 7.1 Usuários

| Método | Endpoint              | Descrição                            | Permissão |
| ------ | --------------------- | ------------------------------------ | --------- |
| POST   | `/usuarios/registrar` | Registra um novo usuário             | Público   |
| POST   | `/usuarios/login`     | Realiza login e gera token JWT       | Público   |
| GET    | `/usuarios`           | Lista todos os usuários (sem senhas) | Admin     |

---

### 7.2 Livros

| Método | Endpoint      | Descrição                        | Permissão   |
| ------ | ------------- | -------------------------------- | ----------- |
| GET    | `/livros`     | Lista todos os livros            | Autenticado |
| POST   | `/livros`     | Cria um novo livro               | Admin       |
| PUT    | `/livros/:id` | Atualiza informações de um livro | Admin       |
| DELETE | `/livros/:id` | Remove um livro                  | Admin       |

---

### 7.3 Autores

| Método | Endpoint       | Descrição                        | Permissão   |
| ------ | -------------- | -------------------------------- | ----------- |
| GET    | `/autores`     | Lista todos os autores           | Autenticado |
| POST   | `/autores`     | Cria um novo autor               | Admin       |
| PUT    | `/autores/:id` | Atualiza informações de um autor | Admin       |
| DELETE | `/autores/:id` | Remove um autor                  | Admin       |

---

### 7.4 Editoras

| Método | Endpoint        | Descrição                      | Permissão   |
| ------ | --------------- | ------------------------------ | ----------- |
| GET    | `/editoras`     | Lista todas as editoras        | Autenticado |
| POST   | `/editoras`     | Cria uma nova editora          | Admin       |
| PUT    | `/editoras/:id` | Atualiza uma editora existente | Admin       |
| DELETE | `/editoras/:id` | Remove uma editora             | Admin       |

---

### 7.5 Empréstimos

| Método | Endpoint           | Descrição                            | Permissão              |
| ------ | ------------------ | ------------------------------------ | ---------------------- |
| GET    | `/emprestimos`     | Lista todos os empréstimos           | Autenticado            |
| POST   | `/emprestimos`     | Cria um novo empréstimo              | Usuário comum ou admin |
| PUT    | `/emprestimos/:id` | Atualiza status ou data de devolução | Admin                  |
| DELETE | `/emprestimos/:id` | Remove um empréstimo                 | Admin                  |

---

## 8. Fluxo de Uso no Thunder Client

### 8.1 Cadastro e Login

**Registrar administrador**

```http
POST http://localhost:3000/usuarios/registrar
```

Body:

```json
{
  "nome": "Administrador",
  "email": "admin@gmail.com",
  "senha": "123456",
  "role": "admin"
}
```

**Registrar usuário comum**

```http
POST http://localhost:3000/usuarios/registrar
```

Body:

```json
{
  "nome": "Maria",
  "email": "maria@gmail.com",
  "senha": "123456"
}
```

**Login**

```http
POST http://localhost:3000/usuarios/login
```

Body:

```json
{
  "email": "admin@gmail.com",
  "senha": "123456"
}
```

Resposta esperada:

```json
{
  "msg": "Login bem-sucedido",
  "token": "eyJhbGciOi..."
}
```

Adicionar o token no cabeçalho:

```
Authorization: Bearer eyJhbGciOi...
```

---

### 8.2 Exemplo de Criação de Livro

```http
POST http://localhost:3000/livros
```

Headers:

```
Authorization: Bearer <token_admin>
Content-Type: application/json
```

Body:

```json
{
  "titulo": "Dom Casmurro",
  "autor": "Machado de Assis",
  "ano": 1899
}
```

Resposta esperada:

```json
{
  "msg": "Livro adicionado com sucesso",
  "livro": {
    "id": 1,
    "titulo": "Dom Casmurro",
    "autor": "Machado de Assis",
    "ano": 1899
  }
}
```

---

## 9. Persistência de Dados (Banco de Dados JSON)

Os dados são armazenados em arquivos locais na pasta `data/`.
Cada entidade possui seu próprio arquivo JSON, funcionando como um banco de dados simples.

Exemplo de `livros.json`:

```json
[
  {
    "id": 1,
    "titulo": "Dom Casmurro",
    "autor": "Machado de Assis",
    "ano": 1899
  }
]
```

O acesso é feito por meio do módulo `fs` do Node.js, através dos models correspondentes.

---

## 10. Middlewares de Segurança

### 10.1 authMiddleware.js

Verifica a presença e validade do token JWT.
Se o token for válido, o usuário é anexado ao objeto `req.usuario`.

### 10.2 roleMiddleware.js

Controla o acesso por função.
Permite ou bloqueia ações com base no papel do usuário (`admin` ou `usuario`).

Exemplo:

```js
function autorizarRole(role) {
  return (req, res, next) => {
    if (req.usuario.role !== role) {
      return res.status(403).json({ msg: "Acesso negado" });
    }
    next();
  };
}
```

---

## 11. Boas Práticas Aplicadas

* **Separação de responsabilidades:** cada módulo possui função clara.
* **Código reutilizável:** models genéricos e controllers modulares.
* **Validação de dados:** verificação de campos obrigatórios em todas as rotas.
* **Segurança:** senhas criptografadas e tokens temporários.
* **Escalabilidade:** arquitetura pronta para substituição do JSON por um banco real (MySQL, MongoDB, etc.).
* **Respostas padronizadas:** mensagens consistentes em formato JSON.

---

## 12. Conclusão

A **API de Biblioteca** é um sistema completo que aplica conceitos fundamentais de desenvolvimento backend moderno.
A aplicação implementa uma estrutura sólida, segura e escalável, utilizando autenticação JWT, controle de permissões e armazenamento persistente em arquivos JSON.
Cumpre todos os requisitos acadêmicos e técnicos esperados em um projeto profissional de API REST com Node.js e Express.

---

**Autor:** Pedro Gomes
**Disciplina:** Desenvolvimento Web
**Professor:** Diego Cabral
**Ano:** 2025


