import { Router } from 'express'

const router = Router()

router.get('/', async (_req, res) => {
  res.status(200).send('Hello World!')
})

router.get('/ping', async (_req, res) => {
  res.status(200).send('pong')
})

export default router
