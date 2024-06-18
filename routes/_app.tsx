import { defineApp } from "$fresh/server.ts";
import { Context } from "deco/deco.ts";
import GlobalTags from "$store/components/GlobalTags.tsx";
import DesignSystem from "$store/sections/DesignSystem/DesignSystem.tsx";

const sw = () =>
    addEventListener("load", () =>
        navigator && navigator.serviceWorker &&
        navigator.serviceWorker.register("/sw.js"));

export default defineApp(async (_req, ctx) => {
    const revision = await Context.active().release?.revision();

    return (
        <>
            {/* Include default fonts and css vars */}
            <DesignSystem />

            {/* Include Icons and manifest */}
            <GlobalTags revision={revision} />

            {/* Rest of Preact tree */}
            <ctx.Component />

            {/* Include service worker */}
            <script
                type="module"
                dangerouslySetInnerHTML={{ __html: `(${sw})();` }}
            />
        </>
    );
});
