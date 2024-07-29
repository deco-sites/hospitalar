import { FnContext, SectionProps } from "deco/mod.ts";
import CustomBefefitsDesktop from '$store/components/ui/CustomBefefitsDesktop.tsx';
import CustomBefefitsMobile from '$store/components/ui/CustomBefefitsMobile.tsx';
import type { ImageWidget } from "apps/admin/widgets.ts";

interface TextGeneric{
    /**@title Título */
    title?: string;
    /**@title Descrição */    
    description?: string;
}

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
interface Icon{
    /**@title Nome do Bloco */
    alt?: string;    
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


function CustomBefefits(props: SectionProps<ReturnType<typeof loader>>){
    const { device, icon } = props;

    console.log('device: ', device)


    if( device === 'desktop' ){
        return(
            <>
                {icon && Object.entries(icon).length > 0 &&
                    (<CustomBefefitsDesktop  icon={icon} />)
                }
            </>
        )
    }

    if( device === 'mobile' ){
        return(
            <>            
                {icon && Object.entries(icon).length > 0 &&
                    (<CustomBefefitsMobile  icon={icon} />)
                }            
            </>
        )
    }
}

export const loader = (props: Props, _req: Request, ctx: FnContext) => {
    return {
        ...props,
        device: ctx.device,
    };
};
  

export default CustomBefefits;