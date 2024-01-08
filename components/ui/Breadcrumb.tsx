import type { BreadcrumbList } from "apps/commerce/types.ts";

interface Props {
  itemListElement: BreadcrumbList["itemListElement"];
  class?: string;
}

function Breadcrumb({ class: _class, itemListElement = [] }: Props) {
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
              class={`text-base-300 last:text-primary last:overflow-hidden last: first:before:!content-none before:!ml-2 before:!mr-[10px] before:!h-2 before:!border-t-0 before:!rotate-0 before:!border-r-[#B8B8BC] before:!border-r before:!opacity-100`}
            >
              <a class="!block !text-ellipsis !overflow-hidden" href={item}>
               <h3>{name}</h3>
              </a>
            </li>
          ))}
      </ul>
      <h1 class="text-sm text-base-transparent opacity-0">{lastItemName}</h1>
    </div>
  );
}

export default Breadcrumb;
