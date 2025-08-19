import Avatar from "$store/components/ui/Avatar.tsx";
import { useVariantPossibilities } from "$store/sdk/useVariantPossiblities.ts";
import type { Product } from "apps/commerce/types.ts";

interface Props {
  product: Product;
  currentURL: string;
}

function VariantSelector({ product, product: { url }, currentURL }: Props) {
  const possibilities = useVariantPossibilities(product);

  const hasUnicoValue = Object.values(possibilities).some((values) =>
    Object.keys(values).some((value) => value === "Único")
  );

  // // Return null if any value is "Único"
  // if (hasUnicoValue) {
  //   return null;
  // }

  return (
  <ul className="flex flex-col gap-5">
    {Object.entries(possibilities).map(([name, values]) => {

       if (Object.keys(values).length < 1 && name !== "Opção") return null;

      const allValuesAreUnico = Object.keys(values).every(
        (value) => value === "Único"
      );
      if (allValuesAreUnico) return null;

      return (
        <li className="flex flex-col gap-[10px]" key={name}>
          <span className="text-xs text-base-300">{name}</span>
          <ul className="flex flex-row flex-wrap gap-[5px]">
            {Object.entries(values).map(([value, { urls, inStock }]) =>
              value === "Único" ? null : (
                <li key={value}>
                  <a href={urls[0]}>
                    <Avatar
                      content={value}
                      variant={inStock ? "default" : "disabled"}
                      active={urls[0] === currentURL}
                    />
                  </a>
                </li>
              )
            )}
          </ul>
        </li>
      );
    })}
  </ul>
);
}

export default VariantSelector;