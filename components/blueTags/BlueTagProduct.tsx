import { useEffect } from "preact/hooks";

interface Props{
    blueProductId: string; 
}

const TagBlueProduct = ({ blueProductId }:Props) => {
  useEffect(() => {
    window.blue_q = window.blue_q || [];
    window.blue_q.push(
      { event: "setCampaignId", value: "236D6DD2-E221-52CF-59E8647FC96917D8" },
      { event: "setProductId", value: blueProductId },
      { event: "setPageType", value: "product" }
    );
    
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = '//event.getblue.io/js/blue-tag.min.js';
    script.async = true;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [blueProductId]);

  return null;
};

export default TagBlueProduct;