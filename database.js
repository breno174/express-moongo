const mongoose = require("mongoose");

async function connectToDatabase() {
  try {
    const URI = "mongodb+srv://brenodev:brenodev@cluster0.4xnnur0.mongodb.net/?retryWrites=true&w=majority"
    await mongoose.connect(URI, {
    });
    console.log('Conexão com o banco de dados estabelecida');
  } catch (err) {
    console.error('Erro ao conectar ao banco de dados: ' + err);
  }
}

module.exports = connectToDatabase;
