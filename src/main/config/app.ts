import setupMiddlewares from './middlewares'
import setupRoutes from './routes'
import express from 'express'

const app = express()
app.disable('x-powered-by')
setupMiddlewares(app)
setupRoutes(app)

export default app
