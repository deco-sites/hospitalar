import type { LoaderReturnType } from "$live/types.ts";
import type { ProductListingPage } from "apps/commerce/types.ts";
import BreadcrumbProduct from "site/components/ui/BreadcrumbProduct.tsx";

export interface Props {
  page: LoaderReturnType<ProductListingPage | null>;
}

function BreadcrumbCategory({ page }: Props) {
  if (!page?.breadcrumb) return <div />;

  return <BreadcrumbProduct class="!pb-0 pt-[10px] lg:pt-[35px]" itemListElement={page.breadcrumb.itemListElement} activeTitle={false} />;
}

export default BreadcrumbCategory;
