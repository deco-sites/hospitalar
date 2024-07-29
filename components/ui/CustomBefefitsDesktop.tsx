import Image from "apps/website/components/Image.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import { clx } from "deco-sites/hospitalar/sdk/clx.tsx";

interface TextGeneric{
    /**@title Título */
    title?: string;
    /**@title Descrição */    
    description?: string;
}

/**@titleBy alt */
interface ImageGeneric{
    /**@title Nome da Imagem */
    alt?: string;
    /**@title Imagem */
    src?:ImageWidget;
    /**
     * @title Largura
     * @description (ex: 250) 
     * */
    width?: number;
    /**
     * @title altura
     * @description (ex: 250) 
     * */    
    height?:number;
}

interface Icon{
    /**@title Imagem */
    image?: ImageGeneric;
    /**@title Texto */    
    text?: TextGeneric;
}

interface Props{
    /**
     * @title Imagem
     * @maxItems 4 
    */
    icon?: Icon[];
}

function CustomBefefitsDesktop( { icon } : Props ){
    return(
        <>
            <div 
                class={clx(`container w-full px-5 mx-[auto] my-[2.5rem]`)}>
                <div 
                    class={clx(`flex justify-between`)}>
                    {icon && icon.length > 0 && icon.map(( item, index )=>{
                        return(
                            <>
                                <div class={clx(`flex gap-x-[0.875rem]`)}>
                                    {item.image && item.image.src && item.image.width && item.image.height && (
                                        <Image
                                            src={item.image.src}
                                            width={item.image.width}
                                            height={item.image?.height}
                                            alt={item.image?.alt || `Ícone Benefícios ${index}`}
                                            loading="lazy"
                                        />
                                    ) }

                                    {item.text && item.text.title && item.text.description && (
                                        <div>
                                            <p class={clx(`font-bold text-[1.188rem] leading-[1.544rem]`)}> { item.text.title } </p>
                                            <p class={clx(`font-normal text-base leading-[1.25rem]`)}> { item.text.description } </p>
                                        </div>
                                    )}

                                </div>
                            </>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default CustomBefefitsDesktop;