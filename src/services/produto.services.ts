import { ProdutosRepository } from '../repositories/produtos.repository'

export class ProdutoService {
  constructor(private readonly produtoRepository: ProdutosRepository) {}
}
