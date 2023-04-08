import Location from "./Location";
import Provider from "./Provider";
import Review from "./reviews/Review";
import Service from "./services/Service";
import User from "./User";

export default interface Order {
  review: Review | null;
  id: number;
  client: User
  provider: Provider
  services: {
    id: number;
    price: number;
    hoursOfWork: number;
    service: Service;
  }[];
  totalHoursOfWork: number,
  totalServicesPrice: number,
  materialPrices: {
    name: string;
    price: number;
  }[];
  totalMaterialPrice: number,
  totalPrice: number,
  address: Location,
  startDate: string;
  endDate: string;
  additionalInformation: string;
  status: string;
  paid: boolean;
}