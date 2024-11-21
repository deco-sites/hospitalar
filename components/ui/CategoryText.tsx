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
              font-family: 'Poppins';
              font-style: normal;
              font-weight: 700;
              font-size: 14px;
              line-height: 23px;
              color: #2D386E;
            }

            .styleSeo h3 {
              font-family: 'Poppins';
              font-style: normal;
              font-weight: 700;
              font-size: 14px;
              line-height: 23px;
              color: #2D386E;
            }

            .styleSeo p {
              font-family: 'Poppins';
              font-style: normal;
              font-weight: 400;
              font-size: 12px;
              line-height: 18px;
              color: #4A4B51;
              border-bottom: 1px solid #D2D1D7;
              padding-bottom: 25px;
            }

            .styleSeo a, strong {
              color: #2D386E;
            }

            @media screen and (max-width:760px){
              color: #2D386E;
            }

            details.styleSeoBtn .minus {
              display: none;
            }

            details.styleSeoBtn .plus {
              display: block;
            }

            details.styleSeoBtn[open] .minus {
              display: block;
            }

            details.styleSeoBtn[open] .plus {
              display: none;
            }
          `,
          }}
        />
      </Head>

      <div class={`container ${textAlignment} mb-[20px] px-5`}>
        <details class="w-full styleSeoBtn">
          <summary class="bg-[#EEF1F5] rounded-full h-10 pointer lg:h-[60px] w-full flex items-center justify-between px-[20px] py-[10px] lg:py-[20px]">
            <h3 class="font-poppins font-bold text-lg leading-5 text-[#2D386E]">
              Saiba mais sobre
              <span class="font-poppins font-bold text-lg leading-5 text-[#2D386E]">
                {categoryText}
              </span>
            </h3>
            <span class="minus font-poppins not-italic font-medium text-base leading-6 text-left text-[#2C376D]">
              -
            </span>
            <span class="plus font-poppins not-italic font-medium text-base leading-6 text-left text-[#2C376D]">
              +
            </span>
          </summary>
          {html
            ? (
              <div
                dangerouslySetInnerHTML={{ __html: html }}
                class="styleSeo text-neutral font-normal text-sm pb-12 mt-[20px] px-[15px]"
              />
            )
            : null}
        </details>
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