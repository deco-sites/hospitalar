import { Head } from "$fresh/runtime.ts";
import { Section } from "$live/blocks/section.ts";
import Icon from "$store/components/ui/Icon.tsx";
import { useDevice } from "deco/hooks/useDevice.ts";

export interface Props {
  title: string;
  description?: string;
  asideMenu: Section;
  content: Section;
}


function PageContent({
  asideMenu: { Component: AsideComponent, props: asideProps },
  content: { Component: ContentComponent, props: contentProps },
  title,
}: Props) {

  const device = useDevice();

  return (
    <>
      <Head>
        <style
          dangerouslySetInnerHTML={{
            __html: `
            .markdown-body h2 {
              font-size: 20px;
              font-weight: 700;
              line-height: 1.4;
              margin: 20px 0;
            }
            .markdown-body h3 {
              font-size: 18px;
              font-weight: 700;
              line-height: 1.4;
              margin: 20px 0;
            }
            .markdown-body h4 {
              display: flex;
              padding: 18px 30px;
              align-items: center;
              gap: 10px;
              align-self: stretch;

              
              border-radius: 10px;
              background: rgba(133, 186, 213, 0.40);

              font-family: Poppins;
              font-size: 24px !important;
              font-style: normal;
              font-weight: 600;
              line-height: 110%; 
            }
            .markdown-body p:empty {
              display: none;
            }
            .markdown-body p:last-child {
              margin-bottom: 20px;
            }
            .markdown-body p, .markdown-body li {
              color: #8E8E9F;
              font-size: 14px;
              font-weight: 400;
              line-height: 20px;
              list-style: circle inside !important;
            }

            .markdown-body .contato span{
              display: flex;
            }
            
            .markdown-body p span img {
              margin-right: 10px; 
            }

            .markdown-body a {
              text-decoration: underline;
            }
            .markdown-body td {
              border: 1px solid #8E8E9F;
            }

            @media screen and (max-width: 760px) {
              .markdown-body h4 {
                padding: 10px 20px;
                font-size: 16px !important;
              }

              .markdown-body h4 span{
                font-size: 16px !important;
                color: var(--action-primary, #2D386E);
                font-family: Poppins;
                font-style: normal;
                font-weight: 600;
                line-height: normal;
              }

              .markdown-body .contato {
                display: block !important; 
              }

              .markdown-body .contato .contato-whats{
                width: 50%; 
                margin-bottom: 13px; 
              }

              .markdown-body p span {
                font-size: 14px !important; 
              }
            }
          `,
          }}
        />
      </Head>
      <div>
        {/* Banner Institucional | Suporte */}
      </div>
      <h2 class="my-10 text-[40px] font-bold">Institucional</h2>
      <div class="flex flex-col md:flex-row justify-between mt-[15px] mb-14">
        <AsideComponent {...asideProps} />
        <article class="md:pl-[30px] w-full">

          {
            device == "desktop"
              ? (
                <h1 class="flex max-md:justify-between text-primary text-[19px] lg:text-[24px] font-normal lg:font-medium leading-[130%] lg:leading-[36.4px] mb-5 border-b border-neutral-100 pb-[10px]">
                  {title}
                </h1>
              )
              : (
                <h1 class="flex max-md:justify-between text-primary text-[19px] lg:text-[24px] font-normal lg:font-medium leading-[130%] lg:leading-[36.4px] mb-5 border-b border-neutral-100 pb-[10px]">
                  <a
                    href="/i"
                    class="text-base font-bold flex items-center justify-end"
                  >
                    <Icon id="ChevronLeft" size={20} /> {title}
                  </a>
                </h1>
              )
          }
          {/* @ts-ignore opting for a ignore here so we can use a union type for the content section prop, and display it nicely in the admin panel */}
          <ContentComponent {...contentProps} />
        </article>
      </div>
    </>
  );
}

export default PageContent;
