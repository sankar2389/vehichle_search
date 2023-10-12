export interface ListingParams {
  _page: number;
  _limit: number;
  _sort?: string;
  _order?: string;
  make_like?: string;
  price_gte?: string;
  price_lte?: string;
  make?: string;
  model?: string;
}
export interface VehicleList {
  id: string;
  images: string;
  make: string;
  model: string;
  year: number;
  mileage: number;
  price: number;
  status: string;
  isFavorite: boolean;
}
export interface VehicleListResponse {
    data: VehicleList[]; 
    headers?: {
      get(header: string): string | null;
    };
   
  }
