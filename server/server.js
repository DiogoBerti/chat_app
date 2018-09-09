// Biblioteca que faz o gerenciamento do paths do sistema
const path = require('path');

const express = require('express');
var app = express();
// usando o join, podemos juntar os valores para chegar nos locais...
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
// Setando o public para o express
app.use(express.static(publicPath));

app.listen(port, () => {
  console.log(`Started up at port ${port}`);
});