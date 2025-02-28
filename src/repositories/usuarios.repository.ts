import type { Model } from 'mongoose'
import type { IUsuario } from '../models/usuarios-schema.model'

class UsuarioRepository {
  constructor(private readonly usuarios: Model<IUsuario>) {}

  async create(usuario: IUsuario): Promise<IUsuario> {
    return this.usuarios.create(usuario)
  }

  async update(user: IUsuario): Promise<IUsuario> {
    const updatedUser = await this.usuarios.findOneAndUpdate(
      { codigo: user.codigo },
      user,
      { new: true }
    );
    if (!updatedUser) {
      throw new Error('User not found');
    }
    return updatedUser;
  }
}

export { UsuarioRepository }
