import {
    BUTTON_VARIANTS,
    ButtonVariant,
} from "$store/components/minicart/Cart.tsx";
import Avatar from "$store/components/ui/Avatar.tsx";
import WishlistIcon from "$store/islands/WishlistButton.tsx";
import { sendEventOnClick } from "$store/sdk/analytics.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import { useVariantPossibilities } from "$store/sdk/useVariantPossiblities.ts";
import type { Product } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import Image from "deco-sites/std/components/Image.tsx";
import DiscountBadge from "./DiscountBadge.tsx";
import TagWarning from "$store/components/ui/TagWarning.tsx";
import FreeShipping from "$store/components/product/FreeShipping.tsx";
import { clx } from "$store/sdk/clx.ts";
import NewAddToCartButton from "site/islands/NewAddToCartButton.tsx";

export interface Layout {
    basics?: {
        contentAlignment?: "Left" | "Center";
        oldPriceSize?: "Small" | "Normal";
        ctaText?: string;
        mobileCtaText?: string;
        ctaVariation?: ButtonVariant;
        ctaMode?: "Go to Product Page" | "Add to Cart";
    };
    discount: {
        label: string;
        variant:
        | "primary"
        | "secondary"
        | "neutral"
        | "accent"
        | "emphasis"
        | "success"
        | "info"
        | "error"
        | "warning";
    };
    elementsPositions?: {
        skuSelector?: "Top" | "Bottom";
        favoriteIcon?: "Top right" | "Top left";
    };
    hide: {
        productName?: boolean;
        productDescription?: boolean;
        allPrices?: boolean;
        installments?: boolean;
        skuSelector?: boolean;
        cta?: boolean;
    };
    onMouseOver?: {
        image?: "Change image" | "Zoom image";
        showFavoriteIcon?: boolean;
        showSkuSelector?: boolean;
        showCardShadow?: boolean;
        showCta?: boolean;
    };
}

interface Props {
    product: Product;
    /** Preload card image */
    preload?: boolean;

    /** @description used for analytics event */
    itemListName?: string;
    layout?: Layout;
    class?: string;
    IdCollection?: string;
    tagWarningWidth?: string;
    tagWarningHeight?: string;
    positionBottom?: string;
    classFrreShipping?: string;
}

export const relative = (url: string) => {
    const link = new URL(url);
    return `${link.pathname}${link.search}`;
};

const WIDTH = 279;
const HEIGHT = 270;

