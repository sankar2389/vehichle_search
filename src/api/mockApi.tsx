import axios, { AxiosResponse } from "axios";
import { ListingParams, VehicleList, VehicleListResponse } from "./apiTypes";


export async function updateVehicleDetails(id: string, newObject: object): Promise<VehicleList | null> {
  try {
    const response: AxiosResponse<VehicleList> = await axios.put(`${process.env.REACT_APP_BASE_URL}/vehicles/${id}`, newObject);
    return response.data;
  } catch (error) {
    console.error("Error fetching Vehicle details:", error);
    return null;
  }
}


export async function getVehicleDetails(id: string): Promise<VehicleList | null> {
  try {
    const response: AxiosResponse<VehicleList> = await axios.get(`${process.env.REACT_APP_BASE_URL}/vehicles/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching Vehicle details:", error);
    return null;
  }
}

export async function getVehicleListings(params: ListingParams): Promise<VehicleListResponse> {
  try {
    const response: VehicleListResponse = await axios.get(`${process.env.REACT_APP_BASE_URL}/vehicles`, {
      params: Object.fromEntries(
        Object.entries(params).filter(([_, v]) => v !== "")
      ),
    });
    return response;
  } catch (error) {
    console.error(
      "Error fetching vehicle listings:",
      error
    );
    return { data: [], headers: undefined }; // Return a valid empty VehicleListResponse
  }
}

