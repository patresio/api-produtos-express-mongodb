import { Document, model, Schema } from 'mongoose'
import Id from '../shared/utils/Id'
import Password from '../shared/utils/Password'

interface IUsuario extends Document {
  codigo: string
  nome: string
  email: string
  senha: string
}

const usuarioSchema = new Schema<IUsuario>({
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
  email: {
    type: String,
    required: true,
    unique: true
  },
  senha: {
    type: String,
    required: true
  }
})

usuarioSchema.pre('save', function (next) {
  if (this.isModified('senha')) {
    this.senha = Password.hash(this.senha)
  }
  next()
})

const Usuarios = model<IUsuario>('Usuario', usuarioSchema)

export { IUsuario, Usuarios }
