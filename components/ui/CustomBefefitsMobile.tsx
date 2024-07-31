import Image from "apps/website/components/Image.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import { clx } from "$store/sdk/clx.ts";
import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "preact/hooks";

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
    /**
     * @title Link da imagem
     * @description (ex: /medicamentos) 
     * */       
    href?: string; 
    /**@title Link externo? */
    hrefExternal?: boolean;   
}

interface Props{
    /**
     * @title Imagem
     * @maxItems 4 
    */
    icon?: Icon[];
}


function CustomBefefitsMobile({ icon } : Props){
    const id = useId();

    return(
        <>
            <div 
                class={clx(`container w-full px-5 mx-[auto] my-[2.5rem]`)}>
                <div 
                    class={clx(`flex justify-between`)}>                        
                        <Slider class="carousel gap-x-[3.313rem] scrollbar-none">                                        
                            {icon && icon.length > 0 && icon.map(( item, index )=>{
                                return(
                                    <>
                                        <Slider.Item index={index} class="carousel-item last-of-type:mr-5">    
                                            <a href={`${item?.href && item.href !== "#"
                                                    ? item?.href
                                                    : "javascript:void(0)"
                                                }`}
                                                style={{
                                                pointerEvents: `${
                                                    item?.href && item?.href !== "#"
                                                    ? "all"
                                                    : "none"
                                                }`,
                                                }}
                                                target={item?.hrefExternal ? '_blank' : ''}>
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
                                                            <p class={clx(`font-normal text-base leading-[1.25rem] text-[#0D4F81]`)}
                                                                style={{ textDecoration : item?.href ? 'underline' : 'none' }}> { item.text.description } </p>
                                                        </div>
                                                    )}
                                                </div>
                                            </a>                                        
                                        </Slider.Item>
                                    </>
                                )
                            })}                                        
                        </Slider>
            
                        <SliderJS rootId={id} />
                </div>
            </div>
        </>
    )
}

export default CustomBefefitsMobile;