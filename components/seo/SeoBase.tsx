import { Head } from "$fresh/runtime.ts";

export interface Props {
  title?: string;
  description?: string;
  url?: string;
  imageUrl?: string;
  themeColor?: string;
  seoPlpUrl?: URL; // Adiciona seoPlpUrl
}

function BaseSeo(
  { title, description, imageUrl, themeColor, url, seoPlpUrl }: Props,
) {
  return (
    <Head>
      {title && <title>{title}</title>}
      {themeColor && <meta name="theme-color" content={themeColor} />}
      {description && <meta name="description" content={description} />}

      {/* OpenGraph tags */}
      {title && <meta property="og:title" content={title} />}
      {description && <meta property="og:description" content={description} />}
      {url && <meta property="og:url" content={url} />}
      {imageUrl && <meta property="og:image" content={imageUrl} />}
      {seoPlpUrl && (
        <link
          rel="canonical"
          href={`https://www.hospitalardistribuidora.com.br${seoPlpUrl.pathname}`}
        />
      )}
      <meta property="og:type" content="website" />
    </Head>
  );
}

export default BaseSeo;
