import cors from 'cors'
import 'dotenv/config'
import express, { Express } from 'express'
import { runMongo } from './database/mongo-cnnct'
import routerIndex from './routes/index'
import routerProdutos from './routes/produtos'
import routerUsuarios from './routes/usuarios'

const PORT: string = process.env.PORT || '3000'

const app: Express = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/', routerIndex)
app.use('/usuarios', routerUsuarios)
app.use('/produtos', routerProdutos)

runMongo()

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
