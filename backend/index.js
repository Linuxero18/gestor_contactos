const contactosRoutes = require('./routes/contactosRoutes');
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('¡Backend funcionando!');
});

// Rutas de contactos
app.use('/api/contactos', contactosRoutes);

// Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
