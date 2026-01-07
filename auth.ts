import { AuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials"
import { prisma } from "./lib/prisma";

const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    CredentialsProvider({
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
        const res = await fetch("/your/endpoint", {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" }
        })
        const user = await res.json()
  
        // If no error and we have user data, return it
        if (res.ok && user) {
          return user
        }
        // Return null if user data could not be retrieved
        return null
      }
    })
    
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
