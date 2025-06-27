// lib/authOptions.ts
import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const { email, password } = credentials ?? {};

        // Dummy validation — replace this with real DB logic
        if (email === 'test@example.com' && password === 'password') {
          return {
            id: '1',
            name: 'Test User',
            email: email, // ✅ always string, not null
          };
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.user = user;
      return token;
    },
    async session({ session, token }) {
      if (token?.user) {
        session.user = token.user as typeof session.user;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
