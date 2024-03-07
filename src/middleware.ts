import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: [
    "/",
    /^\/studio\/.*/,
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
    /^\/testimonials\/.*/,
    "/testimonials",
    /^\/privacy-policy\/.*/,
    "/privacy-policy",
    /^\/terms-&-conditions\/.*/,
    "/terms-&-conditions",
    "/api",
    /^\/api\/.*/,
  ],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/"],
};
