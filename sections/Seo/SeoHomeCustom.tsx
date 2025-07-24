import { AppContext } from "apps/commerce/mod.ts";
import type { ImageWidget as Image } from "apps/admin/widgets.ts";
import ScriptLDJson from "$store/components/seo/ScriptLDJson.tsx";
import { SectionProps } from "deco/mod.ts";

export interface ContactPointProps {
    telephone?: string;
    contactType?: string;
    areaServed?: string;
    availableLanguage?: string; 
}

export interface Props {
    /** @title Nome da Loja */
    name?: string;
    /** @title Url da Loja */
    url?: string;
    /** @title Logo da Loja */
    logo?: Image;
    /** @title Contatos da Loja */
    contactPoint: ContactPointProps[];
    /** @title Links das redes sociais */
    sameAs?: string[];
}

export function loader(props: Props, _req: Request, _ctx: AppContext) {
    const {
        contactPoint,
        logo,
        name,
        sameAs,
        url
    } = props;

    const ldJson = {
        "@type": "Organization",
        "name": name,
        "url": url,
        "logo": logo,
        "contactPoint": contactPoint.map((contact)=> ({
            "@type": "ContactPoint",
            "telephone": contact.telephone,
            "contactType": contact.contactType,
            "areaServed": contact.areaServed,
            "availableLanguage": contact.availableLanguage
        })),
        "sameAs": sameAs,
    }

    return ldJson;
}

function SeoHomeCustom(props: SectionProps<typeof loader>) {
    return (
        <ScriptLDJson {...props} />
    );
}

export default SeoHomeCustom;