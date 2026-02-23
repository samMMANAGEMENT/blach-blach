import NextAuth from "next-auth";
import type { NextAuthConfig } from "next-auth";

export const authConfig = {
    providers: [], // Empty array for middleware compatibility
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isAuthPage = nextUrl.pathname.startsWith("/admin/login");
            const isAdminPage = nextUrl.pathname.startsWith("/admin");

            if (isAdminPage && !isAuthPage && !isLoggedIn) {
                return false; // Redirect to login
            }

            if (isAuthPage && isLoggedIn) {
                return Response.redirect(new URL("/admin/dashboard", nextUrl));
            }

            return true;
        },
        async jwt({ token, user }) {
            if (user) {
                token.role = (user as any).role;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                (session.user as any).role = token.role;
            }
            return session;
        },
    },
    pages: {
        signIn: "/admin/login",
    },
} satisfies NextAuthConfig;
