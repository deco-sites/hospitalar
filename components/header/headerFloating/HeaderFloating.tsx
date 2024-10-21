// deno-lint-ignore-file
import { ICartProps } from "$store/components/minicart/Cart.tsx";
import { EditableProps as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import { LoginSetting } from "$store/components/header/HeaderLayoutV2.tsx";
import { INavItem } from "$store/components/header/NavItem.tsx";
import NavItems from "$store/islands/NavItems.tsx";
import HeaderLayout from "site/components/header/headerFloating/HeaderLayout.tsx";
import { Section } from "$live/blocks/section.ts";
import { AppContext } from "apps/vtex/mod.ts";
import { SectionProps } from "deco/mod.ts";

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
     * @title Items do menu
     * @description Items do menu desktop e mobile
     */
    navItems?: INavItem[];
    /**
     * @title Login settings
     */
    login?: LoginSetting[]
    /**
     * @description TopBar section, displayed Topbar
     */
    topBar?: Section;
}


function HeaderFloating({
    login,
    navItems,
    minicart,
    searchbar,
    topBar,
    topBar: { Component: TopBarComponent, props: topBarProps },
    device
}: SectionProps<typeof loader>,
) {
    return (
        <div>
            {
                topBar
                    ? (
                        <div class="bg-[#DEE0E8]">
                            <TopBarComponent {...topBarProps} />
                        </div>
                    )
                    : null
            }
            <HeaderLayout minicart={minicart} searchbar={searchbar} device={device} navItems={navItems} />
            <NavItems login={login} navItems={navItems} />
        </div>
    )
}


export const loader = (props: Props, _req: Request, ctx: AppContext) => {
    return { ...props, device: ctx.device };
};
  

export default HeaderFloating;