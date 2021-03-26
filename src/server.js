const express = require('express')
const server = express()
const routes = require('./routes')

//Definindo o processamento do HTML para contexto
server.set('view engine', 'ejs')

//Definindo a pasta com os arquivos publicos
server.use(express.static('public'))
server.use(routes)

server.listen(3000, () => console.log('Server iniciado.'))