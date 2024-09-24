import { useState } from "preact/compat";

const DescriptionCard = ({ description, classContainer }: { description: string, classContainer?: string }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div class={`mt-[30px] ${classContainer}`}>
            <div class="!rounded-full bg-[#EEF1F5] h-[40px] py-2 px-5 w-auto">
                <span class="font-poppins not-italic font-bold text-sm text-[#2C376D] lg:text-base">
                    Descrição do produto
                </span>
            </div>

            <div class="px-5 mt-5">
                <div class={`relative font-poppins not-italic font-bold text-sm text-[#8E8E9F] lg:text-base overflow-hidden ${isOpen ? "h-auto" : "h-[225px]"}`}>
                    <p dangerouslySetInnerHTML={{ __html: description }} />
                    {(!isOpen) && <div style={{ background: "linear-gradient(to top, #FAFAFB, #FAFAFA 5%, transparent 75%)" }} class="w-full h-[150px] absolute bottom-0 left-0 z-20"></div> }
                </div>
                <button
                    onClick={()=> {
                        console.log("Entrou!")
                        setIsOpen(state => !state)
                    }}
                    class="font-poppins not-italic font-semibold text-xs underline uppercase text-[#2C376D] lg:text-sm"
                >
                    { !isOpen ? "Ver descrição completa" : "Ver menos" }
                </button>
            </div>
        </div>
    );
}

export default DescriptionCard;