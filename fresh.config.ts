/// <reference no-default-lib="true"/>
/// <reference lib="dom" />
/// <reference lib="deno.ns" />
/// <reference lib="esnext" />

import plugins from "deco/plugins/fresh.ts";
import partytownPlugin from "partytown/mod.ts";
import tailwind from "./tailwind.config.ts";

import decoManifest from "./manifest.gen.ts";

import { defineConfig } from "$fresh/server.ts";
export default defineConfig({
  plugins: [
    ...plugins(
      {
        manifest: decoManifest,
        tailwind,
      },
    ),
    partytownPlugin({
      proxyUrl: "/proxy",
      mainWindowAccessors: ["navigator"],
    }),
  ],
});
