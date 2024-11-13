// deno-lint-ignore-file
import { useComputed, useSignal } from "@preact/signals";
import Icon from "$store/components/ui/Icon.tsx";
import Button from "$store/components/ui/Button.tsx";
import { useWishlist } from "apps/vtex/hooks/useWishlist.ts";
import { useUser } from "apps/vtex/hooks/useUser.ts";
import { useState } from "preact/hooks";

interface Props {
  productID: string;
  productGroupID?: string;
  variant?: "icon" | "full";
}

function WishlistButton({
  variant = "icon",
  productGroupID,
  productID,
}: Props) {
  const { user } = useUser();
  const item = { sku: productID, productId: productGroupID || "" };
  const { loading, addItem, removeItem, getItem } = useWishlist();
  const listItem = useComputed(() => getItem(item));
  const fetching = useSignal(false);

  const [hovered, setHovered] = useState(false);

  const isUserLoggedIn = Boolean(user.value?.email);
  const inWishlist = Boolean(listItem.value);

  return (
    <Button
      class={variant === "icon"
        ? `gap-2 !border-0 ${
          inWishlist || hovered ? "wishlist-item border-0" : "wishlist-notItem"
        }`
        : "btn-primary btn-outline gap-2"}
      loading={fetching.value}
      aria-label="Add to wishlist"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={async (e) => {
        e.stopPropagation();
        e.preventDefault();

        if (!isUserLoggedIn) {
          globalThis.alert(
            "Faça login antes de adicionar itens à sua lista de desejos.",
          );
          window.location.href = "/my-account";
          return;
        }

        if (loading.value) {
          return;
        }

        try {
          fetching.value = true;
          inWishlist
            ? await removeItem({ id: listItem.value!.id }!)
            : await addItem(item);
        } finally {
          fetching.value = false;
        }
      }}
    >
      <Icon
        id="Heart"
        size={20}
        strokeWidth={2}
        className={inWishlist || hovered ? "!fill-black" : "none"}
        fill={inWishlist || hovered ? "blue" : "none"}
      />
      {variant === "icon" ? null : inWishlist ? "Remover" : "Favoritar"}
    </Button>
  );
}

export default WishlistButton;
