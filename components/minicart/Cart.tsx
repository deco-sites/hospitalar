import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { sendEvent } from "$store/sdk/analytics.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import { useCart } from "apps/vtex/hooks/useCart.ts";
import CartItem from "./CartItem.tsx";
import Coupon from "./Coupon.tsx";
import { useUI } from "$store/sdk/useUI.ts";
import FreeShippingProgressBar from "site/components/minicart/FreeShippingProgressBar.tsx";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "accent"
  | "outline";

export interface ICartProps {
  /**
   * @title Hide clear all items button?
   * @default false
   */
  showClearButton?: boolean;
  desktop: {
    /**
     * @title finish order button variant
     */
    buttonMode?: ButtonVariant;
  };
  mobile: {
    /**
     * @title finish order button variant
     */
    buttonMode?: ButtonVariant;
  };
  /**
   * @title finish button label
   * @default Finalzar Compra
   */
  goToCartLabel?: string;
  /**
   * @title Aviso do fretometro
   */
  rule_text?: string;
  /**
   * @title Link para o regulamento
   */
  redirect_link?: string;
  /**
   * @title Texto do regulamento
   */
  redirect_text?: string;
  /**
   * @title Texto a esquerda do valor
   */
  left_text?: string;
  /**
   * @title Texto a direita do valor
   */
  right_text?: string;
}

interface TotalizerProps {
  label?: string;
  value?: number;
  highlighted?: boolean;
  currencyCode: string;
  locale: string;
}

export const BUTTON_VARIANTS: Record<string, string> = {
  "primary": "primary hover:text-base-100",
  "secondary": "secondary hover:text-base-100",
  "accent": "accent text-base-content hover:text-base-100",
  "outline": "outline border border-base-content hover:bg-base-content",
};

function Totalizer(
  { value, label, currencyCode, locale }: TotalizerProps,
) {
  if (!value) return null;

  return (
    <div class="flex justify-between items-center w-full text-gray-500">
      <span class="text-sm max-md:text-xs text-base-content">{label}</span>
      <span class="text-sm max-md:text-xs text-base-content">
        {formatPrice(value / 100, currencyCode!, locale)}
      </span>
    </div>
  );
}

function Cart(props: ICartProps) {
  const { displayCart } = useUI();
  const {
    desktop: {
      buttonMode,
    },
    mobile: {
      buttonMode: buttonModeMobile,
    },
    showClearButton = true,
  } = props;
  const { loading, mapItemsToAnalyticsItems, removeAllItems, cart } = useCart();
  const isCartEmpty = cart.value?.items.length === 0;

  const locale = cart.value?.clientPreferencesData.locale;
  const currencyCode = cart.value?.storePreferencesData.currencyCode;
  const total =
    cart.value?.totalizers?.find((item) => item.id === "Items")?.value || 0;
  const discounts =
    cart.value?.totalizers?.find((item) => item.id === "Discounts")?.value || 0;

  if (cart.value === null) {
    return null;
  }

  // Empty State
  if (isCartEmpty) {
    return (
      <div class="flex flex-col justify-center items-center h-full">
        <Icon id="SadFace" width={70} height={70} />
        <span class="font-medium text-[19px] text-primary mt-6 lg:text-base">
          Sua sacola esta vazia
        </span>
        <p class="text-sm font-normal max-w-[260px] text-center text-base-300">
          Você ainda não adicionou nenhuma peça na sua sacola.
        </p>
      </div>
    );
  }

  const subTotal = cart.value.items.reduce(
    (acc, current) => current.price + acc,
    0,
  );

  const handleFinishPurchase = () => {
    sendEvent({
      name: "begin_checkout",
      params: {
        currency: cart.value ? currencyCode! : "",
        value: total ? (total - (discounts ?? 0)) / 100 : 0,
        coupon: cart.value?.marketingData?.coupon ?? undefined,
        items: cart.value ? mapItemsToAnalyticsItems(cart.value) : [],
      },
    });
  };

  return (
    <>
      <ul
        role="list"
        class="px-5 max-h-[calc(100vh-390px)] my-3 flex-grow overflow-y-auto flex flex-col gap-6 lg:px-10"
      >
        {cart.value.items.map((_, index) => (
          <li key={index}>
            <CartItem index={index} currency={currencyCode!} />
          </li>
        ))}
      </ul>

      <footer class="flex flex-col items-center justify-center max-lg:px-5 px-10">

        <FreeShippingProgressBar 
          redirect_link={props.redirect_link} 
          redirect_text={props.redirect_text} 
          rule_text={props.rule_text}
          left_text={props.left_text}
          right_text={props.right_text}
          locale ={locale}  
          currency={currencyCode}  
          total={total} 
          target = {discounts} 
        />

        <Coupon />
        <Totalizer
          currencyCode={currencyCode as string}
          label="Subtotal"
          locale={locale as string}
          value={subTotal}
        />
        <Totalizer
          currencyCode={currencyCode as string}
          label="Descontos"
          locale={locale as string}
          value={discounts as number}
        />

        {total && (
          <div class="flex flex-col justify-end items-end gap-2 py-3 mx-5 border-solid border-b-[1px] border-base-200 lg:mx-10 w-full">
            <div class="flex justify-between items-center w-full font-bold text-xs text-base-content lg:text-sm">
              <span class="text-primary max-md:text-xs">
                Total
              </span>
              <span class="text-primary max-md:text-xs">
                {formatPrice(total / 100, currencyCode!, locale)}
              </span>
            </div>
          </div>
        )}
        <div class="p-4 flex justify-between mx-10 px-0 w-full gap-2 flex-col">
          <Button
            data-deco="buy-button"
            class="h-9 btn-outline text-xs lg:text-sm font-medium transition-all lg:h-10 whitespace-nowrap px-6"
            disabled={loading.value || cart.value.items.length === 0}
            onClick={() => {
              displayCart.value = false;
            }}
          >
            Continue comprando
          </Button>
          <a class="w-full flex justify-center" href="/checkout">
            <Button
              data-deco="buy-button"
              class={`h-9 btn-${
                BUTTON_VARIANTS[buttonMode as string]
              } font-medium text-xs w-full text-base-100 lg:text-sm lg:h-10`}
              disabled={loading.value || cart.value.items.length === 0}
              onClick={handleFinishPurchase}
            >
              Finalizar Compra
            </Button>
          </a>
        </div>
      </footer>
    </>
  );
}

export default Cart;
