import Button from "$store/components/ui/Button.tsx";
import { useSignal } from "@preact/signals";
import { useCart } from "apps/vtex/hooks/useCart.ts";
import { useRef } from "preact/hooks";

function Coupon() {
  const { cart, loading, addCouponsToCart } = useCart();
  const ref = useRef<HTMLInputElement>(null);
  const displayInput = useSignal(false);
  const coupon = cart.value?.marketingData?.coupon;

  const toggleInput = () => {
    displayInput.value = !displayInput.value;
  };

  const applyCouponToCart = (e: MouseEvent) => {
    e.preventDefault();

    const text = ref.current?.value;

    if (typeof text === "string") {
      addCouponsToCart({ text });
      toggleInput();
    }
  };

  return (
    <div class="flex justify-between flex-col items-start px-0 mb-6 w-full gap-4">
      <span class="text-sm text-primary font-bold">Cupom de desconto</span>
      <form class="flex gap-2 w-full justify-between lg:justify-start">
        <input
          id="coupon"
          name="coupon"
          ref={ref}
          class="border-2 border-neutral outline-none rounded-full placeholder-neutral p-3 h-9 text-xs w-full"
          type="text"
          value={coupon ?? ""}
          placeholder={"Digite seu cupom de desconto aqui"}
        />
        <Button
          class="w-14 h-9 border-base-content text-base-content font-medium text-xs"
          type="submit"
          htmlFor="coupon"
          loading={loading.value}
          onClick={applyCouponToCart}
        >
          Ok
        </Button>
      </form>
    </div>
  );
}

export default Coupon;
