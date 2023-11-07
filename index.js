const express = require('express');
const connectDB = require("./database");
const mongoose = require("mongoose");

const { Livro, Pedido, Usuario } = require('./models'); 
const app = express();
app.use(express.json())

const port = 3004;

app.get('/', (req, res) => {
  res.send('Bem-vindo à minha aplicação Express com MongoDB!');
});

app.post('/createLivro', async (req, res) => {
  console.log("body: ", req.body)
  try {
    const { title, description, author, data } = req.body;
    const novoLivro = new Livro({ title, description, author, data });
    await novoLivro.save();
    const livros = await Livro.find();
    res.json(livros);
  } catch (err) {
    console.error('Erro ao criar um livro: ' + err);
    res.status(500).json({ error: 'Erro ao criar um livro' });
  }
});

app.get('/listLivros', async (req, res) => {
  try {
    const livros = await Livro.find();
    res.json(livros);
  } catch (error) {
    console.log('Erro ao buscar livros');
    res.status(500).json({ message: 'Erro ao buscar livros' });
  }
});

app.post('/login', async (req, res) => {
  try {
    const { email, senha } = req.body;
    if (!email || !senha) {
      return res.status(400).json({ message: 'Informe o email e a senha' });
    }
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(401).json({ message: 'Usuário não encontrado' });
    }
    if (usuario.senha !== senha) {
      return res.status(401).json({ message: 'Senha incorreta' });
    }
    res.json({ message: 'Login bem-sucedido' });

  } catch (error) {
    console.error('Erro ao fazer login: ' + error);
    res.status(500).json({ error: 'Erro ao fazer login' });
  }
});

app.listen(port, async () => {
  try {
    await connectDB();
    console.log(`Servidor Express rodando na porta ${port}`);    
  } catch (error) {
    console.log(error);
  }
});
