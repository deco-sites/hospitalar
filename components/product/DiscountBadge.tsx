// deno-lint-ignore-file
type Props = {
  price: number;
  listPrice: number;
  label?: string;
  variant?: keyof typeof bgColor;
  className?: string;
};

const bgColor = {
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

function DiscountBadge({ price, listPrice, label, variant= 'undefined', className }: Props) {
  const discount = ((listPrice - price) / listPrice) * 100;

  let color = "";

  let index = variant;

  if (variant) {
    color = bgColor[index];
  }

  return (
    <div
      class={`absolute left-0 top-0 p-[10px] flex items-center z-10 ${className}`}
    >
      <div
        class={`text-xs uppercase font-bold border-none px-[10px] py-[7px] rounded-lg flex box-content bg-opacity-100 opacity-100 text-base-100 ${
          color && `${color}`
        } `}
      >
        {discount?.toFixed(2).slice(0, 2)}% {label ?? "OFF"}
      </div>
    </div>
  );
}

export default DiscountBadge;
