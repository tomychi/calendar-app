const express = require("express"); // es como un import
require("dotenv").config();
const cors = require("cors");
const { dbConnection } = require("./database/config");

// Crear el servidor de express

const app = express();

// Base de datos

dbConnection();

// CORS
app.use(cors());

// directorio publico

app.use(express.static("public")); // siempre que alguien la ejecute

// lectura y parseo del body
app.use(express.json());

// Configuracion de Rutas
app.use("/api/auth", require("./routes/auth")); // todo lo que esta en mi ruta lo habilita en api/auth
app.use("/api/events", require("./routes/events")); // eventos
// TODO: CRUD: Eventos

// Escuchar peticiones
app.listen(process.env.PORT, () => {
  console.log(`Servidor iniciado en el puerto ${process.env.PORT}`);
});
