# 📚 **API de Biblioteca – Sistema Completo em Node.js e Express (Manual de Instalação e Testes com todas as requisições)**

---
**Autor:** Pedro Gomes
**Disciplina:** Desenvolvimento Web
**Professor:** Diego Cabral
**Ano:** 2025

## 🧭 **1. Introdução**

A **API de Biblioteca** é um sistema backend completo e profissional, desenvolvido em **Node.js** e **Express.js**, que simula o funcionamento de uma **biblioteca digital moderna**.

O projeto foi construído de forma **modular, segura e escalável**, seguindo o padrão **MVC (Model–View–Controller)**, e cumpre todos os requisitos acadêmicos e técnicos de um sistema RESTful:

✅ CRUD completo para **cinco entidades principais** (Usuários, Livros, Autores, Editoras e Empréstimos).
✅ **Autenticação e autorização via JWT**.
✅ **Criptografia de senhas com bcrypt**.
✅ **Controle de acesso por papéis** (usuário comum e administrador).
✅ **Persistência local com JSON**.
✅ **Código limpo, organizado e pronto para produção ou expansão.**

---

## ⚙️ **2. Tecnologias Utilizadas**

| Tecnologia             | Função principal no projeto                                        |
| ---------------------- | ------------------------------------------------------------------ |
| **Node.js**            | Ambiente de execução JavaScript no servidor.                       |
| **Express.js**         | Framework para criação e gerenciamento de rotas e middlewares.     |
| **bcrypt**             | Criptografia de senhas para segurança dos usuários.                |
| **jsonwebtoken (JWT)** | Criação e validação de tokens de autenticação.                     |
| **File System (fs)**   | Leitura e escrita dos arquivos JSON usados como banco de dados.    |
| **Thunder Client**     | Ferramenta do VS Code para testar requisições HTTP com facilidade. |

---

## 🧱 **3. Estrutura do Projeto (Arquitetura MVC)**

```
biblioteca-api/
│
├── controllers/               # Lógica de negócio e validação de dados
│   ├── autoresController.js
│   ├── livrosController.js
│   ├── usuariosController.js
│   ├── editorasController.js
│   └── emprestimosController.js
│
├── models/                    # Manipulação de dados JSON (banco local)
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
├── middleware/                # Segurança (auth e roles)
│   ├── authMiddleware.js
│   └── roleMiddleware.js
│
├── data/                      # Base de dados local (arquivos JSON)
│   ├── autores.json
│   ├── livros.json
│   ├── usuarios.json
│   ├── editoras.json
│   └── emprestimos.json
│
├── server.js                  # Ponto de entrada principal
└── package.json               # Dependências e scripts
```

---

## ⚠️ **4. Atenção – verifique antes de iniciar o projeto**

**Esta etapa é obrigatória para evitar erros!**

Antes de qualquer comando, certifique-se de estar **dentro da pasta correta do projeto (`biblioteca-api`)**.
Se estiver em outro diretório, o projeto não funcionará.

---

### 🔹 No Windows (CMD ou PowerShell)

1. Abra o terminal e digite:

   ```powershell
   dir
   ```

   Verifique se aparecem as pastas `controllers`, `models`, `routes`, `data` e o arquivo `server.js`.

2. Se não estiver na pasta correta, entre nela:

   ```powershell
   cd C:\caminho\para\biblioteca-api
   dir
   ```

---

### 🔹 No Linux / macOS

1. No terminal, digite:

   ```bash
   ls
   ```

   Confirme que aparecem as mesmas pastas e arquivos acima.

2. Caso contrário:

   ```bash
   cd ~/caminho/para/biblioteca-api
   ls
   ```

✅ Somente após confirmar que você está **na pasta do projeto**, siga para a instalação.

---

## 💻 **5. Instalação e Execução**

### 🧩 Passo 1 — Instalar as dependências

Com o terminal na pasta do projeto, execute:

```bash
npm install express bcrypt jsonwebtoken
```

Esse comando instala todas as bibliotecas necessárias.
**Não pule esta etapa.**

---

### 🧩 Passo 2 — Iniciar o servidor

```bash
node server.js
```

### 🟢 Resultado esperado:

```
Servidor rodando na porta 3000
```

> Se aparecer qualquer erro, revise o caminho da pasta e se as dependências foram instaladas corretamente.

A aplicação estará disponível em:

```
http://localhost:3000
```

---

# 🧪 **6. Testando a API – Passo a Passo (Thunder Client)**

> 💡 **Dica:** Sempre envie os dados completos no corpo (body) das requisições POST e PUT.
> Campos obrigatórios que não forem preenchidos gerarão erro **400 (Preencha todos os campos)**.

---

## 🧍‍♂️ **1. Usuários**

Gerencia o cadastro, login e controle de acesso dos usuários.

---

### ➕ Criar administrador

```http
POST http://localhost:3000/usuarios/registrar
```

**Body (JSON):**

```json
{
  "nome": "Administrador",
  "email": "admin@biblioteca.com",
  "senha": "123456",
  "role": "admin"
}
```

**Resposta esperada:**

```json
{ "msg": "Usuário registrado com sucesso" }
```

> ⚠️ Campos `nome`, `email` e `senha` são obrigatórios.

---

### ➕ Criar usuário comum

```http
POST http://localhost:3000/usuarios/registrar
```

**Body (JSON):**

