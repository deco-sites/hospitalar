import { type SectionProps } from "@deco/deco";

/**
 * @titleBy matcher
 */
export interface Props {
  /** @description RegExp to enable this banner on the current URL. Use /feminino/* to display este banner na categoria feminino */
  matcher: string;
  /** @description Texto da página de SEO */
  /** @format rich-text */
  description?: string;
  /** @description Tamanho máximo da tela */
  max?: number;
}

const DEFAULT_PROPS = {
  textSeo: [
    {
      matcher: "/*",
      description:
        "<h1><strong>Lorem Ipsum</strong></h1><p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>",
      max: 1200,
    },
  ],
};

export default function SeoCategoryText(
  { text }: SectionProps<ReturnType<typeof loader>>,
) {
  if (!text) {
    return null;
  }
  const { description, max } = text;
  return (
    <div
      className="w-full m-auto flex flex-col justify-center"
      style={{ maxWidth: max ? `${max}px` : "1200px" }}
    >
      {description && (
        <div
          className="w-full text-graphite leading-normal reset_styles"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      )}
    </div>
  );
}

export interface Text {
  textSeo?: Props[];
}

export const loader = (props: Text, req: Request) => {
  const { textSeo } = { ...DEFAULT_PROPS, ...props };
  const text = textSeo.find(({ matcher }) =>
    new URLPattern({ pathname: matcher }).test(req.url)
  );
  return { text };
};
