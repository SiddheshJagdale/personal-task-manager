import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "@/db/index";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";

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

  callbacks: {
    async signIn({ account, user }) {
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
      return `${baseUrl}/main`;
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.email = token.email;
      }
      return session;
    },
  },
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24,
  },
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET,
    maxAge: 60 * 60 * 24,
  },
  secret: process.env.NEXTAUTH_SECRET,
};
