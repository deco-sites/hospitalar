import type { SocialIcons } from "$store/components/ui/Icon.tsx";
import Icon from "$store/components/ui/Icon.tsx";

export type TextAlign = "Left" | "Center" | "Right" | "Justify";

export const TEXT_ALIGMENT: Record<TextAlign, string> = {
  "Left": "text-left",
  "Center": "text-center",
  "Right": "text-right",
  "Justify": "text-justify",
};

export interface Links {
  label: string;
  href: string;
  icon: SocialIcons;
}

export interface Props {
  title: string;
  caption?: string;
  /**
   * @title Description
   * @format html
   */
  html?: string;
  textAlign?: TextAlign;
  links?: Links[];
}

export default function InfoCard(
  { html, caption, title, textAlign, links }: Props,
) {
  const textAlignment = TEXT_ALIGMENT[textAlign ? textAlign : "Center"];

  return (
    <section class={`${textAlignment} pt-8`}>
      <span class="text-emphasis font-bold text-xs uppercase">{caption}</span>
      <h3 class="text-primary font-normal text-2xl mb-5">{title}</h3>
      {links?.length
        ? (
          <ul class="flex gap-4 items-center justify-center">
            {links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  class="btn btn-secondary gap-3"
                  name={link.label}
                  aria-label={link.label}
                  title={link.label}
                >
                  <Icon id={link.icon} size={18} strokeWidth={1} />
                  <span class="md:block hidden">{link.label}</span>
                </a>
              </li>
            ))}
          </ul>
        )
        : null}
      {html
        ? (
          <div
            dangerouslySetInnerHTML={{ __html: html }}
            class="text-neutral font-normal text-sm max-w-5xl m-auto pb-12"
          />
        )
        : null}
    </section>
  );
}
