import { Image, INavItem } from "$store/components/header/NavItem.tsx";
import { LoginSetting } from "$store/components/header/HeaderLayoutV2.tsx";
import { useState } from "preact/hooks";
import Icon from "$store/components/ui/Icon.tsx";
import Modals from "$store/islands/HeaderModalsV3.tsx";

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


function ItemsAllCategories({
    elements
}: { elements?: INavItem[]; }) {

    const [item, setItem] = useState<INavItem>()
    const [selected, setSelected] = useState<number>(-1)
    const isList = item?.children?.every(({ variant }) => variant == "CommonChild")

    return (
        <>
            <ul>
                {elements?.map((element, index) => {
                    return (
                        <>
                            {
                                element?.children?.length
                                    ? (

                                        <li
                                            class={`flex group items-center justify-between hover:text-[#2C376D] ${selected == index ? "text-[#2C376D]" : "text-[#8E8E9F]"} text-sm mb-4 font-semibold`}
                                            onMouseEnter={() => {
                                                setSelected(index);
                                                setItem(element);
                                            }}
                                        >
                                            {element?.label}
                                            <Icon
                                                class="pl-4 group-hover:text-[#2C376D] text-[#8E8E9F]"
                                                id={selected == index ? "ArrowRightInline" : "ArrowRightInlineDark"}
                                                width={31}
                                                height={12}
                                            />
                                        </li>
                                    )
                                    : (
                                        <li
                                            class={`flex group items-center justify-between hover:text-[#2C376D] ${selected == index ? "text-[#2C376D]" : "text-[#8E8E9F]"} text-sm mb-4 font-semibold`}
                                            onMouseEnter={() => {
                                                setSelected(index);
                                                setItem(element);
                                            }}
                                        >
                                            <a href={element?.href}>

                                                {element?.label}
                                            </a>
                                        </li>
                                    )
                            }
                        </>
                    )
                })}
            </ul>

            {
                item?.children?.length ? (<div>
                    <div class="w-auto">
                        {
                            isList ? (
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
                                        item?.children?.map(({ label, href }, index) => {
                                            return (
                                                <>
                                                    <li key={index} class="font-normal text-xs text-[#2C376D]"><a href={href}>{label}</a></li>
                                                </>
                                            )
                                        })
                                    }
                                </ul>
                            ) : (
                                <div class="flex flex-row gap-12">
                                    <>
                                    {item?.children?.map((element, index) => {
                                        return (
                                            <>
                                                {element?.variant == "CommonChild" && (<ItemsCommonChild key={index} elements={element?.children} />)}
                                                {element?.variant == "WithBrands" && (<ItemsWithBrands key={index} elements={element?.children} />)}
                                            </>
                                        )
                                    })}
                                </>
                                </div>
                            )
                        }
                    </div>
                </div>) : null
            }
        </>
    )
}

function ItemsCommonChild({
    elements
}: { elements?: INavItem[]; }) {
    return (
        <ul
            class="flex flex-col flex-wrap font-normal text-xs w-fit max-h-[400px]"
            style={`
                column-gap: 50px;
                row-gap: 12px;
            `}
        >
            {elements?.map((element, index) => {
                return (
                    <li
                        key={index}
                        class="text-xs block min-w-max"
                    >
                        <a href={element?.href}>
                            {element?.label}
                        </a>
                    </li>
                )
            })}
        </ul>
    )
}

function ItemsWithBrands({
    elements
}: { elements?: INavItem[]; }) {

    return (
        <div class="flex flex-col flex-wrap w-auto gap-3">
            <h2 class="text-sm font-semibold w-full">
                Marcas
            </h2>
            <ul
                class="flex flex-col flex-wrap font-normal text-xs max-h-[400px]"
                style={`
                column-gap: 34px;
                row-gap: 12px;
            `}
            >
                {elements?.map((element, index) => {
                    return (
                        <li
                            key={index}
                            class="text-[10px]"
                        >
                            <a href={element?.href}>{element?.label}</a>
                        </li>
                    )
                })}
            </ul>


        </div>
    )
}

function ItemsOther({
    elements
}: { elements?: INavItem[]; }) {

    return (
        <>
            {elements?.map((element, index) => {
                return (
                    <>
                        {element?.variant == "CommonChild" && (<ItemsCommonChild key={index} elements={element?.children} />)}
                        {element?.variant == "WithBrands" && (<ItemsWithBrands key={index} elements={element?.children} />)}
                    </>
                )
            })}
        </>
    )
}


function NavItemDropDown(
    { elements, variant }: {
        elements?: INavItem[];
        variant?: INavItem["variant"];
        image?: Image;
    },
) {

    if (!elements?.length) return null;

    return (
        <div
            class="absolute hidden top-full rounded-b-lg left-0 hover:flex group-hover:flex bg-base-100 z-50 items-start justify-center gap-6 w-max shadow-md"
        >
            <div class="container w-full pt-6 pb-7 pr-7 pl-5 m-auto flex items-start justify-start gap-16">
                <div class="flex flex-row gap-12">
                    {variant == "AllCategories" && (<ItemsAllCategories elements={elements} />)}
                    {variant == "Other" && (<ItemsOther elements={elements} />)}
                    {variant == "CommonChild" && (<ItemsCommonChild elements={elements} />)}
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
    navItems,
    login
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
            <Modals
                menu={{ items: navItems! }}
                login={login}
            />
        </div>
    )
}

export default NavItems