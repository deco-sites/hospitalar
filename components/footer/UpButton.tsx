import { Head } from "$fresh/runtime.ts";

const script = `
    window.addEventListener("load", () => {
    const elm = document.getElementById("BTT");

    if (elm) {
        elm.addEventListener("click", () => window.scroll(0,0), { passive: true });

        if (window.scrollY > 500) {
            elm.style.opacity = "1";
        } else {
        elm.style.opacity = "0";
        }
    }

        document.addEventListener("scroll", () => {
        const btt = document.getElementById("BTT");
        const height = window.scrollY;

        if (btt) {
            const isVisible = btt.style.opacity === "1";

            if (height > 500 && !isVisible) {
                btt.style.opacity = "1";
            }

            if (height <= 500 && isVisible) {
                btt.style.opacity = "0";
            }
        }
    }, { passive: true });
    });
`;

function UpButton() {
    return (
        <>
            <Head>
                <script dangerouslySetInnerHTML={{ __html: script }} defer />
            </Head>
            <button
                style={{
                    opacity: "0",
                }}
                id="BTT"
                href="#BTT"
                aria-label="Button Back to top"
                class="fixed bottom-10 right-7 rounded-full flex items-center justify-center flex-col w-11 h-11 gap-1 bg-[#2D386E] md:right-24"
            >
                <div class="">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="13" viewBox="0 0 22 13" fill="none">
                        <path d="M19.9008 11.1131C19.8236 11.1904 19.7319 11.2517 19.631 11.2936C19.5301 11.3354 19.4219 11.3569 19.3127 11.3569C19.2034 11.3569 19.0953 11.3354 18.9944 11.2936C18.8934 11.2517 18.8018 11.1904 18.7246 11.1131L11.0002 3.3877L3.27578 11.1131C3.1198 11.2691 2.90825 11.3567 2.68767 11.3567C2.46709 11.3567 2.25554 11.2691 2.09956 11.1131C1.94358 10.9572 1.85596 10.7456 1.85596 10.525C1.85596 10.3044 1.94358 10.0929 2.09956 9.93691L10.4121 1.62441C10.4893 1.54712 10.5809 1.48581 10.6819 1.44398C10.7828 1.40215 10.8909 1.38062 11.0002 1.38062C11.1094 1.38062 11.2176 1.40215 11.3185 1.44398C11.4194 1.48581 11.5111 1.54712 11.5883 1.62441L19.9008 9.93691C19.9781 10.0141 20.0394 10.1058 20.0812 10.2067C20.123 10.3076 20.1446 10.4158 20.1446 10.525C20.1446 10.6343 20.123 10.7424 20.0812 10.8433C20.0394 10.9443 19.9781 11.0359 19.9008 11.1131Z" fill="white" />
                    </svg>
                </div>
                <span class="text-white text-center font-poppins text-xs not-italic font-bold">Topo</span>
            </button>
        </>
    );
}

export default UpButton;