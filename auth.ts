import { AuthOptions, getServerSession } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "./generated/prisma/client";
import { prisma } from "./lib/prisma";

const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  debug: true,
  logger: {
    /* error(code, metadata) {
      console.error("🔴 NEXT-AUTH ERROR:", { code, metadata });
    },
    warn(code) {
      console.warn("🟡 NEXT-AUTH WARN:", code);
    },
    debug(code, metadata) {
      console.log("🔵 NEXT-AUTH DEBUG:", { code, metadata });
    }, */
  },
  secret: process.env.AUTH_SECRET,
  events: {
    /* async createUser({ user }) {
      console.log("✅ Usuario creado:", user);
    },
    async linkAccount({ user, account }) {
      console.log("🔗 Cuenta enlazada:", user, account.provider);
    },
    async signOut({}) {
      console.log("🔗 Cuenta out");
    }, */
  },
  callbacks: {
    async jwt({ token, account }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, user }: any) {
      if (session?.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        //secure: false, // ← FALSE en desarrollo (localhost)
        maxAge: 30 * 24 * 60 * 60, // 30 días
      },
    },
  },
};

export { authOptions };
