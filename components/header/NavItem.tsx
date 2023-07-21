import { headerHeight } from "./constants.ts";
import Icon from "$store/components/ui/Icon.tsx";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";

export interface INavItem {
  label: string;
  href?: string;
  highlighted?: boolean;
  children?: INavItem[];
  variant?: "CommonChild" | "AllCategories" | "WithBrands" | "Other";
  image?: Image;
}

export interface Image {
  src?: LiveImage;
  alt?: string;
  href?: string;
}

const colsVariants: Record<string, string> = {
  "Marcas": "grid-cols-3",
  "Medicamentos": "grid-cols-11",
};

function splitNatItems(children: INavItem[], number = 6) {
  const slices = [];
  const totalSlices = Math.ceil(children.length / number);

  for (let i = 0; i < totalSlices; i++) {
    slices.push(children.slice(i * number, (i + 1) * number));
  }

  return slices;
}

function NavItemDropDown(
  { elements, variant, image }: {
    elements?: INavItem[];
    variant?: string;
    image?: Image;
  },
) {
  if (!elements || !elements?.length) {
    return <span />;
  }
  if (variant === "WithBrands") {
    return (
      <div
        class="absolute hidden hover:flex group-hover:flex bg-base-100 z-50 items-start justify-center gap-6 w-screen shadow-md"
        style={{ top: "0px", left: "0px", marginTop: headerHeight }}
      >
        <div class="container w-full pt-5 pb-5 m-auto px-5 flex items-start justify-start gap-16">
          {elements.map((element) => {
            return (
              <div class="mr-[83px]">
                <span>{element.label}</span>
                <ul
                  class={`mt-3 grid ${
                    colsVariants[element.label]
                  } gap-x-[14px]`}
                >
                  {element.children &&
                    element.children.map((child) => (
                      <li class="mb-3">
                        <a
                          class="text-sm text-base-content hover:font-bold hover:underline transition-all duration-300"
                          href={child.href || ""}
                        >
                          <span>{child.label}</span>
                        </a>
                      </li>
                    ))}
                </ul>
              </div>
            );
          })}
          {image && (
            <a href={image.href || ""}>
              <img
                src={image.src}
                alt={image.alt || "Banner vertical do menu"}
                class="h-full w-auto justify-self-end"
              />
            </a>
          )}
        </div>
      </div>
    );
  }
  const navItemsCol = splitNatItems(elements, 16);
  return (
    <div
      class="absolute hidden hover:flex group-hover:flex bg-base-100 z-50 items-start justify-center gap-6 w-screen shadow-md"
      style={{ top: "0px", left: "0px", marginTop: headerHeight }}
    >
      <div class="container w-full pt-5 pb-5 m-auto px-5 flex items-start justify-start gap-16">
        {navItemsCol.map((column) => (
          <ul class="flex items-start justify-start flex-col">
            {column.map((node) => (
              <li class="mb-3">
                <a
                  class="text-sm text-base-content hover:font-bold hover:underline transition-all duration-300"
                  href={node.href || ""}
                >
                  <span>{node.label}</span>
                </a>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

function NavItem({ item }: { item: INavItem }) {
  const { href, label, children, highlighted, variant, image } = item;
  return (
    <li
      class={`group flex items-center ${
        highlighted ? "w-[260px]" : "flex-1"
      } justify-center`}
    >
      <a
        href={href}
        class={`px-4 py-2 my-2 w-full text-center ${
          highlighted ? "bg-white rounded-3xl flex justify-center gap-2" : ""
        }`}
      >
        {highlighted && (
          <Icon id="AllCategories" width={18} height={18} strokeWidth={1} />
        )}
        <span
          class={`after:absolute after:transition-all after:duration-100 after:-bottom-1 relative after:left-0 after:w-0 after:h-[1px] after:bg-secondary text-sm transition-all font-bold duration-300 ${
            highlighted
              ? "text-primary"
              : "text-white group-hover:text-[#85BAD5] group-hover:after:w-full"
          }`}
        >
          {label}
        </span>
      </a>
      <NavItemDropDown variant={variant} elements={children} image={image} />
    </li>
  );
}

export default NavItem;
