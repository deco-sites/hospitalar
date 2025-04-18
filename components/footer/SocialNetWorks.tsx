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
    <div class="mt-5 border-b border-[#8E8E9F] pb-5">
      <ul class="gap-5 flex items-center justify-start">
        {socialItems.map((social) => (
          <li
            key={social.icon}
            class=" w-8 h-8  transition-all duration-500"
          >
            <a
              href={social.href ? social.href : "#"}
              class="flex items-center justify-center w-full h-full text-white"
              target="_blank"
              aria-label={social.label}
            >
              <Icon id={social.icon} size={30} strokeWidth={1} />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
