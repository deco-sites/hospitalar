
export interface Props {
    html?: string;
}

export default function Empresa() {

    return (
        <div >
            <div class="">
                <h1>Empresa</h1>
                <div class={`container  mb-[20px] px-5`}>
                    <details class="w-full styleSeoBtn">
                        <summary class="bg-[#EEF1F5] rounded-full h-10 pointer lg:h-[60px] w-full flex items-center justify-between px-[20px] py-[10px] lg:py-[20px]">
                            <h3 class="font-poppins font-bold text-lg leading-5 text-[#2D386E]">
                                Quem somos
                                <span class="font-poppins font-bold text-lg leading-5 text-[#2D386E]">

                                </span>
                            </h3>
                            <span class="minus font-poppins not-italic font-medium text-base leading-6 text-left text-[#2C376D]">
                                -
                            </span>
                            <span class="plus font-poppins not-italic font-medium text-base leading-6 text-left text-[#2C376D]">
                                +
                            </span>
                        </summary>
                        <div>
                            <h3>Bem-vindo à nossa loja virtual!</h3>
                            <p>Fundada em setembro de 1998, a Hospitalar Distribuidora conta com uma equipe treinada e qualificada para atender seus clientes. Nosso e-commerce foi pioneiro no ramo, surgindo em 2008 como uma nova fase da empresa.</p>
                            <p>Oferecemos atendimento em todo o território nacional para: hospitais, prefeituras, clínicas médicas, veterinárias, odontológicas e estéticas.
                                Nossa linha de comercialização é de materiais médicos hospitalares, equipamentos médicos, medicamentos e controlados.</p>
                            <p>Estamos localizados em: Presidente Prudente - SP, na Rua Adílio Artoni nº 46, Jardim Petrópolis, CEP 19060-340.
                                Horário de funcionamento: Segunda à Sexta - 08:00 às 18:00 - Sábado - 08:00 ao 12:00</p>
                            <p>Venha nos visitar e teremos a grata satisfação em recebê-lo!</p>
                            <p>CNPJ: 03.375.328/0001-80
                                — Inscrição Estadual: 562.172.900.119</p>
                        </div>
                    </details>
                </div>
            </div>
        </div>
    )
};

