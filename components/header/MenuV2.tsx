import Icon from "$store/components/ui/Icon.tsx";
import { useUI } from "$store/sdk/useUI.ts";
import { LoginSetting } from "site/components/header/HeaderLayoutV2.tsx";
import type { INavItem } from "./NavItem.tsx";
import { useUser } from "apps/vtex/hooks/useUser.ts";


export interface Props {
  items: INavItem[];
  login?: LoginSetting[]
}

function MenuItem({ item }: { item: INavItem }) {
  const component = item?.children?.length
    ? (
      item.variant === "WithBrands"
        ? (
          <div class="collapse collapse-plus relative items-start">
            <input
              type="checkbox"
              class="absolute left-0 w-full top-0"
            />
            <div class="collapse-title min-h-0 p-0 py-2.5 font-dm-sans font-normal text-sm px-0 flex items-center justify-between">
              {item.label}
            </div>
            <div class="collapse-content px-0">
              <ul class="border-t border-base-content border-solid pt-0 px-0 pl-5">
                {item.children?.map((node) => (
                  <li class="">
                    <div class="collapse collapse-plus relative items-start">
                      <input
                        type="checkbox"
                        class="absolute left-0 w-full top-0"
                      />
                      <div class="collapse-title min-h-0 p-0 py-2.5 font-dm-sans font-normal text-sm px-0 flex items-center justify-between">
                        {node.label}
                      </div>
                      <div class="collapse-content px-0">
                        <ul class="border-t border-base-content border-solid pt-0 px-0 pl-5">
                          {node.children?.map((nodeChild) => (
                            <li class="">
                              <a
                                href={nodeChild.href}
                                title={nodeChild.label}
                                class={`w-full block pt-5 font-dm-sans font-normal text-base-300 text-sm ${nodeChild.highlighted ? "text-secondary" : ""
                                  }`}
                              >
                                {nodeChild.label}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )
        : (
          <div class="collapse collapse-plus relative items-start">
            <input
              type="checkbox"
              class="absolute left-0 w-full top-0"
            />
            <div class="collapse-title min-h-0 p-0 py-2.5 font-dm-sans font-normal text-sm px-0 flex items-center justify-between">
              {item.label}
            </div>
            <div class="collapse-content px-0">
              <ul class="border-t border-base-content border-solid pt-0 px-0 pl-5">
                {item.children?.map((node) => (
                  <li class="">
                    <a
                      href={node.href}
                      title={node.label}
                      class={`w-full block pt-5 font-dm-sans font-normal text-base-300 text-sm ${item.highlighted ? "text-secondary" : ""
                        }`}
                    >
                      {node.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )
    )
    : (
      <a
        href={item.href}
        title={item.label}
        class={`w-full block py-2.5 font-dm-sans font-normal text-sm ${item.highlighted ? "text-secondary" : ""
          }`}
      >
        {item.label}
      </a>
    );

  return component;
}


function Menu({ items, login }: Props) {
  const { displayMenu } = useUI();
  const { user } = useUser();
  const username = user?.value?.name ?? user?.value?.givenName ?? user?.value?.email ?? "";

  return (
    <div class="flex flex-col justify-center px-4">
      <div class="w-full flex items-center justify-between py-4 border-b border-slate-100 border-solid pb-2">
        <div class="flex gap-1">
          <Icon
            class="text-base-content"
            id="User"
            width={24}
            height={25}
            strokeWidth={1}
          />
          <div>
            <h2 class="text-xs font-bold cursor-pointer text-primary">Bem-vindo :)</h2>
            {
              user?.value
                ? (<><p class="text-xs font-normal flex text-primary"
                >{username}
                </p>

                </>)
                : (<p class="text-xs font-normal text-primary"><a href="/my-account">Entre</a> ou <a href="/my-account">Cadastre-se</a></p>)
            }
          </div>
        </div>
        <button
          class="btn-square btn-ghost relative flex justify-center items-center rounded-full"
          onClick={() => {
            displayMenu.value = false;
          }}
        >
          <Icon id="XMark" class="text-base-content" width={24} height={24} strokeWidth={2} />
        </button>
      </div>
      {user?.value ? (<div class="flex items-center justify-center flex-col w-full gap-2 mt-4 pb-4">
        {login?.map(({href, label, target}) => (
          <a
            href={href}
            target={target}
            class="btn btn-secondary btn-rounded h-10 min-h-10 min-h-[40px] capitalize font-bold text-xs min-w-[140px]  w-full"
          >
            {label}
          </a>
        ))}
      </div>) : null}
      <ul class="flex-grow flex flex-col">
        {items.map((item) => <MenuItem item={item} />)}
      </ul>

      {user?.value ? (<a
        href="/api/vtexid/pub/logout?scope=hospitalar&returnUrl=https%3A%2F%2Fwww.hospitalardistribuidora.com.br%2F"
        class="btn-square btn-ghost border-primary mt-6 text-xs font-bold text-primary relative flex justify-center items-center rounded-[90px] w-[83px] h-[40px]">
        SAIR
      </a>) : null}
    </div>
  );
}

export default Menu;
