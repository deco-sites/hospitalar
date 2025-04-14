import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { sendEvent } from "$store/sdk/analytics.tsx";
import { useUI } from "$store/sdk/useUI.ts";
import { useCart } from "apps/vtex/hooks/useCart.ts";
import { LoginSetting } from "site/components/header/HeaderLayoutV2.tsx";
import { useUser } from "apps/vtex/hooks/useUser.ts";

function SearchButton() {
  const { displaySearchbar } = useUI();

  return (
    <Button
      class="btn-square btn-ghost flex items-center justify-center"
      aria-label="search icon button"
      onClick={() => {
        displaySearchbar.value = !displaySearchbar.peek();
      }}
    >
      <Icon
        class="text-base-content"
        id="MagnifyingGlass"
        width={24}
        height={25}
        strokeWidth={1}
      />
    </Button>
  );
}

function MenuButton() {
  const { displayMenu } = useUI();

  return (
    <Button
      class="rounded-full border-2 border-solid no-animation btn-ghost relative flex justify-center items-center lg:hidden"
      aria-label="open menu"
      onClick={() => {
        displayMenu.value = true;
      }}
    >
      <Icon class="text-base-content" id="Menu" width={25} height={25} />
    </Button>
  );
}

function CartButton() {
  const { displayCart } = useUI();
  const { loading, cart, mapItemsToAnalyticsItems } = useCart();
  const totalItems = cart.value?.items.length || null;
  const currencyCode = cart.value?.storePreferencesData.currencyCode;
  const total = cart.value?.totalizers.find((item) => item.id === "Items");
  const discounts = cart.value?.totalizers.find((item) =>
    item.id === "Discounts"
  );

  const onClick = () => {
    displayCart.value = true;
    sendEvent({
      name: "view_cart",
      params: {
        currency: cart.value ? currencyCode! : "",
        value: total?.value
          ? (total?.value - (discounts?.value ?? 0)) / 100
          : 0,

        items: cart.value ? mapItemsToAnalyticsItems(cart.value) : [],
      },
    });
  };

  return (
    <Button
      class="btn-square btn-ghost relative flex justify-center items-center"
      aria-label="open cart"
      data-deco={displayCart.value && "open-cart"}
      loading={loading.value}
      onClick={onClick}
    >
      <div class="indicator">
        {totalItems && (
          <span class="indicator-item text-base-100 bg-secondary w-4 h-4 rounded-t-full rounded-r-full text-xs left-3 top-0 font-bold">
            {totalItems > 9 ? "9+" : totalItems}
          </span>
        )}
        <Icon
          class="text-base-content"
          id="ShoppingCart"
          width={24}
          height={25}
          strokeWidth={1}
        />
      </div>
    </Button>
  );
}

export function UserButton({ login }: { login: LoginSetting[] }) {
  const { displayLogin } = useUI();
  const { user } = useUser();
  const username = user?.value?.name ?? user?.value?.givenName ??
    user?.value?.email ?? "";

  return (
    <div class="max-lg:hidden no-animation relative flex items-center justify-center min-w-[150px] group">
      <div class="flex gap-1">
        <Icon
          class="text-base-content"
          id="User"
          width={24}
          height={25}
          strokeWidth={1}
        />
        <div>
          <h2 class="text-xs font-bold cursor-pointer">Bem-vindo :)</h2>
          {user?.value
            ? (
              <>
                <p
                  class="text-xs font-normal flex"
                  onMouseEnter={() => {
                    displayLogin.value = true;
                  }}
                  onMouseLeave={() => {
                    setTimeout(() => {
                      displayLogin.value = false;
                    }, 1000);
                  }}
                >
                  {username}{" "}
                  <Button
                    class="border-transparent no-animation relative flex justify-center items-center"
                    aria-label="open menu"
                  >
                    {displayLogin.value
                      ? (
                        <Icon
                          class="text-base-content"
                          id="CaretUp"
                          width={14}
                          height={14}
                        />
                      )
                      : (
                        <Icon
                          class="text-base-content"
                          id="CaretDown"
                          width={14}
                          height={14}
                        />
                      )}
                  </Button>
                </p>
              </>
            )
            : (
              <p class="text-xs font-normal">
                <a href="/my-account">Entre</a> ou{" "}
                <a href="/my-account">Cadastre-se</a>
              </p>
            )}
        </div>
      </div>
      {user?.value
        ? (
          <div
            class={`absolute ${
              displayLogin.value ? "flex" : "hidden"
            } hover:flex group-hover:flex bg-accent top-[38px] shadow whitespace-nowrap p-[24px] flex-col z-10 rounded-xl gap-[6px]`}
          >
            <>
              {login.map(({ href, label, target }) => (
                <a
                  class="font-medium text-primary text-sm"
                  href={href}
                  target={target}
                >
                  {label}
                </a>
              ))}
              <hr class="bg-primary h-[2px] my-2 min-w-[152px]" />
              <a
                class="font-medium text-primary text-sm"
                href="/api/vtexid/pub/logout?scope=hospitalar&returnUrl=https%3A%2F%2Fwww.hospitalardistribuidora.com.br%2F"
              >
                Sair
              </a>
            </>
          </div>
        )
        : null}
    </div>
  );
}

function Buttons({ variant }: { variant: "cart" | "search" | "menu" }) {
  if (variant === "cart") {
    return <CartButton />;
  }

  if (variant === "search") {
    return <SearchButton />;
  }

  if (variant === "menu") {
    return <MenuButton />;
  }

  return null;
}

export default Buttons;