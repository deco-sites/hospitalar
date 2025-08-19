import Spinner from "$store/components/ui/Spinner.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import { EditableProps } from "site/components/search/Searchbar.tsx";
import type { Suggestion } from "apps/commerce/types.ts";
import NewProductCard from "site/components/product/NewProductCard.tsx";
import { useEffect } from "preact/hooks";
import { useSignal } from "@preact/signals";

export type ResultSearch = EditableProps & {
  valueSearch: string;
  notFound: boolean;
  suggestions: { value: Suggestion | null };
  loading: {
    value: boolean;
  };
  IdCollection?: string;
};

const ResultSearch = (
  { valueSearch, notFound, cardLayout, suggestions, loading, IdCollection }:
    ResultSearch,
) => {
  const isScrolling = useSignal(false);
  const lastScrollTop = 0;

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = globalThis.scrollY || document.documentElement.scrollTop;      

      if (scrollTop > lastScrollTop) {
        isScrolling.value = true;
      } else {
        isScrolling.value = false;
      }
    };

    addEventListener("scroll", handleScroll);

    return () => removeEventListener("scroll", handleScroll);
  }, []);

  if (valueSearch !== "" && suggestions?.value != null) {
    const topPosition = isScrolling.value ? "md:top-[105px]" : "md:top-[110px]";
    
    return (
      <div className={`md:absolute md:w-full ${topPosition} bg-white md:left-0 md:m-auto md:px-5 md:py-2 z-40`}>
        <div className="flex flex-col 2xl:justify-center gap-6 divide-y divide-base-200 mt-6 empty:mt-0 md:flex-row md:divide-y-0 md:max-w-[1495px] m-auto md:pb-[35px]">
          {notFound
            ? (
              <div class="py-16 md:py-6! flex flex-col gap-4 w-full">
                <span
                  class="font-medium text-xl text-center"
                  role="heading"
                  aria-level={3}
                >
                  Nenhum resultado encontrado
                </span>
                <span class="text-center text-base-300">
                  Vamos tentar de outro jeito? Verifique a ortografia ou use um
                  termo diferente
                </span>
              </div>
            )
            : (
              <>
                {suggestions.value!.searches?.length
                  ? (
                    <div class="flex flex-col gap-6 md:w-[15.25rem] md:max-w-[15.25rem]">
                      <div class="flex gap-2 items-center">
                        <span
                          class="font-medium text-xl"
                          role="heading"
                          aria-level={3}
                        >
                          Sugestões
                        </span>
                        {loading.value && <Spinner />}
                      </div>
                      <ul id="search-suggestion" class="flex flex-col gap-6">
                        {suggestions.value!.searches?.map(({ term }) => (
                          <li>
                            <a
                              href={`/busca?q=${term}`}
                              class="flex gap-4 items-center"
                            >
                              <span>
                                <Icon
                                  id="MagnifyingGlass"
                                  size={20}
                                  strokeWidth={0.01}
                                />
                              </span>
                              <span>
                                {term}
                              </span>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )
                  : null}
                <div class="flex flex-col pt-6 md:pt-0 gap-6 overflow-x-hidden md:w-full">
                  <div class="flex gap-2 items-center">
                    <span
                      class="font-medium text-xl"
                      role="heading"
                      aria-level={3}
                    >
                      Produtos sugeridos
                    </span>
                    {loading.value && <Spinner />}
                  </div>
                  <Slider class="carousel gap-2 lg:justify-between lg:gap-0">
                    {suggestions.value!.products?.map((product, index) => (
                      <Slider.Item
                        index={index}
                        class="carousel-item first:ml-4 last:mr-4 min-w-[200px] w-full max-w-[80%] lg:max-w-[20%]"
                      >
                        <NewProductCard
                          product={product}
                          layout={cardLayout}
                          class={"lg:!p-0 min-h-[325px] lg:min-h-[405px]"}
                          IdCollection={IdCollection}
                          tagWarningWidth="70%"
                        />
                      </Slider.Item>
                    ))}
                  </Slider>
                </div>
              </>
            )}
        </div>
      </div>
    );
  }

  return null;
};

export default ResultSearch;