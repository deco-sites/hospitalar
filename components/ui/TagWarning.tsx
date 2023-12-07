import Icon from "$store/components/ui/Icon.tsx";

interface Props {
  width?: string; 
  height?: string; 
  style?: string; 
}

const TagWarning = ({width, height, style }:Props) => {
    return (
        <div class={`my-[20px] ${style}`}>
            <Icon
                class=""
                id="warning"
                width={ width?? "191"}
                height={ height ?? "34"}
                strokeWidth={1}
            />
        </div>
    );
};

export default TagWarning;