const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 5000; 

// Middleware
app.use(cors());
app.use(express.json());

// Conexión a la base de datos
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', 
  password: 'Micontraseña', 
  database: 'foro_db' 
});

// Conectar a la base de datos
db.connect((err) => {
  if (err) {
    console.error('Error conectando a la base de datos:', err);
    return;
  }
  console.log('Conectado a la base de datos MySQL');
});

// Endpoint para obtener comentarios
app.get('/comentarios', (req, res) => {
  const sql = 'SELECT * FROM comentarios'; 
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error al obtener comentarios:', err);
      res.status(500).send('Error en la consulta');
      return;
    }
    res.json(result);
  });
});

// Endpoint para agregar un comentario
app.post('/comentario', (req, res) => {
  const { contenido, autor, fecha } = req.body;
  const sql = 'INSERT INTO comentarios (contenido, autor, fecha) VALUES (?, ?, ?)';
  db.query(sql, [contenido, autor, fecha], (err, result) => {
    if (err) {
      console.error('Error al agregar comentario:', err);
      res.status(500).send('Error al agregar comentario');
      return;
    }
    res.status(201).json({ id: result.insertId, contenido, autor, fecha });
  });
});

// Endpoint para eliminar un comentario
app.delete('/comentario/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM comentarios WHERE id = ?';
    
    db.query(sql, [id], (err, result) => {
      if (err) {
        console.error('Error al eliminar comentario:', err);
        res.status(500).send('Error al eliminar comentario');
        return;
      }
      res.status(204).send(); 
    });
  });
  
  
// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor en ejecución en http://localhost:${port}`);
});
