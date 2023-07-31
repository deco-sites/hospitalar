import { ICartProps } from "$store/components/minicart/Cart.tsx";
import { EditableProps as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Buttons from "$store/islands/HeaderButton.tsx";
import Modals from "$store/islands/HeaderModals.tsx";
import SearchBar from "$store/islands/HeaderSearchbar.tsx";

export interface Props {
  /**
   * @title Minicart settings
   */
  minicart: ICartProps;
  /**
   * @title Search bar settings
   */
  searchbar: SearchbarProps;
}

function HeaderLayout(
  {
    minicart,
    searchbar,
  }: Props,
) {
  return (
    <header class="z-50 py-2">
      <div class="flex justify-between items-center lg:p-0">
        <div class="flex items-center gap-5">
          <Buttons variant="menu" />
          <a href="/" class="" aria-label="Store logo">
            <Icon id="Logo" class="max-sm:hidden" width={236} height={47} />
            <Icon id="LogoMobile" class="sm:hidden max-w-[45vw]" width={176} height={35} />
          </a>
        </div>
        <div class="max-lg:hidden flex justify-between">
        </div>
        <div class="flex items-center w-auto lg:justify-between xl:gap-8 lg:gap-2">
          <div class="flex items-center xl:gap-4 lg:gap-2">
            <Buttons variant="search" />
            <SearchBar searchbar={{ ...searchbar, variant: "mobile" }} />
            <a
              class="max-lg:hidden rounded-full border-2 border-solid no-animation btn-square btn-ghost flex items-center justify-center"
              href="/login"
            >
              <Icon
                class="text-base-content"
                id="User"
                width={24}
                height={25}
                strokeWidth={1}
              />
            </a>
            <Buttons variant="cart" />
          </div>
        </div>
      </div>

      <Modals
        minicart={minicart}
      />
    </header>
  );
}

export default HeaderLayout;
