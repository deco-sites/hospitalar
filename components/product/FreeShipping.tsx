import Icon from "deco-sites/hospitalar/components/ui/Icon.tsx";


export default function FreeShipping() {
  return (
    <>
      <div class=" md:w-[129px] absolute lg:right-auto lg:left-0 xl:left-[20%] left-4 top-11 md:top-0 rounded-[5px] border-[0.8px] border-solid border-border-free-shipping flex items-center justify-center bg-white z-10 md:z-0">
        <div class="flex items-center justify-center px-[10px] py-[5px] ">
          <Icon
            class="mr-2 md:mr-0"
            id="free-shipping"
            width={"22"}
            height={"22"}
            strokeWidth={1}
          />
          <div class="md:w-[81px]">
            <p class="text-base-content text-xs text-center font-semibold tracking-[.24px] uppercase ">FRETE GRÁTIS </p>
          </div>
        </div>
      </div>
    </>
  )
}