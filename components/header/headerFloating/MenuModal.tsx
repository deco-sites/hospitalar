import Icon from "$store/components/ui/Icon.tsx";
import { useUI } from "$store/sdk/useUI.ts";
import { LoginSetting } from "site/components/header/HeaderLayoutV2.tsx";
// import { useUser } from "apps/vtex/hooks/useUser.ts";
import { INavItem } from "$store/components/header/NavItem.tsx";

export interface Props {
    items: INavItem[];
    login?: LoginSetting[]
}

function MenuItem({ item }: { item: INavItem }) {

    const categories = item?.children ?? []

    if (categories.length) {
        return (
            <div class="min-h-[64px] border-b border-b-[#E5E7EB]  collapse collapse-plus ">
                <input
                    type="checkbox"
                    class="absolute left-0 w-full top-0"
                />
                <div class="collapse-title text-[#2C376D] font-semibold text-sm  pb-5 pt-5 pl-2 min-h-0 p-0 py-2.5 font-dm-sans px-0 flex items-center justify-between">
                    {item?.label}
                </div>

                <div class="collapse-content px-0">
                    <ul class="border-t border-base-content border-solid pt-3 px-0 pl-5">
                        {item.children?.map((node, _i) => (
                            <>
                                {!node?.children?.length ? (<li class="mb-3">
                                    <a
                                        href={node.href}
                                        title={node.label}
                                        class={`w-full block pt-0 font-dm-sans  text-[#2C376D] text-xs font-semibold ${item.highlighted ? "text-secondary" : ""
                                            }`}
                                    >
                                        {node.label}
                                    </a>
                                </li>) : (
                                    <div class="collapse mb-3">
                                        <input
                                            type="checkbox"
                                            class="absolute left-0 w-full top-0 "
                                        />
                                        <div class="collapse-title min-h-5 p-0 after:!hidden flex gap-[6px] text-[#2C376D] font-semibold text-xs relative  font-dm-sans items-center">
                                            {node?.label}
                                            <Icon
                                                class="text-base-content"
                                                id="CaretDown"
                                                width={14}
                                                height={14}
                                                strokeWidth={1}
                                            />
                                        </div>
                                        <ul class={`p-0 collapse-content`}>
                                            {node?.children?.map(({ label }, idx) => (
                                                <li class={`text-[#2C376D] font-normal text-xs mb-2 ${idx == 0 ? "mt-3" : ""}`}>{label}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </>
                        ))}
                    </ul>
                </div>
            </div>
        )
    } else {
        return (
            <li class="h-[64px] border-b border-b-[#E5E7EB] text-[#2C376D] pb-5 pt-5 pl-2 font-semibold text-sm">
                <a>
                    {item?.label}
                </a>
            </li>
        )
    }

}

function Menu({ items }: Props) {
    const { displayMenu } = useUI();
    // const { user } = useUser();
    // const username = user?.value?.name ?? user?.value?.givenName ?? user?.value?.email ?? "";

    return (
        <div class="flex flex-col justify-center px-5">
            <div class="w-full flex items-center justify-between py-4 pt-5 border-b border-slate-100 border-solid pb-2">

                <div class="w-full">
                    <div class="flex w-full justify-between pb-5 border-b border-b-[#E5E7EB]">
                        <a
                            class="btn-square btn-ghost text-xs font-medium p-3 text-[#2D386E] bg-[#EEF1F5] border-[#E5E7EB] w-auto h-[40px] relative flex justify-center items-center gap-2 rounded-full"
                            href="/my-account"
                        >
                            <Icon
                                class="text-base-content"
                                id="User"
                                width={24}
                                height={25}
                                strokeWidth={1}
                            />
                            Minha conta
                        </a>
                        <a
                            class="btn-square btn-ghost text-xs font-medium p-3 text-[#2D386E] bg-[#EEF1F5] border-[#E5E7EB] w-auto h-[40px] relative flex justify-center items-center gap-2 rounded-full"
                            href="/wishlist"
                        >
                            <Icon
                                class="text-base-content"
                                id="Wishlist"
                                width={20}
                                height={20}
                                strokeWidth={1}
                            />
                            Meus favoritos
                        </a>
                        <button
                            class="btn-square btn-ghost relative flex justify-center items-center rounded-full"
                            onClick={() => {
                                displayMenu.value = false;
                            }}
                        >
                            <Icon id="XMark" class="text-base-content" width={24} height={24} strokeWidth={2} />
                        </button>
                    </div>
                    <div class="w-full">
                        <ul class="flex-grow flex flex-col">
                            {items.map((item) => <MenuItem item={item} />)}
                        </ul>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Menu;
