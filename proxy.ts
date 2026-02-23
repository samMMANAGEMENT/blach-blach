import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";

const { auth } = NextAuth(authConfig);
export { auth as proxy };
export default auth;

export const config = {
    matcher: [
        "/admin/:path*",
        "/api/admin/:path*",
        "/((?!api/auth|_next/static|_next/image|favicon.ico).*)"
    ],
};
