import Icon from "$store/components/ui/Icon.tsx";

const ProductInfo = () => {
  return (
    <section class="bg-box-warning rounded-lg border border-solid border-warning text-center mt-5">
      <div class="flex flex-col sm:p-7 p-5">
        <div class="flex items-center">
          <Icon
            class=""
            id="icon-warning"
            width={34}
            height={25}
            strokeWidth={1}
          />
          <h2 class="font-poppins not-italic font-bold text-sm text-[#C31212]">
            Este produto é restrito
          </h2>
        </div>
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-3">
          <div class="sm:w-[77%] w-full">
            <p className="font-poppins not-italic font-normal text-xs text-[#C31212] text-left">
              Este produto é restrito e exige o envio de documentação para a conclusão da compra. <br/> <a
            href="/i/como-comprar"
            alt="Institucional"
            class="font-poppins not-italic font-bold underline"
          >Clique aqui</a> para mais detalhes e instruções.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductInfo;
