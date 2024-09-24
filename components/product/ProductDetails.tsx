import { useSignal } from "@preact/signals";
import { useId } from "preact/hooks";
import ShippingSimulation from "$store/islands/ShippingSimulation.tsx";
import Button from "$store/components/ui/Button.tsx";
import Image from "deco-sites/std/components/Image.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import OutOfStock from "$store/islands/OutOfStock.tsx";
import { useOffer } from "$store/sdk/useOffer.ts";
import { SendEventOnLoad } from "$store/sdk/analytics.tsx";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import type { ProductDetailsPage } from "apps/commerce/types.ts";
import type { LoaderReturnType } from "$live/types.ts";
import AddToCartActions from "$store/islands/AddToCartActions.tsx";
import ProductDetailsImages from "$store/islands/ProductDetailsImages.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { getShareLink } from "$store/sdk/shareLinks.tsx";
import { useVariantPossibilities } from "$store/sdk/useVariantPossiblities.ts";

import ProductAsideInfo from "site/components/product/ProductAsideInfo.tsx";
import TagBlueProduct from "site/components/blueTags/BlueTagProduct.tsx";
import BreadcrumbProduct from "site/components/ui/BreadcrumbProduct.tsx";
import DescriptionCard from "site/islands/DescriptionCard.tsx";

export type Variant = "front-back" | "slider" | "auto";

export type ShareableNetwork = "Facebook" | "Twitter" | "Email" | "WhatsApp";

export interface Props {
  page: LoaderReturnType<ProductDetailsPage | null>;
  /**
   * @title Product view
   * @description Ask for the developer to remove this option since this is here to help development only and should not be used in production
   */
  variant?: Variant;
  shipmentPolitics?: {
    label: string;
    link: string;
  };
  shareableNetworks?: ShareableNetwork[];

  /*Produtos Restrito*/
  /**
   *  @title Produtos restrito.
   *  @description Adicionar o nome da categoria.
   */
  restrictedCategory?: string;
}

const WIDTH = 500;
const HEIGHT = 500;
const ASPECT_RATIO = `${WIDTH} / ${HEIGHT}`;

/**
 * Rendered when a not found is returned by any of the loaders run on this page
 */
function NotFound() {
  return (
    <div class="w-full flex justify-center items-center py-28">
      <div class="flex flex-col items-center justify-center gap-6">
        <span class="font-medium text-2xl">Página não encontrada</span>
        <a href="/">
          <Button>Voltar à página inicial</Button>
        </a>
      </div>
    </div>
  );
}

