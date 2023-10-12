import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getVehicleDetails, updateVehicleDetails } from "../api/mockApi";
import { VehicleList } from "../api/apiTypes";

function VehicleDetail() {
  const { id} = useParams();
  const [vehicle, setVehicle] = useState<VehicleList | null>(null);

  useEffect(() => {
    async function fetchVehicleDetails() {
      if (id) {
        var vehicleDetails = await getVehicleDetails(id);
        const newObject = {
          "id": vehicleDetails?.id,
          "images": vehicleDetails?.images,
          "make": vehicleDetails?.make,
          "model": vehicleDetails?.model,
          "year": vehicleDetails?.year,
          "mileage": vehicleDetails?.mileage,
          "price": vehicleDetails?.price,
          "status": vehicleDetails?.status,
          "isFavorite": !vehicleDetails?.isFavorite
        }
        const update = await updateVehicleDetails(id, newObject )
        if (vehicleDetails) setVehicle(update);
      }
    }
    fetchVehicleDetails();
  }, [id]);

  if (!vehicle) {
    return <div>Loading...</div>;
  }

  return (
 <>
      <div className="mt-6 p-6">
        <Link
          to="/"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
        >
          Back to Home
        </Link>
      </div>
      <div className="flex border shadow-md flex-col md:flex-row">
        <div className="md:w-[540px] w-full p-6">
          <img
            src={
              vehicle.images
            }
            alt={vehicle.images}
            className="w-full h-auto"
          />
        </div>
        <div className="md:w-1/2 w-full p-6">
          <h2 className="text-2xl font-semibold mb-4">
            {vehicle.make}
          </h2>
          <p className="text-gray-600 mb-2">{vehicle.status}</p>
          <p className="text-blue-700 text-lg mb-4">
            ${vehicle.price}
          </p>
          <div className="border rounded-md bg-gray-100 px-4 py-2">
            <p
              className=" text-xl font-semibold mb-4 w-full
              text-black"
            >
              Overview
            </p>
            <p className="text-gray-700 mb-2 justify-between flex">
              <p className="text-blue-700 font-semibold">Model:</p>{" "}
              {vehicle.model}
            </p>
            <p className="text-gray-700 mb-2 justify-between flex">
              <p className="text-blue-700 font-semibold">Year:</p>{" "}
              {vehicle.year}
            </p>
            <p className="text-gray-700 mb-2 justify-between flex">
              <p className="text-blue-700 font-semibold">Mileage:</p>
              {vehicle.mileage} miles
            </p>
            
            <p className="text-gray-700 mb-2 justify-between flex">
              <p className="text-blue-700 font-semibold">Favourite:</p>
              {vehicle.isFavorite
                ? "Added"
                : "Removed"}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default VehicleDetail;
