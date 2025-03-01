import express from 'express'
import {
  getAll,
  login,
  register
} from '../../repositories//usuarios.repository'

const router = express.Router()

router.route('/').get(getAll).post(login)
router.post('/register', register)

export default router