function ProductInfo(
  { page, shareableNetworks }: {
    page: ProductDetailsPage;
    shipmentPolitics?: Props["shipmentPolitics"];
    shareableNetworks?: Props["shareableNetworks"];
    restrictedCategory?: Props["restrictedCategory"];
  },
) {
 
  const {
    breadcrumbList,
    product,
  } = page;
  const {
    description,
    productID,
    offers,
    name,
    gtin,
    isVariantOf,
    url,
    category
  } = product;

  const strict = category?.split(">")?.[0]

  let isRestricted = false

  if (strict === "Medicamentos") {
    isRestricted = true
  } else {
    isRestricted = false
  }

  const { price, listPrice, seller, availability } = useOffer(
    offers,
  );
  const possibilities = useVariantPossibilities(product);
  const subName: string[] = [];
  const productUrl = product?.url || "";

  Object.keys(possibilities).forEach((name) => {
    Object.entries(possibilities[name]).forEach(
      ([value, { urls, inStock }]) => {
        if (urls[0] === productUrl) {
          subName.push(value);
        }
      },
    );
  });

  return (
    <>
      {/* Code and name */}
      <ProductAsideInfo
        product={product}
        isRestricted =  {isRestricted}
      />
      {/* Add to Cart and Favorites button */}
      <div class="mt-[30px] lg:mt-10 flex gap-[30px]">
        {availability === "https://schema.org/InStock"
          ? (
            <>
              {seller && (
                <AddToCartActions
                  productID={productID}
                  seller={seller}
                  price={price}
                  listPrice={listPrice}
                  productName={name ?? ""}
                  productGroupID={product.isVariantOf?.productGroupID ?? ""}
                />
              )}
            </>
          )
          : <OutOfStock productID={productID} />}
      </div>
      {/* Shipping Simulation */}

      {availability === "https://schema.org/InStock"
        ? (
          <ShippingSimulation
            items={[{
              id: Number(product.sku),
              quantity: 1,
              seller: seller ?? "1",
            }]}
          />
        )
        : null}
      {/* Description card */}
      <DescriptionCard description={description ? description : ""} classContainer="lg:hidden" />
      {/* Share Product on Social Networks */}	      {/* Share Product on Social Networks */}
      {shareableNetworks && (	
        <div class="hidden lg:flex items-center gap-5 my-[30px]">	
          <span class="text-xs text-base-300">Compartilhar</span>	
          <ul class="gap-2 flex items-center justify-between">	
            {shareableNetworks.map((network) => (	
              <li class="bg-secondary w-8 h-8 rounded-full hover:bg-primary group transition-all">	
                <a	
                  href={getShareLink({	
                    network,	
                    productName: isVariantOf?.name ?? name ?? "",	
                    url: url ?? "",	
                  })}	
                  target="_blank"	
                  rel="noopener noreferrer"	
                  class="flex items-center justify-center w-full h-full group-hover:text-white text-primary"	
                >	
                  <Icon id={network} width={20} height={20} />	
                </a>	
              </li>	
            ))}	
          </ul>	
        </div>	
      )}

      {/* Tag Blue Product */}

      <TagBlueProduct blueProductId={productID} />

      {/* Analytics Event */}
      <SendEventOnLoad
        event={{
          name: "view_item",
          params: {
            items: [
              mapProductToAnalyticsItem({
                product,
                breadcrumbList,
                price,
                listPrice,
              }),
            ],
          },
        }}
      />
    </>
  );
}

/**
 * Here be dragons
 *
 * bravtexfashionstore (VTEX default fashion account) has the same images for different skus. However,
 * VTEX api does not return the same link for the same image. This causes the image to blink when
 * the user changes the selected SKU. To prevent this blink from happening, I created this function
 * bellow to use the same link for all skus. Example:
 *
 * {
    skus: [
      {
        id: 1
        image: [
          "https://bravtexfashionstore.vtexassets.com/arquivos/ids/123/a.jpg",
          "https://bravtexfashionstore.vtexassets.com/arquivos/ids/124/b.jpg",
          "https://bravtexfashionstore.vtexassets.com/arquivos/ids/125/c.jpg"
        ]
      },
      {
        id: 2
        image: [
          "https://bravtexfashionstore.vtexassets.com/arquivos/ids/321/a.jpg",
          "https://bravtexfashionstore.vtexassets.com/arquivos/ids/322/b.jpg",
          "https://bravtexfashionstore.vtexassets.com/arquivos/ids/323/c.jpg"
        ]
      }
    ]
  }

  for both skus 1 and 2, we have the same images a.jpg, b.jpg and c.jpg, but
  they have different urls. This function returns, for both skus:

  [
    "https://bravtexfashionstore.vtexassets.com/arquivos/ids/321/a.jpg",
    "https://bravtexfashionstore.vtexassets.com/arquivos/ids/322/b.jpg",
    "https://bravtexfashionstore.vtexassets.com/arquivos/ids/323/c.jpg"
  ]

  This is a very catalog dependent function. Feel free to change this as you wish
 */
