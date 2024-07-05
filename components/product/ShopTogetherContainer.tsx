import { useState, useEffect } from "preact/compat";
import type { Product } from "apps/commerce/types.ts";
import { useAddToCartMany } from "$store/sdk/useAddToCartMany.ts";
import Button from "$store/components/ui/Button.tsx";
import { useOffer } from "$store/sdk/useOffer.ts";
import { formatPrice } from "$store/sdk/format.ts";

interface IShopTogetherContainerProps {
    buyTogether: Product[];
}

interface ITogetherProductsProps {
    mainSkuId: string;
    skuId: string;
    sellerId?: string;
    discount: number;
    price: number;
    productGroupId: string;
    name: string;
    quantity: number;
    listPrice?: number;
}

interface IVariantListProps {
    name: string;
    variantProductID: string;
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

const useGetVariantPossibilities = (product: Product) => {
    const { isVariantOf } = product;
    const variantList: IVariantListProps[] = [];

    if (!isVariantOf) return undefined;

    const { hasVariant } = isVariantOf;

    hasVariant.forEach(variant => {
        const { name, productID: variantProductID } = variant;

        variantList.push({
            name: name ?? "",
            variantProductID
        });
    });

    return variantList;
}

function VariantSelector({ isLine, product, onChangeVariant }: { isLine: boolean; product: Product; onChangeVariant: (sku: string, newName: string) => void }) {
    const possibilities = useGetVariantPossibilities(product);
    const { name, sku } = product;

    if (!possibilities) return null;

    return (
        <div className={`flex flex-col ${!isLine ? "items-center justify-center" : ""} mt-3 gap-3 w-full lg:items-center lg:justify-center`}>
            <span className="font-poppins font-medium text-xs text-[#2D386E]">Selecione a opção</span>
            <select
                onChange={(e) => {
                    const { value } = e.currentTarget;
                    onChangeVariant(sku, value);
                }}
                className="pointer w-full h-12 border-[#C5C6CB] border px-5 py-3 rounded-full font-poppins font-normal text-sm text-[#999BA2]"
            >
                <option value={`${name}-${sku}`} className="font-poppins font-normal text-sm text-[#999BA2]">{!isLine ? "Selecione" : "Selecione aqui"}</option>
                {
                    possibilities.map((variant, index) => {
                        return (
                            <option className="font-poppins font-normal text-sm text-[#999BA2]" value={`${variant.name}-${variant.variantProductID}`} key={index}>{variant.name}</option>
                        );
                    })
                }
            </select>
        </div>
    );
}

function CardResult({ quantity, totalListPrice, totalPrice, items }: {
    quantity: number;
    totalListPrice: number;
    totalPrice: number;
    items: ITogetherProductsProps[];
}) {
    const formatMoney = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalListPrice - totalPrice);
    const formatMoneySlash = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalListPrice);
    const formatMoneyProm = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalPrice);
    const { loading, onClick } = useAddToCartMany({ items });

    return (
        <div className="bg-[#F8F8F9] m-full rounded-2xl px-4 py-5 mt-10 relative lg:mt-0 lg:flex lg:justify-center lg:items-center">
            <div className="absolute left-1/2 transform -translate-x-1/2 -top-[30px] lg:-left-[19px] lg:-translate-y-1/2 lg:top-1/2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M4.16666 7.5H15.8333" stroke="#0D4F81" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M4.16666 12.5H15.8333" stroke="#0D4F81" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </div>
            <div className="flex flex-col gap-3 items-center justify-center">
                <strong className="text-[#0D4F81] text-center font-poppins font-bold text-xl uppercase">Leve {quantity} Produtos</strong>
                <div className="flex flex-col items-center justify-center gap-4">
                    {(totalListPrice - totalPrice !== 0) && (
                        <div className="flex items-center justify-center rounded border border-[#2D386E] w-52 py-1 px-2">
                            <span className="text-[#0D4F81] text-center font-poppins font-semibold text-xs">Economize {formatMoney}</span>
                        </div>
                    )}
                    <div className="flex flex-col">
                        {(totalListPrice !== totalPrice) && (
                            <span className="text-[#1B1C17] text-center font-poppins text-xs font-normal line-through">{formatMoneySlash}</span>
                        )}
                        <strong className="text-[#0D4F81] text-center font-poppins text-sm font-bold">{formatMoneyProm} à vista</strong>
                    </div>
                </div>
                <Button
                    data-deco="add-to-cart"
                    title={"Compre Junto"}
                    class="flex bg-[#2D386E] items-center justify-center py-4 px-10 rounded-full w-52 text-white text-center font-poppins text-sm font-bold lg:w-48"
                    onClick={onClick}
                    loading={loading}
                >Compre Junto</Button>
            </div>
        </div>
    );
}

