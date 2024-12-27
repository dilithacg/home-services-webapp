import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";

// Define your NextAuth options
export const authOptions: NextAuthOptions = {
  providers: [
    {
      id: "descope",
      name: "Descope",
      type: "oauth",
      wellKnown: `https://api.descope.com/P2ql9rZDt2Rfxwjx1W54jRSiRAid/.well-known/openid-configuration`,
      authorization: { params: { scope: "openid email profile" } },
      idToken: true,
      clientId: "P2ql9rZDt2Rfxwjx1W54jRSiRAid",
      clientSecret: "<Descope Access Key>", // Replace with actual secret
      checks: ["pkce", "state"],
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        };
      },
    },
  ],
};

// Export GET and POST methods for NextAuth
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
