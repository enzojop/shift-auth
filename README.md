# Shift Auth - API de Autenticação

Este projeto é uma API REST de autenticação desenvolvida para a disciplina de Qualidade de Software. O objetivo principal é demonstrar a implementação de um sistema seguro de cadastro e login, validado por testes de integração automatizados.

## Tecnologias

- Runtime: Node.js
- Framework: Express
- Banco de dados: SQLite3 (SQL puro)
- Segurança: Bcryptjs (hashing de senhas)
- Testes: Jest e Supertest

## Requisitos da Atividade

- [x] Persistência em banco de dados SQLite.
- [x] Cadastro de usuário com e-mail único.
- [x] Armazenamento de senha criptografada (hash).
- [x] Sistema de login com validação de credenciais.
- [x] Testes de integração automatizados (sem mocks).
- [x] Organização do código e documentação.

## Endpoints

- `POST /register`: Cria um novo usuário.
- `POST /login`: Autentica um usuário e retorna sucesso ou falha.

## Como Executar

Instalar dependências:

```bash
npm install
```

Iniciar o servidor:

```bash
npm start
```

O servidor rodará em http://localhost:3000 e o banco database.sqlite será criado automaticamente.

## Testes Automatizados

Os testes cobrem cenários de sucesso e erro (e-mail duplicado e senha inválida), garantindo a integridade das regras de negócio.

Para rodar a suíte de testes:

```bash
npm test
```

Desenvolvido por: Enzo José Oliveira Pereira