function ProductTogether({ isLine, lastProduct, product, checked, onToggle, onChangeVariant }: { isLine: boolean; lastProduct: boolean; product: Product; onToggle: () => void; checked: boolean; onChangeVariant: (sku: string, newName: string) => void; }) {
    const { offers, name, isVariantOf, url } = product;
    const { price, installment, installments } = useOffer(offers);
    const [image] = useStableImages(product);

    return (
        <div className={`rounded-2xl border relative border-[#D7D7DA] ${isLine ? "py-[30px] px-[15px] mb-" : "pb-5 px-3"} ${isLine && "flex flex-col justify-between"} lg:py-[20px] px-[14px]`}>
            <div className={`flex ${isLine ? "flex-row" : "flex-col"} items-center justify-center gap-5 lg:flex-col`}>
                <a href={url} className={`${isLine ? "w-[120px] h-auto" : "w-full h-auto"} lg:w-full xl:max-w-52`}>
                    <img
                        className="w-full h-auto"
                        src={image.url!}
                        alt={image.alternateName}
                        loading={"lazy"}
                    />
                </a>
                <div className={`${isLine ? "w-[calc(100%-120px)] lg:w-full" : "w-full"} gap-3 flex flex-col`}>
                    <div className="overflow-hidden w-full truncate lg:overflow-visible lg:whitespace-normal">
                        <span className="text-[#4A4B51] lg:block lg:w-full text-center font-poppins text-xs font-normal">{isVariantOf?.name || name}</span>
                    </div>
                    <div className={`w-full h-auto gap-[2px] flex flex-col justify-center ${isLine ? "items-start" : "items-center"} lg:items-center`}>
                        <p className={`text-[#0D4F81] ${isLine ? "text-left" : "text-center"} font-poppins text-sm font-medium lg:text-center`}>
                            <strong>{formatPrice(price)!.replace("\xa0", " ")}</strong> à vista <br /> <>{installment && installment.billingDuration && installment.billingIncrement && installment.billingDuration > 1 && (<> ou {formatPrice(installment.billingDuration * installment.billingIncrement)!.replace("\xa0", " ")} </>)}</>
                        </p>
                        {installments && installment && installment.billingDuration && installment.billingDuration > 1 && (
                            <p className="text-[#1F2937] text-center font-poppins text-xs font-normal">em até {installments} sem juros</p>
                        )}
                    </div>
                </div>
            </div>
            {isLine && !lastProduct && (
                <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-[30px] lg:left-[108%] lg:bottom-[45%] lg:-translate-y-1/2 2xl:left-[106.5%]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M10 4.16669V15.8334" stroke="#0D4F81" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M4.16666 10H15.8333" stroke="#0D4F81" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </div>
            )}
            {(isLine) && (
                <label class="flex items-center absolute top-3 right-3 z-40">
                    <input
                        type="checkbox"
                        class="hidden peer"
                        checked={checked}
                        onChange={onToggle}
                    />
                    <div class="w-[18px] h-[18px] flex items-center justify-center rounded-full border border-[#2D386E]">
                        {checked && (
                            <div class="w-[14px] h-[14px] border bg-[#2D386E] rounded-full">
                            </div>
                        )}
                    </div>
                </label>
            )}
            <VariantSelector isLine={isLine} onChangeVariant={onChangeVariant} product={product} />
        </div>
    );
}

