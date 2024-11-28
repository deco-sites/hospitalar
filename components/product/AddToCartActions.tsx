import QuantitySelector from "$store/components/ui/QuantitySelector.tsx";
import { useState } from "preact/hooks";
import NewAddToCartButton from "$store/components/product/NewAddToCartButton.tsx";

type Props = {
  productID: string;
  seller: string;
  price?: number;
  listPrice?: number;
  productName: string;
  productGroupID: string;
};

export default function AddToCartActions(
  { productID, seller, price, listPrice, productName, productGroupID }: Props,
) {
  const [quantity, setQuantity] = useState(1);

  return (
    <div class="flex w-full gap-[25px]">
      <QuantitySelector
        quantity={quantity}
        onChange={(_quantity) => {
          setQuantity(_quantity);
        }}
      />
      <NewAddToCartButton
        skuId={productID}
        sellerId={seller}
        price={price ?? 0}
        discount={price && listPrice ? listPrice - price : 0}
        name={productName}
        productGroupId={productGroupID}
        quantity={quantity}
        label="Comprar"
        classes="btn-primary btn-block transition-all font-medium max-w-[225px]"
      />
    </div>
  );
}