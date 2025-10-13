# Trabalho-1

# 📚 **API de Biblioteca – Sistema Completo em Node.js e Express**

---

## 🧭 **1. Introdução**

A **API de Biblioteca** é um sistema backend completo desenvolvido em **Node.js** com **Express.js**, projetado para o gerenciamento digital de uma biblioteca.
Ela permite a administração de **usuários, livros, autores, editoras e empréstimos**, garantindo **autenticação segura**, **controle de permissões**, **persistência local** e **operações CRUD completas**.

A estrutura do projeto segue o padrão **MVC (Model–View–Controller)**, separando de forma clara:

* **Models:** responsáveis por acessar e manipular os dados nos arquivos JSON.
* **Controllers:** contêm a lógica de negócio e tratam as requisições.
* **Routes:** definem os endpoints da API e conectam os controllers.

Além disso, foram aplicados **conceitos modernos de segurança**, como criptografia de senhas (**bcrypt**) e autenticação com **JWT (JSON Web Token)**.

> Este projeto foi desenvolvido com foco em **organização, clareza e aplicabilidade prática**, atendendo aos requisitos acadêmicos e refletindo práticas de desenvolvimento profissional.

---

## ⚙️ **2. Tecnologias Utilizadas**

| Tecnologia             | Função                                                     |
| ---------------------- | ---------------------------------------------------------- |
| **Node.js**            | Ambiente de execução JavaScript no servidor.               |
| **Express.js**         | Framework que facilita a criação de rotas e middlewares.   |
| **bcrypt**             | Criptografia de senhas dos usuários.                       |
| **jsonwebtoken (JWT)** | Autenticação e autorização via token.                      |
| **File System (fs)**   | Persistência de dados utilizando arquivos JSON.            |
| **Thunder Client**     | Ferramenta para testar requisições HTTP dentro do VS Code. |

---

## 🧱 **3. Estrutura do Projeto (Arquitetura MVC)**

```
biblioteca-api/
│
├── controllers/               # Regras de negócio
│   ├── usuariosController.js
│   ├── livrosController.js
│   ├── autoresController.js
│   ├── editorasController.js
│   └── emprestimosController.js
│
├── models/                    # Manipulação dos arquivos JSON
│   ├── usuariosModel.js
│   ├── livrosModel.js
│   ├── autoresModel.js
│   ├── editorasModel.js
│   └── emprestimosModel.js
│
├── routes/                    # Endpoints da API
│   ├── usuarios.js
│   ├── livros.js
│   ├── autores.js
│   ├── editoras.js
│   └── emprestimos.js
│
├── middleware/                # Segurança e permissões
│   ├── authMiddleware.js
│   └── roleMiddleware.js
│
├── data/                      # Arquivos JSON simulando o banco de dados
│   ├── usuarios.json
│   ├── livros.json
│   ├── autores.json
│   ├── editoras.json
│   └── emprestimos.json
│
├── server.js                  # Ponto de entrada da aplicação
└── package.json               # Dependências e scripts
```

---

## 🧩 **4. Estrutura e Relacionamentos das Entidades**

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

A autenticação é realizada com **JWT** e **bcrypt**, garantindo segurança e integridade das informações.

### 5.1 Etapas da autenticação

1. O usuário envia **email e senha** no endpoint de login.
2. O servidor valida as credenciais e gera um **token JWT**.
3. Esse token é necessário para acessar as rotas protegidas.

Exemplo de header:

```
Authorization: Bearer <seu_token_aqui>
```

### 5.2 Permissões

* **Usuário comum:** acesso apenas a leitura (`GET`).
* **Administrador:** acesso total (`GET`, `POST`, `PUT`, `DELETE`).

---

## 💻 **6. Como Executar o Projeto**

### 6.1 Instalar dependências

```bash
npm install express bcrypt jsonwebtoken
```

### 6.2 Iniciar o servidor

```bash
node server.js
```

Saída esperada:

```
Servidor rodando na porta 3000
```

Acesse em:

```
http://localhost:3000
```

---

## 🧪 **7. Testes no Thunder Client (Passo a Passo)**

> Cada requisição deve ser testada no Thunder Client com o método e corpo correspondentes.
> Sempre use o token no header para endpoints protegidos.

---

### 🔹 **1. Criar um Administrador**

**POST** → `http://localhost:3000/usuarios/registrar`

```json
{
  "nome": "Carlos Admin",
  "email": "admin@biblioteca.com",
  "senha": "123456",
  "role": "admin"
}
```

---

### 🔹 **2. Criar um Usuário Comum**

**POST** → `http://localhost:3000/usuarios/registrar`

```json
{
  "nome": "Maria Leitura",
  "email": "maria@biblioteca.com",
  "senha": "123456"
}
```

---

### 🔹 **3. Login e Geração do Token**

**POST** → `http://localhost:3000/usuarios/login`

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

Copie o token e use nas próximas requisições.

---

### 🔹 **4. Listar Usuários (somente admin)**

**GET** → `http://localhost:3000/usuarios`

**Headers:**

```
Authorization: Bearer <token_admin>
```

**Resposta esperada:**

