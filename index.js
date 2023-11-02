const express = require('express');
const connectDB = require("./database");
const mongoose = require("mongoose");

const Item = require('./models')
const app = express();

const port = 3000;

// Defina uma rota básica
app.get('/', (req, res) => {
  res.send('Bem-vindo à minha aplicação Express com MongoDB!');
});

app.get('/createBook', async (req, res) => {
  try {
    // const Item = mongoose.model('Item'); // Importe o modelo de dados (se necessário)
    const novo = new Item({name: "livro", description: "fantasia"});
    await novo.save()
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    console.error('Erro ao buscar itens: ' + err);
    res.status(500).json({ error: 'Erro ao buscar itens' });
  }
})

app.get("/showlist", async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items)
  } catch (error) {
    console.log("dont show this itens")
    res.status(400).json({message: "dont show itens"})
  }
})

// Inicie o servidor Express
app.listen(port, async () => {
  try {
    await connectDB();
    console.log(`Servidor Express rodando na porta ${port}`);    
  } catch (error) {
    console.log(error);
  }
});
