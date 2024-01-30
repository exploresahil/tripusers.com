import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import schemas from "@/src/sanity/schemas";
import { visionTool } from "@sanity/vision";
import { unsplashImageAsset } from "sanity-plugin-asset-source-unsplash";

const config = defineConfig({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
  dataset: "production",
  title: "tripusers.com",
  apiVersion: "2024-01-24",
  basePath: "/studio",

  plugins: [structureTool(), visionTool(), unsplashImageAsset()],
  schema: { types: schemas },
  useCdn: false,
});

export default config;
