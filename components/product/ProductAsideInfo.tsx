import type { Product } from "apps/commerce/types.ts";
import Icon from "$store/components/ui/Icon.tsx";
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

  const currentURL = globalThis.location?.href;

  return (
    <>
      {/* Code and name */}
      {/* {gtin && gtin?.length > 0 && (
        <div class="mt-4 sm:mt-0 sm:h-auto">
          <div>
            <span class="text-sm text-base-300">
              Referência: {gtin}
            </span>
          </div>
        </div>
      )} */}

      {/* { tag warning} */}
      {isRestricted && <TagWarning style={""} />}

      {/* Prices */}
      {availability === "https://schema.org/InStock"
        ? (
          <div class="mt-7">
            <div class="flex flex-row gap-[14px] items-center">
              <span class="not-italic font-poppins text-[#2C376D] text-base ">
                {" "}
                <strong class="font-bold text-2xl text-[#2C376D] not-italic font-poppins md:text-3xl">
                  {formatPrice(price! * 0.97, offers!.priceCurrency)}
                </strong>{" "}
                à vista ou
              </span>
              <div class="px-2 max-w-[180px] flex items-center justify-center gap-2 bg-[#85bad533] border-[1.4px] border-[#2D386E] rounded-[10px] md:h-[30px]">
                <Icon id="CurrencyIcon" height={24} width={24} />
                <span class="font-poppins not-italic font-normal text-[8px] md:text-[12px] leading-[18px] text-[#2D386E]">
                  <strong class="font-bold">Economize</strong> {` ${formatPrice(listPrice! - price! * 0.97, offers!.priceCurrency)} `}
                </span>
              </div>
            </div>
            <div class="flex flex-row gap-2 items-center mt-2">
              {listPrice !== price && (
                <span class="line-through text-base-300 text-xs lg:text-base">
                  {formatPrice(listPrice, offers!.priceCurrency!)}
                </span>
              )}
              <span class="text-[#2C376D] text-base not-italic font-poppins font-normal">
                {"  "}
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