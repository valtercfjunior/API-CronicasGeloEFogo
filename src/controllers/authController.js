const express = require('express')

const Books = require('../models/books')
const Characters = require('../models/characters')

const router = express.Router()

router.get('/', async(req, res) => {
    return res.send('/books para listar os livros.   /characters para listar os personagens')
})

router.get('/books', async (req, res) => {
    const books = await Books.find()
    return res.send({books})
}) 

router.get('/characters', async (req, res) => {
    const characters = await Characters.find()
    return res.send({characters})
}) 

router.get('/characters/:id', async (req, res) => {
    const characters = await Characters.findById(req.params.id)
    return res.send({characters})
})
router.get('/books/:id', async (req, res) => {
    const books = await Books.findById(req.params.id)
    return res.send({books})
})

router.post('/*', (req, res) => res.status(404).send('Nao existem rotas de POST para esta API'))

 


module.exports = app => app.use('/', router)