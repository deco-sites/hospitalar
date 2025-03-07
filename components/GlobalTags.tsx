import { asset, Head } from "$fresh/runtime.ts";

function GlobalTags() {
  const htmlScript = `
    !function(f, b, e, v, n, t, s) {
        if (f.fbq) return;
        n = f.fbq = function() {
            n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
        };
        if (!f._fbq) f._fbq = n;
        n.push = n;
        n.loaded = !0;
        n.version = '2.0';
        n.queue = [];
        t = b.createElement(e);
        t.async = !0;
        t.src = v;
        s = b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t, s);
    }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '1852045185040482');
    fbq('track', 'PageView');
  `;

  return (
    <Head>
      {/* Enable View Transitions API */}
      <meta name="view-transition" content="same-origin" />

      {/* Tailwind v3 CSS file */}
      <link href={asset("/styles.css")} rel="stylesheet" />

      <link rel="preconnect" href={asset("https://fonts.googleapis.com")} />

      {/* Google Tag Manager */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){
              w[l] = w[l] || [];
              w[l].push({'gtm.start': new Date().getTime(), event: 'gtm.js'});
              var f = d.getElementsByTagName(s)[0],
                  j = d.createElement(s),
                  dl = l != 'dataLayer' ? '&l=' + l : '';
              j.async = true;
              j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
              f.parentNode.insertBefore(j, f);
            })(window, document, 'script', 'dataLayer', 'GTM-5RZ228KT');
          `,
        }}
      />
      <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5RZ228KT"
        height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
      {/* End Google Tag Manager */}

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

      <script src="https://apis.google.com/js/platform.js?onload=renderOptIn" async defer></script>

      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.renderOptIn = function() {
              window.gapi.load('surveyoptin', function() {
                window.gapi.surveyoptin.render(
                  {
                    "merchant_id": 341040895,
                    "order_id": "ORDER_ID",
                    "email": "CUSTOMER_EMAIL",
                    "delivery_country": "COUNTRY_CODE",
                    "estimated_delivery_date": "YYYY-MM-DD",

                    // OPTIONAL FIELDS
                    "products": [{"gtin":"GTIN1"}, {"gtin":"GTIN2"}]
                  });
              });
            }
          `,
        }}
      />

      {/* Pixel Facebook */}
      <script async dangerouslySetInnerHTML={{ __html: htmlScript }} ></script>
      <noscript>
        <img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=1852045185040482&ev=PageView&noscript=1" />
      </noscript>
    </Head>
  );
}

export default GlobalTags;
