import NextAuth, { type DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import prisma from "./prisma";
import { loginSchema } from "../schemas/auth.schema";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      businessName?: string | null;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    businessName?: string | null;
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      name: "Credenciales",
      credentials: {
        email: { label: "Correo", type: "email" },
        password: { label: "Contraseña", type: "password" },
      },
      async authorize(credentials) {
        const parsed = loginSchema.safeParse(credentials);
        if (!parsed.success) {
          return null;
        }

        const { email, password } = parsed.data;

        const user = await prisma.user.findUnique({
          where: { email: email.toLowerCase() },
        });

        if (!user || !user.passwordHash) {
          return null;
        }

        const isValid = await bcrypt.compare(password, user.passwordHash);
        if (!isValid) {
          return null;
        }

        return {
          id: user.id,
          name: user.fullName,
          email: user.email,
          businessName: user.businessName,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.businessName = user.businessName;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.businessName = (token.businessName as string) || null;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET,
});

/**
 * Helper de seguridad en el servidor:
 * Obtiene el usuario autenticado desde la sesión criptográfica de Auth.js.
 * Lanza un error si no hay una sesión activa, garantizando aislamiento estricto.
 */
export async function requireAuthUser() {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Acceso no autorizado: Por favor inicia sesión.");
  }
  return session.user;
}

