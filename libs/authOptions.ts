import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { SupabaseAdapter } from "@next-auth/supabase-adapter";
import bcrypt from "bcrypt";
import { db } from "@/db/index";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

// Initialize Supabase Client

export const authOptions: NextAuthOptions = {
  providers: [
    // 🟢 Credentials Provider (Email & Password Auth)
    CredentialsProvider({
      name: "Credentials",
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

        return { id: user[0].id, email: user[0].email };
      },
    }),
  ],

  // 🟢 Supabase Adapter for OAuth & Session Management
  adapter: SupabaseAdapter({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    secret: process.env.SUPABASE_SERVICE_ROLE_KEY!,
  }),

  session: { strategy: "jwt" },

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
        token.name = user.name;
        token.email = user.email;
        token.picture = user.image;
      }
      return token;
    },

    async session({ session, token }) {
      if (session?.user) {
        session.user.name = token.name;
        session.user.email = token.email;
      }
      return session;
    },
  },

  debug: process.env.NODE_ENV === "development",
  secret: process.env.NEXTAUTH_SECRET,
};
