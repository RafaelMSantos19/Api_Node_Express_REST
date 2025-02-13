require('dotenv').config();


const express = require('express')
const appRoutes = require("./routers")

const app = express()

app.use(express.json());

appRoutes(app)


// Iniciar o servidor
app.listen(process.env.NODE_PORT, () => {
  console.log(`API rodando em http://localhost:${process.env.NODE_PORT}`);
});