import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import type mongoose from 'mongoose'
import Usuarios from '../models/usuarios-schema.model'
import generateToken from '../shared/utils/GenerateToken'

// @Desc Get all usuarios
// @Route /api/auth
// @Method GET
export const getAll = asyncHandler(async (req: Request, res: Response) => {
  const usuarios = await Usuarios.find({}).select('-password')
  res.status(201).json({ success: true, count: usuarios.length, usuarios })
})

// @Desc Login
// @Route /api/auth/
// @Method POST
export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body
  const usuario = await Usuarios.findOne({ email })

  if (!usuario) {
    res.status(401)
    throw new Error('usuario not found')
  }

  if (await usuario.comparePassword(password)) {
    res.status(201).json({
      success: true,
      usuario: {
        id: (usuario._id as mongoose.Types.ObjectId).toString(),
        email: usuario.email,
        fullName: usuario.fullName,
        token: generateToken(
          (usuario._id as mongoose.Types.ObjectId).toString()
        )
      }
    })
  } else {
    res.status(401)
    throw new Error('Email or password incorrect')
  }
})

// @Desc Register
// @Route /api/auth/register
// @Method POST
export const register = asyncHandler(async (req: Request, res: Response) => {
  const { email, fullName, password } = req.body

  const usuario = new Usuarios({
    email,
    fullName,
    password
  })

  await usuario.save()

  res.status(201).json({
    success: true,
    usuario: {
      email: usuario.email,
      fullName: usuario.fullName,
      token: generateToken((usuario._id as mongoose.Types.ObjectId).toString())
    }
  })
})
