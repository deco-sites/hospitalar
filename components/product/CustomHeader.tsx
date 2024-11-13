interface Props {
  title?: string;
  fontSize?: "Normal" | "Large";
  description?: string;
  alignment: "center" | "left";
  color?: "primary" | "secondary";
}

function CustomHeader(props: Props) {
  return (
    <>
      {props.title || props.description
        ? (
          <div
            class={`flex flex-col gap-2 w-full lg:mt-10 ${
              props.alignment === "left" ? "text-left" : "text-center"
            }`}
          >
            {props.title &&
              (
                <h2
                  class={`font-poppins not-italic font-bold text-lg text-${
                    props.color ? props.color : "[#2C376D]"
                  }
                  `}
                >
                  {props.title}
                </h2>
              )}
            {props.description &&
              (
                <h2
                  class={`
                    leading-6 lg:leading-8
                    ${
                    props.color === "primary"
                      ? "text-primary-content"
                      : "text-neutral"
                  }
                    ${
                    props.fontSize === "Normal" ? "lg:text-xl" : "lg:text-2xl"
                  }
                  `}
                >
                  {props.description}
                </h2>
              )}
          </div>
        )
        : null}
    </>
  );
}

export default CustomHeader;
