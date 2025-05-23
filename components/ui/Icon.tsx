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
  | "WhatsAppAtualizado"
  | "Instagram"
  | "InstagramAtualizado"
  | "Facebook"
  | "FacebookAtualizado"
  | "YouTubeOutline"
  | "WhatsAppOutline"
  | "InstagramOutline"
  | "NewFacebook"
  | "NewInstagram"
  | "FacebookOutline";
export type AvailableIcons =
  | "Refresh"
  | "Menu"
  | "ChevronLeft"
  | "ChevronRight"
  | "ChevronUp"
  | "ChevronDown"
  | "QuestionMarkCircle"
  | "User"
  | "ShoppingCart"
  | "ShoppingCartNew"
  | "Bars3"
  | "Heart"
  | "MagnifyingGlass"
  | "XMark"
  | "Plus"
  | "NewPlus"
  | "Minus"
  | "MapPin"
  | "Phone"
  | "PhoneAtualizado"
  | "Logo"
  | "LogoFooter"
  | "LogoMobile"
  | "NewLogoFooter"
  | "Truck"
  | "CaretDown"
  | "CaretUp"
  | "ArrowRightInline"
  | "ArrowRightInlineDark"
  | "Discount"
  | "Return"
  | "Deco"
  | "Discord"
  | "Email"
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
  | "LogoMini"
  | "ReturnArrow"
  | "SadFace"
  | "LeftArrowFigma"
  | "RightArrowFigma"
  | "AllCategories"
  | "warning"
  | "icon-warning"
  | "free-shipping"
  | "Wishlist"
  | "SetaPaginationForward"
  | "SetaPaginationBackward";
  

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