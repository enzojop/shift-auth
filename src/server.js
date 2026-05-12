const express = require('express'); // Importa o framework Express para criar o servidor HTTP
const bcrypt = require('bcryptjs');
const db = require('./database');

const app = express();
app.use(express.json()); // Para o Express entender JSON no corpo da requisição

// Rota de Cadastro
app.post('/register', async (req, res) => {

  const { name, email, password } = req.body;

  //  Criptografar a senha usando bcrypt
  const hashedPassword = await bcrypt.hash(password, 10);

  //  Inserir no banco de dados usando SQL puro
  const sql = `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`;
  
  // O método 'run' do sqlite3 é usado para executar a query de inserção. Ele aceita a query SQL, os parâmetros (name, email, hashedPassword) e uma função de callback para lidar com o resultado.
  db.run(sql, [name, email, hashedPassword], function (err) {
    if (err) {
      if (err.message.includes("UNIQUE constraint failed")) {
        return res.status(400).json({ error: "E-mail já cadastrado." });
      }
      return res.status(500).json({ error: err.message });
    }
    
    res.status(201).json({ id: this.lastID, message: "Usuário criado com sucesso!" });
  });
});


//----------------------------------

  // Rota de Login
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  //  Buscar usuário pelo e-mail
  const sql = `SELECT * FROM users WHERE email = ?`;

  db.get(sql, [email], async (err, user) => {
    if (err) {
      return res.status(500).json({ error: "Erro no banco de dados." });
    }

    //  Verificar se o usuário existe
    if (!user) {
      return res.status(401).json({ error: "E-mail ou senha inválidos." });
    }

    //  Comparar a senha digitada com o hash do banco
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "E-mail ou senha inválidos." });
    }

    //  Sucesso!
    res.status(200).json({ 
      message: "Login realizado com sucesso!",
      user: { id: user.id, name: user.name, email: user.email }
    });
  });
});


// Exportamos o "app" para o Jest poder usar
module.exports = app;

// Só ligamos o servidor se este arquivo for executado diretamente
if (require.main === module) {
  const PORT = 3000;
  app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));
}