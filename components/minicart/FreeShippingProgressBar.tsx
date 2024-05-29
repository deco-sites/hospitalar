import Icon from "$store/components/ui/Icon.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import { useState } from "preact/hooks";
import { useEffect } from "preact/hooks";

interface Props {
  total: number;
  target: number;
  locale?: string;
  currency?: string;
  rule_text?: string;
  redirect_link?: string;
  redirect_text?: string;
  left_text?: string;
  right_text?: string;
}

function FreeShippingProgressBar({ target, total, currency, locale, rule_text, redirect_link, redirect_text, left_text, right_text }: Props) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const newProgress = (total / 49900) * 100;
    setProgress(newProgress);
  }, [total]);

  return (
    <div class="flex flex-col w-full gap-3 mb-4">
      <div class="flex text-primary">
        {total < 49900
          ? (
            <span class="text-sm font-normal">
              {left_text ? left_text : "Faltam"} {formatPrice((49900 - total) / 100, currency, locale)}{right_text ? right_text : " para ganhar frete grátis*"}
            </span>
          )
          : <span>Você ganhou frete grátis!</span>}
      </div>

      <div class="relative">
        <progress
          class="progress progress-primary w-full"
          value={total}
          max={49900}
        />
        <Icon id="Truck" size={34} strokeWidth={1} class="absolute top-0 right-1" style={{ left: `${progress}%` }} />
      </div>

      <div class="flex flex-row items-start justify-start h-auto w-full mt-[6px] gap-2">
        <span class="text-sm font-normal text-primary">{rule_text ? rule_text : "*Sul e Sudeste"}</span>
        <a class="text-sm font-normal text-primary underline decoration-1" href={redirect_link ? redirect_link : "#"}>{redirect_text ? redirect_text : "regulamento"}</a>
      </div>

    </div>
  );
}

export default FreeShippingProgressBar;
