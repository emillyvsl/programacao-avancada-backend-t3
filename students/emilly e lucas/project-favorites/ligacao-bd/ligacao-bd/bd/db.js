const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://emilly:emilly@api.kl0nyec.mongodb.net/?retryWrites=true&w=majority'; // Atualize com a sua string de conexão do MongoDB
const client = new MongoClient(uri);

const connectDB = async () => {
  try {
    await client.connect();
    console.log('Conexão com o banco de dados estabelecida');
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
  }
};

const closeDB = async () => {
  try {
    await client.close();
    console.log('Conexão com o banco de dados encerrada');
  } catch (error) {
    console.error('Erro ao encerrar a conexão com o banco de dados:', error);
  }
};

module.exports = { client, connectDB, closeDB };
