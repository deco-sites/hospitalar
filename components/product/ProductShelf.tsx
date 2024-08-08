import type { LoaderReturnType } from "$live/types.ts";
import type { Layout as CardLayout } from "$store/components/product/ProductCard.tsx";
import ProductCard from "$store/components/product/ProductCard.tsx";
import {
  CONDITIONAL_RESPONSIVE_PARAMS,
  ResponsiveConditionals,
} from "$store/components/ui/BannerCarousel.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Header from "$store/components/ui/SectionHeader.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { SendEventOnLoad } from "$store/sdk/analytics.tsx";
import { useOffer } from "$store/sdk/useOffer.ts";
import type { Product } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import { useId } from "preact/hooks";
import { clx } from "$store/sdk/clx.ts";
import { useDevice } from "deco/hooks/useDevice.ts";

export interface Props {
  products: LoaderReturnType<Product[] | null>;

  title?: string;
  layout?: {
    headerAlignment?: "center" | "left";
    headerfontSize?: "Normal" | "Large";
    color?: "primary" | "secondary";
    itemsPerPage?: {
      screenWidth?: number;
      itemsQuantity?: number;
    }[];
  };
  showPaginationArrows?: ResponsiveConditionals;
  cardLayout?: CardLayout;
  IdCollection?: string;
  /**@title Slide de 2 linhas? */
  slideTwoRow?:boolean;  
}

interface DotsProps {
  images?: Product[];
  interval?: number;
  className: string;
  slideTwoRow?:boolean;  
}

function Dots({ images, interval = 0, slideTwoRow }: DotsProps) {
  const device = useDevice();
  const allImageLength = Number(images?.length);
  const lengthDots = allImageLength && allImageLength / 2;

  return (
    <>
      <ul
        class={clx(`${slideTwoRow 
          ? 'absolute lg:-bottom-12 w-full flex gap-x-[0.5rem] justify-center max-lg:overflow-hidden flex-wrap -bottom-[90px]' 
          : 'carousel justify-center col-span-full gap-2 z-10 row-start-4 max-lg:mt-[0.625rem]'}`)}
      >
        
        {images?.map((_, index) => {
          if( !slideTwoRow ) {
            return(
              <li class="carousel-item">
                <Slider.Dot index={index}>
                  <div
                  class={`py-5 ${
                    ((index === 0) || (index % 4 == 0)) ? "" : "lg:hidden"
                  }`}
                  >
                  <div
                    class="w-3 h-3 group-disabled:opacity-100 opacity-20 rounded-full bg-primary"
                    style={{ animationDuration: `${interval}s` }}
                  />
                  </div>
                </Slider.Dot>
              </li>
            )
          } 

          if( device === 'desktop' && slideTwoRow && index < lengthDots ){            
            return(
              <li class="carousel-item">
                <Slider.Dot index={index}>
                  <div
                  class={`py-5 ${
                    ((index === 0) || (index % 4 == 0)) ? "" : "lg:hidden"
                  }`}
                  >
                  <div
                    class="w-3 h-3 group-disabled:opacity-100 opacity-20 rounded-full bg-primary"
                    style={{ animationDuration: `${interval}s` }}
                  />
                  </div>
                </Slider.Dot>
              </li>
            )
          }	else {
            return(
              <li class="carousel-item">
                <Slider.Dot index={index}>
                  <div
                  class={`py-5 ${
                    ((index === 0) || (index % 4 == 0)) ? "" : "lg:hidden"
                  }`}
                  >
                  <div
                    class="w-3 h-3 group-disabled:opacity-100 opacity-20 rounded-full bg-primary"
                    style={{ animationDuration: `${interval}s` }}
                  />
                  </div>
                </Slider.Dot>
              </li>
            )            
          }
         
        })}
      </ul>
    </>
  );
}


