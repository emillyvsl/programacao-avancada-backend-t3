const express = require('express');
const { client } = require('./bd/db');;

const router = express.Router();

router.post('/add', async (req, res) => {
  const { name, url } = req.body;
  if (!name || !url) {
    return res.status(400).json({ error: 'Nome e URL são obrigatórios' });
  }

  try {
    await client.connect();
    const database = client.db('meusLinks');
    const collection = database.collection('urls');
    const result = await collection.insertOne({ name, url });
    res.status(200).json({ message: 'URL adicionada com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao adicionar a URL' });
  } finally {
    await client.close();
  }
});

router.put('/update', async (req, res) => {
  const { name, url, update } = req.body;
  if (!update) {
    return res.status(400).json({ error: 'URL a ser atualizada é obrigatória' });
  }

  try {
    await client.connect();
    const database = client.db('meusLinks');
    const collection = database.collection('urls');
    const result = await collection.updateOne(
      { url: update },
      { $set: { name, url } }
    );
    if (result.modifiedCount > 0) {
      res.status(200).json({ message: 'URL atualizada com sucesso' });
    } else {
      res.status(404).json({ error: 'URL não encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar a URL' });
  } finally {
    await client.close();
  }
});

router.delete('/delete', async (req, res) => {
  const { url } = req.body;
  if (!url) {
    return res.status(400).json({ error: 'URL a ser deletada é obrigatória' });
  }

  try {
    await client.connect();
    const database = client.db('meusLinks');
    const collection = database.collection('urls');
    const result = await collection.deleteOne({ url });
    if (result.deletedCount > 0) {
      res.status(200).json({ message: 'URL deletada com sucesso' });
    } else {
      res.status(404).json({ error: 'URL não encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar a URL' });
  } finally {
    await client.close();
  }
});

router.get('/urls', async (req, res) => {
  try {
    await client.connect();
    const database = client.db('meusLinks');
    const collection = database.collection('urls');
    const urls = await collection.find().toArray();
    res.status(200).json(urls);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar as URLs' });
  } finally {
    await client.close();
  }
});

module.exports = router;
