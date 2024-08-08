import { ICartProps } from "$store/components/minicart/Cart.tsx";
import { EditableProps as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Buttons from "$store/islands/HeaderButton.tsx";
import Modals from "$store/islands/HeaderModals.tsx";
import SearchBarComponent from "$store/islands/HeaderSearchbar.tsx";
import UserButton from "$store/islands/UserButtons.tsx";


export interface LoginSetting {
  label: string;
  href: string;
  target?: "_blank" | "_self" | "_parent" | "_top" | "framename";
}


export interface Props {
  /**
   * @title Minicart settings
   */
  minicart: ICartProps;
  /**
   * @title Search bar settings
   */
  searchbar: SearchbarProps;
  /**
   * @title Login settings
  */
  login?: LoginSetting[]
}

export const defaultLoginLinks: LoginSetting[] = [
  {
    href: "/my-account",
    label: "Minha conta",
    target: "_self"
  },
  {
    href: "/my-account/orders",
    label: "Meus pedidos",
    target: "_self"
  },
  {
    href: "https://web.whatsapp.com/send?phone=+5518997742232&text=Olá%2C+vim+pelo+site+e+gostaria+de+uma+ajuda",
    label: "Atendimento",
    target: "_blank"
  },
];

function HeaderLayout(
  {
    minicart,
    searchbar,
    login = defaultLoginLinks
  }: Props,
) {

  return (
    <header class="z-50 py-2">
      <div class="flex justify-between items-center lg:p-0">
        <div class="flex items-center gap-5">
          <Buttons variant="menu" />
          <a href="/" class="" aria-label="Store logo">
            <Icon id="Logo" class="max-sm:hidden" width={236} height={47} />
            <Icon
              id="LogoMobile"
              class="sm:hidden max-w-[45vw]"
              width={176}
              height={35}
            />
          </a>
        </div>
        <div className="hidden md:flex flex-1 w-full">
          <SearchBarComponent
            searchbar={{ variant: "desktop", ...searchbar }}
          />
        </div>
        <div class="max-lg:hidden flex justify-between">
        </div>
        <div class="flex items-center w-auto lg:justify-between xl:gap-8 lg:gap-2">
          <div class="flex items-center xl:gap-4 lg:gap-2">
            <UserButton login={login} />
            <a
              class="rounded-full border-2 border-solid no-animation btn-square btn-ghost flex items-center justify-center"
              href="/wishlist"
            >
              <Icon
                class="text-base-content"
                id="Wishlist"
                width={24}
                height={24}
                strokeWidth={1}
              />
            </a>
            <Buttons variant="cart" />
          </div>
        </div>
      </div>
      <div className="md:hidden">
        <SearchBarComponent searchbar={{ variant: "mobile", ...searchbar }} />
      </div>
      <Modals
        minicart={minicart}
      />
      {/* <WhatsApp phone={18997742232} /> */}
    </header>
  );
}

export default HeaderLayout;
