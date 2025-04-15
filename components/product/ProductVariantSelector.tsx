import Avatar from "$store/components/ui/Avatar.tsx";
 import { useVariantPossibilities } from "$store/sdk/useVariantPossiblities.ts";
 import type { Product } from "apps/commerce/types.ts";
 
 interface Props {
   product: Product;
   currentURL: string;
 }
 
 function VariantSelector({ product, product: { url }, currentURL }: Props) {
   const possibilities = useVariantPossibilities(product);
  
   return (
     <ul class="flex flex-col gap-5">
       {Object.entries(possibilities).map(([name, values]) => {
         // Se houver apenas uma chave dentro de `values`, não renderizar
        //  if (Object.keys(values).length <= 1) return null;
         if (Object.keys(values).length <= 1 && name !== "Opção") return null;
 
         return (
           <li class="flex flex-col gap-[10px]" key={name}>
             <span class="text-xs text-base-300">{name}</span>
             <ul class="flex flex-row flex-wrap gap-[5px]">
               {Object.entries(values).map(([value, { urls, inStock }]) => (
                 <li key={value}>
                   <a href={urls[0]}>
                     <Avatar
                       content={value}
                       variant={inStock ? "default" : "disabled"}
                       active={urls[0] === currentURL}
                     />
                   </a>
                 </li>
               ))}
             </ul>
           </li>
         );
       })}
     </ul>
   );
 }

export default VariantSelector;