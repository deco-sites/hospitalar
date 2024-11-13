import { ProductDetailsPage } from "apps/commerce/types.ts";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
import { AppContext } from "apps/vtex/mod.ts";
import { type SectionProps as SectionProps } from "@deco/deco";
export interface IContentDetailsProps {
  /** @title Imagem */
  banner: LiveImage;
  /** @title Texto alternativo da Imagem */
  alt: string;
  /** @title Título */
  title: string;
  /** @title Descrição*/
  text: string;
}
export interface IAdvancedDetailListProps {
  /** @title Id do Produto */
  productId: string;
  /** @title Lista dos Detalhes */
  contentDetails: IContentDetailsProps[];
}
export interface Props {
  /** @title Lista dos produtos */
  advancedDetailList?: IAdvancedDetailListProps[];
  page: ProductDetailsPage | null;
}
export function loader(props: Props, _req: Request, _: AppContext) {
  const { advancedDetailList, page } = props;
  const productId = page?.product.productID;
  if (!productId || !advancedDetailList) {
    return { success: false };
  }
  const productExistInList = advancedDetailList.filter((advancedDetail) => {
    return advancedDetail.productId === productId;
  });
  if (productExistInList.length === 0) {
    return { success: false };
  }
  return {
    success: true,
    contentDetails: productExistInList[0].contentDetails,
  };
}
function ProductAdvancedDetails(props: SectionProps<typeof loader>) {
  if (
    !props.success || !props.contentDetails || props.contentDetails.length === 0
  ) {
    return null;
  }
  return (
    <div className="container w-full m-auto px-5 my-5 lg:my-10">
      <div className="flex w-full h-auto flex-col gap-14">
        {props.contentDetails.map(({ banner, text, title, alt }, index) => {
          return (
            <div
              className={`flex flex-col gap-5 lg:gap-14 ${
                index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
              } lg:items-center`}
            >
              <div className="w-full overflow-hidden rounded-2xl">
                <img className="w-full h-auto" src={banner} alt={alt} />
              </div>
              <div className="w-full px-5 flex flex-col gap-2">
                <span
                  style={{ fontFamily: "Poppins" }}
                  className="text-border-free-shipping font-bold text-lg lg:text-2xl"
                >
                  {title}
                </span>
                <p
                  style={{ fontFamily: "Poppins" }}
                  className="text-title-product font-normal text-sm lg:text-base"
                >
                  {text}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default ProductAdvancedDetails;
