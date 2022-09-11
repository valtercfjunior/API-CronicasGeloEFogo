const express = require('express')
const abasteceDB = require('./scripts/script')  

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extends: false }))


require('./controllers/authController')(app)

app.listen(3007, () => console.log('Servidor rodando!'))

