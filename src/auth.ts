/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import connectDb from './lib/db'
import User from './models/user.model'
import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: 'email', type: 'email' },
        password: { label: 'password', type: 'password' },
      },
      async authorize(credentials, request) {
        await connectDb()
        const email = credentials.email
        const password = credentials.password as string
        const user = await User.findOne({ email })
        //if email did not found and use did not exist return an error
        if (!user) {
          throw new Error('User not exist')
        }
        const isMatch = bcrypt.compare(password, user.hashedPassword) // hashed password always come from usermodel
        if (!isMatch) {
          throw new Error('password incorrect')
        }
        return {
          id: user._id,
          email: user.email,
          name: user.name,
          role: user.role,
        }
      },
    }),
  ],
  // give user data in token
  // give token data in session
  callbacks: {
    // tokem automaticaly generate hota sign in karne par
    // token ke andare user ka data daalna h or use session me daalna h
    jwt({ token, user }) {
      if (user) {
        token.id = user.id.toString()
        token.name = user.name
        token.email = user.email
        token.role = user.role
      }
      return token
    },
    // in session we have session.user and in this we have user data 
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.name = token.name as string
        session.user.email = token.email as string
        session.user.role = token.role as string
      }
      return session
    }
  },
  // pages login and error aane par kis page pe send karna h
  pages:{
    signIn:"/login",
    error:"/login"
    },
    session:{
      strategy:'jwt',
      maxAge:10*24*60*60*1000,
    },
    // secret helps in generate to token
    secret:process.env.AUTH_SECRET,
})

// steps of this global
//1 creadentials , credentaials = email,password, then authorize in this what we want do with name and emial
//2 callbacks = me function hote h jo call hote h job sign in hote h



// 1
// prviders like = google , credentials from next auth
// Creadentials is a function  and it have object
//in Creadentials we have creadentials like name and email which we are using to login

// 2
// authorize is a function is like what we want to do with this email and password in ths credentials
// like check email and match the password

// callbacks jo chije ham karana chahte h sign in hone par
//jese token me deta daalnan  , token se session me data daalna , useSession se use use kar lena/

// pages me login karne pe kis page pe jaay = like login page

// their are 2 types of session data and jwt
//session type hamara jwt hoga
