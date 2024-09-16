import type { BreadcrumbList } from "apps/commerce/types.ts";

interface Props {
  itemListElement: BreadcrumbList["itemListElement"];
  class?: string;
  activeTitle?: boolean;
}

function BreadcrumbProduct({ class: _class, itemListElement = [], activeTitle = true }: Props) {
  const items = [{ name: "Home", item: "/" }, ...itemListElement];

  const lastItem = items[items.length - 1];

  const lastItemName = lastItem?.name;

  return (
    <div class={`breadcrumbs py-5 ${_class}`}>
      <ul class={``}>
        {items
          .filter(({ name, item }) => name && item)
          .map(({ name, item }) => (
            <li
              class={`font-poppins not-italic font-normal text-xs text-[#8E8E9F] relative inline-block last:text-[#2C376D] lg:text-base`}
            >
              <a class="!block !text-ellipsis !overflow-hidden" href={item}>
                <h3>{name}</h3>
              </a>
              <span class="w-0 h-0 border-t-[2px] border-b-[2px] border-transparent border-l-[2px] border-l-[#8E8E9F]"></span>
            </li>
          ))}
      </ul>
      { activeTitle && (
        <h1 class="font-poppins not-italic font-normal text-xs text-[#2C376D]">{lastItemName}</h1>
      ) }
    </div>
  );
}

export default BreadcrumbProduct;
