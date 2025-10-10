# 📚 **API de Biblioteca – Sistema Completo em Node.js e Express**

---

## 🧭 **1. Introdução**

A **API de Biblioteca** é um sistema backend desenvolvido com **Node.js** e **Express.js**, criado para simular o funcionamento de uma biblioteca digital.
O sistema permite o gerenciamento completo de **usuários, livros, autores, editoras e empréstimos**, implementando **operações CRUD**, **autenticação segura (JWT)** e **controle de acesso baseado em papéis** (usuário comum e administrador).

Este projeto foi desenvolvido seguindo rigorosamente o padrão **MVC (Model–View–Controller)**, priorizando **organização, segurança e escalabilidade**.
Ele serve como base acadêmica e também como estrutura sólida para aplicações reais com banco de dados.

---

## ⚙️ **2. Tecnologias Utilizadas**

| Tecnologia             | Descrição                                                |
| ---------------------- | -------------------------------------------------------- |
| **Node.js**            | Ambiente de execução JavaScript no servidor.             |
| **Express.js**         | Framework para gerenciamento de rotas e middlewares.     |
| **bcrypt**             | Criptografia segura de senhas.                           |
| **jsonwebtoken (JWT)** | Autenticação e controle de acesso via tokens.            |
| **File System (fs)**   | Manipulação de arquivos JSON usados como banco de dados. |
| **Thunder Client**     | Extensão do VS Code usada para testar requisições HTTP.  |

---

## 🧱 **3. Estrutura do Projeto (Arquitetura MVC)**

```
biblioteca-api/
│
├── controllers/               # Lógica de negócio e manipulação das requisições
│   ├── autoresController.js
│   ├── livrosController.js
│   ├── usuariosController.js
│   ├── editorasController.js
│   └── emprestimosController.js
│
├── models/                    # Manipulação de dados (leitura e escrita JSON)
│   ├── autoresModel.js
│   ├── livrosModel.js
│   ├── usuariosModel.js
│   ├── editorasModel.js
│   └── emprestimosModel.js
│
├── routes/                    # Definição dos endpoints (rotas da API)
│   ├── autores.js
│   ├── livros.js
│   ├── usuarios.js
│   ├── editoras.js
│   └── emprestimos.js
│
├── middleware/                # Segurança e controle de acesso
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
├── server.js                  # Arquivo principal da aplicação
└── package.json               # Dependências e scripts
```

---

## 🧩 **4. Relacionamento entre Entidades**

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

---

## 🔒 **5. Segurança e Autenticação**

A autenticação é feita via **JWT (JSON Web Token)** e senhas criptografadas com **bcrypt**.

### 5.1 Processo de Autenticação

1. O usuário realiza login enviando **email e senha**.
2. O servidor valida as credenciais e gera um **token JWT** válido por 1 hora.
3. Esse token deve ser enviado em todas as requisições protegidas, no cabeçalho:

```
Authorization: Bearer <seu_token>
```

### 5.2 Controle de Acesso

* **Usuário comum:** pode listar informações (GET).
* **Administrador:** pode criar, atualizar e excluir registros.

---

## 💻 **6. Como Executar o Projeto (Passo a Passo)**

### 🧩 Passo 1 – Instalar as Dependências

Abra o terminal na pasta do projeto e execute:

```bash
npm install express bcrypt jsonwebtoken
```

### 🧩 Passo 2 – Iniciar o Servidor

```bash
node server.js
```

Se tudo estiver correto, aparecerá:

```
Servidor rodando na porta 3000
```

Agora a API está ativa em:

```
http://localhost:3000
```

> Dica: você pode usar `npx nodemon server.js` para reiniciar automaticamente quando salvar arquivos.

---

## 🧪 **7. Testando no Thunder Client (Passo a Passo)**

### 🔹 1. Registrar um Administrador

**Método:** `POST`
**URL:** `http://localhost:3000/usuarios/registrar`

**Body (JSON):**

```json
{
  "nome": "Admin",
  "email": "admin@biblioteca.com",
  "senha": "123456",
  "role": "admin"
}
```

