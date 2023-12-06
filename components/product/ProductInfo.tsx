import Icon from "$store/components/ui/Icon.tsx";

const ProductInfo = () => {
    return (
        <section class="bg-box-warning rounded-lg border border-solid border-warning text-center mt-5">
            <div class="flex flex-col sm:p-7 p-5">
                <div class="flex">
                    <Icon
                        class=""
                        id="icon-warning"
                        width={34}
                        height={25}
                        strokeWidth={1}
                    />
                    <h2 class="text-lg text-warning font-poppins font-bold leading-130 tracking-wider text-start">Este produto é restrito</h2>
                </div>
                <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-3">
                    <div class="sm:w-[77%] w-full">
                        <p className="text-sm font-poppins text-warning text-start">
                            Este produto é restrito e exige o envio de documentação para a conclusão da compra. Para mais detalhes e instruções, saiba mais.
                        </p>
                    </div>
                    <a href="/i/como-comprar" alt="Institucional" class="sm:w-[20%] w-[131px] pt-3 sm:pt-0" >
                        <button className="rounded-[90px] border border-solid border-warning text-center w-full text-sm font-bold font-poppins h-[40px] text-warning hover:brightness-[0.9] hover:bg-warning hover:text-white">
                            Saiba Mais
                        </button>
                    </a>
                </div>
            </div>
        </section>
    );
}

export default ProductInfo;