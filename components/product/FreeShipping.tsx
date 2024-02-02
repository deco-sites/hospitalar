import Icon from "deco-sites/hospitalar/components/ui/Icon.tsx";

interface Props {
  classNameContainer?: string;
  classNameChildren?: string; 
  classNameIcon?: string;
}


export default function FreeShipping({ classNameContainer,classNameChildren, classNameIcon } : Props) {
  return (
    <>
      <div class={`absolute  top-11 rounded-[5px] border-[0.8px] border-solid border-border-free-shipping items-center justify-center bg-white z-10 md:z-0 ${classNameContainer}`}>
        <div class="flex items-center justify-center px-[10px] py-[5px] ">
          <Icon
            class={`${classNameIcon}`}
            id="free-shipping"
            width={"22"}
            height={"22"}
            strokeWidth={1}
          />
          <div class={`${classNameChildren}`}>
            <p class="text-base-content text-xs text-center font-semibold tracking-[.24px] uppercase ">FRETE GRÁTIS </p>
          </div>
        </div>
      </div>
    </>
  )
}