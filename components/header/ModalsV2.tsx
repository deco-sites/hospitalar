import Loading from "$store/components/ui/Loading.tsx";
import Modal from "$store/components/ui/Modal.tsx";
import { useUI } from "$store/sdk/useUI.ts";
import { lazy, Suspense } from "preact/compat";

import type { Props as MenuProps } from "$store/components/header/Menu.tsx";
import { ICartProps } from "$store/components/minicart/Cart.tsx";
import { LoginSetting } from "site/components/header/HeaderLayoutV2.tsx";

import Menu from "$store/islands/MenuModal.tsx";
import Cart from "$store/components/minicart/Cart.tsx";

interface Props {
  login?: LoginSetting[]
  menu?: MenuProps;
  minicart?: ICartProps;
}

function Modals({ menu, minicart, login }: Props) {
  const { displayCart, displayMenu } = useUI();

  const fallback = (
    <div class="flex justify-center items-center w-full h-full">
      <span class="loading loading-ring" />
    </div>
  );

  return (
    <>
      {menu && (
        <Modal
          title="Entrar"
          menuIcon="User"
          mode="sidebar-left"
          loading="lazy"
          id="menu-modal"
          showHeader={false}
          open={displayMenu.value}
          onClose={() => {}}
          class="backdrop:bg-base-content backdrop:opacity-70"
        >
          <Suspense fallback={fallback}>
            <Menu {...menu} login={login} />
          </Suspense>
        </Modal>
      )}

      {minicart && (
        <Modal
          class="ml-auto"
          title="Minha sacola"
          mode="sidebar-right"
          showHeader
          id="minicart-modal"
          loading="lazy"
          open={displayCart.value}
          onClose={() => {
            displayCart.value = false;
          }}
          invertCloseIcon
          closeIcon="ReturnArrow"
        >
          <Suspense fallback={<Loading />}>
            <Cart {...minicart as ICartProps} />
          </Suspense>
        </Modal>
      )}
    </>
  );
}

export default Modals;
