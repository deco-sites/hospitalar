import { App, AppContext as AC } from "$live/mod.ts";
import std, { Props as CommerceProps } from "apps/compat/std/mod.ts";
import { type Section } from "@deco/deco/blocks";
import commerce from "apps/commerce/mod.ts";

import manifest, { Manifest } from "../manifest.gen.ts";

export type Props = {
  /**
   * @title Active Commerce Platform
   * @description Choose the active ecommerce platform
   * @default custom
   */
  theme?: Section;
} & CommerceProps;

type StdApp = ReturnType<typeof std>;
export default function Site({ theme, ...state }: Props): App<Manifest, Props, [ReturnType<typeof commerce>, StdApp]> {

  return {
    state,
    manifest,
    dependencies: [
      commerce(state),
      std({
        ...state,
        global: theme ? [...(state.global ?? []), theme] : state.global,
      }),
    ],
  };
}

export type Storefront = ReturnType<typeof Site>;
export type AppContext = AC<Storefront>;
export { onBeforeResolveProps, Preview } from "apps/website/mod.ts";

