import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { prisma } from '../../../lib/prisma'
import bcrypt from 'bcryptjs'

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        console.log('Authorizing user with email:', credentials.email)
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        })
        if (user) {
          console.log('User found:', user.email)
        } else {
          console.log('User not found')
        }
        if (user && bcrypt.compareSync(credentials.password, user.password)) {
          console.log('Password matches for user:', user.email)
          return user
        }
        console.log('Authorization failed for user:', credentials.email)
        return null
      }
    })
  ],
  pages: {
    signIn: '/login',
  }
})