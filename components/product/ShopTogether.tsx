import type { Product } from "apps/commerce/types.ts";
import { AppContext } from "apps/vtex/mod.ts";
import type { LoaderReturnType } from "$live/types.ts";
import ShopTogetherContainer from "site/islands/ShopTogetherContainer.tsx";
import { type SectionProps as SectionProps } from "@deco/deco";
interface Props {
    buyTogetherLoader: LoaderReturnType<Product[] | null>;
}
export function loader(props: Props, _req: Request, ctx: AppContext) {
    if (!props.buyTogetherLoader)
        return { success: false, buyTogether: null };
    return { success: true, buyTogether: props.buyTogetherLoader };
}
function ShopTogether(props: SectionProps<typeof loader>) {
    if (!props.success)
        return null;
    const { buyTogether } = props;
    if (!buyTogether)
        return null;
    return (<div className="container w-full m-auto items-center px-5 my-5 lg:my-10 lg:px-0 2xl:px-5 bg-[#FAFAFB]">
            <div className="flex w-full h-auto flex-col gap-3 items-center">
                <h2 className="text-xl lg:text-2xl leading-8 lg:leading-10 font-medium text-primary">Aproveite e leve também</h2>
                <ShopTogetherContainer buyTogether={buyTogether}/>
            </div>
        </div>);
}
export default ShopTogether;
