import std, { Props } from "apps/compat/std/mod.ts";
import manifest, { Manifest } from "../manifest.gen.ts";
import { type App, type AppContext as AC } from "@deco/deco";
import commerce from "apps/commerce/mod.ts";

type StdApp = ReturnType<typeof std>;
export default function Site(state: Props): App<Manifest, Props, [
    StdApp,
    ReturnType<typeof commerce>,
]> {
    return {
        state,
        manifest,
        dependencies: [
            std(state),
            commerce(state),
        ],
    };
}
export type Storefront = ReturnType<typeof Site>;
export type AppContext = AC<Storefront>;