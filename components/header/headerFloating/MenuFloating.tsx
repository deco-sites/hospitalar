import { INavItem } from "$store/components/header/NavItem.tsx";

interface Props {
    navItems?: INavItem[];
}

function MenuFloating({ navItems }: Props) {
    return (
        <div class="px-10">
            <div class="relative group">
                <div class="py-3 px-5 relative z-10 hover:bg-[#EEF1F5] rounded-[40px] h-auto w-auto">
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
