import { Router } from 'express'
import { Usuarios, type IUsuario } from '../../models/usuarios-schema.model'
import { UsuarioRepository } from '../../repositories/usuarios.repository'

const repo = new UsuarioRepository(Usuarios)
const router = Router()

router.post('/', async (req, res) => {
  const { nome, email, senha } = req.body
  await repo.create({ nome, email, senha } as IUsuario)
  res.status(201).send()
})

router.post('/:codigo', async (req, res) => {
  const { nome, senha } = req.body
  const usuario = await repo.update({
    codigo: req.params.codigo,
    nome,
    senha
  } as IUsuario)
  res.status(200).json(`Alterado: ${usuario.nome}`)
})

export default router
