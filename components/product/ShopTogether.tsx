import type { ProductDetailsPage, Product } from "apps/commerce/types.ts";
import { AppContext } from "apps/vtex/mod.ts";
import type { LoaderReturnType } from "$live/types.ts";
import { SectionProps } from "deco/mod.ts";
import { useCountBuyTogether } from "$store/sdk/useCountBuyTogether.ts";
import { useOffer } from "$store/sdk/useOffer.ts";

interface Props {
    page: ProductDetailsPage | null;
    buyTogetherLoader: LoaderReturnType<Product[] | null>;
}

const useStableImages = (product: Product) => {
    const imageNameFromURL = (url = "") => {
        const segments = new URL(url).pathname.split("/");
        return segments[segments.length - 1];
    };

    const images = product.image ?? [];
    const allImages = product.isVariantOf?.hasVariant.flatMap((p) => p.image)
        .reduce((acc, img) => {
            if (img?.url) {
                acc[imageNameFromURL(img.url)] = img.url;
            }
            return acc;
        }, {} as Record<string, string>) ?? {};

    return images.map((img) => {
        const name = imageNameFromURL(img.url);

        return { ...img, url: allImages[name] ?? img.url };
    });
};

export function loader(props: Props, _req: Request, ctx: AppContext) {
    if (!props.page || !props.page.product || !props.buyTogetherLoader) return { success: false, product: null, buyTogether: null };

    return {
        success: true,
        product: props.page.product,
        buyTogether: props.buyTogetherLoader
    }
}

function ShopTogether(props: SectionProps<typeof loader>) {
    if (!props.success) return null;

    const { product, buyTogether } = props;

    if (!product && !buyTogether) return null;

    console.log("data: ", {
        product,
        buyTogether
    })

    const { count } = useCountBuyTogether();
    const { productID, offers, name } = product;
    const { price, listPrice, seller } = useOffer(offers);

    if (!seller) return null;

    return (
        <div className="container w-full m-auto px-5 my-5 lg:my-10">
            <div className="flex w-full h-auto flex-col gap-14">
                <h2 className="text-xl lg:text-2xl leading-8 lg:leading-10 font-medium text-primary">Aproveite e leve também</h2>
                <div className="w-full h-auto ">

                </div>
            </div>
        </div>
    );
}

export default ShopTogether;