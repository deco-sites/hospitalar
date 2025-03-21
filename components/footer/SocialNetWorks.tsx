import Icon, { SocialIcons } from "$store/components/ui/Icon.tsx";

export interface SocialItem {
  icon: SocialIcons;
  label: string;
  href: string;
}

export interface ISocialNetworkProps {
  socialItems: SocialItem[];
}

export default function SocialNetWorks(
  { socialItems }: ISocialNetworkProps,
) {
  return (
    <div class="mt-5 border-b border-base-content pb-5">
      <ul class="gap-5 flex items-center justify-start">
        {socialItems.map((social) => (
          <li
            key={social.icon}
            class="bg-base-300 w-8 h-8 rounded-full hover:bg-primary transition-all duration-500"
          >
            <a
              href={social.href ? social.href : "#"}
              class="flex items-center justify-center w-full h-full text-white"
              target="_blank"
              aria-label={social.label}
            >
              <Icon id={social.icon} size={20} strokeWidth={1} />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
