const express = require('express')
const server = express()
const routes = require('./routes')
const path = require('path')

//Definindo a pasta de arquivos EJS, NÃO ESTA FUNCIONANDO -- PESQUISAR COMO RESOLVER
server.set('views', path.join(__dirname, 'views'))

//Definindo o processamento do HTML para contexto
server.set('view engine', 'ejs')

//Definindo a pasta com os arquivos publicos
server.use(express.static('public'))

//usar o req.body
server.use(express.urlencoded({ extended: true }))

//import das rotas
server.use(routes)


server.listen(3000, () => console.log('Server started.'))