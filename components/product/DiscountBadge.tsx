// deno-lint-ignore-file
type Props = {
  price: number;
  listPrice: number;
  label?: string;
  variant?: keyof typeof color;
  className?: string;
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
  { price, listPrice, label, variant = "undefined", className }: Props,
) {
  const discount = ((listPrice - price) / listPrice) * 100;

  let bgColor = "";

  if (variant) {
    bgColor = color[variant];
  }

  return (
    <div
      class={`absolute left-0 top-0 p-0 md:p-[10px] flex items-center z-10 ${className}`}
    >
      <div
        class={`text-xs uppercase font-bold border-none px-[10px] py-[7px] rounded-lg flex box-content bg-opacity-100 opacity-100 text-base-100 ${
          bgColor && `${bgColor}`
        } `}
      >
        {discount?.toFixed(2).slice(0, 2)}% {label ?? "OFF"}
      </div>
    </div>
  );
}

export default DiscountBadge;
