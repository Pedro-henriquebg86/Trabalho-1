# Trabalho 1

# 📚 **API de Biblioteca – Sistema Completo em Node.js e Express**

---

## 🧭 **1. Introdução**

A **API de Biblioteca** é um sistema backend desenvolvido em **Node.js** e **Express.js** com o objetivo de **gerenciar o funcionamento de uma biblioteca digital**, abrangendo o cadastro e controle de **usuários, livros, autores, editoras e empréstimos**.

O sistema foi projetado com base em **boas práticas de desenvolvimento de software** e segue o padrão arquitetural **MVC (Model-View-Controller)**, promovendo uma estrutura organizada, modular e escalável.

Entre os principais objetivos do projeto, destacam-se:

* Demonstrar o uso de **APIs RESTful** com rotas bem definidas e documentação clara;
* Aplicar **autenticação segura** e **autorização baseada em papéis (roles)** utilizando **JWT**;
* Implementar **operações CRUD completas** (Create, Read, Update, Delete) em múltiplas entidades;
* Simular um banco de dados real por meio de **arquivos JSON persistentes**;
* Consolidar conceitos de **backend moderno**, como middleware, modularização e controle de acesso.

Essa API reflete um sistema completo de **gerenciamento de biblioteca**, sendo adequada tanto para uso acadêmico quanto como base para sistemas reais que utilizem bancos de dados como **MongoDB, MySQL ou PostgreSQL**.

---

## ⚙️ **2. Tecnologias Utilizadas**

| Tecnologia             | Função Principal                                             |
| ---------------------- | ------------------------------------------------------------ |
| **Node.js**            | Ambiente de execução JavaScript no servidor.                 |
| **Express.js**         | Framework leve para manipulação de rotas e middlewares.      |
| **bcrypt**             | Criptografia de senhas para garantir segurança dos usuários. |
| **jsonwebtoken (JWT)** | Criação e validação de tokens de autenticação.               |
| **File System (fs)**   | Manipulação de arquivos JSON que simulam o banco de dados.   |
| **Thunder Client**     | Testes de requisições HTTP (alternativa ao Postman).         |

---

## 🧱 **3. Estrutura do Projeto – Padrão MVC**

O projeto está dividido em três grandes camadas (Model, Controller e Routes), além das pastas auxiliares de dados e segurança.

```bash
biblioteca-api/
│
├── controllers/               # Regras de negócio e validação das requisições
│   ├── autoresController.js
│   ├── livrosController.js
│   ├── usuariosController.js
│   ├── editorasController.js
│   └── emprestimosController.js
│
├── models/                    # Manipulação e persistência dos dados (JSON)
│   ├── autoresModel.js
│   ├── livrosModel.js
│   ├── usuariosModel.js
│   ├── editorasModel.js
│   └── emprestimosModel.js
│
├── routes/                    # Definição dos endpoints da API
│   ├── autores.js
│   ├── livros.js
│   ├── usuarios.js
│   ├── editoras.js
│   └── emprestimos.js
│
├── middleware/                # Middlewares de autenticação e autorização
│   ├── authMiddleware.js
│   └── roleMiddleware.js
│
├── data/                      # Banco de dados local (arquivos JSON)
│   ├── autores.json
│   ├── livros.json
│   ├── usuarios.json
│   ├── editoras.json
│   └── emprestimos.json
│
├── server.js                  # Ponto de entrada da aplicação
└── package.json               # Dependências e scripts do projeto
```

---

## 🧩 **4. Modelo de Relacionamento entre Entidades**

A seguir, um diagrama textual representando a relação entre as entidades do sistema:

```
┌────────────┐       ┌──────────────┐        ┌────────────┐
│  USUÁRIO   │──────▶│ EMPRÉSTIMO  │◀──────▶│   LIVRO     │
│ id         │       │ id           │        │ id          │
│ nome       │       │ usuarioId    │        │ titulo      │
│ email      │       │ livroId      │        │ autorId     │
│ role       │       │ dataEmprest. │        │ editoraId   │
└────────────┘       │ dataDevol.   │        └────────────┘
                     └──────────────┘               │
                                                    │
                                            ┌────────────┐
                                            │   AUTOR     │
                                            │ id          │
                                            │ nome        │
                                            │ nacionalidade│
                                            └────────────┘
                                                    │
                                            ┌────────────┐
                                            │  EDITORA    │
                                            │ id          │
                                            │ nome        │
                                            │ país        │
                                            └────────────┘
```

**Resumo das relações:**

* Um **usuário** pode ter vários **empréstimos**.
* Um **livro** pode estar relacionado a **um autor** e **uma editora**.
* Um **empréstimo** liga **um usuário** a **um livro** específico.

---

## 🔐 **5. Autenticação e Segurança**

A segurança foi implementada por meio de dois middlewares principais:

### 5.1 `authMiddleware.js`

Valida o **token JWT** presente no cabeçalho da requisição.

```js
const token = req.headers["authorization"];
if (!token) return res.status(401).json({ msg: "Token não fornecido" });
```

Se válido, o usuário é associado à requisição:

```js
req.usuario = usuario;
```

---

### 5.2 `roleMiddleware.js`

Restringe acesso conforme o papel do usuário:

* **admin:** acesso completo (CRUD total).
* **usuario:** apenas leitura e ações pessoais.

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

## 🧾 **6. Entidades e Funcionalidades**