```json
{
  "nome": "Maria Leitura",
  "email": "maria@biblioteca.com",
  "senha": "senha123"
}
```

---

### 🔑 Login (gera token JWT)

```http
POST http://localhost:3000/usuarios/login
```

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

> ⚠️ Copie o token gerado (sem aspas).
> Ele será usado em todas as rotas protegidas:
>
> ```
> Authorization: Bearer <seu_token>
> ```

---

### 📋 Listar usuários (somente admin)

```http
GET http://localhost:3000/usuarios
```

**Headers:**

```
Authorization: Bearer <token_admin>
```

**Resposta esperada:**

```json
[
  { "id": 1, "nome": "Administrador", "email": "admin@biblioteca.com", "role": "admin" },
  { "id": 2, "nome": "Maria Leitura", "email": "maria@biblioteca.com", "role": "usuario" }
]
```

> ⚠️ Se tentar com token de usuário comum → erro **403 Acesso negado**.

---

## 📚 **2. Livros**

Gerencia o acervo literário da biblioteca.

---

### ➕ Criar livros

```http
POST http://localhost:3000/livros
```

**Headers:**

```
Authorization: Bearer <token_admin>
```

**Body (JSON):**

```json
{
  "titulo": "Dom Casmurro",
  "autor": "Machado de Assis",
  "ano": 1899
}
```

Outro exemplo:

```json
{
  "titulo": "O Cortiço",
  "autor": "Aluísio Azevedo",
  "ano": 1890
}
```

---

### 📋 Listar livros

```http
GET http://localhost:3000/livros
```

**Headers:**

```
Authorization: Bearer <token_usuario>
```

**Resposta esperada:**

```json
[
  { "id": 1, "titulo": "Dom Casmurro", "autor": "Machado de Assis", "ano": 1899 },
  { "id": 2, "titulo": "O Cortiço", "autor": "Aluísio Azevedo", "ano": 1890 }
]
```

---

### ✏️ Atualizar livro

```http
PUT http://localhost:3000/livros/2
```

**Body (JSON):**

```json
{ "ano": 1891 }
```

---

### ❌ Deletar livro

```http
DELETE http://localhost:3000/livros/1
```

---

## ✍️ **3. Autores**

Gerencia os dados biográficos dos escritores.

---

### ➕ Criar autores

```http
POST http://localhost:3000/autores
```

**Body (JSON):**

```json
{
  "nome": "Machado de Assis",
  "nacionalidade": "Brasileiro",
  "dataNascimento": "1839-06-21"
}
```

Outro exemplo:

```json
{
  "nome": "Clarice Lispector",
  "nacionalidade": "Ucraniana-brasileira",
  "dataNascimento": "1920-12-10"
}
```

---

### 📋 Listar autores

```http
GET http://localhost:3000/autores
```

---

### ✏️ Atualizar autor

```http
PUT http://localhost:3000/autores/2
```

**Body (JSON):**

```json
{ "nacionalidade": "Brasileira naturalizada" }
```

---

### ❌ Deletar autor

```http
DELETE http://localhost:3000/autores/1
```

---

## 🏢 **4. Editoras**

Gerencia informações das editoras literárias.

---

### ➕ Criar editoras

```http
POST http://localhost:3000/editoras
```

**Body (JSON):**

```json
{
  "nome": "Companhia das Letras",
  "pais": "Brasil",
  "anoFundacao": 1986
}
```

Outro exemplo:

```json
{
  "nome": "Penguin Books",
  "pais": "Reino Unido",
  "anoFundacao": 1935
}
```

---

### 📋 Listar editoras

```http
GET http://localhost:3000/editoras
```

---

### ✏️ Atualizar editora

```http
PUT http://localhost:3000/editoras/2
```

**Body (JSON):**

```json
{ "pais": "Inglaterra" }
```

---

### ❌ Deletar editora

```http
DELETE http://localhost:3000/editoras/1
```

---

## 📦 **5. Empréstimos**

Gerencia o histórico de livros emprestados.

---

### ➕ Criar empréstimo

```http
POST http://localhost:3000/emprestimos
```

**Body (JSON):**

```json
{
  "livroId": 2,
  "usuarioId": 2,
  "dataEmprestimo": "2025-10-10",
  "dataDevolucao": null
}
```

---

### 📋 Listar empréstimos

```http
GET http://localhost:3000/emprestimos
```

---

### ✏️ Atualizar empréstimo (marcar devolução)

```http
PUT http://localhost:3000/emprestimos/1
```

**Body (JSON):**

```json
{
  "dataDevolucao": "2025-10-20"
}
```

---

### ❌ Deletar empréstimo

```http
DELETE http://localhost:3000/emprestimos/1
```

---

# ✅ **7. Conclusão**

O projeto **API de Biblioteca** é uma aplicação **completa, funcional e profissional**, que demonstra domínio em:

* Desenvolvimento de APIs REST com **Node.js e Express**;
* **Autenticação JWT** e **criptografia de senhas**;
* **Controle de acesso e segurança com middlewares**;
* **CRUD de múltiplas entidades**;
* **Persistência local com JSON**;
* Estrutura **modular e escalável** (padrão MVC).

Mesmo uma pessoa sem experiência consegue:

1. Instalar as dependências,
2. Executar o servidor,
3. Testar todos os endpoints no Thunder Client,
4. E visualizar claramente o funcionamento de cada parte da API.