function ShopTogetherContainer({ buyTogether }: IShopTogetherContainerProps) {
    const [togetherProducts, setTogetherProducts] = useState<ITogetherProductsProps[]>([]);
    const [buyTogetherLimited, setBuyTogetherLimited] = useState<Product[]>([]);
    const [totalListPrice, setTotalListPrice] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const initialTogetherProducts: ITogetherProductsProps[] = [];
        const buyTogetherReduce: Product[] = []; 
        let initialTotalListPrice = 0;
        let initialTotalPrice = 0;

        buyTogether.forEach((product, index) => {
            if(index < 3) buyTogetherReduce.push(product);
        });

        buyTogetherReduce.forEach((product, index) => {
            const { name, productID, offers, isVariantOf } = product;
            const { price, listPrice, seller } = useOffer(offers);

            const productProps = {
                mainSkuId: productID,
                skuId: productID,
                sellerId: seller,
                discount: price && listPrice ? listPrice - price : 0,
                price: price ?? 0,
                productGroupId: isVariantOf?.productGroupID ?? "",
                name: name ?? "",
                quantity: 1,
                listPrice
            };

            initialTogetherProducts.push(productProps);
            if (listPrice) initialTotalListPrice += listPrice;
            if (price) initialTotalPrice += price;
        });

        setBuyTogetherLimited(buyTogetherReduce);
        setTogetherProducts(initialTogetherProducts);
        setTotalListPrice(initialTotalListPrice);
        setTotalPrice(initialTotalPrice);
    }, [buyTogether]);

    const handleToggle = (product: Product) => {
        setTogetherProducts((prevTogetherProducts) => {
            const productIndex = prevTogetherProducts.findIndex((p) => p.mainSkuId === product.sku);

            let updatedProducts = [...prevTogetherProducts];
            if (productIndex > -1) {
                updatedProducts.splice(productIndex, 1);
            } else {
                const { name, productID, offers, isVariantOf } = product;
                const { price, listPrice, seller } = useOffer(offers);

                updatedProducts.push({
                    mainSkuId: productID,
                    skuId: productID,
                    sellerId: seller,
                    discount: price && listPrice ? listPrice - price : 0,
                    price: price ?? 0,
                    productGroupId: isVariantOf?.productGroupID ?? "",
                    name: name ?? "",
                    quantity: 1,
                    listPrice
                });
            }

            const newTotalListPrice = updatedProducts.reduce((acc, p) => acc + (p.listPrice ?? 0), 0);
            const newTotalPrice = updatedProducts.reduce((acc, p) => acc + (p.price ?? 0), 0);

            setTotalListPrice(newTotalListPrice);
            setTotalPrice(newTotalPrice);

            return updatedProducts;
        });
    }

    const handleSwitch = (sku: string, newName: string) => {
        const [variantName, variantSKU] = newName.split("-");
        setTogetherProducts((prevTogetherProducts) => {
            const updatedProducts = prevTogetherProducts.map((product) => {
                if (product.skuId === sku) {
                    return { ...product, name: variantName, skuId: variantSKU };
                }
                return product;
            });
            return updatedProducts;
        });
    }

    if(buyTogetherLimited.length === 0) return null;

    return (
        <div className={`w-full h-auto flex flex-col lg:grid ${buyTogetherLimited.length > 2 ? "lg:grid-cols-[1fr_300px]" : "lg:grid-cols-[1fr_300px]"} lg:gap-[42px]`}>
            <div className={`${buyTogetherLimited.length === 2 ? "grid grid-cols-2 gap-3 w-full lg:!w-auto lg:gap-[42px] lg:grid-cols-[360px_360px]" : `flex flex-col gap-10 lg:grid lg:grid-cols-${buyTogetherLimited.length} lg:gap-5 xl:gap-[42px] w-full`} h-auto relative`}>
                {buyTogetherLimited.map((productTogether, index) => {
                    return (
                        <ProductTogether
                            isLine={!(buyTogetherLimited.length === 2)}
                            lastProduct={buyTogetherLimited.length - 1 === index}
                            product={productTogether}
                            onChangeVariant={handleSwitch}
                            onToggle={() => handleToggle(productTogether)}
                            checked={togetherProducts.some((p) => p.mainSkuId === productTogether.sku)}
                        />
                    );
                })}
                {(buyTogetherLimited.length === 2) && (
                    <>
                        <div className="absolute rounded-full flex items-center justify-center bg-[#0D4F81] p-1 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
                                <g id="Icone">
                                    <path id="Vector" d="M10 4.66669V16.3334" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    <path id="Vector_2" d="M4.16667 10.5H15.8333" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                </g>
                            </svg>
                        </div>
                        <div className="hidden absolute rounded-full items-center justify-center p-1 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 lg:!flex">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 4.16669V15.8334" stroke="#0D4F81" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.16666 10H15.8333" stroke="#0D4F81" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                        </div>
                    </>
                )}
            </div>
            <CardResult
                totalListPrice={totalListPrice}
                totalPrice={totalPrice}
                quantity={togetherProducts.length}
                items={togetherProducts}
            />
        </div>
    );
}

export default ShopTogetherContainer;