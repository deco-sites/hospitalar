import Icon from "$store/components/ui/Icon.tsx";
import Button from "../ui/Button.tsx";

interface Props {
  quantity: number;
  disabled?: boolean;
  loading?: boolean;
  onChange?: (quantity: number) => void;
}

const QUANTITY_MAX_VALUE = 100;

// Remove default browser behavior: https://www.w3schools.com/howto/howto_css_hide_arrow_number.asp
// TODO: Figure out how to add it via tailwind config.
const innerStyle = `
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}
`;

function QuantitySelector({ onChange, quantity, disabled, loading }: Props) {
  const decrement = () => onChange?.(Math.max(0, quantity - 1));

  const increment = () =>
    onChange?.(Math.min(quantity + 1, QUANTITY_MAX_VALUE));

  return (
    <div class="form-control">
      <div class="input-group items-center">
        <Button
          class="bg-white !rounded-full border border-[#E5E7EB] w-7 h-7"
          onClick={decrement}
          disabled={disabled}
          loading={loading}
        >
          <Icon
            class="lg:btn-accent max-lg:m-auto transition-all rounded-full"
            id="Minus"
            width={16}
            height={16}
          />
        </Button>
        <input
          class="mx-1 border border-[#E5E7EB] bg-white w-[46px] h-10 rounded-lg font-poppins not-italic font-bold text-sm text-center text-[#2C376D]"
          type="number"
          inputMode="numeric"
          pattern="[0-9]*"
          max={QUANTITY_MAX_VALUE}
          min={1}
          value={quantity}
          disabled={disabled}
          onBlur={(e) => onChange?.(e.currentTarget.valueAsNumber)}
        />
        <Button
          class="bg-white !rounded-full border border-[#E5E7EB] w-7 h-7"
          onClick={increment}
          disabled={disabled}
          loading={loading}
        >
          <Icon
            class="lg:btn-accent max-lg:m-auto transition-all rounded-full"
            id="Plus"
            width={16}
            height={16}
          />
        </Button>
      </div>
    </div>
  );
}

export default QuantitySelector;
