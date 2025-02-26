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

export default router
