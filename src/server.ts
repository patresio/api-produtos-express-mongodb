import 'dotenv/config'
import express, { Express } from 'express'
import { runMongo } from './database/mongo-cnnct'
import routerIndex from './routes/index'
import routerProdutos from './routes/produtos'

const PORT: string = process.env.PORT || '3000'

const app: Express = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/', routerIndex)
app.use('/produtos', routerProdutos)

runMongo()

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
