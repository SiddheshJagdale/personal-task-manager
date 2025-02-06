import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "@/db";
import bcrypt from "bcrypt";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid Credentials");
        }

        const user = await db
          .select()
          .from(users)
          .where(eq(users.email, credentials.email))
          .limit(1)
          .execute();

        if (user.length === 0) {
          throw new Error("Invalid Credentials");
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user[0].passwordHash
        );

        if (!isPasswordValid) {
          throw new Error("Invalid Credentials");
        }

        return { id: user[0].id.toString(), email: user[0].email };
      },
    }),
  ],

  // Custom pages for NextAuth
  // You can uncomment this if you want to specify custom routes for the NextAuth flow
  // pages: {
  //   signIn: "/", // Sign-in page
  //   error: "/signin",
  // },

  // Callbacks to manage JWT token and session
  callbacks: {
    // This is usually not necessary for client-side redirects
    async signIn({  account, user }) {
      try {
        if (account?.provider === "credentials" && user) {
          return true;
        }
        return false;
      } catch (error) {
        console.error("Sign-in error:", error);
        return false;
      }
    },
    async redirect({ baseUrl }) {
      return `${baseUrl}/main`; // Default redirect behavior
    },

    async jwt({ token, user}) {
      // Add user information to the token
      if (user) {
        token.id = user.id;
        token.email = user.email;
        // You can also add other information such as profile or account
      }

      return token;
    },
    async session({ session, token }) {
      // Check if session.user exists, then assign the values
      if (session?.user) {
        // session.user.id  = token.id;
        session.user.email = token.email;
      }

      return session;
    },
  },
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt", // Using JWT for session management
    maxAge: 60 * 60 * 24, // 24 hours session expiration
  },
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET,
    maxAge: 60 * 60 * 24, // 24 hours JWT expiration
  },
  secret: process.env.NEXTAUTH_SECRET,
};

// Handle POST and GET requests for NextAuth
export const POST = NextAuth(authOptions);
export const GET = NextAuth(authOptions);
