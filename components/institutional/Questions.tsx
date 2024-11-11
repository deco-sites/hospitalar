import { Head } from "$fresh/runtime.ts";
// import { clx } from "../../sdk/clx.ts";


/**
 * @title {{{question}}}
 */
export interface Question {
  question: string;
  /** @format html */
  answer: string;
}

export interface Props {
  title?: string;
  description?: string;
  questions?: Question[];
  layout?: {
    headerAlignment?: "center" | "left";
  };
}

const DEFAULT_PROPS = {
  title: "",
  description: "",
  questions: [
    {
      question: "Como faço para acompanhar o meu pedido?",
      answer:
        "Acompanhar o seu pedido é fácil! Assim que o seu pedido for enviado, enviaremos um e-mail de confirmação com um número de rastreamento. Basta clicar no número de rastreamento ou visitar o nosso site e inserir o número de rastreamento na seção designada para obter atualizações em tempo real sobre a localização e o status de entrega do seu pedido.",
    },
    {
      question: "Qual é a política de devolução?",
      answer:
        "Oferecemos uma política de devolução sem complicações. Se você não estiver completamente satisfeito(a) com a sua compra, pode devolver o item em até 30 dias após a entrega para obter um reembolso total ou troca. Certifique-se de que o item esteja sem uso, na embalagem original e acompanhado do recibo. Entre em contato com a nossa equipe de atendimento ao cliente e eles o(a) orientarão pelo processo de devolução.",
    },
  ],
  contact: {
    title: "",
    description: "",
    button: {
      text: "",
      link: "",
    },
  },
};

function Question({ question, answer }: Question) {
  return (
    <details open class="collapse collapse-plus join-item !rounded-none">
      <summary class="collapse-title bg-[#EEF1F5] text-sm md:text-lg !min-h-0 font-scoutCond tracking-one font-medium text-[#2C376D] rounded-full py-4 px-7">
        {question}
      </summary>
      <div
        class="collapse-content section_content py-5 px-7"
        dangerouslySetInnerHTML={{ __html: answer }}
      />
    </details>
  );
}

export default function FAQ(props: Props) {
  const {
    questions = [],
  } = { ...DEFAULT_PROPS, ...props };

  return (
    <>
      <Head>
        <style
          type="text/css"
          dangerouslySetInnerHTML={{
            __html: `
             .collapse-content p {
              font-size: 16px;
              color: #8E8E9F;
             }

             .collapse-content table td {
              border-right: 1px solid #eee;
              padding: 9px;
             }

             .collapse-content table {
              text-align: center;
              font-size: 13px;
              margin-top: 20px;
              border: 1px solid #eee;
             }

             .btn-form {
              background-color: white;
              color: #2C376D; 
              border: 1px solid #2C376D;
              font-size: 12px;
              font-weight: 700;
                border-radius: 9999px;
             }

             .btn-form .icon {
              height: 19px;
              width: auto;
              object-fit: none;
             }

             @media only screen and (max-width: 768px) {
               .collapse-content table {
                  width: 100% !important;
                  border-collapse: collapse;
                }
                .btn-form {
                  font-size: 9px;
                }
                
            }
            `,
          }}
        />
      </Head>
      <div class="w-full  max-w-7xl m-auto flex flex-col lg:flex-row gap-4 lg:gap-8">
        <div class="flex flex-col gap-8 lg:gap-10 w-full">
          <div class="flex w-full gap-16">
            <div class="join join-vertical w-full gap-3">
              {questions.map((question) => <Question {...question} />)}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}