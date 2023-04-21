import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { registerUser } from '../../services/register'

export const register = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const registerSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
  })

  const { name, email, password } = registerSchema.parse(request.body)

  try {
    await registerUser({ name, email, password })
  } catch (error) {
    return reply.status(409).send()
  }

  return reply.status(201).send({ message: 'User created' })
}
