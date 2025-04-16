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
    <div class="text-center pb-12 pt-8 m-auto px-5 text-base-300 text-xs font-normal max-md:pt-4">
      {props.copyRight}
    </div>
  );
}
