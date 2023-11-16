import Avatar from "$store/components/ui/Avatar.tsx";
import { useVariantPossibilities } from "$store/sdk/useVariantPossiblities.ts";
import type { Product } from "apps/commerce/types.ts";

interface Props {
  product: Product;
  currentURL: string;
}

function VariantSelector({ product, product: { url }, currentURL }: Props) {
  const possibilities = useVariantPossibilities(product);

  return (
    <ul class="flex flex-col gap-5">
      {Object.keys(possibilities).map((name) => (
        <li class="flex flex-col gap-[10px]">
          <span class="text-xs text-[#4A4B51]">{name}</span>
          <ul class="flex flex-row flex-wrap gap-[5px]">
            {Object.entries(possibilities[name]).map((
              [value, { urls, inStock }],
            ) => (
              <li>
                <a href={urls[0]}>
                  <Avatar
                    content={value}
                    variant={inStock ? "default" : "disabled"}
                    active={urls[0] === currentURL}
                  />
                </a>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}

export default VariantSelector;
