export interface Props {
  /**
   * @title Copy Right
   * @default Agência N1 - Todos os Direitos Reservados
   */
  copyRight?: string;
}

export default function CopryRight(props: Props) {
  if (!props?.copyRight) {
    return null;
  }

  return (
    <div class="bg-[#EEF1F5] px-5 pt-[30px] pb-[20px] w-full h-auto font-poppins font-normal text-[10px] leading-[16px] text-center text-[#8E8E9F]">
      {props.copyRight}
    </div>
  );
}
