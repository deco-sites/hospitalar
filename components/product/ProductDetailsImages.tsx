import { useSignal } from "@preact/signals";
import Slider from "$store/components/ui/Slider.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import DiscountBadge from "./DiscountBadge.tsx";
import type { ImageObject, Product } from "apps/commerce/types.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import Image from "deco-sites/std/components/Image.tsx";
import FreeShipping from "site/components/product/FreeShipping.tsx";

interface Props {
  images: ImageObject[];
  width: number;
  height: number;
  aspect: string;
  product: Product;
}

const id = "product-zoom";

function ProductDetailsImages(
  { images, width, height, aspect, product }: Props,
) {
  const { offers } = product;
  const {
    price,
    listPrice,
  } = useOffer(offers);
  const zoomX = useSignal(0);
  const zoomY = useSignal(0);

  const freeShippingCollection = product.additionalProperty?.filter(
    (property) =>
      property?.propertyID !== undefined &&
      String(property?.propertyID) === "157",
  ) || [];

  const isfreeShipping = freeShippingCollection.length > 0;

  return (
    <>
      <div class="flex flex-col xl:flex-row-reverse relative lg:justify-end gap-5">
        {/* Image Slider */}
        <div class="relative xl:pl-32 rounded-2xl border border-[#E5E7EB] overflow-hidden lg:border-none lg:rounded-none">
          <Slider class="bg-white lg:border lg:rounded-2xl lg:border-[#E5E7EB] carousel carousel-center gap-6 box-border lg:box-content lg:w-[600px] 2xl:w-[727px] w-full px-4 lg:px-0">
            {images.map((img, index) => (
              <Slider.Item
                index={index}
                class="carousel-item w-full"
              >
                <figure
                  style={`background-image: url(${img
                    .url!}); background-size: 250%;`}
                  onMouseMove={(e: MouseEvent) => {
                    const zoomer = e.currentTarget as HTMLElement;
                    const offsetX = e.offsetX;
                    const offsetY = e.offsetY;
                    const x = offsetX / (zoomer.offsetWidth) * 100;
                    const y = offsetY / (zoomer.offsetHeight) * 100;
                    zoomer!.style.backgroundPosition = x + "% " + y + "%";
                  }}
                  class="overflow-hidden cursor-zoom-in"
                >
                  <Image
                    class="w-full rounded-[10px] lg:hover:opacity-0"
                    sizes="(max-width: 640px) 100vw, 40vw"
                    style={{ aspectRatio: aspect }}
                    src={img.url!}
                    alt={img.alternateName}
                    width={width}
                    height={height}
                    // Preload LCP image for better web vitals
                    preload={index === 0}
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                </figure>
              </Slider.Item>
            ))}
          </Slider>
          <Slider.PrevButton class="border-none bg-transparent absolute lg:hidden left-[20px] top-1/2 transform translate-x-[10px] -translate-y-1/2">
            <Icon size={20} id="ChevronLeft" strokeWidth={3} />
          </Slider.PrevButton>
          <Slider.NextButton class="border-none bg-transparent absolute lg:hidden right-[20px] top-1/2 transform translate-x-[10px] -translate-y-1/2">
            <Icon size={20} id="ChevronRight" strokeWidth={3} />
          </Slider.NextButton>
          {/* Discount tag */}
          {price && listPrice && price !== listPrice
            ? (
              <DiscountBadge
                price={price}
                listPrice={listPrice}
                className="lg:left-auto lg:right-0 left-4"
              />
            )
            : null}
          {/* Free Shipping */}

          {isfreeShipping && (
            <FreeShipping
              classNameContainer="left-4 md:w-[129px] lg:right-auto lg:left-0 xl:left-[20%] top-0 flex"
              classNameChildren="md:w-[81px]"
              classNameIcon="mr-2 md:mr-0"
            />
          )}
        </div>

        {/* Dots */}
        <div class="lg:max-w-[500px] lg:self-start xl:self-start xl:left-0 xl:absolute xl:max-h-full xl:overflow-y-scroll xl:scrollbar-none">
          <ul
            class={`flex gap-3 overflow-auto lg:max-h-min lg:flex-1 lg:justify-start xl:flex-col`}
          >
            {images.map((img, index) => (
              <li class="min-w-[85px] lg:h-fit lg:min-w-[130px]">
                <Slider.Dot index={index}>
                  <Image
                    style={{ aspectRatio: aspect }}
                    class="border-[#E5E7EB] hover:border-secondary-focus group-disabled:border-secondary-focus border-2 rounded-2xl"
                    width={width / 5}
                    height={height / 5}
                    src={img.url!}
                    alt={img.alternateName}
                  />
                </Slider.Dot>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default ProductDetailsImages;