function NewProductCard(
    {
        product,
        preload,
        itemListName,
        layout,
        class: _class,
        tagWarningWidth,
        tagWarningHeight,
        positionBottom,
        classFrreShipping,
    }: Props,
) {
    const {
        url,
        productID,
        name,
        image: images,
        offers,
        isVariantOf,
        category,
    } = product;
    const productGroupID = isVariantOf?.productGroupID;
    const [front, back] = images ?? [];
    const { listPrice, price, installment, seller, availability } = useOffer(
        offers,
    );

    //warning product

    const strict = category?.split(">")?.[0];

    let isRestricted = false;

    if (strict === "Medicamentos") {
        isRestricted = true;
    } else {
        isRestricted = false;
    }

    const freeShippingCollection = product.additionalProperty?.filter(
        (property) =>
            property?.propertyID !== undefined &&
            String(property?.propertyID) === "157",
    ) || [];

    const freeShipping = freeShippingCollection.length > 0;

    function extractURLPart(url: string) {
        const index = url.indexOf("/p?");
        if (index !== -1) {
            return url.substring(0, index + 3); // +3 to include "/p?"
        }
        return null; // Returns null if "/p?" is not found in the URL.
    }

    const possibilities = useVariantPossibilities(product);
    const variants = Object.entries(Object.values(possibilities)[0] ?? {});
    const clickEvent = {
        name: "select_item" as const,
        params: {
            item_list_name: itemListName,
            items: [
                mapProductToAnalyticsItem({
                    product,
                    price,
                    listPrice,
                }),
            ],
        },
    };
    const l = layout;
    const align =
        !l?.basics?.contentAlignment || l?.basics?.contentAlignment == "Left"
            ? "left"
            : "center";
    const skuSelector = variants.map(([value, { urls }]) => (
        <li>
            <a href={urls[0]}>
                <Avatar
                    variant={"default"}
                    content={value}
                    active={urls[0] === url}
                />
            </a>
        </li>
    ));

    const addToCartButtonClassNames = (variant: string | undefined) =>
        `!bg-[#2C376D] h-10 w-full font-poppins not-italic font-semibold text-white btn btn-${BUTTON_VARIANTS[variant ?? "primary"]
        }`;

    const cta = layout?.basics?.ctaMode === "Go to Product Page"
        ? (
            <a
                href={url && relative(url)}
                aria-label="view product"
                class={`min-w-[162px] ${addToCartButtonClassNames(layout?.basics?.ctaVariation)
                    }`}
            >
                <span class="max-lg:hidden flex font-medium">
                    {l?.basics?.ctaText || "Ver produto"}
                </span>
                <span class="lg:hidden flex font-medium">
                    {l?.basics?.mobileCtaText || "Add ao carrinho"}
                </span>
            </a>
        )
        : l?.basics?.mobileCtaText
            ? (
                <>
                    <NewAddToCartButton
                        quantity={1}
                        name={product.name as string}
                        discount={price && listPrice ? listPrice - price : 0}
                        productGroupId={product.isVariantOf?.productGroupID ?? ""}
                        price={price as number}
                        sellerId={seller as string}
                        skuId={product.sku}
                        label="Comprar"
                        classes={addToCartButtonClassNames(layout?.basics?.ctaVariation)}
                    />
                </>
            )
            : (
                <NewAddToCartButton
                    quantity={1}
                    name={product.name as string}
                    discount={price && listPrice ? listPrice - price : 0}
                    productGroupId={product.isVariantOf?.productGroupID ?? ""}
                    price={price as number}
                    sellerId={seller as string}
                    skuId={product.sku}
                    label={l?.basics?.ctaText}
                    classes={`${addToCartButtonClassNames(layout?.basics?.ctaVariation)}`}
                />
            );

    const price2: number = price as number;
    const listPrice2: number = listPrice as number;

    return (
        <div
            class={`bg-white rounded-[20px] border border-[#E5E7EB] card card-compact opacity-100 bg-opacity-100 group w-full max-w-[240px] lg:max-w-none p-[15px] ${align === "center" ? "text-center" : "text-start"
                } ${l?.onMouseOver?.showCardShadow ? "lg:hover:shadow-lg shadow-black" : ""
                } ${_class ? `${_class}` : ""}`}
            data-deco="view-product"
            id={`product-card-${productID}`}
            {...sendEventOnClick(clickEvent)}
        >
            <figure
                class="relative rounded-lg"
                style={{ aspectRatio: `${WIDTH} / ${HEIGHT}` }}
            >
                {/* Wishlist button */}
                <div
                    class={clx(`absolute top-2 z-10
              ${l?.elementsPositions?.favoriteIcon === "Top left"
                            ? "left-2"
                            : "right-2"
                        }
              ${l?.onMouseOver?.showFavoriteIcon ? "" : ""}
            `)}
                >
                    <WishlistIcon productGroupID={productGroupID} productID={productID} />
                </div>
                <a
                    href={url && relative(extractURLPart(url) ?? "")}
                    aria-label="view product"
                    class="contents relative"
                >
                    <Image
                        src={front.url!}
                        alt={front.alternateName}
                        width={WIDTH}
                        height={HEIGHT}
                        class={clx(`
                  absolute rounded-lg w-full
                  ${(!l?.onMouseOver?.image ||
                                l?.onMouseOver?.image == "Change image")
                                ? "duration-100 transition-opacity opacity-100 lg:group-hover:opacity-0"
                                : ""
                            }
                  ${l?.onMouseOver?.image == "Zoom image"
                                ? "duration-100 transition-scale scale-100 lg:group-hover:scale-105"
                                : ""
                            }
                `)}
                        sizes="(max-width: 640px) 50vw, 20vw"
                        preload={preload}
                        loading={preload ? "eager" : "lazy"}
                        decoding="async"
                    />
                    {(!l?.onMouseOver?.image ||
                        l?.onMouseOver?.image == "Change image") && (
                            <Image
                                src={back?.url ?? front.url!}
                                alt={back?.alternateName ?? front.alternateName}
                                width={WIDTH}
                                height={HEIGHT}
                                class="absolute transition-opacity rounded-lg w-full opacity-0 lg:group-hover:opacity-100"
                                sizes="(max-width: 640px) 50vw, 20vw"
                                loading="lazy"
                                decoding="async"
                            />
                        )}
                    {/* Tag produto restrito*/}
                    {isRestricted && (
                        <div
                            class={`absolute ${positionBottom ?? `top-0 -left-[75px]`}`}
                        >
                            <TagWarning
                                width={tagWarningWidth}
                                height={tagWarningHeight}
                                style={`flex justify-center`}
                            />
                        </div>
                    )}
                </a>

                {/* Free Shipping */}

                {freeShipping && (
                    <FreeShipping
                        classNameContainer={`md:left-3 left-1 ${listPrice2 !== price2 ? `top-11` : `top-0`
                            } ${classFrreShipping}`}
                        classNameIcon="mr-2"
                    />
                )}
            </figure>

            {/* Prices & Name */}
            <div class="flex-auto justify-end flex flex-col relative">
                {listPrice2 !== price2 && (
                    <DiscountBadge
                        price={price2}
                        listPrice={listPrice2}
                        label={l?.discount?.label}
                        variant={l?.discount?.variant}
                        className="lg:!-top-[20px] lg:!-left-[12px] !top-[20px]"
                    />
                )}
                {/* SKU Selector */}
                {(!l?.elementsPositions?.skuSelector ||
                    l?.elementsPositions?.skuSelector === "Top") && (
                        <>
                            {l?.hide.skuSelector ? "" : (
                                <ul
                                    class={`flex items-center gap-2 w-full ${align === "center" ? "justify-center" : "justify-start"
                                        } ${l?.onMouseOver?.showSkuSelector ? "lg:hidden" : ""}`}
                                >
                                    {skuSelector}
                                </ul>
                            )}
                        </>
                    )}

                {l?.hide.productName && l?.hide.productDescription
                    ? ""
                    : (
                        <div class="flex flex-col gap-0 mt-[10px] h-auto">
                            {l?.hide.productName
                                ? ""
                                : (
                                    <h2 class="font-poppins not-italic font-normal text-[10px] text-[#1F2937] text-left lg:text-[12px] line-clamp-2">
                                        {isVariantOf?.name || name}
                                    </h2>
                                )}
                            {l?.hide.productDescription
                                ? ""
                                : (
                                    <p class="font-poppins not-italic font-normal text-[10px] text-[#1F2937]">
                                        {product.description}
                                    </p>
                                )}
                        </div>
                    )}
                {availability === "https://schema.org/InStock"
                    ? (
                        <>
                            {l?.hide.allPrices
                                ? ""
                                : (
                                    <div class="flex flex-col items-start mt-[10px] h-auto">
                                        <div class="font-poppins not-italic text-[#2C376D] text-[10px] font-bold lg:text[20px]">
                                            <span class="!text-base">
                                                {formatPrice(price! * 0.97, offers!.priceCurrency!)}
                                                {" "}
                                            </span>
                                            à vista
                                        </div>
                                        <div
                                            class={`flex items-center gap-2.5 ${l?.basics?.oldPriceSize === "Normal"
                                                    ? "lg:flex-row"
                                                    : ""
                                                } ${align === "center" ? "justify-center" : "justify-start"
                                                }`}
                                        >
                                            {(listPrice && price) && listPrice > price && (
                                                <p
                                                    class={`line-through text-base-300 text-xs lg:text-xs  ${l?.basics?.oldPriceSize === "Normal"
                                                            ? "lg:text-xl"
                                                            : ""
                                                        }`}
                                                >
                                                    ou{"  "}
                                                    {formatPrice(listPrice, offers!.priceCurrency!)}
                                                </p>
                                            )}
                                            <p class="font-poppins not-italic font-normal text-[10px] text-[#8E8E9F] lg:text-xs text-left">
                                                ou{"  "}{formatPrice(price, offers!.priceCurrency!)}
                                            </p>
                                        </div>
                                        {l?.hide.installments
                                            ? ""
                                            : (
                                                <div class="font-poppins not-italic font-normal text-[10px] text-[#8E8E9F] lg:text-xs text-left">
                                                    em até{" "}
                                                    {installment?.billingDuration}x de ${formatPrice(
                                                        installment?.billingIncrement,
                                                        offers!.priceCurrency!,
                                                    )} sem juros
                                                </div>
                                            )}
                                    </div>
                                )}
                        </>
                    )
                    : null}

                {/* SKU Selector */}

                {(l?.elementsPositions?.skuSelector === "Bottom" &&
                    availability === "https://schema.org/InStock") && (
                        <>
                            {l?.hide.skuSelector ? "" : (
                                <ul
                                    class={`flex items-center gap-2 w-full ${align === "center" ? "justify-center" : "justify-start"
                                        } ${l?.onMouseOver?.showSkuSelector ? "lg:hidden" : ""}`}
                                >
                                    {skuSelector}
                                </ul>
                            )}
                        </>
                    )}

                {availability === "https://schema.org/InStock"
                    ? (
                        <div
                            class={`w-full flex flex-col mt-[10px]`}
                        >
                            {cta}
                        </div>
                    )
                    : null}

                {/* End SKU Selector */}
            </div>
        </div>
    );
}

export default NewProductCard;