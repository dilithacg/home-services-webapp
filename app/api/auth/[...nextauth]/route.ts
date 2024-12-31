import NextAuth from "next-auth";
import authOptions from "./authOptions";

// Define your NextAuth options

// Export GET and POST methods for NextAuth
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
