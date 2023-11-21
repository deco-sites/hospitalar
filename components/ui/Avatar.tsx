/**
 * This component renders the filter and selectors for skus.
 * TODO: Figure out a better name for this component.
 */

const colors: Record<string, string> = {
  "azul-clara": "bg-[#87CEFA] ring-[#87CEFA]",
  "azul-marinho": "bg-[#000080] ring-[#000080]",
  "branca": "bg-[#FFFFFF] ring-[#FFFFFF]",
  "cinza": "bg-[#808080] ring-[#808080]",
  "cinza-escura": "bg-[#A9A9A9] ring-[#A9A9A9]",
  "laranja": "bg-[#FFA500] ring-[#FFA500]",
  "marrom": "bg-[#A52A2A] ring-[#A52A2A]",
  "preta": "bg-[#161616] ring-[#161616]",
  "verde-clara": "bg-[#90EE90] ring-[#90EE90]",
  "vermelha": "bg-[#FF0000] ring-[#FF0000]",

  // Color variants - only applied when no color as content is passed
  "disabled": "bg-base-100 text-base-200",
  "default": "bg-base-100 text-base-300",
};

interface Props {
  variant?: "disabled" | "default";
  content: string;
  active?: boolean;
}

const variants = {
  disabled: {
    normal:
      `relative border text-base-200 bg-opacity-20 bg-base-300 border-base-200 cursor-not-allowed`,
    active:
      `relative border text-base-200 bg-opacity-20 bg-base-300 border-base-200 cursor-not-allowed`,
  },
  default: {
    normal: "border-2 border-base-200 hover:border-main-bf-theme hover:text-primary",
    active:
      "bg-main-bf-theme text-white text-secondary-focus border-2 border-main-bf-theme",
  },
};

function Avatar({ content, active, variant = "default" }: Props) {
  console.log({ content, variant, active })

  return (
    <div class="avatar placeholder font-bold">
      <div
        class={`rounded-full transition h-9 !aspect-auto ${
          colors[content] ?? colors[variant]
        } ${variants[variant][active ? "active" : "normal"]}`}
      >
        <span class="text-xs font-normal py-2 px-4">
          {colors[content] ? "" : content}
        </span>
      </div>
    </div>
  );
}

export default Avatar;