function ProductShelf({
  products, 
  title,
  layout,
  cardLayout,
  showPaginationArrows,
  IdCollection,
  slideTwoRow = false
}:Props) {
  const id = useId();
  const device = useDevice();

  if (!products || products.length === 0) {
    return null;
  }

  
  function redesignArray( products: [] ): [Product[]]{
    let arrayProducts = [];

    products.forEach(( product, index )=>{
      if( index === 0 || index % 2 === 0 ){
        arrayProducts.push( [ product ] )
      } 
      else if( index % 2 !== 0 ){
        arrayProducts[arrayProducts.length -1].push( product );
      }
    })

    return arrayProducts;
  }

  return (
    <div 
      class={clx(`${slideTwoRow 
        ? 'container w-full m-auto px-5 max-lg:mb-20 max-lg:mt-10 lg:mb-20'
        : 'w-full pb-8 flex flex-col lg:gap-7 lg:pb-10' }`)}>
      <div class="flex items-center justify-between relative pb-3">
        <Header
          title={title || ""}
          description=""
          fontSize={layout?.headerfontSize || "Large"}
          alignment={layout?.headerAlignment || "center"}
          color={layout?.color || "primary"}
        />
      </div>

      <div
        id={id}
        class={clx(`${slideTwoRow 
          ? 'container flex w-full relative'
          : 'grid grid-cols-[48px_1fr_48px] px-0 grid-rows-[1fr_48px_1fr_48px]'}`)}
      >

        {slideTwoRow 
          ? (
            <Slider 
              class={clx(`container carousel carousel-start flex max-lg:overflow-hidden`)}>
              
              {device === 'mobile' && products?.map((product, index) => {
                  return(
                    <Slider.Item
                      index={index}
                      class={clx(`carousel-item w-[335px]`)}              
                    >
                      <ProductCard
                        product={product}
                        itemListName={title}
                        layout={cardLayout}
                        IdCollection={IdCollection ?? "156"}
                        tagWarningWidth="80%"
                      />
                    </Slider.Item>
                  )
              })}
              { slideTwoRow && device === 'desktop' && redesignArray(products).map(( produtosInternos , index) => {                            
                return(
                  <Slider.Item
                    index={index}
                    class={clx(`carousel-item w-[calc(100%_/_4)] flex flex-col`)}              
                  >
                    { produtosInternos?.map(( product )=>(
                      <ProductCard
                        product={product}
                        itemListName={title}
                        layout={cardLayout}
                        IdCollection={IdCollection ?? "156"}
                        tagWarningWidth="80%"
                      />                    
                    )) }
                  </Slider.Item>
                )
              })}          
            </Slider>
          )
        : (
          <Slider 
          class={clx(`container carousel carousel-start gap-6 col-span-full row-span-full py-2 mb-8 lg:mb-0'}`)}>
            {products?.map((product, index) => {
                return(
                  <Slider.Item
                    index={index}
                    class={clx(`carousel-item lg:w-[270px] ${slideTwoRow ? 'max-lg:w-[335px]' : ''}`)}              
                  >
                    <ProductCard
                      product={product}
                      itemListName={title}
                      layout={cardLayout}
                      IdCollection={IdCollection ?? "156"}
                      tagWarningWidth="80%"
                    />
                  </Slider.Item>
                )
            })}         
        </Slider>          
          )
        }      

        <>
          <div
            class={clx(`flex items-center justify-center z-10 col-start-1 row-start-2  ${
              CONDITIONAL_RESPONSIVE_PARAMS[
                showPaginationArrows ? showPaginationArrows : "Always"
              ]}
              ${slideTwoRow ? 'absolute top-2/4 -translate-y-1/2 max-lg:left-5' : ''}`)}
          >
            <Slider.PrevButton
              style={{
                minHeight: "28px",
              }}
              class="btn btn-circle border-none shadow-md bg-white lg:opacity-60 lg:hover:bg-white lg:hover:opacity-100"
            >
              <Icon
                size={32}
                id="LeftArrowFigma"
              />
            </Slider.PrevButton>
          </div>
          <div
            class={clx(`flex items-center justify-center z-10 col-start-3 row-start-2 ${
              CONDITIONAL_RESPONSIVE_PARAMS[
                showPaginationArrows ? showPaginationArrows : "Always"
              ]}
              ${slideTwoRow ? 'absolute top-2/4 -translate-y-1/2 lg:right-0 right-5' : ''}`)}>
            <Slider.NextButton
              style={{
                minHeight: "28px",
              }}
              class="btn btn-circle border-none shadow-md bg-white lg:opacity-60 lg:hover:bg-white lg:hover:opacity-100"
            >
              <Icon
                size={32}
                id="RightArrowFigma"
              />
            </Slider.NextButton>
          </div>
          <Dots
            images={products}
            className={CONDITIONAL_RESPONSIVE_PARAMS["Always"]}
            slideTwoRow={slideTwoRow}
          />
        </>

        <SendEventOnLoad
          event={{
            name: "view_item_list",
            params: {
              item_list_name: title,
              items: products.map((product) =>
                mapProductToAnalyticsItem({
                  product,
                  ...(useOffer(product.offers)),
                })
              ),
            },
          }}
        />
        <SliderJS
          rootId={id}
          infinite
          itemsPerPage={layout?.itemsPerPage?.reduce(
            (initial, { screenWidth, itemsQuantity }) => ({
              ...initial,
              [screenWidth?.toString() ?? "0"]: itemsQuantity ?? 1,
            }),
            {},
          )}
        />
      </div>
    </div>
  );
}

export default ProductShelf;