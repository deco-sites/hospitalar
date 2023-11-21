// deno-lint-ignore-file
import type { Product } from "apps/commerce/types.ts";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";

export interface DiscountBadgeLink {
  image: LiveImage;
  alt: string;
  link: string;
}

export interface DiscountBadgeImage {
  label: string;
  image: DiscountBadgeLink;
}

type Props = {
  price: number;
  listPrice: number;
  label?: string;
  variant?: keyof typeof color;
  className?: string;
  bf: boolean;
  imageBF?: DiscountBadgeImage;
};

const color = {
  emphasis: "bg-emphasis",
  primary: "bg-primary",
  secondary: "bg-secondary",
  neutral: "bg-neutral",
  accent: "bg-accent",
  success: "bg-success",
  info: "bg-info",
  error: "bg-error",
  warning: "bg-warning",
  undefined: "bg-emphasis",
};

function DiscountBadge(
  { price, listPrice, label, variant = "undefined", className, bf, imageBF }: Props,
) {
  const discount = ((listPrice - price) / listPrice) * 100;

  let bgColor = "";

  if (variant) {
    bgColor = color[variant];
  }

  return (
    <div
      class={`absolute left-0 top-0 p-[10px] flex flelx-col items-center z-10 ${className}`}
    >
      { bf &&
        <div class="">
          <img src={imageBF?.image.image} alt={imageBF?.image.alt} />
        </div>
      }
      <div
        class={`text-xs uppercase font-bold border-none px-[10px] py-[7px] rounded-lg flex box-content bg-opacity-100 opacity-100 text-base-100 bg-main-bf-theme`}
      >
        {Math.floor(discount?.toFixed(2) * 1)}% {label ?? "OFF"}
      </div>
    </div>
  );
}

export default DiscountBadge;
