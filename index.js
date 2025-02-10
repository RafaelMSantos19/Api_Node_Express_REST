const express = require('express');
const app = express();
const port = 3090;

// Middleware para parsear JSON
app.use(express.json());

// Rota GET simples
app.get('/', (req, res) => {
  res.send('Olá, mundo!');
});

// Rota POST exemplo
app.post('/dados', (req, res) => {
  const dados = req.body;
  res.json({ mensagem: 'Dados recebidos!', dados });
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`API rodando em http://localhost:${port}`);
});