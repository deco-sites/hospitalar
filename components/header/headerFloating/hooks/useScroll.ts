// deno-lint-ignore-file no-window
import { useEffect } from "preact/hooks";
type onScroll = () => void;
interface useScrollProps {
    onScrollDown: onScroll;
    onScrollUp: onScroll;
}

export const useScroll = (props: useScrollProps) => {
    useEffect(() => {
        const threshold = 0;
        let lastScrollY = window.scrollY;
        let ticking = false;

        const updateScrollDir = () => {
            const scrollY = globalThis.scrollY;

            if (Math.abs(scrollY - lastScrollY) < threshold) {
                ticking = false;
                return;
            }

            scrollY > lastScrollY ? props.onScrollDown() : props.onScrollUp(),
                lastScrollY = scrollY > 0 ? scrollY : 0;
            ticking = false;
        };

        const onScroll = () => {
            if (!ticking) {
                globalThis.requestAnimationFrame(updateScrollDir);
                ticking = true;
            }
        };

        globalThis.addEventListener("scroll", onScroll);

        return () => globalThis.removeEventListener("scroll", onScroll);
    }, []);
};