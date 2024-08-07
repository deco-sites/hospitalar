import  { UserButton as Component } from "$store/components/header/Buttons.tsx";
import { LoginSetting } from "site/components/header/HeaderLayoutV2.tsx";


function Island(props: { login: LoginSetting[] }) {
    return <Component {...props} />;
}
  
export default Island;