import { type SectionProps } from "@deco/deco";
/**
 * @titleBy matcher
 */
export interface SeoTagH1PLP {
  matcher: string;
  /** @format rich-text */
  SeoTag?: string;
}
export interface Props {
  SeoTagH1PLPs?: SeoTagH1PLP[];
}
export default function SeoTagH1PLPs(
  { SeoTagH1PLP }: SectionProps<ReturnType<typeof loader>>,
) {
  if (!SeoTagH1PLP || !SeoTagH1PLP.SeoTag) {
    return null;
  }
  return (
    <h1 class="opacity-0">
      <div dangerouslySetInnerHTML={{ __html: SeoTagH1PLP.SeoTag }} />
    </h1>
  );
}
export const loader = (
  { SeoTagH1PLPs = [] }: Props,
  req: Request,
  _ctx: unknown,
) => {
  const pathname = new URL(req.url).pathname;
  const SeoTagH1PLP = SeoTagH1PLPs.find(({ matcher }) =>
    new URLPattern({ pathname: matcher }).test(req.url)
  );
  return { SeoTagH1PLP, pathname };
};
