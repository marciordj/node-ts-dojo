import { hash } from 'bcrypt'
import { prisma } from '../lib/prisma'
import { PrismaUsersRepository } from '../repository/prisma-users-repository'

interface IRegisterUser {
  name: string
  email: string
  password: string
}

export const registerUser = async ({
  name,
  email,
  password,
}: IRegisterUser) => {
  const password_hash = await hash(password, 10)

  const userWithSameEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (userWithSameEmail) {
    throw new Error('E-mail already exist')
  }

  const prismaUserRepository = new PrismaUsersRepository()

  await prismaUserRepository.create({ name, email, password_hash })
}
