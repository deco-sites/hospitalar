import { ICartProps } from "$store/components/minicart/Cart.tsx";
import { EditableProps as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import { LoginSetting } from "$store/components/header/HeaderLayoutV2.tsx";
import { INavItem } from "$store/components/header/NavItem.tsx";
import NavItems from "$store/islands/NavItems.tsx";
import HeaderLayout from "site/components/header/headerFloating/HeaderLayout.tsx";
import { Section } from "$live/blocks/section.ts";

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
    topBar: { Component: TopBarComponent, props: topBarProps }
}: Props,
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
            <HeaderLayout minicart={minicart} searchbar={searchbar} />
            <NavItems login={login} navItems={navItems} />
        </div>
    )
}


export default HeaderFloating;