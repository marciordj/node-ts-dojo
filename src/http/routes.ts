import { FastifyInstance } from 'fastify'
import { register } from './controller/register.controller'

export const appRoutes = async (app: FastifyInstance) => {
  app.post('/users', register)
}
