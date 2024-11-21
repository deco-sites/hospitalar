import Avatar from "$store/components/ui/Avatar.tsx";
import { parseRange } from "deco-sites/std/utils/filters.ts";
import { formatPrice } from "$store/sdk/format.ts";
import type {
  Filter,
  FilterToggle,
  FilterToggleValue,
  ProductListingPage,
} from "apps/commerce/types.ts";

interface Props {
  filters: ProductListingPage["filters"];
}

const isToggle = (filter: Filter): filter is FilterToggle =>
  filter["@type"] === "FilterToggle";

function ValueItem({ url, selected, label, quantity }: FilterToggleValue) {
  return (
    <a href={`${url}&page=1`} rel="nofollow" class="flex items-center gap-2">
      <div
        aria-checked={selected}
        class="checkbox aria-checked:bg-none rounded-none h-4 w-4"
      >
        {selected && (
          <div class="bg-primary w-full h-full border-white border-2" />
        )}
      </div>
      <span class="font-poppins not-italic font-normal text-sm leading-5 text-[#4A4B51]">
        {label}
      </span>
      {quantity > 0 && (
        <span class="font-poppins not-italic font-normal text-sm leading-5 text-[#8E8E9F]">
          ({quantity})
        </span>
      )}
    </a>
  );
}

function FilterValues({ key, values }: FilterToggle) {
  const flexDirection = key === "tamanho" || key === "cor"
    ? "flex-row"
    : "flex-col";

  return (
    <ul class={`flex flex-wrap gap-2 ${flexDirection}`}>
      {values.map((item) => {
        const { url, selected, value } = item;

        if (key === "cor" || key === "tamanho") {
          return (
            <a href={url} rel="nofollow">
              <Avatar content={value} variant={"default"} active={selected} />
            </a>
          );
        }

        if (key === "price") {
          const range = parseRange(item.value);

          return (
            range && (
              <ValueItem
                {...item}
                label={`${formatPrice(range.from)} - ${formatPrice(range.to)}`}
              />
            )
          );
        }

        return <ValueItem {...item} />;
      })}
    </ul>
  );
}

function Filters({ filters }: Props) {
  const _filters = filters.filter(isToggle).filter((filter) =>
    !filter.key.includes("category-")
  );
  const selectedFilters = _filters.reduce<FilterToggleValue[]>(
    (initial, filter) => {
      const selected = filter.values.find((value) => value.selected);
      if (!selected) return initial;

      return [...initial, selected];
    },
    [],
  );

  return (
    <ul class="flex flex-col gap-2 text-primary">
      <li class="mb-[24px]">
        <p class="font-poppins not-italic font-semibold text-base leading-6 text-[#2C376D]">
          Filtrar por:
        </p>
        {selectedFilters.length > 0 && (
          selectedFilters.map((filter) => (
            <div class="mb-2">
              <ValueItem {...filter} />
            </div>
          ))
        )}
      </li>
      {_filters.map((filter) => (
        <li class="flex flex-col gap-4">
          <details class="collapse collapse-plus" open>
            <summary
              style={{ minHeight: "auto !important" }}
              class="bg-[#EEF1F5] rounded-[60px] !h-[45px] min-h-auto collapse-title mb-[16px]"
            >
              <div class="h-full flex items-center justify-start font-poppins not-italic font-semibold text-base leading-none text-[#2C376D] text-left w-full">
                {filter.label}
              </div>
            </summary>
            <div class="collapse-content px-[20px]">
              <FilterValues {...filter} />
            </div>
          </details>
        </li>
      ))}
    </ul>
  );
}

export default Filters;