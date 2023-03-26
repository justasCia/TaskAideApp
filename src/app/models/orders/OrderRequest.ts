import Location from "src/app/models/Location";
import Service from "src/app/models/services/Service";


export default interface OrderRequest {
    services: {
        service: Service
    }[];
    address?: Location
    startDate?: string;
    endDate?: string;
    additionalInformation: string;
}