import Filters from "$store/components/search/Filters.tsx";
import SearchControls from "$store/islands/SearchControls.tsx";
import { SendEventOnLoad } from "$store/sdk/analytics.tsx";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import ProductGallery, { Columns } from "../product/ProductGallery.tsx";
import type { LoaderReturnType } from "$live/types.ts";
import type { ProductListingPage } from "apps/commerce/types.ts";
import Sort from "$store/islands/Sort.tsx";
import SearchPagination from "$store/components/search/SearchPagination.tsx";
import { Section } from "$live/blocks/section.ts";
import { AppContext, redirect } from "$live/mod.ts";

export interface Props {
  page: LoaderReturnType<ProductListingPage | null>;
  /**
   * @description Use drawer for mobile like behavior on desktop. Aside for rendering the filters alongside the products
   */
  variant?: "aside" | "drawer";
  /**
   * @description Number of products per line on grid
   */
  columns: Columns;
  /**
   * @description Not found section, displayed when no products are found
   */
  notFoundSection: Section;

  isWishlist?: boolean;
}

function Result({
  page,
  variant,
  isWishlist,
}: Omit<Omit<Props, "page">, "notFoundSection"> & {
  page: ProductListingPage;
}) {
  const { products, filters, breadcrumb, pageInfo, sortOptions } = page;
  const { itemListElement } = page.breadcrumb;

  const productsFound = (
    <div class="flex flex-col items-start justify-start mb-[10px] mt-[15px] lg:mt-0 lg:mb-0">
      <h6 class="font-poppins not-italic font-bold text-2xl leading-10 text-[#2C376D] lg:hidden">
        {itemListElement[itemListElement.length - 1].name}
      </h6>
      <strong class="font-poppins not-italic font-bold text-base leading-6 text-[#2C376D] lg:hidden">
        {pageInfo.records} resultados
      </strong>
      <span class="hidden font-poppins not-italic font-normal text-base leading-6 text-[#2C376D] lg:block">
        Produtos encontrados: <strong>{pageInfo.records} resultados</strong>
      </span>
    </div>
  );

  return (
    <>
      <div class="hidden lg:flex w-full items-start justify-start lg:mb-[40px] lg:pt-[35px]">
        <span class="font-poppins not-italic font-bold text-[40px] leading-[40px] text-[#2C376D]">
          {itemListElement[itemListElement.length - 1].name}
        </span>
      </div>
      <div>
        <div class="flex flex-row gap-8">
          {variant === "aside" && filters.length > 0 && (
            <aside class="hidden lg:block w-min mt-1 min-w-[270px]">
              <Filters filters={filters} />
            </aside>
          )}
          <div class="flex flex-col gap-5 w-full">
            <div class="lg:hidden">
              {productsFound}
            </div>
            <div class="flex justify-between items-center gap-2.5">
              <div class="hidden lg:block">
                {productsFound}
              </div>
              <SearchControls
                sortOptions={sortOptions}
                filters={filters}
                breadcrumb={breadcrumb}
                displayFilter={variant === "drawer"}
                isWishlist={isWishlist}
              />
              {sortOptions.length > 0
                ? (
                  <label class="flex gap-[10px] w-1/2 lg:w-auto items-center">
                    <span class="text-base-300 hidden whitespace-nowrap lg:inline">
                      Ordenar por:
                    </span>
                    <Sort sortOptions={sortOptions} />
                  </label>
                )
                : null}
            </div>
            <div class="flex-grow">
              <ProductGallery products={products} />
              <SearchPagination pageInfo={pageInfo} />
            </div>
          </div>
        </div>
      </div>
      <SendEventOnLoad
        event={{
          name: "view_item_list",
          params: {
            // TODO: get category name from search or cms setting
            item_list_name: "",
            item_list_id: "",
            items: page.products?.map((product) =>
              mapProductToAnalyticsItem({
                ...useOffer(product.offers),
                product,
                breadcrumbList: page.breadcrumb,
              })
            ),
          },
        }}
      />
    </>
  );
}

function SearchResult(
  {
    page,
    notFoundSection: { Component: NotFoundSection, props: notFoundProps },
    ...props
  }: Props,
) {
  if (!page || !page.products || page.products.length === 0) {
    return <NotFoundSection {...notFoundProps} />;
  }

  return <Result {...props} page={page} />;
}

export default SearchResult;

export const loader = (
  props: Props,
  req: Request,
  // deno-lint-ignore no-explicit-any
  _: AppContext<any>,
) => {
  const { page } = props;

  if (!page || !page.products || page.products.length === 0) {
    const url = new URL(req.url);
    url.pathname = "/buscavazia";
    redirect(url.toString(), 301);
  }
  return {
    ...props,
  };
};
