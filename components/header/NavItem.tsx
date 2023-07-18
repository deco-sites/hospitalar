import { headerHeight } from "./constants.ts";
import Icon from "$store/components/ui/Icon.tsx";

export interface INavItem {
  label: string;
  href?: string;
  highlighted?: boolean;
  children?: INavItem[];
  variant?: "CommonChild" | "AllCategories" | "WithBrands" | "Other";
}

function splitNatItems(children: INavItem[], number = 6) {
  const slices = [];
  const totalSlices = Math.ceil(children.length / number);

  for (let i = 0; i < totalSlices; i++) {
    slices.push(children.slice(i * number, (i + 1) * number));
  }

  return slices;
}

function NavItemDropDown({ elements }: { elements?: INavItem[] }) {
  if (!elements || !elements?.length) {
    return <span />;
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
  const { href, label, children, highlighted } = item;

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
      <NavItemDropDown elements={children} />
    </li>
  );
}

export default NavItem;