```json
[
  {
    "id": 1,
    "nome": "Carlos Admin",
    "email": "admin@biblioteca.com",
    "role": "admin"
  },
  {
    "id": 2,
    "nome": "Maria Leitura",
    "email": "maria@biblioteca.com",
    "role": "usuario"
  }
]
```

---

## 📘 **8. CRUD Completo com Exemplos Práticos**

A seguir, exemplos práticos de **criação, listagem, atualização e exclusão** de cada entidade.

---

### 🟦 **LIVROS**

#### ➕ Criar Livro (apenas admin)

**POST** → `http://localhost:3000/livros`

```json
{
  "titulo": "Dom Casmurro",
  "autor": "Machado de Assis",
  "ano": 1899
}
```

#### 📜 Listar Livros

**GET** → `http://localhost:3000/livros`

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

#### 🔄 Atualizar Livro

**PUT** → `http://localhost:3000/livros/1`

```json
{
  "ano": 1900,
  "titulo": "Dom Casmurro (Edição Revisada)"
}
```

**Resposta esperada:**

```json
{
  "msg": "Livro atualizado com sucesso",
  "livro": {
    "id": 1,
    "titulo": "Dom Casmurro (Edição Revisada)",
    "autor": "Machado de Assis",
    "ano": 1900
  }
}
```

#### ❌ Excluir Livro

**DELETE** → `http://localhost:3000/livros/1`

**Resposta esperada:**

```json
{ "msg": "Livro removido com sucesso" }
```

---

### 🟨 **AUTORES**

#### ➕ Criar Autor

**POST** → `http://localhost:3000/autores`

```json
{
  "nome": "Jorge Amado",
  "nacionalidade": "Brasileiro",
  "dataNascimento": "1912-08-10"
}
```

#### 📜 Listar Autores

**GET** → `http://localhost:3000/autores`

#### 🔄 Atualizar Autor

**PUT** → `http://localhost:3000/autores/1`

```json
{
  "nacionalidade": "Baiano"
}
```

#### ❌ Excluir Autor

**DELETE** → `http://localhost:3000/autores/1`

---

### 🟩 **EDITORAS**

#### ➕ Criar Editora

**POST** → `http://localhost:3000/editoras`

```json
{
  "nome": "Companhia das Letras",
  "pais": "Brasil",
  "anoFundacao": 1986
}
```

#### 📜 Listar Editoras

**GET** → `http://localhost:3000/editoras`

#### 🔄 Atualizar Editora

**PUT** → `http://localhost:3000/editoras/1`

```json
{
  "pais": "Portugal"
}
```

#### ❌ Excluir Editora

**DELETE** → `http://localhost:3000/editoras/1`

---

### 🟧 **EMPRÉSTIMOS**

#### ➕ Criar Empréstimo

**POST** → `http://localhost:3000/emprestimos`

```json
{
  "livroId": 1,
  "usuarioId": 2,
  "dataEmprestimo": "2025-10-10",
  "dataDevolucao": null
}
```

#### 📜 Listar Empréstimos

**GET** → `http://localhost:3000/emprestimos`

#### 🔄 Atualizar Empréstimo

**PUT** → `http://localhost:3000/emprestimos/1`

```json
{
  "dataDevolucao": "2025-10-20"
}
```

#### ❌ Excluir Empréstimo

**DELETE** → `http://localhost:3000/emprestimos/1`

---

## 🔄 **9. Fluxo de Requisições**

```
[ Cliente (Thunder Client) ]
        │
        │  POST /usuarios/login
        ▼
[ Servidor Express ]
        │
        ├── Valida credenciais
        ├── Gera JWT (1h de validade)
        ▼
[ Cliente envia token ]
        │
        │  GET /livros
        ▼
[ authMiddleware ] → Valida token
[ roleMiddleware ] → Checa permissões
        ▼
[ Controller ] → Executa regra de negócio
[ Model ] → Lê/escreve JSON
        ▼
[ Resposta JSON ]
```

---

## 🧠 **10. Boas Práticas Aplicadas**

✔ Arquitetura **MVC** clara e modular.
✔ **Autenticação JWT** com expiração.
✔ **Criptografia segura** de senhas (bcrypt).
✔ **Controle de acesso por papéis** (role-based).
✔ **Mensagens de resposta padronizadas** em JSON.
✔ **Código limpo**, organizado e escalável.
✔ **Compatível com bancos de dados reais** (MySQL, MongoDB, etc.).

---

## 🏁 **11. Conclusão**

A **API de Biblioteca** é um sistema completo e funcional que aplica, na prática, os princípios de desenvolvimento backend moderno.
Ela implementa:

* Estrutura **MVC profissional**,
* **Autenticação e autorização seguras**,
* **CRUD completo** em múltiplas entidades,
* **Persistência de dados local**,
* e **fluxos de controle bem definidos**.

O projeto está pronto para ser expandido, integrado com bancos de dados reais ou até mesmo usado como base para um **frontend web ou mobile**.

---

**Autor:** Pedro Gomes
**Disciplina:** Desenvolvimento Web
**Professor:** Diego Cabral
**Ano:** 2025

