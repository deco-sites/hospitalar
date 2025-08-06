import { Product } from "apps/commerce/types.ts";
import { useOffer } from "$store/sdk/useOffer.ts";

export function fix_data_struct_by_pix_payment(product: Product) {
  const { listPrice } = useOffer(product.offers);

  if (product.offers?.highPrice && listPrice) {
    product.offers.highPrice = listPrice;
  }

  if (product.offers?.offers && listPrice) {
    if (
      product.offers.offers[0].priceSpecification[0].priceType ===
        "https://schema.org/ListPrice"
    ) {
      product.offers.offers[0].priceSpecification[0].price = listPrice;
    }
  }

  return product;
}
