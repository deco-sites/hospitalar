/// <reference no-default-lib="true"/>
/// <reference lib="dom" />
/// <reference lib="deno.ns" />
/// <reference lib="esnext" />

import plugins from "deco-sites/std/plugins/mod.ts";
import partytownPlugin from "partytown/mod.ts";

import decoManifest from "./manifest.gen.ts";

import { defineConfig } from "$fresh/server.ts";
export default defineConfig({
  plugins: [
    ...plugins(
      {
        manifest: decoManifest,
      },
    ),
    partytownPlugin({
      proxyUrl: "/proxy",
      mainWindowAccessors: ["navigator"],
    }),
  ],
});
