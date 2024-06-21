import type { Product } from "apps/commerce/types.ts";
import { AppContext } from "apps/vtex/mod.ts";
import type { LoaderReturnType } from "$live/types.ts";
import { SectionProps } from "deco/mod.ts";
import { useOffer } from "$store/sdk/useOffer.ts";

interface Props {
    buyTogetherLoader: LoaderReturnType<Product[] | null>;
}

interface ITogetherProductsProps {
    skuId: string;
    sellerId: string | undefined;
    discount: number;
    price: number;
    productGroupId: string;
    name: string;
    quantity: number;
}

const useStableImages = (product: Product) => {
    const imageNameFromURL = (url = "") => {
        const segments = new URL(url).pathname.split("/");
        return segments[segments.length - 1];
    };

    const images = product.image ?? [];
    const allImages = product.isVariantOf?.hasVariant.flatMap((p) => p.image)
        .reduce((acc, img) => {
            if (img?.url) {
                acc[imageNameFromURL(img.url)] = img.url;
            }
            return acc;
        }, {} as Record<string, string>) ?? {};

    return images.map((img) => {
        const name = imageNameFromURL(img.url);

        return { ...img, url: allImages[name] ?? img.url };
    });
};

function CardResult() {
    const formatMoney = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(100);
    const formatMoneySlash = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(2100);
    const formatMoneyProm = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(2000);
    const formatMoneyParc = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(20);

    return (
        <div className="bg-[#F8F8F9] m-full rounded-2xl px-4 py-5">
            <div className="flex flex-col gap-3 items-center justify-center">
                <strong className="text-[#0D4F81] text-center font-poppins font-bold text-xl uppercase">Leve 3 Produtos</strong>
                <div className="flex flex-col items-center justify-center gap-4">
                    <div className="flex items-center justify-center rounded border border-[#2D386E] w-52 py-1 px-2">
                        <span className="text-[#0D4F81] text-center font-poppins font-semibold text-xs">Economize {formatMoney}</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[#1B1C17] text-center font-poppins text-xs font-normal line-through">{formatMoneySlash}</span>
                        <strong className="text-[#0D4F81] text-center font-poppins text-sm font-bold">{formatMoneyProm} à vista</strong>
                        <p className="text-[#636363] text-center font-poppins text-xs font-normal w-40">Ou <strong>{formatMoneyProm}</strong> em 10x de de {formatMoneyParc} cartão de crédito</p>
                    </div>
                </div>
                <button className="flex bg-[#2D386E] items-center justify-center py-4 px-10 rounded-full w-52 text-white text-center font-poppins text-sm font-bold">Compre Junto</button>
            </div>
        </div>
    );
}

function ProductTogether({ isLine }: { isLine: boolean; }) {
    return (
        <div className={`rounded-2xl border border-[#D7D7DA] pb-5 px-3 ${isLine && "flex flex-col"}`}>
            <div className={`flex ${isLine ? "flex-row" : "flex-col"} items-center justify-center gap-5`}>
                <a className="w-full h-auto">
                    <img className="w-full h-auto" src="/arquivos/ids/174718/Luva-Nitrilica-Antimicrobiana-Amg-Medix-1600641110.jpg" />
                </a>
                <div className="w-full gap-3 flex flex-col">
                    <div className="overflow-hidden w-full truncate">
                        <span className="text-[##4A4B51] text-center font-poppins text-xs font-normal">Estetoscópio Spirit Pro-Lite Adulto Rosa Transparente Champagne</span>
                    </div>
                    <div className="w-full h-auto gap-[2px] flex flex-col items-center justify-center">
                        <p className="text-[#0D4F81] text-center font-poppins text-sm font-medium"><strong>R$ 270,63</strong> <br /> à vista ou R$ 270,63</p>
                        <p className="text-[#1F2937] text-center font-poppins text-xs font-normal">em até 6x de $R$ 46,50 sem juros</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function loader(props: Props, _req: Request, ctx: AppContext) {
    if (!props.buyTogetherLoader) return { success: false, buyTogether: null };

    return { success: true, buyTogether: props.buyTogetherLoader }
}

function ShopTogether(props: SectionProps<typeof loader>) {
    if (!props.success) return null;

    const { buyTogether } = props;
    const togetherProducts: ITogetherProductsProps[] = [];

    if (!buyTogether) return null;

    console.log("buyTogether: ", buyTogether);

    buyTogether.forEach((product, index) => {
        let { name, productID, offers, isVariantOf } = product;
        let { price, listPrice, seller } = useOffer(offers);

        togetherProducts.push({
            skuId: productID,
            sellerId: seller,
            discount: price && listPrice ? listPrice - price : 0,
            price: price ?? 0,
            productGroupId: isVariantOf?.productGroupID ?? "",
            name: name ?? "",
            quantity: 1,
        });
    });

    if (togetherProducts.length === 0) return null;

    return (
        <div className="container w-full m-auto px-5 my-5 lg:my-10">
            <div className="flex w-full h-auto flex-col gap-14">
                <h2 className="text-xl lg:text-2xl leading-8 lg:leading-10 font-medium text-primary">Aproveite e leve também</h2>
                <div className="w-full h-auto flex flex-col">
                    <div className={`${togetherProducts.length === 2 ? "grid grid-cols-2 gap-3" : "flex flex-col"} w-full h-auto relative`}>
                        <ProductTogether isLine={!(togetherProducts.length === 2)} />
                        <ProductTogether isLine={!(togetherProducts.length === 2)} />
                        {(togetherProducts.length === 2) && (
                            <div className="absolute rounded-full flex items-center justify-center bg-[#0D4F81] p-1 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
                                    <g id="Icone">
                                        <path id="Vector" d="M10 4.66669V16.3334" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        <path id="Vector_2" d="M4.16667 10.5H15.8333" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    </g>
                                </svg>
                            </div>
                        )}
                    </div>
                    <CardResult />
                </div>
            </div>
        </div>
    );
}

export default ShopTogether;