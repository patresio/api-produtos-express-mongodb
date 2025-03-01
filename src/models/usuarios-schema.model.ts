import bcrypt from 'bcrypt'
import mongoose from 'mongoose'

export interface IUsuario extends mongoose.Document {
  email: string
  fullName: string
  password: string
  token?: string
  createdAt: Date
  updatedAt: Date
  comparePassword(password: string): Promise<boolean>
}

const UsuarioSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true
    },

    fullName: {
      type: String,
      required: true
    },

    password: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
)

UsuarioSchema.pre('save', async function (this: IUsuario, next) {
  const usuario = this as IUsuario

  if (!usuario.isModified('password')) return next()

  const salt = bcrypt.genSaltSync(10)
  const hash = bcrypt.hashSync(usuario.password, salt)

  usuario.password = hash

  return next()
})

UsuarioSchema.methods.comparePassword = async function (password: string) {
  const usuario = this as IUsuario
  return bcrypt.compareSync(password, usuario.password)
}

const Usuario = mongoose.model<IUsuario>('Usuario', UsuarioSchema)

export default Usuario
