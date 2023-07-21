const express = require('express');
const cors = require('cors');
const { connectDB, closeDB } = require('./bd/db');
const routes = require
('./routes/routes');

const app = express();
const port = 3000;

app.use(cors()); // Habilita o CORS
app.use(express.json());

app.use('/', routes);

app.listen(port, async () => {
  await connectDB();
  console.log(`Servidor rodando na porta ${port}`);
});

process.on('SIGINT', async () => {
  await closeDB();
  process.exit(0);
});
