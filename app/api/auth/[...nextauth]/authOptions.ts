import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET, // Add the secret here
  providers: [
    {
      id: "descope",
      name: "Descope",
      type: "oauth",
      wellKnown: `https://api.descope.com/P2ql9rZDt2Rfxwjx1W54jRSiRAid/.well-known/openid-configuration`,
      authorization: { params: { scope: "openid email profile" } },
      idToken: true,
      clientId: "P2ql9rZDt2Rfxwjx1W54jRSiRAid",
      clientSecret: process.env.DESCOPE_CLIENT_SECRET,
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
  debug: process.env.NODE_ENV === "development", // Enable debug mode in development
};

export default authOptions;
