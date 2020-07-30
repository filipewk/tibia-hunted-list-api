import setupMiddlewares from './middlewares'
import express from 'express'

const app = express()
app.disable('x-powered-by')
setupMiddlewares(app)

export default app
