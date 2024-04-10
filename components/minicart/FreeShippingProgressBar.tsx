import Icon from "$store/components/ui/Icon.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import { useState } from "preact/hooks";
import { useEffect } from "preact/hooks";

interface Props {
  total: number;
  target: number;
  locale?: string;
  currency?: string;
}

function FreeShippingProgressBar({ target, total, currency, locale }: Props) {
  const [progress, setProgress] = useState(0); 

  useEffect(() => {
    const newProgress = (total / 50000) * 100; // Calcula o progresso em porcentagem
    setProgress(newProgress);
  }, [total]);

  return (
    <div class="flex flex-col w-full gap-3 mb-4">
      <div class="flex text-primary">
        {total < 50000
          ? (
            <span class="text-sm font-normal">
              Faltam ${formatPrice((50000 - total) / 100, currency, locale)}{" "}
            </span>
          )
          : <span>Você ganhou frete grátis!</span>}
      </div>

    <div class="relative">
        <progress
        class="progress progress-primary w-full"
        value={total}
        max={50000}
      />
       <Icon id="Truck" size={34} strokeWidth={1}  class="absolute -top-1 right-1" style={{ left: `${progress}%` }}/>
    </div> 
  
    </div>
  );
}

export default FreeShippingProgressBar;