const useStableImages = (product: ProductDetailsPage["product"]) => {
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

function Details({
  page,
  variant,
  shipmentPolitics,
  shareableNetworks,
}: {
  page: ProductDetailsPage;
  variant: Variant;
  shipmentPolitics?: Props["shipmentPolitics"];
  shareableNetworks?: Props["shareableNetworks"];
}) {
  const { product, breadcrumbList } = page;
  const filteredBreadcrumbList = breadcrumbList.itemListElement.filter((item) =>
    item.name!.length > 1
  );
  const id = `product-image-gallery:${useId()}`;
  const images = useStableImages(product);

  const open = useSignal(false);
  const zoomImage = useSignal(images[0].url);
  const zoomX = useSignal(0);
  const zoomY = useSignal(0);
  const possibilities = useVariantPossibilities(page?.product);
  const { isVariantOf, url } = page?.product;
  const subName: string[] = [];
  const productUrl = product?.url || "";
  const currentURL = window.location?.href;

  Object.keys(possibilities).forEach((name) => {
    Object.entries(possibilities[name]).forEach(
      ([value, { urls, inStock }]) => {
        if (urls[0] === productUrl) {
          subName.push(value);
        }
      },
    );
  });

  /**
   * Product slider variant
   */
  if (variant === "slider") {
    return (
      <>
        {/* Breadcrumb */}
        <BreadcrumbProduct
          itemListElement={filteredBreadcrumbList}
          class="mb-6 lg:mb-[40px] lg:!pt-[30px] lg:!pb-0"
          activeTitle={false}
        />
        <div
          id={id}
          class="flex flex-col pb-[46px] lg:flex-row gap-12 lg:justify-center lg:pb-[87px]"
        >
          {/* Product Images */}
          <div>
            <h2 class="mb-[30px] lg:mb-[50px] lg:max-[670px]">
              <span class="font-poppins not-italic font-semibold text-xl text-[#2C376D] lg:text-2xl">
                {isVariantOf?.name}
                {currentURL == url ? subName.map((name) => `- ${name}`) : "  "}
              </span>
            </h2>

            <ProductDetailsImages
              images={images}
              width={WIDTH}
              height={HEIGHT}
              aspect={ASPECT_RATIO}
              product={product}
            />

            <DescriptionCard description={product.description ? product.description : ""} classContainer="hidden lg:block" />
          </div>

          {/* Product Info */}
          <div class="w-full lg:pr-0 lg:pl-6 lg:mt-[50px]">
            <ProductInfo
              page={page}
              shipmentPolitics={shipmentPolitics}
              shareableNetworks={shareableNetworks}
            />
          </div>
        </div>
        <SliderJS rootId={id}></SliderJS>
      </>
    );
  }

  /**
   * Product front-back variant.
   *
   * Renders two images side by side both on mobile and on desktop. On mobile, the overflow is
   * reached causing a scrollbar to be rendered.
   */
  return (
    <div class="grid grid-cols-1 gap-4 lg:grid-cols-[50vw_25vw] lg:grid-rows-1 lg:justify-center">
      {/* Image slider */}
      <ul class="carousel carousel-center gap-6">
        {[images[0], images[1] ?? images[0]].map((img, index) => (
          <li class="carousel-item min-w-[100vw] lg:min-w-[24vw]">
            <Image
              sizes="(max-width: 640px) 100vw, 24vw"
              style={{ aspectRatio: ASPECT_RATIO }}
              src={img.url!}
              alt={img.alternateName}
              width={WIDTH}
              height={HEIGHT}
              // Preload LCP image for better web vitals
              preload={index === 0}
              loading={index === 0 ? "eager" : "lazy"}
            />
          </li>
        ))}
      </ul>

      {/* Product Info */}
      <div class="px-4 lg:pr-0 lg:pl-6">
        <ProductInfo page={page} />
      </div>
    </div>
  );
}

function ProductDetails(
  { page, variant: maybeVar = "auto", shipmentPolitics, shareableNetworks }:
    Props,
) {
  /**
   * Showcase the different product views we have on this template. In case there are less
   * than two images, render a front-back, otherwhise render a slider
   * Remove one of them and go with the best suited for your use case.
   */
  const variant = maybeVar === "auto"
    ? page?.product.image?.length && page?.product.image?.length < 2
      ? "front-back"
      : "slider"
    : maybeVar;

  return (
    <div class="py-0">
      {page
        ? (
          <Details
            page={page}
            variant={variant}
            shipmentPolitics={shipmentPolitics}
            shareableNetworks={shareableNetworks}
          />
        )
        : <NotFound />}
    </div>
  );
}

export default ProductDetails;
