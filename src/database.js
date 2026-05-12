const sqlite3 = require('sqlite3').verbose(); // Importa o módulo sqlite3 para trabalhar com o banco de dados SQLite
const path = require('path'); // Para resolver o caminho do arquivo do banco de dados

// Cria ou abre o arquivo do banco de dados
const db = new sqlite3.Database(path.resolve(__dirname, 'database.sqlite'), (err) => {
  if (err) console.error("Erro ao abrir banco:", err.message);
  else console.log("Conectado ao SQLite.");
});

// Cria a tabela de usuários se ela não existir
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    )
  `);
});

module.exports = db; // Exporta a instância do banco de dados para ser usada em outros arquivos do projeto