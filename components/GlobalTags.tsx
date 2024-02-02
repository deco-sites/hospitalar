import { asset, Head } from "$fresh/runtime.ts";

function GlobalTags() {
  return (
    <Head>
      {/* Enable View Transitions API */}
      <meta name="view-transition" content="same-origin" />

      {/* Tailwind v3 CSS file */}
      <link href={asset("/styles.css")} rel="stylesheet" />

      <link rel="preconnect" href={asset("https://fonts.googleapis.com")} />
      <link
        rel="preconnect"
        href={asset("https://fonts.gstatic.com")}
        crossOrigin="true"
      />

      <link
        rel="preconnect"
        href={asset("https://fonts.gstatic.com")}
        crossOrigin="true"
      />

      <link
        rel="preload"
        as="style"
        href={asset(
          "https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap",
        )}
      />

      <link
        rel="stylesheet"
        media="print"
        href={asset(
          "https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap",
        )}
      />

      <noscript>
        <link
          rel="stylesheet"
          href={asset(
            "https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap",
          )}
        />
      </noscript>

      {/* Web Manifest */}
      <link rel="manifest" href={asset("/site.webmanifest")} />

     {/** RD Station Marketing */}
      <script type="text/javascript" async src="https://d335luupugsy2.cloudfront.net/js/loader-scripts/4c1c3b1d-a025-417d-a4c0-36f62d19422c-loader.js" ></script>
    </Head>
  );
}

export default GlobalTags;
