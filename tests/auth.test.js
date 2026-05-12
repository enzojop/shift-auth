const request = require('supertest');
const app = require('../src/server');
const db = require('../src/database');

describe('Testes de Integração - Autenticação', () => {
  
 
  //  Limpar a tabela usuários, isso garante que um teste não interfira no outro
  beforeAll((done) => {
    db.run("DELETE FROM users", done);
  });

  // Cenário 1: Cadastro com Sucesso
  test('Deve cadastrar um novo usuário com sucesso', async () => {
    const response = await request(app)
      .post('/register')
      .send({
        name: "Teste Automatizado",
        email: "teste@automatizado.com",
        password: "123"
      });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('message', 'Usuário criado com sucesso!');
  });

  // Cenário 2: Erro e-mail duplicado
  test('Não deve cadastrar usuário com e-mail repetido', async () => {
    const response = await request(app)
      .post('/register')
      .send({
        name: "Outro Nome",
        email: "teste@automatizado.com", // Mesmo e-mail do teste anterior
        password: "456"
      });

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe("E-mail já cadastrado.");
  });

  // Cenário 3: Login com Sucesso
  test('Deve realizar login com credenciais válidas', async () => {
    const response = await request(app)
      .post('/login')
      .send({
        email: "teste@automatizado.com",
        password: "123"
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("Login realizado com sucesso!");
  });

  // Cenário 4: Login com Senha Errada
  test('Não deve permitir login com senha incorreta', async () => {
    const response = await request(app)
      .post('/login')
      .send({
        email: "teste@automatizado.com",
        password: "senha_errada"
      });

    expect(response.statusCode).toBe(401);
  });
});