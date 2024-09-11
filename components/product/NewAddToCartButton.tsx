import Button from "$store/components/ui/Button.tsx";
import {
  Options as UseAddToCartProps,
  useAddToCart,
} from "$store/sdk/useAddToCart.ts";
import Icon from "$store/components/ui/Icon.tsx";

interface Props extends UseAddToCartProps {
  /**
   * @description Product id
   */
  sellerId: string;
  label?: string;
  classes?: string;
}

function NewAddToCartButton(
  {
    skuId,
    sellerId,
    discount,
    price,
    productGroupId,
    name,
    label,
    classes,
    quantity,
  }: Props,
) {
  const props = useAddToCart({
    skuId,
    sellerId,
    discount,
    price,
    productGroupId,
    name,
    quantity,
  });

  return (
    <Button data-deco="add-to-cart" {...props} class={classes}>
      <p class="flex gap-2 items-center justify-center">
        <Icon id="ShoppingCartNew" width={24} height={24} />
        <span class="font-poppins not-italic font-semibold text-base text-white">{label ?? "Comprar"}</span>
        <span class="hidden lg:inline font-poppins not-italic font-semibold text-base text-white">
          {label ?? "Adicionar ao carrinho"}
        </span>
      </p>
    </Button>
  );
}

export default NewAddToCartButton;
