import Modals from "$store/islands/HeaderModalsV2.tsx";
import { LoginSetting, defaultLoginLinks } from "site/components/header/HeaderLayoutV2.tsx";
import NavItem, { INavItem } from "./NavItem.tsx";
import { megaMenuDefaultItems } from "./constants.ts";

export interface Props {
  /**
   * @title Items do menu
   * @description Items do menu desktop e mobile
   */
  navItems?: INavItem[];
    /**
   * @title Login settings
  */
  login?: LoginSetting[]
}

function HeaderNavMenu(
  {
    navItems = megaMenuDefaultItems as INavItem[],
    login = defaultLoginLinks
  }: Props,
) {
  return (
    <div class="z-50">
      <div class="flex justify-between items-center lg:p-0">
        <div class="max-lg:hidden flex justify-between flex-1">
          {navItems && navItems?.length
            ? navItems?.map((item) => <NavItem key={item.label} item={item} />)
            : null}
        </div>
      </div>

      <Modals
        menu={{ items: navItems }}
        login={login}
      />
    </div>
  );
}

export default HeaderNavMenu;
