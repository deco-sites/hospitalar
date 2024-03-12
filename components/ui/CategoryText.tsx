import type { SectionProps } from "$live/types.ts";
import { Head } from "$fresh/runtime.ts";
import type { LoaderReturnType } from "$live/types.ts";
import type { ProductListingPage } from "apps/commerce/types.ts";

export type TextAlign = "Left" | "Center" | "Right" | "Justify";

export const TEXT_ALIGMENT: Record<TextAlign, string> = {
  "Left": "text-left",
  "Center": "text-center",
  "Right": "text-right",
  "Justify": "text-justify",
};

export interface Category {
  /** @description RegExp to enable this text category on the current URL. Use /feminino/* to display this text category on feminino category  */
  matcher: string;
  page: LoaderReturnType<ProductListingPage | null>;

  /**
   * @title Description
   * @format html
   */
  html?: string;
  textAlign?: TextAlign;
}

function CategoryText(
  { category }: SectionProps<ReturnType<typeof loader>>,
) {
  if (!category) {
    return null;
  }

  const categoryText = category?.page?.breadcrumb
    ?.itemListElement[category?.page?.breadcrumb?.itemListElement.length - 1]
    ?.name;

  const { html, textAlign } = category;

  const textAlignment = TEXT_ALIGMENT[textAlign ? textAlign : "Center"];

  return (
    <>
      <Head>
        <style
          dangerouslySetInnerHTML={{
            __html: `
            .styleSeo {
              display: flex;
              flex-direction: column;
              align-items: flex-start;
              gap: 16px;          
            }
            .styleSeo h2 {
              color: var(--Action-Primary, #2D386E);
              font-family: Poppins;
              font-size: 16px;
              font-style: normal;
              font-weight: 700;
              line-height: 110%;
            }

            .styleSeo h3 {
              color: var(--Action-Primary, #2D386E);
              font-family: Poppins;
              font-size: 16px;
              font-style: normal;
              font-weight: 700;
              line-height: 110%;
            }

            .styleSeo p {
              color: var(--Colors-Grey-2, #4A4B51);
              font-family: Poppins;
              font-size: 14px;
              font-style: normal;
              font-weight: 400;
              line-height: normal;
            }

            .styleSeo a, strong {
              color: var(--Action-Primary, #2D386E);
            }

            @media screen and (max-width:760px){
              color: var(--Action-Primary, #2D386E);
            }
          `,

          }}
        />
      </Head>

      <div class={`container ${textAlignment} px-5 md:px-0`}>
        <h3 class="text-[#2D386E] max-w-5xl m-auto text-2xl md:text-[50px] my-[30px] font-bold
        ">
          {categoryText}
        </h3>
        {html
          ? (
            <div
              dangerouslySetInnerHTML={{ __html: html }}
              class="styleSeo text-neutral font-normal text-sm max-w-5xl m-auto pb-12"
            />
          )
          : null}
      </div>
    </>

  );
}

export interface Props {
  categories?: Category[];
}

export const loader = ({ categories = [] }: Props, req: Request) => {
  const category = categories.find(({ matcher }) =>
    new URLPattern({ pathname: matcher }).test(req.url)
  );

  return { category };
};

export default CategoryText;
