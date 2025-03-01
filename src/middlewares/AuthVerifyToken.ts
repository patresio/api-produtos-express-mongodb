import jwt from 'jsonwebtoken'

const verificaToken = (req: any, res: any, next: any) => {
  const headerAuthorization = req.headers['authorization']
  const token = headerAuthorization?.split(' ')[1]
  if (!token) {
    return res.status(401).send()
  }

  jwt.verify(token, process.env.JWT_SECRET as 'Secret', (erro: any) => {
    if (erro) {
      return res.status(403).send()
    }
  })
  next()
}

export default verificaToken
