import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/api/auth/signin", // Redirects here if unauthenticated
  },
});

export const config = {
  matcher: ["/admin/:path*"], // Protects all /admin routes
};
