import { ICartProps } from "$store/components/minicart/Cart.tsx";
import { EditableProps as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Buttons from "$store/islands/HeaderButton.tsx";
import Modals from "../../../islands/HeaderModalsV3.tsx";
import SearchBarComponent from "$store/islands/HeaderSearchbar.tsx";
import { useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";
import MenuFloating from "$store/components/header/headerFloating/MenuFloating.tsx";
import { INavItem } from "$store/components/header/NavItem.tsx";
import { Device } from "@deco/deco/utils";
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
type IProps = Props & {
    device?: Device;
    navItems?: INavItem[];
};
function HeaderLayout({ minicart, searchbar, device, navItems }: IProps) {
    const isScrolling = useSignal(false);
    const lastScrollTop = 0;
    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = globalThis.scrollY || document.documentElement.scrollTop;
            if (scrollTop > lastScrollTop) {
                isScrolling.value = true;
            }
            else {
                isScrolling.value = false;
            }
        };
        addEventListener("scroll", handleScroll);
        return () => removeEventListener("scroll", handleScroll);
    }, []);
    if (device == "desktop") {
        return (<>
        <header className={`left-0 bg-white right-0 z-50 transition-all duration-300 ease-in-out top-0 ${isScrolling.value ? "fixed" : "static"}`}>
          {isScrolling.value
                ? (<div class="z-50 py-2 container w-full m-auto ">
                  <div class="flex justify-between items-center lg:p-0">
                    <div class="flex items-center gap-5">
                      <a href="/" class="" aria-label="Store logo">
                        <Icon id="LogoMini" width={23} height={46}/>
                      </a>
                    </div>
                    <div className="flex">
                      <MenuFloating navItems={navItems}/>
                    </div>
                    <div className="flex flex-1 w-full">
                      <SearchBarComponent searchbar={{ variant: "desktop", ...searchbar }}/>
                    </div>
                    <div class="max-lg:hidden flex justify-between">
                    </div>
                    <div class="flex items-center w-auto lg:justify-between xl:gap-8 lg:gap-2">
                      <div class="flex items-center xl:gap-4 lg:gap-2">
                        <a class="rounded-full gap-[6px] min-w-[120px] border-2 border-solid no-animation btn-square btn-ghost flex items-center justify-center" href="/my-account">
                          <Icon class="text-base-content" id="User" width={24} height={25} strokeWidth={1}/>
                          <div>
                            <h2 class="text-xs font-normal cursor-pointer">Minha conta</h2>
                          </div>
                        </a>
                        <a class="hidden sm:flex rounded-full border-2 border-solid no-animation btn-square btn-ghost  items-center justify-center" href="/wishlist">
                          <Icon class="text-base-content" id="Wishlist" width={24} height={24} strokeWidth={1}/>
                        </a>

                        <Buttons variant="cart"/>
                      </div>
                    </div>
                  </div>
                </div>)
                : (<div class="z-50 py-2 container w-full m-auto px-5">
                  <div class="flex justify-between items-center lg:p-0">
                    <div class="flex items-center gap-5">
                      <a href="/" class="" aria-label="Store logo">
                        <Icon id="Logo" width={236} height={47}/>
                      </a>
                    </div>
                    <div className="flex flex-1 w-full">
                      <SearchBarComponent searchbar={{ variant: "desktop", ...searchbar }}/>
                    </div>
                    <div class="max-lg:hidden flex justify-between">
                    </div>
                    <div class="flex items-center w-auto lg:justify-between xl:gap-8 lg:gap-2">
                      <div class="flex items-center xl:gap-4 lg:gap-2">
                        <a class="rounded-full gap-[6px] min-w-[120px] border-2 border-solid no-animation btn-square btn-ghost flex items-center justify-center" href="/my-account">
                          <Icon class="text-base-content" id="User" width={24} height={25} strokeWidth={1}/>
                          <div>
                            <h2 class="text-xs font-normal cursor-pointer">Minha conta</h2>
                          </div>
                        </a>
                        <a class="hidden sm:flex rounded-full border-2 border-solid no-animation btn-square btn-ghost  items-center justify-center" href="/wishlist">
                          <Icon class="text-base-content" id="Wishlist" width={24} height={24} strokeWidth={1}/>
                        </a>

                        <Buttons variant="cart"/>
                      </div>
                    </div>
                  </div>
                </div>)}
          <Modals minicart={minicart}/>
        </header>
      </>);
    }
    return (<>
      <header class="z-50 py-2 container w-full m-auto px-5">
        <div class="flex justify-between items-center lg:p-0">
          <div class="flex items-center gap-5">
            <Buttons variant="menu"/>
            <a href="/" class="" aria-label="Store logo">
              <Icon id="Logo" class="max-sm:hidden" width={236} height={47}/>
              <Icon id="LogoMobile" class="sm:hidden max-w-[45vw]" width={176} height={35}/>
            </a>
          </div>
          <div className="hidden md:flex flex-1 w-full">
            <SearchBarComponent searchbar={{ variant: "desktop", ...searchbar }}/>
          </div>
          <div class="max-lg:hidden flex justify-between">
          </div>
          <div class="flex items-center w-auto lg:justify-between xl:gap-8 lg:gap-2">
            <div class="flex items-center xl:gap-4 lg:gap-2">
              <a class="rounded-full border-2 border-solid no-animation btn-square btn-ghost flex items-center justify-center" href="/my-account">
                <Icon class="text-base-content" id="User" width={24} height={25} strokeWidth={1}/>
              </a>
              <a class="flex rounded-full border-2 border-solid no-animation btn-square btn-ghost  items-center justify-center" href="/wishlist">
                <Icon class="text-base-content" id="Wishlist" width={24} height={24} strokeWidth={1}/>
              </a>

              <Buttons variant="cart"/>
            </div>
          </div>
        </div>
        <div>
          <SearchBarComponent searchbar={{ variant: "mobile", ...searchbar }}/>
        </div>
        <Modals minicart={minicart}/>
      </header>
    </>);
}
export default HeaderLayout;
