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

  async update(produto: IProduto): Promise<IProduto> {
    const { nome, preco } = produto
    await this.produtos.updateOne(
      { codigo: produto.codigo },
      { $set: { nome, preco } }
    )
    const updateProduto = (await this.produtos.findOne({
      codigo: produto.codigo
    })) as IProduto
    return updateProduto
  }

  async delete(codigo: string): Promise<void> {
    await this.produtos.deleteOne({ codigo })
  }
}

export { ProdutosRepository }
