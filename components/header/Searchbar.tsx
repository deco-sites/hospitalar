import { lazy, Suspense } from "preact/compat";
import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";

const LazySearchbar = lazy(() =>
  import("$store/components/search/Searchbar.tsx")
);

interface Props {
  searchbar: SearchbarProps;
}

function Searchbar({ searchbar }: Props) {
  return (
    <div className="flex flex-1 w-full">
      <Suspense fallback={<span class="loading loading-ring" />}>
        <LazySearchbar {...searchbar} variant="desktop" />
      </Suspense>
    </div>
  );
}

export default Searchbar;
