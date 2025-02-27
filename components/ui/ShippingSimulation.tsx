import { Signal, useSignal } from "@preact/signals";
import { useCallback } from "preact/hooks";
import Button from "$store/components/ui/Button.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import { useCart } from "apps/vtex/hooks/useCart.ts";
import type { SimulationOrderForm, SKU, Sla } from "apps/vtex/utils/types.ts";

export interface Props {
  items: Array<SKU>;
}

const formatShippingEstimate = (estimate: string) => {
  const [, time, type] = estimate.split(/(\d+)/);

  if (type === "bd") return `${time} dias úteis`;
  if (type === "d") return `${time} dias`;
  if (type === "h") return `${time} horas`;
};

function ShippingContent({ simulation }: {
  simulation: Signal<SimulationOrderForm | null>;
}) {
  const { cart } = useCart();

  const methods = simulation.value?.logisticsInfo?.reduce(
    (initial, { slas }) => [...initial, ...slas],
    [] as Sla[],
  ) ?? [];

  const locale = cart.value?.clientPreferencesData.locale || "pt-BR";
  const currencyCode = cart.value?.storePreferencesData.currencyCode || "BRL";

  if (simulation.value == null) {
    return null;
  }

  if (methods.length === 0) {
    return (
      <div class="p-2">
        <span>CEP inválido</span>
      </div>
    );
  }

  return (
    <ul class="flex flex-col text-xs rounded-[10px]">
      {methods.map((method) => (
        <li class="flex text-base-300 px-[10px] sm:px-[20px] py-[10px] odd:bg-base-300 odd:bg-opacity-5 justify-between items-center first:rounded-t-[10px] last:rounded-b-[10px]">
          <span class="text-left font-bold break-words w-[35%]">
            {method.name}
          </span>
          <span class="text-button w-[35%]">
            Em até {formatShippingEstimate(method.shippingEstimate)}
          </span>
          <span class="font-bold text-right w-[20%]">
            {method.price === 0 ? "Grátis" : (
              formatPrice(method.price / 100, currencyCode, locale)
            )}
          </span>
        </li>
      ))}
    </ul>
  );
}

function ShippingSimulation({ items }: Props) {
  const postalCode = useSignal("");
  const loading = useSignal(false);
  const simulateResult = useSignal<SimulationOrderForm | null>(null);
  const { simulate, cart } = useCart();

  const handleSimulation = useCallback(async () => {
    if (postalCode.value.length !== 8) {
      return;
    }

    try {
      loading.value = true;
      simulateResult.value = await simulate({
        items: items,
        postalCode: postalCode.value,
        country: cart.value?.storePreferencesData.countryCode || "BRA",
      });
    } finally {
      loading.value = false;
    }
  }, []);

  return (
    <div class="flex flex-col mt-[30px] gap-[15px] p-[20px] sm:p-[30px] rounded-2xl border border-base-200 text-base-300 bg-white">
      <p class="font-poppins not-italic font-bold text-base text-[#2C376D]">
        Consultar frete e prazo de entrega
      </p>
      <div class="flex flex-col gap-[10px]">
        <form
          class="flex gap-[10px] max-lg:flex-col lg:items-start"
          onSubmit={(e) => {
            e.preventDefault();
            handleSimulation();
          }}
        >
          <div class="flex flex-col justify-center items-start gap-3">
            <input
              as="input"
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              class="input input-bordered input-sm border h-10 focus:outline-none w-full max-w-[250px] lg:max-w-[225px] lg:w-[225px] !py-4 hover:border-base-300 focus:text-black focus:hover:border-base-200 font-poppins not-italic font-normal text-xs text-[#8E8E9F]"
              placeholder="Inserir CEP"
              value={postalCode.value}
              maxLength={8}
              onChange={(e: { currentTarget: { value: string } }) => {
                postalCode.value = e.currentTarget.value;
              }}
            />
            <a
              href="https://buscacepinter.correios.com.br/app/endereco/index.php"
              class="hidden lg:block uppercase hover:underline max-lg:underline transition-all duration-500 font-poppins not-italic font-semibold text-xs underline text-[#2C376D]"
              target="_blank"
            >
              Não sei meu CEP
            </a>
          </div>
          <div class="flex gap-[15px] items-center lg:justify-center">
            <Button
              type="submit"
              loading={loading.value}
              class="h-10 btn-outline transition-all !border px-6 font-poppins not-italic font-semibold text-sm text-center text-[#2C376D]"
            >
              Calcular
            </Button>
            <a
              href="https://buscacepinter.correios.com.br/app/endereco/index.php"
              class="lg:hidden uppercase hover:underline max-lg:underline transition-all duration-500 font-poppins not-italic font-semibold text-xs underline text-[#2C376D]"
              target="_blank"
            >
              Não sei meu CEP
            </a>
          </div>
        </form>
      </div>
      {simulateResult.value
        ? <ShippingContent simulation={simulateResult} />
        : null}
    </div>
  );
}

export default ShippingSimulation;