---

### 🔹 2. Registrar um Usuário Comum

**Método:** `POST`
**URL:** `http://localhost:3000/usuarios/registrar`

**Body (JSON):**

```json
{
  "nome": "Maria Silva",
  "email": "maria@biblioteca.com",
  "senha": "123456"
}
```

---

### 🔹 3. Fazer Login (e obter token)

**Método:** `POST`
**URL:** `http://localhost:3000/usuarios/login`

**Body (JSON):**

```json
{
  "email": "admin@biblioteca.com",
  "senha": "123456"
}
```

**Resposta esperada:**

```json
{
  "msg": "Login bem-sucedido",
  "token": "eyJhbGciOi..."
}
```

Copie o valor do token (sem aspas).

---

### 🔹 4. Listar Usuários (Somente Admin)

**Método:** `GET`
**URL:** `http://localhost:3000/usuarios`

**Headers:**

```
Authorization: Bearer <token_do_admin>
```

---

### 🔹 5. Criar um Livro (Apenas Admin)

**Método:** `POST`
**URL:** `http://localhost:3000/livros`

**Headers:**

```
Authorization: Bearer <token_do_admin>
Content-Type: application/json
```

**Body (JSON):**

```json
{
  "titulo": "Dom Casmurro",
  "autor": "Machado de Assis",
  "ano": 1899
}
```

---

### 🔹 6. Listar Livros (Qualquer Usuário Autenticado)

**Método:** `GET`
**URL:** `http://localhost:3000/livros`

**Headers:**

```
Authorization: Bearer <token_de_qualquer_usuario>
```

**Resposta esperada:**

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

### 🔹 7. Criar Autor, Editora e Empréstimo (Admin)

**Autor**

```http
POST http://localhost:3000/autores
```

```json
{
  "nome": "Machado de Assis",
  "nacionalidade": "Brasileiro",
  "dataNascimento": "1839-06-21"
}
```

**Editora**

```http
POST http://localhost:3000/editoras
```

```json
{
  "nome": "Companhia das Letras",
  "pais": "Brasil",
  "anoFundacao": 1986
}
```

**Empréstimo (Usuário comum)**

```http
POST http://localhost:3000/emprestimos
```

```json
{
  "livroId": 1,
  "usuarioId": 2,
  "dataEmprestimo": "2025-10-10",
  "dataDevolucao": null
}
```

---

## 🔄 **8. Fluxo de Requisições (Diagrama HTTP)**

```
[ Cliente (Thunder Client) ]
        │
        │  POST /usuarios/login
        ▼
[ Servidor Express ] ──► [ usuariosController.js ]
        │
        │  Gera Token JWT
        ▼
[ Cliente envia Token ]
        │
        │  GET /livros
        ▼
[ authMiddleware.js ] ──► Valida Token
        │
        │  RoleMiddleware.js (verifica admin)
        ▼
[ Controller específico ]
        │
        ▼
[ Model → arquivo JSON ]
        │
        ▼
[ Resposta JSON ao cliente ]
```

---

## 🧠 **9. Boas Práticas Aplicadas**

✔ Separação completa de responsabilidades (MVC).
✔ Senhas criptografadas e tokens temporários.
✔ Controle de acesso baseado em papéis (role-based access control).
✔ Estrutura pronta para integração com bancos SQL ou NoSQL.
✔ Tratamento de erros e mensagens padronizadas.
✔ Documentação clara e completa.

---

## 🏁 **10. Conclusão**

A **API de Biblioteca** é um sistema completo e profissional, implementando os conceitos fundamentais do desenvolvimento backend moderno:

* **Autenticação JWT**,
* **Controle de acesso seguro**,
* **CRUD completo**,
* **Persistência de dados local**,
* e **arquitetura escalável (MVC)**.

O projeto cumpre integralmente os requisitos acadêmicos, demonstrando domínio técnico e aplicabilidade prática.

---

**Autor:** Pedro Gomes
**Disciplina:** Desenvolvimento Web
**Professor:** Diego Cabral
**Ano:** 2025


