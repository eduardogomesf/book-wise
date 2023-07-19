import NextAuth, { NextAuthOptions } from 'next-auth'
import GithubProvider, { GithubProfile } from 'next-auth/providers/github'
import { PrismaAdapter } from '../../../lib/prisma-adapter'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? '',
      profile(profile: GithubProfile) {
        return {
          id: profile.id,
          name: profile.name!,
          email: profile.email!,
          avatar_url: profile.avatar_url,
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      return {
        ...session,
        user,
      }
    },
  },

}

export default NextAuth(authOptions)
