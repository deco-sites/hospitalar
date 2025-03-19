import Icon from "$store/components/ui/Icon.tsx";
export type Props = {
  pageInfo: {
    currentPage: number;
    nextPage?: string;
    previousPage?: string;
    records: number;
    recordPerPage: number;
  };
};

export default function SearchPagination({ pageInfo }: Props) {
  const { records, recordPerPage, currentPage, nextPage, previousPage } = pageInfo;
  const totalPages = Math.ceil(records / recordPerPage); 

  const getLastPageLink = () => {
    if (currentPage === totalPages) {
      return "#";
    }
    return nextPage ? nextPage.replace(`page=${currentPage + 1}`, `page=${totalPages}`) : "#";
  };

  const getFirstPageLink = () => {
    if (currentPage === 1) {
      return "#";
    }
    return previousPage ? previousPage.replace(`page=${currentPage - 1}`, `page=1`) : "#";
  };

  const showFirstPage = currentPage >= totalPages - 2; 
  const showEllipsis = currentPage >= totalPages - 2; 

  const showLastPage = currentPage < totalPages - 1; 

  return (
    <div class="flex justify-center mt-[40px] mb-[60px] gap-[10px]">
       {showEllipsis && previousPage &&(
          <a
            aria-label="previous page link"
            rel="prev"
            href={previousPage ?? "#"}
            class="w-10 h-10 flex items-center justify-center"
          >
            <Icon 
                class="cursor-pointer"
                width={24}
                height={24}
                strokeWidth={1}
                id="SetaPaginationBackward"/>
          </a>
        )}
      {showFirstPage && (
        <>
          <a
            aria-label="first page link"
            rel="prev"
            href={getFirstPageLink()}
            class="w-10 h-10 border-2 border-[#9CA3AF] text-[#9CA3AF] rounded-full flex items-center justify-center text-sm font-bold"
          >
            1
          </a>
          {showEllipsis && (
            <span class="w-10 h-10 text-[#9CA3AF] rounded-full flex items-center justify-center text-sm font-bold">
              . . .
            </span>
          )}
        </>
      )}
      {previousPage && (
        <a
          aria-label="previous page link"
          rel="prev"
          href={previousPage ?? "#"}
          class="w-10 h-10 border-2 border-[#9CA3AF] text-[#9CA3AF] rounded-full flex items-center justify-center text-sm font-bold"
        >
          {currentPage - 1}
        </a>
      )}

      <span class="w-10 h-10 bg-[#2C376D] rounded-full text-white flex items-center justify-center text-sm font-bold">
        {currentPage}
      </span>

      {nextPage && (
        <a
          aria-label="next page link"
          rel="next"
          href={nextPage ?? "#"}
          class="w-10 h-10 border-2 border-[#9CA3AF] text-[#9CA3AF] rounded-full flex items-center justify-center text-sm font-bold"
        >
          {currentPage + 1}
        </a>
      )}

      {showLastPage &&(
        <span class="w-10 h-10 text-[#9CA3AF] rounded-full flex items-center justify-center text-sm font-bold">
          . . .
        </span>
      )}
      {showLastPage && (
        <a
          aria-label="last page link"
          rel="next"
          href={getLastPageLink()}
          class="w-10 h-10 border-2 border-[#9CA3AF] text-[#9CA3AF] rounded-full flex items-center justify-center text-sm font-bold"
        >
          {totalPages}
        </a>
      )}
      {showLastPage && nextPage && (
        <a
          aria-label="next page link"
          rel="next"
          href={nextPage ?? "#"}
          class="w-10 h-10 flex items-center justify-center"
        >
          <Icon 
              class="cursor-pointer"
              width={24}
              height={24}
              strokeWidth={1}
              id="SetaPaginationForward"/>
        </a>
      )}
    </div>
  );
}