### 6.1 Usuários

Gerencia cadastro, login e controle de papéis.

| Método | Endpoint              | Descrição                             | Acesso  |
| ------ | --------------------- | ------------------------------------- | ------- |
| POST   | `/usuarios/registrar` | Registrar novo usuário                | Público |
| POST   | `/usuarios/login`     | Login e geração de token              | Público |
| GET    | `/usuarios`           | Listar todos os usuários (sem senhas) | Admin   |

#### Exemplo – Registro de Administrador

```json
{
  "nome": "Carlos Silva",
  "email": "carlos@biblioteca.com",
  "senha": "123456",
  "role": "admin"
}
```

#### Exemplo – Login

```json
{
  "email": "carlos@biblioteca.com",
  "senha": "123456"
}
```

#### Resposta:

```json
{
  "msg": "Login bem-sucedido",
  "token": "eyJhbGciOi..."
}
```

---

### 6.2 Livros

Cadastro e controle de livros disponíveis.

| Método | Endpoint      | Descrição             | Acesso      |
| ------ | ------------- | --------------------- | ----------- |
| GET    | `/livros`     | Lista todos os livros | Autenticado |
| POST   | `/livros`     | Cria um novo livro    | Admin       |
| PUT    | `/livros/:id` | Atualiza um livro     | Admin       |
| DELETE | `/livros/:id` | Remove um livro       | Admin       |

#### Exemplo – Criação

```json
{
  "titulo": "Dom Casmurro",
  "autor": "Machado de Assis",
  "ano": 1899
}
```

---

### 6.3 Autores

Gerencia informações sobre autores.

| Método | Endpoint       | Descrição       | Acesso      |
| ------ | -------------- | --------------- | ----------- |
| GET    | `/autores`     | Lista autores   | Autenticado |
| POST   | `/autores`     | Cria novo autor | Admin       |
| PUT    | `/autores/:id` | Atualiza autor  | Admin       |
| DELETE | `/autores/:id` | Remove autor    | Admin       |

#### Exemplo – Criação

```json
{
  "nome": "Machado de Assis",
  "nacionalidade": "Brasileiro",
  "dataNascimento": "1839-06-21"
}
```

---

### 6.4 Editoras

Gerencia informações de editoras literárias.

| Método | Endpoint        | Descrição         | Acesso      |
| ------ | --------------- | ----------------- | ----------- |
| GET    | `/editoras`     | Lista editoras    | Autenticado |
| POST   | `/editoras`     | Cria nova editora | Admin       |
| PUT    | `/editoras/:id` | Atualiza editora  | Admin       |
| DELETE | `/editoras/:id` | Remove editora    | Admin       |

#### Exemplo – Criação

```json
{
  "nome": "Companhia das Letras",
  "pais": "Brasil",
  "anoFundacao": 1986
}
```

---

### 6.5 Empréstimos

Controla o empréstimo e devolução de livros.

| Método | Endpoint           | Descrição            | Acesso      |
| ------ | ------------------ | -------------------- | ----------- |
| GET    | `/emprestimos`     | Lista empréstimos    | Autenticado |
| POST   | `/emprestimos`     | Cria novo empréstimo | Usuário     |
| PUT    | `/emprestimos/:id` | Atualiza devolução   | Admin       |
| DELETE | `/emprestimos/:id` | Exclui registro      | Admin       |

#### Exemplo – Criação

```json
{
  "livroId": 1,
  "usuarioId": 2,
  "dataEmprestimo": "2025-10-10",
  "dataDevolucao": null
}
```

---

## 💾 **7. Persistência de Dados**

A persistência ocorre em arquivos JSON armazenados na pasta `/data`.
Cada entidade possui seu arquivo próprio, com operações de leitura e escrita gerenciadas via **File System (fs)**.

**Exemplo – `livros.json`:**

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

---

## 🧪 **8. Testes no Thunder Client**

### Fluxo recomendado de testes:

1. **Registrar usuário admin**
2. **Registrar usuário comum**
3. **Fazer login (pegar token)**
4. **Testar listagem de livros/autores/editoras**
5. **Criar registros (com token admin)**
6. **Simular empréstimo (com token usuário)**

**Importante:**
Em todas as rotas protegidas, inclua no cabeçalho:

```
Authorization: Bearer <seu_token>
```

---

## 🧠 **9. Boas Práticas Aplicadas**

* **Separação de responsabilidades:** controllers, models e routes independentes.
* **Segurança:** uso de bcrypt e tokens JWT com expiração.
* **Escalabilidade:** estrutura facilmente adaptável para bancos SQL/NoSQL.
* **Código limpo:** modularização, mensagens consistentes e validação de campos obrigatórios.
* **Documentação clara:** endpoints, exemplos e diagramas para fácil entendimento.

---

## 🏁 **10. Conclusão**

A **API de Biblioteca** é um projeto completo, seguro e modular, aplicando conceitos essenciais do desenvolvimento backend moderno.
Ela demonstra o uso profissional de **Node.js**, **Express.js**, **JWT** e **arquitetura MVC**, com separação total entre lógica, dados e autenticação.

O sistema cumpre integralmente os requisitos de um projeto acadêmico e técnico, sendo uma base sólida para aplicações reais.

---

**Autor:** Pedro Gomes
**Disciplina:** Desenvolvimento Web
**Professor:** Diego Cabral
**Ano:** 2025


