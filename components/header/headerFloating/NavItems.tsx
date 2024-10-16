import { Image, INavItem } from "$store/components/header/NavItem.tsx";
import { LoginSetting } from "$store/components/header/HeaderLayoutV2.tsx";
import { useState } from "preact/hooks";
import Icon from "$store/components/ui/Icon.tsx";

interface Props {
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


function NavItemDropDown(
    { elements }: {
        elements?: INavItem[];
        variant?: string;
        image?: Image;
    },
) {

    const [item, setItem] = useState<INavItem[]>([])
    const [selected, setSelected] = useState<number>(-1)

    if (!elements?.length) return null;

    return (
        <div
            class="absolute hidden top-full rounded-b-lg left-0 hover:flex group-hover:flex bg-base-100 z-50 items-start justify-center gap-6 w-max shadow-md"
        >
            <div class="container w-full pt-6 pb-7 pr-7 pl-5 m-auto flex items-start justify-start gap-16">
                <div class="flex flex-row">
                    <ul>
                        {elements?.map((element, index) => {
                            return (
                                <li
                                    class={`flex group items-center justify-between hover:text-[#2C376D] ${ selected == index ? "text-[#2C376D]": "text-[#8E8E9F]"} text-sm mb-4 font-semibold`}
                                    onMouseEnter={() => {setItem(element?.children ?? []),setSelected(index)}}
                                >
                                    {element?.label}
                                    <Icon 
                                        class="pl-4 group-hover:text-[#2C376D] text-[#8E8E9F]" 
                                        id={ selected == index ? "ArrowRightInline" : "ArrowRightInlineDark"} 
                                        width={31} 
                                        height={12} 
                                    />
                                </li>
                            )
                        })}
                    </ul>
                    <div class="w-auto ml-10">
                        <ul
                            class="grid-flow-col"
                            style={`
                                display: grid;
                                grid-template-columns: minmax(100px, 1fr);
                                grid-template-rows: repeat(13, minmax(0, 1fr));
                                column-gap: 50px;
                                row-gap: 12px;
                            `}
                        >
                            {
                                item?.map(({ label }) => {
                                    return (
                                        <li class="font-normal text-xs text-[#2C376D]">{label}</li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

function NavItem({
    item
}: { item: INavItem }) {
    const { href, label, children, variant, image } = item;
    return (
        <li
            class="group relative flex items-center hover:bg-white"
        >
            <a
                href={href}
                class="px-4 py-2 my-2 w-full text-center"
            >
                <span
                    class="text-white group-hover:text-[#2C376D] text-sm transition-all font-bold duration-300"
                >
                    {label}
                </span>
            </a>
            <NavItemDropDown variant={variant} elements={children} image={image} />
        </li>
    )
}


function NavItems({
    navItems
}: Props) {
    return (
        <div class="bg-[#2D386E] w-full my-0 shadow-md">
            <div class="container w-full m-auto px-5">
                <div class="flex justify-between items-center lg:p-0">
                    <li class="max-lg:hidden flex justify-between flex-1">
                        {navItems && navItems?.length
                            ? navItems?.map((item) => <NavItem key={item.label} item={item} />)
                            : null}
                    </li>
                </div>
            </div>

        </div>
    )
}

export default NavItems