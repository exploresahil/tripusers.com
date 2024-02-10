import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/studio",
    "/auth",
    "/contact",
    "/about",
    /^\/international\/.*/,
    "/international",
    /^\/domestic\/.*/,
    "/domestic",
    /^\/wild-life\/.*/,
    "/wild-life",
    /^\/special\/.*/,
    "/special",
    /^\/privacy-policy\/.*/,
    "/privacy-policy",
  ],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
