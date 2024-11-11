// deno-lint-ignore-file
import { Head } from "$fresh/runtime.ts";

interface Props {
  src?: string;
}


const runOnMount = () => {
  window.onload = () => {
    const iFrame = document.getElementById(
      "proxy-loader",
    ) as HTMLIFrameElement;
    if (!iFrame) {
      return console.error("Couldn't find iframe");
    }
    iFrame.height = `${iFrame.contentWindow?.document.body.scrollHeight}`;
  };
};

export default function ProxyIframe({ src }: Props) {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: `(${runOnMount})();` }}>
      </script>
      <Head>
      <style
          type="text/css"
          dangerouslySetInnerHTML={{
            __html: `

            .my-account-container {
              margin-top: 60px;
              margin-bottom: 40px;
              gap: 20px;
            }
              

            .my-account-title {
              font-size:40px;
            }

            .my-account-subtitle {
              font-size:20px;
            }

            @media only screen and (max-width: 768px) {
              .my-account-container {
                margin-top: 26px;
                margin-bottom: 30px;
                gap: 12px;
              }
              .my-account-title {
                font-size:24px;
              }
              .my-account-subtitle {
                font-size:16px;
              }
            }
            `,
          }}
        />
      </Head>
      <iframe
        id="proxy-loader"
        style="width:100%;border:none;overflow:hidden;min-height:950px;"
        src={src}
        // onload='javascript:(function(o){o.style.height=o.contentWindow.document.body.scrollHeight+"px";}(this));'
      >
      </iframe>
    </>
  );
}
