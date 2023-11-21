import { asset } from "$fresh/runtime.ts";
import type { JSX } from "preact";

export type PaymentIcons =
  | "Visa"
  | "Elo"
  | "Mastercard"
  | "Visa"
  | "Pix"
  | "AmericanExpress"
  | "Boleto";

export type SocialIcons =
  | "Twitter"
  | "Linkedin"
  | "Pinterest"
  | "YouTube"
  | "Tiktok"
  | "WhatsApp"
  | "Instagram"
  | "Facebook"
  | "YouTubeOutline"
  | "WhatsAppOutline"
  | "InstagramOutline"
  | "FacebookOutline";
export type AvailableIcons =
  | "Refresh"
  | "Menu"
  | "MenuBF"
  | "ChevronLeft"
  | "ChevronRight"
  | "ChevronUp"
  | "ChevronDown"
  | "QuestionMarkCircle"
  | "User"
  | "UserBF"
  | "ShoppingCart"
  | "ShoppingCartBF"
  | "Bars3"
  | "Heart"
  | "MagnifyingGlass"
  | "MagnifyingGlassBF"
  | "XMark"
  | "Plus"
  | "PlusBF"
  | "Minus"
  | "MinusBF"
  | "MapPin"
  | "Phone"
  | "PhoneBF"
  | "Logo"
  | "Logo-bf"
  | "LogoFooter"
  | "LogoMobile"
  | "Truck"
  | "Discount"
  | "Return"
  | "Deco"
  | "Discord"
  | "Email"
  | "EmailBF"
  | "Trash"
  | "FilterList"
  | "ArrowsPointingOut"
  | "WhatsApp"
  | "ArrowsPointingOut"
  | "checkIcon"
  | "SearchBar"
  | "ArrowRight"
  | "ArrowLeft"
  | "LogoSeo"
  | "LogoSeoBF"
  | "ReturnArrow"
  | "SadFace"
  | "LeftArrowFigma"
  | "LeftArrowFigmaBF"
  | "RightArrowFigma"
  | "RightArrowFigmaBF"
  | "AllCategories"
  | "AllCategoriesBF";

interface Props extends JSX.SVGAttributes<SVGSVGElement> {
  /**
   * Symbol id from element to render. Take a look at `/static/icons.svg`.
   *
   * Example: <Icon id="Bell" />
   */
  id: AvailableIcons | SocialIcons | PaymentIcons;
  size?: number;
}

function Icon({
  id,
  strokeWidth = 16,
  size,
  width,
  height,
  ...otherProps
}: Props) {
  return (
    <svg
      {...otherProps}
      width={width ?? size}
      height={height ?? size}
      strokeWidth={strokeWidth}
    >
      <use href={asset(`/sprites.svg#${id}`)} />
    </svg>
  );
}

export default Icon;
