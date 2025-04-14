import type { LoaderReturnType } from "$live/types.ts";
import type { Product } from "apps/commerce/types.ts";
import { useEffect, useState } from "preact/compat";
import ProductCard from "site/components/product/ProductCard.tsx";
import { AppContext } from "site/apps/site.ts";
import { notFound } from "deco/mod.ts";

export interface TextSugestion {
  firstText: string;
  secondText: string;
  thirdText: string;
  fourthText: string;
}

export interface Props {
  textSugestions: TextSugestion;
  products: LoaderReturnType<Product[] | null>;
}

export const loader = (props: Props, _req: Request, ctx: AppContext) => {
  ctx.response.status = 404;
  if (ctx.isBot) {
    notFound();
  }
  return props;
}

function SearchNotFound({ textSugestions, products }: Props) {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setSearchTerm(window.location.search.replace("?q=", ""));
  }, []);

  return (
    <div class="container mx-auto w-full px-5 lg:px-0 mb-8">
      <div class="flex flex-col justify-center items-center gap-5 lg:mt-12  text-center mb-24">
        <h1 class="text-primary text-xl font-bold lg:text-3xl text-center mt-8 w-full lg:mt-[62px] lg:tracking-[1px] whitespace-normal">
          Busca não encontrada!
        </h1>
        <span class="lg:text-xl tracking-normal text-primary text-center font-normal text-base  lg:font-bold">
          Você buscou por{" "}
          <strong class="text-secondary uppercase font-normal lg:font-bold text-base lg:text-xl tracking-wide">"{searchTerm}"</strong>
          e infelizmente não temos resultado para essa busca 😞
        </span>

        <a href="/" alt="botão para home" >
          <button class="flex py-3 px-8 justify-center items-center bg-secondary rounded-[90px] text-primary
            text-xs font-bold  hover:brightness-90 ">Voltar para o início</button>
        </a>

      </div>
      <div class="flex flex-col lg:flex-row gap-12 px-2 lg:px-0">
        <div class="flex flex-col justify-start gap-3 items-center w-full lg:w-[30%]">

          <div class="w-full lg:max-w-[268px] flex flex-col gap-4  justify-center ">
            <h2 class="text-[18px] lg:text-[22px] font-bold text-primary">
              Busque novamente
            </h2>
            <form
              id="searchbar"
              action={"/busca"}
              class="flex  border-b-1 border-[#C5C7CC]  lg:w-full"
            >
              <div class="flex w-full mx-auto gap-[10px]">
                <input
                  id="search-input"
                  class="focus:w-full w-full m-auto lg:w-full transition-all duration-200 
                font-light text-gray-heavy text-sm  outline-none 
                 rounded-[90px] border border-solid border-gray-3 py-[15px] lg:py-4  px-5 lg:px-4 text-gray-4"
                  name={"q"}
                  placeholder={"digite sua busca aqui"}
                  role="combobox"
                  aria-controls="search-suggestion"
                  autocomplete="off"
                />
              </div>
            </form>
          </div>

          <ul class="mx-[4%] flex flex-col items-center w-full">
            <li class="py-5 flex items-center lg:text-center gap-4 border-b-2  w-full lg:w-[268px]  border-[#C5C6CB] border-solid">
              <strong
                style={{ fontFamily: "Poppins" }}
                class="w-9 py-[6px] px-[10px] flex items-center justify-center gap-3 rounded-[40px] bg-[#85BAD5]"
              >
                <span class="flex font-bold text-base text-primary"> 01</span>
              </strong>
              <p class="text-sm text-left font-light text-[#4A4B51] tracking-[0]">
                {textSugestions?.firstText}
              </p>
            </li>
            <li class="py-5 flex items-center lg:text-center gap-4 border-b-2  w-full lg:w-[268px]  border-[#C5C6CB] border-solid">
              <strong
                style={{ fontFamily: "Poppins" }}
                class="w-9 py-[6px] px-[10px] flex items-center justify-center gap-3 rounded-[40px] bg-[#85BAD5]"
              >
                <span class="flex font-bold text-base text-primary">02</span>
              </strong>
              <p class="text-sm text-left font-light text-[#4A4B51] tracking-[0]">
                {textSugestions?.secondText}
              </p>
            </li>
            <li class="py-5 flex items-center lg:text-center gap-4 border-b-2  w-full lg:w-[268px]  border-[#C5C6CB] border-solid">
              <strong
                style={{ fontFamily: "Poppins" }}
                class="w-9 py-[6px] px-[10px] flex items-center justify-center gap-3 rounded-[40px] bg-[#85BAD5]"
              >
                <span class="flex font-bold text-base text-primary">03</span>
              </strong>
              <p class="text-sm text-left font-light text-[#4A4B51] tracking-[0]">
                {textSugestions?.thirdText}
              </p>
            </li>

            <li class="py-5 flex items-center lg:text-center gap-4 border-b-2  w-full lg:w-[268px]  border-[#C5C6CB] border-solid">
              <strong
                style={{ fontFamily: "Poppins" }}
                class="w-9 py-[6px] px-[10px] flex items-center justify-center gap-3 rounded-[40px] bg-[#85BAD5]"
              >
                <span class="flex font-bold text-base text-primary">04</span>
              </strong>
              <p class="text-sm  text-left font-light text-[#4A4B51] tracking-[0]">
                {textSugestions?.fourthText}
              </p>
            </li>
          </ul>
        </div>
        <div class="flex flex-col items-center justify-center w-full lg:w-[70%]">
          <div class="w-full">
            <h2 class="mx-auto p-[20px] lg:p-0 text-primary text-[.9375rem] lg:text-[22px] font-bold lg:mb-4">
              Sugestões para você!
            </h2>
          </div>
          <div
            class={`searchnotfound relative grid grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-5 items-start mt-[20px] `}
          >
            {products?.map((product, index) => (
              <div class="w-full list-none ">
                <ProductCard
                  product={product}
                  preload={index === 0}
                  layout={{
                    discount: { label: "OFF", variant: "emphasis" },
                    hide: { skuSelector: true, productDescription: true },
                    basics: { contentAlignment: "Center" },
                    onMouseOver: {
                      image: "Zoom image",
                      showCardShadow: true,
                      showCta: true,
                    },
                  }}
                  IdCollection={"156"}
                  tagWarningWidth="70%"
                  positionBottom="bottom-0"
                  classFrreShipping="hidden lg:block"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchNotFound;
