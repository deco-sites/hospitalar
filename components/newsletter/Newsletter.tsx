import {
  BUTTON_VARIANTS,
  ButtonVariant,
} from "$store/components/minicart/Cart.tsx";
import { Runtime } from "$store/runtime.ts";
import { useSignal } from "@preact/signals";
import { RichText } from "apps/admin/widgets.ts";
import type { JSX } from "preact";

const subscribe = Runtime.create(
  "deco-sites/std/actions/vtex/newsletter/subscribe.ts",
);

export interface INewsletterInputProps {
  /**
   * @title Hide input?
   */
  show?: boolean;
  /**
   * @title placeholder
   */
  placeholder?: string;
}

export interface INewsletterFormProps {
  email: INewsletterInputProps;
  name: INewsletterInputProps;
  button: {
    /**
     * @title button variant
     * @default primary
     */
    variant?: ButtonVariant;
    /**
     * @title button label?
     * @default cadastrar
     */
    label?: string;
  };
}

export interface Props {
  /**
   * @title Newsletter Form
   */
  form: INewsletterFormProps;
  /**
   * @title newsletter message text?
   */
  text: RichText;
}

interface InputNewletterProps {
  name: string;
  placeholder: string;
  type: string;
  required: boolean;
}

function InputNewsletter(
  { name, placeholder, required, type }: InputNewletterProps,
) {
  return (
    <input
      name={name}
      type={type}
      class="input lg:h-[48px] join-item w-full rounded-full placeholder:text-placeholder outline-none bg-white h-[40px] font-poppins font-normal text-[12px] leading-[12px] text-[#9CA3AF]"
      placeholder={placeholder}
      required={required}
    />
  );
}

function Form(props: Props) {
  const { text, form } = props;
  const loading = useSignal(false);
  const success = useSignal(false);

  const handleSubmit: JSX.GenericEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      loading.value = true;

      const email =
        (e.currentTarget.elements.namedItem("email") as RadioNodeList)?.value;

      let name = "";

      if (form?.name?.show) {
        name = (e.currentTarget.elements.namedItem("name") as RadioNodeList)
          ?.value;
      }

      await subscribe({ email, name });
    } finally {
      loading.value = false;
      success.value = true;

      setTimeout(() => {
        success.value = false;
      }, 5000);
    }
  };

  const emailInput = !form?.email?.show
    ? (
      <InputNewsletter
        name="email"
        required
        type="email"
        placeholder={form?.email?.placeholder || "E-mail"}
      />
    )
    : null;

  const nameInput = !form?.name?.show
    ? (
      <InputNewsletter
        name="name"
        type="text"
        placeholder={form?.name?.placeholder || "Nome"}
        required
      />
    )
    : null;

  const urlIcon = `
    data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzEiIGhlaWdodD0iNTEiIHZpZXdCb3g9IjAgMCA3MSA1MSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwXzEyMl82OTIpIj4KPHBhdGggZD0iTTcxLjAwMDEgMEgwLjg0Mzk5NFY1MC45OTA4SDcxLjAwMDFWMFoiIGZpbGw9IiMyRTM4NzUiLz4KPHBhdGggZD0iTTQ1LjAzNjEgMEM1OS4zNzMgMCA3MS4wMDAxIDExLjQxNjUgNzEuMDAwMSAyNS40OTU0QzcxLjAwMDEgMzkuNTc0MiA1OS4zNzMgNTAuOTkwOCA0NS4wMzYxIDUwLjk5MDgiIGZpbGw9IiMzNTQ2OEIiLz4KPHBhdGggZD0iTTMyLjU3NDUgMy4zNDYzOFYxLjQ2OTgyQzMyLjU3NDUgMC42NTYzMzUgMzMuMjQwMiAwIDM0LjA2NTQgMEg0Mi4yMTM3QzQzLjAzODggMCA0My43MDQ1IDAuNjU2MzM1IDQzLjcwNDUgMS40Njk4MlYxMS4zNzAzQzQzLjcwNDUgMTIuMTgzOCA0My4wMzg4IDEyLjg0MDEgNDIuMjEzNyAxMi44NDAxQzM2Ljg4NzcgMTIuODQwMSAzMi41NzQ1IDguNTg3ODIgMzIuNTc0NSAzLjMzNzE0VjMuMzQ2MzhaIiBmaWxsPSIjMUUyNTM4Ii8+CjxwYXRoIGQ9Ik00My43MDQ2IDM4LjM3MjVWNTFIMzEuNTQzMVY0MC4xNDc0QzMxLjU0MzEgMzMuNzUwNCAyNy4zOTg2IDMwLjIwMDcgMjIuMzUzOSAzMC4yMDA3QzE2Ljg1OTIgMzAuMjAwNyAxMi4xNzA5IDM0LjM3OSAxMi4xNzA5IDQxLjAzNDhWNTFIMFYwSDEyLjE2MTVWMjUuMDUxN0gxMi41MTc4QzE1LjQ5MDIgMjAuOTY1NyAyMC4yNjI5IDE4LjQ3OTEgMjUuODUxNCAxOC40NzkxQzM2Ljc1NjUgMTguNDc5MSA0My42OTUyIDI1LjY3MSA0My42OTUyIDM4LjM4MTdMNDMuNzA0NiAzOC4zNzI1WiIgZmlsbD0iIzc5QUVDOSIvPgo8L2c+CjxkZWZzPgo8Y2xpcFBhdGggaWQ9ImNsaXAwXzEyMl82OTIiPgo8cmVjdCB3aWR0aD0iNzEiIGhlaWdodD0iNTEiIGZpbGw9IndoaXRlIi8+CjwvY2xpcFBhdGg+CjwvZGVmcz4KPC9zdmc+Cg==
  `;

  return (
    <div class="flex flex-col lg:flex-row items-baseline lg:items-center gap-[20px] lg:gap-16 py-10 w-full justify-between lg:pl-[80px]">
      <div
        style={{ 
          // backgroundImage: `url(${urlIcon})`,  
          backgroundRepeat: 'repeat-y',
          position: "absolute",
          height: "100%",
          width: "80px",
          left: "0px",
        }} 
        class="hidden lg:flex"
      ></div>
      <div
        dangerouslySetInnerHTML={{ __html: text }}
        class="font-poppins text-white font-normal font-bold text-[28px] leading-[24px] lg:pr-0 pr-14"
      />
      {success.value
        ? (
          <div class="text-base lg:text-xl text-left text-base-100">
            E-mail cadastrado com sucesso!
          </div>
        )
        : (
          <form
            class="w-full form-control"
            onSubmit={handleSubmit}
          >
            <div class="flex gap-[10px] lg:gap-[16px] w-full lg:flex-row flex-col items-center lg:justify-between justify-center">
              {nameInput}
              {emailInput}
              <button
                style={{
                  minWidth: "150px",
                }}
                type="submit"
                class={`capitalize md:ml-5 font-medium btn disabled:loading rounded-full join-item bg-[#85BAD5] text-[#2C376D] hover:text-[#2C376D] hover:bg-[#85BAD5] hover:border-[#85BAD5] border-[#85BAD5]`}
                disabled={loading}
              >
                {form?.button?.label || "Cadastrar"}
              </button>
            </div>
          </form>
        )}
    </div>
  );
}

export default Form;
