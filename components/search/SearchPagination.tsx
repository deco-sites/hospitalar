export type Props = {
  pageInfo: {
    currentPage: number;
    nextPage?: string;
    previousPage?: string;
  };
};

export default function SearchPagination({ pageInfo }: Props) {
  return (
    <div class="flex justify-center mt-[40px] mb-[60px] gap-[10px]">
      {pageInfo.previousPage && (
        <a
          aria-label="previous page link"
          rel="prev"
          href={pageInfo.previousPage ?? "#"}
          class="w-10 h-10 border-2 border-[#9CA3AF] text-[#9CA3AF] rounded-full flex items-center justify-center text-sm font-bold"
        >
          {pageInfo.currentPage - 1}
        </a>
      )}
      <span class="w-10 h-10 bg-[#2C376D] rounded-full text-white flex items-center justify-center text-sm font-bold">
        {pageInfo.currentPage}
      </span>
      {pageInfo.nextPage && (
        <a
          aria-label="next page link"
          rel="next"
          href={pageInfo.nextPage ?? "#"}
          class="w-10 h-10 border-2 border-[#9CA3AF] text-[#9CA3AF] rounded-full flex items-center justify-center text-sm font-bold"
        >
          {pageInfo.currentPage + 1}
        </a>
      )}
    </div>
  );
}
