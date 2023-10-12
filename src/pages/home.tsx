import { useEffect, useState } from "react";
import { ListingParams, VehicleList } from "../api/apiTypes";
import { getVehicleListings } from "../api/mockApi";
import DataTableView from "../components/tableView/tableView";
import Pagination from "../components/pagination";
import TableSearch from "../components/tableView/tableSearch";
import TableFilters from "../components/tableView/tableFilters";

function Home() {
  const [totalPages, setTotalPages] = useState<number>(0);
  const [vehiclePaginationList, setVehiclePaginationList] = useState<
    VehicleList[]
  >([]);
  const [params, setParams] = useState<ListingParams>({
    _page: 1,
    _limit: 10,
    _sort: "",
    _order: "",
    make_like: "",
    price_gte: "",
    price_lte: "",
    make: "",
    model: "",
  });

  async function fetchSortedPaginatedListings() {
    const sortedPaginatedListings = await getVehicleListings(params);
    setVehiclePaginationList(sortedPaginatedListings?.data);
    const linkHeader = sortedPaginatedListings?.headers?.get("link");
    if (linkHeader) {
      const linkParts = linkHeader.split(",");
      const lastPageLink = linkParts.find((part: string) =>
        part.includes('rel="last"')
      );
      if (lastPageLink) {
        const pageParam = lastPageLink.match(/_page=(\d+)/);
        if (pageParam) {
          const total = parseInt(pageParam[1]);
          setTotalPages(total);
        }
      }
    } else {
      setTotalPages(1);
    }
  }
  const handlePrevClick = () => {
    if (params._page && params._page > 1) {
      setParams((prevParams: ListingParams) => ({
        ...prevParams,
        _page: prevParams._page -1,
      }));
    }
  };
  const handleNextClick = () => {
    if (params._page && params._page < totalPages) {
      setParams((prevParams) => ({
        ...prevParams,
        _page: prevParams._page +1,
      }));
    }
  };
  useEffect(() => {
    fetchSortedPaginatedListings();
  }, [params]);

  return (
    <div>
      <div className="flex items-center justify-between mb-10 mx-6 my-8">
        <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold">
          Search Vehicle
        </h1>
        
      </div>
      <div className="flex flex-col sm:flex-row items-center sm:space-x-4 mx-6 my-6">
        <div className="w-full sm:w-auto mb-4 sm:mb-0">
          <TableSearch params={params} setParams={setParams} />
        </div>
        <div className="w-full sm:w-auto">
          <TableFilters
            fetchSortedPaginatedListings={fetchSortedPaginatedListings}
            params={params}
            setParams={setParams}
          />
        </div>
      </div>
        <DataTableView
          vehiclePaginationList={vehiclePaginationList}
          params={params}
          setParams={setParams}
        />
      <Pagination
        totalPages={totalPages}
        _page={params._page}
        onPrevClick={handlePrevClick}
        onNextClick={handleNextClick}
        params={params}
        setParams={setParams}
      />
    </div>
  );
}

export default Home;
