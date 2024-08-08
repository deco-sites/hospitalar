
import { FnContext, SectionProps } from "deco/mod.ts";
import { Picture, Source } from "deco-sites/std/components/Picture.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import { clx } from "$store/sdk/clx.ts";

interface ImageGeneric{
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

/**@titleBy alt */
interface Device{
    /**
     * @title Nome do bloco
     */    
    alt?: string;    
    /**
     * @title Desktop
     */    
    desktop?: ImageGeneric;
    /**
     * @title Mobile
     */    
    mobile?: ImageGeneric;
}

interface Props{
    /**
     * @title Imagem
     */
    image?: Device[];
}

function CustomImageGallery(props: SectionProps<ReturnType<typeof loader>> ){
    const { image } = props

    return(
        <>
            <div class={clx(`max-2xl:container w-full px-5 flex justify-center`)}>
                <div class={clx(`flex flex-col lg:flex-row max-lg:gap-y-[1.25rem] lg:gap-x-[2.688rem] mt-[1.875rem]`)}>
                    {image && Object.entries(image).length > 0 && image.map(( { desktop, mobile, alt }, index )=>{
                        return(
                            <>
                                <Picture >
                                    {desktop?.src && desktop.width && desktop.height && (
                                        <Source
                                            media="(min-width: 1025px)"
                                            src={desktop.src}
                                            width={desktop.width}
                                            height={desktop.height}
                                        />                                
                                    )}    

                                    {mobile?.src && mobile.width && mobile.height && (                        
                                        <Source
                                            media="(max-width: 1024px)"
                                            src={mobile.src}
                                            width={mobile.width}
                                            height={mobile.height}
                                        />
                                    )} 

                                    {desktop?.src && desktop.width && desktop.height && (
                                        <img
                                            loading='lazy'
                                            src={desktop.src}
                                            width={desktop.width}
                                            height={desktop.height}
                                            alt={alt ?? 'Imagem' + index}
                                            class="max-lg:w-full"
                                        />
                                    )} 

                                </Picture>                    
                            </>
                        )
                    })} 
                </div>
            </div>
            
        </>
    )
}

export const loader = (props: Props, _req: Request, ctx: FnContext) => {
    return {
      ...props,
      device: ctx.device || "desktop",
    };
  };

export default CustomImageGallery;