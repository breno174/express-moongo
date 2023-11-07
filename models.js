const mongoose = require('mongoose');

const LivroSchema = new mongoose.Schema({
  title: String,
  description: String,
  author: String,
  data: Date
});

const PedidoSchema = new mongoose.Schema({
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
  },
  livro: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Livro',
  },
  dataPedido: Date,
  status: String,
});

const UsuarioSchema = new mongoose.Schema({
  nome: String,
  email: String,
  senha: String,
  dataCadastro: Date,
});

const Livro = mongoose.model('Livro', LivroSchema);
const Pedido = mongoose.model('Pedido', PedidoSchema);
const Usuario = mongoose.model('Usuario', UsuarioSchema);

module.exports = {
  Livro,
  Pedido,
  Usuario,
};