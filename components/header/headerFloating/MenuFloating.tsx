import { INavItem } from "$store/components/header/NavItem.tsx";
import Icon from "$store/components/ui/Icon.tsx";

interface Props {
    navItems?: INavItem[];
}

function MenuFloating({ navItems }: Props) {
    return (
        <div class="px-10">
            <div class="relative group">
                <div class="py-3 px-5 flex gap-2 items-center relative z-10 hover:bg-[#EEF1F5] rounded-[40px] h-auto w-auto">
                    <Icon class="text-base-content" id="Menu" width={19} height={12} />
                    <p class="text-sm font-normal">Explorar categorias</p>
                </div>
                <ul class="max-w-max px-6 py-6 pt-16 top-0 bg-white hidden group-hover:flex rounded-2xl gap-2 absolute  flex-col">
                    {
                        navItems?.map(({ label, href }) => {
                            return (
                                <li class="text-xs font-normal">
                                    <a href={href}>{label}</a>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    )
}

export default MenuFloating;
