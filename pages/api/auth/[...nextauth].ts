import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { sha256 } from "@/app/lib/crypto";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.id_token = account.id_token;
        token.provider = account.provider;
      }
      return token;
    },

    async session({ session, token }) {
      const bearerSecret: string = process.env.BEARER_SECRET ?? "";
      const email: string = session?.user?.email as string;

      session.accessToken = await sha256(email + bearerSecret);
      return session;
    },
  },
});
