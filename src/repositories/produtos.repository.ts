import type { Model } from 'mongoose'
import type { IProduto } from '../models/produtos-schema.model'

class ProdutosRepository {
  constructor(private readonly produtos: Model<IProduto>) {}

  async findAll(): Promise<IProduto[]> {
    return this.produtos.find()
  }

  async create(produto: IProduto): Promise<IProduto> {
    return this.produtos.create(produto)
  }
}

export { ProdutosRepository }
