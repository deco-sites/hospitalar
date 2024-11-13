import { useEffect } from "preact/compat";

export default function Debug<T>(props: T) {
  useEffect(() => {
    console.log(props);
  }, []);
  return <div></div>;
}
