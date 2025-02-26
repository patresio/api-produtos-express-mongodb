// Importe as funcionalidades necessárias do Mongoose
import { Document, model, Schema } from 'mongoose'
import Id from '../shared/utils/Id'

interface IProduto extends Document {
  codigo: string
  nome: string
  preco: number
}

const produtoSchema = new Schema<IProduto>({
  codigo: {
    type: String,
    required: true,
    unique: true,
    default: () => Id.novo()
  },
  nome: {
    type: String,
    required: true
  },
  preco: {
    type: Number,
    required: true
  }
})

const Produtos = model<IProduto>('Produto', produtoSchema)

export { IProduto, Produtos }
