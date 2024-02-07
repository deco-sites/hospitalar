import { useEffect } from "preact/hooks";

declare global {
  interface Window {
    blue_q?: Array<{ event: string; value: string }>;
  }
}

const BlueTagVisit = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "//event.getblue.io/js/blue-tag.min.js";
    script.async = true;
    document.head.appendChild(script);

    const eventData = [
      { event: "setCampaignId", value: "236D6DD2-E221-52CF-59E8647FC96917D8" },
      { event: "setPageType", value: "visit" },
    ];

    window.blue_q = window.blue_q || [];
    window.blue_q.push(...eventData);

    eventData.forEach(({ event, value }) => {
      window.blue_q!.push({ event, value });
    });
  }, []);

  return null;
};

export default BlueTagVisit;
