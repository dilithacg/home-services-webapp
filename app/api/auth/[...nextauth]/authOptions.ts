import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    {
      id: "descope",
      name: "Descope",
      type: "oauth",
      issuer: "https://api.descope.com/P2ql9rZDt2Rfxwjx1W54jRSiRAid",
      wellKnown: `https://api.descope.com/P2ql9rZDt2Rfxwjx1W54jRSiRAid/.well-known/openid-configuration`,
      authorization: {
        params: {
          response_type: "code", // Ensure the response type is "code"
          scope: "openid email profile", // Add or modify scopes as needed
        },
      },
      idToken: true,
      clientId: "P2ql9rZDt2Rfxwjx1W54jRSiRAid",
      clientSecret: process.env.DESCOPE_CLIENT_SECRET,
      checks: ["pkce", "state"], // PKCE and state checks for security
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
  callbacks: {
    async signIn({ account, profile }) {
      if (account && profile) {
        // Optionally log the profile or account data for debugging
        console.log("Sign-in profile:", profile);
      }
      return true;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl; // Redirect to the home page or a custom URL
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken; // Include access token in session
      return session;
    },
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
  },
  debug: true, // Enable debugging for detailed logs
};
export default authOptions;
