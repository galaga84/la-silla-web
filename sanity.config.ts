"use client";

import {defineConfig} from "sanity";
import {structureTool} from "sanity/structure";
import {visionTool} from "@sanity/vision";
import {schemaTypes} from "./sanity/schemaTypes";
import {apiVersion, dataset, projectId} from "./sanity/env";
import {structure} from "./sanity/structure";

export default defineConfig({
  name: "default",
  title: "La Silla Studio",
  projectId,
  dataset,
  basePath: "/studio",
  plugins: [structureTool({structure}), visionTool()],
  schema: {
    types: schemaTypes,
  },
  apiVersion,
});