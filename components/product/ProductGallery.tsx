import { Product } from "apps/commerce/types.ts";

import ProductCard from "./ProductCard.tsx";

export interface Columns {
  mobile?: number;
  desktop?: number;
}

export interface Props {
  products: Product[] | null;
  IdCollection?: string;
}

function ProductGallery({ products, IdCollection }: Props) {
  return (
    <div class="grid grid-cols-2 gap-2 items-center sm:grid-cols-2 lg:grid-cols-4 lg:gap-[30px]">
      {products?.map((product, index) => (
        <ProductCard
          product={product}
          preload={index === 0}
          layout={{
            discount: { label: "OFF", variant: "emphasis" },
            hide: { skuSelector: true, productDescription: true },
            basics: { contentAlignment: "Center" },
            onMouseOver: {
              image: "Zoom image",
              showCardShadow: true,
              showCta: true,
            },
          }}
          IdCollection={IdCollection ?? "156"}
          tagWarningWidth="70%"
          positionBottom="bottom-0"
        />
      ))}
    </div>
  );
}

export default ProductGallery;
