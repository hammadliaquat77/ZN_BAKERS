
// import NextAuth from 'next-auth'
// import CredentialsProvider from 'next-auth/providers/credentials'
// import connectDB from '@/lib/mongodb'
// import User from '@/models/User'

// export const authOptions = {
//   providers: [
//     CredentialsProvider({
//       name: 'credentials',
//       credentials: {
//         email: { label: 'Email', type: 'email' },
//         password: { label: 'Password', type: 'password' },
//       },
//       async authorize(credentials) {
//         await connectDB()
//         const user = await User.findOne({ email: credentials.email })
//         if (!user) throw new Error('No user found with this email')
//         const isValid = await user.comparePassword(credentials.password)
//         if (!isValid) throw new Error('Invalid password')
//         // Return **all fields needed in session**
//         return {
//           id: user._id.toString(),
//           name: user.name,
//           email: user.email,
//           role: user.role,
//           phone: user.phone
//         }
//       },
//     }),
//   ],
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id
//         token.role = user.role
//         token.name = user.name
//         token.phone = user.phone
//       }
//       return token
//     },
//     async session({ session, token }) {
//       if (token) {
//         session.user.id = token.id
//         session.user.role = token.role
//         session.user.name = token.name
//         session.user.phone = token.phone
//       }
//       return session
//     },
//   },
//   pages: {
//     signIn: '/login',
//     error: '/login',
//   },
//   session: { strategy: 'jwt' },
//   secret: process.env.NEXTAUTH_SECRET,
// }

// const handler = NextAuth(authOptions)
// export { handler as GET, handler as POST }









import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import connectDB from '@/lib/mongodb'
import User from '@/models/User'

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        await connectDB()
        const user = await User.findOne({ email: credentials.email })
        if (!user) throw new Error('No user found with this email')
        const isValid = await user.comparePassword(credentials.password)
        if (!isValid) throw new Error('Invalid password')
        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
          phone: user.phone
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = user.role
        token.name = user.name
        token.phone = user.phone
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id
        session.user.role = token.role
        session.user.name = token.name
        session.user.phone = token.phone
      }
      return session
    },
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  session: { strategy: 'jwt' },
  secret: process.env.NEXTAUTH_SECRET,
}

// ← Sirf handler export karo — authOptions nahi
const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
