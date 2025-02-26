import { Router } from 'express'
import { IProduto, Produtos } from '../../models/produtos-schema.model'
import { ProdutosRepository } from '../../repositories/produtos.repository'

const repo = new ProdutosRepository(Produtos)
const router = Router()

router.get('/', async (req, res) => {
  const produtos = await repo.findAll()
  res.json(produtos)
})

router.post('/', async (req, res) => {
  const { nome, preco, codigo } = req.body
  await repo.create({ nome, preco, codigo } as IProduto)
  res.status(201).send()
})

router.put('/:codigo', async (req, res) => {
  const { nome, preco } = req.body
  const { codigo } = req.params
  if (!codigo) {
    res.status(204).send()
  }
  const produto = await repo.update({
    nome,
    preco,
    codigo
  } as IProduto)
  res.status(200).send(produto)
})

router.delete('/:codigo', async (req, res) => {
  const { codigo } = req.params
  if (!codigo) {
    res.status(204).send()
  }
  await repo.delete(codigo)
  res.status(200).send()
})

export default router
