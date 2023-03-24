import Location from "src/app/models/Location";
import Service from "src/app/models/services/Service";


export default interface BookingRequest {
    services: {
        service: Service
    }[];
    address?: Location
    startDate?: Date;
    endDate?: Date;
    additionalInformation: string;
}