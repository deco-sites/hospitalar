/// <reference no-default-lib="true"/>
/// <reference lib="dom" />
/// <reference lib="deno.ns" />
/// <reference lib="esnext" />

import { plugins } from "deco/plugins/deco.ts";
import partytownPlugin from "partytown/mod.ts";

import decoManifest from "./manifest.gen.ts";

import { defineConfig } from "$fresh/server.ts";
export default defineConfig({
  render: (ctx, render) => {
    ctx.lang = 'pt-BR'
    render()
  },
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
