import SearchNotFound, {
    Props,
    loader,
  } from "site/components/search/SearchNotFound.tsx";
  
  function SearchNotFoundSection(props: Props) {
    return <SearchNotFound {...props} />;
  }
  
  export { loader } ;
  export default SearchNotFoundSection;
  