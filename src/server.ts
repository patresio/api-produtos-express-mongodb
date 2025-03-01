import cors from 'cors'
import 'dotenv/config'
import express, { Express, RequestHandler } from 'express'
import runMongo from './database/mongo-cnnct'
import { errorHandler, notFound } from './middlewares/ErrorMiddlewares'
import routerProdutos from './routes/produtos'
import routerUsuarios from './routes/usuarios'
// Configurações
import autenticacao from './middlewares/AuthVerifyToken'

const PORT: string = process.env.PORT || '5000'

const app: Express = express()

runMongo()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Default
const handler: RequestHandler = (req, res, next) => {
  res.status(201).json({ message: 'Welcome to Auth ts' })
  next()
}

app.get('/api', handler)

// Routes
app.use('/api/auth', routerUsuarios)
app.use('/api/produtos', autenticacao, routerProdutos)

// Error handler
app.use(notFound)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
