import type { Product } from "apps/commerce/types.ts";
import { formatPrice } from "$store/sdk/format.ts";
import { useOffer } from "$store/sdk/useOffer.ts";

import ProductSelector from "./ProductVariantSelector.tsx";

import TagWarning from "site/components/ui/TagWarning.tsx";
import ProductInfo from "site/components/product/ProductInfo.tsx";

interface Props {
  product: Product;
  isRestricted: boolean;
}

function ProductAsideInfo({
  product,
  product: { offers, gtin },
  isRestricted,
}: Props) {
  const { price, listPrice, availability, installment } = useOffer(
    offers,
  );

  const currentURL = window.location?.href;

  return (
    <>
      {/* Code and name */}  
        {gtin && gtin?.length > 0 && (
          <div class="mt-4 sm:mt-0 sm:h-auto">
            <div>
              <span class="text-sm text-base-300">
                Referência: {gtin}
              </span>
            </div>
          </div>
        )}

      {/* { tag warning} */}
      {isRestricted && <TagWarning style={""} />}

      {/* Prices */}
      {availability === "https://schema.org/InStock"
        ? (
          <div class="mt-7">
            <span class="not-italic font-poppins font-bold text-[#2C376D] text-base">
              {" "}
              <strong class="font-bold text-3xl text-[#2C376D] not-italic font-poppins">
                {formatPrice(price! * 0.97, offers!.priceCurrency)}
              </strong>{" "}
              à vista
            </span>
            <div class="flex flex-row gap-2 items-center mt-2">
              {listPrice !== price && (
                <span class="line-through text-base-300 text-xs">
                  {formatPrice(listPrice, offers!.priceCurrency!)}
                </span>
              )}
              <span class="text-[#2C376D] text-base not-italic font-poppins font-normal">
                ou  {" "}
                <strong>
                  {formatPrice(price, offers!.priceCurrency!)}
                </strong>
              </span>
            </div>
            <div class="flex flex-col">
              <span class="text-[#2C376D] text-base not-italic font-poppins font-normal">
                em até {`${installment?.billingDuration}x`} de{" "}
                <strong>
                  {formatPrice(
                    installment?.billingIncrement,
                    offers!.priceCurrency,
                  )}
                </strong>{" "}
                sem juros
              </span>
            </div>
          </div>
        )
        : null}
      {/* Sku Selector */}
      {availability === "https://schema.org/InStock"
        ? (
          <div class="mt-7 sm:mt-5">
            <ProductSelector product={product} currentURL={currentURL} />
          </div>
        )
        : null}

      {/*warning Product info*/}
      {isRestricted && <ProductInfo />}
    </>
  );
}

export default ProductAsideInfo;
