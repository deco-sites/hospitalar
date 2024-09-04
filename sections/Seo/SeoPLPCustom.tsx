import SeoPLP from "apps/commerce/sections/Seo/SeoPLPV2.tsx";
import { AppContext } from "apps/commerce/mod.ts";
import {
    renderTemplateString,
    SEOSection,
} from "apps/website/components/Seo.tsx";
import { ProductListingPage } from "apps/commerce/types.ts";
import { canonicalFromBreadcrumblist } from "apps/commerce/utils/canonical.ts";

export interface ConfigJsonLD {
    /**
     * @title Remove videos
     * @description Remove product videos from structured data
     */
    removeVideos?: boolean;
}

export interface Props {
    /** @title Data Source */
    jsonLD: ProductListingPage | null;
    /** @title Title Override */
    title?: string;
    /** @title Description Override */
    description?: string;
    /** @hide true */
    canonical?: string;
    /**
     * @title Disable indexing
     * @description In testing, you can use this to prevent search engines from indexing your site
     */
    noIndexing?: boolean;
    configJsonLD?: ConfigJsonLD;
}

export function loader(props: Props, _req: Request, ctx: AppContext) {
    const {
        titleTemplate = "",
        descriptionTemplate = "",
        ...seoSiteProps
    } = ctx.seo ?? {};
    const { title: titleProp, description: descriptionProp, jsonLD } = props;

    const title = renderTemplateString(
        titleTemplate,
        titleProp || jsonLD?.seo?.title || ctx.seo?.title || "",
    );
    const description = renderTemplateString(
        descriptionTemplate,
        descriptionProp || jsonLD?.seo?.description || ctx.seo?.description || "",
    );
    const canonical = props.canonical
        ? props.canonical
        : jsonLD?.seo?.canonical
            ? jsonLD.seo.canonical
            : jsonLD?.breadcrumb
                ? canonicalFromBreadcrumblist(jsonLD?.breadcrumb)
                : undefined;

    const noIndexing = props.noIndexing ||
        !jsonLD ||
        !jsonLD.products.length ||
        jsonLD.seo?.noIndexing;

    if (props.configJsonLD?.removeVideos) {
        jsonLD?.products.forEach((product) => {
            product.video = undefined;
            product.isVariantOf?.hasVariant.forEach((variant) => {
                variant.video = undefined;
            });
        });
    }

    return {
        ...seoSiteProps,
        title,
        description,
        canonical,
        jsonLDs: [jsonLD],
        noIndexing,
    };
}

function Section(props: Props): SEOSection {
    return <SeoPLP {...props} />;
}

export default Section;