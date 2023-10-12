import { Link } from "react-router-dom";
import TableSort from "./tableSort";
import { DataTableViewProps } from "../../types/components";

function DataTableView({
  params,
  setParams,
  vehiclePaginationList,
} : DataTableViewProps) {

  return (
    <>
      <div className="overflow-x-auto mx-6 my-6">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
            <th className="px-6 py-3 bg-gray-300 text-left text-md leading-4 font-medium text-gray-800 uppercase tracking-wider  w-[500px]">
                Image
              </th>
              <th className="px-6 py-3 bg-gray-300 text-left text-md leading-4 font-medium text-gray-800 uppercase tracking-wider  w-[500px]">
                Make
              </th>
              <th className="px-6 py-3 bg-gray-300 text-left text-md leading-4 font-medium text-gray-800 uppercase tracking-wider  w-[500px]">
                Model
              </th>
              <th className="px-6 py-3 bg-gray-300 text-left text-md leading-4 font-medium text-gray-800 uppercase tracking-wider  w-[300px]">
                <TableSort
                  params={params}
                  setParams={setParams}
                  title="Price"
                />
              </th>
              <th className="px-6 py-3 bg-gray-300 text-left text-md leading-4 font-medium text-gray-800 uppercase tracking-wider   w-[300px]">
                <TableSort params={params} setParams={setParams} title="Year" />
              </th>
              <th className="px-6 py-3 bg-gray-300 text-left text-md leading-4 font-medium text-gray-800 uppercase tracking-wider  w-[300px]">
                <TableSort params={params} setParams={setParams} title="Mileage" />
              </th>
              <th className="px-6 py-3 bg-gray-300 text-left text-md leading-4 font-medium text-gray-800 uppercase tracking-wider   w-[500px]">
                Status
              </th>
              <th className="px-6 py-3 bg-gray-300 text-left text-md leading-4 font-medium text-gray-800 uppercase tracking-wider  w-[300px]">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {vehiclePaginationList.length > 0 ? (
              vehiclePaginationList?.map((listing) => (
                <tr key={listing.id}>
                  <img
                    src={listing.images}
                    alt={listing.make}
                    className="w-full h-40 object-cover rounded-lg mb-4"
                  />
                  <td className="px-6 py-4 whitespace-no-wrap">
                    <div className="text-sm leading-5 text-gray-900">
                      {listing.make}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap">
                    <div className="text-sm leading-5 text-gray-900">
                      {listing.model}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap">
                    <div className="text-sm leading-5 text-gray-900">
                      ${listing.price}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap">
                    <div className="text-sm leading-5 text-gray-900">
                      {listing.year}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap">
                    <div className="text-sm leading-5 text-gray-900">
                      {listing.mileage} miles
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap">
                    <div className="text-sm leading-5 text-gray-900">
                      {listing.status}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap underline text-blue-500 ">
                    <Link to={`/vehicle-detail/${listing.id}`}>
                      {
                      listing.isFavorite
                        ? "Remove from Favourites"
                        : "Add to Favourites"}
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center">
                  <p className="text-gray-500">No data found.</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default DataTableView;
